import { Crown } from "lucide-react";

export interface UsernameProps {
  user: Entity.User;
  guild?: Entity.Guild;
}

const Username: React.FunctionComponent<UsernameProps> = ({ guild, user }) => {
  const userOwnsGuild = guild?.ownerId === user.id;

  return (
    <div className="flex items-center px-2">
      <div className="avatar mr-2">
        <img
          className="select-none rounded-full w-8 h-8"
          src={`${process.env.rootAPIURL}${user.avatarURL}`}
        />
      </div>
      <div className="tag leading-4">
        <h4 className="font-bold text-sm inline-flex">
          <span className={"text-brand-white"}>{user.username}</span>
          <span className="text-yellow-400 ml-2 mt-1">
            {userOwnsGuild && <Crown className="w-4 h-4" />}
          </span>
        </h4>
      </div>
    </div>
  );
};

export default Username;
