import express from "express";  

const app = express();
app.use(express.json());

app.listen(process.env.PORT, () => {
    console.log(`Server in '${process.env.ENVIRONMENT}' environtment is running on port '${process.env.PORT}'`);
});