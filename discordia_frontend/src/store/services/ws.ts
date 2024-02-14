/* eslint-disable @typescript-eslint/no-explicit-any */
import io from "socket.io-client";

const ws = (io as any).connect(process.env.rootAPIURL, {
  secure: true,
  path: `/ws`,
  transports: ["websocket", "polling", "flashsocket"],
});

ws.io.on("open", () => console.log("Conectado ao Servidor WS"));

export default ws as WSClient;

interface WSClient {
  emit: <K extends keyof API.ToWSAPI>(
    
    event: K,
    callback: (args: API.ToWSAPI[K]) => any
  ) => any;
  on: <K extends keyof API.FromWSAPI>(
    event: K | "error" | "disconnect",
    callback: (args: API.FromWSAPI[K]) => any
  ) => any;
  off: (event: string, callback?: any) => any;
  disconnect: () => any;
}
