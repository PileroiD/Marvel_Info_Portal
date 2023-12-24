import "./ComicList.scss";

const ComicList = () => {
    return (
        <div className="comicList">
            <div className="comicList-wrapper">
                <div className="comicList__item">
                    <img
                        src="/img/x-men.png"
                        alt="x-men"
                        className="comicList__item-img"
                    />
                    <div className="comicList__item-name">
                        ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB
                    </div>
                    <div className="comicList__item-price">9.99$</div>
                </div>
                <div className="comicList__item">
                    <img
                        src="/img/x-men.png"
                        alt="x-men"
                        className="comicList__item-img"
                    />
                    <div className="comicList__item-name">
                        ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB
                    </div>
                    <div className="comicList__item-price">9.99$</div>
                </div>
                <div className="comicList__item">
                    <img
                        src="/img/x-men.png"
                        alt="x-men"
                        className="comicList__item-img"
                    />
                    <div className="comicList__item-name">
                        ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB
                    </div>
                    <div className="comicList__item-price">9.99$</div>
                </div>
                <div className="comicList__item">
                    <img
                        src="/img/x-men.png"
                        alt="x-men"
                        className="comicList__item-img"
                    />
                    <div className="comicList__item-name">
                        ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB
                    </div>
                    <div className="comicList__item-price">9.99$</div>
                </div>
                <div className="comicList__item">
                    <img
                        src="/img/x-men.png"
                        alt="x-men"
                        className="comicList__item-img"
                    />
                    <div className="comicList__item-name">
                        ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB
                    </div>
                    <div className="comicList__item-price">9.99$</div>
                </div>
            </div>
            <button className="button-main long">LOAD MORE</button>
        </div>
    );
};

export default ComicList;
