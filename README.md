# RC Predictions Tracker

This aims to be a site to track predictions from the RLewisReports discord server.

It's a react router 7 app with adonisjs using mysql.

## How to run
1. Clone the repository
  Make sure you have node v20 or higher installed.

2. Install dependencies
```bash
npm i
```

3. Environment variables
```bash
cp .env.example .env
```
Make sure you fill in the correct MySQL credentials.

You also need a discord app for this to work, you can set one up [here](https://discord.com/developers/applications/).
The redirect URI is `http://localhost:333/auth/discord/callback`.

4. Get up and running
Run migrations
```bash
node ace migration:run
```

Run the app
```
npm run dev
```
This will start the server on port 3333.
