import { EmptyMemories } from '@/components/EmptyMemories'
import { api } from '@/lib/api'
import dayjs from 'dayjs'
import { ChevronLeft } from 'lucide-react'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'

interface MemoryProps {
  id: string
  coverUrl: string
  content: string
  isPublic: boolean
  createdAt: string
}

export default async function MemoryDetails({
  params,
}: {
  params: { id: string }
}) {
  const isAuthenticated = cookies().has('token')

  if (!isAuthenticated) {
    return <EmptyMemories />
  }

  const token = cookies().get('token')?.value
  const response = await api.get(`/memories/${params.id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const memory: MemoryProps = response.data

  return (
    <div className="space-y-4 p-8">
      <Link
        href={'/'}
        className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to memories
      </Link>
      <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
        {dayjs(memory.createdAt).format('D[ de ]MMMM[, ]YYYY')}
      </time>
      <Image
        src={memory.coverUrl}
        width={592}
        height={280}
        className="aspect-video w-full rounded-lg object-cover"
        alt="cover"
      />
      <p className="text-lg leading-relaxed text-gray-100">{memory.content}</p>
    </div>
  )
}
