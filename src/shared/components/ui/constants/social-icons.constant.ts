import {
  GithubIcon,
  LinkedinIcon,
  XIcon,
  InstagramIcon,
  FacebookIcon,
  ThreadsIcon,
} from "../icons";

export const SOCIAL_ICON_MAP: Record<string, React.ComponentType> = {
  GitHub: GithubIcon,
  LinkedIn: LinkedinIcon,
  X: XIcon,
  "Twitter / X": XIcon,
  Instagram: InstagramIcon,
  Facebook: FacebookIcon,
  Threads: ThreadsIcon,
  Thread: ThreadsIcon,
};
