import React, { useState,useEffect } from 'react'

const musicApi = () => {

  const [data, setData] = useState({});


  useEffect(() => {
    let handleApi = async()=>{
      try {
        let response = await fetch("/api/musicApi.json");
        let apiData = await response.json();
        console.log("Fetched API Data:", apiData); // Check the structure here
        setData(apiData);

    } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    handleApi();
  
  }, [])

  return data;
  
}

export default musicApi
