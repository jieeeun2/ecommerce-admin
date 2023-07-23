import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

import prismadb from "@/lib/prismadb"

export default async function SetupLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { userId } = auth()

  if(!userId) {
    redirect('/sign-in')
  }

  const store = await prismadb.store.findFirst({
    where: {
      userId
    }
  }) //조건을 만족하는 첫번째만 반환

  if(store) {
    redirect(`/${store.id}`)
    //(dashboard)/[storeId]/layout.tsx 여기로감
  }

  return (
    <>
      {children}
    </>
  )
  
}