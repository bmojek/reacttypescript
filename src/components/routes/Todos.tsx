import React, { useState } from "react";
import { ToDoType } from "../types/Todo.type";
import "../style/Todos.css";
import { useAuth } from "../contexts/AuthContext";
import { useApiContext } from "../contexts/ApiContext";
import { useNavigate } from "react-router-dom";

export const Todos: React.FC = () => {
  const { todos, setTodos } = useApiContext();
  const { user } = useAuth();
  const [newTodo, setNewTodo] = useState("");
  const navigate = useNavigate();

  const filteredTodos = todos
    .filter((todo) => todo.userId === user?.id)
    .reverse();

  const handleAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newTodo.trim() !== "") {
      const newTodoItem: ToDoType = {
        userId: user?.id || 0,
        id: todos.length + 1,
        title: newTodo,
        completed: false,
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo("");
    }
  };

  const handleDeleteTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleToggleTodo = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };
  return (
    <div className="todos-container">
      <div className={`LoginLink ${user ? "display" : ""}`}>
        <p>Zaloguj się żeby zobaczyć Zadania</p>
        <button onClick={() => navigate("../Login")}>Logowanie</button>
      </div>
      <div className={`todos ${user ? "" : "blur"}`}>
        <h2>Twoje zadania</h2>
        <form onSubmit={(e) => handleAddTodo(e)}>
          <input
            type="text"
            placeholder="Dodaj nowe zadanie..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
        </form>
        {filteredTodos.map((todo: ToDoType) => (
          <table key={todo.id}>
            <tbody>
              <tr>
                <td>{todo.title}</td>
                <td>
                  <input
                    className="todoDone"
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggleTodo(todo.id)}
                  />
                </td>
                <td>
                  <button onClick={() => handleDeleteTodo(todo.id)}>
                    Usuń
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        ))}
      </div>
    </div>
  );
};
