import "./Project.css"
import Avatar from "../../components/Avatar";

export default function ProjectSummary({ project }) {
  return (
    <div className="project-summary">
      <h2 className="page-title">{project.title}</h2>
      <div className="due-date">Due by {project.dueDate.toDate().toDateString()}</div>
      <div className="details">{project.details}</div>
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
    </div>
  )
}
