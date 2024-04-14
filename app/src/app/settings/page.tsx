"use client"

import { Dashboard } from "@/components/prebuilt/dashboard-04"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Switch } from "@/components/ui/switch"
import { env } from "@/env.mjs"
import useConnectWallet from "@/hooks/useConnectWallet"
import useView from "@/hooks/useView"
import { Invite } from "@/types/bandada"
import { getContract } from "@/utils/provider"
import { FC, useEffect, useState } from "react"
import QrCode from "react-qr-code"
// @ts-ignore
import { ApiSdk } from "@bandada/api-sdk"

const Settings: FC = () => {
  const domain = "https://binance.com"

  const { address, connect } = useConnectWallet()
  const { data: userDomains } = useView("getDomains", [address])

  const [checked, setChecked] = useState(false)
  const [otp, setOtp] = useState("")
  const [invite, setInvite] = useState<Invite>()
  const [transactionStatus, setTransactionStatus] = useState<boolean | null>(
    null
  )

  useEffect(() => {
    ;(async () => {
      if (!address || invite) return

      const groupCreateDetails = {
        name: domain,
        description: `An TOTP group for ${domain}`,
        treeDepth: 16,
        fingerprintDuration: 3600,
      }

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
    })()
  }, [address])

  const handleVerify = async () => {
    const contract = await getContract()

    const transaction = await contract.verify(domain, address, BigInt(otp))

    setOtp("")
    setTransactionStatus(transaction)
    setTimeout(() => setTransactionStatus(null), 500)
  }

  return (
    <Dashboard>
      {address ? (
        <div className="grid gap-6">
          <Card x-chunk="dashboard-04-chunk-1">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>Activate 0x2FA</CardTitle>
              <CardDescription>
                <Switch
                  checked={checked}
                  onCheckedChange={(e) => setChecked(e)}
                />
              </CardDescription>
            </CardHeader>
            {checked && (
              <CardContent className="flex items-start justify-center w-full">
                {userDomains && userDomains.includes(domain) ? (
                  <p className="text-gray-600">
                    Your deautheticator is already active, please check your
                    phone.
                  </p>
                ) : !invite ? (
                  <p className="text-gray-600">
                    Creating a unique invite code...
                  </p>
                ) : (
                  <QrCode
                    style={{ height: "220px", maxWidth: "100%", width: "100%" }}
                    value={`${invite.code}-${invite.group.id}-${domain}`}
                  />
                )}
              </CardContent>
            )}
          </Card>
          <Card
            x-chunk="dashboard-04-chunk-2"
            className={`transition all duration-500 ${
              transactionStatus === null
                ? ""
                : transactionStatus
                  ? "bg-green-100"
                  : "bg-red-100"
            }`}
          >
            <CardHeader>
              <CardTitle>Verify Passcode</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-8">
              {/* <Input
              placeholder="Input the wallet address here..."
              onChange={(e) => setAddress(e.target.value)}
            /> */}
              <InputOTP maxLength={6} value={otp} onChange={(e) => setOtp(e)}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />{" "}
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button onClick={handleVerify}>Verify</Button>
            </CardFooter>
          </Card>
        </div>
      ) : (
        <Button onClick={connect}>Connect Wallet</Button>
      )}
    </Dashboard>
  )
}

export default Settings
