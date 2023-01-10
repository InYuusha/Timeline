const prisma = require("../../../db/prisma");

module.exports.addLocation = async (userId, location) => {
  try {
    const newLocation = await prisma.location.create({
      data: {
        location: location,
        userId: userId,
      },
    });

    return newLocation;
  } catch (error) {
      console.log(error)
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
    throw new Error(error.message);
  }
};
