import { Router } from "express"
import { register, login } from "./auth.controller.js"
import { registerValidator, loginValidator, assignUserRole } from "../middlewares/user-validators.js"
import { uploadProfilePicture } from "../middlewares/multer-uploads.js"

const router = Router()

router.post(
    "/register",
    uploadProfilePicture.single("profilePicture"), 
    registerValidator, 
    assignUserRole,
    register
)

router.post(
    "/login",
    loginValidator,
    login
)

export default router
