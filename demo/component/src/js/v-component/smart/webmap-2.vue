<template>
<div class="card">
    <div class="card-header">
        <div class="card-title h5">根据关键词检索附近区域</div>
    </div>
    <div class="card-image">
        <div class="webmap" id="webmap-2"></div>
    </div>
    <div class="card-body">
        <div>keyword = {{keyword}}</div>
        <div>range = {{range}}</div>
        <div class="form-horizontal">
            <div class="form-group">
                <div class="col-12">
                    <label for="input-keyword" class="form-label">关键词</label>
                </div>
                <div class="col-12">
                    <input type="text" class="form-input" id="input-keyword" v-model="keyword">
                </div>
                <div class="col-12">
                    <label for="input-range" class="form-label">范围</label>
                </div>
                <div class="col-12">
                    <input type="text" class="form-input" id="input-range" v-model="range">
                </div>
            </div>
        </div>
        <div class="m-t btn btn-primary btn-block" @click="search">根据关键词检索附近区域</div>
        <div class="m-t" id="search-result"></div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            webMap: null,
            keyword: '餐厅',
            range: 500,
            address: '广州市天河区天河路230号万菱汇国际中心',
            point: null,
            marker: null,
        };
    },
    mounted() {
        this.initWebmap();
    },
    methods: {
        initWebmap() {
            this.webMap = new window.BMap.Map('webmap-2');
            this.getPointByAddress(this.address).then(point => {
                this.point = point;
                this.webMap.centerAndZoom(point, 16);
                this.marker = new window.BMap.Marker(point);
                this.webMap.addOverlay(this.marker);
            }).then(() => {
                this.search();
            }).catch(err => {
                console.error(err.message || err);
                alert(err.message || err);
            });
        },
        search() {
            this.webMap.clearOverlays();
            this.webMap.addOverlay(this.marker);
            let circle = new window.BMap.Circle(this.point, this.range, {
                fillColor: 'blue',
                strokeWeight: 1,
                fillOpacity: 0.3,
                strokeOpacity: 0.3,
            });
            let localSearch =  new window.BMap.LocalSearch(this.webMap, {
                renderOptions: {
                    map: this.webMap,
                    autoViewport: false,
                    panel: 'search-result',
                    selectFirstResult: false,
                }
            });
            this.webMap.addOverlay(circle);
            localSearch.searchNearby(this.keyword, this.point, this.range);
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