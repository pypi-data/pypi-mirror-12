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

var c__35961__auto___61529 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__35961__auto___61529,steps_c,response_c){
return (function (){
var f__35962__auto__ = (function (){var switch__35847__auto__ = ((function (c__35961__auto___61529,steps_c,response_c){
return (function (state_61446){
var state_val_61447 = (state_61446[(1)]);
if((state_val_61447 === (7))){
var state_61446__$1 = state_61446;
var statearr_61448_61530 = state_61446__$1;
(statearr_61448_61530[(2)] = false);

(statearr_61448_61530[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_61447 === (1))){
var state_61446__$1 = state_61446;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_61446__$1,(2),response_c);
} else {
if((state_val_61447 === (4))){
var state_61446__$1 = state_61446;
var statearr_61449_61531 = state_61446__$1;
(statearr_61449_61531[(2)] = false);

(statearr_61449_61531[(1)] = (5));


return cljs.core.cst$kw$recur;
} else {
if((state_val_61447 === (15))){
var inst_61423 = (state_61446[(7)]);
var inst_61426 = clojure.walk.keywordize_keys(inst_61423);
var inst_61427 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.main.capture_options) : cljs.core.deref.call(null,org.numenta.sanity.main.capture_options));
var inst_61428 = cljs.core.cst$kw$keep_DASH_steps.cljs$core$IFn$_invoke$arity$1(inst_61427);
var inst_61429 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.main.steps) : cljs.core.deref.call(null,org.numenta.sanity.main.steps));
var inst_61430 = cljs.core.cons(inst_61426,inst_61429);
var inst_61431 = cljs.core.split_at(inst_61428,inst_61430);
var inst_61432 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_61431,(0),null);
var inst_61433 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_61431,(1),null);
var inst_61434 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.steps,inst_61432) : cljs.core.reset_BANG_.call(null,org.numenta.sanity.main.steps,inst_61432));
var inst_61435 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_61436 = [cljs.core.cst$kw$drop_DASH_steps_DASH_data,inst_61433];
var inst_61437 = (new cljs.core.PersistentVector(null,2,(5),inst_61435,inst_61436,null));
var inst_61438 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.into_viz,inst_61437);
var state_61446__$1 = (function (){var statearr_61450 = state_61446;
(statearr_61450[(8)] = inst_61438);

(statearr_61450[(9)] = inst_61434);

return statearr_61450;
})();
var statearr_61451_61532 = state_61446__$1;
(statearr_61451_61532[(2)] = null);

(statearr_61451_61532[(1)] = (12));


return cljs.core.cst$kw$recur;
} else {
if((state_val_61447 === (13))){
var inst_61444 = (state_61446[(2)]);
var state_61446__$1 = state_61446;
return cljs.core.async.impl.ioc_helpers.return_chan(state_61446__$1,inst_61444);
} else {
if((state_val_61447 === (6))){
var state_61446__$1 = state_61446;
var statearr_61452_61533 = state_61446__$1;
(statearr_61452_61533[(2)] = true);

(statearr_61452_61533[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_61447 === (17))){
var inst_61442 = (state_61446[(2)]);
var state_61446__$1 = state_61446;
var statearr_61453_61534 = state_61446__$1;
(statearr_61453_61534[(2)] = inst_61442);

(statearr_61453_61534[(1)] = (13));


return cljs.core.cst$kw$recur;
} else {
if((state_val_61447 === (3))){
var inst_61354 = (state_61446[(10)]);
var inst_61360 = inst_61354.cljs$lang$protocol_mask$partition0$;
var inst_61361 = (inst_61360 & (64));
var inst_61362 = inst_61354.cljs$core$ISeq$;
var inst_61363 = (inst_61361) || (inst_61362);
var state_61446__$1 = state_61446;
if(cljs.core.truth_(inst_61363)){
var statearr_61454_61535 = state_61446__$1;
(statearr_61454_61535[(1)] = (6));

} else {
var statearr_61455_61536 = state_61446__$1;
(statearr_61455_61536[(1)] = (7));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_61447 === (12))){
var state_61446__$1 = state_61446;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_61446__$1,(14),steps_c);
} else {
if((state_val_61447 === (2))){
var inst_61353 = (state_61446[(11)]);
var inst_61354 = (state_61446[(10)]);
var inst_61353__$1 = (state_61446[(2)]);
var inst_61354__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_61353__$1,(0),null);
var inst_61355 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_61353__$1,(1),null);
var inst_61357 = (inst_61354__$1 == null);
var inst_61358 = cljs.core.not(inst_61357);
var state_61446__$1 = (function (){var statearr_61456 = state_61446;
(statearr_61456[(11)] = inst_61353__$1);

(statearr_61456[(12)] = inst_61355);

(statearr_61456[(10)] = inst_61354__$1);

return statearr_61456;
})();
if(inst_61358){
var statearr_61457_61537 = state_61446__$1;
(statearr_61457_61537[(1)] = (3));

} else {
var statearr_61458_61538 = state_61446__$1;
(statearr_61458_61538[(1)] = (4));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_61447 === (11))){
var inst_61353 = (state_61446[(11)]);
var inst_61355 = (state_61446[(12)]);
var inst_61354 = (state_61446[(10)]);
var inst_61375 = (state_61446[(2)]);
var inst_61376 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_61375,"regions");
var inst_61377 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_61375,"senses");
var inst_61378 = [cljs.core.cst$kw$regions,cljs.core.cst$kw$senses];
var inst_61379 = cljs.core.PersistentHashMap.EMPTY;
var inst_61384 = (function (){var vec__61350 = inst_61353;
var st = inst_61354;
var co = inst_61355;
var map__61351 = inst_61375;
var regions = inst_61376;
var senses = inst_61377;
return ((function (vec__61350,st,co,map__61351,regions,senses,inst_61353,inst_61355,inst_61354,inst_61375,inst_61376,inst_61377,inst_61378,inst_61379,state_val_61447,c__35961__auto___61529,steps_c,response_c){
return (function org$numenta$sanity$main$subscribe_to_steps_BANG__$_iter__61380(s__61381){
return (new cljs.core.LazySeq(null,((function (vec__61350,st,co,map__61351,regions,senses,inst_61353,inst_61355,inst_61354,inst_61375,inst_61376,inst_61377,inst_61378,inst_61379,state_val_61447,c__35961__auto___61529,steps_c,response_c){
return (function (){
var s__61381__$1 = s__61381;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__61381__$1);
if(temp__4653__auto__){
var s__61381__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__61381__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__61381__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__61383 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__61382 = (0);
while(true){
if((i__61382 < size__5453__auto__)){
var vec__61483 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__61382);
var rgn_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61483,(0),null);
var rgn = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61483,(1),null);
cljs.core.chunk_append(b__61383,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [rgn_id,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__5454__auto__ = ((function (i__61382,vec__61483,rgn_id,rgn,c__5452__auto__,size__5453__auto__,b__61383,s__61381__$2,temp__4653__auto__,vec__61350,st,co,map__61351,regions,senses,inst_61353,inst_61355,inst_61354,inst_61375,inst_61376,inst_61377,inst_61378,inst_61379,state_val_61447,c__35961__auto___61529,steps_c,response_c){
return (function org$numenta$sanity$main$subscribe_to_steps_BANG__$_iter__61380_$_iter__61484(s__61485){
return (new cljs.core.LazySeq(null,((function (i__61382,vec__61483,rgn_id,rgn,c__5452__auto__,size__5453__auto__,b__61383,s__61381__$2,temp__4653__auto__,vec__61350,st,co,map__61351,regions,senses,inst_61353,inst_61355,inst_61354,inst_61375,inst_61376,inst_61377,inst_61378,inst_61379,state_val_61447,c__35961__auto___61529,steps_c,response_c){
return (function (){
var s__61485__$1 = s__61485;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__61485__$1);
if(temp__4653__auto____$1){
var s__61485__$2 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__61485__$2)){
var c__5452__auto____$1 = cljs.core.chunk_first(s__61485__$2);
var size__5453__auto____$1 = cljs.core.count(c__5452__auto____$1);
var b__61487 = cljs.core.chunk_buffer(size__5453__auto____$1);
if((function (){var i__61486 = (0);
while(true){
if((i__61486 < size__5453__auto____$1)){
var vec__61492 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto____$1,i__61486);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61492,(0),null);
var lyr = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61492,(1),null);
cljs.core.chunk_append(b__61487,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lyr_id,clojure.walk.keywordize_keys(lyr)], null));

var G__61539 = (i__61486 + (1));
i__61486 = G__61539;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__61487),org$numenta$sanity$main$subscribe_to_steps_BANG__$_iter__61380_$_iter__61484(cljs.core.chunk_rest(s__61485__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__61487),null);
}
} else {
var vec__61493 = cljs.core.first(s__61485__$2);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61493,(0),null);
var lyr = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61493,(1),null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lyr_id,clojure.walk.keywordize_keys(lyr)], null),org$numenta$sanity$main$subscribe_to_steps_BANG__$_iter__61380_$_iter__61484(cljs.core.rest(s__61485__$2)));
}
} else {
return null;
}
break;
}
});})(i__61382,vec__61483,rgn_id,rgn,c__5452__auto__,size__5453__auto__,b__61383,s__61381__$2,temp__4653__auto__,vec__61350,st,co,map__61351,regions,senses,inst_61353,inst_61355,inst_61354,inst_61375,inst_61376,inst_61377,inst_61378,inst_61379,state_val_61447,c__35961__auto___61529,steps_c,response_c))
,null,null));
});})(i__61382,vec__61483,rgn_id,rgn,c__5452__auto__,size__5453__auto__,b__61383,s__61381__$2,temp__4653__auto__,vec__61350,st,co,map__61351,regions,senses,inst_61353,inst_61355,inst_61354,inst_61375,inst_61376,inst_61377,inst_61378,inst_61379,state_val_61447,c__35961__auto___61529,steps_c,response_c))
;
return iter__5454__auto__(rgn);
})())], null));

var G__61540 = (i__61382 + (1));
i__61382 = G__61540;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__61383),org$numenta$sanity$main$subscribe_to_steps_BANG__$_iter__61380(cljs.core.chunk_rest(s__61381__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__61383),null);
}
} else {
var vec__61494 = cljs.core.first(s__61381__$2);
var rgn_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61494,(0),null);
var rgn = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61494,(1),null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [rgn_id,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__5454__auto__ = ((function (vec__61494,rgn_id,rgn,s__61381__$2,temp__4653__auto__,vec__61350,st,co,map__61351,regions,senses,inst_61353,inst_61355,inst_61354,inst_61375,inst_61376,inst_61377,inst_61378,inst_61379,state_val_61447,c__35961__auto___61529,steps_c,response_c){
return (function org$numenta$sanity$main$subscribe_to_steps_BANG__$_iter__61380_$_iter__61495(s__61496){
return (new cljs.core.LazySeq(null,((function (vec__61494,rgn_id,rgn,s__61381__$2,temp__4653__auto__,vec__61350,st,co,map__61351,regions,senses,inst_61353,inst_61355,inst_61354,inst_61375,inst_61376,inst_61377,inst_61378,inst_61379,state_val_61447,c__35961__auto___61529,steps_c,response_c){
return (function (){
var s__61496__$1 = s__61496;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__61496__$1);
if(temp__4653__auto____$1){
var s__61496__$2 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__61496__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__61496__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__61498 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__61497 = (0);
while(true){
if((i__61497 < size__5453__auto__)){
var vec__61503 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__61497);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61503,(0),null);
var lyr = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61503,(1),null);
cljs.core.chunk_append(b__61498,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lyr_id,clojure.walk.keywordize_keys(lyr)], null));

var G__61541 = (i__61497 + (1));
i__61497 = G__61541;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__61498),org$numenta$sanity$main$subscribe_to_steps_BANG__$_iter__61380_$_iter__61495(cljs.core.chunk_rest(s__61496__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__61498),null);
}
} else {
var vec__61504 = cljs.core.first(s__61496__$2);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61504,(0),null);
var lyr = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61504,(1),null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lyr_id,clojure.walk.keywordize_keys(lyr)], null),org$numenta$sanity$main$subscribe_to_steps_BANG__$_iter__61380_$_iter__61495(cljs.core.rest(s__61496__$2)));
}
} else {
return null;
}
break;
}
});})(vec__61494,rgn_id,rgn,s__61381__$2,temp__4653__auto__,vec__61350,st,co,map__61351,regions,senses,inst_61353,inst_61355,inst_61354,inst_61375,inst_61376,inst_61377,inst_61378,inst_61379,state_val_61447,c__35961__auto___61529,steps_c,response_c))
,null,null));
});})(vec__61494,rgn_id,rgn,s__61381__$2,temp__4653__auto__,vec__61350,st,co,map__61351,regions,senses,inst_61353,inst_61355,inst_61354,inst_61375,inst_61376,inst_61377,inst_61378,inst_61379,state_val_61447,c__35961__auto___61529,steps_c,response_c))
;
return iter__5454__auto__(rgn);
})())], null),org$numenta$sanity$main$subscribe_to_steps_BANG__$_iter__61380(cljs.core.rest(s__61381__$2)));
}
} else {
return null;
}
break;
}
});})(vec__61350,st,co,map__61351,regions,senses,inst_61353,inst_61355,inst_61354,inst_61375,inst_61376,inst_61377,inst_61378,inst_61379,state_val_61447,c__35961__auto___61529,steps_c,response_c))
,null,null));
});
;})(vec__61350,st,co,map__61351,regions,senses,inst_61353,inst_61355,inst_61354,inst_61375,inst_61376,inst_61377,inst_61378,inst_61379,state_val_61447,c__35961__auto___61529,steps_c,response_c))
})();
var inst_61385 = (inst_61384.cljs$core$IFn$_invoke$arity$1 ? inst_61384.cljs$core$IFn$_invoke$arity$1(inst_61376) : inst_61384.call(null,inst_61376));
var inst_61386 = cljs.core.into.cljs$core$IFn$_invoke$arity$2(inst_61379,inst_61385);
var inst_61387 = cljs.core.PersistentHashMap.EMPTY;
var inst_61392 = (function (){var vec__61350 = inst_61353;
var st = inst_61354;
var co = inst_61355;
var map__61351 = inst_61375;
var regions = inst_61376;
var senses = inst_61377;
return ((function (vec__61350,st,co,map__61351,regions,senses,inst_61353,inst_61355,inst_61354,inst_61375,inst_61376,inst_61377,inst_61378,inst_61379,inst_61384,inst_61385,inst_61386,inst_61387,state_val_61447,c__35961__auto___61529,steps_c,response_c){
return (function org$numenta$sanity$main$subscribe_to_steps_BANG__$_iter__61388(s__61389){
return (new cljs.core.LazySeq(null,((function (vec__61350,st,co,map__61351,regions,senses,inst_61353,inst_61355,inst_61354,inst_61375,inst_61376,inst_61377,inst_61378,inst_61379,inst_61384,inst_61385,inst_61386,inst_61387,state_val_61447,c__35961__auto___61529,steps_c,response_c){
return (function (){
var s__61389__$1 = s__61389;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__61389__$1);
if(temp__4653__auto__){
var s__61389__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__61389__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__61389__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__61391 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__61390 = (0);
while(true){
if((i__61390 < size__5453__auto__)){
var vec__61509 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__61390);
var sense_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61509,(0),null);
var sense = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61509,(1),null);
cljs.core.chunk_append(b__61391,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [sense_id,clojure.walk.keywordize_keys(sense)], null));

var G__61542 = (i__61390 + (1));
i__61390 = G__61542;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__61391),org$numenta$sanity$main$subscribe_to_steps_BANG__$_iter__61388(cljs.core.chunk_rest(s__61389__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__61391),null);
}
} else {
var vec__61510 = cljs.core.first(s__61389__$2);
var sense_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61510,(0),null);
var sense = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61510,(1),null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [sense_id,clojure.walk.keywordize_keys(sense)], null),org$numenta$sanity$main$subscribe_to_steps_BANG__$_iter__61388(cljs.core.rest(s__61389__$2)));
}
} else {
return null;
}
break;
}
});})(vec__61350,st,co,map__61351,regions,senses,inst_61353,inst_61355,inst_61354,inst_61375,inst_61376,inst_61377,inst_61378,inst_61379,inst_61384,inst_61385,inst_61386,inst_61387,state_val_61447,c__35961__auto___61529,steps_c,response_c))
,null,null));
});
;})(vec__61350,st,co,map__61351,regions,senses,inst_61353,inst_61355,inst_61354,inst_61375,inst_61376,inst_61377,inst_61378,inst_61379,inst_61384,inst_61385,inst_61386,inst_61387,state_val_61447,c__35961__auto___61529,steps_c,response_c))
})();
var inst_61393 = (inst_61392.cljs$core$IFn$_invoke$arity$1 ? inst_61392.cljs$core$IFn$_invoke$arity$1(inst_61377) : inst_61392.call(null,inst_61377));
var inst_61394 = cljs.core.into.cljs$core$IFn$_invoke$arity$2(inst_61387,inst_61393);
var inst_61395 = [inst_61386,inst_61394];
var inst_61396 = cljs.core.PersistentHashMap.fromArrays(inst_61378,inst_61395);
var inst_61397 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.step_template,inst_61396) : cljs.core.reset_BANG_.call(null,org.numenta.sanity.main.step_template,inst_61396));
var inst_61398 = clojure.walk.keywordize_keys(inst_61355);
var inst_61399 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.capture_options,inst_61398) : cljs.core.reset_BANG_.call(null,org.numenta.sanity.main.capture_options,inst_61398));
var inst_61401 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.main.step_template) : cljs.core.deref.call(null,org.numenta.sanity.main.step_template));
var inst_61402 = cljs.core.cst$kw$regions.cljs$core$IFn$_invoke$arity$1(inst_61401);
var inst_61403 = cljs.core.seq(inst_61402);
var inst_61404 = cljs.core.first(inst_61403);
var inst_61405 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_61404,(0),null);
var inst_61406 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_61404,(1),null);
var inst_61407 = cljs.core.keys(inst_61406);
var inst_61408 = cljs.core.first(inst_61407);
var inst_61409 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_61410 = [cljs.core.cst$kw$dt,cljs.core.cst$kw$path];
var inst_61411 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_61412 = [cljs.core.cst$kw$regions,inst_61405,inst_61408];
var inst_61413 = (new cljs.core.PersistentVector(null,3,(5),inst_61411,inst_61412,null));
var inst_61414 = [(0),inst_61413];
var inst_61415 = cljs.core.PersistentHashMap.fromArrays(inst_61410,inst_61414);
var inst_61416 = [inst_61415];
var inst_61417 = (new cljs.core.PersistentVector(null,1,(5),inst_61409,inst_61416,null));
var inst_61418 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.selection,inst_61417) : cljs.core.reset_BANG_.call(null,org.numenta.sanity.main.selection,inst_61417));
var inst_61419 = (function (){return ((function (inst_61353,inst_61355,inst_61354,inst_61375,inst_61376,inst_61377,inst_61378,inst_61379,inst_61384,inst_61385,inst_61386,inst_61387,inst_61392,inst_61393,inst_61394,inst_61395,inst_61396,inst_61397,inst_61398,inst_61399,inst_61401,inst_61402,inst_61403,inst_61404,inst_61405,inst_61406,inst_61407,inst_61408,inst_61409,inst_61410,inst_61411,inst_61412,inst_61413,inst_61414,inst_61415,inst_61416,inst_61417,inst_61418,state_val_61447,c__35961__auto___61529,steps_c,response_c){
return (function (_,___$1,___$2,opts){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.into_journal,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["set-capture-options",clojure.walk.stringify_keys(opts)], null));
});
;})(inst_61353,inst_61355,inst_61354,inst_61375,inst_61376,inst_61377,inst_61378,inst_61379,inst_61384,inst_61385,inst_61386,inst_61387,inst_61392,inst_61393,inst_61394,inst_61395,inst_61396,inst_61397,inst_61398,inst_61399,inst_61401,inst_61402,inst_61403,inst_61404,inst_61405,inst_61406,inst_61407,inst_61408,inst_61409,inst_61410,inst_61411,inst_61412,inst_61413,inst_61414,inst_61415,inst_61416,inst_61417,inst_61418,state_val_61447,c__35961__auto___61529,steps_c,response_c))
})();
var inst_61420 = cljs.core.add_watch(org.numenta.sanity.main.capture_options,cljs.core.cst$kw$org$numenta$sanity$main_SLASH_push_DASH_to_DASH_server,inst_61419);
var state_61446__$1 = (function (){var statearr_61511 = state_61446;
(statearr_61511[(13)] = inst_61399);

(statearr_61511[(14)] = inst_61397);

(statearr_61511[(15)] = inst_61420);

(statearr_61511[(16)] = inst_61418);

return statearr_61511;
})();
var statearr_61512_61543 = state_61446__$1;
(statearr_61512_61543[(2)] = null);

