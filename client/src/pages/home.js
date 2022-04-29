import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

function Home() {

    const [listOfThings, setListOfThings] = useState([]);
    const [direction, setDirection] = useState(true);
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [countFrom, setCountFrom] = useState();
    const [countDo, setCountDo] = useState();
    const [priceDo, setPriceDo] = useState();
    const [priceFrom, setPriceFrom] = useState();
    const [total, setTotal] = useState();

    useEffect(() => {
        axios.get("http://localhost:3001/things").then( (response)=> {
            setListOfThings(response.data);
        });
        axios.get("http://localhost:3001/things/total").then( (response)=> {
            setTotal(response.data);
        });
    },[]);

    const getFilteredThings = () => {
        if (!name && !type && !priceDo && !countFrom && !countDo && !priceFrom) {
            setListOfThings(axios.get("http://localhost:3001/things").then( (response)=> {
                setListOfThings(response.data);
            }));
        }
        setListOfThings(listOfThings.filter(
                el=>{
                    if (!priceDo && !countFrom && !countDo && !priceFrom) {
                        return el['thing_name'].toLowerCase().includes(name.toLowerCase()) &&
                            el['thing_type'].toLowerCase().includes(type.toLowerCase());
                    }
                    if (!priceDo && !countFrom && !priceFrom) {
                        return el['thing_name'].toLowerCase().includes(name.toLowerCase()) &&
                            el['thing_type'].toLowerCase().includes(type.toLowerCase()) &&
                            el['thing_count'] < countDo;
                    }
                    if (!priceDo && !countDo && !priceFrom) {
                        return el['thing_name'].toLowerCase().includes(name.toLowerCase()) &&
                            el['thing_type'].toLowerCase().includes(type.toLowerCase()) &&
                            el['thing_count'] > countFrom;
                    }
                    if (!countFrom && !countDo && !priceFrom) {
                        return el['thing_name'].toLowerCase().includes(name.toLowerCase()) &&
                            el['thing_type'].toLowerCase().includes(type.toLowerCase()) &&
                            el['thing_price'] < priceDo;
                    }
                    if (!countFrom && !countDo && !priceDo) {
                        return el['thing_name'].toLowerCase().includes(name.toLowerCase()) &&
                            el['thing_type'].toLowerCase().includes(type.toLowerCase()) &&
                            el['thing_price'] > priceFrom;
                    }
                    if (!priceDo && !priceFrom) {
                        return el['thing_name'].toLowerCase().includes(name.toLowerCase()) &&
                            el['thing_type'].toLowerCase().includes(type.toLowerCase()) &&
                            el['thing_count'] > countFrom &&
                            el['thing_count'] < countDo;
                    }
                    if (!countFrom && !countDo) {
                        return el['thing_name'].toLowerCase().includes(name.toLowerCase()) &&
                            el['thing_type'].toLowerCase().includes(type.toLowerCase()) &&
                            el['thing_price'] < priceDo &&
                            el['thing_price'] > priceFrom;
                    }
                    if (!countDo && !priceFrom) {
                        return el['thing_name'].toLowerCase().includes(name.toLowerCase()) &&
                            el['thing_type'].toLowerCase().includes(type.toLowerCase()) &&
                            el['thing_price'] < priceDo &&
                            el['thing_count'] > countFrom;
                    }
                    if (!priceDo && !countFrom) {
                        return el['thing_name'].toLowerCase().includes(name.toLowerCase()) &&
                            el['thing_type'].toLowerCase().includes(type.toLowerCase()) &&
                            el['thing_count'] < countDo &&
                            el['thing_price'] > priceFrom;
                    }
                    if (!priceDo && !countDo) {
                        return el['thing_name'].toLowerCase().includes(name.toLowerCase()) &&
                            el['thing_type'].toLowerCase().includes(type.toLowerCase()) &&
                            el['thing_count'] > countFrom &&
                            el['thing_price'] > priceFrom;
                    }
                    if (!priceFrom && !countFrom) {
                        return el['thing_name'].toLowerCase().includes(name.toLowerCase()) &&
                            el['thing_type'].toLowerCase().includes(type.toLowerCase()) &&
                            el['thing_count'] < countDo &&
                            el['thing_price'] < priceDo;
                    }
                    if (!priceFrom) {
                        return el['thing_name'].toLowerCase().includes(name.toLowerCase()) &&
                            el['thing_type'].toLowerCase().includes(type.toLowerCase()) &&
                            el['thing_count'] < countDo &&
                            el['thing_price'] < priceDo &&
                            el['thing_count'] > countFrom;
                    }
                    if (!countFrom) {
                        return el['thing_name'].toLowerCase().includes(name.toLowerCase()) &&
                            el['thing_type'].toLowerCase().includes(type.toLowerCase()) &&
                            el['thing_count'] < countDo &&
                            el['thing_price'] < priceDo &&
                            el['thing_price'] > priceFrom;
                    }
                    if (!countDo) {
                        return el['thing_name'].toLowerCase().includes(name.toLowerCase()) &&
                            el['thing_type'].toLowerCase().includes(type.toLowerCase()) &&
                            el['thing_count'] > countFrom &&
                            el['thing_price'] < priceDo &&
                            el['thing_price'] > priceFrom;
                    }
                    if (!priceDo) {
                        return el['thing_name'].toLowerCase().includes(name.toLowerCase()) &&
                            el['thing_type'].toLowerCase().includes(type.toLowerCase()) &&
                            el['thing_count'] > countFrom &&
                            el['thing_count'] < countDo &&
                            el['thing_price'] > priceFrom;
                    }
                    if (priceDo && countFrom && countDo && priceFrom) {
                        return el['thing_name'].toLowerCase().includes(name.toLowerCase()) &&
                            el['thing_type'].toLowerCase().includes(type.toLowerCase()) &&
                            el['thing_price'] < priceDo &&
                            el['thing_count'] > countFrom &&
                            el['thing_count'] < countDo &&
                            el['thing_price'] > priceFrom;
                    }
                }
            )
        )
    };

    const sortData = (field) => {
        const copyData = listOfThings.concat();

        let sortData;

        if (direction) {
            sortData = copyData.sort(
                (a, b) => {
                    return(a[field] > b[field] ? 1 : -1)
                }
            );
        } else {
            sortData = copyData.sort(
                (a, b) => {
                    return(a[field] < b[field] ? 1 : -1)
                }
            );
        };
        setDirection(!direction);
        setListOfThings(sortData)
    }

    return(
        <div>
            <div className="filter_parent">
                <h1> Фільтри</h1>
                <div className="filter">
                    <input
                        placeholder="Тип"
                        className={"inp"}
                        onChange={(event) => {
                            setType(event.target.value);
                        }}
                    />
                    <input
                        placeholder="Назва"
                        className={"inp"}
                        onChange={(event) => {
                            setName(event.target.value);
                        }}
                    />
                    <input
                        placeholder="Кількість (більше)"
                        className={"inp"}
                        onChange={(event) => {
                            setCountFrom(event.target.value);
                        }}
                    />
                    <input
                        placeholder="Кількість (до)"
                        className={"inp"}
                        onChange={(event) => {
                            setCountDo(event.target.value);
                        }}
                    />
                    <input
                        placeholder="Ціна (більше)"
                        className={"inp"}
                        onChange={(event) => {
                            setPriceFrom(event.target.value);
                        }}
                    />
                    <input
                        placeholder="Ціна (до)"
                        className={"inp"}
                        onChange={(event) => {
                            setPriceDo(event.target.value);
                        }}
                    />
                </div>
                <div>
                    <button className="btn" onClick={getFilteredThings}>Підтвердити</button>
                </div>
            </div>
            <div className="total_div">
                <label className="total_label">Вартість товару на складі: {total} грн.</label>
            </div>
                <table className={"table"}>
                    <thead>
                    <th onClick={() => {sortData("thing_type")}}>Тип</th>
                    <th onClick={() => {sortData("thing_name")}}>Назва</th>
                    <th onClick={() => {sortData("thing_count")}}>Кількість</th>
                    <th onClick={() => {sortData("thing_price")}}>Ціна</th>
                    </thead>
                    {listOfThings.map((value, key) => {
                        return (
                            <tbody>
                            <tr>
                                <td>{value.thing_type}</td>
                                <td>{value.thing_name}</td>
                                <td>{value.thing_count}</td>
                                <td>{value.thing_price}</td>
                            </tr>
                            </tbody>
                        );
                    })}
                </table>
        </div>
    );
};

export default Home;