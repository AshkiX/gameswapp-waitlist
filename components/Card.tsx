import Image from "next/image";

interface CardProps {
  step: number;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

export default function Card({ step, title, description, imageSrc, imageAlt }: CardProps) {
  return (
    <div className="group">
      <div className="relative p-6 hover-card transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-light)] to-transparent opacity-5 rounded-[var(--radius-lg)]" />
        <div className="flex flex-col md:flex-row gap-6 min-h-[8rem] card-content">
          <div className="w-full md:w-32 h-48 md:h-32 relative shrink-0 image-container bg-white/50 p-4 rounded-[var(--radius-md)]">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-contain"
              priority={true}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              quality={75}
            />
          </div>
          <div className="flex flex-col justify-between py-1 text-center md:text-left">
            <div className="flex flex-col mb-2 md:mb-3">
              <span className="step-label hidden md:inline">Step {step}</span>
              <h2 className="heading-lg">{title}</h2>
            </div>
            <p className="body-text">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 