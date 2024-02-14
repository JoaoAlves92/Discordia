import { useDispatch, useSelector } from "react-redux";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { createInvite } from "@/store/guilds";

const CreateInvite = () => {
  const dispatch = useDispatch();
  const { activeGuild, activeInvite } = useSelector(
    (s: Store.AppStore) => s.ui
  );

  const copyCode = () => window.navigator.clipboard.writeText(activeInvite!.id);

  useEffect(() => {
    if (activeInvite?.id) return;
    dispatch(createInvite(activeGuild!.id));
  }, [activeInvite]);

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader className="items-center space-y-4">
        <DialogTitle>Convide amigos para {activeGuild?.name}</DialogTitle>
        <DialogDescription className="text-center">
          Ou envie um invite para eles
        </DialogDescription>
      </DialogHeader>

      <Input
        id="inviteCode"
        placeholder="code"
        value={activeInvite?.id}
        readOnly
      />
      <Button onClick={copyCode}>Copiar</Button>
    </DialogContent>
  );
};

export default CreateInvite;
