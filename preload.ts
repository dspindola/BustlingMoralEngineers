import appConfig from "app.config";

await Bun.write(`${process.env.DIST_OUTDIR}/types/replit-config.d.ts`, `
    export interface Config ${Bun.inspect(Bun.TOML.parse(
        await Bun.file('.replit').text()
    ))}
`)


await Bun.write(`${process.env.DIST_OUTDIR}/types/bun-config.d.ts`, `
    export interface Config ${Bun.inspect(Bun.TOML.parse(
        await Bun.file('bunfig.toml').text()
    ))}
`)


await Bun.write(`${process.env.DIST_OUTDIR}/types/app-config.d.ts`, `
    export interface Config ${Bun.inspect(appConfig)}
`)
