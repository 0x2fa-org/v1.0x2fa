"use client"

import Header from "@/components/custom/header"
import Wrapper from "@/components/custom/wrapper"
import useConnectWallet from "@/hooks/useConnectWallet"
import { NextPage } from "next"

const Root: NextPage = () => {

  const { address, connect } = useConnectWallet()

  return (
    <Wrapper className="p-8 max-w-md mx-auto">
      <Header address={address} connect={connect} />
    </Wrapper>
  )
}

export default Root
