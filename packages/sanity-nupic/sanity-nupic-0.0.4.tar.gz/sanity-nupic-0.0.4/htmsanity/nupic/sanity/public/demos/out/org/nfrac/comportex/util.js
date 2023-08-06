// Compiled by ClojureScript 1.7.170 {:static-fns true, :optimize-constants true}
goog.provide('org.nfrac.comportex.util');
goog.require('cljs.core');
goog.require('clojure.test.check.random');
/**
 * Like two-argument get, but throws an exception if the key is
 * not found.
 */
org.nfrac.comportex.util.getx = (function org$nfrac$comportex$util$getx(m,k){
var e = cljs.core.get.cljs$core$IFn$_invoke$arity$3(m,k,cljs.core.cst$kw$org$nfrac$comportex$util_SLASH_sentinel);
if(!(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(e,cljs.core.cst$kw$org$nfrac$comportex$util_SLASH_sentinel))){
return e;
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("Missing required key",new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$map,m,cljs.core.cst$kw$key,k], null));
}
});
/**
 * Like two-argument get-in, but throws an exception if the key is
 * not found.
 */
org.nfrac.comportex.util.getx_in = (function org$nfrac$comportex$util$getx_in(m,ks){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(org.nfrac.comportex.util.getx,m,ks);
});
org.nfrac.comportex.util.abs = (function org$nfrac$comportex$util$abs(x){
if((x < (0))){
return (- x);
} else {
return x;
}
});
org.nfrac.comportex.util.round = (function org$nfrac$comportex$util$round(var_args){
var args34211 = [];
var len__5740__auto___34214 = arguments.length;
var i__5741__auto___34215 = (0);
while(true){
if((i__5741__auto___34215 < len__5740__auto___34214)){
args34211.push((arguments[i__5741__auto___34215]));

var G__34216 = (i__5741__auto___34215 + (1));
i__5741__auto___34215 = G__34216;
continue;
} else {
}
break;
}

var G__34213 = args34211.length;
switch (G__34213) {
case 1:
return org.nfrac.comportex.util.round.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return org.nfrac.comportex.util.round.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args34211.length)].join('')));

}
});

org.nfrac.comportex.util.round.cljs$core$IFn$_invoke$arity$1 = (function (x){
return Math.round(x);
});

org.nfrac.comportex.util.round.cljs$core$IFn$_invoke$arity$2 = (function (x,n){
var z = Math.pow(10.0,n);
return (org.nfrac.comportex.util.round.cljs$core$IFn$_invoke$arity$1((x * z)) / z);
});

org.nfrac.comportex.util.round.cljs$lang$maxFixedArity = 2;
org.nfrac.comportex.util.mean = (function org$nfrac$comportex$util$mean(xs){
return (cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._PLUS_,xs) / cljs.core.count(xs));
});
org.nfrac.comportex.util.rand = (function org$nfrac$comportex$util$rand(rng,lower,upper){
if((lower < upper)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(cljs.core.cst$sym$_LT_,cljs.core.cst$sym$lower,cljs.core.cst$sym$upper)], 0)))].join('')));
}

return ((clojure.test.check.random.rand_double(rng) * (upper - lower)) + lower);
});
/**
 * Uniform integer between lower (inclusive) and upper (exclusive).
 */
org.nfrac.comportex.util.rand_int = (function org$nfrac$comportex$util$rand_int(var_args){
var args34218 = [];
var len__5740__auto___34223 = arguments.length;
var i__5741__auto___34224 = (0);
while(true){
if((i__5741__auto___34224 < len__5740__auto___34223)){
args34218.push((arguments[i__5741__auto___34224]));

var G__34225 = (i__5741__auto___34224 + (1));
i__5741__auto___34224 = G__34225;
continue;
} else {
}
break;
}

var G__34220 = args34218.length;
switch (G__34220) {
case 2:
return org.nfrac.comportex.util.rand_int.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return org.nfrac.comportex.util.rand_int.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args34218.length)].join('')));

}
});

