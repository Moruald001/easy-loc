import type { LucideIcon } from "lucide-react";
import React from "react";

interface CardProps {
  title?: string;
  value?: string | number;
  description?: string;
  icon: LucideIcon;
}

export default function Card({ title, value, description, icon }: CardProps) {
  const Icon: LucideIcon = icon;
  return (
    <div className="border border-gray-200  rounded-lg w-full  bg-white flex  justify-between p-2 ">
      <div className="flex flex-col gap-1 ">
        <h2 className="text-[10px] font-sans">{title ?? "STATISTIQUES"}</h2>
        <span className="text-lg font-disp">{value ?? "3000 CFA "}</span>
        <span className="text-[12px] text-sans">
          {description ?? "description"}
        </span>
      </div>{" "}
      <Icon className=" scale-70" />
    </div>
  );
}
