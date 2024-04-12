import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { CameraIcon, KeyIcon, PlusIcon } from '@heroicons/react/16/solid'
import { FC, useState } from 'react'
import QrReader from 'react-qr-reader'

interface Props {
  setQrcodeResult: (result: string) => void
}

const ScanDropdown: FC<Props> = ({ setQrcodeResult }) => {
  const [isSheetOpen, setIsSheetOpen] = useState(true)

  return (
    <>
      {isSheetOpen && (
        <Sheet>
          <DropdownMenu>
            <DropdownMenuTrigger className="fixed bottom-12 right-8">
              <PlusIcon className="h-12 w-12 p-2 bg-red-500 text-destructive-foreground rounded-full" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuItem className="flex items-center justify-between">
                <p>Enter a setup key</p>
                <KeyIcon className="h-6 w-6 text-gray-500" />
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <SheetTrigger className="w-full">
                <DropdownMenuItem className="flex items-center justify-between">
                  <p>Scan a QR code</p>
                  <CameraIcon className="h-6 w-6 text-gray-500" />
                </DropdownMenuItem>
              </SheetTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <SheetContent>
            <QrReader
              onScan={(result) => {
                if (result) {
                  setQrcodeResult(result)
                  setIsSheetOpen(false)
                  setTimeout(() => setIsSheetOpen(true), 1) // Reopen the sheet after 1ms
                }
              }}
              facingMode="environment"
              onError={() => {}}
              showViewFinder={true}
              delay={100}
            />
          </SheetContent>
        </Sheet>
      )}
    </>
  )
}

export default ScanDropdown
