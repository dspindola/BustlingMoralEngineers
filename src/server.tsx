import { Elysia, } from "elysia"
import { cors } from "@elysiajs/cors"
import { staticPlugin } from "@elysiajs/static"
import { $Route } from "@/$"
import { ai } from "./main"
import { treaty } from "@elysiajs/eden"


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
	.get('/', $Route(() => <p>hi</p>))


// app.listen({
// 		hostname: import.meta.env.HOSTNAME,
// 		port: import.meta.env.PORT,
// 		development: import.meta.env.DEV
// 	})

const cli = treaty(app);

await cli.prompt.post({
	prompt: "How are you?"
})