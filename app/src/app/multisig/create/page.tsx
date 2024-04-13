"use client"

import Header from "@/components/custom/header"
import Wrapper from "@/components/custom/wrapper"
import useConnectWallet from "@/hooks/useConnectWallet"
import { FC, useEffect, useState } from "react"
import { env } from "@/env.mjs"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { cn } from "@/lib/utils"
import Create from "@/components/custom/multisig/create"

// @ts-ignore
import { ApiSdk } from "@bandada/api-sdk"
import React from "react"
import Scan from "@/components/custom/multisig/scan"
import { Invite } from "@/types/bandada"
import { useRouter } from "next/navigation"
import Manage from "@/components/custom/multisig/manage"
import { SAFE_GLOBAL_DOMAIN } from "@/constants"

const CreateMultisig: FC = () => {
  const path = ["Create", "Scan", "Manage"]
  const [currentPath, setCurrentPath] = useState("Create")
  const [invite, setInvite] = useState<Invite>()

  const { address } = useConnectWallet()
  const router = useRouter()

  const handleCreate = async (groupCreateDetails: {
    name: string
    description: string
    treeDepth: number
    fingerprintDuration: number
  }) => {
    const apiSdk = new ApiSdk()

    const group = await apiSdk.createGroup(
      groupCreateDetails,
      env.NEXT_PUBLIC_BANDADA_SDK_API_KEY
    )

    const inv = await apiSdk.createInvite(
      group.id,
      env.NEXT_PUBLIC_BANDADA_SDK_API_KEY
    )

    setInvite(inv)
    setCurrentPath("Scan")
  }

  useEffect(() => {
    if (!invite) return

    const apiSdk = new ApiSdk()
    const interval = setInterval(async () => {
      const inv = await apiSdk.getInvite(
        invite.code as string,
        env.NEXT_PUBLIC_BANDADA_SDK_API_KEY
      )

      if (inv.isRedeemed) {
        setCurrentPath("Manage")
        // wait 5 seconds before redirecting
        await new Promise((resolve) => setTimeout(resolve, 5000))
        clearInterval(interval)
        router.push(`/multisig/${invite.group.id}`)
      }
    }, 5000)
  }, [invite])

  return (
    <Wrapper className="flex flex-col items-center w-full">
      <Wrapper className="p-8 max-w-5xl mx-auto justify-between w-full">
        <Header address={address} />
      </Wrapper>
      <Breadcrumb>
        <BreadcrumbList>
          {path.map((item, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                <BreadcrumbLink
                  className={cn("text-gray-400", {
                    ["text-black"]: currentPath === item,
                  })}
                >
                  {item}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {index !== path.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      {currentPath === "Create" ? (
        <Create handleSubmit={handleCreate} />
      ) : currentPath === "Scan" ? (
        <Scan
          code={
            invite
              ? `${invite.code}-${invite.group.id}-${SAFE_GLOBAL_DOMAIN}/${invite.group.id}`
              : ""
          }
        />
      ) : (
        <Manage />
      )}
    </Wrapper>
  )
}

export default CreateMultisig
