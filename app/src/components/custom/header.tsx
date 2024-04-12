import { truncateAddress } from "@/utils/format"
import { FC } from "react"
import { Button } from "../ui/button"

interface Props {
  address: string | undefined
  connect: () => void
}

const Header: FC<Props> = ({ address, connect }) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-xl font-bold text-foreground dark:text-white">
        De
        <span className="font-normal">thenticator</span>
      </h1>
      <Button onClick={connect}>
        {address ? truncateAddress(address) : "Connect"}
      </Button>
    </div>
  )
}

export default Header
