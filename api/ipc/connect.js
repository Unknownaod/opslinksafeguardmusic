export default async function handler(req, res) {
  const authHeader = req.headers.authorization;

  // Require Authorization header
  if (!authHeader) {
    return res.status(403).json({
      success: false,
      message: "Missing Authorization header"
    });
  }

  // Expect: Authorization: Bearer opslink
  if (!authHeader.startsWith("Bearer ")) {
    return res.status(403).json({
      success: false,
      message: "Invalid Authorization format"
    });
  }

  const token = authHeader.replace("Bearer ", "").trim();

  // Validate password
  if (token !== "opslink") {
    return res.status(403).json({
      success: false,
      message: "Invalid password"
    });
  }

  // OPTIONAL HEADERS - IGNORE IF NOT SENT
  const botId = req.headers["user-id"];
  const version = req.headers["client-version"];

  return res.status(200).json({
    success: true,
    message: "SafeGuard IPC connected",
    bot_id: botId || null,
    version: version || null
  });
}
