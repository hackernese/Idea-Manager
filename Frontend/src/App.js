import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HeaderOnly, DefaultLayout } from './Components/Layouts';
import { Fragment, useState } from 'react';
import HomePage from './Pages/Home';
import LoginPage from './Pages/Login';
import CategoryPage from './Pages/Category';
import ProfilePage from './Pages/Profile';
import SubmissionPage from './Pages/Submission';
import StatisticPage from './Pages/Statistic';

import ChangeProfile from './Pages/Profile/Component/ChangeProfile';
import Email from './Pages/Profile/Component/Email';
import Password from './Pages/Profile/Component/Password';

import { createContext } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import ProtectedRoute from './Components/ProtectedRoute';

export const loginContext = createContext();

axios.defaults.baseURL = `http://127.0.0.1:5000/api`;

function App() {
    const [auth, setislogin] = useState(false);
    const [userinfo, setuserinfo] = useState(null);

    // false : not login
    // true : login r

    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('auth');
        axios
            .post('auth/whoami')
            .then((resp) => {
                if (resp.data.status === 'OK') {
                    setuserinfo(resp.data.data);
                }
            })
            .catch((err) => console.log(err));
    }, [auth]);

    return (
        <loginContext.Provider
            value={{
                userinfo: userinfo,
                is_auth: auth,
                set_login_status: (v) => {
                    setislogin(v);
                },
            }}
        >
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <DefaultLayout>
                                    <HomePage />
                                </DefaultLayout>
                            </ProtectedRoute>
                        }
                    ></Route>
                    <Route
                        path="/category"
                        element={
                            <DefaultLayout>
                                <CategoryPage />
                            </DefaultLayout>
                        }
                    ></Route>
                    <Route
                        path="/submission"
                        element={
                            <DefaultLayout>
                                <SubmissionPage />
                            </DefaultLayout>
                        }
                    ></Route>
                    <Route
                        path="/login"
                        element={
                            <Fragment>
                                <LoginPage />
                            </Fragment>
                        }
                    ></Route>
                    <Route
                        path="/setting"
                        element={
                            <HeaderOnly>
                                <ProfilePage />
                            </HeaderOnly>
                        }
                    >
                        <Route path="email" element={<Email></Email>}></Route>
                        <Route path="profile" element={<ChangeProfile></ChangeProfile>}></Route>
                        <Route path="password" element={<Password></Password>}></Route>
                    </Route>
                    <Route
                        path="/statistic"
                        element={
                            <HeaderOnly>
                                <StatisticPage />
                            </HeaderOnly>
                        }
                    ></Route>
                </Routes>
            </Router>
        </loginContext.Provider>
    );
}

export default App;
