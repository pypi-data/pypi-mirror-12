// Compiled by ClojureScript 1.7.170 {:static-fns true, :optimize-constants true}
goog.provide('org.nfrac.comportex.cortical_io');
goog.require('cljs.core');
goog.require('org.nfrac.comportex.protocols');
goog.require('org.nfrac.comportex.topology');
goog.require('cljs_http.client');
goog.require('cljs.core.async');
goog.require('org.nfrac.comportex.util');
goog.require('org.nfrac.comportex.encoders');
goog.require('clojure.string');
org.nfrac.comportex.cortical_io.base_uri = "http://api.cortical.io/rest";
org.nfrac.comportex.cortical_io.query_params = new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$retina_name,"en_associative"], null);
org.nfrac.comportex.cortical_io.retina_dim = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(128),(128)], null);
org.nfrac.comportex.cortical_io.retina_size = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._STAR_,org.nfrac.comportex.cortical_io.retina_dim);
org.nfrac.comportex.cortical_io.max_bits = (512);
org.nfrac.comportex.cortical_io.min_votes = (2);
org.nfrac.comportex.cortical_io.request_fingerprint = (function org$nfrac$comportex$cortical_io$request_fingerprint(api_key,term){
return cljs_http.client.post.cljs$core$IFn$_invoke$arity$variadic([cljs.core.str(org.nfrac.comportex.cortical_io.base_uri),cljs.core.str("/expressions")].join(''),cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 7, [cljs.core.cst$kw$query_DASH_params,org.nfrac.comportex.cortical_io.query_params,cljs.core.cst$kw$content_DASH_type,"application/json",cljs.core.cst$kw$as,cljs.core.cst$kw$json,cljs.core.cst$kw$json_DASH_params,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$term,term], null),cljs.core.cst$kw$with_DASH_credentials_QMARK_,false,cljs.core.cst$kw$throw_DASH_exceptions,false,cljs.core.cst$kw$headers,new cljs.core.PersistentArrayMap(null, 1, ["api-key",api_key], null)], null)], 0));
});
org.nfrac.comportex.cortical_io.request_similar_terms = (function org$nfrac$comportex$cortical_io$request_similar_terms(api_key,bits,max_n){
return cljs_http.client.post.cljs$core$IFn$_invoke$arity$variadic([cljs.core.str(org.nfrac.comportex.cortical_io.base_uri),cljs.core.str("/expressions/similar_terms")].join(''),cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 7, [cljs.core.cst$kw$query_DASH_params,cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(org.nfrac.comportex.cortical_io.query_params,cljs.core.cst$kw$get_fingerprint,true,cljs.core.array_seq([cljs.core.cst$kw$max_results,max_n], 0)),cljs.core.cst$kw$content_DASH_type,"application/json",cljs.core.cst$kw$as,cljs.core.cst$kw$json,cljs.core.cst$kw$json_DASH_params,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$positions,cljs.core.sort.cljs$core$IFn$_invoke$arity$1(bits)], null),cljs.core.cst$kw$with_DASH_credentials_QMARK_,false,cljs.core.cst$kw$throw_DASH_exceptions,false,cljs.core.cst$kw$headers,new cljs.core.PersistentArrayMap(null, 1, ["api-key",api_key], null)], null)], 0));
});
org.nfrac.comportex.cortical_io.random_sdr = (function org$nfrac$comportex$cortical_io$random_sdr(term){
return org.nfrac.comportex.encoders.unique_sdr(term,org.nfrac.comportex.cortical_io.retina_size,(org.nfrac.comportex.cortical_io.retina_size * 0.02));
});
/**
 * Maps a retina fingerprint index to another index which is spatially
 * scrambled. Meaning that direct neighbours in the retina are now
 * offset from each other by around 17 units. This is a complete
 * mapping, i.e. the following holds:
 * 
 * `
 * (= (set (map scramble-bit (range retina-size)))
 *    (set (range retina-size)))`.
 */
