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
