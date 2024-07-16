import { defineConfig } from "lib/config";

export default defineConfig({
	configs: [
		{
			name: "server",
			type: "http",
			build: {
				target: "bun",
				outdir: import.meta.env.DIST_OUTDIR,
				format: "esm",
				sourcemap: "linked",
				naming: 'server/[dir]/[name].[ext]'
			},
			handler: "src/server.tsx"
		}
	]
})