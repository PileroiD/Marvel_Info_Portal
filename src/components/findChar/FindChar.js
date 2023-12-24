import "./FindChar.scss";

const FindChar = () => {
    return (
        <div className="findChar">
            <form className="form">
                <div className="form-title">Or find a character by name:</div>
                <input
                    className="form-input"
                    type="text"
                    placeholder="Enter name"
                    name="name"
                />
                <button type="submit" className="button-main">
                    FIND
                </button>
            </form>
        </div>
    );
};

export default FindChar;
