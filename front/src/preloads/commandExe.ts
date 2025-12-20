async function commandExe(path: string, command: string) {
    const result = await window.store.commandExe(path, command);
    return result;
}

export default commandExe;
