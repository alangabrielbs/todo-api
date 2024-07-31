import { Knex } from "knex";

declare module "knex/types/tables" {
  export interface Tables {
    task: {
      id: string;
      title: string;
      description: string;
      done: boolean;
      duration: number;
      created_at: Date;
      updated_at: Date;
    };
  }
}
