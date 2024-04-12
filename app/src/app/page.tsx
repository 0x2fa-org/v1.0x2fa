"use client"

import Header from "@/components/custom/header"
import ScanDropdown from "@/components/custom/scan-dropdown"
import Wrapper from "@/components/custom/wrapper"
import useConnectWallet from "@/hooks/useConnectWallet"
import { NextPage } from "next"
import { useState } from "react"

const Root: NextPage = () => {
  const [qrcodeResult, setQrcodeResult] = useState('')

  const { address, connect } = useConnectWallet()

  console.log(qrcodeResult)

  return (
    <Wrapper className="p-8 max-w-md mx-auto">
      <Header address={address} connect={connect} />
      {address && <ScanDropdown setQrcodeResult={setQrcodeResult} />}
    </Wrapper>
  )
}

export default Root
