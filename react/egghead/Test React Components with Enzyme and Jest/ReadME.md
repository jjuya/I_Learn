## Shallow rendering a React Component with Enzyme

```react
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

// Shallow rendering
describe('[TEST_COMPONENT]', () => {
  it('should render App', () => {
    const wrapper = shallow([TEST_COMPONENT], {context: {}, disableLifesysleMethods: bool})
      console.log(wrapper.debug())
  })
})
```

- Useful to test component as indivisual unit
- ensure that tests aren't indirectly asserting on behabior of child components
- Debug method to show how we can easily view our component for debugging pirposes



## Find Nodes from a Shallow Rendered Component

```react
it('should contain 1 p', () => {
    expect(wrapper.find('p').length).toBe(1)
})

it('should contain class name is App-intro', () => {
    expect(wrapper.find('.App-intro').exists()).toBe(true)
})

it('should have 3 children in ul tag ', () => {
    expect(wrapper.find('ul').children().length).toBe(3)
})

it('should have ul class name is tyler ', () => {
    expect(wrapper.find('ul').hasClass('tyler')).toBe(true)
})
```



## Understand the Different Accepted Selectors in Enzyme

- `'Tag'`
- `'.ClassName'`
- `#Id`
- `'[Attribute, ..., or Props]'`
- Component select
  - `function (Component-Name)() {return ...}` : constructor
  - `'Component-Name'` : display name
- `{alt : 'Object-Name'}`



## Test Enzyme Rendered Components with Jest Snapshots

```react
it('matches the snapshot', () => {
    const tree = shallow(<App />)
    expect(tree).toMatchSnapshot()
})
```

- result : src/\_\_snapshots\_\_/App.test.js.snap

```bash
npm install --save-dev enzyme-to-json
```



## Test React Component Props with Enzyme and Jest

#### create new component

##### App.js

```react
...
export class Link extends Component {
    render() {
        return this.props.hide ? null : <a href={this.props.address}>Click</a>
    }
}
...
```



#### Write test code

```react
describe('<Link /', () => {
    it('link component accepts address prop', () => {
        const wrapper = shallow(<Link address="www.google.com"/>)
        expect(wrapper.instance().props.address).toBe('www.google.com')
    })

    it('a tag node renders href correctly', () => {
        const wrapper = shallow(<Link address="www.google.com"/>)
        expect(wrapper.props().href).toBe('www.google.com')
    })

    it('returns null with true hide prop', () =>{
        const wrapper = shallow(<Link hide={false} />)
        expect(wrapper.find('a').length).toBe(1)

        wrapper.setProps({hide: true})
        expect(wrapper.get(0)).toBeNull()
    })
})
```



## Fully Render React Components with Enzyme

- Full DOM rendering is for ideas use cases

- requires that a full DOM API be available at the global scope

- must run our test in an environment that at least looks like a browser environment

- Recommended appproach is to import a libraby called `jsdom`

  ```bash
  npm install jsdom
  ```

  - essentially a headless browser implemented completely in JS

```react
describe('<App /> Mount rendering', () => {
    const wrapper = mount(<App />, {context: {}, attachTo: [DOMElement]})

    it('should contain class name is App-intro', () => {
        expect(wrapper.find('.App-intro').exists()).toBe(true)
        wrapper.unmount()
    })

    // Snapshot
    it('matches the snapshot', () => {
        const tree = shallow(<App />)
        expect(toJson(tree)).toMatchSnapshot()
        tree.unmount()
    })
})
```



## Test Simulated Event Handlers with Enzyme

```react
it('updates className with new State', () => {
    expect(wrapper.find('.blue').length).toBe(1)
    expect(wrapper.find('.red').length).toBe(0)

    wrapper.setState({ mainColor: 'red' })
    expect(wrapper.find('.blue').length).toBe(0)
    expect(wrapper.find('.red').length).toBe(1)
})

it('on button click changes p text', () => {
    const button = wrapper.find('button')

    expect(wrapper.find('.button-state').text()).toBe('No!')
    button.simulate('click')
    expect(wrapper.find('.button-state').text()).toBe('Yes!')
})

it('on input change, title changes text', () => {
    const input = wrapper.find('input')

    expect(wrapper.find('h2').text()).toBe('')
    input.simulate('change', {currentTarget: {value: 'Tyler'}})
    expect(wrapper.find('h2').text()).toBe('Tyler')
})
```



## Test New Component State with setState in Enzyme

```react
it('updates className with new State', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find('.blue').length).toBe(1)
    expect(wrapper.find('.red').length).toBe(0)
    wrapper.setState({ mainColor: 'red' })
    expect(wrapper.find('.blue').length).toBe(0)
    expect(wrapper.find('.red').length).toBe(1)    
})
```



## Test React Component Lifecycle Methods with Enzyme

```react
it('calls componentDidMount, updates p tag text', () => {
    jest.spyOn(App.prototype, 'componentDidMount')

    const wrapper = shallow(<App />)

    expect(App.prototype.componentDidMount.mock.calls.length).toBe(1)
    expect(wrapper.find('.lifeCycle').text()).toBe('componentDidMount')
})

it('setProps calls componentWillReceiveProps', () => {
    jest.spyOn(App.prototype, 'componentWillReceiveProps')

    const wrapper = shallow(<App />)

    expect(App.prototype.componentWillReceiveProps.mock.calls.length).toBe(1)
    expect(wrapper.find('.lifeCycle').text()).toBe('componentWillReceiveProps')
})
```



## Test React Component Methods with Enzyme

```react
it('handleStrings function returns correctly', () => {
    const wrapper = shallow(<App />)
    const trueReturn = wrapper.instance().handleStrings('Hello World')
    const falseReturn = wrapper.instance().handleStrings('')

    expect(trueReturn).toBe(true)
    expect(falseReturn).toBe(false)
})
```



## Test Redux Connect Compoentns with Enzyme

- Todo.test.js



## Testing React Forms with Enzyme

- Form.test.js