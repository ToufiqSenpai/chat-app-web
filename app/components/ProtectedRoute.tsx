import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { isLogin } from '../../utils/is-login'

async function ProtectedRoute() {
  const cookie = cookies().get('refreshToken')
  const isNotValid = await isLogin(cookie?.value || '')

  if(!isNotValid) {
    redirect('/login')
  }

  return null
}

export default ProtectedRoute