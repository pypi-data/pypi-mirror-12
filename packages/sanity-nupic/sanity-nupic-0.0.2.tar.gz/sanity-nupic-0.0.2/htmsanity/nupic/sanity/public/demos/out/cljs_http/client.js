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
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (p1__64207_SHARP_,p2__64206_SHARP_){
var vec__64209 = clojure.string.split.cljs$core$IFn$_invoke$arity$2(p2__64206_SHARP_,/=/);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64209,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64209,(1),null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__64207_SHARP_,cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(no.en.core.url_decode(k)),no.en.core.url_decode(v));
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
return clojure.string.join.cljs$core$IFn$_invoke$arity$2("&",cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__64210_SHARP_){
return cljs_http.client.encode_val(k,p1__64210_SHARP_);
}),vs));
});
cljs_http.client.encode_param = (function cljs_http$client$encode_param(p__64211){
var vec__64213 = p__64211;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64213,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64213,(1),null);
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
return (function (p1__64214_SHARP_){
return [cljs.core.str("\\"),cljs.core.str(p1__64214_SHARP_)].join('');
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
var G__64216 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(request,cljs.core.cst$kw$edn_DASH_params),cljs.core.cst$kw$body,cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([params], 0))),cljs.core.cst$kw$headers,headers);
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(G__64216) : client.call(null,G__64216));
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
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$2((function (p1__64217_SHARP_){
return cljs_http.client.decode_body(p1__64217_SHARP_,cljs.reader.read_string,"application/edn",cljs.core.cst$kw$request_DASH_method.cljs$core$IFn$_invoke$arity$1(request));
}),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(request) : client.call(null,request))], null));
});
});
cljs_http.client.wrap_default_headers = (function cljs_http$client$wrap_default_headers(var_args){
var args__5747__auto__ = [];
var len__5740__auto___64223 = arguments.length;
var i__5741__auto___64224 = (0);
while(true){
if((i__5741__auto___64224 < len__5740__auto___64223)){
args__5747__auto__.push((arguments[i__5741__auto___64224]));

var G__64225 = (i__5741__auto___64224 + (1));
i__5741__auto___64224 = G__64225;
continue;
} else {
}
break;
}

var argseq__5748__auto__ = ((((1) < args__5747__auto__.length))?(new cljs.core.IndexedSeq(args__5747__auto__.slice((1)),(0))):null);
return cljs_http.client.wrap_default_headers.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5748__auto__);
});

cljs_http.client.wrap_default_headers.cljs$core$IFn$_invoke$arity$variadic = (function (client,p__64220){
var vec__64221 = p__64220;
var default_headers = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64221,(0),null);
return ((function (vec__64221,default_headers){
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
var G__64222 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(request,cljs.core.cst$kw$default_DASH_headers,default_headers__$1);
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(G__64222) : client.call(null,G__64222));
} else {
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(request) : client.call(null,request));
}
});
;})(vec__64221,default_headers))
});

cljs_http.client.wrap_default_headers.cljs$lang$maxFixedArity = (1);

cljs_http.client.wrap_default_headers.cljs$lang$applyTo = (function (seq64218){
var G__64219 = cljs.core.first(seq64218);
var seq64218__$1 = cljs.core.next(seq64218);
return cljs_http.client.wrap_default_headers.cljs$core$IFn$_invoke$arity$variadic(G__64219,seq64218__$1);
});
cljs_http.client.wrap_accept = (function cljs_http$client$wrap_accept(var_args){
var args__5747__auto__ = [];
var len__5740__auto___64231 = arguments.length;
var i__5741__auto___64232 = (0);
while(true){
if((i__5741__auto___64232 < len__5740__auto___64231)){
args__5747__auto__.push((arguments[i__5741__auto___64232]));

var G__64233 = (i__5741__auto___64232 + (1));
i__5741__auto___64232 = G__64233;
continue;
} else {
}
break;
}

var argseq__5748__auto__ = ((((1) < args__5747__auto__.length))?(new cljs.core.IndexedSeq(args__5747__auto__.slice((1)),(0))):null);
return cljs_http.client.wrap_accept.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5748__auto__);
});

cljs_http.client.wrap_accept.cljs$core$IFn$_invoke$arity$variadic = (function (client,p__64228){
var vec__64229 = p__64228;
var accept = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64229,(0),null);
return ((function (vec__64229,accept){
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
var G__64230 = cljs.core.assoc_in(request,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$headers,"accept"], null),accept__$1);
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(G__64230) : client.call(null,G__64230));
} else {
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(request) : client.call(null,request));
}
});
;})(vec__64229,accept))
});

