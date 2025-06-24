import { useEffect, useState } from 'react';
import axios from 'axios';
import {  GET_STATS } from '@/utils/constants';

export const useStats = () => {

 const [stats, setStats] = useState();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${GET_STATS}`,{
          withCredentials : true
        });

        if(res && res?.data){
            setStats(res?.data?.stats);
        }
        
      } catch (error) {
        console.error('Error fetching playlists:', error.message);
      }
    };

   
      fetchStats();
    
  }, []);

  return stats;
};
