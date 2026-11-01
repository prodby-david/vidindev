import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { isAdmin } from "@/features/admin";
import { contactFormSchema } from "@/features/contact/validator/contact.schema";
import { ContactRepository } from "@/features/contact/repository/contact.repository";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const data = contactFormSchema.parse(body);
    const contact = await ContactRepository.createContact(data);

    return NextResponse.json(
      {
        message: "Message sent successfully",
        data: { id: contact.id },
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
  if (!(await isAdmin())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const contacts = await ContactRepository.getAllContacts();

    return NextResponse.json({
      message: "Inquiries retrieved successfully",
      data: contacts,
    });
  } catch {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
