import { mount, createLocalVue } from '@vue/test-utils'
import Image from './../../../src/components/book/Image'
import VueCompositionApi from '@vue/composition-api'
import components from '@baldeweg/components'

const localVue = createLocalVue()
localVue.use(VueCompositionApi)
localVue.use(components)

describe('Image', () => {
  it('shows the image', () => {
    const expected = { name: 'name' }
    const $t = () => {}
    const wrapper = mount(Image, {
      localVue,
      propsData: {
        book: expected,
      },
      mocks: {
        $t,
      },
    })

    expect(wrapper.props('book')).toEqual(expected)
    expect(wrapper.find('section').exists()).toBeTruthy()
  })
})
