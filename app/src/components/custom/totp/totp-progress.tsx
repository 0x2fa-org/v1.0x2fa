import { FC } from 'react'
import { Progress } from '../../ui/progress'

interface Props {
  progress: number
}

const TOTPProgress: FC<Props> = ({ progress }) => {
  return (
    <Progress
      color={progress < 14 ? `bg-red-500 animate-pulse` : `bg-gray-900`}
      className="rounded-t-xl h-3"
      value={progress}
    />
  )
}

export default TOTPProgress
