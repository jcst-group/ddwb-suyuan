<template>
	<div id="parent">
		<div class="header" ref="header">
			<div class="return" @click="getBack">
				<img src="../assets/images/left.png" /> 返回
			</div>
		</div>
		<div id="container" :style="{height:containerHeight+'rem'}"></div>
		<div class="exhibition">
			<div class="name">{{baseMsg.baseName}}</div>
			<div class="site">
				<span>经度: {{baseMsg.longitude}}</span>
				<span>纬度: {{baseMsg.latitude}}</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				containerHeight: '',
				baseMsg:{},
				batchId:''
			}
		},
		methods: {
			getBack() {
				this.$router.go(-1)
			},
			getBaseMsg() {
				AMap.plugin('AMap.CitySearch', () => {
					var citySearch = new AMap.CitySearch()
					citySearch.getLocalCity((status, result) => {
						if(status === 'complete' && result.info === 'OK') {
							if (this.batchId) {
								this.$http.get('/api/proTraceability/getBatchAndBase?batchId=' + this.batchId)
								.then(res => {
									if (res.data.success && res.data.result) {
										this.totalMap(res, result)
									}
								})
							} else {
								this.$http.get('/api//retro/planBatch/getBatchAndBase?retroCode='+this.retroCode)
								.then(res=>{
									if (res.data.success && res.data.result) {
										this.totalMap(res, result)
									}
								})
							}
						}
					})
				})
			},
			totalMap(res, result) {
				if(res.data.success==true){
					this.baseMsg = res.data.result
					var lineArr = [
						[res.data.result.longitude, res.data.result.latitude],
						[result.bounds.northeast.lng,result.bounds.northeast.lat]
					];
					var lng = (lineArr[0][0]+lineArr[1][0])/2;
					var lat = (lineArr[0][1]+lineArr[1][1])/2;
					var map = new AMap.Map('container', {
						zoom:5,//级别
						center: [lng, lat],//中心点坐标
						viewMode:'3D'//使用3D视图
					});
					var marker = new AMap.Marker({
						icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
						position: [result.bounds.northeast.lng,result.bounds.northeast.lat]
					});
					var marker1 = new AMap.Marker({
						icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
						position: [res.data.result.longitude, res.data.result.latitude]
					});
					map.add(marker);
					map.add(marker1);
					var polyline = new AMap.Polyline({
						path: lineArr,          //设置线覆盖物路径
						strokeColor: "#3366FF", //线颜色
						strokeWeight: 3,        //线宽
						strokeStyle: "solid",   //线样式
					});
					map.add(polyline);
				}
			}
		},
		created(){
			if (this.$route.query.batchId) {
				this.batchId = this.$route.query.batchId;
			} else {
				this.retroCode = this.$route.query.retroCode;
			}
		},
		mounted() {
			this.getBaseMsg();
			this.containerHeight = (window.innerHeight - this.$refs.header.offsetHeight) / 100;
		}
	}
</script>

<style scoped>
	.header {
		height: .5rem;
		display: flex;
		align-items: center;
		background: #fff;
		padding-left: .2rem;
	}
	
	.header .return {
		font-size: .16rem;
		color: #484848;
		display: flex;
		align-items: center;
	}
	
	.header .return img {
		width: .14rem;
		height: .14rem;
	}
	
	#container {
		width: 100%;
		height: 1rem;
	}
	
	.exhibition {
		width: 100%;
		padding-left: .24rem;
		padding-top: .18rem;
		box-sizing: border-box;
		height: .89rem;
		background: #fff;
		z-index: 999;
		position: fixed;
		bottom: 0;
		left: 0;
	}
	
	.exhibition .name {
		font-size: .16rem;
		color: #484848;
		line-height: .28rem;
	}
	
	.exhibition .site {
		font-size: .14rem;
		color: #a1a1a1;
		line-height: .24rem;
		display: flex;
	}
	
	.exhibition .site span:nth-child(1) {
		margin-right: .19rem;
	}
</style>