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
var iter__5454__auto__ = (function org$numenta$sanity$controls_ui$spec_form_$_iter__60635(s__60636){
return (new cljs.core.LazySeq(null,(function (){
var s__60636__$1 = s__60636;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__60636__$1);
if(temp__4653__auto__){
var s__60636__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__60636__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__60636__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__60638 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__60637 = (0);
while(true){
if((i__60637 < size__5453__auto__)){
var vec__60651 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__60637);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60651,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60651,(1),null);
if(cljs.core.not((skip_set.cljs$core$IFn$_invoke$arity$1 ? skip_set.cljs$core$IFn$_invoke$arity$1(k) : skip_set.call(null,k)))){
var typ = (function (){var or__4682__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(partypes) : cljs.core.deref.call(null,partypes)),k);
if(cljs.core.truth_(or__4682__auto__)){
return or__4682__auto__;
} else {
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(partypes,cljs.core.assoc,k,org.numenta.sanity.controls_ui.param_type(v)),k);
}
})();
var setv_BANG_ = ((function (i__60637,s__60636__$1,typ,vec__60651,k,v,c__5452__auto__,size__5453__auto__,b__60638,s__60636__$2,temp__4653__auto__){
return (function (p1__60608_SHARP_){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(step_template,cljs.core.assoc_in,spec_path,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(spec,k,p1__60608_SHARP_));
});})(i__60637,s__60636__$1,typ,vec__60651,k,v,c__5452__auto__,size__5453__auto__,b__60638,s__60636__$2,temp__4653__auto__))
;
cljs.core.chunk_append(b__60638,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$row,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$class,((((v == null)) || (typeof v === 'string'))?"has-error":null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_8,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label$control_DASH_label$text_DASH_left,cljs.core.name(k)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_4,(function (){var G__60652 = (((typ instanceof cljs.core.Keyword))?typ.fqn:null);
switch (G__60652) {
case "boolean":
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input$form_DASH_control$input_DASH_sm,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,cljs.core.cst$kw$checkbox,cljs.core.cst$kw$checked,(cljs.core.truth_(v)?true:null),cljs.core.cst$kw$on_DASH_change,((function (i__60637,s__60636__$1,G__60652,typ,setv_BANG_,vec__60651,k,v,c__5452__auto__,size__5453__auto__,b__60638,s__60636__$2,temp__4653__auto__){
return (function (){
return setv_BANG_(cljs.core.not(v));
});})(i__60637,s__60636__$1,G__60652,typ,setv_BANG_,vec__60651,k,v,c__5452__auto__,size__5453__auto__,b__60638,s__60636__$2,temp__4653__auto__))
], null)], null);

break;
case "vector":
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input$form_DASH_control$input_DASH_sm,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$value,[cljs.core.str(v)].join(''),cljs.core.cst$kw$on_DASH_change,((function (i__60637,s__60636__$1,G__60652,typ,setv_BANG_,vec__60651,k,v,c__5452__auto__,size__5453__auto__,b__60638,s__60636__$2,temp__4653__auto__){
return (function (e){
var s = (function (){var G__60653 = e.target;
return goog.dom.forms.getValue(G__60653);
})();
var x = (function (){try{return cljs.reader.read_string(s);
}catch (e60654){var _ = e60654;
return s;
}})();
var newval = (((cljs.core.vector_QMARK_(x)) && (cljs.core.every_QMARK_(cljs.core.integer_QMARK_,x)))?x:s);
return setv_BANG_(newval);
});})(i__60637,s__60636__$1,G__60652,typ,setv_BANG_,vec__60651,k,v,c__5452__auto__,size__5453__auto__,b__60638,s__60636__$2,temp__4653__auto__))
], null)], null);

break;
case "number":
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input$form_DASH_control$input_DASH_sm,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$value,v,cljs.core.cst$kw$on_DASH_change,((function (i__60637,s__60636__$1,G__60652,typ,setv_BANG_,vec__60651,k,v,c__5452__auto__,size__5453__auto__,b__60638,s__60636__$2,temp__4653__auto__){
return (function (e){
var s = (function (){var G__60655 = e.target;
return goog.dom.forms.getValue(G__60655);
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
});})(i__60637,s__60636__$1,G__60652,typ,setv_BANG_,vec__60651,k,v,c__5452__auto__,size__5453__auto__,b__60638,s__60636__$2,temp__4653__auto__))
], null)], null);

break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(typ)].join('')));

}
})()], null)], null));

var G__60662 = (i__60637 + (1));
i__60637 = G__60662;
continue;
} else {
var G__60663 = (i__60637 + (1));
i__60637 = G__60663;
continue;
}
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__60638),org$numenta$sanity$controls_ui$spec_form_$_iter__60635(cljs.core.chunk_rest(s__60636__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__60638),null);
}
} else {
var vec__60656 = cljs.core.first(s__60636__$2);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60656,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60656,(1),null);
if(cljs.core.not((skip_set.cljs$core$IFn$_invoke$arity$1 ? skip_set.cljs$core$IFn$_invoke$arity$1(k) : skip_set.call(null,k)))){
var typ = (function (){var or__4682__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(partypes) : cljs.core.deref.call(null,partypes)),k);
if(cljs.core.truth_(or__4682__auto__)){
return or__4682__auto__;
} else {
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(partypes,cljs.core.assoc,k,org.numenta.sanity.controls_ui.param_type(v)),k);
}
})();
var setv_BANG_ = ((function (s__60636__$1,typ,vec__60656,k,v,s__60636__$2,temp__4653__auto__){
return (function (p1__60608_SHARP_){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(step_template,cljs.core.assoc_in,spec_path,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(spec,k,p1__60608_SHARP_));
});})(s__60636__$1,typ,vec__60656,k,v,s__60636__$2,temp__4653__auto__))
;
return cljs.core.cons(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$row,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$class,((((v == null)) || (typeof v === 'string'))?"has-error":null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_8,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label$control_DASH_label$text_DASH_left,cljs.core.name(k)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_4,(function (){var G__60657 = (((typ instanceof cljs.core.Keyword))?typ.fqn:null);
switch (G__60657) {
case "boolean":
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input$form_DASH_control$input_DASH_sm,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,cljs.core.cst$kw$checkbox,cljs.core.cst$kw$checked,(cljs.core.truth_(v)?true:null),cljs.core.cst$kw$on_DASH_change,((function (s__60636__$1,G__60657,typ,setv_BANG_,vec__60656,k,v,s__60636__$2,temp__4653__auto__){
return (function (){
return setv_BANG_(cljs.core.not(v));
});})(s__60636__$1,G__60657,typ,setv_BANG_,vec__60656,k,v,s__60636__$2,temp__4653__auto__))
], null)], null);

break;
case "vector":
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input$form_DASH_control$input_DASH_sm,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$value,[cljs.core.str(v)].join(''),cljs.core.cst$kw$on_DASH_change,((function (s__60636__$1,G__60657,typ,setv_BANG_,vec__60656,k,v,s__60636__$2,temp__4653__auto__){
return (function (e){
var s = (function (){var G__60658 = e.target;
return goog.dom.forms.getValue(G__60658);
})();
var x = (function (){try{return cljs.reader.read_string(s);
}catch (e60659){var _ = e60659;
return s;
}})();
var newval = (((cljs.core.vector_QMARK_(x)) && (cljs.core.every_QMARK_(cljs.core.integer_QMARK_,x)))?x:s);
return setv_BANG_(newval);
});})(s__60636__$1,G__60657,typ,setv_BANG_,vec__60656,k,v,s__60636__$2,temp__4653__auto__))
], null)], null);

