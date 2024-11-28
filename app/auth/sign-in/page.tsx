"use client";
import Link from "next/link";
import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Racing_Sans_One } from "next/font/google";
import { EyeClosed as EyeClosedIcon, Eye as EyeOpenIcon } from "lucide-react";
import BGAnimation from "@/components/auth/bg-animations";
import TextInput from "@/components/ui/inputs/TextInput";
import Button from "@/components/ui/button/Button";
import Form from "@/components/ui/forms/Form";

const racings_sans = Racing_Sans_One({
  variable: "--font-racings-sans",
  weight: "400",
  subsets: ["latin"],
});

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(5, { message: "Password should be of min length 5" }),
});

type UserFormValues = z.infer<typeof formSchema>;

const SignIn = () => {
  const [showPass, setShowPass] = useState(false);
  const handleShowPass = () => {
    setShowPass(!showPass);
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: UserFormValues) => {
    console.log(data);
  };
  return (
    <div className="relative flex justify-between items-center h-screen w-full">
      <div className="absolute top-0 left-0 z-[-1]">
        <BGAnimation />
      </div>
      <div className="hidden md:w-[50%] w-full h-full lg:flex lg:justify-center lg:items-center lg:flex-col">
        <div>
          <div className={`${racings_sans.className} text-6xl`}>Welcome back</div>
        </div>
      </div>
      <div className="lg:w-[50%] w-full h-full flex justify-center items-center lg:p-6 p-4">
        <div className="container__form w-full h-full bg-white rounded-xl text-slate-800 p-6 flex items-center justify-center">
          <div className="lg:my-auto max:h-[30rem] lg:w-[26rem] max-w-[26rem]">
            <div className="lg:hidden flex items-center">
              <div className={`${racings_sans.className} text-[1.35rem] md:text-5xl`}>Welcome back,</div>
            </div>
            <div className="lg:text-3xl text-xl py-4">Sign in</div>
            <div>
              Don&lsquo;t have an account ?{" "}
              <Link href="/auth/sign-up" className="underline text-blue-800">
                Create account
              </Link>
            </div>
            <Form onSubmit={onSubmit} methods={form}>
              <div className="my-4 flex items-center justify-center flex-col gap-2">
                <TextInput
                  label="Email"
                  name="email"
                  style={{
                    fontSize: "1rem",
                    lineHeight: "1.75rem",
                    width: "100%",
                  }}
                />
                <div className="flex relative w-full">
                  <TextInput
                    label="Password"
                    name="password"
                    type={!showPass ? "password" : "text"}
                    style={{
                      fontSize: "1rem",
                      lineHeight: "1.75rem",
                      width: "100%",
                    }}
                  />
                  <div className="absolute right-3 top-1/4 cursor-pointer" onClick={handleShowPass}>
                    {showPass ? <EyeOpenIcon /> : <EyeClosedIcon />}
                  </div>
                </div>
              </div>
              <div className="my-9 flex items-start justify-center flex-col gap-2">
                <Button variant="contained">Sign in</Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
