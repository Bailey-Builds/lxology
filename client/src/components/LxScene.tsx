/**
 * Animated "LX" hero scene — a large branded letterform backdrop with small
 * props (leaves, gears, sparkles, cards, dots) gently drifting around it.
 * Inspired by the "FLOW" section; colored in the Lxology palette.
 */

const PURPLE = '#26006B';
const ORANGE = '#FD6A02';
const PINK = '#F5C2D9';
const GREEN = '#7FB08A';

function Leaf({ color = GREEN }: { color?: string }) {
  return (
    <svg viewBox="0 0 40 56" className="h-full w-full">
      <path
        d="M20 2C6 14 4 34 14 50c2 3 4 4 6 4s4-1 6-4c10-16 8-36-6-48z"
        fill={color}
      />
      <path d="M20 8v40" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="2" fill="none" />
    </svg>
  );
}

function Gear({ color = PURPLE }: { color?: string }) {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full">
      <path
        fill={color}
        d="M35.6 2h-7.2l-1.3 6.9a24 24 0 0 0-5.4 2.2l-5.8-3.9-5.1 5.1 3.9 5.8a24 24 0 0 0-2.2 5.4L5.6 30.8v7.2l6.9 1.3c.5 1.9 1.3 3.7 2.2 5.4l-3.9 5.8 5.1 5.1 5.8-3.9c1.7.9 3.5 1.7 5.4 2.2l1.3 6.9h7.2l1.3-6.9c1.9-.5 3.7-1.3 5.4-2.2l5.8 3.9 5.1-5.1-3.9-5.8c.9-1.7 1.7-3.5 2.2-5.4l6.9-1.3v-7.2l-6.9-1.3a24 24 0 0 0-2.2-5.4l3.9-5.8-5.1-5.1-5.8 3.9a24 24 0 0 0-5.4-2.2L35.6 2zM32 42a10 10 0 1 1 0-20 10 10 0 0 1 0 20z"
      />
    </svg>
  );
}

function Sparkle({ color = ORANGE }: { color?: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full">
      <path fill={color} d="M12 0l2.4 7.6L22 10l-7.6 2.4L12 20l-2.4-7.6L2 10l7.6-2.4z" />
    </svg>
  );
}

export default function LxScene() {
  return (
    <div className="relative w-full select-none" style={{ aspectRatio: '5 / 4' }}>
      {/* Soft glow behind the letters */}
      <span className="lx-glow absolute left-1/2 top-1/2 h-2/3 w-2/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${PINK}, transparent 70%)` }} />

      {/* Big LX letters — gently floating as a group */}
      <div className="lx-float-soft absolute inset-0 flex items-center justify-center">
        <span
          className="font-extrabold leading-none"
          style={{ fontSize: 'clamp(9rem, 26vw, 20rem)', color: PURPLE, letterSpacing: '-0.04em' }}
        >
          L
        </span>
        <span
          className="font-extrabold leading-none"
          style={{ fontSize: 'clamp(9rem, 26vw, 20rem)', color: ORANGE, letterSpacing: '-0.04em', marginLeft: '-0.06em' }}
        >
          X
        </span>
      </div>

      {/* Ground line */}
      <span className="absolute left-[6%] right-[6%] bottom-[16%] h-[2px] rounded-full" style={{ background: `${PURPLE}22` }} />

      {/* ── Floating props ─────────────────────────────── */}

      {/* Leaves */}
      <span className="lx-sway absolute left-[4%] top-[24%] h-14 w-10">
        <Leaf />
      </span>
      <span className="lx-sway absolute right-[5%] bottom-[18%] h-16 w-11" style={{ animationDelay: '1.2s' }}>
        <Leaf />
      </span>
      <span className="lx-sway absolute left-[46%] bottom-[10%] h-10 w-7" style={{ animationDelay: '0.6s' }}>
        <Leaf color={PINK} />
      </span>

      {/* Gears (spinning, low opacity) */}
      <span className="lx-spin absolute right-[10%] top-[12%] h-16 w-16 opacity-70">
        <Gear color={PURPLE} />
      </span>
      <span className="lx-spin-rev absolute left-[9%] bottom-[20%] h-12 w-12 opacity-70">
        <Gear color={ORANGE} />
      </span>

      {/* Sparkles */}
      <span className="lx-float absolute left-[40%] top-[10%] h-7 w-7">
        <Sparkle color={ORANGE} />
      </span>
      <span className="lx-float-soft absolute right-[26%] top-[40%] h-5 w-5" style={{ animationDelay: '0.8s' }}>
        <Sparkle color={PURPLE} />
      </span>

      {/* Little document card */}
      <span className="lx-float-soft absolute left-[8%] top-[48%] flex h-14 w-14 flex-col items-start justify-center gap-1.5 rounded-2xl bg-white px-3 shadow-lg ring-1 ring-black/5">
        <span className="h-1.5 w-5 rounded-full" style={{ background: ORANGE }} />
        <span className="h-1.5 w-8 rounded-full" style={{ background: `${PURPLE}99` }} />
        <span className="h-1.5 w-6 rounded-full" style={{ background: `${PURPLE}99` }} />
      </span>

      {/* Play chip */}
      <span className="lx-drift absolute right-[8%] top-[52%] flex h-12 w-12 items-center justify-center rounded-2xl shadow-lg" style={{ background: PURPLE }}>
        <svg viewBox="0 0 24 24" className="h-5 w-5 translate-x-[1px] fill-white">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>

      {/* Floating dots */}
      <span className="lx-float absolute left-[30%] top-[30%] h-3 w-3 rounded-full" style={{ background: ORANGE }} />
      <span className="lx-float-soft absolute right-[18%] bottom-[26%] h-2.5 w-2.5 rounded-full" style={{ background: `${PURPLE}88`, animationDelay: '0.5s' }} />
      <span className="lx-drift absolute left-[20%] bottom-[30%] h-2 w-2 rounded-full" style={{ background: PINK }} />
      <span className="lx-float absolute right-[34%] top-[22%] h-2 w-2 rounded-full" style={{ background: `${PURPLE}66`, animationDelay: '1s' }} />
    </div>
  );
}
