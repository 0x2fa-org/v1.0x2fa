import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FC, useEffect, useMemo, useState } from "react"
import Wrapper from "../wrapper"
import { Button } from "@/components/ui/button"
import EVM from "@/utils/chain/EVM"
import useInitNear from "@/hooks/useInitNear"
import { MPC_PUBLIC_KEY, chainsConfig } from "@/constants"
import { truncateAddress } from "@/utils/format"
import { DocumentDuplicateIcon, WalletIcon } from "@heroicons/react/16/solid"
import { copy } from "@/utils/copy"
import { Input } from "@/components/ui/input"
import { getMintData } from "@/utils/mint"

const Wallet: FC = () => {
  const [selectedChain, setSelectedChain] = useState("eth")
  const [selectedAction, setSelectedAction] = useState<string>()

  const [derivedAddress, setDerivedAddress] = useState("")
  const [accountBalance, setAccountBalance] = useState("")
  const [derivedPath, setDerivedPath] = useState("")

  const [isLoading, setIsLoading] = useState(false)

  const [to, setTo] = useState("")
  const [value, setValue] = useState("")
  const [data, setData] = useState("")

  const { account, isLoading: isNearLoading } = useInitNear()

  const ethereum = useMemo(() => new EVM(chainsConfig.ethereum), [])
  const bsc = useMemo(() => new EVM(chainsConfig.bsc), [])

  const canTransact = useMemo(() => {
    if (!account || !derivedAddress || !selectedAction || isLoading)
      return false
    if (selectedAction.startsWith("send_") && (!to || !value)) return false
    return true
  }, [account, derivedAddress, selectedAction, to, value])

  const transact = async () => {
    try {
      setIsLoading(true)

      if (!account) return console.error("Account not found")

      const sendData = {
        to,
        value,
        data,
      }

      const mintData = getMintData(selectedChain, derivedAddress)

      switch (selectedChain) {
        case "bsc":
          await bsc.handleTransaction(
            selectedAction === "mint" ? mintData : sendData,
            account,
            derivedPath,
            MPC_PUBLIC_KEY
          )
          break
        case "eth":
          await ethereum.handleTransaction(
            selectedAction === "mint" ? mintData : sendData,
            account,
            derivedPath,
            MPC_PUBLIC_KEY
          )
          break
        default:
          console.error("Unsupported chain selected")
      }
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const getAddress = async () => {
      if (!account) {
        setDerivedAddress("")
        return
      }

      // const publicKey = await getRootPublicKey(account, Contracts.PRODUCTION);

      // if (!publicKey) {
      //   setDerivedAddress("");
      //   return;
      // }

      let address = ""
      switch (selectedChain) {
        case "eth":
          address = EVM.deriveProductionAddress(
            account.accountId,
            derivedPath,
            MPC_PUBLIC_KEY
          )
          break
        case "bsc":
          address = EVM.deriveProductionAddress(
            account.accountId,
            derivedPath,
            MPC_PUBLIC_KEY
          )
          break
      }

      setDerivedAddress(address)
    }

    getAddress()
  }, [account, selectedChain, derivedPath])

  useEffect(() => {
    ;(async () => {
      let balance = ""
      switch (selectedChain) {
        case "eth":
          balance =
            (await ethereum.getBalance(derivedAddress)).slice(0, 8) + " ETH"
          break
        case "bsc":
          balance = (await bsc.getBalance(derivedAddress)).slice(0, 8) + " BNB"
          break
      }

      setAccountBalance(balance)
    })()
  }, [bsc, selectedChain, derivedAddress, ethereum])

  return (
    <Wrapper className="gap-2">
      <div className="grid grid-cols-5 gap-2">
        <div className="col-span-3">
          <Select onValueChange={(value) => setSelectedAction(value)}>
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
          <Select
            defaultValue={selectedChain}
            onValueChange={(value) => setSelectedChain(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an action..." className="flex" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="eth">tETH</SelectItem>
                <SelectItem value="bsc">tBSC</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Wrapper className="flex-row items-center justify-between bg-accent h-9 rounded-md px-3 py-2">
        <Wrapper className="flex-row items-center gap-1">
          <WalletIcon className="h-6 w-6 text-accent-foreground" />

          <p className="text-sm text-accent-foreground">
            {truncateAddress(derivedAddress)}
            <span className="text-xs text-gray-400"> {accountBalance}</span>
          </p>
        </Wrapper>
        <DocumentDuplicateIcon
          className="h-6 w-6 text-accent-foregroun cursor-pointer"
          onClick={() =>
            copy(
              derivedAddress,
              "The derived address has been copied to your clipboard."
            )
          }
        />
      </Wrapper>
      {selectedAction?.startsWith("send_") && (
        <Wrapper className="p-2 border border-gray-200 rounded-md">
          <Input
            placeholder="to (0x...)"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
          <Input
            placeholder="value (wei)"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Input
            placeholder="data (0x...)"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
        </Wrapper>
      )}
      {selectedAction && (
        <Button className="w-full" onClick={transact} disabled={!canTransact}>
          {isLoading && <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>}

          {selectedAction === "mint" ? "Mint" : "Send"}
        </Button>
      )}
    </Wrapper>
  )
}

export default Wallet
