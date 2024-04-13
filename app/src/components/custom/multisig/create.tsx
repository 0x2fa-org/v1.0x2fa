import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { FC, useState } from "react"

interface Props {
  handleSubmit: (data: {
    name: string
    description: string
    treeDepth: number
    fingerprintDuration: number
  }) => void
}

const Create: FC<Props> = ({ handleSubmit }) => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [treeDepth, setTreeDepth] = useState(16)
  const [fingerprintDuration, setFingerprintDuration] = useState(3600)
  const [advancedMode, setAdvancedMode] = useState(false)

  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Create an Multisig</CardTitle>
        <CardDescription>
          An account abstracted invite to a multisig with a passcode
          requirement.
        </CardDescription>
      </CardHeader>
      <CardContent>
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
          <Button
            className="w-full"
            type="submit"
            onClick={() =>
              handleSubmit({
                name,
                description,
                treeDepth,
                fingerprintDuration,
              })
            }
          >
            Create
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  )
}

export default Create
