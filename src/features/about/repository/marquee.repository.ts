import { db } from "@/prisma/db";
import {
  CreateMarqueeInput,
  UpdateMarqueeInput,
} from "../validator/marquee.schema";

export const MarqueeRepository = {
  async getAllSnapshots() {
    return db.orm.public.PolaroidSnapshot.orderBy((snapshot) =>
      snapshot.createdAt.asc()
    ).all();
  },

  async getSnapshotById(id: string) {
    return db.orm.public.PolaroidSnapshot.first({ id });
  },

  async createSnapshot(data: CreateMarqueeInput) {
    return db.orm.public.PolaroidSnapshot.create(data);
  },

  async updateSnapshot(id: string, data: UpdateMarqueeInput) {
    return db.orm.public.PolaroidSnapshot.where({ id }).update(data);
  },

  async deleteSnapshot(id: string) {
    return db.orm.public.PolaroidSnapshot.where({ id }).delete();
  },
};
