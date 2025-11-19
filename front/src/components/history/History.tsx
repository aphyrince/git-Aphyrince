import "./History.css";
const History = () => {
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
                    <li className="history-grid history-item">
                        <p>graph</p>
                        <p>comment</p>
                        <p>date</p>
                        <p>author</p>
                        <p>commit</p>
                    </li>
                    <li className="history-grid history-item">
                        <p>graph</p>
                        <p>comment</p>
                        <p>date</p>
                        <p>author</p>
                        <p>commit</p>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default History;
