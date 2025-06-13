import { useAutoAnimate } from "@formkit/auto-animate/react";
import { EllipsisVerticalIcon } from "lucide-react";

import { TaskEditForm } from "@/components/task-edit-form";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTask } from "@/contexts/task-context";
import { useDialog } from "@/hooks/use-dialog";
import { useId } from "react";

function TasksList({ children }: { children: React.ReactNode }) {
	const [ref] = useAutoAnimate();

	return (
		<div ref={ref} className="divide-border flex flex-col gap-5 divide-y">
			{children}
		</div>
	);
}

interface TaskListItemProps {
	id: string;
	content: string;
}

function TasksListItem({ id, content }: TaskListItemProps) {
	const deleteConfirmationDialog = useDialog();
	const editDrawer = useDialog();
	const { updateTask, deleteTask } = useTask();
	const editFormId = useId();

	function handleSubmitEdit({ content }: { content: string }) {
		updateTask(id, content);
		editDrawer.close();
	}

	function handleDelete() {
		deleteTask(id);
		deleteConfirmationDialog.close();
	}

	return (
		<>
			<div className="flex items-center gap-4 py-1">
				<p className="grow">{content}</p>

				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button type="button" variant="ghost">
							<EllipsisVerticalIcon />
							<span className="sr-only">actions</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem onClick={editDrawer.open}>
							Edit
						</DropdownMenuItem>
						<DropdownMenuItem
							variant="destructive"
							onClick={deleteConfirmationDialog.open}
						>
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			<Drawer
				open={editDrawer.isOpen}
				onOpenChange={editDrawer.setIsOpen}
				autoFocus={editDrawer.isOpen}
			>
				<DrawerContent>
					<DrawerHeader>
						<DrawerTitle>Edit Task</DrawerTitle>
						<DrawerDescription>
							Fill the form below to update the task.
						</DrawerDescription>
					</DrawerHeader>

					<div className="p-4 pb-0">
						<TaskEditForm
							formId={editFormId}
							content={content}
							onSubmit={handleSubmitEdit}
						/>
					</div>

					<DrawerFooter>
						<Button type="submit" form={editFormId}>
							Submit
						</Button>
						<DrawerClose asChild>
							<Button variant="outline">Cancel</Button>
						</DrawerClose>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>

			<AlertDialog
				open={deleteConfirmationDialog.isOpen}
				onOpenChange={deleteConfirmationDialog.setIsOpen}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Delete Task</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure you want to delete this task? This
							action is destructive and cannot be undone.
						</AlertDialogDescription>
					</AlertDialogHeader>

					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							variant="destructive"
							onClick={handleDelete}
						>
							Delete
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}

export { TasksList, TasksListItem };
