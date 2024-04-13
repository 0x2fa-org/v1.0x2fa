'use client'

import { extractDomainName, truncateAddress } from '@/utils/format'
import { PencilSquareIcon } from '@heroicons/react/16/solid'
import { TrashIcon } from '@radix-ui/react-icons'
import { FC, useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar'
import TOTPInputs from './totp-inputs'
import TOTPProgress from './totp-progress'
import { getGaslessContract } from '@/utils/provider'
import { toast } from 'sonner'

interface Props {
  title: string
  avatarUrl: string
  description: string
  walletAddress: string
  value: string
}

const TOTPCard: FC<Props> = ({ title, avatarUrl, description, walletAddress , value }) => {
  const [progress, setProgress] = useState(100)

  useEffect(() => {
    setProgress(100) // reset progress when value changes
    const decrementValue = 100 / ((30 * 1000) / 10)
    const interval = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress > decrementValue ? prevProgress - decrementValue : 1
      )
    }, 10)

    return () => {
      clearInterval(interval)
    }
  }, [value]) // add value to the dependency array

  const deleteGroup = async () => {
    const contract = await getGaslessContract()
    await contract.leaveDomainGroup(title, walletAddress).then(() => {
      toast.success('✨ Domain has been deleted successfully! ✨')
    })
  }

  return (
    <div className="rounded-xl border border-gray-200 text-gray-950 shadow dark:border-gray-800 dark:text-gray-50 bg-card dark:bg-card">
      <div className="space-y-1.5 flex flex-col gap-4 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage width={28} height={28} src={avatarUrl} />
              <AvatarFallback>{title}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold leading-none tracking-tight capitalize">
                {extractDomainName(title)}
              </p>
              <p className="text-xs opacity-60 font-normal">
                {truncateAddress(description)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <PencilSquareIcon className="h-6 w-6 text-gray-500 cursor-pointer" />
            <TrashIcon className="h-6 w-6 text-red-500 cursor-pointer" onClick={deleteGroup} />
          </div>
        </div>
        <TOTPInputs value={value} progress={progress} />
      </div>
      <TOTPProgress progress={progress} />
    </div>
  )
}

export default TOTPCard
