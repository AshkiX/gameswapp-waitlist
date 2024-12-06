import EmailForm from "@/components/EmailFom";
import Image from "next/image";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <>
      <Toaster />

      <section className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:h-full h-80 bg-[#FCD0A1] relative overflow-hidden">
          <Image
            src="/mobile-app.png"
            alt="Mobile App Screenshots"
            fill
            priority
            className="object-contain mt-8 md:mt-24 px-14 object-bottom"
          />
        </div>

        <main className="flex flex-col gap-8 mt-8 justify-center px-6 pb-10 md:pr-12">
          <h1 className="font-semibold tracking-tight text-zinc-900 text-3xl leading-tight md:text-4xl max-w-lg">
            Trade, Play, Repeat
            <br />
            Your <span className="text-[#FF6B6B] font-bold">Board Game Exchange</span> Launches Soon!
          </h1>
          <p className="text-gray-500">
            Your next favorite game is in someone's closet. Connect and swap with GameSwapp.
          </p>

          <EmailForm />
        </main>
      </section>
    </>
  );
}
