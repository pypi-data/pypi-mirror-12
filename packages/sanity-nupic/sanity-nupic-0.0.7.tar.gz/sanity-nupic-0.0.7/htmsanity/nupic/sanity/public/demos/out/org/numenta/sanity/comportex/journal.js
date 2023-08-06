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
return (function org$numenta$sanity$comportex$journal$make_step_$_iter__62999(s__63000){
return (new cljs.core.LazySeq(null,((function (input_value){
return (function (){
var s__63000__$1 = s__63000;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__63000__$1);
if(temp__4653__auto__){
var s__63000__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__63000__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__63000__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__63002 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__63001 = (0);
while(true){
if((i__63001 < size__5453__auto__)){
var sense_id = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__63001);
var vec__63007 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$sensors,sense_id], null));
var selector = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63007,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63007,(1),null);
var v = org.nfrac.comportex.protocols.extract(selector,input_value);
cljs.core.chunk_append(b__63002,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [sense_id,v], null));

var G__63009 = (i__63001 + (1));
i__63001 = G__63009;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__63002),org$numenta$sanity$comportex$journal$make_step_$_iter__62999(cljs.core.chunk_rest(s__63000__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__63002),null);
}
} else {
var sense_id = cljs.core.first(s__63000__$2);
var vec__63008 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$sensors,sense_id], null));
var selector = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63008,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63008,(1),null);
var v = org.nfrac.comportex.protocols.extract(selector,input_value);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [sense_id,v], null),org$numenta$sanity$comportex$journal$make_step_$_iter__62999(cljs.core.rest(s__63000__$2)));
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
var vec__63246 = cljs.core.subvec.cljs$core$IFn$_invoke$arity$3((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(model_steps) : cljs.core.deref.call(null,model_steps)),(i - (1)),(i + (1)));
var prev_step = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63246,(0),null);
var step = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63246,(1),null);
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
return (function org$numenta$sanity$comportex$journal$command_handler_$_handle_command(p__63247){
var vec__63358 = p__63247;
var vec__63359 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63358,(0),null);
var command = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63359,(0),null);
var xs = cljs.core.nthnext(vec__63359,(1));
var client_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63358,(1),null);
var client_info = (function (){var or__4682__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(client_infos) : cljs.core.deref.call(null,client_infos)),client_id);
if(cljs.core.truth_(or__4682__auto__)){
return or__4682__auto__;
} else {
var v = (function (){var G__63360 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__63360) : cljs.core.atom.call(null,G__63360));
})();
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(client_infos,cljs.core.assoc,client_id,v);

return v;
}
})();
var G__63361 = command;
switch (G__63361) {
case "ping":
return null;

break;
case "client-disconnect":
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["JOURNAL: Client disconnected."], 0));

return cljs.core.async.untap(steps_mult,cljs.core.cst$kw$ch.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$steps_DASH_mchannel.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(client_info) : cljs.core.deref.call(null,client_info)))));

break;
case "connect":
var vec__63362 = xs;
var old_client_info = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63362,(0),null);
var map__63363 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63362,(1),null);
var map__63363__$1 = ((((!((map__63363 == null)))?((((map__63363.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63363.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63363):map__63363);
var subscriber_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63363__$1,cljs.core.cst$kw$ch);
cljs.core.add_watch(client_info,cljs.core.cst$kw$org$numenta$sanity$comportex$journal_SLASH_push_DASH_to_DASH_client,((function (vec__63362,old_client_info,map__63363,map__63363__$1,subscriber_c,G__63361,client_info,vec__63358,vec__63359,command,xs,client_id){
return (function (_,___$1,___$2,v){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(subscriber_c,cljs.core.update.cljs$core$IFn$_invoke$arity$3(v,cljs.core.cst$kw$steps_DASH_mchannel,((function (vec__63362,old_client_info,map__63363,map__63363__$1,subscriber_c,G__63361,client_info,vec__63358,vec__63359,command,xs,client_id){
return (function (steps_mchannel){
return org.numenta.sanity.bridge.marshalling.channel_weak(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(steps_mchannel,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$ch,cljs.core.cst$kw$target_DASH_id], null)));
});})(vec__63362,old_client_info,map__63363,map__63363__$1,subscriber_c,G__63361,client_info,vec__63358,vec__63359,command,xs,client_id))
));
});})(vec__63362,old_client_info,map__63363,map__63363__$1,subscriber_c,G__63361,client_info,vec__63358,vec__63359,command,xs,client_id))
);

var temp__4653__auto__ = old_client_info;
if(cljs.core.truth_(temp__4653__auto__)){
var map__63365 = temp__4653__auto__;
var map__63365__$1 = ((((!((map__63365 == null)))?((((map__63365.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63365.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63365):map__63365);
var steps_mchannel = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63365__$1,cljs.core.cst$kw$steps_DASH_mchannel);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["JOURNAL: Client reconnected."], 0));

if(cljs.core.truth_(steps_mchannel)){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["JOURNAL: Client resubscribed to steps."], 0));

cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2(steps_mult,cljs.core.cst$kw$ch.cljs$core$IFn$_invoke$arity$1(steps_mchannel));
} else {
}

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(client_info,((function (map__63365,map__63365__$1,steps_mchannel,temp__4653__auto__,vec__63362,old_client_info,map__63363,map__63363__$1,subscriber_c,G__63361,client_info,vec__63358,vec__63359,command,xs,client_id){
return (function (p1__63010_SHARP_){
var G__63367 = p1__63010_SHARP_;
if(cljs.core.truth_(steps_mchannel)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__63367,cljs.core.cst$kw$steps_DASH_mchannel,steps_mchannel);
} else {
return G__63367;
}
});})(map__63365,map__63365__$1,steps_mchannel,temp__4653__auto__,vec__63362,old_client_info,map__63363,map__63363__$1,subscriber_c,G__63361,client_info,vec__63358,vec__63359,command,xs,client_id))
);
} else {
return null;
}

break;
case "consider-future":
var vec__63368 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63368,(0),null);
var input = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63368,(1),null);
var map__63369 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63368,(2),null);
var map__63369__$1 = ((((!((map__63369 == null)))?((((map__63369.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63369.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63369):map__63369);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63369__$1,cljs.core.cst$kw$ch);
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
var vec__63371 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63371,(0),null);
var sense_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63371,(1),null);
var n = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63371,(2),null);
var map__63372 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63371,(3),null);
var map__63372__$1 = ((((!((map__63372 == null)))?((((map__63372.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63372.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63372):map__63372);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63372__$1,cljs.core.cst$kw$ch);
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
var vec__63374 = xs;
var map__63375 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63374,(0),null);
var map__63375__$1 = ((((!((map__63375 == null)))?((((map__63375.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63375.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63375):map__63375);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63375__$1,cljs.core.cst$kw$ch);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.comportex.data.step_template_data((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(current_model) : cljs.core.deref.call(null,current_model))),cljs.core.vec(cljs.core.map.cljs$core$IFn$_invoke$arity$3(org.numenta.sanity.comportex.journal.make_step,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(model_steps) : cljs.core.deref.call(null,model_steps)),cljs.core.drop.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(steps_offset) : cljs.core.deref.call(null,steps_offset)),cljs.core.range.cljs$core$IFn$_invoke$arity$0())))], null));

break;
case "subscribe":
var vec__63377 = xs;
var steps_mchannel = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63377,(0),null);
var map__63378 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63377,(1),null);
var map__63378__$1 = ((((!((map__63378 == null)))?((((map__63378.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63378.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63378):map__63378);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63378__$1,cljs.core.cst$kw$ch);
cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2(steps_mult,cljs.core.cst$kw$ch.cljs$core$IFn$_invoke$arity$1(steps_mchannel));

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(client_info,cljs.core.assoc,cljs.core.cst$kw$steps_DASH_mchannel,steps_mchannel);

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["JOURNAL: Client subscribed to steps."], 0));

return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.comportex.data.step_template_data((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(current_model) : cljs.core.deref.call(null,current_model))),clojure.walk.stringify_keys((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(capture_options) : cljs.core.deref.call(null,capture_options)))], null));

