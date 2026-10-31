import { z } from "zod";

export interface ValidationMessages {
  nameRequired?: string;
  nameMin?: string;
  nameMax?: string;
  phoneRequired?: string;
  phoneMin?: string;
  phoneMax?: string;
  phoneRegex?: string;
  packageRequired?: string;
  locationRequired?: string;
  locationMin?: string;
  locationMax?: string;
  notesMax?: string;
  districtMin?: string;
  messageMin?: string;
  messageMax?: string;
}

export function getOrderFormSchema(messages?: ValidationMessages) {
  return z.object({
    customerName: z
      .string()
      .trim()
      .min(2, { message: messages?.nameMin || "Name must be at least 2 characters." })
      .max(100, { message: messages?.nameMax || "Name cannot exceed 100 characters." }),
    phoneNumber: z
      .string()
      .trim()
      .min(8, { message: messages?.phoneMin || "Please enter a valid phone number (at least 8 digits)." })
      .max(20, { message: messages?.phoneMax || "Phone number is too long." })
      .regex(/^[0-9+\s\-()]+$/, { message: messages?.phoneRegex || "Please enter a valid phone number." }),
    selectedPackageId: z.string().min(1, { message: messages?.packageRequired || "Please select a package." }),
    installationLocation: z
      .string()
      .trim()
      .min(3, { message: messages?.locationMin || "Please enter your installation location or address." })
      .max(250, { message: messages?.locationMax || "Location description is too long." }),
    notes: z.string().max(500, { message: messages?.notesMax || "Notes cannot exceed 500 characters." }).optional(),
  });
}

export const orderFormSchema = getOrderFormSchema();
export type OrderFormValues = z.infer<typeof orderFormSchema>;

export function getContactFormSchema(messages?: ValidationMessages) {
  return z.object({
    fullName: z
      .string()
      .trim()
      .min(2, { message: messages?.nameMin || "Name must be at least 2 characters." })
      .max(100, { message: messages?.nameMax || "Name cannot exceed 100 characters." }),
    phoneNumber: z
      .string()
      .trim()
      .min(8, { message: messages?.phoneMin || "Please enter a valid phone number." })
      .max(20, { message: messages?.phoneMax || "Phone number is too long." })
      .regex(/^[0-9+\s\-()]+$/, { message: messages?.phoneRegex || "Please enter a valid phone number." }),
    location: z
      .string()
      .trim()
      .min(2, { message: messages?.districtMin || "Please specify your district or city." }),
    message: z
      .string()
      .trim()
      .min(5, { message: messages?.messageMin || "Message must be at least 5 characters." })
      .max(1000, { message: messages?.messageMax || "Message cannot exceed 1000 characters." }),
  });
}

export const contactFormSchema = getContactFormSchema();
export type ContactFormValues = z.infer<typeof contactFormSchema>;
