import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Navbar } from '@/ui/Navbar'
import { useRecoilValue } from 'recoil'
import { useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { ReactComponent as Logo } from '@/assets/logo.svg'
import {
  AppRoot,
  Panel,
  PanelHeader,
  SplitCol,
  SplitLayout,
  useAdaptivity,
  View,
  ViewWidth,
} from '@vkontakte/vkui'
import { loginStateStore } from '@/store/auth.store'
import { LoginState } from '@/types'
import { withApp } from '@/hoc/withApp'
import { NotifyRoot } from '@/components/NotifyRoot'

const App = withApp(({ app }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, authenticated } = useAuth(true)
  const loginState = useRecoilValue(loginStateStore)

  const { viewWidth } = useAdaptivity()

  useEffect(() => {
    console.log('auth', authenticated)
    const globalUnSubscriber = () => {
      app
        .service('rooms')
        .call('leave')
        .then(r => console.log('left room in cause of session end'))
    }
    window.addEventListener('close', globalUnSubscriber)
    return globalUnSubscriber
  }, [authenticated])

  useEffect(() => {
    if (!authenticated) {
      if (location.pathname.split('/')[1] !== 'auth') {
        navigate('/auth')
      }
    } else {
    }
  }, [location.pathname, authenticated])

  useEffect(() => {
    if (loginState === LoginState.NeedRegister) {
      navigate('/auth/register')
    } else if (loginState === LoginState.NeedLogin) {
      navigate('/auth')
    } else if (loginState === LoginState.Authenticated) {
      navigate('/')
    }
  }, [loginState])

  return (
    <AppRoot>
      <SplitLayout header={<PanelHeader separator={false} />}>
        <SplitCol spaced={viewWidth > ViewWidth.MOBILE}>
          <View activePanel='main' className='h-full'>
            <Panel id='main' className='h-full'>
              <PanelHeader>
                <Logo className='h-8 translate-y-0.5 text-violet-500' />
              </PanelHeader>
              <div className='flex h-full w-full flex-grow flex-col items-center overflow-x-hidden overflow-y-hidden pb-[4rem]'>
                <div className='flex h-full w-full max-w-lg grow flex-col space-y-2 p-3'>
                  <Outlet />
                </div>
                <Navbar />
              </div>
            </Panel>
          </View>
        </SplitCol>
      </SplitLayout>
    </AppRoot>
  )
})

export default App
