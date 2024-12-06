import EmailForm from "@/components/EmailFom";
import Image from "next/image";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <>
      <Toaster />

      <section className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2">
        <div className="flex items-center pattern-dots relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-background)] via-transparent to-[var(--color-background)] pointer-events-none" />
          
          <div className="flex flex-col gap-20 p-8 md:p-16 max-w-xl mx-auto relative">
            {/* List Games */}
            <div className="flex items-start gap-8 group hover:translate-x-1 transition-transform duration-300">
              <div className="hover-card w-28 h-28 md:w-32 md:h-32 relative shrink-0 transition-all duration-300 group-hover:scale-105 rounded-2xl p-4">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--color-primary-light)] to-transparent opacity-10" />
                <Image
                  src="/shelf.png"
                  alt="Board game shelf illustration"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="pt-2">
                <span className="step-label">Step 1</span>
                <h2 className="heading-lg mb-3">List Your Extra Games</h2>
                <p className="body-text">
                  Look through your games. Pick out the ones you don't play anymore.
                </p>
              </div>
            </div>

            {/* Browse Games */}
            <div className="flex items-start gap-8 group hover:translate-x-1 transition-transform duration-300">
              <div className="w-28 h-28 md:w-32 md:h-32 relative shrink-0 transition-all duration-300 group-hover:scale-105 rounded-2xl bg-white/50 p-4 shadow-sm">
                <Image
                  src="/map.png"
                  alt="Map with board game locations"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="pt-2">
                <span className="step-label">Step 2</span>
                <h2 className="heading-lg mb-3">Browse Game Offers</h2>
                <p className="body-text">
                  Check out games near you and get matched!
                </p>
              </div>
            </div>

            {/* Swap Games */}
            <div className="flex items-start gap-8 group hover:translate-x-1 transition-transform duration-300">
              <div className="w-28 h-28 md:w-32 md:h-32 relative shrink-0 transition-all duration-300 group-hover:scale-105 rounded-2xl bg-white/50 p-4 shadow-sm">
                <Image
                  src="/exchange.png"
                  alt="People exchanging board games"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="pt-2">
                <span className="step-label">Step 3</span>
                <h2 className="heading-lg mb-3">Swap Games & Play</h2>
                <p className="body-text">
                  Meet with a neighbor and swap your games!
                </p>
              </div>
            </div>
          </div>
        </div>

        <main className="flex flex-col gap-8 justify-center px-6 md:px-16 py-12">
          <h1 className="heading-xl max-w-lg">
            Trade, Play, Repeat
            <br />
            Your <span className="text-[var(--color-primary)] font-bold">Board Game Exchange</span> Launches Soon!
          </h1>
          <p className="body-text">
            Your next favorite game is in someone's closet. Connect and swap with GameSwapp.
          </p>

          <EmailForm />
        </main>
      </section>
    </>
  );
}
