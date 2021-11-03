export type Key = string | number

export type TypeObject = { [key in Key]: any }

export interface TraverseOption {
  algorithm: 'preorder' | 'postorder'
}
