import { fromHono } from "chanfana";
import { Hono } from "hono";
import { Fact } from "./endpoints/fact";
import { Adopt } from "./endpoints/adopt";
import { Profile } from "./endpoints/profile";
import { Explore } from "./endpoints/explore";

// Start a Hono app
const app = new Hono<{ Bindings: Env }>();

// Setup OpenAPI registry
const openapi = fromHono(app, {
	docs_url: "/",
});

// Register OpenAPI endpoints
openapi.get("/fact", Fact);
openapi.post("/adopt", Adopt);
openapi.get("/profile", Profile);
openapi.get("/explore", Explore);
// You may also register routes for non OpenAPI directly on Hono
// app.get('/test', (c) => c.text('Hono!'))

// Export the Hono app
export default app;
