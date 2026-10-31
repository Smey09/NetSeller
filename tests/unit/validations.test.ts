import { describe, it, expect } from "vitest";
import { orderFormSchema, contactFormSchema } from "@/lib/validations/order.schema";

describe("Order and Contact Form Validation Schemas", () => {
  it("validates valid order form input successfully", () => {
    const validData = {
      customerName: "Sokha Chan",
      phoneNumber: "012345678",
      selectedPackageId: "pkg-standard",
      installationLocation: "Street 271, Phnom Penh",
      notes: "Please call on weekend",
    };

    const result = orderFormSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("fails if customer name is empty or too short", () => {
    const invalidData = {
      customerName: "A",
      phoneNumber: "012345678",
      selectedPackageId: "pkg-standard",
      installationLocation: "Phnom Penh",
    };

    const result = orderFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.customerName).toBeDefined();
    }
  });

  it("fails if phone number is too short or contains invalid characters", () => {
    const invalidData = {
      customerName: "Sokha",
      phoneNumber: "123",
      selectedPackageId: "pkg-standard",
      installationLocation: "Phnom Penh",
    };

    const result = orderFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.phoneNumber).toBeDefined();
    }
  });

  it("fails if installation location is missing or empty", () => {
    const invalidData = {
      customerName: "Sokha",
      phoneNumber: "012345678",
      selectedPackageId: "pkg-standard",
      installationLocation: "   ",
    };

    const result = orderFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it("validates contact form schema correctly", () => {
    const validContact = {
      fullName: "Dara Heng",
      phoneNumber: "+85512345678",
      location: "Siem Reap",
      message: "Do you have fiber coverage near Pub Street?",
    };

    const result = contactFormSchema.safeParse(validContact);
    expect(result.success).toBe(true);
  });
});

