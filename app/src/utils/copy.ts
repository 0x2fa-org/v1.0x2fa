import { toast } from 'sonner'

export const copy = (value: string, description = 'The OTP code has been copied to your clipboard. It will be cleared in 30 seconds.') => {
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        toast.success('✨ Copy Successful ✨', {
          description,
        })
      })
      .catch((err) => {
        toast.error('❌ Copy Failed ❌', {
          description: `Failed to copy the OTP code. ${err}`,
        })
      })
  }
}
