import { FC } from 'react'

export const Section: FC<{
  title?: string
  side?: JSX.Element | string | number
}> = ({ children, ...props }) => {
  return (
    <div
      className='rounded-2xl ring-1 ring-zinc-100 w-full bg-white flex flex-col px-3 py-3 shadow-xl space-y-3'
      {...props}
    >
      {props.title || props.side ? (
        <div className='flex justify-between text-sm text-zinc-500'>
          {props.title ? (
            <span className='text-sm text-zinc-500 px-0.5'>{props.title}</span>
          ) : null}

          {props.side ? props.side : null}
        </div>
      ) : null}
      {children}
    </div>
  )
}
