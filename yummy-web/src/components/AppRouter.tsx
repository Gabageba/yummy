import { Navigate, Route, Routes } from 'react-router-dom';
import NotFoundPage from '@pages/NotFoundPage';
import { RoutePath } from '@routes/models';
import type { Routes as RoutesType } from '@routes/routes';
import { userRoutes, authRoutes, publicRoutes } from '@routes/routes';
import { useAppSelector } from '@hooks/redux';
import { selectIsAuth } from '@utils/selectors';

const routeRender = ({ path, Element, props }: RoutesType) => (
  <Route key={path} path={path} element={<Element {...(props ?? {})} />} />
);

const AppRouter = () => {
  const isAuth = useAppSelector(selectIsAuth);

  return (
    <Routes>
      {publicRoutes.map(routeRender)}
      {userRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            isAuth ? (
              <route.Element {...(route.props ?? {})} />
            ) : (
              <Navigate to={RoutePath.LOGIN} replace />
            )
          }
        />
      ))}
      {authRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            !isAuth ? (
              <route.Element {...(route.props ?? {})} />
            ) : (
              <Navigate to={RoutePath.MAIN} replace />
            )
          }
        />
      ))}
      <Route
        path="*"
        element={isAuth ? <NotFoundPage /> : <Navigate to={RoutePath.LOGIN} replace />}
      />
    </Routes>
  );
};

export default AppRouter;
