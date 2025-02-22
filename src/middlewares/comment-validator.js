import { body, param } from "express-validator";
import { commentExists } from "../helpers/db-validators.js"
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

export const createCommentValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "USER_ROLE"),
    body("text").notEmpty().withMessage("El texto es requerido"),
    validarCampos,
    handleErrors
]

export const updateCommentVaidator = [
    validateJWT,
    param("id", "No es un ID válido").isMongoId(),
    param("id").custom(commentExists),
    validarCampos,
    handleErrors
]

export const deleteCommentVaidator = [
    validateJWT,
    param("id", "No es un ID válido").isMongoId(),
    param("id").custom(commentExists),
    validarCampos,
    handleErrors
]