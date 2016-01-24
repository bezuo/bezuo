/*
	==== @名称：Base;
	==== @功能：存放网站中的基本效果
*/

$(function(){	
	/* 页面的链接跳转 */
	$(document).on("tap","[data-params]",function(event){var strURL=$(this).attr("data-params");location.href=strURL;event.stopPropagation()});
	
	/* 成就图片 */	
	$("[data-img]").each(function(){$(this).css("backgroundImage","url("+($(this).attr("data-img"))+")");});
	
	window.onscroll = function(){
		// 距离顶部的高度
		var scrollT = document.documentElement.scrollTop || document.body.scrollTop;
		// 页面的实际高度
		var scrollH = document.documentElement.scrollHeight || document.body.scrollHeight;
		// 窗口高度
		var clientH = document.documentElement.clientHeight || document.body.clientHeight
		
		scrollT > 40 ? $(".choose").css({
				"-webkit-transform": "translateY(-40px)",
				"-moz-transform": "translateY(-40px)",
				"-ms-transform": "translateY(-40px)",
				"transform": "translateY(-40px)"
				}) : $(".choose").css({
				"-webkit-transform": "translateY(0px)",
				"-moz-transform": "translateY(0px)",
				"-ms-transform": "translateY(0px)",
				"transform": "translateY(0px)"
				}) 
		
//		console.log(scrollT);
//		console.log(scrollH);
//		console.log(clientH);

		if(scrollT == scrollH - clientH){
//			alert("到底部了");
			console.log("到底部了");
		}else if(scrollT == 0){
			console.log("到顶部了");
		}
	}
});

// 按钮操作
$(function(){
	
	// 想做
	$(".article").on("tap",".btn-done",function(){var b=parseInt($(this).find("em").html());operating($(this),b),event.stopPropagation()});
	
	// 做过
	$(".article").on("tap",".btn-want",function(){var b=parseInt($(this).find("em").html());operating($(this),b),event.stopPropagation()});
	
	// 没兴趣
	$(".article").on("tap",".btn-quit",function(){var b=parseInt($(this).find("em").html());operating($(this),b),event.stopPropagation()});
		
	// 操作
	function operating(a, b) {
		var c = a.attr("class").replace(/^\s+|\s+$/g,"");
		// 当前元素为选中
		if (a.hasClass("cur-scale")) {
			var c = c.replace("-active", "");
			a.attr("class", c).removeClass("cur-scale").find("em").html(b - 1)
		
		// 当前元素未被选中
		} else {
			
			// 判断是否已存在其他选择
			var d = a.parent().siblings().find(".cur-scale");
			if (d.length > 0) {
				var e = d.attr("class"),
				f = parseInt(d.find("em").html());
				d.attr("class", e.replace("-active", "")).removeClass("cur-scale");
				d.find("em").html(f - 1);
			}
			a.attr("class", c +"-active cur-scale");
			a.find("em").html(b + 1);
		}
	};
	
	// 成就详细页做过、想做、放弃
	$(".footer01 li a").on("tap", function() {
		function c(a, b) {
			a.attr("class", b.replace("-active", "")).removeClass("cur")
		}
		var a = $(this).attr("class").replace(/^\s+|\s+$/g, ""),
		b = $(this).parent("li").siblings().children(".cur");
		if ($(this).hasClass("cur")) c($(this), a);
		else {
			if (b.length > 0) {
				var d = b.attr("class").replace(/^\s+|\s+$/g, "");
				c(b, d),
				c($(this), a)
			}
			$(this).attr("class", a + "-active").addClass("cur")
		}
	});
	
	// 点赞
	$(".article").on("tap", ".s-like",function() {
	
		var _number = parseInt($(this).find("em").html());
		var _like = $(this).children(".icon-like");
	
		_like.length > 0 ? $(this).children("a").attr("class", "icon-like-active").next().html(_number + 1) : $(this).children("a").attr("class", "icon-like").next().html(_number - 1);
		event.stopPropagation();
	});
	
	// 评论页点赞
	$(".com-box-like").on("tap", function(){
		var i = parseInt($(this).html());
		$(this).hasClass("cur") ? $(this).attr("class", "com-box-like icon-like").html(i-1) : $(this).attr("class", "com-box-like icon-like-active cur").html(i+1);
		event.stopPropagation();
	});
});

