import express from "express";
// const express = require("express");

 import { register, login } from "../controllers/auth";

//  const register =require ("../controllers/auth")
//  const login =require ("../controllers/auth")


const router = express.Router();

// router.get("/:message", showMessage);
router.post("/register", register);
router.post("/login", login);
module.exports = router;
