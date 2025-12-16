const isAdmin = require("../admin-middleware");

describe("Admin Middleware", () => {
    let req, res, next;

    beforeEach(() => {
        jest.resetModules();
        req = {
            user: { id: 1 },
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });

    describe("isAdmin", () => {
        it("should call next() if user is ADMIN", async () => {
            jest.doMock("../../repositories", () => ({
                UserRepository: jest.fn().mockImplementation(() => ({
                    findById: jest.fn().mockResolvedValue({
                        id: 1,
                        email: "admin@example.com",
                        role: "ADMIN",
                    }),
                })),
            }));

            const isAdminMiddleware = require("../admin-middleware");

            await isAdminMiddleware(req, res, next);

            expect(next).toHaveBeenCalled();
            expect(req.adminUser).toBeDefined();
            expect(req.adminUser.role).toBe("ADMIN");
        });

        it("should return 403 if user is not ADMIN", async () => {
            jest.doMock("../../repositories", () => ({
                UserRepository: jest.fn().mockImplementation(() => ({
                    findById: jest.fn().mockResolvedValue({
                        id: 1,
                        email: "user@example.com",
                        role: "USER",
                    }),
                })),
            }));

            const isAdminMiddleware = require("../admin-middleware");

            await isAdminMiddleware(req, res, next);

            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: "Access denied. Admin privileges required.",
            });
            expect(next).not.toHaveBeenCalled();
        });

        it("should return 401 if user is not authenticated", async () => {
            req.user = null;

            await isAdmin(req, res, next);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: "Authentication required. Please login first.",
            });
            expect(next).not.toHaveBeenCalled();
        });

        it("should return 404 if user not found in database", async () => {
            jest.doMock("../../repositories", () => ({
                UserRepository: jest.fn().mockImplementation(() => ({
                    findById: jest.fn().mockResolvedValue(null),
                })),
            }));

            const isAdminMiddleware = require("../admin-middleware");

            await isAdminMiddleware(req, res, next);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: "User not found.",
            });
            expect(next).not.toHaveBeenCalled();
        });
    });
});
