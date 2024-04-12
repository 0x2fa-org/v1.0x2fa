"use client"

import Header from "@/components/custom/header"
import Wrapper from "@/components/custom/wrapper"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useConnectWallet from "@/hooks/useConnectWallet"
import { FC, useState } from "react"
import { Switch } from "@/components/ui/switch"
import { env } from "@/env.mjs"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

// @ts-ignore
import { ApiSdk } from "@bandada/api-sdk"
import { cn } from "@/lib/utils"

const CreateMultisig: FC = () => {
  const path = ["Create", "Scan", "Manage"]
  const { address, connect } = useConnectWallet()

  // Define state for the form fields
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [treeDepth, setTreeDepth] = useState(16)
  const [fingerprintDuration, setFingerprintDuration] = useState(3600)
  const [advancedMode, setAdvancedMode] = useState(false)

  const [currentPath, setCurrentPath] = useState("Create")

  // Define the form submit handler
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const apiSdk = new ApiSdk()

    const groupCreateDetails = {
      name,
      description,
      treeDepth,
      fingerprintDuration,
    }

    const group = await apiSdk.createGroup(
      groupCreateDetails,
      env.NEXT_PUBLIC_BANDADA_SDK_API_KEY
    )

    console.log(group)

    const invite = await apiSdk.createInvite(
      group.id,
      env.NEXT_PUBLIC_BANDADA_SDK_API_KEY
    )

    console.log(invite)

    // await apiSdk.addMemberByInviteCode(groupId, memberId, inviteCode)
  }

  return (
    <Wrapper className="flex flex-col items-center w-full">
      <Wrapper className="p-8 max-w-5xl mx-auto justify-between w-full">
        <Header address={address} connect={connect} />
      </Wrapper>
      <Breadcrumb>
        <BreadcrumbList>
          {path.map((item, index) => (
            <>
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
            </>
          ))}
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="w-md">
        <CardHeader>
          <CardTitle>Create an Multisig</CardTitle>
          <CardDescription>
            An account abstracted invite to a multisig with a passcode
            requirement.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="My Multisig"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="My first multisig account"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>Advanced Mode</Label>
                <Switch
                  checked={advancedMode}
                  onCheckedChange={() => setAdvancedMode(!advancedMode)}
                />
              </div>
              {advancedMode && (
                <>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="treeDepth">Tree Depth</Label>
                    <Input
                      id="treeDepth"
                      placeholder="Tree Depth"
                      type="number"
                      value={treeDepth}
                      onChange={(e) => setTreeDepth(Number(e.target.value))}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="fingerprintDuration">
                      Fingerprint Duration
                    </Label>
                    <Input
                      id="fingerprintDuration"
                      placeholder="Fingerprint Duration"
                      type="number"
                      value={fingerprintDuration}
                      onChange={(e) =>
                        setFingerprintDuration(Number(e.target.value))
                      }
                    />
                  </div>
                </>
              )}
            </div>
            <CardFooter className="pt-4 pb-0 px-0">
              <Button className="w-full" type="submit">
                Create
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </Wrapper>
  )
}

export default CreateMultisig
