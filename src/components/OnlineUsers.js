import "./OnlineUsers.css"
import {useCollection} from "../hooks/useCollection";
import Avatar from "./Avatar";

export default function OnlineUsers() {

  const { documents: users, error } = useCollection("users");
  console.log(users)

  return (
    <div className="user-list">
      <h2>All Users</h2>
      { error && <div className="error">{error}</div> }
      { users && users.map(user => (
        <div className="user-list-item" key={user.id}>
          <span>{user.displayName}</span>
          <Avatar src={user.photoUrl} />
        </div>
      )) }
    </div>
  )
}
