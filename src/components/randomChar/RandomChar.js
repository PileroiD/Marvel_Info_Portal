import { useEffect, useState } from "react";
import "./RandomChar.scss";

import useMarvelService from "../../services/MarvelService";

import setContent from "../../utils/setContent";

const RandomChar = () => {
    const [char, setChar] = useState({});
    const { getCharacter, clearError, process, setProcess } =
        useMarvelService();

    useEffect(() => {
        updateChar();
        // const timerId = setInterval(updateChar, 5000);

        // return () => {
        //     clearInterval(timerId);
        // };
    }, []);

    const onCharLoaded = (char) => {
        setChar(char);
    };

    const updateChar = () => {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        getCharacter(id)
            .then((character) => onCharLoaded(character))
            .then(() => setProcess("confirmed"));
    };

    const onClickChangeChar = () => {
        updateChar();
    };

    // const errorMessage = error ? <ErrorMessage /> : null;
    // const spinner = loading ? <Spinner /> : null;
    // const content = !(loading || error) ? <View char={char} /> : null;

    return (
        <div className="random">
            <div className="randomChar">
                {/* {errorMessage}
                {spinner}
                {content} */}

                {setContent(process, View, char)}
            </div>

            <div className="randomChange">
                <div className="randomChange-text">
                    Random character for today! <br /> Do you want to get to
                    know him better?
                </div>
                <div className="randomChange-text text-2">
                    Or choose another one
                </div>
                <button
                    onClick={onClickChangeChar}
                    className="button-main bgGray"
                >
                    TRY IT
                </button>
                <img
                    src="/img/mjolnir.png"
                    alt="mjolnir"
                    className="randomChange-img"
                />
            </div>
        </div>
    );
};

const View = ({ data }) => {
    const { name, description, thumbnail, homepage, wiki } = data;

    const imgFit = thumbnail
        ? thumbnail.includes("image_not_available.jpg")
            ? { objectFit: "contain" }
            : { objectFit: "cover" }
        : null;

    const checkDescription = (descr) => {
        return descr
            ? descr.substring(0, 210) + "..."
            : "There's no description for this character";
    };

    return (
        <>
            <img
                src={thumbnail}
                alt="character"
                className="randomChar-img"
                style={imgFit}
            />
            <div className="randomChar-info">
                <div className="randomChar-name">{name}</div>
                <div className="randomChar-text">
                    {checkDescription(description)}
                </div>
                <div className="randomChar-btns">
                    <button className="button-main">
                        <a href={homepage}>HOMEPAGE</a>
                    </button>
                    <button className="button-main gray">
                        <a href={wiki}>WIKI</a>
                    </button>
                </div>
            </div>
        </>
    );
};

export default RandomChar;
