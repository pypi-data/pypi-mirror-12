// Compiled by ClojureScript 1.7.170 {:static-fns true, :optimize-constants true}
goog.provide('org.numenta.sanity.main');
goog.require('cljs.core');
goog.require('reagent.core');
goog.require('org.numenta.sanity.viz_canvas');
goog.require('org.numenta.sanity.helpers');
goog.require('cljs.core.async');
goog.require('org.numenta.sanity.bridge.marshalling');
goog.require('org.numenta.sanity.selection');
goog.require('clojure.walk');
goog.require('org.numenta.sanity.controls_ui');
cljs.core.enable_console_print_BANG_();
org.numenta.sanity.main.into_journal = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((65536));
org.numenta.sanity.main.steps = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentVector.EMPTY);
org.numenta.sanity.main.step_template = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
org.numenta.sanity.main.selection = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.selection.blank_selection);
org.numenta.sanity.main.capture_options = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
org.numenta.sanity.main.viz_options = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.viz_canvas.default_viz_options);
org.numenta.sanity.main.into_viz = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
org.numenta.sanity.main.debug_data = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.controls_ui.default_debug_data);
org.numenta.sanity.main.subscribe_to_steps_BANG_ = (function org$numenta$sanity$main$subscribe_to_steps_BANG_(){
var steps_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
var response_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.into_journal,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["subscribe",org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$1(steps_c),org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$2(response_c,true)], null));

