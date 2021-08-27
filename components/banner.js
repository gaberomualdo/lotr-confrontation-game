/* This example requires Tailwind CSS v2.0+ */
import {
  SpeakerphoneIcon,
  XIcon,
} from '@heroicons/react/outline';

export default function Banner(props) {
  return (
    <div className='fixed inset-x-0 bottom-0 pb-2 sm:pb-5'>
      <div className='px-2 mx-auto max-w-7xl sm:px-6 lg:px-8'>
        <div className='p-2 bg-red-600 rounded-lg shadow-lg sm:p-3'>
          <div className='flex flex-wrap items-center justify-between'>
            <div className='flex items-center flex-1 w-0'>
              <span className='flex p-2 bg-red-800 rounded-lg'>
                <SpeakerphoneIcon className='w-6 h-6 text-white' aria-hidden='true' />
              </span>
              <p className='ml-3 font-medium text-white truncate'>
                <span className=''>{props.text}</span>
              </p>
            </div>
            <div className='flex-shrink-0 order-2 sm:order-3 sm:ml-2'>
              <button
                type='button'
                className='flex p-2 -mr-1 rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-white'
                onClick={() => props.setOpen(false)}
              >
                <span className='sr-only'>Dismiss</span>
                <XIcon className='w-6 h-6 text-white' aria-hidden='true' />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
