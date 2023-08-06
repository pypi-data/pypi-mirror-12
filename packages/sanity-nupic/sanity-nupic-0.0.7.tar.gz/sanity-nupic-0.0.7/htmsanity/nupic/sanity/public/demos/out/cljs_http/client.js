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
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (p1__64210_SHARP_,p2__64209_SHARP_){
var vec__64212 = clojure.string.split.cljs$core$IFn$_invoke$arity$2(p2__64209_SHARP_,/=/);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64212,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64212,(1),null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__64210_SHARP_,cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(no.en.core.url_decode(k)),no.en.core.url_decode(v));
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
return clojure.string.join.cljs$core$IFn$_invoke$arity$2("&",cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__64213_SHARP_){
return cljs_http.client.encode_val(k,p1__64213_SHARP_);
}),vs));
});
cljs_http.client.encode_param = (function cljs_http$client$encode_param(p__64214){
var vec__64216 = p__64214;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64216,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64216,(1),null);
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
return (function (p1__64217_SHARP_){
return [cljs.core.str("\\"),cljs.core.str(p1__64217_SHARP_)].join('');
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
var G__64219 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(request,cljs.core.cst$kw$edn_DASH_params),cljs.core.cst$kw$body,cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([params], 0))),cljs.core.cst$kw$headers,headers);
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(G__64219) : client.call(null,G__64219));
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
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$2((function (p1__64220_SHARP_){
return cljs_http.client.decode_body(p1__64220_SHARP_,cljs.reader.read_string,"application/edn",cljs.core.cst$kw$request_DASH_method.cljs$core$IFn$_invoke$arity$1(request));
}),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(request) : client.call(null,request))], null));
});
});
cljs_http.client.wrap_default_headers = (function cljs_http$client$wrap_default_headers(var_args){
var args__5747__auto__ = [];
var len__5740__auto___64226 = arguments.length;
var i__5741__auto___64227 = (0);
while(true){
if((i__5741__auto___64227 < len__5740__auto___64226)){
args__5747__auto__.push((arguments[i__5741__auto___64227]));

var G__64228 = (i__5741__auto___64227 + (1));
i__5741__auto___64227 = G__64228;
continue;
} else {
}
break;
}

var argseq__5748__auto__ = ((((1) < args__5747__auto__.length))?(new cljs.core.IndexedSeq(args__5747__auto__.slice((1)),(0))):null);
return cljs_http.client.wrap_default_headers.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5748__auto__);
});

cljs_http.client.wrap_default_headers.cljs$core$IFn$_invoke$arity$variadic = (function (client,p__64223){
var vec__64224 = p__64223;
var default_headers = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64224,(0),null);
return ((function (vec__64224,default_headers){
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
var G__64225 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(request,cljs.core.cst$kw$default_DASH_headers,default_headers__$1);
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(G__64225) : client.call(null,G__64225));
} else {
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(request) : client.call(null,request));
}
});
;})(vec__64224,default_headers))
});

cljs_http.client.wrap_default_headers.cljs$lang$maxFixedArity = (1);

cljs_http.client.wrap_default_headers.cljs$lang$applyTo = (function (seq64221){
var G__64222 = cljs.core.first(seq64221);
var seq64221__$1 = cljs.core.next(seq64221);
return cljs_http.client.wrap_default_headers.cljs$core$IFn$_invoke$arity$variadic(G__64222,seq64221__$1);
});
cljs_http.client.wrap_accept = (function cljs_http$client$wrap_accept(var_args){
var args__5747__auto__ = [];
var len__5740__auto___64234 = arguments.length;
var i__5741__auto___64235 = (0);
while(true){
if((i__5741__auto___64235 < len__5740__auto___64234)){
args__5747__auto__.push((arguments[i__5741__auto___64235]));

var G__64236 = (i__5741__auto___64235 + (1));
i__5741__auto___64235 = G__64236;
continue;
} else {
}
break;
}

var argseq__5748__auto__ = ((((1) < args__5747__auto__.length))?(new cljs.core.IndexedSeq(args__5747__auto__.slice((1)),(0))):null);
return cljs_http.client.wrap_accept.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5748__auto__);
});

cljs_http.client.wrap_accept.cljs$core$IFn$_invoke$arity$variadic = (function (client,p__64231){
var vec__64232 = p__64231;
var accept = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64232,(0),null);
return ((function (vec__64232,accept){
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
var G__64233 = cljs.core.assoc_in(request,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$headers,"accept"], null),accept__$1);
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(G__64233) : client.call(null,G__64233));
} else {
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(request) : client.call(null,request));
}
});
;})(vec__64232,accept))
});

