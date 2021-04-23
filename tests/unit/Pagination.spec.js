import { mount, createLocalVue } from '@vue/test-utils'
import Pagination from './../../src/components/search/Pagination'
import VueCompositionApi from '@vue/composition-api'
import components from '@baldeweg/components'

const localVue = createLocalVue()
localVue.use(VueCompositionApi)
localVue.use(components)

describe('Pagination', () => {
  it('shows the pagination', () => {
    const $t = () => {}
    const wrapper = mount(Pagination, {
      localVue,
      propsData: {
        pages: 10,
        page: 1,
      },
      mocks: {
        $t,
      },
    })

    expect(wrapper.props('pages')).toEqual(10)
    expect(wrapper.props('page')).toEqual(1)
    expect(wrapper.find('.pagination').exists()).toBeTruthy()
  })
})
