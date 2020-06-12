
import { identity, isString, curry } from '../operator'
import { ID, PID, CHILDREN, PARENT } from '../const'
import { arrayRemove } from '../array'

export type ToTreeOption<T = any> = {
  idField?: string, 
  pidField?: string, 
  childrenField?: string, 
  /*
   * cant use JSON stringify when we set the parent field.
   * skip it with "null"
   */
  parentField?: string | null, 
  childValid?: (parent: T, childLike: T) => boolean 
}

export function toTree<T = any, K = T> (
  option: ToTreeOption<T>, 
  arr: Array<T> 
) {
  
  const defaultOpt = { 
    idField: ID, 
    pidField: PID, 
    childrenField: CHILDREN, 
    parentField: PARENT,
    childValid: (parent: T, childLike: T) => parent[opt.idField] === childLike[opt.pidField]
  }
  const opt = Object.assign(defaultOpt, option)
  const result:K[] = []

  arr.forEach(function format (node) {
    const parent = arr.find(item => opt.childValid(item, node))

    if (parent) {
      if (isString(opt.parentField)) node[opt.parentField] = parent
      if (!Array.isArray(parent[opt.childrenField])) {
        parent[opt.childrenField] = []
      }
      parent[opt.childrenField].push(node)
    }
    else {
      result.push(node as any)
    }
  })
  
  return result

}

export function flattenTree<T = any> (
  option: { childrenField?: string, childValid?: (n: T) => boolean }, 
  node: T | T[]
) {

  const nodes = Array.isArray(node) ? node : [node]
  let result: T[] = []
  const defaultOpt = { childrenField: CHILDREN, childValid: (n:T) => n[opt.childrenField] && n[opt.childrenField].length > 0 }
  const opt = Object.assign(defaultOpt, option)

  function flat (n: T) {

    result.push(n)

    if (opt.childValid(n)/* hasChild */) {
      n[opt.childrenField].forEach(flat)
    }
  }

  nodes.forEach(flat)

  return result
}

export function findTreeParent<T> (
  option: {
    parentField?: string
    valid?: (parent: T) => boolean
  },
  node: T
): T | null {

  const defaultOpt = { parentField: PARENT, valid: identity }
  const opt = Object.assign(defaultOpt, option)

  if (opt.valid(node)) return node
  const parent = node[opt.parentField]
  return parent ? findTreeParent(opt, parent) : null
}

const arrayDelete = curry(arrayRemove, undefined)

export function findTreeParentFromList<T> (
  option: {
    pidField?: string,
    idField?: string,
    parentValid?: (parentLike: T, child: T) => boolean,
    valid: (parent: T) => boolean
  },
  node: T,
  list: T[]
): T | null {
  const defaultOpt = { 
    pidField: PID, 
    idField: ID, 
    parentValid: (parentLike: T, child: T) => parentLike[ID] === child[PID],
    valid: identity
  }
  const opt = Object.assign(defaultOpt, option)


  if (opt.valid(node)) return node
  const parent = list.find(n => opt.parentValid(n, node))
  if (parent === null) return null
  

  return parent ? 
    findTreeParentFromList(opt, parent, arrayDelete(list, parent)) :
    null
}
