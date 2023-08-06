// Compiled by ClojureScript 1.7.170 {:static-fns true, :optimize-constants true}
goog.provide('org.numenta.sanity.controls_ui');
goog.require('cljs.core');
goog.require('org.numenta.sanity.plots');
goog.require('goog.dom.forms');
goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('reagent.core');
goog.require('org.numenta.sanity.helpers');
goog.require('org.nfrac.comportex.protocols');
goog.require('goog.string');
goog.require('cljs.core.async');
goog.require('clojure.browser.repl');
goog.require('org.numenta.sanity.bridge.marshalling');
goog.require('reagent_forms.core');
goog.require('org.numenta.sanity.selection');
goog.require('clojure.string');
goog.require('cljs.reader');
goog.require('clojure.walk');
org.numenta.sanity.controls_ui.now = (function org$numenta$sanity$controls_ui$now(){
return (new Date()).getTime();
});
/**
 * Returns the simulation rate in timesteps per second for current
 * run.
 */
org.numenta.sanity.controls_ui.sim_rate = (function org$numenta$sanity$controls_ui$sim_rate(step,run_start){
var temp__4651__auto__ = cljs.core.cst$kw$time.cljs$core$IFn$_invoke$arity$1(run_start);
if(cljs.core.truth_(temp__4651__auto__)){
var time_start = temp__4651__auto__;
var dur_ms = (org.numenta.sanity.controls_ui.now() - time_start);
return (((cljs.core.cst$kw$timestep.cljs$core$IFn$_invoke$arity$1(step) - cljs.core.cst$kw$timestep.cljs$core$IFn$_invoke$arity$1(run_start)) / dur_ms) * (1000));
} else {
return (0);
}
});
org.numenta.sanity.controls_ui.param_type = (function org$numenta$sanity$controls_ui$param_type(v){
if((v === true) || (v === false)){
return cljs.core.cst$kw$boolean;
} else {
if(cljs.core.vector_QMARK_(v)){
return cljs.core.cst$kw$vector;
} else {
return cljs.core.cst$kw$number;

}
}
});
org.numenta.sanity.controls_ui.spec_form = (function org$numenta$sanity$controls_ui$spec_form(step_template,partypes,spec,spec_path,skip_set){
var iter__5454__auto__ = (function org$numenta$sanity$controls_ui$spec_form_$_iter__60637(s__60638){
return (new cljs.core.LazySeq(null,(function (){
var s__60638__$1 = s__60638;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__60638__$1);
if(temp__4653__auto__){
var s__60638__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__60638__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__60638__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__60640 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__60639 = (0);
while(true){
if((i__60639 < size__5453__auto__)){
var vec__60653 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__60639);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60653,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60653,(1),null);
if(cljs.core.not((skip_set.cljs$core$IFn$_invoke$arity$1 ? skip_set.cljs$core$IFn$_invoke$arity$1(k) : skip_set.call(null,k)))){
var typ = (function (){var or__4682__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(partypes) : cljs.core.deref.call(null,partypes)),k);
if(cljs.core.truth_(or__4682__auto__)){
return or__4682__auto__;
} else {
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(partypes,cljs.core.assoc,k,org.numenta.sanity.controls_ui.param_type(v)),k);
}
})();
var setv_BANG_ = ((function (i__60639,s__60638__$1,typ,vec__60653,k,v,c__5452__auto__,size__5453__auto__,b__60640,s__60638__$2,temp__4653__auto__){
return (function (p1__60610_SHARP_){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(step_template,cljs.core.assoc_in,spec_path,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(spec,k,p1__60610_SHARP_));
});})(i__60639,s__60638__$1,typ,vec__60653,k,v,c__5452__auto__,size__5453__auto__,b__60640,s__60638__$2,temp__4653__auto__))
;
cljs.core.chunk_append(b__60640,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$row,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$class,((((v == null)) || (typeof v === 'string'))?"has-error":null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_8,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label$control_DASH_label$text_DASH_left,cljs.core.name(k)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_4,(function (){var G__60654 = (((typ instanceof cljs.core.Keyword))?typ.fqn:null);
switch (G__60654) {
case "boolean":
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input$form_DASH_control$input_DASH_sm,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,cljs.core.cst$kw$checkbox,cljs.core.cst$kw$checked,(cljs.core.truth_(v)?true:null),cljs.core.cst$kw$on_DASH_change,((function (i__60639,s__60638__$1,G__60654,typ,setv_BANG_,vec__60653,k,v,c__5452__auto__,size__5453__auto__,b__60640,s__60638__$2,temp__4653__auto__){
return (function (){
return setv_BANG_(cljs.core.not(v));
});})(i__60639,s__60638__$1,G__60654,typ,setv_BANG_,vec__60653,k,v,c__5452__auto__,size__5453__auto__,b__60640,s__60638__$2,temp__4653__auto__))
], null)], null);

break;
case "vector":
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input$form_DASH_control$input_DASH_sm,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$value,[cljs.core.str(v)].join(''),cljs.core.cst$kw$on_DASH_change,((function (i__60639,s__60638__$1,G__60654,typ,setv_BANG_,vec__60653,k,v,c__5452__auto__,size__5453__auto__,b__60640,s__60638__$2,temp__4653__auto__){
return (function (e){
var s = (function (){var G__60655 = e.target;
return goog.dom.forms.getValue(G__60655);
})();
var x = (function (){try{return cljs.reader.read_string(s);
}catch (e60656){var _ = e60656;
return s;
}})();
var newval = (((cljs.core.vector_QMARK_(x)) && (cljs.core.every_QMARK_(cljs.core.integer_QMARK_,x)))?x:s);
return setv_BANG_(newval);
});})(i__60639,s__60638__$1,G__60654,typ,setv_BANG_,vec__60653,k,v,c__5452__auto__,size__5453__auto__,b__60640,s__60638__$2,temp__4653__auto__))
], null)], null);

break;
case "number":
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input$form_DASH_control$input_DASH_sm,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$value,v,cljs.core.cst$kw$on_DASH_change,((function (i__60639,s__60638__$1,G__60654,typ,setv_BANG_,vec__60653,k,v,c__5452__auto__,size__5453__auto__,b__60640,s__60638__$2,temp__4653__auto__){
return (function (e){
var s = (function (){var G__60657 = e.target;
return goog.dom.forms.getValue(G__60657);
})();
var parsed = parseFloat(s);
var newval = (cljs.core.truth_((function (){var or__4682__auto__ = cljs.core.empty_QMARK_(s);
if(or__4682__auto__){
return or__4682__auto__;
} else {
return isNaN(parsed);
}
})())?null:((cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(s,[cljs.core.str(parsed)].join('')))?s:parsed));
return setv_BANG_(newval);
});})(i__60639,s__60638__$1,G__60654,typ,setv_BANG_,vec__60653,k,v,c__5452__auto__,size__5453__auto__,b__60640,s__60638__$2,temp__4653__auto__))
], null)], null);

break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(typ)].join('')));

}
})()], null)], null));

var G__60664 = (i__60639 + (1));
i__60639 = G__60664;
continue;
} else {
var G__60665 = (i__60639 + (1));
i__60639 = G__60665;
continue;
}
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__60640),org$numenta$sanity$controls_ui$spec_form_$_iter__60637(cljs.core.chunk_rest(s__60638__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__60640),null);
}
} else {
var vec__60658 = cljs.core.first(s__60638__$2);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60658,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60658,(1),null);
if(cljs.core.not((skip_set.cljs$core$IFn$_invoke$arity$1 ? skip_set.cljs$core$IFn$_invoke$arity$1(k) : skip_set.call(null,k)))){
var typ = (function (){var or__4682__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(partypes) : cljs.core.deref.call(null,partypes)),k);
if(cljs.core.truth_(or__4682__auto__)){
return or__4682__auto__;
} else {
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(partypes,cljs.core.assoc,k,org.numenta.sanity.controls_ui.param_type(v)),k);
}
})();
var setv_BANG_ = ((function (s__60638__$1,typ,vec__60658,k,v,s__60638__$2,temp__4653__auto__){
return (function (p1__60610_SHARP_){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(step_template,cljs.core.assoc_in,spec_path,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(spec,k,p1__60610_SHARP_));
});})(s__60638__$1,typ,vec__60658,k,v,s__60638__$2,temp__4653__auto__))
;
return cljs.core.cons(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$row,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$class,((((v == null)) || (typeof v === 'string'))?"has-error":null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_8,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label$control_DASH_label$text_DASH_left,cljs.core.name(k)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_4,(function (){var G__60659 = (((typ instanceof cljs.core.Keyword))?typ.fqn:null);
switch (G__60659) {
case "boolean":
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input$form_DASH_control$input_DASH_sm,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,cljs.core.cst$kw$checkbox,cljs.core.cst$kw$checked,(cljs.core.truth_(v)?true:null),cljs.core.cst$kw$on_DASH_change,((function (s__60638__$1,G__60659,typ,setv_BANG_,vec__60658,k,v,s__60638__$2,temp__4653__auto__){
return (function (){
return setv_BANG_(cljs.core.not(v));
});})(s__60638__$1,G__60659,typ,setv_BANG_,vec__60658,k,v,s__60638__$2,temp__4653__auto__))
], null)], null);

break;
case "vector":
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input$form_DASH_control$input_DASH_sm,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$value,[cljs.core.str(v)].join(''),cljs.core.cst$kw$on_DASH_change,((function (s__60638__$1,G__60659,typ,setv_BANG_,vec__60658,k,v,s__60638__$2,temp__4653__auto__){
return (function (e){
var s = (function (){var G__60660 = e.target;
return goog.dom.forms.getValue(G__60660);
})();
var x = (function (){try{return cljs.reader.read_string(s);
}catch (e60661){var _ = e60661;
return s;
}})();
var newval = (((cljs.core.vector_QMARK_(x)) && (cljs.core.every_QMARK_(cljs.core.integer_QMARK_,x)))?x:s);
return setv_BANG_(newval);
});})(s__60638__$1,G__60659,typ,setv_BANG_,vec__60658,k,v,s__60638__$2,temp__4653__auto__))
], null)], null);

break;
case "number":
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input$form_DASH_control$input_DASH_sm,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$value,v,cljs.core.cst$kw$on_DASH_change,((function (s__60638__$1,G__60659,typ,setv_BANG_,vec__60658,k,v,s__60638__$2,temp__4653__auto__){
return (function (e){
var s = (function (){var G__60662 = e.target;
return goog.dom.forms.getValue(G__60662);
})();
var parsed = parseFloat(s);
var newval = (cljs.core.truth_((function (){var or__4682__auto__ = cljs.core.empty_QMARK_(s);
if(or__4682__auto__){
return or__4682__auto__;
} else {
return isNaN(parsed);
}
})())?null:((cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(s,[cljs.core.str(parsed)].join('')))?s:parsed));
return setv_BANG_(newval);
});})(s__60638__$1,G__60659,typ,setv_BANG_,vec__60658,k,v,s__60638__$2,temp__4653__auto__))
], null)], null);

break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(typ)].join('')));

}
})()], null)], null),org$numenta$sanity$controls_ui$spec_form_$_iter__60637(cljs.core.rest(s__60638__$2)));
} else {
var G__60667 = cljs.core.rest(s__60638__$2);
s__60638__$1 = G__60667;
continue;
}
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5454__auto__(cljs.core.sort.cljs$core$IFn$_invoke$arity$1(spec));
});
org.numenta.sanity.controls_ui.parameters_tab = (function org$numenta$sanity$controls_ui$parameters_tab(step_template,_,into_sim,___$1){
cljs.core.add_watch(step_template,cljs.core.cst$kw$org$numenta$sanity$controls_DASH_ui_SLASH_push_DASH_to_DASH_server,(function (___$2,___$3,prev_st,st){
if((prev_st == null)){
return null;
} else {
var seq__60721 = cljs.core.seq((function (){var iter__5454__auto__ = (function org$numenta$sanity$controls_ui$parameters_tab_$_iter__60727(s__60728){
return (new cljs.core.LazySeq(null,(function (){
var s__60728__$1 = s__60728;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__60728__$1);
if(temp__4653__auto__){
var xs__5201__auto__ = temp__4653__auto__;
var vec__60737 = cljs.core.first(xs__5201__auto__);
var r_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60737,(0),null);
var rgn = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60737,(1),null);
var iterys__5450__auto__ = ((function (s__60728__$1,vec__60737,r_id,rgn,xs__5201__auto__,temp__4653__auto__){
return (function org$numenta$sanity$controls_ui$parameters_tab_$_iter__60727_$_iter__60729(s__60730){
return (new cljs.core.LazySeq(null,((function (s__60728__$1,vec__60737,r_id,rgn,xs__5201__auto__,temp__4653__auto__){
return (function (){
var s__60730__$1 = s__60730;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__60730__$1);
if(temp__4653__auto____$1){
var s__60730__$2 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__60730__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__60730__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__60732 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__60731 = (0);
while(true){
if((i__60731 < size__5453__auto__)){
var l_id = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__60731);
cljs.core.chunk_append(b__60732,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,r_id,l_id,cljs.core.cst$kw$spec], null));

var G__60774 = (i__60731 + (1));
i__60731 = G__60774;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__60732),org$numenta$sanity$controls_ui$parameters_tab_$_iter__60727_$_iter__60729(cljs.core.chunk_rest(s__60730__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__60732),null);
}
} else {
var l_id = cljs.core.first(s__60730__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,r_id,l_id,cljs.core.cst$kw$spec], null),org$numenta$sanity$controls_ui$parameters_tab_$_iter__60727_$_iter__60729(cljs.core.rest(s__60730__$2)));
}
} else {
return null;
}
break;
}
});})(s__60728__$1,vec__60737,r_id,rgn,xs__5201__auto__,temp__4653__auto__))
,null,null));
});})(s__60728__$1,vec__60737,r_id,rgn,xs__5201__auto__,temp__4653__auto__))
;
var fs__5451__auto__ = cljs.core.seq(iterys__5450__auto__(cljs.core.keys(rgn)));
if(fs__5451__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5451__auto__,org$numenta$sanity$controls_ui$parameters_tab_$_iter__60727(cljs.core.rest(s__60728__$1)));
} else {
var G__60775 = cljs.core.rest(s__60728__$1);
s__60728__$1 = G__60775;
continue;
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5454__auto__(cljs.core.cst$kw$regions.cljs$core$IFn$_invoke$arity$1(st));
})());
var chunk__60723 = null;
var count__60724 = (0);
var i__60725 = (0);
while(true){
if((i__60725 < count__60724)){
var path = chunk__60723.cljs$core$IIndexed$_nth$arity$2(null,i__60725);
var old_spec_60776 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(prev_st,path);
var new_spec_60777 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(st,path);
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(old_spec_60776,new_spec_60777)){
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(into_sim,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["set-spec",path,new_spec_60777], null));
} else {
}

var G__60778 = seq__60721;
var G__60779 = chunk__60723;
var G__60780 = count__60724;
var G__60781 = (i__60725 + (1));
seq__60721 = G__60778;
chunk__60723 = G__60779;
count__60724 = G__60780;
i__60725 = G__60781;
continue;
} else {
var temp__4653__auto__ = cljs.core.seq(seq__60721);
if(temp__4653__auto__){
var seq__60721__$1 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__60721__$1)){
var c__5485__auto__ = cljs.core.chunk_first(seq__60721__$1);
var G__60782 = cljs.core.chunk_rest(seq__60721__$1);
var G__60783 = c__5485__auto__;
var G__60784 = cljs.core.count(c__5485__auto__);
var G__60785 = (0);
seq__60721 = G__60782;
chunk__60723 = G__60783;
count__60724 = G__60784;
i__60725 = G__60785;
continue;
} else {
var path = cljs.core.first(seq__60721__$1);
var old_spec_60786 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(prev_st,path);
var new_spec_60787 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(st,path);
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(old_spec_60786,new_spec_60787)){
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(into_sim,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["set-spec",path,new_spec_60787], null));
} else {
}

