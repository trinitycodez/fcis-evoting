import nodemailer from "nodemailer";

const email = process.env.EMAIL;
const email_pwd = process.env.EMAILPASS;

export const nodeMail = nodemailer.createTransport({
    host: "smtp.gmail.com",
    sender: email,
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: email,
        pass: email_pwd
        // pass: 'dggpnyvlizbxdbzb'
    },
});
