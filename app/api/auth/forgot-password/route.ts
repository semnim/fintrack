import {NextResponse} from "next/server";
import {sendResetEmail} from "@/lib/mail"; // Function to send emails
import crypto from "node:crypto";
import usersRepository from "@/db/users/repository";
import {tryCatch} from "@/lib/try-catch";

const generateResetToken = () => {
  const resetToken = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 3600000); // 1 hour expiration

  return [resetToken, expires] as const;
}

export async function POST(req: Request) {
  const {email} = await req.json();

  // Check if user exists
  const user = await tryCatch(usersRepository.findByMail(email));


  if (user.error) {
    return NextResponse.json({error: "User not found"}, {status: 400});
  }

  // Generate reset token and expiration (1 hour)
  const [resetToken, expires] = generateResetToken();

  // Save the token in the database
  const tokenUpdateResult = await tryCatch(usersRepository.updateUserResetToken(email, resetToken, expires));
  if (tokenUpdateResult.error) {
    return NextResponse.json({error: "Could not update reset token."}, {status: 500});
  }

  // Send reset email
  const emailSendResult = await tryCatch(sendResetEmail(email, resetToken));
  if (emailSendResult.error) {
    return NextResponse.json({error: "Could not send reset email."}, {status: 500});
  }

  return NextResponse.json({message: "Reset email sent!"});
}
