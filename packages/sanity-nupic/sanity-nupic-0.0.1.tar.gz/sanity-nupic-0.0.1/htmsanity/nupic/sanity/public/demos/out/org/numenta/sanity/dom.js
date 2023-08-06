// Compiled by ClojureScript 1.7.170 {:static-fns true, :optimize-constants true}
goog.provide('org.numenta.sanity.dom');
goog.require('cljs.core');
org.numenta.sanity.dom.get_bounding_page_rect = (function org$numenta$sanity$dom$get_bounding_page_rect(el){
var vec__39848 = (function (){var el__$1 = el;
var x = (0);
var y = (0);
while(true){
if(cljs.core.truth_(el__$1)){
var s = getComputedStyle(el__$1);
var include_border_QMARK_ = cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(s.position,"static");
var G__39855 = el__$1.offsetParent;
var G__39856 = (function (){var G__39849 = (function (){var G__39850 = (x + el__$1.offsetLeft);
if(include_border_QMARK_){
return (G__39850 + (function (){var G__39851 = s.borderLeftWidth;
return parseInt(G__39851);
})());
} else {
return G__39850;
}
})();
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(el__$1,document.body)){
return (G__39849 - el__$1.scrollLeft);
} else {
return G__39849;
}
})();
var G__39857 = (function (){var G__39852 = (function (){var G__39853 = (y + el__$1.offsetTop);
if(include_border_QMARK_){
return (G__39853 + (function (){var G__39854 = s.borderTopWidth;
return parseInt(G__39854);
})());
} else {
return G__39853;
}
})();
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(el__$1,document.body)){
return (G__39852 - el__$1.scrollTop);
} else {
return G__39852;
}
})();
el__$1 = G__39855;
x = G__39856;
y = G__39857;
continue;
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x,y], null);
}
break;
}
})();
var left = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39848,(0),null);
var top = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39848,(1),null);
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [left,top,(left + el.offsetWidth),(top + el.offsetHeight)], null);
});
org.numenta.sanity.dom.within_element_QMARK_ = (function org$numenta$sanity$dom$within_element_QMARK_(evt,el){
var vec__39859 = org.numenta.sanity.dom.get_bounding_page_rect(el);
var left = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39859,(0),null);
var top = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39859,(1),null);
var right = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39859,(2),null);
var bottom = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39859,(3),null);
return ((evt.pageX >= left)) && ((evt.pageX < right)) && ((evt.pageY >= top)) && ((evt.pageY < bottom));
});
org.numenta.sanity.dom.nonzero_number_QMARK_ = (function org$numenta$sanity$dom$nonzero_number_QMARK_(v){
if((typeof v === 'number') && (!((v === (0))))){
return v;
} else {
return false;
}
});
org.numenta.sanity.dom.page_x = (function org$numenta$sanity$dom$page_x(evt){
var or__4682__auto__ = evt.pageX;
if(cljs.core.truth_(or__4682__auto__)){
return or__4682__auto__;
} else {
var doc = document.documentElement;
var body = document.body;
return (evt.clientX + ((function (){var or__4682__auto____$1 = org.numenta.sanity.dom.nonzero_number_QMARK_((function (){var and__4670__auto__ = doc;
if(cljs.core.truth_(and__4670__auto__)){
return doc.scrollLeft;
} else {
return and__4670__auto__;
}
})());
if(cljs.core.truth_(or__4682__auto____$1)){
return or__4682__auto____$1;
} else {
var or__4682__auto____$2 = org.numenta.sanity.dom.nonzero_number_QMARK_((function (){var and__4670__auto__ = body;
if(cljs.core.truth_(and__4670__auto__)){
return body.scrollLeft;
} else {
return and__4670__auto__;
}
})());
if(cljs.core.truth_(or__4682__auto____$2)){
return or__4682__auto____$2;
} else {
return (0);
}
}
})() - (function (){var or__4682__auto____$1 = org.numenta.sanity.dom.nonzero_number_QMARK_((function (){var and__4670__auto__ = doc;
if(cljs.core.truth_(and__4670__auto__)){
return doc.clientLeft;
} else {
return and__4670__auto__;
}
})());
if(cljs.core.truth_(or__4682__auto____$1)){
return or__4682__auto____$1;
} else {
var or__4682__auto____$2 = org.numenta.sanity.dom.nonzero_number_QMARK_((function (){var and__4670__auto__ = body;
if(cljs.core.truth_(and__4670__auto__)){
return body.clientLeft;
} else {
return and__4670__auto__;
}
})());
if(cljs.core.truth_(or__4682__auto____$2)){
return or__4682__auto____$2;
} else {
return (0);
}
}
})()));
}
});
org.numenta.sanity.dom.page_y = (function org$numenta$sanity$dom$page_y(evt){
var or__4682__auto__ = evt.pageY;
if(cljs.core.truth_(or__4682__auto__)){
return or__4682__auto__;
} else {
var doc = document.documentElement;
var body = document.body;
return (evt.clientY + ((function (){var or__4682__auto____$1 = org.numenta.sanity.dom.nonzero_number_QMARK_((function (){var and__4670__auto__ = doc;
if(cljs.core.truth_(and__4670__auto__)){
return doc.scrollTop;
} else {
return and__4670__auto__;
}
})());
if(cljs.core.truth_(or__4682__auto____$1)){
return or__4682__auto____$1;
} else {
var or__4682__auto____$2 = org.numenta.sanity.dom.nonzero_number_QMARK_((function (){var and__4670__auto__ = body;
if(cljs.core.truth_(and__4670__auto__)){
return body.scrollTop;
} else {
return and__4670__auto__;
}
})());
if(cljs.core.truth_(or__4682__auto____$2)){
return or__4682__auto____$2;
} else {
return (0);
}
}
})() - (function (){var or__4682__auto____$1 = org.numenta.sanity.dom.nonzero_number_QMARK_((function (){var and__4670__auto__ = doc;
if(cljs.core.truth_(and__4670__auto__)){
return doc.clientTop;
} else {
return and__4670__auto__;
}
})());
if(cljs.core.truth_(or__4682__auto____$1)){
return or__4682__auto____$1;
} else {
var or__4682__auto____$2 = org.numenta.sanity.dom.nonzero_number_QMARK_((function (){var and__4670__auto__ = body;
if(cljs.core.truth_(and__4670__auto__)){
return body.clientTop;
} else {
return and__4670__auto__;
}
})());
if(cljs.core.truth_(or__4682__auto____$2)){
return or__4682__auto____$2;
} else {
return (0);
}
}
})()));
}
});
org.numenta.sanity.dom.offset_from = (function org$numenta$sanity$dom$offset_from(evt,el){
var vec__39861 = org.numenta.sanity.dom.get_bounding_page_rect(el);
var left = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39861,(0),null);
var top = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39861,(1),null);
var right = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39861,(2),null);
var bottom = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39861,(3),null);
return new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$x,(org.numenta.sanity.dom.page_x(evt) - left),cljs.core.cst$kw$y,(org.numenta.sanity.dom.page_y(evt) - top)], null);
});
org.numenta.sanity.dom.offset_from_target = (function org$numenta$sanity$dom$offset_from_target(evt){
return org.numenta.sanity.dom.offset_from(evt,evt.target);
});
