import { Navigate, Route, Routes } from 'react-router-dom';
import NotFoundPage from '@pages/NotFoundPage';
import { RoutePath } from '@routes/models';
import { authRoutes, publicRoutes } from '@routes/routes';

const AppRouter = () => {
  const isAuth = Boolean(localStorage.getItem('token'));

  return (
    <Routes>
      {publicRoutes.map(({ path, Element, props }) => (
        <Route key={path} path={path} element={<Element {...(props ?? {})} />} />
      ))}
      {isAuth &&
        authRoutes.map(({ path, Element, props }) => (
          <Route key={path} path={path} element={<Element {...(props ?? {})} />} />
        ))}
      <Route
        path="*"
        element={isAuth ? <NotFoundPage /> : <Navigate to={RoutePath.LOGIN} replace />}
      />
    </Routes>
  );
};

export default AppRouter;
