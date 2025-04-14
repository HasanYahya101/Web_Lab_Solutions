import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import axios from 'axios'

// Roll No: 22L-7971
// Implemented both part 4 and 5, but part 4 is done better so if possible check part 4

function UserDirectory() {
  const [users, setUsers] = useState([]);
  const inputref = useRef(null);
  const [input, setinput] = useState("");
  const [status, setStatus] = useState("Loading...");

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
      console.log(res);
      setUsers(res.data);
      console.log(users.length);
      setStatus("Loaded Successfully!!!");
    }).catch((e) => {
      console.log("Server Error!", e);;
      setStatus("Failed to load data. Error!");
      alert("Error occured when serching data");
    }
    )

  }, []);

  const filteredusers = useMemo(() => {
    return users.filter((user) => user.name.toLowerCase().includes(input.toLowerCase()) === true || user.email.toLowerCase().includes(input.toLocaleLowerCase()) === true);
  }, [input, users]);

  useEffect(() => {
    inputref.current.focus();
  }, []);

  const handleLoguserId = useCallback((ID) => {
    console.log("User ID: " + ID);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", borderColor: 'gray', borderRadius: "8px", borderStyle: 'solid', width: "80vw", minHeight: "60vh", marginLeft: '9vw', marginRight: '9vw' }}>
      <div style={{ display: "flex", flexDirection: "row", marginBottom: "20px" }}>
        <input value={input} onChange={(val) => setinput(val.target.value)} ref={inputref} type='text' style={{ width: "50vw", marginLeft: 'auto', marginRight: 'auto', height: "20px", marginTop: '30px' }} />
        <span style={{ marginLeft: 'auto', marginRight: 'auto', height: "20px", marginTop: '30px', borderColor: 'black', borderStyle: 'solid', padding: '2px' }}>Status: {status}</span>
      </div>
      {filteredusers.map((val, ind) => {
        return <Usercard key={ind} name={val.name} email={val.email} id={val.id} handleLoguserId={handleLoguserId} />
      })}
    </div>
  )
}

function Usercard({ name, email, id, handleLoguserId }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", borderColor: 'black', borderRadius: "8px", borderStyle: 'solid', width: '60vw', justifyContent: 'center', marginLeft: 'auto', marginBottom: "8px", marginRight: 'auto', alignItems: 'center', gap: "5px", padding: "5px" }}>
      <span>Name: {name}</span>
      <span>Email: {email}</span>
      <button onClick={handleLoguserId(id)}>
        Log ID
      </button>
    </div>
  )
}

export default UserDirectory
