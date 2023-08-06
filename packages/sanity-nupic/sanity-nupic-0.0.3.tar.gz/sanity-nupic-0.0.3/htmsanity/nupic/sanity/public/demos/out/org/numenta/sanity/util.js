// Compiled by ClojureScript 1.7.170 {:static-fns true, :optimize-constants true}
goog.provide('org.numenta.sanity.util');
goog.require('cljs.core');
goog.require('cljs.core.async');
goog.require('clojure.walk');
org.numenta.sanity.util.tap_c = (function org$numenta$sanity$util$tap_c(mult){
var c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2(mult,c);

return c;
});
org.numenta.sanity.util.index_of = (function org$numenta$sanity$util$index_of(coll,pred){
return cljs.core.first(cljs.core.keep_indexed.cljs$core$IFn$_invoke$arity$2((function (i,v){
if(cljs.core.truth_((pred.cljs$core$IFn$_invoke$arity$1 ? pred.cljs$core$IFn$_invoke$arity$1(v) : pred.call(null,v)))){
return i;
} else {
return null;
}
}),coll));
});
/**
 * Recursively transforms all map keys from strings to keywords.
 *   Like `clojure.walk/keywordize-keys`, but does not transform records.
 */
org.numenta.sanity.util.keywordize_keys_STAR_ = (function org$numenta$sanity$util$keywordize_keys_STAR_(m){
var f = (function (p__39884){
var vec__39885 = p__39884;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39885,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39885,(1),null);
if(typeof k === 'string'){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(k),v], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,v], null);
}
});
return clojure.walk.postwalk(((function (f){
return (function (x){
if((cljs.core.map_QMARK_(x)) && (!(cljs.core.record_QMARK_(x)))){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2(f,x));
} else {
return x;
}
});})(f))
,m);
});
/**
 * Recursively transforms all map keys from keywords to strings.
 *   Like `clojure.walk/stringify-keys`, but does not transform records.
 */
org.numenta.sanity.util.stringify_keys_STAR_ = (function org$numenta$sanity$util$stringify_keys_STAR_(m){
var f = (function (p__39888){
var vec__39889 = p__39888;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39889,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39889,(1),null);
if((k instanceof cljs.core.Keyword)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.name(k),v], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,v], null);
}
});
return clojure.walk.postwalk(((function (f){
return (function (x){
if((cljs.core.map_QMARK_(x)) && (!(cljs.core.record_QMARK_(x)))){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2(f,x));
} else {
return x;
}
});})(f))
,m);
});
