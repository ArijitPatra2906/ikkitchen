import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function Some() {

    const [food, setFood] = useState("")
    const [foods, setFoods] = useState("")
    const params = useParams();
    const { catId } = params;

    const getFoods = async () => {
        try {
            const result = await axios.get("http://localhost:7000/api/cat/" + catId);
            setFood(result.data)
            console.log(result.data)
        } catch (error) {
            console.log(error)

        }
    };
    console.log(food.name)
    const fetchFod = async () => {
        try {
            const result = await axios.post("http://localhost:7000/api/product/cat", {
                category: food.name
            });
            setFoods(result.data)
            console.log(result)
        } catch (error) {
            console.log(error)

        }
    }
    useEffect(() => {
        getFoods()
        fetchFod()
    },[])
    return (
        <div>
            {foods.map((c) => (
                <h1>{c.name}</h1>
            ))}
        </div>
    )
}

export default Some