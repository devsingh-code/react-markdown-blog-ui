import {useState,useEffect} from 'react';
import axios from 'axios';


function useFetch(url, initialState){

    const [data,setData] = useState(null)
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(null)

    useEffect(() =>{
        async function fetchData(){
            setLoading(true);
            try{
                const res = await axios.get(url);
                console.log(res.data);
                setData(res.data)
                setLoading(false)
            } catch (error) {
                setError(error.message)
                setLoading(false)
            }

        }
        fetchData();
    },[url])
return {
    data,
    loading,
    error
}

}

export {useFetch}