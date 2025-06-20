
import { useEffect, useState } from 'react';
import axios from 'axios';Add commentMore actions
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
  }, []); 
};
