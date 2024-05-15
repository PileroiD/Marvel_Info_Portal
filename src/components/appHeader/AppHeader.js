import "./AppHeader.scss";

import { NavLink, useLocation } from "react-router-dom";

const AppHeader = () => {
    const location = useLocation();

    return (
        <div className="appHeader">
            <div className="appHeader-text">
                <span>Marvel</span> information portal
            </div>
            <div className="appHeader-links">
                <NavLink
                    to={
                        location.pathname.includes("character")
                            ? `${location.pathname}`
                            : "/"
                    }
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