break;
case "set-capture-options":
var vec__63380 = xs;
var co = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63380,(0),null);
var G__63381 = capture_options;
var G__63382 = clojure.walk.keywordize_keys(co);
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__63381,G__63382) : cljs.core.reset_BANG_.call(null,G__63381,G__63382));

break;
case "get-layer-bits":
var vec__63383 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63383,(0),null);
var rgn_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63383,(1),null);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63383,(2),null);
var fetches = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63383,(3),null);
var map__63384 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63383,(4),null);
var map__63384__$1 = ((((!((map__63384 == null)))?((((map__63384.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63384.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63384):map__63384);
var cols_subset = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63384__$1,cljs.core.cst$kw$value);
var map__63385 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63383,(5),null);
var map__63385__$1 = ((((!((map__63385 == null)))?((((map__63385.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63385.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63385):map__63385);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63385__$1,cljs.core.cst$kw$ch);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,(function (){var temp__4651__auto__ = find_model(id);
if(cljs.core.truth_(temp__4651__auto__)){
var htm = temp__4651__auto__;
var lyr = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,rgn_id,lyr_id], null));
var G__63388 = cljs.core.PersistentArrayMap.EMPTY;
var G__63388__$1 = ((cljs.core.contains_QMARK_(fetches,"active-columns"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__63388,"active-columns",org.nfrac.comportex.protocols.active_columns(lyr)):G__63388);
var G__63388__$2 = ((cljs.core.contains_QMARK_(fetches,"pred-columns"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__63388__$1,"pred-columns",cljs.core.distinct.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.first,org.nfrac.comportex.protocols.prior_predictive_cells(lyr)))):G__63388__$1);
var G__63388__$3 = ((cljs.core.contains_QMARK_(fetches,"overlaps-columns-alpha"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__63388__$2,"overlaps-columns-alpha",org.nfrac.comportex.util.remap(((function (G__63388,G__63388__$1,G__63388__$2,lyr,htm,temp__4651__auto__,vec__63383,id,rgn_id,lyr_id,fetches,map__63384,map__63384__$1,cols_subset,map__63385,map__63385__$1,response_c,G__63361,client_info,vec__63358,vec__63359,command,xs,client_id){
return (function (p1__63011_SHARP_){
var x__5020__auto__ = 1.0;
var y__5021__auto__ = (p1__63011_SHARP_ / (16));
return ((x__5020__auto__ < y__5021__auto__) ? x__5020__auto__ : y__5021__auto__);
});})(G__63388,G__63388__$1,G__63388__$2,lyr,htm,temp__4651__auto__,vec__63383,id,rgn_id,lyr_id,fetches,map__63384,map__63384__$1,cols_subset,map__63385,map__63385__$1,response_c,G__63361,client_info,vec__63358,vec__63359,command,xs,client_id))
,cljs.core.persistent_BANG_(cljs.core.reduce_kv(((function (G__63388,G__63388__$1,G__63388__$2,lyr,htm,temp__4651__auto__,vec__63383,id,rgn_id,lyr_id,fetches,map__63384,map__63384__$1,cols_subset,map__63385,map__63385__$1,response_c,G__63361,client_info,vec__63358,vec__63359,command,xs,client_id){
return (function (m,p__63389,v){
var vec__63390 = p__63389;
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63390,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63390,(1),null);
var ___$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63390,(2),null);
return cljs.core.assoc_BANG_.cljs$core$IFn$_invoke$arity$3(m,col,(function (){var x__5013__auto__ = v;
var y__5014__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(m,col,(0));
return ((x__5013__auto__ > y__5014__auto__) ? x__5013__auto__ : y__5014__auto__);
})());
});})(G__63388,G__63388__$1,G__63388__$2,lyr,htm,temp__4651__auto__,vec__63383,id,rgn_id,lyr_id,fetches,map__63384,map__63384__$1,cols_subset,map__63385,map__63385__$1,response_c,G__63361,client_info,vec__63358,vec__63359,command,xs,client_id))
,cljs.core.transient$(cljs.core.PersistentArrayMap.EMPTY),cljs.core.cst$kw$col_DASH_overlaps.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$state.cljs$core$IFn$_invoke$arity$1(lyr)))))):G__63388__$2);
var G__63388__$4 = ((cljs.core.contains_QMARK_(fetches,"boost-columns-alpha"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__63388__$3,"boost-columns-alpha",(function (){var map__63391 = org.nfrac.comportex.protocols.params(lyr);
var map__63391__$1 = ((((!((map__63391 == null)))?((((map__63391.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63391.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63391):map__63391);
var max_boost = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63391__$1,cljs.core.cst$kw$max_DASH_boost);
return cljs.core.zipmap(cljs.core.range.cljs$core$IFn$_invoke$arity$0(),cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.float$,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (map__63391,map__63391__$1,max_boost,G__63388,G__63388__$1,G__63388__$2,G__63388__$3,lyr,htm,temp__4651__auto__,vec__63383,id,rgn_id,lyr_id,fetches,map__63384,map__63384__$1,cols_subset,map__63385,map__63385__$1,response_c,G__63361,client_info,vec__63358,vec__63359,command,xs,client_id){
return (function (p1__63012_SHARP_){
return ((p1__63012_SHARP_ - (1)) / (max_boost - (1)));
});})(map__63391,map__63391__$1,max_boost,G__63388,G__63388__$1,G__63388__$2,G__63388__$3,lyr,htm,temp__4651__auto__,vec__63383,id,rgn_id,lyr_id,fetches,map__63384,map__63384__$1,cols_subset,map__63385,map__63385__$1,response_c,G__63361,client_info,vec__63358,vec__63359,command,xs,client_id))
,cljs.core.cst$kw$boosts.cljs$core$IFn$_invoke$arity$1(lyr))));
})()):G__63388__$3);
var G__63388__$5 = ((cljs.core.contains_QMARK_(fetches,"active-freq-columns-alpha"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__63388__$4,"active-freq-columns-alpha",cljs.core.zipmap(cljs.core.range.cljs$core$IFn$_invoke$arity$0(),cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (G__63388,G__63388__$1,G__63388__$2,G__63388__$3,G__63388__$4,lyr,htm,temp__4651__auto__,vec__63383,id,rgn_id,lyr_id,fetches,map__63384,map__63384__$1,cols_subset,map__63385,map__63385__$1,response_c,G__63361,client_info,vec__63358,vec__63359,command,xs,client_id){
return (function (p1__63013_SHARP_){
var x__5020__auto__ = 1.0;
var y__5021__auto__ = ((2) * p1__63013_SHARP_);
return ((x__5020__auto__ < y__5021__auto__) ? x__5020__auto__ : y__5021__auto__);
});})(G__63388,G__63388__$1,G__63388__$2,G__63388__$3,G__63388__$4,lyr,htm,temp__4651__auto__,vec__63383,id,rgn_id,lyr_id,fetches,map__63384,map__63384__$1,cols_subset,map__63385,map__63385__$1,response_c,G__63361,client_info,vec__63358,vec__63359,command,xs,client_id))
,cljs.core.cst$kw$active_DASH_duty_DASH_cycles.cljs$core$IFn$_invoke$arity$1(lyr)))):G__63388__$4);
var G__63388__$6 = ((cljs.core.contains_QMARK_(fetches,"n-segments-columns-alpha"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__63388__$5,"n-segments-columns-alpha",cljs.core.zipmap(cols_subset,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (G__63388,G__63388__$1,G__63388__$2,G__63388__$3,G__63388__$4,G__63388__$5,lyr,htm,temp__4651__auto__,vec__63383,id,rgn_id,lyr_id,fetches,map__63384,map__63384__$1,cols_subset,map__63385,map__63385__$1,response_c,G__63361,client_info,vec__63358,vec__63359,command,xs,client_id){
return (function (p1__63015_SHARP_){
var x__5020__auto__ = 1.0;
var y__5021__auto__ = (p1__63015_SHARP_ / 16.0);
return ((x__5020__auto__ < y__5021__auto__) ? x__5020__auto__ : y__5021__auto__);
});})(G__63388,G__63388__$1,G__63388__$2,G__63388__$3,G__63388__$4,G__63388__$5,lyr,htm,temp__4651__auto__,vec__63383,id,rgn_id,lyr_id,fetches,map__63384,map__63384__$1,cols_subset,map__63385,map__63385__$1,response_c,G__63361,client_info,vec__63358,vec__63359,command,xs,client_id))
,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (G__63388,G__63388__$1,G__63388__$2,G__63388__$3,G__63388__$4,G__63388__$5,lyr,htm,temp__4651__auto__,vec__63383,id,rgn_id,lyr_id,fetches,map__63384,map__63384__$1,cols_subset,map__63385,map__63385__$1,response_c,G__63361,client_info,vec__63358,vec__63359,command,xs,client_id){
return (function (p1__63014_SHARP_){
return org.numenta.sanity.comportex.data.count_segs_in_column(cljs.core.cst$kw$distal_DASH_sg.cljs$core$IFn$_invoke$arity$1(lyr),org.nfrac.comportex.protocols.layer_depth(lyr),p1__63014_SHARP_);
});})(G__63388,G__63388__$1,G__63388__$2,G__63388__$3,G__63388__$4,G__63388__$5,lyr,htm,temp__4651__auto__,vec__63383,id,rgn_id,lyr_id,fetches,map__63384,map__63384__$1,cols_subset,map__63385,map__63385__$1,response_c,G__63361,client_info,vec__63358,vec__63359,command,xs,client_id))
,cols_subset)))):G__63388__$5);
var G__63388__$7 = ((cljs.core.contains_QMARK_(fetches,"tp-columns"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__63388__$6,"tp-columns",cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.first,org.nfrac.comportex.protocols.temporal_pooling_cells(lyr))):G__63388__$6);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__63388__$7,"break?",cljs.core.empty_QMARK_(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(lyr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$prior_DASH_distal_DASH_state,cljs.core.cst$kw$active_DASH_bits], null))));

} else {
return org.numenta.sanity.comportex.journal.id_missing_response(id,steps_offset);
}
})());