var G__60788 = cljs.core.next(seq__60721__$1);
var G__60789 = null;
var G__60790 = (0);
var G__60791 = (0);
seq__60721 = G__60788;
chunk__60723 = G__60789;
count__60724 = G__60790;
i__60725 = G__60791;
continue;
}
} else {
return null;
}
}
break;
}
}
}));

var partypes = (function (){var G__60740 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__60740) : cljs.core.atom.call(null,G__60740));
})();
return ((function (partypes){
return (function (step_template__$1,selection,into_sim__$1){
var vec__60741 = cljs.core.some(org.numenta.sanity.selection.layer,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selection) : cljs.core.deref.call(null,selection)));
var sel_region = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60741,(0),null);
var sel_layer = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60741,(1),null);
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_muted,"Read/write model parameters of the selected region layer,\n                    with immediate effect. Click a layer to select it."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_info$text_DASH_center,(cljs.core.truth_(sel_layer)?[cljs.core.str(cljs.core.name(sel_region)),cljs.core.str(" "),cljs.core.str(cljs.core.name(sel_layer))].join(''):null)], null),cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_horizontal], null),(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(step_template__$1) : cljs.core.deref.call(null,step_template__$1)))?(function (){var spec_path = new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,sel_region,sel_layer,cljs.core.cst$kw$spec], null);
var spec = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(step_template__$1) : cljs.core.deref.call(null,step_template__$1)),spec_path);
return cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(org.numenta.sanity.controls_ui.spec_form(step_template__$1,partypes,spec,spec_path,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$distal,null,cljs.core.cst$kw$proximal,null,cljs.core.cst$kw$apical,null], null), null)),(function (){var iter__5454__auto__ = ((function (spec_path,spec,vec__60741,sel_region,sel_layer,partypes){
return (function org$numenta$sanity$controls_ui$parameters_tab_$_iter__60742(s__60743){
return (new cljs.core.LazySeq(null,((function (spec_path,spec,vec__60741,sel_region,sel_layer,partypes){
return (function (){
var s__60743__$1 = s__60743;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__60743__$1);
if(temp__4653__auto__){
var s__60743__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__60743__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__60743__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__60745 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__60744 = (0);
while(true){
if((i__60744 < size__5453__auto__)){
var vec__60750 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__60744);
var sub_k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60750,(0),null);
var title = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60750,(1),null);
cljs.core.chunk_append(b__60745,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel$panel_DASH_default,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel_DASH_heading,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h4$panel_DASH_title,title], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel_DASH_body,cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_horizontal], null),org.numenta.sanity.controls_ui.spec_form(step_template__$1,partypes,cljs.core.get.cljs$core$IFn$_invoke$arity$2(spec,sub_k),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(spec_path,sub_k),cljs.core.PersistentHashSet.EMPTY))], null)], null));

var G__60792 = (i__60744 + (1));
i__60744 = G__60792;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__60745),org$numenta$sanity$controls_ui$parameters_tab_$_iter__60742(cljs.core.chunk_rest(s__60743__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__60745),null);
}
} else {
var vec__60751 = cljs.core.first(s__60743__$2);
var sub_k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60751,(0),null);
var title = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60751,(1),null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel$panel_DASH_default,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel_DASH_heading,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h4$panel_DASH_title,title], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel_DASH_body,cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_horizontal], null),org.numenta.sanity.controls_ui.spec_form(step_template__$1,partypes,cljs.core.get.cljs$core$IFn$_invoke$arity$2(spec,sub_k),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(spec_path,sub_k),cljs.core.PersistentHashSet.EMPTY))], null)], null),org$numenta$sanity$controls_ui$parameters_tab_$_iter__60742(cljs.core.rest(s__60743__$2)));
}
} else {
return null;
}
break;
}
});})(spec_path,spec,vec__60741,sel_region,sel_layer,partypes))
,null,null));
});})(spec_path,spec,vec__60741,sel_region,sel_layer,partypes))
;
return iter__5454__auto__(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$proximal,"Proximal dendrites"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$distal,"Distal (lateral) dendrites"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$apical,"Apical dendrites"], null)], null));
})(),cljs.core.array_seq([new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel$panel_DASH_default,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel_DASH_heading,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h4$panel_DASH_title,"Note"], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel_DASH_body,new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"Parameter values can be altered above, but some parameters\n                     must be in effect when the HTM regions are created.\n                     Notable examples are ",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$code,"column-dimensions"], null)," and ",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$code,"depth"], null),". After setting such parameter values, rebuild all regions\n                 (obviously losing any learned connections in the process):"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_warning$btn_DASH_block,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$on_DASH_click,((function (spec_path,spec,vec__60741,sel_region,sel_layer,partypes){
return (function (){
return org.numenta.sanity.helpers.ui_loading_message_until((function (){var c__35961__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__35961__auto__,spec_path,spec,vec__60741,sel_region,sel_layer,partypes){
return (function (){
var f__35962__auto__ = (function (){var switch__35847__auto__ = ((function (c__35961__auto__,spec_path,spec,vec__60741,sel_region,sel_layer,partypes){
return (function (state_60764){
var state_val_60765 = (state_60764[(1)]);
if((state_val_60765 === (1))){
var inst_60752 = cljs.core.async.timeout((100));
var state_60764__$1 = state_60764;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_60764__$1,(2),inst_60752);
} else {
if((state_val_60765 === (2))){
var inst_60754 = (state_60764[(2)]);
var inst_60755 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
var inst_60756 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_60757 = org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$2(inst_60755,true);
var inst_60758 = ["restart",inst_60757];
var inst_60759 = (new cljs.core.PersistentVector(null,2,(5),inst_60756,inst_60758,null));
var inst_60760 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(into_sim__$1,inst_60759);
var state_60764__$1 = (function (){var statearr_60766 = state_60764;
(statearr_60766[(7)] = inst_60760);

(statearr_60766[(8)] = inst_60754);

return statearr_60766;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_60764__$1,(3),inst_60755);
} else {
if((state_val_60765 === (3))){
var inst_60762 = (state_60764[(2)]);
var state_60764__$1 = state_60764;
return cljs.core.async.impl.ioc_helpers.return_chan(state_60764__$1,inst_60762);
} else {
return null;
}
}
}
});})(c__35961__auto__,spec_path,spec,vec__60741,sel_region,sel_layer,partypes))
;
return ((function (switch__35847__auto__,c__35961__auto__,spec_path,spec,vec__60741,sel_region,sel_layer,partypes){
return (function() {
var org$numenta$sanity$controls_ui$parameters_tab_$_state_machine__35848__auto__ = null;
var org$numenta$sanity$controls_ui$parameters_tab_$_state_machine__35848__auto____0 = (function (){
var statearr_60770 = [null,null,null,null,null,null,null,null,null];
(statearr_60770[(0)] = org$numenta$sanity$controls_ui$parameters_tab_$_state_machine__35848__auto__);

(statearr_60770[(1)] = (1));

return statearr_60770;
});
var org$numenta$sanity$controls_ui$parameters_tab_$_state_machine__35848__auto____1 = (function (state_60764){
while(true){
var ret_value__35849__auto__ = (function (){try{while(true){
var result__35850__auto__ = switch__35847__auto__(state_60764);
if(cljs.core.keyword_identical_QMARK_(result__35850__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__35850__auto__;
}
break;
}
}catch (e60771){if((e60771 instanceof Object)){
var ex__35851__auto__ = e60771;
var statearr_60772_60793 = state_60764;
(statearr_60772_60793[(5)] = ex__35851__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_60764);

return cljs.core.cst$kw$recur;
} else {
throw e60771;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35849__auto__,cljs.core.cst$kw$recur)){
var G__60794 = state_60764;
state_60764 = G__60794;
continue;
} else {
return ret_value__35849__auto__;
}
break;
}
});
org$numenta$sanity$controls_ui$parameters_tab_$_state_machine__35848__auto__ = function(state_60764){
switch(arguments.length){
case 0:
return org$numenta$sanity$controls_ui$parameters_tab_$_state_machine__35848__auto____0.call(this);
case 1:
return org$numenta$sanity$controls_ui$parameters_tab_$_state_machine__35848__auto____1.call(this,state_60764);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$controls_ui$parameters_tab_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$controls_ui$parameters_tab_$_state_machine__35848__auto____0;
org$numenta$sanity$controls_ui$parameters_tab_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$controls_ui$parameters_tab_$_state_machine__35848__auto____1;
return org$numenta$sanity$controls_ui$parameters_tab_$_state_machine__35848__auto__;
})()
;})(switch__35847__auto__,c__35961__auto__,spec_path,spec,vec__60741,sel_region,sel_layer,partypes))
})();
var state__35963__auto__ = (function (){var statearr_60773 = (f__35962__auto__.cljs$core$IFn$_invoke$arity$0 ? f__35962__auto__.cljs$core$IFn$_invoke$arity$0() : f__35962__auto__.call(null));
(statearr_60773[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__35961__auto__);

return statearr_60773;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__35963__auto__);
});})(c__35961__auto__,spec_path,spec,vec__60741,sel_region,sel_layer,partypes))
);

return c__35961__auto__;
})());
});})(spec_path,spec,vec__60741,sel_region,sel_layer,partypes))
], null),"Rebuild model"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$small,"This will not reset, or otherwise alter, the input stream."], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h4,"Current spec value"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$pre,[cljs.core.str(spec)].join('')], null)], null)], 0));
})():null))], null);
});
;})(partypes))
});
org.numenta.sanity.controls_ui.gather_col_state_history_BANG_ = (function org$numenta$sanity$controls_ui$gather_col_state_history_BANG_(col_state_history,step,into_journal){
var response_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(into_journal,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["get-column-state-freqs",cljs.core.cst$kw$model_DASH_id.cljs$core$IFn$_invoke$arity$1(step),org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$2(response_c,true)], null));

var c__35961__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__35961__auto__,response_c){
return (function (){
var f__35962__auto__ = (function (){var switch__35847__auto__ = ((function (c__35961__auto__,response_c){
return (function (state_60819){
var state_val_60820 = (state_60819[(1)]);
if((state_val_60820 === (1))){
var state_60819__$1 = state_60819;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_60819__$1,(2),response_c);
} else {
if((state_val_60820 === (2))){
var inst_60814 = (state_60819[(2)]);
var inst_60815 = clojure.walk.keywordize_keys(inst_60814);
var inst_60816 = (function (){var r = inst_60815;
return ((function (r,inst_60814,inst_60815,state_val_60820,c__35961__auto__,response_c){
return (function (p1__60795_SHARP_){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (r,inst_60814,inst_60815,state_val_60820,c__35961__auto__,response_c){
return (function (csh,p__60821){
var vec__60822 = p__60821;
var layer_path = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60822,(0),null);
var col_state_freqs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60822,(1),null);
return cljs.core.update.cljs$core$IFn$_invoke$arity$3(csh,layer_path,((function (vec__60822,layer_path,col_state_freqs,r,inst_60814,inst_60815,state_val_60820,c__35961__auto__,response_c){
return (function (csf_log){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2((function (){var or__4682__auto__ = csf_log;
if(cljs.core.truth_(or__4682__auto__)){
return or__4682__auto__;
} else {
return org.numenta.sanity.plots.empty_col_state_freqs_log();
}
})(),col_state_freqs);
});})(vec__60822,layer_path,col_state_freqs,r,inst_60814,inst_60815,state_val_60820,c__35961__auto__,response_c))
);
});})(r,inst_60814,inst_60815,state_val_60820,c__35961__auto__,response_c))
,p1__60795_SHARP_,r);
});
;})(r,inst_60814,inst_60815,state_val_60820,c__35961__auto__,response_c))
})();
var inst_60817 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(col_state_history,inst_60816);
var state_60819__$1 = state_60819;
return cljs.core.async.impl.ioc_helpers.return_chan(state_60819__$1,inst_60817);
} else {
return null;
}
}
});})(c__35961__auto__,response_c))
;
return ((function (switch__35847__auto__,c__35961__auto__,response_c){
return (function() {
var org$numenta$sanity$controls_ui$gather_col_state_history_BANG__$_state_machine__35848__auto__ = null;
var org$numenta$sanity$controls_ui$gather_col_state_history_BANG__$_state_machine__35848__auto____0 = (function (){
var statearr_60826 = [null,null,null,null,null,null,null];
(statearr_60826[(0)] = org$numenta$sanity$controls_ui$gather_col_state_history_BANG__$_state_machine__35848__auto__);

(statearr_60826[(1)] = (1));

return statearr_60826;
});
var org$numenta$sanity$controls_ui$gather_col_state_history_BANG__$_state_machine__35848__auto____1 = (function (state_60819){
while(true){
var ret_value__35849__auto__ = (function (){try{while(true){
var result__35850__auto__ = switch__35847__auto__(state_60819);
if(cljs.core.keyword_identical_QMARK_(result__35850__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__35850__auto__;
}
break;
}
}catch (e60827){if((e60827 instanceof Object)){
var ex__35851__auto__ = e60827;
var statearr_60828_60830 = state_60819;
(statearr_60828_60830[(5)] = ex__35851__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_60819);

return cljs.core.cst$kw$recur;
} else {
throw e60827;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35849__auto__,cljs.core.cst$kw$recur)){
var G__60831 = state_60819;
state_60819 = G__60831;
continue;
} else {
return ret_value__35849__auto__;
}
break;
}
});
org$numenta$sanity$controls_ui$gather_col_state_history_BANG__$_state_machine__35848__auto__ = function(state_60819){
switch(arguments.length){
case 0:
return org$numenta$sanity$controls_ui$gather_col_state_history_BANG__$_state_machine__35848__auto____0.call(this);
case 1:
return org$numenta$sanity$controls_ui$gather_col_state_history_BANG__$_state_machine__35848__auto____1.call(this,state_60819);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$controls_ui$gather_col_state_history_BANG__$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$controls_ui$gather_col_state_history_BANG__$_state_machine__35848__auto____0;
org$numenta$sanity$controls_ui$gather_col_state_history_BANG__$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$controls_ui$gather_col_state_history_BANG__$_state_machine__35848__auto____1;
return org$numenta$sanity$controls_ui$gather_col_state_history_BANG__$_state_machine__35848__auto__;
})()
;})(switch__35847__auto__,c__35961__auto__,response_c))
})();
var state__35963__auto__ = (function (){var statearr_60829 = (f__35962__auto__.cljs$core$IFn$_invoke$arity$0 ? f__35962__auto__.cljs$core$IFn$_invoke$arity$0() : f__35962__auto__.call(null));
(statearr_60829[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__35961__auto__);

return statearr_60829;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__35963__auto__);
});})(c__35961__auto__,response_c))
);

