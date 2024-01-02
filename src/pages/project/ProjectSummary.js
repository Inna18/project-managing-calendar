import "./Project.css"
import Avatar from "../../components/Avatar";
import {useAuthContext} from "../../hooks/useAuthContext";
import {useFirestore} from "../../hooks/useFirestore";
import {useHistory} from "react-router-dom";

export default function ProjectSummary({ project }) {
  const { user } = useAuthContext();
  const { deleteDocument, response } = useFirestore("projects");
  const history = useHistory();

  const handleDelete = async () => {
    await deleteDocument(project.id);
    if (!response.error) {
      history.push("/")
    }
  }

  return (
    <div className="project-summary">
      <h2 className="page-title">{project.title}</h2>
      <div className="created-by">Created by: {project.createdBy.displayName}</div>
      <div className="due-date">Due by: {project.dueDate.toDate().toDateString()}</div>
      <div className="details">{project.details}</div>
      <span className="category">#{project.category}</span>
      <h4>Assigned to:
        <div className="assigned-users">
          {
            project.assignedUserList.map(user => (
              <div key={user.id}>
                <Avatar src={user.photoUrl}/>
              </div>
            ))
          }
        </div>
      </h4>
      { user.uid === project.createdBy.id &&
        (
          <div style={{marginTop: '10px'}}>
            <button className="btn" onClick={() => handleDelete()}>Mark as Complete</button>
          </div>
        )
      }
    </div>
  )
}
