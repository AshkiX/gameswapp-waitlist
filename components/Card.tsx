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
        <div className="flex gap-6 min-h-[8rem] card-content">
          <div className="w-32 h-32 relative shrink-0 image-container bg-white/50 p-4 rounded-[var(--radius-md)]">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-contain"
              priority={step === 1}
            />
          </div>
          <div className="flex flex-col justify-between py-1">
            <div>
              <span className="step-label">Step {step}</span>
              <h2 className="heading-lg mb-3">{title}</h2>
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