import SidebarContent from "./SidebarContent";
import SidebarIcons from "./SidebarIcons";

const Sidebar: React.FunctionComponent = () => {
  return (
    <div className="sidebar flex float-left">
      <SidebarIcons />
      <SidebarContent />
    </div>
  );
};

export default Sidebar;
