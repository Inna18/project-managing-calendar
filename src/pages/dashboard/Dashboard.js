import {useCollection} from "../../hooks/useCollection";
import ProjectList from "../../components/ProjectList";

export default function Dashboard() {
  const { documents: projects } = useCollection("projects")

  return (
    <div>
      <h2>All Projects</h2>
      {projects && <ProjectList projects={projects}/>}
    </div>
  )
}
