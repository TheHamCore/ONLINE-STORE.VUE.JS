<template>
  <div class="popup_wrapper" ref="popup_wrapper">
    <div class="v-popup">
      <div class="v-popup__header">
        <span>{{poput_title}}</span>
        <span>
          <i 
            class="material-icons"
            @click="close_popup"
          >
            close
          </i>
        </span>
      </div>

      <div class="v-popup__content">
        <slot></slot>  
      </div>

      <div class="v-popup__footer">
        <button 
          class="close_modal"
          @click="close_popup"
        >
          Close
        </button>
        
        <button 
          class="submit_btn"
          @click="click_on_add_btn"
        >
          {{right_btn_title}}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'v-popup',
  props: {
    right_btn_title: {
      type:String,
      default() {
        return 'Oк'
      }
    },
    poput_title: {
      type:String,
      default() {
        return 'Popup name'
      }
    }
  },
  data() {
    return {}
  },
  methods:{
    close_popup() {
      this.$emit('close_popup')
    },
    click_on_add_btn() {
      this.$emit('click_on_add_btn')
    }
  },
  mounted() {
    let vm = this;
    document.addEventListener('click', function(item) {
      if(item.target === vm.$refs['popup_wrapper']) {
        vm.close_popup();
      }
    })
  }
}
</script>

<style lang="scss">
    .popup_wrapper {
    background: rgba(64,64,64, .4);
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
  }
  .v-popup {
    margin: 0 auto;
    margin-top: 150px;
    width: 400px;
    background: #ffffff;
    box-shadow: 0 0 17px 0 #e7e7e7;
    z-index: 10;
    &__header, &__footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &__content {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .submit_btn {
      padding: 8px;
      color: #ffffff;
      background: #26ae68;
    }
    .close_modal {
      padding: 8px;
      color: #ffffff;
      background: red;
    }
  }
</style>
