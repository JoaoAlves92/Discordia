import { Input } from "@/components/ui/input";
import {
  BellRing,
  Hash,
  HelpCircle,
  Inbox,
  Pin,
  Search,
  Users2,
} from "lucide-react";
import { useSelector } from "react-redux";

const AppNavbar: React.FunctionComponent = () => {
  const channel = useSelector((s: Store.AppStore) => s.ui.activeChannel);

  return (
    <div className="shadow-elevation flex items-center h-12 px-5 bg-brand-dark-300">
      <Hash className="mr-2 text-brand-grey" />
      <h3 className="flex-grow font-bold ml-1 text-brand-white">
        {channel?.name}
      </h3>

      <nav className="flex space-x-4">
        <Pin className="w-6 h-6 text-brand-grey hover:text-brand-white cursor-pointer" />
        <BellRing className="w-6 h-6 text-brand-grey hover:text-brand-white cursor-pointer" />
        <Users2 className="w-6 h-6 text-brand-grey hover:text-brand-white cursor-pointer" />
        <div className="relative">
          <Input
            className="h-6 bg-brand-dark-900 border-none text-brand-white"
            type="search"
            placeholder="Buscar"
          />
          <Search className="absolute top-1 w-4 h-4 text-brand-grey right-2" />
        </div>

        <Inbox className="w-6 h-6 text-brand-grey hover:text-brand-white cursor-pointer" />
        <HelpCircle className="w-6 h-6 text-brand-grey hover:text-brand-white cursor-pointer" />
      </nav>
    </div>
  );
};

export default AppNavbar;
