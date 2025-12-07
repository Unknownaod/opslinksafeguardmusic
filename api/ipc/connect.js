export default async function handler(req, res) {
  const auth = req.headers.authorization?.replace("Bearer ", "");
  if (auth !== "LETMEIN123")
    return res.status(403).json({ success: false, message: "Invalid password" });
  res.status(200).json({ success: true, message: "SafeGuard Music connected" });
}
