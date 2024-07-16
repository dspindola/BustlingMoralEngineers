
declare module "*.replit" {
    const content: import('./.out/types/replit-config').Config
    export default content
}

declare module "$app/config" {
    const content: import('./.out/types/app-config').Config
    export default content
}

declare module "bunfig.toml" {
    const content: import('./.out/types/bun-config').Config
    export default content
}