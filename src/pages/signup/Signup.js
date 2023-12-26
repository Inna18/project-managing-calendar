import "./Signup.css"
import {useState} from "react";
import {useSignup} from "../../hooks/useSignup";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);
  const { signup, error, isPending } = useSignup();

  const handleFileChange = (e) => {
    setThumbnail(null); // if some file was chosen by mistake
    let selected = e.target.files[0];

    if (!selected) {
      setThumbnailError("Please select file");
      return;
    }
    if (!selected.type.includes("image")) {
      setThumbnailError("Please select an image file")
      return;
    }
    if (selected.size > 100000) {
      setThumbnailError("File size must be less than 100KB")
      return;
    }

    setThumbnailError(null);
    setThumbnail(selected);
    console.log("thumbnail updated!")
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, username, thumbnail);
  }


  return (
    <div>
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Sign up</h2>
        <label>
          <span>Email: </span>
          <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
        </label>
        <label>
          <span>Password: </span>
          <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} required />
        </label>
        <label>
          <span>Username: </span>
          <input type="text" onChange={(e) => setUsername(e.target.value)} value={username} required />
        </label>
        <label>
          <span>Profile thumbnail: </span>
          <input type="file" onChange={handleFileChange} required />
        </label>
        {thumbnailError && <div className="error">{thumbnailError}</div>}
        {!isPending && <button className="btn">Signup</button>}
        {isPending && <button className="btn" disabled>Loading...</button>}
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  )
}
