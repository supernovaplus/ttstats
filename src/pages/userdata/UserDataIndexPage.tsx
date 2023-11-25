import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import LazyLoadingWrapper from '../../components/LazyLoadingWrapper';
import ContentBlock from '../../components/ContentBlock';
import Page404 from '../../components/Page404';
import { UserDataContextProvider } from '../../store/UserDataContext';

const BusinessPage = lazy(() => import('./BusinessPage'));
const UserSettingsPage = lazy(() => import('./UserSettingsPage'));

export default function UserDataIndexPage() {
  return (
    <UserDataContextProvider>
      <Routes>
        <Route
          path="/business/server/:server/page/:page"
          element={<LazyLoadingWrapper component={BusinessPage} />}
        />
        {/* <Route path="business" element={<Redirect to="/server/" />} /> */}
        {/* <Route path="/user/:userId/category/:category" component={User} /> */}

        <Route path="business" element={<LazyLoadingWrapper component={BusinessPage} />} />
        <Route path="settings" element={<LazyLoadingWrapper component={UserSettingsPage} />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </UserDataContextProvider>
  );
}
