const { getAll } = require("./placeController");
const { Place } = require("../../models");
const PlaceProperties = require("../../models/PlaceProperties");

describe("getAll", () => {
  it("returns all places", async () => {
    // Mock the Place.findAll method to return some sample data
    Place.findAll = jest.fn().mockResolvedValue([
      { id: 1, name: "Place 1", PlaceProperties: { id: 1, property: "value" } },
      { id: 2, name: "Place 2", PlaceProperties: { id: 2, property: "value" } },
    ]);

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    await getAll(req, res, next);

    expect(Place.findAll).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      places: [
        {
          id: 1,
          name: "Place 1",
          PlaceProperties: { id: 1, property: "value" },
        },
        {
          id: 2,
          name: "Place 2",
          PlaceProperties: { id: 2, property: "value" },
        },
      ],
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("handles errors", async () => {
    // Mock the Place.findAll method to throw an error
    Place.findAll = jest.fn().mockRejectedValue(new Error("Database error"));

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    await getAll(req, res, next);

    expect(Place.findAll).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
    expect(next.mock.calls[0][0]).toBeInstanceOf(Error);
    expect(next.mock.calls[0][0].message).toBe("Couldn't get any place");
    expect(next.mock.calls[0][0].code).toBe(404);
  });
});
