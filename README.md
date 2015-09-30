# NCServer
Node Server use for sms error callbarck.

- nginx.conf
```
  location /callback {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_set_header X-NginX-Proxy true;
    proxy_pass http://127.0.0.1:5000;
    proxy_redirect off;
  }
```

- deploy:

npm install pm2 -g   
pm2 deploy ecosystem.json5 production setup

- 複製設定檔

./copy-config.sh production  

- 佈上去~

pm2 deploy ecosystem.json5 production
