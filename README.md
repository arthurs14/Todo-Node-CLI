# CLI - Task Manager

- A simple task manager that can be ran from your terminal/ command line tool.
- You can read, update, delete, add new todos.

## Set-Up to Run Locally

1. Clone project and install packages

```bash
npm install
```

2. Install package globally to your system

```bash
npm i -g .
```

3. You will need to include your own mongoDB url and create your own `.env` file and create an environment variable `MONGO_URI`: [Create MongoDB Cluster](https://www.mongodb.com/basics/clusters/mongodb-cluster-setup)

4. To run the commands

```bash
todo add
todo delete
todo read
todo update
```
