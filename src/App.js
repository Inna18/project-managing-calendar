import './App.css'
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Create from "./pages/create/Create";
import Login from "./pages/login/Login";
import Project from "./pages/project/Project";
import Signup from "./pages/signup/Signup";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import {useAuthContext} from "./hooks/useAuthContext";
import OnlineUsers from "./components/OnlineUsers";

function App() {
  const { user, authIsReady } = useAuthContext();

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          {user && <Sidebar />}
          <div className="container">
            <Navbar />
            <Switch>
              <Route exact path={"/"}>
                {user && <Dashboard />}
                {!user && <Redirect to="/login" />}
              </Route>
              <Route path={"/create"}>
                {user && <Create />}
                {!user && <Redirect to="/login" />}
              </Route>
              <Route path={"/project/:id"}>
                {user && <Project />}
                {!user && <Redirect to="/login" />}
              </Route>
              <Route path={"/login"}>
                {user && <Redirect to="/" />}
                {!user && <Login />}
              </Route>
              <Route path={"/signup"}>
                {user && <Redirect to="/" />}
                {!user && <Signup />}
              </Route>
            </Switch>
          </div>
          {user && <OnlineUsers />}
        </BrowserRouter>
      )}
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
