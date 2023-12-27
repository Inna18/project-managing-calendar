import "./Create.css"
import {useEffect, useState} from "react";
import Select from "react-select";
import {useCollection} from "../../hooks/useCollection";
import {timestamp} from "../../firebase/config";
import {useAuthContext} from "../../hooks/useAuthContext";
import {useFirestore} from "../../hooks/useFirestore";
import {useHistory} from "react-router-dom";

const categories = [
  {value: "development", label: "Development"},
  {value: "design", label: "Design"},
  {value: "sales", label: "Sales"},
  {value: "marketing", label: "Marketing"},
]

export default function Create() {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");
  const [assignedTo, setAssignedTo] = useState([]);
  const [formError, setFormError] = useState(null);
  const [users, setUsers] = useState([]);

  const { documents } = useCollection("users");
  const { user } = useAuthContext();
  const { addDocument, response } = useFirestore("projects")

  const history = useHistory();

  useEffect(() => {
    if (documents) {
      let options = documents.map(user => {
        return { value: user, label: user.displayName }
      });
      setUsers(options);
    }
  }, [documents])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!category) {
      setFormError("Please choose category")
      return
    }
    if (assignedTo.length < 1) {
      setFormError("Please choose at least 1 user")
      return
    }

    const createdBy = {
      displayName: user.displayName,
      photoUrl: user.photoURL,
      id: user.uid
    }

    const assignedUserList = assignedTo.map(user => {
      return {
        displayName: user.value.displayName,
        photoUrl: user.value.photoUrl,
        id: user.value.id
      }
    })

    const project = {
      title,
      details,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      category: category.value,
      createdBy,
      assignedUserList
    }

    await addDocument(project);
    if (!response.error) {
      history.push("/")
    }
  }

  return (
    <div className="create-form">
      <h2 className="page-title">Create New Project</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>
          <div>Title</div>
          <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} required/>
        </label>
        <label>
          <div>Details</div>
          <textarea onChange={(e) => setDetails(e.target.value)} value={details} required/>
        </label>
        <label>
          <div>Due Date</div>
          <input type="date" onChange={(e) => setDueDate(e.target.value)} value={dueDate} required/>
        </label>
        <label>
          <div>Category: </div>
          <Select options={categories} onChange={option => setCategory(option)} />
        </label>
        <label>
          <div>Assign to: </div>
          <Select options={users} onChange={user => setAssignedTo(user)} isMulti />
        </label>
        <button className="btn">Create</button>
        {formError && <p className="error">{formError}</p>}
    </form>
    </div>
  )
}
