## Quick start

This part walks you through the process of using Element in a webpack project.

### Use Starter Kit

We provide a general [project template](https://github.com/ElementUI/element-starter) for you. For Laravel users, we also have a [template](https://github.com/ElementUI/element-in-laravel-starter). You can download and use them directly.

If you prefer not to use them, please read the following.

### Use vue-cli

We can also start a project using [vue-cli](https://github.com/vuejs/vue-cli):

```shell
> npm i -g vue-cli
> mkdir my-project && cd my-project
> vue init webpack
> npm i && npm i tmconsulting-ui
```

### Import Element

You can import TMui entirely, or just import what you need. Let's start with fully import.

#### Fully import

In main.js:
```javascript
import Vue from 'vue'
import TMui from 'tmconsulting-ui'
import 'tmconsulting-ui/lib/theme-chalk/index.css'
import App from './App.vue'

Vue.use(TMui)

new Vue({
  el: '#app',
  render: h => h(App)
})
```
The above imports Element entirely. Note that CSS file needs to be imported separately.

#### On demand

With the help of [babel-plugin-component](https://github.com/QingWei-Li/babel-plugin-component), we can import components we actually need, making the project smaller than otherwise.

First, install babel-plugin-component:

```bash
npm install babel-plugin-component -D
```

Then edit .babelrc:
```json
{
  "presets": [
    ["es2015", { "modules": false }]
  ],
  "plugins": [["component", {
      "libraryName": "tmconsulting-ui",
      "styleLibraryName": "theme-chalk"
    }
  ]]
}
```

Next, if you need Button and Select, edit main.js:

```javascript
import Vue from 'vue'
import { Button, Select } from 'tmconsulting-ui'
import App from './App.vue'

Vue.component(Button.name, Button)
Vue.component(Select.name, Select)
/* or
 * Vue.use(Button)
 * Vue.use(Select)
 */

new Vue({
  el: '#app',
  render: h => h(App)
})
```

Full example (Component list reference [components.json](https://github.com/ElemeFE/element/blob/master/components.json))

```javascript
import Vue from 'vue'
import {
  Pagination,
  Dialog,
  Autocomplete,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Switch,
  Select,
  Option,
  OptionGroup,
  Button,
  ButtonGroup,
  Table,
  TableColumn,
  DatePicker,
  TimeSelect,
  TimePicker,
  Popover,
  Tooltip,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Tag,
  Tree,
  Alert,
  Slider,
  Icon,
  Row,
  Col,
  Upload,
  Progress,
  Badge,
  Card,
  Rate,
  Steps,
  Step,
  Carousel,
  CarouselItem,
  Collapse,
  CollapseItem,
  Cascader,
  ColorPicker,
  Transfer,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Loading,
  MessageBox,
  Message,
  Notification
} from 'tmconsulting-ui'

Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Autocomplete)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Checkbox)
Vue.use(CheckboxButton)
Vue.use(CheckboxGroup)
Vue.use(Switch)
Vue.use(Select)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(Button)
Vue.use(ButtonGroup)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(DatePicker)
Vue.use(TimeSelect)
Vue.use(TimePicker)
Vue.use(Popover)
Vue.use(Tooltip)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Tag)
Vue.use(Tree)
Vue.use(Alert)
Vue.use(Slider)
Vue.use(Icon)
Vue.use(Row)
Vue.use(Col)
Vue.use(Upload)
Vue.use(Progress)
Vue.use(Badge)
Vue.use(Card)
Vue.use(Rate)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Cascader)
Vue.use(ColorPicker)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)

Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
```

### Global config
When importing Element, you can define a global config object. For now this object has only one property: `size`, which sets the default size for all components:

Fully import TMui：
```JS
import Vue from 'vue'
import TMui from 'tmconsulting-ui'
Vue.use(TMui, { size: 'small' })
```

Partial import TMui：
```JS
import Vue from 'vue'
import { Button } from 'tmconsulting-ui'

Vue.prototype.$ELEMENT = { size: 'small' }
Vue.use(Button)
```
With the above config, the default size of all components that have size attribute will be 'small'.

### Start coding

Now you have implemented Vue and Element to your project, and it's time to write your code. Start development mode:

```bash
# visit localhost:8086
npm run dev
```

Build:

```bash
npm run build
```
Please refer to each component's documentation to learn how to use them.
