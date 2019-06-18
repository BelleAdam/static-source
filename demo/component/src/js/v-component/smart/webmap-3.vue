<template>
<div class="card">
    <div class="card-header">
        <div class="card-title h5">步行检索, 公交检索, 驾车检索</div>
    </div>
    <div class="card-image">
        <div class="webmap" id="webmap-3"></div>
    </div>
    <div class="card-body">
        <div>fromAddress = {{fromAddress}}</div>
        <div>toAddress = {{toAddress}}</div>
        <div>fromPoint = {{fromPoint}}</div>
        <div>toPoint = {{toPoint}}</div>
        <div class="form-horizontal">
            <div class="form-group">
                <div class="col-12">
                    <label for="input-from" class="form-label">出发地</label>
                </div>
                <div class="col-12">
                    <input type="text" class="form-input" id="input-from" v-model="fromAddress">
                </div>
            </div>
            <div class="form-group">
                <div class="col-12">
                    <label for="input-to" class="form-label">目的地</label>
                </div>
                <div class="col-12">
                    <input type="text" class="form-input" id="input-to" v-model="toAddress">
                </div>
            </div>
            <div class="form-group">
                <div class="col-12">
                    <label class="form-label">交通方式</label>
                </div>
                <div class="col-12">
                    <label class="form-radio">
                        <input type="radio" name="traffic" value="1" v-model="trafficType" @change="traffic">
                        <i class="form-icon"></i> 步行
                    </label>
                    <label class="form-radio">
                        <input type="radio" name="traffic" value="2" v-model="trafficType" @change="traffic">
                        <i class="form-icon"></i> 公交
                    </label>
                    <label class="form-radio">
                        <input type="radio" name="traffic" value="3" v-model="trafficType" @change="traffic">
                        <i class="form-icon"></i> 驾车
                    </label>
                </div>
            </div>
        </div>
        <div class="m-t btn btn-primary btn-block" @click="traffic">开始检索</div>
        <div class="m-t btn btn-primary btn-block" @click="drawLine">在地图上绘制路线图</div>
        <div class="m-t" id="traffic-result"></div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            webMap: null,
            fromAddress: '广州市荔湾区中山七路紫贵坊',
            toAddress: '广州市天河区天河路230号万菱汇国际中心',
            fromPoint: null,
            toPoint: null,
            trafficType: 1,    // 1: 步行, 2: 公交, 3: 驾车
            trafficIns: null,
        };
    },
    mounted() {
        this.initWebmap();
    },
    methods: {
        initWebmap() {
            this.webMap = new window.BMap.Map('webmap-3');
            this.getPointByAddress(this.toAddress).then(point => {
                this.point = point;
                this.webMap.centerAndZoom(point, 16);
                this.marker = new window.BMap.Marker(point);
                this.webMap.addOverlay(this.marker);
                this.traffic(1);
            }).catch(err => {
                console.error(err.message || err);
                alert(err.message || err);
            });
        },
        traffic() {
            console.log('this.trafficType =', this.trafficType);
            this.webMap.clearOverlays();
            if (this.trafficType == 1) {
                this.trafficIns = new window.BMap.WalkingRoute(this.webMap, {
                    onSearchComplete: result => {
                        let startInfo = result.getStart();
                        let endInfo = result.getEnd();
                        this.fromPoint = startInfo.point;
                        this.fromAddress = startInfo.title;
                        this.toPoint = endInfo.point;
                        this.toAddress = endInfo.title;
                    },
                    renderOptions: {
                        map: this.webMap,
                        panel: 'traffic-result',
                        autoViewport: true,
                        enableDragging: true,
                    }
                });
                this.trafficIns.search(this.fromAddress, this.toAddress);
            } else if (this.trafficType == 2) {
                this.trafficIns = new window.BMap.TransitRoute(this.webMap, {
                    renderOptions: {
                        map: this.webMap,
                        panel: 'traffic-result',
                    }
                });
                this.trafficIns.search(this.fromAddress, this.toAddress);
            } else if (this.trafficType == 3) {
                this.trafficIns = new window.BMap.DrivingRoute(this.webMap, {
                    renderOptions: {
                        map: this.webMap,
                        panel: 'traffic-result',
                        autoViewport: true,
                    }});
                this.trafficIns.search(this.fromAddress, this.toAddress);
            } else {
                console.warn('未知的交通方式');
            }
        },
        drawLine() {
            let plan = this.trafficIns.getResults().getPlan(0);
            let planNum = this.trafficIns.getResults().getNumPlans();
            let routeNum = plan.getNumRoutes();

            console.log('routeNum =', routeNum);
            console.log('plan =', plan);
            console.log('planNum =', planNum);

            for (let i = 0; i < routeNum; i ++) {
                let route = plan.getRoute(i);

                console.log('route.getDistance(false) =', route.getDistance(false));
                console.log('route.getRouteType() =', route.getRouteType());

                if (route.getDistance(false) <= 0) continue;
                if (route.getRouteType() == window.BMAP_ROUTE_TYPE_DRIVING) {
                    this.webMap.addOverlay(new window.BMap.Polyline(route.getPath(), {
                        strokeColor: '#000',
                        strokeOpacity: 0.75,
                        strokeWeight: 6,
                        enableMassClear: true,
                    }));
                } else {
                    this.webMap.addOverlay(new window.BMap.Polyline(route.getPath(), {
                        strokeColor: '#000',
                        strokeOpacity: 0.75,
                        strokeWeight: 4,
                        enableMassClear: true,
                    }));
                }
            }
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