# Typescript REST API Bootstrap

A nice starter for building a production level Express API. 
Includes setup for:
- Winston logger
- pm2 process management
- TypeORM
- Eslint
- Docker-compose file and scripts to create a development database
- Postinstall hook for deploying to Heroku
- User auth flow including signup, login, and password reset

## To Use

1. Install dependencies with: 
`$ yarn`

2. Make sure `docker-compose` is installed and a docker daemon is running:
`$ docker-compose --version`

 * If not, go [here for Mac](https://docs.docker.com/docker-for-mac/install/) or [here for Windows](https://docs.docker.com/docker-for-windows/install/).

3. Start the DB container by running:
`$ yarn db:start`

4. Create the development database:
`$ yarn db:create`

5. Create the users table:
`$ yarn db:sync`
 * Note: run this command anytime you change the TypeORM entities to sync your DB.

6. Start the server with:
`$ yarn dev`

7. Navigate to http://localhost:3000/api-docs to see the Swagger documentation.

Make sure you set up the environment variables with your SMTP host information in order to use the password reset mailing.

## Deploying

This project was designed to be deployed on Heroku. If you are using Heroku, everything is set up for maximum ease. You should hopefully only need to add the Postgres data add-on and add your environment variables in the config.

For other platforms, it should just be a matter of making sure your environment variables are configured properly.

