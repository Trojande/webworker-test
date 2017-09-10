#test app for planet pics: 
**how to run:**
* **nginx** (you can find nginx.conf inside this folder. )
1. install nginx with your OS package manager
2. customize my nginx.conf (just replace alias for /media) and copy to /etc/nginx/
3. launch nginx service
* **json-server** 
1. install with: `npm install -g json-server`
2. launch with (inside repository folder): `json-server files.json`
* **webpack hot reload server**1
1. install project dependencies with: `npm i`
2. launch with `npm start`

Congratulations! Go to -> http://localhost(:80)

