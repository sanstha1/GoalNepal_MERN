"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/validation";
import InputField from "@/components/inputfield";
import Image from "next/image";

type RegisterForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = () => {
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex bg-[#1e1e1e]">
      <div className="w-full md:w-1/2 flex items-center justify-center bg-[#fefee3]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-8 w-96 border border-black rounded-xl"
        >
          <h1 className="text-2xl font-bold text-center mb-6 text-black">REGISTER</h1>

          <InputField label="Full Name" type="text" register={register("name")} error={errors.name} />
          <InputField label="Email" type="email" register={register("email")} error={errors.email} />
          <InputField label="Password" type="password" register={register("password")} error={errors.password} />
          <InputField label="Confirm Password" type="password" register={register("confirmPassword")} error={errors.confirmPassword} />

          <button type="submit" className="w-full bg-black text-white py-2 rounded mt-4">
            Sign Up
          </button>

          <p className="text-center mt-4 text-sm text-black">
            Already have an account?{" "}
            <span
              onClick={() => router.push("/login")}
              className="font-bold cursor-pointer"
            >
              Login
            </span>
          </p>
        </form>
      </div>

      <div className="hidden md:flex w-1/2 flex-col items-center justify-center bg-[#4a4a4a] text-white p-8">
        <Image
          src="/images/image.png"
          alt="Football Image"
          width={350}
          height={350}
          className="mb-6 scale-x-[-1]"
        />
        <h2 className="text-3xl font-bold text-center mt-4">
          Building Nepal’s <br /> Football Future
        </h2>
      </div>
    </div>
  );
}
