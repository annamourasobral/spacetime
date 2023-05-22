import { api } from '@/lib/api'
import { cookies } from 'next/headers'
import { useRouter } from 'next/router'

export default async function Memory() {
  const router = useRouter()
  const { id } = router.query

  const token = cookies().get('token')?.value
  const response = await api.get(`/memories/${id}`, {
    headers: {
      Authorization: `Baerer ${token}`,
    },
  })

  console.log(response.data)

  return <div>memory</div>
}
