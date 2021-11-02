![](https://badgen.net/npm/v/@share-code/ds-tree)
![](https://badgen.net/bundlephobia/minzip/@share-code/ds-tree)
![](https://badgen.net/npm/dm/@share-code/ds-tree)
![](https://badgen.net/npm/dt/@share-code/ds-tree)
![](https://img.shields.io/badge/license-MIT-blue.svg)

# ds-tree

data structure - tree using javascript/typescript

## How to install

```zsh
npm i @share-code/ds-tree
```

## Basic code to start

```typescript
const dsTree = new DsTree({
  name: 'hello0',
  children: [
    {
      name: 'hello0-0',
      children: []
    },
    {
      name: 'hello0-1',
      children: []
    },
    {
      name: 'hello1',
      children: []
    }
  ]
})

const rootNode = dsTree.getRootNode()

// Mutate your tree in here

dsTree.export()
```

## Methods you can use

### Common

#### search

You can find a node which satisfy the condition. This method use DFS algorithm to find node.

**DFS algorithm will be stopped if satisfied condition node is founded.**

**If you use this method with dsTreeNode, it will traverse from current node**

Return type: DsTreeNode | null

```typescript
const dsTree = new DsTree({ name: 'hello0', children: [] })

dsTree.search((node) => node.getValue().name === 'hello0') // default algorithm is 'preorder'
dsTree.search((node) => node.getValue().name === 'hello0', {
  algorithm: 'preorder'
})
dsTree.search((node) => node.getValue().name === 'hello0', {
  algorithm: 'postorder'
})
```

#### searchAll

You can find nodes which satisfy the condition. This method use DFS algorithm to find node.

**If you use this method with dsTreeNode, it will traverse from current node**

Return type: DsTreeNode[]

```typescript
const dsTree = new DsTree({ name: 'hello0', children: [] })

dsTree.searchAll((node) => node.getValue().name === 'hello0') // default algorithm is 'preorder'
dsTree.searchAll((node) => node.getValue().name === 'hello0', {
  algorithm: 'preorder'
})
dsTree.searchAll((node) => node.getValue().name === 'hello0', {
  algorithm: 'postorder'
})
```

#### walk

You can check the whole nodes in the tree with this method.

**This method was maded to get the information. Not for mutation.**

**If you use this method with dsTreeNode, it will traverse from current node**

Return type: void

```typescript
const dsTree = new DsTree({
  name: 'hello0',
  children: [
    {
      name: 'hello0-0',
      children: []
    },
    {
      name: 'hello0-1',
      children: []
    },
    {
      name: 'hello1',
      children: []
    }
  ]
})

// default algorithm is 'preorder'
dsTree.walk((node) => {
  console.log('depth: ' + node.getDepth())
})

// depth: 0
// depth: 1
// depth: 1
// depth: 0

dsTree.walk(
  (node) => {
    console.log('depth: ' + node.getDepth())
  },
  { algorithm: 'preorder' }
)

// depth: 0
// depth: 1
// depth: 1
// depth: 0

dsTree.walk(
  (node) => {
    console.log('depth: ' + node.getDepth())
  },
  { algorithm: 'postorder' }
)

// depth: 1
// depth: 1
// depth: 1
// depth: 0
```

### DsTree

#### getRootNode

You can get root node.

Return type: DsTreeNode

```typescript
const dsTree = new DsTree({ name: 'hello0', children: [] })

dsTree.getRootNode()
```

#### parse

You can parse tree form into dsTree form. This is useful when you add new child.

Return type: DsTreeNode

```typescript
const dsTree = new DsTree({ name: 'hello0', children: [] })

dsTree.parse({ name: 'hello1', children: [] })
```

#### export

After finish your mutation with your tree, you can make original tree structure.

Return type: object

```typescript
const dsTree = new DsTree({ name: 'hello0', children: [] })

dsTree.export() // return: { name: 'hello0', children: [] }
```

### DsTreeNode

#### isRootNode

Check node is root node.

Return type: boolean

```typescript
const dsTree = new DsTree({ name: 'hello0', children: [] })
const rootNode = dsTree.getRootNode()

rootNode.isRootNode() // true
```

#### getDepth()

Get depth of node. Root node is 0.

Return type: number

```typescript
const dsTree = new DsTree({ name: 'hello0', children: [] })
const rootNode = dsTree.getRootNode()

rootNode.getDepth() // 0
```

#### getPath(fromTop: boolean = false)

get current node path

Return type: DsTreeNode[]

```typescript
const dsTree = new DsTree({
  name: 'hello0',
  children: [
    {
      name: 'hello0-0',
      children: []
    },
    {
      name: 'hello0-1',
      children: [
        {
          name: 'hello0-1-0',
          children: []
        },
        {
          name: 'hello0-1-1',
          children: []
        }
      ]
    },
    {
      name: 'hello0-2',
      children: []
    }
  ]
})

const searchedNode = dsTree.search(
  (node) => node.getValue().name === 'hello0-1-0'
)

searchedNode.getPath().forEach((node, index) => {
  console.log('node: ' + node.getValue().name)
})

// hello0-1-0
// hello0-1
// hello0

searchedNode.getPath(true).forEach((node, index) => {
  console.log('node: ' + node.getValue().name)
})

// hello0
// hello0-1
// hello0-1-0
```

#### getValue()

Get node value

**I recommend not to change children values!**

Return type: object

```typescript
const dsTree = new DsTree({ name: 'hello0', children: [] })
const rootNode = dsTree.getRootNode()

rootNode.getValue() // { name: 'hello0', children: [] }
```

#### setValue(newValue: Partial<DsTreeNode> | ((currentValue: DsTreeNode) => DsTreeNode))

Set node value

**I recommend not to change children values!**

Return type: object

```typescript
const dsTree = new DsTree({ name: 'hello0', children: [] })
const rootNode = dsTree.getRootNode()

// case 01
rootNode.setValue({ name: 'hello7' })
rootNode.getValue() // { name: 'hello7', children: [] }

// case 02
rootNode.setValue((prev) => ({ ...prev, name: 'hello77' }))
rootNode.getValue() // { name: 'hello77', children: [] }
```

### getParentNode()

Get parent node

Return type: DsTreeNode | null

```typescript
const dsTree = new DsTree({
  name: 'hello0',
  children: [
    {
      name: 'hello0-0',
      children: []
    },
    {
      name: 'hello0-1',
      children: []
    }
  ]
})
const rootNode = dsTree.getRootNode()

rootNode.getParentNode() // null

rootNode.getChildren()[0].getParentNode() // it's going to return rootNode
```

#### getSiblings(andSelf: boolean = false)

Get node siblings

Return type: DsTreeNode[]

```typescript
const dsTree = new DsTree({
  name: 'hello0',
  children: [
    {
      name: 'hello0-0',
      children: []
    },
    {
      name: 'hello0-1',
      children: []
    },
    {
      name: 'hello0-2',
      children: []
    }
  ]
})
const rootNode = dsTree.getRootNode()

rootNode
  .getChildren()[0]
  .getSiblings()
  .forEach((node) => {
    console.log('node value: ' + node.getValue)
  })

// node value: { name: 'hello0-1', children: [] }
// node value: { name: 'hello0-2', children: [] }

rootNode
  .getChildren()[0]
  .getSiblings(true)
  .forEach((node) => {
    console.log('node value: ' + node.getValue)
  })

// node value: { name: 'hello0-0', children: [] }
// node value: { name: 'hello0-1', children: [] }
// node value: { name: 'hello0-2', children: [] }
```

#### getIndex()

Get node index among siblings

Return type: number

```typescript
const dsTree = new DsTree({
  name: 'hello0',
  children: [
    {
      name: 'hello0-0',
      children: []
    },
    {
      name: 'hello0-1',
      children: []
    },
    {
      name: 'hello0-2',
      children: []
    }
  ]
})
const rootNode = dsTree.getRootNode()

rootNode.getChildren()[1].getIndex() // 1
rootNode.getChildren()[2].getIndex() // 2
```

#### setIndex(newIndex: number)

Get node index among siblings

Return type: void

```typescript
const dsTree = new DsTree({
  name: 'hello0',
  children: [
    {
      name: 'hello0-0',
      children: []
    },
    {
      name: 'hello0-1',
      children: []
    },
    {
      name: 'hello0-2',
      children: []
    }
  ]
})
const rootNode = dsTree.getRootNode()

rootNode.getChildren()[1].setIndex(0)

console.log(dsTree.export())

/* {
  name: 'hello0',
  children: [{
    { name: 'hello0-1', children: [] },
    { name: 'hello0-0', children: [] },
    { name: 'hello0-2', children: [] }
  }]
} */
```

#### isFirstChild()

Check node is first child or not

Return type: boolean

```typescript
const dsTree = new DsTree({
  name: 'hello0',
  children: [
    {
      name: 'hello0-0',
      children: []
    },
    {
      name: 'hello0-1',
      children: []
    },
    {
      name: 'hello0-2',
      children: []
    }
  ]
})

const searchedNode00 = dsTree.search(
  (node) => node.getValue().name === 'hello0-0'
)

searchedNode!.isFirstChild() // true

const searchedNode01 = dsTree.search(
  (node) => node.getValue().name === 'hello0-1'
)

searchedNode!.isFirstChild() // false
```

#### isLastChild()

Check node is last child or not

Return type: boolean

```typescript
const dsTree = new DsTree({
  name: 'hello0',
  children: [
    {
      name: 'hello0-0',
      children: []
    },
    {
      name: 'hello0-1',
      children: []
    },
    {
      name: 'hello0-2',
      children: []
    }
  ]
})

const searchedNode00 = dsTree.search(
  (node) => node.getValue().name === 'hello0-2'
)

searchedNode!.isLastChild() // true

const searchedNode01 = dsTree.search(
  (node) => node.getValue().name === 'hello0-1'
)

searchedNode!.isLastChild() // false
```

#### getChildren()

Get node's children nodes

Return type: DsTreeNode[] | undefined | null

```typescript
const dsTree = new DsTree({
  name: 'hello0',
  children: [
    {
      name: 'hello0-0',
      children: []
    },
    {
      name: 'hello0-1',
      children: []
    },
    {
      name: 'hello0-2',
      children: []
    }
  ]
})
const rootNode = dsTree.getRootNode()

rootNode.getChildren().forEach((node) => {
  console.log('node name: ' + node.getValue().name)
})

// node name: 'hello0-0'
// node name: 'hello0-1'
// node name: 'hello0-2'
```

#### addChild(newNode: DsTreeNode)

add child at the very end of child index

Return type: void

```typescript
const dsTree = new DsTree({
  name: 'hello0',
  children: [
    {
      name: 'hello0-0',
      children: []
    },
    {
      name: 'hello0-1',
      children: []
    },
    {
      name: 'hello0-2',
      children: []
    }
  ]
})
const rootNode = dsTree.getRootNode()

rootNode.addChild(dsTree.parse({ name: 'hello0-3', children: [] }))

rootNode.getChildren().forEach((node) => {
  console.log('node name: ' + node.getValue().name)
})

// node name: 'hello0-0'
// node name: 'hello0-1'
// node name: 'hello0-2'
// node name: 'hello0-3'
```

#### addChildAtIndex(newNode: DsTreeNode, index: number)

add child at the user specified index

Return type: void

```typescript
const dsTree = new DsTree({
  name: 'hello0',
  children: [
    {
      name: 'hello0-0',
      children: []
    },
    {
      name: 'hello0-1',
      children: []
    },
    {
      name: 'hello0-2',
      children: []
    }
  ]
})
const rootNode = dsTree.getRootNode()

rootNode.addChildAtIndex(dsTree.parse({ name: 'hello0-3', children: [] }), 1)

rootNode.getChildren().forEach((node) => {
  console.log('node name: ' + node.getValue().name)
})

// node name: 'hello0-0'
// node name: 'hello0-3'
// node name: 'hello0-1'
// node name: 'hello0-2'
```

#### drop()

Drop node

Return type: DsTreeNode

```typescript
const dsTree = new DsTree({
  name: 'hello0',
  children: [
    {
      name: 'hello0-0',
      children: []
    },
    {
      name: 'hello0-1',
      children: [
        {
          name: 'hello0-1-0',
          children: []
        },
        {
          name: 'hello0-1-1',
          children: []
        }
      ]
    },
    {
      name: 'hello0-2',
      children: []
    }
  ]
})
const rootNode = dsTree.getRootNode()

const secondChild = rootNode.getChildren(0)[1].drop()

console.log('secondChild parentNode: ' + secondChild.getParentNode())
// secondChild parentNode: null
console.log('secondChild name: ' + secondChild.getValue().name)
// secondChild name: hello0-1

secondChild.getChildren().forEach((node) => {
  console.log('node name: ' + node.getValue().name)
})
// node name: hello0-1-0
// node name: hello0-1-1

rootNode.getChildren().forEach((node) => {
  console.log('node name: ' + node.getValue().name)
})

// node name: 'hello0-0'
// node name: 'hello0-2'
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
