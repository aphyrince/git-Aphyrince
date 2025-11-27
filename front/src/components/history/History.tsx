import useHistoryStore from "../../stores/history/useHistoryStore";
import "./History.css";
const History = () => {
    const list = useHistoryStore((state) => state.list);
    return (
        <div className="section history">
            <header>header</header>
            <div className="history-content">
                <div className="history-grid category">
                    <p>graph</p>
                    <p>comment</p>
                    <p>date</p>
                    <p>author</p>
                    <p>commit</p>
                </div>
                <ul className="history-list">
                    {list.map((line) => (
                        <li className="history-grid history-item">
                            <p>{line.graph}</p>
                            <p>{line.comment}</p>
                            <p>{line.date}</p>
                            <p>{line.author}</p>
                            <p>{line.commit}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default History;
