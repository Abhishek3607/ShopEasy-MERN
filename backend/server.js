import app from "./app.js";
import dotenv, { config } from "dotenv";
import {connectMongoDatabase} from './config/db.js'
dotenv.config({ path: "backend/config/config.env" });
connectMongoDatabase();

// Handle uncaught exception errors
process.on('uncaughtException',(err)=>{
  console.log(`Error: ${err.message}`);
  console.log(`Server is shutting down due to uncaught exception errors`);
  process.exit(1)
})

const port = process.env.PORT || 3000;


const server = app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});

// To handle promise rejection error => in config.env in backend, if uri of DB_URI is wrong
// or has any errors, it will display the error message defined in this block
process.on('unhandledRejection',(err)=>{
  console.log(`Error: ${err.message}`);
  console.log(`Server is shutting down due to unhandled promise rejection`);
  server.close(()=>{
    process.exit(1)
  })
})