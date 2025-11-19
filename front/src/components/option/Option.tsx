import "./Option.css";
import { BiSolidBrightness, BiSolidFilePlus } from "react-icons/bi";

const Option = () => {
    return (
        <div className="option">
            <div className="option-section left">
                <button className="repo-add-btn" title="add repository">
                    <BiSolidFilePlus size={40} />
                </button>
            </div>
            <div className="option-section right">
                <button className="setting-btn" title="setting">
                    <BiSolidBrightness size={40} />
                </button>
            </div>
        </div>
    );
};

export default Option;
