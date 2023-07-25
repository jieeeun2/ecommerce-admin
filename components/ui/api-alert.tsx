"use client"
/* "use client" 선언해놓은 settings-form에서 ApiAlert를 부르기 때문에 지금은 상관없지만
  "use client"가 선언되어있지않은 서버컴포넌트에서 얠 부를 수도있기때문에
  명식적으로 이렇게 선언해주는게 좋다 */

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge, BadgeProps } from "@/components/ui/badge"
import { CopyIcon, ServerIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "react-hot-toast"

interface ApiAlertProps {
  title: string
  description: string
  variant: "public" | "admin"
}

const textMap: Record<ApiAlertProps["variant"], string> = {
  public: "Public",
  admin: "Admin"
}

const variantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "destructive"
}

export const ApiAlert: React.FC<ApiAlertProps> = ({
  title,
  description,
  variant="public"
}) => {
  const onCopy = () => {
    navigator.clipboard.writeText(description)
    toast.success("API Route copied to the clipboard.")
  }

  return (
    <Alert>
      <ServerIcon className="h-4 w-4" />
      <AlertTitle className="flex items-center gap-x-2">
        {title}
        <Badge variant={variantMap[variant]}>
          {textMap[variant]}
        </Badge>
      </AlertTitle>
      <AlertDescription className="mt-4 flex items-center justify-between">
        <code className="relative rounded bg-muted px-[0.3rem] font-mono font-semibold">
          {description}
        </code>
        <Button variant="outline" size="icon" onClick={onCopy}>
          <CopyIcon className="h-4 w-4"/>
        </Button>
      </AlertDescription>
    </Alert>
  )
}