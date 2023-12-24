import { Component } from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import MarvelService from "../../services/MarvelService";

import "./RandomChar.scss";

class RandomChar extends Component {
    state = {
        char: {},
        loading: true,
        error: false,
    };

    marvelService = new MarvelService();

    componentDidMount = () => {
        this.updateChar();
        // this.timerId = setInterval(this.updateChar, 5000);
    };

    componentWillUnmount = () => {
        clearInterval(this.timerId);
    };

    onCharLoaded = (char) => {
        this.setState({ char, loading: false, error: false });
        clearTimeout(this.timeoutIdAfterError);
    };

    onCharLoading = () => {
        this.setState({
            loading: true,
        });
    };

    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.onCharLoading();
        this.marvelService
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    };

    onError = () => {
        this.setState({ loading: false, error: true });
        this.timeoutIdAfterError = setTimeout(() => this.updateChar, 5000);
    };

    onClickChangeChar = () => {
        this.updateChar();
        clearInterval(this.timerId);
    };

    render() {
        const { char, loading, error } = this.state;

        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? <View char={char} /> : null;

        return (
            <div className="random">
                <div className="randomChar">
                    {errorMessage}
                    {spinner}
                    {content}
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
                        onClick={this.onClickChangeChar}
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
    }
}

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki } = char;

    const imgFit = thumbnail.includes("image_not_available.jpg")
        ? { objectFit: "contain" }
        : { objectFit: "cover" };

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
