import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/hoverla-soft/li-banners')({
  component: LiBanners,
  head: () => ({
    meta: [{ title: 'Hoverla/Soft — LinkedIn banner concepts' }],
  }),
})

type Banner = {
  id: string
  slug: string
  name: string
  desc: string
}

const banners: Array<Banner> = [
  {
    id: 'V1',
    slug: 'v1-path-hero',
    name: 'Path hero — refined',
    desc: 'Closest to your current banner. Same tagline, real logo top-left, mountain centered with lime glow on the right.',
  },
  {
    id: 'V2',
    slug: 'v2-services-grid',
    name: 'Services pill grid',
    desc: 'Big logo + value prop on the left, service chips along the bottom (Web, Mobile, AI/ML, Cloud, Product). Tells visitors what you do at a glance.',
  },
  {
    id: 'V3',
    slug: 'v3-mountain-minimal',
    name: 'Mountain minimal',
    desc: 'Premium / iconic. Logo dead center, single tagline "Software at altitude.", small footer marks. Travels well across feed sizes.',
  },
  {
    id: 'V4',
    slug: 'v4-hiring-culture',
    name: "We're hiring / culture",
    desc: '"Climb with us." headline + team avatar cluster + open-roles CTA. Swap the placeholder gradient circles for real photos before posting.',
  },
  {
    id: 'V5',
    slug: 'v5-bold-typographic',
    name: 'Bold typographic',
    desc: '"REACH THE PEAK." set huge. Mostly visual, services in a small caption right. Best when you want LinkedIn visitors to remember the brand, not read it.',
  },
]

const ASSET_BASE = '/hoverla-soft/li-banners'

function LiBanners() {
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-[#f1f1f3] font-sans">
      <header className="mx-auto max-w-[1640px] px-12 pt-14 pb-6">
        <h1 className="mb-2 text-2xl font-semibold tracking-tight">
          Hoverla<span className="text-[#C8E548]">/</span>Soft — LinkedIn banner concepts
        </h1>
        <p className="max-w-[820px] text-[15px] leading-relaxed text-[#8e8e96]">
          Five directions, all using your real H/Soft logo + the IG-style dark mountain with
          lime side-glow. Each is sized exactly 1584 × 396 (LinkedIn cover).
        </p>
      </header>

      <main className="mx-auto grid max-w-[1640px] gap-14 px-12 pb-24">
        {banners.map((banner, i) => (
          <section
            key={banner.slug}
            className="overflow-hidden rounded-[14px] border border-[#1f1f25] bg-[#111114]"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-[#1f1f25] px-6 py-[18px]">
              <div className="text-xs font-medium tracking-[3px] text-[#C8E548]">{banner.id}</div>
              <div className="text-lg font-semibold tracking-tight">{banner.name}</div>
              <div className="min-w-[280px] flex-1 text-sm text-[#8e8e96]">{banner.desc}</div>
            </div>
            <div className="bg-black">
              <img
                src={`${ASSET_BASE}/${banner.slug}.png`}
                alt={`${banner.id} ${banner.name}`}
                loading={i === 0 ? 'eager' : 'lazy'}
                className="block h-auto w-full"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2 border-t border-[#1f1f25] px-6 py-[14px] text-[13px] text-[#8e8e96]">
              <span>1584 × 396</span>
              <a
                href={`${ASSET_BASE}/${banner.slug}.png`}
                download
                className="rounded-full border border-[#1f1f25] px-3 py-[6px] text-xs tracking-[1px] text-[#f1f1f3] no-underline transition-colors hover:border-[#C8E548] hover:text-[#C8E548]"
              >
                Download PNG
              </a>
              <a
                href={`${ASSET_BASE}/${banner.slug}.svg`}
                download
                className="rounded-full border border-[#1f1f25] px-3 py-[6px] text-xs tracking-[1px] text-[#f1f1f3] no-underline transition-colors hover:border-[#C8E548] hover:text-[#C8E548]"
              >
                Download SVG
              </a>
            </div>
          </section>
        ))}
      </main>

      <footer className="mx-auto max-w-[1640px] px-12 pb-16 text-[13px] leading-relaxed text-[#8e8e96]">
        <p>
          The mountain background and logo are consistent across all five concepts. The mountain
          is a procedural rendering inspired by your IG visual direction (dark photographic feel
          + lime side-glow). The logo is a recreation of your H/Soft mark — drop in the original
          SVG to swap it cleanly.
        </p>
      </footer>
    </div>
  )
}
