import { ViteConfiguration } from "@/configs/vite.configs";

export default function ThreeColumnImageGrid() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      <div>
        <img
          src={`${ViteConfiguration.BASE_PATH_URL}/images/grid-image/image-04.png`}
          alt=" grid"
          className="border border-gray-200 rounded-xl dark:border-gray-800"
        />
      </div>

      <div>
        <img
          src={`${ViteConfiguration.BASE_PATH_URL}/images/grid-image/image-05.png`}
          alt=" grid"
          className="border border-gray-200 rounded-xl dark:border-gray-800"
        />
      </div>

      <div>
        <img
          src={`${ViteConfiguration.BASE_PATH_URL}/images/grid-image/image-06.png`}
          alt=" grid"
          className="border border-gray-200 rounded-xl dark:border-gray-800"
        />
      </div>
    </div>
  );
}
