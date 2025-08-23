import { Route, Routes } from 'react-router-dom';
import NotFoundPage from '@pages/NotFoundPage';
import { publicRoutes } from './routes';

const AppRouter = () => (
  <Routes>
    {publicRoutes.map(({ path, Element }) => (
      <Route key={path} path={path} element={<Element />} />
    ))}
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default AppRouter;
