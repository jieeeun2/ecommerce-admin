import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { SettingsForm } from "./components/settings-form"

interface SettingsPageProps {
  params: {
    storeId: string
  }
}

const SettingsPage: React.FC<SettingsPageProps> = async ({
  params
}) => {
  const { userId } = auth()

  if(!userId) {
    redirect('/sign-up')
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId
    }
  })

  if(!store) {
    redirect('/') 
    /* 이거 안해도 자동으로 /페이지인 dashboard로 가는데 뭐징 
      아 이거 안하니깐 SettingsForm에 initialData로 store보내줄때 에러뜸
    */
  }
  
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={store} />
      </div>
    </div>
  )
}

export default SettingsPage