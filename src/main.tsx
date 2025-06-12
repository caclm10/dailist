import { IndexView } from "@/views/index-view.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@/assets/css/app.css";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<IndexView />
	</StrictMode>,
);
