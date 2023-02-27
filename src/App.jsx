import { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import AddTask from "./components/AddTask";
import ToDo from "./components/ToDo";

import "./index.css";

function App() {
  const [taskList, setTaskList] = useState([]);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    let array = localStorage.getItem("taskList");
    if (array) {
      setTaskList(JSON.parse(array));
    }
  }, []);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "todo",
    drop: (item) =>
      addToCompleted(
        item.id,
        item.projectName,
        item.taskDescription,
        item.timestamp,
        item.duration
      ),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addToCompleted = (
    id,
    projectName,
    taskDescription,
    timestamp,
    duration
  ) => {
    const moveTask = taskList.filter((task) => id === task.id);
    setCompleted((completed) => [
      ...completed,
      { moveTask, projectName, taskDescription, timestamp, duration },
    ]);
  };

  console.log(taskList);
  return (
    <div className="App">
      <div className="container">
        <h1 className="text-2xl font-semibold py-3 px-2">
          The Tasks Tracker - Kaban Mode.
        </h1>
        <p className="font-medium text-lg py-1 px-2"> Hi. Lets work.</p>
        <div className="main">
          <p className="font-medium text-lg py-1 px-2"> Click</p>
          <AddTask taskList={taskList} setTaskList={setTaskList} />
          <p className="font-medium text-lg py-1 px-2"> to add a new task.</p>
        </div>
        <div className="flex flex-row">
          <div className="w-full">
            <h2 className="ml-l text-xl font-semibold w-3-4 max-w-lg py-5 px-5">
              To Do:
            </h2>
            {taskList.map((task, i) => (
              <ToDo
                key={i}
                task={task}
                index={i}
                taskList={taskList}
                setTaskList={setTaskList}
              />
            ))}
          </div>
          <div className="w-full" ref={drop}>
            <h2 className="ml-l text-xl font-semibold w-3-4 max-w-lg py-5 px-5">
              Completed:
            </h2>
            {completed.map((task, i) => (
              <ToDo
                key={i}
                task={task}
                index={i}
                taskList={taskList}
                setTaskList={setTaskList}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
