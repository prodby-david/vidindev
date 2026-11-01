import { db } from "@/prisma/db";
import {
  CertificationType,
  CreateCertificationInput,
  UpdateCertificationInput,
} from "../validator/certification.schema";

function toDatabaseType(type: CertificationType) {
  return type === "degree" ? "DEGREE" : "CERTIFICATION";
}

export const CertificationsRepository = {
  async getAllCertifications() {
    return db.orm.public.Certification.orderBy((certification) =>
      certification.createdAt.desc()
    ).all();
  },

  async getCertificationById(id: string) {
    return db.orm.public.Certification.first({ id });
  },

  async createCertification(data: CreateCertificationInput) {
    const { type, ...rest } = data;

    return db.orm.public.Certification.create({
      ...rest,
      type: toDatabaseType(type),
    });
  },

  async updateCertification(id: string, data: UpdateCertificationInput) {
    const { type, ...rest } = data;

    return db.orm.public.Certification.where({ id }).update(
      type ? { ...rest, type: toDatabaseType(type) } : rest
    );
  },

  async deleteCertification(id: string) {
    return db.orm.public.Certification.where({ id }).delete();
  },
};
