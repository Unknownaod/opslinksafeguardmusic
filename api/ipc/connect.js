export default async function handler(req, res) {
  try {
    // Extract the password from Authorization header
    const auth = req.headers.authorization?.replace("Bearer ", "");

    // Validate password ONLY
    if (auth !== "opslink") {
      return res.status(403).json({
        success: false,
        message: "Invalid password"
      });
    }

    // If password correct, allow connection
    return res.status(200).json({
      success: true,
      message: "SafeGuard Music dashboard connection established"
    });

  } catch (err) {
    console.error("[IPC ERROR]", err);
    return res.status(500).json({
      success: false,
      message: "IPC server error"
    });
  }
}
