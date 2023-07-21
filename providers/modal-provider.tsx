"use client"

import { StoreModal } from "@/components/modals/store-modal"
import { useEffect, useState } from "react"

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if(!isMounted) {
    return null
  }
  /* TODO: 이렇게하는게 hydration 에러를 미리 방지한다는데 이게 뭔지 알아보기 */

  return (
    <>
      <StoreModal />
    </>
  )
}