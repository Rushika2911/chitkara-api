import express from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import bfhlRoutes from "./routes/bfhl.js";
import healthRoutes from "./routes/health.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());

app.use("/bfhl", bfhlRoutes);
app.use("/health", healthRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
