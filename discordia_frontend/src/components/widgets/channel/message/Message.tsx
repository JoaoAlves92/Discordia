import moment from "moment";
import { useSelector } from "react-redux";

import { getUser } from "@/store/users";
import { getChannelMessages } from "@/store/messages";
import MessageBox from "../MessageBox";
// import MessageToolbar from "./MessageToolbar";

export interface MessageProps {
  message: Entity.Message;
}

const Message: React.FunctionComponent<MessageProps> = ({
  message,
}: MessageProps) => {
  const author = useSelector(getUser(message.authorId))!;
  const messages = useSelector(getChannelMessages(message.channelId));
  const editingMessageId = useSelector(
    (s: Store.AppStore) => s.ui.editingMessageId
  );

  const createdAt = new Date(message.createdAt);

  const isExtra = () => {
    const i = messages.findIndex((m) => m.id === message.id);
    const prev = messages[i - 1];
    if (!prev) return false;

    const minsSince = moment(createdAt).diff(prev.createdAt, "minutes");
    const minsToSeparate = 5;

    return minsSince <= minsToSeparate && prev.authorId === message.authorId;
  };

  const leftSide = () => {
    return isExtra() ? (
      <span className="timestamp text-xs">
        {moment(createdAt).format("HH:mm")}
      </span>
    ) : (
      <img
        className="rounded-full cursor-pointer w-10 h-10"
        src={`${process.env.rootAPIURL}${author.avatarURL}`}
        alt={author.username}
      />
    );
  };

  const messageHeader = () => {
    if (isExtra()) return;

    const days = moment(new Date()).diff(createdAt, "day");
    const day = {
      [1]: "Ontem",
      [0]: "Hoje",
      [-1]: "Amanhã",
    }[days];
    const timestamp = day ? `[${day}] [às] HH:mm` : "DD/MM/YYYY";

    return (
      <>
        <span className="text-base heading hover:underline cursor-pointer mr-2">
          {author.username}
        </span>
        <span className="text-xs">{moment(createdAt).format(timestamp)}</span>
      </>
    );
  };

  const MessageContent = () =>
    editingMessageId === message.id ? (
      <MessageBox content={message.content} editingMessageId={message.id} />
    ) : (
      <div className="relative">
        <div className="normal whitespace-pre-wrap">
          {message.content}
          {message.updatedAt && (
            <span className="select-none muted edited text-xs ml-1">
              (edited)
            </span>
          )}
        </div>
      </div>
    );

  const messageClass = `message hover:bg-brand-dark-500 flex ${!isExtra() && ""}`;

  return (
    <div className={messageClass}>
      <div className="flex-shrink-0 left-side text-xs w-16 mr-2 pl-5 pt-1">
        {leftSide()}
      </div>
      <div className="relative flex-grow px-2">
        <div className="absolute toolbar right-0 -mt-3 z-10">
          {/* <MessageToolbar message={message} /> */}
        </div>
        {messageHeader()}
        <MessageContent />
      </div>
      <div className="right-side w-12" />
    </div>
  );
};

export default Message;
