import { AboutData } from "../../about.types";

export const ABOUT_DATA: AboutData = {
  category: "ABOUT ME",
  title: "Building with Purpose, Not Complexity",
  description:
    "I believe great software should make complicated tasks feel simple. I take the time to understand the real problem first, then build dependable, easy-to-use web applications that people genuinely enjoy using.",
  imageSrc: "/images/about.jpg",
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
      value: "Full-Stack Software Engineering",
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
      value: "Mobile Development, Cloud Computing, AI",
      iconName: "compass",
    },
  ],
};