cljs_http.client.wrap_accept.cljs$lang$maxFixedArity = (1);

cljs_http.client.wrap_accept.cljs$lang$applyTo = (function (seq64229){
var G__64230 = cljs.core.first(seq64229);
var seq64229__$1 = cljs.core.next(seq64229);
return cljs_http.client.wrap_accept.cljs$core$IFn$_invoke$arity$variadic(G__64230,seq64229__$1);
});
cljs_http.client.wrap_content_type = (function cljs_http$client$wrap_content_type(var_args){
var args__5747__auto__ = [];
var len__5740__auto___64242 = arguments.length;
var i__5741__auto___64243 = (0);
while(true){
if((i__5741__auto___64243 < len__5740__auto___64242)){
args__5747__auto__.push((arguments[i__5741__auto___64243]));

var G__64244 = (i__5741__auto___64243 + (1));
i__5741__auto___64243 = G__64244;
continue;
} else {
}
break;
}

var argseq__5748__auto__ = ((((1) < args__5747__auto__.length))?(new cljs.core.IndexedSeq(args__5747__auto__.slice((1)),(0))):null);
return cljs_http.client.wrap_content_type.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5748__auto__);
});

cljs_http.client.wrap_content_type.cljs$core$IFn$_invoke$arity$variadic = (function (client,p__64239){
var vec__64240 = p__64239;
var content_type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64240,(0),null);
return ((function (vec__64240,content_type){
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
var G__64241 = cljs.core.assoc_in(request,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$headers,"content-type"], null),content_type__$1);
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(G__64241) : client.call(null,G__64241));
} else {
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(request) : client.call(null,request));
}
});
;})(vec__64240,content_type))
});

cljs_http.client.wrap_content_type.cljs$lang$maxFixedArity = (1);

