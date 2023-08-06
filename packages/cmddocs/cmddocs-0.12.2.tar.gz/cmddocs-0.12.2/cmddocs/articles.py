import os
import re
import git
import socket
import smtplib
import mistune
import tempfile
import subprocess
from email.mime.text import MIMEText
from .rendering import md_to_ascii
from .utils import *

# Python 3 compatibility
try:
    raw_input = input
except NameError:
    pass

# Function definitions
def list_articles(dir, extension):
    "lists all articles in current dir and below"
    try:
        listing = subprocess.check_output(["tree", dir])
        listing = remove_fileextension(listing, extension)
        print(listing)
    except OSError:
        print("Error: tree not installed")
        return False

def list_directories(dir):
    "lists all directories in current dir and below"
    try:
        subprocess.call(["tree", "-d", dir])
    except OSError:
        print("Error: tree not installed")
        return False

def change_directory(dir, datadir):
    "changes directory"
    d = os.path.join(os.getcwd(), dir)

    # dont cd out of datadir
    if not datadir in d:
        d = datadir

    # if empty, switch to datadir
    if not dir:
        d = datadir

    # switch to dir
    try:
        os.chdir(d)
        return d
    except OSError:
        print("Error: Directory %s not found" % dir)

def edit_article(article, directory, editor, repo, default_commit_msg, extension):
    """edit an article within your docs"""
    # set paths
    a = add_fileextension(article, extension)
    a = os.path.join(directory, a)
    d = os.path.dirname(a)

    # create dir(s)
    if not os.path.isdir(d):
        try:
            os.makedirs(d)
        except OSError:
            print("Error: Creation of path %s is not possible" % d)
            return False

    # start editor
    try:
        subprocess.call([editor, a])
    except OSError:
        print("Error: '%s' No such file or directory" % editor)
        return False

    # commit into git
    try:
        repo.git.add(a)
        if repo.is_dirty():
            msg = raw_input("Commit message: ")
            if not msg:
                msg = default_commit_msg
            repo.git.commit(m=msg)
        else:
            print("Nothing to commit")
    except:
        pass

def mail_article(article, dir, mailfrom, extension):
    "mail an article to a friend"
    a = add_fileextension(article, extension)
    a = os.path.join(dir, a)

    # Create a text/plain message
    try:
        fp = open(a, 'r')
        msg = MIMEText(fp.read())
        fp.close()
    except IsADirectoryError:
        print("Error: You cannot send a directory with mail")
    except OSError:
        print("Error: File could not be opened")

    mailto = raw_input("Recipient: ")
    msg['Subject'] = article
    msg['From'] = mailfrom
    msg['To'] = mailto

    # Send the message via our own SMTP server, but don't include the
    # envelope header.
    s = smtplib.SMTP()
    try:
        s.connect()
        s.sendmail(mailfrom, [mailto], msg.as_string())
        s.quit()
    except socket.error:
        print("Error: Apparently no mailer running on your system.")
        print("Error: Could not connect to localhost:25")
        return False
    except smtplib.SMTPRecipientsRefused:
        print("Error: Invalid recipient or sender")
        return False



def view_article(article, dir, pager, extension):
    "view an article within your docs"
    a = add_fileextension(article, extension)
    a = os.path.join(dir, a)
    # read original file
    try:
        article = open(a, "r")
    except IOError:
        print("Error: Could not find %s" % article)
        return False

    content = article.read()
    article.close()

    # hand everything over to mistune lexer
    with tempfile.NamedTemporaryFile(delete=False) as tmp:
        md = mistune.Markdown(renderer=md_to_ascii())
        md = md.render(content)

        # python 3 compatibility
        # v3 needs to have a byte array
        # v2 not. If conversion fails, its 2.
        try:
            md = bytes(md, 'UTF-8')
        except TypeError:
            pass

        tmp.write(md)

    # start pager and cleanup tmp file afterwards
    # -fr is needed for showing binary+ansi colored files to
    # be properly displayed
    try:
        subprocess.call([pager, "-fr", tmp.name])
    except OSError:
        print("Error: '%s' No such file or directory" % pager)

    try:
        os.remove(tmp.name)
    except OSError:
        print("Error: Could not remove %s" % tmp.name)

def delete_article(article, dir, repo, extension):
    "delete an article"
    a = add_fileextension(article, extension)
    a = os.path.join(dir, a)
    try:
        repo.git.rm(a)
        repo.git.commit(m="%s deleted" % article)
        print("%s deleted" % article)
    except:
        if os.path.isdir(a):
            try:
                os.rmdir(a)
                print("Removed directory %s which was not under version control" % a)
            except OSError:
                print("Could not remove %s - its maybe not empty" % a)
        else:
            try:
                os.remove(a)
                print("Removed file %s which was not under version control" % a)
            except OSError:
                print("File %s could not be removed" % a)
    return

