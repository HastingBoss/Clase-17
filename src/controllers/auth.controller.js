import UserRepository from "../repositories/user.repository.js";

class AuthController {
    async register(req, res) {
        try {
            const { name, email, password } = req.body;

            // Validaciones
            if (!name || name.length <= 2) {
                return res.status(400).json({ message: "Nombre debe ser mayor a 2 caracteres" });
            }

            if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
                return res.status(400).json({ message: "Email inválido" });
            }

            if (!password || password.length < 6) {
                return res.status(400).json({ message: "Password debe tener al menos 6 caracteres" });
            }

            // Verificar existencia
            const existingUser = await UserRepository.getByEmail(email);
            if (existingUser) {
                return res.status(400).json({ message: "El email ya está registrado" });
            }

            // Crear usuario
            const newUser = await UserRepository.create(name, email, password);

            res.status(201).json({
                message: "Usuario registrado con éxito",
                user: {
                    id: newUser._id,
                    name: newUser.name,
                    email: newUser.email
                }
            });
        } catch (error) {
            res.status(500).json({ message: "Error interno del servidor", error: error.message });
        }
    }
}

export default new AuthController();
