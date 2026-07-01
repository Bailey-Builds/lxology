/**
 * Animated "LX" hero scene — a large branded letterform with crisp, free-floating
 * icons (puzzle, timer, people, target, laptop, classroom board) gently drifting
 * around it.
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

// Icon accent palette
const VIOLET = '#5C2D91';
const MAGENTA = '#8B2D91';
const BLUE = '#2D6CDF';
const GREEN = '#7ED957';

type IconProps = {
  icon: IconDefinition;
  color: string;
  className: string;
  delay?: string;
  anim?: string;
};

function Icon({ icon, color, className, delay, anim = 'lx-float-soft' }: IconProps) {
  return (
    <FontAwesomeIcon
      icon={icon}
      className={`${anim} absolute ${className}`}
      style={{ color, animationDelay: delay }}
    />
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

      {/* ── Free-floating icons ─────────────────────────── */}

      {/* People (top-left) */}
      <Icon icon={faUsers} color={BLUE} anim="lx-float" className="left-[2%] top-[20%] h-12 w-12" />

      {/* Puzzle (top-right) */}
      <Icon icon={faPuzzlePiece} color={VIOLET} anim="lx-drift" className="right-[8%] top-[8%] h-12 w-12" />

      {/* Target (mid-left) */}
      <Icon icon={faBullseye} color={MAGENTA} anim="lx-float-soft" delay="0.6s" className="left-[5%] top-[54%] h-11 w-11" />

      {/* Laptop (mid-right) */}
      <Icon icon={faLaptop} color={BLUE} anim="lx-float-soft" delay="0.9s" className="right-[2%] top-[46%] h-12 w-12" />

      {/* Stopwatch (bottom-center-left) */}
      <Icon icon={faStopwatch} color={GREEN} anim="lx-float" delay="1.1s" className="left-[38%] bottom-[5%] h-11 w-11" />

      {/* Classroom board (bottom-right) */}
      <Icon icon={faChalkboardUser} color={VIOLET} anim="lx-drift" delay="0.4s" className="right-[26%] bottom-[8%] h-12 w-12" />

      {/* A couple of subtle dots for extra life */}
      <span className="lx-float absolute left-[30%] top-[28%] h-3 w-3 rounded-full" style={{ background: GREEN }} />
      <span className="lx-float-soft absolute right-[20%] top-[34%] h-2.5 w-2.5 rounded-full" style={{ background: MAGENTA, animationDelay: '0.5s' }} />
    </div>
  );
}
