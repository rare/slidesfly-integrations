import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';

export const meta: SlideMeta = {
  title: 'open-slide on Slidesfly',
  createdAt: '2026-08-06T00:00:00.000Z',
};

export const design: DesignSystem = {
  palette: {
    bg: '#0b1020',
    text: '#f8fafc',
    accent: '#67e8f9',
  },
  fonts: {
    display: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  typeScale: {
    hero: 128,
    body: 40,
  },
  radius: 24,
};

const frame = {
  width: '100%',
  height: '100%',
  boxSizing: 'border-box',
  padding: 112,
  background:
    'radial-gradient(circle at 85% 12%, rgba(103,232,249,.22), transparent 30%), #0b1020',
  color: '#f8fafc',
  fontFamily: design.fonts.body,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  overflow: 'hidden',
} as const;

const eyebrow = {
  margin: 0,
  color: '#67e8f9',
  fontSize: 24,
  fontWeight: 700,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
} as const;

const footer = (index: string) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 24, color: '#94a3b8' }}>
    <span>open-slide 1.17.1 · Slidesfly compatibility fixture</span>
    <span>{index} / 3</span>
  </div>
);

const Cover: Page = () => (
  <main style={frame}>
    <div>
      <p style={eyebrow}>Reproducible proof pack</p>
      <h1 style={{ margin: '46px 0 24px', fontSize: 126, lineHeight: 0.94, letterSpacing: '-0.065em' }}>
        Build with open-slide.
        <br />
        Share with Slidesfly.
      </h1>
      <p style={{ margin: 0, maxWidth: 1120, color: '#cbd5e1', fontSize: 38, lineHeight: 1.35 }}>
        A pinned, multi-file static export running inside the Slidesfly reader sandbox.
      </p>
    </div>
    {footer('1')}
  </main>
);

const Pipeline: Page = () => {
  const steps = [
    ['01', 'Author', 'React pages in slides/'],
    ['02', 'Build', 'open-slide build → dist/'],
    ['03', 'Publish', 'Zip dist/ with index.html at root'],
    ['04', 'Share', 'Stable Slidesfly reader URL'],
  ];
  return (
    <main style={frame}>
      <div>
        <p style={eyebrow}>Artifact path</p>
        <h2 style={{ margin: '34px 0 62px', fontSize: 88, letterSpacing: '-0.045em' }}>
          Static files in, governed URL out.
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 22 }}>
          {steps.map(([number, title, detail]) => (
            <section
              key={number}
              style={{ border: '1px solid #334155', borderRadius: 24, padding: 30, minHeight: 250 }}
            >
              <strong style={{ color: '#67e8f9', fontSize: 24 }}>{number}</strong>
              <h3 style={{ margin: '44px 0 18px', fontSize: 38 }}>{title}</h3>
              <p style={{ margin: 0, color: '#94a3b8', fontSize: 24, lineHeight: 1.45 }}>{detail}</p>
            </section>
          ))}
        </div>
      </div>
      {footer('2')}
    </main>
  );
};

const Boundary: Page = () => (
  <main style={frame}>
    <div>
      <p style={eyebrow}>Evidence boundary</p>
      <h2 style={{ margin: '34px 0 54px', fontSize: 92, letterSpacing: '-0.045em' }}>
        Compatible does not mean endorsed.
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
        <section style={{ border: '1px solid #164e63', background: '#08334499', borderRadius: 24, padding: 38 }}>
          <h3 style={{ margin: 0, color: '#67e8f9', fontSize: 34 }}>Verified here</h3>
          <p style={{ margin: '24px 0 0', color: '#e2e8f0', fontSize: 28, lineHeight: 1.5 }}>
            Pinned source, deterministic build, root index, opaque-origin storage fallback, and reader navigation.
          </p>
        </section>
        <section style={{ border: '1px solid #334155', background: '#0f172acc', borderRadius: 24, padding: 38 }}>
          <h3 style={{ margin: 0, color: '#cbd5e1', fontSize: 34 }}>Not claimed</h3>
          <p style={{ margin: '24px 0 0', color: '#94a3b8', fontSize: 28, lineHeight: 1.5 }}>
            No upstream endorsement, no universal-deck guarantee, and no anonymous multi-file publishing claim.
          </p>
        </section>
      </div>
    </div>
    {footer('3')}
  </main>
);

export default [Cover, Pipeline, Boundary] satisfies Page[];
