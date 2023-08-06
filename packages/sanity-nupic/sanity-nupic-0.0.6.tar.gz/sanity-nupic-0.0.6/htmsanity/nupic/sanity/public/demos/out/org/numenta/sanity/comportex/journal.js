// Compiled by ClojureScript 1.7.170 {:static-fns true, :optimize-constants true}
goog.provide('org.numenta.sanity.comportex.journal');
goog.require('cljs.core');
goog.require('org.nfrac.comportex.protocols');
goog.require('org.numenta.sanity.comportex.data');
goog.require('cljs.core.async');
goog.require('org.numenta.sanity.bridge.marshalling');
goog.require('org.numenta.sanity.comportex.details');
goog.require('org.nfrac.comportex.core');
goog.require('org.nfrac.comportex.util');
goog.require('clojure.walk');
org.numenta.sanity.comportex.journal.make_step = (function org$numenta$sanity$comportex$journal$make_step(htm,id){
var input_value = cljs.core.cst$kw$input_DASH_value.cljs$core$IFn$_invoke$arity$1(htm);
return new cljs.core.PersistentArrayMap(null, 4, ["model-id",id,"timestep",org.nfrac.comportex.protocols.timestep(htm),"input-value",input_value,"sensed-values",cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__5454__auto__ = ((function (input_value){
return (function org$numenta$sanity$comportex$journal$make_step_$_iter__63001(s__63002){
return (new cljs.core.LazySeq(null,((function (input_value){
return (function (){
var s__63002__$1 = s__63002;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__63002__$1);
if(temp__4653__auto__){
var s__63002__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__63002__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__63002__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__63004 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__63003 = (0);
while(true){
if((i__63003 < size__5453__auto__)){
var sense_id = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__63003);
var vec__63009 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$sensors,sense_id], null));
var selector = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63009,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63009,(1),null);
var v = org.nfrac.comportex.protocols.extract(selector,input_value);
cljs.core.chunk_append(b__63004,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [sense_id,v], null));

var G__63011 = (i__63003 + (1));
i__63003 = G__63011;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__63004),org$numenta$sanity$comportex$journal$make_step_$_iter__63001(cljs.core.chunk_rest(s__63002__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__63004),null);
}
} else {
var sense_id = cljs.core.first(s__63002__$2);
var vec__63010 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$sensors,sense_id], null));
var selector = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63010,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63010,(1),null);
var v = org.nfrac.comportex.protocols.extract(selector,input_value);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [sense_id,v], null),org$numenta$sanity$comportex$journal$make_step_$_iter__63001(cljs.core.rest(s__63002__$2)));
}
} else {
return null;
}
break;
}
});})(input_value))
,null,null));
});})(input_value))
;
return iter__5454__auto__(org.nfrac.comportex.core.sense_keys(htm));
})())], null);
});
org.numenta.sanity.comportex.journal.id_missing_response = (function org$numenta$sanity$comportex$journal$id_missing_response(id,steps_offset){
var offset = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(steps_offset) : cljs.core.deref.call(null,steps_offset));
if((offset > (0))){
if((id < offset)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(cljs.core.cst$sym$_LT_,cljs.core.cst$sym$id,cljs.core.cst$sym$offset)], 0)))].join('')));
}

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([[cljs.core.str("Can't fetch model "),cljs.core.str(id),cljs.core.str(". We've dropped all models below id "),cljs.core.str(offset)].join('')], 0));
} else {
}

return cljs.core.PersistentArrayMap.EMPTY;
});
org.numenta.sanity.comportex.journal.command_handler = (function org$numenta$sanity$comportex$journal$command_handler(current_model,steps_offset,model_steps,steps_mult,client_infos,capture_options){
var find_model = (function org$numenta$sanity$comportex$journal$command_handler_$_find_model(id){
if(typeof id === 'number'){
var i = (id - (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(steps_offset) : cljs.core.deref.call(null,steps_offset)));
if((i < (0))){
return null;
} else {
return cljs.core.nth.cljs$core$IFn$_invoke$arity$3((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(model_steps) : cljs.core.deref.call(null,model_steps)),i,null);
}
} else {
return null;
}
});
var find_model_pair = (function org$numenta$sanity$comportex$journal$command_handler_$_find_model_pair(id){
if(typeof id === 'number'){
var i = (id - (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(steps_offset) : cljs.core.deref.call(null,steps_offset)));
if((i > (0))){
var vec__63248 = cljs.core.subvec.cljs$core$IFn$_invoke$arity$3((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(model_steps) : cljs.core.deref.call(null,model_steps)),(i - (1)),(i + (1)));
var prev_step = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63248,(0),null);
var step = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63248,(1),null);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((org.nfrac.comportex.protocols.timestep(prev_step) + (1)),org.nfrac.comportex.protocols.timestep(step))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [prev_step,step], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,step], null);
}
} else {
if((i === (0))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,cljs.core.nth.cljs$core$IFn$_invoke$arity$3((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(model_steps) : cljs.core.deref.call(null,model_steps)),i,null)], null);
} else {
return null;
}
}
} else {
return null;
}
});
return (function org$numenta$sanity$comportex$journal$command_handler_$_handle_command(p__63249){
var vec__63360 = p__63249;
var vec__63361 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63360,(0),null);
var command = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63361,(0),null);
var xs = cljs.core.nthnext(vec__63361,(1));
var client_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63360,(1),null);
var client_info = (function (){var or__4682__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(client_infos) : cljs.core.deref.call(null,client_infos)),client_id);
if(cljs.core.truth_(or__4682__auto__)){
return or__4682__auto__;
} else {
var v = (function (){var G__63362 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__63362) : cljs.core.atom.call(null,G__63362));
})();
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(client_infos,cljs.core.assoc,client_id,v);

return v;
}
})();
var G__63363 = command;
switch (G__63363) {
case "ping":
return null;

break;
case "client-disconnect":
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["JOURNAL: Client disconnected."], 0));

return cljs.core.async.untap(steps_mult,cljs.core.cst$kw$ch.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$steps_DASH_mchannel.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(client_info) : cljs.core.deref.call(null,client_info)))));

