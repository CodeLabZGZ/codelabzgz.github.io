"use client"

import { Disclosure, Menu, Transition } from '@headlessui/react'
import {
  HiBars3,
  HiXMark,
} from "react-icons/hi2"
import { TbChevronDown, TbDoorExit, TbFlag3 } from "react-icons/tb";
import { navigation, userNavigation } from "@/config/app"

import Button from '@/components/app/button';
import { Fragment } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from "react"

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function NavItem({ href, title, description, Icon }) {
  return (
    <Menu.Item key={title}>
      {({ active }) => (
        <Link
          href={href}
          className={classNames(
            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
            'group flex items-center px-4 py-2 text-sm whitespace-nowrap w-full'
          )}
        >
          <div className="flex items-center gap-x-4">
            <Icon className="w-6 h-6"/>
            <div className="flex flex-col gap-y-1 tracking-wide">
              <span className="capitalize font-semibold">{title}</span>
              <span className="text-xs font-medium">{description}</span>
            </div>
          </div>
        </Link>
      )}
    </Menu.Item>
  )
}

export default function Navbar({ showNavigation }: { showNavigation: boolean }) {
  const pathname = usePathname()
  const [active, setActive] = useState(0)

  return (
    <Disclosure as="header" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto px-2 sm:px-4  lg:px-8">
            <div className="relative flex h-16 justify-between">
              <div className="relative z-10 flex items-center space-x-4 px-2 lg:px-0">
                <div className="flex flex-shrink-0 items-center mr-8">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                  />
                </div>
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      pathname === item.href ? 'text-indigo-700' : 'text-gray-500 hover:border-gray-300 hover:text-gray-700',
                      'inline-flex items-center rounded-md py-2 px-3 text-sm font-medium capitalize'
                    )}
                    aria-current={pathname === item.href ? 'page' : undefined}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="relative z-10 flex items-center lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open menu</span>
                  {open ? (
                    <HiXMark className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <HiBars3 className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="hidden lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center gap-x-2">
                <Button
                  Icon={TbFlag3}
                  text="post a challenge"
                />
                {/* Profile dropdown */}
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="inline-flex items-center w-full justify-center gap-x-2 rounded bg-white px-3 py-2 font-medium tracking-wide text-xs text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-500">
                        <span className="text-xs font-medium leading-none text-white">HT</span>
                      </span>
                      Hec7orci7o
                      <TbChevronDown className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 min-w-fit origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {userNavigation
                        .slice(0,2)
                        .map(({href, name, description, icon}) => (
                          <NavItem
                            key={name}
                            href={href}
                            title={name}
                            description={description}
                            Icon={icon}
                          />
                        ))}
                      </div>
                      <div className="py-1">
                        {userNavigation
                        .slice(2,5)
                        .map(({href, name, description, icon}) => (
                          <NavItem
                            key={name}
                            href={href}
                            title={name}
                            description={description}
                            Icon={icon}
                          />
                        ))}
                      </div>
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'group flex items-center p-4 text-sm whitespace-nowrap w-full'
                              )}
                            >
                              <div className="flex items-center gap-x-4">
                                <TbDoorExit className="w-6 h-6"/>
                                <div className="flex flex-col gap-y-1 tracking-wide">
                                  <span className="capitalize font-semibold">Sign Out</span>
                                </div>
                              </div>
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
            {showNavigation &&
              <nav className="hidden mx-auto max-w-7xl lg:flex lg:space-x-8" aria-label="Global">
                {navigation[navigation.findIndex(item => item.href === pathname)].navigation.map((item, index) => (
                  <button
                    key={item.name}
                    onClick={() => setActive(index)}
                    className={classNames(
                      index === active ? 'border-indigo-500 text-indigo-700' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                      'inline-flex items-center border-b-2 px-1 pt-1 pb-2.5 text-sm font-medium capitalize'
                      )}
                      aria-current={index === active ? 'page' : undefined}
                  >
                    {item.name}
                  </button>
                ))}
              </nav>
            }
          </div>

          <Disclosure.Panel as="nav" className="lg:hidden" aria-label="Global">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    pathname === item.href ? 'bg-gray-100 text-gray-900' : 'text-gray-900 hover:bg-gray-50 hover:text-gray-900',
                    'block rounded-md py-2 px-3 text-base font-medium'
                  )}
                  aria-current={pathname === item.href ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            <div className="border-t border-gray-200 pb-3 pt-4">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{user.name}</div>
                  <div className="text-sm font-medium text-gray-500">{user.email}</div>
                </div>
              </div>
              <div className="mt-3 space-y-1 px-2">
                {userNavigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
