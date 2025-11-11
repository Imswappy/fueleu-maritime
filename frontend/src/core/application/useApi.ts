import { useMemo } from 'react'
import { ApiClient } from '../../adapters/infrastructure/ApiClient'
export function useApi(){ return useMemo(()=>ApiClient(),[]) }