var c__35961__auto___61531 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__35961__auto___61531,steps_c,response_c){
return (function (){
var f__35962__auto__ = (function (){var switch__35847__auto__ = ((function (c__35961__auto___61531,steps_c,response_c){
return (function (state_61448){
var state_val_61449 = (state_61448[(1)]);
if((state_val_61449 === (7))){
var state_61448__$1 = state_61448;
var statearr_61450_61532 = state_61448__$1;
(statearr_61450_61532[(2)] = false);

(statearr_61450_61532[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_61449 === (1))){
var state_61448__$1 = state_61448;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_61448__$1,(2),response_c);
} else {
if((state_val_61449 === (4))){
var state_61448__$1 = state_61448;
var statearr_61451_61533 = state_61448__$1;
(statearr_61451_61533[(2)] = false);

(statearr_61451_61533[(1)] = (5));


return cljs.core.cst$kw$recur;
} else {
if((state_val_61449 === (15))){
var inst_61425 = (state_61448[(7)]);
var inst_61428 = clojure.walk.keywordize_keys(inst_61425);
var inst_61429 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.main.capture_options) : cljs.core.deref.call(null,org.numenta.sanity.main.capture_options));
var inst_61430 = cljs.core.cst$kw$keep_DASH_steps.cljs$core$IFn$_invoke$arity$1(inst_61429);
var inst_61431 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.main.steps) : cljs.core.deref.call(null,org.numenta.sanity.main.steps));
var inst_61432 = cljs.core.cons(inst_61428,inst_61431);
var inst_61433 = cljs.core.split_at(inst_61430,inst_61432);
var inst_61434 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_61433,(0),null);
var inst_61435 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_61433,(1),null);
var inst_61436 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.steps,inst_61434) : cljs.core.reset_BANG_.call(null,org.numenta.sanity.main.steps,inst_61434));
var inst_61437 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_61438 = [cljs.core.cst$kw$drop_DASH_steps_DASH_data,inst_61435];
var inst_61439 = (new cljs.core.PersistentVector(null,2,(5),inst_61437,inst_61438,null));
var inst_61440 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.into_viz,inst_61439);
var state_61448__$1 = (function (){var statearr_61452 = state_61448;
(statearr_61452[(8)] = inst_61436);

(statearr_61452[(9)] = inst_61440);

return statearr_61452;
})();
var statearr_61453_61534 = state_61448__$1;
(statearr_61453_61534[(2)] = null);

(statearr_61453_61534[(1)] = (12));


return cljs.core.cst$kw$recur;
} else {
if((state_val_61449 === (13))){
var inst_61446 = (state_61448[(2)]);
var state_61448__$1 = state_61448;
return cljs.core.async.impl.ioc_helpers.return_chan(state_61448__$1,inst_61446);
} else {
if((state_val_61449 === (6))){
var state_61448__$1 = state_61448;
var statearr_61454_61535 = state_61448__$1;
(statearr_61454_61535[(2)] = true);

(statearr_61454_61535[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_61449 === (17))){
var inst_61444 = (state_61448[(2)]);
var state_61448__$1 = state_61448;
var statearr_61455_61536 = state_61448__$1;
(statearr_61455_61536[(2)] = inst_61444);

(statearr_61455_61536[(1)] = (13));


return cljs.core.cst$kw$recur;
} else {
if((state_val_61449 === (3))){
var inst_61356 = (state_61448[(10)]);
var inst_61362 = inst_61356.cljs$lang$protocol_mask$partition0$;
var inst_61363 = (inst_61362 & (64));
var inst_61364 = inst_61356.cljs$core$ISeq$;
var inst_61365 = (inst_61363) || (inst_61364);
var state_61448__$1 = state_61448;
if(cljs.core.truth_(inst_61365)){
var statearr_61456_61537 = state_61448__$1;
(statearr_61456_61537[(1)] = (6));

} else {
var statearr_61457_61538 = state_61448__$1;
(statearr_61457_61538[(1)] = (7));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_61449 === (12))){
var state_61448__$1 = state_61448;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_61448__$1,(14),steps_c);
} else {
if((state_val_61449 === (2))){
var inst_61356 = (state_61448[(10)]);
var inst_61355 = (state_61448[(11)]);
var inst_61355__$1 = (state_61448[(2)]);
var inst_61356__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_61355__$1,(0),null);
var inst_61357 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_61355__$1,(1),null);
var inst_61359 = (inst_61356__$1 == null);
var inst_61360 = cljs.core.not(inst_61359);
var state_61448__$1 = (function (){var statearr_61458 = state_61448;
(statearr_61458[(10)] = inst_61356__$1);

(statearr_61458[(11)] = inst_61355__$1);

(statearr_61458[(12)] = inst_61357);

return statearr_61458;
})();
if(inst_61360){
var statearr_61459_61539 = state_61448__$1;
(statearr_61459_61539[(1)] = (3));

} else {
var statearr_61460_61540 = state_61448__$1;
(statearr_61460_61540[(1)] = (4));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_61449 === (11))){
var inst_61356 = (state_61448[(10)]);
var inst_61355 = (state_61448[(11)]);
var inst_61357 = (state_61448[(12)]);
var inst_61377 = (state_61448[(2)]);
var inst_61378 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_61377,"regions");
var inst_61379 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_61377,"senses");
var inst_61380 = [cljs.core.cst$kw$regions,cljs.core.cst$kw$senses];
var inst_61381 = cljs.core.PersistentHashMap.EMPTY;
var inst_61386 = (function (){var vec__61352 = inst_61355;
var st = inst_61356;
var co = inst_61357;
var map__61353 = inst_61377;
var regions = inst_61378;
var senses = inst_61379;
return ((function (vec__61352,st,co,map__61353,regions,senses,inst_61356,inst_61355,inst_61357,inst_61377,inst_61378,inst_61379,inst_61380,inst_61381,state_val_61449,c__35961__auto___61531,steps_c,response_c){
return (function org$numenta$sanity$main$subscribe_to_steps_BANG__$_iter__61382(s__61383){
return (new cljs.core.LazySeq(null,((function (vec__61352,st,co,map__61353,regions,senses,inst_61356,inst_61355,inst_61357,inst_61377,inst_61378,inst_61379,inst_61380,inst_61381,state_val_61449,c__35961__auto___61531,steps_c,response_c){
return (function (){
var s__61383__$1 = s__61383;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__61383__$1);
if(temp__4653__auto__){
var s__61383__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__61383__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__61383__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__61385 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__61384 = (0);
while(true){
if((i__61384 < size__5453__auto__)){
var vec__61485 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__61384);
var rgn_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61485,(0),null);
var rgn = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61485,(1),null);
cljs.core.chunk_append(b__61385,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [rgn_id,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__5454__auto__ = ((function (i__61384,vec__61485,rgn_id,rgn,c__5452__auto__,size__5453__auto__,b__61385,s__61383__$2,temp__4653__auto__,vec__61352,st,co,map__61353,regions,senses,inst_61356,inst_61355,inst_61357,inst_61377,inst_61378,inst_61379,inst_61380,inst_61381,state_val_61449,c__35961__auto___61531,steps_c,response_c){
return (function org$numenta$sanity$main$subscribe_to_steps_BANG__$_iter__61382_$_iter__61486(s__61487){
return (new cljs.core.LazySeq(null,((function (i__61384,vec__61485,rgn_id,rgn,c__5452__auto__,size__5453__auto__,b__61385,s__61383__$2,temp__4653__auto__,vec__61352,st,co,map__61353,regions,senses,inst_61356,inst_61355,inst_61357,inst_61377,inst_61378,inst_61379,inst_61380,inst_61381,state_val_61449,c__35961__auto___61531,steps_c,response_c){
return (function (){
var s__61487__$1 = s__61487;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__61487__$1);
if(temp__4653__auto____$1){
var s__61487__$2 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__61487__$2)){
var c__5452__auto____$1 = cljs.core.chunk_first(s__61487__$2);
var size__5453__auto____$1 = cljs.core.count(c__5452__auto____$1);
var b__61489 = cljs.core.chunk_buffer(size__5453__auto____$1);
if((function (){var i__61488 = (0);
while(true){
if((i__61488 < size__5453__auto____$1)){
var vec__61494 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto____$1,i__61488);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61494,(0),null);
var lyr = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61494,(1),null);
cljs.core.chunk_append(b__61489,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lyr_id,clojure.walk.keywordize_keys(lyr)], null));

var G__61541 = (i__61488 + (1));
i__61488 = G__61541;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__61489),org$numenta$sanity$main$subscribe_to_steps_BANG__$_iter__61382_$_iter__61486(cljs.core.chunk_rest(s__61487__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__61489),null);
}
} else {
var vec__61495 = cljs.core.first(s__61487__$2);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61495,(0),null);
var lyr = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61495,(1),null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lyr_id,clojure.walk.keywordize_keys(lyr)], null),org$numenta$sanity$main$subscribe_to_steps_BANG__$_iter__61382_$_iter__61486(cljs.core.rest(s__61487__$2)));
}
} else {
return null;
}
break;
}
});})(i__61384,vec__61485,rgn_id,rgn,c__5452__auto__,size__5453__auto__,b__61385,s__61383__$2,temp__4653__auto__,vec__61352,st,co,map__61353,regions,senses,inst_61356,inst_61355,inst_61357,inst_61377,inst_61378,inst_61379,inst_61380,inst_61381,state_val_61449,c__35961__auto___61531,steps_c,response_c))
,null,null));
});})(i__61384,vec__61485,rgn_id,rgn,c__5452__auto__,size__5453__auto__,b__61385,s__61383__$2,temp__4653__auto__,vec__61352,st,co,map__61353,regions,senses,inst_61356,inst_61355,inst_61357,inst_61377,inst_61378,inst_61379,inst_61380,inst_61381,state_val_61449,c__35961__auto___61531,steps_c,response_c))
;
return iter__5454__auto__(rgn);
})())], null));

var G__61542 = (i__61384 + (1));
i__61384 = G__61542;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__61385),org$numenta$sanity$main$subscribe_to_steps_BANG__$_iter__61382(cljs.core.chunk_rest(s__61383__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__61385),null);
}
} else {
var vec__61496 = cljs.core.first(s__61383__$2);
var rgn_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61496,(0),null);
var rgn = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61496,(1),null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [rgn_id,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__5454__auto__ = ((function (vec__61496,rgn_id,rgn,s__61383__$2,temp__4653__auto__,vec__61352,st,co,map__61353,regions,senses,inst_61356,inst_61355,inst_61357,inst_61377,inst_61378,inst_61379,inst_61380,inst_61381,state_val_61449,c__35961__auto___61531,steps_c,response_c){
return (function org$numenta$sanity$main$subscribe_to_steps_BANG__$_iter__61382_$_iter__61497(s__61498){
return (new cljs.core.LazySeq(null,((function (vec__61496,rgn_id,rgn,s__61383__$2,temp__4653__auto__,vec__61352,st,co,map__61353,regions,senses,inst_61356,inst_61355,inst_61357,inst_61377,inst_61378,inst_61379,inst_61380,inst_61381,state_val_61449,c__35961__auto___61531,steps_c,response_c){
return (function (){
var s__61498__$1 = s__61498;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__61498__$1);
if(temp__4653__auto____$1){
var s__61498__$2 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__61498__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__61498__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__61500 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__61499 = (0);
while(true){
if((i__61499 < size__5453__auto__)){
var vec__61505 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__61499);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61505,(0),null);
var lyr = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61505,(1),null);
cljs.core.chunk_append(b__61500,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lyr_id,clojure.walk.keywordize_keys(lyr)], null));

var G__61543 = (i__61499 + (1));
i__61499 = G__61543;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__61500),org$numenta$sanity$main$subscribe_to_steps_BANG__$_iter__61382_$_iter__61497(cljs.core.chunk_rest(s__61498__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__61500),null);
}
} else {
var vec__61506 = cljs.core.first(s__61498__$2);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61506,(0),null);
var lyr = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61506,(1),null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lyr_id,clojure.walk.keywordize_keys(lyr)], null),org$numenta$sanity$main$subscribe_to_steps_BANG__$_iter__61382_$_iter__61497(cljs.core.rest(s__61498__$2)));
}
} else {
return null;
}
break;
}
});})(vec__61496,rgn_id,rgn,s__61383__$2,temp__4653__auto__,vec__61352,st,co,map__61353,regions,senses,inst_61356,inst_61355,inst_61357,inst_61377,inst_61378,inst_61379,inst_61380,inst_61381,state_val_61449,c__35961__auto___61531,steps_c,response_c))
,null,null));
});})(vec__61496,rgn_id,rgn,s__61383__$2,temp__4653__auto__,vec__61352,st,co,map__61353,regions,senses,inst_61356,inst_61355,inst_61357,inst_61377,inst_61378,inst_61379,inst_61380,inst_61381,state_val_61449,c__35961__auto___61531,steps_c,response_c))
;
return iter__5454__auto__(rgn);
})())], null),org$numenta$sanity$main$subscribe_to_steps_BANG__$_iter__61382(cljs.core.rest(s__61383__$2)));
}
} else {
return null;
}
break;
}
});})(vec__61352,st,co,map__61353,regions,senses,inst_61356,inst_61355,inst_61357,inst_61377,inst_61378,inst_61379,inst_61380,inst_61381,state_val_61449,c__35961__auto___61531,steps_c,response_c))
,null,null));
});
;})(vec__61352,st,co,map__61353,regions,senses,inst_61356,inst_61355,inst_61357,inst_61377,inst_61378,inst_61379,inst_61380,inst_61381,state_val_61449,c__35961__auto___61531,steps_c,response_c))
})();
var inst_61387 = (inst_61386.cljs$core$IFn$_invoke$arity$1 ? inst_61386.cljs$core$IFn$_invoke$arity$1(inst_61378) : inst_61386.call(null,inst_61378));
var inst_61388 = cljs.core.into.cljs$core$IFn$_invoke$arity$2(inst_61381,inst_61387);
var inst_61389 = cljs.core.PersistentHashMap.EMPTY;
var inst_61394 = (function (){var vec__61352 = inst_61355;
var st = inst_61356;
var co = inst_61357;
var map__61353 = inst_61377;
var regions = inst_61378;
var senses = inst_61379;
return ((function (vec__61352,st,co,map__61353,regions,senses,inst_61356,inst_61355,inst_61357,inst_61377,inst_61378,inst_61379,inst_61380,inst_61381,inst_61386,inst_61387,inst_61388,inst_61389,state_val_61449,c__35961__auto___61531,steps_c,response_c){
return (function org$numenta$sanity$main$subscribe_to_steps_BANG__$_iter__61390(s__61391){
return (new cljs.core.LazySeq(null,((function (vec__61352,st,co,map__61353,regions,senses,inst_61356,inst_61355,inst_61357,inst_61377,inst_61378,inst_61379,inst_61380,inst_61381,inst_61386,inst_61387,inst_61388,inst_61389,state_val_61449,c__35961__auto___61531,steps_c,response_c){
return (function (){
var s__61391__$1 = s__61391;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__61391__$1);
if(temp__4653__auto__){
var s__61391__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__61391__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__61391__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__61393 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__61392 = (0);
while(true){
if((i__61392 < size__5453__auto__)){
var vec__61511 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__61392);
var sense_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61511,(0),null);
var sense = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61511,(1),null);
cljs.core.chunk_append(b__61393,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [sense_id,clojure.walk.keywordize_keys(sense)], null));

var G__61544 = (i__61392 + (1));
i__61392 = G__61544;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__61393),org$numenta$sanity$main$subscribe_to_steps_BANG__$_iter__61390(cljs.core.chunk_rest(s__61391__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__61393),null);
}
} else {
var vec__61512 = cljs.core.first(s__61391__$2);
var sense_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61512,(0),null);
var sense = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61512,(1),null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [sense_id,clojure.walk.keywordize_keys(sense)], null),org$numenta$sanity$main$subscribe_to_steps_BANG__$_iter__61390(cljs.core.rest(s__61391__$2)));
}
} else {
return null;
}
break;
}
});})(vec__61352,st,co,map__61353,regions,senses,inst_61356,inst_61355,inst_61357,inst_61377,inst_61378,inst_61379,inst_61380,inst_61381,inst_61386,inst_61387,inst_61388,inst_61389,state_val_61449,c__35961__auto___61531,steps_c,response_c))
,null,null));
});
;})(vec__61352,st,co,map__61353,regions,senses,inst_61356,inst_61355,inst_61357,inst_61377,inst_61378,inst_61379,inst_61380,inst_61381,inst_61386,inst_61387,inst_61388,inst_61389,state_val_61449,c__35961__auto___61531,steps_c,response_c))
})();
var inst_61395 = (inst_61394.cljs$core$IFn$_invoke$arity$1 ? inst_61394.cljs$core$IFn$_invoke$arity$1(inst_61379) : inst_61394.call(null,inst_61379));
var inst_61396 = cljs.core.into.cljs$core$IFn$_invoke$arity$2(inst_61389,inst_61395);
var inst_61397 = [inst_61388,inst_61396];
var inst_61398 = cljs.core.PersistentHashMap.fromArrays(inst_61380,inst_61397);
var inst_61399 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.step_template,inst_61398) : cljs.core.reset_BANG_.call(null,org.numenta.sanity.main.step_template,inst_61398));
var inst_61400 = clojure.walk.keywordize_keys(inst_61357);
var inst_61401 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.capture_options,inst_61400) : cljs.core.reset_BANG_.call(null,org.numenta.sanity.main.capture_options,inst_61400));
var inst_61403 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.main.step_template) : cljs.core.deref.call(null,org.numenta.sanity.main.step_template));
var inst_61404 = cljs.core.cst$kw$regions.cljs$core$IFn$_invoke$arity$1(inst_61403);
var inst_61405 = cljs.core.seq(inst_61404);
var inst_61406 = cljs.core.first(inst_61405);
var inst_61407 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_61406,(0),null);
var inst_61408 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_61406,(1),null);
var inst_61409 = cljs.core.keys(inst_61408);
var inst_61410 = cljs.core.first(inst_61409);
var inst_61411 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_61412 = [cljs.core.cst$kw$dt,cljs.core.cst$kw$path];
var inst_61413 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_61414 = [cljs.core.cst$kw$regions,inst_61407,inst_61410];
var inst_61415 = (new cljs.core.PersistentVector(null,3,(5),inst_61413,inst_61414,null));
var inst_61416 = [(0),inst_61415];
var inst_61417 = cljs.core.PersistentHashMap.fromArrays(inst_61412,inst_61416);
var inst_61418 = [inst_61417];
var inst_61419 = (new cljs.core.PersistentVector(null,1,(5),inst_61411,inst_61418,null));
var inst_61420 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.selection,inst_61419) : cljs.core.reset_BANG_.call(null,org.numenta.sanity.main.selection,inst_61419));
var inst_61421 = (function (){return ((function (inst_61356,inst_61355,inst_61357,inst_61377,inst_61378,inst_61379,inst_61380,inst_61381,inst_61386,inst_61387,inst_61388,inst_61389,inst_61394,inst_61395,inst_61396,inst_61397,inst_61398,inst_61399,inst_61400,inst_61401,inst_61403,inst_61404,inst_61405,inst_61406,inst_61407,inst_61408,inst_61409,inst_61410,inst_61411,inst_61412,inst_61413,inst_61414,inst_61415,inst_61416,inst_61417,inst_61418,inst_61419,inst_61420,state_val_61449,c__35961__auto___61531,steps_c,response_c){
return (function (_,___$1,___$2,opts){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.into_journal,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["set-capture-options",clojure.walk.stringify_keys(opts)], null));
});
;})(inst_61356,inst_61355,inst_61357,inst_61377,inst_61378,inst_61379,inst_61380,inst_61381,inst_61386,inst_61387,inst_61388,inst_61389,inst_61394,inst_61395,inst_61396,inst_61397,inst_61398,inst_61399,inst_61400,inst_61401,inst_61403,inst_61404,inst_61405,inst_61406,inst_61407,inst_61408,inst_61409,inst_61410,inst_61411,inst_61412,inst_61413,inst_61414,inst_61415,inst_61416,inst_61417,inst_61418,inst_61419,inst_61420,state_val_61449,c__35961__auto___61531,steps_c,response_c))
})();
var inst_61422 = cljs.core.add_watch(org.numenta.sanity.main.capture_options,cljs.core.cst$kw$org$numenta$sanity$main_SLASH_push_DASH_to_DASH_server,inst_61421);
var state_61448__$1 = (function (){var statearr_61513 = state_61448;
(statearr_61513[(13)] = inst_61399);

(statearr_61513[(14)] = inst_61420);

(statearr_61513[(15)] = inst_61422);

(statearr_61513[(16)] = inst_61401);

return statearr_61513;
})();
var statearr_61514_61545 = state_61448__$1;
(statearr_61514_61545[(2)] = null);

