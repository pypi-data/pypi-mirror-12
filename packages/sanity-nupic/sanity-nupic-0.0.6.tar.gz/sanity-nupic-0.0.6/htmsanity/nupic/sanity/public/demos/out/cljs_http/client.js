// Compiled by ClojureScript 1.7.170 {:static-fns true, :optimize-constants true}
goog.provide('cljs_http.client');
goog.require('cljs.core');
goog.require('goog.Uri');
goog.require('cljs_http.core');
goog.require('cljs.core.async');
goog.require('no.en.core');
goog.require('cljs_http.util');
goog.require('clojure.string');
goog.require('cljs.reader');
cljs_http.client.if_pos = (function cljs_http$client$if_pos(v){
if(cljs.core.truth_((function (){var and__4670__auto__ = v;
if(cljs.core.truth_(and__4670__auto__)){
return (v > (0));
} else {
return and__4670__auto__;
}
})())){
return v;
} else {
return null;
}
});
/**
 * Parse `s` as query params and return a hash map.
 */
cljs_http.client.parse_query_params = (function cljs_http$client$parse_query_params(s){
if(!(clojure.string.blank_QMARK_(s))){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (p1__64212_SHARP_,p2__64211_SHARP_){
var vec__64214 = clojure.string.split.cljs$core$IFn$_invoke$arity$2(p2__64211_SHARP_,/=/);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64214,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64214,(1),null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__64212_SHARP_,cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(no.en.core.url_decode(k)),no.en.core.url_decode(v));
}),cljs.core.PersistentArrayMap.EMPTY,clojure.string.split.cljs$core$IFn$_invoke$arity$2([cljs.core.str(s)].join(''),/&/));
} else {
return null;
}
});
/**
 * Parse `url` into a hash map.
 */
cljs_http.client.parse_url = (function cljs_http$client$parse_url(url){
if(!(clojure.string.blank_QMARK_(url))){
var uri = goog.Uri.parse(url);
var query_data = uri.getQueryData();
return new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$scheme,cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(uri.getScheme()),cljs.core.cst$kw$server_DASH_name,uri.getDomain(),cljs.core.cst$kw$server_DASH_port,cljs_http.client.if_pos(uri.getPort()),cljs.core.cst$kw$uri,uri.getPath(),cljs.core.cst$kw$query_DASH_string,((cljs.core.not(query_data.isEmpty()))?[cljs.core.str(query_data)].join(''):null),cljs.core.cst$kw$query_DASH_params,((cljs.core.not(query_data.isEmpty()))?cljs_http.client.parse_query_params([cljs.core.str(query_data)].join('')):null)], null);
} else {
return null;
}
});
cljs_http.client.unexceptional_status_QMARK_ = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 13, [(205),null,(206),null,(300),null,(204),null,(307),null,(303),null,(301),null,(201),null,(302),null,(202),null,(200),null,(203),null,(207),null], null), null);
cljs_http.client.encode_val = (function cljs_http$client$encode_val(k,v){
return [cljs.core.str(no.en.core.url_encode(cljs.core.name(k))),cljs.core.str("="),cljs.core.str(no.en.core.url_encode([cljs.core.str(v)].join('')))].join('');
});
cljs_http.client.encode_vals = (function cljs_http$client$encode_vals(k,vs){
return clojure.string.join.cljs$core$IFn$_invoke$arity$2("&",cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__64215_SHARP_){
return cljs_http.client.encode_val(k,p1__64215_SHARP_);
}),vs));
});
cljs_http.client.encode_param = (function cljs_http$client$encode_param(p__64216){
var vec__64218 = p__64216;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64218,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64218,(1),null);
if(cljs.core.coll_QMARK_(v)){
return cljs_http.client.encode_vals(k,v);
} else {
return cljs_http.client.encode_val(k,v);
}
});
cljs_http.client.generate_query_string = (function cljs_http$client$generate_query_string(params){
return clojure.string.join.cljs$core$IFn$_invoke$arity$2("&",cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs_http.client.encode_param,params));
});
cljs_http.client.regex_char_esc_smap = (function (){var esc_chars = "()*&^%$#!+";
return cljs.core.zipmap(esc_chars,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (esc_chars){
return (function (p1__64219_SHARP_){
return [cljs.core.str("\\"),cljs.core.str(p1__64219_SHARP_)].join('');
});})(esc_chars))
,esc_chars));
})();
/**
 * Escape special characters -- for content-type.
 */
cljs_http.client.escape_special = (function cljs_http$client$escape_special(string){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.replace.cljs$core$IFn$_invoke$arity$2(cljs_http.client.regex_char_esc_smap,string));
});
/**
 * Decocde the :body of `response` with `decode-fn` if the content type matches.
 */
cljs_http.client.decode_body = (function cljs_http$client$decode_body(response,decode_fn,content_type,request_method){
if(cljs.core.truth_((function (){var and__4670__auto__ = cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$head,request_method);
if(and__4670__auto__){
var and__4670__auto____$1 = cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2((204),cljs.core.cst$kw$status.cljs$core$IFn$_invoke$arity$1(response));
if(and__4670__auto____$1){
return cljs.core.re_find(cljs.core.re_pattern([cljs.core.str("(?i)"),cljs.core.str(cljs_http.client.escape_special(content_type))].join('')),[cljs.core.str(cljs.core.get.cljs$core$IFn$_invoke$arity$3(cljs.core.cst$kw$headers.cljs$core$IFn$_invoke$arity$1(response),"content-type",""))].join(''));
} else {
return and__4670__auto____$1;
}
} else {
return and__4670__auto__;
}
})())){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(response,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$body], null),decode_fn);
} else {
return response;
}
});
/**
 * Encode :edn-params in the `request` :body and set the appropriate
 *   Content Type header.
 */
