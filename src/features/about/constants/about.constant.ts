import { AboutData } from "../about.types";

export const ABOUT_DATA: AboutData = {
  category: "ABOUT ME",
  title: "A little about me",
  description:
    "I’m a software engineer who enjoys building thoughtful digital products, solving interesting problems, and turning ideas into things people can actually use.",
  note: "Im ",
  imageSrc: "/images/about2.jpg",
  infoItems: [
    {
      id: "based-in",
      label: "BASED IN",
      value: "Metro Manila, Philippines",
      iconName: "mapPin",
    },
    {
      id: "focus",
      label: "FOCUS",
      value: "Software Engineering",
      iconName: "laptop",
    },
    {
      id: "interests",
      label: "INTERESTS",
      value: "Technology · AI · Music",
      iconName: "heart",
    },
    {
      id: "currently-exploring",
      label: "CURRENTLY EXPLORING",
      value: "System Design, AWS, LLMs",
      iconName: "compass",
    },
  ],
};