return c__35961__auto__;
});
org.numenta.sanity.controls_ui.time_plots_tab_builder = (function org$numenta$sanity$controls_ui$time_plots_tab_builder(steps,into_journal){
var col_state_history = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
cljs.core.add_watch(steps,cljs.core.cst$kw$org$numenta$sanity$controls_DASH_ui_SLASH_ts_DASH_plot_DASH_data,((function (col_state_history){
return (function (_,___$1,___$2,xs){
return org.numenta.sanity.controls_ui.gather_col_state_history_BANG_(col_state_history,cljs.core.first(xs),into_journal);
});})(col_state_history))
);

return ((function (col_state_history){
return (function org$numenta$sanity$controls_ui$time_plots_tab_builder_$_time_plots_tab(series_colors){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_muted,"Time series of cortical column activity."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,(function (){var iter__5454__auto__ = ((function (col_state_history){
return (function org$numenta$sanity$controls_ui$time_plots_tab_builder_$_time_plots_tab_$_iter__60874(s__60875){
return (new cljs.core.LazySeq(null,((function (col_state_history){
return (function (){
var s__60875__$1 = s__60875;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__60875__$1);
if(temp__4653__auto__){
var s__60875__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__60875__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__60875__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__60877 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__60876 = (0);
while(true){
if((i__60876 < size__5453__auto__)){
var vec__60884 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__60876);
var path = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60884,(0),null);
var csf_log = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60884,(1),null);
var vec__60885 = path;
var region_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60885,(0),null);
var layer_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60885,(1),null);
cljs.core.chunk_append(b__60877,cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$fieldset,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$legend,[cljs.core.str(cljs.core.name(region_key)),cljs.core.str(" "),cljs.core.str(cljs.core.name(layer_id))].join('')], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.plots.ts_freqs_plot_cmp,csf_log,series_colors], null)], null),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [region_key,layer_id], null)], null)));

var G__60888 = (i__60876 + (1));
i__60876 = G__60888;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__60877),org$numenta$sanity$controls_ui$time_plots_tab_builder_$_time_plots_tab_$_iter__60874(cljs.core.chunk_rest(s__60875__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__60877),null);
}
} else {
var vec__60886 = cljs.core.first(s__60875__$2);
var path = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60886,(0),null);
var csf_log = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60886,(1),null);
var vec__60887 = path;
var region_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60887,(0),null);
var layer_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60887,(1),null);
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$fieldset,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$legend,[cljs.core.str(cljs.core.name(region_key)),cljs.core.str(" "),cljs.core.str(cljs.core.name(layer_id))].join('')], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.plots.ts_freqs_plot_cmp,csf_log,series_colors], null)], null),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [region_key,layer_id], null)], null)),org$numenta$sanity$controls_ui$time_plots_tab_builder_$_time_plots_tab_$_iter__60874(cljs.core.rest(s__60875__$2)));
}
} else {
return null;
}
break;
}
});})(col_state_history))
,null,null));
});})(col_state_history))
;
return iter__5454__auto__((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(col_state_history) : cljs.core.deref.call(null,col_state_history)));
})()], null)], null);
});
;})(col_state_history))
});
org.numenta.sanity.controls_ui.sources_tab = (function org$numenta$sanity$controls_ui$sources_tab(step_template,selection,series_colors,into_journal){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_muted,"Plots of cell excitation broken down by source."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(step_template) : cljs.core.deref.call(null,step_template)))?(function (){var iter__5454__auto__ = (function org$numenta$sanity$controls_ui$sources_tab_$_iter__60902(s__60903){
return (new cljs.core.LazySeq(null,(function (){
var s__60903__$1 = s__60903;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__60903__$1);
if(temp__4653__auto__){
var xs__5201__auto__ = temp__4653__auto__;
var vec__60912 = cljs.core.first(xs__5201__auto__);
var region_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60912,(0),null);
var rgn = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60912,(1),null);
var iterys__5450__auto__ = ((function (s__60903__$1,vec__60912,region_key,rgn,xs__5201__auto__,temp__4653__auto__){
return (function org$numenta$sanity$controls_ui$sources_tab_$_iter__60902_$_iter__60904(s__60905){
return (new cljs.core.LazySeq(null,((function (s__60903__$1,vec__60912,region_key,rgn,xs__5201__auto__,temp__4653__auto__){
return (function (){
var s__60905__$1 = s__60905;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__60905__$1);
if(temp__4653__auto____$1){
var s__60905__$2 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__60905__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__60905__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__60907 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__60906 = (0);
while(true){
if((i__60906 < size__5453__auto__)){
var layer_id = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__60906);
cljs.core.chunk_append(b__60907,cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$fieldset,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$legend,[cljs.core.str(cljs.core.name(region_key)),cljs.core.str(" "),cljs.core.str(cljs.core.name(layer_id))].join('')], null),new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.plots.cell_excitation_plot_cmp,step_template,selection,series_colors,region_key,layer_id,into_journal], null)], null),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [region_key,layer_id], null)], null)));

var G__60915 = (i__60906 + (1));
i__60906 = G__60915;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__60907),org$numenta$sanity$controls_ui$sources_tab_$_iter__60902_$_iter__60904(cljs.core.chunk_rest(s__60905__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__60907),null);
}
} else {
var layer_id = cljs.core.first(s__60905__$2);
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$fieldset,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$legend,[cljs.core.str(cljs.core.name(region_key)),cljs.core.str(" "),cljs.core.str(cljs.core.name(layer_id))].join('')], null),new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.plots.cell_excitation_plot_cmp,step_template,selection,series_colors,region_key,layer_id,into_journal], null)], null),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [region_key,layer_id], null)], null)),org$numenta$sanity$controls_ui$sources_tab_$_iter__60902_$_iter__60904(cljs.core.rest(s__60905__$2)));
}
} else {
return null;
}
break;
}
});})(s__60903__$1,vec__60912,region_key,rgn,xs__5201__auto__,temp__4653__auto__))
,null,null));
});})(s__60903__$1,vec__60912,region_key,rgn,xs__5201__auto__,temp__4653__auto__))
;
var fs__5451__auto__ = cljs.core.seq(iterys__5450__auto__(cljs.core.keys(rgn)));
if(fs__5451__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5451__auto__,org$numenta$sanity$controls_ui$sources_tab_$_iter__60902(cljs.core.rest(s__60903__$1)));
} else {
var G__60916 = cljs.core.rest(s__60903__$1);
s__60903__$1 = G__60916;
continue;
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5454__auto__(cljs.core.cst$kw$regions.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(step_template) : cljs.core.deref.call(null,step_template))));
})():null)], null)], null);
});
org.numenta.sanity.controls_ui.default_cell_sdrs_plot_options = new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$group_DASH_contexts_QMARK_,false,cljs.core.cst$kw$spreading_DASH_activation_DASH_steps,(0),cljs.core.cst$kw$ordering,cljs.core.cst$kw$first_DASH_appearance,cljs.core.cst$kw$hide_DASH_states_DASH_older,(100),cljs.core.cst$kw$hide_DASH_states_DASH_rarer,(1),cljs.core.cst$kw$hide_DASH_conns_DASH_smaller,(5)], null);
org.numenta.sanity.controls_ui.cell_sdrs_plot_dt_limit = (300);
org.numenta.sanity.controls_ui.cell_sdrs_plot_options_template = new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$row,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_6,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label$small,"Group contexts?"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_6,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$field,cljs.core.cst$kw$checkbox,cljs.core.cst$kw$id,cljs.core.cst$kw$group_DASH_contexts_QMARK_], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small," (column-level SDRs)"], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$row,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_6,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label$small,"Order by"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_6,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$select$form_DASH_control$input_DASH_sm,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$field,cljs.core.cst$kw$list,cljs.core.cst$kw$id,cljs.core.cst$kw$ordering], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$option,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,cljs.core.cst$kw$first_DASH_appearance], null),"first appearance"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$option,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,cljs.core.cst$kw$last_DASH_appearance], null),"last appearance"], null)], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$row,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_6,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label$small,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$field,cljs.core.cst$kw$label,cljs.core.cst$kw$id,cljs.core.cst$kw$hide_DASH_states_DASH_older,cljs.core.cst$kw$preamble,goog.string.unescapeEntities("Seen &le; "),cljs.core.cst$kw$postamble," steps ago"], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_6,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input,new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$field,cljs.core.cst$kw$range,cljs.core.cst$kw$min,(5),cljs.core.cst$kw$max,org.numenta.sanity.controls_ui.cell_sdrs_plot_dt_limit,cljs.core.cst$kw$step,(5),cljs.core.cst$kw$id,cljs.core.cst$kw$hide_DASH_states_DASH_older], null)], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$row,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_6,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label$small,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$field,cljs.core.cst$kw$label,cljs.core.cst$kw$id,cljs.core.cst$kw$hide_DASH_states_DASH_rarer,cljs.core.cst$kw$preamble,goog.string.unescapeEntities("Seen &ge; "),cljs.core.cst$kw$postamble," times"], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_6,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$field,cljs.core.cst$kw$range,cljs.core.cst$kw$min,(1),cljs.core.cst$kw$max,(16),cljs.core.cst$kw$id,cljs.core.cst$kw$hide_DASH_states_DASH_rarer], null)], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$row,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_6,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label$small,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$field,cljs.core.cst$kw$label,cljs.core.cst$kw$id,cljs.core.cst$kw$hide_DASH_conns_DASH_smaller,cljs.core.cst$kw$preamble,goog.string.unescapeEntities("&ge; "),cljs.core.cst$kw$postamble,"-cell connections"], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_6,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$field,cljs.core.cst$kw$range,cljs.core.cst$kw$min,(1),cljs.core.cst$kw$max,(16),cljs.core.cst$kw$id,cljs.core.cst$kw$hide_DASH_conns_DASH_smaller], null)], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$row,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_6,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label$small,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$field,cljs.core.cst$kw$label,cljs.core.cst$kw$id,cljs.core.cst$kw$spreading_DASH_activation_DASH_steps,cljs.core.cst$kw$preamble,"spreading ",cljs.core.cst$kw$postamble," steps"], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_6,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$field,cljs.core.cst$kw$range,cljs.core.cst$kw$min,(0),cljs.core.cst$kw$max,(12),cljs.core.cst$kw$id,cljs.core.cst$kw$spreading_DASH_activation_DASH_steps], null)], null)], null)], null)], null);
org.numenta.sanity.controls_ui.cell_sdrs_tab_builder = (function org$numenta$sanity$controls_ui$cell_sdrs_tab_builder(steps,step_template,selection,into_journal){
var plot_opts = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.controls_ui.default_cell_sdrs_plot_options);
var component = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
var enable_BANG_ = ((function (plot_opts,component){
return (function (){
var G__60919 = component;
var G__60920 = org.numenta.sanity.plots.cell_sdrs_plot_builder(steps,step_template,selection,into_journal,plot_opts);
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__60919,G__60920) : cljs.core.reset_BANG_.call(null,G__60919,G__60920));
});})(plot_opts,component))
;
var disable_BANG_ = ((function (plot_opts,component,enable_BANG_){
return (function (){
var teardown_BANG__60921 = cljs.core.cst$kw$teardown.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(component) : cljs.core.deref.call(null,component)));
(teardown_BANG__60921.cljs$core$IFn$_invoke$arity$0 ? teardown_BANG__60921.cljs$core$IFn$_invoke$arity$0() : teardown_BANG__60921.call(null));

return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(component,null) : cljs.core.reset_BANG_.call(null,component,null));
});})(plot_opts,component,enable_BANG_))
;
return ((function (plot_opts,component,enable_BANG_,disable_BANG_){
return (function org$numenta$sanity$controls_ui$cell_sdrs_tab_builder_$_cell_sdrs_tab(){
return new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,((cljs.core.not((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(component) : cljs.core.deref.call(null,component))))?new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_muted,"Cell ",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$abbr,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$title,"Sparse Distributed Representations"], null),"SDRs"], null)," on a state transition diagram. Labels are corresponding inputs."], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_primary$btn_DASH_block,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$on_DASH_click,((function (plot_opts,component,enable_BANG_,disable_BANG_){
return (function (e){
enable_BANG_();

return e.preventDefault();
});})(plot_opts,component,enable_BANG_,disable_BANG_))
], null),"Start from selected timestep"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$small$text_DASH_warning,"So to start from the beginning, select timestep 1 first."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$small,"Not enabled by default because it can be slow."], null)], null):new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_forms.core.bind_fields,org.numenta.sanity.controls_ui.cell_sdrs_plot_options_template,plot_opts], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$content.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(component) : cljs.core.deref.call(null,component)))], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_warning$btn_DASH_block,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$on_DASH_click,((function (plot_opts,component,enable_BANG_,disable_BANG_){
return (function (e){
disable_BANG_();

return e.preventDefault();
});})(plot_opts,component,enable_BANG_,disable_BANG_))
], null),"Disable and reset"], null)], null)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"This shows the dynamics of a layer of cells as a state\n        transition diagram. The \"states\" are in fact cell SDRs,\n        i.e. sets of cells active together. They are fuzzy: cells may\n        participate in multiple states. And they are evolving: the\n        membership of a state may change over time."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"To be precise, a state is defined as a set of cells\n         weighted by their specificity to that state. So if a cell\n         participates in states A and B an equal number of times, it\n         will count only half as much to A as a cell fully specific to\n         A."], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"If the active winner cells match a known state\n        sufficiently well (meeting ",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$code,"seg-learn-threshold"], null),") then the state is extended to include all current\n        cells. Otherwise, a new state is created."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"Input labels (key :label) are recorded on matching\n        states, but this is only for display, it is not used to define\n        states."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"The display shows one layer at one point in\n         time. Select other layers to switch the display to them. Step\n         back and forward in time as you wish."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h4,"Reading the diagram"], null),new cljs.core.PersistentVector(null, 10, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$ul,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,"States are drawn in order of appearance."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,"If any of a state's cells are currently active that\n         fraction will be shaded red (whether active due to bursting\n         or not)."], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,"Similarly, any predictive cells (predicting activation for the ",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$strong,"next"], null)," time step) will be shaded blue."], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,"If any of a state's cells are the\n         current ",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$i,"winner cells"], null)," that fraction will be\n         outlined in black."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,"When a matching state will be extended to include new\n         cells, those are shown in green."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,"Transitions are drawn as blue curves. Thickness\n         corresponds to the number of connected synapses, weighted by\n         specificity of both the source and target cells."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,"The height of a state corresponds to the (weighted)\n         number of cells it represents."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,"The width of a state corresponds to the number of times\n         it has matched."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,"Labels are drawn with horizonal spacing by frequency."], null)], null)], null);
});
;})(plot_opts,component,enable_BANG_,disable_BANG_))
});
org.numenta.sanity.controls_ui.fetch_details_text_BANG_ = (function org$numenta$sanity$controls_ui$fetch_details_text_BANG_(into_journal,text_response,sel){
var map__60938 = cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.selection.layer,sel));
var map__60938__$1 = ((((!((map__60938 == null)))?((((map__60938.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60938.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60938):map__60938);
var sel1 = map__60938__$1;
var model_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60938__$1,cljs.core.cst$kw$model_DASH_id);
var bit = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60938__$1,cljs.core.cst$kw$bit);
var vec__60939 = org.numenta.sanity.selection.layer(sel1);
var rgn_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60939,(0),null);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60939,(1),null);
if(cljs.core.truth_(lyr_id)){
var response_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(into_journal,new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, ["get-details-text",model_id,rgn_id,lyr_id,bit,org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$2(response_c,true)], null));

var c__35961__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__35961__auto__,response_c,map__60938,map__60938__$1,sel1,model_id,bit,vec__60939,rgn_id,lyr_id){
return (function (){
var f__35962__auto__ = (function (){var switch__35847__auto__ = ((function (c__35961__auto__,response_c,map__60938,map__60938__$1,sel1,model_id,bit,vec__60939,rgn_id,lyr_id){
return (function (state_60945){
var state_val_60946 = (state_60945[(1)]);
if((state_val_60946 === (1))){
var state_60945__$1 = state_60945;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_60945__$1,(2),response_c);
} else {
if((state_val_60946 === (2))){
var inst_60942 = (state_60945[(2)]);
var inst_60943 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(text_response,inst_60942) : cljs.core.reset_BANG_.call(null,text_response,inst_60942));
var state_60945__$1 = state_60945;
return cljs.core.async.impl.ioc_helpers.return_chan(state_60945__$1,inst_60943);
} else {
return null;
}
}
});})(c__35961__auto__,response_c,map__60938,map__60938__$1,sel1,model_id,bit,vec__60939,rgn_id,lyr_id))
;
return ((function (switch__35847__auto__,c__35961__auto__,response_c,map__60938,map__60938__$1,sel1,model_id,bit,vec__60939,rgn_id,lyr_id){
return (function() {
var org$numenta$sanity$controls_ui$fetch_details_text_BANG__$_state_machine__35848__auto__ = null;
var org$numenta$sanity$controls_ui$fetch_details_text_BANG__$_state_machine__35848__auto____0 = (function (){
var statearr_60950 = [null,null,null,null,null,null,null];
(statearr_60950[(0)] = org$numenta$sanity$controls_ui$fetch_details_text_BANG__$_state_machine__35848__auto__);

(statearr_60950[(1)] = (1));

return statearr_60950;
});
var org$numenta$sanity$controls_ui$fetch_details_text_BANG__$_state_machine__35848__auto____1 = (function (state_60945){
while(true){
var ret_value__35849__auto__ = (function (){try{while(true){
var result__35850__auto__ = switch__35847__auto__(state_60945);
if(cljs.core.keyword_identical_QMARK_(result__35850__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__35850__auto__;
}
break;
}
}catch (e60951){if((e60951 instanceof Object)){
var ex__35851__auto__ = e60951;
var statearr_60952_60954 = state_60945;
(statearr_60952_60954[(5)] = ex__35851__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_60945);

return cljs.core.cst$kw$recur;
} else {
throw e60951;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35849__auto__,cljs.core.cst$kw$recur)){
var G__60955 = state_60945;
state_60945 = G__60955;
continue;
} else {
return ret_value__35849__auto__;
}
break;
}
});
org$numenta$sanity$controls_ui$fetch_details_text_BANG__$_state_machine__35848__auto__ = function(state_60945){
switch(arguments.length){
case 0:
return org$numenta$sanity$controls_ui$fetch_details_text_BANG__$_state_machine__35848__auto____0.call(this);
case 1:
return org$numenta$sanity$controls_ui$fetch_details_text_BANG__$_state_machine__35848__auto____1.call(this,state_60945);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$controls_ui$fetch_details_text_BANG__$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$controls_ui$fetch_details_text_BANG__$_state_machine__35848__auto____0;
org$numenta$sanity$controls_ui$fetch_details_text_BANG__$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$controls_ui$fetch_details_text_BANG__$_state_machine__35848__auto____1;
return org$numenta$sanity$controls_ui$fetch_details_text_BANG__$_state_machine__35848__auto__;
})()
;})(switch__35847__auto__,c__35961__auto__,response_c,map__60938,map__60938__$1,sel1,model_id,bit,vec__60939,rgn_id,lyr_id))
})();
var state__35963__auto__ = (function (){var statearr_60953 = (f__35962__auto__.cljs$core$IFn$_invoke$arity$0 ? f__35962__auto__.cljs$core$IFn$_invoke$arity$0() : f__35962__auto__.call(null));
(statearr_60953[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__35961__auto__);

return statearr_60953;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__35963__auto__);
});})(c__35961__auto__,response_c,map__60938,map__60938__$1,sel1,model_id,bit,vec__60939,rgn_id,lyr_id))
);

return c__35961__auto__;
} else {
return null;
}
});
org.numenta.sanity.controls_ui.details_tab = (function org$numenta$sanity$controls_ui$details_tab(selection,into_journal){
var text_response = reagent.core.atom.cljs$core$IFn$_invoke$arity$1("");
return reagent.core.create_class(new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$component_DASH_will_DASH_mount,((function (text_response){
return (function (_){
cljs.core.add_watch(selection,cljs.core.cst$kw$fetch_DASH_details_DASH_text,((function (text_response){
return (function (___$1,___$2,___$3,sel){
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(text_response,"") : cljs.core.reset_BANG_.call(null,text_response,""));

return org.numenta.sanity.controls_ui.fetch_details_text_BANG_(into_journal,text_response,sel);
});})(text_response))
);

return org.numenta.sanity.controls_ui.fetch_details_text_BANG_(into_journal,text_response,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selection) : cljs.core.deref.call(null,selection)));
});})(text_response))
,cljs.core.cst$kw$component_DASH_will_DASH_unmount,((function (text_response){
return (function (_){
return cljs.core.remove_watch(selection,cljs.core.cst$kw$fetch_DASH_details_DASH_text);
});})(text_response))
,cljs.core.cst$kw$reagent_DASH_render,((function (text_response){
return (function (_,___$1){
return new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_muted,"The details of model state on the selected time step, selected column."], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$pre$pre_DASH_scrollable,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$height,"90vh",cljs.core.cst$kw$resize,"both"], null)], null),(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(text_response) : cljs.core.deref.call(null,text_response))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_muted,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,"(scrollable)"], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$hr], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_muted,"If you're brave:"], null),(function (){var map__60972 = cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.selection.layer,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selection) : cljs.core.deref.call(null,selection))));
var map__60972__$1 = ((((!((map__60972 == null)))?((((map__60972.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60972.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60972):map__60972);
var model_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60972__$1,cljs.core.cst$kw$model_DASH_id);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_warning$btn_DASH_block,(function (){var G__60974 = new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$on_DASH_click,((function (map__60972,map__60972__$1,model_id,text_response){
return (function (e){
var response_c_60988 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(into_journal,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$get_DASH_model,model_id,org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$2(response_c_60988,true),true], null));

var c__35961__auto___60989 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__35961__auto___60989,response_c_60988,map__60972,map__60972__$1,model_id,text_response){
return (function (){
var f__35962__auto__ = (function (){var switch__35847__auto__ = ((function (c__35961__auto___60989,response_c_60988,map__60972,map__60972__$1,model_id,text_response){
return (function (state_60979){
var state_val_60980 = (state_60979[(1)]);
if((state_val_60980 === (1))){
var state_60979__$1 = state_60979;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_60979__$1,(2),response_c_60988);
} else {
if((state_val_60980 === (2))){
var inst_60976 = (state_60979[(2)]);
var inst_60977 = cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([inst_60976], 0));
var state_60979__$1 = state_60979;
return cljs.core.async.impl.ioc_helpers.return_chan(state_60979__$1,inst_60977);
} else {
return null;
}
}
});})(c__35961__auto___60989,response_c_60988,map__60972,map__60972__$1,model_id,text_response))
;
return ((function (switch__35847__auto__,c__35961__auto___60989,response_c_60988,map__60972,map__60972__$1,model_id,text_response){
return (function() {
var org$numenta$sanity$controls_ui$details_tab_$_state_machine__35848__auto__ = null;
var org$numenta$sanity$controls_ui$details_tab_$_state_machine__35848__auto____0 = (function (){
var statearr_60984 = [null,null,null,null,null,null,null];
(statearr_60984[(0)] = org$numenta$sanity$controls_ui$details_tab_$_state_machine__35848__auto__);

(statearr_60984[(1)] = (1));

return statearr_60984;
});
var org$numenta$sanity$controls_ui$details_tab_$_state_machine__35848__auto____1 = (function (state_60979){
while(true){
var ret_value__35849__auto__ = (function (){try{while(true){
var result__35850__auto__ = switch__35847__auto__(state_60979);
if(cljs.core.keyword_identical_QMARK_(result__35850__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__35850__auto__;
}
break;
}
}catch (e60985){if((e60985 instanceof Object)){
var ex__35851__auto__ = e60985;
var statearr_60986_60990 = state_60979;
(statearr_60986_60990[(5)] = ex__35851__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_60979);

return cljs.core.cst$kw$recur;
} else {
throw e60985;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35849__auto__,cljs.core.cst$kw$recur)){
var G__60991 = state_60979;
state_60979 = G__60991;
continue;
} else {
return ret_value__35849__auto__;
}
break;
}
});
org$numenta$sanity$controls_ui$details_tab_$_state_machine__35848__auto__ = function(state_60979){
switch(arguments.length){
case 0:
return org$numenta$sanity$controls_ui$details_tab_$_state_machine__35848__auto____0.call(this);
case 1:
return org$numenta$sanity$controls_ui$details_tab_$_state_machine__35848__auto____1.call(this,state_60979);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$controls_ui$details_tab_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$controls_ui$details_tab_$_state_machine__35848__auto____0;
org$numenta$sanity$controls_ui$details_tab_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$controls_ui$details_tab_$_state_machine__35848__auto____1;
return org$numenta$sanity$controls_ui$details_tab_$_state_machine__35848__auto__;
})()
;})(switch__35847__auto__,c__35961__auto___60989,response_c_60988,map__60972,map__60972__$1,model_id,text_response))
})();
var state__35963__auto__ = (function (){var statearr_60987 = (f__35962__auto__.cljs$core$IFn$_invoke$arity$0 ? f__35962__auto__.cljs$core$IFn$_invoke$arity$0() : f__35962__auto__.call(null));
(statearr_60987[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__35961__auto___60989);

return statearr_60987;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__35963__auto__);
});})(c__35961__auto___60989,response_c_60988,map__60972,map__60972__$1,model_id,text_response))
);


return e.preventDefault();
});})(map__60972,map__60972__$1,model_id,text_response))
], null);
if(cljs.core.not(model_id)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__60974,cljs.core.cst$kw$disabled,"disabled");
} else {
return G__60974;
}
})(),"Dump entire model to console"], null);
})()], null);
});})(text_response))
], null));
});
org.numenta.sanity.controls_ui.t_chbox = (function org$numenta$sanity$controls_ui$t_chbox(id,label){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$checkbox,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$field,cljs.core.cst$kw$checkbox,cljs.core.cst$kw$id,id], null)], null)," ",label], null)], null);
});
org.numenta.sanity.controls_ui.keep_steps_template = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$row,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_xs_DASH_12,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel$panel_DASH_default,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel_DASH_body,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$font_DASH_weight,"normal"], null)], null),"Keep ",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$field,cljs.core.cst$kw$numeric,cljs.core.cst$kw$id,cljs.core.cst$kw$keep_DASH_steps,cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$text_DASH_align,"center"], null),cljs.core.cst$kw$size,(4)], null)], null)," steps of history"], null)], null)], null)], null)], null);
org.numenta.sanity.controls_ui.capture_tab = (function org$numenta$sanity$controls_ui$capture_tab(capture_options){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_muted,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$margin_DASH_top,(15),cljs.core.cst$kw$margin_DASH_bottom,(15)], null)], null),"Choose data the server should capture."], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_forms.core.bind_fields,org.numenta.sanity.controls_ui.keep_steps_template,capture_options], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$row,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_lg_DASH_6$col_DASH_sm_DASH_12,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel$panel_DASH_default,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel_DASH_heading,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h4$panel_DASH_title,"Feed-forward synapses"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel_DASH_body,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_forms.core.bind_fields,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,org.numenta.sanity.controls_ui.t_chbox(cljs.core.cst$kw$ff_DASH_synapses$capture_QMARK_,"Save"),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$field,cljs.core.cst$kw$container,cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$margin_DASH_top,(-5)], null),cljs.core.cst$kw$visible_QMARK_,(function (p1__60992_SHARP_){
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(p1__60992_SHARP_,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$ff_DASH_synapses,cljs.core.cst$kw$capture_QMARK_], null));
})], null),org.numenta.sanity.controls_ui.t_chbox(cljs.core.cst$kw$ff_DASH_synapses$only_DASH_active_QMARK_,"Only if active"),org.numenta.sanity.controls_ui.t_chbox(cljs.core.cst$kw$ff_DASH_synapses$only_DASH_connected_QMARK_,"Only if connected")], null)], null),capture_options], null)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_lg_DASH_6$col_DASH_sm_DASH_12,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel$panel_DASH_default,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel_DASH_heading,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h4$panel_DASH_title,"Distal synapses"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel_DASH_body,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_forms.core.bind_fields,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,org.numenta.sanity.controls_ui.t_chbox(cljs.core.cst$kw$distal_DASH_synapses$capture_QMARK_,"Save"),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$field,cljs.core.cst$kw$container,cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$margin_DASH_top,(-5)], null),cljs.core.cst$kw$visible_QMARK_,(function (p1__60993_SHARP_){
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(p1__60993_SHARP_,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$distal_DASH_synapses,cljs.core.cst$kw$capture_QMARK_], null));
})], null),org.numenta.sanity.controls_ui.t_chbox(cljs.core.cst$kw$distal_DASH_synapses$only_DASH_active_QMARK_,"Only if active"),org.numenta.sanity.controls_ui.t_chbox(cljs.core.cst$kw$distal_DASH_synapses$only_DASH_connected_QMARK_,"Only if connected"),org.numenta.sanity.controls_ui.t_chbox(cljs.core.cst$kw$distal_DASH_synapses$only_DASH_noteworthy_DASH_columns_QMARK_,"Only active / predicted columns")], null)], null),capture_options], null)], null)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$row,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_lg_DASH_6$col_DASH_sm_DASH_12,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel$panel_DASH_default,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel_DASH_heading,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h4$panel_DASH_title,"Apical synapses"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel_DASH_body,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_forms.core.bind_fields,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,org.numenta.sanity.controls_ui.t_chbox(cljs.core.cst$kw$apical_DASH_synapses$capture_QMARK_,"Save"),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$field,cljs.core.cst$kw$container,cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$margin_DASH_top,(-5)], null),cljs.core.cst$kw$visible_QMARK_,(function (p1__60994_SHARP_){
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(p1__60994_SHARP_,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$apical_DASH_synapses,cljs.core.cst$kw$capture_QMARK_], null));
})], null),org.numenta.sanity.controls_ui.t_chbox(cljs.core.cst$kw$apical_DASH_synapses$only_DASH_active_QMARK_,"Only if active"),org.numenta.sanity.controls_ui.t_chbox(cljs.core.cst$kw$apical_DASH_synapses$only_DASH_connected_QMARK_,"Only if connected"),org.numenta.sanity.controls_ui.t_chbox(cljs.core.cst$kw$apical_DASH_synapses$only_DASH_noteworthy_DASH_columns_QMARK_,"Only active / predicted columns")], null)], null),capture_options], null)], null)], null)], null)], null)], null);
});
org.numenta.sanity.controls_ui.viz_options_template = (function (){var chbox = (function (id,label){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$checkbox,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$field,cljs.core.cst$kw$checkbox,cljs.core.cst$kw$id,id], null)], null),[cljs.core.str(" "),cljs.core.str(label)].join('')], null)], null);
});
var group = ((function (chbox){
return (function (title,content){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_lg_DASH_6$col_DASH_sm_DASH_12,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel$panel_DASH_default,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel_DASH_heading,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h4$panel_DASH_title,title], null)], null),content], null)], null);
});})(chbox))
;
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel$panel_DASH_default,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel_DASH_body,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$radio,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$field,cljs.core.cst$kw$radio,cljs.core.cst$kw$name,cljs.core.cst$kw$drawing$display_DASH_mode,cljs.core.cst$kw$value,cljs.core.cst$kw$one_DASH_d], null)], null)," Draw ",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$field,cljs.core.cst$kw$numeric,cljs.core.cst$kw$id,cljs.core.cst$kw$drawing$draw_DASH_steps,cljs.core.cst$kw$size,(4)], null)], null)," steps in 1D"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$radio,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$field,cljs.core.cst$kw$radio,cljs.core.cst$kw$name,cljs.core.cst$kw$drawing$display_DASH_mode,cljs.core.cst$kw$value,cljs.core.cst$kw$two_DASH_d], null)], null)," Draw one step in 2D"], null)], null)], null)], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$row,group("Inbits",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel_DASH_body,chbox(cljs.core.cst$kw$inbits$active,"Active bits"),chbox(cljs.core.cst$kw$inbits$predicted,"Predicted bits")], null)),group("Columns",new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel_DASH_body,chbox(cljs.core.cst$kw$columns$overlaps,"Overlaps"),chbox(cljs.core.cst$kw$columns$active_DASH_freq,"Active-duty"),chbox(cljs.core.cst$kw$columns$boosts,"Boosts"),chbox(cljs.core.cst$kw$columns$n_DASH_segments,"N.segments"),chbox(cljs.core.cst$kw$columns$active,"Active"),chbox(cljs.core.cst$kw$columns$predictive,"Predictive"),chbox(cljs.core.cst$kw$columns$temporal_DASH_pooling,"Temporal Pooling")], null)),group("Feed-forward synapses",new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel_DASH_body,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,"To ",new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$select,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$field,cljs.core.cst$kw$list,cljs.core.cst$kw$id,cljs.core.cst$kw$ff_DASH_synapses$to], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$option,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,cljs.core.cst$kw$all], null),"all active columns"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$option,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,cljs.core.cst$kw$selected], null),"selected column"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$option,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,cljs.core.cst$kw$none], null),"none"], null)], null)], null),chbox(cljs.core.cst$kw$ff_DASH_synapses$trace_DASH_back_QMARK_,"Trace back"),chbox(cljs.core.cst$kw$ff_DASH_synapses$disconnected,"Disconnected"),chbox(cljs.core.cst$kw$ff_DASH_synapses$inactive,"Inactive"),chbox(cljs.core.cst$kw$ff_DASH_synapses$predicted,"Predictive"),chbox(cljs.core.cst$kw$ff_DASH_synapses$permanences,"Permanences")], null)),group("Distal synapses",new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel_DASH_body,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,"(selected column) ",new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$select,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$field,cljs.core.cst$kw$list,cljs.core.cst$kw$id,cljs.core.cst$kw$distal_DASH_synapses$to], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$option,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,cljs.core.cst$kw$all], null),"all cell segments"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$option,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,cljs.core.cst$kw$selected], null),"selected segment"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$option,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,cljs.core.cst$kw$none], null),"none"], null)], null)], null),chbox(cljs.core.cst$kw$distal_DASH_synapses$disconnected,"Disconnected"),chbox(cljs.core.cst$kw$distal_DASH_synapses$inactive,"Inactive"),chbox(cljs.core.cst$kw$distal_DASH_synapses$permanences,"Permanences")], null))], null)], null);
})();
org.numenta.sanity.controls_ui.drawing_tab = (function org$numenta$sanity$controls_ui$drawing_tab(features,viz_options,capture_options){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_muted,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$margin_DASH_top,(15),cljs.core.cst$kw$margin_DASH_bottom,(15)], null)], null),"Select drawing options, with immediate effect."], null),(cljs.core.truth_((features.cljs$core$IFn$_invoke$arity$1 ? features.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$capture) : features.call(null,cljs.core.cst$kw$capture)))?null:new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_forms.core.bind_fields,org.numenta.sanity.controls_ui.keep_steps_template,capture_options], null)),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_forms.core.bind_fields,org.numenta.sanity.controls_ui.viz_options_template,viz_options], null)], null);
});
org.numenta.sanity.controls_ui.default_debug_data = new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$repl_DASH_url,"http://localhost:9000/repl",cljs.core.cst$kw$started_QMARK_,false,cljs.core.cst$kw$conn,null], null);
org.numenta.sanity.controls_ui.debug_tab = (function org$numenta$sanity$controls_ui$debug_tab(debug_data){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_muted,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$margin_DASH_top,(15),cljs.core.cst$kw$margin_DASH_bottom,(15)], null)], null),"Inspect the inspector."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_12,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel$panel_DASH_default,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel_DASH_heading,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h4$panel_DASH_title,"REPL"], null)], null),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel_DASH_body,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"ClojureScript REPL URL:"], null),(cljs.core.truth_(cljs.core.cst$kw$started_QMARK_.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(debug_data) : cljs.core.deref.call(null,debug_data))))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,cljs.core.cst$kw$repl_DASH_url.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(debug_data) : cljs.core.deref.call(null,debug_data)))], null):new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_forms.core.bind_fields,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$width,"100%"], null),cljs.core.cst$kw$field,cljs.core.cst$kw$text,cljs.core.cst$kw$id,cljs.core.cst$kw$repl_DASH_url], null)], null),debug_data], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_primary$btn_DASH_block,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$on_DASH_click,(function (_){
var conn = clojure.browser.repl.connect(cljs.core.cst$kw$repl_DASH_url.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(debug_data) : cljs.core.deref.call(null,debug_data))));
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(debug_data,cljs.core.assoc,cljs.core.cst$kw$started_QMARK_,true,cljs.core.array_seq([cljs.core.cst$kw$conn,conn], 0));
})], null),"Connect to Browser REPL"], null)], null)], null)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"Go start a ClojureScript REPL, then connect to it from here."], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$a,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$href,"https://github.com/nupic-community/sanity"], null),"Sanity"], null)," has a browser_repl.clj that you can run."], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"Pro-tip: in Emacs, do 'M-x shell', run ","'lein run -m clojure.main browser_repl.clj', ","and maybe do 'M-x paredit-mode'."], null)], null)], null)], null)], null);
});
org.numenta.sanity.controls_ui.send_command = (function org$numenta$sanity$controls_ui$send_command(var_args){
var args__5747__auto__ = [];
var len__5740__auto___60998 = arguments.length;
var i__5741__auto___60999 = (0);
while(true){
if((i__5741__auto___60999 < len__5740__auto___60998)){
args__5747__auto__.push((arguments[i__5741__auto___60999]));

var G__61000 = (i__5741__auto___60999 + (1));
i__5741__auto___60999 = G__61000;
continue;
} else {
}
break;
}

var argseq__5748__auto__ = ((((2) < args__5747__auto__.length))?(new cljs.core.IndexedSeq(args__5747__auto__.slice((2)),(0))):null);
return org.numenta.sanity.controls_ui.send_command.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__5748__auto__);
});

