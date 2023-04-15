import { Routes, Route, useLocation } from 'react-router-dom';
import { HeaderOnly, DefaultLayout } from './Components/Layouts';
import { Fragment, useState } from 'react';
import LoginPage from './Pages/Login';
import ProfilePage from './Pages/Profile';

// Importing submission page here
import SubmissionPage from './Pages/Submission';
import SubmissionID from './Pages/Submission/SubmissionID';
import AddNewIdea from './Pages/Submission/ideas/add';
import IdeaDetails from './Pages/Submission/ideas/details';

// Importing statistic page
import StatisticPage from './Pages/Statistic';

// Importing Setting sub-components here
import ChangeProfile from './Pages/Profile/Component/ChangeProfile';
import Account from './Pages/Profile/Component/Account';
import Security from './Pages/Profile/Component/Security';
import Theme from './Pages/Profile/Component/Theme';

// importing recoveryu components go here
import Recovery from './Pages/Recovery';
import Code from './Pages/Recovery/code';
import Reset from './Pages/Recovery/reset';

// importing Term and condition component here
import TermAndCondition from './Pages/TermAndCondition';

// importing error pages here
import NotFound from './Pages/Error/404';

// Importing Home
import Home from './Pages/Home';

// Administrator pages go here
import Admin from './Pages/Admin';

// Department sub-components for admin
// User sub-components for admin
import AddNewUser from './Pages/Admin/User/Add';
import UserSetting from './Pages/Admin/User/setting';
import EmailVerify from './Pages/Profile/EmailVerify';
// Submission sub-components for admin
import AddNewSubmission from './Pages/Admin/Submission/Add';
import EditSubmission from './Pages/Admin/Submission/Edit';

import User from './Pages/Admin/User';
import AdminSubmission from './Pages/Admin/Submission';
import Role from './Pages/Admin/Role';
import Department from './Pages/Admin/Department';
import Category from './Pages/Admin/Category';

import { createContext } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import ProtectedRoute from './Components/ProtectedRoute';
import UnProtectedRoute from './Components/UnProtectedRoute';

import { AnimatePresence } from 'framer-motion';
import { isIE } from 'react-device-detect';

import { setdarktheme, setlighttheme } from './lib/theme';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';
import './lib/locale';

import { useMediaQuery } from 'react-responsive';
import { Slide, Flip } from 'react-toastify';

import Test from './Components/Test';
import useTranslation from './lib/locale';

export const loginContext = createContext();

axios.defaults.baseURL = `http://127.0.0.1:5000/api`;

