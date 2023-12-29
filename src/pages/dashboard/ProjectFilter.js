import "./Dashboard.css"
import {useState} from "react";

const filters = [
  {value: "all", label: "all"},
  {value: "mine", label: "mine"},
  {value: "development", label: "development"},
  {value: "design", label: "design"},
  {value: "marketing", label: "marketing"},
  {value: "sales", label: "sales"},
]

export default function ProjectFilter() {
  const [currentFilter, setCurrentFilter] = useState("");

  const handleFilter = (value) => {
    setCurrentFilter(value)
    console.log(value)
  }

  return (
    <div className="project-filter">
      <span>Filter by: </span>
      <div className="filters">
        {filters.map(filter => (
          <span key={filter.value} className="filter" onClick={() => handleFilter(filter.value)}>{filter.label}</span>
        ))}
      </div>
    </div>
  )
}
