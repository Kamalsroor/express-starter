<template>
  <!-- BEGIN: Dark Mode Switcher-->
	<div class="form-group">
    <label for="exampleFormControlInput1">Font awesome icon :</label>
    <input ref="picker" v-model="search" @blur="blur" @focus="focus" type="email" class="form-control" id="exampleFormControlInput1" placeholder="Search an icon">
    <transition name="icon-preview-fade">
      <div v-if="focusOn" class="preview-container">
        <div @click="select(undefined)" @mouseover="hoverPanel = true" @mouseout="hoverPanel = false" :class="['previewer', 'rounded', {'custom-shadow-sm': !hoverPanel}, {'custom-shadow': hoverPanel} ]">
          <div v-for="(i, index) in iconsFiltered" :key="index" class="icon-preview">
            <div @click.prevent.stop="select(i)" :class="['icon-wrapper','rounded','shadow-sm', {selected: i.title == selected}]" >
              <i :class="i.title" />
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
  <!-- END: Dark Mode Switcher-->
</template>
<script>


export default {

  props: ['value'],
  data: function () {
    return {
      focusOn: true, // <- set this to false
      icons: [],
      hoverPanel: false,
      timeout: undefined,
      search: "",
      beforeSelect: "",
      selected: "" };

  },
  beforeMount() {
    this.search = this.value;
  },
  watch: {
    search: function (newValue) {
      this.$emit('input', newValue);
    } },

  methods: {
    blur() {
      this.timeout = setTimeout(() => {
        this.focusOn = false;
      }, 150);
    },
    focus() {
      this.focusOn = true;
    },
    select(icon) {
      clearTimeout(this.timeout);
      if (icon) {
        if (this.search != this.selected) this.beforeSelect = this.search;
        this.selected = icon.title;
        this.search = icon.title;
      }
      this.$refs.picker.focus();
    } },

  computed: {
    iconsFiltered: function () {
      const search = this.search == this.selected ? this.beforeSelect : this.search;
      return this.icons.filter((i) =>
      i.title.indexOf(search) !== -1 || i.searchTerms.some(t => t.indexOf(search) !== -1));

    } }
};
</script>