<template>
  <div class="popup_wrapper" ref="popup_wrapper">
    <div class="v-popup">
      <div class="v-popup__header">
        <span>{{poputTitle}}</span>
        <span>
          <i 
            class="material-icons"
            @click="closePopup"
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
          @click="closePopup"
          >
          Close
        </button>
        <button 
          class="submit_btn"
          @click="clickOnAddButton"
          >
          {{rightBtnTitle}}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'v-popup',
  props: {
    rightBtnTitle: {
      type:String,
      default() {
        return 'Oк'
      }
    },
    poputTitle: {
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
    closePopup() {
      this.$emit('closePopup')
    },
    clickOnAddButton() {
      this.$emit('clickOnAddButton')
    }
  },
  mounted() {
    let vm = this;
    document.addEventListener('click', function(item) {
      if(item.target === vm.$refs['popup_wrapper']) {
        vm.closePopup();
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
