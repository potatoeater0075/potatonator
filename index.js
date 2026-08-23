const axios = require("axios");
require("dotenv").config();

const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

const potatoNames = [
  "Spudrick",
  "Tater Tot",
  "Sir Spudington",
  "Potato Jones",
  "Mash",
  "Spud Vader",
  "Lord Tater",
  "Mr. Potato"
];

const potatoTypes = [
  "🥔 Classic Potato",
  "🧙 Wizard Potato",
  "🥷 Ninja Potato",
  "👑 Royal Potato",
  "🤖 Cyber Potato",
  "🧪 Mutant Potato"
];

const potatoRarities = [
  "Common",
  "Uncommon",
  "Rare",
  "Epic",
  "Legendary"
];

function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}



app.command("/potatonator-ping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Pong!\nLatency: ${latency}ms` });
});

(async () => {
  await app.start();
  console.log("bot is running!");
})();

app.command("/potatonator-help", async ({ ack, respond }) => {
  await ack();
  await respond({
    text:
`Available Commands:
/potatonator-ping - Check bot latency`
  });
});

app.command("/potatonator-potatofact", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get(
  "https://potatonator-api.potatonator.workers.dev/fact"
);
    await respond({ text: `potato Fact:\n${response.data.fact}` });
  } catch (err) {
    await respond({ text: "Failed to fetch a potato fact." });
  }
});

app.command("/potatonator-potato", async ({ ack, respond }) => {
  await ack();

  const name = randomItem(potatoNames);
  const type = randomItem(potatoTypes);
  const rarity = randomItem(potatoRarities);

  const power = Math.floor(Math.random() * 100) + 1;
  const crunch = Math.floor(Math.random() * 100) + 1;
  const luck = Math.floor(Math.random() * 100) + 1;

  await respond({
    text:
      `🥔 *POTATO GENERATED!*\n\n` +
      `*Name:* ${name}\n` +
      `*Type:* ${type}\n` +
      `*Rarity:* ${rarity}\n\n` +
      `⚔️ *Power:* ${power}\n` +
      `🥔 *Crunch:* ${crunch}\n` +
      `🍀 *Luck:* ${luck}`
  });
});

app.command("/potatonator-adopt", async ({ ack, respond, command }) => {
  await ack();

  try {
    const response = await axios.post(
  "https://potatonator-api.potatonator.workers.dev/adopt",
  {
    user_id: command.user_id
  },
  {
    validateStatus: (status) => status < 500
  }
);

    const data = response.data;

    if (!data.success) {
      await respond({
        text: `🥔 ${data.message}`
      });
      return;
    }

    const potato = data.potato;

    await respond({
      text:
        `🥔 *Congratulations! You adopted a potato!*\n\n` +
        `*Name:* ${potato.name}\n` +
        `*Type:* ${potato.type}\n` +
        `*Rarity:* ${potato.rarity}\n\n` +
        `⚔️ *Power:* ${potato.power}\n` +
        `🥔 *Crunch:* ${potato.crunch}\n` +
        `🍀 *Luck:* ${potato.luck}\n\n` +
        `⭐ *Level:* ${potato.level}\n` +
        `✨ *XP:* ${potato.xp}`
    });

  } catch (err) {
    console.error(err);

    await respond({
      text: "🥔 Something went wrong while adopting your potato."
    });
  }
});

app.command("/potatonator-profile", async ({ ack, respond, command }) => {
  await ack();

  try {
    const response = await axios.get(
      "https://potatonator-api.potatonator.workers.dev/profile",
      {
        params: {
          user_id: command.user_id
        }
      }
    );

    const data = response.data;

    if (!data.success) {
      await respond({
        text: `🥔 ${data.message}`
      });
      return;
    }

    const potato = data.potato;

    await respond({
      text:
        `🥔 *${potato.name}*\n\n` +
        `*Type:* ${potato.type}\n` +
        `*Rarity:* ${potato.rarity}\n\n` +
        `⚔️ *Power:* ${potato.power}\n` +
        `🥔 *Crunch:* ${potato.crunch}\n` +
        `🍀 *Luck:* ${potato.luck}\n\n` +
        `⭐ *Level:* ${potato.level}\n` +
        `✨ *XP:* ${potato.xp}\n` +
        `💰 *Coins:* ${potato.coins}`
    });

  } catch (err) {
    console.error(err);

    await respond({
      text: "🥔 Something went wrong while getting your potato."
    });
  }
});

app.command("/potatonator-explore", async ({ ack, respond, command }) => {
  await ack();

  try {
    const response = await axios.get(
      "https://potatonator-api.potatonator.workers.dev/explore",
      {
        params: {
          user_id: command.user_id
        }
      }
    );

    const data = response.data;

    if (!data.success) {
      await respond({
        text: `🥔 ${data.message}`
      });
      return;
    }

    let message =
  `🌲 *Your potato went exploring!*\n\n` +
  `${data.message}\n\n` +
  `✨ *+${data.xp} XP*\n` +
  `💰 *+${data.coins} coins*`;

if (data.leveledUp) {
  message +=
    `\n\n🎉 *LEVEL UP!* 🎉\n` +
    `🥔 Your potato is now *Level ${data.level}*!`;
}

await respond({
  text: message
});

  } catch (err) {
    console.error(err);

    await respond({
      text: "🥔 Something went wrong while exploring."
    });
  }
});