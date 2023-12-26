import "./Navbar.css"
import Temple from "../assets/temple.svg"
import {Link} from "react-router-dom";
import {useLogout} from "../hooks/useLogout";

export default function Navbar() {
  const { logout, error, isPending } = useLogout();

  return (
    <div  className="navbar">
      <ul>
        <li className="logo">
          <img src={Temple} alt="logo img"/>
          <span>Inna's Console</span>
        </li>

        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Signup</Link></li>
        <li>
          {!isPending && <button onClick={() => logout()}>Logout</button>}
          {isPending && <button disabled>Logging out...</button>}
        </li>
      </ul>
    </div>
  )
}
