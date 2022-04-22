import { withApp } from '@/hoc/withApp'
import { memo, useMemo, Suspense, lazy } from 'react'
import { Game } from '@apchi/shared'
import { Loader } from '@/ui/Loader'
import { CubeTransparentIcon } from '@heroicons/react/outline'

const BaseNoGameFallback = () => {
  return (
    <div className='flex h-full w-full flex-col items-center justify-center space-y-2'>
      <CubeTransparentIcon className='h-12 w-12 stroke-1 text-zinc-500' />
      <span className='font-fancy text-sm text-zinc-700'>
        Не удалось загрузить игру
      </span>
    </div>
  )
}

export const GameView = memo(
  withApp<{ gameId: Game['id'] }>(({ app, gameId }) => {
    const GameComponent = useMemo(() => {
      return lazy(
        () =>
          new Promise(res => {
            import(`../games/${gameId}/index.ts`)
              .catch(r => ({
                default: BaseNoGameFallback,
              }))
              .then(r => setTimeout(() => res(r), 5000))
          }),
      )
    }, []) // no deps

    console.log('GameView ')

    return (
      <Suspense
        fallback={
          <div className='flex h-full w-full grow flex-col items-center justify-center'>
            <CubeTransparentIcon className='h-12 w-12 animate-spin stroke-1 text-zinc-500' />
          </div>
        }
      >
        <GameComponent />
      </Suspense>
    )
  }),
)
