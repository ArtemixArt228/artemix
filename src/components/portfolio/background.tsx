import { useEffect } from "react";

/** Atmospheric layer — cursor light + ambient bokeh. Uses route-scoped
 *  classes from portfolio.css (verbose gradients/masks Tailwind can't express). */
export function Background() {
	useEffect(() => {
		const onMove = (e: PointerEvent) => {
			document.documentElement.style.setProperty("--cx", `${e.clientX}px`);
			document.documentElement.style.setProperty("--cy", `${e.clientY}px`);
		};
		window.addEventListener("pointermove", onMove);
		return () => window.removeEventListener("pointermove", onMove);
	}, []);

	return (
		<div className="bg" aria-hidden="true">
			<div className="grid-lines" />
			<div className="blob a" />
			<div className="blob b" />
			<div className="blob c" />
			<div className="cursor-light" />
			<div className="noise" />
		</div>
	);
}