cljs_http.client.wrap_edn_params = (function cljs_http$client$wrap_edn_params(client){
return (function (request){
var temp__4651__auto__ = cljs.core.cst$kw$edn_DASH_params.cljs$core$IFn$_invoke$arity$1(request);
if(cljs.core.truth_(temp__4651__auto__)){
var params = temp__4651__auto__;
var headers = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 1, ["content-type","application/edn"], null),cljs.core.cst$kw$headers.cljs$core$IFn$_invoke$arity$1(request)], 0));
var G__64221 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(request,cljs.core.cst$kw$edn_DASH_params),cljs.core.cst$kw$body,cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([params], 0))),cljs.core.cst$kw$headers,headers);
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(G__64221) : client.call(null,G__64221));
} else {
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(request) : client.call(null,request));
}
});
});
/**
 * Decode application/edn responses.
 */
cljs_http.client.wrap_edn_response = (function cljs_http$client$wrap_edn_response(client){
return (function (request){
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$2((function (p1__64222_SHARP_){
return cljs_http.client.decode_body(p1__64222_SHARP_,cljs.reader.read_string,"application/edn",cljs.core.cst$kw$request_DASH_method.cljs$core$IFn$_invoke$arity$1(request));
}),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(request) : client.call(null,request))], null));
});
});
cljs_http.client.wrap_default_headers = (function cljs_http$client$wrap_default_headers(var_args){
var args__5747__auto__ = [];
var len__5740__auto___64228 = arguments.length;
var i__5741__auto___64229 = (0);
while(true){
if((i__5741__auto___64229 < len__5740__auto___64228)){
args__5747__auto__.push((arguments[i__5741__auto___64229]));

var G__64230 = (i__5741__auto___64229 + (1));
i__5741__auto___64229 = G__64230;
continue;
} else {
}
break;
}

var argseq__5748__auto__ = ((((1) < args__5747__auto__.length))?(new cljs.core.IndexedSeq(args__5747__auto__.slice((1)),(0))):null);
return cljs_http.client.wrap_default_headers.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5748__auto__);
});

cljs_http.client.wrap_default_headers.cljs$core$IFn$_invoke$arity$variadic = (function (client,p__64225){
var vec__64226 = p__64225;
var default_headers = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64226,(0),null);
return ((function (vec__64226,default_headers){
return (function (request){
var temp__4651__auto__ = (function (){var or__4682__auto__ = cljs.core.cst$kw$default_DASH_headers.cljs$core$IFn$_invoke$arity$1(request);
if(cljs.core.truth_(or__4682__auto__)){
return or__4682__auto__;
} else {
return default_headers;
}
})();
if(cljs.core.truth_(temp__4651__auto__)){
var default_headers__$1 = temp__4651__auto__;
var G__64227 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(request,cljs.core.cst$kw$default_DASH_headers,default_headers__$1);
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(G__64227) : client.call(null,G__64227));
} else {
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(request) : client.call(null,request));
}
});
;})(vec__64226,default_headers))
});

cljs_http.client.wrap_default_headers.cljs$lang$maxFixedArity = (1);

cljs_http.client.wrap_default_headers.cljs$lang$applyTo = (function (seq64223){
var G__64224 = cljs.core.first(seq64223);
var seq64223__$1 = cljs.core.next(seq64223);
return cljs_http.client.wrap_default_headers.cljs$core$IFn$_invoke$arity$variadic(G__64224,seq64223__$1);
});
cljs_http.client.wrap_accept = (function cljs_http$client$wrap_accept(var_args){
var args__5747__auto__ = [];
var len__5740__auto___64236 = arguments.length;
var i__5741__auto___64237 = (0);
while(true){
if((i__5741__auto___64237 < len__5740__auto___64236)){
args__5747__auto__.push((arguments[i__5741__auto___64237]));

var G__64238 = (i__5741__auto___64237 + (1));
i__5741__auto___64237 = G__64238;
continue;
} else {
}
break;
}

var argseq__5748__auto__ = ((((1) < args__5747__auto__.length))?(new cljs.core.IndexedSeq(args__5747__auto__.slice((1)),(0))):null);
return cljs_http.client.wrap_accept.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5748__auto__);
});

cljs_http.client.wrap_accept.cljs$core$IFn$_invoke$arity$variadic = (function (client,p__64233){
var vec__64234 = p__64233;
var accept = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64234,(0),null);
return ((function (vec__64234,accept){
return (function (request){
var temp__4651__auto__ = (function (){var or__4682__auto__ = cljs.core.cst$kw$accept.cljs$core$IFn$_invoke$arity$1(request);
if(cljs.core.truth_(or__4682__auto__)){
return or__4682__auto__;
} else {
return accept;
}
})();
if(cljs.core.truth_(temp__4651__auto__)){
var accept__$1 = temp__4651__auto__;
var G__64235 = cljs.core.assoc_in(request,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$headers,"accept"], null),accept__$1);
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(G__64235) : client.call(null,G__64235));
} else {
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(request) : client.call(null,request));
}
});
;})(vec__64234,accept))
});

cljs_http.client.wrap_accept.cljs$lang$maxFixedArity = (1);

cljs_http.client.wrap_accept.cljs$lang$applyTo = (function (seq64231){
var G__64232 = cljs.core.first(seq64231);
var seq64231__$1 = cljs.core.next(seq64231);
return cljs_http.client.wrap_accept.cljs$core$IFn$_invoke$arity$variadic(G__64232,seq64231__$1);
});
cljs_http.client.wrap_content_type = (function cljs_http$client$wrap_content_type(var_args){
var args__5747__auto__ = [];
var len__5740__auto___64244 = arguments.length;
var i__5741__auto___64245 = (0);
while(true){
if((i__5741__auto___64245 < len__5740__auto___64244)){
args__5747__auto__.push((arguments[i__5741__auto___64245]));

var G__64246 = (i__5741__auto___64245 + (1));
i__5741__auto___64245 = G__64246;
continue;
} else {
}
break;
}

var argseq__5748__auto__ = ((((1) < args__5747__auto__.length))?(new cljs.core.IndexedSeq(args__5747__auto__.slice((1)),(0))):null);
return cljs_http.client.wrap_content_type.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5748__auto__);
});

