define(function(require, exports, module) {
    /*
        引入包
    */
    var _Mcity = require('mcity'); //城市信息

    $(function() {

        /*
            筛选&排序
        */

        // 筛选切换
        $('.m-tab li').on('click', function() {
            $(this).addClass('on').siblings().removeClass('on');

        });

        /*
            商品产地数据读取
        */

        $('.m-city').on('click', function() {
            new _Mcity(this, {});
        });


        // 价格排序
        $('#sort-price').on('click', function() {
            var _icon = $(this).find('.m-icon');
            if (_icon.length > 0) {
                if (_icon.hasClass('icon-up')) {
                    _icon.removeClass('icon-up').addClass('icon-down');
                } else {
                    _icon.removeClass('icon-down').addClass('icon-up');
                }
            } else {
                $(this).find('a').append('<i class="m-icon icon-up"></i>');
            }
        });


        /*
            加载更多
        */

        var loadmore = function(target, options) {
            this.target = target;
            this.isRequestData = false;
            this.opt = {
                loadwrap: '#list-loading',
                loading: function(target) {}
            };

            $.extend(this.opt, options);

            this.bind();
        }

        loadmore.prototype = {
            //绑定浏览器滚动事件
            bind: function() {
                var _this = this,
                    _target = _this.target;
                $('.m-page').scroll(function() {

                    var scrollBottom = $('.m-page-content').height() - $('.m-page').height() - $('.m-page').scrollTop();
                    if (scrollBottom <= 20 && !_this.isRequestData) {

                        _this.isRequestData = true;
                        $(_this.opt.loadwrap).css('display', 'block');

                        setTimeout(function() {

                            _this.opt.loading(_target);

                            $(_this.opt.loadwrap).css('display', 'none');
                            _this.isRequestData = false;

                        }, 1000);
                    }
                });
            }
        }

        var num = 0;
        // 商品列表加载更多
        if ($('#goods-list-view').length > 0) {
            new loadmore($('#goods-list-view'), {
                loading: function(target) {

                    var _html = '<li class="cell cell-extend-pic">\
                        <a href="product_detail.html">\
                            <img src="../images/user-home.png" width="80" height="80" alt="" class="pic">\
                            <h3 class="title">标题' + num + '</h3>\
                            <p class="btm"><em>0.9元/斤</em><span class="source">地利自营</span></p>\
                        </a>\
                        </li>';
                    $(target).append(_html);
                    num++;
                }
            });
        }
        // 店铺列表加载更多
        if ($('#shop-list-view').length > 0) {
            new loadmore($('#shop-list-view'), {
                loading: function(target) {

                    var _html = '<li class="cell cell-extend-pic acc-icon">\
                            <a href="shop_detail.html">\
                                <img src="../images/user-home.png" width="80" height="80" alt="" class="pic">\
                                <h3 class="title">店铺' + num + '</h3>\
                                <p class="detail">经营类目：青丝茄子\
                                    <br>经营品类：萝卜\
                                    <br>经营区域：四川成都\
                                </p>\
                            </a>\
                        </li>';
                    $(target).append(_html);
                    num++;
                }
            });
        }

    });


});