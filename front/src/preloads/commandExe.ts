async function commandExe(command: string) {
    const result = await window.store.commandExe(command);
    return result;
}

export default commandExe;
