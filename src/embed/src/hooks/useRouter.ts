import { useMatch } from './useMatch'

export const useRouter = () => {
  const match = useMatch<{ guild: string; channel: string }>(
    '/:guild/:channel',
    { relative: false }
  )

  return match
}
