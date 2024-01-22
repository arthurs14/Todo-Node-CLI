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

export default async function updateTask() {
  try {
    // obtaining the task code entered by user
    const taskCode = await getTaskCode();

    // connect to the database
    await connectDB();

    // start the spinner
    const spinner = ora("Finding the todo...\n").start();

    // find the todo which the user wants to update
    const todo = await Todos.findOne({ code: taskCode.code });

    // end spinner
    spinner.stop();

    // check if todo exists
    if (todo) {
      console.log(
        chalk.blueBright(
          "Type the updated properties. Press Enter if no update"
        )
      );

      // get user updated information
      const update = await askUpdateQ(todo);

      // if user marked status as completed
      // we delete the todo else we update the data
      if (todo.status.toLowerCase() === "completed") {
        // change spinner and start it again
        spinner.text = "Deleting todo...";
        spinner.start();

        // delete todo
        await Todos.deleteOne({ _id: todo._id });

        // stop spinner and show complete message
        spinner.stop();
        console.log(chalk.greenBright("Deleted the todo"));
      } else {
        // update the todo
        spinner.text = "updating todo...";
        spinner.start();
        await Todos.updateOne({ _id: todo._id }, update, {
          runValidators: true,
        });
        spinner.stop();
        console.log(chalk.greenBright("Todo updated"));
      }
    } else {
      console.log(
        chalk.redBright("Could not find Todo with code you provided.")
      );
    }

    // disconnect database
    await disconnectDB();
  } catch (e) {
    console.log("Something went wrong, Error: ", e);
    process.exit(1);
  }
}
