import { useLogoutMutation } from '@pages/auth/authApi';
import useAuth from './useAuth';

function useLogout() {
  const { onLogoutSuccess } = useAuth();
  const [logout, { isLoading }] = useLogoutMutation();

  const onLogout = () => {
    logout().unwrap().then(onLogoutSuccess);
  };

  return { onLogout, isLoading };
}

export default useLogout;
