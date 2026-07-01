/**
 * Animated "LX" hero scene — a large branded letterform with crisp icon chips
 * (puzzle, timer, people, target, laptop, classroom board) gently drifting
 * around it. Colored in the Lxology palette.
 */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPuzzlePiece,
  faStopwatch,
  faUsers,
  faBullseye,
  faLaptop,
  faChalkboardUser,
  type IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

const PURPLE = '#26006B';
const ORANGE = '#FD6A02';

type ChipProps = {
  icon: IconDefinition;
  className: string;
  variant: 'purple' | 'orange' | 'white';
  delay?: string;
  anim?: string;
};

function Chip({ icon, className, variant, delay, anim = 'lx-float-soft' }: ChipProps) {
  const styles =
    variant === 'purple'
      ? { background: PURPLE, color: '#fff' }
      : variant === 'orange'
        ? { background: ORANGE, color: '#fff' }
        : { background: '#fff', color: PURPLE };

  return (
    <span
      className={`${anim} absolute flex items-center justify-center rounded-2xl shadow-lg ${
        variant === 'white' ? 'ring-1 ring-black/5' : ''
      } ${className}`}
      style={{ ...styles, animationDelay: delay }}
    >
      <FontAwesomeIcon icon={icon} className="h-1/2 w-1/2" />
    </span>
  );
}

export default function LxScene() {
  return (
    <div className="relative w-full select-none" style={{ aspectRatio: '5 / 4' }} aria-hidden="true">
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

      {/* ── Floating icon chips ─────────────────────────── */}

      {/* People (top-left) */}
      <Chip icon={faUsers} variant="white" anim="lx-float" className="left-[2%] top-[20%] h-16 w-16" />

      {/* Puzzle (top-right) */}
      <Chip icon={faPuzzlePiece} variant="purple" anim="lx-drift" className="right-[8%] top-[10%] h-14 w-14" />

      {/* Target (mid-left) */}
      <Chip icon={faBullseye} variant="orange" anim="lx-float-soft" delay="0.6s" className="left-[6%] top-[54%] h-14 w-14" />

      {/* Laptop (mid-right) */}
      <Chip icon={faLaptop} variant="white" anim="lx-float-soft" delay="0.9s" className="right-[3%] top-[46%] h-16 w-16" />

      {/* Stopwatch (bottom-center-left) */}
      <Chip icon={faStopwatch} variant="orange" anim="lx-float" delay="1.1s" className="left-[38%] bottom-[6%] h-14 w-14" />

      {/* Classroom board (bottom-right) */}
      <Chip icon={faChalkboardUser} variant="purple" anim="lx-drift" delay="0.4s" className="right-[26%] bottom-[10%] h-14 w-14" />

      {/* A couple of subtle dots for extra life */}
      <span className="lx-float absolute left-[30%] top-[28%] h-3 w-3 rounded-full" style={{ background: ORANGE }} />
      <span className="lx-float-soft absolute right-[20%] top-[34%] h-2.5 w-2.5 rounded-full" style={{ background: `${PURPLE}88`, animationDelay: '0.5s' }} />
    </div>
  );
}
