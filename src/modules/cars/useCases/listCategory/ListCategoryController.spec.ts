import { hash } from "bcrypt";
import { response } from "express";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { app } from "../../../../shared/infra/http/app";
import createConnection from "../../../../shared/infra/typeorm";

let connection: Connection;

describe("list category controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
    const id = uuidv4();
    const password = await hash("admin", 8);
    await connection.query(`INSERT INTO users (id,name,email,password,"is_admin",created_at,driver_license) 
    VALUES ('${id}','userAdmin','admin@rentx.com.br','${password}',true,'NOW()','XXXXXXX')`);

    await connection.close();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to list all categories", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin",
    });

    const { token } = responseToken.body;

    await request(app)
      .post("/categories")
      .send({
        name: "category supertest",
        description: "testing",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const response = await request(app).get("/categories");

    expect(response.status).toBe(200);
    expect(response.body.lenght).toBe(1);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body.name).toEqual("category supertest");
  });
});
