import { Elysia, } from "elysia"
import { cors } from "@elysiajs/cors"
import { staticPlugin } from "@elysiajs/static"
import { $Route } from "@/$"
import { ai } from "@/plugins/ai"
import { IndexRoute } from "./routes"
import { ReplitConfigRoute } from "./routes/replit/config"

const app = new Elysia()
	.use(
		cors({
			origin: "*"
		})
	)
	.use(
		staticPlugin({
			prefix: import.meta.env.ASSETS_PREFIX,
			noCache: import.meta.env.DEV,
			alwaysStatic: false,
			directive: "public"
		})
	)
	.use(ai)
	.state('replit', {
		config: (await import('../.replit')).default
	} as {
		config: import('.out/types/replit-config').Config
	})
	.get('/', $Route(IndexRoute))
	.get('/replit/config', $Route(ReplitConfigRoute))
	.listen({
		hostname: import.meta.env.HOSTNAME,
		port: import.meta.env.PORT,
		development: import.meta.env.DEV
	}, ({ url }) => {
		console.log(`Listening on ${url.origin}`)
		console.log(`Listening on ${url.origin}/replit/config`)
	})

