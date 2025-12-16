const authenticate = require("../auth-middleware");
const jwt = require("jsonwebtoken");

// Mock the environment variable
process.env.JWT_SECRET = "test-secret-key";

describe("Authentication Middleware", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      headers: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  describe("authenticate", () => {
    it("should call next() if token is valid", async () => {
      const token = jwt.sign(
        { id: 1, email: "test@example.com", role: "USER" },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      req.headers.authorization = `Bearer ${token}`;

      await authenticate(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(req.user).toBeDefined();
      expect(req.user.id).toBe(1);
      expect(req.user.email).toBe("test@example.com");
    });

    it("should return 401 if no authorization header", async () => {
      await authenticate(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: expect.stringContaining("No token provided"),
      });
      expect(next).not.toHaveBeenCalled();
    });

    it("should return 401 if authorization header doesn't start with Bearer", async () => {
      req.headers.authorization = "Invalid token";

      await authenticate(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: expect.stringContaining("No token provided"),
      });
      expect(next).not.toHaveBeenCalled();
    });

    it("should return 401 if token is invalid", async () => {
      req.headers.authorization = "Bearer invalid-token";

      await authenticate(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Invalid token.",
      });
      expect(next).not.toHaveBeenCalled();
    });

    it("should return 401 if token is expired", async () => {
      const expiredToken = jwt.sign(
        { id: 1, email: "test@example.com", role: "USER" },
        process.env.JWT_SECRET,
        { expiresIn: "0s" }
      );

      req.headers.authorization = `Bearer ${expiredToken}`;

      // Wait a bit to ensure token is expired
      await new Promise((resolve) => setTimeout(resolve, 100));

      await authenticate(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Token has expired. Please login again.",
      });
      expect(next).not.toHaveBeenCalled();
    });

    it("should return 401 if token is empty", async () => {
      req.headers.authorization = "Bearer ";

      await authenticate(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Access denied. Token is empty.",
      });
      expect(next).not.toHaveBeenCalled();
    });
  });
});
