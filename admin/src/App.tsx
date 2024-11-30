import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';

import Settings from './pages/Settings';

import DefaultLayout from './layout/DefaultLayout';

import Overview from './pages/Dashboard/Overview';
import CreateAClass from './pages/Actions/CreateAClass';

import PrivateRoute from './auth/PrivateRoute';
import { AuthProvider } from './auth/AuthContext';


function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <AuthProvider>
    <DefaultLayout>
          <Routes>
            <Route
              index
              element={
                <>
                  <PageTitle title="NestingDoll" />
                  <Overview />
                </>
              }
            />
            <Route
              path="/dashboard"
              element={
                <>
                  <PageTitle title="Dashboard" />
                  <Overview />
                </>
              }
            />

            <Route
              path="/settings"
              element={
                <>
                  <PrivateRoute>
                    <PageTitle title="Settings" />
                    <Settings />
                  </PrivateRoute>
                </>
              }
            />
            <Route
              path="/createclass"
              element={
                <>
                  <PrivateRoute>
                    <PageTitle title="Create A Class" />
                    <CreateAClass />
                  </PrivateRoute>
                </>
              }
            />
            <Route
              path="/auth/signin"
              element={
                <>
                  <PageTitle title="Signin" />
                  <SignIn />
                </>
              }
            />
            <Route
              path="/auth/signup"
              element={
                <>
                  <PageTitle title="Signup" />
                  <SignUp />
                </>
              }
            />
          </Routes>
      
    </DefaultLayout>
    </AuthProvider>
  );
}

export default App;
