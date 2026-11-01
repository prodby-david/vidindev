import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { isAdmin } from "@/features/admin";
import { presignUploadSchema } from "@/features/storage/validator/storage.schema";
import { StorageService } from "@/features/storage/service/storage.service";

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = presignUploadSchema.parse(await req.json());
    const result = await StorageService.createPresignedUpload(data);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          message: "Invalid input",
          errors: error.issues[0]?.message ?? "Invalid input",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
