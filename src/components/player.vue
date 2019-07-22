<template>
  <div>
    <div class="lyric">
      <p class="previous" v-for="(item,index) in lines" :class="currentLine === index?currentClass:''">{{item.text}}</p>
    </div>
    <div class="player-wrapper">
      <audio id="pl" src="../../static/UH.mp3"></audio>
        <div class="player-content">
      <div class="play-control">
        <a href="javascript:void(0)" class="prev control-btn" @click="prev()"></a>
        <a href="javascript:void(0)" class="control-btn play" @click="play()"></a>
        <a href="javascript:void(0)" class="next control-btn" @click="next()"></a>
      </div>
      <div class="progress-control">
        <div class="music-img">
          <img :src="item.img" :alt="item.name" class="imgg">
        </div>
        <div class="progress">
          <div class="top">
            <a href="javascript:void(0);" class="music-name">{{item.name}}</a>
            <span class="singer-name">{{item.singer}}</span>
          </div>
          <div class="bottom">
            <div class="progress-main">
              <div class="current-bar">
                <a href="javascript:void(0)" class="current-slider"></a>
              </div>
            </div>
            <div class="current-control">
              <em class="current time">00:00</em>&nbsp;/&nbsp;<em class="duration time">{{item.duration}}</em>
            </div>
          </div>
        </div>
      </div>
      <div class="ctrl">
        <router-link to="/list">
          <span class="add">
					<a href="javascript:void(0)" class="icn-list"></a>
				</span>
        </router-link>
        <span>
          <a class="icn icn-vol"></a>
        </span>
        <div class="m-vol">
          <div class="barbg"></div>
          <div class="vbg j-t">
            <div class="curr"></div>
            <span class="btn f-alpha j-t"></span>
          </div>
        </div>
      </div>
    </div>
  </div>

  </div>
</template>

