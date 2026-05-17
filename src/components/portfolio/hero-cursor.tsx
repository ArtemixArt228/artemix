import { type RefObject, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/** Photo cursor — a circular portrait that replaces the OS cursor while the
 *  pointer is inside `targetRef`. Position is written straight to the node's
 *  transform (no re-render per move). Clicking the hero toggles its size; it
 *  hides over interactive elements so their native pointer shows instead. */
export function HeroCursor({
	targetRef,
}: {
	targetRef: RefObject<HTMLElement | null>;
}) {
	const dotRef = useRef<HTMLDivElement>(null);
	const overInteractiveRef = useRef(false);
	const [active, setActive] = useState(false);
	const [enlarged, setEnlarged] = useState(false);
	const [overInteractive, setOverInteractive] = useState(false);

	useEffect(() => {
		const target = targetRef.current;
		const dot = dotRef.current;
		if (!target || !dot) return;

		const isInteractive = (node: EventTarget | null) =>
			node instanceof Element && node.closest("a, button") !== null;

		const move = (e: PointerEvent) => {
			if (e.pointerType !== "mouse") return;
			dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
			const over = isInteractive(e.target);
			if (over !== overInteractiveRef.current) {
				overInteractiveRef.current = over;
				setOverInteractive(over);
			}
		};
		const enter = (e: PointerEvent) => {
			if (e.pointerType === "mouse") setActive(true);
		};
		const leave = () => setActive(false);
		const click = (e: MouseEvent) => {
			if (isInteractive(e.target)) return;
			setEnlarged((v) => !v);
		};

		target.addEventListener("pointermove", move);
		target.addEventListener("pointerenter", enter);
		target.addEventListener("pointerleave", leave);
		target.addEventListener("click", click);
		return () => {
			target.removeEventListener("pointermove", move);
			target.removeEventListener("pointerenter", enter);
			target.removeEventListener("pointerleave", leave);
			target.removeEventListener("click", click);
		};
	}, [targetRef]);

	return (
		<div
			ref={dotRef}
			aria-hidden="true"
			className={cn(
				"pointer-events-none fixed left-0 top-0 z-50 overflow-hidden rounded-full border border-white/80 transition-[opacity,width,height] duration-300",
				enlarged ? "size-48" : "size-24",
				active && !overInteractive ? "opacity-100" : "opacity-0",
			)}
		>
			<img
				src="/portrait.jpg"
				alt=""
				className="size-full object-cover object-center grayscale"
			/>
		</div>
	);
}
