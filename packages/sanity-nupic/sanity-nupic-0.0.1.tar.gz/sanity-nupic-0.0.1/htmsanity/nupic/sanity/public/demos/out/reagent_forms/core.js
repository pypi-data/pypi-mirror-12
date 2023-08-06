// Compiled by ClojureScript 1.7.170 {:static-fns true, :optimize-constants true}
goog.provide('reagent_forms.core');
goog.require('cljs.core');
goog.require('clojure.walk');
goog.require('clojure.string');
goog.require('goog.string');
goog.require('goog.string.format');
goog.require('reagent.core');
goog.require('reagent_forms.datepicker');
reagent_forms.core.value_of = (function reagent_forms$core$value_of(element){
return element.target.value;
});
reagent_forms.core.id__GT_path = cljs.core.memoize((function (id){
var segments = clojure.string.split.cljs$core$IFn$_invoke$arity$2(cljs.core.subs.cljs$core$IFn$_invoke$arity$2([cljs.core.str(id)].join(''),(1)),/\./);
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.keyword,segments);
}));
reagent_forms.core.set_doc_value = (function reagent_forms$core$set_doc_value(doc,id,value,events){
var path = (reagent_forms.core.id__GT_path.cljs$core$IFn$_invoke$arity$1 ? reagent_forms.core.id__GT_path.cljs$core$IFn$_invoke$arity$1(id) : reagent_forms.core.id__GT_path.call(null,id));
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (path){
return (function (p1__60473_SHARP_,p2__60472_SHARP_){
var or__4682__auto__ = (p2__60472_SHARP_.cljs$core$IFn$_invoke$arity$3 ? p2__60472_SHARP_.cljs$core$IFn$_invoke$arity$3(path,value,p1__60473_SHARP_) : p2__60472_SHARP_.call(null,path,value,p1__60473_SHARP_));
if(cljs.core.truth_(or__4682__auto__)){
return or__4682__auto__;
} else {
return p1__60473_SHARP_;
}
});})(path))
,cljs.core.assoc_in(doc,path,value),events);
});
reagent_forms.core.mk_save_fn = (function reagent_forms$core$mk_save_fn(doc,events){
return (function (id,value){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(doc,reagent_forms.core.set_doc_value,id,value,cljs.core.array_seq([events], 0));
});
});
reagent_forms.core.wrap_get_fn = (function reagent_forms$core$wrap_get_fn(get,wrapper){
return (function (id){
var G__60475 = (get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id));
return (wrapper.cljs$core$IFn$_invoke$arity$1 ? wrapper.cljs$core$IFn$_invoke$arity$1(G__60475) : wrapper.call(null,G__60475));
});
});
reagent_forms.core.wrap_save_fn = (function reagent_forms$core$wrap_save_fn(save_BANG_,wrapper){
return (function (id,value){
var G__60478 = id;
var G__60479 = (wrapper.cljs$core$IFn$_invoke$arity$1 ? wrapper.cljs$core$IFn$_invoke$arity$1(value) : wrapper.call(null,value));
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(G__60478,G__60479) : save_BANG_.call(null,G__60478,G__60479));
});
});
reagent_forms.core.wrap_fns = (function reagent_forms$core$wrap_fns(opts,node){
return new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$doc,cljs.core.cst$kw$doc.cljs$core$IFn$_invoke$arity$1(opts),cljs.core.cst$kw$get,(function (){var temp__4651__auto__ = cljs.core.cst$kw$in_DASH_fn.cljs$core$IFn$_invoke$arity$1(cljs.core.second(node));
if(cljs.core.truth_(temp__4651__auto__)){
var in_fn = temp__4651__auto__;
return reagent_forms.core.wrap_get_fn(cljs.core.cst$kw$get.cljs$core$IFn$_invoke$arity$1(opts),in_fn);
} else {
return cljs.core.cst$kw$get.cljs$core$IFn$_invoke$arity$1(opts);
}
})(),cljs.core.cst$kw$save_BANG_,(function (){var temp__4651__auto__ = cljs.core.cst$kw$out_DASH_fn.cljs$core$IFn$_invoke$arity$1(cljs.core.second(node));
if(cljs.core.truth_(temp__4651__auto__)){
var out_fn = temp__4651__auto__;
return reagent_forms.core.wrap_save_fn(cljs.core.cst$kw$save_BANG_.cljs$core$IFn$_invoke$arity$1(opts),out_fn);
} else {
return cljs.core.cst$kw$save_BANG_.cljs$core$IFn$_invoke$arity$1(opts);
}
})()], null);
});
if(typeof reagent_forms.core.format_type !== 'undefined'){
} else {
reagent_forms.core.format_type = (function (){var method_table__5595__auto__ = (function (){var G__60480 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__60480) : cljs.core.atom.call(null,G__60480));
})();
var prefer_table__5596__auto__ = (function (){var G__60481 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__60481) : cljs.core.atom.call(null,G__60481));
})();
var method_cache__5597__auto__ = (function (){var G__60482 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__60482) : cljs.core.atom.call(null,G__60482));
})();
var cached_hierarchy__5598__auto__ = (function (){var G__60483 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__60483) : cljs.core.atom.call(null,G__60483));
})();
var hierarchy__5599__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.cst$kw$hierarchy,cljs.core.get_global_hierarchy());
return (new cljs.core.MultiFn(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("reagent-forms.core","format-type"),((function (method_table__5595__auto__,prefer_table__5596__auto__,method_cache__5597__auto__,cached_hierarchy__5598__auto__,hierarchy__5599__auto__){
return (function (field_type,_){
if(cljs.core.truth_(cljs.core.some(cljs.core.PersistentHashSet.fromArray([field_type], true),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$range,cljs.core.cst$kw$numeric], null)))){
return cljs.core.cst$kw$numeric;
} else {
return field_type;
}
});})(method_table__5595__auto__,prefer_table__5596__auto__,method_cache__5597__auto__,cached_hierarchy__5598__auto__,hierarchy__5599__auto__))
,cljs.core.cst$kw$default,hierarchy__5599__auto__,method_table__5595__auto__,prefer_table__5596__auto__,method_cache__5597__auto__,cached_hierarchy__5598__auto__));
})();
}
reagent_forms.core.valid_number_ending_QMARK_ = (function reagent_forms$core$valid_number_ending_QMARK_(n){
return ((cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(".",cljs.core.last(cljs.core.butlast(n)))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(".",cljs.core.last(n)))) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("0",cljs.core.last(n)));
});
reagent_forms.core.format_value = (function reagent_forms$core$format_value(fmt,value){
if(cljs.core.truth_((function (){var and__4670__auto__ = cljs.core.not((function (){var G__60487 = parseFloat(value);
return isNaN(G__60487);
})());
if(and__4670__auto__){
return fmt;
} else {
return and__4670__auto__;
}
})())){
return goog.string.format(fmt,value);
} else {
return value;
}
});
reagent_forms.core.format_type.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$numeric,(function (_,n){
if(cljs.core.truth_(cljs.core.not_empty(n))){
var parsed = parseFloat(n);
if(cljs.core.truth_(isNaN(parsed))){
return null;
} else {
if(cljs.core.truth_(reagent_forms.core.valid_number_ending_QMARK_(n))){
return n;
} else {
return parsed;
}
}
} else {
return null;
}
}));
reagent_forms.core.format_type.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$default,(function (_,value){
return value;
}));
if(typeof reagent_forms.core.bind !== 'undefined'){
} else {
reagent_forms.core.bind = (function (){var method_table__5595__auto__ = (function (){var G__60488 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__60488) : cljs.core.atom.call(null,G__60488));
})();
var prefer_table__5596__auto__ = (function (){var G__60489 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__60489) : cljs.core.atom.call(null,G__60489));
})();
var method_cache__5597__auto__ = (function (){var G__60490 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__60490) : cljs.core.atom.call(null,G__60490));
})();
var cached_hierarchy__5598__auto__ = (function (){var G__60491 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__60491) : cljs.core.atom.call(null,G__60491));
})();
var hierarchy__5599__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.cst$kw$hierarchy,cljs.core.get_global_hierarchy());
return (new cljs.core.MultiFn(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("reagent-forms.core","bind"),((function (method_table__5595__auto__,prefer_table__5596__auto__,method_cache__5597__auto__,cached_hierarchy__5598__auto__,hierarchy__5599__auto__){
return (function (p__60492,_){
var map__60493 = p__60492;
var map__60493__$1 = ((((!((map__60493 == null)))?((((map__60493.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60493.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60493):map__60493);
var field = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60493__$1,cljs.core.cst$kw$field);
if(cljs.core.truth_(cljs.core.some(cljs.core.PersistentHashSet.fromArray([field], true),new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$text,cljs.core.cst$kw$numeric,cljs.core.cst$kw$password,cljs.core.cst$kw$email,cljs.core.cst$kw$tel,cljs.core.cst$kw$range,cljs.core.cst$kw$textarea], null)))){
return cljs.core.cst$kw$input_DASH_field;
} else {
return field;
}
});})(method_table__5595__auto__,prefer_table__5596__auto__,method_cache__5597__auto__,cached_hierarchy__5598__auto__,hierarchy__5599__auto__))
,cljs.core.cst$kw$default,hierarchy__5599__auto__,method_table__5595__auto__,prefer_table__5596__auto__,method_cache__5597__auto__,cached_hierarchy__5598__auto__));
})();
}
reagent_forms.core.bind.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$input_DASH_field,(function (p__60496,p__60497){
var map__60498 = p__60496;
var map__60498__$1 = ((((!((map__60498 == null)))?((((map__60498.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60498.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60498):map__60498);
var field = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60498__$1,cljs.core.cst$kw$field);
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60498__$1,cljs.core.cst$kw$id);
var fmt = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60498__$1,cljs.core.cst$kw$fmt);
var map__60499 = p__60497;
var map__60499__$1 = ((((!((map__60499 == null)))?((((map__60499.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60499.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60499):map__60499);
var get = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60499__$1,cljs.core.cst$kw$get);
var save_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60499__$1,cljs.core.cst$kw$save_BANG_);
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60499__$1,cljs.core.cst$kw$doc);
return new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$value,(function (){var value = (function (){var or__4682__auto__ = (get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id));
if(cljs.core.truth_(or__4682__auto__)){
return or__4682__auto__;
} else {
return "";
}
})();
return reagent_forms.core.format_value(fmt,value);
})(),cljs.core.cst$kw$on_DASH_change,((function (map__60498,map__60498__$1,field,id,fmt,map__60499,map__60499__$1,get,save_BANG_,doc){
return (function (p1__60495_SHARP_){
var G__60504 = id;
var G__60505 = (function (){var G__60506 = field;
var G__60507 = reagent_forms.core.value_of(p1__60495_SHARP_);
return (reagent_forms.core.format_type.cljs$core$IFn$_invoke$arity$2 ? reagent_forms.core.format_type.cljs$core$IFn$_invoke$arity$2(G__60506,G__60507) : reagent_forms.core.format_type.call(null,G__60506,G__60507));
})();
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(G__60504,G__60505) : save_BANG_.call(null,G__60504,G__60505));
});})(map__60498,map__60498__$1,field,id,fmt,map__60499,map__60499__$1,get,save_BANG_,doc))
], null);
}));
reagent_forms.core.bind.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$checkbox,(function (p__60508,p__60509){
var map__60510 = p__60508;
var map__60510__$1 = ((((!((map__60510 == null)))?((((map__60510.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60510.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60510):map__60510);
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60510__$1,cljs.core.cst$kw$id);
var map__60511 = p__60509;
var map__60511__$1 = ((((!((map__60511 == null)))?((((map__60511.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60511.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60511):map__60511);
var get = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60511__$1,cljs.core.cst$kw$get);
var save_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60511__$1,cljs.core.cst$kw$save_BANG_);
return new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$checked,(get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id)),cljs.core.cst$kw$on_DASH_change,((function (map__60510,map__60510__$1,id,map__60511,map__60511__$1,get,save_BANG_){
return (function (){
var G__60514 = id;
var G__60515 = cljs.core.not((get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id)));
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(G__60514,G__60515) : save_BANG_.call(null,G__60514,G__60515));
});})(map__60510,map__60510__$1,id,map__60511,map__60511__$1,get,save_BANG_))
], null);
}));
reagent_forms.core.bind.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$default,(function (_,___$1){
return null;
}));
reagent_forms.core.set_attrs = (function reagent_forms$core$set_attrs(var_args){
var args__5747__auto__ = [];
var len__5740__auto___60523 = arguments.length;
var i__5741__auto___60524 = (0);
while(true){
if((i__5741__auto___60524 < len__5740__auto___60523)){
args__5747__auto__.push((arguments[i__5741__auto___60524]));

var G__60525 = (i__5741__auto___60524 + (1));
i__5741__auto___60524 = G__60525;
continue;
} else {
}
break;
}

var argseq__5748__auto__ = ((((2) < args__5747__auto__.length))?(new cljs.core.IndexedSeq(args__5747__auto__.slice((2)),(0))):null);
return reagent_forms.core.set_attrs.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__5748__auto__);
});

