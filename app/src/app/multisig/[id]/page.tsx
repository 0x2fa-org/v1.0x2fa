"use client"

import Header from "@/components/custom/header"
import Wallet from "@/components/custom/multisig/wallet"
import Wrapper from "@/components/custom/wrapper"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import useConnectWallet from "@/hooks/useConnectWallet"
import { useEffect } from "react"
// @ts-ignore
import { ApiSdk } from "@bandada/api-sdk"
import { toast } from "sonner"

const MultisigId = ({ params }: { params: { id: string } }) => {
  const { address } = useConnectWallet()
  const { id } = params

  useEffect(() => {
    ;(async () => {
      if (!address || !id) return
      const apiSdk = new ApiSdk()
      const isMember = await apiSdk.isGroupMember(id, address)

      if (!isMember) return toast.error("You are not a member of this group")
    })()
  }, [id, address])

  return (
    <Wrapper className="flex flex-col items-center w-full">
      <Wrapper className="p-8 max-w-5xl mx-auto justify-between w-full">
        <Header address={address} />
      </Wrapper>
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Multisig Wallet</CardTitle>
          <CardDescription className="text-gray-400">ID: {id}</CardDescription>
        </CardHeader>
        <CardContent>
          {address ? <Wallet address={address} groupId={id} /> : null}
        </CardContent>
      </Card>
    </Wrapper>
  )
}

export default MultisigId
