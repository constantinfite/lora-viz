# not install dev dependency
#heroku config:set NPM_CONFIG_PRODUCTION=false

#ADD env variable in heroku

cd C:\\Users\\const\\Documents\\Web-programming\\visualisation-app-lora\\client
npm run build
cd ..
echo "Enter your message"
read message
git add .
git commit -am "${message}"
git push origin main
git push heroku

