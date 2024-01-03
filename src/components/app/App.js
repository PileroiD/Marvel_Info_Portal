import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import { MainPage, ComicsPage, Page404, SingleComicPage } from "../pages";

import "./App.scss";

const App = () => {
    return (
        <Router>
            <div className="app">
                <div className="container">
                    <AppHeader />

                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/comics" element={<ComicsPage />} />
                        <Route
                            path="/comics/:id"
                            element={<SingleComicPage />}
                        />
                        <Route path="*" element={<Page404 />} />
                    </Routes>
                    <img
                        className="bg-decoration"
                        src="/img/vision.png"
                        alt="vision"
                    />

                    {/* <SingleComic /> */}
                    {/* <SingleChar /> */}
                </div>
            </div>
        </Router>
    );
};

export default App;
