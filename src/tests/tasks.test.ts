import { app } from "@/http/app";
import { execSync } from "node:child_process";
import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";

describe("/tasks routes", () => {
  beforeEach(() => {
    execSync("yarn knex migrate:rollback --all");
    execSync("yarn knex migrate:latest");
  });

  it("use can create a new task", async () => {
    await request(app)
      .post("/api/tasks")
      .send({
        title: "Task 1",
        description: "Description of task 1",
      })
      .expect(201);
  });

  it("use can delete a task", async () => {
    const createTaskResponse = await request(app)
      .post("/api/tasks")
      .send({
        title: "Task 1",
        description: "Description of task 1",
      })
      .expect(201);

    const cookies = createTaskResponse.get("Set-Cookie")!;

    const listTasksResponse = await request(app)
      .get("/api/tasks")
      .set("Cookie", cookies)
      .expect(200);

    const taskId = listTasksResponse.body.tasks[0].id;

    await request(app)
      .get(`/api/tasks/${taskId}`)
      .set("Cookie", cookies)
      .expect(200);

    await request(app)
      .delete(`/api/tasks/${taskId}`)
      .set("Cookie", cookies)
      .expect(204);
  });

  it("use can edit a task", async () => {
    const createTaskResponse = await request(app)
      .post("/api/tasks")
      .send({
        title: "Task 1",
        description: "Description of task 1",
      })
      .expect(201);

    const cookies = createTaskResponse.get("Set-Cookie")!;

    const listTasksResponse = await request(app)
      .get("/api/tasks")
      .set("Cookie", cookies)
      .expect(200);

    const taskId = listTasksResponse.body.tasks[0].id;

    const getTaskResponse = await request(app)
      .get(`/api/tasks/${taskId}`)
      .set("Cookie", cookies)
      .expect(200);

    expect(getTaskResponse.body.task).toEqual(
      expect.objectContaining({
        done: false,
      })
    );

    await request(app)
      .put(`/api/tasks/${taskId}`)
      .send({
        done: true,
        title: "Edited Task 1",
        description: "Edited description of task 1",
      })
      .set("Cookie", cookies);

    const getTaskEditedResponse = await request(app)
      .get(`/api/tasks/${taskId}`)
      .set("Cookie", cookies)
      .expect(200);

    expect(getTaskEditedResponse.body.task).toEqual(
      expect.objectContaining({
        done: true,
        title: "Edited Task 1",
        description: "Edited description of task 1",
      })
    );
  });

  it("should be able to list all tasks", async () => {
    const createTaskResponse = await request(app).post("/api/tasks").send({
      title: "Task 1",
      description: "Description of task 1",
    });

    const cookies = createTaskResponse.get("Set-Cookie")!;

    const listTasksResponse = await request(app)
      .get("/api/tasks")
      .set("Cookie", cookies)
      .expect(200);

    expect(listTasksResponse.body).toEqual({
      completeTasks: 0,
      incompleteTasks: 1,
      tasks: [
        expect.objectContaining({
          title: "Task 1",
          description: "Description of task 1",
        }),
      ],
    });
  });

  it("should be able to get a specific task", async () => {
    const createTaskResponse = await request(app).post("/api/tasks").send({
      title: "Task 1",
      description: "Description of task 1",
    });

    const cookies = createTaskResponse.get("Set-Cookie")!;

    const listTasksResponse = await request(app)
      .get("/api/tasks")
      .set("Cookie", cookies)
      .expect(200);

    const taskId = listTasksResponse.body.tasks[0].id;

    const getTaskResponse = await request(app)
      .get(`/api/tasks/${taskId}`)
      .set("Cookie", cookies)
      .expect(200);

    expect(getTaskResponse.body.task).toEqual(
      expect.objectContaining({
        title: "Task 1",
        description: "Description of task 1",
      })
    );
  });
});