function App() {
    const { i18n } = useTranslation();
    const [auth, setislogin] = useState(false);
    const [triggerWhoami, settriggerWhoami] = useState(0);
    const [userinfo, setuserinfo] = useState(false);
    const location = useLocation();
    const isMobile = useMediaQuery({ maxWidth: 1100 });
    const [isadmin, setisadmin] = useState(false);
    const [ismanager, setismanager] = useState(false);
    const [isstaff, setisstaff] = useState(false);
    const [iscoordiantor, setiscoordinator] = useState(false);

    // false : not login
    // true : login r

    const userinfo_initialize = (info) => {
        switch (info.theme) {
            case 'dark':
                setdarktheme();
                break;
            case 'light':
                setlighttheme();
                break;
            default:
                break;
        }

        switch (info.lang) {
            case 'en':
                i18n.changeLanguage('en');
                break;
            case 'vn':
                i18n.changeLanguage('vn');
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('auth');

        axios
            .post('auth/whoami')
            .then((resp) => {
                if (resp.data.status === 'OK') {
                    userinfo_initialize(resp.data.data);
                    setuserinfo(resp.data.data);

                    // CHecking the role;
                    const data = resp.data.data;
                    setisadmin(data.role === 'administrator');
                    setismanager(data.role === 'manager');
                    setisstaff(data.role == 'staff');
                    setiscoordinator(data.role === 'coordinator');
                } else {
                    setuserinfo(null);
                }
            })
            .catch((err) => {
                console.log(err);
                setuserinfo(null);
            });
    }, [auth, triggerWhoami]);

    if (isIE) {
        // Checking if the user is running this on Internet Explorer
        // INternet Explorer is not supported, return back an error page
        return (
            <label>
                This website isn't supported on Internet Explorer. Please use Chrome, Firefox, Brave, Opera, Edge or any
                other modern browser
            </label>
        );
    }

    if (userinfo === false) {
        return <label>Loading...</label>;
    }
    return (
        <>
            <loginContext.Provider
                value={{
                    isadmin: isadmin,
                    isstaff: isstaff,
                    iscoordiantor: iscoordiantor,
                    ismanager: ismanager,
                    userinfo: userinfo,
                    is_auth: auth,
                    trigger_whoami: () => settriggerWhoami(triggerWhoami + 1),
                    set_login_status: (v) => {
                        setislogin(v);
                    },
                    setuserinfo: setuserinfo,
                    reassign: (newv) => {
                        const temp = Object.assign(userinfo, newv);
                        setuserinfo(temp);
                    },
                }}
            >
                <AnimatePresence mode="wait">
                    <Routes key={location.pathname} location={location}>
                        <Route
                            path="/"
                            element={
                                <ProtectedRoute>
                                    <DefaultLayout>
                                        <Home></Home>
                                    </DefaultLayout>
                                </ProtectedRoute>
                            }
                        ></Route>
                        <Route
                            path="/home"
                            element={
                                <ProtectedRoute>
                                    <DefaultLayout>
                                        <Home></Home>
                                    </DefaultLayout>
                                </ProtectedRoute>
                            }
                        ></Route>
                        <Route
                            path="/admin"
                            element={
                                <ProtectedRoute>
                                    <DefaultLayout>
                                        <Admin />
                                    </DefaultLayout>
                                </ProtectedRoute>
                            }
                        >
                            <Route path="category" element={<Category></Category>}></Route>

                            <Route path="department" element={<Department></Department>}></Route>

                            <Route path="user" element={<User></User>}>
                                <Route path="add" element={<AddNewUser></AddNewUser>} />
                                <Route path=":id/setting" element={<UserSetting></UserSetting>} />
                            </Route>
                            <Route path="role" element={<Role></Role>}></Route>
                            <Route path="submission" element={<AdminSubmission></AdminSubmission>}>
                                {/* <Route path="add" element={<AddNewSubmission></AddNewSubmission>}></Route>
                                <Route path=":id/edit" element={<EditSubmission></EditSubmission>}></Route> */}
                            </Route>
                        </Route>
                        <Route
                            path="/submission"
                            element={
                                <ProtectedRoute>
                                    <DefaultLayout>
                                        <SubmissionPage />
                                    </DefaultLayout>
                                </ProtectedRoute>
                            }
                        >
                            <Route path=":id" element={<SubmissionID></SubmissionID>}>
                                <Route path="idea/add" element={<AddNewIdea></AddNewIdea>} />
                                <Route path="idea/:idea_id" element={<IdeaDetails></IdeaDetails>} />
                            </Route>
                        </Route>
                        <Route
                            path="/login"
                            element={
                                <Fragment>
                                    <LoginPage />
                                </Fragment>
                            }
                        ></Route>
                        <Route path="mail_verify" element={<EmailVerify></EmailVerify>}></Route>
                        <Route
                            path="/setting"
                            element={
                                <ProtectedRoute>
                                    <HeaderOnly>
                                        <ProfilePage />
                                    </HeaderOnly>
                                </ProtectedRoute>
                            }
                        >
                            <Route path="security" element={<Security></Security>}></Route>
                            <Route path="theme" element={<Theme></Theme>}></Route>
                            <Route path="general" element={<ChangeProfile></ChangeProfile>}></Route>
                            <Route path="account" element={<Account></Account>}></Route>
                        </Route>
                        {ismanager && (
                            <Route
                                path="/manager/statistics"
                                element={
                                    <ProtectedRoute>
                                        <HeaderOnly>
                                            <StatisticPage />
                                        </HeaderOnly>
                                    </ProtectedRoute>
                                }
                            ></Route>
                        )}
                        <Route
                            path="/recovery"
                            element={
                                <UnProtectedRoute>
                                    <Recovery></Recovery>
                                </UnProtectedRoute>
                            }
                        >
                            <Route path="reset" element={<Reset></Reset>} />
                            <Route path="code" element={<Code></Code>} />
                        </Route>
                        <Route path="/term-and-condition" element={<TermAndCondition></TermAndCondition>}></Route>
                        <Route path="*" element={<NotFound></NotFound>}></Route>
                    </Routes>
                </AnimatePresence>
            </loginContext.Provider>
            <ToastContainer
                theme="dark"
                position={isMobile ? 'bottom-center' : 'bottom-right'}
                transition={isMobile ? Slide : Flip}
            />

            <Test></Test>
        </>
    );
}

export default App;
