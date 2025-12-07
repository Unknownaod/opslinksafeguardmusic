import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ noServer: true });

export function setupIPC(server) {
  server.on("upgrade", (req, socket, head) => {
    // Accept only WebSocket upgrades on /ws_bot
    if (req.url !== "/ws_bot") return socket.destroy();

    const auth = req.headers.authorization?.replace("Bearer ", "");

    // Only check password from bot
    if (auth !== "opslink") {
      socket.write("HTTP/1.1 403 Forbidden\r\n\r\n");
      socket.destroy();
      return;
    }

    // Auth OK → upgrade socket
    wss.handleUpgrade(req, socket, head, (ws) => {
      ws.send(JSON.stringify({
        success: true,
        message: "SafeGuard IPC Connected"
      }));

      ws.on("message", (data) => {
        // Handle incoming messages here
        console.log("IPC Message:", data.toString());
      });
    });
  });
}
