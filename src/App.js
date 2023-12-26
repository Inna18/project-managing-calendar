import './App.css'
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Create from "./pages/create/Create";
import Login from "./pages/login/Login";
import Project from "./pages/project/Project";
import Signup from "./pages/signup/Signup";

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <div className="container">
        <Switch>
          <Route exact path={"/"}><Dashboard /></Route>
          <Route path={"/create"}><Create /></Route>
          <Route path={"/login"}><Login /></Route>
          <Route path={"/project/:id"}><Project /></Route>
          <Route path={"/signup"}><Signup /></Route>
        </Switch>
      </div>
    </BrowserRouter>
    </div>
  );
}

// pages:
// - dashboard
// - login
// - signup
// - create
// - project (project details)

export default App