org.nfrac.comportex.cortical_io.scramble_bit = (function org$nfrac$comportex$cortical_io$scramble_bit(i){
return cljs.core.mod((i * (17)),org.nfrac.comportex.cortical_io.retina_size);
});
org.nfrac.comportex.cortical_io.unscramble_bit = (function org$nfrac$comportex$cortical_io$unscramble_bit(j){
return cljs.core.quot(((cljs.core.mod((cljs.core.rem(j,(17)) * (13)),(17)) * org.nfrac.comportex.cortical_io.retina_size) + j),(17));
});
org.nfrac.comportex.cortical_io.scramble_bitset = (function org$nfrac$comportex$cortical_io$scramble_bitset(bits){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(org.nfrac.comportex.cortical_io.scramble_bit,bits);
});
/**
 * assoc, but not if the key already has a (truthy) value.
 */
org.nfrac.comportex.cortical_io._QMARK_assoc = (function org$nfrac$comportex$cortical_io$_QMARK_assoc(m,k,v){
if(cljs.core.truth_((m.cljs$core$IFn$_invoke$arity$1 ? m.cljs$core$IFn$_invoke$arity$1(k) : m.call(null,k)))){
return m;
} else {
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(m,k,v);
}
});
/**
 * Makes a request to cortical.io to look up the fingerprint for the
 * term, and stores it in the given cache atom. In Clojure this is a
 * synchonous call and returns the fingerprint bit-set. In
 * Clojurescript this is an asynchronous call and returns a channel.
 */
