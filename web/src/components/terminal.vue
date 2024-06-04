<template>
  <div class="app-container">
    <el-button class="btn" type="primary" @click="addTerm">连接服务</el-button>
    <el-button class="btn" type="primary" @click="delTerm">关闭连接</el-button>
    <el-button class="btn" type="primary" @click="gobackhome">返回</el-button>
    <div style="margin-top:15px; padding-left: 10px; padding-right: 10px" class="termbox"></div>
  </div>
</template>

<script>
import "xterm/css/xterm.css";
import io from "socket.io-client";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";


export default {
  name: "WebShell",
  props: {
    CVE: { 
      type: String, 
      default: "", 
    },
  },
  data() {
    return {
      term: null,
      fitAddon: null,
      socket: null,
      isConnected: false, // 新增状态变量
    };
  },
  methods: {
    addTerm() {
      // 如果已经连接，则先断开连接
      if (this.isConnected) {
        this.hasconnect();
        return
      }

      // 创建新的终端实例
      this.term = new Terminal({
        cursorBlink: true,
        scrollback: 50,
      });
      this.fitAddon = new FitAddon();
      this.term.loadAddon(this.fitAddon);
      const termbox = document.querySelector(".termbox");
      termbox.innerHTML = '';
      termbox.style.height = "calc(90vh - 50px)";
      this.term.open(termbox);
      this.fitAddon.fit();
      this.term.focus();
      // socket.on()方法 和 socket.emit()在前后端是成对出现的，通过监听的标识符来显示不同模块的数据，就不用一个页面利用多个ws了。
      // socket.emit()用于向服务端（后端）发送数据, 第一个参数为监听的标识
      this.socket.emit("createNewServer", {
        msgId: "termbox",
        CVEid: this.CVE,
        cols: 100,
        rows: 20
      });
      // 只要有键入 就会触发该事件
      this.term.onData((data) => {
        this.socket.emit("termbox", data);
      });
      // socket.on()用于监听获取服务端（后端）发送过来的数据, 第一个参数为监听的标识
      this.socket.on("termbox", (data) => {
        this.term.write(data)
      });
      window.addEventListener(
        "resize",
        () => {
          this.fitAddon.fit();
          this.socket.emit("resize", {
            cols: 100,
            rows: 20,
          });
        },
        false
      );
      // 设置连接状态为true
      this.isConnected = true;
    },
    // S2VulnHub
    hasconnect() {
    console.log('已经连接了')
    },

    delTerm() {
      
      if (this.socket) {
        this.socket.disconnect();
        console.log('断开连接');
        this.socket = null;
      }

      this.term = null;

      const termbox = document.querySelector(".termbox");
      if (termbox) {
        termbox.innerHTML = '';
      }

      this.isConnected = false;

      this.socket = io("http://154.197.56.22:3000");
    },
    gobackhome() {
      this.delTerm();
      this.$router.push("/search");
    },
  },
  mounted() {
    this.socket = io("http://154.197.56.22:3000");
    this.socket.on("serverClosed", (data) => {
      console.log("serverClosed", data);
      const termbox = document.querySelector(".termbox");
      if (termbox) {
        termbox.innerHTML = '';
      }

      this.isConnected = false;

      this.socket = io("http://154.197.56.22:3000");
    })
  }
};
</script>

 <style scoped>
 .btn{
  font-size: 16px;
 }
 </style>