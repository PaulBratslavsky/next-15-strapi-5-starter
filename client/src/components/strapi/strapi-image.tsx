import Image from "next/image";

interface StrapiImageProps {
  src: string;
  alt: string;
  height?: number;
  width?: number;
  className?: string;
  fill?: boolean;
  priority?: boolean;
}

export function StrapiImage({
  src,
  alt,
  className,
  ...rest
}: Readonly<StrapiImageProps>) {
  if (!src) return <p>No image available</p>;
  const imageUrl = getStrapiMedia(src);
  if (!imageUrl) return <p>No image available</p>;

  return (
    <Image
      src={imageUrl ?? ""}
      alt={alt}
      className={className}
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
