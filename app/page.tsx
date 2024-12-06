import EmailForm from "@/components/EmailFom";
import Image from "next/image";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <>
      <Toaster />

      <section className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2">
        <div className="flex items-center bg-[#FFF5EB]">
          <div className="flex flex-col gap-20 p-8 md:p-16 max-w-xl mx-auto">
            {/* List Games */}
            <div className="flex items-start gap-8 group">
              <div className="w-28 h-28 md:w-32 md:h-32 relative shrink-0 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/shelf.png"
                  alt="Board game shelf illustration"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="pt-2">
                <h2 className="text-2xl font-bold mb-3 text-zinc-900">List Your Extra Games</h2>
                <p className="text-zinc-600 leading-relaxed">
                  Look through your games. Pick out the ones you don't play anymore.
                </p>
              </div>
            </div>

            {/* Browse Games */}
            <div className="flex items-start gap-8 group">
              <div className="w-28 h-28 md:w-32 md:h-32 relative shrink-0 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/map.png"
                  alt="Map with board game locations"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="pt-2">
                <h2 className="text-2xl font-bold mb-3 text-zinc-900">Browse Game Offers</h2>
                <p className="text-zinc-600 leading-relaxed">
                  Check out games near you and get matched!
                </p>
              </div>
            </div>

            {/* Swap Games */}
            <div className="flex items-start gap-8 group">
              <div className="w-28 h-28 md:w-32 md:h-32 relative shrink-0 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/exchange.png"
                  alt="People exchanging board games"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="pt-2">
                <h2 className="text-2xl font-bold mb-3 text-zinc-900">Swap Games & Play</h2>
                <p className="text-zinc-600 leading-relaxed">
                  Meet with a neighbor and swap your games!
                </p>
              </div>
            </div>
          </div>
        </div>

        <main className="flex flex-col gap-8 justify-center px-6 md:px-16 py-12">
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
