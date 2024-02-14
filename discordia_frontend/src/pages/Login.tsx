import { Navigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSelector } from "react-redux";

import { LoginModal, RegisterModal } from "@/components/widgets";

const Login = () => {
  const user = useSelector((s: Store.AppStore) => s.auth.user);

  return user ? (
    <Navigate to="/channels/@me" replace={true} />
  ) : (
    <div className="h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat bg-artwork">
      <div className="flex items-center justify-center absolute h-screen w-full">
        <Tabs defaultValue="login" className="w-[600px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Cadastro</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginModal />
          </TabsContent>
          <TabsContent value="register">
            <RegisterModal />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Login;
