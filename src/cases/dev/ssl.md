## ssl证书部署HTTPS安全访问实现

```bash
      server {
      #SSL 默认访问端口号为 443
      listen 443 ssl;
      #请填写绑定证书的域名
      server_name mincase.space; 
      #请填写证书文件的相对路径或绝对路径
      ssl_certificate /etc/nginx/ssl/mincase.space_bundle.crt; 
      #请填写私钥文件的相对路径或绝对路径
      ssl_certificate_key /etc/nginx/ssl/mincase.space.key; 
      ssl_session_timeout 5m;
      #请按照以下套件配置，配置加密套件，写法遵循 openssl 标准。
      ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
     
      ssl_protocols TLSv1.2 TLSv1.3;
      ssl_prefer_server_ciphers on;
      location / {
        root   /usr/share/nginx/html/mincase;
        index  index.html index.htm;
    	}
      location /assets/ {
        alias /usr/share/nginx/html/mincase/assets/;
        add_header Access-Control-Allow-Origin *;
    	}
    }
    server {
      listen 80;
      #请填写绑定证书的域名
      server_name mincase.space; 
      #把http的域名请求转成https
      return 301 https://$host$request_uri; 
    }
```