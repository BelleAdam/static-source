export default {
  created: function() {
    this.hello();
  },
  methods: {
    hello: function() {
      console.log('mixin 使用演示：hello from mixin!');
    },
  },
};
