<template>
<div class="card">
    <div class="card-header">
        <div class="card-title h5">热力图展示</div>
    </div>
    <div class="card-image">
        <div class="webmap" id="webmap-5"></div>
    </div>
    <div class="card-body">
        <div>point = {{point}}</div>
        <div class="m-t btn btn-primary btn-block" @click="openHeatmap">显示热力图</div>
        <div class="m-t btn btn-primary btn-block" @click="closeHeatmap">关闭热力图</div>
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
            heatMap: null,
        };
    },
    mounted() {
        this.initWebmap();
    },
    methods: {
        initWebmap() {
            this.webMap = new window.BMap.Map('webmap-5');
            this.getPointByAddress(this.address).then(point => {
                this.point = point;
                this.webMap.centerAndZoom(point, 16);
                this.marker = new window.BMap.Marker(point);
                this.webMap.addOverlay(this.marker);

                this.webMap.addEventListener('click', e => {
                    console.log('抓取坐标', e.point);
                });

                this.heatMap = new window.BMapLib.HeatmapOverlay({
                    'radius': 20,
                });
                this.webMap.addOverlay(this.heatMap);
                this.heatMap.setDataSet({
                    data: [
                        { 'lng': 113.336933, 'lat': 23.138377, 'count': 90 },
                        { 'lng': 113.339574, 'lat': 23.138377, 'count': 70 },
                        { 'lng': 113.336699, 'lat': 23.13738, 'count': 65 },
                        { 'lng': 113.337706, 'lat': 23.138311, 'count': 100 },
                        { 'lng': 113.339727, 'lat': 23.138327, 'count': 80 },
                    ],
                    max: 100,
                });
            }).catch(err => {
                console.error(err.message || err);
                alert(err.message || err);
            });
        },
        openHeatmap() {
            this.heatMap.show();
        },
        closeHeatmap() {
            this.heatMap.hide();
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