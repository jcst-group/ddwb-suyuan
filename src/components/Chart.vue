<template>
	<div id="parent">
		<div class="header" ref="header">
			<div class="return" @click="getBack">
				<img src="../assets/images/left.png"/>
				返回
			</div>
		</div>
		<div class="chartBox">
			<div class="title">生长环境</div>
			<div class="firstChart">
				<div class="name">空气温度</div>
				<div id="myChart" ref="myChart1"></div>
			</div>
			<div class="firstChart">
				<div class="name">空气温度</div>
				<div id="myChart" ref="myChart2"></div>
			</div>
			<div class="firstChart">
				<div class="name">空气温度</div>
				<div id="myChart" ref="myChart3"></div>
			</div>
			<div class="firstChart">
				<div class="name">空气温度</div>
				<div id="myChart" ref="myChart4"></div>
			</div>
			<div class="firstChart">
				<div class="name">空气温度</div>
				<div id="myChart" ref="myChart5"></div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			getBack(){
				this.$router.go(-1)
			},
			drawLine(){
				var options = {
				    tooltip: {
				        trigger: 'axis'
				    },
				    color:['red','blue','pink'],
				    legend: {
				        data:['最大值','最小值','平均值']
				    },
				    grid: {
				        left: '1%',
				        right: '3%',
				        top:'8%',
				        containLabel: true
				    },
				    xAxis: {
				        type: 'category',
				        boundaryGap: false,
				        data: ['4月','5月','6月','7月','8月']
				    },
				    yAxis: {
				        type: 'value'
				    },
				    series: [
				        {
				            name:'最大值',
				            type:'line',
				            data:[31.8, 33.2, 30.5, 25, 23.3],
				            smooth: true
				        },
				        {
				            name:'最小值',
				            type:'line',
				            data:[17.11, 16.5, 13.3, 8.2, 4],
				            smooth: true
				        },
				        {
				            name:'平均值',
				            type:'line',
				            data:[24.11, 22.77, 20.66, 15.24, 13.64],
				            smooth: true
				        }
				    ]
				};
		        let myChart1 = this.$echarts.init(this.$refs.myChart1)
		        let myChart2 = this.$echarts.init(this.$refs.myChart2)
		        let myChart3 = this.$echarts.init(this.$refs.myChart3)
		        let myChart4 = this.$echarts.init(this.$refs.myChart4)
		        let myChart5 = this.$echarts.init(this.$refs.myChart5)
		        myChart1.setOption(options);
		        myChart2.setOption(options);
		        myChart3.setOption(options);
		        myChart4.setOption(options);
		        myChart5.setOption(options);
		    }
		},
		mounted(){
			this.drawLine();
		}
	}
</script>

<style scoped>
	.header{
		height: .5rem;
		display: flex;
		align-items: center;
		background: #fff;
		padding-left: .2rem;
	}
	.header .return{
		font-size: .16rem;
		color: #484848;
		display: flex;
		align-items: center;
	}
	.header .return img{
		width: .14rem;
		height: .14rem;
	}
	.chartBox{
		padding-left: .28rem;
		box-sizing: border-box;
		background: #fcfcfc;
	}
	.chartBox .title{
		font-size: .28rem;
		color: #484848;
		line-height: .58rem;
	}
	.chartBox .firstChart .name{
		font-size: .16rem;
		color: #565656;
		line-height: .38rem;
	}
	#myChart{
		width: 100%;
		height: 3.5rem;
	}
</style>