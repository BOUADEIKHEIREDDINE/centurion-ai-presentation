import { ArrowDown } from './Icons';
import './ScrollCue.css';

interface ScrollCueProps {
  href: string;
  label: string;
}

export function ScrollCue({ href, label }: ScrollCueProps) {
  return (
    <a className="scroll-cue" href={href}>
      <span>{label}</span>
      <span className="scroll-cue__arrow" aria-hidden="true">
        <ArrowDown />
      </span>
    </a>
  );
}
