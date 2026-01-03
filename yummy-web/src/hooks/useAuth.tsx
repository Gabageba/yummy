import { setIsAuth } from '@api/slices/authSlice';
import { removeToken, setToken } from '@utils/token';
import { useAppDispatch } from '@hooks/redux';

const useAuth = () => {
  const dispatch = useAppDispatch();

  const onAuthSuccess = async (token: string) => {
    setToken(token);
    dispatch(setIsAuth(true));
  };

  const onLogoutSuccess = async () => {
    removeToken();
    dispatch(setIsAuth(false));
  };

  return { onAuthSuccess, onLogoutSuccess };
};

export default useAuth;
