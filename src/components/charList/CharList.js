import { Component, createRef } from "react";
import PropTypes from "prop-types";

import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

import "./CharList.scss";
import MarvelService from "../../services/MarvelService";

class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false,
        newItemsLoading: false,
        offset: 210,
        charEnded: false,
    };

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest();
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService
            .getAllCharacters(offset)
            .then(this.onCharactersLoaded)
            .catch(this.onError);
    };

    onCharListLoading = () => {
        this.setState({
            newItemsLoading: true,
        });
    };

    onCharactersLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        this.setState(({ offset, charList }) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newItemsLoading: false,
            offset: offset + 9,
            charEnded: ended,
        }));
    };

    onError = () => {
        this.setState({ loading: false, error: true });
    };

    itemRefs = [];

    setRef = (ref) => {
        this.itemRefs.push(ref);
    };

    focusOnItem = (id) => {
        this.itemRefs[id].focus();
    };

    createItems = (charList) => {
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
                        this.props.onCharSelected(item.id);
                        this.focusOnItem(i);
                    }}
                    ref={this.setRef}
                    onKeyPress={(e) => {
                        if (e.key === " " || e.key === "Enter") {
                            this.props.onCharSelected(item.id);
                            this.focusOnItem(i);
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

    render() {
        const { charList, loading, error, newItemsLoading, offset, charEnded } =
            this.state;

        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? this.createItems(charList) : null;

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
                {content && <div className="charList__wrapper">{content}</div>}
                <button
                    disabled={newItemsLoading}
                    onClick={() => this.onRequest(offset)}
                    className="button-main long"
                    style={{ display: `${charEnded ? "none" : "block"}` }}
                >
                    LOAD MORE
                </button>
            </div>
        );
    }
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