cljs_http.client.wrap_content_type.cljs$core$IFn$_invoke$arity$variadic = (function (client,p__64241){
var vec__64242 = p__64241;
var content_type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64242,(0),null);
return ((function (vec__64242,content_type){
return (function (request){
var temp__4651__auto__ = (function (){var or__4682__auto__ = cljs.core.cst$kw$content_DASH_type.cljs$core$IFn$_invoke$arity$1(request);
if(cljs.core.truth_(or__4682__auto__)){
return or__4682__auto__;
} else {
return content_type;
}
})();
if(cljs.core.truth_(temp__4651__auto__)){
var content_type__$1 = temp__4651__auto__;
var G__64243 = cljs.core.assoc_in(request,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$headers,"content-type"], null),content_type__$1);
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(G__64243) : client.call(null,G__64243));
} else {
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(request) : client.call(null,request));
}
});
;})(vec__64242,content_type))
});

cljs_http.client.wrap_content_type.cljs$lang$maxFixedArity = (1);

cljs_http.client.wrap_content_type.cljs$lang$applyTo = (function (seq64239){
var G__64240 = cljs.core.first(seq64239);
var seq64239__$1 = cljs.core.next(seq64239);
return cljs_http.client.wrap_content_type.cljs$core$IFn$_invoke$arity$variadic(G__64240,seq64239__$1);
});
cljs_http.client.default_transit_opts = new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$encoding,cljs.core.cst$kw$json,cljs.core.cst$kw$encoding_DASH_opts,cljs.core.PersistentArrayMap.EMPTY,cljs.core.cst$kw$decoding,cljs.core.cst$kw$json,cljs.core.cst$kw$decoding_DASH_opts,cljs.core.PersistentArrayMap.EMPTY], null);
/**
 * Encode :transit-params in the `request` :body and set the appropriate
 *   Content Type header.
 * 
 *   A :transit-opts map can be optionally provided with the following keys:
 * 
 *   :encoding                #{:json, :json-verbose}
 *   :decoding                #{:json, :json-verbose}
 *   :encoding/decoding-opts  appropriate map of options to be passed to
 *                         transit writer/reader, respectively.
 */
cljs_http.client.wrap_transit_params = (function cljs_http$client$wrap_transit_params(client){
return (function (request){
var temp__4651__auto__ = cljs.core.cst$kw$transit_DASH_params.cljs$core$IFn$_invoke$arity$1(request);
if(cljs.core.truth_(temp__4651__auto__)){
var params = temp__4651__auto__;
var map__64250 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs_http.client.default_transit_opts,cljs.core.cst$kw$transit_DASH_opts.cljs$core$IFn$_invoke$arity$1(request)], 0));
var map__64250__$1 = ((((!((map__64250 == null)))?((((map__64250.cljs$lang$protocol_mask$partition0$ & (64))) || (map__64250.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__64250):map__64250);
var encoding = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__64250__$1,cljs.core.cst$kw$encoding);
var encoding_opts = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__64250__$1,cljs.core.cst$kw$encoding_DASH_opts);
var headers = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 1, ["content-type","application/transit+json"], null),cljs.core.cst$kw$headers.cljs$core$IFn$_invoke$arity$1(request)], 0));
var G__64252 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(request,cljs.core.cst$kw$transit_DASH_params),cljs.core.cst$kw$body,cljs_http.util.transit_encode(params,encoding,encoding_opts)),cljs.core.cst$kw$headers,headers);
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(G__64252) : client.call(null,G__64252));
} else {
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(request) : client.call(null,request));
}
});
});
/**
 * Decode application/transit+json responses.
 */
cljs_http.client.wrap_transit_response = (function cljs_http$client$wrap_transit_response(client){
return (function (request){
var map__64257 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs_http.client.default_transit_opts,cljs.core.cst$kw$transit_DASH_opts.cljs$core$IFn$_invoke$arity$1(request)], 0));
var map__64257__$1 = ((((!((map__64257 == null)))?((((map__64257.cljs$lang$protocol_mask$partition0$ & (64))) || (map__64257.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__64257):map__64257);
var decoding = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__64257__$1,cljs.core.cst$kw$decoding);
var decoding_opts = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__64257__$1,cljs.core.cst$kw$decoding_DASH_opts);
var transit_decode = ((function (map__64257,map__64257__$1,decoding,decoding_opts){
return (function (p1__64253_SHARP_){
return cljs_http.util.transit_decode(p1__64253_SHARP_,decoding,decoding_opts);
});})(map__64257,map__64257__$1,decoding,decoding_opts))
;
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$2(((function (map__64257,map__64257__$1,decoding,decoding_opts,transit_decode){
return (function (p1__64254_SHARP_){
return cljs_http.client.decode_body(p1__64254_SHARP_,transit_decode,"application/transit+json",cljs.core.cst$kw$request_DASH_method.cljs$core$IFn$_invoke$arity$1(request));
});})(map__64257,map__64257__$1,decoding,decoding_opts,transit_decode))
,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(request) : client.call(null,request))], null));
});
});
/**
 * Encode :json-params in the `request` :body and set the appropriate
 *   Content Type header.
 */
cljs_http.client.wrap_json_params = (function cljs_http$client$wrap_json_params(client){
return (function (request){
var temp__4651__auto__ = cljs.core.cst$kw$json_DASH_params.cljs$core$IFn$_invoke$arity$1(request);
if(cljs.core.truth_(temp__4651__auto__)){
var params = temp__4651__auto__;
var headers = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 1, ["content-type","application/json"], null),cljs.core.cst$kw$headers.cljs$core$IFn$_invoke$arity$1(request)], 0));
var G__64260 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(request,cljs.core.cst$kw$json_DASH_params),cljs.core.cst$kw$body,cljs_http.util.json_encode(params)),cljs.core.cst$kw$headers,headers);
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(G__64260) : client.call(null,G__64260));
} else {
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(request) : client.call(null,request));
}
});
});
/**
 * Decode application/json responses.
 */
