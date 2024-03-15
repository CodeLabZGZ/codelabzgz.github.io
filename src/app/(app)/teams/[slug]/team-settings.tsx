"use client"

import { Switch } from '@headlessui/react'
import { useState } from 'react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Page() {
  const [enabled, setEnabled] = useState(false)
  
  return (
    <div>
      <form 
        onSubmit={() => {}}
        className="space-y-6 max-w-prose mx-auto"
      >
        <div>
          <label htmlFor="teamName" className="block text-sm font-medium leading-6 text-gray-900">
            Team name
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="teamName"
              id="teamName"
              className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="you@example.com"
            />
          </div>
        </div>
        <div>
          <label htmlFor="teamMotto" className="block text-sm font-medium leading-6 text-gray-900">
            Team motto
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="teamMotto"
              id="teamMotto"
              className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="you@example.com"
            />
          </div>
        </div>
        <div>
          <label htmlFor="comment" className="block text-sm font-medium leading-6 text-gray-900">
            Add your comment
          </label>
          <div className="mt-2">
            <textarea
              rows={4}
              name="comment"
              id="comment"
              className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              defaultValue={''}
            />
          </div>
        </div>
        <div>
          <div className='flex items-center justify-between'>
            <label htmlFor="teamwebsite" className="block text-sm font-medium leading-6 text-gray-900">
            Team Website
            </label>
            <Switch.Group as="div" className="flex items-center">
              <Switch
                checked={enabled}
                onChange={setEnabled}
                className={classNames(
                  enabled ? 'bg-indigo-600' : 'bg-gray-200',
                  'relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
                )}
              >
                <span
                  aria-hidden="true"
                  className={classNames(
                    enabled ? 'translate-x-5' : 'translate-x-0',
                    'pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                  )}
                />
              </Switch>
              <Switch.Label as="span" className="ml-3 text-sm">
                <span className="font-medium text-gray-900">Hidden to public</span>
              </Switch.Label>
            </Switch.Group>
          </div>
          <div className="mt-2">
            <div className="bg-white flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
              <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">http://</span>
              <input
                type="text"
                name="teamwebsite"
                id="teamwebsite"
                className="block flex-1 border-0 bg-transparent py-2 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="www.example.com"
              />
            </div>
          </div>
        </div>
        <div>
          <div className='flex items-center justify-between'>
            <label htmlFor="twitter" className="block text-sm font-medium leading-6 text-gray-900">
            Twitter
            </label>
            <Switch.Group as="div" className="flex items-center">
              <Switch
                checked={enabled}
                onChange={setEnabled}
                className={classNames(
                  enabled ? 'bg-indigo-600' : 'bg-gray-200',
                  'relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
                )}
              >
                <span
                  aria-hidden="true"
                  className={classNames(
                    enabled ? 'translate-x-5' : 'translate-x-0',
                    'pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                  )}
                />
              </Switch>
              <Switch.Label as="span" className="ml-3 text-sm">
                <span className="font-medium text-gray-900">Hidden to public</span>
              </Switch.Label>
            </Switch.Group>
          </div>
          <div className="mt-2">
            <div className="bg-white flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
              <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">http://</span>
              <input
                type="text"
                name="twitter"
                id="twitter"
                className="block flex-1 border-0 bg-transparent py-2 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="www.example.com"
              />
            </div>
          </div>
        </div>
        <div>
          <div className='flex items-center justify-between'>
            <label htmlFor="discord" className="block text-sm font-medium leading-6 text-gray-900">
            Discord
            </label>
            <Switch.Group as="div" className="flex items-center">
              <Switch
                checked={enabled}
                onChange={setEnabled}
                className={classNames(
                  enabled ? 'bg-indigo-600' : 'bg-gray-200',
                  'relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
                )}
              >
                <span
                  aria-hidden="true"
                  className={classNames(
                    enabled ? 'translate-x-5' : 'translate-x-0',
                    'pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                  )}
                />
              </Switch>
              <Switch.Label as="span" className="ml-3 text-sm">
                <span className="font-medium text-gray-900">Hidden to public</span>
              </Switch.Label>
            </Switch.Group>
          </div>
          <div className="mt-2">
            <div className="bg-white flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
              <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">http://</span>
              <input
                type="text"
                name="discord"
                id="discord"
                className="block flex-1 border-0 bg-transparent py-2 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="www.example.com"
              />
            </div>
          </div>
        </div>
        <div>
          <div className='flex items-center justify-between'>
            <label htmlFor="teamEmail" className="block text-sm font-medium leading-6 text-gray-900">
              Team email
            </label>
            <Switch.Group as="div" className="flex items-center">
              <Switch
                checked={enabled}
                onChange={setEnabled}
                className={classNames(
                  enabled ? 'bg-indigo-600' : 'bg-gray-200',
                  'relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
                )}
              >
                <span
                  aria-hidden="true"
                  className={classNames(
                    enabled ? 'translate-x-5' : 'translate-x-0',
                    'pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                  )}
                />
              </Switch>
              <Switch.Label as="span" className="ml-3 text-sm">
                <span className="font-medium text-gray-900">Hidden to public</span>
              </Switch.Label>
            </Switch.Group>
          </div>
          <div className="mt-2">
            <div className="bg-white flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
              <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">http://</span>
              <input
                type="email"
                name="teamEmail"
                id="teamEmail"
                className="block flex-1 border-0 bg-transparent py-2 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="www.example.com"
              />
            </div>
          </div>
        </div>
        <div className='w-full flex justify-end'>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-2.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            save changes
          </button>
        </div>
      </form>
    </div>
  )
}