reagent_forms.core.set_attrs.cljs$core$IFn$_invoke$arity$variadic = (function (p__60519,opts,p__60520){
var vec__60521 = p__60519;
var type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60521,(0),null);
var attrs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60521,(1),null);
var body = cljs.core.nthnext(vec__60521,(2));
var vec__60522 = p__60520;
var default_attrs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60522,(0),null);
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([default_attrs,(reagent_forms.core.bind.cljs$core$IFn$_invoke$arity$2 ? reagent_forms.core.bind.cljs$core$IFn$_invoke$arity$2(attrs,opts) : reagent_forms.core.bind.call(null,attrs,opts)),attrs], 0))], null),body);
});

reagent_forms.core.set_attrs.cljs$lang$maxFixedArity = (2);

reagent_forms.core.set_attrs.cljs$lang$applyTo = (function (seq60516){
var G__60517 = cljs.core.first(seq60516);
var seq60516__$1 = cljs.core.next(seq60516);
var G__60518 = cljs.core.first(seq60516__$1);
var seq60516__$2 = cljs.core.next(seq60516__$1);
return reagent_forms.core.set_attrs.cljs$core$IFn$_invoke$arity$variadic(G__60517,G__60518,seq60516__$2);
});
if(typeof reagent_forms.core.init_field !== 'undefined'){
} else {
reagent_forms.core.init_field = (function (){var method_table__5595__auto__ = (function (){var G__60526 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__60526) : cljs.core.atom.call(null,G__60526));
})();
var prefer_table__5596__auto__ = (function (){var G__60527 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__60527) : cljs.core.atom.call(null,G__60527));
})();
var method_cache__5597__auto__ = (function (){var G__60528 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__60528) : cljs.core.atom.call(null,G__60528));
})();
var cached_hierarchy__5598__auto__ = (function (){var G__60529 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__60529) : cljs.core.atom.call(null,G__60529));
})();
var hierarchy__5599__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.cst$kw$hierarchy,cljs.core.get_global_hierarchy());
return (new cljs.core.MultiFn(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("reagent-forms.core","init-field"),((function (method_table__5595__auto__,prefer_table__5596__auto__,method_cache__5597__auto__,cached_hierarchy__5598__auto__,hierarchy__5599__auto__){
return (function (p__60530,_){
var vec__60531 = p__60530;
var ___$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60531,(0),null);
var map__60532 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60531,(1),null);
var map__60532__$1 = ((((!((map__60532 == null)))?((((map__60532.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60532.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60532):map__60532);
var field = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60532__$1,cljs.core.cst$kw$field);
var field__$1 = cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(field);
if(cljs.core.truth_(cljs.core.some(cljs.core.PersistentHashSet.fromArray([field__$1], true),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$range,cljs.core.cst$kw$text,cljs.core.cst$kw$password,cljs.core.cst$kw$email,cljs.core.cst$kw$tel,cljs.core.cst$kw$textarea], null)))){
return cljs.core.cst$kw$input_DASH_field;
} else {
return field__$1;
}
});})(method_table__5595__auto__,prefer_table__5596__auto__,method_cache__5597__auto__,cached_hierarchy__5598__auto__,hierarchy__5599__auto__))
,cljs.core.cst$kw$default,hierarchy__5599__auto__,method_table__5595__auto__,prefer_table__5596__auto__,method_cache__5597__auto__,cached_hierarchy__5598__auto__));
})();
}
reagent_forms.core.init_field.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$container,(function (p__60535,p__60536){
var vec__60537 = p__60535;
var type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60537,(0),null);
var map__60538 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60537,(1),null);
var map__60538__$1 = ((((!((map__60538 == null)))?((((map__60538.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60538.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60538):map__60538);
var attrs = map__60538__$1;
var valid_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60538__$1,cljs.core.cst$kw$valid_QMARK_);
var body = cljs.core.nthnext(vec__60537,(2));
var map__60539 = p__60536;
var map__60539__$1 = ((((!((map__60539 == null)))?((((map__60539.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60539.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60539):map__60539);
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60539__$1,cljs.core.cst$kw$doc);
return ((function (vec__60537,type,map__60538,map__60538__$1,attrs,valid_QMARK_,body,map__60539,map__60539__$1,doc){
return (function (){
var temp__4651__auto__ = cljs.core.cst$kw$visible_QMARK_.cljs$core$IFn$_invoke$arity$1(attrs);
if(cljs.core.truth_(temp__4651__auto__)){
var visible__60464__auto__ = temp__4651__auto__;
if(cljs.core.truth_((function (){var G__60542 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc));
return (visible__60464__auto__.cljs$core$IFn$_invoke$arity$1 ? visible__60464__auto__.cljs$core$IFn$_invoke$arity$1(G__60542) : visible__60464__auto__.call(null,G__60542));
})())){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,(function (){var temp__4651__auto____$1 = (cljs.core.truth_(valid_QMARK_)?(function (){var G__60543 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc));
return (valid_QMARK_.cljs$core$IFn$_invoke$arity$1 ? valid_QMARK_.cljs$core$IFn$_invoke$arity$1(G__60543) : valid_QMARK_.call(null,G__60543));
})():null);
if(cljs.core.truth_(temp__4651__auto____$1)){
var valid_class = temp__4651__auto____$1;
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(attrs,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$class], null),((function (valid_class,temp__4651__auto____$1,visible__60464__auto__,temp__4651__auto__,vec__60537,type,map__60538,map__60538__$1,attrs,valid_QMARK_,body,map__60539,map__60539__$1,doc){
return (function (p1__60534_SHARP_){
if(!(cljs.core.empty_QMARK_(p1__60534_SHARP_))){
return [cljs.core.str(p1__60534_SHARP_),cljs.core.str(" "),cljs.core.str(valid_class)].join('');
} else {
return valid_class;
}
});})(valid_class,temp__4651__auto____$1,visible__60464__auto__,temp__4651__auto__,vec__60537,type,map__60538,map__60538__$1,attrs,valid_QMARK_,body,map__60539,map__60539__$1,doc))
);
} else {
return attrs;
}
})()], null),body);
} else {
return null;
}
} else {
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,(function (){var temp__4651__auto____$1 = (cljs.core.truth_(valid_QMARK_)?(function (){var G__60544 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc));
return (valid_QMARK_.cljs$core$IFn$_invoke$arity$1 ? valid_QMARK_.cljs$core$IFn$_invoke$arity$1(G__60544) : valid_QMARK_.call(null,G__60544));
})():null);
if(cljs.core.truth_(temp__4651__auto____$1)){
var valid_class = temp__4651__auto____$1;
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(attrs,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$class], null),((function (valid_class,temp__4651__auto____$1,temp__4651__auto__,vec__60537,type,map__60538,map__60538__$1,attrs,valid_QMARK_,body,map__60539,map__60539__$1,doc){
return (function (p1__60534_SHARP_){
if(!(cljs.core.empty_QMARK_(p1__60534_SHARP_))){
return [cljs.core.str(p1__60534_SHARP_),cljs.core.str(" "),cljs.core.str(valid_class)].join('');
} else {
return valid_class;
}
});})(valid_class,temp__4651__auto____$1,temp__4651__auto__,vec__60537,type,map__60538,map__60538__$1,attrs,valid_QMARK_,body,map__60539,map__60539__$1,doc))
);
} else {
return attrs;
}
})()], null),body);
}
});
;})(vec__60537,type,map__60538,map__60538__$1,attrs,valid_QMARK_,body,map__60539,map__60539__$1,doc))
}));
reagent_forms.core.init_field.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$input_DASH_field,(function (p__60545,p__60546){
var vec__60547 = p__60545;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60547,(0),null);
var map__60548 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60547,(1),null);
var map__60548__$1 = ((((!((map__60548 == null)))?((((map__60548.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60548.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60548):map__60548);
var attrs = map__60548__$1;
var field = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60548__$1,cljs.core.cst$kw$field);
var component = vec__60547;
var map__60549 = p__60546;
var map__60549__$1 = ((((!((map__60549 == null)))?((((map__60549.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60549.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60549):map__60549);
var opts = map__60549__$1;
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60549__$1,cljs.core.cst$kw$doc);
return ((function (vec__60547,_,map__60548,map__60548__$1,attrs,field,component,map__60549,map__60549__$1,opts,doc){
return (function (){
var temp__4651__auto__ = cljs.core.cst$kw$visible_QMARK_.cljs$core$IFn$_invoke$arity$1(attrs);
if(cljs.core.truth_(temp__4651__auto__)){
var visible__60464__auto__ = temp__4651__auto__;
if(cljs.core.truth_((function (){var G__60552 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc));
return (visible__60464__auto__.cljs$core$IFn$_invoke$arity$1 ? visible__60464__auto__.cljs$core$IFn$_invoke$arity$1(G__60552) : visible__60464__auto__.call(null,G__60552));
})())){
return reagent_forms.core.set_attrs.cljs$core$IFn$_invoke$arity$variadic(component,opts,cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$type,field], null)], 0));
} else {
return null;
}
} else {
return reagent_forms.core.set_attrs.cljs$core$IFn$_invoke$arity$variadic(component,opts,cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$type,field], null)], 0));
}
});
;})(vec__60547,_,map__60548,map__60548__$1,attrs,field,component,map__60549,map__60549__$1,opts,doc))
}));
reagent_forms.core.init_field.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$numeric,(function (p__60554,p__60555){
var vec__60556 = p__60554;
var type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60556,(0),null);
var map__60557 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60556,(1),null);
var map__60557__$1 = ((((!((map__60557 == null)))?((((map__60557.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60557.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60557):map__60557);
var attrs = map__60557__$1;
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60557__$1,cljs.core.cst$kw$id);
var fmt = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60557__$1,cljs.core.cst$kw$fmt);
var map__60558 = p__60555;
var map__60558__$1 = ((((!((map__60558 == null)))?((((map__60558.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60558.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60558):map__60558);
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60558__$1,cljs.core.cst$kw$doc);
var get = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60558__$1,cljs.core.cst$kw$get);
var save_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60558__$1,cljs.core.cst$kw$save_BANG_);
var display_value = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$changed_DASH_self_QMARK_,false,cljs.core.cst$kw$value,(get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id))], null));
return ((function (display_value,vec__60556,type,map__60557,map__60557__$1,attrs,id,fmt,map__60558,map__60558__$1,doc,get,save_BANG_){
return (function (){
var temp__4651__auto__ = cljs.core.cst$kw$visible_QMARK_.cljs$core$IFn$_invoke$arity$1(attrs);
if(cljs.core.truth_(temp__4651__auto__)){
var visible__60464__auto__ = temp__4651__auto__;
if(cljs.core.truth_((function (){var G__60561 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc));
return (visible__60464__auto__.cljs$core$IFn$_invoke$arity$1 ? visible__60464__auto__.cljs$core$IFn$_invoke$arity$1(G__60561) : visible__60464__auto__.call(null,G__60561));
})())){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,cljs.core.cst$kw$text,cljs.core.cst$kw$value,(function (){var doc_value = (function (){var or__4682__auto__ = (get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id));
if(cljs.core.truth_(or__4682__auto__)){
return or__4682__auto__;
} else {
return "";
}
})();
var map__60562 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(display_value) : cljs.core.deref.call(null,display_value));
var map__60562__$1 = ((((!((map__60562 == null)))?((((map__60562.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60562.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60562):map__60562);
var changed_self_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60562__$1,cljs.core.cst$kw$changed_DASH_self_QMARK_);
var value = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60562__$1,cljs.core.cst$kw$value);
var value__$1 = (cljs.core.truth_(changed_self_QMARK_)?value:doc_value);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(display_value,cljs.core.dissoc,cljs.core.cst$kw$changed_DASH_self_QMARK_);

return reagent_forms.core.format_value(fmt,value__$1);
})(),cljs.core.cst$kw$on_DASH_change,((function (visible__60464__auto__,temp__4651__auto__,display_value,vec__60556,type,map__60557,map__60557__$1,attrs,id,fmt,map__60558,map__60558__$1,doc,get,save_BANG_){
return (function (p1__60553_SHARP_){
var temp__4651__auto____$1 = (function (){var G__60564 = cljs.core.cst$kw$numeric;
var G__60565 = reagent_forms.core.value_of(p1__60553_SHARP_);
return (reagent_forms.core.format_type.cljs$core$IFn$_invoke$arity$2 ? reagent_forms.core.format_type.cljs$core$IFn$_invoke$arity$2(G__60564,G__60565) : reagent_forms.core.format_type.call(null,G__60564,G__60565));
})();
if(cljs.core.truth_(temp__4651__auto____$1)){
var value = temp__4651__auto____$1;
var G__60566_60578 = display_value;
var G__60567_60579 = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$changed_DASH_self_QMARK_,true,cljs.core.cst$kw$value,value], null);
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__60566_60578,G__60567_60579) : cljs.core.reset_BANG_.call(null,G__60566_60578,G__60567_60579));

var G__60568 = id;
var G__60569 = parseFloat(value);
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(G__60568,G__60569) : save_BANG_.call(null,G__60568,G__60569));
} else {
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(id,null) : save_BANG_.call(null,id,null));
}
});})(visible__60464__auto__,temp__4651__auto__,display_value,vec__60556,type,map__60557,map__60557__$1,attrs,id,fmt,map__60558,map__60558__$1,doc,get,save_BANG_))
], null),attrs], 0))], null);
} else {
return null;
}
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,cljs.core.cst$kw$text,cljs.core.cst$kw$value,(function (){var doc_value = (function (){var or__4682__auto__ = (get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id));
if(cljs.core.truth_(or__4682__auto__)){
return or__4682__auto__;
} else {
return "";
}
})();
var map__60570 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(display_value) : cljs.core.deref.call(null,display_value));
var map__60570__$1 = ((((!((map__60570 == null)))?((((map__60570.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60570.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60570):map__60570);
var changed_self_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60570__$1,cljs.core.cst$kw$changed_DASH_self_QMARK_);
var value = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60570__$1,cljs.core.cst$kw$value);
var value__$1 = (cljs.core.truth_(changed_self_QMARK_)?value:doc_value);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(display_value,cljs.core.dissoc,cljs.core.cst$kw$changed_DASH_self_QMARK_);

return reagent_forms.core.format_value(fmt,value__$1);
})(),cljs.core.cst$kw$on_DASH_change,((function (temp__4651__auto__,display_value,vec__60556,type,map__60557,map__60557__$1,attrs,id,fmt,map__60558,map__60558__$1,doc,get,save_BANG_){
return (function (p1__60553_SHARP_){
var temp__4651__auto____$1 = (function (){var G__60572 = cljs.core.cst$kw$numeric;
var G__60573 = reagent_forms.core.value_of(p1__60553_SHARP_);
return (reagent_forms.core.format_type.cljs$core$IFn$_invoke$arity$2 ? reagent_forms.core.format_type.cljs$core$IFn$_invoke$arity$2(G__60572,G__60573) : reagent_forms.core.format_type.call(null,G__60572,G__60573));
})();
if(cljs.core.truth_(temp__4651__auto____$1)){
var value = temp__4651__auto____$1;
var G__60574_60580 = display_value;
var G__60575_60581 = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$changed_DASH_self_QMARK_,true,cljs.core.cst$kw$value,value], null);
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__60574_60580,G__60575_60581) : cljs.core.reset_BANG_.call(null,G__60574_60580,G__60575_60581));

var G__60576 = id;
var G__60577 = parseFloat(value);
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(G__60576,G__60577) : save_BANG_.call(null,G__60576,G__60577));
} else {
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(id,null) : save_BANG_.call(null,id,null));
}
});})(temp__4651__auto__,display_value,vec__60556,type,map__60557,map__60557__$1,attrs,id,fmt,map__60558,map__60558__$1,doc,get,save_BANG_))
], null),attrs], 0))], null);
}
});
;})(display_value,vec__60556,type,map__60557,map__60557__$1,attrs,id,fmt,map__60558,map__60558__$1,doc,get,save_BANG_))
}));
reagent_forms.core.init_field.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$datepicker,(function (p__60583,p__60584){
var vec__60585 = p__60583;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60585,(0),null);
var map__60586 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60585,(1),null);
var map__60586__$1 = ((((!((map__60586 == null)))?((((map__60586.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60586.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60586):map__60586);
var attrs = map__60586__$1;
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60586__$1,cljs.core.cst$kw$id);
var date_format = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60586__$1,cljs.core.cst$kw$date_DASH_format);
var inline = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60586__$1,cljs.core.cst$kw$inline);
var auto_close_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60586__$1,cljs.core.cst$kw$auto_DASH_close_QMARK_);
var map__60587 = p__60584;
var map__60587__$1 = ((((!((map__60587 == null)))?((((map__60587.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60587.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60587):map__60587);
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60587__$1,cljs.core.cst$kw$doc);
var get = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60587__$1,cljs.core.cst$kw$get);
var save_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60587__$1,cljs.core.cst$kw$save_BANG_);
var fmt = reagent_forms.datepicker.parse_format(date_format);
var today = (new Date());
var expanded_QMARK_ = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(false);
return ((function (fmt,today,expanded_QMARK_,vec__60585,_,map__60586,map__60586__$1,attrs,id,date_format,inline,auto_close_QMARK_,map__60587,map__60587__$1,doc,get,save_BANG_){
return (function (){
var temp__4651__auto__ = cljs.core.cst$kw$visible_QMARK_.cljs$core$IFn$_invoke$arity$1(attrs);
if(cljs.core.truth_(temp__4651__auto__)){
var visible__60464__auto__ = temp__4651__auto__;
if(cljs.core.truth_((function (){var G__60590 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc));
return (visible__60464__auto__.cljs$core$IFn$_invoke$arity$1 ? visible__60464__auto__.cljs$core$IFn$_invoke$arity$1(G__60590) : visible__60464__auto__.call(null,G__60590));
})())){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$datepicker_DASH_wrapper,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$input_DASH_group$date,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input$form_DASH_control,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([attrs,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$read_DASH_only,true,cljs.core.cst$kw$type,cljs.core.cst$kw$text,cljs.core.cst$kw$on_DASH_click,((function (visible__60464__auto__,temp__4651__auto__,fmt,today,expanded_QMARK_,vec__60585,_,map__60586,map__60586__$1,attrs,id,date_format,inline,auto_close_QMARK_,map__60587,map__60587__$1,doc,get,save_BANG_){
return (function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(expanded_QMARK_,cljs.core.not);
});})(visible__60464__auto__,temp__4651__auto__,fmt,today,expanded_QMARK_,vec__60585,_,map__60586,map__60586__$1,attrs,id,date_format,inline,auto_close_QMARK_,map__60587,map__60587__$1,doc,get,save_BANG_))
,cljs.core.cst$kw$value,(function (){var temp__4653__auto__ = (get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id));
if(cljs.core.truth_(temp__4653__auto__)){
var date = temp__4653__auto__;
return reagent_forms.datepicker.format_date(date,fmt);
} else {
return null;
}
})()], null)], 0))], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$input_DASH_group_DASH_addon,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$on_DASH_click,((function (visible__60464__auto__,temp__4651__auto__,fmt,today,expanded_QMARK_,vec__60585,_,map__60586,map__60586__$1,attrs,id,date_format,inline,auto_close_QMARK_,map__60587,map__60587__$1,doc,get,save_BANG_){
return (function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(expanded_QMARK_,cljs.core.not);
});})(visible__60464__auto__,temp__4651__auto__,fmt,today,expanded_QMARK_,vec__60585,_,map__60586,map__60586__$1,attrs,id,date_format,inline,auto_close_QMARK_,map__60587,map__60587__$1,doc,get,save_BANG_))
], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$i$glyphicon$glyphicon_DASH_calendar], null)], null)], null),new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_forms.datepicker.datepicker,today.getFullYear(),today.getMonth(),today.getDate(),expanded_QMARK_,auto_close_QMARK_,((function (visible__60464__auto__,temp__4651__auto__,fmt,today,expanded_QMARK_,vec__60585,_,map__60586,map__60586__$1,attrs,id,date_format,inline,auto_close_QMARK_,map__60587,map__60587__$1,doc,get,save_BANG_){
return (function (){
return (get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id));
});})(visible__60464__auto__,temp__4651__auto__,fmt,today,expanded_QMARK_,vec__60585,_,map__60586,map__60586__$1,attrs,id,date_format,inline,auto_close_QMARK_,map__60587,map__60587__$1,doc,get,save_BANG_))
,((function (visible__60464__auto__,temp__4651__auto__,fmt,today,expanded_QMARK_,vec__60585,_,map__60586,map__60586__$1,attrs,id,date_format,inline,auto_close_QMARK_,map__60587,map__60587__$1,doc,get,save_BANG_){
return (function (p1__60582_SHARP_){
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(id,p1__60582_SHARP_) : save_BANG_.call(null,id,p1__60582_SHARP_));
});})(visible__60464__auto__,temp__4651__auto__,fmt,today,expanded_QMARK_,vec__60585,_,map__60586,map__60586__$1,attrs,id,date_format,inline,auto_close_QMARK_,map__60587,map__60587__$1,doc,get,save_BANG_))
,inline], null)], null);
} else {
return null;
}
} else {
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$datepicker_DASH_wrapper,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$input_DASH_group$date,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input$form_DASH_control,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([attrs,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$read_DASH_only,true,cljs.core.cst$kw$type,cljs.core.cst$kw$text,cljs.core.cst$kw$on_DASH_click,((function (temp__4651__auto__,fmt,today,expanded_QMARK_,vec__60585,_,map__60586,map__60586__$1,attrs,id,date_format,inline,auto_close_QMARK_,map__60587,map__60587__$1,doc,get,save_BANG_){
return (function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(expanded_QMARK_,cljs.core.not);
});})(temp__4651__auto__,fmt,today,expanded_QMARK_,vec__60585,_,map__60586,map__60586__$1,attrs,id,date_format,inline,auto_close_QMARK_,map__60587,map__60587__$1,doc,get,save_BANG_))
,cljs.core.cst$kw$value,(function (){var temp__4653__auto__ = (get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id));
if(cljs.core.truth_(temp__4653__auto__)){
var date = temp__4653__auto__;
return reagent_forms.datepicker.format_date(date,fmt);
} else {
return null;
}
})()], null)], 0))], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$input_DASH_group_DASH_addon,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$on_DASH_click,((function (temp__4651__auto__,fmt,today,expanded_QMARK_,vec__60585,_,map__60586,map__60586__$1,attrs,id,date_format,inline,auto_close_QMARK_,map__60587,map__60587__$1,doc,get,save_BANG_){
return (function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(expanded_QMARK_,cljs.core.not);
});})(temp__4651__auto__,fmt,today,expanded_QMARK_,vec__60585,_,map__60586,map__60586__$1,attrs,id,date_format,inline,auto_close_QMARK_,map__60587,map__60587__$1,doc,get,save_BANG_))
], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$i$glyphicon$glyphicon_DASH_calendar], null)], null)], null),new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_forms.datepicker.datepicker,today.getFullYear(),today.getMonth(),today.getDate(),expanded_QMARK_,auto_close_QMARK_,((function (temp__4651__auto__,fmt,today,expanded_QMARK_,vec__60585,_,map__60586,map__60586__$1,attrs,id,date_format,inline,auto_close_QMARK_,map__60587,map__60587__$1,doc,get,save_BANG_){
return (function (){
return (get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id));
});})(temp__4651__auto__,fmt,today,expanded_QMARK_,vec__60585,_,map__60586,map__60586__$1,attrs,id,date_format,inline,auto_close_QMARK_,map__60587,map__60587__$1,doc,get,save_BANG_))
,((function (temp__4651__auto__,fmt,today,expanded_QMARK_,vec__60585,_,map__60586,map__60586__$1,attrs,id,date_format,inline,auto_close_QMARK_,map__60587,map__60587__$1,doc,get,save_BANG_){
return (function (p1__60582_SHARP_){
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(id,p1__60582_SHARP_) : save_BANG_.call(null,id,p1__60582_SHARP_));
});})(temp__4651__auto__,fmt,today,expanded_QMARK_,vec__60585,_,map__60586,map__60586__$1,attrs,id,date_format,inline,auto_close_QMARK_,map__60587,map__60587__$1,doc,get,save_BANG_))
,inline], null)], null);
}
});
;})(fmt,today,expanded_QMARK_,vec__60585,_,map__60586,map__60586__$1,attrs,id,date_format,inline,auto_close_QMARK_,map__60587,map__60587__$1,doc,get,save_BANG_))
}));
reagent_forms.core.init_field.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$checkbox,(function (p__60591,p__60592){
var vec__60593 = p__60591;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60593,(0),null);
var map__60594 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60593,(1),null);
var map__60594__$1 = ((((!((map__60594 == null)))?((((map__60594.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60594.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60594):map__60594);
var attrs = map__60594__$1;
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60594__$1,cljs.core.cst$kw$id);
var field = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60594__$1,cljs.core.cst$kw$field);
var component = vec__60593;
var map__60595 = p__60592;
var map__60595__$1 = ((((!((map__60595 == null)))?((((map__60595.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60595.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60595):map__60595);
var opts = map__60595__$1;
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60595__$1,cljs.core.cst$kw$doc);
var get = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60595__$1,cljs.core.cst$kw$get);
return ((function (vec__60593,_,map__60594,map__60594__$1,attrs,id,field,component,map__60595,map__60595__$1,opts,doc,get){
return (function (){
var temp__4651__auto__ = cljs.core.cst$kw$visible_QMARK_.cljs$core$IFn$_invoke$arity$1(attrs);
if(cljs.core.truth_(temp__4651__auto__)){
var visible__60464__auto__ = temp__4651__auto__;
if(cljs.core.truth_((function (){var G__60598 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc));
return (visible__60464__auto__.cljs$core$IFn$_invoke$arity$1 ? visible__60464__auto__.cljs$core$IFn$_invoke$arity$1(G__60598) : visible__60464__auto__.call(null,G__60598));
})())){
return reagent_forms.core.set_attrs.cljs$core$IFn$_invoke$arity$variadic(component,opts,cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$type,field], null)], 0));
} else {
return null;
}
} else {
return reagent_forms.core.set_attrs.cljs$core$IFn$_invoke$arity$variadic(component,opts,cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$type,field], null)], 0));
}
});
;})(vec__60593,_,map__60594,map__60594__$1,attrs,id,field,component,map__60595,map__60595__$1,opts,doc,get))
}));
reagent_forms.core.init_field.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$label,(function (p__60599,p__60600){
var vec__60601 = p__60599;
var type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60601,(0),null);
var map__60602 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60601,(1),null);
var map__60602__$1 = ((((!((map__60602 == null)))?((((map__60602.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60602.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60602):map__60602);
var attrs = map__60602__$1;
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60602__$1,cljs.core.cst$kw$id);
var preamble = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60602__$1,cljs.core.cst$kw$preamble);
var postamble = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60602__$1,cljs.core.cst$kw$postamble);
var placeholder = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60602__$1,cljs.core.cst$kw$placeholder);
var map__60603 = p__60600;
var map__60603__$1 = ((((!((map__60603 == null)))?((((map__60603.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60603.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60603):map__60603);
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60603__$1,cljs.core.cst$kw$doc);
var get = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60603__$1,cljs.core.cst$kw$get);
return ((function (vec__60601,type,map__60602,map__60602__$1,attrs,id,preamble,postamble,placeholder,map__60603,map__60603__$1,doc,get){
return (function (){
var temp__4651__auto__ = cljs.core.cst$kw$visible_QMARK_.cljs$core$IFn$_invoke$arity$1(attrs);
if(cljs.core.truth_(temp__4651__auto__)){
var visible__60464__auto__ = temp__4651__auto__;
if(cljs.core.truth_((function (){var G__60606 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc));
return (visible__60464__auto__.cljs$core$IFn$_invoke$arity$1 ? visible__60464__auto__.cljs$core$IFn$_invoke$arity$1(G__60606) : visible__60464__auto__.call(null,G__60606));
})())){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,attrs,preamble,(function (){var temp__4651__auto____$1 = (get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id));
if(cljs.core.truth_(temp__4651__auto____$1)){
var value = temp__4651__auto____$1;
return [cljs.core.str(value),cljs.core.str(postamble)].join('');
} else {
return placeholder;
}
})()], null);
} else {
return null;
}
} else {
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,attrs,preamble,(function (){var temp__4651__auto____$1 = (get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id));
if(cljs.core.truth_(temp__4651__auto____$1)){
var value = temp__4651__auto____$1;
return [cljs.core.str(value),cljs.core.str(postamble)].join('');
} else {
return placeholder;
}
})()], null);
}
});
;})(vec__60601,type,map__60602,map__60602__$1,attrs,id,preamble,postamble,placeholder,map__60603,map__60603__$1,doc,get))
}));
reagent_forms.core.init_field.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$alert,(function (p__60607,p__60608){
var vec__60609 = p__60607;
var type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60609,(0),null);
var map__60610 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60609,(1),null);
var map__60610__$1 = ((((!((map__60610 == null)))?((((map__60610.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60610.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60610):map__60610);
var attrs = map__60610__$1;
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60610__$1,cljs.core.cst$kw$id);
var event = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60610__$1,cljs.core.cst$kw$event);
var touch_event = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60610__$1,cljs.core.cst$kw$touch_DASH_event);
var body = cljs.core.nthnext(vec__60609,(2));
var map__60611 = p__60608;
var map__60611__$1 = ((((!((map__60611 == null)))?((((map__60611.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60611.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60611):map__60611);
var opts = map__60611__$1;
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60611__$1,cljs.core.cst$kw$doc);
var get = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60611__$1,cljs.core.cst$kw$get);
var save_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60611__$1,cljs.core.cst$kw$save_BANG_);
return ((function (vec__60609,type,map__60610,map__60610__$1,attrs,id,event,touch_event,body,map__60611,map__60611__$1,opts,doc,get,save_BANG_){
return (function (){
var temp__4651__auto__ = cljs.core.cst$kw$visible_QMARK_.cljs$core$IFn$_invoke$arity$1(attrs);
if(cljs.core.truth_(temp__4651__auto__)){
var visible__60464__auto__ = temp__4651__auto__;
if(cljs.core.truth_((function (){var G__60614 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc));
return (visible__60464__auto__.cljs$core$IFn$_invoke$arity$1 ? visible__60464__auto__.cljs$core$IFn$_invoke$arity$1(G__60614) : visible__60464__auto__.call(null,G__60614));
})())){
if(cljs.core.truth_(event)){
if(cljs.core.truth_((function (){var G__60615 = (get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id));
return (event.cljs$core$IFn$_invoke$arity$1 ? event.cljs$core$IFn$_invoke$arity$1(G__60615) : event.call(null,G__60615));
})())){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(attrs,event)], null),body);
} else {
return null;
}
} else {
var temp__4651__auto____$1 = cljs.core.not_empty((get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id)));
if(cljs.core.truth_(temp__4651__auto____$1)){
var message = temp__4651__auto____$1;
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,attrs,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$close,cljs.core.PersistentArrayMap.fromArray([cljs.core.cst$kw$type,"button",cljs.core.cst$kw$aria_DASH_hidden,true,(function (){var or__4682__auto__ = touch_event;
if(cljs.core.truth_(or__4682__auto__)){
return or__4682__auto__;
} else {
return cljs.core.cst$kw$on_DASH_click;
}
})(),((function (message,temp__4651__auto____$1,visible__60464__auto__,temp__4651__auto__,vec__60609,type,map__60610,map__60610__$1,attrs,id,event,touch_event,body,map__60611,map__60611__$1,opts,doc,get,save_BANG_){
return (function (){
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(id,null) : save_BANG_.call(null,id,null));
});})(message,temp__4651__auto____$1,visible__60464__auto__,temp__4651__auto__,vec__60609,type,map__60610,map__60610__$1,attrs,id,event,touch_event,body,map__60611,map__60611__$1,opts,doc,get,save_BANG_))
], true, false),"X"], null),message], null);
} else {
return null;
}
}
} else {
return null;
}
} else {
if(cljs.core.truth_(event)){
if(cljs.core.truth_((function (){var G__60616 = (get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id));
return (event.cljs$core$IFn$_invoke$arity$1 ? event.cljs$core$IFn$_invoke$arity$1(G__60616) : event.call(null,G__60616));
})())){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(attrs,event)], null),body);
} else {
return null;
}
} else {
var temp__4651__auto____$1 = cljs.core.not_empty((get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id)));
if(cljs.core.truth_(temp__4651__auto____$1)){
var message = temp__4651__auto____$1;
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,attrs,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$close,cljs.core.PersistentArrayMap.fromArray([cljs.core.cst$kw$type,"button",cljs.core.cst$kw$aria_DASH_hidden,true,(function (){var or__4682__auto__ = touch_event;
if(cljs.core.truth_(or__4682__auto__)){
return or__4682__auto__;
} else {
return cljs.core.cst$kw$on_DASH_click;
}
})(),((function (message,temp__4651__auto____$1,temp__4651__auto__,vec__60609,type,map__60610,map__60610__$1,attrs,id,event,touch_event,body,map__60611,map__60611__$1,opts,doc,get,save_BANG_){
return (function (){
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(id,null) : save_BANG_.call(null,id,null));
});})(message,temp__4651__auto____$1,temp__4651__auto__,vec__60609,type,map__60610,map__60610__$1,attrs,id,event,touch_event,body,map__60611,map__60611__$1,opts,doc,get,save_BANG_))
], true, false),"X"], null),message], null);
} else {
return null;
}
}
}
});
;})(vec__60609,type,map__60610,map__60610__$1,attrs,id,event,touch_event,body,map__60611,map__60611__$1,opts,doc,get,save_BANG_))
}));
reagent_forms.core.init_field.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$radio,(function (p__60617,p__60618){
var vec__60619 = p__60617;
var type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60619,(0),null);
var map__60620 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60619,(1),null);
var map__60620__$1 = ((((!((map__60620 == null)))?((((map__60620.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60620.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60620):map__60620);
var attrs = map__60620__$1;
var field = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60620__$1,cljs.core.cst$kw$field);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60620__$1,cljs.core.cst$kw$name);
var value = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60620__$1,cljs.core.cst$kw$value);
var body = cljs.core.nthnext(vec__60619,(2));
var map__60621 = p__60618;
var map__60621__$1 = ((((!((map__60621 == null)))?((((map__60621.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60621.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60621):map__60621);
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60621__$1,cljs.core.cst$kw$doc);
var get = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60621__$1,cljs.core.cst$kw$get);
var save_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60621__$1,cljs.core.cst$kw$save_BANG_);
return ((function (vec__60619,type,map__60620,map__60620__$1,attrs,field,name,value,body,map__60621,map__60621__$1,doc,get,save_BANG_){
return (function (){
var temp__4651__auto__ = cljs.core.cst$kw$visible_QMARK_.cljs$core$IFn$_invoke$arity$1(attrs);
if(cljs.core.truth_(temp__4651__auto__)){
var visible__60464__auto__ = temp__4651__auto__;
if(cljs.core.truth_((function (){var G__60624 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc));
return (visible__60464__auto__.cljs$core$IFn$_invoke$arity$1 ? visible__60464__auto__.cljs$core$IFn$_invoke$arity$1(G__60624) : visible__60464__auto__.call(null,G__60624));
})())){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,cljs.core.cst$kw$radio,cljs.core.cst$kw$checked,cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(value,(get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(name) : get.call(null,name))),cljs.core.cst$kw$on_DASH_change,((function (visible__60464__auto__,temp__4651__auto__,vec__60619,type,map__60620,map__60620__$1,attrs,field,name,value,body,map__60621,map__60621__$1,doc,get,save_BANG_){
return (function (){
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(name,value) : save_BANG_.call(null,name,value));
});})(visible__60464__auto__,temp__4651__auto__,vec__60619,type,map__60620,map__60620__$1,attrs,field,name,value,body,map__60621,map__60621__$1,doc,get,save_BANG_))
], null),attrs], 0))], null),body);
} else {
return null;
}
} else {
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,cljs.core.cst$kw$radio,cljs.core.cst$kw$checked,cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(value,(get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(name) : get.call(null,name))),cljs.core.cst$kw$on_DASH_change,((function (temp__4651__auto__,vec__60619,type,map__60620,map__60620__$1,attrs,field,name,value,body,map__60621,map__60621__$1,doc,get,save_BANG_){
return (function (){
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(name,value) : save_BANG_.call(null,name,value));
});})(temp__4651__auto__,vec__60619,type,map__60620,map__60620__$1,attrs,field,name,value,body,map__60621,map__60621__$1,doc,get,save_BANG_))
], null),attrs], 0))], null),body);
}
});
;})(vec__60619,type,map__60620,map__60620__$1,attrs,field,name,value,body,map__60621,map__60621__$1,doc,get,save_BANG_))
}));
reagent_forms.core.init_field.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$typeahead,(function (p__60628,p__60629){
var vec__60630 = p__60628;
var type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60630,(0),null);
var map__60631 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60630,(1),null);
var map__60631__$1 = ((((!((map__60631 == null)))?((((map__60631.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60631.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60631):map__60631);
var attrs = map__60631__$1;
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60631__$1,cljs.core.cst$kw$id);
var data_source = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60631__$1,cljs.core.cst$kw$data_DASH_source);
var input_class = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60631__$1,cljs.core.cst$kw$input_DASH_class);
var list_class = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60631__$1,cljs.core.cst$kw$list_DASH_class);
var item_class = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60631__$1,cljs.core.cst$kw$item_DASH_class);
var highlight_class = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60631__$1,cljs.core.cst$kw$highlight_DASH_class);
var result_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__60631__$1,cljs.core.cst$kw$result_DASH_fn,cljs.core.identity);
var choice_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__60631__$1,cljs.core.cst$kw$choice_DASH_fn,cljs.core.identity);
var clear_on_focus_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__60631__$1,cljs.core.cst$kw$clear_DASH_on_DASH_focus_QMARK_,true);
var map__60632 = p__60629;
var map__60632__$1 = ((((!((map__60632 == null)))?((((map__60632.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60632.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60632):map__60632);
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60632__$1,cljs.core.cst$kw$doc);
var get = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60632__$1,cljs.core.cst$kw$get);
var save_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60632__$1,cljs.core.cst$kw$save_BANG_);
var typeahead_hidden_QMARK_ = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(true);
var mouse_on_list_QMARK_ = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(false);
var selected_index = reagent.core.atom.cljs$core$IFn$_invoke$arity$1((0));
var selections = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentVector.EMPTY);
var choose_selected = ((function (typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,vec__60630,type,map__60631,map__60631__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60632,map__60632__$1,doc,get,save_BANG_){
return (function (){
var choice_60658 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selections) : cljs.core.deref.call(null,selections)),(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selected_index) : cljs.core.deref.call(null,selected_index)));
(save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(id,choice_60658) : save_BANG_.call(null,id,choice_60658));

(choice_fn.cljs$core$IFn$_invoke$arity$1 ? choice_fn.cljs$core$IFn$_invoke$arity$1(choice_60658) : choice_fn.call(null,choice_60658));

return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(typeahead_hidden_QMARK_,true) : cljs.core.reset_BANG_.call(null,typeahead_hidden_QMARK_,true));
});})(typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,vec__60630,type,map__60631,map__60631__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60632,map__60632__$1,doc,get,save_BANG_))
;
return ((function (typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60630,type,map__60631,map__60631__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60632,map__60632__$1,doc,get,save_BANG_){
return (function (){
var temp__4651__auto__ = cljs.core.cst$kw$visible_QMARK_.cljs$core$IFn$_invoke$arity$1(attrs);
if(cljs.core.truth_(temp__4651__auto__)){
var visible__60464__auto__ = temp__4651__auto__;
if(cljs.core.truth_((function (){var G__60635 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc));
return (visible__60464__auto__.cljs$core$IFn$_invoke$arity$1 ? visible__60464__auto__.cljs$core$IFn$_invoke$arity$1(G__60635) : visible__60464__auto__.call(null,G__60635));
})())){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input,new cljs.core.PersistentArrayMap(null, 7, [cljs.core.cst$kw$type,cljs.core.cst$kw$text,cljs.core.cst$kw$class,input_class,cljs.core.cst$kw$value,(function (){var v = (get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id));
if(cljs.core.not(cljs.core.iterable_QMARK_(v))){
return v;
} else {
return cljs.core.first(v);
}
})(),cljs.core.cst$kw$on_DASH_focus,((function (visible__60464__auto__,temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60630,type,map__60631,map__60631__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60632,map__60632__$1,doc,get,save_BANG_){
return (function (){
if(cljs.core.truth_(clear_on_focus_QMARK_)){
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(id,"") : save_BANG_.call(null,id,""));
} else {
return null;
}
});})(visible__60464__auto__,temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60630,type,map__60631,map__60631__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60632,map__60632__$1,doc,get,save_BANG_))
,cljs.core.cst$kw$on_DASH_blur,((function (visible__60464__auto__,temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60630,type,map__60631,map__60631__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60632,map__60632__$1,doc,get,save_BANG_){
return (function (){
if(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(mouse_on_list_QMARK_) : cljs.core.deref.call(null,mouse_on_list_QMARK_)))){
return null;
} else {
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(typeahead_hidden_QMARK_,true) : cljs.core.reset_BANG_.call(null,typeahead_hidden_QMARK_,true));

return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(selected_index,(0)) : cljs.core.reset_BANG_.call(null,selected_index,(0)));
}
});})(visible__60464__auto__,temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60630,type,map__60631,map__60631__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60632,map__60632__$1,doc,get,save_BANG_))
,cljs.core.cst$kw$on_DASH_change,((function (visible__60464__auto__,temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60630,type,map__60631,map__60631__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60632,map__60632__$1,doc,get,save_BANG_){
return (function (p1__60625_SHARP_){
var G__60637_60659 = selections;
var G__60638_60660 = (function (){var G__60639 = reagent_forms.core.value_of(p1__60625_SHARP_).toLowerCase();
return (data_source.cljs$core$IFn$_invoke$arity$1 ? data_source.cljs$core$IFn$_invoke$arity$1(G__60639) : data_source.call(null,G__60639));
})();
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__60637_60659,G__60638_60660) : cljs.core.reset_BANG_.call(null,G__60637_60659,G__60638_60660));

var G__60640_60661 = id;
var G__60641_60662 = reagent_forms.core.value_of(p1__60625_SHARP_);
(save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(G__60640_60661,G__60641_60662) : save_BANG_.call(null,G__60640_60661,G__60641_60662));

(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(typeahead_hidden_QMARK_,false) : cljs.core.reset_BANG_.call(null,typeahead_hidden_QMARK_,false));

return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(selected_index,(0)) : cljs.core.reset_BANG_.call(null,selected_index,(0)));
});})(visible__60464__auto__,temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60630,type,map__60631,map__60631__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60632,map__60632__$1,doc,get,save_BANG_))
,cljs.core.cst$kw$on_DASH_key_DASH_down,((function (visible__60464__auto__,temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60630,type,map__60631,map__60631__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60632,map__60632__$1,doc,get,save_BANG_){
return (function (p1__60626_SHARP_){
var G__60642 = p1__60626_SHARP_.which;
switch (G__60642) {
case (38):
p1__60626_SHARP_.preventDefault();

if(!(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selected_index) : cljs.core.deref.call(null,selected_index)),(0)))){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(selected_index,cljs.core.dec);
} else {
return null;
}

break;
case (40):
p1__60626_SHARP_.preventDefault();

if(!(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selected_index) : cljs.core.deref.call(null,selected_index)),(cljs.core.count((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selections) : cljs.core.deref.call(null,selections))) - (1))))){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(selected_index,cljs.core.inc);
} else {
return null;
}

