# RC Predictions Tracker

This aims to be a site to track predictions from the RLewisReports discord server.

It's a react router 7 app with adonisjs using mysql.

## How to run

### 1. Clone the repository
  Make sure you have node v20 or higher installed.

### 2. Install dependencies
```bash
npm i
```

### 3. Environment variables
```bash
cp .env.example .env
```
Make sure you fill in the correct MySQL credentials.

You also need a discord app for this to work, you can set one up [here](https://discord.com/developers/applications/).
The redirect URI is `http://localhost:333/auth/discord/callback`.

### 4. Get up and running
Run migrations
```bash
node ace migration:run
```

Run the app
```
npm run dev
```
This will start the server on port 3333.

## Deployment
When deploying, make sure to set `NODE_ENV` to `production`.

I like to use nixpacks with these env variables:
```
NIXPACKS_BUILD_CMD="node ace build && node ace migration:run"
NIXPACKS_START_CMD="cd build && npm ci --omit=dev && node bin/server.js"
NIXPACKS_NODE_VERSION=22
NIXPACKS_INSTALL_CMD="npm i && npx react-router typegen"
```

## Contributing
If you want to contribute, feel free to open a PR or an issue. I will try to respond as soon as possible.
This is a work in progress, so there are a lot of things that need to be done and are still in development.
