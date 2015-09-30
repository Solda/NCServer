# NCServer
Node Server use for sms error callbarck.

## deploy:
0. npm install pm2 -g
1. pm2 deploy ecosystem.json5 production setup

複製設定檔
2.1 ./copy-config.sh production  

佈上去~
2.2 pm2 deploy ecosystem.json5 production
