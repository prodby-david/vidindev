import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { isAdmin } from "@/features/admin";
import {
  createGearCategorySchema,
  updateGearCategorySchema,
} from "@/features/gear/validator/gear.schema";
import { GearService } from "@/features/gear/service/gear.service";

function validationError(error: ZodError) {
  return NextResponse.json(
    {
      message: "Invalid input",
      errors: error.issues[0]?.message ?? "Invalid input",
    },
    { status: 400 },
  );
}

export async function GET() {
  try {
    const gear = await GearService.getAllGear();

    return NextResponse.json({
      message: "Gear retrieved successfully",
      data: gear,
    });
  } catch {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = createGearCategorySchema.parse(await req.json());
    const item = await GearService.createGear(data);
    revalidatePath("/projects");

    return NextResponse.json(
      { message: "Gear created successfully", data: item },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof ZodError) return validationError(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function PATCH(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json(
      { message: "Gear ID is required" },
      { status: 400 },
    );
  }

  try {
    const existing = await GearService.getGearById(id);
    if (!existing) {
      return NextResponse.json(
        { message: "Gear not found" },
        { status: 404 },
      );
    }

    const data = updateGearCategorySchema.parse(await req.json());
    const item = await GearService.updateGear(id, data);
    revalidatePath("/projects");

    return NextResponse.json({
      message: "Gear updated successfully",
      data: item,
    });
  } catch (error) {
    if (error instanceof ZodError) return validationError(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json(
      { message: "Gear ID is required" },
      { status: 400 },
    );
  }

  try {
    const existing = await GearService.getGearById(id);
    if (!existing) {
      return NextResponse.json(
        { message: "Gear not found" },
        { status: 404 },
      );
    }

    await GearService.deleteGear(id);
    revalidatePath("/projects");

    return NextResponse.json({ message: "Gear deleted successfully" });
  } catch {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
