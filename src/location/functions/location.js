
const prisma = require("../../../db/prisma");
const logger = require('../../utils/logger')
const { v4: uuidv4 } = require('uuid');

module.exports.addLocation = async (userId, location) => {
  try {
    const newLocation = await prisma.location.create({
      data: {
        location: location,
        userId: userId,
        id:uuidv4()
      },
    });

    return newLocation;
  } catch (error) {
    logger.error(error.message)
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
    logger.error(error.message)
    throw new Error(error.message);
  }
};

module.exports.updateLocation = async (location) => {
  try {
    const location = await prisma.location.update({
      where: {
        id: id,
      },
      data: {
        location: location,
      },
    });
    return location;
  } catch (error) {
    logger.error(error.message)
    throw new Error(error.message);
  }
};

module.exports.deleteLocation = async (id) => {
  try {
    const location = await prisma.location.delete({
      where: {
        id: id,
      }
    });
    return location;
  } catch (error) {
    logger.error(error.message)
    throw new Error(error.message);
  }
};