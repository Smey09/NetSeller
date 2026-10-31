import { NextRequest, NextResponse } from "next/server";
import { DataService } from "@/lib/data-service";

const DEFAULT_ADMIN_PIN = process.env.ADMIN_PIN || "seller2026";

function isAuthorized(request: NextRequest, bodyPin?: string): boolean {
  const headerPin = request.headers.get("x-admin-pin");
  const authHeader = request.headers.get("authorization");
  const bearerPin = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : null;

  const providedPin = headerPin || bearerPin || bodyPin;
  return providedPin === DEFAULT_ADMIN_PIN;
}

export async function GET() {
  try {
    const packages = await DataService.getPackages();
    const promotions = await DataService.getPromotions();

    return NextResponse.json({
      success: true,
      packages,
      promotions,
      timestamp: Date.now(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to retrieve website data",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Verify PIN authentication
    if (!isAuthorized(request, body.adminPin)) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized: Invalid or missing owner PIN",
        },
        { status: 401 }
      );
    }

    if (body.action === "reset") {
      const resetResult = await DataService.resetToDefaults();
      const packages = await DataService.getPackages();
      const promotions = await DataService.getPromotions();
      return NextResponse.json({
        success: resetResult.success,
        message: resetResult.message,
        packages,
        promotions,
      });
    }

    const { packages, promotions } = body;

    if (!Array.isArray(packages) || !Array.isArray(promotions)) {
      return NextResponse.json(
        {
          success: false,
          message: "Malformed payload: 'packages' and 'promotions' must be arrays",
        },
        { status: 400 }
      );
    }

    const saveResult = await DataService.saveAllData({ packages, promotions });

    if (!saveResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: saveResult.message,
          error: saveResult.error,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Website packages & promotions updated successfully in JSON",
      packages,
      promotions,
      timestamp: Date.now(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to process data update",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