org.nfrac.comportex.cortical_io.cache_fingerprint_BANG_ = (function org$nfrac$comportex$cortical_io$cache_fingerprint_BANG_(api_key,cache,term){
var term__$1 = clojure.string.lower_case(term);
var handle = ((function (term__$1){
return (function (result){
if(cljs.core.truth_((function (){var G__65163 = cljs.core.cst$kw$status.cljs$core$IFn$_invoke$arity$1(result);
return (cljs_http.client.unexceptional_status_QMARK_.cljs$core$IFn$_invoke$arity$1 ? cljs_http.client.unexceptional_status_QMARK_.cljs$core$IFn$_invoke$arity$1(G__65163) : cljs_http.client.unexceptional_status_QMARK_.call(null,G__65163));
})())){
return cljs.core.set(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(result,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$body,cljs.core.cst$kw$positions], null)));
} else {
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["cortical.io lookup of term failed:",term__$1], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([result], 0));

return org.nfrac.comportex.cortical_io.random_sdr(term__$1);
}
});})(term__$1))
;
var c__35961__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__35961__auto__,term__$1,handle){
return (function (){
var f__35962__auto__ = (function (){var switch__35847__auto__ = ((function (c__35961__auto__,term__$1,handle){
return (function (state_65170){
var state_val_65171 = (state_65170[(1)]);
if((state_val_65171 === (1))){
var inst_65164 = org.nfrac.comportex.cortical_io.request_fingerprint(api_key,term__$1);
var state_65170__$1 = state_65170;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_65170__$1,(2),inst_65164);
} else {
if((state_val_65171 === (2))){
var inst_65166 = (state_65170[(2)]);
var inst_65167 = handle(inst_65166);
var inst_65168 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(cache,org.nfrac.comportex.cortical_io._QMARK_assoc,term__$1,inst_65167);
var state_65170__$1 = state_65170;
return cljs.core.async.impl.ioc_helpers.return_chan(state_65170__$1,inst_65168);
} else {
return null;
}
}
});})(c__35961__auto__,term__$1,handle))
;
return ((function (switch__35847__auto__,c__35961__auto__,term__$1,handle){
return (function() {
var org$nfrac$comportex$cortical_io$cache_fingerprint_BANG__$_state_machine__35848__auto__ = null;
var org$nfrac$comportex$cortical_io$cache_fingerprint_BANG__$_state_machine__35848__auto____0 = (function (){
var statearr_65175 = [null,null,null,null,null,null,null];
(statearr_65175[(0)] = org$nfrac$comportex$cortical_io$cache_fingerprint_BANG__$_state_machine__35848__auto__);

(statearr_65175[(1)] = (1));

return statearr_65175;
});
var org$nfrac$comportex$cortical_io$cache_fingerprint_BANG__$_state_machine__35848__auto____1 = (function (state_65170){
while(true){
var ret_value__35849__auto__ = (function (){try{while(true){
var result__35850__auto__ = switch__35847__auto__(state_65170);
if(cljs.core.keyword_identical_QMARK_(result__35850__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__35850__auto__;
}
break;
}
}catch (e65176){if((e65176 instanceof Object)){
var ex__35851__auto__ = e65176;
var statearr_65177_65179 = state_65170;
(statearr_65177_65179[(5)] = ex__35851__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_65170);

return cljs.core.cst$kw$recur;
} else {
throw e65176;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35849__auto__,cljs.core.cst$kw$recur)){
var G__65180 = state_65170;
state_65170 = G__65180;
continue;
} else {
return ret_value__35849__auto__;
}
break;
}
});
org$nfrac$comportex$cortical_io$cache_fingerprint_BANG__$_state_machine__35848__auto__ = function(state_65170){
switch(arguments.length){
case 0:
return org$nfrac$comportex$cortical_io$cache_fingerprint_BANG__$_state_machine__35848__auto____0.call(this);
case 1:
return org$nfrac$comportex$cortical_io$cache_fingerprint_BANG__$_state_machine__35848__auto____1.call(this,state_65170);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$nfrac$comportex$cortical_io$cache_fingerprint_BANG__$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$0 = org$nfrac$comportex$cortical_io$cache_fingerprint_BANG__$_state_machine__35848__auto____0;
org$nfrac$comportex$cortical_io$cache_fingerprint_BANG__$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$1 = org$nfrac$comportex$cortical_io$cache_fingerprint_BANG__$_state_machine__35848__auto____1;
return org$nfrac$comportex$cortical_io$cache_fingerprint_BANG__$_state_machine__35848__auto__;
})()
;})(switch__35847__auto__,c__35961__auto__,term__$1,handle))
})();
var state__35963__auto__ = (function (){var statearr_65178 = (f__35962__auto__.cljs$core$IFn$_invoke$arity$0 ? f__35962__auto__.cljs$core$IFn$_invoke$arity$0() : f__35962__auto__.call(null));
(statearr_65178[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__35961__auto__);

return statearr_65178;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__35963__auto__);
});})(c__35961__auto__,term__$1,handle))
);

return c__35961__auto__;
});
/**
 * Looks up a fingerprint for the term, being a set of active indices,
 * in the cache. If it is not found (which should not happen, it
 * should be preloaded from the web service), the term is assigned a
 * new random SDR.
 */
org.nfrac.comportex.cortical_io.get_fingerprint = (function org$nfrac$comportex$cortical_io$get_fingerprint(cache,term){
var term__$1 = clojure.string.lower_case(term);
var or__4682__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(cache) : cljs.core.deref.call(null,cache)),term__$1);
if(cljs.core.truth_(or__4682__auto__)){
return or__4682__auto__;
} else {
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(cache,org.nfrac.comportex.cortical_io._QMARK_assoc,term__$1,(function (){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["no fingerprint in cache for term:",term__$1,"- generating a random one"], 0));

return org.nfrac.comportex.cortical_io.random_sdr(term__$1);
})()
),term__$1);
}
});
org.nfrac.comportex.cortical_io.elect_bits = (function org$nfrac$comportex$cortical_io$elect_bits(bit_votes,min_votes,max_bits){
var min_votes__$1 = min_votes;
while(true){
var bits = cljs.core.keep.cljs$core$IFn$_invoke$arity$2(((function (min_votes__$1){
return (function (p__65183){
var vec__65184 = p__65183;
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65184,(0),null);
var n = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65184,(1),null);
if((n >= min_votes__$1)){
return i;
} else {
return null;
}
});})(min_votes__$1))
,bit_votes);
if((cljs.core.count(bits) > max_bits)){
var G__65185 = (min_votes__$1 + (1));
min_votes__$1 = G__65185;
continue;
} else {
return bits;
}
break;
}
});
org.nfrac.comportex.cortical_io.cortical_io_encoder = (function org$nfrac$comportex$cortical_io$cortical_io_encoder(var_args){
var args__5747__auto__ = [];
var len__5740__auto___65211 = arguments.length;
var i__5741__auto___65212 = (0);
while(true){
if((i__5741__auto___65212 < len__5740__auto___65211)){
args__5747__auto__.push((arguments[i__5741__auto___65212]));

var G__65213 = (i__5741__auto___65212 + (1));
i__5741__auto___65212 = G__65213;
continue;
} else {
}
break;
}

var argseq__5748__auto__ = ((((2) < args__5747__auto__.length))?(new cljs.core.IndexedSeq(args__5747__auto__.slice((2)),(0))):null);
return org.nfrac.comportex.cortical_io.cortical_io_encoder.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__5748__auto__);
});

