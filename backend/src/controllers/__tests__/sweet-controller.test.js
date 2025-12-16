const request = require("supertest");
const express = require("express");

describe("SweetController", () => {
    let app;

    beforeEach(() => {
        jest.resetModules();

        // Create a fresh Express app for each test
        app = express();
        app.use(express.json());
    });

    describe("POST /sweets - addSweet", () => {
        it("should add a new sweet successfully", async () => {
            jest.doMock("../../services", () => ({
                SweetService: {
                    addSweet: jest.fn().mockResolvedValue({
                        id: 1,
                        name: "Rasgulla",
                        category: "Dessert",
                        price: 20,
                        quantity: 50,
                    }),
                },
            }));

            const sweetRoute = require("../../routes/v1/sweet-route");
            app.use("/sweets", sweetRoute);

            const response = await request(app)
                .post("/sweets")
                .send({
                    name: "Rasgulla",
                    category: "Dessert",
                    price: 20,
                    quantity: 50,
                });

            expect(response.status).toBe(201);
            expect(response.body.success).toBe(true);
            expect(response.body.data.name).toBe("Rasgulla");
        });

        it("should return 400 if required fields are missing", async () => {
            jest.doMock("../../services", () => ({
                SweetService: {
                    addSweet: jest.fn(),
                },
            }));

            const sweetRoute = require("../../routes/v1/sweet-route");
            app.use("/sweets", sweetRoute);

            const response = await request(app)
                .post("/sweets")
                .send({
                    name: "Rasgulla",
                    // Missing category, price, quantity
                });

            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
        });

        it("should return 400 if price is negative", async () => {
            jest.doMock("../../services", () => ({
                SweetService: {
                    addSweet: jest.fn(),
                },
            }));

            const sweetRoute = require("../../routes/v1/sweet-route");
            app.use("/sweets", sweetRoute);

            const response = await request(app)
                .post("/sweets")
                .send({
                    name: "Rasgulla",
                    category: "Dessert",
                    price: -10,
                    quantity: 50,
                });

            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
        });
    });

    describe("GET /sweets - listSweets", () => {
        it("should return all sweets", async () => {
            jest.doMock("../../services", () => ({
                SweetService: {
                    listSweets: jest.fn().mockResolvedValue([
                        { id: 1, name: "Ladoo" },
                        { id: 2, name: "Barfi" },
                    ]),
                },
            }));

            const sweetRoute = require("../../routes/v1/sweet-route");
            app.use("/sweets", sweetRoute);

            const response = await request(app).get("/sweets");

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data.length).toBe(2);
            expect(response.body.count).toBe(2);
        });
    });

    describe("GET /sweets/search - searchSweets", () => {
        it("should search sweets by name", async () => {
            jest.doMock("../../services", () => ({
                SweetService: {
                    searchSweets: jest.fn().mockResolvedValue([
                        { id: 1, name: "Gulab Jamun" },
                    ]),
                },
            }));

            const sweetRoute = require("../../routes/v1/sweet-route");
            app.use("/sweets", sweetRoute);

            const response = await request(app)
                .get("/sweets/search")
                .query({ name: "Gulab" });

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data.length).toBe(1);
        });
    });

    describe("PUT /sweets/:id - updateSweet", () => {
        it("should update a sweet successfully", async () => {
            jest.doMock("../../services", () => ({
                SweetService: {
                    updateSweet: jest.fn().mockResolvedValue({
                        id: 1,
                        name: "Rasgulla",
                        price: 25,
                    }),
                },
            }));

            const sweetRoute = require("../../routes/v1/sweet-route");
            app.use("/sweets", sweetRoute);

            const response = await request(app)
                .put("/sweets/1")
                .send({ price: 25 });

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data.price).toBe(25);
        });

        it("should return 400 for invalid ID", async () => {
            jest.doMock("../../services", () => ({
                SweetService: {
                    updateSweet: jest.fn(),
                },
            }));

            const sweetRoute = require("../../routes/v1/sweet-route");
            app.use("/sweets", sweetRoute);

            const response = await request(app)
                .put("/sweets/invalid")
                .send({ price: 25 });

            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
        });
    });

    describe("DELETE /sweets/:id - deleteSweet", () => {
        it("should delete a sweet successfully", async () => {
            jest.doMock("../../services", () => ({
                SweetService: {
                    deleteSweet: jest.fn().mockResolvedValue(true),
                },
            }));

            const sweetRoute = require("../../routes/v1/sweet-route");
            app.use("/sweets", sweetRoute);

            const response = await request(app).delete("/sweets/1");

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
        });
    });

    describe("POST /sweets/:id/purchase - purchaseSweet", () => {
        it("should purchase sweet successfully", async () => {
            jest.doMock("../../services", () => ({
                SweetService: {
                    purchaseSweet: jest.fn().mockResolvedValue({
                        id: 1,
                        name: "Rasgulla",
                        quantity: 45,
                    }),
                },
            }));

            const sweetRoute = require("../../routes/v1/sweet-route");
            app.use("/sweets", sweetRoute);

            const response = await request(app)
                .post("/sweets/1/purchase")
                .send({ quantity: 5 });

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
        });

        it("should return 404 if sweet not found", async () => {
            jest.doMock("../../services", () => ({
                SweetService: {
                    purchaseSweet: jest.fn().mockRejectedValue(new Error("Sweet not found")),
                },
            }));

            const sweetRoute = require("../../routes/v1/sweet-route");
            app.use("/sweets", sweetRoute);

            const response = await request(app)
                .post("/sweets/999/purchase")
                .send({ quantity: 5 });

            expect(response.status).toBe(404);
            expect(response.body.success).toBe(false);
        });

        it("should return 400 if insufficient stock", async () => {
            jest.doMock("../../services", () => ({
                SweetService: {
                    purchaseSweet: jest.fn().mockRejectedValue(new Error("Insufficient stock")),
                },
            }));

            const sweetRoute = require("../../routes/v1/sweet-route");
            app.use("/sweets", sweetRoute);

            const response = await request(app)
                .post("/sweets/1/purchase")
                .send({ quantity: 100 });

            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
        });
    });

    describe("POST /sweets/:id/restock - restockSweet", () => {
        it("should restock sweet successfully", async () => {
            jest.doMock("../../services", () => ({
                SweetService: {
                    restockSweet: jest.fn().mockResolvedValue({
                        id: 1,
                        name: "Rasgulla",
                        quantity: 60,
                    }),
                },
            }));

            const sweetRoute = require("../../routes/v1/sweet-route");
            app.use("/sweets", sweetRoute);

            const response = await request(app)
                .post("/sweets/1/restock")
                .send({ quantity: 10 });

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data.quantity).toBe(60);
        });

        it("should return 400 for invalid quantity", async () => {
            jest.doMock("../../services", () => ({
                SweetService: {
                    restockSweet: jest.fn(),
                },
            }));

            const sweetRoute = require("../../routes/v1/sweet-route");
            app.use("/sweets", sweetRoute);

            const response = await request(app)
                .post("/sweets/1/restock")
                .send({ quantity: -5 });

            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
        });
    });
});
