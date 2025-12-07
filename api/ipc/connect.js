export default async function handler(req, res) {
  const auth = req.headers.authorization?.replace("Bearer ", "");
  const botId = req.headers["bot-id"];
  const version = req.headers["bot-version"];

  // 🔐 Validate the IPC password
  if (auth !== "LETMEIN123") {
    return res.status(403).json({ success: false, message: "Invalid password" });
  }

  // 🆔 Optional bot ID check (you can remove this if your bot doesn’t send bot-id)
  if (botId && botId !== "1446709518779027587") {
    return res.status(403).json({ success: false, message: "Invalid bot ID" });
  }

  // ✅ Everything OK
  return res.status(200).json({
    success: true,
    message: "SafeGuard Music dashboard connection established",
    botId,
    version
  });
}
