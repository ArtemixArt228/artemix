import { type RefObject, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/** Photo cursor — a circular portrait that replaces the OS cursor while the
 *  pointer is inside `targetRef`. Position is written straight to the node's
 *  transform (no re-render per move), matching the Background cursor pattern. */
export function HeroCursor({
	targetRef,
}: {
	targetRef: RefObject<HTMLElement | null>;
}) {
	const dotRef = useRef<HTMLDivElement>(null);
	const [active, setActive] = useState(false);

	useEffect(() => {
		const target = targetRef.current;
		const dot = dotRef.current;
		if (!target || !dot) return;

		const move = (e: PointerEvent) => {
			if (e.pointerType !== "mouse") return;
			dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
		};
		const enter = (e: PointerEvent) => {
			if (e.pointerType === "mouse") setActive(true);
		};
		const leave = () => setActive(false);

		target.addEventListener("pointermove", move);
		target.addEventListener("pointerenter", enter);
		target.addEventListener("pointerleave", leave);
		return () => {
			target.removeEventListener("pointermove", move);
			target.removeEventListener("pointerenter", enter);
			target.removeEventListener("pointerleave", leave);
		};
	}, [targetRef]);

	return (
		<div
			ref={dotRef}
			aria-hidden="true"
			className={cn(
				"pointer-events-none fixed left-0 top-0 z-50 size-24 overflow-hidden rounded-full border border-white/80 transition-opacity duration-200",
				active ? "opacity-100" : "opacity-0",
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
