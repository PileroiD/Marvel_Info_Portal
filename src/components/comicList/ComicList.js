import "./ComicList.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

const setContent = (process, Component, newItemsLoading) => {
    switch (process) {
        case "waiting":
            return <Spinner />;
        case "loading":
            return newItemsLoading ? <Component /> : <Spinner />;
        case "confirmed":
            return <Component />;
        case "error":
            return <ErrorMessage />;
        default:
            throw new Error("Unexpected process state");
    }
};

const ComicList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [newItemsLoading, setNewItemsLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [comicsEnded, setComicsEnded] = useState(false);

    const { getAllComics, clearError, process, setProcess } =
        useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setNewItemsLoading(false) : setNewItemsLoading(true);

        clearError();
        getAllComics(offset)
            .then(onComicsLoaded)
            .then(() => setProcess("confirmed"));
    };

    const onComicsLoaded = (newComicsList) => {
        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        }

        setComicsList((prevComicsList) => [
            ...prevComicsList,
            ...newComicsList,
        ]);
        setNewItemsLoading(false);
        setOffset((prevOffset) => prevOffset + 8);
        setComicsEnded(ended);
    };

    const createItems = (itemsList) => {
        return itemsList.map((item) => {
            return (
                <div className="comicList__item" key={item.id}>
                    <Link
                        style={{
                            textDecoration: "none",
                            color: "#000",
                        }}
                        to={`/comics/${item.id}`}
                    >
                        <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="comicList__item-img"
                        />
                        <div className="comicList__item-name">{item.title}</div>
                        <div className="comicList__item-price">
                            {item.price}
                        </div>
                    </Link>
                </div>
            );
        });
    };

    // const items = createItems(comicsList);
    // const errorMessage = error ? <ErrorMessage /> : null;
    // const spinner = loading && !newItemsLoading ? <Spinner /> : null;

    const wrapperDisplayStyle =
        process === "loading"
            ? { display: "flex", flexWrap: "wrap" }
            : { display: "grid" };

    return (
        <div className="comicList">
            <div className="comicList-wrapper" style={wrapperDisplayStyle}>
                {/* {spinner}
                {errorMessage}
                {items} */}

                {setContent(
                    process,
                    () => createItems(comicsList),
                    newItemsLoading
                )}
            </div>
            <button
                disabled={newItemsLoading}
                style={{
                    display: comicsEnded ? "none" : "block",
                }}
                onClick={() => onRequest(offset)}
                className="button-main long"
            >
                LOAD MORE
            </button>
        </div>
    );
};

export default ComicList;