// 浏览图片与关闭
$(function(){
	
	// 点击缩略内容区域图片查看大图
	$(".article").on("tap",".img-view li", function(event){		
		
		//获取点击元素的索引值
		var x = $(this).index();		
		// 获取所有图片的父元素;
		var obj_li = $(this).parent("ul").children();
		
		// 创建一个数组元素，并将图片的路径写入的数组中;
		var itemUL = [ ], itemDiv = [ ];
		for(var i = 0; i < obj_li.length; i++){		
			itemUL[0] ="<li>"+"<img src="+ obj_li.eq(0).attr('data-img')+">" +"</li>";
			itemUL[i] = "<li>"+"<img src="+ obj_li.eq(i).attr('data-img')+">" +"</li>";
			itemDiv[0] ="<span>"+"</span>";
			itemDiv[i] ="<span>"+"</span>";
		};
		
		addImg(itemUL, itemDiv, x);
		event.stopPropagation();
	});
	
	// 点击展开内容区域图片查看大图;
	$(".article").on("tap", ".review-text img",function(event){
		
		// 获取所有的图片;
		var imgArray = $(this).parent(".review-text").find("img");		
		// 点击的是第几张图片;
		var x = imgArray.index($(this));
		
		// 创建一个数组元素，并将图片分别写入该数组中;
		var itemUL = [ ], itemDiv = [ ];
		for(var i = 0; i <imgArray.length; i++){
			itemUL[0] ="<li>"+ "<img src="+ imgArray[0].getAttribute("src") +">" +"</li>";
			itemUL[i ] ="<li>"+ "<img src="+ imgArray[i].getAttribute("src") +">" +"</li>";
			itemDiv[0] ="<span>"+"</span>";
			itemDiv[i] ="<span>"+"</span>";
		};
		
		addImg(itemUL, itemDiv, x);
		event.stopPropagation()
	});
	
	// 将要查看放大查看的图片添加至页面中;
	function addImg(ulArray, divArray, i){
		var obj_box = null;
		
		// 获取浏览器宽度和高度;
		var h_height = $(window).height();
		var w_width = $(window).width();
		
		// 将数组中的值转化为字符串并且添加对象中;
		var obj_ul = $("<ul>"+ ulArray.join("") +"</ul>");
		var obj_div = $("<div class='div_cur'>"+ divArray.join("")+"</div>");
		
		// 把新对象添加到页面中
		var obj_box = $("<div class='slide-view'></div>").append(obj_ul.css({
				"-webkit-transform": "translateX(-"+ i*w_width+"px)",
				"-moz-transform": "translateX(-"+ i*w_width+"px)",
				"-ms-transform": "translateX(-"+ i*w_width+"px)",
				"transform": "translateX(-"+ i*w_width+"px)"
			})
		).append(obj_div);
		$("body").append(obj_box);
		$(".slide-view").animate({opacity: 1}, 500).css("lineHeight",h_height+"px");		
		$(".slide-view li").eq(i).children().addClass("pop-img");
		$(".div_cur span").eq(i).addClass("cur");
	};
	
	// 大图片滑动浏览;		
	var startPosition, endPosition, deltaX, deltaY, moveLength;  
    $(document).on('touchstart', ".slide-view li",function(e){  
        var touch = e.touches[0];  
        startPosition = {  
            x: touch.pageX,  
            y: touch.pageY  
        }  
    }) .on('touchmove', ".slide-view li",function(e){  
        var touch = e.touches[0];  
        endPosition = {  
            x: touch.pageX,  
            y: touch.pageY  
        };
        deltaX = endPosition.x - startPosition.x;  
//          deltaY = endPosition.y - startPosition.y;  
//          moveLength = Math.sqrt(Math.pow(Math.abs(deltaX), 2) + Math.pow(Math.abs(deltaY), 2));
        event.preventDefault();        
    }).on('touchend',".slide-view li",function(e){
    	if(endPosition != null) {
        	var w_width = $(window).width();
        	var i = $(this).index();
        	if(deltaX < 40 && i < $(this).siblings().length){
        		$(this).parents("ul").css({
					"-webkit-transform": "translateX(-"+ (i+1)*w_width+"px)",
					"-moz-transform": "translateX(-"+ (i+1)*w_width+"px)",
					"-ms-transform": "translateX(-"+ (i+1)*w_width+"px)",
					"-o-transform": "translateX(-"+ (i+1)*w_width+"px)",
					"transform": "translateX(-"+ (i+1)*w_width+"px)"
				});				
				$(".div_cur .cur").removeClass().next().addClass("cur");
				
        	} else if (deltaX > 40 && i > 0) {
        		$(this).parents("ul").css({
					"-webkit-transform": "translateX(-"+ (i-1)*w_width+"px)",
					"-moz-transform": "translateX(-"+ (i-1)*w_width+"px)",
					"-ms-transform": "translateX(-"+ (i-1)*w_width+"px)",
					"-o-transform": "translateX(-"+ (i-1)*w_width+"px)",
					"transform": "translateX(-"+ (i-1)*w_width+"px)"
				});
				$(".div_cur .cur").removeClass().prev().addClass("cur");
           }
        	// 清空滑动图片产生的值;
        	startPosition = null, endPosition = null;
    	} else {
    		setTimeout(function(){var obj = $(".slide-view");obj.remove();obj = null;},500);
    	}
    });
	
	// 为评论描述添加向下箭头图标;
	$(".review-text").each(function(){
		var pHeight = $(".review-text").css("line-height");
		var reg = /px$/gi;
		var pHeight = pHeight.replace(reg,"");
		var textHeight = $(this).height();
		if(textHeight > pHeight*3 && textHeight < pHeight*4 || $(this).find("img").length > 0){
			$(this).after($("<a class='icon-more-text'></a>"));
		}
	});	
	
	$(document).on("tap",".review-list", function(event){
		var objParent = $(this).find(".icon-more-text");
			if(!objParent.hasClass("more-text-Up")){
				$(this).find(".review-text").removeClass("text-ellipsis").siblings(".review-img").hide();
				$(this).find(".icon-more-text").addClass("more-text-Up");
				$(this).find(".review-text").children("img").show();
			} else {
				$("body").scrollTop($(this).offset().top);
				$(this).find(".review-text").children("img").hide();
				$(this).find(".review-text").addClass("text-ellipsis").siblings(".review-img").show();
				$(this).find(".icon-more-text").removeClass("more-text-Up");
			}
		event.stopPropagation();
	});
});

