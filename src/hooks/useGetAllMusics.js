
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setAllMusics } from '../store/musicSlice';


export const useGetAllMusics = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.user.user);
  const [allMusic, setAllMusic] = useState();

  useEffect(() => {
    const handleApi = async () => {
      try {
        const res = await axios.get('/api/v1/music');
        // console.log("Fetched API Data:", res.data);

        if (res.data && res.data.musics) {
          const allMusics = res.data.musics;
          dispatch(setAllMusics(allMusics));
          setAllMusic(allMusics)
        }
      } catch (error) {
        console.error("Error fetching music:", error);
      }
    };

    handleApi();
  }, [loggedInUser, allMusic ]);
};
