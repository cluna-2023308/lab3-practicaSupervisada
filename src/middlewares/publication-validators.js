import { body, param } from "express-validator";
import { publicationExists } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

export const createPublicationValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "USER_ROLE"),
    body("title").notEmpty().withMessage("El titulo es requerido"),
    body("text").notEmpty().withMessage("El texto es requerido"),
    validarCampos,
    handleErrors
]

export const updatePublicationVaidator = [
    validateJWT,
    param("id", "No es un ID válido").isMongoId(),
    param("id").custom(publicationExists),
    validarCampos,
    handleErrors
]

export const deletePublicationVaidator = [
    validateJWT,
    param("id", "No es un ID válido").isMongoId(),
    param("id").custom(publicationExists),
    validarCampos,
    handleErrors
]

export const getUserPublicationsValidator = [
    validateJWT,
    validarCampos,
    handleErrors
]