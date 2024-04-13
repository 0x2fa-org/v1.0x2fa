import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { FC } from "react"
import QrCode from "react-qr-code"

interface Props {
  code: string
}

const Scan: FC<Props> = ({ code }) => {
  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Scan invite code</CardTitle>
        <CardDescription>
          An account abstracted invite to a multisig with a passcode
          requirement.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <QrCode
          style={{ height: "220px", maxWidth: "100%", width: "100%" }}
          value={code}
        />
      </CardContent>
    </Card>
  )
}

export default Scan
