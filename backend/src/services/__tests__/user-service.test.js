describe("UserService - register", () => {
  beforeEach(() => {
    jest.resetModules(); // 🔑 CRITICAL
  });

  it("should throw error if user already exists", async () => {
    jest.doMock("../../repositories", () => {
      return {
        UserRepository: jest.fn().mockImplementation(() => ({
          findByEmail: jest.fn().mockResolvedValue({
            id: 1,
            email: "test@example.com",
          }),
          create: jest.fn(),
        })),
      };
    });

    // ⬅️ Import AFTER mocking
    const { register } = require("../user-service");

    await expect(
      register({
        email: "test@example.com",
        password: "123",
      })
    ).rejects.toThrow("User already exists");
  });
});
