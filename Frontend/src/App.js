import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HeaderOnly, DefaultLayout } from './Components/Layouts';
import { Fragment } from 'react';
import HomePage from './Pages/Home';
import LoginPage from './Pages/Login';
import CategoryPage from './Pages/Category';
import ProfilePage from './Pages/Profile';
import SubmissionPage from './Pages/Submission';
import StatisticPage from './Pages/Statistic';

import ChangeProfile from './Pages/Profile/Component/ChangeProfile';
import Email from './Pages/Profile/Component/Email';
import Password from './Pages/Profile/Component/Password';

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <DefaultLayout>
                                <HomePage />
                            </DefaultLayout>
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
        </>
    );
}

export default App;
