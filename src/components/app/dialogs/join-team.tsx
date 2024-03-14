import { FormEventHandler } from "react"
import { TbX } from "react-icons/tb";

export function JoinTeam({ closeFx }) {
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
  }

  return (
    <div className="divide-y">
      <div className="relative flex justify-center items-center text-gray-900 py-4 px-4 sm:py-4 sm:px-6">
        <h3 className="text-lg font-semibold">
          Join Team
        </h3>
        <button onClick={() => closeFx()} className="absolute right-0 mr-4 sm:mr-6">
          <TbX className="w-5 h-5"/>
        </button>
      </div>
      <form 
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col gap-y-2.5 pb-4 py-4 sm:pb-6 sm:px-6 sm:pt-4"
      >
        <div>
          <label htmlFor="teamName" className="block text-sm font-medium leading-6 text-gray-900">
            Team Name
          </label>
          <div className="mt-1">
            <input
              id="teamName"
              name="teamName"
              type="text"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Input team name"
            />
          </div>
        </div>
        <div className="mt-4 w-full flex justify-end">
          <button
            type="submit"
            className="w-1/2  rounded-md bg-indigo-600 px-2.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Send Join Request
          </button>
        </div>
      </form>
    </div>
  )
}