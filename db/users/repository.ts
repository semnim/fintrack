import type {SelectUser} from "@/db/users/schema";
import {usersTable} from "@/db/users/schema";
import {db} from "@/db/index";
import {sql} from "drizzle-orm";

const usersRepository = {
  findByMail: async (email: string) => {
    const [user]: SelectUser[] =
      await db
      .select()
      .from(usersTable)
      .where(
        sql`${usersTable.email}
        =
        ${email}`
      );
    return user;
  },
  updateUserResetToken: async (email: string, resetToken: string, expires: Date) => {
    db.update(usersTable)
    .set({resetToken, resetTokenExpires: expires})
    .where(sql`${usersTable.email}
    =
    ${email}`)
  },
  findUserByResetToken: async (resetToken: string) => {
    const [user] = await db.select().from(usersTable).where(sql`${usersTable.resetToken}
    =
    ${resetToken}`);
    return user;
  },
  updateUserPasswordById: async (userId: number, hashedPassword: string) => {
    await db.update(usersTable)
    .set({passwordHash: hashedPassword, resetToken: null, resetTokenExpires: null})
    .where(sql`${usersTable.id}
    =
    ${userId}`);
  }
}
export default usersRepository;
