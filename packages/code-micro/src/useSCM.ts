import { SCM, IStateCollectionModule } from './scm'
import { useState, useCallback, useEffect } from 'react'
import { PlainObject } from '@code/kit'

const mapCache = new Map<Function, PlainObject>()

// 用React hooks 调用 State Collection Manager
export function useSCM<T = any, K = any> (
  moduleName: string,
  mapper?: (state: T) => K
) {

  if (mapper && !mapCache.has(mapper)) {
    mapCache.set(mapper, mapper(SCM.get(moduleName).module.state as any))
  }

  const [mappedState, trigger] = useState<K>((mapper ? mapCache.get(mapper) : undefined) as any)
  const dispatch = useCallback(<T>(actionType: string, payload: T) => {
    SCM.dispatch(moduleName, actionType, payload)
  }, []) 
 
  useEffect(() => {
    function tracker (state: T, _mod: IStateCollectionModule) {

      const cache = mapCache.get(mapper)
      const mapped = mapper(state)

      for (let key in cache) {

        if (Object.is(cache[key], mapped[key])) continue
        
        trigger(mapped)
        mapCache.set(mapper, mapped)

        break
      }
    }
    SCM.track(tracker, moduleName)

    return () => {
      SCM.untrack(tracker, moduleName)
    }
  }, [])

  return { state: mappedState, dispatch }

}
