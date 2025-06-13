import { Link } from "react-router";

import {
	DailyTasksList,
	DailyTasksListItem,
} from "@/components/daily-tasks-list";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
} from "@/components/ui/card";
import { useDailyTask } from "@/contexts/daily-task-context";

function IndexView() {
	const { tasks } = useDailyTask();

	return (
		<Card>
			<CardHeader>
				<CardAction>
					<Button variant="link" asChild>
						<Link to="/tasks">Manage Tasks</Link>
					</Button>
				</CardAction>
			</CardHeader>

			<CardContent>
				<DailyTasksList>
					{tasks.map((task) => (
						<DailyTasksListItem
							key={task.id}
							id={task.id}
							content={task.content}
							isCompleted={task.isCompleted}
						/>
					))}
				</DailyTasksList>
			</CardContent>
		</Card>
	);
}

export { IndexView };