break;
case "connect":
var vec__63364 = xs;
var old_client_info = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63364,(0),null);
var map__63365 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63364,(1),null);
var map__63365__$1 = ((((!((map__63365 == null)))?((((map__63365.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63365.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63365):map__63365);
var subscriber_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63365__$1,cljs.core.cst$kw$ch);
cljs.core.add_watch(client_info,cljs.core.cst$kw$org$numenta$sanity$comportex$journal_SLASH_push_DASH_to_DASH_client,((function (vec__63364,old_client_info,map__63365,map__63365__$1,subscriber_c,G__63363,client_info,vec__63360,vec__63361,command,xs,client_id){
return (function (_,___$1,___$2,v){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(subscriber_c,cljs.core.update.cljs$core$IFn$_invoke$arity$3(v,cljs.core.cst$kw$steps_DASH_mchannel,((function (vec__63364,old_client_info,map__63365,map__63365__$1,subscriber_c,G__63363,client_info,vec__63360,vec__63361,command,xs,client_id){
return (function (steps_mchannel){
return org.numenta.sanity.bridge.marshalling.channel_weak(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(steps_mchannel,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$ch,cljs.core.cst$kw$target_DASH_id], null)));
});})(vec__63364,old_client_info,map__63365,map__63365__$1,subscriber_c,G__63363,client_info,vec__63360,vec__63361,command,xs,client_id))
));
});})(vec__63364,old_client_info,map__63365,map__63365__$1,subscriber_c,G__63363,client_info,vec__63360,vec__63361,command,xs,client_id))
);

var temp__4653__auto__ = old_client_info;
if(cljs.core.truth_(temp__4653__auto__)){
var map__63367 = temp__4653__auto__;
var map__63367__$1 = ((((!((map__63367 == null)))?((((map__63367.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63367.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63367):map__63367);
var steps_mchannel = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63367__$1,cljs.core.cst$kw$steps_DASH_mchannel);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["JOURNAL: Client reconnected."], 0));

if(cljs.core.truth_(steps_mchannel)){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["JOURNAL: Client resubscribed to steps."], 0));

cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2(steps_mult,cljs.core.cst$kw$ch.cljs$core$IFn$_invoke$arity$1(steps_mchannel));
} else {
}

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(client_info,((function (map__63367,map__63367__$1,steps_mchannel,temp__4653__auto__,vec__63364,old_client_info,map__63365,map__63365__$1,subscriber_c,G__63363,client_info,vec__63360,vec__63361,command,xs,client_id){
return (function (p1__63012_SHARP_){
var G__63369 = p1__63012_SHARP_;
if(cljs.core.truth_(steps_mchannel)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__63369,cljs.core.cst$kw$steps_DASH_mchannel,steps_mchannel);
} else {
return G__63369;
}
});})(map__63367,map__63367__$1,steps_mchannel,temp__4653__auto__,vec__63364,old_client_info,map__63365,map__63365__$1,subscriber_c,G__63363,client_info,vec__63360,vec__63361,command,xs,client_id))
);
} else {
return null;
}

break;
case "consider-future":
var vec__63370 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63370,(0),null);
var input = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63370,(1),null);
var map__63371 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63370,(2),null);
var map__63371__$1 = ((((!((map__63371 == null)))?((((map__63371.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63371.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63371):map__63371);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63371__$1,cljs.core.cst$kw$ch);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,(function (){var temp__4651__auto__ = find_model(id);
if(cljs.core.truth_(temp__4651__auto__)){
var htm = temp__4651__auto__;
return cljs.core.zipmap(org.nfrac.comportex.core.region_keys.cljs$core$IFn$_invoke$arity$1(htm),cljs.core.map.cljs$core$IFn$_invoke$arity$2(org.nfrac.comportex.core.column_state_freqs,org.nfrac.comportex.core.region_seq(org.nfrac.comportex.protocols.htm_activate(org.nfrac.comportex.protocols.htm_sense(htm,input,null)))));
} else {
return org.numenta.sanity.comportex.journal.id_missing_response(id,steps_offset);
}
})());

break;
case "decode-predictive-columns":
var vec__63373 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63373,(0),null);
var sense_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63373,(1),null);
var n = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63373,(2),null);
var map__63374 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63373,(3),null);
var map__63374__$1 = ((((!((map__63374 == null)))?((((map__63374.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63374.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63374):map__63374);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63374__$1,cljs.core.cst$kw$ch);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,(function (){var temp__4651__auto__ = find_model(id);
if(cljs.core.truth_(temp__4651__auto__)){
var htm = temp__4651__auto__;
return org.nfrac.comportex.core.predictions.cljs$core$IFn$_invoke$arity$3(htm,sense_id,n);
} else {
return org.numenta.sanity.comportex.journal.id_missing_response(id,steps_offset);
}
})());

break;
case "get-steps":
var vec__63376 = xs;
var map__63377 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63376,(0),null);
var map__63377__$1 = ((((!((map__63377 == null)))?((((map__63377.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63377.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63377):map__63377);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63377__$1,cljs.core.cst$kw$ch);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.comportex.data.step_template_data((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(current_model) : cljs.core.deref.call(null,current_model))),cljs.core.vec(cljs.core.map.cljs$core$IFn$_invoke$arity$3(org.numenta.sanity.comportex.journal.make_step,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(model_steps) : cljs.core.deref.call(null,model_steps)),cljs.core.drop.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(steps_offset) : cljs.core.deref.call(null,steps_offset)),cljs.core.range.cljs$core$IFn$_invoke$arity$0())))], null));

break;
case "subscribe":
var vec__63379 = xs;
var steps_mchannel = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63379,(0),null);
var map__63380 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63379,(1),null);
var map__63380__$1 = ((((!((map__63380 == null)))?((((map__63380.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63380.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63380):map__63380);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63380__$1,cljs.core.cst$kw$ch);
cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2(steps_mult,cljs.core.cst$kw$ch.cljs$core$IFn$_invoke$arity$1(steps_mchannel));

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(client_info,cljs.core.assoc,cljs.core.cst$kw$steps_DASH_mchannel,steps_mchannel);

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["JOURNAL: Client subscribed to steps."], 0));

return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.comportex.data.step_template_data((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(current_model) : cljs.core.deref.call(null,current_model))),clojure.walk.stringify_keys((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(capture_options) : cljs.core.deref.call(null,capture_options)))], null));

break;
case "set-capture-options":
var vec__63382 = xs;
var co = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63382,(0),null);
var G__63383 = capture_options;
var G__63384 = clojure.walk.keywordize_keys(co);
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__63383,G__63384) : cljs.core.reset_BANG_.call(null,G__63383,G__63384));

