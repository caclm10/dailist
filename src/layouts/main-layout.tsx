import { Outlet } from "react-router";

function MainLayout() {
	return (
		<div className="flex min-h-dvh justify-center px-4 py-16">
			<div className="w-full max-w-2xl">
				<Outlet />
			</div>
		</div>
	);
}

export { MainLayout };
