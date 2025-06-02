import emailjs from "@emailjs/browser";
import { ContactFormData } from "@/lib/validations";

interface EmailConfig {
  serviceId: string;
  templateId: string;
  publicKey: string;
}

const EMAIL_CONFIG: EmailConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || "",
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "",
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "",
};

export const initializeEmailJS = () => {
  if (EMAIL_CONFIG.publicKey) {
    emailjs.init(EMAIL_CONFIG.publicKey);
  }
};

export const sendContactEmail = async (
  formData: ContactFormData
): Promise<void> => {
  if (
    !EMAIL_CONFIG.serviceId ||
    !EMAIL_CONFIG.templateId ||
    !EMAIL_CONFIG.publicKey
  ) {
    throw new Error(
      "Email service is not properly configured. Please check your environment variables."
    );
  }

  const templateParams = {
    from_name: formData.name,
    from_email: formData.email,
    company: formData.company || "Not specified",
    message: formData.message,
    to_name: "Kel",
    reply_to: formData.email,
  };

  try {
    const response = await emailjs.send(
      EMAIL_CONFIG.serviceId,
      EMAIL_CONFIG.templateId,
      templateParams,
      EMAIL_CONFIG.publicKey
    );

    if (response.status !== 200) {
      throw new Error(`Email service returned status: ${response.status}`);
    }

    return Promise.resolve();
  } catch (error) {
    console.error("Email sending failed:", error);
    throw new Error("Failed to send email. Please try again later.");
  }
};
