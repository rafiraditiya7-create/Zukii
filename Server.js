
const express = require("express");

const app = express();
app.use(express.json());

const VERIFY_TOKEN = process.env.VERIFY_TOKEN || "ganti-token-rahasia";

app.get("/", (req, res) => {
  res.send("Zuki AI Bot aktif!");
});

// Verifikasi webhook dari Meta
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  }

  return res.sendStatus(403);
});

// Menerima notifikasi pesan dari WhatsApp
app.post("/webhook", (req, res) => {
  console.log("Webhook WhatsApp diterima");
  console.log(JSON.stringify(req.body));

  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Zuki AI Bot berjalan pada port ${PORT}`);
});