org.nfrac.comportex.cortical_io.cortical_io_encoder.cljs$core$IFn$_invoke$arity$variadic = (function (api_key,cache,p__65189){
var map__65190 = p__65189;
var map__65190__$1 = ((((!((map__65190 == null)))?((((map__65190.cljs$lang$protocol_mask$partition0$ & (64))) || (map__65190.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__65190):map__65190);
var decode_locally_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__65190__$1,cljs.core.cst$kw$decode_DASH_locally_QMARK_);
var spatial_scramble_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__65190__$1,cljs.core.cst$kw$spatial_DASH_scramble_QMARK_);
var topo = org.nfrac.comportex.topology.make_topology(org.nfrac.comportex.cortical_io.retina_dim);
if(typeof org.nfrac.comportex.cortical_io.t_org$nfrac$comportex$cortical_io65192 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {org.nfrac.comportex.protocols.PEncoder}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
 * @implements {org.nfrac.comportex.protocols.PTopological}
*/
org.nfrac.comportex.cortical_io.t_org$nfrac$comportex$cortical_io65192 = (function (api_key,cache,p__65189,map__65190,decode_locally_QMARK_,spatial_scramble_QMARK_,topo,meta65193){
this.api_key = api_key;
this.cache = cache;
this.p__65189 = p__65189;
this.map__65190 = map__65190;
this.decode_locally_QMARK_ = decode_locally_QMARK_;
this.spatial_scramble_QMARK_ = spatial_scramble_QMARK_;
this.topo = topo;
this.meta65193 = meta65193;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
org.nfrac.comportex.cortical_io.t_org$nfrac$comportex$cortical_io65192.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (topo,map__65190,map__65190__$1,decode_locally_QMARK_,spatial_scramble_QMARK_){
return (function (_65194,meta65193__$1){
var self__ = this;
var _65194__$1 = this;
return (new org.nfrac.comportex.cortical_io.t_org$nfrac$comportex$cortical_io65192(self__.api_key,self__.cache,self__.p__65189,self__.map__65190,self__.decode_locally_QMARK_,self__.spatial_scramble_QMARK_,self__.topo,meta65193__$1));
});})(topo,map__65190,map__65190__$1,decode_locally_QMARK_,spatial_scramble_QMARK_))
;

org.nfrac.comportex.cortical_io.t_org$nfrac$comportex$cortical_io65192.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (topo,map__65190,map__65190__$1,decode_locally_QMARK_,spatial_scramble_QMARK_){
return (function (_65194){
var self__ = this;
var _65194__$1 = this;
return self__.meta65193;
});})(topo,map__65190,map__65190__$1,decode_locally_QMARK_,spatial_scramble_QMARK_))
;

org.nfrac.comportex.cortical_io.t_org$nfrac$comportex$cortical_io65192.prototype.org$nfrac$comportex$protocols$PTopological$ = true;

org.nfrac.comportex.cortical_io.t_org$nfrac$comportex$cortical_io65192.prototype.org$nfrac$comportex$protocols$PTopological$topology$arity$1 = ((function (topo,map__65190,map__65190__$1,decode_locally_QMARK_,spatial_scramble_QMARK_){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.topo;
});})(topo,map__65190,map__65190__$1,decode_locally_QMARK_,spatial_scramble_QMARK_))
;

org.nfrac.comportex.cortical_io.t_org$nfrac$comportex$cortical_io65192.prototype.org$nfrac$comportex$protocols$PEncoder$ = true;

org.nfrac.comportex.cortical_io.t_org$nfrac$comportex$cortical_io65192.prototype.org$nfrac$comportex$protocols$PEncoder$encode$arity$2 = ((function (topo,map__65190,map__65190__$1,decode_locally_QMARK_,spatial_scramble_QMARK_){
return (function (_,term){
var self__ = this;
var ___$1 = this;
if(cljs.core.seq(term)){
var G__65195 = org.nfrac.comportex.cortical_io.get_fingerprint(self__.cache,term);
if(cljs.core.truth_(self__.spatial_scramble_QMARK_)){
return org.nfrac.comportex.cortical_io.scramble_bitset(G__65195);
} else {
return G__65195;
}
} else {
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(null);
}
});})(topo,map__65190,map__65190__$1,decode_locally_QMARK_,spatial_scramble_QMARK_))
;

org.nfrac.comportex.cortical_io.t_org$nfrac$comportex$cortical_io65192.prototype.org$nfrac$comportex$protocols$PEncoder$decode$arity$3 = ((function (topo,map__65190,map__65190__$1,decode_locally_QMARK_,spatial_scramble_QMARK_){
return (function (this$,bit_votes,n){
var self__ = this;
var this$__$1 = this;
var bit_votes__$1 = (cljs.core.truth_(self__.spatial_scramble_QMARK_)?cljs.core.zipmap(cljs.core.map.cljs$core$IFn$_invoke$arity$2(org.nfrac.comportex.cortical_io.unscramble_bit,cljs.core.keys(bit_votes)),cljs.core.vals(bit_votes)):bit_votes);
if(cljs.core.truth_(self__.decode_locally_QMARK_)){
return cljs.core.take.cljs$core$IFn$_invoke$arity$2(n,org.nfrac.comportex.encoders.decode_by_brute_force(this$__$1,cljs.core.keys((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(self__.cache) : cljs.core.deref.call(null,self__.cache))),bit_votes__$1));
} else {
var bits = org.nfrac.comportex.cortical_io.elect_bits(bit_votes__$1,org.nfrac.comportex.cortical_io.min_votes,org.nfrac.comportex.cortical_io.max_bits);
if(cljs.core.empty_QMARK_(bits)){
return cljs.core.PersistentVector.EMPTY;
} else {
var total_votes = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._PLUS_,cljs.core.vals(bit_votes__$1));
var handle = ((function (total_votes,bits,bit_votes__$1,this$__$1,topo,map__65190,map__65190__$1,decode_locally_QMARK_,spatial_scramble_QMARK_){
return (function (result){
if(cljs.core.truth_((function (){var G__65196 = cljs.core.cst$kw$status.cljs$core$IFn$_invoke$arity$1(result);
return (cljs_http.client.unexceptional_status_QMARK_.cljs$core$IFn$_invoke$arity$1 ? cljs_http.client.unexceptional_status_QMARK_.cljs$core$IFn$_invoke$arity$1(G__65196) : cljs_http.client.unexceptional_status_QMARK_.call(null,G__65196));
})())){
return cljs.core.take.cljs$core$IFn$_invoke$arity$2(n,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (total_votes,bits,bit_votes__$1,this$__$1,topo,map__65190,map__65190__$1,decode_locally_QMARK_,spatial_scramble_QMARK_){
return (function (item){
var x_bits = cljs.core.set(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(item,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$fingerprint,cljs.core.cst$kw$positions], null)));
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["received prediction results."], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["x-bits =",x_bits], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["bits =",bits], 0));

return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(org.nfrac.comportex.encoders.prediction_stats(x_bits,bit_votes__$1,total_votes),cljs.core.cst$kw$value,cljs.core.get.cljs$core$IFn$_invoke$arity$2(item,cljs.core.cst$kw$term));
});})(total_votes,bits,bit_votes__$1,this$__$1,topo,map__65190,map__65190__$1,decode_locally_QMARK_,spatial_scramble_QMARK_))
,cljs.core.cst$kw$body.cljs$core$IFn$_invoke$arity$1(result)));
} else {
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([result], 0));
}
});})(total_votes,bits,bit_votes__$1,this$__$1,topo,map__65190,map__65190__$1,decode_locally_QMARK_,spatial_scramble_QMARK_))
;
return new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$channel,(function (){var c__35961__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__35961__auto__,total_votes,handle,bits,bit_votes__$1,this$__$1,topo,map__65190,map__65190__$1,decode_locally_QMARK_,spatial_scramble_QMARK_){
return (function (){
var f__35962__auto__ = (function (){var switch__35847__auto__ = ((function (c__35961__auto__,total_votes,handle,bits,bit_votes__$1,this$__$1,topo,map__65190,map__65190__$1,decode_locally_QMARK_,spatial_scramble_QMARK_){
return (function (state_65202){
var state_val_65203 = (state_65202[(1)]);
if((state_val_65203 === (1))){
var inst_65197 = org.nfrac.comportex.cortical_io.request_similar_terms(self__.api_key,bits,n);
var state_65202__$1 = state_65202;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_65202__$1,(2),inst_65197);
} else {
if((state_val_65203 === (2))){
var inst_65199 = (state_65202[(2)]);
var inst_65200 = handle(inst_65199);
var state_65202__$1 = state_65202;
return cljs.core.async.impl.ioc_helpers.return_chan(state_65202__$1,inst_65200);
} else {
return null;
}
}
});})(c__35961__auto__,total_votes,handle,bits,bit_votes__$1,this$__$1,topo,map__65190,map__65190__$1,decode_locally_QMARK_,spatial_scramble_QMARK_))
;
return ((function (switch__35847__auto__,c__35961__auto__,total_votes,handle,bits,bit_votes__$1,this$__$1,topo,map__65190,map__65190__$1,decode_locally_QMARK_,spatial_scramble_QMARK_){
return (function() {
var org$nfrac$comportex$cortical_io$state_machine__35848__auto__ = null;
var org$nfrac$comportex$cortical_io$state_machine__35848__auto____0 = (function (){
var statearr_65207 = [null,null,null,null,null,null,null];
(statearr_65207[(0)] = org$nfrac$comportex$cortical_io$state_machine__35848__auto__);

(statearr_65207[(1)] = (1));

return statearr_65207;
});
var org$nfrac$comportex$cortical_io$state_machine__35848__auto____1 = (function (state_65202){
while(true){
var ret_value__35849__auto__ = (function (){try{while(true){
var result__35850__auto__ = switch__35847__auto__(state_65202);
if(cljs.core.keyword_identical_QMARK_(result__35850__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__35850__auto__;
}
break;
}
}catch (e65208){if((e65208 instanceof Object)){
var ex__35851__auto__ = e65208;
var statearr_65209_65214 = state_65202;
(statearr_65209_65214[(5)] = ex__35851__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_65202);

return cljs.core.cst$kw$recur;
} else {
throw e65208;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35849__auto__,cljs.core.cst$kw$recur)){
var G__65215 = state_65202;
state_65202 = G__65215;
continue;
} else {
return ret_value__35849__auto__;
}
break;
}
});
org$nfrac$comportex$cortical_io$state_machine__35848__auto__ = function(state_65202){
switch(arguments.length){
case 0:
return org$nfrac$comportex$cortical_io$state_machine__35848__auto____0.call(this);
case 1:
return org$nfrac$comportex$cortical_io$state_machine__35848__auto____1.call(this,state_65202);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$nfrac$comportex$cortical_io$state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$0 = org$nfrac$comportex$cortical_io$state_machine__35848__auto____0;
org$nfrac$comportex$cortical_io$state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$1 = org$nfrac$comportex$cortical_io$state_machine__35848__auto____1;
return org$nfrac$comportex$cortical_io$state_machine__35848__auto__;
})()
;})(switch__35847__auto__,c__35961__auto__,total_votes,handle,bits,bit_votes__$1,this$__$1,topo,map__65190,map__65190__$1,decode_locally_QMARK_,spatial_scramble_QMARK_))
})();
var state__35963__auto__ = (function (){var statearr_65210 = (f__35962__auto__.cljs$core$IFn$_invoke$arity$0 ? f__35962__auto__.cljs$core$IFn$_invoke$arity$0() : f__35962__auto__.call(null));
(statearr_65210[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__35961__auto__);

return statearr_65210;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__35963__auto__);
});})(c__35961__auto__,total_votes,handle,bits,bit_votes__$1,this$__$1,topo,map__65190,map__65190__$1,decode_locally_QMARK_,spatial_scramble_QMARK_))
);

return c__35961__auto__;
})()], null);
}
}
});})(topo,map__65190,map__65190__$1,decode_locally_QMARK_,spatial_scramble_QMARK_))
;

