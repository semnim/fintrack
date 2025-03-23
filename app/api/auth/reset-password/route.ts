import {NextResponse} from "next/server";
import bcrypt from "bcryptjs";
import {tryCatch} from "@/lib/try-catch";
import usersRepository from "@/db/users/repository";

export async function POST(req: Request) {
  const {token, password} = await req.json();

  // Find user with this token
  const user = await tryCatch(usersRepository.findUserByResetToken(token));

  if (user.error) {
    return NextResponse.json({error: "Could not find user."}, {status: 400});
  }

  if (!user.data.resetTokenExpires || new Date() > new Date(user.data.resetTokenExpires)) {
    return NextResponse.json({error: "Invalid or expired token"}, {status: 400});
  }

  // Hash new password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Update password and clear token
  const updateUserResult = await tryCatch(usersRepository.updateUserPasswordById(user.data.id, hashedPassword));
  if (updateUserResult.error) {
    return NextResponse.json({error: "Could not update user password."}, {status: 400});
  }

  return NextResponse.json({message: "Password reset successful!"});
}
