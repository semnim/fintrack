import {type NextRequest, NextResponse} from 'next/server'
import {cookies} from 'next/headers'

export async function GET(req: NextRequest, res: NextResponse) {
  const getCookies = await cookies()
  const nextAuthSession = getCookies.get('next-auth.session-token')?.value || ''

  return NextResponse.json(nextAuthSession)
}
