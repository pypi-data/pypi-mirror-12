// Compiled by ClojureScript 1.7.170 {:static-fns true, :optimize-constants true}
goog.provide('org.numenta.sanity.demos.runner');
goog.require('cljs.core');
goog.require('goog.dom');
goog.require('reagent.core');
goog.require('org.numenta.sanity.main');
goog.require('org.numenta.sanity.bridge.remote');
goog.require('org.numenta.sanity.util');
goog.require('cljs.core.async');
org.numenta.sanity.demos.runner.key_value_display = (function org$numenta$sanity$demos$runner$key_value_display(k,v){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$margin_DASH_top,(20)], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$font_DASH_family,"sans-serif",cljs.core.cst$kw$font_DASH_size,"9px",cljs.core.cst$kw$font_DASH_weight,"bold"], null)], null),k], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$br], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$strong,v], null)], null)], null);
});
org.numenta.sanity.demos.runner.world_pane = (function org$numenta$sanity$demos$runner$world_pane(steps,selection){
if(cljs.core.truth_(cljs.core.not_empty((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(steps) : cljs.core.deref.call(null,steps))))){
var step = org.numenta.sanity.main.selected_step.cljs$core$IFn$_invoke$arity$2(steps,selection);
var kvs = (function (){var temp__4651__auto__ = cljs.core.cst$kw$display_DASH_value.cljs$core$IFn$_invoke$arity$1(step);
if(cljs.core.truth_(temp__4651__auto__)){
var display_value = temp__4651__auto__;
return cljs.core.seq(display_value);
} else {
if(cljs.core.truth_(cljs.core.cst$kw$input_DASH_value.cljs$core$IFn$_invoke$arity$1(step))){
var iter__5454__auto__ = ((function (temp__4651__auto__,step){
return (function org$numenta$sanity$demos$runner$world_pane_$_iter__61654(s__61655){
return (new cljs.core.LazySeq(null,((function (temp__4651__auto__,step){
return (function (){
var s__61655__$1 = s__61655;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__61655__$1);
if(temp__4653__auto__){
var s__61655__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__61655__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__61655__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__61657 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__61656 = (0);
while(true){
if((i__61656 < size__5453__auto__)){
var vec__61662 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__61656);
var sense_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61662,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61662,(1),null);
cljs.core.chunk_append(b__61657,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.name(sense_id),[cljs.core.str(v)].join('')], null));

var G__61674 = (i__61656 + (1));
i__61656 = G__61674;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__61657),org$numenta$sanity$demos$runner$world_pane_$_iter__61654(cljs.core.chunk_rest(s__61655__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__61657),null);
}
} else {
var vec__61663 = cljs.core.first(s__61655__$2);
var sense_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61663,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61663,(1),null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.name(sense_id),[cljs.core.str(v)].join('')], null),org$numenta$sanity$demos$runner$world_pane_$_iter__61654(cljs.core.rest(s__61655__$2)));
}
} else {
return null;
}
break;
}
});})(temp__4651__auto__,step))
,null,null));
});})(temp__4651__auto__,step))
;
return iter__5454__auto__(cljs.core.cst$kw$sensed_DASH_values.cljs$core$IFn$_invoke$arity$1(step));
} else {
return null;
}
}
})();
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div], null),(function (){var iter__5454__auto__ = ((function (step,kvs){
return (function org$numenta$sanity$demos$runner$world_pane_$_iter__61664(s__61665){
return (new cljs.core.LazySeq(null,((function (step,kvs){
return (function (){
var s__61665__$1 = s__61665;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__61665__$1);
if(temp__4653__auto__){
var s__61665__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__61665__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__61665__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__61667 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__61666 = (0);
while(true){
if((i__61666 < size__5453__auto__)){
var vec__61672 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__61666);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61672,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61672,(1),null);
cljs.core.chunk_append(b__61667,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.runner.key_value_display,k,v], null));

var G__61675 = (i__61666 + (1));
i__61666 = G__61675;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__61667),org$numenta$sanity$demos$runner$world_pane_$_iter__61664(cljs.core.chunk_rest(s__61665__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__61667),null);
}
} else {
var vec__61673 = cljs.core.first(s__61665__$2);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61673,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61673,(1),null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.runner.key_value_display,k,v], null),org$numenta$sanity$demos$runner$world_pane_$_iter__61664(cljs.core.rest(s__61665__$2)));
}
} else {
return null;
}
break;
}
});})(step,kvs))
,null,null));
});})(step,kvs))
;
return iter__5454__auto__(kvs);
})());
} else {
return null;
}
});
org.numenta.sanity.demos.runner.init = (function org$numenta$sanity$demos$runner$init(var_args){
var args__5747__auto__ = [];
var len__5740__auto___61713 = arguments.length;
var i__5741__auto___61714 = (0);
while(true){
if((i__5741__auto___61714 < len__5740__auto___61713)){
args__5747__auto__.push((arguments[i__5741__auto___61714]));

var G__61715 = (i__5741__auto___61714 + (1));
i__5741__auto___61714 = G__61715;
continue;
} else {
}
break;
}

var argseq__5748__auto__ = ((((2) < args__5747__auto__.length))?(new cljs.core.IndexedSeq(args__5747__auto__.slice((2)),(0))):null);
return org.numenta.sanity.demos.runner.init.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__5748__auto__);
});
goog.exportSymbol('org.numenta.sanity.demos.runner.init', org.numenta.sanity.demos.runner.init);

