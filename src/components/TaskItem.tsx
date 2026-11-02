import { Task } from "../types";

type Props = {
    task: Task;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
};

export default function TaskItem({ task, onToggle, onDelete }: Props) {
    return (
        <li
            className={`todo-item ${task.completed ? "completed" : ""}`}
            style={
                {
                    backgroundColor: task.color,
                    "--tilt": `${task.tilt}deg`,
                } as React.CSSProperties
            }
        >
            <input
                type="checkbox"
                id={task.id}
                checked={task.completed}
                onChange={() => onToggle(task.id)}
            />
            <label htmlFor={task.id}>{task.text}</label>
            <button
                type="button"
                className="delete-btn"
                onClick={() => onDelete(task.id)}
                aria-label="Borrar tarea"
            >
                ✕
            </button>
        </li>
    );
}