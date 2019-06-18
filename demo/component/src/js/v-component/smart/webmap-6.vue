<template>
<div class="card">
    <div class="card-header">
        <div class="card-title h5">实时路况图展示</div>
    </div>
    <div class="card-image">
        <div class="webmap" id="webmap-6"></div>
    </div>
    <div class="card-body">
        <div>point = {{point}}</div>
        <div class="m-t btn btn-primary btn-block" @click="showTrafficControl">显示实时路况</div>
        <div class="m-t btn btn-primary btn-block" @click="hideTrafficControl">隐藏实时路况</div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            webMap: null,
            marker: null,
            point: null,
            address: '广州市天河区天河路230号万菱汇国际中心',
            trafficControl: null,
        };
    },
    mounted() {
        this.initWebmap();
    },
    methods: {
        initWebmap() {
            this.webMap = new window.BMap.Map('webmap-6');
            this.getPointByAddress(this.address).then(point => {
                this.point = point;
                this.webMap.centerAndZoom(point, 16);
                this.marker = new window.BMap.Marker(point);
                this.webMap.addOverlay(this.marker);

                this.trafficControl = new window.BMapLib.TrafficControl();
                this.webMap.addControl(this.trafficControl);
                this.trafficControl.setAnchor(window.BMAP_ANCHOR_BOTTOM_RIGHT);
            }).catch(err => {
                console.error(err.message || err);
                alert(err.message || err);
            });
        },
        showTrafficControl() {
            this.trafficControl.showTraffic();
        },
        hideTrafficControl() {
            this.trafficControl.hideTraffic();
        },
        getPointByAddress(address) {
            return new Promise((resolve, reject) => {
                let geo = new window.BMap.Geocoder();
                geo.getPoint(address, point => {
                    if (point) {
                        resolve(point);
                    } else {
                        reject('输入的地址无法被解析!');
                    }
                });
            });
        },
    },
};
</script>

<style scoped lang="scss">
</style>