import { z } from "zod";

export const packageSchema = z.object({
  id: z.string().min(1, "Package ID is required"),
  key: z.string().min(1, "Key is required"),
  name: z.string().min(1, "Package Name is required"),
  speedMbps: z.coerce.number().positive("Speed must be positive"),
  monthlyPriceUsd: z.coerce.number().min(0, "Price must be non-negative"),
  originalPriceUsd: z.coerce.number().optional().nullable().transform((val) => (val ? Number(val) : undefined)),
  installationFeeUsd: z.coerce.number().min(0).default(0),
  isFreeInstallation: z.boolean().default(true),
  routerIncluded: z.string().default("High-Performance Router Included"),
  category: z.enum(["home", "fiber", "residential", "business", "office"]).default("home"),
  isPopular: z.boolean().optional().default(false),
  isPromoted: z.boolean().optional().default(false),
  badge: z.string().optional().default(""),
  badgeKm: z.string().optional().default(""),
  availabilityStatus: z.enum(["available", "limited", "coming_soon"]).default("available"),
  features: z.array(z.string()).default([]),
  featuresKm: z.array(z.string()).default([]),
  descriptionEn: z.string().default(""),
  descriptionKm: z.string().default(""),
  suitableForEn: z.string().default(""),
  suitableForKm: z.string().default(""),
  equipmentTermsEn: z.string().optional().default(""),
  equipmentTermsKm: z.string().optional().default(""),
});

export const promotionSchema = z.object({
  id: z.string().min(1, "Promotion ID is required"),
  titleEn: z.string().min(1, "English title is required"),
  titleKm: z.string().min(1, "Khmer title is required"),
  descriptionEn: z.string().default(""),
  descriptionKm: z.string().default(""),
  badgeEn: z.string().default("Special Offer"),
  badgeKm: z.string().default("ការផ្ដល់ជូនពិសេស"),
  validUntil: z.string().default("Ongoing"),
  validUntilKm: z.string().optional().default(""),
  highlightEn: z.string().default(""),
  highlightKm: z.string().default(""),
  code: z.string().optional().default(""),
  isExpired: z.boolean().optional().default(false),
});

export const adminDataPayloadSchema = z.object({
  packages: z.array(packageSchema),
  promotions: z.array(promotionSchema),
});

export type PackageFormData = z.infer<typeof packageSchema>;
export type PromotionFormData = z.infer<typeof promotionSchema>;
export type AdminDataPayload = z.infer<typeof adminDataPayloadSchema>;

