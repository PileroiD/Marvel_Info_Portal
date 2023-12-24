import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import FindChar from "../findChar/FindChar";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import { Component } from "react";

import "./App.scss";

class App extends Component {
    state = {
        selectedChar: null,
    };

    onCharSelected = (id) => {
        this.setState({ selectedChar: id });
    };

    render() {
        return (
            <div className="app">
                <div className="container">
                    <AppHeader />
                    {/* <AppBanner /> */}
                    <ErrorBoundary>
                        <RandomChar />
                    </ErrorBoundary>
                    <div className="character">
                        <ErrorBoundary>
                            <CharList onCharSelected={this.onCharSelected} />
                        </ErrorBoundary>
                        <div className="character__info">
                            <ErrorBoundary>
                                <CharInfo charId={this.state.selectedChar} />
                            </ErrorBoundary>
                            <FindChar />
                        </div>
                    </div>
                    <img
                        className="bg-decoration"
                        src="/img/vision.png"
                        alt="vision"
                    />

                    {/* <ComicList /> */}
                    {/* <SingleComic /> */}
                    {/* <SingleChar /> */}
                </div>
            </div>
        );
    }
}

export default App;