break;
case "get-layer-bits":
var vec__63385 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63385,(0),null);
var rgn_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63385,(1),null);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63385,(2),null);
var fetches = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63385,(3),null);
var map__63386 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63385,(4),null);
var map__63386__$1 = ((((!((map__63386 == null)))?((((map__63386.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63386.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63386):map__63386);
var cols_subset = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63386__$1,cljs.core.cst$kw$value);
var map__63387 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63385,(5),null);
var map__63387__$1 = ((((!((map__63387 == null)))?((((map__63387.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63387.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63387):map__63387);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63387__$1,cljs.core.cst$kw$ch);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,(function (){var temp__4651__auto__ = find_model(id);
if(cljs.core.truth_(temp__4651__auto__)){
var htm = temp__4651__auto__;
var lyr = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,rgn_id,lyr_id], null));
var G__63390 = cljs.core.PersistentArrayMap.EMPTY;
var G__63390__$1 = ((cljs.core.contains_QMARK_(fetches,"active-columns"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__63390,"active-columns",org.nfrac.comportex.protocols.active_columns(lyr)):G__63390);
var G__63390__$2 = ((cljs.core.contains_QMARK_(fetches,"pred-columns"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__63390__$1,"pred-columns",cljs.core.distinct.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.first,org.nfrac.comportex.protocols.prior_predictive_cells(lyr)))):G__63390__$1);
var G__63390__$3 = ((cljs.core.contains_QMARK_(fetches,"overlaps-columns-alpha"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__63390__$2,"overlaps-columns-alpha",org.nfrac.comportex.util.remap(((function (G__63390,G__63390__$1,G__63390__$2,lyr,htm,temp__4651__auto__,vec__63385,id,rgn_id,lyr_id,fetches,map__63386,map__63386__$1,cols_subset,map__63387,map__63387__$1,response_c,G__63363,client_info,vec__63360,vec__63361,command,xs,client_id){
return (function (p1__63013_SHARP_){
var x__5020__auto__ = 1.0;
var y__5021__auto__ = (p1__63013_SHARP_ / (16));
return ((x__5020__auto__ < y__5021__auto__) ? x__5020__auto__ : y__5021__auto__);
});})(G__63390,G__63390__$1,G__63390__$2,lyr,htm,temp__4651__auto__,vec__63385,id,rgn_id,lyr_id,fetches,map__63386,map__63386__$1,cols_subset,map__63387,map__63387__$1,response_c,G__63363,client_info,vec__63360,vec__63361,command,xs,client_id))
,cljs.core.persistent_BANG_(cljs.core.reduce_kv(((function (G__63390,G__63390__$1,G__63390__$2,lyr,htm,temp__4651__auto__,vec__63385,id,rgn_id,lyr_id,fetches,map__63386,map__63386__$1,cols_subset,map__63387,map__63387__$1,response_c,G__63363,client_info,vec__63360,vec__63361,command,xs,client_id){
return (function (m,p__63391,v){
var vec__63392 = p__63391;
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63392,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63392,(1),null);
var ___$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63392,(2),null);
return cljs.core.assoc_BANG_.cljs$core$IFn$_invoke$arity$3(m,col,(function (){var x__5013__auto__ = v;
var y__5014__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(m,col,(0));
return ((x__5013__auto__ > y__5014__auto__) ? x__5013__auto__ : y__5014__auto__);
})());
});})(G__63390,G__63390__$1,G__63390__$2,lyr,htm,temp__4651__auto__,vec__63385,id,rgn_id,lyr_id,fetches,map__63386,map__63386__$1,cols_subset,map__63387,map__63387__$1,response_c,G__63363,client_info,vec__63360,vec__63361,command,xs,client_id))
,cljs.core.transient$(cljs.core.PersistentArrayMap.EMPTY),cljs.core.cst$kw$col_DASH_overlaps.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$state.cljs$core$IFn$_invoke$arity$1(lyr)))))):G__63390__$2);
var G__63390__$4 = ((cljs.core.contains_QMARK_(fetches,"boost-columns-alpha"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__63390__$3,"boost-columns-alpha",(function (){var map__63393 = org.nfrac.comportex.protocols.params(lyr);
var map__63393__$1 = ((((!((map__63393 == null)))?((((map__63393.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63393.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63393):map__63393);
var max_boost = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63393__$1,cljs.core.cst$kw$max_DASH_boost);
return cljs.core.zipmap(cljs.core.range.cljs$core$IFn$_invoke$arity$0(),cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.float$,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (map__63393,map__63393__$1,max_boost,G__63390,G__63390__$1,G__63390__$2,G__63390__$3,lyr,htm,temp__4651__auto__,vec__63385,id,rgn_id,lyr_id,fetches,map__63386,map__63386__$1,cols_subset,map__63387,map__63387__$1,response_c,G__63363,client_info,vec__63360,vec__63361,command,xs,client_id){
return (function (p1__63014_SHARP_){
return ((p1__63014_SHARP_ - (1)) / (max_boost - (1)));
});})(map__63393,map__63393__$1,max_boost,G__63390,G__63390__$1,G__63390__$2,G__63390__$3,lyr,htm,temp__4651__auto__,vec__63385,id,rgn_id,lyr_id,fetches,map__63386,map__63386__$1,cols_subset,map__63387,map__63387__$1,response_c,G__63363,client_info,vec__63360,vec__63361,command,xs,client_id))
,cljs.core.cst$kw$boosts.cljs$core$IFn$_invoke$arity$1(lyr))));
})()):G__63390__$3);
var G__63390__$5 = ((cljs.core.contains_QMARK_(fetches,"active-freq-columns-alpha"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__63390__$4,"active-freq-columns-alpha",cljs.core.zipmap(cljs.core.range.cljs$core$IFn$_invoke$arity$0(),cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (G__63390,G__63390__$1,G__63390__$2,G__63390__$3,G__63390__$4,lyr,htm,temp__4651__auto__,vec__63385,id,rgn_id,lyr_id,fetches,map__63386,map__63386__$1,cols_subset,map__63387,map__63387__$1,response_c,G__63363,client_info,vec__63360,vec__63361,command,xs,client_id){
return (function (p1__63015_SHARP_){
var x__5020__auto__ = 1.0;
var y__5021__auto__ = ((2) * p1__63015_SHARP_);
return ((x__5020__auto__ < y__5021__auto__) ? x__5020__auto__ : y__5021__auto__);
});})(G__63390,G__63390__$1,G__63390__$2,G__63390__$3,G__63390__$4,lyr,htm,temp__4651__auto__,vec__63385,id,rgn_id,lyr_id,fetches,map__63386,map__63386__$1,cols_subset,map__63387,map__63387__$1,response_c,G__63363,client_info,vec__63360,vec__63361,command,xs,client_id))
,cljs.core.cst$kw$active_DASH_duty_DASH_cycles.cljs$core$IFn$_invoke$arity$1(lyr)))):G__63390__$4);
var G__63390__$6 = ((cljs.core.contains_QMARK_(fetches,"n-segments-columns-alpha"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__63390__$5,"n-segments-columns-alpha",cljs.core.zipmap(cols_subset,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (G__63390,G__63390__$1,G__63390__$2,G__63390__$3,G__63390__$4,G__63390__$5,lyr,htm,temp__4651__auto__,vec__63385,id,rgn_id,lyr_id,fetches,map__63386,map__63386__$1,cols_subset,map__63387,map__63387__$1,response_c,G__63363,client_info,vec__63360,vec__63361,command,xs,client_id){
return (function (p1__63017_SHARP_){
var x__5020__auto__ = 1.0;
var y__5021__auto__ = (p1__63017_SHARP_ / 16.0);
return ((x__5020__auto__ < y__5021__auto__) ? x__5020__auto__ : y__5021__auto__);
});})(G__63390,G__63390__$1,G__63390__$2,G__63390__$3,G__63390__$4,G__63390__$5,lyr,htm,temp__4651__auto__,vec__63385,id,rgn_id,lyr_id,fetches,map__63386,map__63386__$1,cols_subset,map__63387,map__63387__$1,response_c,G__63363,client_info,vec__63360,vec__63361,command,xs,client_id))
,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (G__63390,G__63390__$1,G__63390__$2,G__63390__$3,G__63390__$4,G__63390__$5,lyr,htm,temp__4651__auto__,vec__63385,id,rgn_id,lyr_id,fetches,map__63386,map__63386__$1,cols_subset,map__63387,map__63387__$1,response_c,G__63363,client_info,vec__63360,vec__63361,command,xs,client_id){
return (function (p1__63016_SHARP_){
return org.numenta.sanity.comportex.data.count_segs_in_column(cljs.core.cst$kw$distal_DASH_sg.cljs$core$IFn$_invoke$arity$1(lyr),org.nfrac.comportex.protocols.layer_depth(lyr),p1__63016_SHARP_);
});})(G__63390,G__63390__$1,G__63390__$2,G__63390__$3,G__63390__$4,G__63390__$5,lyr,htm,temp__4651__auto__,vec__63385,id,rgn_id,lyr_id,fetches,map__63386,map__63386__$1,cols_subset,map__63387,map__63387__$1,response_c,G__63363,client_info,vec__63360,vec__63361,command,xs,client_id))
,cols_subset)))):G__63390__$5);
var G__63390__$7 = ((cljs.core.contains_QMARK_(fetches,"tp-columns"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__63390__$6,"tp-columns",cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.first,org.nfrac.comportex.protocols.temporal_pooling_cells(lyr))):G__63390__$6);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__63390__$7,"break?",cljs.core.empty_QMARK_(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(lyr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$prior_DASH_distal_DASH_state,cljs.core.cst$kw$active_DASH_bits], null))));

} else {
return org.numenta.sanity.comportex.journal.id_missing_response(id,steps_offset);
}
})());

