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
org.numenta.sanity.comportex.journal.make_step = (function org$numenta$sanity$comportex$journal$make_step(htm,id){
var input_value = cljs.core.cst$kw$input_DASH_value.cljs$core$IFn$_invoke$arity$1(htm);
return new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$model_DASH_id,id,cljs.core.cst$kw$timestep,org.nfrac.comportex.protocols.timestep(htm),cljs.core.cst$kw$input_DASH_value,input_value,cljs.core.cst$kw$sensed_DASH_values,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__5454__auto__ = ((function (input_value){
return (function org$numenta$sanity$comportex$journal$make_step_$_iter__63030(s__63031){
return (new cljs.core.LazySeq(null,((function (input_value){
return (function (){
var s__63031__$1 = s__63031;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__63031__$1);
if(temp__4653__auto__){
var s__63031__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__63031__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__63031__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__63033 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__63032 = (0);
while(true){
if((i__63032 < size__5453__auto__)){
var sense_id = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__63032);
var vec__63038 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$sensors,sense_id], null));
var selector = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63038,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63038,(1),null);
var v = org.nfrac.comportex.protocols.extract(selector,input_value);
cljs.core.chunk_append(b__63033,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [sense_id,v], null));

var G__63076 = (i__63032 + (1));
i__63032 = G__63076;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__63033),org$numenta$sanity$comportex$journal$make_step_$_iter__63030(cljs.core.chunk_rest(s__63031__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__63033),null);
}
} else {
var sense_id = cljs.core.first(s__63031__$2);
var vec__63039 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$sensors,sense_id], null));
var selector = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63039,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63039,(1),null);
var v = org.nfrac.comportex.protocols.extract(selector,input_value);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [sense_id,v], null),org$numenta$sanity$comportex$journal$make_step_$_iter__63030(cljs.core.rest(s__63031__$2)));
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
})()),cljs.core.cst$kw$senses,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__5454__auto__ = ((function (input_value){
return (function org$numenta$sanity$comportex$journal$make_step_$_iter__63040(s__63041){
return (new cljs.core.LazySeq(null,((function (input_value){
return (function (){
var s__63041__$1 = s__63041;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__63041__$1);
if(temp__4653__auto__){
var s__63041__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__63041__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__63041__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__63043 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__63042 = (0);
while(true){
if((i__63042 < size__5453__auto__)){
var sense_id = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__63042);
var sense = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$senses,sense_id], null));
cljs.core.chunk_append(b__63043,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [sense_id,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$active_DASH_bits,cljs.core.set(org.numenta.sanity.comportex.data.active_bits(sense))], null)], null));

var G__63077 = (i__63042 + (1));
i__63042 = G__63077;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__63043),org$numenta$sanity$comportex$journal$make_step_$_iter__63040(cljs.core.chunk_rest(s__63041__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__63043),null);
}
} else {
var sense_id = cljs.core.first(s__63041__$2);
var sense = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$senses,sense_id], null));
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [sense_id,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$active_DASH_bits,cljs.core.set(org.numenta.sanity.comportex.data.active_bits(sense))], null)], null),org$numenta$sanity$comportex$journal$make_step_$_iter__63040(cljs.core.rest(s__63041__$2)));
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
})()),cljs.core.cst$kw$regions,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__5454__auto__ = ((function (input_value){
return (function org$numenta$sanity$comportex$journal$make_step_$_iter__63046(s__63047){
return (new cljs.core.LazySeq(null,((function (input_value){
return (function (){
var s__63047__$1 = s__63047;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__63047__$1);
if(temp__4653__auto__){
var s__63047__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__63047__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__63047__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__63049 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__63048 = (0);
while(true){
if((i__63048 < size__5453__auto__)){
var rgn_id = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__63048);
var rgn = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,rgn_id], null));
cljs.core.chunk_append(b__63049,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [rgn_id,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__5454__auto__ = ((function (i__63048,rgn,rgn_id,c__5452__auto__,size__5453__auto__,b__63049,s__63047__$2,temp__4653__auto__,input_value){
return (function org$numenta$sanity$comportex$journal$make_step_$_iter__63046_$_iter__63064(s__63065){
return (new cljs.core.LazySeq(null,((function (i__63048,rgn,rgn_id,c__5452__auto__,size__5453__auto__,b__63049,s__63047__$2,temp__4653__auto__,input_value){
return (function (){
var s__63065__$1 = s__63065;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__63065__$1);
if(temp__4653__auto____$1){
var s__63065__$2 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__63065__$2)){
var c__5452__auto____$1 = cljs.core.chunk_first(s__63065__$2);
var size__5453__auto____$1 = cljs.core.count(c__5452__auto____$1);
var b__63067 = cljs.core.chunk_buffer(size__5453__auto____$1);
if((function (){var i__63066 = (0);
while(true){
if((i__63066 < size__5453__auto____$1)){
var lyr_id = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto____$1,i__63066);
var lyr = cljs.core.get.cljs$core$IFn$_invoke$arity$2(rgn,lyr_id);
cljs.core.chunk_append(b__63067,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lyr_id,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$active_DASH_columns,org.nfrac.comportex.protocols.active_columns(lyr),cljs.core.cst$kw$pred_DASH_columns,cljs.core.distinct.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.first,org.nfrac.comportex.protocols.prior_predictive_cells(lyr)))], null)], null));

var G__63078 = (i__63066 + (1));
i__63066 = G__63078;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__63067),org$numenta$sanity$comportex$journal$make_step_$_iter__63046_$_iter__63064(cljs.core.chunk_rest(s__63065__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__63067),null);
}
} else {
var lyr_id = cljs.core.first(s__63065__$2);
var lyr = cljs.core.get.cljs$core$IFn$_invoke$arity$2(rgn,lyr_id);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lyr_id,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$active_DASH_columns,org.nfrac.comportex.protocols.active_columns(lyr),cljs.core.cst$kw$pred_DASH_columns,cljs.core.distinct.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.first,org.nfrac.comportex.protocols.prior_predictive_cells(lyr)))], null)], null),org$numenta$sanity$comportex$journal$make_step_$_iter__63046_$_iter__63064(cljs.core.rest(s__63065__$2)));
}
} else {
return null;
}
break;
}
});})(i__63048,rgn,rgn_id,c__5452__auto__,size__5453__auto__,b__63049,s__63047__$2,temp__4653__auto__,input_value))
,null,null));
});})(i__63048,rgn,rgn_id,c__5452__auto__,size__5453__auto__,b__63049,s__63047__$2,temp__4653__auto__,input_value))
;
return iter__5454__auto__(org.nfrac.comportex.core.layers(rgn));
})())], null));