break;
case "get-sense-bits":
var vec__63393 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63393,(0),null);
var sense_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63393,(1),null);
var fetches = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63393,(2),null);
var map__63394 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63393,(3),null);
var map__63394__$1 = ((((!((map__63394 == null)))?((((map__63394.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63394.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63394):map__63394);
var bits_subset = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63394__$1,cljs.core.cst$kw$value);
var map__63395 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63393,(4),null);
var map__63395__$1 = ((((!((map__63395 == null)))?((((map__63395.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63395.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63395):map__63395);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63395__$1,cljs.core.cst$kw$ch);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,(function (){var temp__4651__auto__ = find_model_pair(id);
if(cljs.core.truth_(temp__4651__auto__)){
var vec__63398 = temp__4651__auto__;
var prev_htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63398,(0),null);
var htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63398,(1),null);
var sense = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$senses,sense_id], null));
var ff_rgn_id = cljs.core.first(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$fb_DASH_deps,sense_id], null)));
var prev_ff_rgn = (((org.nfrac.comportex.protocols.size(org.nfrac.comportex.protocols.ff_topology(sense)) > (0)))?cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(prev_htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,ff_rgn_id], null)):null);
var G__63399 = cljs.core.PersistentArrayMap.EMPTY;
var G__63399__$1 = ((cljs.core.contains_QMARK_(fetches,"active-bits"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__63399,"active-bits",cljs.core.set(org.numenta.sanity.comportex.data.active_bits(sense))):G__63399);
if(cljs.core.truth_((function (){var and__4670__auto__ = cljs.core.contains_QMARK_(fetches,"pred-bits-alpha");
if(and__4670__auto__){
return prev_ff_rgn;
} else {
return and__4670__auto__;
}
})())){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__63399__$1,"pred-bits-alpha",(function (){var start = org.nfrac.comportex.core.ff_base(htm,ff_rgn_id,sense_id);
var end = (start + org.nfrac.comportex.protocols.size(org.nfrac.comportex.protocols.ff_topology(sense)));
return org.nfrac.comportex.util.remap(((function (start,end,G__63399,G__63399__$1,sense,ff_rgn_id,prev_ff_rgn,vec__63398,prev_htm,htm,temp__4651__auto__,vec__63393,id,sense_id,fetches,map__63394,map__63394__$1,bits_subset,map__63395,map__63395__$1,response_c,G__63361,client_info,vec__63358,vec__63359,command,xs,client_id){
return (function (p1__63016_SHARP_){
var x__5020__auto__ = 1.0;
var y__5021__auto__ = (p1__63016_SHARP_ / (8));
return ((x__5020__auto__ < y__5021__auto__) ? x__5020__auto__ : y__5021__auto__);
});})(start,end,G__63399,G__63399__$1,sense,ff_rgn_id,prev_ff_rgn,vec__63398,prev_htm,htm,temp__4651__auto__,vec__63393,id,sense_id,fetches,map__63394,map__63394__$1,bits_subset,map__63395,map__63395__$1,response_c,G__63361,client_info,vec__63358,vec__63359,command,xs,client_id))
,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.keep.cljs$core$IFn$_invoke$arity$2(((function (start,end,G__63399,G__63399__$1,sense,ff_rgn_id,prev_ff_rgn,vec__63398,prev_htm,htm,temp__4651__auto__,vec__63393,id,sense_id,fetches,map__63394,map__63394__$1,bits_subset,map__63395,map__63395__$1,response_c,G__63361,client_info,vec__63358,vec__63359,command,xs,client_id){
return (function (p__63400){
var vec__63401 = p__63400;
var id__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63401,(0),null);
var votes = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63401,(1),null);
if(((start <= id__$1)) && ((id__$1 < end))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(id__$1 - start),votes], null);
} else {
return null;
}
});})(start,end,G__63399,G__63399__$1,sense,ff_rgn_id,prev_ff_rgn,vec__63398,prev_htm,htm,temp__4651__auto__,vec__63393,id,sense_id,fetches,map__63394,map__63394__$1,bits_subset,map__63395,map__63395__$1,response_c,G__63361,client_info,vec__63358,vec__63359,command,xs,client_id))
,org.nfrac.comportex.core.predicted_bit_votes(prev_ff_rgn))));
})());
} else {
return G__63399__$1;
}
} else {
return org.numenta.sanity.comportex.journal.id_missing_response(id,steps_offset);
}
})());

