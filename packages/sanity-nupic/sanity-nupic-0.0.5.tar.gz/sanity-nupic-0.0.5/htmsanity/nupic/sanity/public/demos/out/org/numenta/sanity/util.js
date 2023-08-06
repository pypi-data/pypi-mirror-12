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
