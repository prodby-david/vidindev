import GithubIcon from "../icons/GithubIcon";
import LinkedinIcon from "../icons/LinkedinIcon";
import XIcon from "../icons/XIcon";
import InstagramIcon from "../icons/InstagramIcon";
import FacebookIcon from "../icons/FacebookIcon";
import ThreadsIcon from "../icons/ThreadsIcon";

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
