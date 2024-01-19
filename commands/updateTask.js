/* Update a Todo */

import { connectDB, disconnectDB } from "../db/connectDb.js";
import { getTaskCode } from "./deleteTask.js";
import inquirer from "inquirer";
import Todos from "../schema/TodoSchema.js";
import ora from "ora";
import chalk from "chalk";

async function askUpdateQ(todo) {
  try {
    // prompt the user to update the todo data
    const update = await inquirer.prompt([
      {
        name: "name",
        message: "Update the name?",
        type: "input",
        default: todo.name,
      },
      {
        name: "detail",
        message: "Update the Description?",
        type: "input",
        default: todo.detail,
      },
      {
        name: "status",
        message: "Update the status",
        type: "list",
        choices: ["pending", "completed"],
        default: todo.status,
      },
    ]);

    return update;
  } catch (e) {
    console.log("Something went wrong...\n", e);
  }
}
