const express = require("express");
const router = express.Router();
const prisma = require("../../db/prisma");
const jwt = require("jsonwebtoken");
const { validatePassword, hashPassword } = require("../utils/hashing");
const { v4: uuidv4 } = require("uuid");

const secret = process.env.SECRET;
const tokenExpiry = process.env.TOKEN_EXPIRY;
const refreshSecret = process.env.REFRESH_SECRET;
const refreshExpiry = process.env.REFRESH_EXPIRY;

router.post("/login", async (request, response, next) => {
  try {
    const { email, password } = request.body;

    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    console.log("user ", user);
    if (!user) throw new Error("User doesnt exists");

    const isMatch = await validatePassword(password, user.password);

    if (!isMatch) throw new Error("Incorrect Password");

    const userData = {
      userId: user.userId,
    };
    const token = jwt.sign(userData, secret, { expiresIn: tokenExpiry });
    const refreshToken = jwt.sign(userData, refreshSecret, {
      expiresIn: refreshExpiry,
    });

    const expiredAt = new Date();
    expiredAt.setSeconds(expiredAt.getSeconds() + refreshExpiry);

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiredAt: expiredAt,
      },
    });
    return response.status(200).json({
      success: true,
      message: "Loggedin successfully",
      data: {
        accessToken: token,
        refreshToken: refreshToken,
      },
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      success: false,
      message: "Failed at auth/login",
      error: error.message,
    });
  }
});

router.post("/signup", async (request, response, next) => {
  try {
    const { name, email, password } = request.body;

    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        id: uuidv4(),
        name: name,
        email: email,
        password: hashedPassword,
      },
    });
    return response.status(200).json({
      success: true,
      message: "Successfully registered user",
      data: user,
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      success: false,
      message: "Failed at auth/signup",
      error: error.message,
    });
  }
});

router.post("/refreshToken", async (request, response, next) => {
  try {
    const { refreshToken } = request.body;

    const rToken = await prisma.refreshToken.findUnique({
      where: {
        token: refreshToken,
      },
    });
    console.log(rToken);
    if (!rToken) throw new Error("Refresh Token not found");

    if (rToken.expiredAt.getTime() < new Date().getTime()) {
      await prisma.refreshToken.delete({
        where: {
          token: refreshToken,
        },
      });
      throw new Error("Refresh Token expired");
    }

    const userData = {
      userId: refreshToken.userId,
    };
    const token = jwt.sign(userData, secret, { expiresIn: tokenExpiry });
    return response.status(200).json({
      success: true,
      message: "Successfully revoked token",
      data: {
          accessToken:token
      },
    });
  } catch (error) {
    response.status(500).json({
      success: false,
      message: "Failed at auth/refreshToken",
      error: error.message,
    });
  }
});
module.exports = router;
