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

interface TaskCreateFormProps {
	formId: string;
	handler: (content: string) => void;
}

const taskCreateFormSchema = z.object({
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

function TaskCreateForm({ formId, handler }: TaskCreateFormProps) {
	const form = useForm<z.infer<typeof taskCreateFormSchema>>({
		resolver: zodResolver(taskCreateFormSchema),
		defaultValues: {
			content: "",
		},
	});

	function onSubmit(values: z.infer<typeof taskCreateFormSchema>) {
		handler(values.content);
	}

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

export { TaskCreateForm };
