import { useSelector } from "react-redux";
import SideBarFooter from "./SidebarFooter";
import { Link } from "react-router-dom";
import GuildDropdown from "../common/GuildDropdown";
import { Separator } from "@/components/ui/separator";
import { Hash } from "lucide-react";

const SidebarContent: React.FunctionComponent = () => {
  const { activeGuild, activeChannel } = useSelector(
    (s: Store.AppStore) => s.ui
  );

  const channels = activeGuild?.channels.map((c) => (
    <Link
      key={c.id}
      to={`/channels/${activeGuild!.id}/${c.id}`}
      className={`
          cursor-pointer flex items-center rounded h-8 p-2 pl-3
          hover:bg-brand-dark-900
          ${c.id === activeChannel?.id && "bg-brand-dark-300"}`}
    >
      <Hash className="w-5 h-5 mr-1 text-brand-grey" />
      <span>{c.name}</span>
    </Link>
  ));

  return (
    <div className="flex flex-col bg-brand-dark-500 w-60">
      <div className="items-center shadow-elevation cursor-pointer h-12 pl-2.5 pr-4">
        <GuildDropdown />
      </div>
      <Separator />
      <nav className="flex-grow px-2 pt-4 space-y-4">{channels}</nav>
      <SideBarFooter />
    </div>
  );
};

export default SidebarContent;
