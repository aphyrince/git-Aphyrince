import "./Prompt.css";
import { BsArrowRightSquareFill } from "react-icons/bs";
const Prompt = () => {
    return (
        <div className="section prompt">
            <div className="list">
                <ul>
                    <li className="cmd">
                        <p>명령1</p>
                    </li>
                    <li className="result">
                        <p>결과 1</p>
                    </li>
                    <li className="cmd">
                        <p>명령2</p>
                    </li>
                    <li className="result">
                        <p>결과 2</p>
                    </li>
                    <li className="cmd">
                        <p>명령3</p>
                    </li>
                    <li className="result">
                        <p>결과 3</p>
                    </li>
                    <li className="cmd">
                        <p>명령4</p>
                    </li>
                    <li className="result">
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has
                            survived not only five centuries, but also the leap
                            into electronic typesetting, remaining essentially
                            unchanged. It was popularised in the 1960s with the
                            release of Letraset sheets containing Lorem Ipsum
                            passages, and more recently with desktop publishing
                            software like Aldus PageMaker including versions of
                            Lorem Ipsum. Lorem Ipsum is simply dummy text of the
                            printing and typesetting industry. Lorem Ipsum has
                            been the industry's standard dummy text ever since
                            the 1500s, when an unknown printer took a galley of
                            type and scrambled it to make a type specimen book.
                            It has survived not only five centuries, but also
                            the leap into electronic typesetting, remaining
                            essentially unchanged. It was popularised in the
                            1960s with the release of Letraset sheets containing
                            Lorem Ipsum passages, and more recently with desktop
                            publishing software like Aldus PageMaker including
                            versions of Lorem Ipsum. Lorem Ipsum is simply dummy
                            text of the printing and typesetting industry. Lorem
                            Ipsum has been the industry's standard dummy text
                            ever since the 1500s, when an unknown printer took a
                            galley of type and scrambled it to make a type
                            specimen book. It has survived not only five
                            centuries, but also the leap into electronic
                            typesetting, remaining essentially unchanged. It was
                            popularised in the 1960s with the release of
                            Letraset sheets containing Lorem Ipsum passages, and
                            more recently with desktop publishing software like
                            Aldus PageMaker including versions of Lorem Ipsum.
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has
                            survived not only five centuries, but also the leap
                            into electronic typesetting, remaining essentially
                            unchanged. It was popularised in the 1960s with the
                            release of Letraset sheets containing Lorem Ipsum
                            passages, and more recently with desktop publishing
                            software like Aldus PageMaker including versions of
                            Lorem Ipsum.
                        </p>
                    </li>
                </ul>
            </div>
            <div className="input">
                <input className="cmd" type="text" title="command" />
                <button className="enter" title="execute">
                    <BsArrowRightSquareFill size={40} />
                </button>
            </div>
        </div>
    );
};

export default Prompt;
