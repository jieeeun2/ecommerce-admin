"use client"

import { Modal } from "@/components/ui/modal"
import { useStoreModal } from "@/hooks/use-store-modal"
import { useEffect } from "react"

const SetupPage = () => {
  //const storeModal = useStoreModal() <-이런식으로 하면 useEffect안에서 쓸수없다는데 왜지
  const isOpen = useStoreModal((state) => state.isOpen)
  const onOpen = useStoreModal((state) => state.onOpen)

  useEffect(() => {
    if(!isOpen) {
      onOpen()
    }
  }, [isOpen, onOpen])

  return null //SetupPage는 Modal구성하기위한 수단으로만 사용할꺼여서 null리턴
}

export default SetupPage

