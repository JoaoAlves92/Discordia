import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";
import { createGuild, joinGuild } from "@/store/guilds";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Server name must be at least 2 characters.",
  }),
});

const formSchemaJoin = z.object({
  inviteCode: z.string().min(2, {
    message: "Server name must be at least 2 characters.",
  }),
});

const CreateGuild = () => {
  const dispatch = useDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  
  const formJoin = useForm<z.infer<typeof formSchemaJoin>>({
    resolver: zodResolver(formSchemaJoin),
    defaultValues: {
      inviteCode: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    dispatch(createGuild(data.name));
  };
  
  const onSubmitJoin = (data: z.infer<typeof formSchemaJoin>) => {
    dispatch(joinGuild(data.inviteCode));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="text-brand-green rounded-2xl h-12 w-full hover:text-brand-white hover:rounded-md transition-all"
        >
          <PlusIcon />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader className="items-center space-y-4">
              <DialogTitle>Criar seu servidor</DialogTitle>
              <DialogDescription className="text-center">
                Seu servidor é onde você e seus amigos se reúnem. Crie o seu e
                comece a interagir
              </DialogDescription>
            </DialogHeader>
            <div className="">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name">Nome do Servidor</FormLabel>
                    <FormControl>
                      <Input id="name" placeholder="server_irado" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit" className="w-full mt-4">
                Criar
              </Button>
            </DialogFooter>
          </form>
        </Form>

        <Separator />

        <Form {...formJoin}>
          <form onSubmit={formJoin.handleSubmit(onSubmitJoin)}>
            <DialogHeader className="items-center space-y-4 mb-2">
              <DialogTitle>Ou junte-se a um</DialogTitle>
            </DialogHeader>
            <div className="">
              <FormField
                control={formJoin.control}
                name="inviteCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="inviteCode">Código do convite</FormLabel>
                    <FormControl>
                      <Input id="inviteCode" placeholder="code" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit" className="w-full mt-4">
                Se juntar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGuild;
