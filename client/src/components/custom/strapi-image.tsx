import Image from "next/image";
import { getStrapiMedia } from "@/lib/utils";

interface StrapiImageProps {
  src: string;
  alt: string;
  height?: number;
  width?: number;
  className?: string;
  fill?: boolean;
  priority?: boolean;
  rest?: any;
}

export function StrapiImage({
  src,
  alt,
  className,
  ...rest
}: Readonly<StrapiImageProps>) {
  if (!src) return null;
  const imageUrl = getStrapiMedia(src);
  const imageFallback = `https://placehold.co/600x400`;

  return (
    <Image
      src={imageUrl ?? imageFallback}
      alt={alt}
      className={className}
      {...rest}
    />
  );
}