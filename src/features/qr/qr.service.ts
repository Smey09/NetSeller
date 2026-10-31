import QRCode from "qrcode";
import { siteConfig } from "@/config/site";

export interface QRCodeOptions {
  url?: string;
  margin?: number;
  darkColor?: string;
  lightColor?: string;
}

export class QRCodeService {
  /**
   * Generates a high-resolution print-ready PNG Data URL (1024px, 300+ DPI equivalent).
   */
  public static async generatePngDataUrl(options?: QRCodeOptions): Promise<string> {
    const targetUrl = options?.url || siteConfig.url;
    return QRCode.toDataURL(targetUrl, {
      width: 1024,
      margin: options?.margin ?? 4, // 4 modules quiet zone conforms to ISO/IEC 18004
      color: {
        dark: options?.darkColor || "#0F172A", // High contrast dark slate
        light: options?.lightColor || "#FFFFFF",
      },
      errorCorrectionLevel: "H", // High error correction (30% recovery) perfect for printed business cards
    });
  }

  /**
   * Generates clean scalable vector SVG string for professional print shops.
   */
  public static async generateSvgString(options?: QRCodeOptions): Promise<string> {
    const targetUrl = options?.url || siteConfig.url;
    return QRCode.toString(targetUrl, {
      type: "svg",
      margin: options?.margin ?? 4,
      color: {
        dark: options?.darkColor || "#0F172A",
        light: options?.lightColor || "#FFFFFF",
      },
      errorCorrectionLevel: "H",
    });
  }

  /**
   * Triggers browser download for print-ready PNG.
   */
  public static async downloadPng(filename = "NetSeller_BusinessCard_QR.png", options?: QRCodeOptions): Promise<void> {
    const dataUrl = await this.generatePngDataUrl(options);
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  /**
   * Triggers browser download for vector SVG.
   */
  public static async downloadSvg(filename = "NetSeller_BusinessCard_QR.svg", options?: QRCodeOptions): Promise<void> {
    const svgString = await this.generateSvgString(options);
    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

