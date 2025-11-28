import { ChangeEvent } from "react";
import useThemeStore from "../../../stores/theme/useThemeStore";
import "./SettingModal.css";
import { BsXCircleFill } from "react-icons/bs";

const SettingModal = ({ onExit }: { onExit: () => void }) => {
    const { currentTheme, setTheme } = useThemeStore();

    const handleExit = () => {
        onExit();
    };

    const handleThemeChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const newTheme = { ...currentTheme, [name]: value };
        setTheme(newTheme);
        console.log(value);
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
                        <label>font color</label>
                        <input
                            name="fontColor"
                            type="color"
                            value={currentTheme.fontColor}
                            onChange={handleThemeChange}
                        />
                    </div>
                    <div className="setting-color">
                        <label>key color</label>
                        <input
                            name="keyColor"
                            type="color"
                            value={currentTheme.keyColor}
                            onChange={handleThemeChange}
                        />
                    </div>
                    <div className="setting-color">
                        <label>bg color</label>
                        <input
                            name="bgColor"
                            type="color"
                            value={currentTheme.bgColor}
                            onChange={handleThemeChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingModal;
