/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkAuthentication } from "~/utils/Auth";
import { toast } from "sonner";

const Login: React.FC = () => {
  const router = useRouter();

  const [passwordShown, setPasswordShown] = useState(false);

  function togglePasswordVisibility() {
    setPasswordShown(!passwordShown);
  }

  useEffect(() => {
    if (checkAuthentication()) {
      router.push("/choices");
    }
  }, []);



  // Function to handle signup action
  async function handleSignupClick() {
    router.push("/signup");

    try {
      const response = await fetch("https://pgversion.onrender.com/api/pg-version");

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();

      console.log(data);

    } catch (error) {
      console.error(error);
      toast.error("An error occurred while processing your request.");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);



    const response = await fetch("/api/auth/login/route", {
      method: "POST",
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });

    if (response.ok) {
      response.json().then((data) => {
        console.log(data);
        toast.success("Logged in successfully");

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("email", formData.get("email")?.toString() ?? "");
        localStorage.setItem("name", data.message.name);
        localStorage.setItem("id", data.message.id);
        router.push("/choices");
      });
    } else {
      toast.error("Invalid credentials");
      localStorage.setItem("isLoggedIn", "false");
    }
  }

  return (
    <>
      <div className="mx-auto my-10 flex h-[614px] w-[576px] rounded-[20px] border border-[#C1C1C1]">
        <div className="flex min-h-full flex-1 flex-col px-6 py-2 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Login
            </h2>
            <p className="mt-6 text-center text-2xl font-[500] leading-9 tracking-tight text-gray-900">
              Welcome back to ECOMMERCE
            </p>
            <p className=" text-center text-[16px] font-[400] leading-9 tracking-tight text-gray-900">
              The next gen business marketplace
            </p>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              className="space-y-6"
              action="#"
              method="POST"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-[16px] font-[400] leading-6 text-gray-900"
                >
                  Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="Enter"
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-[16px] text-sm font-[400] leading-6 text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="relative mt-2">
                  <input
                    id="password"
                    name="password"
                    type={passwordShown ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    placeholder="Enter"
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 px-2 py-1.5  text-[16px] font-[400] underline hover:text-gray-600 focus:outline-none"
                    onClick={togglePasswordVisibility}
                  >
                    {passwordShown ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex h-[56px] w-full items-center justify-center rounded-md bg-black px-3 py-1.5 text-[16px] text-sm font-[500] font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  LOGIN
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-[16px] font-[400] text-[#333333]">
              Don't have an account?{" "}
              <span
                onClick={handleSignupClick}
                className="text-[16px] font-[500] leading-6 text-black underline cursor-pointer"
              >
                SIGN UP
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;