break;
case "number":
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input$form_DASH_control$input_DASH_sm,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$value,v,cljs.core.cst$kw$on_DASH_change,((function (s__60636__$1,G__60657,typ,setv_BANG_,vec__60656,k,v,s__60636__$2,temp__4653__auto__){
return (function (e){
var s = (function (){var G__60660 = e.target;
return goog.dom.forms.getValue(G__60660);
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
});})(s__60636__$1,G__60657,typ,setv_BANG_,vec__60656,k,v,s__60636__$2,temp__4653__auto__))
], null)], null);

break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(typ)].join('')));

}
})()], null)], null),org$numenta$sanity$controls_ui$spec_form_$_iter__60635(cljs.core.rest(s__60636__$2)));
} else {
var G__60665 = cljs.core.rest(s__60636__$2);
s__60636__$1 = G__60665;
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
var seq__60719 = cljs.core.seq((function (){var iter__5454__auto__ = (function org$numenta$sanity$controls_ui$parameters_tab_$_iter__60725(s__60726){
return (new cljs.core.LazySeq(null,(function (){
var s__60726__$1 = s__60726;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__60726__$1);
if(temp__4653__auto__){
var xs__5201__auto__ = temp__4653__auto__;
var vec__60735 = cljs.core.first(xs__5201__auto__);
var r_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60735,(0),null);
var rgn = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60735,(1),null);
var iterys__5450__auto__ = ((function (s__60726__$1,vec__60735,r_id,rgn,xs__5201__auto__,temp__4653__auto__){
return (function org$numenta$sanity$controls_ui$parameters_tab_$_iter__60725_$_iter__60727(s__60728){
return (new cljs.core.LazySeq(null,((function (s__60726__$1,vec__60735,r_id,rgn,xs__5201__auto__,temp__4653__auto__){
return (function (){
var s__60728__$1 = s__60728;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__60728__$1);
if(temp__4653__auto____$1){
var s__60728__$2 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__60728__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__60728__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__60730 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__60729 = (0);
while(true){
if((i__60729 < size__5453__auto__)){
var l_id = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__60729);
cljs.core.chunk_append(b__60730,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,r_id,l_id,cljs.core.cst$kw$spec], null));

var G__60772 = (i__60729 + (1));
i__60729 = G__60772;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__60730),org$numenta$sanity$controls_ui$parameters_tab_$_iter__60725_$_iter__60727(cljs.core.chunk_rest(s__60728__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__60730),null);
}
} else {
var l_id = cljs.core.first(s__60728__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,r_id,l_id,cljs.core.cst$kw$spec], null),org$numenta$sanity$controls_ui$parameters_tab_$_iter__60725_$_iter__60727(cljs.core.rest(s__60728__$2)));
}
} else {
return null;
}
break;
}
});})(s__60726__$1,vec__60735,r_id,rgn,xs__5201__auto__,temp__4653__auto__))
,null,null));
});})(s__60726__$1,vec__60735,r_id,rgn,xs__5201__auto__,temp__4653__auto__))
;
var fs__5451__auto__ = cljs.core.seq(iterys__5450__auto__(cljs.core.keys(rgn)));
if(fs__5451__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5451__auto__,org$numenta$sanity$controls_ui$parameters_tab_$_iter__60725(cljs.core.rest(s__60726__$1)));
} else {
var G__60773 = cljs.core.rest(s__60726__$1);
s__60726__$1 = G__60773;
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
var chunk__60721 = null;
var count__60722 = (0);
var i__60723 = (0);
while(true){
if((i__60723 < count__60722)){
var path = chunk__60721.cljs$core$IIndexed$_nth$arity$2(null,i__60723);
var old_spec_60774 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(prev_st,path);
var new_spec_60775 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(st,path);
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(old_spec_60774,new_spec_60775)){
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(into_sim,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["set-spec",path,new_spec_60775], null));
} else {
}

var G__60776 = seq__60719;
var G__60777 = chunk__60721;
var G__60778 = count__60722;
var G__60779 = (i__60723 + (1));
seq__60719 = G__60776;
chunk__60721 = G__60777;
count__60722 = G__60778;
i__60723 = G__60779;
continue;
} else {
var temp__4653__auto__ = cljs.core.seq(seq__60719);
if(temp__4653__auto__){
var seq__60719__$1 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__60719__$1)){
var c__5485__auto__ = cljs.core.chunk_first(seq__60719__$1);
var G__60780 = cljs.core.chunk_rest(seq__60719__$1);
var G__60781 = c__5485__auto__;
var G__60782 = cljs.core.count(c__5485__auto__);
var G__60783 = (0);
seq__60719 = G__60780;
chunk__60721 = G__60781;
count__60722 = G__60782;
i__60723 = G__60783;
continue;
} else {
var path = cljs.core.first(seq__60719__$1);
var old_spec_60784 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(prev_st,path);
var new_spec_60785 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(st,path);
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(old_spec_60784,new_spec_60785)){
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(into_sim,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["set-spec",path,new_spec_60785], null));
} else {
}

var G__60786 = cljs.core.next(seq__60719__$1);
var G__60787 = null;
var G__60788 = (0);
var G__60789 = (0);
seq__60719 = G__60786;
chunk__60721 = G__60787;
count__60722 = G__60788;
i__60723 = G__60789;
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

