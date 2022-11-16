import { useState } from "react";

import "./index.css";

function App() {
  const [item, setItem] = useState({ id: "", option: "" });
  const [list, setList] = useState([]);

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
  };

  const handleDelete = (id) => {
    setList(
      list.filter((e) => {
        return e.id !== id;
      })
    );
  };
  const handleEdit = () => {};
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
        <button className="button-27">ADD</button>
      </form>
      <div className="container__list">
        {list.map((e) => {
          return (
            <div className="container__list_item" key={e.id}>
              <h4 className="text">{e.option}</h4>
              <button
                onClick={() => {
                  handleEdit(e);
                }}
              >
                EDIT
              </button>
              <button
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