var G__63079 = (i__63048 + (1));
i__63048 = G__63079;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__63049),org$numenta$sanity$comportex$journal$make_step_$_iter__63046(cljs.core.chunk_rest(s__63047__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__63049),null);
}
} else {
var rgn_id = cljs.core.first(s__63047__$2);
var rgn = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,rgn_id], null));
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [rgn_id,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__5454__auto__ = ((function (rgn,rgn_id,s__63047__$2,temp__4653__auto__,input_value){
return (function org$numenta$sanity$comportex$journal$make_step_$_iter__63046_$_iter__63070(s__63071){
return (new cljs.core.LazySeq(null,((function (rgn,rgn_id,s__63047__$2,temp__4653__auto__,input_value){
return (function (){
var s__63071__$1 = s__63071;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__63071__$1);
if(temp__4653__auto____$1){
var s__63071__$2 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__63071__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__63071__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__63073 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__63072 = (0);
while(true){
if((i__63072 < size__5453__auto__)){
var lyr_id = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__63072);
var lyr = cljs.core.get.cljs$core$IFn$_invoke$arity$2(rgn,lyr_id);
cljs.core.chunk_append(b__63073,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lyr_id,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$active_DASH_columns,org.nfrac.comportex.protocols.active_columns(lyr),cljs.core.cst$kw$pred_DASH_columns,cljs.core.distinct.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.first,org.nfrac.comportex.protocols.prior_predictive_cells(lyr)))], null)], null));

var G__63080 = (i__63072 + (1));
i__63072 = G__63080;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__63073),org$numenta$sanity$comportex$journal$make_step_$_iter__63046_$_iter__63070(cljs.core.chunk_rest(s__63071__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__63073),null);
}
} else {
var lyr_id = cljs.core.first(s__63071__$2);
var lyr = cljs.core.get.cljs$core$IFn$_invoke$arity$2(rgn,lyr_id);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lyr_id,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$active_DASH_columns,org.nfrac.comportex.protocols.active_columns(lyr),cljs.core.cst$kw$pred_DASH_columns,cljs.core.distinct.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.first,org.nfrac.comportex.protocols.prior_predictive_cells(lyr)))], null)], null),org$numenta$sanity$comportex$journal$make_step_$_iter__63046_$_iter__63070(cljs.core.rest(s__63071__$2)));
}
} else {
return null;
}
break;
}
});})(rgn,rgn_id,s__63047__$2,temp__4653__auto__,input_value))
,null,null));
});})(rgn,rgn_id,s__63047__$2,temp__4653__auto__,input_value))
;
return iter__5454__auto__(org.nfrac.comportex.core.layers(rgn));
})())], null),org$numenta$sanity$comportex$journal$make_step_$_iter__63046(cljs.core.rest(s__63047__$2)));
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
return iter__5454__auto__(org.nfrac.comportex.core.region_keys.cljs$core$IFn$_invoke$arity$1(htm));
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
var vec__63277 = cljs.core.subvec.cljs$core$IFn$_invoke$arity$3((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(model_steps) : cljs.core.deref.call(null,model_steps)),(i - (1)),(i + (1)));
var prev_step = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63277,(0),null);
var step = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63277,(1),null);
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
return (function org$numenta$sanity$comportex$journal$command_handler_$_handle_command(p__63278){
var vec__63372 = p__63278;
var vec__63373 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63372,(0),null);
var command = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63373,(0),null);
var xs = cljs.core.nthnext(vec__63373,(1));
var client_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63372,(1),null);
var client_info = (function (){var or__4682__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(client_infos) : cljs.core.deref.call(null,client_infos)),client_id);
if(cljs.core.truth_(or__4682__auto__)){
return or__4682__auto__;
} else {
var v = (function (){var G__63374 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__63374) : cljs.core.atom.call(null,G__63374));
})();
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(client_infos,cljs.core.assoc,client_id,v);

return v;
}
})();
var G__63375 = command;
switch (G__63375) {
case "ping":
return null;

break;
case "client-disconnect":
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["JOURNAL: Client disconnected."], 0));

return cljs.core.async.untap(steps_mult,cljs.core.cst$kw$ch.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$steps_DASH_mchannel.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(client_info) : cljs.core.deref.call(null,client_info)))));

