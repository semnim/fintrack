"use client"

import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {toast} from "sonner";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({email}),
      headers: {"Content-Type": "application/json"},
    });

    if (res.ok) {
      toast.success("Reset link sent! Check your email.");
    } else {
      toast.error("Error sending reset link.");
    }
  };

  return (
    <div className='mx-auto max-w-md p-4'>
      <h2 className='mb-2 font-bold text-xl'>Forgot Password</h2>
      <p className='mb-4 text-sm'>Enter your email to receive a password reset link.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="your@email.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type="submit" className="w-full">Send Reset Link</Button>
      </form>
    </div>
  );
}
