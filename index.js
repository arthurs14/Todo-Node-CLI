#!/usr/bin/env node

// import the required functions for each command
import addTask from "./commands/addTask.js";
import deleteTask from "./commands/deleteTask.js";
import readTask from "./commands/readTask.js";
import updateTask from "./commands/updateTask.js";

// import the command class from Commander.js library
import { Command } from "commander";

// create instance of the Command class
const program = new Command();

// set name and description of the CLI tool
program
  .name("todo")
  .description("Your terminal task manager!")
  .version("1.0.0");

// define command called 'add'
program.command("add").description("Create a new todo.").action(addTask);

// define command 'read'
program.command("read").description("Reads all todos.").action(readTask);

// define command 'update'
program.command("update").description("Updates a todo.").action(updateTask);

// define command 'delete'
program.command("delete").description("Deletes a todo.").action(deleteTask);

// parse the command-line arguments and execute the corresponding actions
program.parse();
