import Category from "../common/Category";
import Username from "./username";
import { useSelector } from "react-redux";

export interface MemberListProps {
  users: Entity.User[];
}

const MemberList: React.FunctionComponent<MemberListProps> = (
  props: MemberListProps
) => {
  const guild = useSelector((s: Store.AppStore) => s.ui.activeGuild)!;
  const isActive = useSelector(
    (s: Store.AppStore) => s.config.memberListToggled
  );

  const members = props.users.map((u) => (
    <div key={u.id}>
      <Username guild={guild} user={u} />
    </div>
  ));

  return isActive ? (
    <div className="bg-brand-dark-500 w-64">
      <Category
        className="pt-6 pr-2 pl-4 h-10"
        title="Membros"
        count={props.users.length}
      />
      <div className="space-y-4 mt-4 ml-2">{members}</div>
    </div>
  ) : null;
};

export default MemberList;