break;
case (9):
return choose_selected();

break;
case (13):
return choose_selected();

break;
case (27):
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(typeahead_hidden_QMARK_,true) : cljs.core.reset_BANG_.call(null,typeahead_hidden_QMARK_,true));

return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(selected_index,(0)) : cljs.core.reset_BANG_.call(null,selected_index,(0)));

break;
default:
return "default";

}
});})(visible__60464__auto__,temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60630,type,map__60631,map__60631__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60632,map__60632__$1,doc,get,save_BANG_))
], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$ul,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$display,(cljs.core.truth_((function (){var or__4682__auto__ = cljs.core.empty_QMARK_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selections) : cljs.core.deref.call(null,selections)));
if(or__4682__auto__){
return or__4682__auto__;
} else {
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(typeahead_hidden_QMARK_) : cljs.core.deref.call(null,typeahead_hidden_QMARK_));
}
})())?cljs.core.cst$kw$none:cljs.core.cst$kw$block)], null),cljs.core.cst$kw$class,list_class,cljs.core.cst$kw$on_DASH_mouse_DASH_enter,((function (visible__60464__auto__,temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60630,type,map__60631,map__60631__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60632,map__60632__$1,doc,get,save_BANG_){
return (function (){
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(mouse_on_list_QMARK_,true) : cljs.core.reset_BANG_.call(null,mouse_on_list_QMARK_,true));
});})(visible__60464__auto__,temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60630,type,map__60631,map__60631__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60632,map__60632__$1,doc,get,save_BANG_))
,cljs.core.cst$kw$on_DASH_mouse_DASH_leave,((function (visible__60464__auto__,temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60630,type,map__60631,map__60631__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60632,map__60632__$1,doc,get,save_BANG_){
return (function (){
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(mouse_on_list_QMARK_,false) : cljs.core.reset_BANG_.call(null,mouse_on_list_QMARK_,false));
});})(visible__60464__auto__,temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60630,type,map__60631,map__60631__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60632,map__60632__$1,doc,get,save_BANG_))
], null),cljs.core.doall.cljs$core$IFn$_invoke$arity$1(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(((function (visible__60464__auto__,temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60630,type,map__60631,map__60631__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60632,map__60632__$1,doc,get,save_BANG_){
return (function (index,result){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$tab_DASH_index,index,cljs.core.cst$kw$key,index,cljs.core.cst$kw$class,((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selected_index) : cljs.core.deref.call(null,selected_index)),index))?highlight_class:item_class),cljs.core.cst$kw$on_DASH_mouse_DASH_over,((function (visible__60464__auto__,temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60630,type,map__60631,map__60631__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60632,map__60632__$1,doc,get,save_BANG_){
return (function (p1__60627_SHARP_){
var G__60644 = selected_index;
var G__60645 = (function (){var G__60646 = p1__60627_SHARP_.target.getAttribute("tabIndex");
return parseInt(G__60646);
})();
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__60644,G__60645) : cljs.core.reset_BANG_.call(null,G__60644,G__60645));
});})(visible__60464__auto__,temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60630,type,map__60631,map__60631__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60632,map__60632__$1,doc,get,save_BANG_))
,cljs.core.cst$kw$on_DASH_click,((function (visible__60464__auto__,temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60630,type,map__60631,map__60631__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60632,map__60632__$1,doc,get,save_BANG_){
return (function (){
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(typeahead_hidden_QMARK_,true) : cljs.core.reset_BANG_.call(null,typeahead_hidden_QMARK_,true));

(save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(id,result) : save_BANG_.call(null,id,result));

return (choice_fn.cljs$core$IFn$_invoke$arity$1 ? choice_fn.cljs$core$IFn$_invoke$arity$1(result) : choice_fn.call(null,result));
});})(visible__60464__auto__,temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60630,type,map__60631,map__60631__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60632,map__60632__$1,doc,get,save_BANG_))
], null),(result_fn.cljs$core$IFn$_invoke$arity$1 ? result_fn.cljs$core$IFn$_invoke$arity$1(result) : result_fn.call(null,result))], null);
});})(visible__60464__auto__,temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60630,type,map__60631,map__60631__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60632,map__60632__$1,doc,get,save_BANG_))
,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selections) : cljs.core.deref.call(null,selections))))], null)], null);
} else {
return null;
}
} else {
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input,new cljs.core.PersistentArrayMap(null, 7, [cljs.core.cst$kw$type,cljs.core.cst$kw$text,cljs.core.cst$kw$class,input_class,cljs.core.cst$kw$value,(function (){var v = (get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id));
if(cljs.core.not(cljs.core.iterable_QMARK_(v))){
return v;
} else {
return cljs.core.first(v);
}
})(),cljs.core.cst$kw$on_DASH_focus,((function (temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60630,type,map__60631,map__60631__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60632,map__60632__$1,doc,get,save_BANG_){
return (function (){
if(cljs.core.truth_(clear_on_focus_QMARK_)){
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(id,"") : save_BANG_.call(null,id,""));
} else {
return null;
}
});})(temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60630,type,map__60631,map__60631__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60632,map__60632__$1,doc,get,save_BANG_))
,cljs.core.cst$kw$on_DASH_blur,((function (temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60630,type,map__60631,map__60631__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60632,map__60632__$1,doc,get,save_BANG_){
return (function (){
if(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(mouse_on_list_QMARK_) : cljs.core.deref.call(null,mouse_on_list_QMARK_)))){
return null;
} else {
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(typeahead_hidden_QMARK_,true) : cljs.core.reset_BANG_.call(null,typeahead_hidden_QMARK_,true));

return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(selected_index,(0)) : cljs.core.reset_BANG_.call(null,selected_index,(0)));
}
});})(temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60630,type,map__60631,map__60631__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60632,map__60632__$1,doc,get,save_BANG_))
,cljs.core.cst$kw$on_DASH_change,((function (temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60630,type,map__60631,map__60631__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60632,map__60632__$1,doc,get,save_BANG_){
return (function (p1__60625_SHARP_){
var G__60648_60664 = selections;
var G__60649_60665 = (function (){var G__60650 = reagent_forms.core.value_of(p1__60625_SHARP_).toLowerCase();
return (data_source.cljs$core$IFn$_invoke$arity$1 ? data_source.cljs$core$IFn$_invoke$arity$1(G__60650) : data_source.call(null,G__60650));
})();
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__60648_60664,G__60649_60665) : cljs.core.reset_BANG_.call(null,G__60648_60664,G__60649_60665));

var G__60651_60666 = id;
var G__60652_60667 = reagent_forms.core.value_of(p1__60625_SHARP_);
(save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(G__60651_60666,G__60652_60667) : save_BANG_.call(null,G__60651_60666,G__60652_60667));

(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(typeahead_hidden_QMARK_,false) : cljs.core.reset_BANG_.call(null,typeahead_hidden_QMARK_,false));

return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(selected_index,(0)) : cljs.core.reset_BANG_.call(null,selected_index,(0)));
});})(temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60630,type,map__60631,map__60631__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60632,map__60632__$1,doc,get,save_BANG_))
,cljs.core.cst$kw$on_DASH_key_DASH_down,((function (temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60630,type,map__60631,map__60631__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60632,map__60632__$1,doc,get,save_BANG_){
return (function (p1__60626_SHARP_){
var G__60653 = p1__60626_SHARP_.which;
switch (G__60653) {
case (38):
p1__60626_SHARP_.preventDefault();

if(!(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selected_index) : cljs.core.deref.call(null,selected_index)),(0)))){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(selected_index,cljs.core.dec);
} else {
return null;
}

break;
case (40):
p1__60626_SHARP_.preventDefault();

if(!(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selected_index) : cljs.core.deref.call(null,selected_index)),(cljs.core.count((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selections) : cljs.core.deref.call(null,selections))) - (1))))){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(selected_index,cljs.core.inc);
} else {
return null;
}

