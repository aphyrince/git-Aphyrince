import { BsTextWrap, BsThreeDots } from "react-icons/bs";
import "./CmdElem.css";
const CmdElem = ({ text }: { text: string }) => {
    return (
        <li className="cmd-elem" title="excute">
            <p>{text}</p>
            <button title="execute with parameter">
                <BsTextWrap />
            </button>
        </li>
    );
};

export default CmdElem;
