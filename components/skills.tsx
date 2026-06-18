"use client";

import { motion } from "framer-motion";

import { skills } from "@/config/skills";

export default function Skills() {
  return (
    <div className="w-full h-full flex flex-col justify-center gap-3 p-5">
      <h3 className="text-sm font-semibold text-default-500 mb-1">My Skills</h3>
      {skills.map((skill, i) => (
        <div key={skill.name} className="flex flex-col gap-1">
          <div className="flex justify-between items-baseline">
            <span className="text-xs md:text-sm font-medium">{skill.name}</span>
            <span className="text-xs text-default-400 tabular-nums">
              {skill.level}%
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-default-200/60 overflow-hidden">
            <motion.div
              animate={{ width: `${skill.level}%` }}
              className="h-full rounded-full bg-gradient-to-r from-sky-400 to-indigo-500"
              initial={{ width: 0 }}
              transition={{ duration: 0.9, delay: i * 0.12, ease: "easeOut" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
