import { GoogleGenerativeAI } from "@google/generative-ai";
import Elysia, { t } from "elysia";

const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function run(prompt: string) {
	const result = await model.generateContent(prompt);

	return {
		prompt, response: {
			raw: result.response.text(),
		}
	}
}

type Res = {
	id: string,
	timestamp: number,
	prompt: string,
	response: {
		raw: string,
	}
}
const hist = await Bun.file('public/history.json').json() as Res[]

export const ai = new Elysia().decorate('run', run)
	.state('history', hist)
	.decorate("save", ({ prompt, response: { raw } }: {
		prompt: string,
		response: {
			raw: string,
		}
	}, store: { history: Res[] }): Res => {
		const ctx = {
			id: crypto.randomUUID(),
			timestamp: Date.now(),
			prompt,
			response: {
				raw,
			}
		}
		store.history.push(ctx);
		return ctx
	})
	.post('/prompt', async ({ run, body, save, store }) => {
		const res = await run(body.prompt);
		const saved = save(res, store)
		return saved
	}, {
		body: t.Object({
			prompt: t.String()
		}),
		async afterHandle(c) {
			await Bun.write('./public/history.json', JSON.stringify(c.store.history, null, 2))
		}
	})
