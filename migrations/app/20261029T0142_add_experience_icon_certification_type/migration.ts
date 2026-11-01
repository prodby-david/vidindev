#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/771e83abbe7f3460ca561fd457ae891154eeb037deec3b46df9e9badf13aa807/contract';
import endContract from '../../snapshots/771e83abbe7f3460ca561fd457ae891154eeb037deec3b46df9e9badf13aa807/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/e5231c30dc61196f05798cbfbe565b47517082b8bfecfe805454b4cc55bdb212/contract';
import startContract from '../../snapshots/e5231c30dc61196f05798cbfbe565b47517082b8bfecfe805454b4cc55bdb212/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, lit } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addColumn({
        schema: 'public',
        table: 'Certification',
        column: col('type', 'text', {
          notNull: true,
          default: lit('CERTIFICATION'),
          codecRef: { codecId: 'pg/text@1' },
        }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'Experience',
        column: col('icon', 'text', {
          notNull: true,
          default: lit('Code2'),
          codecRef: { codecId: 'pg/text@1' },
        }),
      }),
      this.addCheckConstraint({
        schema: 'public',
        table: 'Certification',
        constraint: 'Certification_type_check_7d910799',
        expression: "\"type\" IN ('DEGREE', 'CERTIFICATION')",
      }),
      this.addCheckConstraint({
        schema: 'public',
        table: 'Experience',
        constraint: 'Experience_icon_check_7faddac1',
        expression: "\"icon\" IN ('Code2', 'Terminal', 'GraduationCap')",
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
