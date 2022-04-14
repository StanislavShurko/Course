import React, {useEffect} from "react";
import * as yup from "yup";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";

function CreateSupply() {

    const initialValues = {
        thing_name: "",
        thing_type: "",
        thing_price: 0,
        thing_count: 0,
    };

    const validationSchema = yup.object().shape({
        thing_name: yup.string().min(4).max(40).required() ,
        thing_type: yup.string().min(1).max(30).required(),
        thing_price: yup.number().required() ,
        thing_count: yup.number().required().integer(),
    })

    const onSubmit = (data) => {
            axios.post("http://localhost:3001/things", data).then( (response)=> {
            });
    };

    return (
        <div className="create_order_page">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} >
                <Form className="formContainer">
                    <label>Product name: </label>
                    <Field id="inputCreateSupply" name="thing_name" placeholder="Camponotus Nicobarensis..." autocomplete="off" />
                    <ErrorMessage name="thing_name" component="span"/>
                    <label>Product type: </label>
                    <Field id="inputCreateSupply" name="thing_type" placeholder="Ant..." autocomplete="off" />
                    <ErrorMessage name="thing_type" component="span"/>
                    <label>Price: </label>
                    <Field id="inputCreateSupply" name="thing_price" placeholder="1000..." autocomplete="off" />
                    <ErrorMessage name="thing_price" component="span"/>
                    <label>Count: </label>
                    <Field id="inputCreateSupply" name="thing_count" placeholder="12..." autocomplete="off" />
                    <ErrorMessage name="thing_count" component="span"/>
                    <button type="submit">SUBMIT SUPPLY</button>
                </Form>
            </Formik>
        </div>
    );
}

export default CreateSupply;
