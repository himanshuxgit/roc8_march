import { useRouter } from "next/navigation";
import React, { useRef, useState, useEffect } from "react";
import { toast } from "sonner";

const maxPinLength = 8;

type InputRef = Record<number, HTMLInputElement | null>;

interface OtpInputProps {
  name: string;
  email: string;
  pass: string;
}

const OtpInput: React.FC<OtpInputProps> = ({ name, email, pass }) => {
  const hasFetchedData = useRef(false);
  const router = useRouter();

  const submitOtp = async () => {
    // try {
    //   const response = await fetch("/api/auth/signup/otpVerify/route", {
    //     method: "POST",
    //     body: JSON.stringify({
    //       email: email,
    //     }),
    //   });
    //   if (response.ok) {
    //     response.json().then(async (data) => {
    //       console.log(data.res);
    //     });
    //   } else {
    //     console.error("Error fetching data:");
    //   }
    // } catch (error) {
    //   console.error("Error fetching data:", error);
    // }
  };

  const fetchData = async () => {
    try {
      const response = await fetch("/api/auth/signup/otp/route", {
        method: "POST",
        body: JSON.stringify({
          email: email,
        }),
      });

      if (response.ok) {
        response.json().then(async (data) => {
          console.log(data.res);
        });
      } else {
        console.error("Error fetching data:");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (!hasFetchedData.current) {
      fetchData();
      hasFetchedData.current = true;
    }
  }, []);

  const [password, setPassword] = useState<number[]>(
    Array(maxPinLength).fill(-1),
  );
  const inpRefs = useRef<InputRef>({});
  const [activeInput, setActiveInput] = useState<number>(-1);

  useEffect(() => {
    if (activeInput >= 0 && activeInput < maxPinLength) {
      inpRefs.current[activeInput]?.focus();
    }
  }, [activeInput]);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newPass = [...password];
      newPass[index] = -1;
      setPassword(newPass);
      const prevIndex = index - 1;
      if (prevIndex >= 0) {
        setActiveInput(prevIndex);
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const value = parseInt(e.target.value[e.target.value.length - 1] ?? "");
    if (!isNaN(value)) {
      const newPass = [...password];
      newPass[index] = value;
      setPassword(newPass);
      const nextIndex = index + 1;
      if (nextIndex < maxPinLength) {
        setActiveInput(nextIndex);
      } else {
        // Optionally handle completion here (e.g., submit)
      }
    }
  };

  const handleSumit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle submission logic here
    console.log(password.join(""));
    const otp = password.join("");

    try {
      const response = await fetch("/api/auth/signup/otpVerify/route", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          otp: otp,
          name: name,
          password: pass,
        }),
      });

      if (response.ok) {
        response.json().then(async (data) => {
          console.log(data.res);
          toast.success("Otp verified");
          router.push("/");
        });
      } else {
        console.error("Error fetching data:");
        toast.error("Invalid Otp");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="mb-4 text-2xl font-bold">Verify your email</h2>
      <p className="mb-8">
        Enter the 8 digit code you have received on {email}{" "}
      </p>
      <form
        onSubmit={handleSumit}
        className="flex flex-col items-center justify-center"
      >
        <div className="mb-8 flex space-x-2">
          {password.map((digit, index) => (
            <div
              key={index}
              className="h-14 w-10 rounded border-2 border-gray-300 bg-white"
            >
              <input
                ref={(el) => (inpRefs.current[index] = el)}
                onFocus={() => setActiveInput(index)}
                onBlur={() => setActiveInput(-1)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onChange={(e) => handleChange(e, index)}
                className="h-full w-full bg-transparent text-center text-xl outline-none"
                id={`pin_${index}`}
                type="text" // Changed to text to handle individual digit input
                value={digit !== -1 ? digit : ""}
                autoComplete="off"
                maxLength={1}
              />
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="w-full rounded bg-black p-3 text-lg uppercase tracking-wider text-white hover:bg-gray-700"
          // onClick={submitOtp}
        >
          Verify
        </button>
      </form>
    </div>
  );
};

export default OtpInput;
