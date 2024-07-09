import React, { useState, useEffect } from "react";
import axios from "axios";

const Search = (props) => {
    const [val, setVal] = useState("");
    const [data, setData] = useState([]);

    const handleChange = (e) => {
        setVal(e.target.value);
    };

    const searchVal = async () => {
        try {
            const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${val}`);
            setData(response.data.meals);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        console.log(val);
    }, [val]);

    return (
        <div className="bg-neutral-200 min-h-screen">
            <div className="relative max-w-lg mx-auto  flex bg-neutral-300  p-5">
                <input
                    className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                    type="search"
                    placeholder="Search"
                    value={val}
                    onChange={handleChange}
                />
                <button className="bg-red-600 rounded-lg p-8 pt-0 pb-0 text-white font-semibold "
                    onClick={searchVal}
                >
                    Search
                </button>
            </div>
            <div>{val}</div>

            {data.map((meal) => (
                    <div key={meal.idMeal}>{meal.strMeal}</div>
                ))}
        </div>
    );
};

export default Search;
