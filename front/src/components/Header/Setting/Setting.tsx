import { BiSolidBrightness } from "react-icons/bi";
import { Button } from "../Header";
import SettingModal from "../settingModal/SettingModal";
import { useState } from "react";

const Setting = () => {
    const [isSetting, setIsSetting] = useState(false);

    return (
        <>
            <Button title="setting" onClick={() => setIsSetting(true)}>
                <BiSolidBrightness size={48} />
            </Button>
            {isSetting && <SettingModal onExit={() => setIsSetting(false)} />}
        </>
    );
};

export default Setting;
