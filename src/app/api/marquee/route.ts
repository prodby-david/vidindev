import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { isAdmin } from "@/features/admin";
import {
  createMarqueeSchema,
  updateMarqueeSchema,
} from "@/features/about/validator/marquee.schema";
import { MarqueeRepository } from "@/features/about/repository/marquee.repository";

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
    const snapshots = await MarqueeRepository.getAllSnapshots();

    return NextResponse.json({
      message: "Snapshots retrieved successfully",
      data: snapshots,
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
    const data = createMarqueeSchema.parse(await req.json());
    const snapshot = await MarqueeRepository.createSnapshot(data);
    revalidatePath("/about");

    return NextResponse.json(
      { message: "Snapshot created successfully", data: snapshot },
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
      { message: "Snapshot ID is required" },
      { status: 400 },
    );
  }

  try {
    const existing = await MarqueeRepository.getSnapshotById(id);
    if (!existing) {
      return NextResponse.json(
        { message: "Snapshot not found" },
        { status: 404 },
      );
    }

    const data = updateMarqueeSchema.parse(await req.json());
    const snapshot = await MarqueeRepository.updateSnapshot(id, data);
    revalidatePath("/about");

    return NextResponse.json({
      message: "Snapshot updated successfully",
      data: snapshot,
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
      { message: "Snapshot ID is required" },
      { status: 400 },
    );
  }

  try {
    const existing = await MarqueeRepository.getSnapshotById(id);
    if (!existing) {
      return NextResponse.json(
        { message: "Snapshot not found" },
        { status: 404 },
      );
    }

    await MarqueeRepository.deleteSnapshot(id);
    revalidatePath("/about");

    return NextResponse.json({ message: "Snapshot deleted successfully" });
  } catch {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
