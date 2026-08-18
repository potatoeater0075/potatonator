import { OpenAPIRoute } from "chanfana";
import { z } from "zod";

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
  "Classic Potato",
  "Wizard Potato",
  "Ninja Potato",
  "Royal Potato",
  "Cyber Potato",
  "Mutant Potato"
];

const potatoRarities = [
  "Common",
  "Uncommon",
  "Rare",
  "Epic",
  "Legendary"
];

function randomItem(array: string[]) {
  return array[Math.floor(Math.random() * array.length)];
}

function randomStat() {
  return Math.floor(Math.random() * 100) + 1;
}

export class Adopt extends OpenAPIRoute {
  schema = {
    request: {
      body: {
        content: {
          "application/json": {
            schema: z.object({
              user_id: z.string()
            })
          }
        }
      }
    },
    responses: {
      "200": {
        description: "Potato successfully adopted",
        content: {
          "application/json": {
            schema: z.object({
              success: z.boolean(),
              potato: z.object({
                name: z.string(),
                type: z.string(),
                rarity: z.string(),
                power: z.number(),
                crunch: z.number(),
                luck: z.number(),
                level: z.number(),
                xp: z.number()
              })
            })
          }
        }
      },
      "400": {
        description: "User already has a potato"
      }
    }
  };

  async handle(c: any) {
    const data = await this.getValidatedData<typeof this.schema>();
    const userId = data.body.user_id;

    const existing = await c.env.DB
      .prepare("SELECT * FROM potatoes WHERE user_id = ?")
      .bind(userId)
      .first();

    if (existing) {
      return c.json({
        success: false,
        message: "You already have a potato! 🥔"
      }, 400);
    }

    const potato = {
      name: randomItem(potatoNames),
      type: randomItem(potatoTypes),
      rarity: randomItem(potatoRarities),
      power: randomStat(),
      crunch: randomStat(),
      luck: randomStat(),
      level: 1,
      xp: 0
    };

    await c.env.DB
      .prepare(`
        INSERT INTO potatoes
        (user_id, name, type, rarity, power, crunch, luck, level, xp)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `)
      .bind(
        userId,
        potato.name,
        potato.type,
        potato.rarity,
        potato.power,
        potato.crunch,
        potato.luck,
        potato.level,
        potato.xp
      )
      .run();

    return c.json({
      success: true,
      potato
    });
  }
}