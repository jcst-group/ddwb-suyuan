<template>
  <div id="parent">
  	<div class="banner">
  		<mt-swipe :auto="4000" v-if="Array.isArray(this.dataMsg.cropPic)">
			<mt-swipe-item v-for="item of pictureInfoList" :key="item.id">
				<img :src="'/api/pictureInfo/show/compression/'+item.pictureUrl"/>
			</mt-swipe-item>
		</mt-swipe>
		<img v-else-if="pictureInfoList && pictureInfoList.pictureUrl" :src="'/api/pictureInfo/show/compression/' + pictureInfoList.pictureUrl" alt="">
  	</div>
	<!-- <div class="shop" v-if="shopMsg">
		<button @click="toShop(shopMsg)">想了解更多~进入店铺<span style="float:right;margin-right:20px;">></span></button>
	</div> -->
	<div class="btn-wrapper" v-if="this.retroCode">
		<van-button class="btn-wrapper-box" @click="goSeed">
			<img src="../assets/images/zhongyuan.png" alt="">
			优质种源
		</van-button>
		<van-button class="btn-wrapper-box" @click="goRecovery">
			<img src="../assets/images/caishou.png" alt="">
			采收
		</van-button>
		<van-button class="btn-wrapper-box" @click="goFirstWork">
			<img src="../assets/images/chujiagong.png" alt="">
			初加工
		</van-button>
	</div>
  	<div class="productMsg">
  		<div class="titleMsg">
	  		<div class="name">{{dataMsg ? dataMsg.cropName : ''}}</div>
	  		<div class="number">
	  			<div>产品身份编号</div>
	  			<div>{{dataMsg ? dataMsg.cropCode : ''}}</div>
	  		</div>
	  	</div>
	  	<div class="particular" ref="particular">
	  		<div class="title">
	  			<div class="name">批次名称</div>
	  			<div class="msg">{{batch ? batch.batchName : ''}}</div>
	  		</div>
	  		<div class="title">
	  			<div class="name">批次时间</div>
	  			<div class="msg">{{batch ? batch.startTime : ''}}—{{batch ? batch.endTime : ''}}</div>
	  		</div>
	  		<div class="title">
	  			<div class="name">产地</div>
	  			<div class="msg">{{batch ? batch.provenance : ''}}</div>
	  		</div>
	  		<div class="title">
	  			<div class="name">基地名称</div>
	  			<div class="msg">{{batch ? batch.baseName : ''}}</div>
	  		</div>
	  		<!-- <div class="title">
	  			<div class="name">包装方式</div>
	  			<div class="msg" >{{dataMsg.proPacking}}</div>
	  		</div>
	  		<div class="title">
	  			<div class="name">储藏方法</div>
	  			<div class="msg" v-if="dataMsg.storageMethod==1">放置干燥阴凉处</div>
	  			<div class="msg" v-if="dataMsg.storageMethod==2">常温存储</div>
	  		</div> -->
	  		<div class="title">
	  			<div class="name">产品介绍</div>
	  			<div class="msg">{{dataMsg ? dataMsg.describe : ''}}</div>
	  		</div>
	  		<!-- <div class="title">
	  			<div class="name">适宜人群</div>
	  			<div class="msg">{{dataMsg.suitableCrowd}}</div>
	  		</div>
	  		<div class="title">
	  			<div class="name">注意事项</div>
	  			<div class="msg">{{dataMsg.attentionThing}}</div>
	  		</div>
	  		<div class="title">
	  			<div class="name">预计产量</div>
	  			<div class="msg" v-if="batch.forecastOutput<100">{{batch.forecastOutput}}公斤</div>
	  			<div class="msg" v-else-if="batch.forecastOutput<1000">{{batch.forecastOutput/100}}百公斤</div>
	  			<div class="msg" v-else-if="batch.forecastOutput<10000">{{batch.forecastOutput/1000}}千公斤</div>
	  			<div class="msg" v-else>{{batch.forecastOutput/10000}}万公斤</div>
	  		</div>
	  		<div class="title">
	  			<div class="name">采摘时间</div>
	  			<div class="msg">{{dataMsg.proDate}}</div>
	  		</div>
	  		<div class="title">
	  			<div class="name">净重量</div>
	  			<div class="msg">{{dataMsg.netWeight}}</div>
	  		</div>
         	<div class="shops" v-if="shopMsg">
				<button class="wuliubut" @click="toShops()" style="margin-top: 0;width:40%;float: right">包裹查询</button>
			</div> -->
	  	</div>
  	</div>
	<!-- <div class="fullView" v-if="panoramaList.length!=0">
  		<div class="title">
  			农场全景图
  		</div>
  		<div class="fullViewPic" @click="toPanorama(panoramaList[0].panoramaUrl)">
  			<mt-swipe :auto="3000">
				<mt-swipe-item v-for="item of panoramaList">
					<img style="width:100%;height:100%" :src="'/api/anadromous/agriculturalPro/show/'+item.picUrl" />
				</mt-swipe-item>
			</mt-swipe>
  		</div>
  		<img @click="toPanorama" src="../assets/images/introduce.jpg"/>
  	</div> -->
  	<div class="environment">
  		<div class="title">
  			<div></div>
  			生长环境
  		</div>
  		<ul class="envMsg">
  			<li><!--EnvironmentMsg.temperatureAvg==0?EnvironmentMsg.temperatureAvg:parseInt(EnvironmentMsg.temperatureAvg)-->
  				<div class="num">{{EnvironmentMsg?(EnvironmentMsg.temperatureAvg==0?EnvironmentMsg.temperatureAvg:parseInt(EnvironmentMsg.temperatureAvg)):0}}℃</div>
  				<div class="name">平均温度</div>
  			</li>
  			<li><!--EnvironmentMsg.temperatureDiffAvg==0?EnvironmentMsg.temperatureDiffAvg:parseInt(EnvironmentMsg.temperatureDiffAvg)-->
  				<div class="num">{{EnvironmentMsg?(EnvironmentMsg.temperatureDiffAvg!=''?EnvironmentMsg.temperatureDiffAvg:parseInt(EnvironmentMsg.temperatureDiffAvg)):0}}℃</div>
  				<div class="name">平均昼夜温差</div>
  			</li>
  			<li><!---->
  				<div class="num">{{EnvironmentMsg?(EnvironmentMsg.airHumidityAvg==0?EnvironmentMsg.airHumidityAvg:parseInt(EnvironmentMsg.airHumidityAvg)):0}}%</div>
  				<div class="name">平均湿度</div>
  			</li>
  			<li><!---->
  				<div class="num">{{EnvironmentMsg?(EnvironmentMsg.rainfallTotal==0?EnvironmentMsg.rainfallTotal:parseInt(EnvironmentMsg.rainfallTotal)):0}}mm</div>
  				<div class="name">累计降水量</div>
  			</li>
  			<li><!---->
  				<div class="num">{{EnvironmentMsg?(EnvironmentMsg.illTimeTotal==0?EnvironmentMsg.illTimeTotal:parseInt(EnvironmentMsg.illTimeTotal)):0}}h</div>
  				<div class="name">累计光照时长</div>
  			</li>
  			<li><!---->
  				<div class="num">{{EnvironmentMsg?(EnvironmentMsg.soilHumidityAvg==0?EnvironmentMsg.soilHumidityAvg:parseInt(EnvironmentMsg.soilHumidityAvg)):0}}%</div>
  				<div class="name">平均土壤湿度</div>
  			</li>
  			<li><!---->
  				<div class="num">{{EnvironmentMsg?(EnvironmentMsg.soilPhAvg==0?EnvironmentMsg.soilPhAvg:parseInt(EnvironmentMsg.soilPhAvg)):0}}</div>
  				<div class="name">平均土壤PH值</div>
  			</li>
        <li><!---->
          <div class="num" :style="{fontSize: EnvironmentMsg && EnvironmentMsg.soilType ? (EnvironmentMsg.soilType.length > 4 ? '0.14rem' : '0.28rem') :'0.28rem' }">{{EnvironmentMsg?(EnvironmentMsg.soilType!=''?EnvironmentMsg.soilType:parseInt(EnvironmentMsg.soilType)):'暂无'}}</div>
          <div class="name">土壤类型</div>
        </li>
  		</ul>
  	</div>
  	<div class="grow">
  		<div class="title">
  			<div></div>
  			生长期
  		</div>
  		<van-steps direction="vertical" :active="growMsg.length" active-color='#74BF5D'>
			<van-step v-for="item of growMsg" :key="item.id">
				<div class="msgBox">
					<div class="left">
						<div v-html="item.farmingItem ? item.farmingItem.farmingName: ''"></div>
						<div>{{item.farmingItem ? item.farmingItem.method: ''}}</div>
						<div style="color: #666">
							<span>
								<van-icon name="underway-o" class="msg-icon"/>
								{{item.executionTime}}
							</span>
							<span style="float:right; margin-right: 10px" v-if="item.user">
								<van-icon name="user-o" class="msg-icon"/>
								<!-- <span v-for="(ele ,index) in item.roleList" :key="index">
									{{ele.name}}
								</span> -->
								<span>{{item.user.realName}}</span>
							</span>
						</div>
					</div>
					<div class="right">
						<div class="right-img-wrapper">
							<div v-if="item.pictureInfoList && item.pictureInfoList.length > 0" class="piclist" @click="preview(item.pictureInfoList)">
								<mt-swipe :auto="3000" :showIndicators="false">
									<mt-swipe-item v-for="item1 in item.pictureInfoList" :key="item1.id">
										<img :src="'/api/pictureInfo/show/compression/'+ item1.pictureUrl" style="border-radius:50%"/>
									</mt-swipe-item>
								</mt-swipe>
							</div>
						</div>
						<div class="work-status" v-if="batchId" :style="{color: fontColor[+item.status.value - 1]}">{{item.status.displayName}}</div>
					</div>
				</div>
			</van-step>
		</van-steps>
  	</div>
  	<div class="mapBox">
  		<div id="container"></div>
  		<div @click="toDetails" class="mask"></div>
  	</div>
  	<v-foot ref="foot"></v-foot>
  </div>
