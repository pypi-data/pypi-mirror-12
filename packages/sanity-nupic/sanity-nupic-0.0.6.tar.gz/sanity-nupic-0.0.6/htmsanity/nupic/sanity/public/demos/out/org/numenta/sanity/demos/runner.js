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
return (function org$numenta$sanity$demos$runner$world_pane_$_iter__61661(s__61662){
return (new cljs.core.LazySeq(null,((function (temp__4651__auto__,step){
return (function (){
var s__61662__$1 = s__61662;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__61662__$1);
if(temp__4653__auto__){
var s__61662__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__61662__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__61662__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__61664 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__61663 = (0);
while(true){
if((i__61663 < size__5453__auto__)){
var vec__61669 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__61663);
var sense_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61669,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61669,(1),null);
cljs.core.chunk_append(b__61664,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.name(sense_id),[cljs.core.str(v)].join('')], null));

var G__61681 = (i__61663 + (1));
i__61663 = G__61681;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__61664),org$numenta$sanity$demos$runner$world_pane_$_iter__61661(cljs.core.chunk_rest(s__61662__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__61664),null);
}
} else {
var vec__61670 = cljs.core.first(s__61662__$2);
var sense_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61670,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61670,(1),null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.name(sense_id),[cljs.core.str(v)].join('')], null),org$numenta$sanity$demos$runner$world_pane_$_iter__61661(cljs.core.rest(s__61662__$2)));
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
return (function org$numenta$sanity$demos$runner$world_pane_$_iter__61671(s__61672){
return (new cljs.core.LazySeq(null,((function (step,kvs){
return (function (){
var s__61672__$1 = s__61672;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__61672__$1);
if(temp__4653__auto__){
var s__61672__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__61672__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__61672__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__61674 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__61673 = (0);
while(true){
if((i__61673 < size__5453__auto__)){
var vec__61679 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__61673);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61679,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61679,(1),null);
cljs.core.chunk_append(b__61674,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.runner.key_value_display,k,v], null));

var G__61682 = (i__61673 + (1));
i__61673 = G__61682;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__61674),org$numenta$sanity$demos$runner$world_pane_$_iter__61671(cljs.core.chunk_rest(s__61672__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__61674),null);
}
} else {
var vec__61680 = cljs.core.first(s__61672__$2);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61680,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61680,(1),null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.runner.key_value_display,k,v], null),org$numenta$sanity$demos$runner$world_pane_$_iter__61671(cljs.core.rest(s__61672__$2)));
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
var len__5740__auto___61720 = arguments.length;
var i__5741__auto___61721 = (0);
while(true){
if((i__5741__auto___61721 < len__5740__auto___61720)){
args__5747__auto__.push((arguments[i__5741__auto___61721]));

var G__61722 = (i__5741__auto___61721 + (1));
i__5741__auto___61721 = G__61722;
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

var G__61686_61723 = "simulation";
var G__61687_61724 = org.numenta.sanity.util.tap_c(into_sim_mult);
(pipe_to_remote_target_BANG_.cljs$core$IFn$_invoke$arity$2 ? pipe_to_remote_target_BANG_.cljs$core$IFn$_invoke$arity$2(G__61686_61723,G__61687_61724) : pipe_to_remote_target_BANG_.call(null,G__61686_61723,G__61687_61724));

var c__35961__auto___61725 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__35961__auto___61725,into_sim_in,into_sim_mult,into_sim_eavesdrop,into_journal,pipe_to_remote_target_BANG_,features){
return (function (){
var f__35962__auto__ = (function (){var switch__35847__auto__ = ((function (c__35961__auto___61725,into_sim_in,into_sim_mult,into_sim_eavesdrop,into_journal,pipe_to_remote_target_BANG_,features){
return (function (state_61704){
var state_val_61705 = (state_61704[(1)]);
if((state_val_61705 === (1))){
var state_61704__$1 = state_61704;
var statearr_61706_61726 = state_61704__$1;
(statearr_61706_61726[(2)] = null);

(statearr_61706_61726[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_61705 === (2))){
var state_61704__$1 = state_61704;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_61704__$1,(4),into_sim_eavesdrop);
} else {
if((state_val_61705 === (3))){
var inst_61702 = (state_61704[(2)]);
var state_61704__$1 = state_61704;
return cljs.core.async.impl.ioc_helpers.return_chan(state_61704__$1,inst_61702);
} else {
if((state_val_61705 === (4))){
var inst_61690 = (state_61704[(2)]);
var inst_61691 = (inst_61690 == null);
var state_61704__$1 = state_61704;
if(cljs.core.truth_(inst_61691)){
var statearr_61707_61727 = state_61704__$1;
(statearr_61707_61727[(1)] = (5));

} else {
var statearr_61708_61728 = state_61704__$1;
(statearr_61708_61728[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_61705 === (5))){
var state_61704__$1 = state_61704;
var statearr_61709_61729 = state_61704__$1;
(statearr_61709_61729[(2)] = null);

(statearr_61709_61729[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_61705 === (6))){
var inst_61694 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_61695 = ["ping"];
var inst_61696 = (new cljs.core.PersistentVector(null,1,(5),inst_61694,inst_61695,null));
var inst_61697 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(into_journal,inst_61696);
var state_61704__$1 = (function (){var statearr_61710 = state_61704;
(statearr_61710[(7)] = inst_61697);

return statearr_61710;
})();
var statearr_61711_61730 = state_61704__$1;
(statearr_61711_61730[(2)] = null);

(statearr_61711_61730[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_61705 === (7))){
var inst_61700 = (state_61704[(2)]);
var state_61704__$1 = state_61704;
var statearr_61712_61731 = state_61704__$1;
(statearr_61712_61731[(2)] = inst_61700);

(statearr_61712_61731[(1)] = (3));


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
});})(c__35961__auto___61725,into_sim_in,into_sim_mult,into_sim_eavesdrop,into_journal,pipe_to_remote_target_BANG_,features))
;
return ((function (switch__35847__auto__,c__35961__auto___61725,into_sim_in,into_sim_mult,into_sim_eavesdrop,into_journal,pipe_to_remote_target_BANG_,features){
return (function() {
var org$numenta$sanity$demos$runner$state_machine__35848__auto__ = null;
var org$numenta$sanity$demos$runner$state_machine__35848__auto____0 = (function (){
var statearr_61716 = [null,null,null,null,null,null,null,null];
(statearr_61716[(0)] = org$numenta$sanity$demos$runner$state_machine__35848__auto__);

(statearr_61716[(1)] = (1));

return statearr_61716;
});
var org$numenta$sanity$demos$runner$state_machine__35848__auto____1 = (function (state_61704){
while(true){
var ret_value__35849__auto__ = (function (){try{while(true){
var result__35850__auto__ = switch__35847__auto__(state_61704);
if(cljs.core.keyword_identical_QMARK_(result__35850__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__35850__auto__;
}
break;
}
}catch (e61717){if((e61717 instanceof Object)){
var ex__35851__auto__ = e61717;
var statearr_61718_61732 = state_61704;
(statearr_61718_61732[(5)] = ex__35851__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_61704);

return cljs.core.cst$kw$recur;
} else {
throw e61717;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35849__auto__,cljs.core.cst$kw$recur)){
var G__61733 = state_61704;
state_61704 = G__61733;
continue;
} else {
return ret_value__35849__auto__;
}
break;
}
});
org$numenta$sanity$demos$runner$state_machine__35848__auto__ = function(state_61704){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$runner$state_machine__35848__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$runner$state_machine__35848__auto____1.call(this,state_61704);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$runner$state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$runner$state_machine__35848__auto____0;
org$numenta$sanity$demos$runner$state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$runner$state_machine__35848__auto____1;
return org$numenta$sanity$demos$runner$state_machine__35848__auto__;
})()
;})(switch__35847__auto__,c__35961__auto___61725,into_sim_in,into_sim_mult,into_sim_eavesdrop,into_journal,pipe_to_remote_target_BANG_,features))
})();
var state__35963__auto__ = (function (){var statearr_61719 = (f__35962__auto__.cljs$core$IFn$_invoke$arity$0 ? f__35962__auto__.cljs$core$IFn$_invoke$arity$0() : f__35962__auto__.call(null));
(statearr_61719[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__35961__auto___61725);

return statearr_61719;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__35963__auto__);
});})(c__35961__auto___61725,into_sim_in,into_sim_mult,into_sim_eavesdrop,into_journal,pipe_to_remote_target_BANG_,features))
);


return reagent.core.render.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.main.sanity_app,title,null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.runner.world_pane,org.numenta.sanity.main.steps,org.numenta.sanity.main.selection], null),features,into_sim_in], null),goog.dom.getElement("sanity-app"));
});

org.numenta.sanity.demos.runner.init.cljs$lang$maxFixedArity = (2);

org.numenta.sanity.demos.runner.init.cljs$lang$applyTo = (function (seq61683){
var G__61684 = cljs.core.first(seq61683);
var seq61683__$1 = cljs.core.next(seq61683);
var G__61685 = cljs.core.first(seq61683__$1);
var seq61683__$2 = cljs.core.next(seq61683__$1);
return org.numenta.sanity.demos.runner.init.cljs$core$IFn$_invoke$arity$variadic(G__61684,G__61685,seq61683__$2);
});
