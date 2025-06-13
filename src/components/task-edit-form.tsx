import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { Task } from "@/types/models";

const taskEditFormSchema = z.object({
	content: z
		.string()
		.min(1, {
			message: "The content field is required.",
		})
		.max(255, {
			message:
				"The content field must not be greater than 255 characters.",
		}),
});

interface TaskEditFormProps {
	formId: string;
	content: Task["content"];
	onSubmit: (values: z.infer<typeof taskEditFormSchema>) => void;
}

function TaskEditForm({ formId, content, onSubmit }: TaskEditFormProps) {
	const form = useForm<z.infer<typeof taskEditFormSchema>>({
		resolver: zodResolver(taskEditFormSchema),
		defaultValues: {
			content,
		},
	});

	return (
		<Form {...form}>
			<form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name="content"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Content</FormLabel>
							<FormControl>
								<Input
									placeholder="Write the content here"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
}

export { TaskEditForm };
