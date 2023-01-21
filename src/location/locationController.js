const express = require("express");
const router = express.Router();
const {
  addLocation,
  getLocationByUser,
  getLocationById,
  updateLocation,
} = require("./functions/location");

const { isOwner } = require("../middleware/role");


router.post("/", async (request, response, next) => {
  try {
    console.log(request.body);
    const { location, userId } = request.body;

    const locationObj ={
      userId:userId,
      location:location,

    }
    const locationData = await addLocation(locationObj);
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
    const { id, location } = request.body;
    const oldLocation = await getLocationById(id);
    console.log(oldLocation);
    if (!isOwner(id, oldLocation))
      throw new Error("Only Owner can update the location");

    const updatedLocation = await updateLocation(id, location);

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