org.nfrac.comportex.util.rand_int.cljs$core$IFn$_invoke$arity$2 = (function (rng,upper){
return cljs.core.long$((function (){var G__34221 = (clojure.test.check.random.rand_double(rng) * upper);
return Math.floor(G__34221);
})());
});

org.nfrac.comportex.util.rand_int.cljs$core$IFn$_invoke$arity$3 = (function (rng,lower,upper){
return cljs.core.long$((function (){var G__34222 = ((clojure.test.check.random.rand_double(rng) * (upper - lower)) + lower);
return Math.floor(G__34222);
})());
});

org.nfrac.comportex.util.rand_int.cljs$lang$maxFixedArity = 3;
org.nfrac.comportex.util.rand_nth = (function org$nfrac$comportex$util$rand_nth(rng,xs){
return cljs.core.nth.cljs$core$IFn$_invoke$arity$2(xs,org.nfrac.comportex.util.rand_int.cljs$core$IFn$_invoke$arity$2(rng,cljs.core.count(xs)));
});
/**
 * http://en.wikipedia.org/wiki/Fisher–Yates_shuffle#The_modern_algorithm
 */
org.nfrac.comportex.util.fisher_yates = (function org$nfrac$comportex$util$fisher_yates(rng,coll){
var as = cljs.core.object_array.cljs$core$IFn$_invoke$arity$1(coll);
var i = (cljs.core.count(as) - (1));
var r = rng;
while(true){
if(((1) <= i)){
var vec__34228 = clojure.test.check.random.split(r);
var r1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34228,(0),null);
var r2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34228,(1),null);
var j = org.nfrac.comportex.util.rand_int.cljs$core$IFn$_invoke$arity$2(r1,(i + (1)));
var t = (as[i]);
(as[i] = (as[j]));

(as[j] = t);

var G__34229 = (i - (1));
var G__34230 = r2;
i = G__34229;
r = G__34230;
continue;
} else {
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.empty(coll),cljs.core.seq(as));
}
break;
}
});
org.nfrac.comportex.util.shuffle = (function org$nfrac$comportex$util$shuffle(rng,coll){
return org.nfrac.comportex.util.fisher_yates(rng,coll);
});
/**
 * Reservoir sample ct items from coll.
 */
org.nfrac.comportex.util.reservoir_sample = (function org$nfrac$comportex$util$reservoir_sample(rng,ct,coll){
var result = cljs.core.transient$(cljs.core.vec(cljs.core.take.cljs$core$IFn$_invoke$arity$2(ct,coll)));
var n = ct;
var coll__$1 = cljs.core.drop.cljs$core$IFn$_invoke$arity$2(ct,coll);
var r = rng;
while(true){
if(cljs.core.seq(coll__$1)){
var vec__34232 = clojure.test.check.random.split(r);
var r1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34232,(0),null);
var r2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34232,(1),null);
var pos = org.nfrac.comportex.util.rand_int.cljs$core$IFn$_invoke$arity$2(r1,n);
var G__34233 = (((pos < ct))?cljs.core.assoc_BANG_.cljs$core$IFn$_invoke$arity$3(result,pos,cljs.core.first(coll__$1)):result);
var G__34234 = (n + (1));
var G__34235 = cljs.core.rest(coll__$1);
var G__34236 = r2;
result = G__34233;
n = G__34234;
coll__$1 = G__34235;
r = G__34236;
continue;
} else {
return cljs.core.persistent_BANG_(result);
}
break;
}
});
/**
 * Sample ct items with replacement (i.e. possibly with duplicates) from coll.
 */