org.numenta.sanity.controls_ui.send_command.cljs$core$IFn$_invoke$arity$variadic = (function (ch,command,xs){
return (function (e){
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(ch,cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [command], null),xs));

return e.preventDefault();
});
});

org.numenta.sanity.controls_ui.send_command.cljs$lang$maxFixedArity = (2);

org.numenta.sanity.controls_ui.send_command.cljs$lang$applyTo = (function (seq60995){
var G__60996 = cljs.core.first(seq60995);
var seq60995__$1 = cljs.core.next(seq60995);
var G__60997 = cljs.core.first(seq60995__$1);
var seq60995__$2 = cljs.core.next(seq60995__$1);
return org.numenta.sanity.controls_ui.send_command.cljs$core$IFn$_invoke$arity$variadic(G__60996,G__60997,seq60995__$2);
});
org.numenta.sanity.controls_ui.gather_start_data_BANG_ = (function org$numenta$sanity$controls_ui$gather_start_data_BANG_(run_start,steps){
var G__61003 = run_start;
var G__61004 = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$time,org.numenta.sanity.controls_ui.now(),cljs.core.cst$kw$timestep,cljs.core.cst$kw$timestep.cljs$core$IFn$_invoke$arity$1(cljs.core.first(steps))], null);
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__61003,G__61004) : cljs.core.reset_BANG_.call(null,G__61003,G__61004));
});
org.numenta.sanity.controls_ui.navbar = (function org$numenta$sanity$controls_ui$navbar(_,___$1,steps,show_help,viz_options,viz_expanded,step_template,into_viz,into_sim){
var has_scrolled_QMARK_ = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(false);
var has_sorted_QMARK_ = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(false);
var has_watched_QMARK_ = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(false);
var apply_to_all_QMARK_ = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(true);
var run_start = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var going_QMARK_ = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(false);
var subscriber_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(into_sim,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["subscribe-to-status",org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$1(subscriber_c)], null));

var c__35961__auto___61093 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__35961__auto___61093,has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c){
return (function (){
var f__35962__auto__ = (function (){var switch__35847__auto__ = ((function (c__35961__auto___61093,has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c){
return (function (state_61063){
var state_val_61064 = (state_61063[(1)]);
if((state_val_61064 === (1))){
var state_61063__$1 = state_61063;
var statearr_61065_61094 = state_61063__$1;
(statearr_61065_61094[(2)] = null);

(statearr_61065_61094[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_61064 === (2))){
var state_61063__$1 = state_61063;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_61063__$1,(4),subscriber_c);
} else {
if((state_val_61064 === (3))){
var inst_61061 = (state_61063[(2)]);
var state_61063__$1 = state_61063;
return cljs.core.async.impl.ioc_helpers.return_chan(state_61063__$1,inst_61061);
} else {
if((state_val_61064 === (4))){
var inst_61051 = (state_61063[(7)]);
var inst_61051__$1 = (state_61063[(2)]);
var state_61063__$1 = (function (){var statearr_61066 = state_61063;
(statearr_61066[(7)] = inst_61051__$1);

return statearr_61066;
})();
if(cljs.core.truth_(inst_61051__$1)){
var statearr_61067_61095 = state_61063__$1;
(statearr_61067_61095[(1)] = (5));

} else {
var statearr_61068_61096 = state_61063__$1;
(statearr_61068_61096[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_61064 === (5))){
var inst_61051 = (state_61063[(7)]);
var inst_61054 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_61051,(0),null);
var inst_61055 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(going_QMARK_,inst_61054) : cljs.core.reset_BANG_.call(null,going_QMARK_,inst_61054));
var state_61063__$1 = (function (){var statearr_61069 = state_61063;
(statearr_61069[(8)] = inst_61055);

return statearr_61069;
})();
var statearr_61070_61097 = state_61063__$1;
(statearr_61070_61097[(2)] = null);

(statearr_61070_61097[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_61064 === (6))){
var state_61063__$1 = state_61063;
var statearr_61071_61098 = state_61063__$1;
(statearr_61071_61098[(2)] = null);

(statearr_61071_61098[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_61064 === (7))){
var inst_61059 = (state_61063[(2)]);
var state_61063__$1 = state_61063;
var statearr_61072_61099 = state_61063__$1;
(statearr_61072_61099[(2)] = inst_61059);

(statearr_61072_61099[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
return null;
}
}
}
}
}
}
}
});})(c__35961__auto___61093,has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c))
;
return ((function (switch__35847__auto__,c__35961__auto___61093,has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c){
return (function() {
var org$numenta$sanity$controls_ui$navbar_$_state_machine__35848__auto__ = null;
var org$numenta$sanity$controls_ui$navbar_$_state_machine__35848__auto____0 = (function (){
var statearr_61076 = [null,null,null,null,null,null,null,null,null];
(statearr_61076[(0)] = org$numenta$sanity$controls_ui$navbar_$_state_machine__35848__auto__);

(statearr_61076[(1)] = (1));

return statearr_61076;
});
var org$numenta$sanity$controls_ui$navbar_$_state_machine__35848__auto____1 = (function (state_61063){
while(true){
var ret_value__35849__auto__ = (function (){try{while(true){
var result__35850__auto__ = switch__35847__auto__(state_61063);
if(cljs.core.keyword_identical_QMARK_(result__35850__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__35850__auto__;
}
break;
}
}catch (e61077){if((e61077 instanceof Object)){
var ex__35851__auto__ = e61077;
var statearr_61078_61100 = state_61063;
(statearr_61078_61100[(5)] = ex__35851__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_61063);

return cljs.core.cst$kw$recur;
} else {
throw e61077;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35849__auto__,cljs.core.cst$kw$recur)){
var G__61101 = state_61063;
state_61063 = G__61101;
continue;
} else {
return ret_value__35849__auto__;
}
break;
}
});
org$numenta$sanity$controls_ui$navbar_$_state_machine__35848__auto__ = function(state_61063){
switch(arguments.length){
case 0:
return org$numenta$sanity$controls_ui$navbar_$_state_machine__35848__auto____0.call(this);
case 1:
return org$numenta$sanity$controls_ui$navbar_$_state_machine__35848__auto____1.call(this,state_61063);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$controls_ui$navbar_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$controls_ui$navbar_$_state_machine__35848__auto____0;
org$numenta$sanity$controls_ui$navbar_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$controls_ui$navbar_$_state_machine__35848__auto____1;
return org$numenta$sanity$controls_ui$navbar_$_state_machine__35848__auto__;
})()
;})(switch__35847__auto__,c__35961__auto___61093,has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c))
})();
var state__35963__auto__ = (function (){var statearr_61079 = (f__35962__auto__.cljs$core$IFn$_invoke$arity$0 ? f__35962__auto__.cljs$core$IFn$_invoke$arity$0() : f__35962__auto__.call(null));
(statearr_61079[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__35961__auto___61093);

return statearr_61079;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__35963__auto__);
});})(c__35961__auto___61093,has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c))
);


cljs.core.add_watch(steps,cljs.core.cst$kw$org$numenta$sanity$controls_DASH_ui_SLASH_gather_DASH_start_DASH_data,((function (has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c){
return (function (___$2,___$3,___$4,xs){
cljs.core.remove_watch(steps,cljs.core.cst$kw$org$numenta$sanity$controls_DASH_ui_SLASH_gather_DASH_start_DASH_data);

return org.numenta.sanity.controls_ui.gather_start_data_BANG_(run_start,xs);
});})(has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c))
);

cljs.core.add_watch(going_QMARK_,cljs.core.cst$kw$org$numenta$sanity$controls_DASH_ui_SLASH_gather_DASH_start_DASH_data,((function (has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c){
return (function (___$2,___$3,oldv,go_QMARK_){
if(cljs.core.truth_((function (){var and__4670__auto__ = cljs.core.not(oldv);
if(and__4670__auto__){
return go_QMARK_;
} else {
return and__4670__auto__;
}
})())){
if(cljs.core.truth_(cljs.core.first((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(steps) : cljs.core.deref.call(null,steps))))){
return org.numenta.sanity.controls_ui.gather_start_data_BANG_(run_start,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(steps) : cljs.core.deref.call(null,steps)));
} else {
return null;
}
} else {
return null;
}
});})(has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c))
);

return ((function (has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c){
return (function (title,features,___$2,___$3,___$4,___$5,___$6,___$7){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$nav$navbar$navbar_DASH_default,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$container_DASH_fluid,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$navbar_DASH_header,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$navbar_DASH_toggle$collapsed,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$data_DASH_toggle,"collapse",cljs.core.cst$kw$data_DASH_target,"#comportex-navbar-collapse"], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$icon_DASH_bar], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$icon_DASH_bar], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$icon_DASH_bar], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$a$navbar_DASH_brand,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$href,"https://github.com/nupic-community/sanity"], null),title], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$collapse$navbar_DASH_collapse,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$id,"comportex-navbar-collapse"], null),new cljs.core.PersistentVector(null, 16, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$ul$nav$navbar_DASH_nav,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_default$navbar_DASH_btn,(function (){var G__61080 = new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,cljs.core.cst$kw$button,cljs.core.cst$kw$on_DASH_click,org.numenta.sanity.controls_ui.send_command(into_viz,cljs.core.cst$kw$step_DASH_backward),cljs.core.cst$kw$title,"Step backward in time"], null);
if(cljs.core.not((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(step_template) : cljs.core.deref.call(null,step_template)))){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__61080,cljs.core.cst$kw$disabled,"disabled");
} else {
return G__61080;
}
})(),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$glyphicon$glyphicon_DASH_step_DASH_backward,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$aria_DASH_hidden,"true"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$visible_DASH_xs_DASH_inline," Step backward"], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_default$navbar_DASH_btn,(function (){var G__61081 = new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,cljs.core.cst$kw$button,cljs.core.cst$kw$on_DASH_click,org.numenta.sanity.controls_ui.send_command(into_viz,cljs.core.cst$kw$step_DASH_forward),cljs.core.cst$kw$title,"Step forward in time"], null);
if(cljs.core.not((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(step_template) : cljs.core.deref.call(null,step_template)))){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__61081,cljs.core.cst$kw$disabled,"disabled");
} else {
return G__61081;
}
})(),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$glyphicon$glyphicon_DASH_step_DASH_forward,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$aria_DASH_hidden,"true"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$visible_DASH_xs_DASH_inline," Step forward"], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(going_QMARK_) : cljs.core.deref.call(null,going_QMARK_)))?null:new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$class,"hidden"], null)),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_default$navbar_DASH_btn,(function (){var G__61082 = new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,cljs.core.cst$kw$button,cljs.core.cst$kw$on_DASH_click,((function (has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c){
return (function (){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(into_sim,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["pause"], null));
});})(has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c))
,cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$width,"5em"], null)], null);
if(cljs.core.not((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(step_template) : cljs.core.deref.call(null,step_template)))){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__61082,cljs.core.cst$kw$disabled,"disabled");
} else {
return G__61082;
}
})(),"Pause"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(going_QMARK_) : cljs.core.deref.call(null,going_QMARK_)))?new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$class,"hidden"], null):null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_primary$navbar_DASH_btn,(function (){var G__61083 = new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,cljs.core.cst$kw$button,cljs.core.cst$kw$on_DASH_click,((function (has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c){
return (function (){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(into_sim,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["run"], null));
});})(has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c))
,cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$width,"5em"], null)], null);
if(cljs.core.not((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(step_template) : cljs.core.deref.call(null,step_template)))){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__61083,cljs.core.cst$kw$disabled,"disabled");
} else {
return G__61083;
}
})(),"Run"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li$dropdown,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$a$dropdown_DASH_toggle,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$data_DASH_toggle,"dropdown",cljs.core.cst$kw$role,"button",cljs.core.cst$kw$href,"#"], null),"Display",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$caret], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$ul$dropdown_DASH_menu,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$role,"menu"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$a,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$href,"#",cljs.core.cst$kw$on_DASH_click,((function (has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c){
return (function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(viz_options,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$drawing,cljs.core.cst$kw$display_DASH_mode], null),cljs.core.cst$kw$one_DASH_d);
});})(has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c))
], null),"column states over time (1D)"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$a,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$href,"#",cljs.core.cst$kw$on_DASH_click,((function (has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c){
return (function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(viz_options,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$drawing,cljs.core.cst$kw$display_DASH_mode], null),cljs.core.cst$kw$two_DASH_d);
});})(has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c))
], null),"column states over space (2D)"], null)], null)], null)], null),(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(viz_expanded) : cljs.core.deref.call(null,viz_expanded)))?null:new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li$hidden_DASH_xs,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_default$navbar_DASH_btn,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,cljs.core.cst$kw$button,cljs.core.cst$kw$on_DASH_click,((function (has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c){
return (function (e){
var seq__61084_61102 = cljs.core.seq(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$1(goog.dom.getElementsByClass("viz-expandable")));
var chunk__61085_61103 = null;
var count__61086_61104 = (0);
var i__61087_61105 = (0);
while(true){
if((i__61087_61105 < count__61086_61104)){
var el_61106 = chunk__61085_61103.cljs$core$IIndexed$_nth$arity$2(null,i__61087_61105);
goog.dom.classes.swap(el_61106,"col-sm-9","col-sm-12");

var G__61107 = seq__61084_61102;
var G__61108 = chunk__61085_61103;
var G__61109 = count__61086_61104;
var G__61110 = (i__61087_61105 + (1));
seq__61084_61102 = G__61107;
chunk__61085_61103 = G__61108;
count__61086_61104 = G__61109;
i__61087_61105 = G__61110;
continue;
} else {
var temp__4653__auto___61111 = cljs.core.seq(seq__61084_61102);
if(temp__4653__auto___61111){
var seq__61084_61112__$1 = temp__4653__auto___61111;
if(cljs.core.chunked_seq_QMARK_(seq__61084_61112__$1)){
var c__5485__auto___61113 = cljs.core.chunk_first(seq__61084_61112__$1);
var G__61114 = cljs.core.chunk_rest(seq__61084_61112__$1);
var G__61115 = c__5485__auto___61113;
var G__61116 = cljs.core.count(c__5485__auto___61113);
var G__61117 = (0);
seq__61084_61102 = G__61114;
chunk__61085_61103 = G__61115;
count__61086_61104 = G__61116;
i__61087_61105 = G__61117;
continue;
} else {
var el_61118 = cljs.core.first(seq__61084_61112__$1);
goog.dom.classes.swap(el_61118,"col-sm-9","col-sm-12");

var G__61119 = cljs.core.next(seq__61084_61112__$1);
var G__61120 = null;
var G__61121 = (0);
var G__61122 = (0);
seq__61084_61102 = G__61119;
chunk__61085_61103 = G__61120;
count__61086_61104 = G__61121;
i__61087_61105 = G__61122;
continue;
}
} else {
}
}
break;
}

(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(viz_expanded,true) : cljs.core.reset_BANG_.call(null,viz_expanded,true));

window.dispatchEvent((new Event("resize")));

return e.preventDefault();
});})(has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c))
,cljs.core.cst$kw$title,"Expand visualisation"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$glyphicon$glyphicon_DASH_resize_DASH_full,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$aria_DASH_hidden,"true"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$sr_DASH_only,"Expand"], null)], null)], null)),(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(viz_expanded) : cljs.core.deref.call(null,viz_expanded)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li$hidden_DASH_xs,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_default$navbar_DASH_btn,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,cljs.core.cst$kw$button,cljs.core.cst$kw$on_DASH_click,((function (has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c){
return (function (e){
var seq__61088_61123 = cljs.core.seq(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$1(goog.dom.getElementsByClass("viz-expandable")));
var chunk__61089_61124 = null;
var count__61090_61125 = (0);
var i__61091_61126 = (0);
while(true){
if((i__61091_61126 < count__61090_61125)){
var el_61127 = chunk__61089_61124.cljs$core$IIndexed$_nth$arity$2(null,i__61091_61126);
goog.dom.classes.swap(el_61127,"col-sm-12","col-sm-9");

var G__61128 = seq__61088_61123;
var G__61129 = chunk__61089_61124;
var G__61130 = count__61090_61125;
var G__61131 = (i__61091_61126 + (1));
seq__61088_61123 = G__61128;
chunk__61089_61124 = G__61129;
count__61090_61125 = G__61130;
i__61091_61126 = G__61131;
continue;
} else {
var temp__4653__auto___61132 = cljs.core.seq(seq__61088_61123);
if(temp__4653__auto___61132){
var seq__61088_61133__$1 = temp__4653__auto___61132;
if(cljs.core.chunked_seq_QMARK_(seq__61088_61133__$1)){
var c__5485__auto___61134 = cljs.core.chunk_first(seq__61088_61133__$1);
var G__61135 = cljs.core.chunk_rest(seq__61088_61133__$1);
var G__61136 = c__5485__auto___61134;
var G__61137 = cljs.core.count(c__5485__auto___61134);
var G__61138 = (0);
seq__61088_61123 = G__61135;
chunk__61089_61124 = G__61136;
count__61090_61125 = G__61137;
i__61091_61126 = G__61138;
continue;
} else {
var el_61139 = cljs.core.first(seq__61088_61133__$1);
goog.dom.classes.swap(el_61139,"col-sm-12","col-sm-9");

var G__61140 = cljs.core.next(seq__61088_61133__$1);
var G__61141 = null;
var G__61142 = (0);
var G__61143 = (0);
seq__61088_61123 = G__61140;
chunk__61089_61124 = G__61141;
count__61090_61125 = G__61142;
i__61091_61126 = G__61143;
continue;
}
} else {
}
}
break;
}

(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(viz_expanded,false) : cljs.core.reset_BANG_.call(null,viz_expanded,false));

window.dispatchEvent((new Event("resize")));

return e.preventDefault();
});})(has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c))
,cljs.core.cst$kw$title,"Un-expand visualisation"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$glyphicon$glyphicon_DASH_resize_DASH_small,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$aria_DASH_hidden,"true"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$sr_DASH_only,"Un-expand"], null)], null)], null):null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$navbar_DASH_text,"Sort/Watch/Scroll:"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_default$navbar_DASH_btn,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,cljs.core.cst$kw$button,cljs.core.cst$kw$on_DASH_click,cljs.core.comp.cljs$core$IFn$_invoke$arity$2(((function (has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c){
return (function (___$8){
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(has_sorted_QMARK_,true) : cljs.core.reset_BANG_.call(null,has_sorted_QMARK_,true));
});})(has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c))
,org.numenta.sanity.controls_ui.send_command.cljs$core$IFn$_invoke$arity$variadic(into_viz,cljs.core.cst$kw$sort,cljs.core.array_seq([(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(apply_to_all_QMARK_) : cljs.core.deref.call(null,apply_to_all_QMARK_))], 0))),cljs.core.cst$kw$title,"Sort the columns by order of recent activity"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$glyphicon$glyphicon_DASH_sort_DASH_by_DASH_attributes_DASH_alt,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$aria_DASH_hidden,"true"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$visible_DASH_xs_DASH_inline," Sort by recent active columns"], null)], null)], null),(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(has_sorted_QMARK_) : cljs.core.deref.call(null,has_sorted_QMARK_)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_default$navbar_DASH_btn,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,cljs.core.cst$kw$button,cljs.core.cst$kw$on_DASH_click,cljs.core.comp.cljs$core$IFn$_invoke$arity$2(((function (has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c){
return (function (___$8){
if(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(apply_to_all_QMARK_) : cljs.core.deref.call(null,apply_to_all_QMARK_)))){
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(has_sorted_QMARK_,false) : cljs.core.reset_BANG_.call(null,has_sorted_QMARK_,false));
} else {
return null;
}
});})(has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c))
,org.numenta.sanity.controls_ui.send_command.cljs$core$IFn$_invoke$arity$variadic(into_viz,cljs.core.cst$kw$clear_DASH_sort,cljs.core.array_seq([(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(apply_to_all_QMARK_) : cljs.core.deref.call(null,apply_to_all_QMARK_))], 0))),cljs.core.cst$kw$title,"Clear all sorting - revert to actual column order"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$glyphicon$glyphicon_DASH_sort_DASH_by_DASH_order,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$aria_DASH_hidden,"true"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$visible_DASH_xs_DASH_inline," Clear sorting"], null)], null)], null):null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$margin_DASH_left,"1ex"], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_default$navbar_DASH_btn,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,cljs.core.cst$kw$button,cljs.core.cst$kw$on_DASH_click,cljs.core.comp.cljs$core$IFn$_invoke$arity$2(((function (has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c){
return (function (___$8){
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(has_watched_QMARK_,true) : cljs.core.reset_BANG_.call(null,has_watched_QMARK_,true));
});})(has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c))
,org.numenta.sanity.controls_ui.send_command.cljs$core$IFn$_invoke$arity$variadic(into_viz,cljs.core.cst$kw$add_DASH_facet,cljs.core.array_seq([(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(apply_to_all_QMARK_) : cljs.core.deref.call(null,apply_to_all_QMARK_))], 0))),cljs.core.cst$kw$title,"Add a facet to watch the current active set of columns"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$glyphicon$glyphicon_DASH_eye_DASH_open,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$aria_DASH_hidden,"true"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$visible_DASH_xs_DASH_inline," Add facet, watching active set"], null)], null)], null),(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(has_watched_QMARK_) : cljs.core.deref.call(null,has_watched_QMARK_)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_default$navbar_DASH_btn,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,cljs.core.cst$kw$button,cljs.core.cst$kw$on_DASH_click,cljs.core.comp.cljs$core$IFn$_invoke$arity$2(((function (has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c){
return (function (___$8){
if(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(apply_to_all_QMARK_) : cljs.core.deref.call(null,apply_to_all_QMARK_)))){
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(has_watched_QMARK_,false) : cljs.core.reset_BANG_.call(null,has_watched_QMARK_,false));
} else {
return null;
}
});})(has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c))
,org.numenta.sanity.controls_ui.send_command.cljs$core$IFn$_invoke$arity$variadic(into_viz,cljs.core.cst$kw$clear_DASH_facets,cljs.core.array_seq([(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(apply_to_all_QMARK_) : cljs.core.deref.call(null,apply_to_all_QMARK_))], 0))),cljs.core.cst$kw$title,"Clear all facets (watching sets of columns)"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$glyphicon$glyphicon_DASH_eye_DASH_close,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$aria_DASH_hidden,"true"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$visible_DASH_xs_DASH_inline," Clear all facets"], null)], null)], null):null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$margin_DASH_left,"1ex"], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_default$navbar_DASH_btn,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,cljs.core.cst$kw$button,cljs.core.cst$kw$on_DASH_click,cljs.core.comp.cljs$core$IFn$_invoke$arity$2(((function (has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c){
return (function (___$8){
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(has_scrolled_QMARK_,true) : cljs.core.reset_BANG_.call(null,has_scrolled_QMARK_,true));
});})(has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c))
,org.numenta.sanity.controls_ui.send_command.cljs$core$IFn$_invoke$arity$variadic(into_viz,cljs.core.cst$kw$scroll_DASH_down,cljs.core.array_seq([(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(apply_to_all_QMARK_) : cljs.core.deref.call(null,apply_to_all_QMARK_))], 0))),cljs.core.cst$kw$title,"Scroll down visible columns"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$glyphicon$glyphicon_DASH_arrow_DASH_down,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$aria_DASH_hidden,"true"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$visible_DASH_xs_DASH_inline," Scroll down"], null)], null)], null),(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(has_scrolled_QMARK_) : cljs.core.deref.call(null,has_scrolled_QMARK_)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_default$navbar_DASH_btn,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,cljs.core.cst$kw$button,cljs.core.cst$kw$on_DASH_click,org.numenta.sanity.controls_ui.send_command.cljs$core$IFn$_invoke$arity$variadic(into_viz,cljs.core.cst$kw$scroll_DASH_up,cljs.core.array_seq([(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(apply_to_all_QMARK_) : cljs.core.deref.call(null,apply_to_all_QMARK_))], 0)),cljs.core.cst$kw$title,"Scroll up visible columns"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$glyphicon$glyphicon_DASH_arrow_DASH_up,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$aria_DASH_hidden,"true"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$visible_DASH_xs_DASH_inline," Scroll up"], null)], null)], null):null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$navbar_DASH_form,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$checkbox,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label$small,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$title,[cljs.core.str("Apply scroll/sort/watch actions to all layers; "),cljs.core.str("otherwise only the selected layer.")].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,cljs.core.cst$kw$checkbox,cljs.core.cst$kw$checked,(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(apply_to_all_QMARK_) : cljs.core.deref.call(null,apply_to_all_QMARK_)))?true:null),cljs.core.cst$kw$on_DASH_change,((function (has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c){
return (function (e){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(apply_to_all_QMARK_,cljs.core.not);

return e.preventDefault();
});})(has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c))
], null)], null)," all layers"], null)], null)], null)], null)], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$ul$nav$navbar_DASH_nav$navbar_DASH_right,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,((cljs.core.not((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(going_QMARK_) : cljs.core.deref.call(null,going_QMARK_))))?new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$class,"hidden"], null):null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$navbar_DASH_text,[cljs.core.str(org.numenta.sanity.controls_ui.sim_rate(cljs.core.first((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(steps) : cljs.core.deref.call(null,steps))),(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(run_start) : cljs.core.deref.call(null,run_start))).toFixed((1))),cljs.core.str("/sec.")].join('')], null)], null),(cljs.core.truth_((features.cljs$core$IFn$_invoke$arity$1 ? features.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$speed) : features.call(null,cljs.core.cst$kw$speed)))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li$dropdown,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$a$dropdown_DASH_toggle,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$data_DASH_toggle,"dropdown",cljs.core.cst$kw$role,"button",cljs.core.cst$kw$href,"#"], null),"Speed",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$caret], null)], null),new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$ul$dropdown_DASH_menu,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$role,"menu"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$a,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$href,"#",cljs.core.cst$kw$on_DASH_click,((function (has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c){
return (function (){
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(into_sim,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["set-step-ms",(0)], null));

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(viz_options,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$drawing,cljs.core.cst$kw$anim_DASH_every], null),(1));
});})(has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c))
], null),"max sim speed"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$a,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$href,"#",cljs.core.cst$kw$on_DASH_click,((function (has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c){
return (function (){
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(into_sim,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["set-step-ms",(0)], null));

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(viz_options,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$drawing,cljs.core.cst$kw$anim_DASH_every], null),(100));
});})(has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c))
], null),"max sim speed, draw every 100 steps"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$a,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$href,"#",cljs.core.cst$kw$on_DASH_click,((function (has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c){
return (function (){
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(into_sim,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["set-step-ms",(250)], null));

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(viz_options,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$drawing,cljs.core.cst$kw$anim_DASH_every], null),(1));
});})(has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c))
], null),"limit to 4 steps/sec."], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$a,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$href,"#",cljs.core.cst$kw$on_DASH_click,((function (has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c){
return (function (){
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(into_sim,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["set-step-ms",(500)], null));

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(viz_options,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$drawing,cljs.core.cst$kw$anim_DASH_every], null),(1));
});})(has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c))
], null),"limit to 2 steps/sec."], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$a,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$href,"#",cljs.core.cst$kw$on_DASH_click,((function (has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c){
return (function (){
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(into_sim,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["set-step-ms",(1000)], null));

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(viz_options,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$drawing,cljs.core.cst$kw$anim_DASH_every], null),(1));
});})(has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c))
], null),"limit to 1 step/sec."], null)], null)], null)], null):null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_default$navbar_DASH_btn,(function (){var G__61092 = new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,cljs.core.cst$kw$button,cljs.core.cst$kw$on_DASH_click,((function (has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c){
return (function (e){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(show_help,cljs.core.not);

return e.preventDefault();
});})(has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c))
,cljs.core.cst$kw$title,"Help"], null);
if(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(show_help) : cljs.core.deref.call(null,show_help)))){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__61092,cljs.core.cst$kw$class,"active");
} else {
return G__61092;
}
})(),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$glyphicon$glyphicon_DASH_question_DASH_sign,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$aria_DASH_hidden,"true"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$visible_DASH_xs_DASH_inline," Help"], null)], null)], null)], null)], null)], null)], null);
});
;})(has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c))
});
org.numenta.sanity.controls_ui.tabs = (function org$numenta$sanity$controls_ui$tabs(tab_cmps){
var current_tab = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.ffirst(tab_cmps));
return ((function (current_tab){
return (function (tab_cmps__$1){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$nav,cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$ul$nav$nav_DASH_tabs], null),(function (){var iter__5454__auto__ = ((function (current_tab){
return (function org$numenta$sanity$controls_ui$tabs_$_iter__61157(s__61158){
return (new cljs.core.LazySeq(null,((function (current_tab){
return (function (){
var s__61158__$1 = s__61158;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__61158__$1);
if(temp__4653__auto__){
var s__61158__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__61158__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__61158__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__61160 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__61159 = (0);
while(true){
if((i__61159 < size__5453__auto__)){
var vec__61165 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__61159);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61165,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61165,(1),null);
cljs.core.chunk_append(b__61160,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$role,"presentation",cljs.core.cst$kw$class,((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(current_tab) : cljs.core.deref.call(null,current_tab)),k))?"active":null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$a,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$href,"#",cljs.core.cst$kw$on_DASH_click,((function (i__61159,vec__61165,k,_,c__5452__auto__,size__5453__auto__,b__61160,s__61158__$2,temp__4653__auto__,current_tab){
return (function (e){
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(current_tab,k) : cljs.core.reset_BANG_.call(null,current_tab,k));

return e.preventDefault();
});})(i__61159,vec__61165,k,_,c__5452__auto__,size__5453__auto__,b__61160,s__61158__$2,temp__4653__auto__,current_tab))
], null),cljs.core.name(k)], null)], null));

var G__61170 = (i__61159 + (1));
i__61159 = G__61170;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__61160),org$numenta$sanity$controls_ui$tabs_$_iter__61157(cljs.core.chunk_rest(s__61158__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__61160),null);
}
} else {
var vec__61166 = cljs.core.first(s__61158__$2);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61166,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61166,(1),null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$role,"presentation",cljs.core.cst$kw$class,((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(current_tab) : cljs.core.deref.call(null,current_tab)),k))?"active":null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$a,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$href,"#",cljs.core.cst$kw$on_DASH_click,((function (vec__61166,k,_,s__61158__$2,temp__4653__auto__,current_tab){
return (function (e){
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(current_tab,k) : cljs.core.reset_BANG_.call(null,current_tab,k));

return e.preventDefault();
});})(vec__61166,k,_,s__61158__$2,temp__4653__auto__,current_tab))
], null),cljs.core.name(k)], null)], null),org$numenta$sanity$controls_ui$tabs_$_iter__61157(cljs.core.rest(s__61158__$2)));
}
} else {
return null;
}
break;
}
});})(current_tab))
,null,null));
});})(current_tab))
;
return iter__5454__auto__(tab_cmps__$1);
})())], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$tabs,(function (){var vec__61167 = cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2(((function (current_tab){
return (function (p__61168){
var vec__61169 = p__61168;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61169,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61169,(1),null);
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(current_tab) : cljs.core.deref.call(null,current_tab)),k);
});})(current_tab))
,tab_cmps__$1));
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61167,(0),null);
var cmp = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61167,(1),null);
return cmp;
})()], null)], null);
});
;})(current_tab))
});
org.numenta.sanity.controls_ui.help_block = (function org$numenta$sanity$controls_ui$help_block(show_help){
if(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(show_help) : cljs.core.deref.call(null,show_help)))){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$container_DASH_fluid,new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$row,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_lg_DASH_3$col_DASH_md_DASH_4$col_DASH_sm_DASH_6,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h4,"Overview"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$a,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$href,"https://github.com/nupic-community/sanity"], null),"Sanity"], null)," runs HTM models in the browser with interactive\n       controls. The model state from recent timesteps is kept, so you can step\n       back in time. You can inspect input values, encoded sense bits, and the\n       columns that make up cortical region layers. Within a column you can inspect\n       cells and their distal dendrite segments. Feed-forward and distal synapses\n       can be shown."], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_lg_DASH_3$col_DASH_md_DASH_4$col_DASH_sm_DASH_6,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h4,"Display"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"Kept timesteps are shown in a row at the top of the display.\n      Click one to jump to it.\n      Below that, the blocks represent sensory fields (squares) and\n      layers of cortical columns (circles). Depending on the display mode,\n      these may be shown in 2D grids from a single time step, or as one\n      vertical line per timestep, allowing several time steps to be shown\n      in series."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"Don't miss the various complementary displays in the other tabs."], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_lg_DASH_3$col_DASH_md_DASH_4$col_DASH_sm_DASH_6,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h4,"Selection"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"Click on the main canvas to select one column of cells,\n      within some region layer. The individual cells\n      and their distal dendrite segments will be shown.\n      If you click off the layer, the column will be de-selected, but\n      the layer will remain selected. Its parameters can be seen and edited in\n      the 'params' tab."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"Input bits can also be selected. For multiple selections,\n       hold Command / Ctrl key while clicking (on Mac / Windows,\n       respectively)."], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_lg_DASH_3$col_DASH_md_DASH_4$col_DASH_sm_DASH_6,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h4,"Key controls"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"When the main canvas is in focus, ",new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$ul,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$kbd,"up"], null),"/",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$kbd,"down"], null)," select columns; "], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$kbd,"page up"], null),"/",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$kbd,"page down"], null)," scroll the visible field; "], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$kbd,"right"], null),"/",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$kbd,"left"], null)," step forward / back in time; "], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$kbd,"space"], null)," starts or stops running. "], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$kbd,"/"], null)," sorts the selected layer (Shift for all);"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$kbd,"\\"], null)," clears sorting (Shift for all);"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$kbd,"+"], null)," adds a facet (Shift for all);"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$kbd,"-"], null)," clears facets (Shift for all);"], null)], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_lg_DASH_3$col_DASH_md_DASH_4$col_DASH_sm_DASH_6,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h4,"Colour legend"], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$ul,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$b,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$color,"red"], null)], null),"Red"], null),": active"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$b,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$color,"blue"], null)], null),"Blue"], null),": predicted"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$b,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$color,"purple"], null)], null),"Purple"], null),": active+predicted (i.e. recognised)"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$b,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$color,"green"], null)], null),"Green"], null),": growing (new synapses) or temporal pooling"], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_lg_DASH_3$col_DASH_md_DASH_4$col_DASH_sm_DASH_6,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h4,"Segment diagrams"], null),(function (){var conn_act_px = (115);
var disc_act_px = (25);
var stimulus_th_px = (100);
var learning_th_px = (60);
var conn_tot_px = (130);
var disc_tot_px = (40);
var width_label = ((function (conn_act_px,disc_act_px,stimulus_th_px,learning_th_px,conn_tot_px,disc_tot_px){
return (function (y_transform,width,label_above_QMARK_,text){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$g,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$transform,[cljs.core.str("translate(0,"),cljs.core.str(y_transform),cljs.core.str(")")].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$line,new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$x1,(0),cljs.core.cst$kw$y1,(-3),cljs.core.cst$kw$x2,(0),cljs.core.cst$kw$y2,(3),cljs.core.cst$kw$stroke,"black",cljs.core.cst$kw$stroke_DASH_width,(1)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$line,new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$x1,width,cljs.core.cst$kw$y1,(-3),cljs.core.cst$kw$x2,width,cljs.core.cst$kw$y2,(3),cljs.core.cst$kw$stroke,"black",cljs.core.cst$kw$stroke_DASH_width,(1)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$line,new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$x1,(0),cljs.core.cst$kw$y1,(0),cljs.core.cst$kw$x2,width,cljs.core.cst$kw$y2,(0),cljs.core.cst$kw$stroke,"black",cljs.core.cst$kw$stroke_DASH_width,(1)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$text,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$x,(0),cljs.core.cst$kw$y,(cljs.core.truth_(label_above_QMARK_)?(-5):(15)),cljs.core.cst$kw$font_DASH_family,"sans-serif",cljs.core.cst$kw$font_DASH_size,"13px"], null),text], null)], null);
});})(conn_act_px,disc_act_px,stimulus_th_px,learning_th_px,conn_tot_px,disc_tot_px))
;
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"Segments are displayed as a pair of progress bars.\n              The meaning of each of the widths is shown below."], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$margin_DASH_left,(20)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$svg,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$width,(200),cljs.core.cst$kw$height,(220)], null),new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$g,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$transform,[cljs.core.str("translate(1,0)")].join('')], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [width_label,(15),conn_tot_px,true,"connected synapses"], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [width_label,(45),conn_act_px,true,"active connected synapses"], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [width_label,(75),stimulus_th_px,true,"stimulus threshold"], null),new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$g,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$transform,[cljs.core.str("translate(0,"),cljs.core.str((90)),cljs.core.str(")")].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$rect,new cljs.core.PersistentArrayMap(null, 7, [cljs.core.cst$kw$x,(0),cljs.core.cst$kw$y,(1),cljs.core.cst$kw$width,conn_tot_px,cljs.core.cst$kw$height,(8),cljs.core.cst$kw$stroke,"none",cljs.core.cst$kw$fill,"black",cljs.core.cst$kw$fill_DASH_opacity,"0.1"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$rect,new cljs.core.PersistentArrayMap(null, 7, [cljs.core.cst$kw$x,(0),cljs.core.cst$kw$y,(11),cljs.core.cst$kw$width,disc_tot_px,cljs.core.cst$kw$height,(8),cljs.core.cst$kw$stroke,"none",cljs.core.cst$kw$fill,"black",cljs.core.cst$kw$fill_DASH_opacity,"0.1"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$rect,new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$x,(0),cljs.core.cst$kw$y,(1),cljs.core.cst$kw$width,conn_act_px,cljs.core.cst$kw$height,(8),cljs.core.cst$kw$stroke,"none",cljs.core.cst$kw$fill,"red"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$rect,new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$x,(0),cljs.core.cst$kw$y,(11),cljs.core.cst$kw$width,disc_act_px,cljs.core.cst$kw$height,(8),cljs.core.cst$kw$stroke,"none",cljs.core.cst$kw$fill,"red"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$rect,new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$x,(0),cljs.core.cst$kw$y,(0),cljs.core.cst$kw$width,stimulus_th_px,cljs.core.cst$kw$height,(10),cljs.core.cst$kw$stroke,"black",cljs.core.cst$kw$fill_DASH_opacity,(0)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$rect,new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$x,(0),cljs.core.cst$kw$y,(10),cljs.core.cst$kw$width,learning_th_px,cljs.core.cst$kw$height,(10),cljs.core.cst$kw$stroke,"black",cljs.core.cst$kw$fill_DASH_opacity,(0)], null)], null)], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [width_label,(125),learning_th_px,false,"learning threshold"], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [width_label,(155),disc_tot_px,false,"disconnected synapses"], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [width_label,(185),disc_act_px,false,"active disconnected synapses"], null)], null)], null)], null)], null);
})()], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$hr], null)], null);
} else {
return null;
}
});
org.numenta.sanity.controls_ui.sanity_app = (function org$numenta$sanity$controls_ui$sanity_app(_,___$1,___$2,features,___$3,___$4,selection,steps,step_template,___$5,___$6,___$7,into_journal,___$8){
var show_help = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(false);
var viz_expanded = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(false);
var time_plots_tab = (cljs.core.truth_((features.cljs$core$IFn$_invoke$arity$1 ? features.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$time_DASH_plots) : features.call(null,cljs.core.cst$kw$time_DASH_plots)))?org.numenta.sanity.controls_ui.time_plots_tab_builder(steps,into_journal):null);
var cell_sdrs_tab = (cljs.core.truth_((features.cljs$core$IFn$_invoke$arity$1 ? features.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$cell_DASH_SDRs) : features.call(null,cljs.core.cst$kw$cell_DASH_SDRs)))?org.numenta.sanity.controls_ui.cell_sdrs_tab_builder(steps,step_template,selection,into_journal):null);
return ((function (show_help,viz_expanded,time_plots_tab,cell_sdrs_tab){
return (function (title,model_tab,main_pane,___$9,capture_options,viz_options,selection__$1,steps__$1,step_template__$1,series_colors,into_viz,into_sim,into_journal__$1,debug_data){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 10, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.controls_ui.navbar,title,features,steps__$1,show_help,viz_options,viz_expanded,step_template__$1,into_viz,into_sim], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.controls_ui.help_block,show_help], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$container_DASH_fluid,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$row,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_9$viz_DASH_expandable,main_pane], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_3,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.controls_ui.tabs,cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [(cljs.core.truth_(model_tab)?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$model,model_tab], null):null),(cljs.core.truth_((features.cljs$core$IFn$_invoke$arity$1 ? features.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$capture) : features.call(null,cljs.core.cst$kw$capture)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$capture,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.controls_ui.capture_tab,capture_options], null)], null):null),(cljs.core.truth_((features.cljs$core$IFn$_invoke$arity$1 ? features.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$drawing) : features.call(null,cljs.core.cst$kw$drawing)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$drawing,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.controls_ui.drawing_tab,features,viz_options,capture_options], null)], null):null),(cljs.core.truth_((features.cljs$core$IFn$_invoke$arity$1 ? features.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$params) : features.call(null,cljs.core.cst$kw$params)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$params,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.controls_ui.parameters_tab,step_template__$1,selection__$1,into_sim], null)], null):null),(cljs.core.truth_(time_plots_tab)?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$time_DASH_plots,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [time_plots_tab,series_colors], null)], null):null),(cljs.core.truth_(cell_sdrs_tab)?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$cell_DASH_SDRs,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cell_sdrs_tab], null)], null):null),(cljs.core.truth_((features.cljs$core$IFn$_invoke$arity$1 ? features.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$sources) : features.call(null,cljs.core.cst$kw$sources)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$sources,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.controls_ui.sources_tab,step_template__$1,selection__$1,series_colors,into_journal__$1], null)], null):null),(cljs.core.truth_((features.cljs$core$IFn$_invoke$arity$1 ? features.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$details) : features.call(null,cljs.core.cst$kw$details)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$details,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.controls_ui.details_tab,selection__$1,into_journal__$1], null)], null):null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$debug,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.controls_ui.debug_tab,debug_data], null)], null)], null))], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div_SHARP_loading_DASH_message,"loading"], null)], null)], null);
});
;})(show_help,viz_expanded,time_plots_tab,cell_sdrs_tab))
});