break;
case "get-proximal-synapses-by-source-bit":
var vec__63402 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63402,(0),null);
var sense_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63402,(1),null);
var bit = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63402,(2),null);
var syn_states = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63402,(3),null);
var map__63403 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63402,(4),null);
var map__63403__$1 = ((((!((map__63403 == null)))?((((map__63403.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63403.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63403):map__63403);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63403__$1,cljs.core.cst$kw$ch);
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
var vec__63405 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63405,(0),null);
var rgn_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63405,(1),null);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63405,(2),null);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63405,(3),null);
var map__63406 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63405,(4),null);
var map__63406__$1 = ((((!((map__63406 == null)))?((((map__63406.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63406.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63406):map__63406);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63406__$1,cljs.core.cst$kw$ch);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,(function (){var temp__4651__auto__ = find_model(id);
if(cljs.core.truth_(temp__4651__auto__)){
var htm = temp__4651__auto__;
var lyr = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,rgn_id,lyr_id], null));
var extract_cells = ((function (lyr,htm,temp__4651__auto__,vec__63405,id,rgn_id,lyr_id,col,map__63406,map__63406__$1,response_c,G__63361,client_info,vec__63358,vec__63359,command,xs,client_id){
return (function (p1__63017_SHARP_){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentHashSet.EMPTY,cljs.core.keep.cljs$core$IFn$_invoke$arity$2(((function (lyr,htm,temp__4651__auto__,vec__63405,id,rgn_id,lyr_id,col,map__63406,map__63406__$1,response_c,G__63361,client_info,vec__63358,vec__63359,command,xs,client_id){
return (function (p__63408){
var vec__63409 = p__63408;
var column = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63409,(0),null);
var ci = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63409,(1),null);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(col,column)){
return ci;
} else {
return null;
}
});})(lyr,htm,temp__4651__auto__,vec__63405,id,rgn_id,lyr_id,col,map__63406,map__63406__$1,response_c,G__63361,client_info,vec__63358,vec__63359,command,xs,client_id))
,p1__63017_SHARP_));
});})(lyr,htm,temp__4651__auto__,vec__63405,id,rgn_id,lyr_id,col,map__63406,map__63406__$1,response_c,G__63361,client_info,vec__63358,vec__63359,command,xs,client_id))
;
return new cljs.core.PersistentArrayMap(null, 4, ["cells-per-column",org.nfrac.comportex.protocols.layer_depth(lyr),"active-cells",extract_cells(org.nfrac.comportex.protocols.active_cells(lyr)),"prior-predicted-cells",extract_cells(org.nfrac.comportex.protocols.prior_predictive_cells(lyr)),"winner-cells",extract_cells(org.nfrac.comportex.protocols.winner_cells(lyr))], null);
} else {
return org.numenta.sanity.comportex.journal.id_missing_response(id,steps_offset);
}
})());

