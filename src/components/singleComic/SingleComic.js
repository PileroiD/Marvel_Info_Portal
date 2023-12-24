import "./SingleComic.scss";

const SingleComic = () => {
    return (
        <div className="singleComic">
            <img src="/img/UW.png" alt="avengers" className="singleComic-img" />
            <div className="singleComic__info">
                <div className="singleComic__info-name">
                    X-Men: Days of Future Past
                </div>
                <div className="singleComic__info-text">
                    Re-live the legendary first journey into the dystopian
                    future of 2013 - where Sentinels stalk the Earth, and the
                    X-Men are humanity's only hope...until they die! Also
                    featuring the first appearance of Alpha Flight, the return
                    of the Wendigo, the history of the X-Men from Cyclops
                    himself...and a demon for Christmas!?
                </div>
                <div className="singleComic__info-pages">144 pages</div>
                <div className="singleComic__info-lang">Language: en-us</div>
                <div className="singleComic__info-price">9.99$</div>
            </div>
            <div className="singleComic-btn">
                <div className="singleComic-goBack">Back to all</div>
            </div>
        </div>
    );
};

export default SingleComic;
