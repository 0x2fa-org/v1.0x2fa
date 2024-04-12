import { cn } from '@/lib/utils'
import { copy } from '@/utils/copy'
import { FC } from 'react'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '../../ui/input-otp'

interface Props {
  value: string
  progress: number
}

const TOTPInputs: FC<Props> = ({ value, progress }) => {
  const renderInputOTPSlot = (index: number) => (
    <InputOTPSlot
      key={index}
      className={cn('w-1/3 transition-all', {
        ['animate-pulse border-red-500']: progress < 14,
      })}
      index={index}
    />
  )

  return (
    <InputOTP
      className="cursor-pointer"
      maxLength={6}
      value={value}
      readOnly
      onClick={() => copy(value)}
      onContextMenu={(event) => {
        event.preventDefault()
      }}
    >
      <InputOTPGroup className="w-1/2">
        {Array.from({ length: 3 }, (_, i) => renderInputOTPSlot(i))}
      </InputOTPGroup>
      <InputOTPSeparator
        className={cn('transition-all', {
          ['animate-pulse text-red-500']: progress < 14,
        })}
      />
      <InputOTPGroup className="w-1/2">
        {Array.from({ length: 3 }, (_, i) => renderInputOTPSlot(i + 3))}
      </InputOTPGroup>
    </InputOTP>
  )
}

export default TOTPInputs
