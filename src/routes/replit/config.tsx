
export function ReplitConfigRoute(props: {
    store: {
        replit: {
            config: import('.out/types/replit-config').Config
        }
    }
}) {
    const { config } = props.store.replit
    return <pre>
        {JSON.stringify(config.modules, null, 2)}
    </pre>
}

