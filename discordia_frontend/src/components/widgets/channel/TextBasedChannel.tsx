import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchMessages, getChannelMessages } from "@/store/messages";
import MessageBox from "./MessageBox";
import TextChannelHeader from "./TextChannelHeader";
import Message from "./message/Message";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

const TextBasedChannel: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const channel = useSelector((s: Store.AppStore) => s.ui.activeChannel)!;
  const messages = useSelector(getChannelMessages(channel.id), shallowEqual);

  useEffect(() => {
    dispatch(fetchMessages(channel.id));

    const element = document.querySelector("#messages")!;
    element.scrollTop = element.scrollHeight;
  }, [messages.length]);

  const messagesSet = new Set(messages.map((m) => m.id));
  const filteredMessages = [...messagesSet].map((id) =>
    messages.find((m) => m.id === id)
  );

  return (
    <div className="h-full flex flex-col flex-grow">
      <ScrollArea id="messages" className="mb-5 mr-1 mt-1 flex-grow">
        <TextChannelHeader />
        <Separator />
        <div className="mt-4 space-y-4">
          {filteredMessages.map((m) => (
            <Message key={m.id} message={m} />
          ))}
        </div>
      </ScrollArea>
      <MessageBox />
    </div>
  );
};

export default TextBasedChannel;
