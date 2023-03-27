import HomePage from '../Pages/Home'
import LoginPage from '../Pages/Login'
import CategoryPage from '../Pages/Category'
import ProfilePage from '../Pages/Profile'
import SubmissionPage from '../Pages/Submission'



const publicRoutes = [
    { path: '/', page: HomePage },
    { path: '/category', page: CategoryPage},
    { path: '/submission', page: SubmissionPage },
    { path: '/login', page: LoginPage, layout: null},
    { path: '/profile', page: ProfilePage, layout: 'headerOnly' },
]

const privateRoutes = [{

}]


export {publicRoutes, privateRoutes}