break;
case "get-sense-bits":
var vec__63395 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63395,(0),null);
var sense_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63395,(1),null);
var fetches = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63395,(2),null);
var map__63396 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63395,(3),null);
var map__63396__$1 = ((((!((map__63396 == null)))?((((map__63396.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63396.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63396):map__63396);
var bits_subset = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63396__$1,cljs.core.cst$kw$value);
var map__63397 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63395,(4),null);
var map__63397__$1 = ((((!((map__63397 == null)))?((((map__63397.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63397.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63397):map__63397);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63397__$1,cljs.core.cst$kw$ch);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,(function (){var temp__4651__auto__ = find_model_pair(id);
if(cljs.core.truth_(temp__4651__auto__)){
var vec__63400 = temp__4651__auto__;
var prev_htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63400,(0),null);
var htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63400,(1),null);
var sense = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$senses,sense_id], null));
var ff_rgn_id = cljs.core.first(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$fb_DASH_deps,sense_id], null)));
var prev_ff_rgn = (((org.nfrac.comportex.protocols.size(org.nfrac.comportex.protocols.ff_topology(sense)) > (0)))?cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(prev_htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,ff_rgn_id], null)):null);
var G__63401 = cljs.core.PersistentArrayMap.EMPTY;
var G__63401__$1 = ((cljs.core.contains_QMARK_(fetches,"active-bits"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__63401,"active-bits",cljs.core.set(org.numenta.sanity.comportex.data.active_bits(sense))):G__63401);
if(cljs.core.truth_((function (){var and__4670__auto__ = cljs.core.contains_QMARK_(fetches,"pred-bits-alpha");
if(and__4670__auto__){
return prev_ff_rgn;
} else {
return and__4670__auto__;
}
})())){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__63401__$1,"pred-bits-alpha",(function (){var start = org.nfrac.comportex.core.ff_base(htm,ff_rgn_id,sense_id);
var end = (start + org.nfrac.comportex.protocols.size(org.nfrac.comportex.protocols.ff_topology(sense)));
return org.nfrac.comportex.util.remap(((function (start,end,G__63401,G__63401__$1,sense,ff_rgn_id,prev_ff_rgn,vec__63400,prev_htm,htm,temp__4651__auto__,vec__63395,id,sense_id,fetches,map__63396,map__63396__$1,bits_subset,map__63397,map__63397__$1,response_c,G__63363,client_info,vec__63360,vec__63361,command,xs,client_id){
return (function (p1__63018_SHARP_){
var x__5020__auto__ = 1.0;
var y__5021__auto__ = (p1__63018_SHARP_ / (8));
return ((x__5020__auto__ < y__5021__auto__) ? x__5020__auto__ : y__5021__auto__);
});})(start,end,G__63401,G__63401__$1,sense,ff_rgn_id,prev_ff_rgn,vec__63400,prev_htm,htm,temp__4651__auto__,vec__63395,id,sense_id,fetches,map__63396,map__63396__$1,bits_subset,map__63397,map__63397__$1,response_c,G__63363,client_info,vec__63360,vec__63361,command,xs,client_id))
,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.keep.cljs$core$IFn$_invoke$arity$2(((function (start,end,G__63401,G__63401__$1,sense,ff_rgn_id,prev_ff_rgn,vec__63400,prev_htm,htm,temp__4651__auto__,vec__63395,id,sense_id,fetches,map__63396,map__63396__$1,bits_subset,map__63397,map__63397__$1,response_c,G__63363,client_info,vec__63360,vec__63361,command,xs,client_id){
return (function (p__63402){
var vec__63403 = p__63402;
var id__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63403,(0),null);
var votes = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63403,(1),null);
if(((start <= id__$1)) && ((id__$1 < end))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(id__$1 - start),votes], null);
} else {
return null;
}
});})(start,end,G__63401,G__63401__$1,sense,ff_rgn_id,prev_ff_rgn,vec__63400,prev_htm,htm,temp__4651__auto__,vec__63395,id,sense_id,fetches,map__63396,map__63396__$1,bits_subset,map__63397,map__63397__$1,response_c,G__63363,client_info,vec__63360,vec__63361,command,xs,client_id))
,org.nfrac.comportex.core.predicted_bit_votes(prev_ff_rgn))));
})());
} else {
return G__63401__$1;
}
} else {
return org.numenta.sanity.comportex.journal.id_missing_response(id,steps_offset);
}
})());

break;
case "get-proximal-synapses-by-source-bit":
var vec__63404 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63404,(0),null);
var sense_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63404,(1),null);
var bit = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63404,(2),null);
var syn_states = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63404,(3),null);
var map__63405 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63404,(4),null);
var map__63405__$1 = ((((!((map__63405 == null)))?((((map__63405.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63405.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63405):map__63405);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63405__$1,cljs.core.cst$kw$ch);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,(function (){var temp__4651__auto__ = find_model(id);
if(cljs.core.truth_(temp__4651__auto__)){
var htm = temp__4651__auto__;
return org.numenta.sanity.comportex.data.syns_from_source_bit(htm,sense_id,bit,syn_states);
} else {
return org.numenta.sanity.comportex.journal.id_missing_response(id,steps_offset);
}
})());

break;
case "get-column-cells":
var vec__63407 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63407,(0),null);
var rgn_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63407,(1),null);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63407,(2),null);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63407,(3),null);
var map__63408 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63407,(4),null);
var map__63408__$1 = ((((!((map__63408 == null)))?((((map__63408.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63408.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63408):map__63408);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63408__$1,cljs.core.cst$kw$ch);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,(function (){var temp__4651__auto__ = find_model(id);
if(cljs.core.truth_(temp__4651__auto__)){
var htm = temp__4651__auto__;
var lyr = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,rgn_id,lyr_id], null));
var extract_cells = ((function (lyr,htm,temp__4651__auto__,vec__63407,id,rgn_id,lyr_id,col,map__63408,map__63408__$1,response_c,G__63363,client_info,vec__63360,vec__63361,command,xs,client_id){
return (function (p1__63019_SHARP_){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentHashSet.EMPTY,cljs.core.keep.cljs$core$IFn$_invoke$arity$2(((function (lyr,htm,temp__4651__auto__,vec__63407,id,rgn_id,lyr_id,col,map__63408,map__63408__$1,response_c,G__63363,client_info,vec__63360,vec__63361,command,xs,client_id){
return (function (p__63410){
var vec__63411 = p__63410;
var column = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63411,(0),null);
var ci = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63411,(1),null);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(col,column)){
return ci;
} else {
return null;
}
});})(lyr,htm,temp__4651__auto__,vec__63407,id,rgn_id,lyr_id,col,map__63408,map__63408__$1,response_c,G__63363,client_info,vec__63360,vec__63361,command,xs,client_id))
,p1__63019_SHARP_));
});})(lyr,htm,temp__4651__auto__,vec__63407,id,rgn_id,lyr_id,col,map__63408,map__63408__$1,response_c,G__63363,client_info,vec__63360,vec__63361,command,xs,client_id))
;
return new cljs.core.PersistentArrayMap(null, 4, ["cells-per-column",org.nfrac.comportex.protocols.layer_depth(lyr),"active-cells",extract_cells(org.nfrac.comportex.protocols.active_cells(lyr)),"prior-predicted-cells",extract_cells(org.nfrac.comportex.protocols.prior_predictive_cells(lyr)),"winner-cells",extract_cells(org.nfrac.comportex.protocols.winner_cells(lyr))], null);
} else {
return org.numenta.sanity.comportex.journal.id_missing_response(id,steps_offset);
}
})());

