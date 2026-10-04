import { ContactInfoItem } from "../contact.types";

export const CONTACT_INFO_ITEMS: ContactInfoItem[] = [
  {
    id: "email",
    label: "Email Address",
    value: "gasparjohndavid@gmail.com",
    href: "mailto:gasparjohndavid@gmail.com",
    icon: "Mail",
  },
  {
    id: "location",
    label: "Location & Timezone",
    value: "Philippines · GMT+8",
    icon: "MapPin",
  },
  {
    id: "availability",
    label: "Current Status",
    value: "Available for new projects & roles",
    icon: "Clock",
  },
];
