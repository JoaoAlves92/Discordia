import { useSelector } from "react-redux";
import Username from "../user/username";

const SideBarFooter = () => {
  const user = useSelector((s: Store.AppStore) => s.auth.user)!;
  return (
    <div className="select-all relative flex items-center bg-brand-dark-900 py-2">
      <Username user={user} />
    </div>
  );
};

export default SideBarFooter;
