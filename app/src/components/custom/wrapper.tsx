import { cn } from "@/lib/utils"
import { FC, ReactNode } from "react"

interface Props {
  className?: string
  children: ReactNode
}
const Wrapper: FC<Props> = ({ className, children }) => {
  return <div className={cn("flex flex-col gap-4", className)}>{children}</div>
}

export default Wrapper
