import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

import { DailyTaskProvider } from "@/contexts/daily-task-context";
import { TaskProvider } from "@/contexts/task-context";
import { MainLayout } from "@/layouts/main-layout";
import { IndexView } from "@/views/index-view.tsx";
import { TasksView } from "@/views/tasks-view";

import "@/assets/css/app.css";

createRoot(document.getElementById("root")!).render(
	<BrowserRouter>
		<Routes>
			<Route element={<MainLayout />}>
				<Route
					index
					element={
						<DailyTaskProvider>
							<IndexView />
						</DailyTaskProvider>
					}
				/>
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
