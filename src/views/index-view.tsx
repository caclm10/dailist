import { Link } from "react-router";

import { Button } from "@/components/ui/button";
import { Card, CardAction, CardHeader } from "@/components/ui/card";

function IndexView() {
	return (
		<Card>
			<CardHeader>
				<CardAction>
					<Button variant="link" asChild>
						<Link to="/tasks">Manage Tasks</Link>
					</Button>
				</CardAction>
			</CardHeader>
		</Card>
	);
}

export { IndexView };
