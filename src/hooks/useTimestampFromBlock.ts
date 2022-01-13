import { useActiveWeb3React } from '.'
import { useState, useEffect } from 'react'
import { isPlatOnChains } from '../utils'

export function useTimestampFromBlock(block: number | undefined): number | undefined {
  const { library, chainId } = useActiveWeb3React()
  const [timestamp, setTimestamp] = useState<number>()
  useEffect(() => {
    async function fetchTimestamp() {
      if (block) {
        const blockData = await library?.getBlock(block)
        if (isPlatOnChains(chainId)) {
          blockData && setTimestamp(blockData.timestamp / 1000)
        } else {
          blockData && setTimestamp(blockData.timestamp)
        }
      }
    }
    if (!timestamp) {
      fetchTimestamp()
    }
  }, [block, library, timestamp])
  return timestamp
}
