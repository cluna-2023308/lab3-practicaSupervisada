import Publication from "../publication/publication.model.js"
import Category from "../category/category.model.js";

export const createPublication = async (req, res) => {
    try {
        const { title, text, category } = req.body;
        const { usuario } = req;

        const categoryExists = await Category.findById(category);
        if (!categoryExists) {
            return res.status(404).json({
                success: false,
                message: "Categoría no encontrada"
            });
        }

        const publication = new Publication({title, text, category, user: usuario._id});
        await publication.save();

        return res.status(201).json({
            success: true,
            msg: `Publicación creada exitosamente`,
            publication
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: "Error al crear la publicación",
            error: error.message
        });
    }
};

export const updatePublication = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, text, category } = req.body;
        const { usuario } = req;

        const publication = await Publication.findById(id);
        if (!publication) {
            return res.status(404).json({
                success: false,
                message: "Publicación no encontrada"
            });
        }

        if (publication.user.toString() !== usuario._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "No tienes autorizacion para editar esta publicación"
            });
        }

        if (category) {
            const categoryExists = await Category.findById(category);
            if (!categoryExists) {
                return res.status(404).json({
                    success: false,
                    message: "Categoría no encontrada"
                });
            }
        }

        const updatedPublication = await Publication.findByIdAndUpdate(id, { title, text, category }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Publicación actualizada exitosamente",
            publication: updatedPublication
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar la publicación",
            error: error.message
        });
    }
};

export const deletePublication = async (req, res) => {
    try{
        const { id } = req.params;
        const { usuario } = req;

            const publication = await Publication.findById(id);
            if (publication.user.toString() !== usuario._id.toString()) {
                return res.status(403).json({
                    success: false,
                    message: "No tienes permiso para eliminar esta publicación"
                });
            }
    
            const publicationDelete = await Publication.findByIdAndUpdate(id, { status: false }, { new: true });

            return res.status(200).json({
                success: true,
                message: "Publicacion eliminada",
                publicationDelete,
            });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar la publicacion",
            error: err.message,
        });
    }
};

export const getUserPublications = async (req, res) => {
    try {
        const { usuario } = req;

        const publications = await Publication.find({ user: usuario })
            .populate("category", "name typeCategory")
            .populate("user", "name email")
            .populate({
                path: "comments",
                populate: { path: "user", select: "name email" }
            });

        if (!publications.length) {
            return res.status(404).json({ msg: "No hay publicaciones para este usuario" });
        }

        return res.status(200).json({
            success: true,
            message: `Publicaciones del usuario: ${usuario.name} ${usuario.surname}`,
            publications,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al obtener publicaciones" });
    }
};
