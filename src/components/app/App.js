import "./App.scss";

import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";
// import { MainPage, ComicsPage, SingleComicPage } from "../pages";

const Page404 = lazy(() => import("../pages/404"));
const MainPage = lazy(() => import("../pages/MainPage"));
const ComicsPage = lazy(() => import("../pages/ComicsPage"));
const SinglePage = lazy(() => import("../pages/SinglePage.js"));
const SingleComicLayout = lazy(() =>
    import("../pages/SingleComicLayout/SingleComicLayout")
);
const SingleCharacterLayout = lazy(() =>
    import("../pages/SingleCharacterLayout/SingleCharacterLayout")
);

const App = () => {
    return (
        <Router>
            <div className="app">
                <div className="container">
                    <AppHeader />

                    <Suspense fallback={<Spinner />}>
                        <Routes>
                            <Route path="/" element={<MainPage />} />
                            <Route path="/comics" element={<ComicsPage />} />
                            <Route
                                exact
                                path="/comics/:id"
                                element={
                                    <SinglePage
                                        Component={SingleComicLayout}
                                        dataType="comic"
                                    />
                                }
                            ></Route>
                            <Route
                                exact
                                path="/character/:id"
                                element={
                                    <SinglePage
                                        Component={SingleCharacterLayout}
                                        dataType="character"
                                    />
                                }
                            ></Route>
                            <Route path="*" element={<Page404 />} />
                        </Routes>
                    </Suspense>
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
