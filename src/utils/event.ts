//@ts-ignore
const { ipcRenderer } = window.electron

export const event = (name: string, params: any[] = [], callback: Function | null = null) => {
    ipcRenderer.send.apply(this, [name, ...params]);
    if (callback) ipcRenderer.once(name, callback);
}
export const onEvent = (name: string, callback: Function) => {
    ipcRenderer.on(name, callback);
}