import "./Dashboard.css"

const filters = [
  {value: "all", label: "all"},
  {value: "mine", label: "mine"},
  {value: "development", label: "development"},
  {value: "design", label: "design"},
  {value: "marketing", label: "marketing"},
  {value: "sales", label: "sales"},
]

export default function ProjectFilter({currentFilter, changeFilter}) {

  return (
    <div className="project-filter">
      <span>Filter by: </span>
      <div className="filters">
        {filters.map(filter => (
          <span key={filter.value}
                className={filter.value===currentFilter?"active-filter":"filter"}
                onClick={() => changeFilter(filter.value)}>{filter.label}
          </span>
        ))}
      </div>
    </div>
  )
}
