import { mount, createLocalVue } from '@vue/test-utils'
import BookShow from './../../src/components/search/BookShow'
import VueCompositionApi from '@vue/composition-api'
import components from '@baldeweg/components'

const localVue = createLocalVue()
localVue.use(VueCompositionApi)
localVue.use(components)

describe('BookShow', () => {
  it('shows a book', () => {
    const expected = { title: 'Title' }
    const $t = () => {}
    const wrapper = mount(BookShow, {
      localVue,
      propsData: {
        book: expected,
      },
      mocks: {
        $t,
      },
    })

    expect(wrapper.props('book')).toEqual(expected)
    expect(wrapper.find('h2').text()).toBe(expected.title)
  })
})