org.nfrac.comportex.util.sample = (function org$nfrac$comportex$util$sample(rng,ct,coll){
if((ct > (0))){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__34237_SHARP_){
return org.nfrac.comportex.util.rand_nth(p1__34237_SHARP_,coll);
}),clojure.test.check.random.split_n(rng,ct));
} else {
return null;
}
});
org.nfrac.comportex.util.quantile = (function org$nfrac$comportex$util$quantile(xs,p){
return cljs.core.nth.cljs$core$IFn$_invoke$arity$2(cljs.core.sort.cljs$core$IFn$_invoke$arity$1(xs),cljs.core.long$((p * (cljs.core.count(xs) - (1)))));
});
/**
 * Returns a function transforming uniform randoms in [0 1] to variates on a
 * Triangular distribution. http://en.wikipedia.org/wiki/Triangular_distribution
 * 
 * * a - lower bound
 * 
 * * b - upper bound
 * 
 * * c - peak of probability density (within bounds)
 */
org.nfrac.comportex.util.triangular = (function org$nfrac$comportex$util$triangular(a,b,c){
var Fc = ((c - a) / (b - a));
return ((function (Fc){
return (function (u){
if((u < Fc)){
return (a + (function (){var G__34240 = ((u * (b - a)) * (c - a));
return Math.sqrt(G__34240);
})());
} else {
return (b - (function (){var G__34241 = ((((1) - u) * (b - a)) * (b - c));
return Math.sqrt(G__34241);
})());
}
});
;})(Fc))
});
/**
 * Same as `(count (filter pred coll))`, but faster.
 */
org.nfrac.comportex.util.count_filter = (function org$nfrac$comportex$util$count_filter(pred,coll){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (sum,x){
if(cljs.core.truth_((pred.cljs$core$IFn$_invoke$arity$1 ? pred.cljs$core$IFn$_invoke$arity$1(x) : pred.call(null,x)))){
return (sum + (1));
} else {
return sum;
}
}),(0),coll);
});
/**
 * Like the built-in group-by, but taking key-value pairs and building
 * maps instead of vectors for the groups. It is tuned for performance
 * with many values per key. `f` is a function taking 2 arguments, the
 * key and value.
 */
org.nfrac.comportex.util.group_by_maps = (function org$nfrac$comportex$util$group_by_maps(var_args){
var args34242 = [];
var len__5740__auto___34249 = arguments.length;
var i__5741__auto___34250 = (0);
while(true){
if((i__5741__auto___34250 < len__5740__auto___34249)){
args34242.push((arguments[i__5741__auto___34250]));

var G__34251 = (i__5741__auto___34250 + (1));
i__5741__auto___34250 = G__34251;
continue;
} else {
}
break;
}

var G__34244 = args34242.length;
switch (G__34244) {
case 2:
return org.nfrac.comportex.util.group_by_maps.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return org.nfrac.comportex.util.group_by_maps.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args34242.length)].join('')));

}
});

org.nfrac.comportex.util.group_by_maps.cljs$core$IFn$_invoke$arity$2 = (function (f,kvs){
return org.nfrac.comportex.util.group_by_maps.cljs$core$IFn$_invoke$arity$3(f,kvs,cljs.core.PersistentArrayMap.EMPTY);
});

org.nfrac.comportex.util.group_by_maps.cljs$core$IFn$_invoke$arity$3 = (function (f,kvs,init_m){
return cljs.core.persistent_BANG_(cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (m,p__34245){
var vec__34246 = p__34245;
var g = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34246,(0),null);
var items = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34246,(1),null);
return cljs.core.assoc_BANG_.cljs$core$IFn$_invoke$arity$3(m,g,cljs.core.persistent_BANG_(items));
}),cljs.core.transient$(cljs.core.PersistentArrayMap.EMPTY),cljs.core.persistent_BANG_(cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (m,p__34247){
var vec__34248 = p__34247;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34248,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34248,(1),null);
var g = (f.cljs$core$IFn$_invoke$arity$2 ? f.cljs$core$IFn$_invoke$arity$2(k,v) : f.call(null,k,v));
var items = cljs.core.get.cljs$core$IFn$_invoke$arity$3(m,g,cljs.core.transient$(init_m));
return cljs.core.assoc_BANG_.cljs$core$IFn$_invoke$arity$3(m,g,cljs.core.assoc_BANG_.cljs$core$IFn$_invoke$arity$3(items,k,v));
}),cljs.core.transient$(cljs.core.PersistentArrayMap.EMPTY),kvs))));
});

