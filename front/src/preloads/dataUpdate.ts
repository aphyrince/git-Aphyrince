import { Data } from "../global";

async function dataUpdate(data: Data) {
    const result = await window.store.dataUpdate(data);
    return result;
}

export default dataUpdate;
