import "./SettingModal.css";

const SettingModal = ({ onExit }: { onExit: () => void }) => {
    const handleExit = () => {
        onExit();
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
                    <button onClick={handleExit}>X</button>
                </div>
                <div className="setting-content">
                    <div className="setting-font-color">
                        <label>font color</label>
                        <input name="fontcolor" type="color" />
                    </div>
                    <div className="setting-key-color">
                        <label>key color</label>
                        <input name="keycolor" type="color" />
                    </div>
                    <div className="setting-bg-color">
                        <label>bg color</label>
                        <input name="bgcolor" type="color" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingModal;
