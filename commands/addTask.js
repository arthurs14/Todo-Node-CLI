/* Create a New Todo */

import inquirer from "inquirer";
import { connectDB, disconnectDB } from "../db/connectDb.js";
import Todos from "../schema/TodoSchema.js";
import ora from "ora";
import chalk from "chalk";

async function input() {
  const answers = await inquirer.prompt([
    { name: "name", message: "Enter name of the task:", type: "input" },
    {
      name: "detail",
      message: "Enter the details of the task:",
      type: "input",
    },
  ]);

  return answers;
}

async function askQuestions() {
  const todoArray = [];
  let loop = false;

  do {
    const userRes = await input();
    todoArray.push(userRes);
    const confirmTasks = await inquirer.prompt([
      {
        name: "confirm",
        message: "Do you want to add more tasks?",
        type: "confirm",
      },
    ]);

    if (confirmTasks.confirm) {
      loop = true;
    } else {
      loop = false;
    }
  } while (loop);

  return todoArray;
}

async function addTask() {
  try {
    // call askQuestions() to get array of todos
    const userResponse = await askQuestions();

    // connect to database
    await connectDB();

    // Display a spinner with the follow text message using ora
    let spinner = ora("Creating the todos...").start();

    // loop over every todo in the userResponse array
    // and save each todo in the database
    for (let i = 0; i < userResponse.length; i++) {
      const response = userResponse[i];
      await Todos.create(response);
    }

    // stop the spinner and display the success message
    spinner.stop();
    console.log(chalk.greenBright("Created the Todo(s)!"));

    // disconnect from database
    await disconnectDB();
  } catch (e) {
    console.log("Something went wrong, Error:", e);
    process.exit(1);
  }
}
