import "./App.scss";

import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";
// import { MainPage, ComicsPage, SingleComicPage } from "../pages";

const Page404 = lazy(() => import("../pages/404"));
const MainPage = lazy(() => import("../pages/MainPage"));
const ComicsPage = lazy(() => import("../pages/ComicsPage"));
const SingleComicPage = lazy(() => import("../pages/SingleComicPage"));

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
                                path="/comics/:id"
                                element={<SingleComicPage />}
                            />
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
