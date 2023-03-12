# placeEnjoy

## Prerequisites

1. Install [PostgreSQL](https://www.postgresql.org/download/).
2. Create Database with name `placeDB` and password `admin`.
3. Make sure Port 3117 is not in use.

## Installation and first time setup
1. Clone or download the repo
2. Inside the project directory, create a `.env` file and put the following code inside
```
MY_SECRET="secret"
```
3. Open a shell window inside the project directory and type in `npm init`
4. To initialize the database, uncomment lines 21 through 37 in the `models/index.js`
5. Run the code for a first time with `nodemon app`
6. Recomment lines 21 through 37 then save.
