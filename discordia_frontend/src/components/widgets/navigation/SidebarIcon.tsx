import { useLocation } from "react-router-dom";
import { getAbbr } from "../../../store/guilds";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface SidebarIconProps {
  imageURL?: string;
  name?: string;
  to?: string;
  classes?: string;
}

const SidebarIcon: React.FunctionComponent<SidebarIconProps> = (props) => {
  const { to, name, classes = "heading" } = props;
  let { imageURL } = props;
  const location = useLocation();
  if (imageURL) imageURL = `${process.env.rootAPIURL}${imageURL}`;

  const Icon = () =>
    imageURL ? (
      <img
        className="h-12 w-12 rounded-2xl hover:rounded-md transition-all"
        src={imageURL}
        alt={name}
      />
    ) : (
      <span
        className={`select-none flex items-center justify-center h-12 w-12 rounded-2xl bg-brand-dark-300 text-brand-white hover:rounded-md hover:bg-brand transition-all`}
      >
        {getAbbr(name)}
      </span>
    );

  const isActive = to && location.pathname.startsWith(to);
  const activeClasses = isActive ? "rounded-xl" : "rounded-full";

  return (
    <div className={`wrapper ${isActive && "active"}`}>
      <TooltipProvider>
        <Tooltip>
          {isActive && (
            <div className="selected rounded bg-white absolute -left-1 h-12 w-2" />
          )}
          <TooltipTrigger asChild>
            <div
              className={`group cursor-pointer guild-icon flex justify-center mb-2 ${activeClasses} ${classes}`}
            >
              <Icon />
            </div>
          </TooltipTrigger>
          <TooltipContent>{name}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default SidebarIcon;
