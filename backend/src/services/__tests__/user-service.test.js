describe("UserService - signin", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("should throw error if password is invalid", async () => {
    jest.doMock("../../repositories", () => {
      return {
        UserRepository: jest.fn().mockImplementation(() => ({
          findByEmail: jest.fn().mockResolvedValue({
            id: 1,
            email: "test@example.com",
            password: "", // fake hash
          }),
        })),
      };
    });

    jest.doMock("bcrypt", () => ({
      compare: jest.fn().mockResolvedValue(false),
    }));

    const { signin } = require("../user-service");

    await expect(
      signin({
        email: "test@example.com",
        password: "wrong-password",
      })
    ).rejects.toThrow("Invalid password");
  });
});
