import { Helmet } from "react-helmet";

import { Link } from "react-router-dom";
import "../SingleComicLayout/SingleComicLayout.scss";
import "./SingleCharacterLayout.scss";

const SingleCharacterLayout = ({ data }) => {
    const { name, description, thumbnail } = data;

    return (
        <>
            <Helmet>
                <meta name="description" content={`${name} character`} />
                <title>{name}</title>
            </Helmet>
            <img
                src={thumbnail}
                alt={name}
                className="singleComic-img"
                style={{ objectFit: "fill", height: "293px" }}
            />
            <div className="singleComic__info">
                <div className="singleComic__info-name">{name}</div>
                <div className="singleComic__info-text">
                    {description
                        ? description
                        : "There's no description for this character"}
                </div>
            </div>
            <div className="singleComic-btn">
                <Link
                    to="/"
                    className="singleComic-goBack"
                    style={{ color: "#000" }}
                >
                    Go back
                </Link>
            </div>
        </>
    );
};

export default SingleCharacterLayout;
