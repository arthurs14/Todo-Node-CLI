/* Display All Todos */

import { connectDB, disconnectDB } from "../db/connectDb.js";
import Todos from "../schema/TodoSchema.js";
import chalk from "chalk";
import ora from "ora";

export default async function readTask() {
  try {
    // connect to database
    await connectDB();

    // start spiinner
    const spinner = ora("Fetching all todos...").start();

    // fetching all the todos from the database
    const todos = await Todos.find({});

    // stop spinner
    spinner.stop();

    // check if todos exist or not
    if (todos.length === 0) {
      console.log(chalk.blueBright("You do not have any tasks yet!"));
    } else {
      todos.forEach((todo) => {
        console.log(
          chalk.cyanBright(
            "Todo Code: " +
              todo.code +
              "\n" +
              chalk.blueBright(
                "Name: " +
                  todo.name +
                  "\n" +
                  chalk.yellowBright("Description: " + todo.detail + "\n")
              )
          )
        );
      });
    }

    // disconnect database
    await disconnectDB();
  } catch (e) {
    console.log("Something went wrong, Error:", e);
    process.exit(1);
  }
}