break;
case (9):
return choose_selected();

break;
case (13):
return choose_selected();

break;
case (27):
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(typeahead_hidden_QMARK_,true) : cljs.core.reset_BANG_.call(null,typeahead_hidden_QMARK_,true));

return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(selected_index,(0)) : cljs.core.reset_BANG_.call(null,selected_index,(0)));

break;
default:
return "default";

}
});})(temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60630,type,map__60631,map__60631__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60632,map__60632__$1,doc,get,save_BANG_))
], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$ul,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$display,(cljs.core.truth_((function (){var or__4682__auto__ = cljs.core.empty_QMARK_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selections) : cljs.core.deref.call(null,selections)));
if(or__4682__auto__){
return or__4682__auto__;
} else {
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(typeahead_hidden_QMARK_) : cljs.core.deref.call(null,typeahead_hidden_QMARK_));
}
})())?cljs.core.cst$kw$none:cljs.core.cst$kw$block)], null),cljs.core.cst$kw$class,list_class,cljs.core.cst$kw$on_DASH_mouse_DASH_enter,((function (temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60630,type,map__60631,map__60631__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60632,map__60632__$1,doc,get,save_BANG_){
return (function (){
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(mouse_on_list_QMARK_,true) : cljs.core.reset_BANG_.call(null,mouse_on_list_QMARK_,true));
});})(temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60630,type,map__60631,map__60631__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60632,map__60632__$1,doc,get,save_BANG_))
,cljs.core.cst$kw$on_DASH_mouse_DASH_leave,((function (temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60630,type,map__60631,map__60631__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60632,map__60632__$1,doc,get,save_BANG_){
return (function (){
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(mouse_on_list_QMARK_,false) : cljs.core.reset_BANG_.call(null,mouse_on_list_QMARK_,false));
});})(temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60630,type,map__60631,map__60631__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60632,map__60632__$1,doc,get,save_BANG_))
], null),cljs.core.doall.cljs$core$IFn$_invoke$arity$1(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(((function (temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60630,type,map__60631,map__60631__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60632,map__60632__$1,doc,get,save_BANG_){
return (function (index,result){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$tab_DASH_index,index,cljs.core.cst$kw$key,index,cljs.core.cst$kw$class,((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selected_index) : cljs.core.deref.call(null,selected_index)),index))?highlight_class:item_class),cljs.core.cst$kw$on_DASH_mouse_DASH_over,((function (temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60630,type,map__60631,map__60631__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60632,map__60632__$1,doc,get,save_BANG_){
return (function (p1__60627_SHARP_){
var G__60655 = selected_index;
var G__60656 = (function (){var G__60657 = p1__60627_SHARP_.target.getAttribute("tabIndex");
return parseInt(G__60657);
})();
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__60655,G__60656) : cljs.core.reset_BANG_.call(null,G__60655,G__60656));
});})(temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60630,type,map__60631,map__60631__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60632,map__60632__$1,doc,get,save_BANG_))
,cljs.core.cst$kw$on_DASH_click,((function (temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60630,type,map__60631,map__60631__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60632,map__60632__$1,doc,get,save_BANG_){
return (function (){
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(typeahead_hidden_QMARK_,true) : cljs.core.reset_BANG_.call(null,typeahead_hidden_QMARK_,true));

(save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(id,result) : save_BANG_.call(null,id,result));

return (choice_fn.cljs$core$IFn$_invoke$arity$1 ? choice_fn.cljs$core$IFn$_invoke$arity$1(result) : choice_fn.call(null,result));
});})(temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60630,type,map__60631,map__60631__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60632,map__60632__$1,doc,get,save_BANG_))
], null),(result_fn.cljs$core$IFn$_invoke$arity$1 ? result_fn.cljs$core$IFn$_invoke$arity$1(result) : result_fn.call(null,result))], null);
});})(temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60630,type,map__60631,map__60631__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60632,map__60632__$1,doc,get,save_BANG_))
,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selections) : cljs.core.deref.call(null,selections))))], null)], null);
}
});
;})(typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60630,type,map__60631,map__60631__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60632,map__60632__$1,doc,get,save_BANG_))
}));
reagent_forms.core.group_item = (function reagent_forms$core$group_item(p__60669,p__60670,selections,field,id){
var vec__60700 = p__60669;
var type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60700,(0),null);
var map__60701 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60700,(1),null);
var map__60701__$1 = ((((!((map__60701 == null)))?((((map__60701.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60701.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60701):map__60701);
var attrs = map__60701__$1;
var key = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60701__$1,cljs.core.cst$kw$key);
var touch_event = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60701__$1,cljs.core.cst$kw$touch_DASH_event);
var body = cljs.core.nthnext(vec__60700,(2));
var map__60702 = p__60670;
var map__60702__$1 = ((((!((map__60702 == null)))?((((map__60702.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60702.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60702):map__60702);
var save_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60702__$1,cljs.core.cst$kw$save_BANG_);
var multi_select = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60702__$1,cljs.core.cst$kw$multi_DASH_select);
var handle_click_BANG_ = ((function (vec__60700,type,map__60701,map__60701__$1,attrs,key,touch_event,body,map__60702,map__60702__$1,save_BANG_,multi_select){
return (function reagent_forms$core$group_item_$_handle_click_BANG_(){
if(cljs.core.truth_(multi_select)){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(selections,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [key], null),cljs.core.not);

var G__60723 = id;
var G__60724 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.first,cljs.core.filter.cljs$core$IFn$_invoke$arity$2(cljs.core.second,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selections) : cljs.core.deref.call(null,selections))));
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(G__60723,G__60724) : save_BANG_.call(null,G__60723,G__60724));
} else {
var value = cljs.core.get.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selections) : cljs.core.deref.call(null,selections)),key);
var G__60725_60729 = selections;
var G__60726_60730 = cljs.core.PersistentArrayMap.fromArray([key,cljs.core.not(value)], true, false);
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__60725_60729,G__60726_60730) : cljs.core.reset_BANG_.call(null,G__60725_60729,G__60726_60730));

var G__60727 = id;
var G__60728 = (cljs.core.truth_(cljs.core.get.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selections) : cljs.core.deref.call(null,selections)),key))?key:null);
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(G__60727,G__60728) : save_BANG_.call(null,G__60727,G__60728));
}
});})(vec__60700,type,map__60701,map__60701__$1,attrs,key,touch_event,body,map__60702,map__60702__$1,save_BANG_,multi_select))
;
return ((function (vec__60700,type,map__60701,map__60701__$1,attrs,key,touch_event,body,map__60702,map__60702__$1,save_BANG_,multi_select){
return (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.PersistentArrayMap.fromArray([cljs.core.cst$kw$class,(cljs.core.truth_(cljs.core.get.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selections) : cljs.core.deref.call(null,selections)),key))?"active":null),(function (){var or__4682__auto__ = touch_event;
if(cljs.core.truth_(or__4682__auto__)){
return or__4682__auto__;
} else {
return cljs.core.cst$kw$on_DASH_click;
}
})(),handle_click_BANG_], true, false),attrs], 0)),body], null);
});
;})(vec__60700,type,map__60701,map__60701__$1,attrs,key,touch_event,body,map__60702,map__60702__$1,save_BANG_,multi_select))
});
reagent_forms.core.mk_selections = (function reagent_forms$core$mk_selections(id,selectors,p__60731){
var map__60738 = p__60731;
var map__60738__$1 = ((((!((map__60738 == null)))?((((map__60738.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60738.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60738):map__60738);
var get = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60738__$1,cljs.core.cst$kw$get);
var multi_select = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60738__$1,cljs.core.cst$kw$multi_DASH_select);
var value = (get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id));
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (value,map__60738,map__60738__$1,get,multi_select){
return (function (m,p__60740){
var vec__60741 = p__60740;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60741,(0),null);
var map__60742 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60741,(1),null);
var map__60742__$1 = ((((!((map__60742 == null)))?((((map__60742.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60742.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60742):map__60742);
var key = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60742__$1,cljs.core.cst$kw$key);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(m,key,cljs.core.boolean$(cljs.core.some(cljs.core.PersistentHashSet.fromArray([key], true),(cljs.core.truth_(multi_select)?value:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [value], null)))));
});})(value,map__60738,map__60738__$1,get,multi_select))
,cljs.core.PersistentArrayMap.EMPTY,selectors);
});
/**
 * selectors might be passed in inline or as a collection
 */