var partypes = (function (){var G__60738 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__60738) : cljs.core.atom.call(null,G__60738));
})();
return ((function (partypes){
return (function (step_template__$1,selection,into_sim__$1){
var vec__60739 = cljs.core.some(org.numenta.sanity.selection.layer,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selection) : cljs.core.deref.call(null,selection)));
var sel_region = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60739,(0),null);
var sel_layer = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60739,(1),null);
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_muted,"Read/write model parameters of the selected region layer,\n                    with immediate effect. Click a layer to select it."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_info$text_DASH_center,(cljs.core.truth_(sel_layer)?[cljs.core.str(cljs.core.name(sel_region)),cljs.core.str(" "),cljs.core.str(cljs.core.name(sel_layer))].join(''):null)], null),cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_horizontal], null),(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(step_template__$1) : cljs.core.deref.call(null,step_template__$1)))?(function (){var spec_path = new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,sel_region,sel_layer,cljs.core.cst$kw$spec], null);
var spec = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(step_template__$1) : cljs.core.deref.call(null,step_template__$1)),spec_path);
return cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(org.numenta.sanity.controls_ui.spec_form(step_template__$1,partypes,spec,spec_path,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$distal,null,cljs.core.cst$kw$proximal,null,cljs.core.cst$kw$apical,null], null), null)),(function (){var iter__5454__auto__ = ((function (spec_path,spec,vec__60739,sel_region,sel_layer,partypes){
return (function org$numenta$sanity$controls_ui$parameters_tab_$_iter__60740(s__60741){
return (new cljs.core.LazySeq(null,((function (spec_path,spec,vec__60739,sel_region,sel_layer,partypes){
return (function (){
var s__60741__$1 = s__60741;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__60741__$1);
if(temp__4653__auto__){
var s__60741__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__60741__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__60741__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__60743 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__60742 = (0);
while(true){
if((i__60742 < size__5453__auto__)){
var vec__60748 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__60742);
var sub_k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60748,(0),null);
var title = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60748,(1),null);
cljs.core.chunk_append(b__60743,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel$panel_DASH_default,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel_DASH_heading,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h4$panel_DASH_title,title], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel_DASH_body,cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_horizontal], null),org.numenta.sanity.controls_ui.spec_form(step_template__$1,partypes,cljs.core.get.cljs$core$IFn$_invoke$arity$2(spec,sub_k),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(spec_path,sub_k),cljs.core.PersistentHashSet.EMPTY))], null)], null));

var G__60790 = (i__60742 + (1));
i__60742 = G__60790;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__60743),org$numenta$sanity$controls_ui$parameters_tab_$_iter__60740(cljs.core.chunk_rest(s__60741__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__60743),null);
}
} else {
var vec__60749 = cljs.core.first(s__60741__$2);
var sub_k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60749,(0),null);
var title = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60749,(1),null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel$panel_DASH_default,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel_DASH_heading,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h4$panel_DASH_title,title], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel_DASH_body,cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_horizontal], null),org.numenta.sanity.controls_ui.spec_form(step_template__$1,partypes,cljs.core.get.cljs$core$IFn$_invoke$arity$2(spec,sub_k),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(spec_path,sub_k),cljs.core.PersistentHashSet.EMPTY))], null)], null),org$numenta$sanity$controls_ui$parameters_tab_$_iter__60740(cljs.core.rest(s__60741__$2)));
}
} else {
return null;
}
break;
}
});})(spec_path,spec,vec__60739,sel_region,sel_layer,partypes))
,null,null));
});})(spec_path,spec,vec__60739,sel_region,sel_layer,partypes))
;
return iter__5454__auto__(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$proximal,"Proximal dendrites"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$distal,"Distal (lateral) dendrites"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$apical,"Apical dendrites"], null)], null));
})(),cljs.core.array_seq([new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel$panel_DASH_default,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel_DASH_heading,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h4$panel_DASH_title,"Note"], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel_DASH_body,new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"Parameter values can be altered above, but some parameters\n                     must be in effect when the HTM regions are created.\n                     Notable examples are ",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$code,"column-dimensions"], null)," and ",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$code,"depth"], null),". After setting such parameter values, rebuild all regions\n                 (obviously losing any learned connections in the process):"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_warning$btn_DASH_block,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$on_DASH_click,((function (spec_path,spec,vec__60739,sel_region,sel_layer,partypes){
return (function (){
return org.numenta.sanity.helpers.ui_loading_message_until((function (){var c__35961__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__35961__auto__,spec_path,spec,vec__60739,sel_region,sel_layer,partypes){
return (function (){
var f__35962__auto__ = (function (){var switch__35847__auto__ = ((function (c__35961__auto__,spec_path,spec,vec__60739,sel_region,sel_layer,partypes){
return (function (state_60762){
var state_val_60763 = (state_60762[(1)]);
if((state_val_60763 === (1))){
var inst_60750 = cljs.core.async.timeout((100));
var state_60762__$1 = state_60762;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_60762__$1,(2),inst_60750);
} else {
if((state_val_60763 === (2))){
var inst_60752 = (state_60762[(2)]);
var inst_60753 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
var inst_60754 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_60755 = org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$2(inst_60753,true);
var inst_60756 = ["restart",inst_60755];
var inst_60757 = (new cljs.core.PersistentVector(null,2,(5),inst_60754,inst_60756,null));
var inst_60758 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(into_sim__$1,inst_60757);
var state_60762__$1 = (function (){var statearr_60764 = state_60762;
(statearr_60764[(7)] = inst_60758);

(statearr_60764[(8)] = inst_60752);

return statearr_60764;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_60762__$1,(3),inst_60753);
} else {
if((state_val_60763 === (3))){
var inst_60760 = (state_60762[(2)]);
var state_60762__$1 = state_60762;
return cljs.core.async.impl.ioc_helpers.return_chan(state_60762__$1,inst_60760);
} else {
return null;
}
}
}
});})(c__35961__auto__,spec_path,spec,vec__60739,sel_region,sel_layer,partypes))
;
return ((function (switch__35847__auto__,c__35961__auto__,spec_path,spec,vec__60739,sel_region,sel_layer,partypes){
return (function() {
var org$numenta$sanity$controls_ui$parameters_tab_$_state_machine__35848__auto__ = null;
var org$numenta$sanity$controls_ui$parameters_tab_$_state_machine__35848__auto____0 = (function (){
var statearr_60768 = [null,null,null,null,null,null,null,null,null];
(statearr_60768[(0)] = org$numenta$sanity$controls_ui$parameters_tab_$_state_machine__35848__auto__);

(statearr_60768[(1)] = (1));

return statearr_60768;
});
var org$numenta$sanity$controls_ui$parameters_tab_$_state_machine__35848__auto____1 = (function (state_60762){
while(true){
var ret_value__35849__auto__ = (function (){try{while(true){
var result__35850__auto__ = switch__35847__auto__(state_60762);
if(cljs.core.keyword_identical_QMARK_(result__35850__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__35850__auto__;
}
break;
}
}catch (e60769){if((e60769 instanceof Object)){
var ex__35851__auto__ = e60769;
var statearr_60770_60791 = state_60762;
(statearr_60770_60791[(5)] = ex__35851__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_60762);

return cljs.core.cst$kw$recur;
} else {
throw e60769;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35849__auto__,cljs.core.cst$kw$recur)){
var G__60792 = state_60762;
state_60762 = G__60792;
continue;
} else {
return ret_value__35849__auto__;
}
break;
}
});
org$numenta$sanity$controls_ui$parameters_tab_$_state_machine__35848__auto__ = function(state_60762){
switch(arguments.length){
case 0:
return org$numenta$sanity$controls_ui$parameters_tab_$_state_machine__35848__auto____0.call(this);
case 1:
return org$numenta$sanity$controls_ui$parameters_tab_$_state_machine__35848__auto____1.call(this,state_60762);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$controls_ui$parameters_tab_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$controls_ui$parameters_tab_$_state_machine__35848__auto____0;
org$numenta$sanity$controls_ui$parameters_tab_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$controls_ui$parameters_tab_$_state_machine__35848__auto____1;
return org$numenta$sanity$controls_ui$parameters_tab_$_state_machine__35848__auto__;
})()
;})(switch__35847__auto__,c__35961__auto__,spec_path,spec,vec__60739,sel_region,sel_layer,partypes))
})();
var state__35963__auto__ = (function (){var statearr_60771 = (f__35962__auto__.cljs$core$IFn$_invoke$arity$0 ? f__35962__auto__.cljs$core$IFn$_invoke$arity$0() : f__35962__auto__.call(null));
(statearr_60771[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__35961__auto__);

return statearr_60771;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__35963__auto__);
});})(c__35961__auto__,spec_path,spec,vec__60739,sel_region,sel_layer,partypes))
);

return c__35961__auto__;
})());
});})(spec_path,spec,vec__60739,sel_region,sel_layer,partypes))
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
return (function (state_60817){
var state_val_60818 = (state_60817[(1)]);
if((state_val_60818 === (1))){
var state_60817__$1 = state_60817;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_60817__$1,(2),response_c);
} else {
if((state_val_60818 === (2))){
var inst_60812 = (state_60817[(2)]);
var inst_60813 = clojure.walk.keywordize_keys(inst_60812);
var inst_60814 = (function (){var r = inst_60813;
return ((function (r,inst_60812,inst_60813,state_val_60818,c__35961__auto__,response_c){
return (function (p1__60793_SHARP_){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (r,inst_60812,inst_60813,state_val_60818,c__35961__auto__,response_c){
return (function (csh,p__60819){
var vec__60820 = p__60819;
var layer_path = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60820,(0),null);
var col_state_freqs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60820,(1),null);
return cljs.core.update.cljs$core$IFn$_invoke$arity$3(csh,layer_path,((function (vec__60820,layer_path,col_state_freqs,r,inst_60812,inst_60813,state_val_60818,c__35961__auto__,response_c){
return (function (csf_log){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2((function (){var or__4682__auto__ = csf_log;
if(cljs.core.truth_(or__4682__auto__)){
return or__4682__auto__;
} else {
return org.numenta.sanity.plots.empty_col_state_freqs_log();
}
})(),col_state_freqs);
});})(vec__60820,layer_path,col_state_freqs,r,inst_60812,inst_60813,state_val_60818,c__35961__auto__,response_c))
);
});})(r,inst_60812,inst_60813,state_val_60818,c__35961__auto__,response_c))
,p1__60793_SHARP_,r);
});
;})(r,inst_60812,inst_60813,state_val_60818,c__35961__auto__,response_c))
})();
var inst_60815 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(col_state_history,inst_60814);
var state_60817__$1 = state_60817;
return cljs.core.async.impl.ioc_helpers.return_chan(state_60817__$1,inst_60815);
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
var statearr_60824 = [null,null,null,null,null,null,null];
(statearr_60824[(0)] = org$numenta$sanity$controls_ui$gather_col_state_history_BANG__$_state_machine__35848__auto__);

(statearr_60824[(1)] = (1));

return statearr_60824;
});
var org$numenta$sanity$controls_ui$gather_col_state_history_BANG__$_state_machine__35848__auto____1 = (function (state_60817){
while(true){
var ret_value__35849__auto__ = (function (){try{while(true){
var result__35850__auto__ = switch__35847__auto__(state_60817);
if(cljs.core.keyword_identical_QMARK_(result__35850__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__35850__auto__;
}
break;
}
}catch (e60825){if((e60825 instanceof Object)){
var ex__35851__auto__ = e60825;
var statearr_60826_60828 = state_60817;
(statearr_60826_60828[(5)] = ex__35851__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_60817);

return cljs.core.cst$kw$recur;
} else {
throw e60825;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35849__auto__,cljs.core.cst$kw$recur)){
var G__60829 = state_60817;
state_60817 = G__60829;
continue;
} else {
return ret_value__35849__auto__;
}
break;
}
});
org$numenta$sanity$controls_ui$gather_col_state_history_BANG__$_state_machine__35848__auto__ = function(state_60817){
switch(arguments.length){
case 0:
return org$numenta$sanity$controls_ui$gather_col_state_history_BANG__$_state_machine__35848__auto____0.call(this);
case 1:
return org$numenta$sanity$controls_ui$gather_col_state_history_BANG__$_state_machine__35848__auto____1.call(this,state_60817);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$controls_ui$gather_col_state_history_BANG__$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$controls_ui$gather_col_state_history_BANG__$_state_machine__35848__auto____0;
org$numenta$sanity$controls_ui$gather_col_state_history_BANG__$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$controls_ui$gather_col_state_history_BANG__$_state_machine__35848__auto____1;
return org$numenta$sanity$controls_ui$gather_col_state_history_BANG__$_state_machine__35848__auto__;
})()
;})(switch__35847__auto__,c__35961__auto__,response_c))
})();
var state__35963__auto__ = (function (){var statearr_60827 = (f__35962__auto__.cljs$core$IFn$_invoke$arity$0 ? f__35962__auto__.cljs$core$IFn$_invoke$arity$0() : f__35962__auto__.call(null));
(statearr_60827[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__35961__auto__);

return statearr_60827;
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
return (function org$numenta$sanity$controls_ui$time_plots_tab_builder_$_time_plots_tab_$_iter__60872(s__60873){
return (new cljs.core.LazySeq(null,((function (col_state_history){
return (function (){
var s__60873__$1 = s__60873;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__60873__$1);
if(temp__4653__auto__){
var s__60873__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__60873__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__60873__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__60875 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__60874 = (0);
while(true){
if((i__60874 < size__5453__auto__)){
var vec__60882 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__60874);
var path = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60882,(0),null);
var csf_log = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60882,(1),null);
var vec__60883 = path;
var region_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60883,(0),null);
var layer_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60883,(1),null);
cljs.core.chunk_append(b__60875,cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$fieldset,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$legend,[cljs.core.str(cljs.core.name(region_key)),cljs.core.str(" "),cljs.core.str(cljs.core.name(layer_id))].join('')], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.plots.ts_freqs_plot_cmp,csf_log,series_colors], null)], null),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [region_key,layer_id], null)], null)));

