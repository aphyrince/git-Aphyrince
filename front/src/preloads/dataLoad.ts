async function dataLoad() {
    const data = await window.store.dataLoad();
    return data;
}

export default dataLoad;
