import Category from "../category/category.model.js";
import { hasRoles } from "../middlewares/validate-roles.js";

export const createCategory = async (req, res) => {
    try{
        const { name, description, typeCategory } = req.body;
        const { usuario } = req;

        const category = new Category({name, description, typeCategory, user: usuario._id});
        await category.save();

        return res.status(200).json({
            sucess: true,
            msg: `Categorian creada con exito`
        })
    }catch (error){
        return res.status(500).json({
            sucess: false,
            msg: "Error al crear la categoria",
            error
        })
    }
}

export const getCategory = async (req, res) => {
    try{
        const { limite = 5, desde = 0 } = req.query
        const query = { status: true }

        const [total, categories ] = await Promise.all([
            Category.countDocuments(query),
            Category.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ])

        return res.status(200).json({
            success: true,
            total,
            categories
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener las categorias",
            error: err.message
        })
    }
}

export const updateCategory = async (req, res) => {
    try {
        hasRoles("ADMIN_ROLE")(req, res, async () => {
            const { id } = req.params;
            const data = req.body;

            const updateCategory = await Category.findByIdAndUpdate(id, data, { new: true });

            res.status(200).json({
                success: true,
                msg: "Categoría actualizada",
                category: updateCategory,
            });
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: "Error al actualizar la categoría",
            error: err.message,
        });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        hasRoles("ADMIN_ROLE")(req, res, async () => {
            const { id } = req.params;

            const category = await Category.findByIdAndUpdate(id, { status: false }, { new: true });

            return res.status(200).json({
                success: true,
                message: "Categoría eliminada",
                category,
            });
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar la categoría",
            error: err.message,
        });
    }
};
