import { Helmet } from "react-helmet";

import "./SingleComicLayout.scss";
import { Link } from "react-router-dom";

const SingleComicLayout = ({ data }) => {
    const { thumbnail, title, description, pageCount, language, price } = data;

    return (
        <>
            <Helmet>
                <meta name="description" content={`${title} comic book`} />
                <title>{title}</title>
            </Helmet>
            <img
                src={thumbnail}
                alt={title}
                className="singleComic-img"
                style={{ objectFit: "fill" }}
            />
            <div className="singleComic__info">
                <div className="singleComic__info-name">{title}</div>
                <div className="singleComic__info-text">{description}</div>
                <div className="singleComic__info-pages">{pageCount}</div>
                <div className="singleComic__info-lang">
                    Language: {language}
                </div>
                <div className="singleComic__info-price">{price}</div>
            </div>
            <div className="singleComic-btn">
                <Link
                    to="/comics"
                    className="singleComic-goBack"
                    style={{ color: "#000" }}
                >
                    Back to all
                </Link>
            </div>
        </>
    );
};

export default SingleComicLayout;
