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

```
cd .\frontend\
npm install
npm run build
```

Add .env file in api folder

Should look like this

```dotenv
PORT=5000
HOST=0.0.0.0

MONGO_URL=mongodb://yourUserName:yourPassword@db:27017/nameOfYourDatabase

MONGO_INITDB_DATABASE=nameOfYourDatabase
MONGO_INITDB_ROOT_USERNAME=yourUserName
MONGO_INITDB_ROOT_PASSWORD=yourPassword

FRONTEND_URL=http://localhost:3000
CREATE_ADMIN_KEY=yourValue

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

Create two roles:

- make first `post` request to `localhost:80/api/role` with body below
  ```json
  {
    "title": "user"
  }
  ```
- make second `post` request to `localhost:80/api/role` with body below
  ```json
  {
    "title": "admin"
  }
  ```

Run `docker compose up`

Open [http://localhost:80](http://localhost:80) in browser
