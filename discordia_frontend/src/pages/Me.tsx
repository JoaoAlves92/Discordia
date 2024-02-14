import AppNavbar from "@/components/widgets/navigation/AppNavbar";
import Sidebar from "@/components/widgets/navigation/Sidebar";
import { pageSwitched } from "@/store/ui";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const MePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(pageSwitched({ channel: null, guild: null }));
  }, []);

  return (
    <div>
      <Sidebar />
      <AppNavbar/>
    </div>
  );
};

export default MePage;
