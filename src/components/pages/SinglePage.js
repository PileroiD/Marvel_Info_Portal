import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useMarvelService from "../../services/MarvelService";
import { ErrorMessage } from "formik";
import Spinner from "../spinner/Spinner";
import AppBanner from "../appBanner/AppBanner";

const SinglePage = ({ Component, dataType }) => {
    const { id } = useParams();
    const [data, setData] = useState(null);

    const { loading, error, getComic, getCharacter, clearError } =
        useMarvelService();

    useEffect(() => {
        onRequest();
    }, [id]);

    const onRequest = () => {
        clearError();

        switch (dataType) {
            case "comic":
                getComic(id).then(onDataLoaded);
                break;
            case "character":
                getCharacter(id).then(onDataLoaded);
                break;
            default:
                return;
        }
    };

    const onDataLoaded = (data) => {
        setData(data);
    };

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !data) ? (
        <Component data={data} />
    ) : null;

    return (
        <>
            <AppBanner />
            <div className="singleComic">
                {errorMessage}
                {spinner}
                {content}
            </div>
        </>
    );
};

export default SinglePage;
