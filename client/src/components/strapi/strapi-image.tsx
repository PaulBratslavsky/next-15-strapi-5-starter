import Image from "next/image";

interface StrapiImageProps {
  src: string;
  alt: string;
  height?: number;
  width?: number;
  className?: string;
  fill?: boolean;
  priority?: boolean;
  onError?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

export function StrapiImage({
  src,
  alt,
  className,
  onError,
  ...rest
}: Readonly<StrapiImageProps>) {
  if (!src) return <p>No image available</p>;
  const imageUrl = getStrapiMedia(src);

  return (
    <Image
      src={imageUrl ?? ""}
      alt={alt}
      className={className}
      onError={(e) => {
        console.error(`Failed to load image: ${src}`);
        onError?.(e);
      }}
      {...rest}
    />
  );
}

export function getStrapiMedia(url: string | null) {
  const strapiUrl =
    process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
  if (!strapiUrl) throw new Error("NEXT_PUBLIC_STRAPI_URL is not set");

  if (url == null) return null;
  if (url.startsWith("data:")) return url;
  if (url.startsWith("http") || url.startsWith("//")) return url;
  return `${strapiUrl}${url}`;
}
