import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import FormInput from './FormInput.vue';

describe('FormInput', () => {
  it('renders some errors', () => {
    const wrapper = mount(FormInput, {
      props: {
        name: 'foo',
        modelValue: 'bar',
        status: {
          valid: false,
          message: 'error',
        },
        type: 'input',
      },
    });
    // console.log(wrapper.html());
    expect(wrapper.find('.is-danger').exists()).toBe(true);
  });

  it('renders no errors', () => {
    const wrapper = mount(FormInput, {
      props: {
        name: 'foo',
        modelValue: 'bar',
        status: {
          valid: true,
          message: 'error',
        },
        type: 'input',
      },
    });
    // console.log(wrapper.html());
    expect(wrapper.find('.is-danger').exists()).toBe(false);
  });
});
