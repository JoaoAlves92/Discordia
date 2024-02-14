import TextBasedChannel from "@/components/widgets/channel/TextBasedChannel";
import AppNavbar from "@/components/widgets/navigation/AppNavbar";
import Sidebar from "@/components/widgets/navigation/Sidebar";
import MemberList from "@/components/widgets/user/MemberList";
import { getChannel, getGuild } from "@/store/guilds";
import { pageSwitched } from "@/store/ui";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

type GuildPageParams = {
  guildId: string;
  channelId: string;
}

const GuildPage = () => {
  const { channelId, guildId } = useParams<GuildPageParams>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ui = useSelector((s: Store.AppStore) => s.ui);
  const guild = useSelector(getGuild(guildId!));
  const channel = useSelector(getChannel(guildId!, channelId!));

  useEffect(() => {
    if (!channel) {
      const newChannel = guild.channels[0];
      dispatch(pageSwitched({ channel: newChannel, guild }));
      navigate(`/channels/${guild!.id}/${newChannel.id}`);
    } else {
      dispatch(pageSwitched({ channel, guild }));
    }
  }, [guild, channel]);

  return (
    <div>
      <Sidebar />
      {channel ? (
        <div className="bg-bg-primary">
          <AppNavbar />
          <div
            style={{ height: "calc(100vh - 48px)" }}
            className="flex bg-brand-dark-300"
          >
            {ui.activeChannel && <TextBasedChannel />}
            <MemberList users={guild.members} />
          </div>
        </div>
      ) : (
        <div className="bg-bg-tertiary" />
      )}
    </div>
  );
};

export default GuildPage;