break;
case "get-column-apical-segments":
var vec__63412 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63412,(0),null);
var rgn_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63412,(1),null);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63412,(2),null);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63412,(3),null);
var map__63413 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63412,(4),null);
var map__63413__$1 = ((((!((map__63413 == null)))?((((map__63413.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63413.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63413):map__63413);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63413__$1,cljs.core.cst$kw$ch);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,(function (){var temp__4651__auto__ = find_model_pair(id);
if(cljs.core.truth_(temp__4651__auto__)){
var vec__63415 = temp__4651__auto__;
var prev_htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63415,(0),null);
var htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63415,(1),null);
return org.numenta.sanity.comportex.data.column_segs(htm,prev_htm,rgn_id,lyr_id,col,cljs.core.cst$kw$apical);
} else {
return org.numenta.sanity.comportex.journal.id_missing_response(id,steps_offset);
}
})());

break;
case "get-column-distal-segments":
var vec__63416 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63416,(0),null);
var rgn_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63416,(1),null);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63416,(2),null);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63416,(3),null);
var map__63417 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63416,(4),null);
var map__63417__$1 = ((((!((map__63417 == null)))?((((map__63417.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63417.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63417):map__63417);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63417__$1,cljs.core.cst$kw$ch);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,(function (){var temp__4651__auto__ = find_model_pair(id);
if(cljs.core.truth_(temp__4651__auto__)){
var vec__63419 = temp__4651__auto__;
var prev_htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63419,(0),null);
var htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63419,(1),null);
return org.numenta.sanity.comportex.data.column_segs(htm,prev_htm,rgn_id,lyr_id,col,cljs.core.cst$kw$distal);
} else {
return org.numenta.sanity.comportex.journal.id_missing_response(id,steps_offset);
}
})());

break;
case "get-column-proximal-segments":
var vec__63420 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63420,(0),null);
var rgn_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63420,(1),null);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63420,(2),null);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63420,(3),null);
var map__63421 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63420,(4),null);
var map__63421__$1 = ((((!((map__63421 == null)))?((((map__63421.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63421.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63421):map__63421);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63421__$1,cljs.core.cst$kw$ch);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,(function (){var temp__4651__auto__ = find_model_pair(id);
if(cljs.core.truth_(temp__4651__auto__)){
var vec__63423 = temp__4651__auto__;
var prev_htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63423,(0),null);
var htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63423,(1),null);
return org.numenta.sanity.comportex.data.column_segs(htm,prev_htm,rgn_id,lyr_id,col,cljs.core.cst$kw$proximal);
} else {
return org.numenta.sanity.comportex.journal.id_missing_response(id,steps_offset);
}
})());

break;
case "get-apical-segment-synapses":
var vec__63424 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63424,(0),null);
var rgn_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63424,(1),null);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63424,(2),null);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63424,(3),null);
var ci = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63424,(4),null);
var si = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63424,(5),null);
var syn_states = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63424,(6),null);
var map__63425 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63424,(7),null);
var map__63425__$1 = ((((!((map__63425 == null)))?((((map__63425.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63425.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63425):map__63425);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63425__$1,cljs.core.cst$kw$ch);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,(function (){var temp__4651__auto__ = find_model_pair(id);
if(cljs.core.truth_(temp__4651__auto__)){
var vec__63427 = temp__4651__auto__;
var prev_htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63427,(0),null);
var htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63427,(1),null);
return org.numenta.sanity.comportex.data.segment_syns(htm,prev_htm,rgn_id,lyr_id,col,ci,si,syn_states,cljs.core.cst$kw$apical);
} else {
return org.numenta.sanity.comportex.journal.id_missing_response(id,steps_offset);
}
})());

break;
case "get-distal-segment-synapses":
var vec__63428 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63428,(0),null);
var rgn_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63428,(1),null);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63428,(2),null);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63428,(3),null);
var ci = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63428,(4),null);
var si = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63428,(5),null);
var syn_states = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63428,(6),null);
var map__63429 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63428,(7),null);
var map__63429__$1 = ((((!((map__63429 == null)))?((((map__63429.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63429.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63429):map__63429);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63429__$1,cljs.core.cst$kw$ch);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,(function (){var temp__4651__auto__ = find_model_pair(id);
if(cljs.core.truth_(temp__4651__auto__)){
var vec__63431 = temp__4651__auto__;
var prev_htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63431,(0),null);
var htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63431,(1),null);
return org.numenta.sanity.comportex.data.segment_syns(htm,prev_htm,rgn_id,lyr_id,col,ci,si,syn_states,cljs.core.cst$kw$distal);
} else {
return org.numenta.sanity.comportex.journal.id_missing_response(id,steps_offset);
}
})());

break;
case "get-proximal-segment-synapses":
var vec__63432 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63432,(0),null);
var rgn_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63432,(1),null);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63432,(2),null);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63432,(3),null);
var ci = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63432,(4),null);
var si = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63432,(5),null);
var syn_states = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63432,(6),null);
var map__63433 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63432,(7),null);
var map__63433__$1 = ((((!((map__63433 == null)))?((((map__63433.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63433.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63433):map__63433);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63433__$1,cljs.core.cst$kw$ch);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,(function (){var temp__4651__auto__ = find_model_pair(id);
if(cljs.core.truth_(temp__4651__auto__)){
var vec__63435 = temp__4651__auto__;
var prev_htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63435,(0),null);
var htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63435,(1),null);
return org.numenta.sanity.comportex.data.segment_syns(htm,prev_htm,rgn_id,lyr_id,col,ci,si,syn_states,cljs.core.cst$kw$proximal);
} else {
return org.numenta.sanity.comportex.journal.id_missing_response(id,steps_offset);
}
})());

break;
case "get-details-text":
var vec__63436 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63436,(0),null);
var rgn_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63436,(1),null);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63436,(2),null);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63436,(3),null);
var map__63437 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63436,(4),null);
var map__63437__$1 = ((((!((map__63437 == null)))?((((map__63437.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63437.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63437):map__63437);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63437__$1,cljs.core.cst$kw$ch);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,(function (){var temp__4651__auto__ = find_model_pair(id);
if(cljs.core.truth_(temp__4651__auto__)){
var vec__63439 = temp__4651__auto__;
var prev_htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63439,(0),null);
var htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63439,(1),null);
return org.numenta.sanity.comportex.details.detail_text(htm,prev_htm,rgn_id,lyr_id,col);
} else {
return org.numenta.sanity.comportex.journal.id_missing_response(id,steps_offset);
}
})());

break;
case "get-model":
var vec__63440 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63440,(0),null);
var map__63441 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63440,(1),null);
var map__63441__$1 = ((((!((map__63441 == null)))?((((map__63441.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63441.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63441):map__63441);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63441__$1,cljs.core.cst$kw$ch);
var as_str_QMARK_ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63440,(2),null);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,(function (){var temp__4651__auto__ = find_model(id);
if(cljs.core.truth_(temp__4651__auto__)){
var htm = temp__4651__auto__;
var G__63443 = htm;
if(cljs.core.truth_(as_str_QMARK_)){
return cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([G__63443], 0));
} else {
return G__63443;
}
} else {
return org.numenta.sanity.comportex.journal.id_missing_response(id,steps_offset);
}
})());

break;
case "get-column-state-freqs":
var vec__63444 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63444,(0),null);
var map__63445 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63444,(1),null);
var map__63445__$1 = ((((!((map__63445 == null)))?((((map__63445.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63445.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63445):map__63445);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63445__$1,cljs.core.cst$kw$ch);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,(function (){var temp__4651__auto__ = find_model(id);
if(cljs.core.truth_(temp__4651__auto__)){
var htm = temp__4651__auto__;
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__5454__auto__ = ((function (htm,temp__4651__auto__,vec__63444,id,map__63445,map__63445__$1,response_c,G__63363,client_info,vec__63360,vec__63361,command,xs,client_id){
return (function org$numenta$sanity$comportex$journal$command_handler_$_handle_command_$_iter__63447(s__63448){
return (new cljs.core.LazySeq(null,((function (htm,temp__4651__auto__,vec__63444,id,map__63445,map__63445__$1,response_c,G__63363,client_info,vec__63360,vec__63361,command,xs,client_id){
return (function (){
var s__63448__$1 = s__63448;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__63448__$1);
if(temp__4653__auto__){
var xs__5201__auto__ = temp__4653__auto__;
var vec__63457 = cljs.core.first(xs__5201__auto__);
var region_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63457,(0),null);
var rgn = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63457,(1),null);
var iterys__5450__auto__ = ((function (s__63448__$1,vec__63457,region_key,rgn,xs__5201__auto__,temp__4653__auto__,htm,temp__4651__auto__,vec__63444,id,map__63445,map__63445__$1,response_c,G__63363,client_info,vec__63360,vec__63361,command,xs,client_id){
return (function org$numenta$sanity$comportex$journal$command_handler_$_handle_command_$_iter__63447_$_iter__63449(s__63450){
return (new cljs.core.LazySeq(null,((function (s__63448__$1,vec__63457,region_key,rgn,xs__5201__auto__,temp__4653__auto__,htm,temp__4651__auto__,vec__63444,id,map__63445,map__63445__$1,response_c,G__63363,client_info,vec__63360,vec__63361,command,xs,client_id){
return (function (){
var s__63450__$1 = s__63450;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__63450__$1);
if(temp__4653__auto____$1){
var s__63450__$2 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__63450__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__63450__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__63452 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__63451 = (0);
while(true){
if((i__63451 < size__5453__auto__)){
var layer_id = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__63451);
cljs.core.chunk_append(b__63452,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [region_key,layer_id], null),clojure.walk.stringify_keys(org.nfrac.comportex.core.column_state_freqs.cljs$core$IFn$_invoke$arity$2(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,region_key], null)),layer_id))], null));

var G__63471 = (i__63451 + (1));
i__63451 = G__63471;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__63452),org$numenta$sanity$comportex$journal$command_handler_$_handle_command_$_iter__63447_$_iter__63449(cljs.core.chunk_rest(s__63450__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__63452),null);
}
} else {
var layer_id = cljs.core.first(s__63450__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [region_key,layer_id], null),clojure.walk.stringify_keys(org.nfrac.comportex.core.column_state_freqs.cljs$core$IFn$_invoke$arity$2(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,region_key], null)),layer_id))], null),org$numenta$sanity$comportex$journal$command_handler_$_handle_command_$_iter__63447_$_iter__63449(cljs.core.rest(s__63450__$2)));
}
} else {
return null;
}
break;
}
});})(s__63448__$1,vec__63457,region_key,rgn,xs__5201__auto__,temp__4653__auto__,htm,temp__4651__auto__,vec__63444,id,map__63445,map__63445__$1,response_c,G__63363,client_info,vec__63360,vec__63361,command,xs,client_id))
,null,null));
});})(s__63448__$1,vec__63457,region_key,rgn,xs__5201__auto__,temp__4653__auto__,htm,temp__4651__auto__,vec__63444,id,map__63445,map__63445__$1,response_c,G__63363,client_info,vec__63360,vec__63361,command,xs,client_id))
;
var fs__5451__auto__ = cljs.core.seq(iterys__5450__auto__(org.nfrac.comportex.core.layers(rgn)));
if(fs__5451__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5451__auto__,org$numenta$sanity$comportex$journal$command_handler_$_handle_command_$_iter__63447(cljs.core.rest(s__63448__$1)));
} else {
var G__63472 = cljs.core.rest(s__63448__$1);
s__63448__$1 = G__63472;
continue;
}
} else {
return null;
}
break;
}
});})(htm,temp__4651__auto__,vec__63444,id,map__63445,map__63445__$1,response_c,G__63363,client_info,vec__63360,vec__63361,command,xs,client_id))
,null,null));
});})(htm,temp__4651__auto__,vec__63444,id,map__63445,map__63445__$1,response_c,G__63363,client_info,vec__63360,vec__63361,command,xs,client_id))
;
return iter__5454__auto__(cljs.core.cst$kw$regions.cljs$core$IFn$_invoke$arity$1(htm));
})());
} else {
return org.numenta.sanity.comportex.journal.id_missing_response(id,steps_offset);
}
})());

