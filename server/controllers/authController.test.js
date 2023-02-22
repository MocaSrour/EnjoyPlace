const { login } = require("./authController");
const User = require("../../models/User");
const { generateToken } = require("./authToken");

jest.mock("../../models/User");
jest.mock("./authToken");

describe("login", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      headers: {
        authorization: "Basic dXNlcm5hbWU6cGFzc3dvcmQ=",
      },
    };
    res = {};
    res.cookie = jest.fn();
    res.json = jest.fn();
    res.status = jest.fn(() => res);
    next = jest.fn();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should return the correct user object", async () => {
    const mockUser = {
      id: 1,
      email: "moca@gmail.com",
      userName: "Moca",
      password: "Mochaccino",
      role: "user",
    };
    User.login.mockResolvedValue(mockUser);
    generateToken.mockReturnValue("mock-token");

    await login(req, res, next);
   
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUser);
  });

  it("should call User.login with the correct credentials", async () => {
    const mockUser = { id: 1, userName: "test", password: "password" };
    User.login.mockResolvedValue(mockUser);

    await login(req, res, next);

    expect(User.login).toHaveBeenCalledWith("username", "password");
  });

  it("should call generateToken with the correct userId and userName", async () => {
    const mockUser = { id: 1, userName: "test", password: "password" };
    User.login.mockResolvedValue(mockUser);

    await login(req, res, next);

    expect(generateToken).toHaveBeenCalledWith(mockUser);
  });

  it("should call res.cookie with the correct arguments", async () => {
    const mockUser = { id: 1, userName: "test", password: "password" };
    User.login.mockResolvedValue(mockUser);
    generateToken.mockReturnValue("mock-token");

    await login(req, res, next);

    expect(res.cookie).toHaveBeenCalledWith("jwt", "mock-token", {
      httpOnly: true,
      maxAge: 1000 * 3 * 24 * 60 * 60,
      Path: "/",
    });
  });

  it("should call next with an error if User.login throws an error", async () => {
    const mockError = new Error("Test error");
    User.login.mockRejectedValue(mockError);

    await login(req, res, next);

    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Login failed",
        code: 401,
        stack: expect.any(String),
      })
    );
  });
});