(statearr_61512_61543[(1)] = (12));


return cljs.core.cst$kw$recur;
} else {
if((state_val_61447 === (9))){
var inst_61354 = (state_61446[(10)]);
var inst_61372 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,inst_61354);
var state_61446__$1 = state_61446;
var statearr_61513_61544 = state_61446__$1;
(statearr_61513_61544[(2)] = inst_61372);

(statearr_61513_61544[(1)] = (11));


return cljs.core.cst$kw$recur;
} else {
if((state_val_61447 === (5))){
var inst_61370 = (state_61446[(2)]);
var state_61446__$1 = state_61446;
if(cljs.core.truth_(inst_61370)){
var statearr_61514_61545 = state_61446__$1;
(statearr_61514_61545[(1)] = (9));

} else {
var statearr_61515_61546 = state_61446__$1;
(statearr_61515_61546[(1)] = (10));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_61447 === (14))){
var inst_61423 = (state_61446[(7)]);
var inst_61423__$1 = (state_61446[(2)]);
var state_61446__$1 = (function (){var statearr_61516 = state_61446;
(statearr_61516[(7)] = inst_61423__$1);

return statearr_61516;
})();
if(cljs.core.truth_(inst_61423__$1)){
var statearr_61517_61547 = state_61446__$1;
(statearr_61517_61547[(1)] = (15));

} else {
var statearr_61518_61548 = state_61446__$1;
(statearr_61518_61548[(1)] = (16));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_61447 === (16))){
var state_61446__$1 = state_61446;
var statearr_61519_61549 = state_61446__$1;
(statearr_61519_61549[(2)] = null);

(statearr_61519_61549[(1)] = (17));


return cljs.core.cst$kw$recur;
} else {
if((state_val_61447 === (10))){
var inst_61354 = (state_61446[(10)]);
var state_61446__$1 = state_61446;
var statearr_61520_61550 = state_61446__$1;
(statearr_61520_61550[(2)] = inst_61354);

(statearr_61520_61550[(1)] = (11));


return cljs.core.cst$kw$recur;
} else {
if((state_val_61447 === (8))){
var inst_61367 = (state_61446[(2)]);
var state_61446__$1 = state_61446;
var statearr_61521_61551 = state_61446__$1;
(statearr_61521_61551[(2)] = inst_61367);

(statearr_61521_61551[(1)] = (5));


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
});})(c__35961__auto___61529,steps_c,response_c))
;
return ((function (switch__35847__auto__,c__35961__auto___61529,steps_c,response_c){
return (function() {
var org$numenta$sanity$main$subscribe_to_steps_BANG__$_state_machine__35848__auto__ = null;
var org$numenta$sanity$main$subscribe_to_steps_BANG__$_state_machine__35848__auto____0 = (function (){
var statearr_61525 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_61525[(0)] = org$numenta$sanity$main$subscribe_to_steps_BANG__$_state_machine__35848__auto__);

(statearr_61525[(1)] = (1));

return statearr_61525;
});
var org$numenta$sanity$main$subscribe_to_steps_BANG__$_state_machine__35848__auto____1 = (function (state_61446){
while(true){
var ret_value__35849__auto__ = (function (){try{while(true){
var result__35850__auto__ = switch__35847__auto__(state_61446);
if(cljs.core.keyword_identical_QMARK_(result__35850__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__35850__auto__;
}
break;
}
}catch (e61526){if((e61526 instanceof Object)){
var ex__35851__auto__ = e61526;
var statearr_61527_61552 = state_61446;
(statearr_61527_61552[(5)] = ex__35851__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_61446);

return cljs.core.cst$kw$recur;
} else {
throw e61526;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35849__auto__,cljs.core.cst$kw$recur)){
var G__61553 = state_61446;
state_61446 = G__61553;
continue;
} else {
return ret_value__35849__auto__;
}
break;
}
});
org$numenta$sanity$main$subscribe_to_steps_BANG__$_state_machine__35848__auto__ = function(state_61446){
switch(arguments.length){
case 0:
return org$numenta$sanity$main$subscribe_to_steps_BANG__$_state_machine__35848__auto____0.call(this);
case 1:
return org$numenta$sanity$main$subscribe_to_steps_BANG__$_state_machine__35848__auto____1.call(this,state_61446);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$main$subscribe_to_steps_BANG__$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$main$subscribe_to_steps_BANG__$_state_machine__35848__auto____0;
org$numenta$sanity$main$subscribe_to_steps_BANG__$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$main$subscribe_to_steps_BANG__$_state_machine__35848__auto____1;
return org$numenta$sanity$main$subscribe_to_steps_BANG__$_state_machine__35848__auto__;
})()
;})(switch__35847__auto__,c__35961__auto___61529,steps_c,response_c))
})();
var state__35963__auto__ = (function (){var statearr_61528 = (f__35962__auto__.cljs$core$IFn$_invoke$arity$0 ? f__35962__auto__.cljs$core$IFn$_invoke$arity$0() : f__35962__auto__.call(null));
(statearr_61528[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__35961__auto___61529);

return statearr_61528;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__35963__auto__);
});})(c__35961__auto___61529,steps_c,response_c))
);


