// Compiled by ClojureScript 1.7.170 {:static-fns true, :optimize-constants true}
goog.provide('org.numenta.sanity.helpers');
goog.require('cljs.core');
goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('reagent.core');
goog.require('org.nfrac.comportex.protocols');
goog.require('org.numenta.sanity.util');
goog.require('cljs.core.async');
goog.require('org.nfrac.comportex.core');
goog.require('goog.events');
goog.require('org.nfrac.comportex.util');
goog.require('goog.style');
org.numenta.sanity.helpers.loading_message_element = (function org$numenta$sanity$helpers$loading_message_element(){
return goog.dom.getElement("loading-message");
});
org.numenta.sanity.helpers.show = (function org$numenta$sanity$helpers$show(el){
return goog.dom.classes.add(el,"show");
});
org.numenta.sanity.helpers.hide = (function org$numenta$sanity$helpers$hide(el){
return goog.dom.classes.remove(el,"show");
});
org.numenta.sanity.helpers.ui_loading_message_until = (function org$numenta$sanity$helpers$ui_loading_message_until(finished_c){
var el = org.numenta.sanity.helpers.loading_message_element();
org.numenta.sanity.helpers.show(el);

var c__35961__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__35961__auto__,el){
return (function (){
var f__35962__auto__ = (function (){var switch__35847__auto__ = ((function (c__35961__auto__,el){
return (function (state_40113){
var state_val_40114 = (state_40113[(1)]);
if((state_val_40114 === (1))){
var state_40113__$1 = state_40113;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_40113__$1,(2),finished_c);
} else {
if((state_val_40114 === (2))){
var inst_40110 = (state_40113[(2)]);
var inst_40111 = org.numenta.sanity.helpers.hide(el);
var state_40113__$1 = (function (){var statearr_40115 = state_40113;
(statearr_40115[(7)] = inst_40111);

return statearr_40115;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_40113__$1,inst_40110);
} else {
return null;
}
}
});})(c__35961__auto__,el))
;
return ((function (switch__35847__auto__,c__35961__auto__,el){
return (function() {
var org$numenta$sanity$helpers$ui_loading_message_until_$_state_machine__35848__auto__ = null;
var org$numenta$sanity$helpers$ui_loading_message_until_$_state_machine__35848__auto____0 = (function (){
var statearr_40119 = [null,null,null,null,null,null,null,null];
(statearr_40119[(0)] = org$numenta$sanity$helpers$ui_loading_message_until_$_state_machine__35848__auto__);

(statearr_40119[(1)] = (1));

return statearr_40119;
});
var org$numenta$sanity$helpers$ui_loading_message_until_$_state_machine__35848__auto____1 = (function (state_40113){
while(true){
var ret_value__35849__auto__ = (function (){try{while(true){
var result__35850__auto__ = switch__35847__auto__(state_40113);
if(cljs.core.keyword_identical_QMARK_(result__35850__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__35850__auto__;
}
break;
}
}catch (e40120){if((e40120 instanceof Object)){
var ex__35851__auto__ = e40120;
var statearr_40121_40123 = state_40113;
(statearr_40121_40123[(5)] = ex__35851__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_40113);

return cljs.core.cst$kw$recur;
} else {
throw e40120;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35849__auto__,cljs.core.cst$kw$recur)){
var G__40124 = state_40113;
state_40113 = G__40124;
continue;
} else {
return ret_value__35849__auto__;
}
break;
}
});
org$numenta$sanity$helpers$ui_loading_message_until_$_state_machine__35848__auto__ = function(state_40113){
switch(arguments.length){
case 0:
return org$numenta$sanity$helpers$ui_loading_message_until_$_state_machine__35848__auto____0.call(this);
case 1:
return org$numenta$sanity$helpers$ui_loading_message_until_$_state_machine__35848__auto____1.call(this,state_40113);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$helpers$ui_loading_message_until_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$helpers$ui_loading_message_until_$_state_machine__35848__auto____0;
org$numenta$sanity$helpers$ui_loading_message_until_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$helpers$ui_loading_message_until_$_state_machine__35848__auto____1;
return org$numenta$sanity$helpers$ui_loading_message_until_$_state_machine__35848__auto__;
})()
;})(switch__35847__auto__,c__35961__auto__,el))
})();
var state__35963__auto__ = (function (){var statearr_40122 = (f__35962__auto__.cljs$core$IFn$_invoke$arity$0 ? f__35962__auto__.cljs$core$IFn$_invoke$arity$0() : f__35962__auto__.call(null));
(statearr_40122[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__35961__auto__);

return statearr_40122;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__35963__auto__);
});})(c__35961__auto__,el))
);

return c__35961__auto__;
});
org.numenta.sanity.helpers.with_ui_loading_message = (function org$numenta$sanity$helpers$with_ui_loading_message(f){
return org.numenta.sanity.helpers.ui_loading_message_until((function (){var c__35961__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__35961__auto__){
return (function (){
var f__35962__auto__ = (function (){var switch__35847__auto__ = ((function (c__35961__auto__){
return (function (state_40145){
var state_val_40146 = (state_40145[(1)]);
if((state_val_40146 === (1))){
var inst_40140 = cljs.core.async.timeout((100));
var state_40145__$1 = state_40145;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_40145__$1,(2),inst_40140);
} else {
if((state_val_40146 === (2))){
var inst_40142 = (state_40145[(2)]);
var inst_40143 = (f.cljs$core$IFn$_invoke$arity$0 ? f.cljs$core$IFn$_invoke$arity$0() : f.call(null));
var state_40145__$1 = (function (){var statearr_40147 = state_40145;
(statearr_40147[(7)] = inst_40142);

return statearr_40147;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_40145__$1,inst_40143);
} else {
return null;
}
}
});})(c__35961__auto__))
;
return ((function (switch__35847__auto__,c__35961__auto__){
return (function() {
var org$numenta$sanity$helpers$with_ui_loading_message_$_state_machine__35848__auto__ = null;
var org$numenta$sanity$helpers$with_ui_loading_message_$_state_machine__35848__auto____0 = (function (){
var statearr_40151 = [null,null,null,null,null,null,null,null];
(statearr_40151[(0)] = org$numenta$sanity$helpers$with_ui_loading_message_$_state_machine__35848__auto__);

(statearr_40151[(1)] = (1));

return statearr_40151;
});
var org$numenta$sanity$helpers$with_ui_loading_message_$_state_machine__35848__auto____1 = (function (state_40145){
while(true){
var ret_value__35849__auto__ = (function (){try{while(true){
var result__35850__auto__ = switch__35847__auto__(state_40145);
if(cljs.core.keyword_identical_QMARK_(result__35850__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__35850__auto__;
}
break;
}
}catch (e40152){if((e40152 instanceof Object)){
var ex__35851__auto__ = e40152;
var statearr_40153_40155 = state_40145;
(statearr_40153_40155[(5)] = ex__35851__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_40145);

return cljs.core.cst$kw$recur;
} else {
throw e40152;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35849__auto__,cljs.core.cst$kw$recur)){
var G__40156 = state_40145;
state_40145 = G__40156;
continue;
} else {
return ret_value__35849__auto__;
}
break;
}
});
org$numenta$sanity$helpers$with_ui_loading_message_$_state_machine__35848__auto__ = function(state_40145){
switch(arguments.length){
case 0:
return org$numenta$sanity$helpers$with_ui_loading_message_$_state_machine__35848__auto____0.call(this);
case 1:
return org$numenta$sanity$helpers$with_ui_loading_message_$_state_machine__35848__auto____1.call(this,state_40145);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$helpers$with_ui_loading_message_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$helpers$with_ui_loading_message_$_state_machine__35848__auto____0;
org$numenta$sanity$helpers$with_ui_loading_message_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$helpers$with_ui_loading_message_$_state_machine__35848__auto____1;
return org$numenta$sanity$helpers$with_ui_loading_message_$_state_machine__35848__auto__;
})()
;})(switch__35847__auto__,c__35961__auto__))
})();
var state__35963__auto__ = (function (){var statearr_40154 = (f__35962__auto__.cljs$core$IFn$_invoke$arity$0 ? f__35962__auto__.cljs$core$IFn$_invoke$arity$0() : f__35962__auto__.call(null));
(statearr_40154[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__35961__auto__);

return statearr_40154;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__35963__auto__);
});})(c__35961__auto__))
);

return c__35961__auto__;
})());
});
org.numenta.sanity.helpers.text_world_input_component = (function org$numenta$sanity$helpers$text_world_input_component(inval,htm,max_shown,scroll_every,separator){
var time = org.nfrac.comportex.protocols.timestep(htm);
var show_n = (max_shown - cljs.core.mod((max_shown - time),scroll_every));
var history = cljs.core.take_last(show_n,cljs.core.cst$kw$history.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(inval)));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,(function (){var iter__5454__auto__ = ((function (time,show_n,history){
return (function org$numenta$sanity$helpers$text_world_input_component_$_iter__40167(s__40168){
return (new cljs.core.LazySeq(null,((function (time,show_n,history){
return (function (){
var s__40168__$1 = s__40168;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__40168__$1);
if(temp__4653__auto__){
var s__40168__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__40168__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__40168__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__40170 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__40169 = (0);
while(true){
if((i__40169 < size__5453__auto__)){
var vec__40175 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__40169);
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40175,(0),null);
var word = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40175,(1),null);
var t = (i + (time - (cljs.core.count(history) - (1))));
var curr_QMARK_ = (time === t);
cljs.core.chunk_append(b__40170,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [((curr_QMARK_)?cljs.core.cst$kw$ins:cljs.core.cst$kw$span),[cljs.core.str(word),cljs.core.str(separator)].join('')], null),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,[cljs.core.str(word),cljs.core.str(t)].join('')], null)));

var G__40177 = (i__40169 + (1));
i__40169 = G__40177;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__40170),org$numenta$sanity$helpers$text_world_input_component_$_iter__40167(cljs.core.chunk_rest(s__40168__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__40170),null);
}
} else {
var vec__40176 = cljs.core.first(s__40168__$2);
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40176,(0),null);
var word = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40176,(1),null);
var t = (i + (time - (cljs.core.count(history) - (1))));
var curr_QMARK_ = (time === t);
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [((curr_QMARK_)?cljs.core.cst$kw$ins:cljs.core.cst$kw$span),[cljs.core.str(word),cljs.core.str(separator)].join('')], null),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,[cljs.core.str(word),cljs.core.str(t)].join('')], null)),org$numenta$sanity$helpers$text_world_input_component_$_iter__40167(cljs.core.rest(s__40168__$2)));
}
} else {
return null;
}
break;
}
});})(time,show_n,history))
,null,null));
});})(time,show_n,history))
;
return iter__5454__auto__(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(cljs.core.vector,history));
})()], null);
});
org.numenta.sanity.helpers.predictions_table = (function org$numenta$sanity$helpers$predictions_table(predictions){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$table$table,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tbody,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$th,"prediction"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$th,"votes %"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$th,"votes per bit"], null)], null),(function (){var iter__5454__auto__ = (function org$numenta$sanity$helpers$predictions_table_$_iter__40196(s__40197){
return (new cljs.core.LazySeq(null,(function (){
var s__40197__$1 = s__40197;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__40197__$1);
if(temp__4653__auto__){
var s__40197__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__40197__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__40197__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__40199 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__40198 = (0);
while(true){
if((i__40198 < size__5453__auto__)){
var vec__40208 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__40198);
var j = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40208,(0),null);
var map__40209 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40208,(1),null);
var map__40209__$1 = ((((!((map__40209 == null)))?((((map__40209.cljs$lang$protocol_mask$partition0$ & (64))) || (map__40209.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__40209):map__40209);
var value = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40209__$1,cljs.core.cst$kw$value);
var votes_frac = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40209__$1,cljs.core.cst$kw$votes_DASH_frac);
var votes_per_bit = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40209__$1,cljs.core.cst$kw$votes_DASH_per_DASH_bit);
cljs.core.chunk_append(b__40199,(function (){var txt = value;
return cljs.core.with_meta(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,txt], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td$text_DASH_right,[cljs.core.str(org.nfrac.comportex.util.round.cljs$core$IFn$_invoke$arity$1((votes_frac * (100))))].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td$text_DASH_right,[cljs.core.str(org.nfrac.comportex.util.round.cljs$core$IFn$_invoke$arity$1(votes_per_bit))].join('')], null)], null),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,[cljs.core.str(txt),cljs.core.str(j)].join('')], null));
})());

var G__40214 = (i__40198 + (1));
i__40198 = G__40214;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__40199),org$numenta$sanity$helpers$predictions_table_$_iter__40196(cljs.core.chunk_rest(s__40197__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__40199),null);
}
} else {
var vec__40211 = cljs.core.first(s__40197__$2);
var j = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40211,(0),null);
var map__40212 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40211,(1),null);
var map__40212__$1 = ((((!((map__40212 == null)))?((((map__40212.cljs$lang$protocol_mask$partition0$ & (64))) || (map__40212.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__40212):map__40212);
var value = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40212__$1,cljs.core.cst$kw$value);
var votes_frac = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40212__$1,cljs.core.cst$kw$votes_DASH_frac);
var votes_per_bit = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40212__$1,cljs.core.cst$kw$votes_DASH_per_DASH_bit);
return cljs.core.cons((function (){var txt = value;
return cljs.core.with_meta(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,txt], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td$text_DASH_right,[cljs.core.str(org.nfrac.comportex.util.round.cljs$core$IFn$_invoke$arity$1((votes_frac * (100))))].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td$text_DASH_right,[cljs.core.str(org.nfrac.comportex.util.round.cljs$core$IFn$_invoke$arity$1(votes_per_bit))].join('')], null)], null),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,[cljs.core.str(txt),cljs.core.str(j)].join('')], null));
})(),org$numenta$sanity$helpers$predictions_table_$_iter__40196(cljs.core.rest(s__40197__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5454__auto__(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(cljs.core.vector,predictions));
})()], null)], null)], null);
});
org.numenta.sanity.helpers.text_world_predictions_component = (function org$numenta$sanity$helpers$text_world_predictions_component(htm,n_predictions){
var vec__40216 = cljs.core.first(cljs.core.vals(cljs.core.cst$kw$sensors.cljs$core$IFn$_invoke$arity$1(htm)));
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40216,(0),null);
var e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40216,(1),null);
var rgn = cljs.core.first(org.nfrac.comportex.core.region_seq(htm));
var pr_votes = org.nfrac.comportex.core.predicted_bit_votes(rgn);
var predictions = org.nfrac.comportex.protocols.decode(e,pr_votes,n_predictions);
return org.numenta.sanity.helpers.predictions_table(predictions);
});
org.numenta.sanity.helpers.canvas$call_draw_fn = (function org$numenta$sanity$helpers$canvas$call_draw_fn(component){
var vec__40219 = reagent.core.argv(component);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40219,(0),null);
var ___$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40219,(1),null);
var ___$2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40219,(2),null);
var ___$3 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40219,(3),null);
var ___$4 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40219,(4),null);
var draw = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40219,(5),null);
var G__40220 = reagent.core.dom_node(component).getContext("2d");
return (draw.cljs$core$IFn$_invoke$arity$1 ? draw.cljs$core$IFn$_invoke$arity$1(G__40220) : draw.call(null,G__40220));
});
org.numenta.sanity.helpers.canvas = (function org$numenta$sanity$helpers$canvas(_,___$1,___$2,___$3,___$4){
return reagent.core.create_class(new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$component_DASH_did_DASH_mount,(function (p1__40221_SHARP_){
return org.numenta.sanity.helpers.canvas$call_draw_fn(p1__40221_SHARP_);
}),cljs.core.cst$kw$component_DASH_did_DASH_update,(function (p1__40222_SHARP_){
return org.numenta.sanity.helpers.canvas$call_draw_fn(p1__40222_SHARP_);
}),cljs.core.cst$kw$display_DASH_name,"canvas",cljs.core.cst$kw$reagent_DASH_render,(function (props,width,height,canaries,___$5){
var seq__40229_40235 = cljs.core.seq(canaries);
var chunk__40230_40236 = null;
var count__40231_40237 = (0);
var i__40232_40238 = (0);
while(true){
if((i__40232_40238 < count__40231_40237)){
var v_40239 = chunk__40230_40236.cljs$core$IIndexed$_nth$arity$2(null,i__40232_40238);
if(((!((v_40239 == null)))?((((v_40239.cljs$lang$protocol_mask$partition0$ & (32768))) || (v_40239.cljs$core$IDeref$))?true:(((!v_40239.cljs$lang$protocol_mask$partition0$))?cljs.core.native_satisfies_QMARK_(cljs.core.IDeref,v_40239):false)):cljs.core.native_satisfies_QMARK_(cljs.core.IDeref,v_40239))){
(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(v_40239) : cljs.core.deref.call(null,v_40239));
} else {
}

var G__40240 = seq__40229_40235;
var G__40241 = chunk__40230_40236;
var G__40242 = count__40231_40237;
var G__40243 = (i__40232_40238 + (1));
seq__40229_40235 = G__40240;
chunk__40230_40236 = G__40241;
count__40231_40237 = G__40242;
i__40232_40238 = G__40243;
continue;
} else {
var temp__4653__auto___40244 = cljs.core.seq(seq__40229_40235);
if(temp__4653__auto___40244){
var seq__40229_40245__$1 = temp__4653__auto___40244;
if(cljs.core.chunked_seq_QMARK_(seq__40229_40245__$1)){
var c__5485__auto___40246 = cljs.core.chunk_first(seq__40229_40245__$1);
var G__40247 = cljs.core.chunk_rest(seq__40229_40245__$1);
var G__40248 = c__5485__auto___40246;
var G__40249 = cljs.core.count(c__5485__auto___40246);
var G__40250 = (0);
seq__40229_40235 = G__40247;
chunk__40230_40236 = G__40248;
count__40231_40237 = G__40249;
i__40232_40238 = G__40250;
continue;
} else {
var v_40251 = cljs.core.first(seq__40229_40245__$1);
if(((!((v_40251 == null)))?((((v_40251.cljs$lang$protocol_mask$partition0$ & (32768))) || (v_40251.cljs$core$IDeref$))?true:(((!v_40251.cljs$lang$protocol_mask$partition0$))?cljs.core.native_satisfies_QMARK_(cljs.core.IDeref,v_40251):false)):cljs.core.native_satisfies_QMARK_(cljs.core.IDeref,v_40251))){
(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(v_40251) : cljs.core.deref.call(null,v_40251));
} else {
}

var G__40252 = cljs.core.next(seq__40229_40245__$1);
var G__40253 = null;
var G__40254 = (0);
var G__40255 = (0);
seq__40229_40235 = G__40252;
chunk__40230_40236 = G__40253;
count__40231_40237 = G__40254;
i__40232_40238 = G__40255;
continue;
}
} else {
}
}
break;
}

return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$canvas,cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(props,cljs.core.cst$kw$width,width,cljs.core.array_seq([cljs.core.cst$kw$height,height], 0))], null);
})], null));
});
org.numenta.sanity.helpers.window_resize_listener = (function org$numenta$sanity$helpers$window_resize_listener(resizes_c){

var resize_key = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
return reagent.core.create_class(new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$component_DASH_did_DASH_mount,((function (resize_key){
return (function (component){
var G__40268 = resize_key;
var G__40269 = (function (){var G__40270 = window;
var G__40271 = "resize";
var G__40272 = ((function (G__40270,G__40271,G__40268,resize_key){
return (function (){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(resizes_c,cljs.core.cst$kw$window_DASH_resized);
});})(G__40270,G__40271,G__40268,resize_key))
;
return goog.events.listen(G__40270,G__40271,G__40272);
})();
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__40268,G__40269) : cljs.core.reset_BANG_.call(null,G__40268,G__40269));
});})(resize_key))
,cljs.core.cst$kw$component_DASH_will_DASH_unmount,((function (resize_key){
return (function (){
if(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(resize_key) : cljs.core.deref.call(null,resize_key)))){
var G__40273 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(resize_key) : cljs.core.deref.call(null,resize_key));
return goog.events.unlistenByKey(G__40273);
} else {
return null;
}
});})(resize_key))
,cljs.core.cst$kw$display_DASH_name,"window-resize-listener",cljs.core.cst$kw$reagent_DASH_render,((function (resize_key){
return (function (_){
return null;
});})(resize_key))
], null));
});
org.numenta.sanity.helpers.resizing_canvas$call_draw_fn = (function org$numenta$sanity$helpers$resizing_canvas$call_draw_fn(component){
var vec__40276 = reagent.core.argv(component);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40276,(0),null);
var ___$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40276,(1),null);
var ___$2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40276,(2),null);
var draw = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40276,(3),null);
var ___$3 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40276,(4),null);
var G__40277 = reagent.core.dom_node(component).getContext("2d");
return (draw.cljs$core$IFn$_invoke$arity$1 ? draw.cljs$core$IFn$_invoke$arity$1(G__40277) : draw.call(null,G__40277));
});
org.numenta.sanity.helpers.resizing_canvas = (function org$numenta$sanity$helpers$resizing_canvas(_,___$1,___$2,invalidates_c,resizes){

var width_px = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
var height_px = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
var invalidates_c__$1 = (function (){var or__4682__auto__ = invalidates_c;
if(cljs.core.truth_(or__4682__auto__)){
return or__4682__auto__;
} else {
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
}
})();
var teardown_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
return reagent.core.create_class(new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$component_DASH_did_DASH_mount,((function (width_px,height_px,invalidates_c__$1,teardown_c){
return (function (component){
var c__35961__auto___40465 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__35961__auto___40465,width_px,height_px,invalidates_c__$1,teardown_c){
return (function (){
var f__35962__auto__ = (function (){var switch__35847__auto__ = ((function (c__35961__auto___40465,width_px,height_px,invalidates_c__$1,teardown_c){
return (function (state_40424){
var state_val_40425 = (state_40424[(1)]);
if((state_val_40425 === (7))){
var inst_40399 = (state_40424[(2)]);
var inst_40400 = (inst_40399 == null);
var inst_40401 = cljs.core.not(inst_40400);
var state_40424__$1 = state_40424;
if(inst_40401){
var statearr_40426_40466 = state_40424__$1;
(statearr_40426_40466[(1)] = (14));

} else {
var statearr_40427_40467 = state_40424__$1;
(statearr_40427_40467[(1)] = (15));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_40425 === (1))){
var state_40424__$1 = state_40424;
var statearr_40428_40468 = state_40424__$1;
(statearr_40428_40468[(2)] = null);

(statearr_40428_40468[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_40425 === (4))){
var inst_40384 = (state_40424[(7)]);
var inst_40382 = (state_40424[(2)]);
var inst_40383 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_40382,(0),null);
var inst_40384__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_40382,(1),null);
var inst_40385 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_40384__$1,teardown_c);
var state_40424__$1 = (function (){var statearr_40429 = state_40424;
(statearr_40429[(8)] = inst_40383);

(statearr_40429[(7)] = inst_40384__$1);

return statearr_40429;
})();
if(inst_40385){
var statearr_40430_40469 = state_40424__$1;
(statearr_40430_40469[(1)] = (5));

} else {
var statearr_40431_40470 = state_40424__$1;
(statearr_40431_40470[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_40425 === (15))){
var state_40424__$1 = state_40424;
var statearr_40432_40471 = state_40424__$1;
(statearr_40432_40471[(2)] = null);

(statearr_40432_40471[(1)] = (16));


return cljs.core.cst$kw$recur;
} else {
if((state_val_40425 === (13))){
var inst_40395 = (state_40424[(2)]);
var state_40424__$1 = state_40424;
var statearr_40433_40472 = state_40424__$1;
(statearr_40433_40472[(2)] = inst_40395);

(statearr_40433_40472[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_40425 === (6))){
var inst_40384 = (state_40424[(7)]);
var inst_40388 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_40384,invalidates_c__$1);
var state_40424__$1 = state_40424;
if(inst_40388){
var statearr_40434_40473 = state_40424__$1;
(statearr_40434_40473[(1)] = (8));

} else {
var statearr_40435_40474 = state_40424__$1;
(statearr_40435_40474[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_40425 === (17))){
var inst_40406 = (state_40424[(9)]);
var inst_40405 = (state_40424[(10)]);
var inst_40410 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_40411 = [inst_40405,inst_40406];
var inst_40412 = (new cljs.core.PersistentVector(null,2,(5),inst_40410,inst_40411,null));
var inst_40413 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(resizes,inst_40412);
var state_40424__$1 = state_40424;
var statearr_40436_40475 = state_40424__$1;
(statearr_40436_40475[(2)] = inst_40413);

(statearr_40436_40475[(1)] = (19));


return cljs.core.cst$kw$recur;
} else {
if((state_val_40425 === (3))){
var inst_40422 = (state_40424[(2)]);
var state_40424__$1 = state_40424;
return cljs.core.async.impl.ioc_helpers.return_chan(state_40424__$1,inst_40422);
} else {
if((state_val_40425 === (12))){
var state_40424__$1 = state_40424;
var statearr_40437_40476 = state_40424__$1;
(statearr_40437_40476[(2)] = null);

(statearr_40437_40476[(1)] = (13));


return cljs.core.cst$kw$recur;
} else {
if((state_val_40425 === (2))){
var inst_40378 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_40379 = [teardown_c,invalidates_c__$1];
var inst_40380 = (new cljs.core.PersistentVector(null,2,(5),inst_40378,inst_40379,null));
var state_40424__$1 = state_40424;
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic(state_40424__$1,(4),inst_40380,cljs.core.array_seq([cljs.core.cst$kw$priority,true], 0));
} else {
if((state_val_40425 === (19))){
var inst_40416 = (state_40424[(2)]);
var state_40424__$1 = (function (){var statearr_40438 = state_40424;
(statearr_40438[(11)] = inst_40416);

return statearr_40438;
})();
var statearr_40439_40477 = state_40424__$1;
(statearr_40439_40477[(2)] = null);

(statearr_40439_40477[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_40425 === (11))){
var inst_40383 = (state_40424[(8)]);
var state_40424__$1 = state_40424;
var statearr_40440_40478 = state_40424__$1;
(statearr_40440_40478[(2)] = inst_40383);

(statearr_40440_40478[(1)] = (13));


return cljs.core.cst$kw$recur;
} else {
if((state_val_40425 === (9))){
var inst_40384 = (state_40424[(7)]);
var inst_40391 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_40384,cljs.core.cst$kw$default);
var state_40424__$1 = state_40424;
if(inst_40391){
var statearr_40441_40479 = state_40424__$1;
(statearr_40441_40479[(1)] = (11));

} else {
var statearr_40442_40480 = state_40424__$1;
(statearr_40442_40480[(1)] = (12));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_40425 === (5))){
var state_40424__$1 = state_40424;
var statearr_40443_40481 = state_40424__$1;
(statearr_40443_40481[(2)] = null);

(statearr_40443_40481[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_40425 === (14))){
var inst_40406 = (state_40424[(9)]);
var inst_40405 = (state_40424[(10)]);
var inst_40403 = reagent.core.dom_node(component);
var inst_40404 = goog.style.getSize(inst_40403);
var inst_40405__$1 = inst_40404.width;
var inst_40406__$1 = inst_40404.height;
var inst_40407 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(width_px,inst_40405__$1) : cljs.core.reset_BANG_.call(null,width_px,inst_40405__$1));
var inst_40408 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(height_px,inst_40406__$1) : cljs.core.reset_BANG_.call(null,height_px,inst_40406__$1));
var state_40424__$1 = (function (){var statearr_40444 = state_40424;
(statearr_40444[(9)] = inst_40406__$1);

(statearr_40444[(10)] = inst_40405__$1);

(statearr_40444[(12)] = inst_40407);

(statearr_40444[(13)] = inst_40408);

return statearr_40444;
})();
if(cljs.core.truth_(resizes)){
var statearr_40445_40482 = state_40424__$1;
(statearr_40445_40482[(1)] = (17));

} else {
var statearr_40446_40483 = state_40424__$1;
(statearr_40446_40483[(1)] = (18));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_40425 === (16))){
var inst_40420 = (state_40424[(2)]);
var state_40424__$1 = state_40424;
var statearr_40447_40484 = state_40424__$1;
(statearr_40447_40484[(2)] = inst_40420);

(statearr_40447_40484[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_40425 === (10))){
var inst_40397 = (state_40424[(2)]);
var state_40424__$1 = state_40424;
var statearr_40448_40485 = state_40424__$1;
(statearr_40448_40485[(2)] = inst_40397);

(statearr_40448_40485[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_40425 === (18))){
var state_40424__$1 = state_40424;
var statearr_40449_40486 = state_40424__$1;
(statearr_40449_40486[(2)] = null);

(statearr_40449_40486[(1)] = (19));


return cljs.core.cst$kw$recur;
} else {
if((state_val_40425 === (8))){
var state_40424__$1 = state_40424;
var statearr_40450_40487 = state_40424__$1;
(statearr_40450_40487[(2)] = true);

(statearr_40450_40487[(1)] = (10));


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
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__35961__auto___40465,width_px,height_px,invalidates_c__$1,teardown_c))
;
return ((function (switch__35847__auto__,c__35961__auto___40465,width_px,height_px,invalidates_c__$1,teardown_c){
return (function() {
var org$numenta$sanity$helpers$resizing_canvas_$_state_machine__35848__auto__ = null;
var org$numenta$sanity$helpers$resizing_canvas_$_state_machine__35848__auto____0 = (function (){
var statearr_40454 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_40454[(0)] = org$numenta$sanity$helpers$resizing_canvas_$_state_machine__35848__auto__);

(statearr_40454[(1)] = (1));

return statearr_40454;
});
var org$numenta$sanity$helpers$resizing_canvas_$_state_machine__35848__auto____1 = (function (state_40424){
while(true){
var ret_value__35849__auto__ = (function (){try{while(true){
var result__35850__auto__ = switch__35847__auto__(state_40424);
if(cljs.core.keyword_identical_QMARK_(result__35850__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__35850__auto__;
}
break;
}
}catch (e40455){if((e40455 instanceof Object)){
var ex__35851__auto__ = e40455;
var statearr_40456_40488 = state_40424;
(statearr_40456_40488[(5)] = ex__35851__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_40424);

return cljs.core.cst$kw$recur;
} else {
throw e40455;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35849__auto__,cljs.core.cst$kw$recur)){
var G__40489 = state_40424;
state_40424 = G__40489;
continue;
} else {
return ret_value__35849__auto__;
}
break;
}
});
org$numenta$sanity$helpers$resizing_canvas_$_state_machine__35848__auto__ = function(state_40424){
switch(arguments.length){
case 0:
return org$numenta$sanity$helpers$resizing_canvas_$_state_machine__35848__auto____0.call(this);
case 1:
return org$numenta$sanity$helpers$resizing_canvas_$_state_machine__35848__auto____1.call(this,state_40424);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$helpers$resizing_canvas_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$helpers$resizing_canvas_$_state_machine__35848__auto____0;
org$numenta$sanity$helpers$resizing_canvas_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$helpers$resizing_canvas_$_state_machine__35848__auto____1;
return org$numenta$sanity$helpers$resizing_canvas_$_state_machine__35848__auto__;
})()
;})(switch__35847__auto__,c__35961__auto___40465,width_px,height_px,invalidates_c__$1,teardown_c))
})();
var state__35963__auto__ = (function (){var statearr_40457 = (f__35962__auto__.cljs$core$IFn$_invoke$arity$0 ? f__35962__auto__.cljs$core$IFn$_invoke$arity$0() : f__35962__auto__.call(null));
(statearr_40457[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__35961__auto___40465);

return statearr_40457;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__35963__auto__);
});})(c__35961__auto___40465,width_px,height_px,invalidates_c__$1,teardown_c))
);


return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(invalidates_c__$1,cljs.core.cst$kw$initial_DASH_mount);
});})(width_px,height_px,invalidates_c__$1,teardown_c))
,cljs.core.cst$kw$component_DASH_did_DASH_update,((function (width_px,height_px,invalidates_c__$1,teardown_c){
return (function (p1__40278_SHARP_){
return org.numenta.sanity.helpers.resizing_canvas$call_draw_fn(p1__40278_SHARP_);
});})(width_px,height_px,invalidates_c__$1,teardown_c))
,cljs.core.cst$kw$component_DASH_will_DASH_unmount,((function (width_px,height_px,invalidates_c__$1,teardown_c){
return (function (){
return cljs.core.async.close_BANG_(teardown_c);
});})(width_px,height_px,invalidates_c__$1,teardown_c))
,cljs.core.cst$kw$display_DASH_name,"resizing-canvas",cljs.core.cst$kw$reagent_DASH_render,((function (width_px,height_px,invalidates_c__$1,teardown_c){
return (function (props,canaries,___$3,___$4){
var seq__40458_40490 = cljs.core.seq(canaries);
var chunk__40459_40491 = null;
var count__40460_40492 = (0);
var i__40461_40493 = (0);
while(true){
if((i__40461_40493 < count__40460_40492)){
var v_40494 = chunk__40459_40491.cljs$core$IIndexed$_nth$arity$2(null,i__40461_40493);
if(((!((v_40494 == null)))?((((v_40494.cljs$lang$protocol_mask$partition0$ & (32768))) || (v_40494.cljs$core$IDeref$))?true:(((!v_40494.cljs$lang$protocol_mask$partition0$))?cljs.core.native_satisfies_QMARK_(cljs.core.IDeref,v_40494):false)):cljs.core.native_satisfies_QMARK_(cljs.core.IDeref,v_40494))){
(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(v_40494) : cljs.core.deref.call(null,v_40494));
} else {
}

var G__40495 = seq__40458_40490;
var G__40496 = chunk__40459_40491;
var G__40497 = count__40460_40492;
var G__40498 = (i__40461_40493 + (1));
seq__40458_40490 = G__40495;
chunk__40459_40491 = G__40496;
count__40460_40492 = G__40497;
i__40461_40493 = G__40498;
continue;
} else {
var temp__4653__auto___40499 = cljs.core.seq(seq__40458_40490);
if(temp__4653__auto___40499){
var seq__40458_40500__$1 = temp__4653__auto___40499;
if(cljs.core.chunked_seq_QMARK_(seq__40458_40500__$1)){
var c__5485__auto___40501 = cljs.core.chunk_first(seq__40458_40500__$1);
var G__40502 = cljs.core.chunk_rest(seq__40458_40500__$1);
var G__40503 = c__5485__auto___40501;
var G__40504 = cljs.core.count(c__5485__auto___40501);
var G__40505 = (0);
seq__40458_40490 = G__40502;
chunk__40459_40491 = G__40503;
count__40460_40492 = G__40504;
i__40461_40493 = G__40505;
continue;
} else {
var v_40506 = cljs.core.first(seq__40458_40500__$1);
if(((!((v_40506 == null)))?((((v_40506.cljs$lang$protocol_mask$partition0$ & (32768))) || (v_40506.cljs$core$IDeref$))?true:(((!v_40506.cljs$lang$protocol_mask$partition0$))?cljs.core.native_satisfies_QMARK_(cljs.core.IDeref,v_40506):false)):cljs.core.native_satisfies_QMARK_(cljs.core.IDeref,v_40506))){
(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(v_40506) : cljs.core.deref.call(null,v_40506));
} else {
}

var G__40507 = cljs.core.next(seq__40458_40500__$1);
var G__40508 = null;
var G__40509 = (0);
var G__40510 = (0);
seq__40458_40490 = G__40507;
chunk__40459_40491 = G__40508;
count__40460_40492 = G__40509;
i__40461_40493 = G__40510;
continue;
}
} else {
}
}
break;
}

var w = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(width_px) : cljs.core.deref.call(null,width_px));
var h = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(height_px) : cljs.core.deref.call(null,height_px));
if(((w === (0))) || ((h === (0)))){
var G__40464_40511 = [cljs.core.str("The resizing canvas is size "),cljs.core.str(w),cljs.core.str(" "),cljs.core.str(h),cljs.core.str(". If it's 'display:none`, it won't detect "),cljs.core.str("its own visibility change.")].join('');
console.warn(G__40464_40511);
} else {
}

return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$canvas,cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(props,cljs.core.cst$kw$width,w,cljs.core.array_seq([cljs.core.cst$kw$height,h], 0))], null);
});})(width_px,height_px,invalidates_c__$1,teardown_c))
], null));
});
