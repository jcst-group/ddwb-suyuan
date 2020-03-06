<template>
	<div id="parent">
		<ul class="tab">
			<li v-if="current==0">
				<Home></Home>
			</li>
			<li v-if="current==1">
				<Report></Report>
			</li>
			<li v-if="current==2">
				<factOrFiction></factOrFiction>
			</li>
			<li v-if="current==3">
				<Introduce></Introduce>
			</li>
		</ul>
		<div class="bottomNav">
			<ul class="navList">
				<li v-for="(item,index) of navList" @click="selectStyle (index)" :class="{active:index==current}" v-if="index !== 2 || retroCode">
					<i :class="item.icon"></i>
					{{item.name}}
				</li>
			</ul>
	    </div>
	</div>
</template>

<script>
	import Home from './Home';
	import Report from './Report';
	import factOrFiction from './factOrFiction';
	import Introduce from './Introduce';
	export default{
		data(){
			return{
				navList:[
					{path:'Home',name:'产品信息',icon:'iconfont icon-item-chanpin'},
					{path:'Report',name:'安心报告',icon:'iconfont icon-item-baogao-copy'},
					{path:'factOrFiction',name:'溯源记录',icon:'iconfont icon-item-saomiaoshibie380'},
					{path:'Introduce',name:'农场介绍',icon:'iconfont icon-item-wode'},
				],
				current:0,
				retroCode: ''
			}
		},
		components:{
		  	'Home':Home,
		  	'Report':Report,
		  	'factOrFiction':factOrFiction,
		  	'Introduce':Introduce,
		},
		methods:{
			selectStyle(index){
				this.current = index;
				if (index === 2) {
					document.title = '溯源记录'
				}
				sessionStorage.setItem('current',index);
			}
		},
		mounted(){
			this.retroCode = this.$route.query.retroCode ? this.$route.query.retroCode : ''
			this.current = sessionStorage.getItem('current')?sessionStorage.getItem('current'):0;
		}
	}
</script>

<style scoped>
	.bottomNav{
		width: 100%;
		height: .53rem;
		background: #fff;
		position: fixed;
		bottom: 0;
		right: 0;
		box-shadow:0 0 .1rem -0.05rem #ccc;
		box-sizing: border-box;
		z-index: 3;
	}
	.navList{
		height: 100%;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.navList li{
		width: 25%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		color: #595959;
		font-size: .12rem;
	}
	.navList li i{
		font-size: .25rem;
		margin-bottom: .04rem;
	}
	.navList li.active{
		color: #62caab;
	}
</style>