org.nfrac.comportex.util.group_by_maps.cljs$lang$maxFixedArity = 3;
/**
 * Transforms a transient map or vector `m` applying function `f` to
 *   the values under keys `ks`.
 */
org.nfrac.comportex.util.update_each_BANG_ = (function org$nfrac$comportex$util$update_each_BANG_(m,ks,f){
if(cljs.core.empty_QMARK_(ks)){
return m;
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (m__$1,k){
return cljs.core.assoc_BANG_.cljs$core$IFn$_invoke$arity$3(m__$1,k,(function (){var G__34254 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(m__$1,k);
return (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(G__34254) : f.call(null,G__34254));
})());
}),m,ks);
}
});
/**
 * Transforms a map or vector `m` applying function `f` to the values
 *   under keys `ks`.
 */
org.nfrac.comportex.util.update_each = (function org$nfrac$comportex$util$update_each(m,ks,f){
if(cljs.core.empty_QMARK_(ks)){
return m;
} else {
return cljs.core.persistent_BANG_(org.nfrac.comportex.util.update_each_BANG_(cljs.core.transient$(m),ks,f));
}
});
org.nfrac.comportex.util.mapish_QMARK_ = (function org$nfrac$comportex$util$mapish_QMARK_(m){
return ((m == null)) || (cljs.core.map_QMARK_(m));
});
/**
 * Like merge-with, but merges maps recursively, applying the given fn
 *   only when there's a non-map at a particular level.
 */
org.nfrac.comportex.util.deep_merge_with = (function org$nfrac$comportex$util$deep_merge_with(var_args){
var args__5747__auto__ = [];
var len__5740__auto___34257 = arguments.length;
var i__5741__auto___34258 = (0);
while(true){
if((i__5741__auto___34258 < len__5740__auto___34257)){
args__5747__auto__.push((arguments[i__5741__auto___34258]));

var G__34259 = (i__5741__auto___34258 + (1));
i__5741__auto___34258 = G__34259;
continue;
} else {
}
break;
}

var argseq__5748__auto__ = ((((1) < args__5747__auto__.length))?(new cljs.core.IndexedSeq(args__5747__auto__.slice((1)),(0))):null);
return org.nfrac.comportex.util.deep_merge_with.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5748__auto__);
});

org.nfrac.comportex.util.deep_merge_with.cljs$core$IFn$_invoke$arity$variadic = (function (f,maps){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2((function() { 
var org$nfrac$comportex$util$m__delegate = function (maps__$1){
if(cljs.core.every_QMARK_(org.nfrac.comportex.util.mapish_QMARK_,maps__$1)){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.merge_with,org$nfrac$comportex$util$m,maps__$1);
} else {
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(f,maps__$1);
}
};
var org$nfrac$comportex$util$m = function (var_args){
var maps__$1 = null;
if (arguments.length > 0) {
var G__34260__i = 0, G__34260__a = new Array(arguments.length -  0);
while (G__34260__i < G__34260__a.length) {G__34260__a[G__34260__i] = arguments[G__34260__i + 0]; ++G__34260__i;}
  maps__$1 = new cljs.core.IndexedSeq(G__34260__a,0);
} 
return org$nfrac$comportex$util$m__delegate.call(this,maps__$1);};
org$nfrac$comportex$util$m.cljs$lang$maxFixedArity = 0;
org$nfrac$comportex$util$m.cljs$lang$applyTo = (function (arglist__34261){
var maps__$1 = cljs.core.seq(arglist__34261);
return org$nfrac$comportex$util$m__delegate(maps__$1);
});
org$nfrac$comportex$util$m.cljs$core$IFn$_invoke$arity$variadic = org$nfrac$comportex$util$m__delegate;
return org$nfrac$comportex$util$m;
})()
,maps);
});

