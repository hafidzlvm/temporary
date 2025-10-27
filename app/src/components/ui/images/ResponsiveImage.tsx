import { ViteConfiguration } from "@/configs/vite.configs";

export default function ResponsiveImage() {
  return (
    <div className="relative">
      <div className="overflow-hidden">
        <img
          src={`${ViteConfiguration.BASE_PATH_URL}/images/grid-image/image-01.png`}
          alt="Cover"
          className="w-full border border-gray-200 rounded-xl dark:border-gray-800"
        />
      </div>
    </div>
  );
}
