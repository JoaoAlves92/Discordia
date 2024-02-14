import { useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CreateInvite from "../modals/CreateInvite";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import React from "react";
import { UserPlus, Tv, Bolt, Trash2 } from "lucide-react";
import CreateChannel from "../modals/CreateChannel";

const DialogItem = React.forwardRef((props: any, forwardedRef) => {
  const { triggerChildren, children, onSelect, onOpenChange, ...itemProps } =
    props;

  return (
    <Dialog onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          {...itemProps}
          ref={forwardedRef}
          className="DropdownMenuItem"
          onSelect={(event) => {
            event.preventDefault();
            onSelect && onSelect();
          }}
        >
          {triggerChildren}
        </DropdownMenuItem>
      </DialogTrigger>
      {children}
    </Dialog>
  );
});

const GuildDropdown = () => {
  const guild = useSelector((s: Store.AppStore) => s.ui.activeGuild);

  return guild ? (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full h-12">
        <h3 className="text-brand-white text-lg h-12 flex items-center justify-center hover:bg-brand-dark-900 hover:rounded-md">
          {guild.name}
        </h3>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DialogItem
          triggerChildren={
            <>
              <span>Convidar pessoas</span>
              <DropdownMenuShortcut>
                <UserPlus className="w-5 h-5" />
              </DropdownMenuShortcut>
            </>
          }
        >
          <CreateInvite />
        </DialogItem>
        <DialogItem
          triggerChildren={
            <>
              <span>Criar canal</span>
              <DropdownMenuShortcut>
                <Tv className="w-5 h-5" />
              </DropdownMenuShortcut>
            </>
          }
        >
          <CreateChannel />
        </DialogItem>
        <DialogItem
          triggerChildren={
            <>
              <span>Config. do servidor</span>
              <DropdownMenuShortcut>
                <Bolt className="w-5 h-5" />
              </DropdownMenuShortcut>
            </>
          }
        >
          <CreateInvite />
        </DialogItem>
        <DropdownMenuSeparator />
        <DialogItem
          triggerChildren={
            <>
              <span>Deletar servidor</span>
              <DropdownMenuShortcut>
                <Trash2 className="w-5 h-5" />
              </DropdownMenuShortcut>
            </>
          }
        >
          <CreateInvite />
        </DialogItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : null;
};

export default GuildDropdown;
