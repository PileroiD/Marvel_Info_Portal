import { useState } from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import FindChar from "../findChar/FindChar";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import ComicList from "../comicList/ComicList";
import AppBanner from "../appBanner/AppBanner";

import "./App.scss";

const App = () => {
    const [selectedChar, setSelectedChar] = useState(null);

    const onCharSelected = (id) => {
        setSelectedChar(id);
    };

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
                        <CharList onCharSelected={onCharSelected} />
                    </ErrorBoundary>
                    <div className="character__info">
                        <ErrorBoundary>
                            <CharInfo charId={selectedChar} />
                        </ErrorBoundary>
                        <FindChar />
                    </div>
                </div>
                {/* <ComicList /> */}
                <img
                    className="bg-decoration"
                    src="/img/vision.png"
                    alt="vision"
                />

                {/* <SingleComic /> */}
                {/* <SingleChar /> */}
            </div>
        </div>
    );
};

export default App;