cljs_http.client.wrap_json_response = (function cljs_http$client$wrap_json_response(client){
return (function (request){
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$2((function (p1__64261_SHARP_){
return cljs_http.client.decode_body(p1__64261_SHARP_,cljs_http.util.json_decode,"application/json",cljs.core.cst$kw$request_DASH_method.cljs$core$IFn$_invoke$arity$1(request));
}),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(request) : client.call(null,request))], null));
});
});
cljs_http.client.wrap_query_params = (function cljs_http$client$wrap_query_params(client){
return (function (p__64266){
var map__64267 = p__64266;
var map__64267__$1 = ((((!((map__64267 == null)))?((((map__64267.cljs$lang$protocol_mask$partition0$ & (64))) || (map__64267.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__64267):map__64267);
var req = map__64267__$1;
var query_params = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__64267__$1,cljs.core.cst$kw$query_DASH_params);
if(cljs.core.truth_(query_params)){
var G__64269 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(req,cljs.core.cst$kw$query_DASH_params),cljs.core.cst$kw$query_DASH_string,cljs_http.client.generate_query_string(query_params));
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(G__64269) : client.call(null,G__64269));
} else {
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(req) : client.call(null,req));
}
});
});
cljs_http.client.wrap_form_params = (function cljs_http$client$wrap_form_params(client){
return (function (p__64274){
var map__64275 = p__64274;
var map__64275__$1 = ((((!((map__64275 == null)))?((((map__64275.cljs$lang$protocol_mask$partition0$ & (64))) || (map__64275.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__64275):map__64275);
var request = map__64275__$1;
var form_params = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__64275__$1,cljs.core.cst$kw$form_DASH_params);
var request_method = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__64275__$1,cljs.core.cst$kw$request_DASH_method);
var headers = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__64275__$1,cljs.core.cst$kw$headers);
if(cljs.core.truth_((function (){var and__4670__auto__ = form_params;
if(cljs.core.truth_(and__4670__auto__)){
return new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$patch,null,cljs.core.cst$kw$delete,null,cljs.core.cst$kw$post,null,cljs.core.cst$kw$put,null], null), null).call(null,request_method);
} else {
return and__4670__auto__;
}
})())){
var headers__$1 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 1, ["content-type","application/x-www-form-urlencoded"], null),headers], 0));
var G__64277 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(request,cljs.core.cst$kw$form_DASH_params),cljs.core.cst$kw$body,cljs_http.client.generate_query_string(form_params)),cljs.core.cst$kw$headers,headers__$1);
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(G__64277) : client.call(null,G__64277));
} else {
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(request) : client.call(null,request));
}
});
});
cljs_http.client.generate_form_data = (function cljs_http$client$generate_form_data(params){
var form_data = (new FormData());
var seq__64284_64290 = cljs.core.seq(params);
var chunk__64285_64291 = null;
var count__64286_64292 = (0);
var i__64287_64293 = (0);
while(true){
if((i__64287_64293 < count__64286_64292)){
var vec__64288_64294 = chunk__64285_64291.cljs$core$IIndexed$_nth$arity$2(null,i__64287_64293);
var k_64295 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64288_64294,(0),null);
var v_64296 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64288_64294,(1),null);
if(cljs.core.coll_QMARK_(v_64296)){
form_data.append(cljs.core.name(k_64295),cljs.core.first(v_64296),cljs.core.second(v_64296));
} else {
form_data.append(cljs.core.name(k_64295),v_64296);
}

var G__64297 = seq__64284_64290;
var G__64298 = chunk__64285_64291;
var G__64299 = count__64286_64292;
var G__64300 = (i__64287_64293 + (1));
seq__64284_64290 = G__64297;
chunk__64285_64291 = G__64298;
count__64286_64292 = G__64299;
i__64287_64293 = G__64300;
continue;
} else {
var temp__4653__auto___64301 = cljs.core.seq(seq__64284_64290);
if(temp__4653__auto___64301){
var seq__64284_64302__$1 = temp__4653__auto___64301;
if(cljs.core.chunked_seq_QMARK_(seq__64284_64302__$1)){
var c__5485__auto___64303 = cljs.core.chunk_first(seq__64284_64302__$1);
var G__64304 = cljs.core.chunk_rest(seq__64284_64302__$1);
var G__64305 = c__5485__auto___64303;
var G__64306 = cljs.core.count(c__5485__auto___64303);
var G__64307 = (0);
seq__64284_64290 = G__64304;
chunk__64285_64291 = G__64305;
count__64286_64292 = G__64306;
i__64287_64293 = G__64307;
continue;
} else {
var vec__64289_64308 = cljs.core.first(seq__64284_64302__$1);
var k_64309 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64289_64308,(0),null);
var v_64310 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64289_64308,(1),null);
if(cljs.core.coll_QMARK_(v_64310)){
form_data.append(cljs.core.name(k_64309),cljs.core.first(v_64310),cljs.core.second(v_64310));
} else {
form_data.append(cljs.core.name(k_64309),v_64310);
}

var G__64311 = cljs.core.next(seq__64284_64302__$1);
var G__64312 = null;
var G__64313 = (0);
var G__64314 = (0);
seq__64284_64290 = G__64311;
chunk__64285_64291 = G__64312;
count__64286_64292 = G__64313;
i__64287_64293 = G__64314;
continue;
}
} else {
}
}
break;
}

