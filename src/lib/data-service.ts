import fs from "fs";
import path from "path";
import { InternetPackage, Promotion } from "@/types";
import { adminDataPayloadSchema } from "./validations/admin-data.schema";
import defaultPackages from "@/data/packages.json";
import defaultPromotions from "@/data/promotions.json";

const PACKAGES_PATH = path.join(process.cwd(), "src", "data", "packages.json");
const PROMOTIONS_PATH = path.join(process.cwd(), "src", "data", "promotions.json");

export class DataService {
  /**
   * Reads current internet packages from JSON or default fallback.
   */
  public static async getPackages(): Promise<InternetPackage[]> {
    try {
      if (fs.existsSync(PACKAGES_PATH)) {
        const fileContent = await fs.promises.readFile(PACKAGES_PATH, "utf-8");
        return JSON.parse(fileContent);
      }
    } catch (err) {
      console.warn("Could not read packages.json from disk, using fallback default:", err);
    }
    return defaultPackages as InternetPackage[];
  }

  /**
   * Reads current promotions from JSON or default fallback.
   */
  public static async getPromotions(): Promise<Promotion[]> {
    try {
      if (fs.existsSync(PROMOTIONS_PATH)) {
        const fileContent = await fs.promises.readFile(PROMOTIONS_PATH, "utf-8");
        return JSON.parse(fileContent);
      }
    } catch (err) {
      console.warn("Could not read promotions.json from disk, using fallback default:", err);
    }
    return defaultPromotions as Promotion[];
  }

  /**
   * Saves updated packages and promotions to disk after validating with Zod.
   */
  public static async saveAllData(data: {
    packages: unknown[];
    promotions: unknown[];
  }): Promise<{ success: boolean; message: string; error?: string }> {
    const parsed = adminDataPayloadSchema.safeParse(data);

    if (!parsed.success) {
      const errorMsg = parsed.error.errors.map((e) => `${e.path.join(".")}: ${e.message}`).join(", ");
      return { success: false, message: "Validation error", error: errorMsg };
    }

    try {
      await fs.promises.writeFile(
        PACKAGES_PATH,
        JSON.stringify(parsed.data.packages, null, 2),
        "utf-8"
      );
      await fs.promises.writeFile(
        PROMOTIONS_PATH,
        JSON.stringify(parsed.data.promotions, null, 2),
        "utf-8"
      );

      return { success: true, message: "Packages and promotions saved successfully to JSON files" };
    } catch (err: unknown) {
      const error = err instanceof Error ? err.message : String(err);
      return {
        success: false,
        message: "Failed to write data to disk (environment may have read-only filesystem)",
        error,
      };
    }
  }

  /**
   * Resets packages and promotions to default seed data.
   */
  public static async resetToDefaults(): Promise<{ success: boolean; message: string }> {
    return this.saveAllData({
      packages: defaultPackages,
      promotions: defaultPromotions,
    });
  }
}

