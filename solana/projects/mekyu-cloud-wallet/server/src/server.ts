import cluster from "node:cluster";
import { availableParallelism } from "node:os";
import process from "node:process";
import { app, prisma } from "./app.js";
import { APP_PORT, ENVIRONMENT } from "./config/constants.js";

const numCPUs = availableParallelism();

async function main() {
  if (cluster.isPrimary && ENVIRONMENT !== "VERCEL_PRODUCTION") {
    console.log(`Primary ${process.pid} is running`);

    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
    });
  } else {
    app.listen(APP_PORT, () => {
      console.log(
        `Server started running at PORT ${APP_PORT} with PID ${process.pid}`
      );
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
