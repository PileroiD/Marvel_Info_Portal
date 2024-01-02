import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./CharInfo.scss";
import Skeleton from "../skeleton/Skeleton";

const CharInfo = (props) => {
    const [char, setChar] = useState(null);

    const { loading, error, getCharacter, clearError } = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [props.charId]);

    const updateChar = () => {
        const { charId } = props;
        if (!charId) {
            return;
        }

        clearError();
        getCharacter(charId).then(onCharLoaded);
    };

    const onCharLoaded = (char) => {
        setChar(char);
    };

    const skeleton = char || loading || error ? null : <Skeleton />;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;

    return (
        <div className="charInfo">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    );
};

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = char;

    const imgFit = thumbnail.includes("image_not_available.jpg")
        ? { objectFit: "fill" }
        : { objectFit: "cover" };

    return (
        <>
            <div className="charInfo__info">
                <img
                    src={thumbnail}
                    alt={name}
                    className="charInfo__info-img"
                    style={imgFit}
                />
                <div className="charInfo__info-wrap">
                    <div className="charInfo__info-name">{name}</div>
                    <button className="button-main">
                        <a href={homepage}>HOMEPAGE</a>
                    </button>
                    <button className="button-main gray">
                        <a href={wiki}>WIKI</a>
                    </button>
                </div>
            </div>
            <div className="charInfo-text">
                {description
                    ? description
                    : "There's no description for this character"}
            </div>
            <div className="charInfo-comicsTitle">Comics:</div>
            <ul className="charInfo__comics">
                {comics.length
                    ? comics.map((item, i) => {
                          if (i < 10) {
                              return (
                                  <li key={i} className="charInfo__comics-item">
                                      {item.name}
                                  </li>
                              );
                          }
                      })
                    : "There's no comics for this character"}
            </ul>
        </>
    );
};

CharInfo.propTypes = {
    charId: PropTypes.number,
};

export default CharInfo;
