import nodemailer from "nodemailer";
import ENVIRONMENT from "../config/environment.config.js";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: ENVIRONMENT.GMAIL_USERNAME,
        pass: ENVIRONMENT.GMAIL_PASSWORD,
    },
});

const sendEmail = async (options) => {
    try {
        await transporter.sendMail(options);
    } catch (error) {
        console.error("Error al enviar email:", error);
        throw error;
    }
};

export default sendEmail;