break;
case "get-cell-excitation-data":
var vec__63460 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63460,(0),null);
var rgn_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63460,(1),null);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63460,(2),null);
var sel_col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63460,(3),null);
var map__63461 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63460,(4),null);
var map__63461__$1 = ((((!((map__63461 == null)))?((((map__63461.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63461.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63461):map__63461);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63461__$1,cljs.core.cst$kw$ch);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,(function (){var vec__63463 = find_model_pair(id);
var prev_htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63463,(0),null);
var htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63463,(1),null);
if(cljs.core.truth_(prev_htm)){
return org.numenta.sanity.comportex.data.cell_excitation_data(htm,prev_htm,rgn_id,lyr_id,sel_col);
} else {
return org.numenta.sanity.comportex.journal.id_missing_response(id,steps_offset);
}
})());

break;
case "get-cells-by-state":
var vec__63464 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63464,(0),null);
var rgn_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63464,(1),null);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63464,(2),null);
var map__63465 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63464,(3),null);
var map__63465__$1 = ((((!((map__63465 == null)))?((((map__63465.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63465.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63465):map__63465);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63465__$1,cljs.core.cst$kw$ch);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,(function (){var temp__4651__auto__ = find_model(id);
if(cljs.core.truth_(temp__4651__auto__)){
var htm = temp__4651__auto__;
var layer = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,rgn_id,lyr_id], null));
return new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$winner_DASH_cells,org.nfrac.comportex.protocols.winner_cells(layer),cljs.core.cst$kw$active_DASH_cells,org.nfrac.comportex.protocols.active_cells(layer),cljs.core.cst$kw$pred_DASH_cells,org.nfrac.comportex.protocols.predictive_cells(layer),cljs.core.cst$kw$engaged_QMARK_,cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(layer,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$state,cljs.core.cst$kw$engaged_QMARK_], null))], null);
} else {
return org.numenta.sanity.comportex.journal.id_missing_response(id,steps_offset);
}
})());