cljs_http.client.wrap_accept.cljs$lang$maxFixedArity = (1);

cljs_http.client.wrap_accept.cljs$lang$applyTo = (function (seq64226){
var G__64227 = cljs.core.first(seq64226);
var seq64226__$1 = cljs.core.next(seq64226);
return cljs_http.client.wrap_accept.cljs$core$IFn$_invoke$arity$variadic(G__64227,seq64226__$1);
});
cljs_http.client.wrap_content_type = (function cljs_http$client$wrap_content_type(var_args){
var args__5747__auto__ = [];
var len__5740__auto___64239 = arguments.length;
var i__5741__auto___64240 = (0);
while(true){
if((i__5741__auto___64240 < len__5740__auto___64239)){
args__5747__auto__.push((arguments[i__5741__auto___64240]));

var G__64241 = (i__5741__auto___64240 + (1));
i__5741__auto___64240 = G__64241;
continue;
} else {
}
break;
}

var argseq__5748__auto__ = ((((1) < args__5747__auto__.length))?(new cljs.core.IndexedSeq(args__5747__auto__.slice((1)),(0))):null);
return cljs_http.client.wrap_content_type.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5748__auto__);
});

cljs_http.client.wrap_content_type.cljs$core$IFn$_invoke$arity$variadic = (function (client,p__64236){
var vec__64237 = p__64236;
var content_type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64237,(0),null);
return ((function (vec__64237,content_type){
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
var G__64238 = cljs.core.assoc_in(request,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$headers,"content-type"], null),content_type__$1);
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(G__64238) : client.call(null,G__64238));
} else {
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(request) : client.call(null,request));
}
});
;})(vec__64237,content_type))
});

cljs_http.client.wrap_content_type.cljs$lang$maxFixedArity = (1);

