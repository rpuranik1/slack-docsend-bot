# Slack DocSend Bot

A Slack bot that converts DocSend URLs to PDFs using the `/docsend-pdf` slash command.

## Features

- Convert DocSend URLs to PDFs directly in Slack
- Support for email and passcode authentication
- Rate limiting handling
- Automatic file upload to Slack channels

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy `env.example` to `.env` and fill in your Slack app credentials:
   ```bash
   cp env.example .env
   ```

3. Run the bot:
   ```bash
   npm start
   ```

## Deployment Options

### Option 1: Railway (Recommended - Free tier available)

1. Create a [Railway](https://railway.app/) account
2. Connect your GitHub repository
3. Add environment variables in Railway dashboard:
   - `SLACK_BOT_TOKEN`
   - `SLACK_SIGNING_SECRET`
   - `SLACK_APP_TOKEN`
4. Deploy automatically on push

### Option 2: Render (Free tier available)

1. Create a [Render](https://render.com/) account
2. Create a new Web Service
3. Connect your GitHub repository
4. Set build command: `npm install`
5. Set start command: `npm start`
6. Add environment variables in Render dashboard
7. Deploy

### Option 3: Heroku

1. Create a [Heroku](https://heroku.com/) account
2. Install Heroku CLI
3. Create a new app:
   ```bash
   heroku create your-bot-name
   ```
4. Add environment variables:
   ```bash
   heroku config:set SLACK_BOT_TOKEN=xoxb-your-token
   heroku config:set SLACK_SIGNING_SECRET=your-secret
   heroku config:set SLACK_APP_TOKEN=xapp-your-token
   ```
5. Deploy:
   ```bash
   git push heroku main
   ```

### Option 4: DigitalOcean App Platform

1. Create a [DigitalOcean](https://digitalocean.com/) account
2. Go to App Platform
3. Create a new app from your GitHub repository
4. Set environment variables in the dashboard
5. Deploy

## Slack App Setup

1. Go to [api.slack.com/apps](https://api.slack.com/apps)
2. Create a new app
3. Enable Socket Mode
4. Add the following OAuth scopes:
   - `commands` (for slash commands)
   - `files:write` (for uploading PDFs)
   - `chat:write` (for responding to commands)
5. Create a slash command `/docsend-pdf`
6. Install the app to your workspace
7. Copy the credentials to your environment variables

## Usage

Once deployed, users can use the bot with:

```
/docsend-pdf <docsend-url> [email] [passcode]
```

Examples:
- `/docsend-pdf https://docsend.com/view/abc123`
- `/docsend-pdf https://docsend.com/view/abc123 user@example.com`
- `/docsend-pdf https://docsend.com/view/abc123 user@example.com 123456`

## Environment Variables

- `SLACK_BOT_TOKEN`: Your Slack bot token (starts with `xoxb-`)
- `SLACK_SIGNING_SECRET`: Your Slack app signing secret
- `SLACK_APP_TOKEN`: Your Slack app token (starts with `xapp-`)

## Troubleshooting

- Make sure all environment variables are set correctly
- Check that your Slack app has the required permissions
- Verify the slash command is installed in your workspace
- Check the deployment logs for any errors 