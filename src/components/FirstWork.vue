<template>
    <div id="provenances">
        <div class="header" ref="header">
			<div class="return" @click="getBack">
				<img src="../assets/images/left.png" /> 返回
			</div>
		</div>
        <!-- <div class="banner">
            <mt-swipe :auto="4000">
                <mt-swipe-item v-for="item of pictureInfoList">
                    <img :src="'/api/pictureInfo/show/'+item.pictureUrl" />
                </mt-swipe-item>
            </mt-swipe>
        </div> -->
        <div class="content">
            <ul>
                <li class="content-item">
                    <img width="18" style="vertical-align:top" src="../assets/images/1.png">
                    <span>初加工时间</span>
                    <span style="float:right;margin-right:10px">{{dataMsg ? dataMsg.initTime : ''}}</span>
                </li>
                <li class="content-item">
                    <img width="18" style="vertical-align:top" src="../assets/images/2.png">
                    <span>初加工批次</span>
                    <span style="float:right;margin-right:10px">{{dataMsg ? dataMsg.initCode : ''}}</span>
                </li>
                <li class="content-item">
                    <img width="18" style="vertical-align:top" src="../assets/images/10.png">
                    <span>初加工工艺</span>
                    <span v-if="dataMsg">
                        <span style="float:right;margin-right:10px" v-for="item in dataMsg.initMethod" :key="item.id">
                            {{item.processingName}}
                        </span>
                    </span>
                </li>
                <li class="content-item">
                    <img width="18" style="vertical-align:top" src="../assets/images/5.png">
                    <span>操作人</span>
                    <span style="float:right;margin-right:10px">{{dataMsg ? dataMsg.realName : ''}}</span>
                </li>
            </ul>
        </div>
        <div class="content-test" v-if="tabDatas.length > 0">
            <div class="test-title">
                <img width="15" style="vertical-align: top" src="../assets/images/4.png">
                <span>初加工质检</span>
                <span style="float:right;margin-right:10px"></span>
            </div>
            <div class="tab-wrapper">
                <van-tabs @change='changeTab'>
                    <van-tab :title='tabDatas[0].code'>
                        <div slot="title">
                            <img src="../assets/images/8.png" style="box-shadow: 0px 7px 4px #ccc; border-radius:50%" width="40" alt="">
                            <span class="title-text">检测项目标准</span>
                        </div>
                         <div class="tab-content">
                            <div>检测项目标准检验数据：</div>
                            <table>
                                <thead>
                                    <th>检测时间</th>
                                    <th>检测项目</th>
                                    <th>检测结果</th>
                                    <th>标准</th>
                                </thead>
                                <tbody v-if="!tableDatas.length">
                                    <tr>
                                        <td colspan="4">暂无数据</td>
                                    </tr>
                                </tbody>
                                <tbody v-else>
                                    <tr v-for="(item,index) in tableDatas" :key="index">
                                        <td>{{item.detectionTime}}</td>
                                        <td>{{item.item}}({{item.unit ? item.unit.displayName : ''}})</td>
                                        <td>{{item.value}}</td>
                                        <td>{{item.minValue}}-{{item.maxValue}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </van-tab>
                    <van-tab :title='tabDatas[1].code'>
                        <div slot="title">
                            <img src="../assets/images/6-1.png" style="box-shadow: 0px 7px 4px #ccc; border-radius:50%" width="40" alt="">
                            <span class="title-text">农残</span>
                        </div>
                        <div class="tab-content">
                            <div>农残检验数据：</div>
                            <table>
                                <thead>
                                    <th>检测时间</th>
                                    <th>检测项目</th>
                                    <th>检测结果</th>
                                    <th>标准</th>
                                </thead>
                                <tbody v-if="!tableDatas.length">
                                    <tr>
                                        <td colspan="4">暂无数据</td>
                                    </tr>
                                </tbody>
                                <tbody v-else>
                                    <tr v-for="(item,index) in tableDatas" :key="index">
                                        <td>{{item.detectionTime}}</td>
                                        <td>{{item.item}}({{item.unit ? item.unit.displayName : ''}})</td>
                                        <td>{{item.value}}</td>
                                        <td>{{item.minValue}}-{{item.maxValue}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </van-tab>
                    <van-tab :title='tabDatas[2].code'>
                        <div slot="title">
                            <img src="../assets/images/7.png" style="box-shadow: 0px 7px 4px #ccc; border-radius:50%" width="40" alt="">
                            <span class="title-text">重金属</span>
                        </div>
                         <div class="tab-content">
                            <div>重金属检验数据：</div>
                            <table>
                                <thead>
                                    <th>检测时间</th>
                                    <th>检测项目</th>
                                    <th>检测结果</th>
                                    <th>标准</th>
                                </thead>
                                <tbody v-if="!tableDatas.length">
                                    <tr>
                                        <td colspan="4">暂无数据</td>
                                    </tr>
                                </tbody>
                                <tbody v-else>
                                    <tr v-for="(item,index) in tableDatas" :key="index">
                                        <td>{{item.detectionTime}}</td>
                                        <td>{{item.item}}({{item.unit ? item.unit.displayName : ''}})</td>
                                        <td>{{item.value}}</td>
                                        <td>{{item.minValue}}-{{item.maxValue}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </van-tab>
                </van-tabs>
            </div>
        </div>
        <div class="content-baogao" v-if="this.detectionPic">
            <div class="baogao-title">
                <img width="15" style="vertical-align:top" src="../assets/images/4.png">
                <span>初加工检测报告</span>
            </div>
            <div class="img-wrapper">
                <img width="100%" :src="'/api/pictureInfo/show/' + (this.detectionPic ? this.detectionPic.pictureUrl : '')">
            </div>
        </div>
    </div>
</template>
<script>
import { Swipe, SwipeItem } from 'mint-ui';
import { ImagePreview } from 'vant';

export default {
    name: 'FirstWork',
    mounted() {
        this.$nextTick(function () {
            document.title = '初加工'
        })
    },
    created() {
        this.retroCode = this.$route.query.retroCode;
        this.$http.get('/api/enum/getDetectionCategoryEnum').then(res => {
            if (res.data.success) {
                this.tabDatas = res.data.result
            }
        })
        this.$http.get('/api/retro/init/getInit?retroCode=' + this.retroCode).then(res => {
            if (res.data.success) {
                this.dataMsg = res.data.result
                this.relationId = this.dataMsg ? this.dataMsg.detectionId : ''
                this.detectionPic = this.dataMsg ? this.dataMsg.detectionPic : ''
                this.detectionResultPic = this.dataMsg ? this.dataMsg.detectionResultPic : ''
                if (this.relationId && this.tabDatas.length) {
                    this.$http.get('/api/retro/init/getDetectionItem', {
                        params : {
                            category: this.tabDatas[0].code,
                            relationId: this.relationId
                        }}).then(res => {
                            if (res.data.success) {
                                this.tableDatas = res.data.result
                            }
                        })
                }
            }
        })
    },
    data() {
        return {
            pictureInfoList: [],
            tabDatas: [],
            tableDatas: [],
            dataMsg: {},
            relationId: '',
            detectionPic: '',
            detectionResultPic: ''
        }
    },
    methods: {
        getBack() {
            this.$router.go(-1)
        },
        changeTab(name,title) {
            if (this.relationId) {
                this.$http.get('/api/retro/init/getDetectionItem', {
                    params : {
                        category: title,
                        relationId: this.relationId
                    }}).then(res => {
                        if (res.data.success) {
                            this.tableDatas = res.data.result
                        }
                    })
            }
        }
    }
}
</script>
<style lang="stylus">
    #provenances {
        font-size 0.12rem
        background-color: rgba(0, 0, 0, 0.1)
        .header {
            height: .5rem;
            display: flex;
            align-items: center;
            background: #fff;
            padding-left: .2rem;
        }
        
        .header .return {
            font-size: .16rem;
            color: #484848;
            display: flex;
            align-items: center;
        }
        
        .header .return img {
            width: .14rem;
            height: .14rem;
        }
        .banner{
            width: 100%;
            height: 2.2rem;
            background-color: #fff;
            margin-bottom: 10px
        }
        .banner img{
            display: block;
            width: 100%;
            height: 100%;
        }
        .content .content-item {
            background-color: #fff
            padding: 10px;
            border-bottom 1px solid rgba(0, 0, 0, 0.2)
            
        }
        .content-test {
            margin-top: 10px
            background-color #fff
        }
        .content-baogao {
            margin-top: 10px
            background-color #fff
            padding 10px
        }
        .content-baogao .baogao-title {
            margin-bottom: 10px
        }
        .test-title {
            padding: 10px;
            font-size 0.12rem
        }
        .tab-wrapper .title-text {
            height:20px;
            line-height:20px;
            margin: -10px 0 10px
        }
        .tab-wrapper .van-tabs {
            padding-top: 75px
        }
        .tab-wrapper .van-tabs .van-tabs__wrap{
            height: 75px
        }
        .van-hairline--top-bottom::after {
            border: none
        }
        .tab-content{
            padding 10px
            margin-top 10px
        }
        table {
            padding: 10px
            width: 100%
            box-sizing: border-box
            border-spacing: 0
        }
        table th {
            color: #fc833e
        }
        table tr {
            padding-top: 10px
            text-align: center
        }
        table tr td {
            height: 30px
            padding-top:10px
        }
    }
</style>