break;
case "get-column-apical-segments":
var vec__63410 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63410,(0),null);
var rgn_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63410,(1),null);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63410,(2),null);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63410,(3),null);
var map__63411 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63410,(4),null);
var map__63411__$1 = ((((!((map__63411 == null)))?((((map__63411.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63411.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63411):map__63411);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63411__$1,cljs.core.cst$kw$ch);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,(function (){var temp__4651__auto__ = find_model_pair(id);
if(cljs.core.truth_(temp__4651__auto__)){
var vec__63413 = temp__4651__auto__;
var prev_htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63413,(0),null);
var htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63413,(1),null);
return org.numenta.sanity.comportex.data.column_segs(htm,prev_htm,rgn_id,lyr_id,col,cljs.core.cst$kw$apical);
} else {
return org.numenta.sanity.comportex.journal.id_missing_response(id,steps_offset);
}
})());

break;
case "get-column-distal-segments":
var vec__63414 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63414,(0),null);
var rgn_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63414,(1),null);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63414,(2),null);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63414,(3),null);
var map__63415 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63414,(4),null);
var map__63415__$1 = ((((!((map__63415 == null)))?((((map__63415.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63415.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63415):map__63415);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63415__$1,cljs.core.cst$kw$ch);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,(function (){var temp__4651__auto__ = find_model_pair(id);
if(cljs.core.truth_(temp__4651__auto__)){
var vec__63417 = temp__4651__auto__;
var prev_htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63417,(0),null);
var htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63417,(1),null);
return org.numenta.sanity.comportex.data.column_segs(htm,prev_htm,rgn_id,lyr_id,col,cljs.core.cst$kw$distal);
} else {
return org.numenta.sanity.comportex.journal.id_missing_response(id,steps_offset);
}
})());

break;
case "get-column-proximal-segments":
var vec__63418 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63418,(0),null);
var rgn_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63418,(1),null);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63418,(2),null);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63418,(3),null);
var map__63419 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63418,(4),null);
var map__63419__$1 = ((((!((map__63419 == null)))?((((map__63419.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63419.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63419):map__63419);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63419__$1,cljs.core.cst$kw$ch);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,(function (){var temp__4651__auto__ = find_model_pair(id);
if(cljs.core.truth_(temp__4651__auto__)){
var vec__63421 = temp__4651__auto__;
var prev_htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63421,(0),null);
var htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63421,(1),null);
return org.numenta.sanity.comportex.data.column_segs(htm,prev_htm,rgn_id,lyr_id,col,cljs.core.cst$kw$proximal);
} else {
return org.numenta.sanity.comportex.journal.id_missing_response(id,steps_offset);
}
})());

break;
case "get-apical-segment-synapses":
var vec__63422 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63422,(0),null);
var rgn_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63422,(1),null);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63422,(2),null);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63422,(3),null);
var ci = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63422,(4),null);
var si = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63422,(5),null);
var syn_states = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63422,(6),null);
var map__63423 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63422,(7),null);
var map__63423__$1 = ((((!((map__63423 == null)))?((((map__63423.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63423.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63423):map__63423);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63423__$1,cljs.core.cst$kw$ch);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,(function (){var temp__4651__auto__ = find_model_pair(id);
if(cljs.core.truth_(temp__4651__auto__)){
var vec__63425 = temp__4651__auto__;
var prev_htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63425,(0),null);
var htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63425,(1),null);
return org.numenta.sanity.comportex.data.segment_syns(htm,prev_htm,rgn_id,lyr_id,col,ci,si,syn_states,cljs.core.cst$kw$apical);
} else {
return org.numenta.sanity.comportex.journal.id_missing_response(id,steps_offset);
}
})());

break;
case "get-distal-segment-synapses":
var vec__63426 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63426,(0),null);
var rgn_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63426,(1),null);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63426,(2),null);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63426,(3),null);
var ci = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63426,(4),null);
var si = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63426,(5),null);
var syn_states = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63426,(6),null);
var map__63427 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63426,(7),null);
var map__63427__$1 = ((((!((map__63427 == null)))?((((map__63427.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63427.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63427):map__63427);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63427__$1,cljs.core.cst$kw$ch);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,(function (){var temp__4651__auto__ = find_model_pair(id);
if(cljs.core.truth_(temp__4651__auto__)){
var vec__63429 = temp__4651__auto__;
var prev_htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63429,(0),null);
var htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63429,(1),null);
return org.numenta.sanity.comportex.data.segment_syns(htm,prev_htm,rgn_id,lyr_id,col,ci,si,syn_states,cljs.core.cst$kw$distal);
} else {
return org.numenta.sanity.comportex.journal.id_missing_response(id,steps_offset);
}
})());

break;
case "get-proximal-segment-synapses":
var vec__63430 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63430,(0),null);
var rgn_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63430,(1),null);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63430,(2),null);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63430,(3),null);
var ci = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63430,(4),null);
var si = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63430,(5),null);
var syn_states = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63430,(6),null);
var map__63431 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63430,(7),null);
var map__63431__$1 = ((((!((map__63431 == null)))?((((map__63431.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63431.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63431):map__63431);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63431__$1,cljs.core.cst$kw$ch);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,(function (){var temp__4651__auto__ = find_model_pair(id);
if(cljs.core.truth_(temp__4651__auto__)){
var vec__63433 = temp__4651__auto__;
var prev_htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63433,(0),null);
var htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63433,(1),null);
return org.numenta.sanity.comportex.data.segment_syns(htm,prev_htm,rgn_id,lyr_id,col,ci,si,syn_states,cljs.core.cst$kw$proximal);
} else {
return org.numenta.sanity.comportex.journal.id_missing_response(id,steps_offset);
}
})());

break;
case "get-details-text":
var vec__63434 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63434,(0),null);
var rgn_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63434,(1),null);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63434,(2),null);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63434,(3),null);
var map__63435 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63434,(4),null);
var map__63435__$1 = ((((!((map__63435 == null)))?((((map__63435.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63435.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63435):map__63435);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63435__$1,cljs.core.cst$kw$ch);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,(function (){var temp__4651__auto__ = find_model_pair(id);
if(cljs.core.truth_(temp__4651__auto__)){
var vec__63437 = temp__4651__auto__;
var prev_htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63437,(0),null);
var htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63437,(1),null);
return org.numenta.sanity.comportex.details.detail_text(htm,prev_htm,rgn_id,lyr_id,col);
} else {
return org.numenta.sanity.comportex.journal.id_missing_response(id,steps_offset);
}
})());

break;
case "get-model":
var vec__63438 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63438,(0),null);
var map__63439 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63438,(1),null);
var map__63439__$1 = ((((!((map__63439 == null)))?((((map__63439.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63439.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63439):map__63439);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63439__$1,cljs.core.cst$kw$ch);
var as_str_QMARK_ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63438,(2),null);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,(function (){var temp__4651__auto__ = find_model(id);
if(cljs.core.truth_(temp__4651__auto__)){
var htm = temp__4651__auto__;
var G__63441 = htm;
if(cljs.core.truth_(as_str_QMARK_)){
return cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([G__63441], 0));
} else {
return G__63441;
}
} else {
return org.numenta.sanity.comportex.journal.id_missing_response(id,steps_offset);
}
})());

break;
case "get-column-state-freqs":
var vec__63442 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63442,(0),null);
var map__63443 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63442,(1),null);
var map__63443__$1 = ((((!((map__63443 == null)))?((((map__63443.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63443.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63443):map__63443);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63443__$1,cljs.core.cst$kw$ch);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,(function (){var temp__4651__auto__ = find_model(id);
if(cljs.core.truth_(temp__4651__auto__)){
var htm = temp__4651__auto__;
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__5454__auto__ = ((function (htm,temp__4651__auto__,vec__63442,id,map__63443,map__63443__$1,response_c,G__63361,client_info,vec__63358,vec__63359,command,xs,client_id){
return (function org$numenta$sanity$comportex$journal$command_handler_$_handle_command_$_iter__63445(s__63446){
return (new cljs.core.LazySeq(null,((function (htm,temp__4651__auto__,vec__63442,id,map__63443,map__63443__$1,response_c,G__63361,client_info,vec__63358,vec__63359,command,xs,client_id){
return (function (){
var s__63446__$1 = s__63446;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__63446__$1);
if(temp__4653__auto__){
var xs__5201__auto__ = temp__4653__auto__;
var vec__63455 = cljs.core.first(xs__5201__auto__);
var region_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63455,(0),null);
var rgn = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63455,(1),null);
var iterys__5450__auto__ = ((function (s__63446__$1,vec__63455,region_key,rgn,xs__5201__auto__,temp__4653__auto__,htm,temp__4651__auto__,vec__63442,id,map__63443,map__63443__$1,response_c,G__63361,client_info,vec__63358,vec__63359,command,xs,client_id){
return (function org$numenta$sanity$comportex$journal$command_handler_$_handle_command_$_iter__63445_$_iter__63447(s__63448){
return (new cljs.core.LazySeq(null,((function (s__63446__$1,vec__63455,region_key,rgn,xs__5201__auto__,temp__4653__auto__,htm,temp__4651__auto__,vec__63442,id,map__63443,map__63443__$1,response_c,G__63361,client_info,vec__63358,vec__63359,command,xs,client_id){
return (function (){
var s__63448__$1 = s__63448;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__63448__$1);
if(temp__4653__auto____$1){
var s__63448__$2 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__63448__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__63448__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__63450 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__63449 = (0);
while(true){
if((i__63449 < size__5453__auto__)){
var layer_id = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__63449);
cljs.core.chunk_append(b__63450,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [region_key,layer_id], null),clojure.walk.stringify_keys(org.nfrac.comportex.core.column_state_freqs.cljs$core$IFn$_invoke$arity$2(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,region_key], null)),layer_id))], null));

var G__63469 = (i__63449 + (1));
i__63449 = G__63469;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__63450),org$numenta$sanity$comportex$journal$command_handler_$_handle_command_$_iter__63445_$_iter__63447(cljs.core.chunk_rest(s__63448__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__63450),null);
}
} else {
var layer_id = cljs.core.first(s__63448__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [region_key,layer_id], null),clojure.walk.stringify_keys(org.nfrac.comportex.core.column_state_freqs.cljs$core$IFn$_invoke$arity$2(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,region_key], null)),layer_id))], null),org$numenta$sanity$comportex$journal$command_handler_$_handle_command_$_iter__63445_$_iter__63447(cljs.core.rest(s__63448__$2)));
}
} else {
return null;
}
break;
}
});})(s__63446__$1,vec__63455,region_key,rgn,xs__5201__auto__,temp__4653__auto__,htm,temp__4651__auto__,vec__63442,id,map__63443,map__63443__$1,response_c,G__63361,client_info,vec__63358,vec__63359,command,xs,client_id))
,null,null));
});})(s__63446__$1,vec__63455,region_key,rgn,xs__5201__auto__,temp__4653__auto__,htm,temp__4651__auto__,vec__63442,id,map__63443,map__63443__$1,response_c,G__63361,client_info,vec__63358,vec__63359,command,xs,client_id))
;
var fs__5451__auto__ = cljs.core.seq(iterys__5450__auto__(org.nfrac.comportex.core.layers(rgn)));
if(fs__5451__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5451__auto__,org$numenta$sanity$comportex$journal$command_handler_$_handle_command_$_iter__63445(cljs.core.rest(s__63446__$1)));
} else {
var G__63470 = cljs.core.rest(s__63446__$1);
s__63446__$1 = G__63470;
continue;
}
} else {
return null;
}
break;
}
});})(htm,temp__4651__auto__,vec__63442,id,map__63443,map__63443__$1,response_c,G__63361,client_info,vec__63358,vec__63359,command,xs,client_id))
,null,null));
});})(htm,temp__4651__auto__,vec__63442,id,map__63443,map__63443__$1,response_c,G__63361,client_info,vec__63358,vec__63359,command,xs,client_id))
;
return iter__5454__auto__(cljs.core.cst$kw$regions.cljs$core$IFn$_invoke$arity$1(htm));
})());
} else {
return org.numenta.sanity.comportex.journal.id_missing_response(id,steps_offset);
}
})());

