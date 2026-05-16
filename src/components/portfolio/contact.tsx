import { CONTACTS } from "#/data/cv";

/** Closing contact strip — oversized headline + a list of links. */
export function Contact() {
	return (
		<section
			className="grid grid-cols-2 items-end gap-12 border-t border-white/12 pb-[60px] pt-[100px] max-[960px]:grid-cols-1"
			id="contact"
		>
			<div>
				<h2 className="font-cond text-[clamp(48px,8vw,120px)] uppercase leading-[0.9] tracking-[-0.04em]">
					Let's
					<br />
					build
					<br />
					<span className="text-brand">/</span> something.
				</h2>
			</div>
			<div className="flex flex-col gap-3.5">
				{CONTACTS.map((c) => (
					<a
						key={c.lbl}
						href={c.href}
						target={c.href.startsWith("http") ? "_blank" : undefined}
						rel="noreferrer"
						className="group grid grid-cols-[80px_1fr_16px] items-baseline gap-4 border-t border-white/12 py-3.5 transition-[padding] last:border-b hover:pl-2"
					>
						<span className="font-mono text-[11px] uppercase tracking-[-0.22px] text-steel">
							{c.lbl}
						</span>
						<span className="font-cond text-xl uppercase tracking-[-0.02em]">
							{c.val}
						</span>
						<span className="font-cond text-base transition-transform group-hover:translate-x-1 group-hover:text-brand">
							↗
						</span>
					</a>
				))}
			</div>
		</section>
	);
}
