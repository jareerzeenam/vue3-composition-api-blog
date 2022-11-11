import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { computed, defineComponent, ref } from 'vue';
import FormInput from './FormInput.vue';

describe('FormInput', () => {
  it('test validation', async () => {
    const Parent = defineComponent({
      components: { FormInput },
      // template: `
      // <FormInput
      //   name="foo"
      //   type="input"
      //   :status="status"
      //   v-model="formValue"
      // />
      // `,
      setup() {
        const formValue = ref('foo');
        const status = computed(() => {
          if (formValue.value.length > 5) {
            return {
              valid: true,
            };
          } else {
            return {
              valid: false,
              message: 'error',
            };
          }
        });

       return() => (
        <FormInput
        name="foo"
          type="input"
          status={status.value}
          v-model={formValue.value}
        />
       )
      },
    });

    const wrapper = mount(Parent);

    expect(wrapper.find('.is-danger').text()).toBe('error');

    // console.log(wrapper.html());
    await wrapper.find('input').setValue('foobar');
    // console.log(wrapper.html());

    expect(wrapper.find('.is-danger').exists()).toBe(false);
  });
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