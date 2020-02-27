# SDnDSpring2020

## Dev Setup Instructions
The development environment for this website utilizes docker, docker-compose, and node. Please ensure you have the latest version of docker installed and Node LTS (10.x).

1. Run `openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365` to generate a valid SSL cert 
1. Go to developers.facebook.com and create an application.
1. Click setup facebook login and ensure you have https://localhost:8080/auth/facebook/callback as a valid oauth redirect
1. Change the .example.env file to a .env file and fill in the variables.
1. Go to settings > basic (developers.facebook.com) and copy the app id and app secret into your .env file
1. Run `npm install` in the root of the project
1. Run `docker-compose up`, please allow 10 minutes for everything to download and initiate, subsequent restarts will be much quicker
1. You should now be able to access the website from https://localhost:8080 and phpmyadmin from http://localhost:8081. Any changes made to the files will also be hot reloaded into the program.
1. To stop the containers press `Ctrl + C` in your terminal and wait for them to shut down

**Note**: On windows you must ensure that the C drive and the data drive you are using is shared with docker via the docker desktop utility. docker hub dashboard > settings > resources > shared files. 