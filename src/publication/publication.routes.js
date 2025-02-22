import { Router } from "express";
import { createPublication, updatePublication, deletePublication, getUserPublications } from "./publication.controller.js";
import { createPublicationValidator, updatePublicationVaidator, deletePublicationVaidator, getUserPublicationsValidator } from "../middlewares/publication-validators.js";

const router = Router();

router.post("/createPublication", createPublicationValidator, createPublication);

router.patch("/updatePublication/:id", updatePublicationVaidator, updatePublication);

router.delete("/deletePublication/:id", deletePublicationVaidator, deletePublication);

router.get("/getUserPublications", getUserPublicationsValidator, getUserPublications);

export default router;