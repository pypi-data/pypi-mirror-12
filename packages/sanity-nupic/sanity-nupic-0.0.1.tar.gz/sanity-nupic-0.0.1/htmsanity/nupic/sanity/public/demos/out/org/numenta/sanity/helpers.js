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

var c__36154__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__36154__auto__,el){
return (function (){
var f__36155__auto__ = (function (){var switch__36040__auto__ = ((function (c__36154__auto__,el){
return (function (state_40548){
var state_val_40549 = (state_40548[(1)]);
if((state_val_40549 === (1))){
var state_40548__$1 = state_40548;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_40548__$1,(2),finished_c);
} else {
if((state_val_40549 === (2))){
var inst_40545 = (state_40548[(2)]);
var inst_40546 = org.numenta.sanity.helpers.hide(el);
var state_40548__$1 = (function (){var statearr_40550 = state_40548;
(statearr_40550[(7)] = inst_40546);

return statearr_40550;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_40548__$1,inst_40545);
} else {
return null;
}
}
});})(c__36154__auto__,el))
;
return ((function (switch__36040__auto__,c__36154__auto__,el){
return (function() {
var org$numenta$sanity$helpers$ui_loading_message_until_$_state_machine__36041__auto__ = null;
var org$numenta$sanity$helpers$ui_loading_message_until_$_state_machine__36041__auto____0 = (function (){
var statearr_40554 = [null,null,null,null,null,null,null,null];
(statearr_40554[(0)] = org$numenta$sanity$helpers$ui_loading_message_until_$_state_machine__36041__auto__);

(statearr_40554[(1)] = (1));

return statearr_40554;
});
var org$numenta$sanity$helpers$ui_loading_message_until_$_state_machine__36041__auto____1 = (function (state_40548){
while(true){
var ret_value__36042__auto__ = (function (){try{while(true){
var result__36043__auto__ = switch__36040__auto__(state_40548);
if(cljs.core.keyword_identical_QMARK_(result__36043__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__36043__auto__;
}
break;
}
}catch (e40555){if((e40555 instanceof Object)){
var ex__36044__auto__ = e40555;
var statearr_40556_40558 = state_40548;
(statearr_40556_40558[(5)] = ex__36044__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_40548);

return cljs.core.cst$kw$recur;
} else {
throw e40555;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__36042__auto__,cljs.core.cst$kw$recur)){
var G__40559 = state_40548;
state_40548 = G__40559;
continue;
} else {
return ret_value__36042__auto__;
}
break;
}
});
org$numenta$sanity$helpers$ui_loading_message_until_$_state_machine__36041__auto__ = function(state_40548){
switch(arguments.length){
case 0:
return org$numenta$sanity$helpers$ui_loading_message_until_$_state_machine__36041__auto____0.call(this);
case 1:
return org$numenta$sanity$helpers$ui_loading_message_until_$_state_machine__36041__auto____1.call(this,state_40548);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$helpers$ui_loading_message_until_$_state_machine__36041__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$helpers$ui_loading_message_until_$_state_machine__36041__auto____0;
org$numenta$sanity$helpers$ui_loading_message_until_$_state_machine__36041__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$helpers$ui_loading_message_until_$_state_machine__36041__auto____1;
return org$numenta$sanity$helpers$ui_loading_message_until_$_state_machine__36041__auto__;
})()
;})(switch__36040__auto__,c__36154__auto__,el))
})();
var state__36156__auto__ = (function (){var statearr_40557 = (f__36155__auto__.cljs$core$IFn$_invoke$arity$0 ? f__36155__auto__.cljs$core$IFn$_invoke$arity$0() : f__36155__auto__.call(null));
(statearr_40557[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__36154__auto__);

return statearr_40557;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__36156__auto__);
});})(c__36154__auto__,el))
);

return c__36154__auto__;
});
org.numenta.sanity.helpers.with_ui_loading_message = (function org$numenta$sanity$helpers$with_ui_loading_message(f){
return org.numenta.sanity.helpers.ui_loading_message_until((function (){var c__36154__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__36154__auto__){
return (function (){
var f__36155__auto__ = (function (){var switch__36040__auto__ = ((function (c__36154__auto__){
return (function (state_40580){
var state_val_40581 = (state_40580[(1)]);
if((state_val_40581 === (1))){
var inst_40575 = cljs.core.async.timeout((100));
var state_40580__$1 = state_40580;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_40580__$1,(2),inst_40575);
} else {
if((state_val_40581 === (2))){
var inst_40577 = (state_40580[(2)]);
var inst_40578 = (f.cljs$core$IFn$_invoke$arity$0 ? f.cljs$core$IFn$_invoke$arity$0() : f.call(null));
var state_40580__$1 = (function (){var statearr_40582 = state_40580;
(statearr_40582[(7)] = inst_40577);

return statearr_40582;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_40580__$1,inst_40578);
} else {
return null;
}
}
});})(c__36154__auto__))
;
return ((function (switch__36040__auto__,c__36154__auto__){
return (function() {
var org$numenta$sanity$helpers$with_ui_loading_message_$_state_machine__36041__auto__ = null;
var org$numenta$sanity$helpers$with_ui_loading_message_$_state_machine__36041__auto____0 = (function (){
var statearr_40586 = [null,null,null,null,null,null,null,null];
(statearr_40586[(0)] = org$numenta$sanity$helpers$with_ui_loading_message_$_state_machine__36041__auto__);

(statearr_40586[(1)] = (1));

return statearr_40586;
});
var org$numenta$sanity$helpers$with_ui_loading_message_$_state_machine__36041__auto____1 = (function (state_40580){
while(true){
var ret_value__36042__auto__ = (function (){try{while(true){
var result__36043__auto__ = switch__36040__auto__(state_40580);
if(cljs.core.keyword_identical_QMARK_(result__36043__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__36043__auto__;
}
break;
}
}catch (e40587){if((e40587 instanceof Object)){
var ex__36044__auto__ = e40587;
var statearr_40588_40590 = state_40580;
(statearr_40588_40590[(5)] = ex__36044__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_40580);

return cljs.core.cst$kw$recur;
} else {
throw e40587;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__36042__auto__,cljs.core.cst$kw$recur)){
var G__40591 = state_40580;
state_40580 = G__40591;
continue;
} else {
return ret_value__36042__auto__;
}
break;
}
});
org$numenta$sanity$helpers$with_ui_loading_message_$_state_machine__36041__auto__ = function(state_40580){
switch(arguments.length){
case 0:
return org$numenta$sanity$helpers$with_ui_loading_message_$_state_machine__36041__auto____0.call(this);
case 1:
return org$numenta$sanity$helpers$with_ui_loading_message_$_state_machine__36041__auto____1.call(this,state_40580);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$helpers$with_ui_loading_message_$_state_machine__36041__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$helpers$with_ui_loading_message_$_state_machine__36041__auto____0;
org$numenta$sanity$helpers$with_ui_loading_message_$_state_machine__36041__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$helpers$with_ui_loading_message_$_state_machine__36041__auto____1;
return org$numenta$sanity$helpers$with_ui_loading_message_$_state_machine__36041__auto__;
})()
;})(switch__36040__auto__,c__36154__auto__))
})();
var state__36156__auto__ = (function (){var statearr_40589 = (f__36155__auto__.cljs$core$IFn$_invoke$arity$0 ? f__36155__auto__.cljs$core$IFn$_invoke$arity$0() : f__36155__auto__.call(null));
(statearr_40589[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__36154__auto__);

return statearr_40589;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__36156__auto__);
});})(c__36154__auto__))
);

return c__36154__auto__;
})());
});
org.numenta.sanity.helpers.text_world_input_component = (function org$numenta$sanity$helpers$text_world_input_component(inval,htm,max_shown,scroll_every,separator){
var time = org.nfrac.comportex.protocols.timestep(htm);
var show_n = (max_shown - cljs.core.mod((max_shown - time),scroll_every));
var history = cljs.core.take_last(show_n,cljs.core.cst$kw$history.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(inval)));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,(function (){var iter__5454__auto__ = ((function (time,show_n,history){
return (function org$numenta$sanity$helpers$text_world_input_component_$_iter__40602(s__40603){
return (new cljs.core.LazySeq(null,((function (time,show_n,history){
return (function (){
var s__40603__$1 = s__40603;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__40603__$1);
if(temp__4653__auto__){
var s__40603__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__40603__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__40603__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__40605 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__40604 = (0);
while(true){
if((i__40604 < size__5453__auto__)){
var vec__40610 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__40604);
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40610,(0),null);
var word = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40610,(1),null);
var t = (i + (time - (cljs.core.count(history) - (1))));
var curr_QMARK_ = (time === t);
cljs.core.chunk_append(b__40605,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [((curr_QMARK_)?cljs.core.cst$kw$ins:cljs.core.cst$kw$span),[cljs.core.str(word),cljs.core.str(separator)].join('')], null),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,[cljs.core.str(word),cljs.core.str(t)].join('')], null)));

var G__40612 = (i__40604 + (1));
i__40604 = G__40612;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__40605),org$numenta$sanity$helpers$text_world_input_component_$_iter__40602(cljs.core.chunk_rest(s__40603__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__40605),null);
}
} else {
var vec__40611 = cljs.core.first(s__40603__$2);
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40611,(0),null);
var word = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40611,(1),null);
var t = (i + (time - (cljs.core.count(history) - (1))));
var curr_QMARK_ = (time === t);
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [((curr_QMARK_)?cljs.core.cst$kw$ins:cljs.core.cst$kw$span),[cljs.core.str(word),cljs.core.str(separator)].join('')], null),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,[cljs.core.str(word),cljs.core.str(t)].join('')], null)),org$numenta$sanity$helpers$text_world_input_component_$_iter__40602(cljs.core.rest(s__40603__$2)));
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
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$table$table,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tbody,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$th,"prediction"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$th,"votes %"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$th,"votes per bit"], null)], null),(function (){var iter__5454__auto__ = (function org$numenta$sanity$helpers$predictions_table_$_iter__40631(s__40632){
return (new cljs.core.LazySeq(null,(function (){
var s__40632__$1 = s__40632;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__40632__$1);
if(temp__4653__auto__){
var s__40632__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__40632__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__40632__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__40634 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__40633 = (0);
while(true){
if((i__40633 < size__5453__auto__)){
var vec__40643 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__40633);
var j = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40643,(0),null);
var map__40644 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40643,(1),null);
var map__40644__$1 = ((((!((map__40644 == null)))?((((map__40644.cljs$lang$protocol_mask$partition0$ & (64))) || (map__40644.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__40644):map__40644);
var value = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40644__$1,cljs.core.cst$kw$value);
var votes_frac = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40644__$1,cljs.core.cst$kw$votes_DASH_frac);
var votes_per_bit = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40644__$1,cljs.core.cst$kw$votes_DASH_per_DASH_bit);
cljs.core.chunk_append(b__40634,(function (){var txt = value;
return cljs.core.with_meta(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,txt], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td$text_DASH_right,[cljs.core.str(org.nfrac.comportex.util.round.cljs$core$IFn$_invoke$arity$1((votes_frac * (100))))].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td$text_DASH_right,[cljs.core.str(org.nfrac.comportex.util.round.cljs$core$IFn$_invoke$arity$1(votes_per_bit))].join('')], null)], null),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,[cljs.core.str(txt),cljs.core.str(j)].join('')], null));
})());

var G__40649 = (i__40633 + (1));
i__40633 = G__40649;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__40634),org$numenta$sanity$helpers$predictions_table_$_iter__40631(cljs.core.chunk_rest(s__40632__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__40634),null);
}
} else {
var vec__40646 = cljs.core.first(s__40632__$2);
var j = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40646,(0),null);
var map__40647 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40646,(1),null);
var map__40647__$1 = ((((!((map__40647 == null)))?((((map__40647.cljs$lang$protocol_mask$partition0$ & (64))) || (map__40647.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__40647):map__40647);
var value = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40647__$1,cljs.core.cst$kw$value);
var votes_frac = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40647__$1,cljs.core.cst$kw$votes_DASH_frac);
var votes_per_bit = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40647__$1,cljs.core.cst$kw$votes_DASH_per_DASH_bit);
return cljs.core.cons((function (){var txt = value;
return cljs.core.with_meta(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,txt], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td$text_DASH_right,[cljs.core.str(org.nfrac.comportex.util.round.cljs$core$IFn$_invoke$arity$1((votes_frac * (100))))].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td$text_DASH_right,[cljs.core.str(org.nfrac.comportex.util.round.cljs$core$IFn$_invoke$arity$1(votes_per_bit))].join('')], null)], null),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,[cljs.core.str(txt),cljs.core.str(j)].join('')], null));
})(),org$numenta$sanity$helpers$predictions_table_$_iter__40631(cljs.core.rest(s__40632__$2)));
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
var vec__40651 = cljs.core.first(cljs.core.vals(cljs.core.cst$kw$sensors.cljs$core$IFn$_invoke$arity$1(htm)));
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40651,(0),null);
var e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40651,(1),null);
var rgn = cljs.core.first(org.nfrac.comportex.core.region_seq(htm));
var pr_votes = org.nfrac.comportex.core.predicted_bit_votes(rgn);
var predictions = org.nfrac.comportex.protocols.decode(e,pr_votes,n_predictions);
return org.numenta.sanity.helpers.predictions_table(predictions);
});
org.numenta.sanity.helpers.canvas$call_draw_fn = (function org$numenta$sanity$helpers$canvas$call_draw_fn(component){
var vec__40654 = reagent.core.argv(component);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40654,(0),null);
var ___$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40654,(1),null);
var ___$2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40654,(2),null);
var ___$3 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40654,(3),null);
var ___$4 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40654,(4),null);
var draw = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40654,(5),null);
var G__40655 = reagent.core.dom_node(component).getContext("2d");
return (draw.cljs$core$IFn$_invoke$arity$1 ? draw.cljs$core$IFn$_invoke$arity$1(G__40655) : draw.call(null,G__40655));
});
org.numenta.sanity.helpers.canvas = (function org$numenta$sanity$helpers$canvas(_,___$1,___$2,___$3,___$4){
return reagent.core.create_class(new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$component_DASH_did_DASH_mount,(function (p1__40656_SHARP_){
return org.numenta.sanity.helpers.canvas$call_draw_fn(p1__40656_SHARP_);
}),cljs.core.cst$kw$component_DASH_did_DASH_update,(function (p1__40657_SHARP_){
return org.numenta.sanity.helpers.canvas$call_draw_fn(p1__40657_SHARP_);
}),cljs.core.cst$kw$display_DASH_name,"canvas",cljs.core.cst$kw$reagent_DASH_render,(function (props,width,height,canaries,___$5){
var seq__40664_40670 = cljs.core.seq(canaries);
var chunk__40665_40671 = null;
var count__40666_40672 = (0);
var i__40667_40673 = (0);
while(true){
if((i__40667_40673 < count__40666_40672)){
var v_40674 = chunk__40665_40671.cljs$core$IIndexed$_nth$arity$2(null,i__40667_40673);
if(((!((v_40674 == null)))?((((v_40674.cljs$lang$protocol_mask$partition0$ & (32768))) || (v_40674.cljs$core$IDeref$))?true:(((!v_40674.cljs$lang$protocol_mask$partition0$))?cljs.core.native_satisfies_QMARK_(cljs.core.IDeref,v_40674):false)):cljs.core.native_satisfies_QMARK_(cljs.core.IDeref,v_40674))){
(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(v_40674) : cljs.core.deref.call(null,v_40674));
} else {
}

var G__40675 = seq__40664_40670;
var G__40676 = chunk__40665_40671;
var G__40677 = count__40666_40672;
var G__40678 = (i__40667_40673 + (1));
seq__40664_40670 = G__40675;
chunk__40665_40671 = G__40676;
count__40666_40672 = G__40677;
i__40667_40673 = G__40678;
continue;
} else {
var temp__4653__auto___40679 = cljs.core.seq(seq__40664_40670);
if(temp__4653__auto___40679){
var seq__40664_40680__$1 = temp__4653__auto___40679;
if(cljs.core.chunked_seq_QMARK_(seq__40664_40680__$1)){
var c__5485__auto___40681 = cljs.core.chunk_first(seq__40664_40680__$1);
var G__40682 = cljs.core.chunk_rest(seq__40664_40680__$1);
var G__40683 = c__5485__auto___40681;
var G__40684 = cljs.core.count(c__5485__auto___40681);
var G__40685 = (0);
seq__40664_40670 = G__40682;
chunk__40665_40671 = G__40683;
count__40666_40672 = G__40684;
i__40667_40673 = G__40685;
continue;
} else {
var v_40686 = cljs.core.first(seq__40664_40680__$1);
if(((!((v_40686 == null)))?((((v_40686.cljs$lang$protocol_mask$partition0$ & (32768))) || (v_40686.cljs$core$IDeref$))?true:(((!v_40686.cljs$lang$protocol_mask$partition0$))?cljs.core.native_satisfies_QMARK_(cljs.core.IDeref,v_40686):false)):cljs.core.native_satisfies_QMARK_(cljs.core.IDeref,v_40686))){
(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(v_40686) : cljs.core.deref.call(null,v_40686));
} else {
}

var G__40687 = cljs.core.next(seq__40664_40680__$1);
var G__40688 = null;
var G__40689 = (0);
var G__40690 = (0);
seq__40664_40670 = G__40687;
chunk__40665_40671 = G__40688;
count__40666_40672 = G__40689;
i__40667_40673 = G__40690;
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
var G__40703 = resize_key;
var G__40704 = (function (){var G__40705 = window;
var G__40706 = "resize";
var G__40707 = ((function (G__40705,G__40706,G__40703,resize_key){
return (function (){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(resizes_c,cljs.core.cst$kw$window_DASH_resized);
});})(G__40705,G__40706,G__40703,resize_key))
;
return goog.events.listen(G__40705,G__40706,G__40707);
})();
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__40703,G__40704) : cljs.core.reset_BANG_.call(null,G__40703,G__40704));
});})(resize_key))
,cljs.core.cst$kw$component_DASH_will_DASH_unmount,((function (resize_key){
return (function (){
if(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(resize_key) : cljs.core.deref.call(null,resize_key)))){
var G__40708 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(resize_key) : cljs.core.deref.call(null,resize_key));
return goog.events.unlistenByKey(G__40708);
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
var vec__40711 = reagent.core.argv(component);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40711,(0),null);
var ___$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40711,(1),null);
var ___$2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40711,(2),null);
var draw = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40711,(3),null);
var ___$3 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40711,(4),null);
var G__40712 = reagent.core.dom_node(component).getContext("2d");
return (draw.cljs$core$IFn$_invoke$arity$1 ? draw.cljs$core$IFn$_invoke$arity$1(G__40712) : draw.call(null,G__40712));
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
var c__36154__auto___40900 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__36154__auto___40900,width_px,height_px,invalidates_c__$1,teardown_c){
return (function (){
var f__36155__auto__ = (function (){var switch__36040__auto__ = ((function (c__36154__auto___40900,width_px,height_px,invalidates_c__$1,teardown_c){
return (function (state_40859){
var state_val_40860 = (state_40859[(1)]);
if((state_val_40860 === (7))){
var inst_40834 = (state_40859[(2)]);
var inst_40835 = (inst_40834 == null);
var inst_40836 = cljs.core.not(inst_40835);
var state_40859__$1 = state_40859;
if(inst_40836){
var statearr_40861_40901 = state_40859__$1;
(statearr_40861_40901[(1)] = (14));

} else {
var statearr_40862_40902 = state_40859__$1;
(statearr_40862_40902[(1)] = (15));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_40860 === (1))){
var state_40859__$1 = state_40859;
var statearr_40863_40903 = state_40859__$1;
(statearr_40863_40903[(2)] = null);

(statearr_40863_40903[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_40860 === (4))){
var inst_40819 = (state_40859[(7)]);
var inst_40817 = (state_40859[(2)]);
var inst_40818 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_40817,(0),null);
var inst_40819__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_40817,(1),null);
var inst_40820 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_40819__$1,teardown_c);
var state_40859__$1 = (function (){var statearr_40864 = state_40859;
(statearr_40864[(7)] = inst_40819__$1);

(statearr_40864[(8)] = inst_40818);

return statearr_40864;
})();
if(inst_40820){
var statearr_40865_40904 = state_40859__$1;
(statearr_40865_40904[(1)] = (5));

} else {
var statearr_40866_40905 = state_40859__$1;
(statearr_40866_40905[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_40860 === (15))){
var state_40859__$1 = state_40859;
var statearr_40867_40906 = state_40859__$1;
(statearr_40867_40906[(2)] = null);

(statearr_40867_40906[(1)] = (16));


return cljs.core.cst$kw$recur;
} else {
if((state_val_40860 === (13))){
var inst_40830 = (state_40859[(2)]);
var state_40859__$1 = state_40859;
var statearr_40868_40907 = state_40859__$1;
(statearr_40868_40907[(2)] = inst_40830);

(statearr_40868_40907[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_40860 === (6))){
var inst_40819 = (state_40859[(7)]);
var inst_40823 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_40819,invalidates_c__$1);
var state_40859__$1 = state_40859;
if(inst_40823){
var statearr_40869_40908 = state_40859__$1;
(statearr_40869_40908[(1)] = (8));

} else {
var statearr_40870_40909 = state_40859__$1;
(statearr_40870_40909[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_40860 === (17))){
var inst_40840 = (state_40859[(9)]);
var inst_40841 = (state_40859[(10)]);
var inst_40845 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_40846 = [inst_40840,inst_40841];
var inst_40847 = (new cljs.core.PersistentVector(null,2,(5),inst_40845,inst_40846,null));
var inst_40848 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(resizes,inst_40847);
var state_40859__$1 = state_40859;
var statearr_40871_40910 = state_40859__$1;
(statearr_40871_40910[(2)] = inst_40848);

(statearr_40871_40910[(1)] = (19));


return cljs.core.cst$kw$recur;
} else {
if((state_val_40860 === (3))){
var inst_40857 = (state_40859[(2)]);
var state_40859__$1 = state_40859;
return cljs.core.async.impl.ioc_helpers.return_chan(state_40859__$1,inst_40857);
} else {
if((state_val_40860 === (12))){
var state_40859__$1 = state_40859;
var statearr_40872_40911 = state_40859__$1;
(statearr_40872_40911[(2)] = null);

(statearr_40872_40911[(1)] = (13));


return cljs.core.cst$kw$recur;
} else {
if((state_val_40860 === (2))){
var inst_40813 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_40814 = [teardown_c,invalidates_c__$1];
var inst_40815 = (new cljs.core.PersistentVector(null,2,(5),inst_40813,inst_40814,null));
var state_40859__$1 = state_40859;
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic(state_40859__$1,(4),inst_40815,cljs.core.array_seq([cljs.core.cst$kw$priority,true], 0));
} else {
if((state_val_40860 === (19))){
var inst_40851 = (state_40859[(2)]);
var state_40859__$1 = (function (){var statearr_40873 = state_40859;
(statearr_40873[(11)] = inst_40851);

return statearr_40873;
})();
var statearr_40874_40912 = state_40859__$1;
(statearr_40874_40912[(2)] = null);

(statearr_40874_40912[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_40860 === (11))){
var inst_40818 = (state_40859[(8)]);
var state_40859__$1 = state_40859;
var statearr_40875_40913 = state_40859__$1;
(statearr_40875_40913[(2)] = inst_40818);

(statearr_40875_40913[(1)] = (13));


return cljs.core.cst$kw$recur;
} else {
if((state_val_40860 === (9))){
var inst_40819 = (state_40859[(7)]);
var inst_40826 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_40819,cljs.core.cst$kw$default);
var state_40859__$1 = state_40859;
if(inst_40826){
var statearr_40876_40914 = state_40859__$1;
(statearr_40876_40914[(1)] = (11));

} else {
var statearr_40877_40915 = state_40859__$1;
(statearr_40877_40915[(1)] = (12));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_40860 === (5))){
var state_40859__$1 = state_40859;
var statearr_40878_40916 = state_40859__$1;
(statearr_40878_40916[(2)] = null);

(statearr_40878_40916[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_40860 === (14))){
var inst_40840 = (state_40859[(9)]);
var inst_40841 = (state_40859[(10)]);
var inst_40838 = reagent.core.dom_node(component);
var inst_40839 = goog.style.getSize(inst_40838);
var inst_40840__$1 = inst_40839.width;
var inst_40841__$1 = inst_40839.height;
var inst_40842 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(width_px,inst_40840__$1) : cljs.core.reset_BANG_.call(null,width_px,inst_40840__$1));
var inst_40843 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(height_px,inst_40841__$1) : cljs.core.reset_BANG_.call(null,height_px,inst_40841__$1));
var state_40859__$1 = (function (){var statearr_40879 = state_40859;
(statearr_40879[(9)] = inst_40840__$1);

(statearr_40879[(10)] = inst_40841__$1);

(statearr_40879[(12)] = inst_40843);

(statearr_40879[(13)] = inst_40842);

return statearr_40879;
})();
if(cljs.core.truth_(resizes)){
var statearr_40880_40917 = state_40859__$1;
(statearr_40880_40917[(1)] = (17));

} else {
var statearr_40881_40918 = state_40859__$1;
(statearr_40881_40918[(1)] = (18));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_40860 === (16))){
var inst_40855 = (state_40859[(2)]);
var state_40859__$1 = state_40859;
var statearr_40882_40919 = state_40859__$1;
(statearr_40882_40919[(2)] = inst_40855);

(statearr_40882_40919[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_40860 === (10))){
var inst_40832 = (state_40859[(2)]);
var state_40859__$1 = state_40859;
var statearr_40883_40920 = state_40859__$1;
(statearr_40883_40920[(2)] = inst_40832);

(statearr_40883_40920[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_40860 === (18))){
var state_40859__$1 = state_40859;
var statearr_40884_40921 = state_40859__$1;
(statearr_40884_40921[(2)] = null);

(statearr_40884_40921[(1)] = (19));


return cljs.core.cst$kw$recur;
} else {
if((state_val_40860 === (8))){
var state_40859__$1 = state_40859;
var statearr_40885_40922 = state_40859__$1;
(statearr_40885_40922[(2)] = true);

(statearr_40885_40922[(1)] = (10));


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
});})(c__36154__auto___40900,width_px,height_px,invalidates_c__$1,teardown_c))
;
return ((function (switch__36040__auto__,c__36154__auto___40900,width_px,height_px,invalidates_c__$1,teardown_c){
return (function() {
var org$numenta$sanity$helpers$resizing_canvas_$_state_machine__36041__auto__ = null;
var org$numenta$sanity$helpers$resizing_canvas_$_state_machine__36041__auto____0 = (function (){
var statearr_40889 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_40889[(0)] = org$numenta$sanity$helpers$resizing_canvas_$_state_machine__36041__auto__);

(statearr_40889[(1)] = (1));

return statearr_40889;
});
var org$numenta$sanity$helpers$resizing_canvas_$_state_machine__36041__auto____1 = (function (state_40859){
while(true){
var ret_value__36042__auto__ = (function (){try{while(true){
var result__36043__auto__ = switch__36040__auto__(state_40859);
if(cljs.core.keyword_identical_QMARK_(result__36043__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__36043__auto__;
}
break;
}
}catch (e40890){if((e40890 instanceof Object)){
var ex__36044__auto__ = e40890;
var statearr_40891_40923 = state_40859;
(statearr_40891_40923[(5)] = ex__36044__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_40859);

return cljs.core.cst$kw$recur;
} else {
throw e40890;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__36042__auto__,cljs.core.cst$kw$recur)){
var G__40924 = state_40859;
state_40859 = G__40924;
continue;
} else {
return ret_value__36042__auto__;
}
break;
}
});
org$numenta$sanity$helpers$resizing_canvas_$_state_machine__36041__auto__ = function(state_40859){
switch(arguments.length){
case 0:
return org$numenta$sanity$helpers$resizing_canvas_$_state_machine__36041__auto____0.call(this);
case 1:
return org$numenta$sanity$helpers$resizing_canvas_$_state_machine__36041__auto____1.call(this,state_40859);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$helpers$resizing_canvas_$_state_machine__36041__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$helpers$resizing_canvas_$_state_machine__36041__auto____0;
org$numenta$sanity$helpers$resizing_canvas_$_state_machine__36041__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$helpers$resizing_canvas_$_state_machine__36041__auto____1;
return org$numenta$sanity$helpers$resizing_canvas_$_state_machine__36041__auto__;
})()
;})(switch__36040__auto__,c__36154__auto___40900,width_px,height_px,invalidates_c__$1,teardown_c))
})();
var state__36156__auto__ = (function (){var statearr_40892 = (f__36155__auto__.cljs$core$IFn$_invoke$arity$0 ? f__36155__auto__.cljs$core$IFn$_invoke$arity$0() : f__36155__auto__.call(null));
(statearr_40892[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__36154__auto___40900);

return statearr_40892;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__36156__auto__);
});})(c__36154__auto___40900,width_px,height_px,invalidates_c__$1,teardown_c))
);


return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(invalidates_c__$1,cljs.core.cst$kw$initial_DASH_mount);
});})(width_px,height_px,invalidates_c__$1,teardown_c))
,cljs.core.cst$kw$component_DASH_did_DASH_update,((function (width_px,height_px,invalidates_c__$1,teardown_c){
return (function (p1__40713_SHARP_){
return org.numenta.sanity.helpers.resizing_canvas$call_draw_fn(p1__40713_SHARP_);
});})(width_px,height_px,invalidates_c__$1,teardown_c))
,cljs.core.cst$kw$component_DASH_will_DASH_unmount,((function (width_px,height_px,invalidates_c__$1,teardown_c){
return (function (){
return cljs.core.async.close_BANG_(teardown_c);
});})(width_px,height_px,invalidates_c__$1,teardown_c))
,cljs.core.cst$kw$display_DASH_name,"resizing-canvas",cljs.core.cst$kw$reagent_DASH_render,((function (width_px,height_px,invalidates_c__$1,teardown_c){
return (function (props,canaries,___$3,___$4){
var seq__40893_40925 = cljs.core.seq(canaries);
var chunk__40894_40926 = null;
var count__40895_40927 = (0);
var i__40896_40928 = (0);
while(true){
if((i__40896_40928 < count__40895_40927)){
var v_40929 = chunk__40894_40926.cljs$core$IIndexed$_nth$arity$2(null,i__40896_40928);
if(((!((v_40929 == null)))?((((v_40929.cljs$lang$protocol_mask$partition0$ & (32768))) || (v_40929.cljs$core$IDeref$))?true:(((!v_40929.cljs$lang$protocol_mask$partition0$))?cljs.core.native_satisfies_QMARK_(cljs.core.IDeref,v_40929):false)):cljs.core.native_satisfies_QMARK_(cljs.core.IDeref,v_40929))){
(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(v_40929) : cljs.core.deref.call(null,v_40929));
} else {
}

var G__40930 = seq__40893_40925;
var G__40931 = chunk__40894_40926;
var G__40932 = count__40895_40927;
var G__40933 = (i__40896_40928 + (1));
seq__40893_40925 = G__40930;
chunk__40894_40926 = G__40931;
count__40895_40927 = G__40932;
i__40896_40928 = G__40933;
continue;
} else {
var temp__4653__auto___40934 = cljs.core.seq(seq__40893_40925);
if(temp__4653__auto___40934){
var seq__40893_40935__$1 = temp__4653__auto___40934;
if(cljs.core.chunked_seq_QMARK_(seq__40893_40935__$1)){
var c__5485__auto___40936 = cljs.core.chunk_first(seq__40893_40935__$1);
var G__40937 = cljs.core.chunk_rest(seq__40893_40935__$1);
var G__40938 = c__5485__auto___40936;
var G__40939 = cljs.core.count(c__5485__auto___40936);
var G__40940 = (0);
seq__40893_40925 = G__40937;
chunk__40894_40926 = G__40938;
count__40895_40927 = G__40939;
i__40896_40928 = G__40940;
continue;
} else {
var v_40941 = cljs.core.first(seq__40893_40935__$1);
if(((!((v_40941 == null)))?((((v_40941.cljs$lang$protocol_mask$partition0$ & (32768))) || (v_40941.cljs$core$IDeref$))?true:(((!v_40941.cljs$lang$protocol_mask$partition0$))?cljs.core.native_satisfies_QMARK_(cljs.core.IDeref,v_40941):false)):cljs.core.native_satisfies_QMARK_(cljs.core.IDeref,v_40941))){
(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(v_40941) : cljs.core.deref.call(null,v_40941));
} else {
}

var G__40942 = cljs.core.next(seq__40893_40935__$1);
var G__40943 = null;
var G__40944 = (0);
var G__40945 = (0);
seq__40893_40925 = G__40942;
chunk__40894_40926 = G__40943;
count__40895_40927 = G__40944;
i__40896_40928 = G__40945;
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
var G__40899_40946 = [cljs.core.str("The resizing canvas is size "),cljs.core.str(w),cljs.core.str(" "),cljs.core.str(h),cljs.core.str(". If it's 'display:none`, it won't detect "),cljs.core.str("its own visibility change.")].join('');
console.warn(G__40899_40946);
} else {
}

return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$canvas,cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(props,cljs.core.cst$kw$width,w,cljs.core.array_seq([cljs.core.cst$kw$height,h], 0))], null);
});})(width_px,height_px,invalidates_c__$1,teardown_c))
], null));
});
