import { useId } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { PlainLabel } from "@/components/ui/plain-label";
import { useDailyTask } from "@/contexts/daily-task-context";
import type { Task } from "@/types/models";

function DailyTasksList({ children }: { children?: React.ReactNode }) {
	return (
		<div className="divide-border flex flex-col gap-5 divide-y">
			{children}
		</div>
	);
}

interface DailyTasksListItemProps {
	id: Task["id"];
	content: Task["content"];
	isCompleted: Task["isCompleted"];
}

function DailyTasksListItem({
	id,
	content,
	isCompleted,
}: DailyTasksListItemProps) {
	const checkboxId = useId();
	const { toggleCompleted } = useDailyTask();

	function handleCheckedChange() {
		toggleCompleted(id);
	}

	return (
		<div className="relative flex items-center gap-4 py-1">
			<p className="grow">{content}</p>

			<Checkbox
				id={checkboxId}
				checked={isCompleted}
				onCheckedChange={handleCheckedChange}
			/>

			<PlainLabel className="absolute inset-0" htmlFor={checkboxId}>
				<span className="sr-only">toggle status</span>
			</PlainLabel>
		</div>
	);
}

export { DailyTasksList, DailyTasksListItem };
