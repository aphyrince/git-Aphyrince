import { BiSolidBrightness } from "react-icons/bi";
import { useState } from "react";
import SettingModal from "./settingModal/SettingModal";
import styled from "styled-components";
import RepoList from "./RepoList/RepoList";

const Wrapper = styled.div`
    width: 100%;
    height: 8vh;
    background-color: var(--key-color);
    color: var(--font-color);

    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    position: relative;
`;

const Section = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    gap: 10px;
`;

const Button = styled.div`
    width: fit-content;
    height: fit-content;

    border: none;
    background: none;
    border-radius: 4px;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
    transition: all 0.2s ease-in-out;
    color: var(--font-color);

    &:hover {
        color: var(--bg-color);
    }
`;

const Header = () => {
    const [isSetting, setIsSetting] = useState(false);

    return (
        <Wrapper>
            <Section>
                <RepoList />
            </Section>
            <Section>
                <Button title="setting" onClick={() => setIsSetting(true)}>
                    <BiSolidBrightness size={48} />
                </Button>
            </Section>
            {isSetting && <SettingModal onExit={() => setIsSetting(false)} />}
        </Wrapper>
    );
};

export default Header;
