import { checkAdminStatus } from "../redux/authentication/authAdmin";
import { getDatabase, ref, get } from "firebase/database";

jest.mock("firebase/database", () => {
  return {
    getDatabase: jest.fn(() => ({
      ref: jest.fn(),
    })),
    ref: jest.fn(),
    get: jest.fn(),
  };
});

describe("checkAdminStatus function", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Reset mocks before each test
  });

  it("should return true for an admin user", async () => {
    get.mockResolvedValue({
      exists: () => true,
      val: () => ({ role: "admin" }),
    });

    const isAdmin = await checkAdminStatus("admin@example.com");
    expect(isAdmin).toBe(true);
  });

  it("should return false for a non-admin user", async () => {
    get.mockResolvedValue({
      exists: () => true,
      val: () => ({ role: "user" }),
    });

    const isAdmin = await checkAdminStatus("user@example.com");
    expect(isAdmin).toBe(false);
  });

  it("should return false if the user does not exist in the database", async () => {
    get.mockResolvedValue({
      exists: () => false,
    });

    const isAdmin = await checkAdminStatus("nonexistent@example.com");
    expect(isAdmin).toBe(false);
  });
});