return form_data;
});
cljs_http.client.wrap_multipart_params = (function cljs_http$client$wrap_multipart_params(client){
return (function (p__64319){
var map__64320 = p__64319;
var map__64320__$1 = ((((!((map__64320 == null)))?((((map__64320.cljs$lang$protocol_mask$partition0$ & (64))) || (map__64320.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__64320):map__64320);
var request = map__64320__$1;
var multipart_params = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__64320__$1,cljs.core.cst$kw$multipart_DASH_params);
var request_method = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__64320__$1,cljs.core.cst$kw$request_DASH_method);
if(cljs.core.truth_((function (){var and__4670__auto__ = multipart_params;
if(cljs.core.truth_(and__4670__auto__)){
return new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$patch,null,cljs.core.cst$kw$delete,null,cljs.core.cst$kw$post,null,cljs.core.cst$kw$put,null], null), null).call(null,request_method);
} else {
return and__4670__auto__;
}
})())){
var G__64322 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(request,cljs.core.cst$kw$multipart_DASH_params),cljs.core.cst$kw$body,cljs_http.client.generate_form_data(multipart_params));
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(G__64322) : client.call(null,G__64322));
} else {
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(request) : client.call(null,request));
}
});
});
cljs_http.client.wrap_method = (function cljs_http$client$wrap_method(client){
return (function (req){
var temp__4651__auto__ = cljs.core.cst$kw$method.cljs$core$IFn$_invoke$arity$1(req);
if(cljs.core.truth_(temp__4651__auto__)){
var m = temp__4651__auto__;
var G__64324 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(req,cljs.core.cst$kw$method),cljs.core.cst$kw$request_DASH_method,m);
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(G__64324) : client.call(null,G__64324));
} else {
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(req) : client.call(null,req));
}
});
});
cljs_http.client.wrap_server_name = (function cljs_http$client$wrap_server_name(client,server_name){
return (function (p1__64325_SHARP_){
var G__64327 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__64325_SHARP_,cljs.core.cst$kw$server_DASH_name,server_name);
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(G__64327) : client.call(null,G__64327));
});
});
cljs_http.client.wrap_url = (function cljs_http$client$wrap_url(client){
return (function (p__64333){
var map__64334 = p__64333;
var map__64334__$1 = ((((!((map__64334 == null)))?((((map__64334.cljs$lang$protocol_mask$partition0$ & (64))) || (map__64334.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__64334):map__64334);
var req = map__64334__$1;
var query_params = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__64334__$1,cljs.core.cst$kw$query_DASH_params);
var temp__4651__auto__ = cljs_http.client.parse_url(cljs.core.cst$kw$url.cljs$core$IFn$_invoke$arity$1(req));
if(cljs.core.truth_(temp__4651__auto__)){
var spec = temp__4651__auto__;
var G__64336 = cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([req,spec], 0)),cljs.core.cst$kw$url),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$query_DASH_params], null),((function (spec,temp__4651__auto__,map__64334,map__64334__$1,req,query_params){
return (function (p1__64328_SHARP_){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([p1__64328_SHARP_,query_params], 0));
});})(spec,temp__4651__auto__,map__64334,map__64334__$1,req,query_params))
);
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(G__64336) : client.call(null,G__64336));
} else {
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(req) : client.call(null,req));
}
});
});
/**
 * Middleware converting the :basic-auth option or `credentials` into
 *   an Authorization header.
 */
cljs_http.client.wrap_basic_auth = (function cljs_http$client$wrap_basic_auth(var_args){
var args__5747__auto__ = [];
var len__5740__auto___64342 = arguments.length;
var i__5741__auto___64343 = (0);
while(true){
if((i__5741__auto___64343 < len__5740__auto___64342)){
args__5747__auto__.push((arguments[i__5741__auto___64343]));

var G__64344 = (i__5741__auto___64343 + (1));
i__5741__auto___64343 = G__64344;
continue;
} else {
}
break;
}

var argseq__5748__auto__ = ((((1) < args__5747__auto__.length))?(new cljs.core.IndexedSeq(args__5747__auto__.slice((1)),(0))):null);
return cljs_http.client.wrap_basic_auth.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5748__auto__);
});

cljs_http.client.wrap_basic_auth.cljs$core$IFn$_invoke$arity$variadic = (function (client,p__64339){
var vec__64340 = p__64339;
var credentials = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64340,(0),null);
return ((function (vec__64340,credentials){
return (function (req){
var credentials__$1 = (function (){var or__4682__auto__ = cljs.core.cst$kw$basic_DASH_auth.cljs$core$IFn$_invoke$arity$1(req);
if(cljs.core.truth_(or__4682__auto__)){
return or__4682__auto__;
} else {
return credentials;
}
})();
if(!(cljs.core.empty_QMARK_(credentials__$1))){
var G__64341 = cljs.core.assoc_in(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(req,cljs.core.cst$kw$basic_DASH_auth),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$headers,"authorization"], null),cljs_http.util.basic_auth(credentials__$1));
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(G__64341) : client.call(null,G__64341));
} else {
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(req) : client.call(null,req));
}
});
;})(vec__64340,credentials))
});

cljs_http.client.wrap_basic_auth.cljs$lang$maxFixedArity = (1);

cljs_http.client.wrap_basic_auth.cljs$lang$applyTo = (function (seq64337){
var G__64338 = cljs.core.first(seq64337);
var seq64337__$1 = cljs.core.next(seq64337);
return cljs_http.client.wrap_basic_auth.cljs$core$IFn$_invoke$arity$variadic(G__64338,seq64337__$1);
});
/**
 * Middleware converting the :oauth-token option into an Authorization header.
 */
cljs_http.client.wrap_oauth = (function cljs_http$client$wrap_oauth(client){
return (function (req){
var temp__4651__auto__ = cljs.core.cst$kw$oauth_DASH_token.cljs$core$IFn$_invoke$arity$1(req);
if(cljs.core.truth_(temp__4651__auto__)){
var oauth_token = temp__4651__auto__;
var G__64346 = cljs.core.assoc_in(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(req,cljs.core.cst$kw$oauth_DASH_token),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$headers,"authorization"], null),[cljs.core.str("Bearer "),cljs.core.str(oauth_token)].join(''));
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(G__64346) : client.call(null,G__64346));
} else {
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(req) : client.call(null,req));
}
});
});
/**
 * Pipe the response-channel into the request-map's
 * custom channel (e.g. to enable transducers)
 */
