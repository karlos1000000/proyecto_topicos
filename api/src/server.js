import express from "express";
import cors from "cors";
import dbModule from "./database.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

async function executeQuery(query, params = []) {
  const db = await dbModule.getDb();
  const stmt = db.prepare(query);
  stmt.bind(params);
  const results = [];
  while (stmt.step()) {
    const row = stmt.getAsObject();
    results.push(row);
  }
  stmt.free();
  return results;
}

async function executeQueryOne(query, params = []) {
  const results = await executeQuery(query, params);
  return results.length > 0 ? results[0] : null;
}

async function executeUpdate(query, params = []) {
  const db = await dbModule.getDb();
  const stmt = db.prepare(query);
  stmt.bind(params);
  stmt.step();
  stmt.free();
  dbModule.saveDatabase();
}

app.get("/api/subscriptions", async (req, res) => {
  try {
    const subscriptions = await executeQuery(
      "SELECT * FROM subscriptions ORDER BY name"
    );
    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/subscriptions/:id", async (req, res) => {
  try {
    const subscription = await executeQueryOne(
      "SELECT * FROM subscriptions WHERE id = ?",
      [req.params.id]
    );
    if (!subscription) {
      return res.status(404).json({ error: "Suscripción no encontrada" });
    }
    res.json(subscription);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/subscriptions", async (req, res) => {
  try {
    const { name, price, currency, frequency, paymentDate } = req.body;

    if (!name || price === undefined || !currency || !frequency || !paymentDate) {
      return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    if (!["USD", "HNL"].includes(currency)) {
      return res.status(400).json({ error: "Moneda inválida" });
    }

    if (!["monthly", "annual"].includes(frequency)) {
      return res.status(400).json({ error: "Frecuencia inválida" });
    }

    const id = Date.now().toString() + Math.random().toString(36).substring(2, 11);

    await executeUpdate(
      `INSERT INTO subscriptions (id, name, price, currency, frequency, paymentDate)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [id, name, price, currency, frequency, paymentDate]
    );

    const newSubscription = await executeQueryOne(
      "SELECT * FROM subscriptions WHERE id = ?",
      [id]
    );

    res.status(201).json(newSubscription);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/api/subscriptions/:id", async (req, res) => {
  try {
    const { name, price, currency, frequency, paymentDate } = req.body;

    const existing = await executeQueryOne(
      "SELECT * FROM subscriptions WHERE id = ?",
      [req.params.id]
    );

    if (!existing) {
      return res.status(404).json({ error: "Suscripción no encontrada" });
    }

    if (!name || price === undefined || !currency || !frequency || !paymentDate) {
      return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    if (!["USD", "HNL"].includes(currency)) {
      return res.status(400).json({ error: "Moneda inválida" });
    }

    if (!["monthly", "annual"].includes(frequency)) {
      return res.status(400).json({ error: "Frecuencia inválida" });
    }

    await executeUpdate(
      `UPDATE subscriptions
       SET name = ?, price = ?, currency = ?, frequency = ?, paymentDate = ?
       WHERE id = ?`,
      [name, price, currency, frequency, paymentDate, req.params.id]
    );

    const updatedSubscription = await executeQueryOne(
      "SELECT * FROM subscriptions WHERE id = ?",
      [req.params.id]
    );

    res.json(updatedSubscription);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/api/subscriptions/:id", async (req, res) => {
  try {
    const existing = await executeQueryOne(
      "SELECT * FROM subscriptions WHERE id = ?",
      [req.params.id]
    );

    if (!existing) {
      return res.status(404).json({ error: "Suscripción no encontrada" });
    }

    await executeUpdate("DELETE FROM subscriptions WHERE id = ?", [req.params.id]);

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, async () => {
  await dbModule.getDb();
  console.log(`🚀 API Server running on http://localhost:${PORT}`);
});

