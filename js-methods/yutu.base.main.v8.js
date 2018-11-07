/**
 无线通用模版系统 -> 0.9
 jackiejiang edit 20150328 修复向上滑动动画没有重绘BUG
 jasonshan up 20150416 增加智能推荐boss上报，页面无缝滑动效果
 */
var autumnFestival = true;
var _bgmusic = true;
if (yt_global.autoPlay == 0 || yt_global.loopPlay == 0) {
    _bgmusic = false;
}
$(function() {
    // 定义一个公用判断背景音乐的函数
    var _isBgaudio = function() {
        var _audioobj = $(".u-audio").find("audio")[0];
        if ((_audioobj != undefined) && _audioobj.paused && _bgmusic) {
            $(".u-audio").addClass("u-play");
            _audioobj.play();
        }
    };
    /**
     * 生成页面时，获取当前专题浏览次数。
     * @return {[type]} [description]
     */
    window.yt_global_share_count = "";
    var getShareCount = function() {

        // if (yt_global.share_diy_s || yt_global.share_diy_e) {
        // if (yt_global.share_diy_s != "" || yt_global.share_diy_e != "") {

        self.isShareOk = true;

        var load_share = setInterval(function() {

            if (self.isShareOk) {

                var _mhost = window.location.href;
                if(_mhost.indexOf("joke.qq.com")>0){
                    _murl = "http://testshipei.qq.com/yutu/index.php?vote.achieve&activity_id=" + yt_global.id + "&msg=share";
                    
                }else{
                    _murl = "http://xw.qq.com/yutu/index.php?vote.achieve&activity_id=" + yt_global.id + "&msg=share";
                }

                $.ajax({
                    type: "get",
                    async: false,
                    url: _murl,
                    dataType: "jsonp",
                    jsonpCallback: "yutu_vote_callback",
                    success: function(data) {
                        if (data.tip == "success") {
                            self.isShareOk = false;
                            window.yt_global_share_count = data.data.totalCnt
                        }
                    },
                    error: function() {}
                });
            } else {
                clearInterval(load_share);
            }
        }, 300);
        // };

        // };

    };
    /*
    优化分享计数功能执行逻辑
     */

    if (yt_global.share_diy_s || yt_global.share_diy_e) {
        if (yt_global.share_diy_s != "" || yt_global.share_diy_e != "") {
            //getShareCount();
        }
    };

    window.endCurrPage = false;
    window.endNextPage = false;
    window.isAnimating = false;
    var $arrow = $(".slideArrow");
    var gallery = {
        index: 1, // 当前图片索引值
        min: 1, // 最小图片索引值
        max: 99, // 最大图片索引值
        prev: 0, // 上一个dom
        next: 2, // 下一个dom
        width: $(".yt-loadingpage").width(),
        height: $(".yt-loadingpage").height(), // window高度
        global: $("#main"),
        scale : '',
        specialBind: function(dom) {

            this.left && $(".pandaBox>div").css({
                marginLeft: this.left
            }); //兼容不同机型左侧留白边情况
            $(dom).each(function() {
                var self = $(this);
                if (self.data("special") == 1) {
                    bindExtend(self.data("panda-type"), g, self);
                }
                // if(self.css('bottom') == '0px'){
                //     $(this).css('bottom',(gallery.scale-1)*568);
                // }
                if(window.pageSwitch == 0 && self.css('bottom') == '0px'){
                  if(gallery.scale>=1){
                    $(this).css('bottom',(gallery.scale-1)*gallery.height/gallery.scale);
                  }else{
                    $(this).css('bottom','5px');
                  }
                }
                self.find('img').each(function() {
                    if ($(this).attr('src').indexOf('.gif') != -1) {
                        $(this).attr('src', $(this).attr('src') + '?' + Math.floor(Math.random() * 10000));
                    }
                });
            });
        },
        /**
         * laoding加载完成后的工作
         */
        LoadingComplete: function() {
            var that = this;
            $(".yt-loadingpage").remove();
            $(".pandaBox").show();

            // window._yutuPageLock 控制是否可以翻页，设置为true的时候，不执行翻屏事件
            console.log(window._yutuPageLock)
            $(document).swipeUp(function() {
                console.log('up')
                if (!window._yutuPageLock) that.doNext();
            }).swipeDown(function() {
                console.log('down')
                if (!window._yutuPageLock) that.doPrev();
            });

            /**
             * pageswitch == 0 为无缝滑动
             * 当开启无缝滑动时，给页面容器增加所需的动画样式
             */
            if (window.pageSwitch == 0) {

                $(".pandaBox").css({
                    'position': 'relative',
                    'visibility': 'visible',
                    'display': 'block',
                    'z-index': 0
                })

                $("#main,.pandaBox").addClass('page_animate');
                // $("#main").addClass("ease");
                this.left && (this.width = this.width / this.scale + 5, this.height = this.height / this.scale + 5);

                $("#main").css({
                    'width': this.width,
                    'height': this.height,
                    'position': 'relative',
                    '-webkit-transform': 'translate3d(0px, 0px, 0px)',
                    'transform': 'translate3d(0px, 0px, 0px)'
                })

            }

        },

        // 向后滚动
        doPrev: function(_prev) {
            autumnFestival = true;
            if ($(".yt_barrage_foot")) {
                $(".yt_barrage_foot").remove();
            };
            window._barrageKey = false
            clearInterval(window.this_barrage_interval);
            $(".package_yt_plusvote").find(".plusvotecontent").removeClass("bg");
            // window._yutuPageLock = false;
            _isBgaudio();
            if (window.isAnimating) {
                return false;
            }

            if (_prev) {
                _prev = Number($.trim(_prev));
                this.prev = _prev;
            }

            // 已滚动到最顶部
            if (this.index <= this.min) {
                return;
            }

            if ($('.slideArrow').css('display') === 'none') {
                $('.slideArrow').show();
            };

            window.isAnimating = true;

            var that = this,
                $nextPage = $("#pandaBox" + this.prev).addClass('pt-page-current'),
                animateClass;
            // that.pageswitch ? ($("#pandaBox"+this.index).data("up") || that.prevClass) : that.prevClass;
            if (that.pageswitch != 2) {
                animateClass = $("#pandaBox" + this.index).data("up") || that.prevClass;
            } else {
                animateClass = that.prevClass;
            }

            that.afterindex = that.index;
            that.afterprev = that.prev;



            // 开始滑动动画
            /**
             * pageswitch == 0 为无缝滑动
             * 当开启无缝滑动时使用独立的动画效果
             */
            if (that.pageswitch != 0) {
                $("#pandaBox" + that.index).addClass(animateClass[0]).on("webkitAnimationEnd", function() {
                    $("#pandaBox" + that.afterindex).off("webkitAnimationEnd");
                    window.endCurrPage = true;
                    if (window.endNextPage) {
                        onEndAnimation($("#pandaBox" + that.afterindex), $("#pandaBox" + that.afterprev));
                    }
                });
                $("#pandaBox" + that.prev).addClass(animateClass[1]).on("webkitAnimationEnd", function() {
                    $("#pandaBox" + that.afterprev).off("webkitAnimationEnd");
                    window.endNextPage = true;
                    if (window.endCurrPage) {
                        onEndAnimation($("#pandaBox" + that.afterindex), $("#pandaBox" + that.afterprev));
                    }
                });
                $("#pandaBox" + this.prev).addClass("pt-page-scaleUp").css({
                    "top": "0",
                    "-webkit-transform": "",
                    "transform": ""
                });
            } else {
                $("#main").addClass("ease");
                this.global.css({
                    "-webkit-transform": "translate3d(0px, -" + this.height * (that.prev - 1) + "px, 0px)",
                    "transform": "translate3d(0px, -" + this.height * (that.prev - 1) + "px, 0px)"
                });

                window.endCurrPage = true;
                if (window.endNextPage) {
                    onEndAnimation($("#pandaBox" + that.afterindex), $("#pandaBox" + that.afterprev));
                }
                window.endNextPage = true;
                if (window.endCurrPage) {
                    onEndAnimation($("#pandaBox" + that.afterindex), $("#pandaBox" + that.afterprev));
                }
            }

            // 重播开关
                // if (this.replay) {
                    window.isplusvote = false; // +1组件状态初始化
                    $("#pandaBox" + that.index).empty();
                    $("#pandaBox" + that.prev).html($("#pandaBox" + that.prev).data("yutu-html-m") || $("#pandaBox" + that.prev).html());
                    this.specialBind($("#pandaBox" + that.prev).find("[data-panda-type]"));
                    // 绑定扩展对象的处理
                    //bindExtend(this);
                // }


            // 重新计数
            if (_prev) {
                this.index = _prev;
            } else {
                this.index--
            }
            this.prev = this.index - 1;
            this.next = this.index + 1;

            $("#pandaBox" + this.index).find("[data-panda-type]").each(function() {
                var self = $(this),
                    cssanimate = self.data("yutu-animate");
                if (cssanimate) {

                    // 老版本的重绘组件把动画设置给子元素
                    self.find('.con').css('-webkit-animation', cssanimate);
                }

                filterAnimate(self);
            });

            // 不是最后一个时，三角箭头显示
            $arrow.show();
        },
        // 向前滚动
        doNext: function(_next) {
            autumnFestival = true;
            if ($(".yt_barrage_foot")) {
                $(".yt_barrage_foot").remove();
            };
            window._barrageKey = false
            clearInterval(window.this_barrage_interval);
            //去除最后一页的滑动图标，之前是没有显示的。谁加的记得注释下原因。
            //if ($('.slideArrow').css('display') === 'none') {
            //    $('.slideArrow').show();
            //};
            $(".package_yt_plusvote").find(".plusvotecontent").removeClass("bg");
            // window._yutuPageLock = false;
            _isBgaudio();
            if (window.isAnimating) {
                return false;
            }

            if (_next) {
                _next = Number($.trim(_next));
                this.next = _next;
            }

            // 已滚动最低部
            if (this.index >= this.max) {
                return;
            }

            window.isAnimating = true;

            var that = this,
                /**
                 * nextPage对象没有实例应用，所以注释掉
                 */
                $nextPage = $("#pandaBox" + this.next).addClass('pt-page-current'),
                animateClass;
            // that.pageswitch ? ($("#pandaBox"+this.index).data("down") || that.nextClass) : that.nextClass;
            if (that.pageswitch != 2) {
                animateClass = $("#pandaBox" + this.index).data("down") || that.nextClass
            } else {
                animateClass = that.nextClass;
            }

            that.afterindex = that.index;
            that.afternext = that.next;



            // 开始滑动动画
            /**
             * pageswitch == 0 为无缝滑动
             * 当开启无缝滑动时使用独立的动画效果
             */
            if (that.pageswitch != 0) {
                $("#pandaBox" + that.index).addClass(animateClass[0]).on("webkitAnimationEnd", function() {
                    $("#pandaBox" + that.afterindex).off("webkitAnimationEnd");
                    window.endCurrPage = true;
                    if (window.endNextPage) {
                        onEndAnimation($("#pandaBox" + that.afterindex), $("#pandaBox" + that.afternext));
                    }
                });
                $("#pandaBox" + that.next).addClass(animateClass[1]).on("webkitAnimationEnd", function() {
                    $("#pandaBox" + that.afternext).off("webkitAnimationEnd");
                    window.endNextPage = true;
                    if (window.endCurrPage) {
                        onEndAnimation($("#pandaBox" + that.afterindex), $("#pandaBox" + that.afternext));
                    }
                });
                $("#pandaBox" + this.next).addClass("pt-page-scaleUp").css({
                    "top": "0",
                    "-webkit-transform": "",
                    "transform": ""
                });
            } else {
                $("#main").addClass("ease");
                this.global.css({
                    "-webkit-transform": "translate3d(0px, -" + this.height * (that.next - 1) + "px, 0px)",
                    "transform": "translate3d(0px, -" + this.height * (that.next - 1) + "px, 0px)"
                });
                window.endCurrPage = true;
                if (window.endNextPage) {
                    onEndAnimation($("#pandaBox" + that.afterindex), $("#pandaBox" + that.afternext));
                }
                window.endNextPage = true;
                if (window.endCurrPage) {
                    onEndAnimation($("#pandaBox" + that.afterindex), $("#pandaBox" + that.afternext));
                }
            }

            // 重播开关
            // if (thisreplay) {
                        window.isplusvote = false; // +1组件状态初始化
                        // 上翻时，删除当前页的节点
                        $("#pandaBox" + that.index).empty();
                        $("#pandaBox" + that.next).html($("#pandaBox" + that.next).data("yutu-html-m") || $("#pandaBox" + that.next).html());
                        this.specialBind($("#pandaBox" + that.next).find("[data-panda-type]"));

                    // }


            // 重新计数
            if (_next) {
                this.index = _next;
            } else {
                this.index++
            }
            this.prev = this.index - 1;
            this.next = this.index + 1;
            $("#pandaBox" + this.index).find("[data-panda-type]").each(function() {
                var self = $(this),
                    cssanimate = self.data("yutu-animate");

                if (cssanimate) {

                    // 老版本的重绘组件把动画设置给子元素
                    self.find('.con').css('-webkit-animation', cssanimate);
                }

                filterAnimate(self);
            });

            // 最后一个时，三角箭头隐藏
            if (this.index == this.max) {
                $arrow.hide();
            }

        },
        /*
         页面初始化函数
         页面内的功能都集中在此处增加与维护
         滑动样式集,type参数是为以后扩展方向使用
         */
        init: function(animateClasses, obj) {
            var that = this;

            this.max = $(".pandaBox").size(); // 页面索引值
            if(this.max == 1){
                $arrow.hide();
            }

            this.prevClass = animateClasses[0];

            this.nextClass = animateClasses[1];

            obj = obj || {};

            // 容错处理
            // if (obj.animateReplay) {
            //     this.replay = Number(obj.animateReplay);
            // }

            //默认滑屏重绘动画
            this.replay = 1;

            this.pageswitch = Number(obj.pageSwitch);

            // if(obj.pageSwitch == 0){
            //
            // }else{
            //     this.pageswitch = 0;
            // }

            /**
             * 专题访问次数统计
             * @return {[type]} [description]
             */
            function share_count_fun() {
                var _shost = window.location.href;
                if(_shost.indexOf("joke.qq.com")>0){
                    _surl = "http://testshipei.qq.com/yutu/index.php?vote.add&activity_id=" + yt_global.id + "&msg=share";
                    
                }else{
                    _surl = "http://xw.qq.com/yutu/index.php?vote.add&activity_id=" + yt_global.id + "&msg=share";
                }
                $.ajax({
                    type: "post",
                    async: false,
                    url: _surl,
                    dataType: "jsonp",
                    jsonpCallback: "yutu_vote_callback",
                    success: function(data) {},
                    error: function() {}
                });
            };

            if (yt_global.share_diy_s || yt_global.share_diy_e) {
                if (yt_global.share_diy_s != "" || yt_global.share_diy_e != "") {
                    share_count_fun();
                }
            };



            /**
             * 不同尺寸机型中页面元素的等比缩放处理
             * 根据相应的缩放，使得页面非背景的元素都可见。
             * @type {[type]}
             */
            var loadingpage = $(".yt-loadingpage");
            var width = loadingpage.width();
            var height = loadingpage.height();
            window.width = width;
            window.height = height;
            var top, left, scale = 1;
            width / height >= 320 / 460 ? (scale = height / 460, left = (width / scale - 320) / 2) : (scale = width / 320, top = (height / scale - 460) / 2);

            $("#yt_viewport").attr({
                "content": "width=320,initial-scale=" + scale + ",user-scalable=no"
            });
            if (loadingpage.width() != 320 && width == document.documentElement.clientWidth && (navigator.userAgent.indexOf("Android") > -1 || navigator.userAgent.indexOf("Linux") > -1)) {
                var i = 320 / width;
                var j = 460 / height;
                var k = Math.max(i, j);
                k = k > 1 ? k : 160 * k,
                    k = parseInt(k);
                $("#yt_viewport").attr({
                    "content": "width=320,target-densitydpi=" + k
                });
            }
            gallery.scale = scale;

            if (!(navigator.userAgent.indexOf("ZTEU793") > -1)) {
                left && (left = Math.ceil(left), loadingpage.children("div").css({
                    marginLeft: left
                }), this.left = left, this.scale = scale, $(".pandaBox>div").css({
                    marginLeft: left
                }));
                top && (scale > 1) && ($(".pandaBox").css({
                    "width": "320px"
                }));
                /*
                top && (scale > 1) && (top < 1) && ($(".pandaBox").css({//安卓手机底部留白边问题
                    "height": "462px"
                }));
                */

            }
            // left && (left = Math.ceil(left), loadingpage.children("div").css({
            //     marginLeft: left
            // }), this.left = left, this.scale = scale, $(".pandaBox>div").css({
            //     marginLeft: left
            // }));
            // top && (scale > 1) && ($(".pandaBox").css({
            //     "width": "320px"
            // }));



            window.pageSwitch = Number(obj.pageSwitch);



            document.addEventListener('touchmove', function(event) {
                event.preventDefault();
            }, { passive: false });

            // window._yutuPageLock =


            // 默认第一个显示
            /**
             * pageswitch == 0 为无缝滑动
             * 当开启无缝滑动时，单页显示逻辑的处理，移除pt-page-current的样式作用
             */
            if (Number(obj.pageSwitch) != 0) {
                $("#pandaBox" + that.index).addClass("pt-page-current").find("[data-panda-type]").each(function() {
                    var self = $(this),
                        cssanimate = self.data("yutu-animate"),
                        special = self.data("special"),
                        type = self.data("panda-type");
                    if (cssanimate) {

                        // 老版本的重绘组件把动画设置给子元素
                        self.find('.con').css('-webkit-animation', cssanimate);
                    }

                    // 处理样式
                    filterAnimate(self);
                });
            } else {
                $("#pandaBox" + that.index).find("[data-panda-type]").each(function() {
                    var self = $(this),
                        cssanimate = self.data("yutu-animate"),
                        special = self.data("special"),
                        type = self.data("panda-type");
                    if (cssanimate) {

                        // 老版本的重绘组件把动画设置给子元素
                        self.find('.con').css('-webkit-animation', cssanimate);
                    }

                    // 处理样式
                    filterAnimate(self);
                });
            };


            // 执行自定义函数
            $("[data-yutu-fn-name]").each(function(i, n) {
                var $n = $(n),
                    fnname = $n.data("yutu-fn-name");
                fnparams = $n.data("yutu-fn-params").split(",");

                if ($.fn[fnname]) {
                    ($.fn[fnname]).apply($n, fnparams);
                } else {
                    console.error(fnname + '函数不存在，请检查自定义函数');
                }
            })


            // 绑定扩展对象的处理
            //bindExtend(that);

            // S/增加默认分享 20150203 by jasonshan
            var _BaseSHare = function() {
                function getUa() {
                    var ua = navigator.userAgent.toLowerCase();
                    return {
                        ipad: ua.indexOf("ipad") >= 0,
                        iphone: ua.indexOf("iphone") >= 0,
                        android: ua.indexOf("android") >= 0,
                        weixin: ua.indexOf("micromessenger") >= 0,
                        qqnews: ua.indexOf("qqnews") >= 0,
                        mqq: ua.indexOf("mqq") >= 0
                    }
                };

                function CallWeiXinAPI(fn, count) {
                    var total = 2000; //30s
                    count = count || 0;
                    if (true === window.G_WEIXIN_READY || ("WeixinJSBridge" in window)) {
                        fn.apply(null, []);
                    } else {
                        if (count <= total) {
                            setTimeout(function() {
                                CallWeiXinAPI(fn, count++);
                            }, 15);
                        }
                    }
                }
                if (getUa().weixin) {
                    var _yt_title_concat2 = yt_global.title;
                    if (yt_global.share_diy_s || yt_global.share_diy_e) {
                        if (yt_global.share_diy_s != "" || yt_global.share_diy_e != "") {

                            if (window.yt_global_share_count) {
                                _yt_title_concat2 = yt_global.share_diy_s + window.yt_global_share_count + yt_global.share_diy_e;
                            } else {
                                var isShareOk2 = true;
                                var load_share_count2 = setInterval(function() {

                                    if (isShareOk2) {
                                        var _whost = window.location.href;
                                        if(_whost.indexOf("joke.qq.com")>0){
                                            _wurl = "http://testshipei.qq.com/yutu/index.php?vote.achieve&activity_id=" + yt_global.id + "&msg=share";
                                            
                                        }else{
                                            _wurl = "http://xw.qq.com/yutu/index.php?vote.achieve&activity_id=" + yt_global.id + "&msg=share";
                                        }

                                        $.ajax({
                                            type: "get",
                                            async: false,
                                            url: _wurl,
                                            dataType: "jsonp",
                                            jsonpCallback: "yutu_vote_callback",
                                            success: function(data) {

                                                if (data.tip == "success") {
                                                    isShareOk2 = false;
                                                    _yt_title_concat2 = yt_global.share_diy_s + data.data.totalCnt + yt_global.share_diy_e;
                                                }
                                            },
                                            error: function() {}
                                        });
                                    } else {
                                        clearInterval(load_share_count2);
                                    }
                                }, 300);
                            };
                        };
                    };



                    CallWeiXinAPI(function() {
                        WeixinJSBridge.on("menu:share:timeline", function(argv) {
                            WeixinJSBridge.invoke('shareTimeline', {
                                "img_url": yt_global.img,
                                "img_width": "120",
                                "img_height": "120",
                                "link": yt_global.url,
                                "desc": yt_global.desc,
                                "title": _yt_title_concat2
                            }, function(res) {
                                if(res.err_msg=="share_timeline:ok"){
                                    //后台对微信朋友圈转播量进行计数
                                    var _wshost = window.location.href;
                                    if(_wshost.indexOf("joke.qq.com")>0){
                                        _wsurl = "http://testshipei.qq.com/yutu/index.php?wxshare.save&aid="+yt_global.id+"&type=wxshare";
                                    }else{
                                        _wsurl = "http://xw.qq.com/yutu/index.php?wxshare.save&aid="+yt_global.id+"&type=wxshare";
                                    }
                                    try{
                                        $.ajax({
                                            url: _wsurl,
                                            dataType: "jsonp",
                                            jsonpCallback: "yutu_share_callback",
                                            success: function(res){}
                                        });
                                        // $.get(_wsurl);
                                    }catch(e){}
                                }
                            });
                        });
                        WeixinJSBridge.on("menu:share:appmessage", function() {
                            WeixinJSBridge.invoke("sendAppMessage", {
                                "img_url": yt_global.img,
                                "img_width": "120",
                                "img_height": "120",
                                "link": yt_global.url,
                                "desc": yt_global.desc,
                                "title": _yt_title_concat2
                            }, function(res) {
                                if(res.err_msg=="send_app_msg:confirm"){
                                    //后台对微信发送给好友转播量进行计数
                                    var _wshost = window.location.href;
                                    if(_wshost.indexOf("joke.qq.com")>0){
                                        _wsurl = "http://testshipei.qq.com/yutu/index.php?wxshare.save&aid="+yt_global.id+"&type=wxshare";
                                    }else{
                                        _wsurl = "http://xw.qq.com/yutu/index.php?wxshare.save&aid="+yt_global.id+"&type=wxshare";
                                    }
                                    try{
                                        $.ajax({
                                            url: _wsurl,
                                            dataType: "jsonp",
                                            jsonpCallback: "yutu_share_callback",
                                            success: function(res){}
                                        });
                                        // $.get(_wsurl);
                                    }catch(e){}
                                }
                            });
                        });
                        WeixinJSBridge.on('menu:share:weibo', function(argv) {
                            WeixinJSBridge.invoke('shareWeibo', {
                                "content": _yt_title_concat2,
                                "url": yt_global.url,
                            }, function(res) {});
                        });
                    });
                } else if (getUa().qqnews) {
                    if (window.TencentNews && window.TencentNews.showShareMenu) {
                        window.TencentNews.showShareMenu(_s.url, _s.title, _s.des, _s.pic, "news_news_wc");
                    } else {
                        window.TencentNews.shareFromWebView(_s.title, _s.des, _s.pic);
                    }
                };
            };
            _BaseSHare();
            // E/增加默认分享 20150203 by jasonshan
        }
    };

    function filterAnimate($obj) {
        var style = $obj.attr('style').split(';').filter(function (value, index) {
            return value.indexOf('animation') === -1;
        }).join(';');

        $obj.attr('style', style);
    }

    function onEndAnimation($outpage, $inpage) {
        window.endCurrPage = false;
        window.endNextPage = false;
        resetPage($outpage, $inpage);
        window.isAnimating = false;
        if (window._yutuPageCallback) {
            window._yutuPageCallback($outpage, $inpage)
        }

    }

    function resetPage($outpage, $inpage) {
            /**
             * pageswitch == 0 为无缝滑动
             * 当开启无缝滑动时，单页显示逻辑的处理，移除pt-page-current的样式作用
             */
            if (window.pageSwitch != 0) {
                $outpage.attr('class', "pandaBox");
                $inpage.attr('class', 'pandaBox pt-page-current');
            } else {
                $outpage.attr('class', "pandaBox");
                $inpage.attr('class', 'pandaBox');
            }
        }
        /**
         * boss数据上报
         * 2015.4.15
         * @type {Image}
         */
    var g_btrace_BOSS = new Image(1, 1);

    function yutuBossUp(s, t, n, c, p, c2) {
        var _domain = window.location.hostname,
            _url = window.location.href,
            _refer = document.referrer;
        g_btrace_BOSS.src = "http://btrace.qq.com/kvcollect?BossId=2931&Pwd=727257527&sDomain=" + encodeURIComponent(_domain) + "&sUrl=" + encodeURIComponent(_url) + "&sRef=" + encodeURIComponent(_refer) + "&sSys=" + encodeURIComponent(s) + "&sType=" + encodeURIComponent(t) + "&sName=" + encodeURIComponent(n) + "&sChannel=" + encodeURIComponent(c) + "&sPageID=" + encodeURIComponent(p) + "&sColumn=" + encodeURIComponent(c2) + "&_dc=" + Math.random();
    };
    /**
     * 智能推荐曝光量上报
     * 2015.4.15
     * @return {[type]} [description]
     */
    function package_yt_recommend() {
        function getUa() {
            var ua = navigator.userAgent.toLowerCase();
            return {
                ipad: ua.indexOf("ipad") >= 0,
                iphone: ua.indexOf("iphone") >= 0,
                android: ua.indexOf("android") >= 0,
                weixin: ua.indexOf("micromessenger") >= 0,
                qqnews: ua.indexOf("qqnews") >= 0,
                mqq: ua.indexOf("mqq") >= 0
            }
        };
        var _s = "browser";
        if (getUa().weixin) {
            _s = "weixin"
        } else if (getUa().qqnews) {
            _s = "qqnews"
        } else {
            _s = "browser";
        }
        yutuBossUp(_s, "tuijian", "", yt_global.channel, yt_global.id, yt_global.category);
        $(".RecommendList li").each(function(i, obj) {
            $(obj).on("click", function() {
                yutuBossUp(_s, "tuijian", "tjlist" + i, yt_global.channel, yt_global.id, yt_global.category);
            })
        })
    };

    function bindExtend(type, that, self) { //绑定扩展对象(type,全局g对象,当前页面元素)
        var allExtend = {
            text: function() {
                $("[data-yutu-ext]").each(function(i, n) {
                    var $n = $(n),
                        id = $n.data("yutu-ext-id"),
                        evt = $n.data("yutu-ext-event"),
                        type = $n.data("yutu-ext-type"),
                        url = $n.data("yutu-ext-url"),
                        val = $n.data("yutu-ext-value");

                    $(this).off(evt).on(evt, function() {

                        if (type == "link") {
                            window.open(url, "_self");
                        } else {
                            if (val > that.index) {
                                that.doNext(val);
                            } else if (val < that.index) {
                                that.doPrev(val);
                            }
                        }
                    });
                })
            },
            yt_text: function() {

                var id = self.data("yutu-ext-id"),
                    evt = self.data("yutu-ext-event"),
                    val = self.data("yutu-ext-value");
                if (typeof evt == 'string') {
                    self.off(evt).on(evt, function() {
                        window._yutuPageLock = false;
                        if (val > that.index) {
                            that.doNext(val);
                        } else if (val < that.index) {
                            that.doPrev(val);
                        }
                    });
                }
            },
            image: function() {
                this.text();
            },
            yt_image: function() {
                this.yt_text();
            },
            yt_quickvote: function() {
                var vid = $(".package_quickvote").attr("data-surveyID");
                globalVote2.getVote('http://panshi.qq.com/v2/vote/' + vid + '?source=1&callback=?');

            },
            yt_surveyvote: function() {
                var svid = $(".package_surveyvote").attr("data-surveyID");
                globalVote.getVote('http://panshi.qq.com/v2/vote/' + svid + '?source=1&callback=?');
            },
            yt_swiper: function() {
                seajs.use('http://mat1.gtimg.com/news/js/yutu/swiper.js', function() {
                    self.find(".con").swiper({
                        pagination: '.pagination',
                        loop: true,
                        paginationClickable: true
                    });
                });
            },
            yt_share: function() {
                package_yt_share();
            },
            yt_nvideo: function() {
                if (typeof($(".package_yt_nvideo")) == "object") {
                    $(".package_yt_nvideo").each(function(i, elm) {
                        var _this = $(elm);
                        var _vid = _this.attr("data-vid");
                        var _img = _this.find("img").attr("data-src");
                        var _rootid = _this.find(".play_box").attr("id");
                        videoread(_vid, _rootid, _img, true);
                    })
                }
            },
            yt_plusvote: function() {
                window.isplusvotepost = false; // 初始话+1提交函数状态
                if (!window.isplusvote) {
                    package_yt_plusvote();
                };
            },
            yt_refresh: function() {
                package_yt_refresh();
            },
            yt_video: function() {
                videopopup();
            },
            yt_audio: function() {
                if(autumnFestival){
                    audioPlay();
                    autumnFestival = false;
                }
            },
            yt_iscroll: function() {
                //setTimeout(function(){
                package_yt_iscroll();
                //}, 1000);
            },
            yt_clip: function() {
                package_yt_clip();
            },
            yt_recommend: function() {
                package_yt_recommend()
            },
            yt_layerscroll: function() {
                package_yt_layerscroll();
            },
            yt_signup: function() {
                var sid = $(".package_yt_signup").attr("data-surveyid");
                globalSignup.getVote('http://panshi.qq.com/v2/vote/' + sid + '?source=1&callback=?');
            },
            yt_scratch: function() {
                package_yt_scratch();
            },
            yt_panorama: function() {
                package_yt_panorama();
            },
            yt_barrage: function() {

                package_yt_barrage();
            },
            yt_appdownload: function() {
                package_yt_AppIsInstall();
            },
            yt_piecharts: function() {
                package_yt_getPieCharts();
            },
            yt_barcharts: function() {
                package_yt_getBarCharts();
            },
            yt_linecharts: function() {
                package_yt_getLineCharts();
            }
        };

        if (typeof type != 'undefined' && type in allExtend) {
            allExtend[type](); //执行对应的扩展对象的处理
        }

    }

    window.g = gallery;
});
