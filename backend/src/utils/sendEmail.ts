import nodeMailer from 'nodemailer';

// Create a transporter
const transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const mailOptions = {
    from: process.env.EMAIL_USER,
    to: '', // recipient email
    subject: '', // email subject
    text: '', // email body,
    html: '' // email body in HTML format
}

export const sendEmail = async (to: string, subject: string, text: string, html: string) => {
    try {
        const options = { ...mailOptions, to, subject, text, html };
        await transporter.sendMail(options);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
    }
}