cljs_http.client.wrap_content_type.cljs$lang$applyTo = (function (seq64237){
var G__64238 = cljs.core.first(seq64237);
var seq64237__$1 = cljs.core.next(seq64237);
return cljs_http.client.wrap_content_type.cljs$core$IFn$_invoke$arity$variadic(G__64238,seq64237__$1);
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
var map__64248 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs_http.client.default_transit_opts,cljs.core.cst$kw$transit_DASH_opts.cljs$core$IFn$_invoke$arity$1(request)], 0));
var map__64248__$1 = ((((!((map__64248 == null)))?((((map__64248.cljs$lang$protocol_mask$partition0$ & (64))) || (map__64248.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__64248):map__64248);
var encoding = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__64248__$1,cljs.core.cst$kw$encoding);
var encoding_opts = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__64248__$1,cljs.core.cst$kw$encoding_DASH_opts);
var headers = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 1, ["content-type","application/transit+json"], null),cljs.core.cst$kw$headers.cljs$core$IFn$_invoke$arity$1(request)], 0));
var G__64250 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(request,cljs.core.cst$kw$transit_DASH_params),cljs.core.cst$kw$body,cljs_http.util.transit_encode(params,encoding,encoding_opts)),cljs.core.cst$kw$headers,headers);
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(G__64250) : client.call(null,G__64250));
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
var map__64255 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs_http.client.default_transit_opts,cljs.core.cst$kw$transit_DASH_opts.cljs$core$IFn$_invoke$arity$1(request)], 0));
var map__64255__$1 = ((((!((map__64255 == null)))?((((map__64255.cljs$lang$protocol_mask$partition0$ & (64))) || (map__64255.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__64255):map__64255);
var decoding = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__64255__$1,cljs.core.cst$kw$decoding);
var decoding_opts = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__64255__$1,cljs.core.cst$kw$decoding_DASH_opts);
var transit_decode = ((function (map__64255,map__64255__$1,decoding,decoding_opts){
return (function (p1__64251_SHARP_){
return cljs_http.util.transit_decode(p1__64251_SHARP_,decoding,decoding_opts);
});})(map__64255,map__64255__$1,decoding,decoding_opts))
;
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$2(((function (map__64255,map__64255__$1,decoding,decoding_opts,transit_decode){
return (function (p1__64252_SHARP_){
return cljs_http.client.decode_body(p1__64252_SHARP_,transit_decode,"application/transit+json",cljs.core.cst$kw$request_DASH_method.cljs$core$IFn$_invoke$arity$1(request));
});})(map__64255,map__64255__$1,decoding,decoding_opts,transit_decode))
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
var G__64258 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(request,cljs.core.cst$kw$json_DASH_params),cljs.core.cst$kw$body,cljs_http.util.json_encode(params)),cljs.core.cst$kw$headers,headers);
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(G__64258) : client.call(null,G__64258));
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
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$2((function (p1__64259_SHARP_){
return cljs_http.client.decode_body(p1__64259_SHARP_,cljs_http.util.json_decode,"application/json",cljs.core.cst$kw$request_DASH_method.cljs$core$IFn$_invoke$arity$1(request));
}),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(request) : client.call(null,request))], null));
});
});
cljs_http.client.wrap_query_params = (function cljs_http$client$wrap_query_params(client){
return (function (p__64264){
var map__64265 = p__64264;
var map__64265__$1 = ((((!((map__64265 == null)))?((((map__64265.cljs$lang$protocol_mask$partition0$ & (64))) || (map__64265.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__64265):map__64265);
var req = map__64265__$1;
var query_params = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__64265__$1,cljs.core.cst$kw$query_DASH_params);
if(cljs.core.truth_(query_params)){
var G__64267 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(req,cljs.core.cst$kw$query_DASH_params),cljs.core.cst$kw$query_DASH_string,cljs_http.client.generate_query_string(query_params));
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(G__64267) : client.call(null,G__64267));
} else {
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(req) : client.call(null,req));
}
});
});
cljs_http.client.wrap_form_params = (function cljs_http$client$wrap_form_params(client){
return (function (p__64272){
var map__64273 = p__64272;
var map__64273__$1 = ((((!((map__64273 == null)))?((((map__64273.cljs$lang$protocol_mask$partition0$ & (64))) || (map__64273.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__64273):map__64273);
var request = map__64273__$1;
var form_params = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__64273__$1,cljs.core.cst$kw$form_DASH_params);
var request_method = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__64273__$1,cljs.core.cst$kw$request_DASH_method);
var headers = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__64273__$1,cljs.core.cst$kw$headers);
if(cljs.core.truth_((function (){var and__4670__auto__ = form_params;
if(cljs.core.truth_(and__4670__auto__)){
return new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$patch,null,cljs.core.cst$kw$delete,null,cljs.core.cst$kw$post,null,cljs.core.cst$kw$put,null], null), null).call(null,request_method);
} else {
return and__4670__auto__;
}
})())){
var headers__$1 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 1, ["content-type","application/x-www-form-urlencoded"], null),headers], 0));
var G__64275 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(request,cljs.core.cst$kw$form_DASH_params),cljs.core.cst$kw$body,cljs_http.client.generate_query_string(form_params)),cljs.core.cst$kw$headers,headers__$1);
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(G__64275) : client.call(null,G__64275));
} else {
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(request) : client.call(null,request));
}
});
});
cljs_http.client.generate_form_data = (function cljs_http$client$generate_form_data(params){
var form_data = (new FormData());
var seq__64282_64288 = cljs.core.seq(params);
var chunk__64283_64289 = null;
var count__64284_64290 = (0);
var i__64285_64291 = (0);
while(true){
if((i__64285_64291 < count__64284_64290)){
var vec__64286_64292 = chunk__64283_64289.cljs$core$IIndexed$_nth$arity$2(null,i__64285_64291);
var k_64293 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64286_64292,(0),null);
var v_64294 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64286_64292,(1),null);
if(cljs.core.coll_QMARK_(v_64294)){
form_data.append(cljs.core.name(k_64293),cljs.core.first(v_64294),cljs.core.second(v_64294));
} else {
form_data.append(cljs.core.name(k_64293),v_64294);
}

var G__64295 = seq__64282_64288;
var G__64296 = chunk__64283_64289;
var G__64297 = count__64284_64290;
var G__64298 = (i__64285_64291 + (1));
seq__64282_64288 = G__64295;
chunk__64283_64289 = G__64296;
count__64284_64290 = G__64297;
i__64285_64291 = G__64298;
continue;
} else {
var temp__4653__auto___64299 = cljs.core.seq(seq__64282_64288);
if(temp__4653__auto___64299){
var seq__64282_64300__$1 = temp__4653__auto___64299;
if(cljs.core.chunked_seq_QMARK_(seq__64282_64300__$1)){
var c__5485__auto___64301 = cljs.core.chunk_first(seq__64282_64300__$1);
var G__64302 = cljs.core.chunk_rest(seq__64282_64300__$1);
var G__64303 = c__5485__auto___64301;
var G__64304 = cljs.core.count(c__5485__auto___64301);
var G__64305 = (0);
seq__64282_64288 = G__64302;
chunk__64283_64289 = G__64303;
count__64284_64290 = G__64304;
i__64285_64291 = G__64305;
continue;
} else {
var vec__64287_64306 = cljs.core.first(seq__64282_64300__$1);
var k_64307 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64287_64306,(0),null);
var v_64308 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64287_64306,(1),null);
if(cljs.core.coll_QMARK_(v_64308)){
form_data.append(cljs.core.name(k_64307),cljs.core.first(v_64308),cljs.core.second(v_64308));
} else {
form_data.append(cljs.core.name(k_64307),v_64308);
}

var G__64309 = cljs.core.next(seq__64282_64300__$1);
var G__64310 = null;
var G__64311 = (0);
var G__64312 = (0);
seq__64282_64288 = G__64309;
chunk__64283_64289 = G__64310;
count__64284_64290 = G__64311;
i__64285_64291 = G__64312;
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
return (function (p__64317){
var map__64318 = p__64317;
var map__64318__$1 = ((((!((map__64318 == null)))?((((map__64318.cljs$lang$protocol_mask$partition0$ & (64))) || (map__64318.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__64318):map__64318);
var request = map__64318__$1;
var multipart_params = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__64318__$1,cljs.core.cst$kw$multipart_DASH_params);
var request_method = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__64318__$1,cljs.core.cst$kw$request_DASH_method);
if(cljs.core.truth_((function (){var and__4670__auto__ = multipart_params;
if(cljs.core.truth_(and__4670__auto__)){
return new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$patch,null,cljs.core.cst$kw$delete,null,cljs.core.cst$kw$post,null,cljs.core.cst$kw$put,null], null), null).call(null,request_method);
} else {
return and__4670__auto__;
}
})())){
var G__64320 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(request,cljs.core.cst$kw$multipart_DASH_params),cljs.core.cst$kw$body,cljs_http.client.generate_form_data(multipart_params));
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(G__64320) : client.call(null,G__64320));
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
var G__64322 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(req,cljs.core.cst$kw$method),cljs.core.cst$kw$request_DASH_method,m);
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(G__64322) : client.call(null,G__64322));
} else {
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(req) : client.call(null,req));
}
});
});
cljs_http.client.wrap_server_name = (function cljs_http$client$wrap_server_name(client,server_name){
return (function (p1__64323_SHARP_){
var G__64325 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__64323_SHARP_,cljs.core.cst$kw$server_DASH_name,server_name);
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(G__64325) : client.call(null,G__64325));
});
});
cljs_http.client.wrap_url = (function cljs_http$client$wrap_url(client){
return (function (p__64331){
var map__64332 = p__64331;
var map__64332__$1 = ((((!((map__64332 == null)))?((((map__64332.cljs$lang$protocol_mask$partition0$ & (64))) || (map__64332.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__64332):map__64332);
var req = map__64332__$1;
var query_params = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__64332__$1,cljs.core.cst$kw$query_DASH_params);
var temp__4651__auto__ = cljs_http.client.parse_url(cljs.core.cst$kw$url.cljs$core$IFn$_invoke$arity$1(req));
if(cljs.core.truth_(temp__4651__auto__)){
var spec = temp__4651__auto__;
var G__64334 = cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([req,spec], 0)),cljs.core.cst$kw$url),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$query_DASH_params], null),((function (spec,temp__4651__auto__,map__64332,map__64332__$1,req,query_params){
return (function (p1__64326_SHARP_){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([p1__64326_SHARP_,query_params], 0));
});})(spec,temp__4651__auto__,map__64332,map__64332__$1,req,query_params))
);
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(G__64334) : client.call(null,G__64334));
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
var len__5740__auto___64340 = arguments.length;
var i__5741__auto___64341 = (0);
while(true){
if((i__5741__auto___64341 < len__5740__auto___64340)){
args__5747__auto__.push((arguments[i__5741__auto___64341]));

var G__64342 = (i__5741__auto___64341 + (1));
i__5741__auto___64341 = G__64342;
continue;
} else {
}
break;
}

var argseq__5748__auto__ = ((((1) < args__5747__auto__.length))?(new cljs.core.IndexedSeq(args__5747__auto__.slice((1)),(0))):null);
return cljs_http.client.wrap_basic_auth.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5748__auto__);
});

