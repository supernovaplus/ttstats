import { Route, Routes, Outlet } from 'react-router-dom';
import { lazy } from 'react';
import LazyLoadingWrapper from '../../components/LazyLoadingWrapper';
import ContentBlock from '../../components/ContentBlock';
import Page404 from '../../components/Page404';
import { UserDataContextProvider } from '../../store/UserDataContext';

const BusinessPage = lazy(() => import('./BusinessPage'));
const UserSettings = lazy(() => import('./UserSettings'));

export default function UserDataIndexPage() {
  return (
    <UserDataContextProvider>
      <Routes>
        <Route path="business" element={<LazyLoadingWrapper component={BusinessPage} />} />
        <Route path="settings" element={<LazyLoadingWrapper component={UserSettings} />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </UserDataContextProvider>
  );
}
