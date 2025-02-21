import { Router } from "express";
import { createCategory, getCategory, updateCategory, deleteCategory } from "./category.controller.js";
import { createCategoryValidator, updateCategoryValidator, deleteCategoryValidator } from "../middlewares/category-validators.js"

const router = Router();

router.post("/createCategory", createCategoryValidator, createCategory);

router.get("/", getCategory);

router.patch("/updateCategory/:id", updateCategoryValidator, updateCategory);

router.delete("/deleteCategory/:id", deleteCategoryValidator, deleteCategory);

export default router;