import express from "express";
import { handleAuthorizationError } from "./routes/protect-routes.js";
import getRoutes from "./routes/routes.js";

const app = express();
app.use(express.json());
app.use('/api',getRoutes(),handleAuthorizationError);

app.listen(process.env.PORT, () => {
    console.log(`Server in '${process.env.ENVIRONMENT}' environtment is running on port '${process.env.PORT}'`);
});