org.numenta.sanity.demos.runner.init.cljs$core$IFn$_invoke$arity$variadic = (function (title,ws_url,feature_list){
var into_sim_in = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
var into_sim_mult = cljs.core.async.mult(into_sim_in);
var into_sim_eavesdrop = org.numenta.sanity.util.tap_c(into_sim_mult);
var into_journal = org.numenta.sanity.main.into_journal;
var pipe_to_remote_target_BANG_ = org.numenta.sanity.bridge.remote.init(ws_url);
var features = cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1(cljs.core.keyword),feature_list);
(pipe_to_remote_target_BANG_.cljs$core$IFn$_invoke$arity$2 ? pipe_to_remote_target_BANG_.cljs$core$IFn$_invoke$arity$2("journal",into_journal) : pipe_to_remote_target_BANG_.call(null,"journal",into_journal));

var G__61679_61716 = "simulation";
var G__61680_61717 = org.numenta.sanity.util.tap_c(into_sim_mult);
(pipe_to_remote_target_BANG_.cljs$core$IFn$_invoke$arity$2 ? pipe_to_remote_target_BANG_.cljs$core$IFn$_invoke$arity$2(G__61679_61716,G__61680_61717) : pipe_to_remote_target_BANG_.call(null,G__61679_61716,G__61680_61717));

var c__36154__auto___61718 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__36154__auto___61718,into_sim_in,into_sim_mult,into_sim_eavesdrop,into_journal,pipe_to_remote_target_BANG_,features){
return (function (){
var f__36155__auto__ = (function (){var switch__36040__auto__ = ((function (c__36154__auto___61718,into_sim_in,into_sim_mult,into_sim_eavesdrop,into_journal,pipe_to_remote_target_BANG_,features){
return (function (state_61697){
var state_val_61698 = (state_61697[(1)]);
if((state_val_61698 === (1))){
var state_61697__$1 = state_61697;
var statearr_61699_61719 = state_61697__$1;
(statearr_61699_61719[(2)] = null);

(statearr_61699_61719[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_61698 === (2))){
var state_61697__$1 = state_61697;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_61697__$1,(4),into_sim_eavesdrop);
} else {
if((state_val_61698 === (3))){
var inst_61695 = (state_61697[(2)]);
var state_61697__$1 = state_61697;
return cljs.core.async.impl.ioc_helpers.return_chan(state_61697__$1,inst_61695);
} else {
if((state_val_61698 === (4))){
var inst_61683 = (state_61697[(2)]);
var inst_61684 = (inst_61683 == null);
var state_61697__$1 = state_61697;
if(cljs.core.truth_(inst_61684)){
var statearr_61700_61720 = state_61697__$1;
(statearr_61700_61720[(1)] = (5));

} else {
var statearr_61701_61721 = state_61697__$1;
(statearr_61701_61721[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_61698 === (5))){
var state_61697__$1 = state_61697;
var statearr_61702_61722 = state_61697__$1;
(statearr_61702_61722[(2)] = null);

(statearr_61702_61722[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_61698 === (6))){
var inst_61687 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_61688 = ["ping"];
var inst_61689 = (new cljs.core.PersistentVector(null,1,(5),inst_61687,inst_61688,null));
var inst_61690 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(into_journal,inst_61689);
var state_61697__$1 = (function (){var statearr_61703 = state_61697;
(statearr_61703[(7)] = inst_61690);

return statearr_61703;
})();
var statearr_61704_61723 = state_61697__$1;
(statearr_61704_61723[(2)] = null);

(statearr_61704_61723[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_61698 === (7))){
var inst_61693 = (state_61697[(2)]);
var state_61697__$1 = state_61697;
var statearr_61705_61724 = state_61697__$1;
(statearr_61705_61724[(2)] = inst_61693);

(statearr_61705_61724[(1)] = (3));


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
});})(c__36154__auto___61718,into_sim_in,into_sim_mult,into_sim_eavesdrop,into_journal,pipe_to_remote_target_BANG_,features))
;
return ((function (switch__36040__auto__,c__36154__auto___61718,into_sim_in,into_sim_mult,into_sim_eavesdrop,into_journal,pipe_to_remote_target_BANG_,features){
return (function() {
var org$numenta$sanity$demos$runner$state_machine__36041__auto__ = null;
var org$numenta$sanity$demos$runner$state_machine__36041__auto____0 = (function (){
var statearr_61709 = [null,null,null,null,null,null,null,null];
(statearr_61709[(0)] = org$numenta$sanity$demos$runner$state_machine__36041__auto__);

(statearr_61709[(1)] = (1));

return statearr_61709;
});
var org$numenta$sanity$demos$runner$state_machine__36041__auto____1 = (function (state_61697){
while(true){
var ret_value__36042__auto__ = (function (){try{while(true){
var result__36043__auto__ = switch__36040__auto__(state_61697);
if(cljs.core.keyword_identical_QMARK_(result__36043__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__36043__auto__;
}
break;
}
}catch (e61710){if((e61710 instanceof Object)){
var ex__36044__auto__ = e61710;
var statearr_61711_61725 = state_61697;
(statearr_61711_61725[(5)] = ex__36044__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_61697);

return cljs.core.cst$kw$recur;
} else {
throw e61710;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__36042__auto__,cljs.core.cst$kw$recur)){
var G__61726 = state_61697;
state_61697 = G__61726;
continue;
} else {
return ret_value__36042__auto__;
}
break;
}
});
org$numenta$sanity$demos$runner$state_machine__36041__auto__ = function(state_61697){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$runner$state_machine__36041__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$runner$state_machine__36041__auto____1.call(this,state_61697);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$runner$state_machine__36041__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$runner$state_machine__36041__auto____0;
org$numenta$sanity$demos$runner$state_machine__36041__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$runner$state_machine__36041__auto____1;
return org$numenta$sanity$demos$runner$state_machine__36041__auto__;
})()
;})(switch__36040__auto__,c__36154__auto___61718,into_sim_in,into_sim_mult,into_sim_eavesdrop,into_journal,pipe_to_remote_target_BANG_,features))
})();
var state__36156__auto__ = (function (){var statearr_61712 = (f__36155__auto__.cljs$core$IFn$_invoke$arity$0 ? f__36155__auto__.cljs$core$IFn$_invoke$arity$0() : f__36155__auto__.call(null));
(statearr_61712[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__36154__auto___61718);

return statearr_61712;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__36156__auto__);
});})(c__36154__auto___61718,into_sim_in,into_sim_mult,into_sim_eavesdrop,into_journal,pipe_to_remote_target_BANG_,features))
);


return reagent.core.render.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.main.sanity_app,title,null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.runner.world_pane,org.numenta.sanity.main.steps,org.numenta.sanity.main.selection], null),features,into_sim_in], null),goog.dom.getElement("sanity-app"));
});

org.numenta.sanity.demos.runner.init.cljs$lang$maxFixedArity = (2);

org.numenta.sanity.demos.runner.init.cljs$lang$applyTo = (function (seq61676){
var G__61677 = cljs.core.first(seq61676);
var seq61676__$1 = cljs.core.next(seq61676);
var G__61678 = cljs.core.first(seq61676__$1);
var seq61676__$2 = cljs.core.next(seq61676__$1);
return org.numenta.sanity.demos.runner.init.cljs$core$IFn$_invoke$arity$variadic(G__61677,G__61678,seq61676__$2);
});
