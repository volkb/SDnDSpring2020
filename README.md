# SDnDSpring2020

## Dev Setup Instructions
The development environment for this website utilizes docker, docker-compose, and node. Please ensure you have the latest version of docker installed and Node LTS (10.x).

1. Change the .example.env file to a .env file and fill in the variables with what you want the SQL username, password, and root password to be.
2. Run `npm install` in the root of the project
3. Rune `docker-compose up`, please allow 10 minutes for everything to download and initiate, subsequent restarts will be much quicker
4. You should now be able to access the website from http://localhost:8080 and phpmyadmin from http://localhost:8081. Any changes made to the files will also be hot reloaded into the program.
5. To stop the containers press `Ctrl + C` in your terminal and wait for them to shut down

**Note**: On windows you must ensure that the C drive and the data drive you are using is shared with docker via the docker desktop utility. docker hub dashboard > settings > resources > shared files. 