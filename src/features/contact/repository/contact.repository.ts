import { db } from "@/prisma/db";
import { ContactFormInput } from "../validator/contact.schema";

export const ContactRepository = {
  async createContact(data: ContactFormInput) {
    return db.orm.public.Contact.create({
      ...data,
      phone: data.phone || null,
    });
  },

  async getAllContacts() {
    return db.orm.public.Contact.orderBy((contact) =>
      contact.createdAt.desc()
    ).all();
  },
};