<script>
  export default {
    name: 'player',
    data () {
      return {
          item:[],//当前要播放的音乐
          currentIndex:0,
          current:"",//当前播放时间
          lines:[],
        currentLine:'w',//当前播放行
        currentClass:'current',//当前被选中的样式
        play1:'play',
        pause1:'pause',
        lyrcurrent:0,
          lyric : "[00:00.00]周杰伦 - 告白气球\n"+
          "[00:08.00]词：方文山\n"+
       "[00:16.00]曲：周杰伦\n"+
        "[00:22.90]塞纳河畔 左岸的咖啡\n"+
        "[00:25.40]我手一杯 品尝你的美\n"+
        "[00:28.43]留下唇印的嘴\n"+
        "[00:32.95]花店玫瑰 名字写错谁\n"+
        "[00:36.59]告白气球 风吹到对街\n"+
        "[00:39.35]微笑在天上飞\n"+
        "[00:44.11]你说你有点难追\n"+
        "[00:46.35]想让我知难而退\n"+
        "[00:48.62]礼物不需挑最贵\n"+
        "[00:51.61]只要香榭的落叶\n"+
        "[00:54.10]喔～营造浪漫的约会\n"+
        "[00:57.12]不害怕搞砸一切\n"+
        "[00:59.59]拥有你就拥有 全世界\n"+
        "[01:04.85]亲爱的 爱上你 从那天起\n"+
        "[01:11.10]甜蜜的很轻易\n"+
        "[01:15.60]亲爱的 别任性 你的眼睛\n"+
        "[01:21.60]在说我愿意\n"+
        "[01:25.86]\n"+
        "[01:48.35]塞纳河畔 左岸的咖啡\n"+
        "[01:50.60]我手一杯 品尝你的美\n"+
        "[01:54.11]留下唇印的嘴\n"+
        "[01:58.25]花店玫瑰 名字写错谁\n"+
        "[02:01.59]告白气球 风吹到对街\n"+
        "[02:04.60]微笑在天上飞\n"+
        "[02:09.06]你说你有点难追\n"+
        "[02:11.60]想让我知难而退\n"+
        "[02:14.35]礼物不需挑最贵\n"+
        "[02:16.85]只要香榭的落叶\n"+
        "[02:19.60]喔～营造浪漫的约会\n"+
        "[02:22.35]不害怕搞砸一切\n"+
        "[02:24.61]拥有你就拥有 全世界\n"+
        "[02:30.11]亲爱的 爱上你 从那天起\n"+
        "[02:36.60]甜蜜的很轻易\n"+
        "[02:41.10]亲爱的 别任性 你的眼睛\n"+
        "[02:47.11]在说我愿意\n"+
        "[02:51.60]亲爱的 爱上你 恋爱日记\n"+
        "[02:58.11]飘香水的回忆\n"+
        "[03:01.57]一整瓶 的梦境 全都有你\n"+
        "[03:08.11]搅拌在一起\n"+
        "[03:12.61]亲爱的别任性 你的眼睛\n"+
        "[03:20.61]在说我愿意"
    }
    },
    mounted(){
        var id = this.$route.params.id;//取出url的参数
      var that = this;
      //根据id匹配要播放的音乐
      this.$store.state.musicList.forEach((a,item)=>{
          if(a._id ===id){
            that.item = a;
            that.init();
          }
      })
    },
    methods:{
        init:function () {
          this.item.playing = false;
          document.getElementById('pl').src = this.item.fileName;
          this.fetch();
          var plDom = document.getElementById('pl');
          plDom.addEventListener('timeupdate',()=>{
              this.current = plDom.currentTime;
              var oldDate = this.lines[this.lyrcurrent].time.split(':');
              var lyrTime = parseInt(oldDate[0]) * 60 + parseInt(oldDate[1]);
              var strl = this.current - lyrTime;//当前播放时间 - 歌词时间
              if(strl == 0||strl>0){
                  this.currentLine = this.lyrcurrent;  //改变歌词显示
                  this.lyrcurrent +=1; //下一个歌词的下标
              }
          })
        },
      //歌词分割
      fetch:function () {
        this.lines = [];
        var lines = this.lyric.split('\n');
        for(var k in lines){
            var timeMatch = lines[k].match(/\[(\d+:\d+\.\d+)\]/);
            this.lines.push({
              time:timeMatch?timeMatch.pop():"",
              text:lines[k].replace(/^.+?\]/, '')
            })
        }
      },
      play(){
        var playDom = document.getElementsByClassName('play')[0];
        if(this.item.playing){
          document.getElementById('pl').pause();
          playDom.style.backgroundPosition = '0 -204px';
        }else{
          document.getElementById('pl').play();
          playDom.style.backgroundPosition = '-40px -165px';
        }
        this.item.playing = !this.item.playing;
      },
      prev(){
        var number = --this.currentIndex;
        if(number < 0){
            number = 0;
            this.currentIndex = number;
        }
        this.item = this.$store.state.musicList[number];
        this.current = 0;
        this.init();
        this.item.playing = true;

      },
      next(){
        var number = ++ this.currentIndex;
        if(this.$store.state.musicList.length - 1 <number){
          number = this.$store.state.musicList.length - 1;
          this.currentIndex = number;
        }
        this.item = this.$store.state.musicList[number];
        this.current = 0;
        this.init();
        this.item.playing = true;
      }
    }
  }
