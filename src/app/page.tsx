"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Task, Filter } from "../types";

import TaskItem from "../components/TaskItem";
import TaskForm from "../components/TaskForm";
import TaskFilters from "../components/TaskFilters";

const COLORS = ["#b5e61d", "#ffb020", "#f78fb3"];

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Filter>("todas");
  const [loaded, setLoaded] = useState(false);

  // Cargar las tareas guardadas al abrir la página
  useEffect(() => {
    try {
      const saved = localStorage.getItem("tasks");
      if (saved) setTasks(JSON.parse(saved));
    } catch {
      // si lo guardado está dañado, se empieza con la lista vacía
    }
    setLoaded(true);
  }, []);

  // Guardar cada vez que cambian las tareas
  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks, loaded]);

  function addTask(text: string) {
    const clean = text.trim();
    if (clean === "") return;

    setTasks([
      ...tasks,
      {
        id: crypto.randomUUID(),
        text: clean,
        completed: false,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        tilt: Math.floor(Math.random() * 7) - 3,
      },
    ]);
  }

  function toggleTask(id: string) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  function deleteTask(id: string) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  const visibleTasks = tasks.filter((task) => {
    if (filter === "pendientes") return !task.completed;
    if (filter === "completadas") return task.completed;
    return true;
  });

  const pendingCount = tasks.filter((task) => !task.completed).length;

  return (
    <>
      <Image
        className="deco-asomado"
        src="/asomado.png"
        alt=""
        width={150}
        height={265}
      />
      <Image
        className="deco-tableta"
        src="/tableta.png"
        alt=""
        width={220}
        height={263}
      />

      <main className="todo-container">
        <h1 className="todo-title">Lista de Tareas</h1>

        <TaskFilters
          filter={filter}
          onChange={setFilter}
          total={tasks.length}
          pending={pendingCount}
        />

        {tasks.length === 0 && (
          <div className="empty-state">
            <Image src="/pensando.png" alt="" width={160} height={235} />
            <p>Aún no tienes tareas. Agrega la primera.</p>
          </div>
        )}

        {tasks.length > 0 && visibleTasks.length === 0 && (
          <p className="empty-filter">No hay tareas en esta vista.</p>
        )}

        <ul className="todo-list">
          {visibleTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          ))}
        </ul>

        <TaskForm onAdd={addTask} />
      </main>
    </>
  );
}