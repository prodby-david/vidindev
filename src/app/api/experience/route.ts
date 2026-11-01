import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { isAdmin } from "@/features/admin";
import {
  createExperienceSchema,
  updateExperienceSchema,
} from "@/features/experience/validator/experience.schema";
import { ExperienceService } from "@/features/experience/service/experience.service";

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
    const experience = await ExperienceService.getAllExperience();

    return NextResponse.json({
      message: "Experience retrieved successfully",
      data: experience,
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
    const data = createExperienceSchema.parse(await req.json());
    const item = await ExperienceService.createExperience(data);
    revalidatePath("/experience");

    return NextResponse.json(
      { message: "Experience created successfully", data: item },
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
      { message: "Experience ID is required" },
      { status: 400 },
    );
  }

  try {
    const existing = await ExperienceService.getExperienceById(id);
    if (!existing) {
      return NextResponse.json(
        { message: "Experience not found" },
        { status: 404 },
      );
    }

    const data = updateExperienceSchema.parse(await req.json());
    const item = await ExperienceService.updateExperience(id, data);
    revalidatePath("/experience");

    return NextResponse.json({
      message: "Experience updated successfully",
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
      { message: "Experience ID is required" },
      { status: 400 },
    );
  }

  try {
    const existing = await ExperienceService.getExperienceById(id);
    if (!existing) {
      return NextResponse.json(
        { message: "Experience not found" },
        { status: 404 },
      );
    }

    await ExperienceService.deleteExperience(id);
    revalidatePath("/experience");

    return NextResponse.json({ message: "Experience deleted successfully" });
  } catch {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
