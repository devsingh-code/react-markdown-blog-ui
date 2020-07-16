import {useState,useEffect} from 'react';
import {authAxios, authenticationService} from '../services';
import axios from 'axios';

function useFetch(url, initialState=null){

    const [data,setData] = useState(null)
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(null)

    useEffect(() =>{
        async function fetchData(){
            setLoading(true);
            try{
                let ax = axios
                if (authenticationService.isAuthenticated){
                    ax = authAxios
                }
                const res = await ax.get(url);
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