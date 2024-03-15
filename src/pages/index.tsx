import Link from "next/link";
import Navbar from "~/components/Navbar";
import Signup from "~/components/Signup";

import { api } from "~/utils/api";

export default function Home() {
  const hello = api.post.hello.useQuery({ text: "from tRPC" });

  return (
    <>
    <Navbar />
    <Signup />
    </>
  );
}
