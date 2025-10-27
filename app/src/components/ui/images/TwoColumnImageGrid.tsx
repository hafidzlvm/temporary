import { ViteConfiguration } from "@/configs/vite.configs";

export default function TwoColumnImageGrid() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <div>
        <img
          src={`${ViteConfiguration.BASE_PATH_URL}/images/grid-image/image-02.png`}
          alt=" grid"
          className="border border-gray-200 rounded-xl dark:border-gray-800"
        />
      </div>

      <div>
        <img
          src={`${ViteConfiguration.BASE_PATH_URL}/images/grid-image/image-03.png`}
          alt=" grid"
          className="border border-gray-200 rounded-xl dark:border-gray-800"
        />
      </div>
    </div>
  );
}