var G__60886 = (i__60874 + (1));
i__60874 = G__60886;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__60875),org$numenta$sanity$controls_ui$time_plots_tab_builder_$_time_plots_tab_$_iter__60872(cljs.core.chunk_rest(s__60873__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__60875),null);
}
} else {
var vec__60884 = cljs.core.first(s__60873__$2);
var path = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60884,(0),null);
var csf_log = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60884,(1),null);
var vec__60885 = path;
var region_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60885,(0),null);
var layer_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60885,(1),null);
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$fieldset,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$legend,[cljs.core.str(cljs.core.name(region_key)),cljs.core.str(" "),cljs.core.str(cljs.core.name(layer_id))].join('')], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.plots.ts_freqs_plot_cmp,csf_log,series_colors], null)], null),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [region_key,layer_id], null)], null)),org$numenta$sanity$controls_ui$time_plots_tab_builder_$_time_plots_tab_$_iter__60872(cljs.core.rest(s__60873__$2)));
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
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_muted,"Plots of cell excitation broken down by source."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(step_template) : cljs.core.deref.call(null,step_template)))?(function (){var iter__5454__auto__ = (function org$numenta$sanity$controls_ui$sources_tab_$_iter__60900(s__60901){
return (new cljs.core.LazySeq(null,(function (){
var s__60901__$1 = s__60901;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__60901__$1);
if(temp__4653__auto__){
var xs__5201__auto__ = temp__4653__auto__;
var vec__60910 = cljs.core.first(xs__5201__auto__);
var region_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60910,(0),null);
var rgn = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60910,(1),null);
var iterys__5450__auto__ = ((function (s__60901__$1,vec__60910,region_key,rgn,xs__5201__auto__,temp__4653__auto__){
return (function org$numenta$sanity$controls_ui$sources_tab_$_iter__60900_$_iter__60902(s__60903){
return (new cljs.core.LazySeq(null,((function (s__60901__$1,vec__60910,region_key,rgn,xs__5201__auto__,temp__4653__auto__){
return (function (){
var s__60903__$1 = s__60903;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__60903__$1);
if(temp__4653__auto____$1){
var s__60903__$2 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__60903__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__60903__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__60905 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__60904 = (0);
while(true){
if((i__60904 < size__5453__auto__)){
var layer_id = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__60904);
cljs.core.chunk_append(b__60905,cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$fieldset,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$legend,[cljs.core.str(cljs.core.name(region_key)),cljs.core.str(" "),cljs.core.str(cljs.core.name(layer_id))].join('')], null),new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.plots.cell_excitation_plot_cmp,step_template,selection,series_colors,region_key,layer_id,into_journal], null)], null),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [region_key,layer_id], null)], null)));

var G__60913 = (i__60904 + (1));
i__60904 = G__60913;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__60905),org$numenta$sanity$controls_ui$sources_tab_$_iter__60900_$_iter__60902(cljs.core.chunk_rest(s__60903__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__60905),null);
}
} else {
var layer_id = cljs.core.first(s__60903__$2);
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$fieldset,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$legend,[cljs.core.str(cljs.core.name(region_key)),cljs.core.str(" "),cljs.core.str(cljs.core.name(layer_id))].join('')], null),new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.plots.cell_excitation_plot_cmp,step_template,selection,series_colors,region_key,layer_id,into_journal], null)], null),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [region_key,layer_id], null)], null)),org$numenta$sanity$controls_ui$sources_tab_$_iter__60900_$_iter__60902(cljs.core.rest(s__60903__$2)));
}
} else {
return null;
}
break;
}
});})(s__60901__$1,vec__60910,region_key,rgn,xs__5201__auto__,temp__4653__auto__))
,null,null));
});})(s__60901__$1,vec__60910,region_key,rgn,xs__5201__auto__,temp__4653__auto__))
;
var fs__5451__auto__ = cljs.core.seq(iterys__5450__auto__(cljs.core.keys(rgn)));
if(fs__5451__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5451__auto__,org$numenta$sanity$controls_ui$sources_tab_$_iter__60900(cljs.core.rest(s__60901__$1)));
} else {
var G__60914 = cljs.core.rest(s__60901__$1);
s__60901__$1 = G__60914;
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
var G__60917 = component;
var G__60918 = org.numenta.sanity.plots.cell_sdrs_plot_builder(steps,step_template,selection,into_journal,plot_opts);
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__60917,G__60918) : cljs.core.reset_BANG_.call(null,G__60917,G__60918));
});})(plot_opts,component))
;
var disable_BANG_ = ((function (plot_opts,component,enable_BANG_){
return (function (){
var teardown_BANG__60919 = cljs.core.cst$kw$teardown.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(component) : cljs.core.deref.call(null,component)));
(teardown_BANG__60919.cljs$core$IFn$_invoke$arity$0 ? teardown_BANG__60919.cljs$core$IFn$_invoke$arity$0() : teardown_BANG__60919.call(null));

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
var map__60936 = cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.selection.layer,sel));
var map__60936__$1 = ((((!((map__60936 == null)))?((((map__60936.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60936.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60936):map__60936);
var sel1 = map__60936__$1;
var model_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60936__$1,cljs.core.cst$kw$model_DASH_id);
var bit = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60936__$1,cljs.core.cst$kw$bit);
var vec__60937 = org.numenta.sanity.selection.layer(sel1);
var rgn_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60937,(0),null);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60937,(1),null);
if(cljs.core.truth_(lyr_id)){
var response_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(into_journal,new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, ["get-details-text",model_id,rgn_id,lyr_id,bit,org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$2(response_c,true)], null));

var c__35961__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__35961__auto__,response_c,map__60936,map__60936__$1,sel1,model_id,bit,vec__60937,rgn_id,lyr_id){
return (function (){
var f__35962__auto__ = (function (){var switch__35847__auto__ = ((function (c__35961__auto__,response_c,map__60936,map__60936__$1,sel1,model_id,bit,vec__60937,rgn_id,lyr_id){
return (function (state_60943){
var state_val_60944 = (state_60943[(1)]);
if((state_val_60944 === (1))){
var state_60943__$1 = state_60943;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_60943__$1,(2),response_c);
} else {
if((state_val_60944 === (2))){
var inst_60940 = (state_60943[(2)]);
var inst_60941 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(text_response,inst_60940) : cljs.core.reset_BANG_.call(null,text_response,inst_60940));
var state_60943__$1 = state_60943;
return cljs.core.async.impl.ioc_helpers.return_chan(state_60943__$1,inst_60941);
} else {
return null;
}
}
});})(c__35961__auto__,response_c,map__60936,map__60936__$1,sel1,model_id,bit,vec__60937,rgn_id,lyr_id))
;
return ((function (switch__35847__auto__,c__35961__auto__,response_c,map__60936,map__60936__$1,sel1,model_id,bit,vec__60937,rgn_id,lyr_id){
return (function() {
var org$numenta$sanity$controls_ui$fetch_details_text_BANG__$_state_machine__35848__auto__ = null;
var org$numenta$sanity$controls_ui$fetch_details_text_BANG__$_state_machine__35848__auto____0 = (function (){
var statearr_60948 = [null,null,null,null,null,null,null];
(statearr_60948[(0)] = org$numenta$sanity$controls_ui$fetch_details_text_BANG__$_state_machine__35848__auto__);

(statearr_60948[(1)] = (1));

return statearr_60948;
});
var org$numenta$sanity$controls_ui$fetch_details_text_BANG__$_state_machine__35848__auto____1 = (function (state_60943){
while(true){
var ret_value__35849__auto__ = (function (){try{while(true){
var result__35850__auto__ = switch__35847__auto__(state_60943);
if(cljs.core.keyword_identical_QMARK_(result__35850__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__35850__auto__;
}
break;
}
}catch (e60949){if((e60949 instanceof Object)){
var ex__35851__auto__ = e60949;
var statearr_60950_60952 = state_60943;
(statearr_60950_60952[(5)] = ex__35851__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_60943);

return cljs.core.cst$kw$recur;
} else {
throw e60949;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35849__auto__,cljs.core.cst$kw$recur)){
var G__60953 = state_60943;
state_60943 = G__60953;
continue;
} else {
return ret_value__35849__auto__;
}
break;
}
});
org$numenta$sanity$controls_ui$fetch_details_text_BANG__$_state_machine__35848__auto__ = function(state_60943){
switch(arguments.length){
case 0:
return org$numenta$sanity$controls_ui$fetch_details_text_BANG__$_state_machine__35848__auto____0.call(this);
case 1:
return org$numenta$sanity$controls_ui$fetch_details_text_BANG__$_state_machine__35848__auto____1.call(this,state_60943);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$controls_ui$fetch_details_text_BANG__$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$controls_ui$fetch_details_text_BANG__$_state_machine__35848__auto____0;
org$numenta$sanity$controls_ui$fetch_details_text_BANG__$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$controls_ui$fetch_details_text_BANG__$_state_machine__35848__auto____1;
return org$numenta$sanity$controls_ui$fetch_details_text_BANG__$_state_machine__35848__auto__;
})()
;})(switch__35847__auto__,c__35961__auto__,response_c,map__60936,map__60936__$1,sel1,model_id,bit,vec__60937,rgn_id,lyr_id))
})();
var state__35963__auto__ = (function (){var statearr_60951 = (f__35962__auto__.cljs$core$IFn$_invoke$arity$0 ? f__35962__auto__.cljs$core$IFn$_invoke$arity$0() : f__35962__auto__.call(null));
(statearr_60951[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__35961__auto__);

return statearr_60951;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__35963__auto__);
});})(c__35961__auto__,response_c,map__60936,map__60936__$1,sel1,model_id,bit,vec__60937,rgn_id,lyr_id))
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
return new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_muted,"The details of model state on the selected time step, selected column."], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$pre$pre_DASH_scrollable,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$height,"90vh",cljs.core.cst$kw$resize,"both"], null)], null),(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(text_response) : cljs.core.deref.call(null,text_response))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_muted,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,"(scrollable)"], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$hr], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_muted,"If you're brave:"], null),(function (){var map__60970 = cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.selection.layer,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selection) : cljs.core.deref.call(null,selection))));
var map__60970__$1 = ((((!((map__60970 == null)))?((((map__60970.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60970.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60970):map__60970);
var model_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60970__$1,cljs.core.cst$kw$model_DASH_id);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_warning$btn_DASH_block,(function (){var G__60972 = new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$on_DASH_click,((function (map__60970,map__60970__$1,model_id,text_response){
return (function (e){
var response_c_60986 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(into_journal,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$get_DASH_model,model_id,org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$2(response_c_60986,true),true], null));

var c__35961__auto___60987 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__35961__auto___60987,response_c_60986,map__60970,map__60970__$1,model_id,text_response){
return (function (){
var f__35962__auto__ = (function (){var switch__35847__auto__ = ((function (c__35961__auto___60987,response_c_60986,map__60970,map__60970__$1,model_id,text_response){
return (function (state_60977){
var state_val_60978 = (state_60977[(1)]);
if((state_val_60978 === (1))){
var state_60977__$1 = state_60977;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_60977__$1,(2),response_c_60986);
} else {
if((state_val_60978 === (2))){
var inst_60974 = (state_60977[(2)]);
var inst_60975 = cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([inst_60974], 0));
var state_60977__$1 = state_60977;
return cljs.core.async.impl.ioc_helpers.return_chan(state_60977__$1,inst_60975);
} else {
return null;
}
}
});})(c__35961__auto___60987,response_c_60986,map__60970,map__60970__$1,model_id,text_response))
;
return ((function (switch__35847__auto__,c__35961__auto___60987,response_c_60986,map__60970,map__60970__$1,model_id,text_response){
return (function() {
var org$numenta$sanity$controls_ui$details_tab_$_state_machine__35848__auto__ = null;
var org$numenta$sanity$controls_ui$details_tab_$_state_machine__35848__auto____0 = (function (){
var statearr_60982 = [null,null,null,null,null,null,null];
(statearr_60982[(0)] = org$numenta$sanity$controls_ui$details_tab_$_state_machine__35848__auto__);

(statearr_60982[(1)] = (1));

return statearr_60982;
});
var org$numenta$sanity$controls_ui$details_tab_$_state_machine__35848__auto____1 = (function (state_60977){
while(true){
var ret_value__35849__auto__ = (function (){try{while(true){
var result__35850__auto__ = switch__35847__auto__(state_60977);
if(cljs.core.keyword_identical_QMARK_(result__35850__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__35850__auto__;
}
break;
}
}catch (e60983){if((e60983 instanceof Object)){
var ex__35851__auto__ = e60983;
var statearr_60984_60988 = state_60977;
(statearr_60984_60988[(5)] = ex__35851__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_60977);

return cljs.core.cst$kw$recur;
} else {
throw e60983;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35849__auto__,cljs.core.cst$kw$recur)){
var G__60989 = state_60977;
state_60977 = G__60989;
continue;
} else {
return ret_value__35849__auto__;
}
break;
}
});
org$numenta$sanity$controls_ui$details_tab_$_state_machine__35848__auto__ = function(state_60977){
switch(arguments.length){
case 0:
return org$numenta$sanity$controls_ui$details_tab_$_state_machine__35848__auto____0.call(this);
case 1:
return org$numenta$sanity$controls_ui$details_tab_$_state_machine__35848__auto____1.call(this,state_60977);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$controls_ui$details_tab_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$controls_ui$details_tab_$_state_machine__35848__auto____0;
org$numenta$sanity$controls_ui$details_tab_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$controls_ui$details_tab_$_state_machine__35848__auto____1;
return org$numenta$sanity$controls_ui$details_tab_$_state_machine__35848__auto__;
})()
;})(switch__35847__auto__,c__35961__auto___60987,response_c_60986,map__60970,map__60970__$1,model_id,text_response))
})();
var state__35963__auto__ = (function (){var statearr_60985 = (f__35962__auto__.cljs$core$IFn$_invoke$arity$0 ? f__35962__auto__.cljs$core$IFn$_invoke$arity$0() : f__35962__auto__.call(null));
(statearr_60985[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__35961__auto___60987);

return statearr_60985;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__35963__auto__);
});})(c__35961__auto___60987,response_c_60986,map__60970,map__60970__$1,model_id,text_response))
);


return e.preventDefault();
});})(map__60970,map__60970__$1,model_id,text_response))
], null);
if(cljs.core.not(model_id)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__60972,cljs.core.cst$kw$disabled,"disabled");
} else {
return G__60972;
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
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_muted,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$margin_DASH_top,(15),cljs.core.cst$kw$margin_DASH_bottom,(15)], null)], null),"Choose data the server should capture."], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_forms.core.bind_fields,org.numenta.sanity.controls_ui.keep_steps_template,capture_options], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$row,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_lg_DASH_6$col_DASH_sm_DASH_12,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel$panel_DASH_default,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel_DASH_heading,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h4$panel_DASH_title,"Feed-forward synapses"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel_DASH_body,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_forms.core.bind_fields,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,org.numenta.sanity.controls_ui.t_chbox(cljs.core.cst$kw$ff_DASH_synapses$capture_QMARK_,"Save"),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$field,cljs.core.cst$kw$container,cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$margin_DASH_top,(-5)], null),cljs.core.cst$kw$visible_QMARK_,(function (p1__60990_SHARP_){
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(p1__60990_SHARP_,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$ff_DASH_synapses,cljs.core.cst$kw$capture_QMARK_], null));
})], null),org.numenta.sanity.controls_ui.t_chbox(cljs.core.cst$kw$ff_DASH_synapses$only_DASH_active_QMARK_,"Only if active"),org.numenta.sanity.controls_ui.t_chbox(cljs.core.cst$kw$ff_DASH_synapses$only_DASH_connected_QMARK_,"Only if connected")], null)], null),capture_options], null)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_lg_DASH_6$col_DASH_sm_DASH_12,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel$panel_DASH_default,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel_DASH_heading,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h4$panel_DASH_title,"Distal synapses"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel_DASH_body,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_forms.core.bind_fields,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,org.numenta.sanity.controls_ui.t_chbox(cljs.core.cst$kw$distal_DASH_synapses$capture_QMARK_,"Save"),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$field,cljs.core.cst$kw$container,cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$margin_DASH_top,(-5)], null),cljs.core.cst$kw$visible_QMARK_,(function (p1__60991_SHARP_){
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(p1__60991_SHARP_,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$distal_DASH_synapses,cljs.core.cst$kw$capture_QMARK_], null));
})], null),org.numenta.sanity.controls_ui.t_chbox(cljs.core.cst$kw$distal_DASH_synapses$only_DASH_active_QMARK_,"Only if active"),org.numenta.sanity.controls_ui.t_chbox(cljs.core.cst$kw$distal_DASH_synapses$only_DASH_connected_QMARK_,"Only if connected"),org.numenta.sanity.controls_ui.t_chbox(cljs.core.cst$kw$distal_DASH_synapses$only_DASH_noteworthy_DASH_columns_QMARK_,"Only active / predicted columns")], null)], null),capture_options], null)], null)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$row,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_lg_DASH_6$col_DASH_sm_DASH_12,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel$panel_DASH_default,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel_DASH_heading,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h4$panel_DASH_title,"Apical synapses"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel_DASH_body,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_forms.core.bind_fields,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,org.numenta.sanity.controls_ui.t_chbox(cljs.core.cst$kw$apical_DASH_synapses$capture_QMARK_,"Save"),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$field,cljs.core.cst$kw$container,cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$margin_DASH_top,(-5)], null),cljs.core.cst$kw$visible_QMARK_,(function (p1__60992_SHARP_){
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(p1__60992_SHARP_,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$apical_DASH_synapses,cljs.core.cst$kw$capture_QMARK_], null));
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
var len__5740__auto___60996 = arguments.length;
var i__5741__auto___60997 = (0);
while(true){
if((i__5741__auto___60997 < len__5740__auto___60996)){
args__5747__auto__.push((arguments[i__5741__auto___60997]));

var G__60998 = (i__5741__auto___60997 + (1));
i__5741__auto___60997 = G__60998;
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

org.numenta.sanity.controls_ui.send_command.cljs$lang$applyTo = (function (seq60993){
var G__60994 = cljs.core.first(seq60993);
var seq60993__$1 = cljs.core.next(seq60993);
var G__60995 = cljs.core.first(seq60993__$1);
var seq60993__$2 = cljs.core.next(seq60993__$1);
return org.numenta.sanity.controls_ui.send_command.cljs$core$IFn$_invoke$arity$variadic(G__60994,G__60995,seq60993__$2);
});
org.numenta.sanity.controls_ui.gather_start_data_BANG_ = (function org$numenta$sanity$controls_ui$gather_start_data_BANG_(run_start,steps){
var G__61001 = run_start;
var G__61002 = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$time,org.numenta.sanity.controls_ui.now(),cljs.core.cst$kw$timestep,cljs.core.cst$kw$timestep.cljs$core$IFn$_invoke$arity$1(cljs.core.first(steps))], null);
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__61001,G__61002) : cljs.core.reset_BANG_.call(null,G__61001,G__61002));
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

