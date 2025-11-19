import CmdElem from "./cmd-elem/CmdElem";
import "./CmdList.css";
import { BsFilePlusFill } from "react-icons/bs";

const CmdList = () => {
    return (
        <div className="section cmd-list">
            <ul>
                <CmdElem text="git status" />
                <CmdElem text="git add ./front" />
                <CmdElem text="git commit -m 'commit with command parameters.'" />
            </ul>
            <div className="cmd-controls">
                <input className="text" type="text" title="input new command" />
                <button className="add" title="add new command">
                    <BsFilePlusFill size={40} />
                </button>
            </div>
        </div>
    );
};

export default CmdList;