(statearr_61514_61545[(1)] = (12));


return cljs.core.cst$kw$recur;
} else {
if((state_val_61449 === (9))){
var inst_61356 = (state_61448[(10)]);
var inst_61374 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,inst_61356);
var state_61448__$1 = state_61448;
var statearr_61515_61546 = state_61448__$1;
(statearr_61515_61546[(2)] = inst_61374);

(statearr_61515_61546[(1)] = (11));


return cljs.core.cst$kw$recur;
} else {
if((state_val_61449 === (5))){
var inst_61372 = (state_61448[(2)]);
var state_61448__$1 = state_61448;
if(cljs.core.truth_(inst_61372)){
var statearr_61516_61547 = state_61448__$1;
(statearr_61516_61547[(1)] = (9));

} else {
var statearr_61517_61548 = state_61448__$1;
(statearr_61517_61548[(1)] = (10));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_61449 === (14))){
var inst_61425 = (state_61448[(7)]);
var inst_61425__$1 = (state_61448[(2)]);
var state_61448__$1 = (function (){var statearr_61518 = state_61448;
(statearr_61518[(7)] = inst_61425__$1);

return statearr_61518;
})();
if(cljs.core.truth_(inst_61425__$1)){
var statearr_61519_61549 = state_61448__$1;
(statearr_61519_61549[(1)] = (15));

} else {
var statearr_61520_61550 = state_61448__$1;
(statearr_61520_61550[(1)] = (16));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_61449 === (16))){
var state_61448__$1 = state_61448;
var statearr_61521_61551 = state_61448__$1;
(statearr_61521_61551[(2)] = null);

(statearr_61521_61551[(1)] = (17));


return cljs.core.cst$kw$recur;
} else {
if((state_val_61449 === (10))){
var inst_61356 = (state_61448[(10)]);
var state_61448__$1 = state_61448;
var statearr_61522_61552 = state_61448__$1;
(statearr_61522_61552[(2)] = inst_61356);

(statearr_61522_61552[(1)] = (11));


return cljs.core.cst$kw$recur;
} else {
if((state_val_61449 === (8))){
var inst_61369 = (state_61448[(2)]);
var state_61448__$1 = state_61448;
var statearr_61523_61553 = state_61448__$1;
(statearr_61523_61553[(2)] = inst_61369);

(statearr_61523_61553[(1)] = (5));


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
});})(c__35961__auto___61531,steps_c,response_c))
;
return ((function (switch__35847__auto__,c__35961__auto___61531,steps_c,response_c){
return (function() {
var org$numenta$sanity$main$subscribe_to_steps_BANG__$_state_machine__35848__auto__ = null;
var org$numenta$sanity$main$subscribe_to_steps_BANG__$_state_machine__35848__auto____0 = (function (){
var statearr_61527 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_61527[(0)] = org$numenta$sanity$main$subscribe_to_steps_BANG__$_state_machine__35848__auto__);

(statearr_61527[(1)] = (1));

return statearr_61527;
});
var org$numenta$sanity$main$subscribe_to_steps_BANG__$_state_machine__35848__auto____1 = (function (state_61448){
while(true){
var ret_value__35849__auto__ = (function (){try{while(true){
var result__35850__auto__ = switch__35847__auto__(state_61448);
if(cljs.core.keyword_identical_QMARK_(result__35850__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__35850__auto__;
}
break;
}
}catch (e61528){if((e61528 instanceof Object)){
var ex__35851__auto__ = e61528;
var statearr_61529_61554 = state_61448;
(statearr_61529_61554[(5)] = ex__35851__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_61448);

return cljs.core.cst$kw$recur;
} else {
throw e61528;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35849__auto__,cljs.core.cst$kw$recur)){
var G__61555 = state_61448;
state_61448 = G__61555;
continue;
} else {
return ret_value__35849__auto__;
}
break;
}
});
org$numenta$sanity$main$subscribe_to_steps_BANG__$_state_machine__35848__auto__ = function(state_61448){
switch(arguments.length){
case 0:
return org$numenta$sanity$main$subscribe_to_steps_BANG__$_state_machine__35848__auto____0.call(this);
case 1:
return org$numenta$sanity$main$subscribe_to_steps_BANG__$_state_machine__35848__auto____1.call(this,state_61448);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$main$subscribe_to_steps_BANG__$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$main$subscribe_to_steps_BANG__$_state_machine__35848__auto____0;
org$numenta$sanity$main$subscribe_to_steps_BANG__$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$main$subscribe_to_steps_BANG__$_state_machine__35848__auto____1;
return org$numenta$sanity$main$subscribe_to_steps_BANG__$_state_machine__35848__auto__;
})()
;})(switch__35847__auto__,c__35961__auto___61531,steps_c,response_c))
})();
var state__35963__auto__ = (function (){var statearr_61530 = (f__35962__auto__.cljs$core$IFn$_invoke$arity$0 ? f__35962__auto__.cljs$core$IFn$_invoke$arity$0() : f__35962__auto__.call(null));
(statearr_61530[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__35961__auto___61531);

return statearr_61530;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__35963__auto__);
});})(c__35961__auto___61531,steps_c,response_c))
);


