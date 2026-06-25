import request from "supertest";
import {
  describe,
  expect,
  it
} from "vitest";

import { app } from "../src/app.js";

describe("GET /api/v1/health", () => {
  it("should return API health information", async () => {
    const response = await request(app)
      .get("/api/v1/health")
      .expect(200);

    expect(response.body).toMatchObject({
      success: true,
      message: "FlowDesk API is running"
    });

    expect(response.body.timestamp).toEqual(
      expect.any(String)
    );
  });
});