break;
case "connect":
var vec__63376 = xs;
var old_client_info = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63376,(0),null);
var map__63377 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63376,(1),null);
var map__63377__$1 = ((((!((map__63377 == null)))?((((map__63377.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63377.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63377):map__63377);
var subscriber_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63377__$1,cljs.core.cst$kw$ch);
cljs.core.add_watch(client_info,cljs.core.cst$kw$org$numenta$sanity$comportex$journal_SLASH_push_DASH_to_DASH_client,((function (vec__63376,old_client_info,map__63377,map__63377__$1,subscriber_c,G__63375,client_info,vec__63372,vec__63373,command,xs,client_id){
return (function (_,___$1,___$2,v){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(subscriber_c,cljs.core.update.cljs$core$IFn$_invoke$arity$3(v,cljs.core.cst$kw$steps_DASH_mchannel,((function (vec__63376,old_client_info,map__63377,map__63377__$1,subscriber_c,G__63375,client_info,vec__63372,vec__63373,command,xs,client_id){
return (function (steps_mchannel){
return org.numenta.sanity.bridge.marshalling.channel_weak(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(steps_mchannel,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$ch,cljs.core.cst$kw$target_DASH_id], null)));
});})(vec__63376,old_client_info,map__63377,map__63377__$1,subscriber_c,G__63375,client_info,vec__63372,vec__63373,command,xs,client_id))
));
});})(vec__63376,old_client_info,map__63377,map__63377__$1,subscriber_c,G__63375,client_info,vec__63372,vec__63373,command,xs,client_id))
);

var temp__4653__auto__ = old_client_info;
if(cljs.core.truth_(temp__4653__auto__)){
var map__63379 = temp__4653__auto__;
var map__63379__$1 = ((((!((map__63379 == null)))?((((map__63379.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63379.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63379):map__63379);
var steps_mchannel = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63379__$1,cljs.core.cst$kw$steps_DASH_mchannel);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["JOURNAL: Client reconnected."], 0));

if(cljs.core.truth_(steps_mchannel)){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["JOURNAL: Client resubscribed to steps."], 0));

cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2(steps_mult,cljs.core.cst$kw$ch.cljs$core$IFn$_invoke$arity$1(steps_mchannel));
} else {
}

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(client_info,((function (map__63379,map__63379__$1,steps_mchannel,temp__4653__auto__,vec__63376,old_client_info,map__63377,map__63377__$1,subscriber_c,G__63375,client_info,vec__63372,vec__63373,command,xs,client_id){
return (function (p1__63081_SHARP_){
var G__63381 = p1__63081_SHARP_;
if(cljs.core.truth_(steps_mchannel)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__63381,cljs.core.cst$kw$steps_DASH_mchannel,steps_mchannel);
} else {
return G__63381;
}
});})(map__63379,map__63379__$1,steps_mchannel,temp__4653__auto__,vec__63376,old_client_info,map__63377,map__63377__$1,subscriber_c,G__63375,client_info,vec__63372,vec__63373,command,xs,client_id))
);
} else {
return null;
}

break;
case "consider-future":
var vec__63382 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63382,(0),null);
var input = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63382,(1),null);
var map__63383 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63382,(2),null);
var map__63383__$1 = ((((!((map__63383 == null)))?((((map__63383.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63383.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63383):map__63383);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63383__$1,cljs.core.cst$kw$ch);
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
var vec__63385 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63385,(0),null);
var sense_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63385,(1),null);
var n = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63385,(2),null);
var map__63386 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63385,(3),null);
var map__63386__$1 = ((((!((map__63386 == null)))?((((map__63386.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63386.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63386):map__63386);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63386__$1,cljs.core.cst$kw$ch);
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
var vec__63388 = xs;
var map__63389 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63388,(0),null);
var map__63389__$1 = ((((!((map__63389 == null)))?((((map__63389.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63389.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63389):map__63389);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63389__$1,cljs.core.cst$kw$ch);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.comportex.data.step_template_data((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(current_model) : cljs.core.deref.call(null,current_model))),cljs.core.vec(cljs.core.map.cljs$core$IFn$_invoke$arity$3(org.numenta.sanity.comportex.journal.make_step,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(model_steps) : cljs.core.deref.call(null,model_steps)),cljs.core.drop.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(steps_offset) : cljs.core.deref.call(null,steps_offset)),cljs.core.range.cljs$core$IFn$_invoke$arity$0())))], null));

break;
case "subscribe":
var vec__63391 = xs;
var steps_mchannel = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63391,(0),null);
var map__63392 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63391,(1),null);
var map__63392__$1 = ((((!((map__63392 == null)))?((((map__63392.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63392.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63392):map__63392);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63392__$1,cljs.core.cst$kw$ch);
cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2(steps_mult,cljs.core.cst$kw$ch.cljs$core$IFn$_invoke$arity$1(steps_mchannel));

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(client_info,cljs.core.assoc,cljs.core.cst$kw$steps_DASH_mchannel,steps_mchannel);

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["JOURNAL: Client subscribed to steps."], 0));

return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.comportex.data.step_template_data((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(current_model) : cljs.core.deref.call(null,current_model))),(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(capture_options) : cljs.core.deref.call(null,capture_options))], null));

break;
case "set-capture-options":
var vec__63394 = xs;
var co = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63394,(0),null);
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(capture_options,co) : cljs.core.reset_BANG_.call(null,capture_options,co));

break;
case "get-inbits-cols":
var vec__63395 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63395,(0),null);
var fetches = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63395,(1),null);
var onscreen_bits_marshal = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63395,(2),null);
var map__63396 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63395,(3),null);
var map__63396__$1 = ((((!((map__63396 == null)))?((((map__63396.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63396.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63396):map__63396);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63396__$1,cljs.core.cst$kw$ch);
var path__GT_ids = cljs.core.cst$kw$value.cljs$core$IFn$_invoke$arity$1(onscreen_bits_marshal);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,(function (){var temp__4651__auto__ = find_model_pair(id);
if(cljs.core.truth_(temp__4651__auto__)){
var vec__63398 = temp__4651__auto__;
var prev_htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63398,(0),null);
var htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63398,(1),null);
return org.numenta.sanity.comportex.data.inbits_cols_data(htm,prev_htm,path__GT_ids,fetches);
} else {
return org.numenta.sanity.comportex.journal.id_missing_response(id,steps_offset);
}
})());

break;
case "get-proximal-synapses-by-source-bit":
var vec__63399 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63399,(0),null);
var sense_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63399,(1),null);
var bit = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63399,(2),null);
var syn_states = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63399,(3),null);
var map__63400 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63399,(4),null);
var map__63400__$1 = ((((!((map__63400 == null)))?((((map__63400.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63400.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63400):map__63400);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63400__$1,cljs.core.cst$kw$ch);
var sense_id__$1 = cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(sense_id);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,(function (){var temp__4651__auto__ = find_model(id);
if(cljs.core.truth_(temp__4651__auto__)){
var htm = temp__4651__auto__;
return org.numenta.sanity.comportex.data.syns_from_source_bit(htm,sense_id__$1,bit,syn_states);
} else {
return org.numenta.sanity.comportex.journal.id_missing_response(id,steps_offset);
}
})());

break;
case "get-column-cells":
var vec__63402 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63402,(0),null);
var rgn_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63402,(1),null);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63402,(2),null);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63402,(3),null);
var map__63403 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63402,(4),null);
var map__63403__$1 = ((((!((map__63403 == null)))?((((map__63403.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63403.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63403):map__63403);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63403__$1,cljs.core.cst$kw$ch);
var rgn_id__$1 = cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(rgn_id);
var lyr_id__$1 = cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(lyr_id);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,(function (){var temp__4651__auto__ = find_model(id);
if(cljs.core.truth_(temp__4651__auto__)){
var htm = temp__4651__auto__;
var lyr = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,rgn_id__$1,lyr_id__$1], null));
var extract_cells = ((function (lyr,htm,temp__4651__auto__,vec__63402,id,rgn_id,lyr_id,col,map__63403,map__63403__$1,response_c,rgn_id__$1,lyr_id__$1,G__63375,client_info,vec__63372,vec__63373,command,xs,client_id){
return (function (p1__63082_SHARP_){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentHashSet.EMPTY,cljs.core.keep.cljs$core$IFn$_invoke$arity$2(((function (lyr,htm,temp__4651__auto__,vec__63402,id,rgn_id,lyr_id,col,map__63403,map__63403__$1,response_c,rgn_id__$1,lyr_id__$1,G__63375,client_info,vec__63372,vec__63373,command,xs,client_id){
return (function (p__63405){
var vec__63406 = p__63405;
var column = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63406,(0),null);
var ci = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63406,(1),null);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(col,column)){
return ci;
} else {
return null;
}
});})(lyr,htm,temp__4651__auto__,vec__63402,id,rgn_id,lyr_id,col,map__63403,map__63403__$1,response_c,rgn_id__$1,lyr_id__$1,G__63375,client_info,vec__63372,vec__63373,command,xs,client_id))
,p1__63082_SHARP_));
});})(lyr,htm,temp__4651__auto__,vec__63402,id,rgn_id,lyr_id,col,map__63403,map__63403__$1,response_c,rgn_id__$1,lyr_id__$1,G__63375,client_info,vec__63372,vec__63373,command,xs,client_id))
;
return new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$cells_DASH_per_DASH_column,org.nfrac.comportex.protocols.layer_depth(lyr),cljs.core.cst$kw$active_DASH_cells,extract_cells(org.nfrac.comportex.protocols.active_cells(lyr)),cljs.core.cst$kw$prior_DASH_predicted_DASH_cells,extract_cells(org.nfrac.comportex.protocols.prior_predictive_cells(lyr)),cljs.core.cst$kw$winner_DASH_cells,extract_cells(org.nfrac.comportex.protocols.winner_cells(lyr))], null);
} else {
return org.numenta.sanity.comportex.journal.id_missing_response(id,steps_offset);
}
})());

