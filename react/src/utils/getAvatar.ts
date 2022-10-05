const getAvatar = (path?: string) => {
    return (process.env.NODE_ENV == "development" ? '' : window.__dirname) + path;
}
export default getAvatar;