import { useSelector } from "react-redux";

const TextChannelHeader: React.FunctionComponent = () => {
  const channel = useSelector((s: Store.AppStore) => s.ui.activeChannel)!;

  return (
    <div className="m-4 pb-6 border-bottom text-brand-white">
      <span className="rounded-full">
      </span>
      <h1 className="text-3xl font-bold my-2">Bem-vindo(a) a #{channel.name}!</h1>
      <p className="lead">Esse é o começo do canal #{channel.name}.</p>
    </div>
  );
};

export default TextChannelHeader;
