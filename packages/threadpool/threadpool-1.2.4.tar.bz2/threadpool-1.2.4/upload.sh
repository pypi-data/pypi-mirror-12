#!/bin/sh

BASE_DIR="/home/www/chrisarndt.de/htdocs/projects/threadpool"
HOST="chris.dilruacs.nl"
USER="chris"

rsync -av --update doc/ "$USER@$HOST:$BASE_DIR"
rsync -av --update dist "$USER@$HOST:$BASE_DIR/download"
