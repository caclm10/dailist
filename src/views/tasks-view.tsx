import { ArrowLeftIcon, PlusIcon } from "lucide-react";
import { useId } from "react";
import { Link } from "react-router";

import { TaskCreateForm } from "@/components/task-create-form";
import { TasksList, TasksListItem } from "@/components/tasks-list";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
} from "@/components/ui/card";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { useTask } from "@/contexts/task-context";
import { useDialog } from "@/hooks/use-dialog";

function TasksView() {
	const createFormId = useId();
	const createFormDrawer = useDialog();
	const { tasks, createTask } = useTask();

	function handleCreateTask(content: string) {
		createTask(content);
		createFormDrawer.close();
	}

	return (
		<Card>
			<CardHeader>
				<Button variant="ghost" size="icon" asChild>
					<Link to="/">
						<ArrowLeftIcon />
						<span className="sr-only">back</span>
					</Link>
				</Button>
				<CardAction>
					<Drawer
						open={createFormDrawer.isOpen}
						autoFocus={createFormDrawer.isOpen}
						onOpenChange={createFormDrawer.setIsOpen}
					>
						<DrawerTrigger asChild>
							<Button type="button">
								<PlusIcon />
								New Task
							</Button>
						</DrawerTrigger>

						<DrawerContent>
							<DrawerHeader>
								<DrawerTitle>Create New Task</DrawerTitle>
								<DrawerDescription>
									Fill the form below to create a new task.
								</DrawerDescription>
							</DrawerHeader>

							<div className="p-4 pb-0">
								<TaskCreateForm
									formId={createFormId}
									handler={handleCreateTask}
								/>
							</div>

							<DrawerFooter>
								<Button type="submit" form={createFormId}>
									Submit
								</Button>
								<DrawerClose asChild>
									<Button variant="outline">Cancel</Button>
								</DrawerClose>
							</DrawerFooter>
						</DrawerContent>
					</Drawer>
				</CardAction>
			</CardHeader>

			<CardContent>
				<TasksList>
					{tasks.map(({ id, content }) => (
						<TasksListItem key={id} id={id} content={content} />
					))}
				</TasksList>
			</CardContent>
		</Card>
	);
}

export { TasksView };
