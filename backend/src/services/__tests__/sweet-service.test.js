it("should create a new sweet", async () => {
  jest.doMock("../../repositories", () => ({
    SweetRepository: jest.fn().mockImplementation(() => ({
      create: jest.fn().mockResolvedValue({
        id: 1,
        name: "Rasgulla",
        category: "Dessert",
        price: 20,
        quantity: 50,
      }),
    })),
  }));

  const { addSweet } = require("../sweet-service");

  const sweet = await addSweet({
    name: "Rasgulla",
    category: "Dessert",
    price: 20,
    quantity: 50,
  });

  expect(sweet.name).toBe("Rasgulla");
});

it("should create a new sweet", async () => {
  jest.doMock("../../repositories", () => ({
    SweetRepository: jest.fn().mockImplementation(() => ({
      create: jest.fn().mockResolvedValue({
        id: 1,
        name: "Rasgulla",
        category: "Dessert",
        price: 20,
        quantity: 50,
      }),
    })),
  }));

  const { addSweet } = require("../sweet-service");

  const sweet = await addSweet({
    name: "Rasgulla",
    category: "Dessert",
    price: 20,
    quantity: 50,
  });

  expect(sweet.name).toBe("Rasgulla");
});
it("should return list of all sweets", async () => {
  jest.doMock("../../repositories", () => ({
    SweetRepository: jest.fn().mockImplementation(() => ({
      findAll: jest.fn().mockResolvedValue([
        { name: "Ladoo" },
        { name: "Barfi" },
      ]),
    })),
  }));

  const { listSweets } = require("../sweet-service");

  const sweets = await listSweets();
  expect(sweets.length).toBe(2);
});