import { useState } from "react";
import "../global.scss";
import "./App.scss";

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [loadinPage, setLoadingPage] = useState(true);
  const [counterNewTask, setCounterNewTask] = useState(0);
  const [counterCompletedTask, setCounterCompletedTask] = useState(0);

  const newTask = {
    id: Math.random(),
    title: newTaskTitle,
    isComplete: false,
  };

  function handleCreateNewTask() {
    if (!newTaskTitle) return;
    setTasks((Task) => [...Task, newTask]);
    setNewTaskTitle("");
    setLoadingPage(false);
    setCounterNewTask(counterNewTask + 1);
  }

  function handleToggleTaskCompletion(id: number) {
    const taskIndex = tasks.findIndex((task) => {
      return task.id == id;
    });
    const tempTasks = [...tasks];
    tempTasks[taskIndex].isComplete = !tempTasks[taskIndex].isComplete;

    setTasks(tempTasks);

    if (tempTasks[taskIndex].isComplete) {
      setCounterCompletedTask(counterCompletedTask + 1);
    } else {
      setCounterCompletedTask(counterCompletedTask - 1);
    }
  }

  function handleDeleteTask(id: number) {
    const remainingTasks = tasks.filter((task) => task.id !== id);
    setTasks(remainingTasks);
    setCounterNewTask(counterNewTask - 1);

    const tempTasks = [...tasks];

    const taskIndex = tasks.findIndex((task) => {
      return task.id == id;
    });

    if (tempTasks[taskIndex].isComplete) {
      setCounterCompletedTask(counterCompletedTask - 1);
    }

    event?.preventDefault();
  }

  return (
    <>
      <header>
        <img src="src\assets\Logo.svg" alt="" />
      </header>

      <main>
        <div className="wrapperInputAndbutton">
          <input
            type="text"
            placeholder="Adicione uma nova tarefa"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
          <a onClick={handleCreateNewTask}>
            <span>Criar</span>
            <img src="src\assets\Layer 2.svg" alt="" />
          </a>
        </div>

        <div className="wrapperTasksOverview">
          <div className="createdTasks">
            <span>Tarefas criadas</span>
            <span>{counterNewTask}</span>
          </div>

          <div className="finishedTasks">
            <span>Concluídas</span>
            <span>
              {counterCompletedTask} de {counterNewTask}
            </span>
          </div>
        </div>

        <div className="Tasks">
          {loadinPage ? (
            <div className="screenBeforeList">
              <img src="src\assets\Clipboard.svg" alt="" />
              <p>Você ainda não tem tarefas cadastradas</p>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
          ) : (
            <>
              {tasks.map((task) => (
                <div key={task.id} className="wrapperNewTasks">
                  <div
                    className={task.isComplete ? "completed" : ""}
                    style={{ display: "flex", gap: "1rem" }}
                  >
                    <input
                      type="checkbox"
                      checked={task.isComplete}
                      onClick={() => handleToggleTaskCompletion(task.id)}
                    />
                    <p key={task.id} style={{ color: "var(--gray-100)" }}>
                      {task.title}
                    </p>
                  </div>
                  <a href="">
                    <img
                      className="trashImg"
                      src="src\assets\lixeira.svg"
                      alt=""
                      onClick={() => handleDeleteTask(task.id)}
                    />
                  </a>
                </div>
              ))}
            </>
          )}
        </div>
      </main>
    </>
  );
}
