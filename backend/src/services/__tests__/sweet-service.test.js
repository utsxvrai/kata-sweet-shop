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
