import { revalidatePath } from "next/cache";
import { NextResponse, NextRequest } from "next/server";
import { ZodError } from "zod";
import { isAdmin } from "@/features/admin";
import { createSkillSchema } from "@/features/skills/validator/skills.schema";
import { SkillsService } from "@/features/skills/service/skills.service";

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = createSkillSchema.parse(await req.json());
    const skill = await SkillsService.createSkill(data);
    revalidatePath("/projects");

    return NextResponse.json(
      {
        message: "Skill created successfully",
        data: skill,
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          message: "Invalid input",
          errors: error.issues[0]?.message ?? "Invalid input",
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const skills = await SkillsService.getAllSkills();

    return NextResponse.json({
      message: "Skills retrieved successfully",
      data: skills,
    });
  } catch {
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
      { message: "Skill ID is required" },
      { status: 400 },
    );
  }

  try {
    const existing = await SkillsService.getSkillById(id);
    if (!existing) {
      return NextResponse.json({ message: "Skill not found" }, { status: 404 });
    }

    await SkillsService.deleteSkill(id);
    revalidatePath("/projects");

    return NextResponse.json({ message: "Skill deleted successfully" });
  } catch {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
