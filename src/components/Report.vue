<template>
	<div id="parent" ref="parent">
		<van-tabs :swipe-threshold='3'>
			<van-tab title="基地检测报告">
				<ul class="report-list" v-if="EnvironmentMsg.airPic && EnvironmentMsg.soilPic && EnvironmentMsg.waterPic">
					<li v-if="EnvironmentMsg.airPic" @click="preview(EnvironmentMsg.airPic.pictureUrl)">
						<div class="stand-pic">空气检测图片</div>
						<img :src="'/api/pictureInfo/show/compression/' + EnvironmentMsg.airPic.pictureUrl" width="100%"/>
					</li>
					<li v-if="EnvironmentMsg.soilPic" @click="preview(EnvironmentMsg.soilPic.pictureUrl)">
						<div class="stand-pic">土壤检测图片</div>
						<img :src="'/api/pictureInfo/show/compression/' + EnvironmentMsg.soilPic.pictureUrl" width="100%"/>
					</li>
					<li v-if="EnvironmentMsg.waterPic" @click="preview(EnvironmentMsg.waterPic.pictureUrl)">
						<div class="stand-pic">水源检测图片</div>
						<img :src="'/api/pictureInfo/show/compression/' + EnvironmentMsg.waterPic.pictureUrl" width="100%"/>
					</li>
				</ul>
				<div v-else class="without">
					<img src="../assets/images/without.jpg" width="100%"/>
				</div>
			</van-tab>
			<van-tab title="种子检测报告">
				<ul class="report-list" v-if="EnvironmentMsg.seedDetectionPic">
					<li @click="preview(EnvironmentMsg.seedDetectionPic.pictureUrl)">
						<div class="stand-pic">种子检测图片</div>
						<img :src="'/api/pictureInfo/show/compression/' + EnvironmentMsg.seedDetectionPic.pictureUrl" width="100%"/>
					</li>
				</ul>
				<div v-else class="without">
					<img src="../assets/images/without.jpg" width="100%"/>
				</div>
			</van-tab>
			<van-tab title="采收检测报告">
				<ul class="report-list" v-if="EnvironmentMsg.recDetectionPic && this.retroCode">
					<li @click="preview(EnvironmentMsg.recDetectionPic.pictureUrl)">
						<div class="stand-pic">采收检测图片</div>
						<img :src="'/api/pictureInfo/show/compression/' + EnvironmentMsg.recDetectionPic.pictureUrl" width="100%"/>
					</li>
				</ul>
				<div v-else class="without">
					<img src="../assets/images/without.jpg" width="100%"/>
				</div>
			</van-tab>
			<van-tab title="初加工检测报告">
				<ul class="report-list" v-if="EnvironmentMsg.initDetectionPic && this.retroCode">
					<li @click="preview(EnvironmentMsg.initDetectionPic.pictureUrl)">
						<div class="stand-pic">初加工检测图片</div>
						<img :src="'/api/pictureInfo/show/compression/' + EnvironmentMsg.initDetectionPic.pictureUrl" width="100%"/>
					</li>
				</ul>
				<div v-else class="without">
					<img src="../assets/images/without.jpg" width="100%"/>
				</div>
			</van-tab>
		</van-tabs>
		<!-- <ul class="report-list" v-if="Object.keys(this.EnvironmentMsg).length">
			<li v-if="EnvironmentMsg.airPic" @click="preview(EnvironmentMsg.airPic.pictureUrl)">
				<div class="stand-pic">空气检测图片</div>
				<img :src="'/api/pictureInfo/show/' + EnvironmentMsg.airPic.pictureUrl" width="100%"/>
			</li>
			<li v-if="EnvironmentMsg.seedDetectionPic" @click="preview(EnvironmentMsg.seedDetectionPic.pictureUrl)">
				<div class="stand-pic">种子检测图片</div>
				<img :src="'/api/pictureInfo/show/' + EnvironmentMsg.seedDetectionPic.pictureUrl" width="100%"/>
			</li>
			<li v-if="EnvironmentMsg.soilPic" @click="preview(EnvironmentMsg.soilPic.pictureUrl)">
				<div class="stand-pic">土壤检测图片</div>
				<img :src="'/api/pictureInfo/show/' + EnvironmentMsg.soilPic.pictureUrl" width="100%"/>
			</li>
			<li v-if="EnvironmentMsg.waterPic" @click="preview(EnvironmentMsg.waterPic.pictureUrl)">
				<div class="stand-pic">水源检测图片</div>
				<img :src="'/api/pictureInfo/show/' + EnvironmentMsg.waterPic.pictureUrl" width="100%"/>
			</li>
			<li v-if="EnvironmentMsg.recDetectionPic && this.retroCode" @click="preview(EnvironmentMsg.recDetectionPic.pictureUrl)">
				<div class="stand-pic">采收检测图片</div>
				<img :src="'/api/pictureInfo/show/' + EnvironmentMsg.recDetectionPic.pictureUrl" width="100%"/>
			</li>
			<li v-if="EnvironmentMsg.initDetectionPic && this.retroCode" @click="preview(EnvironmentMsg.initDetectionPic.pictureUrl)">
				<div class="stand-pic">初加工检测图片</div>
				<img :src="'/api/pictureInfo/show/' + EnvironmentMsg.initDetectionPic.pictureUrl" width="100%"/>
			</li>
		</ul> -->
		<v-foot ref="foot"></v-foot>
	</div>
</template>

<script>
	//import { Indicator } from 'mint-ui';
	import vFoot from './common/Footer.vue';
	import { ImagePreview } from 'vant';
	export default{
		components:{
	    	vFoot
		},
		data(){
			return{
				EnvironmentMsg: {},
				batchId:'',
				retroCode: ''
			}
		},
		methods:{
			preview(name){
				let picUrl = '/api/pictureInfo/show/compression/' + name
				ImagePreview([picUrl])
			},
			getReportMsg(){
				if (this.batchId) {
					this.$http.get('/api/proTraceability/getTraceabilityPic?batchId='+this.batchId)
					.then(res=>{
						if(res.data.success == true){
							this.EnvironmentMsg = res.data.result;
						}
					})
				} else {
					this.$http.get('/api/retro/init/getRetroPic?retroCode='+this.retroCode)
					.then(res=>{
						if(res.data.success == true){
							this.EnvironmentMsg = res.data.result;
						}
					})
				}
			}
		},
		created(){
			if (this.$route.query.batchId) {
				this.batchId = this.$route.query.batchId;
			} else {
				this.retroCode = this.$route.query.retroCode
			}
		},
		mounted(){
			this.$nextTick(function () {
		        document.title = '安心报告'
		  	})
			this.getReportMsg();
		}
	}
</script>

<style scoped lang='stylus'>
	#parent{
		padding-bottom: .53rem;
		.stand-pic {
			text-align: center
			margin-bottom: .1rem
		}
		.report-list {
			margin-top .1rem
		}
	}
</style>