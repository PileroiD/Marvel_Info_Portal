import "./AppBanner.scss";

const AppBanner = () => {
    return (
        <div className="appBanner">
            <img
                src="/img/Avengers.png"
                alt="Avengers.png"
                className="appBanner-avngrs"
            />
            <div className="appBanner-text">
                New comics every week! <br /> Stay tuned!
            </div>
            <img
                src="/img/Avengers_logo.png"
                alt="Avengers_logo.png"
                className="appBanner-logo"
            />
        </div>
    );
};

export default AppBanner;