cljs_http.client.wrap_content_type.cljs$lang$applyTo = (function (seq64234){
var G__64235 = cljs.core.first(seq64234);
var seq64234__$1 = cljs.core.next(seq64234);
return cljs_http.client.wrap_content_type.cljs$core$IFn$_invoke$arity$variadic(G__64235,seq64234__$1);
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
var map__64245 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs_http.client.default_transit_opts,cljs.core.cst$kw$transit_DASH_opts.cljs$core$IFn$_invoke$arity$1(request)], 0));
var map__64245__$1 = ((((!((map__64245 == null)))?((((map__64245.cljs$lang$protocol_mask$partition0$ & (64))) || (map__64245.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__64245):map__64245);
var encoding = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__64245__$1,cljs.core.cst$kw$encoding);
var encoding_opts = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__64245__$1,cljs.core.cst$kw$encoding_DASH_opts);
var headers = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 1, ["content-type","application/transit+json"], null),cljs.core.cst$kw$headers.cljs$core$IFn$_invoke$arity$1(request)], 0));
var G__64247 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(request,cljs.core.cst$kw$transit_DASH_params),cljs.core.cst$kw$body,cljs_http.util.transit_encode(params,encoding,encoding_opts)),cljs.core.cst$kw$headers,headers);
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(G__64247) : client.call(null,G__64247));
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
var map__64252 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs_http.client.default_transit_opts,cljs.core.cst$kw$transit_DASH_opts.cljs$core$IFn$_invoke$arity$1(request)], 0));
var map__64252__$1 = ((((!((map__64252 == null)))?((((map__64252.cljs$lang$protocol_mask$partition0$ & (64))) || (map__64252.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__64252):map__64252);
var decoding = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__64252__$1,cljs.core.cst$kw$decoding);
var decoding_opts = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__64252__$1,cljs.core.cst$kw$decoding_DASH_opts);
var transit_decode = ((function (map__64252,map__64252__$1,decoding,decoding_opts){
return (function (p1__64248_SHARP_){
return cljs_http.util.transit_decode(p1__64248_SHARP_,decoding,decoding_opts);
});})(map__64252,map__64252__$1,decoding,decoding_opts))
;
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$2(((function (map__64252,map__64252__$1,decoding,decoding_opts,transit_decode){
return (function (p1__64249_SHARP_){
return cljs_http.client.decode_body(p1__64249_SHARP_,transit_decode,"application/transit+json",cljs.core.cst$kw$request_DASH_method.cljs$core$IFn$_invoke$arity$1(request));
});})(map__64252,map__64252__$1,decoding,decoding_opts,transit_decode))
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
var G__64255 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(request,cljs.core.cst$kw$json_DASH_params),cljs.core.cst$kw$body,cljs_http.util.json_encode(params)),cljs.core.cst$kw$headers,headers);
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(G__64255) : client.call(null,G__64255));
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
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$2((function (p1__64256_SHARP_){
return cljs_http.client.decode_body(p1__64256_SHARP_,cljs_http.util.json_decode,"application/json",cljs.core.cst$kw$request_DASH_method.cljs$core$IFn$_invoke$arity$1(request));
}),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(request) : client.call(null,request))], null));
});
});
cljs_http.client.wrap_query_params = (function cljs_http$client$wrap_query_params(client){
return (function (p__64261){
var map__64262 = p__64261;
var map__64262__$1 = ((((!((map__64262 == null)))?((((map__64262.cljs$lang$protocol_mask$partition0$ & (64))) || (map__64262.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__64262):map__64262);
var req = map__64262__$1;
var query_params = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__64262__$1,cljs.core.cst$kw$query_DASH_params);
if(cljs.core.truth_(query_params)){
var G__64264 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(req,cljs.core.cst$kw$query_DASH_params),cljs.core.cst$kw$query_DASH_string,cljs_http.client.generate_query_string(query_params));
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(G__64264) : client.call(null,G__64264));
} else {
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(req) : client.call(null,req));
}
});
});
cljs_http.client.wrap_form_params = (function cljs_http$client$wrap_form_params(client){
return (function (p__64269){
var map__64270 = p__64269;
var map__64270__$1 = ((((!((map__64270 == null)))?((((map__64270.cljs$lang$protocol_mask$partition0$ & (64))) || (map__64270.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__64270):map__64270);
var request = map__64270__$1;
var form_params = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__64270__$1,cljs.core.cst$kw$form_DASH_params);
var request_method = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__64270__$1,cljs.core.cst$kw$request_DASH_method);
var headers = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__64270__$1,cljs.core.cst$kw$headers);
if(cljs.core.truth_((function (){var and__4670__auto__ = form_params;
if(cljs.core.truth_(and__4670__auto__)){
return new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$patch,null,cljs.core.cst$kw$delete,null,cljs.core.cst$kw$post,null,cljs.core.cst$kw$put,null], null), null).call(null,request_method);
} else {
return and__4670__auto__;
}
})())){
var headers__$1 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 1, ["content-type","application/x-www-form-urlencoded"], null),headers], 0));
var G__64272 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(request,cljs.core.cst$kw$form_DASH_params),cljs.core.cst$kw$body,cljs_http.client.generate_query_string(form_params)),cljs.core.cst$kw$headers,headers__$1);
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(G__64272) : client.call(null,G__64272));
} else {
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(request) : client.call(null,request));
}
});
});
cljs_http.client.generate_form_data = (function cljs_http$client$generate_form_data(params){
var form_data = (new FormData());
var seq__64279_64285 = cljs.core.seq(params);
var chunk__64280_64286 = null;
var count__64281_64287 = (0);
var i__64282_64288 = (0);
while(true){
if((i__64282_64288 < count__64281_64287)){
var vec__64283_64289 = chunk__64280_64286.cljs$core$IIndexed$_nth$arity$2(null,i__64282_64288);
var k_64290 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64283_64289,(0),null);
var v_64291 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64283_64289,(1),null);
if(cljs.core.coll_QMARK_(v_64291)){
form_data.append(cljs.core.name(k_64290),cljs.core.first(v_64291),cljs.core.second(v_64291));
} else {
form_data.append(cljs.core.name(k_64290),v_64291);
}

var G__64292 = seq__64279_64285;
var G__64293 = chunk__64280_64286;
var G__64294 = count__64281_64287;
var G__64295 = (i__64282_64288 + (1));
seq__64279_64285 = G__64292;
chunk__64280_64286 = G__64293;
count__64281_64287 = G__64294;
i__64282_64288 = G__64295;
continue;
} else {
var temp__4653__auto___64296 = cljs.core.seq(seq__64279_64285);
if(temp__4653__auto___64296){
var seq__64279_64297__$1 = temp__4653__auto___64296;
if(cljs.core.chunked_seq_QMARK_(seq__64279_64297__$1)){
var c__5485__auto___64298 = cljs.core.chunk_first(seq__64279_64297__$1);
var G__64299 = cljs.core.chunk_rest(seq__64279_64297__$1);
var G__64300 = c__5485__auto___64298;
var G__64301 = cljs.core.count(c__5485__auto___64298);
var G__64302 = (0);
seq__64279_64285 = G__64299;
chunk__64280_64286 = G__64300;
count__64281_64287 = G__64301;
i__64282_64288 = G__64302;
continue;
} else {
var vec__64284_64303 = cljs.core.first(seq__64279_64297__$1);
var k_64304 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64284_64303,(0),null);
var v_64305 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64284_64303,(1),null);
if(cljs.core.coll_QMARK_(v_64305)){
form_data.append(cljs.core.name(k_64304),cljs.core.first(v_64305),cljs.core.second(v_64305));
} else {
form_data.append(cljs.core.name(k_64304),v_64305);
}

var G__64306 = cljs.core.next(seq__64279_64297__$1);
var G__64307 = null;
var G__64308 = (0);
var G__64309 = (0);
seq__64279_64285 = G__64306;
chunk__64280_64286 = G__64307;
count__64281_64287 = G__64308;
i__64282_64288 = G__64309;
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
return (function (p__64314){
var map__64315 = p__64314;
var map__64315__$1 = ((((!((map__64315 == null)))?((((map__64315.cljs$lang$protocol_mask$partition0$ & (64))) || (map__64315.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__64315):map__64315);
var request = map__64315__$1;
var multipart_params = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__64315__$1,cljs.core.cst$kw$multipart_DASH_params);
var request_method = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__64315__$1,cljs.core.cst$kw$request_DASH_method);
if(cljs.core.truth_((function (){var and__4670__auto__ = multipart_params;
if(cljs.core.truth_(and__4670__auto__)){
return new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$patch,null,cljs.core.cst$kw$delete,null,cljs.core.cst$kw$post,null,cljs.core.cst$kw$put,null], null), null).call(null,request_method);
} else {
return and__4670__auto__;
}
})())){
var G__64317 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(request,cljs.core.cst$kw$multipart_DASH_params),cljs.core.cst$kw$body,cljs_http.client.generate_form_data(multipart_params));
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(G__64317) : client.call(null,G__64317));
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
var G__64319 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(req,cljs.core.cst$kw$method),cljs.core.cst$kw$request_DASH_method,m);
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(G__64319) : client.call(null,G__64319));
} else {
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(req) : client.call(null,req));
}
});
});
cljs_http.client.wrap_server_name = (function cljs_http$client$wrap_server_name(client,server_name){
return (function (p1__64320_SHARP_){
var G__64322 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__64320_SHARP_,cljs.core.cst$kw$server_DASH_name,server_name);
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(G__64322) : client.call(null,G__64322));
});
});
cljs_http.client.wrap_url = (function cljs_http$client$wrap_url(client){
return (function (p__64328){
var map__64329 = p__64328;
var map__64329__$1 = ((((!((map__64329 == null)))?((((map__64329.cljs$lang$protocol_mask$partition0$ & (64))) || (map__64329.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__64329):map__64329);
var req = map__64329__$1;
var query_params = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__64329__$1,cljs.core.cst$kw$query_DASH_params);
var temp__4651__auto__ = cljs_http.client.parse_url(cljs.core.cst$kw$url.cljs$core$IFn$_invoke$arity$1(req));
if(cljs.core.truth_(temp__4651__auto__)){
var spec = temp__4651__auto__;
var G__64331 = cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([req,spec], 0)),cljs.core.cst$kw$url),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$query_DASH_params], null),((function (spec,temp__4651__auto__,map__64329,map__64329__$1,req,query_params){
return (function (p1__64323_SHARP_){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([p1__64323_SHARP_,query_params], 0));
});})(spec,temp__4651__auto__,map__64329,map__64329__$1,req,query_params))
);
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(G__64331) : client.call(null,G__64331));
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
var len__5740__auto___64337 = arguments.length;
var i__5741__auto___64338 = (0);
while(true){
if((i__5741__auto___64338 < len__5740__auto___64337)){
args__5747__auto__.push((arguments[i__5741__auto___64338]));

var G__64339 = (i__5741__auto___64338 + (1));
i__5741__auto___64338 = G__64339;
continue;
} else {
}
break;
}

var argseq__5748__auto__ = ((((1) < args__5747__auto__.length))?(new cljs.core.IndexedSeq(args__5747__auto__.slice((1)),(0))):null);
return cljs_http.client.wrap_basic_auth.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5748__auto__);
});

