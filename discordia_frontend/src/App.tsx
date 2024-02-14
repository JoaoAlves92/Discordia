import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MePage from "./pages/Me";

import "./globals.css";
import PageWrapper from "./pages/PageWrapper";
import GuildPage from "./pages/GuildPage";
import { RequireAuth } from "./routes/private-route";

function App() {
  return (
    <Router>
      <PageWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/channels/@me"
            element={
              <RequireAuth>
                <MePage />
              </RequireAuth>
            }
          />

          <Route
            path="/channels/:guildId/:channelId?"
            element={
              <RequireAuth>
                <GuildPage />
              </RequireAuth>
            }
          />

          <Route path="*" element={<Home />} />
        </Routes>
      </PageWrapper>
    </Router>
  );
}

export default App;