break;
case "get-column-apical-segments":
var vec__63407 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63407,(0),null);
var rgn_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63407,(1),null);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63407,(2),null);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63407,(3),null);
var map__63408 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63407,(4),null);
var map__63408__$1 = ((((!((map__63408 == null)))?((((map__63408.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63408.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63408):map__63408);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63408__$1,cljs.core.cst$kw$ch);
var rgn_id__$1 = cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(rgn_id);
var lyr_id__$1 = cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(lyr_id);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,(function (){var temp__4651__auto__ = find_model_pair(id);
if(cljs.core.truth_(temp__4651__auto__)){
var vec__63410 = temp__4651__auto__;
var prev_htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63410,(0),null);
var htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63410,(1),null);
return org.numenta.sanity.comportex.data.column_segs(htm,prev_htm,rgn_id__$1,lyr_id__$1,col,cljs.core.cst$kw$apical);
} else {
return org.numenta.sanity.comportex.journal.id_missing_response(id,steps_offset);
}
})());

break;
case "get-column-distal-segments":
var vec__63411 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63411,(0),null);
var rgn_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63411,(1),null);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63411,(2),null);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63411,(3),null);
var map__63412 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63411,(4),null);
var map__63412__$1 = ((((!((map__63412 == null)))?((((map__63412.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63412.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63412):map__63412);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63412__$1,cljs.core.cst$kw$ch);
var rgn_id__$1 = cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(rgn_id);
var lyr_id__$1 = cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(lyr_id);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,(function (){var temp__4651__auto__ = find_model_pair(id);
if(cljs.core.truth_(temp__4651__auto__)){
var vec__63414 = temp__4651__auto__;
var prev_htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63414,(0),null);
var htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63414,(1),null);
return org.numenta.sanity.comportex.data.column_segs(htm,prev_htm,rgn_id__$1,lyr_id__$1,col,cljs.core.cst$kw$distal);
} else {
return org.numenta.sanity.comportex.journal.id_missing_response(id,steps_offset);
}
})());

break;
case "get-column-proximal-segments":
var vec__63415 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63415,(0),null);
var rgn_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63415,(1),null);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63415,(2),null);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63415,(3),null);
var map__63416 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63415,(4),null);
var map__63416__$1 = ((((!((map__63416 == null)))?((((map__63416.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63416.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63416):map__63416);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63416__$1,cljs.core.cst$kw$ch);
var rgn_id__$1 = cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(rgn_id);
var lyr_id__$1 = cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(lyr_id);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,(function (){var temp__4651__auto__ = find_model_pair(id);
if(cljs.core.truth_(temp__4651__auto__)){
var vec__63418 = temp__4651__auto__;
var prev_htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63418,(0),null);
var htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63418,(1),null);
return org.numenta.sanity.comportex.data.column_segs(htm,prev_htm,rgn_id__$1,lyr_id__$1,col,cljs.core.cst$kw$proximal);
} else {
return org.numenta.sanity.comportex.journal.id_missing_response(id,steps_offset);
}
})());

break;
case "get-apical-segment-synapses":
var vec__63419 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63419,(0),null);
var rgn_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63419,(1),null);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63419,(2),null);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63419,(3),null);
var ci = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63419,(4),null);
var si = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63419,(5),null);
var syn_states = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63419,(6),null);
var map__63420 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63419,(7),null);
var map__63420__$1 = ((((!((map__63420 == null)))?((((map__63420.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63420.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63420):map__63420);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63420__$1,cljs.core.cst$kw$ch);
var rgn_id__$1 = cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(rgn_id);
var lyr_id__$1 = cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(lyr_id);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,(function (){var temp__4651__auto__ = find_model_pair(id);
if(cljs.core.truth_(temp__4651__auto__)){
var vec__63422 = temp__4651__auto__;
var prev_htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63422,(0),null);
var htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63422,(1),null);
return org.numenta.sanity.comportex.data.segment_syns(htm,prev_htm,rgn_id__$1,lyr_id__$1,col,ci,si,syn_states,cljs.core.cst$kw$apical);
} else {
return org.numenta.sanity.comportex.journal.id_missing_response(id,steps_offset);
}
})());

break;
case "get-distal-segment-synapses":
var vec__63423 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63423,(0),null);
var rgn_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63423,(1),null);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63423,(2),null);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63423,(3),null);
var ci = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63423,(4),null);
var si = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63423,(5),null);
var syn_states = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63423,(6),null);
var map__63424 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63423,(7),null);
var map__63424__$1 = ((((!((map__63424 == null)))?((((map__63424.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63424.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63424):map__63424);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63424__$1,cljs.core.cst$kw$ch);
var rgn_id__$1 = cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(rgn_id);
var lyr_id__$1 = cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(lyr_id);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,(function (){var temp__4651__auto__ = find_model_pair(id);
if(cljs.core.truth_(temp__4651__auto__)){
var vec__63426 = temp__4651__auto__;
var prev_htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63426,(0),null);
var htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63426,(1),null);
return org.numenta.sanity.comportex.data.segment_syns(htm,prev_htm,rgn_id__$1,lyr_id__$1,col,ci,si,syn_states,cljs.core.cst$kw$distal);
} else {
return org.numenta.sanity.comportex.journal.id_missing_response(id,steps_offset);
}
})());

break;
case "get-proximal-segment-synapses":
var vec__63427 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63427,(0),null);
var rgn_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63427,(1),null);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63427,(2),null);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63427,(3),null);
var ci = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63427,(4),null);
var si = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63427,(5),null);
var syn_states = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63427,(6),null);
var map__63428 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63427,(7),null);
var map__63428__$1 = ((((!((map__63428 == null)))?((((map__63428.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63428.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63428):map__63428);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63428__$1,cljs.core.cst$kw$ch);
var rgn_id__$1 = cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(rgn_id);
var lyr_id__$1 = cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(lyr_id);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,(function (){var temp__4651__auto__ = find_model_pair(id);
if(cljs.core.truth_(temp__4651__auto__)){
var vec__63430 = temp__4651__auto__;
var prev_htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63430,(0),null);
var htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63430,(1),null);
return org.numenta.sanity.comportex.data.segment_syns(htm,prev_htm,rgn_id__$1,lyr_id__$1,col,ci,si,syn_states,cljs.core.cst$kw$proximal);
} else {
return org.numenta.sanity.comportex.journal.id_missing_response(id,steps_offset);
}
})());

break;
case "get-details-text":
var vec__63431 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63431,(0),null);
var rgn_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63431,(1),null);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63431,(2),null);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63431,(3),null);
var map__63432 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63431,(4),null);
var map__63432__$1 = ((((!((map__63432 == null)))?((((map__63432.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63432.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63432):map__63432);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63432__$1,cljs.core.cst$kw$ch);
var rgn_id__$1 = cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(rgn_id);
var lyr_id__$1 = cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(lyr_id);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,(function (){var temp__4651__auto__ = find_model_pair(id);
if(cljs.core.truth_(temp__4651__auto__)){
var vec__63434 = temp__4651__auto__;
var prev_htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63434,(0),null);
var htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63434,(1),null);
return org.numenta.sanity.comportex.details.detail_text(htm,prev_htm,rgn_id__$1,lyr_id__$1,col);
} else {
return org.numenta.sanity.comportex.journal.id_missing_response(id,steps_offset);
}
})());

break;
case "get-model":
var vec__63435 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63435,(0),null);
var map__63436 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63435,(1),null);
var map__63436__$1 = ((((!((map__63436 == null)))?((((map__63436.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63436.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63436):map__63436);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63436__$1,cljs.core.cst$kw$ch);
var as_str_QMARK_ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63435,(2),null);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,(function (){var temp__4651__auto__ = find_model(id);
if(cljs.core.truth_(temp__4651__auto__)){
var htm = temp__4651__auto__;
var G__63438 = htm;
if(cljs.core.truth_(as_str_QMARK_)){
return cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([G__63438], 0));
} else {
return G__63438;
}
} else {
return org.numenta.sanity.comportex.journal.id_missing_response(id,steps_offset);
}
})());

break;
case "get-column-state-freqs":
var vec__63439 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63439,(0),null);
var map__63440 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63439,(1),null);
var map__63440__$1 = ((((!((map__63440 == null)))?((((map__63440.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63440.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63440):map__63440);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63440__$1,cljs.core.cst$kw$ch);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,(function (){var temp__4651__auto__ = find_model(id);
if(cljs.core.truth_(temp__4651__auto__)){
var htm = temp__4651__auto__;
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__5454__auto__ = ((function (htm,temp__4651__auto__,vec__63439,id,map__63440,map__63440__$1,response_c,G__63375,client_info,vec__63372,vec__63373,command,xs,client_id){
return (function org$numenta$sanity$comportex$journal$command_handler_$_handle_command_$_iter__63442(s__63443){
return (new cljs.core.LazySeq(null,((function (htm,temp__4651__auto__,vec__63439,id,map__63440,map__63440__$1,response_c,G__63375,client_info,vec__63372,vec__63373,command,xs,client_id){
return (function (){
var s__63443__$1 = s__63443;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__63443__$1);
if(temp__4653__auto__){
var xs__5201__auto__ = temp__4653__auto__;
var vec__63452 = cljs.core.first(xs__5201__auto__);
var region_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63452,(0),null);
var rgn = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63452,(1),null);
var iterys__5450__auto__ = ((function (s__63443__$1,vec__63452,region_key,rgn,xs__5201__auto__,temp__4653__auto__,htm,temp__4651__auto__,vec__63439,id,map__63440,map__63440__$1,response_c,G__63375,client_info,vec__63372,vec__63373,command,xs,client_id){
return (function org$numenta$sanity$comportex$journal$command_handler_$_handle_command_$_iter__63442_$_iter__63444(s__63445){
return (new cljs.core.LazySeq(null,((function (s__63443__$1,vec__63452,region_key,rgn,xs__5201__auto__,temp__4653__auto__,htm,temp__4651__auto__,vec__63439,id,map__63440,map__63440__$1,response_c,G__63375,client_info,vec__63372,vec__63373,command,xs,client_id){
return (function (){
var s__63445__$1 = s__63445;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__63445__$1);
if(temp__4653__auto____$1){
var s__63445__$2 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__63445__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__63445__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__63447 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__63446 = (0);
while(true){
if((i__63446 < size__5453__auto__)){
var layer_id = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__63446);
cljs.core.chunk_append(b__63447,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [region_key,layer_id], null),org.nfrac.comportex.core.column_state_freqs.cljs$core$IFn$_invoke$arity$2(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,region_key], null)),layer_id)], null));

var G__63466 = (i__63446 + (1));
i__63446 = G__63466;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__63447),org$numenta$sanity$comportex$journal$command_handler_$_handle_command_$_iter__63442_$_iter__63444(cljs.core.chunk_rest(s__63445__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__63447),null);
}
} else {
var layer_id = cljs.core.first(s__63445__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [region_key,layer_id], null),org.nfrac.comportex.core.column_state_freqs.cljs$core$IFn$_invoke$arity$2(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,region_key], null)),layer_id)], null),org$numenta$sanity$comportex$journal$command_handler_$_handle_command_$_iter__63442_$_iter__63444(cljs.core.rest(s__63445__$2)));
}
} else {
return null;
}
break;
}
});})(s__63443__$1,vec__63452,region_key,rgn,xs__5201__auto__,temp__4653__auto__,htm,temp__4651__auto__,vec__63439,id,map__63440,map__63440__$1,response_c,G__63375,client_info,vec__63372,vec__63373,command,xs,client_id))
,null,null));
});})(s__63443__$1,vec__63452,region_key,rgn,xs__5201__auto__,temp__4653__auto__,htm,temp__4651__auto__,vec__63439,id,map__63440,map__63440__$1,response_c,G__63375,client_info,vec__63372,vec__63373,command,xs,client_id))
;
var fs__5451__auto__ = cljs.core.seq(iterys__5450__auto__(org.nfrac.comportex.core.layers(rgn)));
if(fs__5451__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5451__auto__,org$numenta$sanity$comportex$journal$command_handler_$_handle_command_$_iter__63442(cljs.core.rest(s__63443__$1)));
} else {
var G__63467 = cljs.core.rest(s__63443__$1);
s__63443__$1 = G__63467;
continue;
}
} else {
return null;
}
break;
}
});})(htm,temp__4651__auto__,vec__63439,id,map__63440,map__63440__$1,response_c,G__63375,client_info,vec__63372,vec__63373,command,xs,client_id))
,null,null));
});})(htm,temp__4651__auto__,vec__63439,id,map__63440,map__63440__$1,response_c,G__63375,client_info,vec__63372,vec__63373,command,xs,client_id))
;
return iter__5454__auto__(cljs.core.cst$kw$regions.cljs$core$IFn$_invoke$arity$1(htm));
})());
} else {
return org.numenta.sanity.comportex.journal.id_missing_response(id,steps_offset);
}
})());

