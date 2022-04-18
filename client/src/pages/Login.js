import React from "react";
import * as yup from "yup";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useHistory } from "react-router-dom";

function Login() {

    let history = useHistory()

    const initialValues = {
        user_name: "",
        user_password: "",
    };

    const validationSchema = yup.object().shape({
        user_name: yup.string().min(4).max(40).required() ,
        user_password: yup.string().min(1).max(30).required(),
    });

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/users/login", data).then( (response)=> {
            if (response.data.error) {
                alert(response.data.error)
            } else {
                sessionStorage.setItem("accessToken", response.data);
                history.push('/')
            };
        });
    };

    return (
        <div>
            <h1>Логін</h1>
            <div className="create_order_page">
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} >
                    <Form className="formContainer">
                        <label>Логін: </label>
                        <Field id="inputCreateSupply" name="user_name" autocomplete="off" />
                        <ErrorMessage name="user_name" component="span"/>

                        <label>Пароль: </label>
                        <Field id="inputCreateSupply" name="user_password"  autocomplete="off" type="password" />
                        <ErrorMessage name="user_password" component="span"/>

                        <button type="submit">Підтвердити</button>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default Login;