import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import sequelize from "./models/index.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// Database Connection
sequelize.sync()
  .then(() => console.log("✅ Database connected successfully"))
  .catch((err) => console.error("❌ Database connection failed:", err));

app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
