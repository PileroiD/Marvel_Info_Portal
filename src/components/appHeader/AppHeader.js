import "./AppHeader.scss";

const AppHeader = () => {
    return (
        <div className="appHeader">
            <div className="appHeader-text">
                <span>Marvel</span> information portal
            </div>
            <div className="appHeader-links">
                <a href="#" className="appHeader-link">
                    Characters
                </a>
                /
                <a href="#" className="appHeader-link">
                    Comics
                </a>
            </div>
        </div>
    );
};

export default AppHeader;
