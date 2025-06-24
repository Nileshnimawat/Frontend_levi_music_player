
import { useEffect, useDispatch } from "../utils/lib";
import axios from "axios";
import { setUser } from "../store/userSlice";
import { MY_PROFILE } from "../utils/constants";

export const useGetLoggedInUser = ()=> {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(MY_PROFILE,{ withCredentials: true });
        if (res?.data && res?.data?.user) {
          dispatch(setUser(res.data.user));
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, [dispatch]);
}