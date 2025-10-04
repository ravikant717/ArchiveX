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
    title: "Academic",
    icon: <HiMiniAcademicCap className="size-6"/>,
    link: "/dashboard/academic",
  },
    {
    title: "Career",
    icon: <MdWorkOutline className="size-6"/>,
    link: "/dashboard/career",
  },
    {
    title: "Personal",
    icon: <RiGitRepositoryPrivateFill className="size-6"/>,
    link: "/dashboard/personal",
  },

];