org.nfrac.comportex.cortical_io.t_org$nfrac$comportex$cortical_io65192.getBasis = ((function (topo,map__65190,map__65190__$1,decode_locally_QMARK_,spatial_scramble_QMARK_){
return (function (){
return new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$api_DASH_key,cljs.core.cst$sym$cache,cljs.core.cst$sym$p__65189,cljs.core.cst$sym$map__65190,cljs.core.cst$sym$decode_DASH_locally_QMARK_,cljs.core.cst$sym$spatial_DASH_scramble_QMARK_,cljs.core.cst$sym$topo,cljs.core.cst$sym$meta65193], null);
});})(topo,map__65190,map__65190__$1,decode_locally_QMARK_,spatial_scramble_QMARK_))
;

org.nfrac.comportex.cortical_io.t_org$nfrac$comportex$cortical_io65192.cljs$lang$type = true;

org.nfrac.comportex.cortical_io.t_org$nfrac$comportex$cortical_io65192.cljs$lang$ctorStr = "org.nfrac.comportex.cortical-io/t_org$nfrac$comportex$cortical_io65192";

org.nfrac.comportex.cortical_io.t_org$nfrac$comportex$cortical_io65192.cljs$lang$ctorPrWriter = ((function (topo,map__65190,map__65190__$1,decode_locally_QMARK_,spatial_scramble_QMARK_){
return (function (this__5280__auto__,writer__5281__auto__,opt__5282__auto__){
return cljs.core._write(writer__5281__auto__,"org.nfrac.comportex.cortical-io/t_org$nfrac$comportex$cortical_io65192");
});})(topo,map__65190,map__65190__$1,decode_locally_QMARK_,spatial_scramble_QMARK_))
;

