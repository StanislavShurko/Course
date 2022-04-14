import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

function Home() {

    const [listOfThings, setListOfThings] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/things").then( (response)=> {
            setListOfThings(response.data);
        });
    },[]);

    return(
        <div>
                <table className={"things"}>
                    <thead>
                    <th>Type</th>
                    <th>Name</th>
                    <th>Count</th>
                    <th>Price</th>
                    </thead>
                    {listOfThings.map((value, key) => {
                        return (
                            <tr>
                                <td>{value.thing_type}</td>
                                <td>{value.thing_name}</td>
                                <td>{value.thing_count}</td>
                                <td>{value.thing_price}</td>
                            </tr>
                        );
                    })}
                </table>
        </div>
    );
};

export default Home;