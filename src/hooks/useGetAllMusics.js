
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setAllMusics } from '../store/musicSlice';
import { GET_MUSICS } from '@/utils/constants';

export const useGetAllMusics = () => {
  const dispatch = useDispatch();
  const [allMusic, setAllMusic] = useState();

  useEffect(() => {
    const handleApi = async () => {
      try {
        const res = await axios.get(GET_MUSICS,{
          withCredentials : true
        });
        //  console.log("Fetched API Data:", res);

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
  }, [ allMusic ]);
};
