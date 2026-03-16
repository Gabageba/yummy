import { useLogoutMutation } from '@pages/auth/authApi';
import useAuth from './useAuth';

function useLogout() {
  const { onLogoutSuccess } = useAuth();
  const [logout] = useLogoutMutation();

  const onLogout = () => {
    logout().unwrap().then(onLogoutSuccess);
  };

  return { onLogout };
}

export default useLogout;
