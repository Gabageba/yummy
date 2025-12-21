import { Navigate, Route, Routes } from 'react-router-dom';
import NotFoundPage from '@pages/NotFoundPage';
import { RoutePath } from '@routes/models';
import type { Routes as RoutesType } from '@routes/routes';
import { authRoutes, loginRoutes, publicRoutes } from '@routes/routes';
import { getToken } from '@utils/token';

const routeRender = ({ path, Element, props }: RoutesType) => (
  <Route key={path} path={path} element={<Element {...(props ?? {})} />} />
);

const AppRouter = () => {
  const isAuth = Boolean(getToken());

  return (
    <Routes>
      {publicRoutes.map(routeRender)}
      {(isAuth ? authRoutes : loginRoutes).map(routeRender)}
      <Route
        path="*"
        element={isAuth ? <NotFoundPage /> : <Navigate to={RoutePath.LOGIN} replace />}
      />
    </Routes>
  );
};

export default AppRouter;