cljs_http.client.wrap_basic_auth.cljs$core$IFn$_invoke$arity$variadic = (function (client,p__64337){
var vec__64338 = p__64337;
var credentials = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64338,(0),null);
return ((function (vec__64338,credentials){
return (function (req){
var credentials__$1 = (function (){var or__4682__auto__ = cljs.core.cst$kw$basic_DASH_auth.cljs$core$IFn$_invoke$arity$1(req);
if(cljs.core.truth_(or__4682__auto__)){
return or__4682__auto__;
} else {
return credentials;
}
})();
if(!(cljs.core.empty_QMARK_(credentials__$1))){
var G__64339 = cljs.core.assoc_in(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(req,cljs.core.cst$kw$basic_DASH_auth),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$headers,"authorization"], null),cljs_http.util.basic_auth(credentials__$1));
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(G__64339) : client.call(null,G__64339));
} else {
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(req) : client.call(null,req));
}
});
;})(vec__64338,credentials))
});

cljs_http.client.wrap_basic_auth.cljs$lang$maxFixedArity = (1);

cljs_http.client.wrap_basic_auth.cljs$lang$applyTo = (function (seq64335){
var G__64336 = cljs.core.first(seq64335);
var seq64335__$1 = cljs.core.next(seq64335);
return cljs_http.client.wrap_basic_auth.cljs$core$IFn$_invoke$arity$variadic(G__64336,seq64335__$1);
});
/**
 * Middleware converting the :oauth-token option into an Authorization header.
 */
