const express = require("express");
const router = express.Router();
const {
  addLocation,
  getLocationByUser,
  updateLocation,
} = require("./functions/location");

router.post("/", async (request, response, next) => {
  try {
    console.log(request.body);
    const { location, userId } = request.body;
    const locationData = await addLocation(userId, location);
    return response.status(200).json({
      success: true,
      message: "Successfylly created location",
      data: locationData,
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: "Failed to create location",
      error: error.message,
    });
  }
});

router.get("/", async (request, response, next) => {
  try {
    const { userId } = request.user;

    const locations = await getLocationByUser(userId);
    return response.status(200).json({
      success: true,
      message: "Successfylly fetched locations",
      data: locations,
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: "Failed to fetch location",
      error: error.message,
    });
  }
});

router.post("/update", async (request, response, next) => {
  try {
    const { location } = request.body;
    const updatedLocation = await updateLocation(location);

    return response.status(200).json({
      success: true,
      message: "Successfully updated location",
      data: updatedLocation,
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: "Failed at location/update",
      error: error.message,
    });
  }
});
module.exports = router;
