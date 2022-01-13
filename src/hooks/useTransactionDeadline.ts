import { useActiveWeb3React } from '.'
import { BigNumber } from 'ethers'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../state'
import { isPlatOnChains } from  '../utils'
import useCurrentBlockTimestamp from './useCurrentBlockTimestamp'

// combines the block timestamp with the user setting to give the deadline that should be used for any submitted transaction
export default function useTransactionDeadline(): BigNumber | undefined {
  const ttl = useSelector<AppState, number>(state => state.user.userDeadline)
  const blockTimestamp = useCurrentBlockTimestamp()
  const { chainId } = useActiveWeb3React()

  return useMemo(() => {
    if (blockTimestamp && ttl) {
      if (isPlatOnChains(chainId)) {
        return blockTimestamp.add(ttl * 1000)
      } else {
        return blockTimestamp.add(ttl)
      }
    }

    return undefined
    // eslint-disable-next-line
  }, [blockTimestamp, ttl])
}
