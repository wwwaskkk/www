<template>

	<basePageComponents ref="basePage" :loadmore="false" :apiLoadingStatus="false" :isLoading="false"
		:canRefresh="false">
		<!-- <goodsDetailSwitchComponents slot="fixedTop" :dataList="navItems" @changeNav="changeNav"
			:currentIndex="selectedIndex">
		</goodsDetailSwitchComponents> -->
		<view slot="body">
			<!-- <view  v-show="selectedIndex == 0">
				<coBuyComponent :opay="opay" :payment="payment1" @updatData="requestData"></coBuyComponent>
				
			</view> -->
			<view >
				<coSellComponent  :opay="opay" :payment="payment2" @updatData="requestData"></coSellComponent>
			</view>
		</view>
	</basePageComponents>
</template>

<script>
	export default {
		data() {
			return {
				opay:{},//余额
				payment1:[],//支付方式
				payment2:[],//支付方式
				selectedIndex: 0,
				navItems: [{
					id: 0,
					name: this.$t('createorderpage_createorderpage_46')
				}, {
					id: 1,
					name: this.$t('createorderpage_createorderpage_47')
				}],

			}
		},
		onShow() {
			let index = uni.graceJS.getStorage("tabIndex");
			if (index != false) {
				console.log(index);
				this.selectedIndex = (index - 1);
				uni.graceJS.removeStorage("tabIndex");
			}
			this.requestData();
			this.getpayment();
		},
		methods: {
			changeNav(index) {
				console.log(index);
				this.selectedIndex = index;
			},
			
			requestData(){
				
				let data = {
					edit:false
				};
				uni.PYRequest.allAssets(data, (res) => {
					
					if(res.data.length > 0){
						this.opay = res.data[0]
					}
				}, (error) => {
				}, (complete) => {
				})
				
			},
			
			getpayment(){
				let data = {
				};
				
				console.log(data);
				uni.PYRequest.getpayment(data, (res) => {
					
					this.payment1 = [];
					this.payment2 = [];
					for(let i = 0;i< res.data.length;i++){
						
						if(res.data[i].mode == "alipay"){
							this.payment1.push({
								name:this.$t('createorderpage_createorderpage_48'),
								checked:false,
							})
							this.payment2.push({
								name:this.$t('createorderpage_createorderpage_48'),
								checked:false,
							})
							
						}else if(res.data[i].mode == "wechat"){
							
							this.payment1.push({
								name:this.$t('createorderpage_createorderpage_49'),
								checked:false,
							})
							this.payment2.push({
								name:this.$t('createorderpage_createorderpage_49'),
								checked:false,
							})
						}else if(res.data[i].mode == "bank"){
							
							this.payment1.push({
								name:this.$t('createorderpage_createorderpage_50'),
								checked:false,
							})
							this.payment2.push({
								name:this.$t('createorderpage_createorderpage_50'),
								checked:false,
							})
						}
						
					}
				
					
				}, (error) => {
				
				
				}, (complete) => {
				
				})
			}
		}
	}
</script>

<style>
page {
	background-color: #F5F5F5;
}

</style>
