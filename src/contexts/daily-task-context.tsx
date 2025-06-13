import { useStore } from "@nanostores/react";
import { atom } from "nanostores";
import { createContext, useContext, useEffect, useRef } from "react";

import type { Task } from "@/types/models";
import { getIdb, setIdb } from "@/utils/idb";

const $tasks = atom<Task[]>([]);

interface DailyTaskContextContract {
	tasks: Task[];
	toggleCompleted: (id: Task["id"]) => void;
}

const DailyTaskContext = createContext<DailyTaskContextContract>({
	tasks: [],
	toggleCompleted: (_) => {},
});

function useDailyTask() {
	return useContext(DailyTaskContext);
}

function DailyTaskProvider({ children }: { children?: React.ReactNode }) {
	const didInit = useRef(false);
	const tasks = useStore($tasks);

	function toggleCompleted(id: Task["id"]) {
		const taskIndex = tasks.findIndex((task) => task.id === id);
		if (taskIndex === -1) return;

		const task = tasks[taskIndex];
		task.isCompleted = !task.isCompleted;
		task.updatedAt = new Date();

		const updatedTasks = [...tasks];
		updatedTasks[taskIndex] = task;

		setIdb("tasks", updatedTasks);
		$tasks.set(updatedTasks);
	}

	async function init() {
		const tasks = await getIdb<Task[]>("tasks");
		const resetTime = await getIdb<Date>("resetTime");

		const now = new Date();
		const _resetTime = resetTime || new Date(now);
		_resetTime.setHours(18, 0, 0, 0);

		const shouldReset = now >= _resetTime;

		if (shouldReset) {
			_resetTime.setDate(_resetTime.getDate() + 1);
		}

		if (tasks) {
			if (shouldReset) {
				tasks.forEach((task) => {
					task.isCompleted = false;
				});
				setIdb("tasks", tasks);
			}

			$tasks.set(tasks);
		}

		if (shouldReset || !resetTime) {
			setIdb("resetTime", _resetTime);
		}
	}

	useEffect(() => {
		if (!didInit.current) {
			didInit.current = true;

			init();
		}
	}, []);

	return (
		<DailyTaskContext value={{ tasks, toggleCompleted }}>
			{children}
		</DailyTaskContext>
	);
}

export { DailyTaskProvider, useDailyTask };
