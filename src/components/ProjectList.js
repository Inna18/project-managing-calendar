import "./ProjectList.css"
import Avatar from "./Avatar";
import {Link} from "react-router-dom";

export default function ProjectList({ projects }) {
  return (
    <div className="project-list">
      {projects.map(project => (
        <Link to={`/project/${project.id}`} key={project.id}>
            <h4>{project.title}</h4>
            <div>Due by {project.dueDate.toDate().toDateString()}</div>
            <div className="assigned-to">
              <ul>
                {project.assignedUserList.map(user => (
                  <li key={user.photoUrl}>
                    <Avatar className="avatar" src={user.photoUrl}/>
                  </li>
                ))}
              </ul>
            </div>
        </Link>
      ))}
    </div>
  )
}