cljs_http.client.wrap_oauth = (function cljs_http$client$wrap_oauth(client){
return (function (req){
var temp__4651__auto__ = cljs.core.cst$kw$oauth_DASH_token.cljs$core$IFn$_invoke$arity$1(req);
if(cljs.core.truth_(temp__4651__auto__)){
var oauth_token = temp__4651__auto__;
var G__64344 = cljs.core.assoc_in(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(req,cljs.core.cst$kw$oauth_DASH_token),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$headers,"authorization"], null),[cljs.core.str("Bearer "),cljs.core.str(oauth_token)].join(''));
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(G__64344) : client.call(null,G__64344));
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
var len__5740__auto___64350 = arguments.length;
var i__5741__auto___64351 = (0);
while(true){
if((i__5741__auto___64351 < len__5740__auto___64350)){
args__5747__auto__.push((arguments[i__5741__auto___64351]));

var G__64352 = (i__5741__auto___64351 + (1));
i__5741__auto___64351 = G__64352;
continue;
} else {
}
break;
}

var argseq__5748__auto__ = ((((1) < args__5747__auto__.length))?(new cljs.core.IndexedSeq(args__5747__auto__.slice((1)),(0))):null);
return cljs_http.client.delete$.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5748__auto__);
});

cljs_http.client.delete$.cljs$core$IFn$_invoke$arity$variadic = (function (url,p__64347){
var vec__64348 = p__64347;
var req = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64348,(0),null);
var G__64349 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([req,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$method,cljs.core.cst$kw$delete,cljs.core.cst$kw$url,url], null)], 0));
return (cljs_http.client.request.cljs$core$IFn$_invoke$arity$1 ? cljs_http.client.request.cljs$core$IFn$_invoke$arity$1(G__64349) : cljs_http.client.request.call(null,G__64349));
});

cljs_http.client.delete$.cljs$lang$maxFixedArity = (1);

cljs_http.client.delete$.cljs$lang$applyTo = (function (seq64345){
var G__64346 = cljs.core.first(seq64345);
var seq64345__$1 = cljs.core.next(seq64345);
return cljs_http.client.delete$.cljs$core$IFn$_invoke$arity$variadic(G__64346,seq64345__$1);
});
/**
 * Like #'request, but sets the :method and :url as appropriate.
 */
cljs_http.client.get = (function cljs_http$client$get(var_args){
var args__5747__auto__ = [];
var len__5740__auto___64358 = arguments.length;
var i__5741__auto___64359 = (0);
while(true){
if((i__5741__auto___64359 < len__5740__auto___64358)){
args__5747__auto__.push((arguments[i__5741__auto___64359]));

var G__64360 = (i__5741__auto___64359 + (1));
i__5741__auto___64359 = G__64360;
continue;
} else {
}
break;
}

var argseq__5748__auto__ = ((((1) < args__5747__auto__.length))?(new cljs.core.IndexedSeq(args__5747__auto__.slice((1)),(0))):null);
return cljs_http.client.get.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5748__auto__);
});

