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

  return (
    <div className="p-4">
      Root Page
    </div>
  )
}

export default SetupPage

