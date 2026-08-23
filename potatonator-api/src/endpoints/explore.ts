import { OpenAPIRoute } from "chanfana";
import { z } from "zod";

export class Explore extends OpenAPIRoute {
  schema = {
    request: {
      query: z.object({
        user_id: z.string()
      })
    },
    responses: {
      "200": {
        description: "Explore result",
        content: {
          "application/json": {
            schema: z.object({
              success: z.boolean(),
              message: z.string(),
              xp: z.number(),
              coins: z.number()
            })
          }
        }
      }
    }
  };

  async handle(c: any) {
    const data = await this.getValidatedData<typeof this.schema>();
    const userId = data.query.user_id;

    const potato = await c.env.DB
      .prepare("SELECT * FROM potatoes WHERE user_id = ?")
      .bind(userId)
      .first();

    if (!potato) {
      return c.json({
        success: false,
        message: "You don't have a potato yet! Use /potatonator-adopt first. 🥔",
        xp: 0,
        coins: 0
      });
    }

    const events = [
      {
        message: "Your potato found a mysterious treasure chest! 🎁",
        xp: 10,
        coins: 25
      },
      {
        message: "Your potato discovered a field of golden potatoes! 🥔",
        xp: 15,
        coins: 30
      },
      {
        message: "Your potato defeated a wild carrot! 🥕⚔️",
        xp: 20,
        coins: 40
      },
      {
        message: "Your potato found some coins on the ground! 💰",
        xp: 5,
        coins: 50
      },
      {
        message: "Your potato got distracted and took a nap. 😴",
        xp: 2,
        coins: 5
      }
    ];

    const randomEvent = events[Math.floor(Math.random() * events.length)]!;
    const currentStats = await c.env.DB
  .prepare("SELECT xp, level FROM potatoes WHERE user_id = ?")
  .bind(userId)
  .first();

const oldXp = Number(currentStats?.xp ?? 0);
const oldLevel = Number(currentStats?.level ?? 1);

const newXp = oldXp + randomEvent.xp;

let newLevel = 1;

if (newXp >= 700) {
  newLevel = 5;
} else if (newXp >= 450) {
  newLevel = 4;
} else if (newXp >= 250) {
  newLevel = 3;
} else if (newXp >= 100) {
  newLevel = 2;
}

const leveledUp = newLevel > oldLevel;

await c.env.DB
  .prepare(
    "UPDATE potatoes SET xp = ?, level = ?, coins = coins + ? WHERE user_id = ?"
  )
  .bind(newXp, newLevel, randomEvent.coins, userId)
  .run();

    return c.json({
  success: true,
  message: randomEvent.message,
  xp: randomEvent.xp,
  coins: randomEvent.coins,
  level: newLevel,
  leveledUp
});
  }
}