<h1>NginxCtl</h1>

This is a simple tool to manage nginx service on a server. This tool is similar to apachectl but for nginx. The important feature of this tool is ability to list vhosts configured on a nginx server.

<h2>Download/Installation</h2>
```
wget https://raw.githubusercontent.com/fooltruth/nginxctl/master/nginxCtl.py  -O nginxctl.py 
python nginxctl.py -S
```


<h2>Usage</h2>
```
python nginxctl.py -h
Usage: nginxctl.py [options]

Options:
  -S list nginx vhosts
  -t configuration test
  -k start|stop|status|restart|fullstatus
  -v version
  -h help

```
Here is an example of running the option to discover virtual hosts
```
# python nginxctl.py -S
nginx vhost configuration:
*:80; is a Virtualhost
        port 80;  localhost  (/etc/nginx/sites-enabled/default:28)
                alias   example.com


nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```