</script>
<style>
  .current{
    color: #795da3;
  }
  .previous{
    font-size: 12px;
  }
  .lyric{
    background: #00B7FF;
    width: 500px;
    height: 700px;
    margin: 0 auto;
  }
  .player-wrapper{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 53px;
    background-image: url(http://s2.music.126.net/style/web2/img/frame/playbar.png);
    background-repeat: repeat-x;
  }
  .player-wrapper .player-content{
    width: 980px;
    height: 47px;
    margin: 6px auto;
    position: relative;
  }
  .play-control{
    width: 137px;
    padding: 6px 0 0 0;
    float: left;
  }
  .play-control .control-btn{
    display: inline-block;
    margin-top: 5px;
    width: 28px;
    height: 28px;
    background-image: url('http://s2.music.126.net/style/web2/img/frame/playbar.png?0f1d157bc5ccc757ef565dd0a5af4746');
    background-repeat: no-repeat;
    vertical-align: top;
  }
  .play-control .control-btn.prev{
    background-position: 0 -130px;
  }
  .play-control .control-btn.play{
    width: 36px;
    height: 36px;
    margin-top: 0;
    background-position: 0 -204px;
    /*暂停background-position: -40px -165px;*/
  }
  .play-control .control-btn.next{
    background-position: -80px -130px;;
  }
  .progress-control{
    float: left;
  }
  .current-control{
    float: left;
  }
  .music-img{
    width: 34px;
    height: 34px;
    margin: 6px 15px 0 0;
    float: left;
  }
  .progress{
    width: 608px;
    float: left;
  }
  .progress .music-name{
    height: 28px;
    line-height: 28px;
    max-width: 300px;
    color: #e8e8e8;
  }
  .progress .singer-name{
    margin-left: 15px;
    color: #fff;
  }
  .progress-main{
    position: relative;
    float: left;
    width: 493px;
    height: 9px;
    margin-top: 2px;
    background-image: url('http://s2.music.126.net/style/web2/img/frame/statbar.png');
    background-repeat: repeat-x;
    background-position: right 0;
    cursor: pointer;
  }
  .current-control{
    float: left;
    color: #797979;
    margin-left: 15px;
  }
  .current-control .time{
    font-style: normal;
    font-size: 12px;
  }
  .current-control .current{
    color: #a1a1a1;
  }
  .current-control .duration{
    color: #fff;
  }
  .current-bar {
    position: absolute;
    width: 0;
    height: 100%;
    background-image: url('http://s2.music.126.net/style/web2/img/frame/statbar.png');
    background-repeat: repeat-x;
    background-position: left -66px;
  }
  .current-slider{
    position: absolute;
    top: -7px;
    right: -13px;
    width: 22px;
    height: 24px;
    background-image: url('http://s2.music.126.net/style/web2/img/ie6/ply_btn_hvr.png');
    background-position: 0 0;
    background-repeat: no-repeat;
  }
  .ctrl{
    width: 113px;
    padding-left: 13px;
    float: right;
    background-image: url(http://s2.music.126.net/style/web2/img/frame/playbar.png?0f1d157bc5ccc757ef565dd0a5af4746);
    background-position: -147px -238px;
    background-repeat: no-repeat;
    position: relative;
  }
  .add{
    float: left;
    width: 59px;
    height: 36px;
  }
  .icn-list{
    display: block;
    float: none;
    width: 38px;
    height: 25px;
    margin: 11px 2px 0 0;
    padding-left: 21px;
    background-image: url(http://s2.music.126.net/style/web2/img/frame/playbar.png?0f1d157bc5ccc757ef565dd0a5af4746);
    background-position: -42px -68px;
    background-repeat: no-repeat;
    line-height: 27px;
    text-align: center;
    color: #666;
    text-shadow: 0 1px 0 #080707;
    text-indent: 0;

  }
  .m-vol{
    position: absolute;
    left: 70px;
    top:-113px;
    width: 32px;
    height: 113px;
    visibility: hidden;
  }
  .barbg{
    position: absolute;
    top:0;
    left: 0;
    width: 32px;
    height: 113px;
    background-position: 0 -503px;
    background-image: url(http://s2.music.126.net/style/web2/img/frame/playbar.png?2a1257e66cfe309f4d5eefa8f021a655);
  }
  .vbg,.curr{
    position: absolute;
    left:14px;
    width: 4px;
    height:93px;
  }
  .vbg{
    padding:4px 0;
    top:7px;
  }
  .curr{
    height: 30px;
    top:auto;
    bottom:4px;
    left:0;
    background-position: -40px bottom;
    overflow: hidden;
    background-image: url(http://s2.music.126.net/style/web2/img/frame/playbar.png?2a1257e66cfe309f4d5eefa8f021a655);

  }
  .btn{
    position: absolute;
    top:42px;
    left: -7px;
    display: block;
    width: 18px;
    height: 20px;
    background-position: -40px -280px;
    background-image: url(http://s2.music.126.net/style/web2/img/iconall.png?1ddf48fe20434288a584b4a3dc00d5b4);
  }
  .icn{
    float: left;
    width: 25px;
    height: 25px;
    margin: 11px 2px 0 0;
  }
  .icn-vol{
    background-position: -2px -248px;
    background-image: url('http://s2.music.126.net/style/web2/img/frame/playbar.png?c5015fbad3c768f8e2d6266e7b7e3b7e');
  background-repeat: no-repeat;
  }
</style>
