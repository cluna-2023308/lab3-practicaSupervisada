import { Router } from "express";
import { createCategory, getCategory, updateCategory, deleteCategory } from "./category.controller.js";
import { createCategoryValidator, updateCategoryValidator, deleteCategoryValidator } from "../middlewares/category-validators.js"

const router = Router();

/**
 * @swagger
 * /createCategory:
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created
 *       400:
 *         description: Invalid request
 */
router.post("/createCategory", createCategoryValidator, createCategory);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all categories
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: List of categories
 */
router.get("/", getCategory);

/**
 * @swagger
 * /updateCategory/{id}:
 *   patch:
 *     summary: Update a category
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category updated
 *       400:
 *         description: Invalid request
 */
router.patch("/updateCategory/:id", updateCategoryValidator, updateCategory);

/**
 * @swagger
 * /deleteCategory/{id}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category deleted
 *       400:
 *         description: Invalid request
 */
router.delete("/deleteCategory/:id", deleteCategoryValidator, deleteCategory);

export default router;