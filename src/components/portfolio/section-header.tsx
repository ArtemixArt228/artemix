/** Shared section header: eyebrow / title / count. Reused by the work,
 *  stack and background sections. */
export function SectionHeader({
	eyebrow,
	title,
	count,
}: {
	eyebrow: string;
	title: string;
	count: string;
}) {
	return (
		<div className="mb-10 grid grid-cols-[200px_1fr_auto] items-baseline gap-6 max-[960px]:grid-cols-1">
			<span className="font-mono text-xs uppercase text-steel">{eyebrow}</span>
			<h2 className="font-cond text-[clamp(32px,4.5vw,62px)] uppercase leading-none tracking-tighter text-white">
				{title}
			</h2>
			<span className="font-mono text-xs uppercase text-steel">{count}</span>
		</div>
	);
}