cljs_http.client.wrap_basic_auth.cljs$core$IFn$_invoke$arity$variadic = (function (client,p__64334){
var vec__64335 = p__64334;
var credentials = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64335,(0),null);
return ((function (vec__64335,credentials){
return (function (req){
var credentials__$1 = (function (){var or__4682__auto__ = cljs.core.cst$kw$basic_DASH_auth.cljs$core$IFn$_invoke$arity$1(req);
if(cljs.core.truth_(or__4682__auto__)){
return or__4682__auto__;
} else {
return credentials;
}
})();
if(!(cljs.core.empty_QMARK_(credentials__$1))){
var G__64336 = cljs.core.assoc_in(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(req,cljs.core.cst$kw$basic_DASH_auth),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$headers,"authorization"], null),cljs_http.util.basic_auth(credentials__$1));
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(G__64336) : client.call(null,G__64336));
} else {
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(req) : client.call(null,req));
}
});
;})(vec__64335,credentials))
});

cljs_http.client.wrap_basic_auth.cljs$lang$maxFixedArity = (1);

cljs_http.client.wrap_basic_auth.cljs$lang$applyTo = (function (seq64332){
var G__64333 = cljs.core.first(seq64332);
var seq64332__$1 = cljs.core.next(seq64332);
return cljs_http.client.wrap_basic_auth.cljs$core$IFn$_invoke$arity$variadic(G__64333,seq64332__$1);
});
/**
 * Middleware converting the :oauth-token option into an Authorization header.
 */
