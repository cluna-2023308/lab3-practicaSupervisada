import User from "../user/user.model.js"
import Category from "../category/category.model.js"
import Publication from "../publication/publication.model.js"
import Comment from "../comment/comment.model.js"

export const emailExists = async (email = "") => {
    const existe = await User.findOne({email})
    if(existe){
        throw new Error(`The email ${email} is already registered`)
    }
}

export const usernameExists = async (username = "") => {
    const existe = await User.findOne({username})
    if(existe){
        throw new Error(`The username ${username} is already registered`)
    }
}

export const userExists = async (uid = " ") => {
    const existe = await User.findById(uid)
    if(!existe){
        throw new Error("No existe el usuario con el ID proporcionado")
    }
}

export const categoryExists = async (id = " ") => {
    const existe = await Category.findById(id)
    if(!existe){
        throw new Error("No existe la categoria con el ID propocionado")
    }
}

export const publicationExists = async (id = " ") => {
    const existe = await Publication.findById(id)
    if(!existe){
        throw new Error("No existe la publicacion con el ID proporcionado")
    }
}

export const commentExists = async (id = " ") => {
    const existe = await Comment.findById(id)
    if(!existe){
        throw new Error("No existe el comentario con el ID proporcionado")
    }
}