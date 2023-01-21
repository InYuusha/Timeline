const prisma = require("../../../db/prisma");
const logger = require("../../utils/logger");
const { v4: uuidv4 } = require("uuid");

module.exports.addLocation = async (locationObj) => {
  try {

    const newLocation = await prisma.location.create({
      data: {
        ...locationObj,
        id: uuidv4(),
      },
    });

    return newLocation;
  } catch (error) {
    logger.error(error.message);
    throw new Error(error.message);
  }
};

module.exports.getLocationById = async (id) => {
  try {
    const location = await prisma.location.findUnique({
      where: {
        id: id,
      },
    });
    return location;
  } catch (error) {
    logger.error(error.message);
    throw new Error(error.message);
  }
};

module.exports.getLocationByUser = async (userId) => {
  try {
    const locations = await prisma.location.findMany({
      where: {
        userId: userId,
      },
    });
    return locations;
  } catch (error) {
    logger.error(error.message);
    throw new Error(error.message);
  }
};

module.exports.updateLocation = async (id, locationObj) => {
  try {
    const { location } = locationObj;
    const updatedLocation = await prisma.location.update({
      where: {
        id: id,
      },
      data: {
        id: undefined,
        createdAt: undefined,
        location: location,
        userId: undefined,
      },
    });
    return updatedLocation;
  } catch (error) {
    logger.error(error.message);
    throw new Error(error.message);
  }
};

module.exports.deleteLocation = async (id) => {
  try {
    const location = await prisma.location.delete({
      where: {
        id: id,
      },
    });
    return location;
  } catch (error) {
    logger.error(error.message);
    throw new Error(error.message);
  }
};
