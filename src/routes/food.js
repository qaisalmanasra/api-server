"use strict";
//imports
const express = require("express");
const { FoodTable } = require("../models/index");
const foodRouter = express.Router();

//routes
foodRouter.get('/food', getFoods);
foodRouter.get('/food/:id', getOneFood);
foodRouter.post('/food', createFood);
foodRouter.put('/food/:id', updateFood);
foodRouter.delete('/food/:id', deleteFood);

//functions
async function getFoods(req, res) {
  const foods = await FoodTable.read();
  res.status(200).json(foods);
}

async function getOneFood(req, res) {
  const foodId = parseInt(req.params.id);
  const food = await FoodTable.read(foodId);
  res.status(200).json(food);
}

async function createFood(req, res) {
  const newFood = req.body;
  const food = await FoodTable.create(newFood);
  res.status(201).json(food);
}

async function updateFood(req, res) {
  const foodId = parseInt(req.params.id);
  const updateFood = req.body;
  const findFood = await FoodTable.read(foodId);
  if (findFood) {
    const updatedFood = await findFood.update(updateFood);
    res.status(201).json(updatedFood);
  } else {
    res.status(404);
  }
}
async function deleteFood(req, res) {
  const foodId = parseInt(req.params.id);
  const deletFood = await FoodTable.delete(foodId);
  res.status(204).json({ message: `${deletFood} deleted` });
}
//export
module.exports = foodRouter;