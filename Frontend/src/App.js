import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HeaderOnly, DefaultLayout } from './Components/Layouts';
import { Fragment, useState } from 'react';
import LoginPage from './Pages/Login';
import ProfilePage from './Pages/Profile';

// Importing submission page here
import SubmissionPage from './Pages/Submission';
import SubmissionID from './Pages/Submission/SubmissionID';
import SubmissionDetails from './Pages/Submission/details';
import AddNewIdea from './Pages/Submission/ideas/add';
import IdeaDetails from './Pages/Submission/ideas/details';

// Importing statistic page
import StatisticPage from './Pages/Statistic';

// Importing Setting sub-components here
import ChangeProfile from './Pages/Profile/Component/ChangeProfile';
import Email from './Pages/Profile/Component/Email';
import Password from './Pages/Profile/Component/Password';
import Security from './Pages/Profile/Component/Security';
import Theme from './Pages/Profile/Component/Theme';

// importing recoveryu components go here
import Recovery from './Pages/Recovery';
import RToken from './Pages/Recovery/r';
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
import AddNewCategory from './Pages/Admin/Category/Add';
import CategoryDetails from './Pages/Admin/Category/Details';
import EditCategory from './Pages/Admin/Category/Edit';
// Department sub-components for admin
import AddNewDepartment from './Pages/Admin/Department/Add';
import DepartmentDetails from './Pages/Admin/Department/Details';
import EditDepartment from './Pages/Admin/Department/Edit';
// User sub-components for admin
import AddNewUser from './Pages/Admin/User/Add';
import UserSetting from './Pages/Admin/User/setting';
// Role sub-components for admin
import EditRole from './Pages/Admin/Role/Edit';
import AddRole from './Pages/Admin/Role/Add';
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

export const loginContext = createContext();

axios.defaults.baseURL = `http://127.0.0.1:5000/api`;

function App() {
    const [auth, setislogin] = useState(false);
    const [userinfo, setuserinfo] = useState(false);

    // false : not login
    // true : login r

    console.log(userinfo);

    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('auth');
        axios
            .post('auth/whoami')
            .then((resp) => {
                if (resp.data.status === 'OK') {
                    setuserinfo(resp.data.data);
                } else {
                    setuserinfo(null);
                }
            })
            .catch((err) => {
                console.log(err);
                setuserinfo(null);
            });
    }, [auth]);

    if (userinfo === false) {
        return <label>Loading...</label>;
    }

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
                        <Route path="category" element={<Category></Category>}>
                            <Route path=":id/edit" element={<EditCategory></EditCategory>}></Route>
                            <Route path=":id/details" element={<CategoryDetails></CategoryDetails>}></Route>
                            <Route path="add" element={<AddNewCategory></AddNewCategory>}></Route>
                        </Route>

                        <Route path="department" element={<Department></Department>}>
                            <Route path="add" element={<AddNewDepartment></AddNewDepartment>}></Route>
                            <Route path=":id/edit" element={<EditDepartment></EditDepartment>}></Route>
                            <Route path=":id/details" element={<DepartmentDetails></DepartmentDetails>}></Route>
                        </Route>

                        <Route path="user" element={<User></User>}>
                            <Route path="add" element={<AddNewUser></AddNewUser>} />
                            <Route path=":id/setting" element={<UserSetting></UserSetting>} />
                        </Route>
                        <Route path="role" element={<Role></Role>}>
                            <Route path="add" element={<AddRole></AddRole>}></Route>
                            <Route path="edit" element={<EditRole></EditRole>}></Route>
                        </Route>
                        <Route path="submission" element={<AdminSubmission></AdminSubmission>}>
                            <Route path="add" element={<AddNewSubmission></AddNewSubmission>}></Route>
                            <Route path=":id/edit" element={<EditSubmission></EditSubmission>}></Route>
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
                            <Route path="details" element={<SubmissionDetails></SubmissionDetails>} />
                            <Route path="idea/add" element={<AddNewIdea></AddNewIdea>} />
                            <Route path="idea/:idea_id/details" element={<IdeaDetails></IdeaDetails>} />
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
                        <Route path="account" element={<Password></Password>}></Route>
                    </Route>
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
                    <Route path="/recovery" element={<Recovery></Recovery>}>
                        <Route path="reset" element={<Reset></Reset>} />
                        <Route path="code" element={<Code></Code>} />
                        <Route path="r/:token" element={<RToken></RToken>} />
                    </Route>
                    <Route path="/term-and-condition" element={<TermAndCondition></TermAndCondition>}></Route>
                    <Route path="*" element={<NotFound></NotFound>}></Route>
                </Routes>
            </Router>
        </loginContext.Provider>
    );
}

export default App;
