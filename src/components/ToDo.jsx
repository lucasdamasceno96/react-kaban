import { useState, useEffect } from "react";
import { useDrag } from "react-dnd";
import EditTask from "./EditTask";

const ToDo = ({ task, index, taskList, setTaskList }) => {
  const [time, setTime] = useState(task.duration);
  const [running, setRunning] = useState(false);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "todo",
    item: {
      id: index,
      projectName: task.projectName,
      taskDescription: task.taskDescription,
      timestamp: task.timestamp,
      duration: task.duration,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  const handleStop = () => {
    setRunning(false);
    let taskIndex = taskList.indexOf(task);
    taskList.splice(taskIndex, 1, {
      projectName: task.projectName,
      taskDescription: task.taskDescription,
      timestamp: task.timestamp,
      duration: time,
    });
    localStorage.setItem("taskList", JSON.stringify(taskList));
    window.location.reload();
  };
  const handleDelete = (itemId) => {
    let removeIndex = taskList.indexOf(task);
    taskList.splice(removeIndex, 1);
    localStorage.setItem("taskList", JSON.stringify(taskList));
    window.location.reload();

    /* setTaskList((currentTasks) =>
      currentTasks.filter((todo) => todo.id !== itemId)
    );
    return; */
  };

  return (
    <div
      className="flex flex-col items-start justify-start bg-slate-300 my-6 py-6 ml-6 px-6 w-3/4 max-w-lg"
      ref={drag}
    >
      <div className="w-full flex flex-row justify-between">
        <p className="font-semibold font-serif pb-6 mb-2 text-lg">
          {task.projectName}
        </p>
        <EditTask
          task={task}
          index={index}
          taskList={taskList}
          setTaskList={setTaskList}
        />
      </div>
      <p>{task.taskDescription} </p>

      <div className="w-full flex flex-col items-center justify-center">
        <div className="text-xl font-semibold py-3">
          <span>{("0" + Math.floor((time / 3600000) % 24)).slice(-2)}:</span>
          <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
          <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
        </div>
        <div className="w-1/3 max-w-sm flex flex-row justify-evenly p-2 gap-2">
          {running ? (
            <div>
              <button
                type="button"
                className="bg-red-300 text-white font-bold py-2 px-4 rounded cursor-pointer"
                onClick={handleStop}
              >
                Stop
              </button>
            </div>
          ) : (
            <div>
              <button
                type="button"
                className="bg-green-400 text-white font-bold py-2 px-4 rounded  cursor-pointer"
                onClick={() => setRunning(true)}
              >
                Start
              </button>
            </div>
          )}
          <button
            type="button"
            className="bg-blue-400 text-white font-bold py-2 px-4 rounded cursor-pointer"
            onClick={() => {
              setTime(0);
            }}
          >
            Reset
          </button>
        </div>
      </div>

      <div className="w-full flex justify-end">
        <button
          className="text-red-400 font-serif"
          type="button"
          onClick={handleDelete}
        >
          delete
        </button>
      </div>
    </div>
  );
};

export default ToDo;
