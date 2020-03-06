<template>
	<div id="parent">
		<div class="outerBorder">
			<div class="withinBorder">
				<div class="name">{{proName}}</div>
				<div class="frequency">
					<div class="num">
						<span>{{frequency.totalCount}}</span>
						<span>次</span>
					</div>
					<div class="title">当前查询次数</div>
				</div>
				<div class="first">
					<div class="title">首次查验时间</div>
					<div class="msg">{{frequency.firstTime}}</div>
				</div>
				<!--<div class="first">
					<div class="title">扫描地点</div>
					<div class="msg">----</div>
				</div>-->
				<div class="first">
					<div class="title">扫描分别</div>
					<div class="msg">
						<div class="details" v-for="item of region" :key="item.id">
							<span>{{item.region+item.city}}</span>
							<span>{{item.areaCount}}次</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<v-foot ref="foot"></v-foot>
	</div>
</template>

<script>
	import vFoot from './common/Footer.vue';
	export default{
		components:{
	    	vFoot
		},
		data(){
			return{
				ip:'',
				frequency:{},
				region:[],
				batchId:'',
				retroCode: '',
				proName:''
			}
		},
		methods:{
			getFrequency(){
				this.$http.get('/api/trace/getTotalCountByRetroCode?retroCode='+this.retroCode)
				.then(res=>{
					if(res.data.success==true){
						this.frequency = res.data.result;
					}
				})
			},
			getData(){
				this.$http.get('/api/trace/getAreaCountByRetroCode?retroCode='+this.retroCode)
				.then(res=>{
					if(res.data.success==true){
						this.region = res.data.result;
					}
				})
			},
			getIp(){
				this.$http.get('/api/trace/updateTraceing?ip=' + this.ip + '&retroCode=' + this.retroCode)
				.then(res=>{
					if (res.data.success) {
						window.sessionStorage.firstTime = true
						this.getFrequency()
						this.getData()
					}
				})
			}
		},
		created(){
			this.retroCode = this.$route.query.retroCode
		},
		mounted(){
			this.ip = returnCitySN["cip"];
			this.proName = localStorage.getItem('proName');
			// this.getIp()
			if (!window.sessionStorage.firstTime) {
				this.getIp()
			}
			if (window.sessionStorage.firstTime) {
				this.getFrequency()
				this.getData()
			}
		}
	}
</script>

<style scoped>
	#parent{
		padding-bottom: .53rem;
	}
	.outerBorder{
		margin: .4rem .29rem 0;
		border: .02rem solid #7DC09E;
	}
	.outerBorder .withinBorder{
		margin: .07rem .07rem;
		border: .02rem solid #7DC09E;
		position: relative;
		padding: .2rem .18rem .2rem;
	}
	.outerBorder .withinBorder .name{
		font-size: .28rem;
		line-height: .38rem;
		color: #484848;
		font-weight: 900;
		text-align: center;
	}
	.frequency {
		text-align: center;
		margin-top: .21rem;
		padding-bottom: .25rem;
		border-bottom: .01rem dashed #dcdcdc;
	}
	.frequency .num span:nth-child(1){
		font-size: .5rem;
		color: #00aa77;
		display: inline-block;
	}
	.frequency .num span:nth-child(2){
		font-size: .14rem;
		color: #313131;
		display: inline-block;
	}
	.frequency .title{
		font-size: .14rem;
		color: #9d9d9d;
		line-height: .32rem;
	}
	.first{
		display: flex;
		margin: .06rem 0;
		line-height: .34rem;
	}
	.first .title{
		font-size: .14rem;
		width: .85rem;
		margin-right: .14rem;
		color: #a1a1a1;
	}
	.first .msg{
		color: #484848;
		flex: 1;
		font-size: .14rem;
	}
	.first .msg .details{
		display: flex;
		align-items: center;
	}
	.first .msg .details span{
		display: inline-block;
	}
	/*.first .msg .details span:nth-child(1){
		width: .08rem;
		height: .08rem;
		border: .01rem solid #e5e5e5;
		margin-right: .09rem;
	}*/
	.first .msg .details span:nth-child(1){
		flex: 1;
	}
	.first .msg .details span:nth-child(2){
		text-align: right;
	}
</style>
