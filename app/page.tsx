import { Suspense } from 'react'
import Table from '@/components/table'
import TablePlaceholder from '@/components/table-placeholder'
import ProtectedContent from '@/components/protected-content'

export const preferredRegion = 'home'
export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <ProtectedContent>
      <main className="relative flex min-h-screen flex-col items-center justify-center">
        <Suspense fallback={<TablePlaceholder />}>
          <Table />
        </Suspense>
      </main>
    </ProtectedContent>
  )
}