break;
case "get-cell-excitation-data":
var vec__63458 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63458,(0),null);
var rgn_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63458,(1),null);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63458,(2),null);
var sel_col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63458,(3),null);
var map__63459 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63458,(4),null);
var map__63459__$1 = ((((!((map__63459 == null)))?((((map__63459.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63459.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63459):map__63459);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63459__$1,cljs.core.cst$kw$ch);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,(function (){var vec__63461 = find_model_pair(id);
var prev_htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63461,(0),null);
var htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63461,(1),null);
if(cljs.core.truth_(prev_htm)){
return org.numenta.sanity.comportex.data.cell_excitation_data(htm,prev_htm,rgn_id,lyr_id,sel_col);
} else {
return org.numenta.sanity.comportex.journal.id_missing_response(id,steps_offset);
}
})());

break;
case "get-cells-by-state":
var vec__63462 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63462,(0),null);
var rgn_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63462,(1),null);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63462,(2),null);
var map__63463 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63462,(3),null);
var map__63463__$1 = ((((!((map__63463 == null)))?((((map__63463.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63463.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63463):map__63463);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63463__$1,cljs.core.cst$kw$ch);
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
var vec__63465 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63465,(0),null);
var rgn_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63465,(1),null);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63465,(2),null);
var cell_sdr_fracs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63465,(3),null);
var map__63466 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63465,(4),null);
var map__63466__$1 = ((((!((map__63466 == null)))?((((map__63466.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63466.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63466):map__63466);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63466__$1,cljs.core.cst$kw$ch);
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
var model_steps = (function (){var G__63572 = cljs.core.PersistentVector.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__63572) : cljs.core.atom.call(null,G__63572));
})();
var steps_in = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
var steps_mult = cljs.core.async.mult(steps_in);
var client_infos = (function (){var G__63573 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__63573) : cljs.core.atom.call(null,G__63573));
})();
var capture_options = (function (){var G__63574 = new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$keep_DASH_steps,n_keep,cljs.core.cst$kw$ff_DASH_synapses,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$capture_QMARK_,true,cljs.core.cst$kw$only_DASH_active_QMARK_,false,cljs.core.cst$kw$only_DASH_connected_QMARK_,false], null),cljs.core.cst$kw$distal_DASH_synapses,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$capture_QMARK_,true,cljs.core.cst$kw$only_DASH_active_QMARK_,false,cljs.core.cst$kw$only_DASH_connected_QMARK_,false,cljs.core.cst$kw$only_DASH_noteworthy_DASH_columns_QMARK_,false], null),cljs.core.cst$kw$apical_DASH_synapses,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$capture_QMARK_,true,cljs.core.cst$kw$only_DASH_active_QMARK_,false,cljs.core.cst$kw$only_DASH_connected_QMARK_,false,cljs.core.cst$kw$only_DASH_noteworthy_DASH_columns_QMARK_,false], null)], null);
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__63574) : cljs.core.atom.call(null,G__63574));
})();
var handle_command = org.numenta.sanity.comportex.journal.command_handler(current_model,steps_offset,model_steps,steps_mult,client_infos,capture_options);
var c__35961__auto___63673 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__35961__auto___63673,steps_offset,model_steps,steps_in,steps_mult,client_infos,capture_options,handle_command){
return (function (){
var f__35962__auto__ = (function (){var switch__35847__auto__ = ((function (c__35961__auto___63673,steps_offset,model_steps,steps_in,steps_mult,client_infos,capture_options,handle_command){
return (function (state_63614){
var state_val_63615 = (state_63614[(1)]);
if((state_val_63615 === (7))){
var inst_63610 = (state_63614[(2)]);
var state_63614__$1 = state_63614;
var statearr_63616_63674 = state_63614__$1;
(statearr_63616_63674[(2)] = inst_63610);

(statearr_63616_63674[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_63615 === (1))){
var state_63614__$1 = state_63614;
var statearr_63617_63675 = state_63614__$1;
(statearr_63617_63675[(2)] = null);

(statearr_63617_63675[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_63615 === (4))){
var inst_63577 = (state_63614[(7)]);
var inst_63577__$1 = (state_63614[(2)]);
var state_63614__$1 = (function (){var statearr_63618 = state_63614;
(statearr_63618[(7)] = inst_63577__$1);

return statearr_63618;
})();
if(cljs.core.truth_(inst_63577__$1)){
var statearr_63619_63676 = state_63614__$1;
(statearr_63619_63676[(1)] = (5));

} else {
var statearr_63620_63677 = state_63614__$1;
(statearr_63620_63677[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_63615 === (13))){
var inst_63595 = (state_63614[(8)]);
var inst_63582 = (state_63614[(9)]);
var inst_63577 = (state_63614[(7)]);
var inst_63602 = (state_63614[(2)]);
var inst_63603 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(model_steps,inst_63602) : cljs.core.reset_BANG_.call(null,model_steps,inst_63602));
var inst_63604 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(steps_offset,cljs.core._PLUS_,inst_63595);
var inst_63605 = org.numenta.sanity.comportex.journal.make_step(inst_63577,inst_63582);
var inst_63606 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(steps_in,inst_63605);
var state_63614__$1 = (function (){var statearr_63621 = state_63614;
(statearr_63621[(10)] = inst_63603);

(statearr_63621[(11)] = inst_63604);

(statearr_63621[(12)] = inst_63606);

return statearr_63621;
})();
var statearr_63622_63678 = state_63614__$1;
(statearr_63622_63678[(2)] = null);

(statearr_63622_63678[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_63615 === (6))){
var state_63614__$1 = state_63614;
var statearr_63623_63679 = state_63614__$1;
(statearr_63623_63679[(2)] = null);

(statearr_63623_63679[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_63615 === (3))){
var inst_63612 = (state_63614[(2)]);
var state_63614__$1 = state_63614;
return cljs.core.async.impl.ioc_helpers.return_chan(state_63614__$1,inst_63612);
} else {
if((state_val_63615 === (12))){
var inst_63584 = (state_63614[(13)]);
var state_63614__$1 = state_63614;
var statearr_63624_63680 = state_63614__$1;
(statearr_63624_63680[(2)] = inst_63584);

(statearr_63624_63680[(1)] = (13));


return cljs.core.cst$kw$recur;
} else {
if((state_val_63615 === (2))){
var state_63614__$1 = state_63614;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_63614__$1,(4),steps_c);
} else {
if((state_val_63615 === (11))){
var inst_63595 = (state_63614[(8)]);
var inst_63584 = (state_63614[(13)]);
var inst_63599 = cljs.core.subvec.cljs$core$IFn$_invoke$arity$2(inst_63584,inst_63595);
var state_63614__$1 = state_63614;
var statearr_63625_63681 = state_63614__$1;
(statearr_63625_63681[(2)] = inst_63599);

(statearr_63625_63681[(1)] = (13));


return cljs.core.cst$kw$recur;
} else {
if((state_val_63615 === (9))){
var state_63614__$1 = state_63614;
var statearr_63626_63682 = state_63614__$1;
(statearr_63626_63682[(2)] = (0));

(statearr_63626_63682[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_63615 === (5))){
var inst_63577 = (state_63614[(7)]);
var inst_63586 = (state_63614[(14)]);
var inst_63579 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(steps_offset) : cljs.core.deref.call(null,steps_offset));
var inst_63580 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(model_steps) : cljs.core.deref.call(null,model_steps));
var inst_63581 = cljs.core.count(inst_63580);
var inst_63582 = (inst_63579 + inst_63581);
var inst_63583 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(model_steps) : cljs.core.deref.call(null,model_steps));
var inst_63584 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(inst_63583,inst_63577);
var inst_63585 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(capture_options) : cljs.core.deref.call(null,capture_options));
var inst_63586__$1 = cljs.core.cst$kw$keep_DASH_steps.cljs$core$IFn$_invoke$arity$1(inst_63585);
var inst_63587 = (inst_63586__$1 < (0));
var inst_63588 = cljs.core.not(inst_63587);
var state_63614__$1 = (function (){var statearr_63627 = state_63614;
(statearr_63627[(9)] = inst_63582);

(statearr_63627[(14)] = inst_63586__$1);

(statearr_63627[(13)] = inst_63584);

return statearr_63627;
})();
if(inst_63588){
var statearr_63628_63683 = state_63614__$1;
(statearr_63628_63683[(1)] = (8));

} else {
var statearr_63629_63684 = state_63614__$1;
(statearr_63629_63684[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_63615 === (10))){
var inst_63595 = (state_63614[(8)]);
var inst_63595__$1 = (state_63614[(2)]);
var inst_63597 = (inst_63595__$1 > (0));
var state_63614__$1 = (function (){var statearr_63630 = state_63614;
(statearr_63630[(8)] = inst_63595__$1);

return statearr_63630;
})();
if(cljs.core.truth_(inst_63597)){
var statearr_63631_63685 = state_63614__$1;
(statearr_63631_63685[(1)] = (11));

} else {
var statearr_63632_63686 = state_63614__$1;
(statearr_63632_63686[(1)] = (12));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_63615 === (8))){
var inst_63586 = (state_63614[(14)]);
var inst_63584 = (state_63614[(13)]);
var inst_63590 = cljs.core.count(inst_63584);
var inst_63591 = (inst_63590 - inst_63586);
var inst_63592 = (((0) > inst_63591) ? (0) : inst_63591);
var state_63614__$1 = state_63614;
var statearr_63633_63687 = state_63614__$1;
(statearr_63633_63687[(2)] = inst_63592);

(statearr_63633_63687[(1)] = (10));


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
});})(c__35961__auto___63673,steps_offset,model_steps,steps_in,steps_mult,client_infos,capture_options,handle_command))
;
return ((function (switch__35847__auto__,c__35961__auto___63673,steps_offset,model_steps,steps_in,steps_mult,client_infos,capture_options,handle_command){
return (function() {
var org$numenta$sanity$comportex$journal$init_$_state_machine__35848__auto__ = null;
var org$numenta$sanity$comportex$journal$init_$_state_machine__35848__auto____0 = (function (){
var statearr_63637 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_63637[(0)] = org$numenta$sanity$comportex$journal$init_$_state_machine__35848__auto__);

(statearr_63637[(1)] = (1));

return statearr_63637;
});
var org$numenta$sanity$comportex$journal$init_$_state_machine__35848__auto____1 = (function (state_63614){
while(true){
var ret_value__35849__auto__ = (function (){try{while(true){
var result__35850__auto__ = switch__35847__auto__(state_63614);
if(cljs.core.keyword_identical_QMARK_(result__35850__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__35850__auto__;
}
break;
}
}catch (e63638){if((e63638 instanceof Object)){
var ex__35851__auto__ = e63638;
var statearr_63639_63688 = state_63614;
(statearr_63639_63688[(5)] = ex__35851__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_63614);

return cljs.core.cst$kw$recur;
} else {
throw e63638;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35849__auto__,cljs.core.cst$kw$recur)){
var G__63689 = state_63614;
state_63614 = G__63689;
continue;
} else {
return ret_value__35849__auto__;
}
break;
}
});
org$numenta$sanity$comportex$journal$init_$_state_machine__35848__auto__ = function(state_63614){
switch(arguments.length){
case 0:
return org$numenta$sanity$comportex$journal$init_$_state_machine__35848__auto____0.call(this);
case 1:
return org$numenta$sanity$comportex$journal$init_$_state_machine__35848__auto____1.call(this,state_63614);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$comportex$journal$init_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$comportex$journal$init_$_state_machine__35848__auto____0;
org$numenta$sanity$comportex$journal$init_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$comportex$journal$init_$_state_machine__35848__auto____1;
return org$numenta$sanity$comportex$journal$init_$_state_machine__35848__auto__;
})()
;})(switch__35847__auto__,c__35961__auto___63673,steps_offset,model_steps,steps_in,steps_mult,client_infos,capture_options,handle_command))
})();
var state__35963__auto__ = (function (){var statearr_63640 = (f__35962__auto__.cljs$core$IFn$_invoke$arity$0 ? f__35962__auto__.cljs$core$IFn$_invoke$arity$0() : f__35962__auto__.call(null));
(statearr_63640[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__35961__auto___63673);

return statearr_63640;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__35963__auto__);
});})(c__35961__auto___63673,steps_offset,model_steps,steps_in,steps_mult,client_infos,capture_options,handle_command))
);


var c__35961__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__35961__auto__,steps_offset,model_steps,steps_in,steps_mult,client_infos,capture_options,handle_command){
return (function (){
var f__35962__auto__ = (function (){var switch__35847__auto__ = ((function (c__35961__auto__,steps_offset,model_steps,steps_in,steps_mult,client_infos,capture_options,handle_command){
return (function (state_63656){
var state_val_63657 = (state_63656[(1)]);
if((state_val_63657 === (1))){
var state_63656__$1 = state_63656;
var statearr_63658_63690 = state_63656__$1;
(statearr_63658_63690[(2)] = null);

(statearr_63658_63690[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_63657 === (2))){
var state_63656__$1 = state_63656;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_63656__$1,(4),commands_c);
} else {
if((state_val_63657 === (3))){
var inst_63654 = (state_63656[(2)]);
var state_63656__$1 = state_63656;
return cljs.core.async.impl.ioc_helpers.return_chan(state_63656__$1,inst_63654);
} else {
if((state_val_63657 === (4))){
var inst_63643 = (state_63656[(7)]);
var inst_63643__$1 = (state_63656[(2)]);
var inst_63644 = (inst_63643__$1 == null);
var inst_63645 = cljs.core.not(inst_63644);
var state_63656__$1 = (function (){var statearr_63659 = state_63656;
(statearr_63659[(7)] = inst_63643__$1);

return statearr_63659;
})();
if(inst_63645){
var statearr_63660_63691 = state_63656__$1;
(statearr_63660_63691[(1)] = (5));

} else {
var statearr_63661_63692 = state_63656__$1;
(statearr_63661_63692[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_63657 === (5))){
var inst_63643 = (state_63656[(7)]);
var inst_63647 = (handle_command.cljs$core$IFn$_invoke$arity$1 ? handle_command.cljs$core$IFn$_invoke$arity$1(inst_63643) : handle_command.call(null,inst_63643));
var state_63656__$1 = (function (){var statearr_63662 = state_63656;
(statearr_63662[(8)] = inst_63647);

return statearr_63662;
})();
var statearr_63663_63693 = state_63656__$1;
(statearr_63663_63693[(2)] = null);

(statearr_63663_63693[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_63657 === (6))){
var inst_63650 = cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["CLOSING JOURNAL"], 0));
var state_63656__$1 = state_63656;
var statearr_63664_63694 = state_63656__$1;
(statearr_63664_63694[(2)] = inst_63650);

(statearr_63664_63694[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_63657 === (7))){
var inst_63652 = (state_63656[(2)]);
var state_63656__$1 = state_63656;
var statearr_63665_63695 = state_63656__$1;
(statearr_63665_63695[(2)] = inst_63652);

(statearr_63665_63695[(1)] = (3));


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
var statearr_63669 = [null,null,null,null,null,null,null,null,null];
(statearr_63669[(0)] = org$numenta$sanity$comportex$journal$init_$_state_machine__35848__auto__);

(statearr_63669[(1)] = (1));

return statearr_63669;
});
var org$numenta$sanity$comportex$journal$init_$_state_machine__35848__auto____1 = (function (state_63656){
while(true){
var ret_value__35849__auto__ = (function (){try{while(true){
var result__35850__auto__ = switch__35847__auto__(state_63656);
if(cljs.core.keyword_identical_QMARK_(result__35850__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__35850__auto__;
}
break;
}
}catch (e63670){if((e63670 instanceof Object)){
var ex__35851__auto__ = e63670;
var statearr_63671_63696 = state_63656;
(statearr_63671_63696[(5)] = ex__35851__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_63656);

return cljs.core.cst$kw$recur;
} else {
throw e63670;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35849__auto__,cljs.core.cst$kw$recur)){
var G__63697 = state_63656;
state_63656 = G__63697;
continue;
} else {
return ret_value__35849__auto__;
}
break;
}
});
org$numenta$sanity$comportex$journal$init_$_state_machine__35848__auto__ = function(state_63656){
switch(arguments.length){
case 0:
return org$numenta$sanity$comportex$journal$init_$_state_machine__35848__auto____0.call(this);
case 1:
return org$numenta$sanity$comportex$journal$init_$_state_machine__35848__auto____1.call(this,state_63656);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$comportex$journal$init_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$comportex$journal$init_$_state_machine__35848__auto____0;
org$numenta$sanity$comportex$journal$init_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$comportex$journal$init_$_state_machine__35848__auto____1;
return org$numenta$sanity$comportex$journal$init_$_state_machine__35848__auto__;
})()
;})(switch__35847__auto__,c__35961__auto__,steps_offset,model_steps,steps_in,steps_mult,client_infos,capture_options,handle_command))
})();
var state__35963__auto__ = (function (){var statearr_63672 = (f__35962__auto__.cljs$core$IFn$_invoke$arity$0 ? f__35962__auto__.cljs$core$IFn$_invoke$arity$0() : f__35962__auto__.call(null));
(statearr_63672[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__35961__auto__);

return statearr_63672;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__35963__auto__);
});})(c__35961__auto__,steps_offset,model_steps,steps_in,steps_mult,client_infos,capture_options,handle_command))
);

return c__35961__auto__;
});
