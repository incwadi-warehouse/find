import { mount, createLocalVue } from '@vue/test-utils'
import Actionbar from './../../../src/components/search/Actionbar'
import VueCompositionApi from '@vue/composition-api'
import components from '@baldeweg/components'

const localVue = createLocalVue()
localVue.use(VueCompositionApi)
localVue.use(components)

describe('Actionbar', () => {
  it('shows the searchbar', () => {
    const expected = 'term'
    const $t = () => {}
    const wrapper = mount(Actionbar, {
      localVue,
      propsData: {
        term: expected,
      },
      mocks: {
        $t,
      },
    })

    expect(wrapper.props('term')).toEqual(expected)
    expect(wrapper.find('input.search_input').exists()).toBeTruthy()
  })
})
