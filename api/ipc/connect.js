export default async function handler(req, res) {
  const authHeader = req.headers.authorization;

  // Require Authorization header
  if (!authHeader) {
    return res.status(403).json({
      success: false,
      message: "Missing Authorization header"
    });
  }

  // Expect format: Bearer opslink
  if (!authHeader.startsWith("Bearer ")) {
    return res.status(403).json({
      success: false,
      message: "Invalid Authorization format"
    });
  }

  // Extract the password
  const token = authHeader.split(" ")[1];

  // Compare token
  if (token !== "opslink") {
    return res.status(403).json({
      success: false,
      message: "Invalid password"
    });
  }

  // Success — no User-Id, no extra checks
  return res.status(200).json({
    success: true,
    message: "Authenticated"
  });
}
