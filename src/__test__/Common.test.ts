import DsTree from '../DsTree'

const initialValue = {
  name: 'hello1',
  children: [
    {
      name: 'hello2',
      children: [{ name: 'hello5' }, { name: 'hello6' }]
    },
    { name: 'hello3', children: [{ name: 'hello7' }] },
    { name: 'hello4' }
  ]
}

describe('test Common class methods', () => {
  describe('test search method', () => {
    const dsTree = new DsTree(initialValue)

    const searchedNode = dsTree.search(
      (node) => node.getValue().name === 'hello2'
    )!

    test('search method in dsTree start to traverse from root node', () => {
      expect(searchedNode.getValue().name).toBe('hello2')
    })

    test('search method in dsTreeNode start to traverse from current node', () => {
      const searchedNode5 = searchedNode.search(
        (node) => node.getValue().name === 'hello5'
      )!

      expect(searchedNode5.getValue().name).toBe('hello5')

      const searchedNode3 = searchedNode.search(
        (node) => node.getValue().name === 'hello3'
      )

      expect(searchedNode3).toBe(null)
    })
  })

  describe('test searchAll method', () => {
    const dsTree = new DsTree(initialValue)

    describe('searchAll method in dsTree start to traverse from root node', () => {
      test('should return depth 0 nodes', () => {
        const searchedNodes = dsTree.searchAll((node) => node.getDepth() === 0)!
        const expectNames = ['hello1']

        expect(searchedNodes.length).toBe(expectNames.length)
        searchedNodes.forEach((searchedNode, index) => {
          expect(searchedNode.getValue().name).toBe(expectNames[index])
        })
      })

      test('should return depth 1 nodes', () => {
        const searchedNodes = dsTree.searchAll((node) => node.getDepth() === 1)!
        const expectNames = ['hello2', 'hello3', 'hello4']

        expect(searchedNodes.length).toBe(expectNames.length)
        searchedNodes.forEach((searchedNode, index) => {
          expect(searchedNode.getValue().name).toBe(expectNames[index])
        })
      })
    })

    describe('searchAll method in dsTreeNode start to traverse from current node', () => {
      const searchedNode = dsTree.search(
        (node) => node.getValue().name === 'hello2'
      )!

      test('should not return depth 0 nodes', () => {
        const searchedNodes = searchedNode.searchAll(
          (node) => node.getDepth() === 0
        )!

        expect(searchedNodes.length).toBe(0)
      })

      test('should return depth 1 nodes from current node', () => {
        const searchedNodes = searchedNode.searchAll(
          (node) => node.getDepth() === 1
        )!
        const expectNames = ['hello2']

        expect(searchedNodes.length).toBe(expectNames.length)
        searchedNodes.forEach((searchedNode, index) => {
          expect(searchedNode.getValue().name).toBe(expectNames[index])
        })
      })

      test('should return depth 1 nodes', () => {
        const searchedNodes = searchedNode.searchAll(
          (node) => node.getDepth() === 2
        )!
        const expectNames = ['hello5', 'hello6']

        expect(searchedNodes.length).toBe(expectNames.length)
        searchedNodes.forEach((searchedNode, index) => {
          expect(searchedNode.getValue().name).toBe(expectNames[index])
        })
      })
    })
  })

  describe('test walk method', () => {
    const dsTree = new DsTree(initialValue)

    describe('walk method in dsTree start to traverse from root node', () => {
      test('preorder (default)', () => {
        const expectNames = [
          'hello1',
          'hello2',
          'hello5',
          'hello6',
          'hello3',
          'hello7',
          'hello4'
        ]
        let index = 0
        dsTree.walk((node) => {
          expect(node.getValue().name).toBe(expectNames[index])

          index += 1
        })
      })

      test('preorder (pass option)', () => {
        const expectNames = [
          'hello1',
          'hello2',
          'hello5',
          'hello6',
          'hello3',
          'hello7',
          'hello4'
        ]
        let index = 0
        dsTree.walk(
          (node) => {
            expect(node.getValue().name).toBe(expectNames[index])

            index += 1
          },
          { algorithm: 'preorder' }
        )
      })

      test('postorder', () => {
        const expectNames = [
          'hello5',
          'hello6',
          'hello2',
          'hello7',
          'hello3',
          'hello4',
          'hello1'
        ]
        let index = 0
        dsTree.walk(
          (node) => {
            expect(node.getValue().name).toBe(expectNames[index])

            index += 1
          },
          { algorithm: 'postorder' }
        )
      })
    })

    describe('walk method in dsTreeNode start to traverse from current node', () => {
      const searchedNode = dsTree.search(
        (node) => node.getValue().name === 'hello2'
      )!

      test('preorder (default)', () => {
        const expectNames = ['hello2', 'hello5', 'hello6']
        let index = 0
        searchedNode.walk((node) => {
          expect(node.getValue().name).toBe(expectNames[index])
          index += 1
        })
      })

      test('preorder (pass option)', () => {
        const expectNames = ['hello2', 'hello5', 'hello6']
        let index = 0
        searchedNode.walk(
          (node) => {
            expect(node.getValue().name).toBe(expectNames[index])
            index += 1
          },
          { algorithm: 'preorder' }
        )
      })

      test('postorder (pass option)', () => {
        const expectNames = ['hello5', 'hello6', 'hello2']
        let index = 0
        searchedNode.walk(
          (node) => {
            expect(node.getValue().name).toBe(expectNames[index])
            index += 1
          },
          { algorithm: 'postorder' }
        )
      })
    })
  })
})
