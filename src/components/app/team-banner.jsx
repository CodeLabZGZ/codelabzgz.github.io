import { PyramidPattern } from "@/components/landing/patterns"
import { FaDiscord, FaTwitter } from "react-icons/fa6"
import { TbWorld } from "react-icons/tb"

function TeamBanner({ data }) {
  return (
    <div className="relative h-full w-full rounded-md">
      <div className="absolute inset-0 -z-50 flex items-start justify-center">
        <div className="[mask-image:linear-gradient(black_10%,transparent) rounded-2xl] h-full w-full overflow-hidden rounded-lg opacity-30">
          <PyramidPattern />
        </div>
      </div>
      <div className="flex h-36 w-full flex-col gap-2 p-6">
        <h2 className="text-xl font-bold">{data.name}</h2>
        <p>{data.slug}</p>
      </div>
      <div className="absolute bottom-0 right-0 z-10 flex gap-1 p-6">
        {/* TODO: link buttons */}
        <div className="h-8 w-8 rounded-lg bg-green-700 p-2 text-white">
          <TbWorld />
        </div>
        <div className="h-8 w-8 rounded-lg bg-indigo-600 p-2 text-white">
          <FaDiscord />
        </div>
        <div className="h-8 w-8 rounded-lg bg-blue-500 p-2 text-white">
          <FaTwitter />
        </div>
      </div>
    </div>
  )
}

export default TeamBanner