cljs_http.client.get.cljs$core$IFn$_invoke$arity$variadic = (function (url,p__64355){
var vec__64356 = p__64355;
var req = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64356,(0),null);
var G__64357 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([req,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$method,cljs.core.cst$kw$get,cljs.core.cst$kw$url,url], null)], 0));
return (cljs_http.client.request.cljs$core$IFn$_invoke$arity$1 ? cljs_http.client.request.cljs$core$IFn$_invoke$arity$1(G__64357) : cljs_http.client.request.call(null,G__64357));
});

cljs_http.client.get.cljs$lang$maxFixedArity = (1);

cljs_http.client.get.cljs$lang$applyTo = (function (seq64353){
var G__64354 = cljs.core.first(seq64353);
var seq64353__$1 = cljs.core.next(seq64353);
return cljs_http.client.get.cljs$core$IFn$_invoke$arity$variadic(G__64354,seq64353__$1);
});
/**
 * Like #'request, but sets the :method and :url as appropriate.
 */
cljs_http.client.head = (function cljs_http$client$head(var_args){
var args__5747__auto__ = [];
var len__5740__auto___64366 = arguments.length;
var i__5741__auto___64367 = (0);
while(true){
if((i__5741__auto___64367 < len__5740__auto___64366)){
args__5747__auto__.push((arguments[i__5741__auto___64367]));

var G__64368 = (i__5741__auto___64367 + (1));
i__5741__auto___64367 = G__64368;
continue;
} else {
}
break;
}

var argseq__5748__auto__ = ((((1) < args__5747__auto__.length))?(new cljs.core.IndexedSeq(args__5747__auto__.slice((1)),(0))):null);
return cljs_http.client.head.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5748__auto__);
});

cljs_http.client.head.cljs$core$IFn$_invoke$arity$variadic = (function (url,p__64363){
var vec__64364 = p__64363;
var req = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64364,(0),null);
var G__64365 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([req,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$method,cljs.core.cst$kw$head,cljs.core.cst$kw$url,url], null)], 0));
return (cljs_http.client.request.cljs$core$IFn$_invoke$arity$1 ? cljs_http.client.request.cljs$core$IFn$_invoke$arity$1(G__64365) : cljs_http.client.request.call(null,G__64365));
});

cljs_http.client.head.cljs$lang$maxFixedArity = (1);

cljs_http.client.head.cljs$lang$applyTo = (function (seq64361){
var G__64362 = cljs.core.first(seq64361);
var seq64361__$1 = cljs.core.next(seq64361);
return cljs_http.client.head.cljs$core$IFn$_invoke$arity$variadic(G__64362,seq64361__$1);
});
/**
 * Like #'request, but sets the :method and :url as appropriate.
 */
cljs_http.client.jsonp = (function cljs_http$client$jsonp(var_args){
var args__5747__auto__ = [];
var len__5740__auto___64374 = arguments.length;
var i__5741__auto___64375 = (0);
while(true){
if((i__5741__auto___64375 < len__5740__auto___64374)){
args__5747__auto__.push((arguments[i__5741__auto___64375]));

var G__64376 = (i__5741__auto___64375 + (1));
i__5741__auto___64375 = G__64376;
continue;
} else {
}
break;
}

var argseq__5748__auto__ = ((((1) < args__5747__auto__.length))?(new cljs.core.IndexedSeq(args__5747__auto__.slice((1)),(0))):null);
return cljs_http.client.jsonp.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5748__auto__);
});

cljs_http.client.jsonp.cljs$core$IFn$_invoke$arity$variadic = (function (url,p__64371){
var vec__64372 = p__64371;
var req = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64372,(0),null);
var G__64373 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([req,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$method,cljs.core.cst$kw$jsonp,cljs.core.cst$kw$url,url], null)], 0));
return (cljs_http.client.request.cljs$core$IFn$_invoke$arity$1 ? cljs_http.client.request.cljs$core$IFn$_invoke$arity$1(G__64373) : cljs_http.client.request.call(null,G__64373));
});

cljs_http.client.jsonp.cljs$lang$maxFixedArity = (1);

