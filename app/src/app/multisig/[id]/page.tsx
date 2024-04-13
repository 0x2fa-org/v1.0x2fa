"use client"

import Header from "@/components/custom/header"
import Wallet from "@/components/custom/multisig/wallet"
import Wrapper from "@/components/custom/wrapper"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import useConnectWallet from "@/hooks/useConnectWallet"

// 96306055979140481719850626644037
const MultisigId = ({ params }: { params: { id: string } }) => {
  const { address, connect } = useConnectWallet()
  const { id } = params


  return (
    <Wrapper className="flex flex-col items-center w-full">
      <Wrapper className="p-8 max-w-5xl mx-auto justify-between w-full">
        <Header address={address} connect={connect} />
      </Wrapper>
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Multisig Wallet</CardTitle>
          <CardDescription className="text-gray-400">ID: {id}</CardDescription>
        </CardHeader>
        <CardContent>{address ? <Wallet /> : <Button className="w-full" onClick={connect}>Connect</Button>}</CardContent>
      </Card>
    </Wrapper>
  )
}

export default MultisigId
