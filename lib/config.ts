import type { BuildConfig, Env } from "bun";

export type BuildType<T extends ConfigType> = {
	type: T;
	build: Partial<BuildConfig>;
	handler: string
};

export type ConfigType = "http" | "static" | "assets";

export type UserConfig = {
	configs: ({
		name: string,
	} & BuildType<ConfigType>)[],
	env: Env
}

export function defineConfig(config: UserConfig) {
	return config;
}