cljs_http.client.jsonp.cljs$lang$applyTo = (function (seq64369){
var G__64370 = cljs.core.first(seq64369);
var seq64369__$1 = cljs.core.next(seq64369);
return cljs_http.client.jsonp.cljs$core$IFn$_invoke$arity$variadic(G__64370,seq64369__$1);
});
/**
 * Like #'request, but sets the :method and :url as appropriate.
 */
cljs_http.client.move = (function cljs_http$client$move(var_args){
var args__5747__auto__ = [];
var len__5740__auto___64382 = arguments.length;
var i__5741__auto___64383 = (0);
while(true){
if((i__5741__auto___64383 < len__5740__auto___64382)){
args__5747__auto__.push((arguments[i__5741__auto___64383]));

var G__64384 = (i__5741__auto___64383 + (1));
i__5741__auto___64383 = G__64384;
continue;
} else {
}
break;
}

var argseq__5748__auto__ = ((((1) < args__5747__auto__.length))?(new cljs.core.IndexedSeq(args__5747__auto__.slice((1)),(0))):null);
return cljs_http.client.move.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5748__auto__);
});

cljs_http.client.move.cljs$core$IFn$_invoke$arity$variadic = (function (url,p__64379){
var vec__64380 = p__64379;
var req = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64380,(0),null);
var G__64381 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([req,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$method,cljs.core.cst$kw$move,cljs.core.cst$kw$url,url], null)], 0));
return (cljs_http.client.request.cljs$core$IFn$_invoke$arity$1 ? cljs_http.client.request.cljs$core$IFn$_invoke$arity$1(G__64381) : cljs_http.client.request.call(null,G__64381));
});

cljs_http.client.move.cljs$lang$maxFixedArity = (1);

cljs_http.client.move.cljs$lang$applyTo = (function (seq64377){
var G__64378 = cljs.core.first(seq64377);
var seq64377__$1 = cljs.core.next(seq64377);
return cljs_http.client.move.cljs$core$IFn$_invoke$arity$variadic(G__64378,seq64377__$1);
});
/**
 * Like #'request, but sets the :method and :url as appropriate.
 */
cljs_http.client.options = (function cljs_http$client$options(var_args){
var args__5747__auto__ = [];
var len__5740__auto___64390 = arguments.length;
var i__5741__auto___64391 = (0);
while(true){
if((i__5741__auto___64391 < len__5740__auto___64390)){
args__5747__auto__.push((arguments[i__5741__auto___64391]));

var G__64392 = (i__5741__auto___64391 + (1));
i__5741__auto___64391 = G__64392;
continue;
} else {
}
break;
}

var argseq__5748__auto__ = ((((1) < args__5747__auto__.length))?(new cljs.core.IndexedSeq(args__5747__auto__.slice((1)),(0))):null);
return cljs_http.client.options.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5748__auto__);
});

cljs_http.client.options.cljs$core$IFn$_invoke$arity$variadic = (function (url,p__64387){
var vec__64388 = p__64387;
var req = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64388,(0),null);
var G__64389 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([req,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$method,cljs.core.cst$kw$options,cljs.core.cst$kw$url,url], null)], 0));
return (cljs_http.client.request.cljs$core$IFn$_invoke$arity$1 ? cljs_http.client.request.cljs$core$IFn$_invoke$arity$1(G__64389) : cljs_http.client.request.call(null,G__64389));
});

cljs_http.client.options.cljs$lang$maxFixedArity = (1);

cljs_http.client.options.cljs$lang$applyTo = (function (seq64385){
var G__64386 = cljs.core.first(seq64385);
var seq64385__$1 = cljs.core.next(seq64385);
return cljs_http.client.options.cljs$core$IFn$_invoke$arity$variadic(G__64386,seq64385__$1);
});
/**
 * Like #'request, but sets the :method and :url as appropriate.
 */
cljs_http.client.patch = (function cljs_http$client$patch(var_args){
var args__5747__auto__ = [];
var len__5740__auto___64398 = arguments.length;
var i__5741__auto___64399 = (0);
while(true){
if((i__5741__auto___64399 < len__5740__auto___64398)){
args__5747__auto__.push((arguments[i__5741__auto___64399]));

var G__64400 = (i__5741__auto___64399 + (1));
i__5741__auto___64399 = G__64400;
continue;
} else {
}
break;
}

var argseq__5748__auto__ = ((((1) < args__5747__auto__.length))?(new cljs.core.IndexedSeq(args__5747__auto__.slice((1)),(0))):null);
return cljs_http.client.patch.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5748__auto__);
});