def move_article(dir, args, repo, extension):
    "move an article from source to destination"
    args = args.split()
    if len(args)!=2:
        print("Invalid usage\nUse: mv source dest")
        return False

    a = os.path.join(dir, args[0])
    a = add_fileextension(a, extension)
    e = os.path.join(dir, args[1])
    e = add_fileextension(e, extension)
    d = os.path.dirname(e)

    # create dir(s)
    if not os.path.isdir(d):
        os.makedirs(d)

    # move file in git and commit
    try:
        repo.git.mv(a, e)
        repo.git.commit(m="Moved %s to %s" % (a, e))
        print("Moved %s to %s" % (a, e))
    except git.exc.GitCommandError:
        print("Error: File could not be moved")

def search_article(keyword, directory, datadir, exclude):
    """
    Search for a keyword in every article within your current directory and
    below. Much like recursive grep.
    """
    c = 0
    r = re.compile(keyword)
    print("Articles:")
    for dirpath, dirs, files in os.walk(directory):
        dirs[:] = [d for d in dirs if d not in exclude]
        for fname in files:
            path = os.path.join(dirpath, fname)
            if r.search(path) is not None:
                print("* \033[92m%s\033[39m" %
                        os.path.relpath(path, datadir))
                c = c + 1
    print("Content:")
    for dirpath, dirs, files in os.walk(directory):
        dirs[:] = [d for d in dirs if d not in exclude]
        for fname in files:
            path = os.path.join(dirpath, fname)
            f = open(path, "rt")
            for i, line in enumerate(f):
                if r.search(line):
                    c = c + 1
                    print("* \033[92m%s\033[39m: %s" % (os.path.relpath(path, datadir),
                            line.rstrip('\n')))
    return "Results: %s" % c

def show_diff(args, repo):
    """
    Shows diffs for files or whole article directory
    """
    colorization = "always"
    unifiedopt = "0"

    args = args.split()
    if len(args) > 1:
        if os.path.isfile(os.path.join(os.getcwd(), args[1])):
            try:
                print(repo.git.diff('HEAD~'+args[0],args[1],
                        unified=unifiedopt, color=colorization))
            except git.exc.GitCommandError:
                print("Error: Not a valid git commit reference")
        else:
            print("Error: Wrong Usage. See help diff")
    elif len(args) == 1:
        try:
            print(repo.git.diff('HEAD~'+args[0],
                        unified=unifiedopt, color=colorization))
        except git.exc.GitCommandError:
            print("Error: Not a valid git commit reference")
    else:
        print(repo.git.diff('HEAD~5', unified="0", color="always"))

def show_log(args, repo):
    """
    Show latest git logs with specified number of entries and maybe for a
    specific file.
    """
    args = args.split()
    format="format:%C(blue)%h %Cgreen%C(bold)%ad %Creset%s"
    dateformat="short"

    if len(args) >= 1:
        if os.path.isfile(os.path.join(os.getcwd(), args[0])):
            file = args[0]
            try:
                count = args[1]
                print("Last %s commits for %s" % (count, file))
                print(repo.git.log(file, pretty=format, n=count,
                    date=dateformat))
            except IndexError:
                count = 10
                print("Last %s commits for %s" % (count, file))
                print(repo.git.log(file, pretty=format, n=count,
                        date=dateformat))
        else:
            count = args[0]
            try:
                file = args[1]
                print("Last %s commits for %s" % (count, file))
                print(repo.git.log(file, pretty=format, n=count,
                        date=dateformat))
            except IndexError:
                print("Last %s commits" % count)
                print(repo.git.log(pretty=format, n=count,
                    date=dateformat))

    elif len(args) == 0:
        count = 10
        print("Last %s commits" % count)
        try:
            print(repo.git.log(pretty=format, n=count, date=dateformat))
        except git.exc.GitCommandError:
            print("Error: git may not be configured on your system.")

def undo_change(args, repo):
    """
    You can revert your changes (use revert from git)

    Usage:
    > undo HEAD
    > undo 355f375

    Will ask for confirmation.
    """
    args = args.split()
    if len(args) == 1:
        try:
            print(repo.git.show(args[0], '--oneline', '--patience'))
            msg = input("\nDo you really want to undo this? (y/n): ")
            if msg == "y":
                repo.git.revert(args[0], '--no-edit')

        except git.exc.GitCommandError:
            print("Error: Could not find given commit reference")
    else:
        print("Error: Usage - undo HEAD or undo 355f375")


