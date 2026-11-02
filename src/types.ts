export type Task = {
    id: string;
    text: string;
    completed: boolean;
    color: string;
    tilt: number;
};

export type Filter = "todas" | "pendientes" | "completadas";