</template>

<script>
	import { Swipe, SwipeItem } from 'mint-ui';
	import { ImagePreview, Lazyload} from 'vant';
	import vFoot from './common/Footer.vue';

	const fontColor = ['#62C5FE', '#FEC762', '#FE6262', '#74BF5D']

	export default {
		components:{
			vFoot
		},
		data () {
			return {
				unfoldFlag:true,
				packupFlag:false,
				dataMsg:{},
				batch:{},
				pictureInfoList:[],
				EnvironmentMsg:{},
				growMsg:[],
				shopMsg: null,
				ip:'',
				batchId:'',
				retroCode: '',
				panoramaList:[],
				fontColor: fontColor
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
			this.$nextTick(function () {
        document.title = '产品信息'
        setTimeout(() => {
          if (document.title === '产品信息') {
            this.getBaseMsg();
          }
        }, 0)
      })
			this.getDataMsg();
			this.getEnvironment();
			this.getGrowMsg();
			// this.getIp();
			// this.getPanoramaMsg();
			// this.getShopMsg();
		},
		methods:{
			// toShop(shopUrl){
			// 	location.href = shopUrl;
			// },
			toShops(){
				location.href="https://www.kuaidi100.com/";
			},
			goSeed() {
				this.$router.push({
					path: '/Provenances',
					query: this.$route.query
				})
			},
			goRecovery() {
				this.$router.push({
					path: '/Recovrey',
					query: this.$route.query
				})
			},
			goFirstWork() {
				this.$router.push({
					path: '/FirstWork',
					query: this.$route.query
				})
			},
			// getShopMsg(){
			// 	if (this.batchId) {
			// 		this.$http.get('/api/proTraceability/getShopUrl?batchId='+this.batchId)
			// 		.then(res=>{
			// 			if(res.data.success==true){
			// 				this.shopMsg = res.data.result;
			// 			}
			// 		})
			// 	} else {
			// 		this.$http.get('/api/retro/planBatch/getShopUrl?retroCode='+this.retroCode)
			// 		.then(res=>{
			// 			if(res.data.success==true){
			// 				this.shopMsg = res.data.result;
			// 			}
			// 		})
			// 	}
			// },
			preview(imgList){
				var arrImg = new Array();
				for(var i=0;i<imgList.length;i++){
					arrImg.push('/api/pictureInfo/show/compression/' + imgList[i].pictureUrl)
				}
				ImagePreview({
					images: arrImg,
					lazyLoad: true
				});
			},
			toPanorama(url){
				open(url);
			},
			getGrowMsg(){
				if (this.batchId) {
					this.$http.get('/api/workOrder/getOrderByBatchId?batchId='+this.batchId)
					.then(res=>{
						if(res.data.success==true){
							for (var i=0;i<res.data.result.length;i++) {
								if (res.data.result[i].remark) {
									res.data.result[i].remark = res.data.result[i].remark.replace(/\n/g,"<br/>");
								}
							}
							this.growMsg = res.data.result;
						}
					})
				} else {
					this.$http.get('/api/retro/planBatch/getOrderByRetroCod?retroCode='+this.retroCode)
					.then(res=>{
						if(res.data.success==true){
							for (var i=0;i<res.data.result.length;i++) {
								if (res.data.result[i].remark) {
									res.data.result[i].remark = res.data.result[i].remark.replace(/\n/g,"<br/>");
								}
							}
							this.growMsg = res.data.result;
						}
					})
				}
			},
			getDataMsg(){
				if (this.batchId) {
					this.$http.get('/api/proTraceability/getProTraceability?batchId='+this.batchId)
					.then(res=>{
						if(res.data.success==true){
							this.dataMsg = res.data.result ? res.data.result : {};
							this.pictureInfoList = this.dataMsg.cropPic;
							localStorage.setItem('cropName',this.dataMsg.cropName);
						}
					})
					this.$http.get('/api/proTraceability/getBatchAndBase?batchId='+this.batchId)
					.then(res=>{
						if(res.data.success==true){
							this.batch = res.data.result
							if (res.data.result && res.data.result.baseId) {
								sessionStorage.setItem('baseId', res.data.result.baseId)
							}
						}
					})
				} else {
					this.$http.get('/api/retro/planBatch/getProTraceability?retroCode='+this.retroCode)
					.then(res=>{
						if(res.data.success==true){
							this.dataMsg = res.data.result ? res.data.result : {};
							this.pictureInfoList = this.dataMsg.cropPic;
							localStorage.setItem('cropName',this.dataMsg.cropName);
						}
					})
					this.$http.get('/api//retro/planBatch/getBatchAndBase?retroCode='+this.retroCode)
					.then(res=>{
						if(res.data.success==true){
							this.batch = res.data.result
							if (res.data.result && res.data.result.baseId) {
								sessionStorage.setItem('baseId', res.data.result.baseId)
							}
						}
					})
				}
			},
			getEnvironment(){
				if (this.batchId) {
					this.$http.get('/api/batchEnvironment/getBatchEnvironment?batchId='+this.batchId)
					.then(res=>{
						if (res.data.success==true) {
							this.EnvironmentMsg = res.data.result;
						}
					})
				} else {
					this.$http.get('/api/retro/planBatch/getBatchEnvironment?retroCode='+this.retroCode)
					.then(res=>{
						if (res.data.success==true) {
							this.EnvironmentMsg = res.data.result;
						}
					})
				}
			},
			toDetails(){
				this.$router.push({
					path: '/mapDetail',
					query: this.$route.query
				})
			},
			// getPanoramaMsg(){
			// 	this.$http.get('/api/anadromous/agriculturalPro/getBaseInfo?batchId='+this.batchId)
			// 	.then(res=>{
			// 		if(res.data.success==true){
			// 			this.panoramaList = res.data.result.basePanoramaList;
			// 		}
			// 	})
			// },
			getBaseMsg(){
				AMap.plugin('AMap.CitySearch',  () =>{
				var citySearch = new AMap.CitySearch()
				citySearch.getLocalCity( (status, result)=> {
					if (status === 'complete' && result.info === 'OK') {
						if (this.batchId) {
							this.$http.get('/api/proTraceability/getBatchAndBase?batchId='+this.batchId)
							.then(res=>{
								if (res.data.success && res.data.result) {
									this.totalMap(res, result)
								}
							})
						} else {
							this.$http.get('/api/retro/planBatch/getBatchAndBase?retroCode='+this.retroCode)
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
		}
	}
</script>

<style scoped lang='stylus'>
	.msgBox
		.msg-icon
			font-size 0.16rem
			vertical-align top
	#parent{
		padding-bottom: .53rem;
		background: #f6f7fb;
		color: #333333
	}
	.btn-wrapper {
		width: 90%;
		margin: .1rem auto 0;
		display: flex;
		justify-content: space-around;
	}
	.btn-wrapper .btn-wrapper-box {
		width: 0.94rem
		height:0.94rem
		padding 0.08rem
		color: #333333
		border-radius: 0.1rem
	}
	.btn-wrapper .btn-wrapper-box img {
		width: 0.48rem
		height: 0.48rem
		display: block
		margin: 0 auto
	}
	.banner{
		width: 90%;
		margin: 0.1rem auto 0;
		height: 2.2rem;
	}
	.banner img{
		display: block;
		width: 100%;
		height: 100%;
		border-radius: 0.1rem
	}
	.productMsg{
		background-color: #ffffff;
		margin: .1rem .13rem 0;
		border-radius: .1rem;
		padding-bottom: .2rem;
	}
	.titleMsg .name{
		font-size: .20rem;
		color: #444;
		font-weight: 900;
		line-height: .42rem;
		padding:.07rem 0 0 .4rem;
		background: rgba(255,255,255,0.3);
		border-radius: .1rem;
		position: relative
		&::before {
			content: ''
			display: block
			width: 0.1rem
			height: 0.1rem
			border-radius: 50%
			position: absolute
			background-color: #74BF5D
			top: 50%
    		left: 25px
		}
	}
	.titleMsg .number{
		margin-top: .15rem;
		padding-left: .25rem;
		display: flex
	}
	.titleMsg .number div:nth-child(1){
		font-size: .14rem;
		color: #333;
		line-height: .18rem;
	}
	.titleMsg .number div:nth-child(2){
		color: #666666;
		line-height: .18rem;
		font-size: .14rem;
		margin-left: .2rem;
	}
	.particular{
		padding-top: .13rem;
		margin: 0 .24rem;
		position: relative;
		overflow: hidden;
	}
	.particular .title{
		display: flex;
		margin: .05rem 0;
	}
	.particular .title .name{
		line-height: .28rem;
		font-size: .14rem;
		color: #333;
		width: .84rem;
	}
	.particular .title .msg{
		font-size: .14rem;
		color: #666666;
		margin-left: .2rem;
		flex: 1;
		line-height: .28rem;
	}
	.grow{
		background: #fff;
		border-radius: .1rem;
		margin: .2rem .13rem 0 .13rem;
		padding-bottom: .2rem;
	}
	.grow .title div{
		margin-right: .1rem;
		width: .1rem;
		height: .1rem;
		border-radius: 50%;
		background: #74BF5D;
	}
	.grow .title{
		display: flex;
		align-items: center;
		font-size: .2rem;
		color: #333;
		line-height: .3rem;
		font-weight: bold
		padding: 0.1rem 0 0.1rem 0.25rem
	}
	.msgBox{
		display: flex;
		border-bottom: .01rem solid #e6e6e6;
		margin-left: .05rem;
	}
	.msgBox .left{
		width: 77%;
		height: 1.5rem

	}
	.msgBox .left div:nth-child(1){
		margin-top: .17rem;
	}
	.msgBox .left div:nth-child(1){
		font-size: .16rem;
		font-weight: bold;
		color: #333;
		line-height: .16rem;
		margin-bottom: .1rem;
	}
	.msgBox .left div:nth-child(2){
		font-size: 0.14rem;
		letter-spacing: 0.02rem;
		height: .8rem
		color: #333;
		line-height: 0.2rem;
		margin-bottom: 0.05rem;
		border-radius: 12px;
		display: inline-block
	}
	.msgBox .left div:nth-child(3){
		font-size: .14rem;
		color: #030303;
		line-height: .16rem;
	}
	.msgBox .right{
		position: relative
		margin-top: 0.26rem;
		flex: 1;
	}
	.msgBox .right .right-img-wrapper {
		width: .8rem;
		height: .8rem;
	}
	.msgBox .right .work-status {
		position: absolute
		bottom: 0.03rem
		width: 100%
		text-align: center
	}
	.msgBox .right .piclist{
		width: .8rem;
		height: .8rem;
		border-radius: 50%;
	}
	.msgBox .right .piclist .mint-swipe {
		border-radius: 50%;
	}
	.msgBox .right .piclist img{
		width: 100%;
		height: 100%;
		border-radius: .1rem;
	}
	.van-hairline{
		padding: 0 !important;
		margin-right: .12rem;

	}
	.fullView{
		background: #fff;
		border-radius: .1rem;
		margin: .2rem .13rem 0 .13rem;
		padding: 0 .25rem .1rem;
	}
	.fullView .title div{
		margin-right: .15rem;
		width: .05rem;
		height: .28rem;
		border-radius: .025rem;
		background: #97c797;
	}
	.fullView .title{
		display: flex;
		align-items: center;
		font-size: .28rem;
		color: #444;
		line-height: .28rem;
		padding-top: .18rem;
	}
	.fullView .fullViewPic{
		margin-top: .1rem;
		width: 100%;
		height: 1.2rem;
	}
	.environment{
		background: #fff;
		border-radius: .1rem;
		margin: .2rem .13rem 0 .13rem;
		padding-bottom: .2rem;
	}
	.environment .title div{
		margin-right: .1rem;
		width: .1rem;
		height: .1rem;
		border-radius: 50%;
		background: #74BF5D;
	}
	.environment .title{
		display: flex;
		align-items: center;
		font-size: .2rem;
		color: #333;
		line-height: .3rem;
		font-weight: bold
		padding: 0.1rem 0 0.1rem 0.25rem
	}
	.environment .envMsg{
		margin: 0 .13rem;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.environment .envMsg li{
		width:47%;
		height: .85rem;
		margin-bottom: .1rem;
		border-radius: .1rem;
		padding-left: .13rem;
		box-sizing: border-box;
	}
	.environment .envMsg li .num{
		padding-top: .1rem;
		font-size: .28rem;
		color: #444;
		height: 40px
		line-height: 40px
	}
	.environment .envMsg li .name{
		font-size: .13rem;
		color: #7B7B7B;
	}
	.environment .envMsg li:nth-child(1){
		background:url(../assets/images/icon1.png) no-repeat bottom right,#f5f5f5;
	}
	.environment .envMsg li:nth-child(2){
		background:url(../assets/images/icon2.png) no-repeat bottom right,#f5f5f5;
	}
	.environment .envMsg li:nth-child(3){
		background:url(../assets/images/icon3.png) no-repeat bottom right,#f5f5f5;
	}
	.environment .envMsg li:nth-child(4){
		background:url(../assets/images/icon4.png) no-repeat bottom right,#f5f5f5;
	}
	.environment .envMsg li:nth-child(5){
		background:url(../assets/images/icon5.png) no-repeat bottom right,#f5f5f5;
	}
	.environment .envMsg li:nth-child(6){
		background:url(../assets/images/icon6.png) no-repeat bottom right,#f5f5f5;
	}
	.environment .envMsg li:nth-child(7){
		background:url(../assets/images/icon7.png) no-repeat bottom right,#f5f5f5;
	}
  .environment .envMsg li:nth-child(8){
    background:url(../assets/images/icon8.png) no-repeat bottom right,#f5f5f5;
  }
	.mapBox{
		margin:.2rem .13rem 0 .13rem;
		height: 2.16rem;
		position: relative;
		overflow: hidden;
		border-radius: .1rem;
	}
	#container{
		width: 100%;
		height: 110%;
		pointer-events: none;
	}
	.amap-logo{
		opacity: 0;
	}
	.amap-copyright{
		opacity: 0;
	}
	.mask{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.shop{
		margin-top: .15rem;
		width: 100%;
		height: .4rem;
		position: relative;
	}
	.shop .bg{
		width: 100%;
		height: 50%;
		background: rgba(255,255,255,0.1);
		position: absolute;
		top: 0;
		left: 0;
	}
	.shop button{
		width: 93%;
		height: 100%;
		background: -webkit-linear-gradient(#22D585, #56AB2F); /* Safari 5.1 - 6.0 */
		background: -o-linear-gradient(#22D585, #56AB2F); /* Opera 11.1 - 12.0 */
		background: -moz-linear-gradient(#22D585, #56AB2F); /* Firefox 3.6 - 15 */
		background: linear-gradient(#22D585, #56AB2F); /* 标准的语法（必须放在最后） */
    	margin-left:.13rem;
		border: 0;
		border-radius: .19rem;
		color: #fff;
		font-size: .14rem;
	}
  	.shops{
		margin-top: .15rem;
		width: 100%;
		height: .4rem;
		position: relative;
	}
	.wuliubut{
		color:#35D53A;
		background:#E3FEFB;
		width: 90%;
			height: 90%;
			margin-top:.15rem;
		margin-left:.13rem;
			border: 0;
			border-radius: .19rem;
			font-size: .14rem;
	}
</style>
