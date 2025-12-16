describe("SweetService", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  describe("addSweet", () => {
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
      expect(sweet.price).toBe(20);
    });
  });

  describe("listSweets", () => {
    it("should return list of all sweets", async () => {
      jest.doMock("../../repositories", () => ({
        SweetRepository: jest.fn().mockImplementation(() => ({
          findAll: jest.fn().mockResolvedValue([
            { name: "Ladoo", category: "Traditional", price: 15 },
            { name: "Barfi", category: "Traditional", price: 25 },
          ]),
        })),
      }));

      const { listSweets } = require("../sweet-service");

      const sweets = await listSweets();
      expect(sweets.length).toBe(2);
      expect(sweets[0].name).toBe("Ladoo");
    });
  });

  describe("purchaseSweet", () => {
    it("should throw error if sweet not found", async () => {
      jest.doMock("../../repositories", () => ({
        SweetRepository: jest.fn().mockImplementation(() => ({
          findById: jest.fn().mockResolvedValue(null),
        })),
      }));

      const { purchaseSweet } = require("../sweet-service");

      await expect(purchaseSweet(999, 5)).rejects.toThrow("Sweet not found");
    });

    it("should throw error if insufficient stock", async () => {
      jest.doMock("../../repositories", () => ({
        SweetRepository: jest.fn().mockImplementation(() => ({
          findById: jest.fn().mockResolvedValue({
            id: 1,
            name: "Rasgulla",
            quantity: 3,
          }),
        })),
      }));

      const { purchaseSweet } = require("../sweet-service");

      await expect(purchaseSweet(1, 5)).rejects.toThrow("Insufficient stock");
    });

    it("should successfully purchase sweet and reduce quantity", async () => {
      const mockUpdate = jest.fn();
      const mockSweet = {
        id: 1,
        name: "Rasgulla",
        quantity: 10,
      };

      jest.doMock("../../repositories", () => ({
        SweetRepository: jest.fn().mockImplementation(() => ({
          findById: jest.fn().mockResolvedValue({ ...mockSweet }),
          update: mockUpdate,
        })),
      }));

      const { purchaseSweet } = require("../sweet-service");

      await purchaseSweet(1, 3);

      expect(mockUpdate).toHaveBeenCalledWith(1, expect.objectContaining({
        quantity: 7,
      }));
    });
    
    it("should search sweets by name", async () => {
        jest.doMock("../../repositories", () => ({
            SweetRepository: jest.fn().mockImplementation(() => ({
                search: jest.fn().mockResolvedValue([{ name: "Gulab Jamun" }]),
            })),
        }));

        const { searchSweets } = require("../sweet-service");

        const result = await searchSweets({ name: "Gulab" });
        expect(result[0].name).toContain("Gulab");
    });
    it("should update sweet details", async () => {
        jest.doMock("../../repositories", () => ({
            SweetRepository: jest.fn().mockImplementation(() => ({
                update: jest.fn().mockResolvedValue({ price: 25 }),
            })),
        }));

        const { updateSweet } = require("../sweet-service");

        const updated = await updateSweet(1, { price: 25 });
        expect(updated.price).toBe(25);
    });
    it("should delete a sweet", async () => {
        jest.doMock("../../repositories", () => ({
            SweetRepository: jest.fn().mockImplementation(() => ({
                delete: jest.fn().mockResolvedValue(true),
            })),
        }));

        const { deleteSweet } = require("../sweet-service");

        const result = await deleteSweet(1);
        expect(result).toBe(true);
    });
    });
});