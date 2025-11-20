import "./App.css";
import CmdList from "./components/cmd-list/CmdList";
import Prompt from "./components/prompt/Prompt";
import History from "./components/history/History";
import Option from "./components/option/Option";

const App = () => {
    return (
        <div className="app-container">
            <Option />
            <div className="content">
                <CmdList />
                <Prompt />
                <History />
            </div>
        </div>
    );
};

export default App;
