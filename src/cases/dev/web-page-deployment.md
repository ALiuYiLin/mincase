# 静态网页部署docker+nginx
##  1、拉取Nginx镜像
```bash
docker pull nginx:latest
```
## 2、创建nginx临时容器
```bash
docker run -d -p 80:80 --name nginx-temp nginx:latest  
```
## 3、进入容器内，查看镜像中nginx配置文件目录 可省略
```bash
docker exec -it nginx-temp /bin/bash
# 退出容器内部
exit 
```
## 4、将nginx配置文件导出到宿主机中
```bash
mkdir mincase #创建/mydata/nginx/mincase 目录
docker cp nginx-temp:/etc/nginx /mydata/nginx/mincase/conf
docker cp nginx-temp:/usr/share/nginx/html /mydata/nginx/mincase/html
```
##  5、删除临时运行的nginx容器
```bash
docker stop nginx-temp
docker rm nginx-temp
```

## 6、创建nginx容器并映射配置文件
```bash
docker run -d -p 80:80 --name nginx-mincase   \
 -v /mydata/nginx/mincase/html:/usr/share/nginx/html  \
 -v /mydata/nginx/mincase/conf:/etc/nginx \
nginx:latest
```


