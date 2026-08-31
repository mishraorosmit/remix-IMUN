/**
 * Discord & Slack Webhook Dispatcher for Secretariat Notifications
 */

export async function sendDiscordAlert(content: string, embedData?: Record<string, any>): Promise<void> {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) return;

  try {
    const payload: any = { content };
    if (embedData) {
      payload.embeds = [embedData];
    }

    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error('Failed to dispatch Discord webhook:', error);
  }
}
