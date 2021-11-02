import DsTree from '../DsTree'

const initialValue = {
  name: 'hello root',
  children: [
    { name: 'hello0', children: [] },
    {
      name: 'hello1',
      children: [
        { name: 'hello1-0', children: [] },
        { name: 'hello1-1', children: [] }
      ]
    },
    { name: 'hello2', children: [] },
    { name: 'hello3', children: [] },
    { name: 'hello4', children: [] }
  ]
}

const initialValue2 = {
  name: 'hello root',
  kids: [
    { name: 'hello0', kids: [] },
    {
      name: 'hello1',
      kids: [
        { name: 'hello1-0', kids: [] },
        { name: 'hello1-1', kids: [] }
      ]
    },
    { name: 'hello2', kids: [] },
    { name: 'hello3', kids: [] },
    { name: 'hello4', kids: [] }
  ]
}

describe('test dsTree class methods', () => {
  test('test getRootNode method & getValue method', () => {
    const dsTree = new DsTree(initialValue)
    const rootNode = dsTree.getRootNode()

    expect(rootNode.getValue().name).toBe('hello root')
  })

  describe('test childrenPropertyName option', () => {
    const dsTree = new DsTree(initialValue2, { childrenPropertyName: 'kids' })

    test('every method should work well', () => {
      const searchedNode = dsTree.search(
        (node) => node.getValue().name === 'hello1'
      )

      expect(searchedNode!.getValue().name).toBe('hello1')
    })
  })

  describe('test export method', () => {
    const dsTree = new DsTree(initialValue)

    test('initialValue and exported value must be eqaul', () => {
      expect(
        JSON.stringify(initialValue) === JSON.stringify(dsTree.export())
      ).toBe(true)
    })
  })
})

