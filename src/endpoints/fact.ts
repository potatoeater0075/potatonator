import { OpenAPIRoute } from "chanfana";
import { z } from "zod";

const potatoFacts = [
  "Potatoes were the first food planted in space.",
  "Potatoes originated in the Andes Mountains of South America.",
  "Potatoes are members of the nightshade family.",
  "There are thousands of different varieties of potatoes.",
  "Potatoes are made up of roughly 80% water."
];

export class Fact extends OpenAPIRoute {
  schema = {
    responses: {
      "200": {
        description: "A random potato fact",
        content: {
          "application/json": {
            schema: z.object({
              fact: z.string()
            })
          }
        }
      }
    }
  };

  async handle() {
    const fact =
      potatoFacts[Math.floor(Math.random() * potatoFacts.length)];

    return {
      fact
    };
  }
}