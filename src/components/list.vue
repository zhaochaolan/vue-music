<template>
  <div class="list-content">
    <div class="listhd">
      <div class="listthdc">
        <h4>播放列表(
            <span class="flag">2</span>
          )
        </h4>
        <a class="addall" href="javascript:void(0)">
          <span class="fa"></span>
          收藏全部
        </a>
        <span class="line"></span>
        <a class="clear" href="javascript:void(0)">
          <span class="fa"></span>
          清除
        </a>
        <p class="lytic flag">爱了很久的朋友</p>
      </div>
    </div>
    <ul class="music-item">
      <li v-for="item in list">
        <a @click="play(item._id)" class="music-content">
        <div class="col photo">
          <img :src="item.img"/>
        </div>
          <h3 class="title">{{item.name}}</h3>
          <span class="article">{{item.singer}}</span>
        <span class="duration">{{item.duration}}</span>
        </a>
      </li>
    </ul>

  <!--<div class="list">-->
    <!--<div class="listhd">-->
      <!--<div class="listhdc">-->
        <!--<h4 class="title">播放列表(-->
          <!--<span class="flg">2</span>-->
          <!--)-->
        <!--</h4>-->
        <!--<a href="javascript:void(0)" class="addall">-->
          <!--<span class="ico ico-add"></span>-->
          <!--收藏全部-->
        <!--</a>-->
        <!--<span class="line"></span>-->
        <!--<a href="javascript:void(0)" class="clear">-->
          <!--<span class="ico icn-del"></span>-->
          <!--清除-->
        <!--</a>-->
        <!--<p class="lytit">告白气球</p>-->
        <!--<span class="close"></span>-->
      <!--</div>-->
    <!--</div>-->
    <!--<div class="listbd">-->
      <!--<div class="msk"></div>-->
      <!--<div class="listbcd j-flag">-->
        <!--<ul class="f-cb">-->
          <!--<li class="one-song song" v-for="item in list">-->
            <!--<a @click="play(item._id)" class="music-content">-->
            <!--<div class="col col-1">-->
              <!--<div class="playicn"></div>-->
            <!--</div>-->
            <!--<div class="col col-2 aa" data-src="source/gaobaiqiqiu.mp3" data-srce="http://p1.music.126.net/cUTk0ewrQtYGP2YpPZoUng==/3265549553028224.jpg?param=34y34" data-name="周杰伦" data-time="3:40" data-index="0">告白气球-->
              <!--<div class="pl"></div>-->
            <!--</div>-->
            <!--<div class="col col-3">-->
              <!--<div class="icns">-->
                <!--<i class="ico icn-del">删除</i>-->
                <!--<i class="ico icn-dl">下载</i>-->
                <!--<i class="ico icn-share">分享</i>-->
                <!--<i class="j-t ico icn-add">收藏</i>-->
              <!--</div>-->
            <!--</div>-->
            <!--<div class="col col-4">-->
								<!--<span title="告白气球">-->
									<!--<a href="javascript:void(0)">{{item.name}}</a>-->
								<!--</span>-->
            <!--</div>-->
            <!--<div class="col col-5">{{item.duration}}</div>-->
            <!--<div class="col col-6">-->
              <!--<a href="javascript:void(0)" class="ico ico-src-dis"></a>-->
            <!--</div>-->
            <!--</a>-->
          <!--</li>-->
        <!--</ul>-->
      <!--</div>-->
    <!--</div>-->
  <!--</div>-->
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'list',
    data () {
      return {
          list:[]
      }
    },
  methods:{
        play:function (id) {
            this.$router.push("/item/"+id)
        }
  },
    mounted(){
        axios.get("http://localhost:3000/users#/").then((e)=>{
            //完成仓库数据的初始化
            this.$store.commit("INITMUSIC",e.data);
            //服务端返回的数据
            this.list = e.data;//给当前页面赋值
        })
    }
  }
</script>
<style>
  .list-content{
    background-color: #333333;
    width: 70%;
    height: 70%;
    margin: 0 auto;
  }
  .listhd{
    height: 41px;
    background-image: url("http://s2.music.126.net/style/web2/img/frame/playlist_bg.png?b2055ed0b56484d541e141e59b3d25e8");
    background-position: 0 0;
    padding: 0 5px;
  }
  .listthdc{
    position: relative;
    height: 40px;
  }
  .listthdc h4{
    position: absolute;
    left: 25px;
    top: 0;
    line-height: 10px;
    font-size: 14px;
    color: #e2e2e2;
  }
  .addall{
    left:398px;
  }
  .addall,.clear{
    position: absolute;
    top: 12px;
    height: 15px;
    line-height: 15px;
    cursor:pointer;
    color: #D2E0E6;
    text-decoration: none;
    font-size: 14px;
  }
  .clear{
    left: 490px;
  }
  .line{
    position: absolute;
    top: 13px;
    left: 477px;
    height: 15px;
    border-left: 1px solid #000;
    border-right: 1px solid #2c2c2c;
  }
  .lytic{
    position: absolute;
    left: 595px;
    top: 0;
    width: 346px;
    text-align: center;
    height: 39px;
    line-height: 10px;
    color: #fff;
    font-size: 14px;
  }
  .music-item{
    overflow: hidden;
  }
  .music-item li{
    position: relative;
    height: 50px;
    color: #e3d2d2;
  }
  .photo{
    position: absolute;
    left: 10px;
    top: 0;
  }
  .title{
    position: absolute;
    left: 60px;
    top: -10px;
  }
</style>