cljs_http.client.wrap_channel_from_request_map = (function cljs_http$client$wrap_channel_from_request_map(client){
return (function (request){
var temp__4651__auto__ = cljs.core.cst$kw$channel.cljs$core$IFn$_invoke$arity$1(request);
if(cljs.core.truth_(temp__4651__auto__)){
var custom_channel = temp__4651__auto__;
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2((client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(request) : client.call(null,request)),custom_channel);
} else {
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(request) : client.call(null,request));
}
});
});
/**
 * Returns a batteries-included HTTP request function coresponding to the given
 * core client. See client/request
 */
cljs_http.client.wrap_request = (function cljs_http$client$wrap_request(request){
return cljs_http.client.wrap_default_headers(cljs_http.client.wrap_channel_from_request_map(cljs_http.client.wrap_url(cljs_http.client.wrap_method(cljs_http.client.wrap_oauth(cljs_http.client.wrap_basic_auth(cljs_http.client.wrap_query_params(cljs_http.client.wrap_content_type(cljs_http.client.wrap_json_response(cljs_http.client.wrap_json_params(cljs_http.client.wrap_transit_response(cljs_http.client.wrap_transit_params(cljs_http.client.wrap_edn_response(cljs_http.client.wrap_edn_params(cljs_http.client.wrap_multipart_params(cljs_http.client.wrap_form_params(cljs_http.client.wrap_accept(request)))))))))))))))));
});
/**
 * Executes the HTTP request corresponding to the given map and returns the
 * response map for corresponding to the resulting HTTP response.
 * 
 * In addition to the standard Ring request keys, the following keys are also
 * recognized:
 * * :url
 * * :method
 * * :query-params
 */
cljs_http.client.request = cljs_http.client.wrap_request(cljs_http.core.request);
/**
 * Like #'request, but sets the :method and :url as appropriate.
 */
cljs_http.client.delete$ = (function cljs_http$client$delete(var_args){
var args__5747__auto__ = [];
var len__5740__auto___64352 = arguments.length;
var i__5741__auto___64353 = (0);
while(true){
if((i__5741__auto___64353 < len__5740__auto___64352)){
args__5747__auto__.push((arguments[i__5741__auto___64353]));

var G__64354 = (i__5741__auto___64353 + (1));
i__5741__auto___64353 = G__64354;
continue;
} else {
}
break;
}

var argseq__5748__auto__ = ((((1) < args__5747__auto__.length))?(new cljs.core.IndexedSeq(args__5747__auto__.slice((1)),(0))):null);
return cljs_http.client.delete$.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5748__auto__);
});

cljs_http.client.delete$.cljs$core$IFn$_invoke$arity$variadic = (function (url,p__64349){
var vec__64350 = p__64349;
var req = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64350,(0),null);
var G__64351 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([req,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$method,cljs.core.cst$kw$delete,cljs.core.cst$kw$url,url], null)], 0));
return (cljs_http.client.request.cljs$core$IFn$_invoke$arity$1 ? cljs_http.client.request.cljs$core$IFn$_invoke$arity$1(G__64351) : cljs_http.client.request.call(null,G__64351));
});

cljs_http.client.delete$.cljs$lang$maxFixedArity = (1);

cljs_http.client.delete$.cljs$lang$applyTo = (function (seq64347){
var G__64348 = cljs.core.first(seq64347);
var seq64347__$1 = cljs.core.next(seq64347);
return cljs_http.client.delete$.cljs$core$IFn$_invoke$arity$variadic(G__64348,seq64347__$1);
});
/**
 * Like #'request, but sets the :method and :url as appropriate.
 */
cljs_http.client.get = (function cljs_http$client$get(var_args){
var args__5747__auto__ = [];
var len__5740__auto___64360 = arguments.length;
var i__5741__auto___64361 = (0);
while(true){
if((i__5741__auto___64361 < len__5740__auto___64360)){
args__5747__auto__.push((arguments[i__5741__auto___64361]));

var G__64362 = (i__5741__auto___64361 + (1));
i__5741__auto___64361 = G__64362;
continue;
} else {
}
break;
}

var argseq__5748__auto__ = ((((1) < args__5747__auto__.length))?(new cljs.core.IndexedSeq(args__5747__auto__.slice((1)),(0))):null);
return cljs_http.client.get.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5748__auto__);
});

cljs_http.client.get.cljs$core$IFn$_invoke$arity$variadic = (function (url,p__64357){
var vec__64358 = p__64357;
var req = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64358,(0),null);
var G__64359 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([req,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$method,cljs.core.cst$kw$get,cljs.core.cst$kw$url,url], null)], 0));
return (cljs_http.client.request.cljs$core$IFn$_invoke$arity$1 ? cljs_http.client.request.cljs$core$IFn$_invoke$arity$1(G__64359) : cljs_http.client.request.call(null,G__64359));
});

cljs_http.client.get.cljs$lang$maxFixedArity = (1);

cljs_http.client.get.cljs$lang$applyTo = (function (seq64355){
var G__64356 = cljs.core.first(seq64355);
var seq64355__$1 = cljs.core.next(seq64355);
return cljs_http.client.get.cljs$core$IFn$_invoke$arity$variadic(G__64356,seq64355__$1);
});
/**
 * Like #'request, but sets the :method and :url as appropriate.
 */
