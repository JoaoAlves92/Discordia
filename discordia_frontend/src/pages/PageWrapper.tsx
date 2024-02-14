import WSListener from "@/ws-listener";
import { useEffect } from "react";

export type PageWrapperProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & { pagetitle?: string; };

const PageWrapper: React.FunctionComponent<PageWrapperProps> = (props) => {

  useEffect(() => {
    document.title = props.pagetitle ?? 'Discordia';
  }, []);

  return (
    <div {...props}>
      {props.children}
      <WSListener />
    </div>
  );
};

export default PageWrapper;