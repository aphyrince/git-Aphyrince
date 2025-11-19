import "./App.css";
import CmdList from "./components/cmd-list/CmdList";
import Dialog from "./components/dialog/Dialog";
import History from "./components/history/History";
import Option from "./components/option/Option";
import "./shared.css";
const App = () => {
    return (
        <div className="app-container">
            <Option />
            <div className="content">
                <CmdList />
                <Dialog />
                <History />
            </div>
        </div>
    );
};

export default App;