reagent_forms.core.extract_selectors = (function reagent_forms$core$extract_selectors(selectors){
if((cljs.core.ffirst(selectors) instanceof cljs.core.Keyword)){
return selectors;
} else {
return cljs.core.first(selectors);
}
});
reagent_forms.core.selection_group = (function reagent_forms$core$selection_group(p__60746,p__60747){
var vec__60758 = p__60746;
var type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60758,(0),null);
var map__60759 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60758,(1),null);
var map__60759__$1 = ((((!((map__60759 == null)))?((((map__60759.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60759.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60759):map__60759);
var attrs = map__60759__$1;
var field = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60759__$1,cljs.core.cst$kw$field);
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60759__$1,cljs.core.cst$kw$id);
var selection_items = cljs.core.nthnext(vec__60758,(2));
var map__60760 = p__60747;
var map__60760__$1 = ((((!((map__60760 == null)))?((((map__60760.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60760.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60760):map__60760);
var opts = map__60760__$1;
var get = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60760__$1,cljs.core.cst$kw$get);
var selection_items__$1 = reagent_forms.core.extract_selectors(selection_items);
var selections = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(reagent_forms.core.mk_selections(id,selection_items__$1,opts));
var selectors = cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (selection_items__$1,selections,vec__60758,type,map__60759,map__60759__$1,attrs,field,id,selection_items,map__60760,map__60760__$1,opts,get){
return (function (item){
return new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$visible_QMARK_,cljs.core.cst$kw$visible_QMARK_.cljs$core$IFn$_invoke$arity$1(cljs.core.second(item)),cljs.core.cst$kw$selector,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_forms.core.group_item(item,opts,selections,field,id)], null)], null);
});})(selection_items__$1,selections,vec__60758,type,map__60759,map__60759__$1,attrs,field,id,selection_items,map__60760,map__60760__$1,opts,get))
,selection_items__$1);
return ((function (selection_items__$1,selections,selectors,vec__60758,type,map__60759,map__60759__$1,attrs,field,id,selection_items,map__60760,map__60760__$1,opts,get){
return (function (){
if(cljs.core.truth_((get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id)))){
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(selections,((function (selection_items__$1,selections,selectors,vec__60758,type,map__60759,map__60759__$1,attrs,field,id,selection_items,map__60760,map__60760__$1,opts,get){
return (function (p1__60744_SHARP_){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (selection_items__$1,selections,selectors,vec__60758,type,map__60759,map__60759__$1,attrs,field,id,selection_items,map__60760,map__60760__$1,opts,get){
return (function (p__60763){
var vec__60764 = p__60763;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60764,(0),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,false], null);
});})(selection_items__$1,selections,selectors,vec__60758,type,map__60759,map__60759__$1,attrs,field,id,selection_items,map__60760,map__60760__$1,opts,get))
,p1__60744_SHARP_));
});})(selection_items__$1,selections,selectors,vec__60758,type,map__60759,map__60759__$1,attrs,field,id,selection_items,map__60760,map__60760__$1,opts,get))
);
}

