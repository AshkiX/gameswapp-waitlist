import EmailForm from "@/components/EmailFom";
import Image from "next/image";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <>
      <Toaster />

      <section className="min-h-screen w-full grid grid-cols-1 md:grid-cols-12">
        <div className="md:col-span-5 flex items-center pattern-dots relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-background)] via-transparent to-[var(--color-background)] pointer-events-none" />
          
          <div className="flex flex-col gap-12 p-8 md:p-12 max-w-xl mx-auto relative">
            {/* List Games */}
            <div className="group">
              <div className="relative p-6 hover-card transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-light)] to-transparent opacity-5 rounded-[var(--radius-lg)]" />
                <div className="flex items-start gap-6 card-content">
                  <div className="w-24 h-24 md:w-28 md:h-28 relative shrink-0 transition-all duration-300 group-hover:scale-105 image-container bg-white/50 p-4">
                    <Image
                      src="/shelf.png"
                      alt="Board game shelf illustration"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                  <div className="transition-all duration-300">
                    <span className="step-label">Step 1</span>
                    <h2 className="heading-lg mb-3">List Your Extra Games</h2>
                    <p className="body-text">
                      Look through your games. Pick out the ones you don't play anymore.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Browse Games */}
            <div className="group">
              <div className="relative p-6 hover-card transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-light)] to-transparent opacity-5 rounded-[var(--radius-lg)]" />
                <div className="flex items-start gap-6 card-content">
                  <div className="w-24 h-24 md:w-28 md:h-28 relative shrink-0 transition-all duration-300 group-hover:scale-105 image-container bg-white/50 p-4">
                    <Image
                      src="/map.png"
                      alt="Map with board game locations"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="transition-all duration-300">
                    <span className="step-label">Step 2</span>
                    <h2 className="heading-lg mb-3">Browse Game Offers</h2>
                    <p className="body-text">
                      Check out games near you and get matched!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Swap Games */}
            <div className="group">
              <div className="relative p-6 hover-card transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-light)] to-transparent opacity-5 rounded-[var(--radius-lg)]" />
                <div className="flex items-start gap-6 card-content">
                  <div className="w-24 h-24 md:w-28 md:h-28 relative shrink-0 transition-all duration-300 group-hover:scale-105 image-container bg-white/50 p-4">
                    <Image
                      src="/exchange.png"
                      alt="People exchanging board games"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="transition-all duration-300">
                    <span className="step-label">Step 3</span>
                    <h2 className="heading-lg mb-3">Swap Games & Play</h2>
                    <p className="body-text">
                      Meet with a neighbor and swap your games!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <main className="md:col-span-7 flex flex-col gap-8 justify-center px-6 md:px-16 py-12">
          <div className="relative">
            <h1 className="heading-xl max-w-2xl">
              <span className="relative inline-block mb-6">
                <span className="relative z-10">Trade, Play, Repeat</span>
                <svg
                  className="absolute -bottom-3 left-0 w-full"
                  height="8"
                  viewBox="0 0 300 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 5.5C2 5.5 75 5.5 150 5.5C225 5.5 298 5.5 298 5.5"
                    stroke="var(--color-primary)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="animate-dash"
                  />
                </svg>
              </span>
              <div className="space-y-2">
                <span className="block">
                  Connecting{' '}
                  <span className="relative inline-block">
                    <span className="relative z-10 text-[var(--color-primary)] font-bold">
                      Board Game
                    </span>
                    <span 
                      className="absolute -bottom-2 left-0 right-0 h-3 bg-[var(--color-primary-light)] 
                      opacity-50 transform -rotate-1 rounded-full blur-sm"
                    />
                  </span>
                  {' '}Lovers
                </span>
                <span className="block">
                  For{' '}
                  <span className="relative inline-block">
                    <span className="relative z-10 text-[var(--color-primary)] font-bold">
                      Easy Swaps
                    </span>
                    <span 
                      className="absolute -bottom-2 left-0 right-0 h-3 bg-[var(--color-primary-light)] 
                      opacity-50 transform -rotate-1 rounded-full blur-sm"
                    />
                  </span>
                </span>
              </div>
            </h1>
          </div>

          <EmailForm />
        </main>
      </section>
    </>
  );
}
