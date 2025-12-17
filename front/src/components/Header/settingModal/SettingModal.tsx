import { ChangeEvent } from "react";

import "./SettingModal.css";
import { BsXCircleFill } from "react-icons/bs";
import useThemeStore from "../../../stores/theme/useThemeStore";

const SettingModal = ({ onExit }: { onExit: () => void }) => {
    const { mode, keyColor, toggleMode, setKeyColor } = useThemeStore();

    const handleExit = () => {
        onExit();
    };

    const handleThemeChange = (e: ChangeEvent<HTMLInputElement>) => {
        toggleMode();
    };

    const handleKeyColorChange = (e: ChangeEvent<HTMLInputElement>) => {
        setKeyColor(e.target.value);
    };

    return (
        <div className="modal-setting" onClick={handleExit}>
            <div
                className="setting-container"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div className="setting-header">
                    <span>Setting</span>
                    <button className="option-button" onClick={handleExit}>
                        <BsXCircleFill size={24} />
                    </button>
                </div>
                <div className="setting-content">
                    <div className="setting-color">
                        <label>Dark Mode</label>
                        <input
                            name="mode"
                            type="checkbox"
                            checked={mode === "dark"}
                            onChange={handleThemeChange}
                        />
                    </div>
                    <div className="setting-color">
                        <label>key color</label>
                        <input
                            name="keyColor"
                            type="color"
                            value={keyColor}
                            onChange={handleKeyColorChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingModal;
