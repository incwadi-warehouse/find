import { mount, createLocalVue } from '@vue/test-utils'
import BooksCard from './../../../src/components/search/BooksCard'
import VueCompositionApi from '@vue/composition-api'
import components from '@baldeweg/components'

const localVue = createLocalVue()
localVue.use(VueCompositionApi)
localVue.use(components)

describe('BooksCard', () => {
  it('lists the books', () => {
    const expected = [{ title: 'Title' }]
    const $t = () => {}
    const wrapper = mount(BooksCard, {
      localVue,
      propsData: {
        books: expected,
      },
      mocks: {
        $t,
      },
    })

    expect(wrapper.props('books')).toEqual(expected)
    expect(wrapper.find('div').exists()).toBeTruthy()
  })
})
