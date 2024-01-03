import "./AppHeader.scss";

import { NavLink } from "react-router-dom";

const AppHeader = () => {
    return (
        <div className="appHeader">
            <div className="appHeader-text">
                <span>Marvel</span> information portal
            </div>
            <div className="appHeader-links">
                <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                        "appHeader-link" + (isActive ? " active" : "")
                    }
                >
                    Characters
                </NavLink>
                /
                <NavLink
                    to="/comics"
                    className={({ isActive }) =>
                        "appHeader-link" + (isActive ? " active" : "")
                    }
                >
                    Comics
                </NavLink>
            </div>
        </div>
    );
};

export default AppHeader;
