import { useStore } from "@nanostores/react";
import { nanoid } from "nanoid";
import { atom } from "nanostores";
import { createContext, useContext, useEffect, useRef } from "react";

import type { Task } from "@/types/models";
import { getIdb, setIdb } from "@/utils/idb";

const $tasks = atom<Task[]>([]);

interface TaskContextContract {
	tasks: Task[];
	createTask: (content: Task["content"]) => void;
	updateTask: (id: Task["id"], content: Task["content"]) => void;
	deleteTask: (id: Task["id"]) => void;
}

const TaskContext = createContext<TaskContextContract>({
	tasks: [],
	createTask: (content) => {},
	updateTask: (id, content) => {},
	deleteTask: (id) => {},
});

function useTask() {
	return useContext(TaskContext);
}

function TaskProvider({ children }: { children?: React.ReactNode }) {
	const didInit = useRef(false);
	const tasks = useStore($tasks);

	function createTask(content: Task["content"]) {
		const newTask: Task = {
			id: nanoid(),
			content,
			isCompleted: false,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		const updatedTasks = [...tasks, newTask];

		console.log(updatedTasks);
		setIdb("tasks", updatedTasks);
		$tasks.set(updatedTasks);
	}

	function updateTask(id: Task["id"], content: Task["content"]) {
		const taskIndex = tasks.findIndex((task) => task.id === id);
		if (taskIndex === -1) return;

		const task = tasks[taskIndex];
		task.content = content;

		const updatedTasks = [...tasks];
		updatedTasks[taskIndex] = task;

		setIdb("tasks", updatedTasks);
		$tasks.set(updatedTasks);
	}

	function deleteTask(id: Task["id"]) {
		const updatedTasks = tasks.filter((task) => task.id !== id);

		setIdb("tasks", updatedTasks);
		$tasks.set(updatedTasks);
	}

	console.log(tasks);

	useEffect(() => {
		if (!didInit.current) {
			didInit.current = true;

			getIdb<Task[]>("tasks").then((tasks) => {
				if (tasks) {
					$tasks.set(tasks);
				}
			});
		}
	}, []);

	return (
		<TaskContext value={{ tasks, createTask, updateTask, deleteTask }}>
			{children}
		</TaskContext>
	);
}

export { TaskProvider, useTask };
