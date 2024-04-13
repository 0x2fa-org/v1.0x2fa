import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FC, useState } from "react"
import Wrapper from "../wrapper"

const Wallet: FC = () => {
  const [selectedChain, setSelectedChain] = useState("eth")

  return (
    <Wrapper className="flex-row gap-2 grid grid-cols-5">
      <div className="col-span-3">
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select an action..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Native</SelectLabel>
              <SelectItem value="send_eth">Send ETH</SelectItem>
              <SelectItem value="send_erc20">Send ERC20 Token</SelectItem>
              <SelectLabel>Contract</SelectLabel>
              <SelectItem value="mint">Mint an NFT</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="col-span-2">
        <Select defaultValue={selectedChain} onValueChange={(value) => setSelectedChain(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select an action..." className="flex" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="eth">ETH</SelectItem>
              <SelectItem value="bsc">BSC</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </Wrapper>
  )
}

export default Wallet
