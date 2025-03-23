import {date, integer, pgTable, text, timestamp, varchar} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({length: 255}).notNull(),
  image: varchar({length: 255}),
  dob: date().notNull(),
  email: varchar({length: 255}).notNull().unique(),
  passwordHash: varchar({length: 255}).notNull(),
  resetToken: text("reset_token"),
  resetTokenExpires: timestamp("reset_token_expires"),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;
