#!/bin/bash
ssh latata@t2.latata.pl 'rm -rf /home/latata/t2/backend'
scp -r $TRAVIS_BUILD_DIR/build latata@t2.latata.pl:/home/latata/t2/
tar cf - -C $TRAVIS_BUILD_DIR backend | ssh latata@t2.latata.pl "cd /home/latata/t2 && tar xf - && cp /home/latata/env/backend.env backend/.env && cd backend && npm install && sudo pm2 reload server"
