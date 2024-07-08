import React, { useState, useEffect } from "react";

function TodoApp() {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const savedTasks = localStorage.getItem("data");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (inputValue === "") {
      alert("You must write something!");
    } else {
      setTasks([...tasks, { text: inputValue, checked: false }]);
      setInputValue("");
    }
  };

  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].checked = !newTasks[index].checked;
    setTasks(newTasks);
  };

  const removeTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div className="content">
      <div className="todo-app">
        <h2>
          To-Do List <img src="assets/list.png" alt="list" />
        </h2>

        <form className="row" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add your text"
          />
          <button onClick={addTask}>Add</button>
        </form>
        <ul id="list-container">
          {tasks.map((task, index) => (
            <li
              key={index}
              className={task.checked ? "checked" : ""}
              onClick={() => toggleTask(index)}
            >
              {task.text}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  removeTask(index);
                }}
              >
                &times;
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoApp;
