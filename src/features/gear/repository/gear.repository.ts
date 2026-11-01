import { db } from "@/prisma/db";
import {
  CreateGearCategoryInput,
  UpdateGearCategoryInput,
} from "../validator/gear.schema";

export const GearRepository = {
  async getAllGear() {
    return db.orm.public.Gear.orderBy((gear) => gear.createdAt.asc()).all();
  },

  async getGearById(id: string) {
    return db.orm.public.Gear.first({ id });
  },

  async createGear(data: CreateGearCategoryInput) {
    return db.orm.public.Gear.create(data);
  },

  async updateGear(id: string, data: UpdateGearCategoryInput) {
    return db.orm.public.Gear.where({ id }).update(data);
  },

  async deleteGear(id: string) {
    return db.orm.public.Gear.where({ id }).delete();
  },
};
