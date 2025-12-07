export default async function handler(req, res) {
  try {
    // Extract Authorization header and remove "Bearer "
    const auth = req.headers.authorization?.replace("Bearer ", "");

    // Validate only the password
    if (auth !== "opslink") {
      return res.status(403).json({
        success: false,
        message: "Invalid password"
      });
    }

    // Success response
    return res.status(200).json({
      success: true,
      message: "SafeGuard Music dashboard connection established"
    });

  } catch (err) {
    console.error("[IPC ERROR]", err);
    return res.status(500).json({
      success: false,
      message: "Internal IPC error"
    });
  }
}
