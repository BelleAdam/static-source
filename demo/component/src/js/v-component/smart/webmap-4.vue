<template>
<div class="card">
    <div class="card-header">
        <div class="card-title h5">全景图展示</div>
    </div>
    <div class="card-image">
        <div class="webmap" id="webmap-4"></div>
    </div>
    <div class="card-body">
        <div>address = {{address}}</div>
        <div>point = {{point}}</div>
        <div class="form-horizontal">
            <div class="form-group">
                <div class="col-12">
                    <label class="form-switch">
                        <input type="checkbox" @change="switchPanoramicCtr">
                        <i class="form-icon"></i> 在地图上显示全景图控件
                    </label>
                </div>
            </div>
            <div class="form-group">
                <div class="col-12">
                    <label class="form-switch">
                        <input type="checkbox" @change="switchPanoramicLayer">
                        <i class="form-icon"></i> 在地图上显示全景图图层
                    </label>
                </div>
            </div>
            <div class="form-group">
                <div class="col-12">
                    <label class="form-label">POI 显示</label>
                </div>
                <div class="col-12">
                    <label class="form-radio">
                        <input type="radio" name="poi-type" value="BMAP_PANORAMA_POI_HOTEL" v-model="poiType" @change="switchPOI">
                        <i class="form-icon"></i> 显示酒店
                    </label>
                    <label class="form-radio">
                        <input type="radio" name="poi-type" value="BMAP_PANORAMA_POI_CATERING" v-model="poiType" @change="switchPOI">
                        <i class="form-icon"></i> 显示餐厅
                    </label>
                    <label class="form-radio">
                        <input type="radio" name="poi-type" value="BMAP_PANORAMA_POI_NONE" v-model="poiType" @change="switchPOI">
                        <i class="form-icon"></i> 不显示任何 POI
                    </label>
                </div>
            </div>
        </div>
        <!-- <div class="m-t btn btn-primary btn-block" @click="openPanoramic">根据坐标进入全景图</div>
        <div class="m-t btn btn-primary btn-block" @click="closePanoramic">关闭全景图</div> -->
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
            panoramic: null,                         // 全景图实例
            panoramicData: null,                     // 当前全景图的数据
            panoramicId: '',                         // 全景图 ID
            panoramicCtr: null,                      // 全景图控件实例
            panoramicLayer: null,                    // 全景图图片实例
            isPanoramicMode: false,                  // 是否进入了全景图模式
            poiType: '',
        };
    },
    mounted() {
        this.initWebmap();
    },
    methods: {
        initWebmap() {
            this.webMap = new window.BMap.Map('webmap-4');
            this.getPointByAddress(this.address).then(point => {
                this.point = point;
                this.webMap.centerAndZoom(point, 16);
                this.marker = new window.BMap.Marker(point);
                this.webMap.addOverlay(this.marker);
                this.panoramic = this.webMap.getPanorama();

                this.panoramic.addEventListener('position_changed', (e) => {
                    console.log('position_changed');
                    this.point = this.panoramic.getPosition();
                });
            }).catch(err => {
                console.error(err.message || err);
                alert(err.message || err);
            });
        },
        switchPanoramicCtr(e) {
            let isCheck = e.target.checked;
            if (isCheck) {
                if (!this.panoramicCtr) {
                    this.panoramicCtr = new window.BMap.PanoramaControl();
                    this.panoramicCtr.setOffset(new window.BMap.Size(20, 20));
                    this.webMap.addControl(this.panoramicCtr);
                }
                this.panoramicCtr.show();
            } else {
                this.panoramicCtr.hide();
            }
        },
        switchPanoramicLayer(e) {
            let isCheck = e.target.checked;
            if (isCheck) {
                this.panoramicLayer = new window.BMap.PanoramaCoverageLayer();
                this.webMap.addTileLayer(this.panoramicLayer);
            } else {
                this.webMap.removeTileLayer(this.panoramicLayer);
            }
        },
        switchPOI(e) {
            let isCheck = e.target.checked;
            let type = this.poiType;
            if (isCheck) {
                this.panoramic.setPanoramaPOIType(window[type]);
            } else {
                this.panoramic.setPanoramaPOIType(window.BMAP_PANORAMA_POI_NONE);
            }
        },
        openPanoramic() {
            this.panoramic.setPosition(this.point);
        },
        closePanoramic() {
            this.panoramic.hide();
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