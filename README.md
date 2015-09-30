# NCServer
Node Server use for sms error callbarck.

## deploy:
npm install pm2 -g
pm2 deploy ecosystem.json5 production setup

## 複製設定檔

./copy-config.sh production  

## 佈上去~

pm2 deploy ecosystem.json5 production
