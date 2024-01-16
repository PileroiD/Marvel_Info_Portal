import "./FindChar.scss";

import { useFormik } from "formik";
import * as Yup from "yup";
import useMarvelService from "../../services/MarvelService";
import { useState } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";

const FindChar = () => {
    const [character, setCharacter] = useState(null);
    const { loading, error, getCharacterByName, clearError } =
        useMarvelService();

    const onCharLoaded = (char) => {
        setCharacter(char);
    };

    const updateChar = (name) => {
        clearError();

        getCharacterByName(name).then(onCharLoaded);
    };

    const formik = useFormik({
        initialValues: {
            name: "",
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(2, "The name is very short")
                .max(40, "The name is very long")
                .required("This field is required"),
        }),
        onSubmit: (values) => {
            updateChar(values.name);
        },
    });

    const errorMessage = error ? (
        <div className="char__search-critical-error">
            <ErrorMessage />
        </div>
    ) : null;

    const results = !character ? null : character.length > 0 ? (
        <div className="success_wrapper">
            <div className="success">
                There is! Visit {character[0].name} page?
            </div>
            <Link
                to={`/character/${character[0].id}`}
                style={{ marginTop: "14px", marginLeft: "31px" }}
            >
                <button className="button-main gray">TO PAGE</button>
            </Link>
        </div>
    ) : (
        <div className="error">
            The character was not found. Check the name and try again
        </div>
    );

    return (
        <div className="findChar">
            <form className="form" onSubmit={formik.handleSubmit}>
                <div className="form-title">Or find a character by name:</div>
                <input
                    className="form-input"
                    type="text"
                    placeholder="Enter name"
                    name="name"
                    required
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />

                <button
                    type="submit"
                    className="button-main"
                    disabled={loading}
                >
                    FIND
                </button>
            </form>
            {formik.errors.name && formik.touched.name ? (
                <div className="error">{formik.errors.name}</div>
            ) : null}
            {results}
            {errorMessage}
        </div>
    );
};

export default FindChar;
