
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setAllMusics } from '../store/musicSlice';
import { GET_MUSICS } from '@/utils/constants';
export const useGetAllMusics = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleApi = async () => {
      try {
        const res = await axios.get(GET_MUSICS, {
          withCredentials: true
        });

        if (res.data && res.data.musics) {
          const allMusics = res.data.musics;
          dispatch(setAllMusics(allMusics));
        }
      } catch (error) {
        console.error("Error fetching music:", error);
      }
    };

    handleApi();
<<<<<<< HEAD
  }, []);
=======
  }, []); 
>>>>>>> 1df4303e849c34d2f6b08f6529c8e3af41670a65
};
