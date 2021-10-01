import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [item, setItem] = useState({
    title: "",
    description: "",
  });

  const [items, setItems] = useState([
    {
      title: "",
      description: "",
      _id: "",
    },
  ]);

  const [isPut, setIsPut] = useState(false);
  const [updatedItem, setUpdatedItem] = useState({
    title: "",
    description: "",
    id: "",
  });

  useEffect(() => {
    fetch("/items")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((jsonRes) => setItems(jsonRes))
      .catch((err) => console.log(err));
  }, [items]);

  function handleChange(event) {
    const { name, value } = event.target;
    setItem((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  }

  function addItem(event) {
    event.preventDefault();
    const newItem = {
      title: item.title,
      description: item.description,
    };

    //send item to server
    axios.post("/newitem", newItem);
    console.log(newItem);
    alert("Item added");

    setItem({
      title: "",
      description: "",
    });
  }

  //for delete items
  function deleteItem(id) {
    axios.delete("/delete/" + id);
    alert("item deleted");
    console.log(`deleted item with id ${id}`);
  }

  //for updating items
  function openUpdate(id) {
    setIsPut(true);
    setUpdatedItem((prevInput) => {
      return {
        ...prevInput,
        id: id,
      };
    });
  }

  function updateItem(id) {
    axios.put("/put/" + id, updatedItem);
    alert("item updated");
    console.log(`item with id ${id} updated`);
  }

  function handleUpdate(event) {
    const { name, value } = event.target;
    setUpdatedItem((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
    console.log(updatedItem);
  }
  return (
    <div className="App">
      {!isPut ? (
        <div className="main">
          <input
            onChange={handleChange}
            name="title"
            value={item.title}
            placeholder="title"
          ></input>
          <input
            onChange={handleChange}
            name="description"
            value={item.description}
            placeholder="description"
          ></input>
          <button onClick={addItem}>ADD ITEM</button>
        </div>
      ) : (
        <div className="main">
          <input
            onChange={handleUpdate}
            name="title"
            value={updatedItem.title}
            placeholder="title"
          ></input>
          <input
            onChange={handleUpdate}
            name="description"
            value={updatedItem.description}
            placeholder="description"
          ></input>
          <button onClick={() => updateItem(updatedItem.id)}>
            UPDATE ITEM
          </button>
        </div>
      )}

      {/* for displaying added items list */}
      <h1 style={{ color: "red" }}>ITEM'S LIST</h1>
      {items.map((item) => {
        return (
          <div
            key={item._id}
            style={{ background: "pink", width: "40%", margin: "auto auto" }}
          >
            <br />

            <p>{item.title}</p>
            <p>{item.description}</p>
            <button onClick={() => deleteItem(item._id)}>Delete</button>
            <button onClick={() => openUpdate(item._id)}>Update</button>
            <hr />
          </div>
        );
      })}
    </div>
  );
}

export default App;