cljs_http.client.patch.cljs$core$IFn$_invoke$arity$variadic = (function (url,p__64395){
var vec__64396 = p__64395;
var req = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64396,(0),null);
var G__64397 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([req,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$method,cljs.core.cst$kw$patch,cljs.core.cst$kw$url,url], null)], 0));
return (cljs_http.client.request.cljs$core$IFn$_invoke$arity$1 ? cljs_http.client.request.cljs$core$IFn$_invoke$arity$1(G__64397) : cljs_http.client.request.call(null,G__64397));
});

cljs_http.client.patch.cljs$lang$maxFixedArity = (1);

cljs_http.client.patch.cljs$lang$applyTo = (function (seq64393){
var G__64394 = cljs.core.first(seq64393);
var seq64393__$1 = cljs.core.next(seq64393);
return cljs_http.client.patch.cljs$core$IFn$_invoke$arity$variadic(G__64394,seq64393__$1);
});
/**
 * Like #'request, but sets the :method and :url as appropriate.
 */
cljs_http.client.post = (function cljs_http$client$post(var_args){
var args__5747__auto__ = [];
var len__5740__auto___64406 = arguments.length;
var i__5741__auto___64407 = (0);
while(true){
if((i__5741__auto___64407 < len__5740__auto___64406)){
args__5747__auto__.push((arguments[i__5741__auto___64407]));

var G__64408 = (i__5741__auto___64407 + (1));
i__5741__auto___64407 = G__64408;
continue;
} else {
}
break;
}

var argseq__5748__auto__ = ((((1) < args__5747__auto__.length))?(new cljs.core.IndexedSeq(args__5747__auto__.slice((1)),(0))):null);
return cljs_http.client.post.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5748__auto__);
});

cljs_http.client.post.cljs$core$IFn$_invoke$arity$variadic = (function (url,p__64403){
var vec__64404 = p__64403;
var req = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64404,(0),null);
var G__64405 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([req,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$method,cljs.core.cst$kw$post,cljs.core.cst$kw$url,url], null)], 0));
return (cljs_http.client.request.cljs$core$IFn$_invoke$arity$1 ? cljs_http.client.request.cljs$core$IFn$_invoke$arity$1(G__64405) : cljs_http.client.request.call(null,G__64405));
});

cljs_http.client.post.cljs$lang$maxFixedArity = (1);

cljs_http.client.post.cljs$lang$applyTo = (function (seq64401){
var G__64402 = cljs.core.first(seq64401);
var seq64401__$1 = cljs.core.next(seq64401);
return cljs_http.client.post.cljs$core$IFn$_invoke$arity$variadic(G__64402,seq64401__$1);
});
/**
 * Like #'request, but sets the :method and :url as appropriate.
 */
cljs_http.client.put = (function cljs_http$client$put(var_args){
var args__5747__auto__ = [];
var len__5740__auto___64414 = arguments.length;
var i__5741__auto___64415 = (0);
while(true){
if((i__5741__auto___64415 < len__5740__auto___64414)){
args__5747__auto__.push((arguments[i__5741__auto___64415]));

var G__64416 = (i__5741__auto___64415 + (1));
i__5741__auto___64415 = G__64416;
continue;
} else {
}
break;
}

var argseq__5748__auto__ = ((((1) < args__5747__auto__.length))?(new cljs.core.IndexedSeq(args__5747__auto__.slice((1)),(0))):null);
return cljs_http.client.put.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5748__auto__);
});

cljs_http.client.put.cljs$core$IFn$_invoke$arity$variadic = (function (url,p__64411){
var vec__64412 = p__64411;
var req = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64412,(0),null);
var G__64413 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([req,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$method,cljs.core.cst$kw$put,cljs.core.cst$kw$url,url], null)], 0));
return (cljs_http.client.request.cljs$core$IFn$_invoke$arity$1 ? cljs_http.client.request.cljs$core$IFn$_invoke$arity$1(G__64413) : cljs_http.client.request.call(null,G__64413));
});

cljs_http.client.put.cljs$lang$maxFixedArity = (1);

cljs_http.client.put.cljs$lang$applyTo = (function (seq64409){
var G__64410 = cljs.core.first(seq64409);
var seq64409__$1 = cljs.core.next(seq64409);
return cljs_http.client.put.cljs$core$IFn$_invoke$arity$variadic(G__64410,seq64409__$1);
});
