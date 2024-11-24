# Home Library Service (part 3)

## How to run & test home library service

## 1. Installing NPM modules

```
npm install
```

## 2. Handling environment variables
Copy or rename `.env.example` to `.env` file in the root folder.
> `.env` file is ignored in git. 

## 3. Running application (in a docker container)
This application consists of 3 components. These components are:
1. Home library service (NestJS application)
2. PostgresQL database to persist information
3. Adminer utility tool to view content of the database

The code base contains 2 docker-compose files
1. docker-compose-dev.yml 
This compose-file declares specification of images to run home library service in a development mode. If any change in the codebase is made, the container will pickup the changes immediately and nestJS will reload the application.

2. docker-compose.yml
This compose-file declares specification of images to run home library service in a production mode. No change will be reflected.

### Development mode
```
npm run docker:dev:up
```
This command will build and start containers defined in `docker-compose-dev.yml` file. Since it will be run in development mode and hot reload is needed Dockerfile is defined as `Dockerfile-dev`.
Be aware that running this command will fill out the database data from `seed.mjs` and will be persisted in the docker volume.

```
npm run docker:dev:down
```
This command will shut down all containers defined in a compose file, but any created data will be persisted.


### Production mode
```
npm run docker:prod:up
```
This command will build and start containers defined in `docker-compose.yml` file. This command will not pre-seed the database with any data and any new data will be persisted in the docker volume.


```
npm run docker:prod:down
```

Port value, database connection string is read from `.env` file. 

## 4. Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

### Using adminer to view created records in the database
1. Open `localhost:8080`
2. Enter following information
   3. System: `PostgreSQL`
   4. Server: `database`
   5. Username: `postgres`
   6. Password: `example`
   7. Database: `mydb`

After opening the database in `adminer`, one can review added and modified data.

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