org.nfrac.comportex.util.deep_merge_with.cljs$lang$maxFixedArity = (1);

org.nfrac.comportex.util.deep_merge_with.cljs$lang$applyTo = (function (seq34255){
var G__34256 = cljs.core.first(seq34255);
var seq34255__$1 = cljs.core.next(seq34255);
return org.nfrac.comportex.util.deep_merge_with.cljs$core$IFn$_invoke$arity$variadic(G__34256,seq34255__$1);
});
/**
 * Like merge, but merges maps recursively.
 */
org.nfrac.comportex.util.deep_merge = (function org$nfrac$comportex$util$deep_merge(var_args){
var args__5747__auto__ = [];
var len__5740__auto___34263 = arguments.length;
var i__5741__auto___34264 = (0);
while(true){
if((i__5741__auto___34264 < len__5740__auto___34263)){
args__5747__auto__.push((arguments[i__5741__auto___34264]));

var G__34265 = (i__5741__auto___34264 + (1));
i__5741__auto___34264 = G__34265;
continue;
} else {
}
break;
}

var argseq__5748__auto__ = ((((0) < args__5747__auto__.length))?(new cljs.core.IndexedSeq(args__5747__auto__.slice((0)),(0))):null);
return org.nfrac.comportex.util.deep_merge.cljs$core$IFn$_invoke$arity$variadic(argseq__5748__auto__);
});

org.nfrac.comportex.util.deep_merge.cljs$core$IFn$_invoke$arity$variadic = (function (maps){
if(cljs.core.every_QMARK_(org.nfrac.comportex.util.mapish_QMARK_,maps)){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.merge_with,org.nfrac.comportex.util.deep_merge,maps);
} else {
return cljs.core.last(maps);
}
});

org.nfrac.comportex.util.deep_merge.cljs$lang$maxFixedArity = (0);

org.nfrac.comportex.util.deep_merge.cljs$lang$applyTo = (function (seq34262){
return org.nfrac.comportex.util.deep_merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq34262));
});
/**
 * Transforms a map `m` applying function `f` to each value.
 */
org.nfrac.comportex.util.remap = (function org$nfrac$comportex$util$remap(f,m){
return cljs.core.into.cljs$core$IFn$_invoke$arity$3((function (){var or__4682__auto__ = cljs.core.empty(m);
if(cljs.core.truth_(or__4682__auto__)){
return or__4682__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})(),cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (p__34268){
var vec__34269 = p__34268;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34269,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34269,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,(f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(v) : f.call(null,v))], null);
})),m);
});
/**
 * Like `(reverse (take n (keys (sort-by val > m))))` but faster.
 */
