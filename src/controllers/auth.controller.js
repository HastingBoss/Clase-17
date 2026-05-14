import UserRepository from "../repositories/user.repository.js";
import ServerError from "../helpers/errors.helper.js";
import bcrypt from "bcrypt";
import sendEmail from "../helpers/email.helper.js";
import ENVIRONMENT from "../config/environment.config.js";

class AuthController {
    async register(req, res) {
        try {
            const { name, email, password } = req.body;

            if (!name || name.length <= 2) {
                throw new ServerError("Nombre debe ser mayor a 2 caracteres", 400);
            }

            if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
                throw new ServerError("Email inválido", 400);
            }

            if (!password || password.length < 6) {
                throw new ServerError("Password debe tener al menos 6 caracteres", 400);
            }

            const existingUser = await UserRepository.getByEmail(email);
            if (existingUser) {
                throw new ServerError("El email ya está registrado", 400);
            }

            const hashedPassword = await bcrypt.hash(password, 12);

            const newUser = await UserRepository.create(name, email, hashedPassword);

            await sendEmail({
                from: ENVIRONMENT.GMAIL_USERNAME,
                to: email,
                subject: "Sos vos loco?",
                html: `<h1>Hola ${name}!</h1><a href="${ENVIRONMENT.URL_BACKEND}/api/auth/verify-email?email=${email}">Verificar correo</a>`
            });

            res.status(201).json({
                message: "Usuario registrado con éxito",
                user: {
                    id: newUser._id,
                    name: newUser.name,
                    email: newUser.email
                }
            });
        } catch (error) {
            console.error(error);
            if (error.status) {
                return res.status(error.status).json({ message: error.message });
            }
            res.status(500).json({ message: "Internal server error" });
        }

    }

    async verifiedEmail(req, res) {
        try {
            const { email } = req.query
            const user = await UserRepository.getByEmail(email);
            if (!user) {
                throw new ServerError('User no encontrado', 404);
            }
            if (user.emailVerified) {
                throw new ServerError('El email ya fue verificado', 400);
            }
            await UserRepository.updateById(user._id, { emailVerified: true });
            res.status(200).json({
                message: 'Email verficado con éxito',
                ok: true
            });
        } catch (error) {
            if (error.status) {
                return res.status(error.status).json({ message: error.message });
            }
            res.status(500).json({ message: "Internal server error" });
        }
    }
}



export default new AuthController();
