**TITLE**
===
Description

### Installation
```
#!/bin/bash
PROJECT=template
PORT=8000

# choose your own
PROJECT_DIR=~/projects/$PROJECT
REPO_DIST=ssh://git@bitbucket.org/doctorzeb8/$PROJECT.git

# this setup method is for arch linux, so take care yourself about:
# 1) -dev packages
# 2) names of the following packages
sudo pacman -S python-virtualenv nodejs
npm install -g bower

# take care about dbms service
yaourt -S postgresql
sudo systemctl enable postgresql
sudo systemctl start postgresql

# take care about database and permissions existence
createdb $PROJECT

# clone repo
git clone $REPO_DIST $PROJECT_DIR
cd $PROJECT_DIR

# setup virtual environment
# take care python version >= 3.3 otherwise use --python=/path/to/python3.3
virtualenv env
source env/bin/activate

# setup packages
pip install --upgrade pip
pip install -r packages
pip install ipdb ipython

# setup project data
mkdir -p uploads
cd src
python manage.py bower_install
python manage.py migrate

# test everything is passing
python manage.py test

# dev and enjoy :-)
python manage.py runserver $PORT
```
