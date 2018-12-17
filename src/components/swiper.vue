<template>
	<div class="containter">
		<swiper :aspect-ratio="300/800" @on-index-change="onSwiperItemIndexChange" v-model="swiperItemIndex">
			<swiper-item class="swiper-demo-img" v-for="(item, index) in demo04_list" :key="index">
				<img :src="item">
			</swiper-item>
		</swiper>
	
		 <div style="width:100px">
			<v-chart :data="data" prevent-default>
				<v-scale x :tick-count="3" />
				<v-tooltip :show-item-marker="false" show-x-value />
				<v-line />
			</v-chart>
		</div>

		<ul class="clearfix">
			<li v-if="imgs.length>0" v-for='(item ,index ) in imgs'>
				<img :src="item">
			</li>
			<li style="position:relative" v-if="imgs.length>=6 ? false : true">
				<img src="https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg"><input class="upload" @change='add_img' type="file">
			</li>
		</ul>

	</div>
</template>
<script>
	import { Swiper, GroupTitle, SwiperItem, XButton, Divider } from 'vux'
	import { VChart, VTooltip, VLine, VScale } from 'vux'
	import $ from "jquery"
	import 'lib-flexible'
	const imgList = [
		'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg',
		'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg',
		'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg'
	]

	const demoList = imgList.map((one, index) => ({
		url: 'javascript:',
		img: one
	}))

	export default {
		name: 'HelloWorld',
		components: {
			Swiper,
			SwiperItem,
			GroupTitle,
			XButton,
			Divider,
			VChart,
			VTooltip,
			VLine,
			VScale

		},
		data() {
			return {
				imgs: [],
				imgData: {
					accept: 'image/gif, image/jpeg, image/png, image/jpg',
				},
				msg: '赖灿福',
				demo04_list: imgList,
				swiperItemIndex: 1,
				showtitle: '导航栏',
				data: [{
						date: '2017-06-05',
						value: 116
					},
					{
						date: '2017-06-06',
						value: 129
					},
					{
						date: '2017-06-07',
						value: 135
					},
					{
						date: '2017-06-08',
						value: 86
					},
					{
						date: '2017-06-09',
						value: 73
					},
					{
						date: '2017-06-10',
						value: 85
					}
				]
			}
		},
		created: function() {
			var $ = require("jquery");
			console.log($('#aa').text());

		},
		computed: {

		},
		methods: {
			onSwiperItemIndexChange: function() {
				console.log(2)

			},
			add_img(event) {
				console.log(1)
				let reader = new FileReader();
				let img1 = event.target.files[0];
				let type = img1.type; //文件的类型，判断是否是图片
				let size = img1.size; //文件的大小，判断图片的大小
				if(this.imgData.accept.indexOf(type) == -1) {
					alert('请选择我们支持的图片格式！');
					return false;
				}
				if(size > 3145728) {
					alert('请选择3M以内的图片！');
					return false;
				}
				var uri = ''
				let form = new FormData();
				form.append('file', img1, img1.name);
				console.log(form)
				this.axios.post('https://etongwang.net/upload/image', form, {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				}).then(response => {
					console.log(response.data)
					uri = response.data.url
					reader.readAsDataURL(img1);
					var that = this;
					reader.onloadend = function() {
						that.imgs.push(uri);
					}
				}).catch(error => {
					alert('上传图片出错！');
				})

			}
		}
	}
</script>

<!-- Add "scoped" 添加“作用域”属性，仅将CSS限制到此组件 -->
<style scoped>
	#app {
		opacity: 1;
	}
	
	.copyright {
		font-size: 12px;
		color: #ccc;
		text-align: center;
	}
	
	.text-scroll {
		border: 1px solid #ddd;
		border-left: none;
		border-right: none;
	}
	
	.text-scroll p {
		font-size: 12px;
		text-align: center;
		line-height: 30px;
	}
	
	.black {
		background-color: #000;
	}
	
	.title {
		line-height: 100px;
		text-align: center;
		color: #fff;
	}
	
	.animated {
		animation-duration: 1s;
		animation-fill-mode: both;
	}
	
	.vux-indicator.custom-bottom {
		bottom: 30px;
	}
	
	@-webkit-keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translate3d(0, 100%, 0);
		}
		100% {
			opacity: 1;
			transform: none;
		}
	}
	
	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translate3d(0, 100%, 0);
		}
		100% {
			opacity: 1;
			transform: none;
		}
	}
	
	.fadeInUp {
		animation-name: fadeInUp;
	}
	
	.swiper-demo-img img {
		width: 100%;
	}