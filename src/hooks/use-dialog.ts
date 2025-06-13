import { useState } from "react";

function useDialog() {
	const [isOpen, setIsOpen] = useState(false);
	const open = () => setIsOpen(true);
	const close = () => setIsOpen(false);

	return { isOpen, open, close, setIsOpen };
}

export { useDialog };
