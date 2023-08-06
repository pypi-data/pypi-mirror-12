import re
import os

def add_fileextension(article,extension):
    "add file extension to article"

    if os.path.isfile(article + '.' + extension):
        article = article + '.' + extension

    return article

def remove_fileextension(article,extension):
    "remove file extension"

    extension = r'\.' + extension + '$'
    article = re.sub(extension, "", article, flags=re.M)

    return article