org.nfrac.comportex.util.top_n_keys_by_value = (function org$nfrac$comportex$util$top_n_keys_by_value(n,m){
if((n <= (0))){
return cljs.core.PersistentVector.EMPTY;
} else {
if((n === (1))){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.key(cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.max_key,cljs.core.val,cljs.core.seq(m)))], null);
} else {
var ms = cljs.core.seq(m);
var am = cljs.core.sorted_map_by(((function (ms){
return (function (p1__34270_SHARP_,p2__34271_SHARP_){
return cljs.core.compare(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(m.cljs$core$IFn$_invoke$arity$1 ? m.cljs$core$IFn$_invoke$arity$1(p1__34270_SHARP_) : m.call(null,p1__34270_SHARP_)),p1__34270_SHARP_], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(m.cljs$core$IFn$_invoke$arity$1 ? m.cljs$core$IFn$_invoke$arity$1(p2__34271_SHARP_) : m.call(null,p2__34271_SHARP_)),p2__34271_SHARP_], null));
});})(ms))
);
var curr_min = -1.0;
while(true){
if(cljs.core.empty_QMARK_(ms)){
return cljs.core.keys(am);
} else {
var vec__34273 = cljs.core.first(ms);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34273,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34273,(1),null);
if(cljs.core.empty_QMARK_(am)){
var G__34274 = cljs.core.next(ms);
var G__34275 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(am,k,v);
var G__34276 = v;
ms = G__34274;
am = G__34275;
curr_min = G__34276;
continue;
} else {
if((cljs.core.count(am) < n)){
var G__34277 = cljs.core.next(ms);
var G__34278 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(am,k,v);
var G__34279 = (function (){var x__5020__auto__ = curr_min;
var y__5021__auto__ = v;
return ((x__5020__auto__ < y__5021__auto__) ? x__5020__auto__ : y__5021__auto__);
})();
ms = G__34277;
am = G__34278;
curr_min = G__34279;
continue;
} else {
if((v > curr_min)){
var new_am = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(am,cljs.core.first(cljs.core.keys(am))),k,v);
var G__34280 = cljs.core.next(ms);
var G__34281 = new_am;
var G__34282 = cljs.core.first(cljs.core.vals(new_am));
ms = G__34280;
am = G__34281;
curr_min = G__34282;
continue;
} else {
var G__34283 = cljs.core.next(ms);
var G__34284 = am;
var G__34285 = curr_min;
ms = G__34283;
am = G__34284;
curr_min = G__34285;
continue;

}
}
}
}
break;
}

}
}
});
/**
 * Returns a collection of
 *   `[(take w0 coll) (take w1 (drop w0 coll)) ...`
 *   and ending with a sequence containing the remainder.
 */
org.nfrac.comportex.util.splits_at = (function org$nfrac$comportex$util$splits_at(ws,coll){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (subcolls,w){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.drop_last.cljs$core$IFn$_invoke$arity$1(subcolls),cljs.core.split_at(w,cljs.core.last(subcolls)));
}),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [coll], null),ws);
});
/**
 * Returns a collection of
 *   `[(take-while pred0 coll) (take-while pred1 (drop-while pred0 coll)) ...`
 *   and ending with a sequence containing the remainder.
 */
org.nfrac.comportex.util.splits_with = (function org$nfrac$comportex$util$splits_with(preds,coll){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (subcolls,pred){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.drop_last.cljs$core$IFn$_invoke$arity$1(subcolls),cljs.core.split_with(pred,cljs.core.last(subcolls)));
}),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [coll], null),preds);
});
/**
 * Using the provided widths and a coll of colls of indices, lazily adjust
 *   each index so that each coll of indices starts where the previous coll ended.
 *   Lazily concat all results.
 */
org.nfrac.comportex.util.align_indices = (function org$nfrac$comportex$util$align_indices(var_args){
var args34288 = [];
var len__5740__auto___34292 = arguments.length;
var i__5741__auto___34293 = (0);
while(true){
if((i__5741__auto___34293 < len__5740__auto___34292)){
args34288.push((arguments[i__5741__auto___34293]));

var G__34294 = (i__5741__auto___34293 + (1));
i__5741__auto___34293 = G__34294;
continue;
} else {
}
break;
}

var G__34290 = args34288.length;
switch (G__34290) {
case 1:
return org.nfrac.comportex.util.align_indices.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return org.nfrac.comportex.util.align_indices.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args34288.length)].join('')));

}
});

org.nfrac.comportex.util.align_indices.cljs$core$IFn$_invoke$arity$1 = (function (widths){
return cljs.core.cst$kw$not_DASH_implemented;
});

org.nfrac.comportex.util.align_indices.cljs$core$IFn$_invoke$arity$2 = (function (widths,collcoll){
var vec__34291 = collcoll;
var leftmost = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34291,(0),null);
var others = cljs.core.nthnext(vec__34291,(1));
var offs = cljs.core.reductions.cljs$core$IFn$_invoke$arity$2(cljs.core._PLUS_,widths);
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(leftmost,cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(((function (vec__34291,leftmost,others,offs){
return (function (p1__34286_SHARP_,p2__34287_SHARP_){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.partial.cljs$core$IFn$_invoke$arity$2(cljs.core._PLUS_,p1__34286_SHARP_),p2__34287_SHARP_);
});})(vec__34291,leftmost,others,offs))
,cljs.core.array_seq([offs,others], 0)));
});

