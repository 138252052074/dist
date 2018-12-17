<template>
	<div class="tab">
		<ul>
			<li v-for="(item,key) in tabList" @click="click(key)">{{item.name}}</li>
		</ul>
	</div>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				showtitle: '导航栏',
				tabList: []
			}
		},
		created: function() {
			
		},
		methods: {
			click: function(key) {	
				if(key==2){
					this.$router.push('./swiper')
				}
			}
		},
		mounted() {
			this.axios.get('/static/json/data.json').then(res => {
				this.tabList = res.data.data.row;
			});
		}
	}
</script>

<style>
	ul li {
		text-align: left;
	}
</style>