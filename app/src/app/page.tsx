"use client"

import Header from "@/components/custom/header"
import ScanDropdown from "@/components/custom/scan-dropdown"
import TOTPCard from "@/components/custom/totp/totp-card"
import Wrapper from "@/components/custom/wrapper"
import useConnectWallet from "@/hooks/useConnectWallet"
import useGenerateTOTP from "@/hooks/useGenerateTOPT"
import { NextPage } from "next"
import { Key, useEffect, useState } from "react"
// @ts-ignore
import { ApiSdk } from "@bandada/api-sdk"
import { getContract } from "@/utils/provider"
import { SAFE_GLOBAL_DOMAIN } from "@/constants"
import { extractDomain } from "@/utils/format"

const Root: NextPage = () => {
  const [qrcodeResult, setQrcodeResult] = useState("")

  const { address, connect } = useConnectWallet()
  const { data: generatedTOTP } = useGenerateTOTP(address)

  const codes = Array.isArray(generatedTOTP) ? generatedTOTP[0] : []
  const domains = Array.isArray(generatedTOTP) ? generatedTOTP[1] : []

  useEffect(() => {
    ;(async () => {
      if (!qrcodeResult) return
      // const signer = await getSigner()
      // const deterministicMemberId = await signer.signMessage(SIWE_MESSAGE)

      const apiSdk = new ApiSdk()

      const [groupId, inviteCode, domain] = qrcodeResult.split("-")

      // TODO: DETERMINISTIC MEMBERID/GROUP??
      await apiSdk.addMemberByInviteCode(inviteCode, address, groupId)

      const contract = await getContract()

      // TODO: GASLESS
      await contract.joinDomainGroup(domain, address)
    })()
  }, [qrcodeResult])

  return (
    <Wrapper className="p-8 max-w-md mx-auto">
      <Header address={address} connect={connect} />
      <Wrapper>
        {address &&
          codes &&
          domains &&
          codes.map((code: any, index: Key) => {
            const domainName = domains[index as number]
            return domainName ? (
              <TOTPCard
                key={index}
                title={domainName}
                avatarUrl={`https://logo.clearbit.com/${extractDomain(domainName)}`}
                address={
                  domainName.startsWith(SAFE_GLOBAL_DOMAIN)
                    ? domainName.replace(`${SAFE_GLOBAL_DOMAIN}/`, "")
                    : address
                }
                value={code.toString().padStart(6, "0")}
              />
            ) : null
          })}
      </Wrapper>
      {address && <ScanDropdown setQrcodeResult={setQrcodeResult} />}
    </Wrapper>
  )
}

export default Root
