import Image from "next/image";

interface ProjectImageProps {
  src: string;
  alt: string;
}

export default function ProjectImage({ src, alt }: ProjectImageProps) {
  return (
    <div className="w-full aspect-[16/10] bg-foam/30 dark:bg-foam/10 rounded-md overflow-hidden relative border border-deep-ocean/10 dark:border-horizon/15">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}
