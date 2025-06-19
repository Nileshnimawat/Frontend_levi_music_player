// src/components/hooks/toggleLikeOrDislike.js
// import axios from 'axios';
// import { addLikedPlaylist, removeLikedPlaylist } from '../store/userSlice';
// import toast from 'react-hot-toast';

export const useToggleLikeOrDislike = async (dispatch, musicId) => {
  // try {
  //   const response = await axios.put(`/api/v1/user/likeOrDislike/${musicId}`);
  //   const { liked, music, message } = response.data;

  //   if (liked) {
  //     dispatch(addLikedPlaylist(music));
  //   } else {
  //     dispatch(removeLikedPlaylist(music._id));
  //   }

  //   toast.success(message);
  //   return liked;
  // } catch (error) {
  //   console.error("Error in like/dislike:", error);
  //   toast.error("Something went wrong!");
  //   throw error;
  // }
};

export default useToggleLikeOrDislike;
