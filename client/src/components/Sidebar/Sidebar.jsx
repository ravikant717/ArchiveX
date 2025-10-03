import SidebarBottomLogo from "./SidebarBottomLogo";
import SidebarItems from "./SidebarItems";
import SignedInUser from "./SignedInUser";

const Sidebar = () => {
  //TODO: Fetch the real user data into signed in user
  return (
    <div className="flex flex-col  h-screen "> 
    <SidebarItems/>
    <SidebarBottomLogo/>
    <SignedInUser/>
      </div>
  );
};

export default Sidebar;
