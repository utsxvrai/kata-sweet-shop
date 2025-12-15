describe("SweetService - purchaseSweet", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("should throw error if stock is insufficient", async () => {
    jest.doMock("../../repositories", () => {
      return {
        SweetRepository: jest.fn().mockImplementation(() => ({
          findById: jest.fn().mockResolvedValue({
            id: 1,
            name: "Gulab Jamun",
            quantity: 2,
          }),
          update: jest.fn(),
        })),
      };
    });

    const { purchaseSweet } = require("../sweet-service");

    await expect(
      purchaseSweet(1, 5) // request more than available
    ).rejects.toThrow("Insufficient stock");
  });
});
