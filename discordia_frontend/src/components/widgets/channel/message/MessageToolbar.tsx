// import { getGuildByChannelId } from "@/store/guilds";
// import { useSelector } from "react-redux";

// export interface MessageToolbarProps {
//   message: Entity.Message;
// }

// const MessageToolbar: React.FunctionComponent<MessageToolbarProps> = ({
//   message,
// }) => {
//   const selfUser = useSelector((s: Store.AppStore) => s.auth.user)!;
//   const guild = useSelector(getGuildByChannelId(message.channelId));

//   const isAuthor = message.authorId === selfUser.id;
//   const canManage = guild?.ownerId === selfUser.id || isAuthor;

//   return (
//     <div className="float-right shadow bg-bg-secondary px-2 rounded cursor-pointer">
//       {/* {isAuthor && (
//         <FontAwesomeIcon
//           onClick={() => dispatch(startedEditingMessage(message.id))}
//           className="mr-2"
//           icon={faPencilAlt}
//         />
//       )} */}
//       {/* {canManage && (
//         <FontAwesomeIcon
//           onClick={() => dispatch(deleteMessage(message.id))}
//           className="danger"
//           icon={faTimes}
//         />
//       )} */}
//     </div>
//   );
// };

// export default MessageToolbar;
