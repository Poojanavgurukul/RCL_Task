import { useEffect, useState } from "react";

const useFetch = (url) => {
    const [ data, setData ] = useState(null);
    const [ isloading, setIsloading ] = useState(null);
    const [ error, setError ] = useState(null);
    useEffect(()=>{
    const abortCont = new AbortController();
    fetch(url,{signal:abortCont.signal})
    .then(res=>{
        if(!res.ok){
            throw Error('Fail to load data from this post');
        }
        return res.json();
    })
    .then(data=>{
        setData(data);
        setIsloading(false);
        setError(null);
    })
    .catch(err=>{
        if(err.name==="AbortError"){
            console.log("fetch Aborted");
        }
        else{
            setIsloading(false);
            setError(err.message);
        }
    })
    return () => abortCont.abort();

    },[url])
    return {data, isloading, error};
}
 
export default useFetch;