cljs_http.client.wrap_oauth = (function cljs_http$client$wrap_oauth(client){
return (function (req){
var temp__4651__auto__ = cljs.core.cst$kw$oauth_DASH_token.cljs$core$IFn$_invoke$arity$1(req);
if(cljs.core.truth_(temp__4651__auto__)){
var oauth_token = temp__4651__auto__;
var G__64341 = cljs.core.assoc_in(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(req,cljs.core.cst$kw$oauth_DASH_token),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$headers,"authorization"], null),[cljs.core.str("Bearer "),cljs.core.str(oauth_token)].join(''));
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(G__64341) : client.call(null,G__64341));
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
var len__5740__auto___64347 = arguments.length;
var i__5741__auto___64348 = (0);
while(true){
if((i__5741__auto___64348 < len__5740__auto___64347)){
args__5747__auto__.push((arguments[i__5741__auto___64348]));

var G__64349 = (i__5741__auto___64348 + (1));
i__5741__auto___64348 = G__64349;
continue;
} else {
}
break;
}

var argseq__5748__auto__ = ((((1) < args__5747__auto__.length))?(new cljs.core.IndexedSeq(args__5747__auto__.slice((1)),(0))):null);
return cljs_http.client.delete$.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5748__auto__);
});

cljs_http.client.delete$.cljs$core$IFn$_invoke$arity$variadic = (function (url,p__64344){
var vec__64345 = p__64344;
var req = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64345,(0),null);
var G__64346 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([req,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$method,cljs.core.cst$kw$delete,cljs.core.cst$kw$url,url], null)], 0));
return (cljs_http.client.request.cljs$core$IFn$_invoke$arity$1 ? cljs_http.client.request.cljs$core$IFn$_invoke$arity$1(G__64346) : cljs_http.client.request.call(null,G__64346));
});

cljs_http.client.delete$.cljs$lang$maxFixedArity = (1);

cljs_http.client.delete$.cljs$lang$applyTo = (function (seq64342){
var G__64343 = cljs.core.first(seq64342);
var seq64342__$1 = cljs.core.next(seq64342);
return cljs_http.client.delete$.cljs$core$IFn$_invoke$arity$variadic(G__64343,seq64342__$1);
});
/**
 * Like #'request, but sets the :method and :url as appropriate.
 */
cljs_http.client.get = (function cljs_http$client$get(var_args){
var args__5747__auto__ = [];
var len__5740__auto___64355 = arguments.length;
var i__5741__auto___64356 = (0);
while(true){
if((i__5741__auto___64356 < len__5740__auto___64355)){
args__5747__auto__.push((arguments[i__5741__auto___64356]));

var G__64357 = (i__5741__auto___64356 + (1));
i__5741__auto___64356 = G__64357;
continue;
} else {
}
break;
}

var argseq__5748__auto__ = ((((1) < args__5747__auto__.length))?(new cljs.core.IndexedSeq(args__5747__auto__.slice((1)),(0))):null);
return cljs_http.client.get.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5748__auto__);
});

