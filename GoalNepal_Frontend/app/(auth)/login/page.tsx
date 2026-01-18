"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validation";
import InputField from "@/components/inputfield";
import Image from "next/image";
import { handleLogin } from "@/lib/actions/auth-action";
import { useState } from "react";

type LoginForm = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      setLoading(true);
      const result = await handleLogin({
        email: data.email,
        password: data.password,
      });
      
      if (result.success) {
        alert("Login successful!");
        router.push("/home");
      } else {
        alert(result.message);
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Login failed";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#1e1e1e]">
      <div className="hidden md:flex w-1/2 flex-col items-center justify-center bg-[#4a4a4a] text-white p-8">
        <Image
          src="/images/image.png"
          alt="Football Image"
          width={350}
          height={350}
          className="mb-6"
        />
        <h2 className="text-3xl font-bold text-center">
          Nepal&apos;s Home for <br /> Football & Futsal Events
        </h2>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center bg-[#fefee3]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-[#fefee3] p-8 w-96 rounded-xl border border-black"
        >
          <h1 className="text-2xl font-bold text-center mb-6 text-black">
            LOG IN
          </h1>

          <InputField
            label="Email"
            type="email"
            register={register("email")}
            error={errors.email}
          />

          <InputField
            label="Password"
            type="password"
            register={register("password")}
            error={errors.password}
          />

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded mt-4 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center mt-4 text-sm text-black">
            Don&apos;t have an account?{" "}
            <span
              onClick={() => router.push("/register")}
              className="font-bold cursor-pointer"
            >
              Sign Up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}