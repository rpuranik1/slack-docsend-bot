require('dotenv').config();
const { App } = require('@slack/bolt');
const fetch = require('node-fetch');

// Initialize Bolt in Socket Mode
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
});

// Slash command handler for /docsend-pdf
app.command('/docsend-pdf', async ({ command, ack, respond, client }) => {
  await ack();
  const [url, email, passcode] = command.text.trim().split(/\s+/);

  if (!url) {
    await respond('Usage: `/docsend-pdf <docsend-url> [email] [passcode]`');
    return;
  }

  const payload = { url };
  if (email) payload.email = email;
  if (passcode) payload.passcode = passcode;

  try {
    const res = await fetch('https://docsend2pdf.com/api/convert', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.status === 429) {
      const retryAfter = res.headers.get('Retry-After') || 'a few seconds';
      await respond('Rate-limited. Try again in ' + retryAfter + '.');
      return;
    }

    if (!res.ok) {
      let errMsg;
      try {
        const errJson = await res.json();
        errMsg = errJson.error || res.statusText;
      } catch {
        errMsg = res.statusText;
      }
      await respond('Error: ' + errMsg);
      return;
    }

    const arrayBuffer = await res.arrayBuffer();
    const pdfBuffer = Buffer.from(arrayBuffer);

    await client.files.uploadV2({
      file: pdfBuffer,
      filename: 'document.pdf',
      title: 'Docsend Export',
      channels: command.channel_id,
    });
  } catch (e) {
    await respond('Unexpected error: ' + e.message);
  }
});

(async () => {
  try {
    await app.start();
    console.log('⚡️ Bolt (Socket Mode) app is running!');
    console.log('Bot is ready to receive commands!');
  } catch (error) {
    console.error('Error starting the app:', error);
    process.exit(1);
  }
})();
