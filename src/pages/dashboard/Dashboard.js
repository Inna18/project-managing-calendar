import {useCollection} from "../../hooks/useCollection";
import ProjectList from "../../components/ProjectList";
import ProjectFilter from "./ProjectFilter";
import {useState} from "react";
import {useAuthContext} from "../../hooks/useAuthContext";

export default function Dashboard() {
  const { documents } = useCollection("projects")
  const [currentFilter, setCurrentFilter] = useState("all");
  const { user } = useAuthContext();

  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter);
  }

  const projects = documents
    ? documents.filter(doc => {
      switch (currentFilter) {
        case "all":
          return true;
        case "mine":
          let assignedUser = false;
          doc.assignedUserList.forEach(u => {
            if (user.uid === u.id) assignedUser = true;
          });
          return assignedUser;
        case "development":
        case "design":
        case "marketing":
        case "sales":
          return currentFilter === doc.category;
      }
    })
    : null

  return (
    <div>
      <h2>Dashboard</h2>
      {projects && <ProjectFilter currentFilter={currentFilter} changeFilter={changeFilter}/>}
      {projects && <ProjectList projects={projects}/>}
    </div>
  )
}