describe('test dsTreeNode methods', () => {
  test('test isRootNode method', () => {
    const dsTree = new DsTree(initialValue)

    const rootNode = dsTree.getRootNode()
    expect(rootNode.isRootNode()).toBe(true)

    const searchedNode = dsTree.search(
      (node) => node.getValue().name === 'hello0'
    )
    expect(searchedNode!.isRootNode()).toBe(false)
  })

  test('test getDepth method', () => {
    const dsTree = new DsTree(initialValue)

    const rootNode = dsTree.getRootNode()
    expect(rootNode.getDepth()).toBe(0)

    const searchedNode = dsTree.search(
      (node) => node.getValue().name === 'hello0'
    )
    expect(searchedNode!.getDepth()).toBe(1)
  })

  describe('test getPath method', () => {
    const dsTree = new DsTree(initialValue)

    const searchedNode = dsTree.search(
      (node) => node.getValue().name === 'hello1-0'
    )

    test('if you pass false to parameter or not pass anything, you will get path from the current node', () => {
      const expectNames = ['hello1-0', 'hello1', 'hello root']

      const path = searchedNode!.getPath()
      path.forEach((node, index) => {
        expect(node.getValue().name).toBe(expectNames[index])
      })

      const path2 = searchedNode!.getPath(false)
      path2.forEach((node, index) => {
        expect(node.getValue().name).toBe(expectNames[index])
      })
    })

    test('if you pass true to parameter, you will get path from the top', () => {
      const path = searchedNode!.getPath(true)

      const expectNames = ['hello root', 'hello1', 'hello1-0']
      path.forEach((node, index) => {
        expect(node.getValue().name).toBe(expectNames[index])
      })
    })

    expect(searchedNode!.getDepth()).toBe(2)
  })

  describe('test getParentNode method', () => {
    const dsTree = new DsTree(initialValue)

    test('if node is root, it should returns null', () => {
      const rootNode = dsTree.getRootNode()
      expect(rootNode.getParentNode()).toBe(null)
    })

    test('if node has parent node, it should returns parent node', () => {
      const searchedNode = dsTree.search(
        (node) => node.getValue().name === 'hello0'
      )
      expect(searchedNode!.getParentNode()!.getValue().name).toBe('hello root')
    })
  })

  describe('test setValue method', () => {
    test('set value with the object', () => {
      const dsTree = new DsTree(initialValue)
      const searchedNode = dsTree.search(
        (node) => node.getValue().name === 'hello0'
      )

      searchedNode!.setValue({ name: 'hello7' })
      expect(searchedNode!.getValue().name).toBe('hello7')

      const expectNames = ['hello7', 'hello1', 'hello2', 'hello3', 'hello4']
      searchedNode!.getSiblings(true).forEach((node, index) => {
        expect(node.getValue().name).toBe(expectNames[index])
      })
    })

    test('set value with the function', () => {
      const dsTree = new DsTree(initialValue)
      const searchedNode = dsTree.search(
        (node) => node.getValue().name === 'hello3'
      )

      searchedNode!.setValue((currentValue) => ({
        ...currentValue,
        name: 'hello7'
      }))
      expect(searchedNode!.getValue().name).toBe('hello7')

      const expectNames = ['hello0', 'hello1', 'hello2', 'hello7', 'hello4']
      searchedNode!.getSiblings(true).forEach((node, index) => {
        expect(node.getValue().name).toBe(expectNames[index])
      })
    })
  })

  describe('test getSiblings method', () => {
    const dsTree = new DsTree(initialValue)

    const searchedNode = dsTree.search(
      (node) => node.getValue().name === 'hello0'
    )

    test('get siblings without self ( without self is default )', () => {
      const expectNames = ['hello1', 'hello2', 'hello3', 'hello4']
      searchedNode!.getSiblings().forEach((node, index) => {
        expect(node.getValue().name).toBe(expectNames[index])
      })
    })

    test('get siblings with self', () => {
      const expectNames = ['hello0', 'hello1', 'hello2', 'hello3', 'hello4']
      searchedNode!.getSiblings(true).forEach((node, index) => {
        expect(node.getValue().name).toBe(expectNames[index])
      })
    })
  })

  describe('test isFirstChild method', () => {
    const dsTree = new DsTree(initialValue)

    test('if node is first child, return true', () => {
      const searchedNode = dsTree.search(
        (node) => node.getValue().name === 'hello0'
      )
      expect(searchedNode!.isFirstChild()).toBe(true)
    })

    test('if node is not first child, return true', () => {
      const searchedNode = dsTree.search(
        (node) => node.getValue().name === 'hello2'
      )
      expect(searchedNode!.isFirstChild()).toBe(false)
    })
  })

  describe('test isLastChild method', () => {
    const dsTree = new DsTree(initialValue)

    test('if node is last child, return true', () => {
      const searchedNode = dsTree.search(
        (node) => node.getValue().name === 'hello4'
      )
      expect(searchedNode!.isLastChild()).toBe(true)
    })

    test('if node is not last child, return true', () => {
      const searchedNode = dsTree.search(
        (node) => node.getValue().name === 'hello2'
      )
      expect(searchedNode!.isLastChild()).toBe(false)
    })
  })

  test('test getChildren method', () => {
    const dsTree = new DsTree(initialValue)

    const rootNode = dsTree.getRootNode()
    const expectNames = ['hello0', 'hello1', 'hello2', 'hello3', 'hello4']
    rootNode.getChildren()!.forEach((node, index) => {
      expect(node.getValue().name).toBe(expectNames[index])
    })
  })

  describe('test getIndex method', () => {
    const dsTree = new DsTree(initialValue)

    test('it should return index within siblings', () => {
      const searchedNode = dsTree.search(
        (node) => node.getValue().name === 'hello2'
      )
      expect(searchedNode!.getIndex()).toBe(2)
    })
  })

  describe('test setIndex method', () => {
    test('it should change index within siblings // test01', () => {
      const dsTree = new DsTree(initialValue)

      const expectNames = ['hello2', 'hello0', 'hello1', 'hello3', 'hello4']
      const searchedNode = dsTree.search(
        (node) => node.getValue().name === 'hello2'
      )
      searchedNode!.setIndex(0)
      searchedNode!.getSiblings(true).forEach((node, index) => {
        expect(node.getValue().name).toBe(expectNames[index])
      })
    })

    test('it should change index within siblings // test02', () => {
      const dsTree = new DsTree(initialValue)

      const expectNames = ['hello0', 'hello1', 'hello3', 'hello4', 'hello2']
      const searchedNode = dsTree.search(
        (node) => node.getValue().name === 'hello2'
      )
      searchedNode!.setIndex(4)
      searchedNode!.getSiblings(true).forEach((node, index) => {
        expect(node.getValue().name).toBe(expectNames[index])
      })
    })

    test('it should change index within siblings // test03', () => {
      const dsTree = new DsTree(initialValue)

      const expectNames = ['hello1', 'hello2', 'hello3', 'hello4', 'hello0']
      const searchedNode = dsTree.search(
        (node) => node.getValue().name === 'hello0'
      )
      searchedNode!.setIndex(4)
      searchedNode!.getSiblings(true).forEach((node, index) => {
        expect(node.getValue().name).toBe(expectNames[index])
      })
    })

    test('it should change index within siblings // test04', () => {
      const dsTree = new DsTree(initialValue)

      const expectNames = ['hello4', 'hello0', 'hello1', 'hello2', 'hello3']
      const searchedNode = dsTree.search(
        (node) => node.getValue().name === 'hello4'
      )
      searchedNode!.setIndex(0)
      searchedNode!.getSiblings(true).forEach((node, index) => {
        expect(node.getValue().name).toBe(expectNames[index])
      })
    })
  })

  describe('test addChild & parse method', () => {
    const dsTree = new DsTree(initialValue)

    const rootNode = dsTree.getRootNode()

    rootNode.addChild({
      name: 'hello5',
      children: [
        {
          name: 'hello5-0',
          children: []
        },
        {
          name: 'hello5-1',
          children: []
        }
      ]
    })

    test('hello5 node should be inserted at the end of the index of rootNode children', () => {
      const expectNames = [
        'hello0',
        'hello1',
        'hello2',
        'hello3',
        'hello4',
        'hello5'
      ]
      rootNode.getChildren()!.forEach((node, index) => {
        expect(node.getValue().name).toBe(expectNames[index])
      })
    })

    test('hello5-0, hello5-1 node should be children of hello5', () => {
      const expectNames2 = ['hello5-0', 'hello5-1']
      rootNode
        .getChildren()![5]
        .getChildren()!
        .forEach((node, index) => {
          expect(node.getValue().name).toBe(expectNames2[index])
        })
    })
  })

  describe('test addChildAtIndex method', () => {
    const dsTree = new DsTree(initialValue)

    const rootNode = dsTree.getRootNode()

    rootNode.addChildAtIndex(
      {
        name: 'hello5',
        children: [
          {
            name: 'hello5-0',
            children: []
          },
          {
            name: 'hello5-1',
            children: []
          }
        ]
      },
      0
    )
    test('hello5 node should be inserted at the very first of the index of rootNode children', () => {
      const expectNames = [
        'hello5',
        'hello0',
        'hello1',
        'hello2',
        'hello3',
        'hello4'
      ]
      rootNode.getChildren()!.forEach((node, index) => {
        expect(node.getValue().name).toBe(expectNames[index])
      })
    })

    test('hello5-0, hello5-1 node should be children of hello5', () => {
      const expectNames2 = ['hello5-0', 'hello5-1']
      rootNode
        .getChildren()![0]
        .getChildren()!
        .forEach((node, index) => {
          expect(node.getValue().name).toBe(expectNames2[index])
        })
    })
  })

  describe('test drop method', () => {
    const dsTree = new DsTree(initialValue)
    const rootNode = dsTree.getRootNode()

    const searchedNode = dsTree.search(
      (node) => node.getValue().name === 'hello1'
    )
    const deletedNode = searchedNode!.drop()

    test('node should be removed and removed node will be returned', () => {
      const expectNames = ['hello0', 'hello2', 'hello3', 'hello4']
      rootNode.getChildren()!.forEach((node, index) => {
        expect(node.getValue().name).toBe(expectNames[index])
      })
    })

    test('deleted node must not have parentNode, but still have children nodes', () => {
      const expectNames = ['hello1-0', 'hello1-1']
      deletedNode.getChildren()!.forEach((node, index) => {
        expect(node.getValue().name).toBe(expectNames[index])
      })
    })
  })
})
