import { ContactData } from "../../contact.types";
import {
  CONTACT_SUBJECT_LABELS,
  CONTACT_SUBJECT_OPTIONS,
} from "../../validator/contact.schema";

export { CONTACT_SUBJECT_OPTIONS };

export const CONTACT_SUBJECT_CHOICES = CONTACT_SUBJECT_OPTIONS.map((value) => ({
  value,
  label: CONTACT_SUBJECT_LABELS[value],
}));

export const CONTACT_DATA: ContactData = {
  badge: "GET IN TOUCH",
  title: "Let’s work together.",
  description:
    "Have a project in mind or just want to say hello? I’d love to hear from you.",
  cta: {
    label: "Send a Message",
    href: "mailto:johndavidgaspar.dev@gmail.com",
  },
  statusText: "Always open to new opportunities.",
  statusAvailable: true,
};