// 微信相关评论
$(function(){
	
	$(document).on("tap", ".wx-bt-box > span >span", function(e){
		if($("#headImgUrl").length >  0){
			var txt_val = $(this).text();
			$(".wx-text-pl").val(txt_val);
			text_focus();
		};
		event.stopPropagation();
	});
	
	$(".wx-pop-content span").on("tap", function (e){
		var txt_val = $(this).text();
		$(".wx-text-pl").focus().val(txt_val);
		event.stopPropagation();
	});
	
	// 点击输入框
	$(".wx-text-pl").on("tap", function(event){ 
		if($("#headImgUrl").length >  0){
			text_focus();
		};
		event.stopImmediatePropagation();
	});
	
	$(".wx-pl-js").on("tap", function(event){
		text_focus();
		event.stopImmediatePropagation();
	});
	
	function text_focus(){
		if($(".wx-mask").is(":hidden")){
			$(".wx-pl-box").insertBefore('.wx-pop').parent(".wx-mask").show();
		};
		$(".wx-text-pl").focus();
	};
	
	// 关闭弹出层
	$(".wx-mask-colse").on("tap", function(e){
		setTimeout(function(){
			$(".wx-mask").hide().children(".wx-pl-box").insertAfter(".wx-cy");
			$(".wx-text-pl").val("");
		},320);
		event.stopPropagation();
	});
	
	Array.prototype.removeByValue=function(val){for(var i=0;i<this.length;i++){if(this[i]==val){this.splice(i,1);break}}};
	// 留言提交
	$(".wx-pl-btn").on("tap", function() {
		if($("#headImgUrl").length >  0) {
			var txt = $(".wx-text-pl").val();
			if (txt != "" && txt.length != 0 && txt.substring(0, txt.length) != 0) {
				$(".wx-mask").hide().children(".wx-pl-box").insertAfter(".wx-cy");	
				// 创建一个存放文本值的数组;
				var txt_item = [];
				// 创建一个存放背景色的数组;
				var bg_item = ["rgb(232, 104, 95)", "rgb(63, 200, 192)", "rgb(80, 164, 223)", "rgb(244, 175, 74)", "rgb(63, 197, 151)", "rgb(96, 125, 139)"];
				// 获取最后一个评论的背景颜色;
				var bg_prve = $(".wx-bt-box > span").last().css("backgroundColor");
				// 把最后一个评论的背景颜色从背景色数组中移除;
				bg_item.removeByValue(bg_prve);
				// 随机取出新背景色数组中某个值的下标;
				var index = Math.floor((Math.random() * bg_item.length));
				
				// 将每条留言的内容分别存放在文本数组中;
				var obj = $(".wx-bt-box > span");
				var len = obj.children("span").length;
				for (var i = 0; i < len; i++) {
					txt_item[0] = obj.eq(0).children("span").text();
					txt_item[i] = obj.eq(i).children("span").text()
				};
				// 返回数组中指定元素的索引值;
				var x = $.inArray(txt, txt_item);
				// 根据索引值找与之对应的留言;
				var _object = obj.eq(x).children();
				var y = _object.length;
				$(".wx-bt-box").removeClass("wx-bt-start").children(".wx-pl-btn").remove();
				setTimeout(function(){
					/* 判断输入框中的内容是否已存在.
					不存在则提交留言;
					存在则在原有留言上+1 */
					x >= 0 ? (y > 1 ? _object.find("i").text(parseInt(_object.find("i").text()) + 1) : _object.after("<em>x<i>2</i></em>")) : ($(".wx-bt-box").append($("<span><span>" + txt + "</span></span>").css("backgroundColor", bg_item[index])));
					$(".wx-text-pl").val("").attr("disabled","disabled");
					$("#headImgUrl").attr("id","");
				},500)
			};
		} else {
			alert("您已近对此评论过!")
		};
		event.stopPropagation();
	});
	
	// 微信页面表态
	var ua = navigator.userAgent.toLowerCase();
	$(".want-do li a").on("tap", function(){  
		if(ua.match(/MicroMessenger/i)=="micromessenger") {  
			var declare_pop = "<div class='wx-mask'>";
			 	   declare_pop += "<div class='declare'>";
			 	   declare_pop += "<h2>表态成功</h2>";
			 	   declare_pop += "<p>点击右上角分享给朋友看看他们怎么说吧</p>";
			 	   declare_pop += "</div>";
			 	   declare_pop += "</div>";
			$(declare_pop).insertAfter(".article").show();
		} else {	
	    	location.href = "https://itunes.apple.com/us/app/bi-zuo-fa-xian-you-jia-zhi/id1037732800?l=zh&ls=1&mt=8";
		};
	});
	
	// 微信页面在浏览器中打开
	$(".wx-down").on("tap",function(){
		if(ua.match(/MicroMessenger/i)=="micromessenger") {  
	        var down_pop = "<div class='wx-mask wx-mask-down'>";
		 	   down_pop += "<div class='browser-open icon-wx-top'>";
		 	   down_pop += "<p>点击微信右上角按钮</p>";
		 	   down_pop += "<p>选择「<strong>在Safari中打开</strong>」即可下载</p>";
		 	   down_pop += "</div>";
		 	   down_pop += "</div>";
			$(down_pop).insertAfter(".article").show();
	    } else {
	    	location.href = "https://itunes.apple.com/us/app/bi-zuo-fa-xian-you-jia-zhi/id1037732800?l=zh&ls=1&mt=8";
	    };
	});	
	
	// 关闭弹出层
	$(document).on("tap",".wx-mask-down",function(event){
		$(this).remove();
		event.preventDefault();
	});
});