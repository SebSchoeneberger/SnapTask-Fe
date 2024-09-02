import { useState } from "react";

export default function TaskSteps({ steps, setSteps }) {
  const [isAdding, setIsAdding] = useState(false);
  const [editTaskNumber, setEditTaskNumber] = useState(null);

  return (
    <div className=" my-4">
      <div>
        <div className="flex flex-col mb-2 gap-1">
          <p className="text-left label-text mb-2">Task Steps</p>
          {steps.map((step, index) =>
            editTaskNumber === index ? (
              <div key={index}>
                <AddStep step={step} index={index} setIsAdding={setIsAdding} setSteps={setSteps} setEditTaskNumber={setEditTaskNumber} />
              </div>
            ) : (
              <TaskStep
                key={index}
                step={step}
                index={index}
                setIsAdding={setIsAdding}
                setEditTaskNumber={setEditTaskNumber}
                setSteps={setSteps}
                steps={steps}
              />
            )
          )}
        </div>
        {isAdding ? (
          <AddStep setIsAdding={setIsAdding} setSteps={setSteps} setEditTaskNumber={setEditTaskNumber} />
        ) : (
          <div className="text-left">
            <button
              onClick={() => {
                setIsAdding(true);
                setEditTaskNumber(null);
              }}
              className="btn btn-ghost btn-sm">
              <div className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 28 28" strokeWidth="1.5" stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Add a step
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export function AddStep({ setIsAdding, setSteps, step, index, setEditTaskNumber }) {
  const [error, setError] = useState(null);
  const [newStep, setNewStep] = useState((step && step.description) || "");

  function add(e) {
    e.preventDefault();
    if (newStep.trim() === "") {
      setError("Step cannot be empty");
      return;
    }
    setSteps((prev) => [...prev, { description: newStep, isCompleted: false }]);
    setIsAdding(false);
    setNewStep("");
  }

  function update(e) {
    e.preventDefault();
    if (newStep.trim() === "") {
      setError("Step cannot be empty");
      return;
    }

    setSteps((prev) => {
      prev[index] = { description: newStep, isCompleted: false };
      return prev;
    });
    setEditTaskNumber(null);
  }

  function handleChange(e) {
    setError(null);
    setNewStep(e.target.value);
  }

  return (
    <>
      <input
        value={newStep}
        onChange={handleChange}
        className={`resize-none w-full text-sm input textarea-bordered mb-1 ${error ? "textarea-error" : ""}`}
        placeholder="Add a step"></input>
      <div className="flex justify-start gap-2 mt-2">
        <button onClick={!step ? add : update} className="btn btn-outline btn-sm btn-primary p-2 rounded-lg">
          {!step ? "Add" : "Save"}
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsAdding(false);
            setEditTaskNumber(null);
          }}
          className="btn btn-outline btn-secondary btn-sm p-2 rounded-lg">
          Cancel
        </button>
      </div>
    </>
  );
}

export function TaskStep({ step, index, setIsAdding, setEditTaskNumber, setSteps, steps, checkbox, setTask, task }) {
  const [completed, setCompleted] = useState(step.isCompleted);

  function handleClick(e) {
    setEditTaskNumber(index);
    setIsAdding(false);
  }

  function handleDelete(e) {
    e.preventDefault();
    const updatedSteps = steps.filter((_, i) => i !== index);
    setSteps(updatedSteps);
  }

  function handleCheckbox(e) {
    setCompleted(e.target.checked);
    const _steps = task.steps;
    _steps[index].isCompleted = e.target.checked;
    setTask({ ...task, steps: _steps });
    // setTask({ ...task, steps: task.steps.map((s, i) => (i === index ? { ...s, isCompleted: e.target.checked } : s)) });
  }

  return (
    <>
      <label
        onClick={setSteps && handleClick}
        className={`label text-left justify-start flex bg-base-300 w-full gap-4 py-2 px-4 rounded-lg  ${
          setSteps && "cursor-pointer hover:bg-base-100 "
        }`}>
        {checkbox ? (
          <input checked={completed} onChange={handleCheckbox} type="checkbox" className="checkbox rounded-none bg-base-100" />
        ) : (
          <p className="font-light">{index + 1}. </p>
        )}
        <div className={`flex gap-2 items-center ${setSteps && "w-full"}`}>
          <span className="">{step.description}</span>
        </div>
        {setSteps && (
          <svg
            onClick={handleDelete}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-4 hover:fill-accent cursor-pointer">
            <path
              fillRule="evenodd"
              d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </label>
    </>
  );
}
