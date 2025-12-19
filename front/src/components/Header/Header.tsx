import styled from "styled-components";
import RepoList from "./RepoList/RepoList";
import Setting from "./Setting/Setting";

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

export const Button = styled.button`
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
    return (
        <Wrapper>
            <Section>
                <RepoList />
            </Section>
            <Section>
                <Setting />
            </Section>
        </Wrapper>
    );
};

export default Header;
