import Common from './Common'

import type { TraverseOption, TypeObject } from './interface'

export default class DsTreeNode extends Common {
  private _value: TypeObject
  private readonly _config: { childrenPropertyName: string }
  private _parentNode: DsTreeNode | null

  constructor(value: TypeObject, config: { childrenPropertyName: string }) {
    super()

    this._value = { ...value }
    this._config = config
    if (Array.isArray(this._value[this._config.childrenPropertyName])) {
      this._value[this._config.childrenPropertyName] = []
    }
    this._parentNode = null
  }

  public isRootNode(): boolean {
    return this._parentNode === null
  }

  public getDepth(): number {
    let depth = -1

    let self: DsTreeNode | null = this

    while (self !== null) {
      self = self.getParentNode()

      depth += 1
    }

    return depth
  }

  public getPath(fromTop: boolean = false): DsTreeNode[] {
    const path = []

    let self: DsTreeNode | null = this

    while (self !== null) {
      path.push(self)

      self = self.getParentNode()
    }

    if (fromTop) {
      return path.reverse()
    }

    return path
  }

  public getValue(): TypeObject {
    return this._value
  }

  public setValue(
    newValue: TypeObject | ((currentValue: TypeObject) => TypeObject)
  ): void {
    if (typeof newValue === 'function') {
      this._value = newValue(this._value)
    } else {
      this._value = { ...this._value, ...newValue }
    }
  }

  public getParentNode(): DsTreeNode | null {
    return this._parentNode
  }

  public getSiblings(andSelf: boolean = false): DsTreeNode[] {
    if (this.isRootNode()) {
      return andSelf ? [this] : []
    }

    const siblingsAndSelf =
      (this.getParentNode() as DsTreeNode).getChildren() ?? []

    return andSelf
      ? siblingsAndSelf
      : siblingsAndSelf.filter((node) => node !== this)
  }

  public getIndex(): number {
    if (this.isRootNode()) {
      return 0
    }

    return this.getSiblings(true).findIndex((node) => node === this)
  }

  public setIndex(newIndex: number): void {
    if (!Number.isInteger(newIndex) || newIndex < 0) {
      throw new Error('Wrong index is passed')
    }

    if (this.isRootNode()) {
      throw new Error('You can not change root node index')
    }

    const siblings = this.getSiblings()

    if (newIndex > siblings.length) {
      throw new Error('Wrong index is passed')
    }

    const originalIndex = this.getIndex()

    if (originalIndex !== newIndex) {
      const parentNode = this.getParentNode() as DsTreeNode

      ;(parentNode.getValue()[
        this._config.childrenPropertyName
      ] as TypeObject) = siblings
        .slice(0, newIndex)
        .concat(this, siblings.slice(newIndex))
    }
  }

  public isFirstChild(): boolean {
    if (this.isRootNode()) {
      return true
    }

    const currentIndex = this.getIndex()

    if (currentIndex === 0) {
      return true
    }

    return false
  }

  public isLastChild(): boolean {
    if (this.isRootNode()) {
      return true
    }

    const currentIndex = this.getIndex()
    const siblingsAndSelfLength = this.getSiblings(true).length

    if (currentIndex === siblingsAndSelfLength - 1) {
      return true
    }

    return false
  }

  public getChildren(): DsTreeNode[] | null {
    return this.getValue()[this._config.childrenPropertyName] ?? null
  }

  public addChild(newNode: TypeObject): void {
    const parsedNewNode = this._parse(newNode)

    parsedNewNode.setParentNode(this)
    ;(this.getValue()[this._config.childrenPropertyName] as TypeObject) = (
      this.getChildren() ?? []
    ).concat(parsedNewNode)
  }

  public addChildAtIndex(newNode: TypeObject, index: number): void {
    if (!Number.isInteger(index) || index < 0) {
      throw new Error('Wrong index is passed')
    }

    const children = this.getChildren() ?? []

    if (index > children.length) {
      throw new Error('Wrong index is passed')
    }

    const parsedNewNode = this._parse(newNode)

    parsedNewNode.setParentNode(this)
    ;(this.getValue()[this._config.childrenPropertyName] as TypeObject) =
      children.slice(0, index).concat(parsedNewNode, children.slice(index))
  }

  public drop(): DsTreeNode {
    if (this.isRootNode()) {
      throw new Error('You can not drop root node')
    }

    const parentNode = this.getParentNode() as DsTreeNode

    ;(parentNode.getValue()[this._config.childrenPropertyName] as TypeObject) =
      (parentNode.getChildren() ?? []).filter((node) => node !== this)

    this.setParentNode(null)

    return this
  }

  public search(
    predicateFn: (dsTreeNode: DsTreeNode) => boolean,
    options?: TraverseOption
  ): DsTreeNode | null {
    return this._search(this, predicateFn, options)
  }

  public searchAll(
    predicateFn: (dsTreeNode: DsTreeNode) => boolean,
    options?: TraverseOption
  ): DsTreeNode[] {
    return this._searchAll(this, predicateFn, options)
  }

  public walk(
    callbackFn: (dsTreeNode: DsTreeNode) => unknown,
    options?: TraverseOption
  ): void {
    this._walk(this, callbackFn, options)
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

  private setParentNode(parentNode: DsTreeNode | null): void {
    this._parentNode = parentNode
  }
}
