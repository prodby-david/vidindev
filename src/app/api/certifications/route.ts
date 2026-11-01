import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { isAdmin } from "@/features/admin";
import {
  createCertificationSchema,
  updateCertificationSchema,
} from "@/features/about/validator/certification.schema";
import { CertificationsService } from "@/features/about/service/certifications.service";

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
    const certifications = await CertificationsService.getAllCertifications();

    return NextResponse.json({
      message: "Certifications retrieved successfully",
      data: certifications,
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
    const data = createCertificationSchema.parse(await req.json());
    const certification = await CertificationsService.createCertification(data);
    revalidatePath("/about");

    return NextResponse.json(
      {
        message: "Certification created successfully",
        data: certification,
      },
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
      { message: "Certification ID is required" },
      { status: 400 },
    );
  }

  try {
    const existing = await CertificationsService.getCertificationById(id);
    if (!existing) {
      return NextResponse.json(
        { message: "Certification not found" },
        { status: 404 },
      );
    }

    const data = updateCertificationSchema.parse(await req.json());
    const certification = await CertificationsService.updateCertification(
      id,
      data,
    );
    revalidatePath("/about");

    return NextResponse.json({
      message: "Certification updated successfully",
      data: certification,
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
      { message: "Certification ID is required" },
      { status: 400 },
    );
  }

  try {
    const existing = await CertificationsService.getCertificationById(id);
    if (!existing) {
      return NextResponse.json(
        { message: "Certification not found" },
        { status: 404 },
      );
    }

    await CertificationsService.deleteCertification(id);
    revalidatePath("/about");

    return NextResponse.json({
      message: "Certification deleted successfully",
    });
  } catch {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
