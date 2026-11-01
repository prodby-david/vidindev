#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/4fe6b7bc49be05e6a6bdf4a2cf8e17d8cdad19d599878bf4f8533fdab4f22a98/contract';
import startContract from '../../snapshots/4fe6b7bc49be05e6a6bdf4a2cf8e17d8cdad19d599878bf4f8533fdab4f22a98/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/e5231c30dc61196f05798cbfbe565b47517082b8bfecfe805454b4cc55bdb212/contract';
import endContract from '../../snapshots/e5231c30dc61196f05798cbfbe565b47517082b8bfecfe805454b4cc55bdb212/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  checkExpression,
  col,
  fn,
  primaryKey,
} from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropTable({ schema: 'public', table: 'GearCategory' }),
      this.createTable({
        schema: 'public',
        table: 'Gear',
        columns: [
          col('category', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('items', 'text[]', { notNull: true, codecRef: { codecId: 'pg/text@1', many: true } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'Gear_category_check_83abed14',
            "\"category\" IN ('HARDWARE', 'CODE_TERMINAL', 'DESIGN_PROTOTYPE', 'WORKFLOW')",
          ),
          checkExpression(
            'Gear_items_elem_not_null_ea5c0770',
            'array_position("items", NULL) IS NULL',
          ),
        ],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
