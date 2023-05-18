import { api } from '@/lib/api'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  const registerResponse = await api.post('/register', {
    code,
  })

  const { token } = registerResponse.data

  const redirectURL = new URL('/', request.url)

  const cookiesExpiresInSeconds = 60 * 60 * 24 * 30 // seconds, minutes, hours, days

  return NextResponse.redirect(redirectURL, {
    headers: {
      // path determines where to have access to the token in the application
      'Set-Cookie': `token=${token}; Path=/; max-age=${cookiesExpiresInSeconds}`, // in this case, all over it
    },
  })
}
