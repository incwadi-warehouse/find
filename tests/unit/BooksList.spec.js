import { mount, createLocalVue } from '@vue/test-utils'
import BooksList from './../../src/components/search/BooksList'
import VueCompositionApi from '@vue/composition-api'
import components from '@baldeweg/components'

const localVue = createLocalVue()
localVue.use(VueCompositionApi)
localVue.use(components)

describe('BooksList', () => {
  it('lists the books', () => {
    const expected = [{ name: 'Title' }]
    const $t = () => {}
    const wrapper = mount(BooksList, {
      localVue,
      propsData: {
        books: expected,
      },
      mocks: {
        $t,
      },
    })

    expect(wrapper.props('books')).toEqual(expected)
    expect(wrapper.find('.list').exists()).toBeTruthy()
  })
})