cljs_http.client.get.cljs$core$IFn$_invoke$arity$variadic = (function (url,p__64352){
var vec__64353 = p__64352;
var req = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64353,(0),null);
var G__64354 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([req,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$method,cljs.core.cst$kw$get,cljs.core.cst$kw$url,url], null)], 0));
return (cljs_http.client.request.cljs$core$IFn$_invoke$arity$1 ? cljs_http.client.request.cljs$core$IFn$_invoke$arity$1(G__64354) : cljs_http.client.request.call(null,G__64354));
});

cljs_http.client.get.cljs$lang$maxFixedArity = (1);

cljs_http.client.get.cljs$lang$applyTo = (function (seq64350){
var G__64351 = cljs.core.first(seq64350);
var seq64350__$1 = cljs.core.next(seq64350);
return cljs_http.client.get.cljs$core$IFn$_invoke$arity$variadic(G__64351,seq64350__$1);
});
/**
 * Like #'request, but sets the :method and :url as appropriate.
 */
cljs_http.client.head = (function cljs_http$client$head(var_args){
var args__5747__auto__ = [];
var len__5740__auto___64363 = arguments.length;
var i__5741__auto___64364 = (0);
while(true){
if((i__5741__auto___64364 < len__5740__auto___64363)){
args__5747__auto__.push((arguments[i__5741__auto___64364]));

var G__64365 = (i__5741__auto___64364 + (1));
i__5741__auto___64364 = G__64365;
continue;
} else {
}
break;
}

var argseq__5748__auto__ = ((((1) < args__5747__auto__.length))?(new cljs.core.IndexedSeq(args__5747__auto__.slice((1)),(0))):null);
return cljs_http.client.head.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5748__auto__);
});

cljs_http.client.head.cljs$core$IFn$_invoke$arity$variadic = (function (url,p__64360){
var vec__64361 = p__64360;
var req = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64361,(0),null);
var G__64362 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([req,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$method,cljs.core.cst$kw$head,cljs.core.cst$kw$url,url], null)], 0));
return (cljs_http.client.request.cljs$core$IFn$_invoke$arity$1 ? cljs_http.client.request.cljs$core$IFn$_invoke$arity$1(G__64362) : cljs_http.client.request.call(null,G__64362));
});

cljs_http.client.head.cljs$lang$maxFixedArity = (1);

cljs_http.client.head.cljs$lang$applyTo = (function (seq64358){
var G__64359 = cljs.core.first(seq64358);
var seq64358__$1 = cljs.core.next(seq64358);
return cljs_http.client.head.cljs$core$IFn$_invoke$arity$variadic(G__64359,seq64358__$1);
});
/**
 * Like #'request, but sets the :method and :url as appropriate.
 */
cljs_http.client.jsonp = (function cljs_http$client$jsonp(var_args){
var args__5747__auto__ = [];
var len__5740__auto___64371 = arguments.length;
var i__5741__auto___64372 = (0);
while(true){
if((i__5741__auto___64372 < len__5740__auto___64371)){
args__5747__auto__.push((arguments[i__5741__auto___64372]));

var G__64373 = (i__5741__auto___64372 + (1));
i__5741__auto___64372 = G__64373;
continue;
} else {
}
break;
}

var argseq__5748__auto__ = ((((1) < args__5747__auto__.length))?(new cljs.core.IndexedSeq(args__5747__auto__.slice((1)),(0))):null);
return cljs_http.client.jsonp.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5748__auto__);
});

cljs_http.client.jsonp.cljs$core$IFn$_invoke$arity$variadic = (function (url,p__64368){
var vec__64369 = p__64368;
var req = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64369,(0),null);
var G__64370 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([req,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$method,cljs.core.cst$kw$jsonp,cljs.core.cst$kw$url,url], null)], 0));
return (cljs_http.client.request.cljs$core$IFn$_invoke$arity$1 ? cljs_http.client.request.cljs$core$IFn$_invoke$arity$1(G__64370) : cljs_http.client.request.call(null,G__64370));
});

cljs_http.client.jsonp.cljs$lang$maxFixedArity = (1);

