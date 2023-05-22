import { Disclosure, Menu, Transition } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { FC, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { LoginUser } from '../../../user/domain/user';
import { clsxm } from '../clsxm';
import { Routes, useCurrentPath } from '../hooks/use-current-path';

type NavigationItem = {
  name: string;
  href: string;
  matches?: string[];
};

const studentNavigation: NavigationItem[] = [
  {
    name: 'Clases',
    href: '/student',
    matches: [Routes.STUDENT_HOME, Routes.STUDENT_COURSE_DETAILS],
  },
  { name: 'Actividades', href: '/student/activities' },
  { name: 'Calificaciones', href: '/student/grades' },
];
const teacherNavigation: NavigationItem[] = [
  {
    name: 'Clases',
    href: '/teacher',
    matches: [Routes.TEACHER_HOME, Routes.TEACHER_COURSE_DETAILS],
  },
  {
    name: 'Actividades',
    href: '/teacher/activities',
    matches: [Routes.TEACHER_HOMEWORK_DETAILS],
  },
  {
    name: 'Calificaciones',
    href: '/teacher/grades',
    matches: [Routes.TEACHER_HOMEWORK_ASSESSMENTS],
  },
];
const adminNavigation: NavigationItem[] = [
  { name: 'Estadísticas', href: '/admin' },
  { name: 'Usuarios', href: '/admin/users' },
  { name: 'Clases', href: '/admin/classes' },
];
const userNavigation = [
  { name: 'Perfil', href: '/profile' },
  { name: 'Ajustes', href: '/profile/settings' },
  { name: 'Cerrar sesión', href: '/api/auth/logout' },
];

const LogoutButton: FC<{ mobile?: boolean }> = ({ mobile = false }) => {
  return (
    <a
      href='/api/auth/logout'
      className={clsxm(
        'block rounded-md',
        'px-3 py-2',
        mobile
          ? 'text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white'
          : 'text-sm text-gray-700 hover:bg-gray-100'
      )}
    >
      Cerrar sesión
    </a>
  );
};

const UserIcon: FC<{ user: LoginUser; size: 8 | 10 }> = ({ user, size }) => {
  const [first] = user.sn;
  const [last] = user.givenName;

  return (
    <div
      className={clsxm(
        'aspect-square rounded-full flex justify-center items-center text-white bg-purple-700',
        {
          'h-10 w-10': size === 10,
          'h-8 w-8': size === 8,
        }
      )}
    >
      {first}
      {last}
    </div>
  );
};

const UserButton: FC<{ user: LoginUser }> = ({ user }) => {
  return (
    <Menu.Button className='flex rounded-full bg-gray-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
      <span className='sr-only'>Open user menu</span>
      <UserIcon user={user} size={8} />
    </Menu.Button>
  );
};

const SearchBar = () => {
  return (
    <div className='relative z-0 flex flex-1 items-center justify-center px-2 sm:absolute sm:inset-0'>
      <div className='w-full sm:max-w-xs'>
        <label htmlFor='search' className='sr-only'>
          Search
        </label>
        <div className='relative'>
          <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
            <MagnifyingGlassIcon
              className='h-5 w-5 text-gray-400'
              aria-hidden='true'
            />
          </div>
          <input
            id='search'
            name='search'
            className='block w-full rounded-md border-0 bg-gray-700 py-1.5 pl-10 pr-3 text-gray-300 placeholder:text-gray-400 focus:bg-white focus:text-gray-900 focus:ring-0 focus:placeholder:text-gray-500 sm:text-sm sm:leading-6'
            placeholder='Search'
            type='search'
          />
        </div>
      </div>
    </div>
  );
};

const MobileMenu: FC<{ user: LoginUser }> = ({ user }) => {
  return (
    <div className='hidden lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center'>
      <button
        type='button'
        className='shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
      >
        <span className='sr-only'>View notifications</span>
        <BellIcon className='h-6 w-6' aria-hidden='true' />
      </button>
      {/* Profile dropdown */}
      <Menu as='div' className='relative ml-4 shrink-0'>
        <div>
          <UserButton user={user} />
        </div>
        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none'>
            {userNavigation.map((item) => (
              <Menu.Item key={item.name}>
                {({ active }) => {
                  if (item.name === 'Cerrar sesión') {
                    return <LogoutButton key='Cerrar sesión' />;
                  }

                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={clsxm(
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700'
                      )}
                    >
                      {item.name}
                    </Link>
                  );
                }}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export const Header: FC<{ user: LoginUser }> = ({ user }) => {
  const path = useCurrentPath();

  let navigation: NavigationItem[] = [];
  if (user.role === 'STUDENT') {
    navigation = studentNavigation;
  }
  if (user.role === 'TEACHER') {
    navigation = teacherNavigation;
  }
  if (user.role === 'ADMIN') {
    navigation = adminNavigation;
  }

  return (
    <Disclosure as='header' className='bg-gray-800'>
      {({ open }) => (
        <>
          <div className='mx-auto max-w-7xl px-2 sm:px-4 lg:divide-y lg:divide-gray-700 lg:px-8'>
            <div className='relative flex h-16 justify-between'>
              <div className='relative z-10 flex px-2 lg:px-0'>
                <div className='flex shrink-0 items-center'>
                  <img
                    className='block h-8 w-auto'
                    src='https://tailwindui.com/img/logos/mark.svg?color=purple&shade=700'
                    alt='Your Company'
                  />
                </div>
              </div>
              <SearchBar />
              <div className='relative z-10 flex items-center lg:hidden'>
                {/* Mobile menu button */}
                <Disclosure.Button className='inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                  <span className='sr-only'>Open menu</span>
                  {open ? (
                    <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <Bars3Icon className='block h-6 w-6' aria-hidden='true' />
                  )}
                </Disclosure.Button>
              </div>
              <MobileMenu user={user} />
            </div>
            <nav
              className='hidden lg:flex lg:space-x-8 lg:py-2'
              aria-label='Global'
            >
              {navigation.map((item) => {
                const current =
                  path === item.href || (path && item.matches?.includes(path));

                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={clsxm(
                      current
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'inline-flex items-center rounded-md py-2 px-3 text-sm font-medium'
                    )}
                    aria-current={current ? 'page' : undefined}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          <Disclosure.Panel as='nav' className='lg:hidden' aria-label='Global'>
            <div className='space-y-1 px-2 pb-3 pt-2'>
              {navigation.map((item) => {
                const current =
                  path === item.href || (path && item.matches?.includes(path));

                return (
                  <Disclosure.Button
                    key={item.name}
                    as={Link}
                    to={item.href}
                    className={clsxm(
                      current
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block rounded-md py-2 px-3 text-base font-medium'
                    )}
                    aria-current={current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                );
              })}
            </div>
            <div className='border-t border-gray-700 pb-3 pt-4'>
              <div className='flex items-center px-4'>
                <div className='shrink-0'>
                  <UserIcon user={user} size={10} />
                </div>
                <div className='ml-3'>
                  <div className='text-base font-medium text-white'>
                    {user.uNombre}
                  </div>
                  <div className='text-sm font-medium text-gray-400'>
                    {user.uCorreo}
                  </div>
                </div>
                <button
                  type='button'
                  className='ml-auto shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
                >
                  <span className='sr-only'>View notifications</span>
                  <BellIcon className='h-6 w-6' aria-hidden='true' />
                </button>
              </div>
              <div className='mt-3 space-y-1 px-2'>
                {userNavigation.map((item) => {
                  if (item.name === 'Cerrar sesión') {
                    return <LogoutButton key='Cerrar sesión' mobile />;
                  }

                  return (
                    <Disclosure.Button
                      key={item.name}
                      as={Link}
                      to={item.href}
                      className='block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white'
                    >
                      {item.name}
                    </Disclosure.Button>
                  );
                })}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
