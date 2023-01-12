const test = require("ava");
const {
  getLocationByUser,
  addLocation,
  deleteLocation,
} = require("../src/location/functions/location");

test("get locations", async (t) => {
  const locations = await getLocationByUser(23);
  console.log(locations);
  t.true(Object.keys(locations[0]).includes("userId"));
});

test("create location", async (t) => {
  const location = await addLocation(23, "delhi");
  console.log("created location ", location);
  t.true(Object.keys(location).includes("id"));

  const deletedLocation = await deleteLocation(location.id);
  t.true(Object.keys(deletedLocation).includes("id"));
});
