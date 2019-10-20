import 'kity'
import 'kityminder-core'
import Editor from './components/editor'
import './module/imageicon'

const MindEditor = {
  Minder: Editor
}

const install = function (Vue, opts = {}) {
  Object.keys(MindEditor).forEach((key) => {
    Vue.component(key, MindEditor[key])
  })
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
MindEditor.install = install
export default MindEditor