return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,attrs], null),cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$selector,cljs.core.filter.cljs$core$IFn$_invoke$arity$2(((function (selection_items__$1,selections,selectors,vec__60758,type,map__60759,map__60759__$1,attrs,field,id,selection_items,map__60760,map__60760__$1,opts,get){
return (function (p1__60745_SHARP_){
var temp__4651__auto__ = cljs.core.cst$kw$visible_QMARK_.cljs$core$IFn$_invoke$arity$1(p1__60745_SHARP_);
if(cljs.core.truth_(temp__4651__auto__)){
var visible_QMARK_ = temp__4651__auto__;
var G__60766 = (function (){var G__60767 = cljs.core.cst$kw$doc.cljs$core$IFn$_invoke$arity$1(opts);
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__60767) : cljs.core.deref.call(null,G__60767));
})();
return (visible_QMARK_.cljs$core$IFn$_invoke$arity$1 ? visible_QMARK_.cljs$core$IFn$_invoke$arity$1(G__60766) : visible_QMARK_.call(null,G__60766));
} else {
return true;
}
});})(selection_items__$1,selections,selectors,vec__60758,type,map__60759,map__60759__$1,attrs,field,id,selection_items,map__60760,map__60760__$1,opts,get))
,selectors)));
});
;})(selection_items__$1,selections,selectors,vec__60758,type,map__60759,map__60759__$1,attrs,field,id,selection_items,map__60760,map__60760__$1,opts,get))
});
reagent_forms.core.init_field.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$single_DASH_select,(function (p__60768,p__60769){
var vec__60770 = p__60768;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60770,(0),null);
var attrs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60770,(1),null);
var field = vec__60770;
var map__60771 = p__60769;
var map__60771__$1 = ((((!((map__60771 == null)))?((((map__60771.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60771.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60771):map__60771);
var opts = map__60771__$1;
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60771__$1,cljs.core.cst$kw$doc);
return ((function (vec__60770,_,attrs,field,map__60771,map__60771__$1,opts,doc){
return (function (){
var temp__4651__auto__ = cljs.core.cst$kw$visible_QMARK_.cljs$core$IFn$_invoke$arity$1(attrs);
if(cljs.core.truth_(temp__4651__auto__)){
var visible__60464__auto__ = temp__4651__auto__;
if(cljs.core.truth_((function (){var G__60773 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc));
return (visible__60464__auto__.cljs$core$IFn$_invoke$arity$1 ? visible__60464__auto__.cljs$core$IFn$_invoke$arity$1(G__60773) : visible__60464__auto__.call(null,G__60773));
})())){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_forms.core.selection_group,field,opts], null);
} else {
return null;
}
} else {
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_forms.core.selection_group,field,opts], null);
}
});
;})(vec__60770,_,attrs,field,map__60771,map__60771__$1,opts,doc))
}));
reagent_forms.core.init_field.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$multi_DASH_select,(function (p__60774,p__60775){
var vec__60776 = p__60774;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60776,(0),null);
var attrs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60776,(1),null);
var field = vec__60776;
var map__60777 = p__60775;
var map__60777__$1 = ((((!((map__60777 == null)))?((((map__60777.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60777.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60777):map__60777);
var opts = map__60777__$1;
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60777__$1,cljs.core.cst$kw$doc);
return ((function (vec__60776,_,attrs,field,map__60777,map__60777__$1,opts,doc){
return (function (){
var temp__4651__auto__ = cljs.core.cst$kw$visible_QMARK_.cljs$core$IFn$_invoke$arity$1(attrs);
if(cljs.core.truth_(temp__4651__auto__)){
var visible__60464__auto__ = temp__4651__auto__;
if(cljs.core.truth_((function (){var G__60779 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc));
return (visible__60464__auto__.cljs$core$IFn$_invoke$arity$1 ? visible__60464__auto__.cljs$core$IFn$_invoke$arity$1(G__60779) : visible__60464__auto__.call(null,G__60779));
})())){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_forms.core.selection_group,field,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(opts,cljs.core.cst$kw$multi_DASH_select,true)], null);
} else {
return null;
}
} else {
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_forms.core.selection_group,field,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(opts,cljs.core.cst$kw$multi_DASH_select,true)], null);
}
});
;})(vec__60776,_,attrs,field,map__60777,map__60777__$1,opts,doc))
}));
reagent_forms.core.map_options = (function reagent_forms$core$map_options(options){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__5454__auto__ = (function reagent_forms$core$map_options_$_iter__60798(s__60799){
return (new cljs.core.LazySeq(null,(function (){
var s__60799__$1 = s__60799;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__60799__$1);
if(temp__4653__auto__){
var s__60799__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__60799__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__60799__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__60801 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__60800 = (0);
while(true){
if((i__60800 < size__5453__auto__)){
var vec__60810 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__60800);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60810,(0),null);
var map__60811 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60810,(1),null);
var map__60811__$1 = ((((!((map__60811 == null)))?((((map__60811.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60811.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60811):map__60811);
var key = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60811__$1,cljs.core.cst$kw$key);
var label = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60810,(2),null);
cljs.core.chunk_append(b__60801,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [[cljs.core.str(label)].join(''),key], null));

var G__60816 = (i__60800 + (1));
i__60800 = G__60816;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__60801),reagent_forms$core$map_options_$_iter__60798(cljs.core.chunk_rest(s__60799__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__60801),null);
}
} else {
var vec__60813 = cljs.core.first(s__60799__$2);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60813,(0),null);
var map__60814 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60813,(1),null);
var map__60814__$1 = ((((!((map__60814 == null)))?((((map__60814.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60814.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60814):map__60814);
var key = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60814__$1,cljs.core.cst$kw$key);
var label = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60813,(2),null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [[cljs.core.str(label)].join(''),key], null),reagent_forms$core$map_options_$_iter__60798(cljs.core.rest(s__60799__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5454__auto__(options);
})());
});
reagent_forms.core.default_selection = (function reagent_forms$core$default_selection(options,v){
return cljs.core.last(cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__60817_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(v,cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(p1__60817_SHARP_,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(1),cljs.core.cst$kw$key], null)));
}),options)));
});
reagent_forms.core.init_field.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$list,(function (p__60820,p__60821){
var vec__60822 = p__60820;
var type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60822,(0),null);
var map__60823 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60822,(1),null);
var map__60823__$1 = ((((!((map__60823 == null)))?((((map__60823.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60823.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60823):map__60823);
var attrs = map__60823__$1;
var field = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60823__$1,cljs.core.cst$kw$field);
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60823__$1,cljs.core.cst$kw$id);
var options = cljs.core.nthnext(vec__60822,(2));
var map__60824 = p__60821;
var map__60824__$1 = ((((!((map__60824 == null)))?((((map__60824.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60824.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60824):map__60824);
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60824__$1,cljs.core.cst$kw$doc);
var get = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60824__$1,cljs.core.cst$kw$get);
var save_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60824__$1,cljs.core.cst$kw$save_BANG_);
var options__$1 = reagent_forms.core.extract_selectors(options);
var options_lookup = reagent_forms.core.map_options(options__$1);
var selection = reagent.core.atom.cljs$core$IFn$_invoke$arity$1((function (){var or__4682__auto__ = (get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id));
if(cljs.core.truth_(or__4682__auto__)){
return or__4682__auto__;
} else {
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.first(options__$1),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(1),cljs.core.cst$kw$key], null));
}
})());
var G__60827_60836 = id;
var G__60828_60837 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selection) : cljs.core.deref.call(null,selection));
(save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(G__60827_60836,G__60828_60837) : save_BANG_.call(null,G__60827_60836,G__60828_60837));

