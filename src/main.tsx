import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

import { MainLayout } from "@/layouts/main-layout";
import { IndexView } from "@/views/index-view.tsx";
import { TasksView } from "@/views/tasks-view";

import "@/assets/css/app.css";
import { TaskProvider } from "@/contexts/task-context";

createRoot(document.getElementById("root")!).render(
	<BrowserRouter>
		<Routes>
			<Route element={<MainLayout />}>
				<Route index element={<IndexView />} />
				<Route
					path="tasks"
					element={
						<TaskProvider>
							<TasksView />
						</TaskProvider>
					}
				/>
			</Route>
		</Routes>
	</BrowserRouter>,
);
