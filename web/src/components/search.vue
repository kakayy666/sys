<template>
  <div class="search-warp" v-if="!className">
    <div class="search-content">
      <img src="../assets/search.png" alt="" class="search-icon" @click="submitForm($event)">
      <form @submit.prevent="submitForm($event)" class="search-width-fill">
        <input type="search" :placeholder="placeholder" class=" search-input-gray" ref="input" >
      </form>
      <img src="../assets/clear.png" alt="" class="search-clear" @click="clear" v-if="isShow">
    </div>
  </div>
</template>
<script>

export default {
  name: "ElSearch",
  data() {
    return {
      isShow: false
    }
  },
  props: {
    placeholder: {
      type: String,
      default: "请输入搜索信息"
    },
    className: {
      type: String,
      default: ""
    },
  },
  methods: {
    change(e) {
      this.$emit('on-click', this.$refs.input.value);
      if (e.target.value) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    },
    // change: debounce(function (e) {
    //     this.$emit('on-click', this.$refs.input.value);
    //     if (e.target.value) {
    //         this.isShow = true;
    //     } else {
    //         this.isShow = false;
    //     }
    // }, 300),
    clear() {
      this.$refs.input.value = "";
      this.$emit('on-click', this.$refs.input.value);
      this.isShow = false;
    },
    submitForm() {
      // this.$refs.input.blur();
      this.$emit('on-click', this.$refs.input.value);//将点击搜索的事件暴露给父组件
    }
  }

}
</script>
<style scoped>
input[type="search"] {
  -webkit-appearance: none;
}

input::-webkit-search-cancel-button {
  display: none;
}

.search-warp {
  padding: 10px;
}


.search-input {
  background: #fff;
  width: 100%;
  height: 35px;
  padding: 10px 10px 10px 35px;
  /* border-radius: 20px; */
  margin: 10px 0;
  font-size: 15px;
}

.search-input-gray {
  background: #eee;
  width: 100%;
  height: 35px;
  /* border-radius: 20px; */
  padding: 10px 10px 10px 35px;
  /* margin: 10px 0; */
  font-size: 15px;
}

.search-input::-webkit-input-placeholder {
  color: #bbbbbb;
}

.search-content {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  width: 20px;
  position: absolute;
  left: 10px;
  cursor: pointer;
}

.search-clear {
  position: absolute;
  width: 20px;
  right: 10px;
  cursor: pointer;
}

.search-width-fill {
  width: inherit;
}
</style>