return ((function (options__$1,options_lookup,selection,vec__60822,type,map__60823,map__60823__$1,attrs,field,id,options,map__60824,map__60824__$1,doc,get,save_BANG_){
return (function (){
var temp__4651__auto__ = cljs.core.cst$kw$visible_QMARK_.cljs$core$IFn$_invoke$arity$1(attrs);
if(cljs.core.truth_(temp__4651__auto__)){
var visible__60464__auto__ = temp__4651__auto__;
if(cljs.core.truth_((function (){var G__60829 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc));
return (visible__60464__auto__.cljs$core$IFn$_invoke$arity$1 ? visible__60464__auto__.cljs$core$IFn$_invoke$arity$1(G__60829) : visible__60464__auto__.call(null,G__60829));
})())){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([attrs,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$default_DASH_value,reagent_forms.core.default_selection(options__$1,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selection) : cljs.core.deref.call(null,selection))),cljs.core.cst$kw$on_DASH_change,((function (visible__60464__auto__,temp__4651__auto__,options__$1,options_lookup,selection,vec__60822,type,map__60823,map__60823__$1,attrs,field,id,options,map__60824,map__60824__$1,doc,get,save_BANG_){
return (function (p1__60818_SHARP_){
var G__60830 = id;
var G__60831 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(options_lookup,reagent_forms.core.value_of(p1__60818_SHARP_));
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(G__60830,G__60831) : save_BANG_.call(null,G__60830,G__60831));
});})(visible__60464__auto__,temp__4651__auto__,options__$1,options_lookup,selection,vec__60822,type,map__60823,map__60823__$1,attrs,field,id,options,map__60824,map__60824__$1,doc,get,save_BANG_))
], null)], 0)),cljs.core.doall.cljs$core$IFn$_invoke$arity$1(cljs.core.filter.cljs$core$IFn$_invoke$arity$2(((function (visible__60464__auto__,temp__4651__auto__,options__$1,options_lookup,selection,vec__60822,type,map__60823,map__60823__$1,attrs,field,id,options,map__60824,map__60824__$1,doc,get,save_BANG_){
return (function (p1__60819_SHARP_){
var temp__4651__auto____$1 = cljs.core.cst$kw$visible_QMARK_.cljs$core$IFn$_invoke$arity$1(cljs.core.second(p1__60819_SHARP_));
if(cljs.core.truth_(temp__4651__auto____$1)){
var visible_QMARK_ = temp__4651__auto____$1;
var G__60832 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc));
return (visible_QMARK_.cljs$core$IFn$_invoke$arity$1 ? visible_QMARK_.cljs$core$IFn$_invoke$arity$1(G__60832) : visible_QMARK_.call(null,G__60832));
} else {
return true;
}
});})(visible__60464__auto__,temp__4651__auto__,options__$1,options_lookup,selection,vec__60822,type,map__60823,map__60823__$1,attrs,field,id,options,map__60824,map__60824__$1,doc,get,save_BANG_))
,options__$1))], null);
} else {
return null;
}
} else {
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([attrs,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$default_DASH_value,reagent_forms.core.default_selection(options__$1,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selection) : cljs.core.deref.call(null,selection))),cljs.core.cst$kw$on_DASH_change,((function (temp__4651__auto__,options__$1,options_lookup,selection,vec__60822,type,map__60823,map__60823__$1,attrs,field,id,options,map__60824,map__60824__$1,doc,get,save_BANG_){
return (function (p1__60818_SHARP_){
var G__60833 = id;
var G__60834 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(options_lookup,reagent_forms.core.value_of(p1__60818_SHARP_));
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(G__60833,G__60834) : save_BANG_.call(null,G__60833,G__60834));
});})(temp__4651__auto__,options__$1,options_lookup,selection,vec__60822,type,map__60823,map__60823__$1,attrs,field,id,options,map__60824,map__60824__$1,doc,get,save_BANG_))
], null)], 0)),cljs.core.doall.cljs$core$IFn$_invoke$arity$1(cljs.core.filter.cljs$core$IFn$_invoke$arity$2(((function (temp__4651__auto__,options__$1,options_lookup,selection,vec__60822,type,map__60823,map__60823__$1,attrs,field,id,options,map__60824,map__60824__$1,doc,get,save_BANG_){
return (function (p1__60819_SHARP_){
var temp__4651__auto____$1 = cljs.core.cst$kw$visible_QMARK_.cljs$core$IFn$_invoke$arity$1(cljs.core.second(p1__60819_SHARP_));
if(cljs.core.truth_(temp__4651__auto____$1)){
var visible_QMARK_ = temp__4651__auto____$1;
var G__60835 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc));
return (visible_QMARK_.cljs$core$IFn$_invoke$arity$1 ? visible_QMARK_.cljs$core$IFn$_invoke$arity$1(G__60835) : visible_QMARK_.call(null,G__60835));
} else {
return true;
}
});})(temp__4651__auto__,options__$1,options_lookup,selection,vec__60822,type,map__60823,map__60823__$1,attrs,field,id,options,map__60824,map__60824__$1,doc,get,save_BANG_))
,options__$1))], null);
}
});
;})(options__$1,options_lookup,selection,vec__60822,type,map__60823,map__60823__$1,attrs,field,id,options,map__60824,map__60824__$1,doc,get,save_BANG_))
}));
reagent_forms.core.field_QMARK_ = (function reagent_forms$core$field_QMARK_(node){
return (cljs.core.coll_QMARK_(node)) && (cljs.core.map_QMARK_(cljs.core.second(node))) && (cljs.core.contains_QMARK_(cljs.core.second(node),cljs.core.cst$kw$field));
});
/**
 * creates data bindings between the form fields and the supplied atom
 * form - the form template with the fields
 * doc - the document that the fields will be bound to
 * events - any events that should be triggered when the document state changes
 */
