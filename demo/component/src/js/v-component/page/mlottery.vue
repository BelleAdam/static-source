<template>
<div>
    <h1>mlottery demo</h1>
    <div class="lottery">
        <div id="prize-item-1" class="item item--1">
            <div class="item__txt">奖品1</div>
        </div>
        <div id="prize-item-2" class="item item--2">
            <div class="item__txt">奖品2</div>
        </div>
        <div id="prize-item-3" class="item item--3">
            <div class="item__txt">奖品3</div>
        </div>
        <div id="prize-item-4" class="item item--4">
            <div class="item__txt">奖品8</div>
        </div>
        <div id="lottery-btn" class="lbtn" @click="startLottery"></div>
        <div id="prize-item-5" class="item item--5">
            <div class="item__txt">奖品4</div>
        </div>
        <div id="prize-item-6" class="item item--6">
            <div class="item__txt">奖品7</div>
        </div>
        <div id="prize-item-7" class="item item--7">
            <div class="item__txt">奖品6</div>
        </div>
        <div id="prize-item-8" class="item item--8">
            <div class="item__txt">奖品5</div>
        </div>
    </div>
    <button @click="cancelLottery">Cancel</button>
</div>
</template>

<script>
import MLottery from 'fe-core/lib/mlottery';

export default {
  data() {
    return {
      mlottery: null,
    };
  },
  mounted() {
    let prizeItem = ['1', '2', '3', '5', '8', '7', '6', '4'].map((item, index) => {
      return {
        selector: `prize-item-${item}`,
        position: index + 1,
      };
    });
    let option = {
      prizeItem: prizeItem,
      activedClass: 'active',
      delayDone: 2000,
      done: info => {
        alert('done');
        console.log('done', info);
      },
      fail: err => {
        console.log('fail', err);
      },
      // drawURL: '//act.mama.cn/api/lottery/index/draw/appkey/act.mama.cn/id/drewdrKong/t/1517901912/verify/CC7BA57F5256E2285411467EDC068FAA'
    };
    this.mlottery = new MLottery(option);
  },
  methods: {
    startLottery() {
      this.mlottery.start();
      setTimeout(() => {
        this.mlottery.setPrizePosition(5);
      }, 1000);
    },
    cancelLottery() {
      this.mlottery.cancel();
    },
  },
};
</script>

<style scoped="" lang="scss">
@import '~scss/vue';
.lottery {
  background: assetsURL('img/mlottery-bg.png') no-repeat;
  width: 639px;
  height: 580px;
  padding: 42px 35px 62px;
  margin: 50px auto;
  .item {
    width: 186px;
    height: 156px;
    display: inline-block;
    background: assetsURL('img/mlottery-item-bg.png') no-repeat;
    position: relative;
    &.active {
      &::before {
        width: 186px;
        height: 156px;
        background: #df6336;
        opacity: 0.5;
        content: '';
        position: absolute;
        top: 0;
        left: 0;
      }
    }
    &__txt {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      font-size: 30px;
    }
  }
  .lbtn {
    width: 186px;
    height: 156px;
    display: inline-block;
    background: assetsURL('img/mlottery-btn-start.png') no-repeat;
  }
}
</style>
