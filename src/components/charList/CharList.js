import { useEffect, useRef, useState } from "react";
import { Transition } from "react-transition-group";
import PropTypes from "prop-types";
import "./CharList.scss";

import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import useMarvelService from "../../services/MarvelService";

const CharList = ({ onCharSelected }) => {
    const [charList, setCharList] = useState([]);
    const [newItemsLoading, setNewItemsLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const { loading, error, getAllCharacters } = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setNewItemsLoading(false) : setNewItemsLoading(true);
        getAllCharacters(offset).then(onCharactersLoaded);
    };

    const onCharactersLoaded = async (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        setCharList((prevCharList) => [...prevCharList, ...newCharList]);
        setNewItemsLoading(false);
        setOffset((prevOffset) => prevOffset + 9);
        setCharEnded(ended);
    };

    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current[id].focus();
    };

    const createItems = (charList) => {
        return charList.map((item, i) => {
            const imgFit = item.thumbnail.includes("image_not_available.jpg")
                ? { objectFit: "fill" }
                : { objectFit: "cover" };

            return (
                <div
                    key={item.id}
                    tabIndex={0}
                    className="charList__item"
                    onClick={() => {
                        onCharSelected(item.id);
                        focusOnItem(i);
                    }}
                    ref={(el) => (itemRefs.current[i] = el)}
                    onKeyPress={(e) => {
                        if (e.key === " " || e.key === "Enter") {
                            onCharSelected(item.id);
                            focusOnItem(i);
                        }
                    }}
                >
                    <img
                        src={item.thumbnail}
                        alt="img_marvel"
                        className="charList__item-img"
                        style={imgFit}
                    />
                    <div className="charList__item-info">
                        <div className="charList__item-name">{item.name}</div>
                    </div>
                </div>
            );
        });
    };

    const items = createItems(charList);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newItemsLoading ? <Spinner /> : null;

    let charListStyles = {};
    if (errorMessage || spinner) {
        charListStyles = {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
        };
    }

    return (
        <div className="charList" style={charListStyles}>
            {spinner}
            {errorMessage}
            {items && <div className="charList__wrapper">{items}</div>}
            <button
                disabled={newItemsLoading}
                onClick={() => onRequest(offset, false)}
                className="button-main long"
                style={{ display: `${charEnded ? "none" : "block"}` }}
            >
                LOAD MORE
            </button>
        </div>
    );
};

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
