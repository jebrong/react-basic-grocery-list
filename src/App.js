import { useState, useEffect } from "react";

import "./index.css";

function App() {
  const getLocalStorage = () => {
    let list = localStorage.getItem("list");
    if (list) {
      return JSON.parse(localStorage.list);
    } else {
      return [];
    }
  };

  const [item, setItem] = useState({ id: "", option: "" });
  const [list, setList] = useState(getLocalStorage());
  const [editMode, setEditMode] = useState(false);
  getLocalStorage();

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  const handleChange = (e) => {
    let id = new Date().getTime().toString();

    setItem((prev) => {
      return { ...prev, id: id, option: e.target.value };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setList((prev) => {
      return [...prev, item];
    });
    setItem({ id: "", option: "" });
    setEditMode(false);
  };

  const handleDelete = (id) => {
    setList(
      list.filter((e) => {
        return e.id !== id;
      })
    );
  };
  const handleEdit = (ide) => {
    setEditMode(true);

    let x = list.find((e) => {
      return e.id === ide;
    });

    setItem({ id: x.id, option: x.option });

    setList(
      list.filter((e) => {
        return e.id !== ide;
      })
    );
  };
  return (
    <div className="container">
      <h2>Grocery List</h2>
      <form className="container__form" onSubmit={handleSubmit}>
        <input
          placeholder="e.g. eggs"
          onChange={handleChange}
          name="option"
          value={item.option}
        ></input>

        <button className="button-27">{editMode ? "EDIT" : "ADD"}</button>
      </form>
      <div className="container__list">
        {list.map((e) => {
          return (
            <div className="container__list_item" key={e.id}>
              <h4 className="text">{e.option}</h4>
              <button
                className="container__list_item_btn"
                onClick={() => {
                  handleEdit(e.id);
                }}
              >
                EDIT
              </button>
              <button
                className="container__list_item_btn"
                onClick={() => {
                  handleDelete(e.id);
                }}
              >
                DELETE
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
