import { useState, useEffect } from "react";

const EditTask = ({ task, taskList, setTaskList }) => {
  const [editModal, setEditModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  useEffect(() => {
    setProjectName(task.projectName);
    setTaskDescription(task.TaskDescription);
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;

    if (name === "projectName") setProjectName(value);
    if (name === "taskDescription") setTaskDescription(value);
    return;
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    let taskIndex = taskList.indexOf(task);
    taskList.splice(taskIndex, 1, {
      projectName: projectName,
      taskDescription: taskDescription,
      timestamp: task.timestamp,
      durantion: task.duration,
    });
    localStorage.setItem("taskList", JSON.stringify("taskList"));
    window.location.reload();
    setEditModal(false);
    return;
  };
  return (
    <div>
      <button
        onClick={() => setEditModal(true)}
        className="text-slate-500 font-serif"
        type="button"
      >
        Edit
      </button>
      {editModal ? (
        <div className="">
          <div>
            <div className="flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-100">
              <div className="w9/12 max-w-lg bg-slate-300 rounded-lg shadow-md relative flex flex-col">
                <div className="flex flex-row justify-between p-5">
                  <h3 className="text-3xl font-semibold">Edit Task</h3>
                  <button
                    className="flex items-center justify-center text-center pl-2 pr-2.5
               bg-red-400 uppercase text-sm font-semibold
               text-white py-1 mx-1.5 
              rounded-md hover:opacity-70 hover:text-base"
                    type="button"
                    onClick={() => setEditModal(false)}
                  >
                    X
                  </button>
                </div>
                <form className="p-6">
                  <div>
                    <label
                      className="track-wide uppercase text-xs font-semibold mb-2 block"
                      htmlFor="project-name"
                    >
                      Project Name
                    </label>
                    <input
                      className="w-full bg-gray-20 border py-3 px-4 mb-5 leading-tight focus:outline-none
                     focus:bg-slate-200 border-gray-200"
                      id="project-name"
                      placeholder="Project name"
                      name="projectName"
                      type="text"
                      value={projectName}
                      onChange={handleInput}
                      required
                    />
                  </div>
                  <div>
                    <label
                      className="track-wide uppercase text-xs font-semibold mb-2 block"
                      htmlFor="project-name"
                    >
                      Task Description
                    </label>
                    <textarea
                      className="w-full bg-gray-20 border py-3 px-4 mb-5 leading-tight focus:outline-none
                   focus:bg-slate-200 border-gray-200"
                      placeholder="Task Description"
                      id="task-description"
                      name="taskDescription"
                      value={taskDescription}
                      onChange={handleInput}
                      rows="3"
                    />
                  </div>
                </form>
                <div className="flex justify-center p-6 border-slate-700 rounded">
                  <button
                    className="flex items-center justify-center pl-2 pr-2.5 text-center
               bg-green-500 uppercase text-sm font-semibold text-white py-1 mx-1.5
                rounded-md hover:opacity-70 hover:text-base"
                    type="button"
                    onClick={handleUpdate}
                  >
                    Update Task
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default EditTask;
