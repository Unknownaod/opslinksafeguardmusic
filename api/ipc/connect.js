export default async function handler(req, res) {
  const auth = req.headers["authorization"]; // MUST be brackets

  if (!auth) {
    return res.status(403).json({
      error: "Missing Authorization header"
    });
  }

  // Expect: Authorization: Bearer opslink
  if (!auth.startsWith("Bearer ")) {
    return res.status(403).json({
      error: "Invalid Authorization format"
    });
  }

  const token = auth.replace("Bearer ", "").trim();

  if (token !== "opslink") {
    return res.status(403).json({
      error: "Invalid password"
    });
  }

  return res.status(200).json({
    success: true,
    message: "IPC connected"
  });
}
