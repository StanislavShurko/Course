import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

function Home() {

    const [listOfThings, setListOfThings] = useState([]);
    const [direction, setDirection] = useState(true);
    const [name, setName] = useState();
    const [total, setTotal] = useState();

    useEffect(() => {
        axios.get("http://localhost:3001/things").then( (response)=> {
            setListOfThings(response.data);
        });
        axios.get("http://localhost:3001/things/total").then( (response)=> {
            setTotal(response.data);
        });
    },[]);

    useEffect( () => {
        getFilteredThings();
    }, [name]);

    const getFilteredThings = () => {
        if (!name) {
            setListOfThings(axios.get("http://localhost:3001/things").then( (response)=> {
                setListOfThings(response.data);
            }));
        }
        setListOfThings(listOfThings.filter(
                el=>{
                    return el['thing_name'].toLowerCase().includes(name.toLowerCase());
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
                <h1> Фільтр</h1>
                <div className="filter">
                    <input
                        type="text"
                        className={"inp"}
                        onChange={(event) => {
                            setName(event.target.value);
                        }}
                    />
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