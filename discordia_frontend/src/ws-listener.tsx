import { useDispatch, useSelector, useStore } from "react-redux";
import ws from "./store/services/ws";
import { actions as guilds } from "./store/guilds";
import { actions as messages } from "./store/messages";
import { actions as channels } from "./store/channels";
import { actions as auth } from "./store/auth";
import { useEffect } from "react";
import { actions as meta } from "./store/meta";
import { actions as users } from "./store/users";
import { useNavigate } from "react-router-dom";
import { closedModal, focusedInvite } from "./store/ui";

const WSListener: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useStore();
  const hasListenedToWS = useSelector(
    (s: Store.AppStore) => s.meta.hasListenedToWS
  );

  const getState = () => store.getState() as Store.AppStore;

  useEffect(() => {
    if (hasListenedToWS) return;

    ws.on("error", (error: any) => {
      alert(error.data?.message ?? error.message);
    });

    ws.on("CHANNEL_CREATE", (args) => {
      const { auth, ui } = getState();
      const selfCreated = args.creatorId === auth.user!.id;

      dispatch(guilds.channelCreated(args));

      if (selfCreated && ui.activeGuild) {
        dispatch(closedModal());
        navigate(`/channels/${ui.activeGuild.id}/${args.channel.id}`);
      }
    });
    ws.on("CHANNEL_DELETE", (args) => {
      const { ui } = getState();
      const inChannel = args.channelId === ui.activeChannel?.id;

      if (inChannel && ui.activeGuild)
        navigate(`/channels/${ui.activeGuild.id}`);

      dispatch(guilds.channelDeleted(args));
    });
    ws.on("GUILD_MEMBER_ADD", (args) => {
      dispatch(guilds.memberAdded(args));
      dispatch(users.fetched(args.member));
    });
    ws.on("GUILD_MEMBER_REMOVE", (args) =>
      dispatch(guilds.memberRemoved(args))
    );
    ws.on("INVITE_CREATE", (args) => {
      dispatch(guilds.inviteCreated(args));
      dispatch(focusedInvite(args.invite));
    });
    ws.on("GUILD_CREATE", (args) => {
      dispatch(guilds.created(args));
      dispatch(users.fetched(args.guild.members));
      dispatch(closedModal());
      navigate(`/channels/${args.guild.id}`);
    });
    ws.on("GUILD_DELETE", (args) => {
      const { ui } = getState();
      const guildIsActive = args.guildId === ui.activeGuild?.id;
      if (guildIsActive) {
        dispatch(closedModal());
        navigate("/channels/@me");
      }
      guilds.deleted(args);
    });
    ws.on("GUILD_UPDATE", (args) => dispatch(guilds.updated(args)));
    ws.on("TYPING_START", (args) => {
      dispatch(channels.userTyped(args));

      const timeoutMs = 5000;
      setTimeout(() => {
        dispatch(channels.userStoppedTyping(args));
      }, timeoutMs);
    });
    ws.on("GUILD_DELETE", (args) => dispatch(guilds.deleted(args)));
    ws.on("MESSAGE_CREATE", (args) => dispatch(messages.created(args)));
    ws.on("MESSAGE_DELETE", (args) => dispatch(messages.deleted(args)));
    ws.on("MESSAGE_UPDATE", (args) => dispatch(messages.updated(args)));
    ws.on("READY", (args) => {
      dispatch(auth.ready(args));
      dispatch(users.fetched(args.user));
    });
    // ws.on("USER_DELETE", () => {
    //   ws.disconnect();
    //   navigate("/");
    //   dispatch(logoutUser());
    // });
    ws.on("USER_UPDATE", (args) => {
      dispatch(auth.updatedUser(args));
      dispatch(users.updated(args));
    });

    dispatch(meta.listenedToWS());
  }, [hasListenedToWS]);

  return null;
};

export default WSListener;
