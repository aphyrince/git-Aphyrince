import { ChangeEvent } from "react";
import { BsXCircleFill } from "react-icons/bs";
import useThemeStore from "../../../stores/theme/useThemeStore";
import styled from "styled-components";
import { Button } from "../Header";

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.63);
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--font-color);
`;

const SettingContent = styled.div`
    background-color: var(--bg-color);
    border-radius: 16px;
    width: 600px;
    height: 400px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    overflow: hidden;
`;

const SettingHeader = styled.div`
    width: 100%;
    height: 32px;
    background-color: var(--key-color);
    padding: 0px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Theme = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: start;
    gap: 16px;
    align-items: start;
    width: 100%;
    padding: 16px;
    font-size: 24px;
`;

const Color = styled.div`
    display: grid;
    grid-template-columns: 150px 50px;
`;

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
        <Wrapper onClick={handleExit}>
            <SettingContent
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <SettingHeader>
                    <span>Setting</span>
                    <Button onClick={handleExit}>
                        <BsXCircleFill size={24} />
                    </Button>
                </SettingHeader>
                <Theme>
                    <Color>
                        <label>Dark Mode</label>
                        <input
                            name="mode"
                            type="checkbox"
                            checked={mode === "dark"}
                            onChange={handleThemeChange}
                        />
                    </Color>
                    <Color>
                        <label>key color</label>
                        <input
                            name="keyColor"
                            type="color"
                            value={keyColor}
                            onChange={handleKeyColorChange}
                        />
                    </Color>
                </Theme>
            </SettingContent>
        </Wrapper>
    );
};

export default SettingModal;
