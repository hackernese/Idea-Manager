import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./Routes";
import { HeaderOnly, DefaultLayout} from './Components/Layouts'
import { Fragment } from "react";

function App() {
  return(
    <Router>
      <Routes>
        {publicRoutes.map((route, index) => {
          const Page = route.page
          let Layout
          if(route.layout === null)
          {
            Layout = Fragment
          }
          else if(route.layout)
          {
            Layout = HeaderOnly
          }
          else
          {
            Layout = DefaultLayout
          }
          
          return (
            <Route key = {index} path={route.path} element = {<Layout><Page /></Layout>}/>
          )
        })}
      </Routes>
    </Router>
  )
}

export default App;