return steps_c;
});
org.numenta.sanity.main.subscription_data = org.numenta.sanity.main.subscribe_to_steps_BANG_();
org.numenta.sanity.main.unsubscribe_BANG_ = (function org$numenta$sanity$main$unsubscribe_BANG_(subscription_data){
var steps_c_61556 = subscription_data;
cljs.core.async.close_BANG_(steps_c_61556);

return cljs.core.remove_watch(org.numenta.sanity.main.viz_options,cljs.core.cst$kw$org$numenta$sanity$main_SLASH_keep_DASH_steps);
});
cljs.core.add_watch(org.numenta.sanity.main.steps,cljs.core.cst$kw$org$numenta$sanity$main_SLASH_recalculate_DASH_selection,(function (_,___$1,___$2,steps){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.selection,(function (p1__61557_SHARP_){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (sel){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(sel,cljs.core.cst$kw$model_DASH_id,cljs.core.cst$kw$model_DASH_id.cljs$core$IFn$_invoke$arity$1(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(steps,cljs.core.cst$kw$dt.cljs$core$IFn$_invoke$arity$1(sel))));
}),p1__61557_SHARP_);
}));
}));
org.numenta.sanity.main.main_pane = (function org$numenta$sanity$main$main_pane(_,___$1){
var size_invalidates_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
var c__35961__auto___61623 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__35961__auto___61623,size_invalidates_c){
return (function (){
var f__35962__auto__ = (function (){var switch__35847__auto__ = ((function (c__35961__auto___61623,size_invalidates_c){
return (function (state_61607){
var state_val_61608 = (state_61607[(1)]);
if((state_val_61608 === (1))){
var state_61607__$1 = state_61607;
var statearr_61609_61624 = state_61607__$1;
(statearr_61609_61624[(2)] = null);

(statearr_61609_61624[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_61608 === (2))){
var inst_61592 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_61593 = [cljs.core.cst$kw$drawing,cljs.core.cst$kw$max_DASH_height_DASH_px];
var inst_61594 = (new cljs.core.PersistentVector(null,2,(5),inst_61592,inst_61593,null));
var inst_61595 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.main.viz_options,cljs.core.assoc_in,inst_61594,window.innerHeight);
var state_61607__$1 = (function (){var statearr_61610 = state_61607;
(statearr_61610[(7)] = inst_61595);

return statearr_61610;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_61607__$1,(4),size_invalidates_c);
} else {
if((state_val_61608 === (3))){
var inst_61605 = (state_61607[(2)]);
var state_61607__$1 = state_61607;
return cljs.core.async.impl.ioc_helpers.return_chan(state_61607__$1,inst_61605);
} else {
if((state_val_61608 === (4))){
var inst_61597 = (state_61607[(2)]);
var inst_61598 = (inst_61597 == null);
var state_61607__$1 = state_61607;
if(cljs.core.truth_(inst_61598)){
var statearr_61611_61625 = state_61607__$1;
(statearr_61611_61625[(1)] = (5));

} else {
var statearr_61612_61626 = state_61607__$1;
(statearr_61612_61626[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_61608 === (5))){
var state_61607__$1 = state_61607;
var statearr_61613_61627 = state_61607__$1;
(statearr_61613_61627[(2)] = null);

(statearr_61613_61627[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_61608 === (6))){
var state_61607__$1 = state_61607;
var statearr_61614_61628 = state_61607__$1;
(statearr_61614_61628[(2)] = null);

(statearr_61614_61628[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_61608 === (7))){
var inst_61603 = (state_61607[(2)]);
var state_61607__$1 = state_61607;
var statearr_61615_61629 = state_61607__$1;
(statearr_61615_61629[(2)] = inst_61603);

(statearr_61615_61629[(1)] = (3));


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
});})(c__35961__auto___61623,size_invalidates_c))
;
return ((function (switch__35847__auto__,c__35961__auto___61623,size_invalidates_c){
return (function() {
var org$numenta$sanity$main$main_pane_$_state_machine__35848__auto__ = null;
var org$numenta$sanity$main$main_pane_$_state_machine__35848__auto____0 = (function (){
var statearr_61619 = [null,null,null,null,null,null,null,null];
(statearr_61619[(0)] = org$numenta$sanity$main$main_pane_$_state_machine__35848__auto__);

(statearr_61619[(1)] = (1));

return statearr_61619;
});
var org$numenta$sanity$main$main_pane_$_state_machine__35848__auto____1 = (function (state_61607){
while(true){
var ret_value__35849__auto__ = (function (){try{while(true){
var result__35850__auto__ = switch__35847__auto__(state_61607);
if(cljs.core.keyword_identical_QMARK_(result__35850__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__35850__auto__;
}
break;
}
}catch (e61620){if((e61620 instanceof Object)){
var ex__35851__auto__ = e61620;
var statearr_61621_61630 = state_61607;
(statearr_61621_61630[(5)] = ex__35851__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_61607);

return cljs.core.cst$kw$recur;
} else {
throw e61620;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35849__auto__,cljs.core.cst$kw$recur)){
var G__61631 = state_61607;
state_61607 = G__61631;
continue;
} else {
return ret_value__35849__auto__;
}
break;
}
});
org$numenta$sanity$main$main_pane_$_state_machine__35848__auto__ = function(state_61607){
switch(arguments.length){
case 0:
return org$numenta$sanity$main$main_pane_$_state_machine__35848__auto____0.call(this);
case 1:
return org$numenta$sanity$main$main_pane_$_state_machine__35848__auto____1.call(this,state_61607);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$main$main_pane_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$main$main_pane_$_state_machine__35848__auto____0;
org$numenta$sanity$main$main_pane_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$main$main_pane_$_state_machine__35848__auto____1;
return org$numenta$sanity$main$main_pane_$_state_machine__35848__auto__;
})()
;})(switch__35847__auto__,c__35961__auto___61623,size_invalidates_c))
})();
var state__35963__auto__ = (function (){var statearr_61622 = (f__35962__auto__.cljs$core$IFn$_invoke$arity$0 ? f__35962__auto__.cljs$core$IFn$_invoke$arity$0() : f__35962__auto__.call(null));
(statearr_61622[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__35961__auto___61623);

return statearr_61622;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__35963__auto__);
});})(c__35961__auto___61623,size_invalidates_c))
);


return ((function (size_invalidates_c){
return (function (world_pane,into_sim){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$container_DASH_fluid,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$on_DASH_click,((function (size_invalidates_c){
return (function (){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.into_viz,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$background_DASH_clicked], null));
});})(size_invalidates_c))
,cljs.core.cst$kw$on_DASH_key_DASH_down,((function (size_invalidates_c){
return (function (p1__61558_SHARP_){
return org.numenta.sanity.viz_canvas.viz_key_down(p1__61558_SHARP_,org.numenta.sanity.main.into_viz);
});})(size_invalidates_c))
,cljs.core.cst$kw$tabIndex,(1)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$row,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.viz_canvas.viz_timeline,org.numenta.sanity.main.steps,org.numenta.sanity.main.selection,org.numenta.sanity.main.capture_options], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$row,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_3$col_DASH_lg_DASH_2,world_pane], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_9$col_DASH_lg_DASH_10,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$overflow,"auto"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.helpers.window_resize_listener,size_invalidates_c], null),new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.viz_canvas.viz_canvas,null,org.numenta.sanity.main.steps,org.numenta.sanity.main.selection,org.numenta.sanity.main.step_template,org.numenta.sanity.main.viz_options,org.numenta.sanity.main.into_viz,into_sim,org.numenta.sanity.main.into_journal], null)], null)], null)], null);
});
;})(size_invalidates_c))
});
org.numenta.sanity.main.sanity_app = (function org$numenta$sanity$main$sanity_app(title,model_tab,world_pane,features,into_sim){
return new cljs.core.PersistentVector(null, 15, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.controls_ui.sanity_app,title,model_tab,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.main.main_pane,world_pane,into_sim], null),features,org.numenta.sanity.main.capture_options,org.numenta.sanity.main.viz_options,org.numenta.sanity.main.selection,org.numenta.sanity.main.steps,org.numenta.sanity.main.step_template,org.numenta.sanity.viz_canvas.state_colors,org.numenta.sanity.main.into_viz,into_sim,org.numenta.sanity.main.into_journal,org.numenta.sanity.main.debug_data], null);
});
org.numenta.sanity.main.selected_step = (function org$numenta$sanity$main$selected_step(var_args){
var args61632 = [];
var len__5740__auto___61635 = arguments.length;
var i__5741__auto___61636 = (0);
while(true){
if((i__5741__auto___61636 < len__5740__auto___61635)){
args61632.push((arguments[i__5741__auto___61636]));

var G__61637 = (i__5741__auto___61636 + (1));
i__5741__auto___61636 = G__61637;
continue;
} else {
}
break;
}

var G__61634 = args61632.length;
switch (G__61634) {
case 0:
return org.numenta.sanity.main.selected_step.cljs$core$IFn$_invoke$arity$0();

break;
case 2:
return org.numenta.sanity.main.selected_step.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args61632.length)].join('')));

}
});

org.numenta.sanity.main.selected_step.cljs$core$IFn$_invoke$arity$0 = (function (){
return org.numenta.sanity.main.selected_step.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.steps,org.numenta.sanity.main.selection);
});

org.numenta.sanity.main.selected_step.cljs$core$IFn$_invoke$arity$2 = (function (steps,selection){
var temp__4653__auto__ = cljs.core.cst$kw$dt.cljs$core$IFn$_invoke$arity$1(cljs.core.first((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selection) : cljs.core.deref.call(null,selection))));
if(cljs.core.truth_(temp__4653__auto__)){
var dt = temp__4653__auto__;
return cljs.core.nth.cljs$core$IFn$_invoke$arity$3((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(steps) : cljs.core.deref.call(null,steps)),dt,null);
} else {
return null;
}
});

org.numenta.sanity.main.selected_step.cljs$lang$maxFixedArity = 2;
