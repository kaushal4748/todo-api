import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [newId, setNewId] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newCompleted, setNewCompleted] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    getList();
  }, []);


  const getList = () => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((result) => result.json())
      .then((resp) => {
        setData(resp);
      });
  };


  const addUser = () => {
    const newTodo = {
      id: parseInt(newId),
      title: newTitle,
      completed: newCompleted,
    };

    fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      body: JSON.stringify(newTodo),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((result) => result.json())
      .then((newTodo) => {
        setData([...data, newTodo]);
        setNewId("");
        setNewTitle("");
        setNewCompleted(false);
      });
  };


  const updateUser = () => {
    const updatedTodo = {
      id: editingId,
      title: newTitle,
      completed: newCompleted,
    };

    fetch(`https://jsonplaceholder.typicode.com/todos/${editingId}`, {
      method: "PUT",
      body: JSON.stringify(updatedTodo),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((updatedTodo) => {
        setData(
          data.map((item) => (item.id === editingId ? updatedTodo : item))
        );
        setNewId("");
        setNewTitle("");
        setNewCompleted(false);
        setEditingId(null);
      });
  };

  const startEditing = (item) => {
    setEditingId(item.id);
    setNewId(item.id);
    setNewTitle(item.title);
    setNewCompleted(item.completed);
  };


  const deleteUser = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "DELETE",
    }).then(() => {
      setData((prevData) => prevData.filter((item) => item.id !== id));
    });
  };

  return (
    <div className="App">
      <h1>To Do List</h1>
      <table border={1}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Completed</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.completed ? "Yes" : "No"}</td>
              <td>
                <button onClick={() => deleteUser(item.id)}>DELETE</button>
                <button onClick={() => startEditing(item)}>EDIT</button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>
              <input
                type="number"
                value={newId}
                onChange={(e) => setNewId(e.target.value)}
                placeholder="Add new id"
              />
            </td>
            <td>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Add new title"
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={newCompleted}
                onChange={(e) => setNewCompleted(e.target.checked)}
              />
            </td>
            <td>
                <button  onClick={updateUser}>UPDATE USER</button>
              
                <button onClick={addUser}>ADD USER</button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default App;



// import React, { useState } from 'react'

// function App(){
// const [button,setbutton]=useState("")
// console.log(button);


// const arr=[];
// for (let i=1;i<10;i++){
//   arr.push(i)
// }
//   return(
//     <div>
//     {arr.map=(item)=>(
//       <button onClick={setbutton} key={item}>button{item}</button>
//     )}

//     </div>
//   )
// }

// export default App;




