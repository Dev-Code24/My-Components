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
import CheckboxInput from "@/components/ui/inputs/checkBoxInput/CheckboxInput";
import Form from "@/components/ui/forms/Form";

const racings_sans = Racing_Sans_One({
  variable: "--font-racings-sans",
  weight: "400",
  subsets: ["latin"],
});

const formSchema = z.object({
  firstName: z.string().min(1),
  middleName: z.string().min(1).optional(),
  lastName: z.string().min(1),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(5, { message: "Password should be of min length 5" }),
});

type UserFormValues = z.infer<typeof formSchema>;

const SignUp = () => {
  const [showPass, setShowPass] = useState(false);
  const handleShowPass = () => {
    setShowPass(!showPass);
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <div className="relative flex justify-between items-center h-screen w-full">
      <div className="absolute top-0 left-0 z-[-1]">
        <BGAnimation />
      </div>
      <div className="w-[50%] h-full flex justify-center items-center flex-col">
        <div>
          <div className={`${racings_sans.className} text-6xl`}>Welcome to,</div>
          <div className={`${racings_sans.className} text-6xl`}>My Components</div>
        </div>
      </div>
      <div className="w-[50%] h-full flex justify-center items-center p-6">
        <div className="container__form w-full h-full bg-white rounded-xl text-slate-800 p-6 flex items-center justify-center">
          <div className="my-auto h-[30rem] w-[26rem]">
            <div className="text-4xl py-4">Create an account</div>
            <div>
              Already have an account ?{" "}
              <Link href="/sign-in" className="underline text-blue-800">
                Sign in
              </Link>
            </div>
            <Form onSubmit={onSubmit} methods={form}>
              <div className="flex flex-wrap my-4 gap-2">
                <TextInput
                  label="First name"
                  style={{
                    fontSize: "1rem",
                    lineHeight: "1.75rem",
                    width: "calc(50% - 0.3rem)",
                  }}
                />
                <TextInput
                  label="Middle name"
                  style={{
                    fontSize: "1rem",
                    lineHeight: "1.75rem",
                    width: "calc(50% - 0.3rem)",
                  }}
                />
                <TextInput
                  label="Last name"
                  style={{
                    fontSize: "1rem",
                    lineHeight: "1.75rem",
                    width: "calc(100% )",
                  }}
                />
              </div>
              <div className="my-4 flex items-center justify-center flex-col gap-2">
                <TextInput
                  label="Email"
                  style={{
                    fontSize: "1rem",
                    lineHeight: "1.75rem",
                    width: "100%",
                  }}
                />
                <div className="flex relative w-full">
                  <TextInput
                    label="Password"
                    type="password"
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
                <div className="flex justify-start items-center gap-3 px-1 w-full">
                  <CheckboxInput label="tnc-check">
                    <div>
                      I agree to the{" "}
                      <Link href="#" className="underline text-blue-800">
                        {" "}
                        Terms & Conditions
                      </Link>
                    </div>
                  </CheckboxInput>
                </div>
                <Button variant="contained">Submit</Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
