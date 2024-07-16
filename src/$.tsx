import type { Context } from "elysia"
import type { ReactNode } from "react"
import React from "react"
import { renderToReadableStream } from "react-dom/server"

export function $Route(Component: (props: { params: any, query: any, path: any, store: any }) => ReactNode | Promise<ReactNode>): (c: Context) => Promise<Response> {
	return async (ctx: Context) => {
		const _P = await Component(ctx)

		const stream = await renderToReadableStream(
			<React.Suspense fallback={null}>
				{_P}
			</React.Suspense>
		)

		await stream.allReady

		return new Response(stream, {
			headers: {
				'Content-Type': 'text/html; charset=utf-8',
			}
		})
	}
}