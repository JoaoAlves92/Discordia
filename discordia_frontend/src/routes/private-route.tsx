import LoadingPage from "@/pages/LoadingPage";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export function RequireAuth({ children }: { children: JSX.Element }) {
  const user = useSelector((s: Store.AppStore) => s.entities);
  const { guilds, users } = useSelector((s: Store.AppStore) => s.entities);
  const attemptedLogin = useSelector(
    (s: Store.AppStore) => s.auth.attemptedLogin
  );

  if (attemptedLogin && !user) return <Navigate to="/login" />;
  else if (!users.fetched || !guilds.fetched) return <LoadingPage />;

  return children;
}
