"use client"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { PlusIcon } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

interface BillboardClientProps {

}

export const BillboardClient: React.FC<BillboardClientProps> = () => {
  const router = useRouter()
  const params = useParams()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Billboards (0)"
          description="Manage billboards for your store"
        />  
        <Button
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >{/* 클릭하면 app/(dashboard)/[storeId]/(routes)/billboards/[billboardId]/page.tsx로 가게됨 
          근데 왜 여기로 가는지 잘 모르겠음 저 파일에 접근하려면
          `${params.storeId}/billboards/${params.billboardId}` 이렇게 되야하는거 아닌가 
          
          app/(dashboard)/[storeId]/(routes)/billboards/[billboardId]/page.tsx에서 파라미터로 들어오는 params 찍어보니깐
          { storeId: '8d86eca6-28f4-481a-9feb-e57247ea7737', billboardId: 'new' } 이렇게 나옴
          `${params.storeId}/billboards/${params.billboardId}`에서
          ${params.billboardId}가 new라는거임
          모르고 보면 헷갈리군
          */}
          <PlusIcon className="mr-2 h-4 w-4" />  
          Add New
        </Button>  
      </div>
      <Separator />
    </>
  )
}