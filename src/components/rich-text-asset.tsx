import Image from "next/image";

interface Asset {
  sys: {
    id: string;
  };
  url: string;
  description: string;
}

interface RichTextAssetProps {
  id: string;
  assets: Asset[] | undefined;
}

export default function RichTextAsset({ id, assets }: RichTextAssetProps) {
  const asset = assets?.find((asset) => asset.sys.id === id);
  console.log(asset);

  if (asset?.url) {
    return (
      <Image
        src={asset.url}
        alt={asset.description}
        width={800}
        height={200}
        className="w-full"
      />
    );
  }

  return null;
}
