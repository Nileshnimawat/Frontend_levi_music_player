import { HOME_PAGE_PLAYLIST } from '@/utils/constants';
import axios from 'axios';
import { useEffect, useState } from 'react';

const useHomePagePlaylists = () => {
  const [results, setResults] = useState({
    topRated: [],
    artists: [],
    indian: [],
    global: [],
    mostPlayed: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(HOME_PAGE_PLAYLIST, {
          withCredentials: true,
        });

        console.log(res)

        if (res && res?.data) {
          setResults(res?.data?.data);
        }
      } catch (error) {
        console.log("Error fetching home page playlists:", error);
      }
    };

    fetchData();
  }, []);

  return results;
};

export default useHomePagePlaylists;
