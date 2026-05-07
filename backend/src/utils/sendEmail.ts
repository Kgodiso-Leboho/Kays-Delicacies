import nodeMailer from 'nodemailer';

const transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, 
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const sendEmail = async (to: string, subject: string, text: string, html?: string) => {
    try {
        const info = await transporter.sendMail({
            from: `"Kay's Delicacies" <${process.env.EMAIL_USER}>`, // Added a friendly name
            to,
            subject,
            text,
            html
        });
        
        console.log('Message sent: %s', info.messageId);
        return info;
    } catch (error) {
        console.error('Nodemailer Error:', error);
        throw new Error('Could not send email notification.');
    }
}