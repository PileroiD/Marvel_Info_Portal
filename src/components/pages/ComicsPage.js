import { Helmet } from "react-helmet";

import ComicList from "../comicList/ComicList";
import AppBanner from "../appBanner/AppBanner";

const ComicsPage = () => {
    return (
        <>
            <Helmet>
                <meta name="description" content="Page of comics list" />
                <title>Comics Page</title>
            </Helmet>
            <AppBanner />
            <ComicList />
        </>
    );
};

export default ComicsPage;