org.nfrac.comportex.cortical_io.__GT_t_org$nfrac$comportex$cortical_io65192 = ((function (topo,map__65190,map__65190__$1,decode_locally_QMARK_,spatial_scramble_QMARK_){
return (function org$nfrac$comportex$cortical_io$__GT_t_org$nfrac$comportex$cortical_io65192(api_key__$1,cache__$1,p__65189__$1,map__65190__$2,decode_locally_QMARK___$1,spatial_scramble_QMARK___$1,topo__$1,meta65193){
return (new org.nfrac.comportex.cortical_io.t_org$nfrac$comportex$cortical_io65192(api_key__$1,cache__$1,p__65189__$1,map__65190__$2,decode_locally_QMARK___$1,spatial_scramble_QMARK___$1,topo__$1,meta65193));
});})(topo,map__65190,map__65190__$1,decode_locally_QMARK_,spatial_scramble_QMARK_))
;

}

return (new org.nfrac.comportex.cortical_io.t_org$nfrac$comportex$cortical_io65192(api_key,cache,p__65189,map__65190__$1,decode_locally_QMARK_,spatial_scramble_QMARK_,topo,cljs.core.PersistentArrayMap.EMPTY));
});

org.nfrac.comportex.cortical_io.cortical_io_encoder.cljs$lang$maxFixedArity = (2);

org.nfrac.comportex.cortical_io.cortical_io_encoder.cljs$lang$applyTo = (function (seq65186){
var G__65187 = cljs.core.first(seq65186);
var seq65186__$1 = cljs.core.next(seq65186);
var G__65188 = cljs.core.first(seq65186__$1);
var seq65186__$2 = cljs.core.next(seq65186__$1);
return org.nfrac.comportex.cortical_io.cortical_io_encoder.cljs$core$IFn$_invoke$arity$variadic(G__65187,G__65188,seq65186__$2);
});