cljs_http.client.jsonp.cljs$lang$applyTo = (function (seq64366){
var G__64367 = cljs.core.first(seq64366);
var seq64366__$1 = cljs.core.next(seq64366);
return cljs_http.client.jsonp.cljs$core$IFn$_invoke$arity$variadic(G__64367,seq64366__$1);
});
/**
 * Like #'request, but sets the :method and :url as appropriate.
 */
cljs_http.client.move = (function cljs_http$client$move(var_args){
var args__5747__auto__ = [];
var len__5740__auto___64379 = arguments.length;
var i__5741__auto___64380 = (0);
while(true){
if((i__5741__auto___64380 < len__5740__auto___64379)){
args__5747__auto__.push((arguments[i__5741__auto___64380]));

var G__64381 = (i__5741__auto___64380 + (1));
i__5741__auto___64380 = G__64381;
continue;
} else {
}
break;
}

var argseq__5748__auto__ = ((((1) < args__5747__auto__.length))?(new cljs.core.IndexedSeq(args__5747__auto__.slice((1)),(0))):null);
return cljs_http.client.move.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5748__auto__);
});

cljs_http.client.move.cljs$core$IFn$_invoke$arity$variadic = (function (url,p__64376){
var vec__64377 = p__64376;
var req = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64377,(0),null);
var G__64378 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([req,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$method,cljs.core.cst$kw$move,cljs.core.cst$kw$url,url], null)], 0));
return (cljs_http.client.request.cljs$core$IFn$_invoke$arity$1 ? cljs_http.client.request.cljs$core$IFn$_invoke$arity$1(G__64378) : cljs_http.client.request.call(null,G__64378));
});

cljs_http.client.move.cljs$lang$maxFixedArity = (1);

cljs_http.client.move.cljs$lang$applyTo = (function (seq64374){
var G__64375 = cljs.core.first(seq64374);
var seq64374__$1 = cljs.core.next(seq64374);
return cljs_http.client.move.cljs$core$IFn$_invoke$arity$variadic(G__64375,seq64374__$1);
});
/**
 * Like #'request, but sets the :method and :url as appropriate.
 */
cljs_http.client.options = (function cljs_http$client$options(var_args){
var args__5747__auto__ = [];
var len__5740__auto___64387 = arguments.length;
var i__5741__auto___64388 = (0);
while(true){
if((i__5741__auto___64388 < len__5740__auto___64387)){
args__5747__auto__.push((arguments[i__5741__auto___64388]));

var G__64389 = (i__5741__auto___64388 + (1));
i__5741__auto___64388 = G__64389;
continue;
} else {
}
break;
}

var argseq__5748__auto__ = ((((1) < args__5747__auto__.length))?(new cljs.core.IndexedSeq(args__5747__auto__.slice((1)),(0))):null);
return cljs_http.client.options.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5748__auto__);
});

cljs_http.client.options.cljs$core$IFn$_invoke$arity$variadic = (function (url,p__64384){
var vec__64385 = p__64384;
var req = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64385,(0),null);
var G__64386 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([req,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$method,cljs.core.cst$kw$options,cljs.core.cst$kw$url,url], null)], 0));
return (cljs_http.client.request.cljs$core$IFn$_invoke$arity$1 ? cljs_http.client.request.cljs$core$IFn$_invoke$arity$1(G__64386) : cljs_http.client.request.call(null,G__64386));
});

cljs_http.client.options.cljs$lang$maxFixedArity = (1);

cljs_http.client.options.cljs$lang$applyTo = (function (seq64382){
var G__64383 = cljs.core.first(seq64382);
var seq64382__$1 = cljs.core.next(seq64382);
return cljs_http.client.options.cljs$core$IFn$_invoke$arity$variadic(G__64383,seq64382__$1);
});
/**
 * Like #'request, but sets the :method and :url as appropriate.
 */
cljs_http.client.patch = (function cljs_http$client$patch(var_args){
var args__5747__auto__ = [];
var len__5740__auto___64395 = arguments.length;
var i__5741__auto___64396 = (0);
while(true){
if((i__5741__auto___64396 < len__5740__auto___64395)){
args__5747__auto__.push((arguments[i__5741__auto___64396]));

var G__64397 = (i__5741__auto___64396 + (1));
i__5741__auto___64396 = G__64397;
continue;
} else {
}
break;
}

var argseq__5748__auto__ = ((((1) < args__5747__auto__.length))?(new cljs.core.IndexedSeq(args__5747__auto__.slice((1)),(0))):null);
return cljs_http.client.patch.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5748__auto__);
});

