import { type IconType } from "react-icons"
import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'

export function Button(
  { Icon, text }:
  { Icon: IconType, text: string}
) {
  return (
    <button 
      className="group whitespace-nowrap relative block w-full rounded border-0 bg-white py-2 pl-10 focus:text-indigo-600 pr-3 text-gray-400 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-xs uppercase font-bold sm:leading-6"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <Icon className="h-5 w-5 text-gray-400 group-focus:text-indigo-600" aria-hidden="true" />
      </div>
      {text}
    </button>
  )
}


export function ButtonDialog(
  { Icon, text, state, setState, dialog }:
  { Icon: IconType, text: string, state: boolean, setState: React.Dispatch<React.SetStateAction<boolean>>, dialog: React.ReactNode }
) {

  return (
    <>
      <button 
        onClick={() => setState(!state)}
        className="group whitespace-nowrap relative block w-full rounded border-0 bg-white py-2 pl-10 focus:text-indigo-600 pr-3 text-gray-400 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-xs uppercase font-bold sm:leading-6"
        >
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Icon className="h-5 w-5 text-gray-400 group-focus:text-indigo-600" aria-hidden="true" />
        </div>
        {text}
      </button>
      <Transition.Root show={state} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setState}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-md bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm">
                {dialog}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
    </>
  )
}
