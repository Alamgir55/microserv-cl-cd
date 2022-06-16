import request from "supertest";
import { app } from "../../app";

it("responds with details about the current user", async () => {
  const cookie = await global.signin();

  const response = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(400);

  expect(response.body.currentuser.email).toEqual("test@test.com");
});

it("response with null if not authenticated", async () => {
  const responds = await request(app)
    .get("/api/users/currentuser")
    .send()
    .expect(200);

  expect(responds.body.currentuser).toEqual(null);
});
