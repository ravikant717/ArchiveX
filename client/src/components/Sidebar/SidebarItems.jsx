import React from 'react'
import { useNavigate } from "react-router";
import { SidebarData } from "./SidebarData";

const SidebarItems = () => {
      const navigate = useNavigate();

  return (
        <ul className="p-4 flex flex-col gap-4 w-64 ">
      {SidebarData.map((val, key) => (
          <li className="flex gap-4 cursor-pointer hover:bg-green-500 hover:text-amber-500 py-4 px-8 rounded-3xl group"key={key}  onClick={() => navigate(val.link)}>
          <div className="">{val.icon}</div>
          <div className="font-bold group-hover:text-white text-cyan-500">{val.title}</div>
        </li>
      ))}
    </ul>
  )
}

export default SidebarItems