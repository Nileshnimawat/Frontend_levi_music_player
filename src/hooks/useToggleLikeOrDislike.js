import axios from 'axios';
import toast from 'react-hot-toast';
import { toggleLikedSong } from '@/store/userSlice';
import { LIKED_OR_DISLIKE } from '@/utils/constants';

export const ToggleLikeOrDislike = async (id, dispatch) => {
 try {
      const res = await axios.put(
        `${LIKED_OR_DISLIKE}/${id}`,
        {},
        {
          withCredentials: true,
          skipLoading: true,
        }
      );
      toast.success(res.data.message);
      dispatch(toggleLikedSong(id));
    } catch (error) {
      toast.error("Failed to update like");
      console.error(error);
    }
};

export default ToggleLikeOrDislike;
