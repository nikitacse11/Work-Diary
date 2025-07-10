import { useEffect, useState } from "react";
import "./workDiary.css";

function WorkDiary() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [allTaskCompleted, setAllTaskCompleted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [details, setDetails] = useState("");
  const [activeTaskIndex, setActiveTaskIndex] = useState(null);

  function handleInputChange(event) {
    setTask(event.target.value);
  }

  function addTask() {
    if (task.trim() === "") return;
    setTask("");
    setTodos([...todos, { text: task, completed: false, details: "" }]);
  }

  function toggleCompletion(index) {
    const updatedTodos = todos.map((todo, idx) => {
      if (idx === index) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
    if (!todos[index].completed) {
      setActiveTaskIndex(index); // Set the active task index for adding details
      setDetails(""); // Reset the details input
    }
  }

  function closeModal() {
    setShowModal(false);
  }

  function handleDetailsInput(event) {
    setDetails(event.target.value);
  }

  function saveDetails() {
    if (activeTaskIndex !== null) {
      const updatedTodos = todos.map((todo, index) => {
        if (index === activeTaskIndex) {
          return { ...todo, details };
        }
        return todo;
      });
      setTodos(updatedTodos);
      setActiveTaskIndex(null); // Clear the active task index after saving details
    }
  }

  useEffect(() => {
    if (todos.length > 0 && todos.every((todo) => todo.completed)) {
      if (!allTaskCompleted) {
        setAllTaskCompleted(true);
        setShowModal(true);
      }
    } else {
      setAllTaskCompleted(false);
    }
  }, [todos, allTaskCompleted]);

  return (
    <>
      <div className="work-diary">
        <div className="container border border-1">
          <div className="date">
            <span style={{ color: "green", fontWeight: "600" }}>Date:</span>
            <input
              type="text"
              className="underline-input"
              style={{ color: "green", fontWeight: "600" }}
            />
          </div>
          <div className="heading mt-4">
            <h2 className="text-center" style={{ color: "" }}>
              Work Diary
            </h2>
          </div>
          <div className="title_detail mt-3 fs-5">
            <p className="text-center" style={{ color: "#165BAA" }}>
              Shape Your Day Today, Own Your Tomorrow!
            </p>
          </div>
          <div className="input-heading mt-2 ms-3">
            <p style={{ fontSize: "17px", marginBottom: "6px" }}>
              Add task for today:
            </p>
          </div>
          <div>
            <input
              type="text"
              placeholder="Add Task"
              className="p-1 ms-3 mt-0 focus-ring focus-ring-info py-1 px-2 rounded-3 outline-none add_input"
              value={task}
              onChange={handleInputChange}
            />
            <button onClick={addTask} className=" add_button ms-4">
              Add
            </button>
          </div>
          <ol>
            {todos.map((item, index) => (
              <li key={index} className="p-1 ms-4" style={{ fontSize: "17px" }}>
                {item.text}{" "}
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleCompletion(index)}
                />{" "}
                <br />
                {/* Show details input only for the active task and when completed */}
                {index === activeTaskIndex && item.completed && (
                  <div className="task-detail-container mt-2">
                    <textarea
                      type="text"
                      placeholder="Add Details"
                      value={details}
                      className="text_area rounded-3"
                      onChange={handleDetailsInput}
                    />
                    <button
                      onClick={saveDetails}
                      className="btn btn-success save_button"
                    >
                      Save
                    </button>
                  </div>
                )}
                {/* Display saved details if they exist */}
                {item.details && <p className="mb-0"> {item.details}</p>}
              </li>
            ))}
          </ol>

          {showModal && (
            <div>
              <h3 className="text-center">All Task Completed!</h3>

              <button
                type="button"
                style={{ marginLeft: "180px" }}
                className="btn btn-success"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default WorkDiary;
