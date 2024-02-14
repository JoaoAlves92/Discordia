import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SidebarIcon from "./SidebarIcon";
import CreateGuild from "../modals/CreateGuild";
import { Separator } from "@/components/ui/separator";

const SidebarIcons: React.FunctionComponent = () => {
  const user = useSelector((s: Store.AppStore) => s.auth.user)!;
  const { list: guilds } = useSelector(
    (s: Store.AppStore) => s.entities.guilds
  )!;

  const guildsSet = new Set(guilds.map((guild) => guild.id));
  const filteredGuilds = [...guildsSet].map((id) =>
    guilds.find((guild) => guild.id === id)
  );

  const guildIcons = filteredGuilds.map((g) => (
    <Link to={`/channels/${g?.id}`} key={g?.id}>
      <SidebarIcon
        to={`/channels/${g?.id}`}
        name={g?.name}
      />
    </Link>
  ));

  return (
    <div className="bg-brand-dark-900 h-screen float-left p-3 flex flex-col bg-bg-tertiary">
      <Link to="/channels/@me">
        <SidebarIcon
          to="/channels/@me"
          imageURL={user?.avatarURL}
          name={user?.username}
        />
      </Link>

      <Separator className="my-2" />
      <div className="flex justify-center mb-1">
        <div className="h-0.5 w-8 rounded-sm bg-bg-modifier-accent mb-1" />
      </div>
      {guildIcons}
      <CreateGuild />
    </div>
  );
};

export default SidebarIcons;
