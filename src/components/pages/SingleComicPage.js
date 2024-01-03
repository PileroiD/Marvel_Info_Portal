import "./SingleComicPage.scss";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import AppBanner from "../appBanner/AppBanner";

const SingleComicPage = () => {
    const params = useParams();
    const [comic, setComic] = useState(null);

    const { loading, error, getComic, clearError } = useMarvelService();

    useEffect(() => {
        onRequest();
    }, [params.id]);

    const onRequest = () => {
        clearError();
        getComic(params.id).then((data) => {
            setComic(data);
        });
    };

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !comic) ? (
        <View comic={comic} />
    ) : null;

    return (
        <>
            <AppBanner />
            <div className="singleComic">
                {spinner}
                {content}
                {errorMessage}
            </div>
        </>
    );
};

const View = ({ comic }) => {
    const { thumbnail, title, description, pageCount, language, price } = comic;

    return (
        <>
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

export default SingleComicPage;
