<template>
<div class="card">
    <div class="card-header">
        <div class="card-title h5">地图定位 (AutoComplete)</div>
    </div>
    <div class="card-image">
        <div class="webmap" id="webmap-1"></div>
    </div>
    <div class="card-body">
        <div>根据地址在地图上定位并显示标注, 允许进行一些简单的操作.</div>
        <div>address = {{address}}</div>
        <div>point = {{point}}</div>
        <div class="form-horizontal">
            <div class="form-group">
                <div class="col-12">
                    <label for="input-address" class="form-label">地址</label>
                </div>
                <div class="col-12">
                    <input type="text" class="form-input" id="input-address" v-model="address">
                </div>
            </div>
        </div>
        <div class="m-t btn btn-primary btn-block" @click="locateByAddress(address)">解析输入的地址的坐标并定位到地图上</div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            webMap: null,
            point: '',
            searchModal1: null,
            marker: null,
            address: '广州市天河区天河路230号万菱汇国际中心',
        };
    },
    mounted() {
        this.initWebmap();
    },
    methods: {
        initWebmap() {
            this.webMap = new window.BMap.Map('webmap-1');
            this.locateByAddress(this.address);
            this.initAutoComplete();
        },
        initAutoComplete() {
            let autoComplete = new window.BMap.Autocomplete({
                'input': 'input-address',
                'location': this.webMap,
            });
            autoComplete.addEventListener('onconfirm', e => {
                let info = e.item.value;
                this.address = info.province + info.city + info.district + info.street + info.business;
                this.locateByAddress(this.address);
            });
        },
        locateByAddress(address) {
            this.getPointByAddress(address).then(point => {
                this.webMap.centerAndZoom(point, 16);
                this.point = point;
                return new window.BMap.InfoWindow(this.address);
            }).then(descModal => {
                this.marker = new window.BMap.Marker(this.point);
                this.webMap.addOverlay(this.marker);
                this.marker.addEventListener('click', () => {
                    this.marker.openInfoWindow(descModal);
                });
                this.marker.openInfoWindow(descModal);
            }).catch(err => {
                console.error(err.message || err);
                alert(err.message || err);
            });
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