cljs_http.client.head = (function cljs_http$client$head(var_args){
var args__5747__auto__ = [];
var len__5740__auto___64368 = arguments.length;
var i__5741__auto___64369 = (0);
while(true){
if((i__5741__auto___64369 < len__5740__auto___64368)){
args__5747__auto__.push((arguments[i__5741__auto___64369]));

var G__64370 = (i__5741__auto___64369 + (1));
i__5741__auto___64369 = G__64370;
continue;
} else {
}
break;
}

var argseq__5748__auto__ = ((((1) < args__5747__auto__.length))?(new cljs.core.IndexedSeq(args__5747__auto__.slice((1)),(0))):null);
return cljs_http.client.head.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5748__auto__);
});

cljs_http.client.head.cljs$core$IFn$_invoke$arity$variadic = (function (url,p__64365){
var vec__64366 = p__64365;
var req = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64366,(0),null);
var G__64367 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([req,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$method,cljs.core.cst$kw$head,cljs.core.cst$kw$url,url], null)], 0));
return (cljs_http.client.request.cljs$core$IFn$_invoke$arity$1 ? cljs_http.client.request.cljs$core$IFn$_invoke$arity$1(G__64367) : cljs_http.client.request.call(null,G__64367));
});

cljs_http.client.head.cljs$lang$maxFixedArity = (1);

cljs_http.client.head.cljs$lang$applyTo = (function (seq64363){
var G__64364 = cljs.core.first(seq64363);
var seq64363__$1 = cljs.core.next(seq64363);
return cljs_http.client.head.cljs$core$IFn$_invoke$arity$variadic(G__64364,seq64363__$1);
});
/**
 * Like #'request, but sets the :method and :url as appropriate.
 */
cljs_http.client.jsonp = (function cljs_http$client$jsonp(var_args){
var args__5747__auto__ = [];
var len__5740__auto___64376 = arguments.length;
var i__5741__auto___64377 = (0);
while(true){
if((i__5741__auto___64377 < len__5740__auto___64376)){
args__5747__auto__.push((arguments[i__5741__auto___64377]));

var G__64378 = (i__5741__auto___64377 + (1));
i__5741__auto___64377 = G__64378;
continue;
} else {
}
break;
}

var argseq__5748__auto__ = ((((1) < args__5747__auto__.length))?(new cljs.core.IndexedSeq(args__5747__auto__.slice((1)),(0))):null);
return cljs_http.client.jsonp.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5748__auto__);
});

cljs_http.client.jsonp.cljs$core$IFn$_invoke$arity$variadic = (function (url,p__64373){
var vec__64374 = p__64373;
var req = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64374,(0),null);
var G__64375 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([req,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$method,cljs.core.cst$kw$jsonp,cljs.core.cst$kw$url,url], null)], 0));
return (cljs_http.client.request.cljs$core$IFn$_invoke$arity$1 ? cljs_http.client.request.cljs$core$IFn$_invoke$arity$1(G__64375) : cljs_http.client.request.call(null,G__64375));
});

cljs_http.client.jsonp.cljs$lang$maxFixedArity = (1);

cljs_http.client.jsonp.cljs$lang$applyTo = (function (seq64371){
var G__64372 = cljs.core.first(seq64371);
var seq64371__$1 = cljs.core.next(seq64371);
return cljs_http.client.jsonp.cljs$core$IFn$_invoke$arity$variadic(G__64372,seq64371__$1);
});
/**
 * Like #'request, but sets the :method and :url as appropriate.
 */
cljs_http.client.move = (function cljs_http$client$move(var_args){
var args__5747__auto__ = [];
var len__5740__auto___64384 = arguments.length;
var i__5741__auto___64385 = (0);
while(true){
if((i__5741__auto___64385 < len__5740__auto___64384)){
args__5747__auto__.push((arguments[i__5741__auto___64385]));

var G__64386 = (i__5741__auto___64385 + (1));
i__5741__auto___64385 = G__64386;
continue;
} else {
}
break;
}

var argseq__5748__auto__ = ((((1) < args__5747__auto__.length))?(new cljs.core.IndexedSeq(args__5747__auto__.slice((1)),(0))):null);
return cljs_http.client.move.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5748__auto__);
});

cljs_http.client.move.cljs$core$IFn$_invoke$arity$variadic = (function (url,p__64381){
var vec__64382 = p__64381;
var req = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64382,(0),null);
var G__64383 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([req,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$method,cljs.core.cst$kw$move,cljs.core.cst$kw$url,url], null)], 0));
return (cljs_http.client.request.cljs$core$IFn$_invoke$arity$1 ? cljs_http.client.request.cljs$core$IFn$_invoke$arity$1(G__64383) : cljs_http.client.request.call(null,G__64383));
});

cljs_http.client.move.cljs$lang$maxFixedArity = (1);

cljs_http.client.move.cljs$lang$applyTo = (function (seq64379){
var G__64380 = cljs.core.first(seq64379);
var seq64379__$1 = cljs.core.next(seq64379);
return cljs_http.client.move.cljs$core$IFn$_invoke$arity$variadic(G__64380,seq64379__$1);
});
/**
 * Like #'request, but sets the :method and :url as appropriate.
 */
cljs_http.client.options = (function cljs_http$client$options(var_args){
var args__5747__auto__ = [];
var len__5740__auto___64392 = arguments.length;
var i__5741__auto___64393 = (0);
while(true){
if((i__5741__auto___64393 < len__5740__auto___64392)){
args__5747__auto__.push((arguments[i__5741__auto___64393]));

var G__64394 = (i__5741__auto___64393 + (1));
i__5741__auto___64393 = G__64394;
continue;
} else {
}
break;
}

var argseq__5748__auto__ = ((((1) < args__5747__auto__.length))?(new cljs.core.IndexedSeq(args__5747__auto__.slice((1)),(0))):null);
return cljs_http.client.options.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5748__auto__);
});

