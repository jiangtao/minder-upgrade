<template>
  <minder :unique-index-fn="generateIndex" :enable="enable" v-ref:minder :style="defaultStyle"></minder>
</template>
<script>
export default {
  data () {
    return {
      defaultStyle: {
        width: '1000px',
        height: '600px'
      },
      enable: false
    }
  },
  computed: {},
  methods: {
    generateIndex (node) {
      return `_${node.data.id || node.data._id}`
    },
    setColor (node, properties) {
      node.setData(properties)
      node.render()
    }
  },
  beforeDestroy () {
    this.$refs.minder.setMemory()
  },
  mounted () {
    var self = this

    var appNode = {
      'root': {
        'data': {
          'name': '中心主题',
          'hexType': 'project',
          'id': 1
        },
        'children': [
          {
            'data': {
              'name': '111',
              'expandState': 'collapse',
              'hexType': 'project',
              'id': 2
            },
            'children': [
              {
                'data': {
                  'name': '1111111',
                  'hexType': 'dir',
                  'id': 3
                },
                'children': []
              },
              {
                'data': {
                  'name': '1111111',
                  'hexType': 'dir',
                  'id': 4
                },
                'children': []
              },
              {
                'data': {
                  'name': '1111111',
                  'hexType': 'dir',
                  'id': 5
                },
                'children': [
                  {
                    'data': {
                      'name': '哈哈',
                      'hexType': 'page',
                      'id': 6
                    },
                    'children': []
                  },
                  {
                    'data': {
                      'name': '哈哈1',
                      'hexType': 'page',
                      'id': 7
                    },
                    'children': []
                  },
                  {
                    'data': {
                      'name': '哈哈2',
                      'hexType': 'page',
                      'id': 8
                    },
                    'children': []
                  }
                ]
              },
              {
                'data': {
                  'name': '1111111',
                  'hexType': 'dir',
                  'id': 9
                },
                'children': []
              },
              {
                'data': {
                  'name': '11在',
                  'hexType': 'page',
                  'id': 10
                },
                'children': []
              }
            ]
          },
          {
            'data': {
              'name': '222',
              'id': 11,
              'hexType': 'page'
            },
            'children': []
          },
          {
            'data': {
              'name': '哈哈哈',
              'hexType': 'page',
              'id': 12
            },
            'children': []
          },
          {
            'data': {
              'name': '333',
              'id': 13,
              'hexType': 'page'
            },
            'children': []
          },
          {
            'data': {
              'name': '444',
              'hexType': 'app',
              'id': 14
            },
            'children': []
          },
          {
            'data': {
              'name': '555',
              'id': 15,
              'hexType': 'page'
            },
            'children': []
          },
          {
            'data': {
              'name': '666',
              'id': 16,
              'hexType': 'page'
            },
            'children': []
          }
        ]
      },
      'template': 'default',
      'theme': 'fresh-blue',
      'version': '1.4.43'
    }

    function addNodeByData (node, root) {
      var addNodeByData = function (node, root) {
        var newNode = window.minder.createNode(root.data, node)
        if (Array.isArray(root.children)) {
          for (let n of root.children) {
            addNodeByData(newNode, n)
          }
        }
        return newNode
      }
      var newNode = addNodeByData(node, root)
      newNode.renderTree()
      newNode.layout()
    }

    this.$nextTick(function () {
      var minder = this.$refs.minder.minder
      // minder.setOption('app_url', 'https://hexyuncdn.oss-cn-beijing.aliyuncs.com/mind/app.png')
      // minder.setOption('project_url', 'https://hexyuncdn.oss-cn-beijing.aliyuncs.com/mind/project.png')
      // minder.setOption('page_url', 'https://hexyuncdn.oss-cn-beijing.aliyuncs.com/mind/page.png')
      // minder.setOption('dir_url', 'https://hexyuncdn.oss-cn-beijing.aliyuncs.com/mind/dir.png')

      setTimeout(() => {
        minder.importJson(this.$refs.minder.getMemory(appNode))
      }, 1000)

      window.onbeforeunload = (event) => {
        // event.preventDefault();
        // event.returnValue = '';
        this.$refs.minder.setMemory()
      }

      minder.on('editText', function (e, minder) {
        var node = e.minder.getSelectedNode()
      })
      // 只有选中的时候会触发
      minder.on('selectionchange', function (e) {
        self.minder = e.minder
        var node = e.minder.getSelectedNode()
        self.currentNode = node
        if (node && node.parent) {
          setTimeout(function () {
            node.parent.layout()
          }, 0)
        }
        if (self.lock && node) {
        }
        self.lock = true
      })

      minder.on('beforeExecCommand', function (e) {
        var node = e.minder.getSelectedNode()
        if (/arrange/i.test(e.commandName)) {
          console.log('arrange', node, e)
        } else if (/append/i.test(e.commandName)) {
          console.log('add', node)
        } else if (/remove/i.test(e.commandName)) {
          console.log('remove', node)
        }
      })
      minder.on('beforeExecCommand', function (e) {
        var node = e.minder.getSelectedNode()
        console.log(node)
        if (/append/i.test(e.commandName)) {
          console.log('add', node)
        } else if (/remove/i.test(e.commandName)) {
          console.log('remove', node)
        }
      })
      minder.on('AfterExecCommand', function (e) {
        var node = e.minder.getSelectedNode()
        console.log('after', node)
        if (/append/i.test(e.commandName)) {
          console.log('after add', node)
        } else if (/remove/i.test(e.commandName)) {
          console.log('after remove', node)
        }
      })
      const colors = {
        'project': {
          color: '#f73131',
          'font-size': 22
        },
        'app': {
          color: 'blue',
          'font-size': 20
        },
        'dir': {
          color: 'green',
          'font-size': 20
        },
        'page': {
          'font-size': 16
        }
      }
      // 设置颜色
      // minder.on('contentchange', (node) => {
      //   minder.getRoot().traverse(n => {
      //     const hextype = n.getData('hexType');
      //     if(hextype && colors[hextype]) {
      //       this.setColor(n, colors[hextype]);
      //     }
      //   });
      //   minder.layout()
      // });
    })
  }
}
</script>
<style>
</style>
