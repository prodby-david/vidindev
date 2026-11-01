import {
  CreateCertificationInput,
  UpdateCertificationInput,
} from "../validator/certification.schema";
import { CertificationsRepository } from "../repository/certifications.repository";

type CertificationRow = NonNullable<
  Awaited<ReturnType<typeof CertificationsRepository.getCertificationById>>
>;

export type CertificationView = Omit<CertificationRow, "type"> & {
  type: "degree" | "certification";
};

function toView(row: CertificationRow): CertificationView {
  return {
    ...row,
    type: row.type === "DEGREE" ? "degree" : "certification",
  };
}

function parsePeriodScore(period: string): number {
  const isPresent = /present|current|now/i.test(period);
  const years = period.match(/\b(19\d\d|20\d\d)\b/g);

  if (isPresent) {
    const startYear = years && years.length > 0 ? Math.min(...years.map(Number)) : 2026;
    return 99990000 + startYear;
  }

  if (years && years.length > 0) {
    const endYear = Math.max(...years.map(Number));
    const startYear = Math.min(...years.map(Number));
    return endYear * 10000 + startYear;
  }

  return 0;
}

export const CertificationsService = {
  async getAllCertifications() {
    const rows = await CertificationsRepository.getAllCertifications();
    const views = rows.map(toView);

    return views.sort((a, b) => {
      const scoreA = parsePeriodScore(a.period);
      const scoreB = parsePeriodScore(b.period);

      if (scoreA !== scoreB) {
        return scoreB - scoreA;
      }

      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  },

  async getCertificationById(id: string) {
    const row = await CertificationsRepository.getCertificationById(id);
    return row ? toView(row) : null;
  },

  async createCertification(data: CreateCertificationInput) {
    const row = await CertificationsRepository.createCertification(data);
    return toView(row);
  },

  async updateCertification(id: string, data: UpdateCertificationInput) {
    const row = await CertificationsRepository.updateCertification(id, data);
    return row ? toView(row) : null;
  },

  async deleteCertification(id: string) {
    return CertificationsRepository.deleteCertification(id);
  },
};
