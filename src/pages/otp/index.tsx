"use client";

import OtpInput from "~/components/OtpInput";
import { useSearchParams } from "next/navigation";
import Navbar from "~/components/Navbar";

export default function Home() {
    const searchParams = useSearchParams();

    const name = searchParams.get("name") || ""; 
    const email = searchParams.get("email") || "";
    const password = searchParams.get("password") || "";
    return (
        <>
            <Navbar />
            <OtpInput name={name} email={email} pass={password} />
        </>
    );
}
