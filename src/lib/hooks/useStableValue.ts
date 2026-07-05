import { useRef } from 'react';
// utils
import { deepEqual } from 'lib/utils/commonUtil';

/**
 * Return a referentially-stable version of `value`.
 *
 * The returned reference only changes when `value` is no longer *structurally*
 * equal (see {@link deepEqual}) to the previous one. This lets consumers pass
 * inline object literals (e.g. `epubOptions={{ allowScriptedContent: true }}`)
 * without forcing effects keyed on that object to re-run on every render — which
 * would otherwise thrash the epubjs book/rendition lifecycle.
 *
 * @param value Any value (typically an options object)
 */
export function useStableValue<T>(value: T): T {
  const ref = useRef(value);

  if (!deepEqual(ref.current, value)) {
    ref.current = value;
  }

  return ref.current;
}

export default useStableValue;
