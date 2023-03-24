# Recipes

___

Web-site when people can view recipes and create their own.

## Stack Technologies

[![Stack](https://skills.thijs.gg/icons?i=mongodb,express,react,ts,nodejs)]()

- MongoDB
- Express
- React
- TypeScript
- NodeJs

## Screenshots

![image](https://user-images.githubusercontent.com/97622905/226435620-8018d585-2299-4104-adcb-e8fd65a287ed.png)
![image](https://user-images.githubusercontent.com/97622905/226435441-6d80e818-26a3-4c36-8169-4a68efcdfdd2.png)
![image](https://user-images.githubusercontent.com/97622905/226435702-a4fc56c9-75b8-4d94-991f-87ea6f55a77c.png)

## Installation

`git clone https://github.com/OleksiiObabko/Recipes.git`

### In first terminal:

```
cd .\frontend
npm install	
```

### In second terminal

`cd .\api`

`npm install`

### add .env file in api folder (optional)

Should look like this

```dotenv
PORT=5000

MONGO_URL=yourMongoDbUrl

MONGO_INITDB_DATABASE=nameOfYourDatabase
MONGO_INITDB_ROOT_USERNAME=yourUserName
MONGO_INITDB_ROOT_PASSWORD=yourPassword

FRONTEND_URL=http://localhost:3000

ACCESS_SECRET=yourAccessSecretWord
REFRESH_SECRET=yourRefreshSecretWord
FORGOT_PASSWORD_ACTION_TOKEN_SECRET=yourActionSecretWord

ACCESS_LIFE_TIME=10m
REFRESH_LIFE_TIME=10d

NO_REPLAY_EMAIL=yourEmail
NO_REPLAY_EMAIL_PASSWORD=yourEmailPassword

S3_BUCKET_NAME=yourS3BucketName
S3_BUCKET_REGION=yourS3BucketRegion
S3_ACCESS_KEY=yourS3BucketAccessKey
S3_SECRET_KEY=yourS3BucketSecretKey
```

## Usage

### Backend

Select backend directory `cd .\api`

Run `node app`

#### Before use backend need create two roles and admin user:

Roles:

- make first `post` request to `http://localhost:5000/role` with body below
  ```json
  {
    "title": "user"
  }
  ```
- make second `post` request to `http://localhost:5000/role` with body below
  ```json
  {
    "title": "admin"
  }
  ```

Admin user:

- make pust request to `http://localhost:5000/authors` with body below
  ```json
  {
      "userName": "yourUserName",
      "password": "yourPassword",
      "email": "yourEmail@foo.foo"
  }
  ```

- in your db change user role to admin

  `db.getCollection('authors').update({"_id" : ObjectId("yourUserObjectId")}, {$set: {"role" : ObjectId("
  yourRoleObjectId")}})`

Now backend is ready to use

### Frontend

Select frontend directory `cd .\frontend`

Run `npm run start`

Open [http://localhost:3000](http://localhost:3000) in browser
