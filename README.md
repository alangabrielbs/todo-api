# Todo API

Simple API to manage tasks for a todo list.

## Technologies

- Node.js
- Express
- Knex
- SQLite
- Vitest
- Zod

## Features

- [x] Create a new task
- [x] Get all tasks
- [x] Get a task by id
- [x] Update a task by id
- [x] Delete a task by id

## Installation

1. Clone the repository
2. Install the dependencies

```bash
yarn
```

3. Run the migrations

```bash
yarn knex:migrate
```

4. Start the server

```bash
yarn dev
```

## Endpoints

Insomnia file: [todo-api-insomnia.json](./todo-api-insomnia.json)

- [x] `/api/tasks` - GET - Get all tasks
  - Response:
  ```json
  {
    "completeTasks": 0,
    "incompleteTasks": 1,
    "tasks": [
      {
        "id": "2105b802-79a9-413e-a8b1-9e1357bd7e02",
        "title": "Create new task",
        "description": "Create a new task for the todo list",
        "done": false,
        "duration": null,
        "created_at": "2024-08-01 00:49:06",
        "updated_at": "2024-08-01 00:49:06",
        "session_id": "caf81115-5ddb-41c4-8577-d9fbf2294c99"
      }
    ]
  }
  ```
- [x] `/api/tasks` - POST - Create a new task
  - Body
  ```json
  {
    "title": "Create new task",
    "description": "Create a new task for the todo list"
  }
  ```
  - Response: `201` status code
- [x] `/api/tasks/:id` - GET - Get a task by id
  - Response:
  ```json
  {
    "task": {
      "id": "2105b802-79a9-413e-a8b1-9e1357bd7e02",
      "title": "Create new task",
      "description": "Create a new task for the todo list",
      "done": false,
      "duration": null,
      "created_at": "2024-08-01 00:49:06",
      "updated_at": "2024-08-01 00:49:06",
      "session_id": "caf81115-5ddb-41c4-8577-d9fbf2294c99"
    }
  }
  ```
- [x] `/api/tasks/:id` - PUT - Update a task by id
  - Body:
  ```json
  {
    "title": "Create new task",
    "description": "Create a new task for the todo list",
    "done": true,
    "duration": 30
  }
  ```
  Response:
  ```json
  {
    "task": {
      "id": "2105b802-79a9-413e-a8b1-9e1357bd7e02",
      "title": "Create new task",
      "description": "Create a new task for the todo list",
      "done": true,
      "duration": 30,
      "created_at": "2024-08-01 00:49:06",
      "updated_at": "2024-08-01 00:49:06",
      "session_id": "caf81115-5ddb-41c4-8577-d9fbf2294c99"
    }
  }
  ```
- [x] `/api/tasks/:id` - DELETE - Delete a task by id
  - Response: `204` status code