break;
case "get-cell-excitation-data":
var vec__63455 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63455,(0),null);
var rgn_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63455,(1),null);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63455,(2),null);
var sel_col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63455,(3),null);
var map__63456 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63455,(4),null);
var map__63456__$1 = ((((!((map__63456 == null)))?((((map__63456.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63456.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63456):map__63456);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63456__$1,cljs.core.cst$kw$ch);
var rgn_id__$1 = cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(rgn_id);
var lyr_id__$1 = cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(lyr_id);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,(function (){var vec__63458 = find_model_pair(id);
var prev_htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63458,(0),null);
var htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63458,(1),null);
if(cljs.core.truth_(prev_htm)){
return org.numenta.sanity.comportex.data.cell_excitation_data(htm,prev_htm,rgn_id__$1,lyr_id__$1,sel_col);
} else {
return org.numenta.sanity.comportex.journal.id_missing_response(id,steps_offset);
}
})());

break;
case "get-cells-by-state":
var vec__63459 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63459,(0),null);
var rgn_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63459,(1),null);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63459,(2),null);
var map__63460 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63459,(3),null);
var map__63460__$1 = ((((!((map__63460 == null)))?((((map__63460.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63460.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63460):map__63460);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63460__$1,cljs.core.cst$kw$ch);
var rgn_id__$1 = cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(rgn_id);
var lyr_id__$1 = cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(lyr_id);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,(function (){var temp__4651__auto__ = find_model(id);
if(cljs.core.truth_(temp__4651__auto__)){
var htm = temp__4651__auto__;
var layer = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,rgn_id__$1,lyr_id__$1], null));
return new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$winner_DASH_cells,org.nfrac.comportex.protocols.winner_cells(layer),cljs.core.cst$kw$active_DASH_cells,org.nfrac.comportex.protocols.active_cells(layer),cljs.core.cst$kw$pred_DASH_cells,org.nfrac.comportex.protocols.predictive_cells(layer),cljs.core.cst$kw$engaged_QMARK_,cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(layer,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$state,cljs.core.cst$kw$engaged_QMARK_], null))], null);
} else {
return org.numenta.sanity.comportex.journal.id_missing_response(id,steps_offset);
}
})());

