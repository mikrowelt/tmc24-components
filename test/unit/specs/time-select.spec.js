import { createTest, createVue, destroyVM } from '../util';
import TimeSelect from 'packages/time-select';
import Vue from 'vue';

describe('TimeSelect', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('should render correct contents', done => {
    vm = createTest(TimeSelect, {
      pickerOptions: {
        start: '08:30',
        step: '00:15',
        end: '18:30'
      },
      placeholder: 'test'
    }, true);
    const input = vm.$el.querySelector('input');

    input.focus();
    input.blur();

    Vue.nextTick(() => {
      expect(vm.picker.start).to.equal('08:30');
      expect(vm.picker.end).to.equal('18:30');
      expect(vm.picker.step).to.equal('00:15');
      expect(vm.$el.querySelector('input').getAttribute('placeholder')).to.equal('test');
      done();
    });
  });

  it('select time', done => {
    vm = createVue({
      template: `
        <div>
          <tm-time-select ref="compo" v-model="value">
          </tm-time-select>
        </div>
      `,

      data() {
        return {
          value: ''
        };
      }
    }, true);
    const input = vm.$el.querySelector('input');

    input.focus();
    input.blur();

    Vue.nextTick(() => {
      const items = vm.$refs.compo.picker.$el.querySelectorAll('.time-select-item');
      const target = items[4];
      const time = target.textContent;

      target.click();
      Vue.nextTick(() => {
        expect(vm.value).to.equal(time);
        done();
      });
    });
  });

  it('set default value', done => {
    vm = createTest(TimeSelect, {
      value: '14:30'
    }, true);
    const input = vm.$el.querySelector('input');

    input.focus();
    input.blur();

    setTimeout(() => {
      expect(input.value).to.equal('14:30');
      expect(vm.picker.$el.querySelector('.selected')).to.be.ok;
      expect(vm.picker.$el.querySelector('.selected').textContent).to.equal('14:30');
      done();
    }, 50);
  });

  it('set minTime', done => {
    vm = createVue(`
      <tm-time-select
        ref="picker"
        :picker-options="{
          minTime: '14:30'
        }">
      </tm-time-select>
    `, true);
    const input = vm.$el.querySelector('input');
    const picker = vm.$refs.picker;

    input.focus();
    input.blur();

    setTimeout(() => {
      const elms = picker.picker.$el.querySelectorAll('.disabled');
      const elm = elms[elms.length - 1];

      expect(elm.textContent).to.equal('14:30');
      done();
    }, 50);
  });

  it('minTime < value', done => {
    vm = createVue({
      template: `
        <tm-time-select
          ref="picker"
          v-model="value"
          :picker-options="{
            minTime: '14:30'
          }">
        </tm-time-select>
      `,
      data() {
        return { value: '09:30' };
      }
    }, true);
    const input = vm.$el.querySelector('input');
    const picker = vm.$refs.picker;

    input.focus();
    input.blur();

    setTimeout(() => {
      vm.value = '10:30';

      setTimeout(() => {
        expect(picker.picker.value).to.equal('10:30');
        done();
      }, 50);
    }, 50);
  });

  it('set maxTime', done => {
    vm = createVue(`
      <tm-time-select
        ref="picker"
        :picker-options="{
          maxTime: '14:30',
          step: '00:30'
        }">
      </tm-time-select>
    `, true);
    const input = vm.$el.querySelector('input');
    const picker = vm.$refs.picker;

    input.focus();
    input.blur();

    setTimeout(() => {
      const elm = picker.picker.$el.querySelector('.disabled');

      expect(elm.textContent).to.equal('14:30');
      done();
    }, 50);
  });

  it('maxTime > value', done => {
    vm = createVue({
      template: `
        <tm-time-select
          ref="picker"
          v-model="value"
          :picker-options="{
            maxTime: '14:30'
          }">
        </tm-time-select>
      `,
      data() {
        return { value: '09:30' };
      }
    }, true);
    const input = vm.$el.querySelector('input');
    const picker = vm.$refs.picker;

    input.focus();
    input.blur();

    setTimeout(() => {
      vm.value = '10:30';

      setTimeout(() => {
        expect(picker.picker.value).to.equal('10:30');
        done();
      }, 50);
    }, 50);
  });

  it('event focus and blur', done => {
    vm = createVue({
      template: `
        <tm-time-select
          ref="picker"
          :picker-options="{
            start: '08:30',
            step: '00:15',
            end: '18:30'
          }"
          placeholder="选择时间">
        </tm-time-select>
      `
    }, true);

    const spyFocus = sinon.spy();
    const spyBlur = sinon.spy();

    vm.$refs.picker.$on('focus', spyFocus);
    vm.$refs.picker.$on('blur', spyBlur);
    vm.$el.querySelector('input').focus();

    vm.$nextTick(() => {
      expect(spyFocus.calledOnce).to.be.true;
      vm.$refs.picker.pickerVisible = false;
      vm.$nextTick(() => {
        expect(spyBlur.calledOnce).to.be.true;
        done();
      });
    });
  });

  it('focus', done => {
    vm = createVue({
      template: `
        <tm-time-select ref="picker"></tm-time-select>
      `
    }, true);

    const spy = sinon.spy();

    vm.$refs.picker.$on('focus', spy);
    vm.$refs.picker.focus();

    vm.$nextTick(() => {
      expect(spy.calledOnce).to.be.true;
      done();
    });
  });
});