cljs_http.client.options.cljs$core$IFn$_invoke$arity$variadic = (function (url,p__64389){
var vec__64390 = p__64389;
var req = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64390,(0),null);
var G__64391 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([req,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$method,cljs.core.cst$kw$options,cljs.core.cst$kw$url,url], null)], 0));
return (cljs_http.client.request.cljs$core$IFn$_invoke$arity$1 ? cljs_http.client.request.cljs$core$IFn$_invoke$arity$1(G__64391) : cljs_http.client.request.call(null,G__64391));
});

cljs_http.client.options.cljs$lang$maxFixedArity = (1);

cljs_http.client.options.cljs$lang$applyTo = (function (seq64387){
var G__64388 = cljs.core.first(seq64387);
var seq64387__$1 = cljs.core.next(seq64387);
return cljs_http.client.options.cljs$core$IFn$_invoke$arity$variadic(G__64388,seq64387__$1);
});
/**
 * Like #'request, but sets the :method and :url as appropriate.
 */
cljs_http.client.patch = (function cljs_http$client$patch(var_args){
var args__5747__auto__ = [];
var len__5740__auto___64400 = arguments.length;
var i__5741__auto___64401 = (0);
while(true){
if((i__5741__auto___64401 < len__5740__auto___64400)){
args__5747__auto__.push((arguments[i__5741__auto___64401]));

var G__64402 = (i__5741__auto___64401 + (1));
i__5741__auto___64401 = G__64402;
continue;
} else {
}
break;
}

var argseq__5748__auto__ = ((((1) < args__5747__auto__.length))?(new cljs.core.IndexedSeq(args__5747__auto__.slice((1)),(0))):null);
return cljs_http.client.patch.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5748__auto__);
});

cljs_http.client.patch.cljs$core$IFn$_invoke$arity$variadic = (function (url,p__64397){
var vec__64398 = p__64397;
var req = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64398,(0),null);
var G__64399 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([req,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$method,cljs.core.cst$kw$patch,cljs.core.cst$kw$url,url], null)], 0));
return (cljs_http.client.request.cljs$core$IFn$_invoke$arity$1 ? cljs_http.client.request.cljs$core$IFn$_invoke$arity$1(G__64399) : cljs_http.client.request.call(null,G__64399));
});

cljs_http.client.patch.cljs$lang$maxFixedArity = (1);

cljs_http.client.patch.cljs$lang$applyTo = (function (seq64395){
var G__64396 = cljs.core.first(seq64395);
var seq64395__$1 = cljs.core.next(seq64395);
return cljs_http.client.patch.cljs$core$IFn$_invoke$arity$variadic(G__64396,seq64395__$1);
});
/**
 * Like #'request, but sets the :method and :url as appropriate.
 */
cljs_http.client.post = (function cljs_http$client$post(var_args){
var args__5747__auto__ = [];
var len__5740__auto___64408 = arguments.length;
var i__5741__auto___64409 = (0);
while(true){
if((i__5741__auto___64409 < len__5740__auto___64408)){
args__5747__auto__.push((arguments[i__5741__auto___64409]));

var G__64410 = (i__5741__auto___64409 + (1));
i__5741__auto___64409 = G__64410;
continue;
} else {
}
break;
}

var argseq__5748__auto__ = ((((1) < args__5747__auto__.length))?(new cljs.core.IndexedSeq(args__5747__auto__.slice((1)),(0))):null);
return cljs_http.client.post.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5748__auto__);
});

cljs_http.client.post.cljs$core$IFn$_invoke$arity$variadic = (function (url,p__64405){
var vec__64406 = p__64405;
var req = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64406,(0),null);
var G__64407 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([req,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$method,cljs.core.cst$kw$post,cljs.core.cst$kw$url,url], null)], 0));
return (cljs_http.client.request.cljs$core$IFn$_invoke$arity$1 ? cljs_http.client.request.cljs$core$IFn$_invoke$arity$1(G__64407) : cljs_http.client.request.call(null,G__64407));
});

cljs_http.client.post.cljs$lang$maxFixedArity = (1);

cljs_http.client.post.cljs$lang$applyTo = (function (seq64403){
var G__64404 = cljs.core.first(seq64403);
var seq64403__$1 = cljs.core.next(seq64403);
return cljs_http.client.post.cljs$core$IFn$_invoke$arity$variadic(G__64404,seq64403__$1);
});
/**
 * Like #'request, but sets the :method and :url as appropriate.
 */
cljs_http.client.put = (function cljs_http$client$put(var_args){
var args__5747__auto__ = [];
var len__5740__auto___64416 = arguments.length;
var i__5741__auto___64417 = (0);
while(true){
if((i__5741__auto___64417 < len__5740__auto___64416)){
args__5747__auto__.push((arguments[i__5741__auto___64417]));

var G__64418 = (i__5741__auto___64417 + (1));
i__5741__auto___64417 = G__64418;
continue;
} else {
}
break;
}

var argseq__5748__auto__ = ((((1) < args__5747__auto__.length))?(new cljs.core.IndexedSeq(args__5747__auto__.slice((1)),(0))):null);
return cljs_http.client.put.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5748__auto__);
});

cljs_http.client.put.cljs$core$IFn$_invoke$arity$variadic = (function (url,p__64413){
var vec__64414 = p__64413;
var req = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64414,(0),null);
var G__64415 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([req,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$method,cljs.core.cst$kw$put,cljs.core.cst$kw$url,url], null)], 0));
return (cljs_http.client.request.cljs$core$IFn$_invoke$arity$1 ? cljs_http.client.request.cljs$core$IFn$_invoke$arity$1(G__64415) : cljs_http.client.request.call(null,G__64415));
});

cljs_http.client.put.cljs$lang$maxFixedArity = (1);

cljs_http.client.put.cljs$lang$applyTo = (function (seq64411){
var G__64412 = cljs.core.first(seq64411);
var seq64411__$1 = cljs.core.next(seq64411);
return cljs_http.client.put.cljs$core$IFn$_invoke$arity$variadic(G__64412,seq64411__$1);
});
