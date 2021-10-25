import { mount, createLocalVue } from '@vue/test-utils'
import RadioFilter from './../../../src/components/search/RadioFilter'
import VueCompositionApi from '@vue/composition-api'
import components from '@baldeweg/components'

const localVue = createLocalVue()
localVue.use(VueCompositionApi)
localVue.use(components)

describe('RadioFilter', () => {
  it('shows the radio filter', () => {
    const $t = () => {}
    const wrapper = mount(RadioFilter, {
      localVue,
      propsData: {
        selectedItem: { id: 1, name: 'Name' },
        items: [{ id: 1, name: 'Name' }],
        title: 'Title',
        id: 'id',
        name: 'name',
      },
      mocks: {
        $t,
      },
    })

    expect(wrapper.props('selectedItem')).toEqual({ id: 1, name: 'Name' })
    expect(wrapper.props('items')).toEqual([{ id: 1, name: 'Name' }])
    expect(wrapper.props('title')).toEqual('Title')
    expect(wrapper.props('id')).toEqual('id')
    expect(wrapper.props('name')).toEqual('name')
  })
})
