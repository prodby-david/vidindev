import {
  CreateGearCategoryInput,
  UpdateGearCategoryInput,
  GEAR_CATEGORY_LABELS,
} from "../validator/gear.schema";
import type { GearCategory } from "../gear.types";
import { GearRepository } from "../repository/gear.repository";

export const GearService = {
  async getAllGear() {
    return GearRepository.getAllGear();
  },

  async getDisplayCategories(): Promise<GearCategory[]> {
    const rows = await GearRepository.getAllGear();

    return rows.map((row) => ({
      id: row.id,
      category: GEAR_CATEGORY_LABELS[row.category],
      items: [...row.items],
    }));
  },

  async getGearById(id: string) {
    return GearRepository.getGearById(id);
  },

  async createGear(data: CreateGearCategoryInput) {
    return GearRepository.createGear(data);
  },

  async updateGear(id: string, data: UpdateGearCategoryInput) {
    return GearRepository.updateGear(id, data);
  },

  async deleteGear(id: string) {
    return GearRepository.deleteGear(id);
  },
};