reagent_forms.core.bind_fields = (function reagent_forms$core$bind_fields(var_args){
var args__5747__auto__ = [];
var len__5740__auto___60842 = arguments.length;
var i__5741__auto___60843 = (0);
while(true){
if((i__5741__auto___60843 < len__5740__auto___60842)){
args__5747__auto__.push((arguments[i__5741__auto___60843]));

var G__60844 = (i__5741__auto___60843 + (1));
i__5741__auto___60843 = G__60844;
continue;
} else {
}
break;
}

var argseq__5748__auto__ = ((((2) < args__5747__auto__.length))?(new cljs.core.IndexedSeq(args__5747__auto__.slice((2)),(0))):null);
return reagent_forms.core.bind_fields.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__5748__auto__);
});

reagent_forms.core.bind_fields.cljs$core$IFn$_invoke$arity$variadic = (function (form,doc,events){
var opts = new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$doc,doc,cljs.core.cst$kw$get,(function (p1__60838_SHARP_){
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc)),(reagent_forms.core.id__GT_path.cljs$core$IFn$_invoke$arity$1 ? reagent_forms.core.id__GT_path.cljs$core$IFn$_invoke$arity$1(p1__60838_SHARP_) : reagent_forms.core.id__GT_path.call(null,p1__60838_SHARP_)));
}),cljs.core.cst$kw$save_BANG_,reagent_forms.core.mk_save_fn(doc,events)], null);
var form__$1 = clojure.walk.postwalk(((function (opts){
return (function (node){
if(cljs.core.truth_(reagent_forms.core.field_QMARK_(node))){
var opts__$1 = reagent_forms.core.wrap_fns(opts,node);
var field = (reagent_forms.core.init_field.cljs$core$IFn$_invoke$arity$2 ? reagent_forms.core.init_field.cljs$core$IFn$_invoke$arity$2(node,opts__$1) : reagent_forms.core.init_field.call(null,node,opts__$1));
if(cljs.core.fn_QMARK_(field)){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [field], null);
} else {
return field;
}
} else {
return node;
}
});})(opts))
,form);
return ((function (opts,form__$1){
return (function (){
return form__$1;
});
;})(opts,form__$1))
});

reagent_forms.core.bind_fields.cljs$lang$maxFixedArity = (2);

reagent_forms.core.bind_fields.cljs$lang$applyTo = (function (seq60839){
var G__60840 = cljs.core.first(seq60839);
var seq60839__$1 = cljs.core.next(seq60839);
var G__60841 = cljs.core.first(seq60839__$1);
var seq60839__$2 = cljs.core.next(seq60839__$1);
return reagent_forms.core.bind_fields.cljs$core$IFn$_invoke$arity$variadic(G__60840,G__60841,seq60839__$2);
});
