declare module "bun" {
	interface Env {
		HOSTNAME: string
		PORT: string
		NODE_ENV: "development" | "production" | "test"
		ORIGIN: string
		SSR?: boolean
		PLATFORM: "cloud" | "local"
		OUTDIR: string
		AI_API_KEY: string
		DEV: boolean
		PROD: boolean
		MODE: "development" | "production" | "test"
		ASSETS_PREFIX: string
		DIST_PREFIX: string
		DIST_OUTDIR: string
		CONFIG_PATH: string
	}
}