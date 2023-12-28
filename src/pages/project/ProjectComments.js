import {useState} from "react";
import {useAuthContext} from "../../hooks/useAuthContext";
import {timestamp} from "../../firebase/config";
import {useFirestore} from "../../hooks/useFirestore";
import Avatar from "../../components/Avatar";


export default function ProjectComments({ project }) {
  const [newComment, setNewComment] = useState("");
  const { user } = useAuthContext();
  const { updateDocument, response } = useFirestore("projects");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const commentToAdd = {
      content: newComment,
      displayName: user.displayName,
      photoUrl: user.photoURL,
      createdAt: timestamp.fromDate(new Date()),
      id: Math.random()
    }

    await updateDocument(project.id, {
      comments: [...project.comments, commentToAdd]
    })
    if (!response.error) {
      setNewComment("");
    }
  }

  return (
    <div className="project-comments">
      <h4 className="page-title">Comments</h4>
      <ul>
        {project.comments && project.comments.map(comment => (
          <li key={comment.id}>
            <div className="comment-author">
              <Avatar src={comment.photoUrl} />
              <p>{comment.displayName}</p>
            </div>
            <div className="comment-date">
              <p>{comment.createdAt.toDate().toDateString()}</p>
            </div>
            <div className="comment-content">
              <p>{comment.content}</p>
            </div>
          </li>
        ))}
      </ul>

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
