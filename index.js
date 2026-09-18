const express = require("express")
const http = require("http");
const { initWebSocket } = require("./ws");
const app = express();
const server = http.createServer(app);
initWebSocket(server);
const cors = require('cors')
const connectDB = require("./configs/db.config");
require("dotenv").config();
app.use(express.json());
const port = process.env.PORT;
app.use(cors());

const adminRoutes = require("./routes/admin.routes");
const userRoutes = require("./routes/user.routes");

app.use("/admin", adminRoutes);
app.use("/user", userRoutes);

connectDB()
server.listen(port, () => {
  console.log(`NovaGadget server running on port ${port}`);
});
