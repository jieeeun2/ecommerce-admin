import prismadb from "@/lib/prismadb"

interface DashboardPageProps {
  params: { storeId : string }
}

const DashboardPage: React.FC<DashboardPageProps> = async ({
  params
}) => {
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId
    }
  })

  return (
    <div>
      Active Store: {store?.name}
      {/* store이 null일수도 있으니깐 ?붙여줌 */}
    </div>
  )
}

export default DashboardPage
