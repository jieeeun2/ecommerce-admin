import prismadb from "@/lib/prismadb"
import { BillboardForm } from "./components/billboard-form"

const BillboardPage = async ({
  params
}: {
  params: { billboardId: string }
}) => {
  /* params 콘솔로 찍으면 { storeId: '8d86eca6-28f4-481a-9feb-e57247ea7737', billboardId: 'new' }인데
  왜 파라미터로 들어오는 params의 자료형을 { storeId: string, billboardId: string } 이렇게 안한이유는
  여기서 필요한건 billboardId 뿐이기 때문

  console.log(params.storeId, params.billboardId) 
  이렇게 하면 ts에러로 params.storeId가 존재하지않는다고 나오지만 
  콘솔에 찍었을때는 8d86eca6-28f4-481a-9feb-e57247ea7737 new 이렇게 잘 나온다
  */
  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: params.billboardId
    }
  })
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  )
}

export default BillboardPage