
window.onload=function(){
	
//当鼠标点击li时下拉列表显示
var otem=document.getElementsByClassName("nav-item");
var omenu=document.getElementsByClassName("header-menu");
for(var i=0; i<otem.length; i++){
otem[i].index=i;
otem[i].onmousedown=function(){
for(var i=0; i<omenu.length; i++){
	
omenu[i].style.display='none';
omenu[i].className='header-menu ';
omenu[this.index].className='header-menu header-menu-active';
omenu[this.index].style.display='block';
		
			}	
	}
	
document.onmouseup=function(){    	//当鼠标在任意地方点击的时候列表消失

for(var i=0; i<omenu.length; i++){
	
omenu[i].style.display='none';
omenu[i].className='header-menu ';

		
			}		
	}	

}

		


//大焦点图轮播
var prev = document.getElementById("prev");
var next = document.getElementById("next");
var load=document.getElementsByClassName("load");
var opage=document.getElementById("page");
 var adiv=opage.getElementsByTagName("div");
var arra=opage.getElementsByTagName("a");
	

		var time=null;	
		var timer=null;
for(var i=0; i<adiv.length; i++){
adiv[i].index=i
adiv[i].onclick=function(){   	//焦点点击

clearInterval(timer);	
for(var i=0; i<arra.length; i++){	
arra[i].className="";
load[i].style.display='none';
load[this.index].style.display='block';
arra[this.index].className="wp a jb";
dong(load[this.index],1,10);
var that=this.index;
n=that;
		}
	}	
}
var n=0;
next.onclick=function(){ //向下一ge 
clearInterval(timer);	
	for(var i=0; i<load.length; i++){
		
	load[n].style.display='none';
	arra[n].className="";	
	}
	n++;		
	if(n==load.length){
	n=0;	
	}
	load[n].style.display='block';
	arra[n].className="wp a jb";
			dong(load[n],1,10);

	}

//大焦点图向上一张的点击
prev.onclick=function(){	
clearInterval(timer);
for(var i=0; i<load.length; i++){
	
load[i].style.display='none';
arra[i].className="";	
}	
	n--;
if(n==-1){
n=load.length-1;	
}		
load[n].style.display='block';
arra[n].className="wp a jb";
dong(load[n],1,10);
}

	//大焦点图 点击渐变方法
			function dong(obj,target,speed){
				clearInterval(time);
				var icur=0;
			time=setInterval(function(){
			 icur=Math.round(css(obj,'opacity')*100);
			
			for(var i=0; i<load.length; i++){
				load[i].style.opacity=0;				
			if( icur>=target){
				obj.style.opacity=1;
			clearInterval(time);
			}else{	

				obj.style.opacity=(icur+speed)/100;
				
				}		
			}	
		},100);
}

	/************css非行间样式的获取方法 IE兼容************/
	  

	  function css(obj, attr) {  
	        if(obj.currentStyle){  
	            return obj.currentStyle[attr];  
	        }  
	        else {  
	            return  window.getComputedStyle(obj,false)[attr];  
	        }  
	    }	

timer=setInterval(function(){
for(var i=0; i<load.length; i++){	
load[i].style.display='none';
arra[i].className="";	
}	
n++;
if(n==load.length){
n=0;	
}		
load[n].style.display='block';
arra[n].className="wp a jb";
dong(load[n],1,10);	
	
},3000);

var sea=document.getElementById("name");
var wz=document.getElementById("wz");
var sz=document.getElementById("sous");
var ss=document.getElementById("sz");
sea.onfocus=function(){
	wz.style.display='none';
	sz.style.display='block';
	ss.className='search-form se';
}	
sea.onblur=function(){
	
	wz.style.display='block';
	sz.style.display='none';
	ss.className='search-form ';
}

///////////
///
//	
var qqq=document.getElementsByClassName("gt")[0];
var aaa=document.getElementsByClassName("gt")[1];
var sss=document.getElementsByClassName("gt")[2];
var bbb=document.getElementsByClassName("gt")[3];
var yy=document.getElementById("yy");
var xx=document.getElementById('abc');
var b=0;
var time11=null;
var time12=null;
var numm=-1240;
aaa.onclick=function(){
	clearInterval(time11);
b++;
if(b>=2){
b=1;
}else{
ysz(xx,aaa,qqq);
}
}

qqq.onclick=function(){
	clearInterval(time12);
	b--;
	if(b<=-1){
	b=0;
	}else{
	ysz(xx,qqq,aaa);
	}
}

function ysz(x,a,q){
	x.style.marginLeft	= (b*numm)+'px';
	a.className='gt zuoj_1 iconfont gt1';
	q.className='gt zuoj_1 iconfont';	
}
hao();
ab();
//第一个事件
function hao(){		
		time11=setInterval(function(){
			b++;
			if(b>=2){
				b=1;
				}else{
			xx.style.marginLeft	= (b*-1240)+'px';
			aaa.className='gt zuoj_1 iconfont gt1';
			qqq.className='gt zuoj_1 iconfont';	
					}
		},3000);
}
//两个事件交替进行
function ab(){		
time12=setInterval(function(){
	b--;
if(b<=-1){
	b=0;
	}else{
xx.style.marginLeft = (b*1240) + 'px';
aaa.className='gt zuoj_1 iconfont gt1';
qqq.className='gt zuoj_1 iconfont';
	}
	},5000);
}
	



var right=document.getElementById("right");
var as=document.getElementById("xs");
	
	right.onmouseover=function(){
	
	//right.className='title-h';
	as.style.height=80+'px';
	as.style.display='block';	
	}
	right.onmouseout=function(){
	as.style.height=0+'px';
	as.style.display='none';	
	}	
var sb=0;	
bbb.onclick=function(){
	
if(sb>-3720){
	sb=sb-1240
	yy.style.marginLeft=sb+'px';
		}
if(sb==-3720){
	bbb.className='gt zuoj_1 iconfont gt1';	
	sss.className='gt zuoj_1 iconfont';
		}		
	}
	
sss.onclick=function(){
if(sb<0){
	sb=sb+1240
	yy.style.marginLeft=sb+'px';
		}
	if(sb==0){
	sss.className='gt zuoj_1 iconfont gt1';	
	bbb.className='gt zuoj_1 iconfont';
		}		
	}
		
	
		
//cj();

/*function add(num){
var jb=document.getElementsByClassName("php-list");
	
for(var i=0; i<jb.length; i++){
jb[i].index=i;	
jb[i].onmouseover=function(){
if(i = num){	
document.getElementsByClassName("php-list").className="php-list-2";
	
	}else{
		
			}	
		}
	}
}*/

	
/*bbb.onclick=function(){
	clearInterval(time);
	//sss.style.display='inline-block';
	
	yy.style.marginLeft=parseInt(yy.style.marginLeft)-1240+'px';
	sss.style.color="#e0e0e0";
	bbb.style.color='#757575';
	
	if(yy.style.marginLeft==-3720+'px'){
	sss.style.cursor="default";
	alert('s');
	//bbb.style.display='none';
	}
}
*/
/*function en(){
	
	for( var i=0;i<6;i++){
	clearInterval(time);
	time=setInterval(function(){
	yy.style.marginLeft=i*'-1240'+'px';
	},5000);	
		}
}*/

/*sss.onclick=function(){
clearInterval(time);
bbb.style.color='#e0e0e0';
bbb.style.cursor="default";
sss.style.cursor='pointer';
//bbb.style.display='inline-block';

yy.style.marginLeft=parseInt(yy.style.marginLeft)+1240+'px';;
sss.style.color="#b0b0b0";	
if(yy.style.marginLeft==0+'px'){

//sss.style.display='none';
}
}*/
/*
function mj(){

	clearInterval(time);
time=setInterval(function(){
	yy.style.marginLeft=0;
	sss.style.color="#e0e0e0";
	bbb.style.color="#757575"
	},12000);	
	
}
*/

/* function $(id){
return document.getElementById(id);

}
function em(id){
return document.getElementsByTagName(id);	
}*/

var LL=document.getElementById('List');
var opp=LL.getElementsByTagName('li');
var tt=document.getElementById("Tab");
var pp=tt.getElementsByTagName('ul');
var Rr=document.getElementById("re");
var mm=Rr.getElementsByTagName('li');
var Qw=document.getElementById('yang');
var qs=Qw.getElementsByTagName('ul');
var Xx=document.getElementById("fu");
var Xi=Xx.getElementsByTagName("li");	
var Ff=document.getElementById("xiang");	
var eee=Ff.getElementsByTagName("ul");	
var dd=document.getElementsByClassName("type-item");
var qq=document.getElementsByClassName("zi");
		
function ff(id,Id){
for(var i=0; i<id.length; i++){
id[i].index=i;	
id[i].onmouseover=function(){
for(var i=0; i<Id.length; i++){
id[i].className='';
Id[i].style.display='none';	
			}
this.className="tab-color";			
Id[this.index].style.display="block";			
		}						
	}	
}
	
ff(Xi,eee);
ff(mm,qs);	
ff(opp,pp);	
/***************左手机平板 电话卡 列表*************************************/
var dd=document.getElementsByClassName("type-item");
var qq=document.getElementsByClassName("zi");

function add(id,ID){
		
		for(var i = 0;i<id.length;i++){
		id[i].index = i;
		
		id[i].onmouseover=function(){
			for(var i=0; i<ID.length; i++){
				
				//dd[this.index].className="title-m";
				ID[i].style.display='none';
				}
				this.className="title-m";
				ID[this.index].style.display='block';	
			}
		id[i].onmouseout=function(){
		for( var i=0; i<ID.length; i++){	
		this.className="";
		ID[this.index].style.display='none';	
			
			}	
			
		}
		
	}
}
add(dd,qq);



var cc=document.getElementById("aqq");
//alert(cc.)
var bb=document.getElementById("xm-1");
var rr=bb.getElementsByClassName("pager");
var zuo=document.getElementById("zuo");
var you=document.getElementById("yyy");
var bb_li = bb.getElementsByTagName('li');
var aqq=document.getElementById("aqq");
var you1=document.getElementById("yyy1");//第二个右键
var zu1=document.getElementById("zuo1");//第二个左键
var cc1=document.getElementById("bbq"); //第二个UL
var bb1=document.getElementById("xm-2");//第二个焦点
var gg_li = bb1.getElementsByTagName('li');//第二个焦点LI
var An1=document.getElementById("an1");//第三个左键;
var An2=document.getElementById("an2");//第三个右键;
var PPT=document.getElementById("ppt");//第三个Ul
var AN=document.getElementById("xm-3");//第三个焦点
var qq_li=AN.getElementsByTagName("li");//第三个焦点LI
var opig=document.getElementById("pig");//第四个Ul
var obt=document.getElementById("btq");//第四个左键
var ott=document.getElementById("btt");//第四个右键
var opage=document.getElementById("xm-4");//第四个焦点
var aa_li=opage.getElementsByTagName("li");//第四个焦点Li

var m=0;


	you.onclick=function(){//第一个焦点轮播
	m++;
	if(m>=3){
	you.className='gt youj_1 iconfont gt1';		
		m=3;
		}
	zuo.className='gt zuoj_1 iconfont gt2';		
	anniu(bb_li,aqq,m);	
	}
	
	zuo.onclick=function(){
	m--;
	if(m<=0){
	zuo.className='gt zuoj_1 iconfont gt1 '	
	m=0;
		}	
	you.className='gt youj_1 iconfont gt2 '	
	anniu(bb_li,aqq,m);		
}

you1.onclick=function(){//第二个焦点轮播
	m++;
if(m>3){
	m=3;
	}	
anniu(gg_li,cc1,m);	
}
zu1.onclick=function(){
m--;
if(m<0){
m=0;	
}		
anniu(gg_li,cc1,m);	
}
An2.onclick=function(){//第三个焦点轮播
	m++;
if(m>3){
	m=3;
	}	
anniu(qq_li,PPT,m);	
}
An1.onclick=function(){
m--;
if(m<0){
m=0;	
}		
anniu(qq_li,PPT,m);	
}

ott.onclick=function(){//第四个焦点轮播
	m++;
if(m>3){
	m=3;
	}	
anniu(aa_li,opig,m);	
}
obt.onclick=function(){
m--;
if(m<0){
m=0;	
}		
anniu(aa_li,opig,m);	
}

function anniu(x,y,k){
for(var i=0; i<x.length; i++){
x[i].className="pager";
}	
	y.style.marginLeft=-m*296+'px';	
	x[k].className="pager active";
		
}
bbbb(bb_li,cc);
bbbb(gg_li,cc1);
bbbb(qq_li,ppt);
bbbb(aa_li,opig);
function bbbb(yy,gg){
for(var i=0; i<yy.length; i++){
yy[i].index=i;	
yy[i].onclick=function(){
	var that=this.index;
	
	for(var i=0; i<yy.length; i++){
	yy[i].className='pager';
	yy[that].className='pager active';
	gg.style.marginLeft=(this.index*-296)+'px';
	m=that;
	}

		}
	}
}


/*	var q = parseInt(cc.style.marginLeft);
	var q1 = parseInt(cc1.style.marginLeft);
	var q2=parseInt(PPT.style.marginLeft);*/
	/*var boolen = true;
	zu.onclick = function(){
		boolen = true;
		lunbo(cc,q,boolen,bb_li);
		}*/
	/*you.onclick = function(){boolen = false;lunbo(cc,q,boolen,bb_li);}
	zu1.onclick = function(){boolen = true;lunbo(cc1,q1,boolen,gg_li);}
	you1.onclick = function(){boolen = false;lunbo(cc1,q1,boolen,gg_li);}
	An1.onclick = function(){boolen = true; lunbo(PPT,q2,boolen,qq_li);}
	An2.onclick=function(){boolen = false; lunbo(PPT,q2,boolen,qq_li);}	
	/*function lunbo(id,qq,boo,li){
					if(qq<0&&boo==true){
						qq=qq+296;
						id.style.marginLeft = qq+'px';
					}
					if(qq>-888&&boo==false){
						qq=qq-296;
						id.style.marginLeft = qq+'px';
					}
				for(var i = 0,k=0;i<li.length;i++,k-=296){
						li[i].className = 'pager';
						if(qq==k){
							li[i].className = 'pager active';	
					}

					}	
					q = parseInt(cc.style.marginLeft);	
					q1 = parseInt(cc1.style.marginLeft);
					q2=parseInt(PPT.style.marginLeft);			
		}*/
	

		  	
}