break;
case "get-transitions-data":
var vec__63467 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63467,(0),null);
var rgn_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63467,(1),null);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63467,(2),null);
var cell_sdr_fracs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63467,(3),null);
var map__63468 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63467,(4),null);
var map__63468__$1 = ((((!((map__63468 == null)))?((((map__63468.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63468.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63468):map__63468);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63468__$1,cljs.core.cst$kw$ch);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,(function (){var temp__4651__auto__ = find_model(id);
if(cljs.core.truth_(temp__4651__auto__)){
var htm = temp__4651__auto__;
return org.numenta.sanity.comportex.data.transitions_data(htm,rgn_id,lyr_id,cell_sdr_fracs);
} else {
return org.numenta.sanity.comportex.journal.id_missing_response(id,steps_offset);
}
})());

break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(command)].join('')));

}
});
});
org.numenta.sanity.comportex.journal.init = (function org$numenta$sanity$comportex$journal$init(steps_c,commands_c,current_model,n_keep){
var steps_offset = (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1((0)) : cljs.core.atom.call(null,(0)));
var model_steps = (function (){var G__63574 = cljs.core.PersistentVector.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__63574) : cljs.core.atom.call(null,G__63574));
})();
var steps_in = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
var steps_mult = cljs.core.async.mult(steps_in);
var client_infos = (function (){var G__63575 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__63575) : cljs.core.atom.call(null,G__63575));
})();
var capture_options = (function (){var G__63576 = new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$keep_DASH_steps,n_keep,cljs.core.cst$kw$ff_DASH_synapses,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$capture_QMARK_,true,cljs.core.cst$kw$only_DASH_active_QMARK_,false,cljs.core.cst$kw$only_DASH_connected_QMARK_,false], null),cljs.core.cst$kw$distal_DASH_synapses,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$capture_QMARK_,true,cljs.core.cst$kw$only_DASH_active_QMARK_,false,cljs.core.cst$kw$only_DASH_connected_QMARK_,false,cljs.core.cst$kw$only_DASH_noteworthy_DASH_columns_QMARK_,false], null),cljs.core.cst$kw$apical_DASH_synapses,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$capture_QMARK_,true,cljs.core.cst$kw$only_DASH_active_QMARK_,false,cljs.core.cst$kw$only_DASH_connected_QMARK_,false,cljs.core.cst$kw$only_DASH_noteworthy_DASH_columns_QMARK_,false], null)], null);
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__63576) : cljs.core.atom.call(null,G__63576));
})();
var handle_command = org.numenta.sanity.comportex.journal.command_handler(current_model,steps_offset,model_steps,steps_mult,client_infos,capture_options);
var c__35961__auto___63675 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__35961__auto___63675,steps_offset,model_steps,steps_in,steps_mult,client_infos,capture_options,handle_command){
return (function (){
var f__35962__auto__ = (function (){var switch__35847__auto__ = ((function (c__35961__auto___63675,steps_offset,model_steps,steps_in,steps_mult,client_infos,capture_options,handle_command){
return (function (state_63616){
var state_val_63617 = (state_63616[(1)]);
if((state_val_63617 === (7))){
var inst_63612 = (state_63616[(2)]);
var state_63616__$1 = state_63616;
var statearr_63618_63676 = state_63616__$1;
(statearr_63618_63676[(2)] = inst_63612);

(statearr_63618_63676[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_63617 === (1))){
var state_63616__$1 = state_63616;
var statearr_63619_63677 = state_63616__$1;
(statearr_63619_63677[(2)] = null);

(statearr_63619_63677[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_63617 === (4))){
var inst_63579 = (state_63616[(7)]);
var inst_63579__$1 = (state_63616[(2)]);
var state_63616__$1 = (function (){var statearr_63620 = state_63616;
(statearr_63620[(7)] = inst_63579__$1);

return statearr_63620;
})();
if(cljs.core.truth_(inst_63579__$1)){
var statearr_63621_63678 = state_63616__$1;
(statearr_63621_63678[(1)] = (5));

} else {
var statearr_63622_63679 = state_63616__$1;
(statearr_63622_63679[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_63617 === (13))){
var inst_63579 = (state_63616[(7)]);
var inst_63597 = (state_63616[(8)]);
var inst_63584 = (state_63616[(9)]);
var inst_63604 = (state_63616[(2)]);
var inst_63605 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(model_steps,inst_63604) : cljs.core.reset_BANG_.call(null,model_steps,inst_63604));
var inst_63606 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(steps_offset,cljs.core._PLUS_,inst_63597);
var inst_63607 = org.numenta.sanity.comportex.journal.make_step(inst_63579,inst_63584);
var inst_63608 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(steps_in,inst_63607);
var state_63616__$1 = (function (){var statearr_63623 = state_63616;
(statearr_63623[(10)] = inst_63608);

(statearr_63623[(11)] = inst_63605);

(statearr_63623[(12)] = inst_63606);

return statearr_63623;
})();
var statearr_63624_63680 = state_63616__$1;
(statearr_63624_63680[(2)] = null);

(statearr_63624_63680[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_63617 === (6))){
var state_63616__$1 = state_63616;
var statearr_63625_63681 = state_63616__$1;
(statearr_63625_63681[(2)] = null);

(statearr_63625_63681[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_63617 === (3))){
var inst_63614 = (state_63616[(2)]);
var state_63616__$1 = state_63616;
return cljs.core.async.impl.ioc_helpers.return_chan(state_63616__$1,inst_63614);
} else {
if((state_val_63617 === (12))){
var inst_63586 = (state_63616[(13)]);
var state_63616__$1 = state_63616;
var statearr_63626_63682 = state_63616__$1;
(statearr_63626_63682[(2)] = inst_63586);

(statearr_63626_63682[(1)] = (13));


return cljs.core.cst$kw$recur;
} else {
if((state_val_63617 === (2))){
var state_63616__$1 = state_63616;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_63616__$1,(4),steps_c);
} else {
if((state_val_63617 === (11))){
var inst_63597 = (state_63616[(8)]);
var inst_63586 = (state_63616[(13)]);
var inst_63601 = cljs.core.subvec.cljs$core$IFn$_invoke$arity$2(inst_63586,inst_63597);
var state_63616__$1 = state_63616;
var statearr_63627_63683 = state_63616__$1;
(statearr_63627_63683[(2)] = inst_63601);

(statearr_63627_63683[(1)] = (13));


return cljs.core.cst$kw$recur;
} else {
if((state_val_63617 === (9))){
var state_63616__$1 = state_63616;
var statearr_63628_63684 = state_63616__$1;
(statearr_63628_63684[(2)] = (0));

(statearr_63628_63684[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_63617 === (5))){
var inst_63579 = (state_63616[(7)]);
var inst_63588 = (state_63616[(14)]);
var inst_63581 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(steps_offset) : cljs.core.deref.call(null,steps_offset));
var inst_63582 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(model_steps) : cljs.core.deref.call(null,model_steps));
var inst_63583 = cljs.core.count(inst_63582);
var inst_63584 = (inst_63581 + inst_63583);
var inst_63585 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(model_steps) : cljs.core.deref.call(null,model_steps));
var inst_63586 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(inst_63585,inst_63579);
var inst_63587 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(capture_options) : cljs.core.deref.call(null,capture_options));
var inst_63588__$1 = cljs.core.cst$kw$keep_DASH_steps.cljs$core$IFn$_invoke$arity$1(inst_63587);
var inst_63589 = (inst_63588__$1 < (0));
var inst_63590 = cljs.core.not(inst_63589);
var state_63616__$1 = (function (){var statearr_63629 = state_63616;
(statearr_63629[(13)] = inst_63586);

(statearr_63629[(14)] = inst_63588__$1);

(statearr_63629[(9)] = inst_63584);

return statearr_63629;
})();
if(inst_63590){
var statearr_63630_63685 = state_63616__$1;
(statearr_63630_63685[(1)] = (8));

} else {
var statearr_63631_63686 = state_63616__$1;
(statearr_63631_63686[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_63617 === (10))){
var inst_63597 = (state_63616[(8)]);
var inst_63597__$1 = (state_63616[(2)]);
var inst_63599 = (inst_63597__$1 > (0));
var state_63616__$1 = (function (){var statearr_63632 = state_63616;
(statearr_63632[(8)] = inst_63597__$1);

return statearr_63632;
})();
if(cljs.core.truth_(inst_63599)){
var statearr_63633_63687 = state_63616__$1;
(statearr_63633_63687[(1)] = (11));

} else {
var statearr_63634_63688 = state_63616__$1;
(statearr_63634_63688[(1)] = (12));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_63617 === (8))){
var inst_63586 = (state_63616[(13)]);
var inst_63588 = (state_63616[(14)]);
var inst_63592 = cljs.core.count(inst_63586);
var inst_63593 = (inst_63592 - inst_63588);
var inst_63594 = (((0) > inst_63593) ? (0) : inst_63593);
var state_63616__$1 = state_63616;
var statearr_63635_63689 = state_63616__$1;
(statearr_63635_63689[(2)] = inst_63594);

(statearr_63635_63689[(1)] = (10));


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
});})(c__35961__auto___63675,steps_offset,model_steps,steps_in,steps_mult,client_infos,capture_options,handle_command))
;
return ((function (switch__35847__auto__,c__35961__auto___63675,steps_offset,model_steps,steps_in,steps_mult,client_infos,capture_options,handle_command){
return (function() {
var org$numenta$sanity$comportex$journal$init_$_state_machine__35848__auto__ = null;
var org$numenta$sanity$comportex$journal$init_$_state_machine__35848__auto____0 = (function (){
var statearr_63639 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_63639[(0)] = org$numenta$sanity$comportex$journal$init_$_state_machine__35848__auto__);

(statearr_63639[(1)] = (1));

return statearr_63639;
});
var org$numenta$sanity$comportex$journal$init_$_state_machine__35848__auto____1 = (function (state_63616){
while(true){
var ret_value__35849__auto__ = (function (){try{while(true){
var result__35850__auto__ = switch__35847__auto__(state_63616);
if(cljs.core.keyword_identical_QMARK_(result__35850__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__35850__auto__;
}
break;
}
}catch (e63640){if((e63640 instanceof Object)){
var ex__35851__auto__ = e63640;
var statearr_63641_63690 = state_63616;
(statearr_63641_63690[(5)] = ex__35851__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_63616);

return cljs.core.cst$kw$recur;
} else {
throw e63640;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35849__auto__,cljs.core.cst$kw$recur)){
var G__63691 = state_63616;
state_63616 = G__63691;
continue;
} else {
return ret_value__35849__auto__;
}
break;
}
});
org$numenta$sanity$comportex$journal$init_$_state_machine__35848__auto__ = function(state_63616){
switch(arguments.length){
case 0:
return org$numenta$sanity$comportex$journal$init_$_state_machine__35848__auto____0.call(this);
case 1:
return org$numenta$sanity$comportex$journal$init_$_state_machine__35848__auto____1.call(this,state_63616);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$comportex$journal$init_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$comportex$journal$init_$_state_machine__35848__auto____0;
org$numenta$sanity$comportex$journal$init_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$comportex$journal$init_$_state_machine__35848__auto____1;
return org$numenta$sanity$comportex$journal$init_$_state_machine__35848__auto__;
})()
;})(switch__35847__auto__,c__35961__auto___63675,steps_offset,model_steps,steps_in,steps_mult,client_infos,capture_options,handle_command))
})();
var state__35963__auto__ = (function (){var statearr_63642 = (f__35962__auto__.cljs$core$IFn$_invoke$arity$0 ? f__35962__auto__.cljs$core$IFn$_invoke$arity$0() : f__35962__auto__.call(null));
(statearr_63642[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__35961__auto___63675);

return statearr_63642;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__35963__auto__);
});})(c__35961__auto___63675,steps_offset,model_steps,steps_in,steps_mult,client_infos,capture_options,handle_command))
);


var c__35961__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__35961__auto__,steps_offset,model_steps,steps_in,steps_mult,client_infos,capture_options,handle_command){
return (function (){
var f__35962__auto__ = (function (){var switch__35847__auto__ = ((function (c__35961__auto__,steps_offset,model_steps,steps_in,steps_mult,client_infos,capture_options,handle_command){
return (function (state_63658){
var state_val_63659 = (state_63658[(1)]);
if((state_val_63659 === (1))){
var state_63658__$1 = state_63658;
var statearr_63660_63692 = state_63658__$1;
(statearr_63660_63692[(2)] = null);

(statearr_63660_63692[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_63659 === (2))){
var state_63658__$1 = state_63658;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_63658__$1,(4),commands_c);
} else {
if((state_val_63659 === (3))){
var inst_63656 = (state_63658[(2)]);
var state_63658__$1 = state_63658;
return cljs.core.async.impl.ioc_helpers.return_chan(state_63658__$1,inst_63656);
} else {
if((state_val_63659 === (4))){
var inst_63645 = (state_63658[(7)]);
var inst_63645__$1 = (state_63658[(2)]);
var inst_63646 = (inst_63645__$1 == null);
var inst_63647 = cljs.core.not(inst_63646);
var state_63658__$1 = (function (){var statearr_63661 = state_63658;
(statearr_63661[(7)] = inst_63645__$1);

return statearr_63661;
})();
if(inst_63647){
var statearr_63662_63693 = state_63658__$1;
(statearr_63662_63693[(1)] = (5));

} else {
var statearr_63663_63694 = state_63658__$1;
(statearr_63663_63694[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_63659 === (5))){
var inst_63645 = (state_63658[(7)]);
var inst_63649 = (handle_command.cljs$core$IFn$_invoke$arity$1 ? handle_command.cljs$core$IFn$_invoke$arity$1(inst_63645) : handle_command.call(null,inst_63645));
var state_63658__$1 = (function (){var statearr_63664 = state_63658;
(statearr_63664[(8)] = inst_63649);

return statearr_63664;
})();
var statearr_63665_63695 = state_63658__$1;
(statearr_63665_63695[(2)] = null);

(statearr_63665_63695[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_63659 === (6))){
var inst_63652 = cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["CLOSING JOURNAL"], 0));
var state_63658__$1 = state_63658;
var statearr_63666_63696 = state_63658__$1;
(statearr_63666_63696[(2)] = inst_63652);

(statearr_63666_63696[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_63659 === (7))){
var inst_63654 = (state_63658[(2)]);
var state_63658__$1 = state_63658;
var statearr_63667_63697 = state_63658__$1;
(statearr_63667_63697[(2)] = inst_63654);

(statearr_63667_63697[(1)] = (3));


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
});})(c__35961__auto__,steps_offset,model_steps,steps_in,steps_mult,client_infos,capture_options,handle_command))
;
return ((function (switch__35847__auto__,c__35961__auto__,steps_offset,model_steps,steps_in,steps_mult,client_infos,capture_options,handle_command){
return (function() {
var org$numenta$sanity$comportex$journal$init_$_state_machine__35848__auto__ = null;
var org$numenta$sanity$comportex$journal$init_$_state_machine__35848__auto____0 = (function (){
var statearr_63671 = [null,null,null,null,null,null,null,null,null];
(statearr_63671[(0)] = org$numenta$sanity$comportex$journal$init_$_state_machine__35848__auto__);

(statearr_63671[(1)] = (1));

return statearr_63671;
});
var org$numenta$sanity$comportex$journal$init_$_state_machine__35848__auto____1 = (function (state_63658){
while(true){
var ret_value__35849__auto__ = (function (){try{while(true){
var result__35850__auto__ = switch__35847__auto__(state_63658);
if(cljs.core.keyword_identical_QMARK_(result__35850__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__35850__auto__;
}
break;
}
}catch (e63672){if((e63672 instanceof Object)){
var ex__35851__auto__ = e63672;
var statearr_63673_63698 = state_63658;
(statearr_63673_63698[(5)] = ex__35851__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_63658);

return cljs.core.cst$kw$recur;
} else {
throw e63672;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35849__auto__,cljs.core.cst$kw$recur)){
var G__63699 = state_63658;
state_63658 = G__63699;
continue;
} else {
return ret_value__35849__auto__;
}
break;
}
});
org$numenta$sanity$comportex$journal$init_$_state_machine__35848__auto__ = function(state_63658){
switch(arguments.length){
case 0:
return org$numenta$sanity$comportex$journal$init_$_state_machine__35848__auto____0.call(this);
case 1:
return org$numenta$sanity$comportex$journal$init_$_state_machine__35848__auto____1.call(this,state_63658);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$comportex$journal$init_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$comportex$journal$init_$_state_machine__35848__auto____0;
org$numenta$sanity$comportex$journal$init_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$comportex$journal$init_$_state_machine__35848__auto____1;
return org$numenta$sanity$comportex$journal$init_$_state_machine__35848__auto__;
})()
;})(switch__35847__auto__,c__35961__auto__,steps_offset,model_steps,steps_in,steps_mult,client_infos,capture_options,handle_command))
})();
var state__35963__auto__ = (function (){var statearr_63674 = (f__35962__auto__.cljs$core$IFn$_invoke$arity$0 ? f__35962__auto__.cljs$core$IFn$_invoke$arity$0() : f__35962__auto__.call(null));
(statearr_63674[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__35961__auto__);

return statearr_63674;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__35963__auto__);
});})(c__35961__auto__,steps_offset,model_steps,steps_in,steps_mult,client_infos,capture_options,handle_command))
);

return c__35961__auto__;
});
