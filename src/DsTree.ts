import Common from './Common'
import DsTreeNode from './DsTreeNode'

import type { TraverseOption, TypeObject } from './interface'

export default class DsTree extends Common {
  private readonly _config: { childrenPropertyName: string }
  private readonly _root: DsTreeNode

  constructor(
    initialValue: TypeObject,
    config?: { childrenPropertyName: string }
  ) {
    super()

    this._config = {
      childrenPropertyName: config?.childrenPropertyName ?? 'children'
    }
    this._root = this._parse(initialValue)
  }

  public getRootNode(): DsTreeNode {
    return this._root
  }

  // TODO: this method is duplicated in Dstree & DsTreeNode
  private _parse(treeValue: TypeObject): DsTreeNode {
    const node = new DsTreeNode(treeValue, this._config)

    if (
      Array.isArray(treeValue[this._config.childrenPropertyName]) &&
      treeValue[this._config.childrenPropertyName]!.length > 0
    ) {
      for (
        let index = 0;
        index < treeValue[this._config.childrenPropertyName]!.length;
        index += 1
      ) {
        node.addChild(treeValue[this._config.childrenPropertyName]![index])
      }
    }

    return node
  }

  public export(): TypeObject {
    return this.recursiveExport(this.getRootNode())
  }

  public search(
    predicateFn: (dsTreeNode: DsTreeNode) => boolean,
    options?: TraverseOption
  ): DsTreeNode | null {
    return this._search(this.getRootNode(), predicateFn, options)
  }

  public searchAll(
    predicateFn: (dsTreeNode: DsTreeNode) => boolean,
    options?: TraverseOption
  ): DsTreeNode[] {
    return this._searchAll(this.getRootNode(), predicateFn, options)
  }

  public walk(
    callbackFn: (dsTreeNode: DsTreeNode) => unknown,
    options?: TraverseOption
  ): void {
    this._walk(this.getRootNode(), callbackFn, options)
  }

  private recursiveExport(dsTreeNode: DsTreeNode): TypeObject {
    return {
      ...dsTreeNode.getValue(),
      [this._config.childrenPropertyName]: (dsTreeNode.getChildren() ?? []).map(
        (childNode) => this.recursiveExport(childNode)
      )
    }
  }
}