org.nfrac.comportex.util.align_indices.cljs$lang$maxFixedArity = 2;
/**
 * Partition a sorted seq of indices into `(count widths)` seqs of unshifted
 *   indices. Determine boundaries via `widths`. `aligned-is` must be sorted.
 */
org.nfrac.comportex.util.unalign_indices = (function org$nfrac$comportex$util$unalign_indices(widths,aligned_is){
var offs = cljs.core.drop.cljs$core$IFn$_invoke$arity$2((1),cljs.core.reductions.cljs$core$IFn$_invoke$arity$3(cljs.core._PLUS_,(0),widths));
var vec__34298 = org.nfrac.comportex.util.splits_with(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.partial.cljs$core$IFn$_invoke$arity$2(cljs.core.partial,cljs.core._GT_),offs),aligned_is);
var leftmost = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34298,(0),null);
var others = cljs.core.nthnext(vec__34298,(1));
var shifted = cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.vector,leftmost,cljs.core.map.cljs$core$IFn$_invoke$arity$3(((function (offs,vec__34298,leftmost,others){
return (function (section,offset){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (offs,vec__34298,leftmost,others){
return (function (p1__34296_SHARP_){
return (p1__34296_SHARP_ - offset);
});})(offs,vec__34298,leftmost,others))
,section);
});})(offs,vec__34298,leftmost,others))
,others,offs));
if(cljs.core.empty_QMARK_(cljs.core.last(shifted))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("No indices should be beyond the final offset."),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(cljs.core.cst$sym$empty_QMARK_,cljs.core.list(cljs.core.cst$sym$last,cljs.core.cst$sym$shifted))], 0)))].join('')));
}

return cljs.core.drop_last.cljs$core$IFn$_invoke$arity$1(shifted);
});
org.nfrac.comportex.util.empty_queue = cljs.core.PersistentQueue.EMPTY;
/**
 * Returns a function that adds a metadata key `meta-key` to its
 * argument, being a #queue of the last `keep-n` values extracted
 * using `value-fn`.
 */
org.nfrac.comportex.util.keep_history_middleware = (function org$nfrac$comportex$util$keep_history_middleware(keep_n,value_fn,meta_key){
var hist = (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(org.nfrac.comportex.util.empty_queue) : cljs.core.atom.call(null,org.nfrac.comportex.util.empty_queue));
return ((function (hist){
return (function (x){
return cljs.core.vary_meta.cljs$core$IFn$_invoke$arity$4(x,cljs.core.assoc,meta_key,cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(hist,((function (hist){
return (function (h){
var h2 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(h,(value_fn.cljs$core$IFn$_invoke$arity$1 ? value_fn.cljs$core$IFn$_invoke$arity$1(x) : value_fn.call(null,x)));
if((cljs.core.count(h) >= keep_n)){
return cljs.core.pop(h2);
} else {
return h2;
}
});})(hist))
));
});
;})(hist))
});
/**
 * Returns a function that adds a metadata key `meta-key` to its
 * argument, being a map of the frequencies of values extracted
 * using `value-fn`.
 */
org.nfrac.comportex.util.frequencies_middleware = (function org$nfrac$comportex$util$frequencies_middleware(value_fn,meta_key){
var freqs = (function (){var G__34300 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__34300) : cljs.core.atom.call(null,G__34300));
})();
return ((function (freqs){
return (function (x){
return cljs.core.vary_meta.cljs$core$IFn$_invoke$arity$4(x,cljs.core.assoc,meta_key,cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(freqs,((function (freqs){
return (function (m){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(m,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(value_fn.cljs$core$IFn$_invoke$arity$1 ? value_fn.cljs$core$IFn$_invoke$arity$1(x) : value_fn.call(null,x))], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.inc,(0)));
});})(freqs))
));
});
;})(freqs))
});
