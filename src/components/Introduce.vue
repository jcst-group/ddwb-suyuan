<template>
	<div id="parent">
		<div class="introduceBox">
			<div class="msgBox">
				<div class="pic">
					<img :src=" baseMsg.basePic ? '/api/pictureInfo/show/compression/'+ baseMsg.basePic.pictureUrl : null" />
				</div>
				<div class="contact">
					<div class="headPic">
						<img v-if="baseMsg.userList && baseMsg.userList.length > 0 && baseMsg.userList[0].headPic" :src="baseMsg.userList[0].headPic ? '/api/pictureInfo/show/'+baseMsg.userList[0].headPic.pictureUrl : null" />
						<img v-else src="../assets/images/my.png" />
					</div>
					<div class="msg">
						<div class="name">{{baseMsg.userList ? baseMsg.userList[0].realName : '暂无'}}</div>
						<div class="phone">{{baseMsg.userList? baseMsg.userList[0].phone : '暂无'}}</div>
					</div>
				</div>
				<!-- <div class="shop" v-if="shopMsg">
					<div class="bg"></div>
					<button @click="toShop(shopMsg.shopUrl)">进入店铺</button>
				</div> -->
				<div class="site">
					<div class="name">地址</div>
					<div class="msg" v-if="baseMsg.address">{{baseMsg.address.province}}{{baseMsg.address.city}}{{baseMsg.address.area}}{{baseMsg.address.street}}</div>
				</div>
			</div>
			<div class="synopsis">
				<div class="title">简介</div>
				<div class="describe">
					{{baseMsg.survey ? baseMsg.survey : '暂无'}}
				</div>
			</div>
			<br/>
			<!-- <div class="gongzhonghao">
				<div class="title">嘉承公众号</div>
				<div class="eweima">
					<img src="../assets/images/eweima.jpg">
					<span style="font-size:14px;">长按关注公众号</span>
				</div>
			</div> -->
		</div>
		<v-foot ref="foot"></v-foot>
	</div>
</template>

<script>
	import { Swipe, SwipeItem } from 'mint-ui';
	import vFoot from './common/Footer.vue';
	export default{
		components:{
            vFoot
        },
		data(){
			return{
				baseMsg:{},
				peopleMsg:{},
				pictureInfoList:[],
				batchId:'',
				shopMsg:{}
			}
		},
		methods:{
			toShop(shopUrl){
				location.href=shopUrl;
			},
			call(phone){
				window.location.href = "tel://"+phone;
			},
			getBaseMsg(){
				this.$http.get('/api/proTraceability/getBaseById?baseId='+ sessionStorage.getItem('baseId'))
				.then(res=>{
					if(res.data.success==true){
						this.baseMsg = res.data.result;
						// this.peopleMsg = res.data.result.farmer1;
						// this.pictureInfoList = res.data.result.pictureInfoList;
					}
				})
			},
			// getShopMsg(){
			// 	this.$http.get('/api/anadromous/agriculturalPro/getBaseShop?batchId='+this.batchId)
			// 	.then(res=>{
			// 		if(res.data.success==true){
			// 			this.shopMsg = res.data.result;
			// 		}
			// 	})
			// }
		},
		created(){
			this.batchId = this.$route.query.batchId;
		},
		mounted(){
			this.$nextTick(function () {
		        document.title = '农场介绍'
		   	})
			this.getBaseMsg();
		}
	}
</script>

<style scoped>
	#parent{
		padding-bottom: .7rem;
	}
	.introduceBox{
		margin: .12rem .13rem 0;
		border: .02rem solid #7DC09E;
		padding-bottom: .2rem;
		background: #fff;
	}
	.msgBox{
		padding: 0 .13rem;
	}
	.msgBox .title{
		text-align: center;
		font-size: .3rem;
		color: #444;
		line-height: .37rem;
		margin-top: .22rem;
	}
	.pic{
		margin-top: .15rem;
		height: 1.5rem;
	}
	.pic img{
		height: 100%;
		width: 100%;
		display: block;
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
		width: 100%;
		height: 100%;
		background: #49ac72;
		border: 0;
		border-radius: .1rem;
		color: #fff;
		font-size: .14rem;
	}
	.site{
		margin-left: .25rem;
	}
	.site .name{
		margin-top: .15rem;
		color: #141414;
		font-size: .2rem;
		line-height: .29rem;
	}
	.site .msg{
		flex: 1;
		font-size: .16rem;
		color: #6d6d6d;
		line-height: .28rem;
	}
	.contact{
		background: #DBDBDB;
		margin-top:.3rem;
		height: .96rem;
		border-radius: .1rem;
		padding: .17rem 0 0 .24rem;
		box-sizing: border-box;
		display: flex;
	}
	.contact .headPic{
		width: .58rem;
		height: .58rem;
	}
	.contact .headPic img{
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	.contact .msg{
		margin-left: .2rem;
	}
	.contact .msg div:nth-child(1){
		color: #444;
		line-height: .28rem;
		font-size: .16rem;
	}
	.contact .msg div:nth-child(2){
		color: #444;
		line-height: .28rem;
		font-size: .15rem;
	}
	.synopsis{
		margin: .1rem .18rem 0 .38rem;
	}
	.synopsis .title{
		line-height: .29rem;
		color: #484848;
		font-size: .2rem;
		margin-top: .3rem;
	}
	.synopsis .describe{
		line-height: .28rem;
		font-size: .16rem;
		color: #999;
	}
	.eweima{
		width: 100px;
		height: 120px;
		margin:auto;
	}
	.eweima img{
		width:100px;
		height: 100px;
	}
</style>