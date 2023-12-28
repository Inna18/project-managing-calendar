import {useState} from "react";
import {useAuthContext} from "../../hooks/useAuthContext";
import {timestamp} from "../../firebase/config";


export default function ProjectComments() {
  const [newComment, setNewComment] = useState("");
  const { user } = useAuthContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    const commentToAdd = {
      content: newComment,
      displayName: user.displayName,
      photoUrl: user.photoURL,
      createdAt: timestamp.fromDate(new Date()),
      id: Math.random()
    }

    console.log(commentToAdd)
  }

  return (
    <div className="project-comments">
      <h2 className="page-title">Comments</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>
          <div>Add New Comment:</div>
          <textarea onChange={(e) => setNewComment(e.target.value)} value={newComment} required></textarea>
        </label>
        <button className="btn">Add Comment</button>
      </form>
    </div>
  )
}
