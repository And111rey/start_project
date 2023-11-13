import { arrayBuffer } from "stream/consumers";
import request from "supertest";
import { app } from "../../src";

const testData = [
  { id: 1, value: "Myru avenu, 109" },
  { id: 2, value: "Kamenetska, 98" },
];

describe("FIRST TEST WITH ADDRESSES-------", () => {

  beforeAll( async() => {
    console.log('111111')
    await request(app).delete("/__test__/addresses");

  });

  it("it should return 200 and empty array", async () => {
    await request(app).get("/addresses").expect(200, []);
  });

  it("should return 404 for not existing address", async () => {
    await request(app).get("/addresses/1").expect(404);
  });
});
