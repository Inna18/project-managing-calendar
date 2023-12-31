import "./Login.css"
import {useLogin} from "../../hooks/useLogin";
import {useState} from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isPending, error } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  }

  return (
    <div>
      <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
        <h2>Login</h2>
        <label>
          <span>Email: </span>
          <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} required/>
        </label>
        <label>
          <span>Password: </span>
          <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} required/>
        </label>
        {!isPending && <button className="btn">Login</button>}
        {isPending && <button className="btn" disabled>Logging in...</button>}
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  )
}
