<template>
  <div id="proiect">
    <router-view/>
  </div>
</template>

<script>
	import store from './store/index.js';
export default {
  name: 'App',
  store,
	mounted(){
//		window.addEventListener('beforeunload', e => {
//  	//页面刷新前把token值保存到本地缓存
//		  localStorage.setItem('proName', this.$store.state.proName);
//		  localStorage.setItem('batchId', this.$store.state.batchId);
//		});
//		window.addEventListener('load', e => {
//			this.$router.push('Index')
////			//页面刷新后把本地缓存的token值赋给token，在删除本地缓存
////			store.dispatch('setMuProName',localStorage.getItem("proName"));
////			store.dispatch('setMuBatchId',localStorage.getItem("batchId"));
////			localStorage.removeItem('proName');
////			localStorage.removeItem('batchId');
//		});
	}
}
</script>

<style>
	*{
		margin: 0;
		padding: 0;
	}
	html{
		font-size: 625%;
	}
	body{
		font-size: .16rem;
	}
</style>
