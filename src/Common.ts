import type DsTreeNode from './DsTreeNode'
import type { TraverseOption } from './interface'

const BREAK = '__DATA_STRUCTURE_TREE_BREAK__'

export default class Common {
  protected _search(
    dsTreeNode: DsTreeNode,
    predicateFn: (dsTreeNode: DsTreeNode) => boolean,
    options?: TraverseOption
  ): DsTreeNode | null {
    let targetNode = null

    switch (options?.algorithm ?? 'preorder') {
      case 'preorder': {
        this._dfsPreorder(dsTreeNode, (node) => {
          const isFind = predicateFn(node)

          if (isFind) {
            targetNode = node

            return BREAK
          }

          return null
        })

        break
      }

      case 'postorder': {
        this._dfsPostorder(dsTreeNode, (node) => {
          const isFind = predicateFn(node)

          if (isFind) {
            targetNode = node

            return BREAK
          }

          return null
        })

        break
      }

      default: {
        break
      }
    }

    return targetNode
  }

  protected _searchAll(
    dsTreeNode: DsTreeNode,
    predicateFn: (dsTreeNode: DsTreeNode) => boolean,
    options?: TraverseOption
  ): DsTreeNode[] {
    const targetNodes: DsTreeNode[] = []

    switch (options?.algorithm ?? 'preorder') {
      case 'preorder': {
        this._dfsPreorder(dsTreeNode, (node) => {
          const isFind = predicateFn(node)

          if (isFind) {
            targetNodes.push(node)
          }
        })

        break
      }

      case 'postorder': {
        this._dfsPostorder(dsTreeNode, (node) => {
          const isFind = predicateFn(node)

          if (isFind) {
            targetNodes.push(node)
          }
        })

        break
      }

      default: {
        break
      }
    }

    return targetNodes
  }

  protected _walk(
    dsTreeNode: DsTreeNode,
    callbackFn: (dsTreeNode: DsTreeNode) => unknown,
    options?: TraverseOption
  ): void {
    switch (options?.algorithm ?? 'preorder') {
      case 'preorder': {
        this._dfsPreorder(dsTreeNode, (node) => {
          callbackFn(node)
        })

        break
      }

      case 'postorder': {
        this._dfsPostorder(dsTreeNode, (node) => {
          callbackFn(node)
        })

        break
      }

      default: {
        break
      }
    }
  }

  private _dfsPreorder(
    dsTreeNode: DsTreeNode,
    callbackFn: (dsTreeNode: DsTreeNode) => unknown
  ): unknown {
    const callbackRtn = callbackFn(dsTreeNode)

    if (callbackRtn === BREAK) {
      return callbackRtn
    }

    const children = dsTreeNode.getChildren()

    let isBreak = false
    if (Array.isArray(children)) {
      for (let index = 0; index < children.length; index += 1) {
        const dfsRecurseRtn = this._dfsPreorder(children[index], callbackFn)

        if (dfsRecurseRtn === BREAK) {
          isBreak = true

          break
        }
      }
    }

    if (isBreak) {
      return BREAK
    }

    return true
  }

  private _dfsPostorder(
    dsTreeNode: DsTreeNode,
    callbackFn: (dsTreeNode: DsTreeNode) => unknown
  ): unknown {
    const children = dsTreeNode.getChildren()

    let isBreak = false
    if (Array.isArray(children)) {
      for (let index = 0; index < children.length; index += 1) {
        const dfsRecurseRtn = this._dfsPostorder(children[index], callbackFn)

        if (dfsRecurseRtn === BREAK) {
          isBreak = true

          break
        }
      }
    }

    if (isBreak) {
      return BREAK
    }

    const callbackRtn = callbackFn(dsTreeNode)

    if (callbackRtn === BREAK) {
      return callbackRtn
    }

    return true
  }
}