cljs_http.client.patch.cljs$core$IFn$_invoke$arity$variadic = (function (url,p__64392){
var vec__64393 = p__64392;
var req = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64393,(0),null);
var G__64394 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([req,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$method,cljs.core.cst$kw$patch,cljs.core.cst$kw$url,url], null)], 0));
return (cljs_http.client.request.cljs$core$IFn$_invoke$arity$1 ? cljs_http.client.request.cljs$core$IFn$_invoke$arity$1(G__64394) : cljs_http.client.request.call(null,G__64394));
});

cljs_http.client.patch.cljs$lang$maxFixedArity = (1);

cljs_http.client.patch.cljs$lang$applyTo = (function (seq64390){
var G__64391 = cljs.core.first(seq64390);
var seq64390__$1 = cljs.core.next(seq64390);
return cljs_http.client.patch.cljs$core$IFn$_invoke$arity$variadic(G__64391,seq64390__$1);
});
/**
 * Like #'request, but sets the :method and :url as appropriate.
 */
cljs_http.client.post = (function cljs_http$client$post(var_args){
var args__5747__auto__ = [];
var len__5740__auto___64403 = arguments.length;
var i__5741__auto___64404 = (0);
while(true){
if((i__5741__auto___64404 < len__5740__auto___64403)){
args__5747__auto__.push((arguments[i__5741__auto___64404]));

var G__64405 = (i__5741__auto___64404 + (1));
i__5741__auto___64404 = G__64405;
continue;
} else {
}
break;
}

var argseq__5748__auto__ = ((((1) < args__5747__auto__.length))?(new cljs.core.IndexedSeq(args__5747__auto__.slice((1)),(0))):null);
return cljs_http.client.post.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5748__auto__);
});

cljs_http.client.post.cljs$core$IFn$_invoke$arity$variadic = (function (url,p__64400){
var vec__64401 = p__64400;
var req = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64401,(0),null);
var G__64402 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([req,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$method,cljs.core.cst$kw$post,cljs.core.cst$kw$url,url], null)], 0));
return (cljs_http.client.request.cljs$core$IFn$_invoke$arity$1 ? cljs_http.client.request.cljs$core$IFn$_invoke$arity$1(G__64402) : cljs_http.client.request.call(null,G__64402));
});

cljs_http.client.post.cljs$lang$maxFixedArity = (1);

cljs_http.client.post.cljs$lang$applyTo = (function (seq64398){
var G__64399 = cljs.core.first(seq64398);
var seq64398__$1 = cljs.core.next(seq64398);
return cljs_http.client.post.cljs$core$IFn$_invoke$arity$variadic(G__64399,seq64398__$1);
});
/**
 * Like #'request, but sets the :method and :url as appropriate.
 */
cljs_http.client.put = (function cljs_http$client$put(var_args){
var args__5747__auto__ = [];
var len__5740__auto___64411 = arguments.length;
var i__5741__auto___64412 = (0);
while(true){
if((i__5741__auto___64412 < len__5740__auto___64411)){
args__5747__auto__.push((arguments[i__5741__auto___64412]));

var G__64413 = (i__5741__auto___64412 + (1));
i__5741__auto___64412 = G__64413;
continue;
} else {
}
break;
}

var argseq__5748__auto__ = ((((1) < args__5747__auto__.length))?(new cljs.core.IndexedSeq(args__5747__auto__.slice((1)),(0))):null);
return cljs_http.client.put.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5748__auto__);
});

cljs_http.client.put.cljs$core$IFn$_invoke$arity$variadic = (function (url,p__64408){
var vec__64409 = p__64408;
var req = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64409,(0),null);
var G__64410 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([req,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$method,cljs.core.cst$kw$put,cljs.core.cst$kw$url,url], null)], 0));
return (cljs_http.client.request.cljs$core$IFn$_invoke$arity$1 ? cljs_http.client.request.cljs$core$IFn$_invoke$arity$1(G__64410) : cljs_http.client.request.call(null,G__64410));
});

cljs_http.client.put.cljs$lang$maxFixedArity = (1);

cljs_http.client.put.cljs$lang$applyTo = (function (seq64406){
var G__64407 = cljs.core.first(seq64406);
var seq64406__$1 = cljs.core.next(seq64406);
return cljs_http.client.put.cljs$core$IFn$_invoke$arity$variadic(G__64407,seq64406__$1);
});
