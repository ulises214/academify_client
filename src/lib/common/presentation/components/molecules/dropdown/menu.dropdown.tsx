import { Menu, Transition } from '@headlessui/react';
import { FC, Fragment, PropsWithChildren } from 'react';

import { clsxm } from '../../../clsxm';

export const MenuDropdownItem: FC<
  PropsWithChildren<{
    active?: boolean;
    onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  }>
> = ({ active, children, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={clsxm(
        'block px-4 py-2 text-sm text-gray-700',
        onClick && 'hover:bg-gray-100',
        active && 'bg-gray-100'
      )}
    >
      {children}
    </div>
  );
};

export const MenuDropdown: FC<{
  items: ((active: boolean) => JSX.Element)[];
  button: JSX.Element;
}> = ({ button, items }) => {
  return (
    <Menu as='div' className='relative ml-4 shrink-0'>
      <div>
        <Menu.Button
          onClick={(e) => {
            e.stopPropagation();
          }}
          className='flex rounded-full bg-gray-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
        >
          <span className='sr-only'>Open user menu</span>
          {button}
        </Menu.Button>
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
          {items.map((item, i) => (
            <Menu.Item key={i}>
              {({ active }) => {
                return item(active);
              }}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