return steps_c;
});
org.numenta.sanity.main.subscription_data = org.numenta.sanity.main.subscribe_to_steps_BANG_();
org.numenta.sanity.main.unsubscribe_BANG_ = (function org$numenta$sanity$main$unsubscribe_BANG_(subscription_data){
var steps_c_61554 = subscription_data;
cljs.core.async.close_BANG_(steps_c_61554);

return cljs.core.remove_watch(org.numenta.sanity.main.viz_options,cljs.core.cst$kw$org$numenta$sanity$main_SLASH_keep_DASH_steps);
});
cljs.core.add_watch(org.numenta.sanity.main.steps,cljs.core.cst$kw$org$numenta$sanity$main_SLASH_recalculate_DASH_selection,(function (_,___$1,___$2,steps){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.selection,(function (p1__61555_SHARP_){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (sel){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(sel,cljs.core.cst$kw$model_DASH_id,cljs.core.cst$kw$model_DASH_id.cljs$core$IFn$_invoke$arity$1(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(steps,cljs.core.cst$kw$dt.cljs$core$IFn$_invoke$arity$1(sel))));
}),p1__61555_SHARP_);
}));
}));
org.numenta.sanity.main.main_pane = (function org$numenta$sanity$main$main_pane(_,___$1){
var size_invalidates_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
var c__35961__auto___61621 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__35961__auto___61621,size_invalidates_c){
return (function (){
var f__35962__auto__ = (function (){var switch__35847__auto__ = ((function (c__35961__auto___61621,size_invalidates_c){
return (function (state_61605){
var state_val_61606 = (state_61605[(1)]);
if((state_val_61606 === (1))){
var state_61605__$1 = state_61605;
var statearr_61607_61622 = state_61605__$1;
(statearr_61607_61622[(2)] = null);

(statearr_61607_61622[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_61606 === (2))){
var inst_61590 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_61591 = [cljs.core.cst$kw$drawing,cljs.core.cst$kw$max_DASH_height_DASH_px];
var inst_61592 = (new cljs.core.PersistentVector(null,2,(5),inst_61590,inst_61591,null));
var inst_61593 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.main.viz_options,cljs.core.assoc_in,inst_61592,window.innerHeight);
var state_61605__$1 = (function (){var statearr_61608 = state_61605;
(statearr_61608[(7)] = inst_61593);

return statearr_61608;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_61605__$1,(4),size_invalidates_c);
} else {
if((state_val_61606 === (3))){
var inst_61603 = (state_61605[(2)]);
var state_61605__$1 = state_61605;
return cljs.core.async.impl.ioc_helpers.return_chan(state_61605__$1,inst_61603);
} else {
if((state_val_61606 === (4))){
var inst_61595 = (state_61605[(2)]);
var inst_61596 = (inst_61595 == null);
var state_61605__$1 = state_61605;
if(cljs.core.truth_(inst_61596)){
var statearr_61609_61623 = state_61605__$1;
(statearr_61609_61623[(1)] = (5));

} else {
var statearr_61610_61624 = state_61605__$1;
(statearr_61610_61624[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_61606 === (5))){
var state_61605__$1 = state_61605;
var statearr_61611_61625 = state_61605__$1;
(statearr_61611_61625[(2)] = null);

(statearr_61611_61625[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_61606 === (6))){
var state_61605__$1 = state_61605;
var statearr_61612_61626 = state_61605__$1;
(statearr_61612_61626[(2)] = null);

(statearr_61612_61626[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_61606 === (7))){
var inst_61601 = (state_61605[(2)]);
var state_61605__$1 = state_61605;
var statearr_61613_61627 = state_61605__$1;
(statearr_61613_61627[(2)] = inst_61601);

(statearr_61613_61627[(1)] = (3));


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
});})(c__35961__auto___61621,size_invalidates_c))
;
return ((function (switch__35847__auto__,c__35961__auto___61621,size_invalidates_c){
return (function() {
var org$numenta$sanity$main$main_pane_$_state_machine__35848__auto__ = null;
var org$numenta$sanity$main$main_pane_$_state_machine__35848__auto____0 = (function (){
var statearr_61617 = [null,null,null,null,null,null,null,null];
(statearr_61617[(0)] = org$numenta$sanity$main$main_pane_$_state_machine__35848__auto__);

(statearr_61617[(1)] = (1));

return statearr_61617;
});
var org$numenta$sanity$main$main_pane_$_state_machine__35848__auto____1 = (function (state_61605){
while(true){
var ret_value__35849__auto__ = (function (){try{while(true){
var result__35850__auto__ = switch__35847__auto__(state_61605);
if(cljs.core.keyword_identical_QMARK_(result__35850__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__35850__auto__;
}
break;
}
}catch (e61618){if((e61618 instanceof Object)){
var ex__35851__auto__ = e61618;
var statearr_61619_61628 = state_61605;
(statearr_61619_61628[(5)] = ex__35851__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_61605);

return cljs.core.cst$kw$recur;
} else {
throw e61618;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35849__auto__,cljs.core.cst$kw$recur)){
var G__61629 = state_61605;
state_61605 = G__61629;
continue;
} else {
return ret_value__35849__auto__;
}
break;
}
});
org$numenta$sanity$main$main_pane_$_state_machine__35848__auto__ = function(state_61605){
switch(arguments.length){
case 0:
return org$numenta$sanity$main$main_pane_$_state_machine__35848__auto____0.call(this);
case 1:
return org$numenta$sanity$main$main_pane_$_state_machine__35848__auto____1.call(this,state_61605);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$main$main_pane_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$main$main_pane_$_state_machine__35848__auto____0;
org$numenta$sanity$main$main_pane_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$main$main_pane_$_state_machine__35848__auto____1;
return org$numenta$sanity$main$main_pane_$_state_machine__35848__auto__;
})()
;})(switch__35847__auto__,c__35961__auto___61621,size_invalidates_c))
})();
var state__35963__auto__ = (function (){var statearr_61620 = (f__35962__auto__.cljs$core$IFn$_invoke$arity$0 ? f__35962__auto__.cljs$core$IFn$_invoke$arity$0() : f__35962__auto__.call(null));
(statearr_61620[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__35961__auto___61621);

return statearr_61620;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__35963__auto__);
});})(c__35961__auto___61621,size_invalidates_c))
);


return ((function (size_invalidates_c){
return (function (world_pane,into_sim){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$container_DASH_fluid,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$on_DASH_click,((function (size_invalidates_c){
return (function (){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.into_viz,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$background_DASH_clicked], null));
});})(size_invalidates_c))
,cljs.core.cst$kw$on_DASH_key_DASH_down,((function (size_invalidates_c){
return (function (p1__61556_SHARP_){
return org.numenta.sanity.viz_canvas.viz_key_down(p1__61556_SHARP_,org.numenta.sanity.main.into_viz);
});})(size_invalidates_c))
,cljs.core.cst$kw$tabIndex,(1)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$row,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.viz_canvas.viz_timeline,org.numenta.sanity.main.steps,org.numenta.sanity.main.selection,org.numenta.sanity.main.capture_options], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$row,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_3$col_DASH_lg_DASH_2,world_pane], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_9$col_DASH_lg_DASH_10,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$overflow,"auto"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.helpers.window_resize_listener,size_invalidates_c], null),new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.viz_canvas.viz_canvas,null,org.numenta.sanity.main.steps,org.numenta.sanity.main.selection,org.numenta.sanity.main.step_template,org.numenta.sanity.main.viz_options,org.numenta.sanity.main.into_viz,into_sim,org.numenta.sanity.main.into_journal], null)], null)], null)], null);
});
;})(size_invalidates_c))
});
org.numenta.sanity.main.sanity_app = (function org$numenta$sanity$main$sanity_app(title,model_tab,world_pane,features,into_sim){
return new cljs.core.PersistentVector(null, 15, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.controls_ui.sanity_app,title,model_tab,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.main.main_pane,world_pane,into_sim], null),features,org.numenta.sanity.main.capture_options,org.numenta.sanity.main.viz_options,org.numenta.sanity.main.selection,org.numenta.sanity.main.steps,org.numenta.sanity.main.step_template,org.numenta.sanity.viz_canvas.state_colors,org.numenta.sanity.main.into_viz,into_sim,org.numenta.sanity.main.into_journal,org.numenta.sanity.main.debug_data], null);
});
org.numenta.sanity.main.selected_step = (function org$numenta$sanity$main$selected_step(var_args){
var args61630 = [];
var len__5740__auto___61633 = arguments.length;
var i__5741__auto___61634 = (0);
while(true){
if((i__5741__auto___61634 < len__5740__auto___61633)){
args61630.push((arguments[i__5741__auto___61634]));

var G__61635 = (i__5741__auto___61634 + (1));
i__5741__auto___61634 = G__61635;
continue;
} else {
}
break;
}

var G__61632 = args61630.length;
switch (G__61632) {
case 0:
return org.numenta.sanity.main.selected_step.cljs$core$IFn$_invoke$arity$0();

break;
case 2:
return org.numenta.sanity.main.selected_step.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args61630.length)].join('')));

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
