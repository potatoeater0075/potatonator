import { OpenAPIRoute } from "chanfana";
import { z } from "zod";

export class Profile extends OpenAPIRoute {
  schema = {
    request: {
      query: z.object({
        user_id: z.string()
      })
    },
    responses: {
      "200": {
        description: "Returns the user's potato",
        content: {
          "application/json": {
            schema: z.object({
              success: z.boolean(),
              potato: z.any().optional(),
              message: z.string().optional()
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
        message: "You don't have a potato yet! Use /potatonator-adopt first. 🥔"
      });
    }

    return c.json({
      success: true,
      potato
    });
  }
}