var c__35961__auto___61091 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__35961__auto___61091,has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c){
return (function (){
var f__35962__auto__ = (function (){var switch__35847__auto__ = ((function (c__35961__auto___61091,has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c){
return (function (state_61061){
var state_val_61062 = (state_61061[(1)]);
if((state_val_61062 === (1))){
var state_61061__$1 = state_61061;
var statearr_61063_61092 = state_61061__$1;
(statearr_61063_61092[(2)] = null);

(statearr_61063_61092[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_61062 === (2))){
var state_61061__$1 = state_61061;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_61061__$1,(4),subscriber_c);
} else {
if((state_val_61062 === (3))){
var inst_61059 = (state_61061[(2)]);
var state_61061__$1 = state_61061;
return cljs.core.async.impl.ioc_helpers.return_chan(state_61061__$1,inst_61059);
} else {
if((state_val_61062 === (4))){
var inst_61049 = (state_61061[(7)]);
var inst_61049__$1 = (state_61061[(2)]);
var state_61061__$1 = (function (){var statearr_61064 = state_61061;
(statearr_61064[(7)] = inst_61049__$1);

return statearr_61064;
})();
if(cljs.core.truth_(inst_61049__$1)){
var statearr_61065_61093 = state_61061__$1;
(statearr_61065_61093[(1)] = (5));

} else {
var statearr_61066_61094 = state_61061__$1;
(statearr_61066_61094[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_61062 === (5))){
var inst_61049 = (state_61061[(7)]);
var inst_61052 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_61049,(0),null);
var inst_61053 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(going_QMARK_,inst_61052) : cljs.core.reset_BANG_.call(null,going_QMARK_,inst_61052));
var state_61061__$1 = (function (){var statearr_61067 = state_61061;
(statearr_61067[(8)] = inst_61053);

return statearr_61067;
})();
var statearr_61068_61095 = state_61061__$1;
(statearr_61068_61095[(2)] = null);

(statearr_61068_61095[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_61062 === (6))){
var state_61061__$1 = state_61061;
var statearr_61069_61096 = state_61061__$1;
(statearr_61069_61096[(2)] = null);

(statearr_61069_61096[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_61062 === (7))){
var inst_61057 = (state_61061[(2)]);
var state_61061__$1 = state_61061;
var statearr_61070_61097 = state_61061__$1;
(statearr_61070_61097[(2)] = inst_61057);

(statearr_61070_61097[(1)] = (3));


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
});})(c__35961__auto___61091,has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c))
;
return ((function (switch__35847__auto__,c__35961__auto___61091,has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c){
return (function() {
var org$numenta$sanity$controls_ui$navbar_$_state_machine__35848__auto__ = null;
var org$numenta$sanity$controls_ui$navbar_$_state_machine__35848__auto____0 = (function (){
var statearr_61074 = [null,null,null,null,null,null,null,null,null];
(statearr_61074[(0)] = org$numenta$sanity$controls_ui$navbar_$_state_machine__35848__auto__);

(statearr_61074[(1)] = (1));

return statearr_61074;
});
var org$numenta$sanity$controls_ui$navbar_$_state_machine__35848__auto____1 = (function (state_61061){
while(true){
var ret_value__35849__auto__ = (function (){try{while(true){
var result__35850__auto__ = switch__35847__auto__(state_61061);
if(cljs.core.keyword_identical_QMARK_(result__35850__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__35850__auto__;
}
break;
}
}catch (e61075){if((e61075 instanceof Object)){
var ex__35851__auto__ = e61075;
var statearr_61076_61098 = state_61061;
(statearr_61076_61098[(5)] = ex__35851__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_61061);

return cljs.core.cst$kw$recur;
} else {
throw e61075;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35849__auto__,cljs.core.cst$kw$recur)){
var G__61099 = state_61061;
state_61061 = G__61099;
continue;
} else {
return ret_value__35849__auto__;
}
break;
}
});
org$numenta$sanity$controls_ui$navbar_$_state_machine__35848__auto__ = function(state_61061){
switch(arguments.length){
case 0:
return org$numenta$sanity$controls_ui$navbar_$_state_machine__35848__auto____0.call(this);
case 1:
return org$numenta$sanity$controls_ui$navbar_$_state_machine__35848__auto____1.call(this,state_61061);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$controls_ui$navbar_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$controls_ui$navbar_$_state_machine__35848__auto____0;
org$numenta$sanity$controls_ui$navbar_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$controls_ui$navbar_$_state_machine__35848__auto____1;
return org$numenta$sanity$controls_ui$navbar_$_state_machine__35848__auto__;
})()
;})(switch__35847__auto__,c__35961__auto___61091,has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c))
})();
var state__35963__auto__ = (function (){var statearr_61077 = (f__35962__auto__.cljs$core$IFn$_invoke$arity$0 ? f__35962__auto__.cljs$core$IFn$_invoke$arity$0() : f__35962__auto__.call(null));
(statearr_61077[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__35961__auto___61091);

return statearr_61077;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__35963__auto__);
});})(c__35961__auto___61091,has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c))
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
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$nav$navbar$navbar_DASH_default,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$container_DASH_fluid,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$navbar_DASH_header,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$navbar_DASH_toggle$collapsed,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$data_DASH_toggle,"collapse",cljs.core.cst$kw$data_DASH_target,"#comportex-navbar-collapse"], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$icon_DASH_bar], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$icon_DASH_bar], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$icon_DASH_bar], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$a$navbar_DASH_brand,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$href,"https://github.com/nupic-community/sanity"], null),title], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$collapse$navbar_DASH_collapse,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$id,"comportex-navbar-collapse"], null),new cljs.core.PersistentVector(null, 16, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$ul$nav$navbar_DASH_nav,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_default$navbar_DASH_btn,(function (){var G__61078 = new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,cljs.core.cst$kw$button,cljs.core.cst$kw$on_DASH_click,org.numenta.sanity.controls_ui.send_command(into_viz,cljs.core.cst$kw$step_DASH_backward),cljs.core.cst$kw$title,"Step backward in time"], null);
if(cljs.core.not((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(step_template) : cljs.core.deref.call(null,step_template)))){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__61078,cljs.core.cst$kw$disabled,"disabled");
} else {
return G__61078;
}
})(),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$glyphicon$glyphicon_DASH_step_DASH_backward,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$aria_DASH_hidden,"true"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$visible_DASH_xs_DASH_inline," Step backward"], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_default$navbar_DASH_btn,(function (){var G__61079 = new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,cljs.core.cst$kw$button,cljs.core.cst$kw$on_DASH_click,org.numenta.sanity.controls_ui.send_command(into_viz,cljs.core.cst$kw$step_DASH_forward),cljs.core.cst$kw$title,"Step forward in time"], null);
if(cljs.core.not((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(step_template) : cljs.core.deref.call(null,step_template)))){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__61079,cljs.core.cst$kw$disabled,"disabled");
} else {
return G__61079;
}
})(),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$glyphicon$glyphicon_DASH_step_DASH_forward,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$aria_DASH_hidden,"true"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$visible_DASH_xs_DASH_inline," Step forward"], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(going_QMARK_) : cljs.core.deref.call(null,going_QMARK_)))?null:new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$class,"hidden"], null)),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_default$navbar_DASH_btn,(function (){var G__61080 = new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,cljs.core.cst$kw$button,cljs.core.cst$kw$on_DASH_click,((function (has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c){
return (function (){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(into_sim,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["pause"], null));
});})(has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c))
,cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$width,"5em"], null)], null);
if(cljs.core.not((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(step_template) : cljs.core.deref.call(null,step_template)))){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__61080,cljs.core.cst$kw$disabled,"disabled");
} else {
return G__61080;
}
})(),"Pause"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(going_QMARK_) : cljs.core.deref.call(null,going_QMARK_)))?new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$class,"hidden"], null):null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_primary$navbar_DASH_btn,(function (){var G__61081 = new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,cljs.core.cst$kw$button,cljs.core.cst$kw$on_DASH_click,((function (has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c){
return (function (){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(into_sim,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["run"], null));
});})(has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c))
,cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$width,"5em"], null)], null);
if(cljs.core.not((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(step_template) : cljs.core.deref.call(null,step_template)))){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__61081,cljs.core.cst$kw$disabled,"disabled");
} else {
return G__61081;
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
var seq__61082_61100 = cljs.core.seq(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$1(goog.dom.getElementsByClass("viz-expandable")));
var chunk__61083_61101 = null;
var count__61084_61102 = (0);
var i__61085_61103 = (0);
while(true){
if((i__61085_61103 < count__61084_61102)){
var el_61104 = chunk__61083_61101.cljs$core$IIndexed$_nth$arity$2(null,i__61085_61103);
goog.dom.classes.swap(el_61104,"col-sm-9","col-sm-12");

var G__61105 = seq__61082_61100;
var G__61106 = chunk__61083_61101;
var G__61107 = count__61084_61102;
var G__61108 = (i__61085_61103 + (1));
seq__61082_61100 = G__61105;
chunk__61083_61101 = G__61106;
count__61084_61102 = G__61107;
i__61085_61103 = G__61108;
continue;
} else {
var temp__4653__auto___61109 = cljs.core.seq(seq__61082_61100);
if(temp__4653__auto___61109){
var seq__61082_61110__$1 = temp__4653__auto___61109;
if(cljs.core.chunked_seq_QMARK_(seq__61082_61110__$1)){
var c__5485__auto___61111 = cljs.core.chunk_first(seq__61082_61110__$1);
var G__61112 = cljs.core.chunk_rest(seq__61082_61110__$1);
var G__61113 = c__5485__auto___61111;
var G__61114 = cljs.core.count(c__5485__auto___61111);
var G__61115 = (0);
seq__61082_61100 = G__61112;
chunk__61083_61101 = G__61113;
count__61084_61102 = G__61114;
i__61085_61103 = G__61115;
continue;
} else {
var el_61116 = cljs.core.first(seq__61082_61110__$1);
goog.dom.classes.swap(el_61116,"col-sm-9","col-sm-12");

var G__61117 = cljs.core.next(seq__61082_61110__$1);
var G__61118 = null;
var G__61119 = (0);
var G__61120 = (0);
seq__61082_61100 = G__61117;
chunk__61083_61101 = G__61118;
count__61084_61102 = G__61119;
i__61085_61103 = G__61120;
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
var seq__61086_61121 = cljs.core.seq(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$1(goog.dom.getElementsByClass("viz-expandable")));
var chunk__61087_61122 = null;
var count__61088_61123 = (0);
var i__61089_61124 = (0);
while(true){
if((i__61089_61124 < count__61088_61123)){
var el_61125 = chunk__61087_61122.cljs$core$IIndexed$_nth$arity$2(null,i__61089_61124);
goog.dom.classes.swap(el_61125,"col-sm-12","col-sm-9");

var G__61126 = seq__61086_61121;
var G__61127 = chunk__61087_61122;
var G__61128 = count__61088_61123;
var G__61129 = (i__61089_61124 + (1));
seq__61086_61121 = G__61126;
chunk__61087_61122 = G__61127;
count__61088_61123 = G__61128;
i__61089_61124 = G__61129;
continue;
} else {
var temp__4653__auto___61130 = cljs.core.seq(seq__61086_61121);
if(temp__4653__auto___61130){
var seq__61086_61131__$1 = temp__4653__auto___61130;
if(cljs.core.chunked_seq_QMARK_(seq__61086_61131__$1)){
var c__5485__auto___61132 = cljs.core.chunk_first(seq__61086_61131__$1);
var G__61133 = cljs.core.chunk_rest(seq__61086_61131__$1);
var G__61134 = c__5485__auto___61132;
var G__61135 = cljs.core.count(c__5485__auto___61132);
var G__61136 = (0);
seq__61086_61121 = G__61133;
chunk__61087_61122 = G__61134;
count__61088_61123 = G__61135;
i__61089_61124 = G__61136;
continue;
} else {
var el_61137 = cljs.core.first(seq__61086_61131__$1);
goog.dom.classes.swap(el_61137,"col-sm-12","col-sm-9");

var G__61138 = cljs.core.next(seq__61086_61131__$1);
var G__61139 = null;
var G__61140 = (0);
var G__61141 = (0);
seq__61086_61121 = G__61138;
chunk__61087_61122 = G__61139;
count__61088_61123 = G__61140;
i__61089_61124 = G__61141;
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
], null),"limit to 1 step/sec."], null)], null)], null)], null):null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_default$navbar_DASH_btn,(function (){var G__61090 = new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,cljs.core.cst$kw$button,cljs.core.cst$kw$on_DASH_click,((function (has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c){
return (function (e){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(show_help,cljs.core.not);

return e.preventDefault();
});})(has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c))
,cljs.core.cst$kw$title,"Help"], null);
if(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(show_help) : cljs.core.deref.call(null,show_help)))){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__61090,cljs.core.cst$kw$class,"active");
} else {
return G__61090;
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
return (function org$numenta$sanity$controls_ui$tabs_$_iter__61155(s__61156){
return (new cljs.core.LazySeq(null,((function (current_tab){
return (function (){
var s__61156__$1 = s__61156;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__61156__$1);
if(temp__4653__auto__){
var s__61156__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__61156__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__61156__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__61158 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__61157 = (0);
while(true){
if((i__61157 < size__5453__auto__)){
var vec__61163 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__61157);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61163,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61163,(1),null);
cljs.core.chunk_append(b__61158,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$role,"presentation",cljs.core.cst$kw$class,((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(current_tab) : cljs.core.deref.call(null,current_tab)),k))?"active":null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$a,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$href,"#",cljs.core.cst$kw$on_DASH_click,((function (i__61157,vec__61163,k,_,c__5452__auto__,size__5453__auto__,b__61158,s__61156__$2,temp__4653__auto__,current_tab){
return (function (e){
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(current_tab,k) : cljs.core.reset_BANG_.call(null,current_tab,k));

return e.preventDefault();
});})(i__61157,vec__61163,k,_,c__5452__auto__,size__5453__auto__,b__61158,s__61156__$2,temp__4653__auto__,current_tab))
], null),cljs.core.name(k)], null)], null));

var G__61168 = (i__61157 + (1));
i__61157 = G__61168;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__61158),org$numenta$sanity$controls_ui$tabs_$_iter__61155(cljs.core.chunk_rest(s__61156__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__61158),null);
}
} else {
var vec__61164 = cljs.core.first(s__61156__$2);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61164,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61164,(1),null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$role,"presentation",cljs.core.cst$kw$class,((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(current_tab) : cljs.core.deref.call(null,current_tab)),k))?"active":null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$a,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$href,"#",cljs.core.cst$kw$on_DASH_click,((function (vec__61164,k,_,s__61156__$2,temp__4653__auto__,current_tab){
return (function (e){
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(current_tab,k) : cljs.core.reset_BANG_.call(null,current_tab,k));

return e.preventDefault();
});})(vec__61164,k,_,s__61156__$2,temp__4653__auto__,current_tab))
], null),cljs.core.name(k)], null)], null),org$numenta$sanity$controls_ui$tabs_$_iter__61155(cljs.core.rest(s__61156__$2)));
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
})())], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$tabs,(function (){var vec__61165 = cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2(((function (current_tab){
return (function (p__61166){
var vec__61167 = p__61166;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61167,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61167,(1),null);
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(current_tab) : cljs.core.deref.call(null,current_tab)),k);
});})(current_tab))
,tab_cmps__$1));
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61165,(0),null);
var cmp = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61165,(1),null);
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
