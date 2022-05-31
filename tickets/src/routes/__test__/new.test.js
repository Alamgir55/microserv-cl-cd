"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../app");
const ticket_1 = require("../../models/ticket");
it("has a route handler listening to /api/tickets for post requests", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield supertest_1.default(app_1.app).post("/api/tickets").send({});
    expect(response.status).not.toEqual(404);
}));
it("can only be accessed if the user is signed in", () => __awaiter(void 0, void 0, void 0, function* () {
    yield supertest_1.default(app_1.app).post("/api/tickets").send({}).expect(401);
}));
it("Returns a status other than 401 if user is signed in", () => __awaiter(void 0, void 0, void 0, function* () {
    const cookie = global.signin();
    const response = yield supertest_1.default(app_1.app)
        .post("/api/tickets")
        .set("Cookie", cookie)
        .send({});
    expect(response.status).not.toEqual(401);
}));
it("returns an error if an invalid title is provided", () => __awaiter(void 0, void 0, void 0, function* () {
    yield supertest_1.default(app_1.app)
        .post("/api/tickets")
        .set("Cookie", global.signin())
        .send({
        title: "",
        price: 10,
    })
        .expect(400);
    yield supertest_1.default(app_1.app)
        .post("/api/tickets")
        .set("Cookie", global.signin())
        .send({
        price: 10,
    })
        .expect(400);
}));
it("returs an error if an invalid price is provided", () => __awaiter(void 0, void 0, void 0, function* () {
    yield supertest_1.default(app_1.app)
        .post("/api/tickets")
        .set("Cookie", global.signin())
        .send({
        title: "ldoie",
        price: -10,
    })
        .expect(400);
    yield supertest_1.default(app_1.app)
        .post("/api/tickets")
        .set("Cookie", global.signin())
        .send({
        title: "lidoei",
    })
        .expect(400);
}));
it("creates a ticket with valid inputs", () => __awaiter(void 0, void 0, void 0, function* () {
    // add in a check to make sure a ticket was saved
    let tickets = yield ticket_1.Ticket.find({});
    expect(tickets.length).toEqual(0);
    const title = "adlid";
    yield supertest_1.default(app_1.app)
        .post("/api/tickets")
        .set("Cookie", global.signin())
        .send({
        title: title,
        price: 20,
    })
        .expect(201);
    tickets = yield ticket_1.Ticket.find({});
    expect(tickets.length).toEqual(1);
    expect(tickets[0].price).toEqual(20);
    expect(tickets[0].title).toEqual(title);
}));
