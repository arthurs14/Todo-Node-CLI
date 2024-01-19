/* Delete a Todo */

import inquirer from "inquirer";
import Todos from "../schema/TodoSchema.js";
import { connectDB, disconnectDB } from "../db/connectDb.js";
import ora from "ora";
import chalk from "chalk";

export async function getTaskCode() {
  try {
    // prompt the user to enter the todo code
    const answers = await inquirer.prompt([
      { name: "code", message: "Enter the code of the todo:", type: "input" },
    ]);

    // trim user response
    answers.code = answers.code.trim();

    return answers;
  } catch (e) {
    console.log("Something went wrong...\n", e);
  }
}

export default async function deleteTask() {
  try {
    // obtain the todo code provided by user
    const userCode = await getTaskCode();

    // conect to database
    await connectDB();

    // start spinner
    const spinner = ora("Finding and Deleteing the todo...").start();

    // delete the task
    const response = await Todos.deleteOne({ code: userCode.code });

    // stop spinner
    spinner.stop();

    if (response.deleteCount === 0) {
      console.log(
        chalk.redBright(
          "Could not find my todo matching the provided name. Deletion failed."
        )
      );
    } else {
      console.log(chalk.greenBright("Deleted Task Successfully!"));
    }

    // disconnect from database
    await disconnectDB();
  } catch (e) {
    console.log("Something went wrong, Error:", e);
    process.exit(1);
  }
}

deleteTask();
