import {useCollection} from "../../hooks/useCollection";
import ProjectList from "../../components/ProjectList";
import ProjectFilter from "./ProjectFilter";

export default function Dashboard() {
  const { documents: projects } = useCollection("projects")

  return (
    <div>
      <h2>Dashboard</h2>
      <ProjectFilter />
      {projects && <ProjectList projects={projects}/>}
    </div>
  )
}
