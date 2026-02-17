import React from "react";
import {
  TbDental,
  TbHeart,
  TbStethoscope,
  TbEye,
  TbBone,
  TbRibbonHealth,
} from "react-icons/tb";

// static list of service topics used by multiple UI components
export const serviceTopics = [
  {
    slug: "dental",
    title: "Dental Care",
    desc: "Modern dental treatment with advanced facilities",
    icon: <TbDental size={60} />, // rendered where needed
    bg: "#EAF7FF",
  },
  {
    slug: "heart",
    title: "Heart Care",
    desc: "Top-tier cardiac diagnosis & treatment",
    icon: <TbHeart size={60} color="#D62828" />,
    bg: "#FFECEC",
  },
  {
    slug: "pediatrics",
    title: "Pediatrics",
    desc: "Complete health solutions for children",
    icon: <TbStethoscope size={60} color="#805500" />,
    bg: "#FFF6CC",
  },
  {
    slug: "eye",
    title: "Eye Care",
    desc: "Advanced vision care & laser treatments",
    icon: <TbEye size={60} color="#0A7B83" />,
    bg: "#E6FFE6",
  },
  {
    slug: "oncology",
    title: "Oncology",
    desc: "Comprehensive cancer screening & therapy",
    icon: <TbRibbonHealth size={60} color="#7B2CBF" />,
    bg: "#FBE4FF",
  },
  {
    slug: "orthopedics",
    title: "Orthopedics",
    desc: "Bone & joint treatment with surgical support",
    icon: <TbBone size={60} color="#8B4513" />,
    bg: "#FFF1E6",
  },
];
