export default async function handler(req, res) {
  // Grab headers from the bot
  const auth = req.headers.authorization?.replace("Bearer ", "");
  const botId = req.headers["bot-id"];
  const version = req.headers["bot-version"];

  // Password must match
  if (auth !== "opslink") {
    return res.status(403).json({ success: false, message: "Invalid password" });
  }

  // If your bot does NOT send bot-id or bot-version, ignore them
  // Comment these two blocks out if your bot doesn't include them

  if (botId && botId !== "1446709518779027587") {
    return res.status(403).json({ success: false, message: "Invalid bot ID" });
  }

  if (version && version !== "v2.7.2") {
    return res.status(403).json({ success: false, message: "Version mismatch" });
  }

  // ✅ Successful connection
  return res.status(200).json({
    success: true,
    message: "SafeGuard Music dashboard connection established"
  });
}
