export type Locale = "en" | "km";

export interface InternetPackage {
  id: string;
  key: string;
  name: string;
  speedMbps: number;
  monthlyPriceUsd: number;
  originalPriceUsd?: number;
  installationFeeUsd: number;
  isFreeInstallation: boolean;
  routerIncluded: string;
  category: "home" | "fiber" | "residential" | "business" | "office";
  isPopular?: boolean;
  isPromoted?: boolean;
  badge?: string;
  badgeKm?: string;
  availabilityStatus: "available" | "limited" | "coming_soon";
  features: string[];
  featuresKm: string[];
  descriptionEn: string;
  descriptionKm: string;
  suitableForEn: string;
  suitableForKm: string;
  equipmentTermsEn?: string;
  equipmentTermsKm?: string;
}

export interface Promotion {
  id: string;
  titleEn: string;
  titleKm: string;
  descriptionEn: string;
  descriptionKm: string;
  badgeEn: string;
  badgeKm: string;
  validUntil: string;
  validUntilKm?: string;
  highlightEn: string;
  highlightKm: string;
  code?: string;
  isExpired?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  roleEn: string;
  roleKm: string;
  locationEn: string;
  locationKm: string;
  rating: number;
  commentEn: string;
  commentKm: string;
  packageUsed: string;
  isPlaceholder: boolean;
}

export interface ServiceArea {
  id: string;
  nameEn: string;
  nameKm: string;
  coverageStatus: "full" | "high" | "expanding";
  estimatedInstallHours: string;
  estimatedInstallHoursKm?: string;
}

export interface SellerConfig {
  name: string;
  avatarUrl?: string;
  titleEn: string;
  titleKm: string;
  bioEn: string;
  bioKm: string;
  telegramUsername: string;
  telegramPhone: string;
  phone: string;
  phoneDisplay: string;
  email: string;
  facebookUrl: string;
  whatsappNumber?: string;
  serviceAreas: ServiceArea[];
  workingHours: string;
  workingHoursKm?: string;
  responseTime: string;
  responseTimeKm?: string;
  experienceYears: number;
  completedInstallations: number;
  satisfactionRate: string;
}

export interface OrderInquiry {
  customerName: string;
  phoneNumber: string;
  selectedPackageId: string;
  packageName: string;
  packageSpeed: string;
  packagePrice: string;
  installationLocation: string;
  notes?: string;
}
