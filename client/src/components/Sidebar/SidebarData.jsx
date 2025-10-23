import { HiMiniAcademicCap } from "react-icons/hi2";
import { MdSpaceDashboard } from "react-icons/md";
import { MdWorkOutline } from "react-icons/md";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";

export const SidebarData = [
  {
    title: "Dashboard",
    icon: <MdSpaceDashboard className="size-6"/>,
    link: "/dashboard",
  },
  {
    title: "Files",
    icon: <HiMiniAcademicCap className="size-6"/>,
    link: "/dashboard/files",
  },
    {
    title: "Lab",
    icon: <MdWorkOutline className="size-6"/>,
    link: "/dashboard/labs",
  },
    {
    title: "Personal",
    icon: <RiGitRepositoryPrivateFill className="size-6"/>,
    link: "/dashboard/personal",
  },

];