break;
case "get-transitions-data":
var vec__63462 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63462,(0),null);
var rgn_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63462,(1),null);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63462,(2),null);
var cell_sdr_fracs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63462,(3),null);
var map__63463 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63462,(4),null);
var map__63463__$1 = ((((!((map__63463 == null)))?((((map__63463.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63463.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63463):map__63463);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63463__$1,cljs.core.cst$kw$ch);
var rgn_id__$1 = cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(rgn_id);
var lyr_id__$1 = cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(lyr_id);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,(function (){var temp__4651__auto__ = find_model(id);
if(cljs.core.truth_(temp__4651__auto__)){
var htm = temp__4651__auto__;
return org.numenta.sanity.comportex.data.transitions_data(htm,rgn_id__$1,lyr_id__$1,cell_sdr_fracs);
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
var model_steps = (function (){var G__63569 = cljs.core.PersistentVector.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__63569) : cljs.core.atom.call(null,G__63569));
})();
var steps_in = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
var steps_mult = cljs.core.async.mult(steps_in);
var client_infos = (function (){var G__63570 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__63570) : cljs.core.atom.call(null,G__63570));
})();
var capture_options = (function (){var G__63571 = new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$keep_DASH_steps,n_keep,cljs.core.cst$kw$ff_DASH_synapses,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$capture_QMARK_,true,cljs.core.cst$kw$only_DASH_active_QMARK_,false,cljs.core.cst$kw$only_DASH_connected_QMARK_,false], null),cljs.core.cst$kw$distal_DASH_synapses,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$capture_QMARK_,true,cljs.core.cst$kw$only_DASH_active_QMARK_,false,cljs.core.cst$kw$only_DASH_connected_QMARK_,false,cljs.core.cst$kw$only_DASH_noteworthy_DASH_columns_QMARK_,false], null),cljs.core.cst$kw$apical_DASH_synapses,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$capture_QMARK_,true,cljs.core.cst$kw$only_DASH_active_QMARK_,false,cljs.core.cst$kw$only_DASH_connected_QMARK_,false,cljs.core.cst$kw$only_DASH_noteworthy_DASH_columns_QMARK_,false], null)], null);
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__63571) : cljs.core.atom.call(null,G__63571));
})();
var handle_command = org.numenta.sanity.comportex.journal.command_handler(current_model,steps_offset,model_steps,steps_mult,client_infos,capture_options);
var c__36154__auto___63670 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__36154__auto___63670,steps_offset,model_steps,steps_in,steps_mult,client_infos,capture_options,handle_command){
return (function (){
var f__36155__auto__ = (function (){var switch__36040__auto__ = ((function (c__36154__auto___63670,steps_offset,model_steps,steps_in,steps_mult,client_infos,capture_options,handle_command){
return (function (state_63611){
var state_val_63612 = (state_63611[(1)]);
if((state_val_63612 === (7))){
var inst_63607 = (state_63611[(2)]);
var state_63611__$1 = state_63611;
var statearr_63613_63671 = state_63611__$1;
(statearr_63613_63671[(2)] = inst_63607);

(statearr_63613_63671[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_63612 === (1))){
var state_63611__$1 = state_63611;
var statearr_63614_63672 = state_63611__$1;
(statearr_63614_63672[(2)] = null);

(statearr_63614_63672[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_63612 === (4))){
var inst_63574 = (state_63611[(7)]);
var inst_63574__$1 = (state_63611[(2)]);
var state_63611__$1 = (function (){var statearr_63615 = state_63611;
(statearr_63615[(7)] = inst_63574__$1);

return statearr_63615;
})();
if(cljs.core.truth_(inst_63574__$1)){
var statearr_63616_63673 = state_63611__$1;
(statearr_63616_63673[(1)] = (5));

} else {
var statearr_63617_63674 = state_63611__$1;
(statearr_63617_63674[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_63612 === (13))){
var inst_63592 = (state_63611[(8)]);
var inst_63579 = (state_63611[(9)]);
var inst_63574 = (state_63611[(7)]);
var inst_63599 = (state_63611[(2)]);
var inst_63600 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(model_steps,inst_63599) : cljs.core.reset_BANG_.call(null,model_steps,inst_63599));
var inst_63601 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(steps_offset,cljs.core._PLUS_,inst_63592);
var inst_63602 = org.numenta.sanity.comportex.journal.make_step(inst_63574,inst_63579);
var inst_63603 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(steps_in,inst_63602);
var state_63611__$1 = (function (){var statearr_63618 = state_63611;
(statearr_63618[(10)] = inst_63603);

(statearr_63618[(11)] = inst_63600);

(statearr_63618[(12)] = inst_63601);

return statearr_63618;
})();
var statearr_63619_63675 = state_63611__$1;
(statearr_63619_63675[(2)] = null);

(statearr_63619_63675[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_63612 === (6))){
var state_63611__$1 = state_63611;
var statearr_63620_63676 = state_63611__$1;
(statearr_63620_63676[(2)] = null);

(statearr_63620_63676[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_63612 === (3))){
var inst_63609 = (state_63611[(2)]);
var state_63611__$1 = state_63611;
return cljs.core.async.impl.ioc_helpers.return_chan(state_63611__$1,inst_63609);
} else {
if((state_val_63612 === (12))){
var inst_63581 = (state_63611[(13)]);
var state_63611__$1 = state_63611;
var statearr_63621_63677 = state_63611__$1;
(statearr_63621_63677[(2)] = inst_63581);

(statearr_63621_63677[(1)] = (13));


return cljs.core.cst$kw$recur;
} else {
if((state_val_63612 === (2))){
var state_63611__$1 = state_63611;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_63611__$1,(4),steps_c);
} else {
if((state_val_63612 === (11))){
var inst_63592 = (state_63611[(8)]);
var inst_63581 = (state_63611[(13)]);
var inst_63596 = cljs.core.subvec.cljs$core$IFn$_invoke$arity$2(inst_63581,inst_63592);
var state_63611__$1 = state_63611;
var statearr_63622_63678 = state_63611__$1;
(statearr_63622_63678[(2)] = inst_63596);

(statearr_63622_63678[(1)] = (13));


return cljs.core.cst$kw$recur;
} else {
if((state_val_63612 === (9))){
var state_63611__$1 = state_63611;
var statearr_63623_63679 = state_63611__$1;
(statearr_63623_63679[(2)] = (0));

(statearr_63623_63679[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_63612 === (5))){
var inst_63574 = (state_63611[(7)]);
var inst_63583 = (state_63611[(14)]);
var inst_63576 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(steps_offset) : cljs.core.deref.call(null,steps_offset));
var inst_63577 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(model_steps) : cljs.core.deref.call(null,model_steps));
var inst_63578 = cljs.core.count(inst_63577);
var inst_63579 = (inst_63576 + inst_63578);
var inst_63580 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(model_steps) : cljs.core.deref.call(null,model_steps));
var inst_63581 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(inst_63580,inst_63574);
var inst_63582 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(capture_options) : cljs.core.deref.call(null,capture_options));
var inst_63583__$1 = cljs.core.cst$kw$keep_DASH_steps.cljs$core$IFn$_invoke$arity$1(inst_63582);
var inst_63584 = (inst_63583__$1 < (0));
var inst_63585 = cljs.core.not(inst_63584);
var state_63611__$1 = (function (){var statearr_63624 = state_63611;
(statearr_63624[(9)] = inst_63579);

(statearr_63624[(14)] = inst_63583__$1);

(statearr_63624[(13)] = inst_63581);

return statearr_63624;
})();
if(inst_63585){
var statearr_63625_63680 = state_63611__$1;
(statearr_63625_63680[(1)] = (8));

} else {
var statearr_63626_63681 = state_63611__$1;
(statearr_63626_63681[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_63612 === (10))){
var inst_63592 = (state_63611[(8)]);
var inst_63592__$1 = (state_63611[(2)]);
var inst_63594 = (inst_63592__$1 > (0));
var state_63611__$1 = (function (){var statearr_63627 = state_63611;
(statearr_63627[(8)] = inst_63592__$1);

return statearr_63627;
})();
if(cljs.core.truth_(inst_63594)){
var statearr_63628_63682 = state_63611__$1;
(statearr_63628_63682[(1)] = (11));

} else {
var statearr_63629_63683 = state_63611__$1;
(statearr_63629_63683[(1)] = (12));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_63612 === (8))){
var inst_63583 = (state_63611[(14)]);
var inst_63581 = (state_63611[(13)]);
var inst_63587 = cljs.core.count(inst_63581);
var inst_63588 = (inst_63587 - inst_63583);
var inst_63589 = (((0) > inst_63588) ? (0) : inst_63588);
var state_63611__$1 = state_63611;
var statearr_63630_63684 = state_63611__$1;
(statearr_63630_63684[(2)] = inst_63589);

(statearr_63630_63684[(1)] = (10));


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
});})(c__36154__auto___63670,steps_offset,model_steps,steps_in,steps_mult,client_infos,capture_options,handle_command))
;
return ((function (switch__36040__auto__,c__36154__auto___63670,steps_offset,model_steps,steps_in,steps_mult,client_infos,capture_options,handle_command){
return (function() {
var org$numenta$sanity$comportex$journal$init_$_state_machine__36041__auto__ = null;
var org$numenta$sanity$comportex$journal$init_$_state_machine__36041__auto____0 = (function (){
var statearr_63634 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_63634[(0)] = org$numenta$sanity$comportex$journal$init_$_state_machine__36041__auto__);

(statearr_63634[(1)] = (1));

return statearr_63634;
});
var org$numenta$sanity$comportex$journal$init_$_state_machine__36041__auto____1 = (function (state_63611){
while(true){
var ret_value__36042__auto__ = (function (){try{while(true){
var result__36043__auto__ = switch__36040__auto__(state_63611);
if(cljs.core.keyword_identical_QMARK_(result__36043__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__36043__auto__;
}
break;
}
}catch (e63635){if((e63635 instanceof Object)){
var ex__36044__auto__ = e63635;
var statearr_63636_63685 = state_63611;
(statearr_63636_63685[(5)] = ex__36044__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_63611);

return cljs.core.cst$kw$recur;
} else {
throw e63635;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__36042__auto__,cljs.core.cst$kw$recur)){
var G__63686 = state_63611;
state_63611 = G__63686;
continue;
} else {
return ret_value__36042__auto__;
}
break;
}
});
org$numenta$sanity$comportex$journal$init_$_state_machine__36041__auto__ = function(state_63611){
switch(arguments.length){
case 0:
return org$numenta$sanity$comportex$journal$init_$_state_machine__36041__auto____0.call(this);
case 1:
return org$numenta$sanity$comportex$journal$init_$_state_machine__36041__auto____1.call(this,state_63611);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$comportex$journal$init_$_state_machine__36041__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$comportex$journal$init_$_state_machine__36041__auto____0;
org$numenta$sanity$comportex$journal$init_$_state_machine__36041__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$comportex$journal$init_$_state_machine__36041__auto____1;
return org$numenta$sanity$comportex$journal$init_$_state_machine__36041__auto__;
})()
;})(switch__36040__auto__,c__36154__auto___63670,steps_offset,model_steps,steps_in,steps_mult,client_infos,capture_options,handle_command))
})();
var state__36156__auto__ = (function (){var statearr_63637 = (f__36155__auto__.cljs$core$IFn$_invoke$arity$0 ? f__36155__auto__.cljs$core$IFn$_invoke$arity$0() : f__36155__auto__.call(null));
(statearr_63637[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__36154__auto___63670);

return statearr_63637;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__36156__auto__);
});})(c__36154__auto___63670,steps_offset,model_steps,steps_in,steps_mult,client_infos,capture_options,handle_command))
);


var c__36154__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__36154__auto__,steps_offset,model_steps,steps_in,steps_mult,client_infos,capture_options,handle_command){
return (function (){
var f__36155__auto__ = (function (){var switch__36040__auto__ = ((function (c__36154__auto__,steps_offset,model_steps,steps_in,steps_mult,client_infos,capture_options,handle_command){
return (function (state_63653){
var state_val_63654 = (state_63653[(1)]);
if((state_val_63654 === (1))){
var state_63653__$1 = state_63653;
var statearr_63655_63687 = state_63653__$1;
(statearr_63655_63687[(2)] = null);

(statearr_63655_63687[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_63654 === (2))){
var state_63653__$1 = state_63653;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_63653__$1,(4),commands_c);
} else {
if((state_val_63654 === (3))){
var inst_63651 = (state_63653[(2)]);
var state_63653__$1 = state_63653;
return cljs.core.async.impl.ioc_helpers.return_chan(state_63653__$1,inst_63651);
} else {
if((state_val_63654 === (4))){
var inst_63640 = (state_63653[(7)]);
var inst_63640__$1 = (state_63653[(2)]);
var inst_63641 = (inst_63640__$1 == null);
var inst_63642 = cljs.core.not(inst_63641);
var state_63653__$1 = (function (){var statearr_63656 = state_63653;
(statearr_63656[(7)] = inst_63640__$1);

return statearr_63656;
})();
if(inst_63642){
var statearr_63657_63688 = state_63653__$1;
(statearr_63657_63688[(1)] = (5));

} else {
var statearr_63658_63689 = state_63653__$1;
(statearr_63658_63689[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_63654 === (5))){
var inst_63640 = (state_63653[(7)]);
var inst_63644 = (handle_command.cljs$core$IFn$_invoke$arity$1 ? handle_command.cljs$core$IFn$_invoke$arity$1(inst_63640) : handle_command.call(null,inst_63640));
var state_63653__$1 = (function (){var statearr_63659 = state_63653;
(statearr_63659[(8)] = inst_63644);

return statearr_63659;
})();
var statearr_63660_63690 = state_63653__$1;
(statearr_63660_63690[(2)] = null);

(statearr_63660_63690[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_63654 === (6))){
var inst_63647 = cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["CLOSING JOURNAL"], 0));
var state_63653__$1 = state_63653;
var statearr_63661_63691 = state_63653__$1;
(statearr_63661_63691[(2)] = inst_63647);

(statearr_63661_63691[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_63654 === (7))){
var inst_63649 = (state_63653[(2)]);
var state_63653__$1 = state_63653;
var statearr_63662_63692 = state_63653__$1;
(statearr_63662_63692[(2)] = inst_63649);

(statearr_63662_63692[(1)] = (3));


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
});})(c__36154__auto__,steps_offset,model_steps,steps_in,steps_mult,client_infos,capture_options,handle_command))
;
return ((function (switch__36040__auto__,c__36154__auto__,steps_offset,model_steps,steps_in,steps_mult,client_infos,capture_options,handle_command){
return (function() {
var org$numenta$sanity$comportex$journal$init_$_state_machine__36041__auto__ = null;
var org$numenta$sanity$comportex$journal$init_$_state_machine__36041__auto____0 = (function (){
var statearr_63666 = [null,null,null,null,null,null,null,null,null];
(statearr_63666[(0)] = org$numenta$sanity$comportex$journal$init_$_state_machine__36041__auto__);

(statearr_63666[(1)] = (1));

return statearr_63666;
});
var org$numenta$sanity$comportex$journal$init_$_state_machine__36041__auto____1 = (function (state_63653){
while(true){
var ret_value__36042__auto__ = (function (){try{while(true){
var result__36043__auto__ = switch__36040__auto__(state_63653);
if(cljs.core.keyword_identical_QMARK_(result__36043__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__36043__auto__;
}
break;
}
}catch (e63667){if((e63667 instanceof Object)){
var ex__36044__auto__ = e63667;
var statearr_63668_63693 = state_63653;
(statearr_63668_63693[(5)] = ex__36044__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_63653);

return cljs.core.cst$kw$recur;
} else {
throw e63667;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__36042__auto__,cljs.core.cst$kw$recur)){
var G__63694 = state_63653;
state_63653 = G__63694;
continue;
} else {
return ret_value__36042__auto__;
}
break;
}
});
org$numenta$sanity$comportex$journal$init_$_state_machine__36041__auto__ = function(state_63653){
switch(arguments.length){
case 0:
return org$numenta$sanity$comportex$journal$init_$_state_machine__36041__auto____0.call(this);
case 1:
return org$numenta$sanity$comportex$journal$init_$_state_machine__36041__auto____1.call(this,state_63653);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$comportex$journal$init_$_state_machine__36041__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$comportex$journal$init_$_state_machine__36041__auto____0;
org$numenta$sanity$comportex$journal$init_$_state_machine__36041__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$comportex$journal$init_$_state_machine__36041__auto____1;
return org$numenta$sanity$comportex$journal$init_$_state_machine__36041__auto__;
})()
;})(switch__36040__auto__,c__36154__auto__,steps_offset,model_steps,steps_in,steps_mult,client_infos,capture_options,handle_command))
})();
var state__36156__auto__ = (function (){var statearr_63669 = (f__36155__auto__.cljs$core$IFn$_invoke$arity$0 ? f__36155__auto__.cljs$core$IFn$_invoke$arity$0() : f__36155__auto__.call(null));
(statearr_63669[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__36154__auto__);

return statearr_63669;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__36156__auto__);
});})(c__36154__auto__,steps_offset,model_steps,steps_in,steps_mult,client_infos,capture_options,handle_command))
);

return c__36154__auto__;
});
