"use strict";
//imports
const express = require("express");
const { ClothesTable } = require("../models/index");
const clothesRouter = express.Router();

clothesRouter.get("/clothes", getClothes);
clothesRouter.get("/clothes/:id", getOneClothing);
clothesRouter.post("/clothes", createClothing);
clothesRouter.put("/clothes/:id", updateClothing);
clothesRouter.delete("/clothes/:id", deleteClothing);

async function getClothes(req, res) {
    const allClothes = await ClothesTable.read();
    res.status(200).json(allClothes);
  }
  async function getOneClothing(req, res) {
    const clothingId = parseInt(req.params.id);
    const clothing = await ClothesTable.read(clothingId);
    res.status(200).json(clothing);
  }
  async function createClothing(req, res) {
    const newClothing = req.body;
    const clothing = await ClothesTable.create(newClothing);
    res.status(201).json(clothing);
  }
  async function updateClothing(req, res) {
    const clothingId = parseInt(req.params.id);
    const updateClothing = req.body;
    const foundClothe = await ClothesTable.read(clothingId);
    if (foundClothe) {
      const updatedClothing = await foundClothe.update(updateClothing);
      res.status(201).json(updatedClothing);
    } else {
      res.status(404);
    }
  }
  async function deleteClothing(req, res) {
    const clothingId = parseInt(req.params.id);
    const deleteClothing = await ClothesTable.delete(clothingId);
    res.status(204).json(deleteClothing); 
}
  module.exports = clothesRouter;