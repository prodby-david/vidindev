import Image from "next/image";

interface ProjectImageProps {
  src: string;
  alt: string;
  priority?: boolean;
}

export default function ProjectImage({
  src,
  alt,
  priority = false,
}: ProjectImageProps) {
  return (
    <div className="relative w-full aspect-[16/10] bg-sand/30 dark:bg-sand/20 rounded-md overflow-hidden border border-deep-ocean/10 dark:border-horizon/15">
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        quality={85}
        className="object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-105"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
      />
    </div>
  );
}
