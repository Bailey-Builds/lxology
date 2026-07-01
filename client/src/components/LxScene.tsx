/**
 * Animated "LX" hero scene — a large branded letterform with crisp, free-floating
 * learning icons (graduation cap, lightbulb, rocket, chart, trophy, people)
 * gently drifting around it.
 */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGraduationCap,
  faLightbulb,
  faRocket,
  faChartLine,
  faTrophy,
  faPeopleGroup,
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
  /** Positioning classes only (e.g. "left-[3%] top-[54%]"). */
  className: string;
  /** Icon size, e.g. "5rem". Controls scale (FA icons scale by font-size). */
  size: string;
  delay?: string;
  anim?: string;
};

function Icon({ icon, color, className, size, delay, anim = 'lx-float-soft' }: IconProps) {
  return (
    <FontAwesomeIcon
      icon={icon}
      className={`${anim} absolute ${className}`}
      style={{ color, fontSize: size, animationDelay: delay }}
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

      {/* ── Free-floating learning icons ────────────────── */}

      {/* Graduation cap (top-left) */}
      <Icon icon={faGraduationCap} color={BLUE} anim="lx-float" size="5.5rem" className="left-[1%] top-[18%]" />

      {/* Lightbulb (top-right) */}
      <Icon icon={faLightbulb} color={GREEN} anim="lx-drift" size="5rem" className="right-[8%] top-[4%]" />

      {/* Rocket (mid-left) */}
      <Icon icon={faRocket} color={VIOLET} anim="lx-float-soft" delay="0.6s" size="4.5rem" className="left-[3%] top-[56%]" />

      {/* Chart line (mid-right) */}
      <Icon icon={faChartLine} color={BLUE} anim="lx-float-soft" delay="0.9s" size="5rem" className="right-[1%] top-[46%]" />

      {/* Trophy (bottom-center-left) */}
      <Icon icon={faTrophy} color={MAGENTA} anim="lx-float" delay="1.1s" size="4.5rem" className="left-[34%] bottom-[3%]" />

      {/* People (bottom-right) */}
      <Icon icon={faPeopleGroup} color={VIOLET} anim="lx-drift" delay="0.4s" size="5rem" className="right-[22%] bottom-[4%]" />

      {/* A couple of subtle dots for extra life */}
      <span className="lx-float absolute left-[30%] top-[28%] h-3 w-3 rounded-full" style={{ background: GREEN }} />
      <span className="lx-float-soft absolute right-[18%] top-[32%] h-2.5 w-2.5 rounded-full" style={{ background: MAGENTA, animationDelay: '0.5s' }} />
    </div>
  );
}
