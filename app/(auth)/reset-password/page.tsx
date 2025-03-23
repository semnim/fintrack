"use client"

import {useState} from "react";
import {useSearchParams} from "next/navigation";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {toast} from "sonner";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({token, password}),
      headers: {"Content-Type": "application/json"},
    });

    if (res.ok) {
      toast.success("Password reset successful! You can now log in.");
    } else {
      toast.error("Invalid or expired token.");
    }
  };

  return (
    <div className='mx-auto max-w-md p-4'>
      <h2 className='mb-2 font-bold text-xl'>Reset Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="password"
          placeholder="New password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" className="w-full">Reset Password</Button>
      </form>
    </div>
  );
}
