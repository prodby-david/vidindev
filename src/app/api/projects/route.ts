import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { isAdmin } from "@/features/admin";
import {
  createProjectSchema,
  updateProjectSchema,
} from "@/features/projects/validator/project.schema";
import { ProjectsService } from "@/features/projects/service/projects.service";

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
    const projects = await ProjectsService.getAllProjects();

    return NextResponse.json({
      message: "Projects retrieved successfully",
      data: projects,
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
    const data = createProjectSchema.parse(await req.json());
    const project = await ProjectsService.createProject(data);
    revalidatePath("/projects");

    return NextResponse.json(
      { message: "Project created successfully", data: project },
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
      { message: "Project ID is required" },
      { status: 400 },
    );
  }

  try {
    const existing = await ProjectsService.getProjectById(id);
    if (!existing) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 },
      );
    }

    const data = updateProjectSchema.parse(await req.json());
    const project = await ProjectsService.updateProject(id, data);
    revalidatePath("/projects");

    return NextResponse.json({
      message: "Project updated successfully",
      data: project,
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
      { message: "Project ID is required" },
      { status: 400 },
    );
  }

  try {
    const existing = await ProjectsService.getProjectById(id);
    if (!existing) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 },
      );
    }

    await ProjectsService.deleteProject(id);
    revalidatePath("/projects");

    return NextResponse.json({ message: "Project deleted successfully" });
  } catch {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
