import { Router } from "express";
import { createPublication, updatePublication, deletePublication, getUserPublications } from "./publication.controller.js";
import { createPublicationValidator, updatePublicationVaidator, deletePublicationVaidator, getUserPublicationsValidator } from "../middlewares/publication-validators.js";

const router = Router();

/**
 * @swagger
 * /createPublication:
 *   post:
 *     summary: Create a new publication
 *     tags: [Publication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Publication created
 *       400:
 *         description: Invalid request
 */
router.post("/createPublication", createPublicationValidator, createPublication);

/**
 * @swagger
 * /updatePublication/{id}:
 *   patch:
 *     summary: Update a publication
 *     tags: [Publication]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Publication ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Publication updated
 *       400:
 *         description: Invalid request
 */
router.patch("/updatePublication/:id", updatePublicationVaidator, updatePublication);

/**
 * @swagger
 * /deletePublication/{id}:
 *   delete:
 *     summary: Delete a publication
 *     tags: [Publication]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Publication ID
 *     responses:
 *       200:
 *         description: Publication deleted
 *       400:
 *         description: Invalid request
 */
router.delete("/deletePublication/:id", deletePublicationVaidator, deletePublication);

/**
 * @swagger
 * /getUserPublications:
 *   get:
 *     summary: Get publications by user
 *     tags: [Publication]
 *     responses:
 *       200:
 *         description: List of publications
 */
router.get("/getUserPublications", getUserPublicationsValidator, getUserPublications);

export default router;