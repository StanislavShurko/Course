import React from "react";
import * as yup from "yup";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useHistory } from "react-router-dom";

function Registr() {

    const initialValues = {
        user_name: "",
        user_password: "",
        user_email: "",
        user_tnum: "",
    };

    let history = useHistory();

    const validationSchema = yup.object().shape({
        user_name: yup.string().min(4).max(40).required() ,
        user_password: yup.string().min(1).max(30).required(),
        user_email: yup.string().email().required() ,
        user_tnum: yup.string().required(),
    });

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/users", data).then( (response)=> {
            history.push('/login');
        });
    };

    return(
        <div>
            <h1>Реєстрація</h1>
            <div className="create_order_page">
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} >
                    <Form className="formContainer">
                        <label>Логін: </label>
                        <Field id="inputCreateSupply" name="user_name" autocomplete="off" />
                        <ErrorMessage name="user_name" component="span"/>

                        <label>Пароль: </label>
                        <Field id="inputCreateSupply" name="user_password"  autocomplete="off" type="password" />
                        <ErrorMessage name="user_password" component="span"/>

                        <label>Email: </label>
                        <Field id="inputCreateSupply" name="user_email" autocomplete="off" />
                        <ErrorMessage name="user_email" component="span"/>

                        <label>Номер телефону: </label>
                        <Field id="inputCreateSupply" name="user_tnum" autocomplete="off" />
                        <ErrorMessage name="user_tnum" component="span"/>

                        <button type="submit">Підтвердити</button>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default Registr;