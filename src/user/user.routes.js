import { Router } from "express"
import { getUserById, getUsers, updatePassword, updateUser, updateProfilePicture } from "./user.controller.js"
import { getUserByIdValidator, updatePasswordValidator, updateUserValidator, updateProfilePictureValidator } from "../middlewares/user-validators.js"
import { uploadProfilePicture } from "../middlewares/multer-uploads.js"

const router = Router()

/**
 * @swagger
 * /findUser/{uid}:
 *   get:
 *     summary: Get user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */
router.get("/findUser/:uid", getUserByIdValidator, getUserById)

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: List of users
 */
router.get("/", getUsers)

/**
 * @swagger
 * /updatePassword/{uid}:
 *   patch:
 *     summary: Update user password
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated
 *       400:
 *         description: Invalid request
 */
router.patch("/updatePassword/:uid", updatePasswordValidator, updatePassword)

/**
 * @swagger
 * /updateProfilePicture/{uid}:
 *   patch:
 *     summary: Update user profile picture
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile picture updated
 *       400:
 *         description: Invalid request
 */
router.patch("/updateProfilePicture/:uid", uploadProfilePicture.single("profilePicture"),  updateProfilePictureValidator, updateProfilePicture)

/**
 * @swagger
 * /updateUser/{uid}:
 *   put:
 *     summary: Update user information
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               surname:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated
 *       400:
 *         description: Invalid request
 */
router.put("/updateUser/:uid", updateUserValidator, updateUser)

export default router
