const config = (env) => {
    return import.meta.env[env]
}

export {
    config
}