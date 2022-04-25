import React, {useEffect, useState} from "react";
import * as yup from "yup";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";

function CreateSupply() {

    const [ordSupId, setOrdSupId] = useState(0);
    const [userId, setUserId] = useState();

    useEffect( () => {
        axios.get("http://localhost:3001/ordSup/last").then(res => {
            setOrdSupId(res.data);
        });
        axios.get('http://localhost:3001/users/id', {
            params: {
                username: sessionStorage.getItem('login'),
                password: sessionStorage.getItem('password'),
            }
        },).then(res => {
            setUserId(res.data);
        });
    }, [])

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
    });

    const createSupply = () => {

        axios.post('http://localhost:3001/ordSup', {
            ordSup_type: "Supply",
            userId: userId,
        },{
            headers: {
                accessToken: sessionStorage.getItem("accessToken"),
            }
        }).then( (response)=> {
            if (response.data.error) {
                console.log(response.data.error);
            }
        });

        setOrdSupId(ordSupId + 1);
    }

    const onSubmit = async (data) => {

            data.thing_count = Number(data.thing_count);
            data.thing_price = Number(data.thing_price);

           await axios.post("http://localhost:3001/things", data, {
                headers: {
                    accessToken: sessionStorage.getItem("accessToken"),
                }
           }).then( (response)=> {
                if (response.data) {
                    alert(response.data);
                }
           });

        await axios.post('http://localhost:3001/suborders', {
            data,
            os_count: data.thing_count,
            ordSupId: ordSupId,
        },{
            headers: {
                accessToken: sessionStorage.getItem("accessToken"),
            }
        }).then( (response)=> {
            if (response.data.error) {
                console.log(response.data.error);
            }
        });

    };

    return (
        <div>
            <h1>Поставка</h1>
        <div className="create_order_page">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} >
                <Form className="formContainer">
                    <label>Назва продукту: </label>
                    <Field id="inputCreateSupply" name="thing_name" placeholder="Camponotus Nicobarensis..." autocomplete="off" />
                    <ErrorMessage name="thing_name" component="span"/>
                    <label>Тип продукту: </label>
                    <Field id="inputCreateSupply" name="thing_type" placeholder="Ant..." autocomplete="off" />
                    <ErrorMessage name="thing_type" component="span"/>
                    <label>Ціна: </label>
                    <Field id="inputCreateSupply" name="thing_price" placeholder="1000..." autocomplete="off" />
                    <ErrorMessage name="thing_price" component="span"/>
                    <label>Кількість: </label>
                    <Field id="inputCreateSupply" name="thing_count" placeholder="12..." autocomplete="off" />
                    <ErrorMessage name="thing_count" component="span"/>
                    <button type="submit">Підтвердити</button>
                </Form>
            </Formik>
            <div className="createOrdSup">
                <div id='inputCreateSupply'> Поставка/Замовлення №: {ordSupId}</div>
                <button type='submit' className='createSupply' onClick={createSupply}> Нова поставка</button>
            </div>
        </div>
        </div>
    );
}

export default CreateSupply;
