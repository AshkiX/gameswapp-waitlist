import EmailForm from "@/components/EmailFom";
import Image from "next/image";
import { Toaster } from "react-hot-toast";
import Card from "@/components/Card";
import ShareSuccess from "@/components/ShareSuccess";

export default function Home() {
  return (
    <>
      <Toaster />

      <section className="min-h-screen w-full grid grid-cols-1 md:grid-cols-12">
        <div className="md:col-span-5 flex items-center pattern-dots relative overflow-hidden order-2 md:order-1">
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-background)] via-transparent to-[var(--color-background)] pointer-events-none" />
          
          <div className="flex flex-col gap-12 p-8 md:p-12 max-w-xl mx-auto relative">
            <Card
              step={1}
              title="List Games You Don't Play"
              description="Look through your games. Pick out the ones you don't play anymore."
              imageSrc="/shelf.webp"
              imageAlt="Board game shelf illustration"
            />

            <Card
              step={2}
              title="Browse Game Offers"
              description="Check out games near you and get matched!"
              imageSrc="/map.webp"
              imageAlt="Map with board game locations"
            />

            <Card
              step={3}
              title="Swap Games & Play"
              description="Meet with a neighbor and swap your games!"
              imageSrc="/exchange.webp"
              imageAlt="People exchanging board games"
            />
          </div>
        </div>

        <main className="md:col-span-7 flex flex-col gap-8 justify-center px-6 md:px-16 py-12 order-1 md:order-2">
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
                    <span className="relative z-10 text-[var(--color-primary-dark)] font-bold">
                      Board Game
                    </span>
                    <span 
                      className="absolute -bottom-2 left-0 right-0 h-3 bg-[var(--color-primary)] 
                      opacity-40 transform -rotate-2 rounded-full blur-sm"
                    />
                  </span>
                  {' '}Lovers
                </span>
                <span className="block">
                  For{' '}
                  <span className="relative inline-block">
                    <span className="relative z-10 text-[var(--color-primary-dark)] font-bold">
                      Easy Swaps
                    </span>
                    <span 
                      className="absolute -bottom-2 left-0 right-0 h-3 bg-[var(--color-primary)] 
                      opacity-40 transform -rotate-2 rounded-full blur-sm"
                    />
                  </span>
                </span>
              </div>
            </h1>
          </div>

          <EmailForm />
          {/* <ShareSuccess />  */}
        </main>
      </section>
    </>
  );
}
