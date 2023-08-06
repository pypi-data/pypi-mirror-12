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
return (function (p1__60234_SHARP_,p2__60233_SHARP_){
var or__4682__auto__ = (p2__60233_SHARP_.cljs$core$IFn$_invoke$arity$3 ? p2__60233_SHARP_.cljs$core$IFn$_invoke$arity$3(path,value,p1__60234_SHARP_) : p2__60233_SHARP_.call(null,path,value,p1__60234_SHARP_));
if(cljs.core.truth_(or__4682__auto__)){
return or__4682__auto__;
} else {
return p1__60234_SHARP_;
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
var G__60236 = (get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id));
return (wrapper.cljs$core$IFn$_invoke$arity$1 ? wrapper.cljs$core$IFn$_invoke$arity$1(G__60236) : wrapper.call(null,G__60236));
});
});
reagent_forms.core.wrap_save_fn = (function reagent_forms$core$wrap_save_fn(save_BANG_,wrapper){
return (function (id,value){
var G__60239 = id;
var G__60240 = (wrapper.cljs$core$IFn$_invoke$arity$1 ? wrapper.cljs$core$IFn$_invoke$arity$1(value) : wrapper.call(null,value));
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(G__60239,G__60240) : save_BANG_.call(null,G__60239,G__60240));
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
reagent_forms.core.format_type = (function (){var method_table__5595__auto__ = (function (){var G__60241 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__60241) : cljs.core.atom.call(null,G__60241));
})();
var prefer_table__5596__auto__ = (function (){var G__60242 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__60242) : cljs.core.atom.call(null,G__60242));
})();
var method_cache__5597__auto__ = (function (){var G__60243 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__60243) : cljs.core.atom.call(null,G__60243));
})();
var cached_hierarchy__5598__auto__ = (function (){var G__60244 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__60244) : cljs.core.atom.call(null,G__60244));
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
if(cljs.core.truth_((function (){var and__4670__auto__ = cljs.core.not((function (){var G__60248 = parseFloat(value);
return isNaN(G__60248);
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
reagent_forms.core.bind = (function (){var method_table__5595__auto__ = (function (){var G__60249 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__60249) : cljs.core.atom.call(null,G__60249));
})();
var prefer_table__5596__auto__ = (function (){var G__60250 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__60250) : cljs.core.atom.call(null,G__60250));
})();
var method_cache__5597__auto__ = (function (){var G__60251 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__60251) : cljs.core.atom.call(null,G__60251));
})();
var cached_hierarchy__5598__auto__ = (function (){var G__60252 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__60252) : cljs.core.atom.call(null,G__60252));
})();
var hierarchy__5599__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.cst$kw$hierarchy,cljs.core.get_global_hierarchy());
return (new cljs.core.MultiFn(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("reagent-forms.core","bind"),((function (method_table__5595__auto__,prefer_table__5596__auto__,method_cache__5597__auto__,cached_hierarchy__5598__auto__,hierarchy__5599__auto__){
return (function (p__60253,_){
var map__60254 = p__60253;
var map__60254__$1 = ((((!((map__60254 == null)))?((((map__60254.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60254.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60254):map__60254);
var field = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60254__$1,cljs.core.cst$kw$field);
if(cljs.core.truth_(cljs.core.some(cljs.core.PersistentHashSet.fromArray([field], true),new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$text,cljs.core.cst$kw$numeric,cljs.core.cst$kw$password,cljs.core.cst$kw$email,cljs.core.cst$kw$tel,cljs.core.cst$kw$range,cljs.core.cst$kw$textarea], null)))){
return cljs.core.cst$kw$input_DASH_field;
} else {
return field;
}
});})(method_table__5595__auto__,prefer_table__5596__auto__,method_cache__5597__auto__,cached_hierarchy__5598__auto__,hierarchy__5599__auto__))
,cljs.core.cst$kw$default,hierarchy__5599__auto__,method_table__5595__auto__,prefer_table__5596__auto__,method_cache__5597__auto__,cached_hierarchy__5598__auto__));
})();
}
reagent_forms.core.bind.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$input_DASH_field,(function (p__60257,p__60258){
var map__60259 = p__60257;
var map__60259__$1 = ((((!((map__60259 == null)))?((((map__60259.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60259.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60259):map__60259);
var field = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60259__$1,cljs.core.cst$kw$field);
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60259__$1,cljs.core.cst$kw$id);
var fmt = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60259__$1,cljs.core.cst$kw$fmt);
var map__60260 = p__60258;
var map__60260__$1 = ((((!((map__60260 == null)))?((((map__60260.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60260.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60260):map__60260);
var get = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60260__$1,cljs.core.cst$kw$get);
var save_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60260__$1,cljs.core.cst$kw$save_BANG_);
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60260__$1,cljs.core.cst$kw$doc);
return new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$value,(function (){var value = (function (){var or__4682__auto__ = (get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id));
if(cljs.core.truth_(or__4682__auto__)){
return or__4682__auto__;
} else {
return "";
}
})();
return reagent_forms.core.format_value(fmt,value);
})(),cljs.core.cst$kw$on_DASH_change,((function (map__60259,map__60259__$1,field,id,fmt,map__60260,map__60260__$1,get,save_BANG_,doc){
return (function (p1__60256_SHARP_){
var G__60265 = id;
var G__60266 = (function (){var G__60267 = field;
var G__60268 = reagent_forms.core.value_of(p1__60256_SHARP_);
return (reagent_forms.core.format_type.cljs$core$IFn$_invoke$arity$2 ? reagent_forms.core.format_type.cljs$core$IFn$_invoke$arity$2(G__60267,G__60268) : reagent_forms.core.format_type.call(null,G__60267,G__60268));
})();
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(G__60265,G__60266) : save_BANG_.call(null,G__60265,G__60266));
});})(map__60259,map__60259__$1,field,id,fmt,map__60260,map__60260__$1,get,save_BANG_,doc))
], null);
}));
reagent_forms.core.bind.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$checkbox,(function (p__60269,p__60270){
var map__60271 = p__60269;
var map__60271__$1 = ((((!((map__60271 == null)))?((((map__60271.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60271.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60271):map__60271);
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60271__$1,cljs.core.cst$kw$id);
var map__60272 = p__60270;
var map__60272__$1 = ((((!((map__60272 == null)))?((((map__60272.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60272.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60272):map__60272);
var get = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60272__$1,cljs.core.cst$kw$get);
var save_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60272__$1,cljs.core.cst$kw$save_BANG_);
return new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$checked,(get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id)),cljs.core.cst$kw$on_DASH_change,((function (map__60271,map__60271__$1,id,map__60272,map__60272__$1,get,save_BANG_){
return (function (){
var G__60275 = id;
var G__60276 = cljs.core.not((get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id)));
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(G__60275,G__60276) : save_BANG_.call(null,G__60275,G__60276));
});})(map__60271,map__60271__$1,id,map__60272,map__60272__$1,get,save_BANG_))
], null);
}));
reagent_forms.core.bind.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$default,(function (_,___$1){
return null;
}));
reagent_forms.core.set_attrs = (function reagent_forms$core$set_attrs(var_args){
var args__5747__auto__ = [];
var len__5740__auto___60284 = arguments.length;
var i__5741__auto___60285 = (0);
while(true){
if((i__5741__auto___60285 < len__5740__auto___60284)){
args__5747__auto__.push((arguments[i__5741__auto___60285]));

var G__60286 = (i__5741__auto___60285 + (1));
i__5741__auto___60285 = G__60286;
continue;
} else {
}
break;
}

var argseq__5748__auto__ = ((((2) < args__5747__auto__.length))?(new cljs.core.IndexedSeq(args__5747__auto__.slice((2)),(0))):null);
return reagent_forms.core.set_attrs.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__5748__auto__);
});

reagent_forms.core.set_attrs.cljs$core$IFn$_invoke$arity$variadic = (function (p__60280,opts,p__60281){
var vec__60282 = p__60280;
var type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60282,(0),null);
var attrs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60282,(1),null);
var body = cljs.core.nthnext(vec__60282,(2));
var vec__60283 = p__60281;
var default_attrs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60283,(0),null);
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([default_attrs,(reagent_forms.core.bind.cljs$core$IFn$_invoke$arity$2 ? reagent_forms.core.bind.cljs$core$IFn$_invoke$arity$2(attrs,opts) : reagent_forms.core.bind.call(null,attrs,opts)),attrs], 0))], null),body);
});

reagent_forms.core.set_attrs.cljs$lang$maxFixedArity = (2);

reagent_forms.core.set_attrs.cljs$lang$applyTo = (function (seq60277){
var G__60278 = cljs.core.first(seq60277);
var seq60277__$1 = cljs.core.next(seq60277);
var G__60279 = cljs.core.first(seq60277__$1);
var seq60277__$2 = cljs.core.next(seq60277__$1);
return reagent_forms.core.set_attrs.cljs$core$IFn$_invoke$arity$variadic(G__60278,G__60279,seq60277__$2);
});
if(typeof reagent_forms.core.init_field !== 'undefined'){
} else {
reagent_forms.core.init_field = (function (){var method_table__5595__auto__ = (function (){var G__60287 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__60287) : cljs.core.atom.call(null,G__60287));
})();
var prefer_table__5596__auto__ = (function (){var G__60288 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__60288) : cljs.core.atom.call(null,G__60288));
})();
var method_cache__5597__auto__ = (function (){var G__60289 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__60289) : cljs.core.atom.call(null,G__60289));
})();
var cached_hierarchy__5598__auto__ = (function (){var G__60290 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__60290) : cljs.core.atom.call(null,G__60290));
})();
var hierarchy__5599__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.cst$kw$hierarchy,cljs.core.get_global_hierarchy());
return (new cljs.core.MultiFn(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("reagent-forms.core","init-field"),((function (method_table__5595__auto__,prefer_table__5596__auto__,method_cache__5597__auto__,cached_hierarchy__5598__auto__,hierarchy__5599__auto__){
return (function (p__60291,_){
var vec__60292 = p__60291;
var ___$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60292,(0),null);
var map__60293 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60292,(1),null);
var map__60293__$1 = ((((!((map__60293 == null)))?((((map__60293.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60293.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60293):map__60293);
var field = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60293__$1,cljs.core.cst$kw$field);
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
reagent_forms.core.init_field.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$container,(function (p__60296,p__60297){
var vec__60298 = p__60296;
var type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60298,(0),null);
var map__60299 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60298,(1),null);
var map__60299__$1 = ((((!((map__60299 == null)))?((((map__60299.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60299.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60299):map__60299);
var attrs = map__60299__$1;
var valid_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60299__$1,cljs.core.cst$kw$valid_QMARK_);
var body = cljs.core.nthnext(vec__60298,(2));
var map__60300 = p__60297;
var map__60300__$1 = ((((!((map__60300 == null)))?((((map__60300.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60300.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60300):map__60300);
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60300__$1,cljs.core.cst$kw$doc);
return ((function (vec__60298,type,map__60299,map__60299__$1,attrs,valid_QMARK_,body,map__60300,map__60300__$1,doc){
return (function (){
var temp__4651__auto__ = cljs.core.cst$kw$visible_QMARK_.cljs$core$IFn$_invoke$arity$1(attrs);
if(cljs.core.truth_(temp__4651__auto__)){
var visible__60225__auto__ = temp__4651__auto__;
if(cljs.core.truth_((function (){var G__60303 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc));
return (visible__60225__auto__.cljs$core$IFn$_invoke$arity$1 ? visible__60225__auto__.cljs$core$IFn$_invoke$arity$1(G__60303) : visible__60225__auto__.call(null,G__60303));
})())){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,(function (){var temp__4651__auto____$1 = (cljs.core.truth_(valid_QMARK_)?(function (){var G__60304 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc));
return (valid_QMARK_.cljs$core$IFn$_invoke$arity$1 ? valid_QMARK_.cljs$core$IFn$_invoke$arity$1(G__60304) : valid_QMARK_.call(null,G__60304));
})():null);
if(cljs.core.truth_(temp__4651__auto____$1)){
var valid_class = temp__4651__auto____$1;
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(attrs,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$class], null),((function (valid_class,temp__4651__auto____$1,visible__60225__auto__,temp__4651__auto__,vec__60298,type,map__60299,map__60299__$1,attrs,valid_QMARK_,body,map__60300,map__60300__$1,doc){
return (function (p1__60295_SHARP_){
if(!(cljs.core.empty_QMARK_(p1__60295_SHARP_))){
return [cljs.core.str(p1__60295_SHARP_),cljs.core.str(" "),cljs.core.str(valid_class)].join('');
} else {
return valid_class;
}
});})(valid_class,temp__4651__auto____$1,visible__60225__auto__,temp__4651__auto__,vec__60298,type,map__60299,map__60299__$1,attrs,valid_QMARK_,body,map__60300,map__60300__$1,doc))
);
} else {
return attrs;
}
})()], null),body);
} else {
return null;
}
} else {
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,(function (){var temp__4651__auto____$1 = (cljs.core.truth_(valid_QMARK_)?(function (){var G__60305 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc));
return (valid_QMARK_.cljs$core$IFn$_invoke$arity$1 ? valid_QMARK_.cljs$core$IFn$_invoke$arity$1(G__60305) : valid_QMARK_.call(null,G__60305));
})():null);
if(cljs.core.truth_(temp__4651__auto____$1)){
var valid_class = temp__4651__auto____$1;
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(attrs,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$class], null),((function (valid_class,temp__4651__auto____$1,temp__4651__auto__,vec__60298,type,map__60299,map__60299__$1,attrs,valid_QMARK_,body,map__60300,map__60300__$1,doc){
return (function (p1__60295_SHARP_){
if(!(cljs.core.empty_QMARK_(p1__60295_SHARP_))){
return [cljs.core.str(p1__60295_SHARP_),cljs.core.str(" "),cljs.core.str(valid_class)].join('');
} else {
return valid_class;
}
});})(valid_class,temp__4651__auto____$1,temp__4651__auto__,vec__60298,type,map__60299,map__60299__$1,attrs,valid_QMARK_,body,map__60300,map__60300__$1,doc))
);
} else {
return attrs;
}
})()], null),body);
}
});
;})(vec__60298,type,map__60299,map__60299__$1,attrs,valid_QMARK_,body,map__60300,map__60300__$1,doc))
}));
reagent_forms.core.init_field.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$input_DASH_field,(function (p__60306,p__60307){
var vec__60308 = p__60306;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60308,(0),null);
var map__60309 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60308,(1),null);
var map__60309__$1 = ((((!((map__60309 == null)))?((((map__60309.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60309.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60309):map__60309);
var attrs = map__60309__$1;
var field = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60309__$1,cljs.core.cst$kw$field);
var component = vec__60308;
var map__60310 = p__60307;
var map__60310__$1 = ((((!((map__60310 == null)))?((((map__60310.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60310.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60310):map__60310);
var opts = map__60310__$1;
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60310__$1,cljs.core.cst$kw$doc);
return ((function (vec__60308,_,map__60309,map__60309__$1,attrs,field,component,map__60310,map__60310__$1,opts,doc){
return (function (){
var temp__4651__auto__ = cljs.core.cst$kw$visible_QMARK_.cljs$core$IFn$_invoke$arity$1(attrs);
if(cljs.core.truth_(temp__4651__auto__)){
var visible__60225__auto__ = temp__4651__auto__;
if(cljs.core.truth_((function (){var G__60313 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc));
return (visible__60225__auto__.cljs$core$IFn$_invoke$arity$1 ? visible__60225__auto__.cljs$core$IFn$_invoke$arity$1(G__60313) : visible__60225__auto__.call(null,G__60313));
})())){
return reagent_forms.core.set_attrs.cljs$core$IFn$_invoke$arity$variadic(component,opts,cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$type,field], null)], 0));
} else {
return null;
}
} else {
return reagent_forms.core.set_attrs.cljs$core$IFn$_invoke$arity$variadic(component,opts,cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$type,field], null)], 0));
}
});
;})(vec__60308,_,map__60309,map__60309__$1,attrs,field,component,map__60310,map__60310__$1,opts,doc))
}));
reagent_forms.core.init_field.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$numeric,(function (p__60315,p__60316){
var vec__60317 = p__60315;
var type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60317,(0),null);
var map__60318 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60317,(1),null);
var map__60318__$1 = ((((!((map__60318 == null)))?((((map__60318.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60318.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60318):map__60318);
var attrs = map__60318__$1;
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60318__$1,cljs.core.cst$kw$id);
var fmt = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60318__$1,cljs.core.cst$kw$fmt);
var map__60319 = p__60316;
var map__60319__$1 = ((((!((map__60319 == null)))?((((map__60319.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60319.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60319):map__60319);
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60319__$1,cljs.core.cst$kw$doc);
var get = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60319__$1,cljs.core.cst$kw$get);
var save_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60319__$1,cljs.core.cst$kw$save_BANG_);
var display_value = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$changed_DASH_self_QMARK_,false,cljs.core.cst$kw$value,(get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id))], null));
return ((function (display_value,vec__60317,type,map__60318,map__60318__$1,attrs,id,fmt,map__60319,map__60319__$1,doc,get,save_BANG_){
return (function (){
var temp__4651__auto__ = cljs.core.cst$kw$visible_QMARK_.cljs$core$IFn$_invoke$arity$1(attrs);
if(cljs.core.truth_(temp__4651__auto__)){
var visible__60225__auto__ = temp__4651__auto__;
if(cljs.core.truth_((function (){var G__60322 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc));
return (visible__60225__auto__.cljs$core$IFn$_invoke$arity$1 ? visible__60225__auto__.cljs$core$IFn$_invoke$arity$1(G__60322) : visible__60225__auto__.call(null,G__60322));
})())){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,cljs.core.cst$kw$text,cljs.core.cst$kw$value,(function (){var doc_value = (function (){var or__4682__auto__ = (get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id));
if(cljs.core.truth_(or__4682__auto__)){
return or__4682__auto__;
} else {
return "";
}
})();
var map__60323 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(display_value) : cljs.core.deref.call(null,display_value));
var map__60323__$1 = ((((!((map__60323 == null)))?((((map__60323.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60323.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60323):map__60323);
var changed_self_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60323__$1,cljs.core.cst$kw$changed_DASH_self_QMARK_);
var value = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60323__$1,cljs.core.cst$kw$value);
var value__$1 = (cljs.core.truth_(changed_self_QMARK_)?value:doc_value);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(display_value,cljs.core.dissoc,cljs.core.cst$kw$changed_DASH_self_QMARK_);

return reagent_forms.core.format_value(fmt,value__$1);
})(),cljs.core.cst$kw$on_DASH_change,((function (visible__60225__auto__,temp__4651__auto__,display_value,vec__60317,type,map__60318,map__60318__$1,attrs,id,fmt,map__60319,map__60319__$1,doc,get,save_BANG_){
return (function (p1__60314_SHARP_){
var temp__4651__auto____$1 = (function (){var G__60325 = cljs.core.cst$kw$numeric;
var G__60326 = reagent_forms.core.value_of(p1__60314_SHARP_);
return (reagent_forms.core.format_type.cljs$core$IFn$_invoke$arity$2 ? reagent_forms.core.format_type.cljs$core$IFn$_invoke$arity$2(G__60325,G__60326) : reagent_forms.core.format_type.call(null,G__60325,G__60326));
})();
if(cljs.core.truth_(temp__4651__auto____$1)){
var value = temp__4651__auto____$1;
var G__60327_60339 = display_value;
var G__60328_60340 = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$changed_DASH_self_QMARK_,true,cljs.core.cst$kw$value,value], null);
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__60327_60339,G__60328_60340) : cljs.core.reset_BANG_.call(null,G__60327_60339,G__60328_60340));

var G__60329 = id;
var G__60330 = parseFloat(value);
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(G__60329,G__60330) : save_BANG_.call(null,G__60329,G__60330));
} else {
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(id,null) : save_BANG_.call(null,id,null));
}
});})(visible__60225__auto__,temp__4651__auto__,display_value,vec__60317,type,map__60318,map__60318__$1,attrs,id,fmt,map__60319,map__60319__$1,doc,get,save_BANG_))
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
var map__60331 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(display_value) : cljs.core.deref.call(null,display_value));
var map__60331__$1 = ((((!((map__60331 == null)))?((((map__60331.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60331.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60331):map__60331);
var changed_self_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60331__$1,cljs.core.cst$kw$changed_DASH_self_QMARK_);
var value = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60331__$1,cljs.core.cst$kw$value);
var value__$1 = (cljs.core.truth_(changed_self_QMARK_)?value:doc_value);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(display_value,cljs.core.dissoc,cljs.core.cst$kw$changed_DASH_self_QMARK_);

return reagent_forms.core.format_value(fmt,value__$1);
})(),cljs.core.cst$kw$on_DASH_change,((function (temp__4651__auto__,display_value,vec__60317,type,map__60318,map__60318__$1,attrs,id,fmt,map__60319,map__60319__$1,doc,get,save_BANG_){
return (function (p1__60314_SHARP_){
var temp__4651__auto____$1 = (function (){var G__60333 = cljs.core.cst$kw$numeric;
var G__60334 = reagent_forms.core.value_of(p1__60314_SHARP_);
return (reagent_forms.core.format_type.cljs$core$IFn$_invoke$arity$2 ? reagent_forms.core.format_type.cljs$core$IFn$_invoke$arity$2(G__60333,G__60334) : reagent_forms.core.format_type.call(null,G__60333,G__60334));
})();
if(cljs.core.truth_(temp__4651__auto____$1)){
var value = temp__4651__auto____$1;
var G__60335_60341 = display_value;
var G__60336_60342 = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$changed_DASH_self_QMARK_,true,cljs.core.cst$kw$value,value], null);
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__60335_60341,G__60336_60342) : cljs.core.reset_BANG_.call(null,G__60335_60341,G__60336_60342));

var G__60337 = id;
var G__60338 = parseFloat(value);
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(G__60337,G__60338) : save_BANG_.call(null,G__60337,G__60338));
} else {
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(id,null) : save_BANG_.call(null,id,null));
}
});})(temp__4651__auto__,display_value,vec__60317,type,map__60318,map__60318__$1,attrs,id,fmt,map__60319,map__60319__$1,doc,get,save_BANG_))
], null),attrs], 0))], null);
}
});
;})(display_value,vec__60317,type,map__60318,map__60318__$1,attrs,id,fmt,map__60319,map__60319__$1,doc,get,save_BANG_))
}));
reagent_forms.core.init_field.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$datepicker,(function (p__60344,p__60345){
var vec__60346 = p__60344;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60346,(0),null);
var map__60347 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60346,(1),null);
var map__60347__$1 = ((((!((map__60347 == null)))?((((map__60347.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60347.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60347):map__60347);
var attrs = map__60347__$1;
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60347__$1,cljs.core.cst$kw$id);
var date_format = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60347__$1,cljs.core.cst$kw$date_DASH_format);
var inline = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60347__$1,cljs.core.cst$kw$inline);
var auto_close_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60347__$1,cljs.core.cst$kw$auto_DASH_close_QMARK_);
var map__60348 = p__60345;
var map__60348__$1 = ((((!((map__60348 == null)))?((((map__60348.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60348.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60348):map__60348);
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60348__$1,cljs.core.cst$kw$doc);
var get = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60348__$1,cljs.core.cst$kw$get);
var save_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60348__$1,cljs.core.cst$kw$save_BANG_);
var fmt = reagent_forms.datepicker.parse_format(date_format);
var today = (new Date());
var expanded_QMARK_ = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(false);
return ((function (fmt,today,expanded_QMARK_,vec__60346,_,map__60347,map__60347__$1,attrs,id,date_format,inline,auto_close_QMARK_,map__60348,map__60348__$1,doc,get,save_BANG_){
return (function (){
var temp__4651__auto__ = cljs.core.cst$kw$visible_QMARK_.cljs$core$IFn$_invoke$arity$1(attrs);
if(cljs.core.truth_(temp__4651__auto__)){
var visible__60225__auto__ = temp__4651__auto__;
if(cljs.core.truth_((function (){var G__60351 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc));
return (visible__60225__auto__.cljs$core$IFn$_invoke$arity$1 ? visible__60225__auto__.cljs$core$IFn$_invoke$arity$1(G__60351) : visible__60225__auto__.call(null,G__60351));
})())){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$datepicker_DASH_wrapper,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$input_DASH_group$date,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input$form_DASH_control,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([attrs,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$read_DASH_only,true,cljs.core.cst$kw$type,cljs.core.cst$kw$text,cljs.core.cst$kw$on_DASH_click,((function (visible__60225__auto__,temp__4651__auto__,fmt,today,expanded_QMARK_,vec__60346,_,map__60347,map__60347__$1,attrs,id,date_format,inline,auto_close_QMARK_,map__60348,map__60348__$1,doc,get,save_BANG_){
return (function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(expanded_QMARK_,cljs.core.not);
});})(visible__60225__auto__,temp__4651__auto__,fmt,today,expanded_QMARK_,vec__60346,_,map__60347,map__60347__$1,attrs,id,date_format,inline,auto_close_QMARK_,map__60348,map__60348__$1,doc,get,save_BANG_))
,cljs.core.cst$kw$value,(function (){var temp__4653__auto__ = (get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id));
if(cljs.core.truth_(temp__4653__auto__)){
var date = temp__4653__auto__;
return reagent_forms.datepicker.format_date(date,fmt);
} else {
return null;
}
})()], null)], 0))], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$input_DASH_group_DASH_addon,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$on_DASH_click,((function (visible__60225__auto__,temp__4651__auto__,fmt,today,expanded_QMARK_,vec__60346,_,map__60347,map__60347__$1,attrs,id,date_format,inline,auto_close_QMARK_,map__60348,map__60348__$1,doc,get,save_BANG_){
return (function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(expanded_QMARK_,cljs.core.not);
});})(visible__60225__auto__,temp__4651__auto__,fmt,today,expanded_QMARK_,vec__60346,_,map__60347,map__60347__$1,attrs,id,date_format,inline,auto_close_QMARK_,map__60348,map__60348__$1,doc,get,save_BANG_))
], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$i$glyphicon$glyphicon_DASH_calendar], null)], null)], null),new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_forms.datepicker.datepicker,today.getFullYear(),today.getMonth(),today.getDate(),expanded_QMARK_,auto_close_QMARK_,((function (visible__60225__auto__,temp__4651__auto__,fmt,today,expanded_QMARK_,vec__60346,_,map__60347,map__60347__$1,attrs,id,date_format,inline,auto_close_QMARK_,map__60348,map__60348__$1,doc,get,save_BANG_){
return (function (){
return (get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id));
});})(visible__60225__auto__,temp__4651__auto__,fmt,today,expanded_QMARK_,vec__60346,_,map__60347,map__60347__$1,attrs,id,date_format,inline,auto_close_QMARK_,map__60348,map__60348__$1,doc,get,save_BANG_))
,((function (visible__60225__auto__,temp__4651__auto__,fmt,today,expanded_QMARK_,vec__60346,_,map__60347,map__60347__$1,attrs,id,date_format,inline,auto_close_QMARK_,map__60348,map__60348__$1,doc,get,save_BANG_){
return (function (p1__60343_SHARP_){
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(id,p1__60343_SHARP_) : save_BANG_.call(null,id,p1__60343_SHARP_));
});})(visible__60225__auto__,temp__4651__auto__,fmt,today,expanded_QMARK_,vec__60346,_,map__60347,map__60347__$1,attrs,id,date_format,inline,auto_close_QMARK_,map__60348,map__60348__$1,doc,get,save_BANG_))
,inline], null)], null);
} else {
return null;
}
} else {
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$datepicker_DASH_wrapper,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$input_DASH_group$date,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input$form_DASH_control,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([attrs,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$read_DASH_only,true,cljs.core.cst$kw$type,cljs.core.cst$kw$text,cljs.core.cst$kw$on_DASH_click,((function (temp__4651__auto__,fmt,today,expanded_QMARK_,vec__60346,_,map__60347,map__60347__$1,attrs,id,date_format,inline,auto_close_QMARK_,map__60348,map__60348__$1,doc,get,save_BANG_){
return (function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(expanded_QMARK_,cljs.core.not);
});})(temp__4651__auto__,fmt,today,expanded_QMARK_,vec__60346,_,map__60347,map__60347__$1,attrs,id,date_format,inline,auto_close_QMARK_,map__60348,map__60348__$1,doc,get,save_BANG_))
,cljs.core.cst$kw$value,(function (){var temp__4653__auto__ = (get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id));
if(cljs.core.truth_(temp__4653__auto__)){
var date = temp__4653__auto__;
return reagent_forms.datepicker.format_date(date,fmt);
} else {
return null;
}
})()], null)], 0))], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$input_DASH_group_DASH_addon,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$on_DASH_click,((function (temp__4651__auto__,fmt,today,expanded_QMARK_,vec__60346,_,map__60347,map__60347__$1,attrs,id,date_format,inline,auto_close_QMARK_,map__60348,map__60348__$1,doc,get,save_BANG_){
return (function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(expanded_QMARK_,cljs.core.not);
});})(temp__4651__auto__,fmt,today,expanded_QMARK_,vec__60346,_,map__60347,map__60347__$1,attrs,id,date_format,inline,auto_close_QMARK_,map__60348,map__60348__$1,doc,get,save_BANG_))
], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$i$glyphicon$glyphicon_DASH_calendar], null)], null)], null),new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_forms.datepicker.datepicker,today.getFullYear(),today.getMonth(),today.getDate(),expanded_QMARK_,auto_close_QMARK_,((function (temp__4651__auto__,fmt,today,expanded_QMARK_,vec__60346,_,map__60347,map__60347__$1,attrs,id,date_format,inline,auto_close_QMARK_,map__60348,map__60348__$1,doc,get,save_BANG_){
return (function (){
return (get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id));
});})(temp__4651__auto__,fmt,today,expanded_QMARK_,vec__60346,_,map__60347,map__60347__$1,attrs,id,date_format,inline,auto_close_QMARK_,map__60348,map__60348__$1,doc,get,save_BANG_))
,((function (temp__4651__auto__,fmt,today,expanded_QMARK_,vec__60346,_,map__60347,map__60347__$1,attrs,id,date_format,inline,auto_close_QMARK_,map__60348,map__60348__$1,doc,get,save_BANG_){
return (function (p1__60343_SHARP_){
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(id,p1__60343_SHARP_) : save_BANG_.call(null,id,p1__60343_SHARP_));
});})(temp__4651__auto__,fmt,today,expanded_QMARK_,vec__60346,_,map__60347,map__60347__$1,attrs,id,date_format,inline,auto_close_QMARK_,map__60348,map__60348__$1,doc,get,save_BANG_))
,inline], null)], null);
}
});
;})(fmt,today,expanded_QMARK_,vec__60346,_,map__60347,map__60347__$1,attrs,id,date_format,inline,auto_close_QMARK_,map__60348,map__60348__$1,doc,get,save_BANG_))
}));
reagent_forms.core.init_field.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$checkbox,(function (p__60352,p__60353){
var vec__60354 = p__60352;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60354,(0),null);
var map__60355 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60354,(1),null);
var map__60355__$1 = ((((!((map__60355 == null)))?((((map__60355.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60355.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60355):map__60355);
var attrs = map__60355__$1;
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60355__$1,cljs.core.cst$kw$id);
var field = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60355__$1,cljs.core.cst$kw$field);
var component = vec__60354;
var map__60356 = p__60353;
var map__60356__$1 = ((((!((map__60356 == null)))?((((map__60356.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60356.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60356):map__60356);
var opts = map__60356__$1;
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60356__$1,cljs.core.cst$kw$doc);
var get = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60356__$1,cljs.core.cst$kw$get);
return ((function (vec__60354,_,map__60355,map__60355__$1,attrs,id,field,component,map__60356,map__60356__$1,opts,doc,get){
return (function (){
var temp__4651__auto__ = cljs.core.cst$kw$visible_QMARK_.cljs$core$IFn$_invoke$arity$1(attrs);
if(cljs.core.truth_(temp__4651__auto__)){
var visible__60225__auto__ = temp__4651__auto__;
if(cljs.core.truth_((function (){var G__60359 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc));
return (visible__60225__auto__.cljs$core$IFn$_invoke$arity$1 ? visible__60225__auto__.cljs$core$IFn$_invoke$arity$1(G__60359) : visible__60225__auto__.call(null,G__60359));
})())){
return reagent_forms.core.set_attrs.cljs$core$IFn$_invoke$arity$variadic(component,opts,cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$type,field], null)], 0));
} else {
return null;
}
} else {
return reagent_forms.core.set_attrs.cljs$core$IFn$_invoke$arity$variadic(component,opts,cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$type,field], null)], 0));
}
});
;})(vec__60354,_,map__60355,map__60355__$1,attrs,id,field,component,map__60356,map__60356__$1,opts,doc,get))
}));
reagent_forms.core.init_field.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$label,(function (p__60360,p__60361){
var vec__60362 = p__60360;
var type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60362,(0),null);
var map__60363 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60362,(1),null);
var map__60363__$1 = ((((!((map__60363 == null)))?((((map__60363.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60363.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60363):map__60363);
var attrs = map__60363__$1;
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60363__$1,cljs.core.cst$kw$id);
var preamble = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60363__$1,cljs.core.cst$kw$preamble);
var postamble = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60363__$1,cljs.core.cst$kw$postamble);
var placeholder = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60363__$1,cljs.core.cst$kw$placeholder);
var map__60364 = p__60361;
var map__60364__$1 = ((((!((map__60364 == null)))?((((map__60364.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60364.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60364):map__60364);
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60364__$1,cljs.core.cst$kw$doc);
var get = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60364__$1,cljs.core.cst$kw$get);
return ((function (vec__60362,type,map__60363,map__60363__$1,attrs,id,preamble,postamble,placeholder,map__60364,map__60364__$1,doc,get){
return (function (){
var temp__4651__auto__ = cljs.core.cst$kw$visible_QMARK_.cljs$core$IFn$_invoke$arity$1(attrs);
if(cljs.core.truth_(temp__4651__auto__)){
var visible__60225__auto__ = temp__4651__auto__;
if(cljs.core.truth_((function (){var G__60367 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc));
return (visible__60225__auto__.cljs$core$IFn$_invoke$arity$1 ? visible__60225__auto__.cljs$core$IFn$_invoke$arity$1(G__60367) : visible__60225__auto__.call(null,G__60367));
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
;})(vec__60362,type,map__60363,map__60363__$1,attrs,id,preamble,postamble,placeholder,map__60364,map__60364__$1,doc,get))
}));
reagent_forms.core.init_field.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$alert,(function (p__60368,p__60369){
var vec__60370 = p__60368;
var type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60370,(0),null);
var map__60371 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60370,(1),null);
var map__60371__$1 = ((((!((map__60371 == null)))?((((map__60371.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60371.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60371):map__60371);
var attrs = map__60371__$1;
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60371__$1,cljs.core.cst$kw$id);
var event = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60371__$1,cljs.core.cst$kw$event);
var touch_event = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60371__$1,cljs.core.cst$kw$touch_DASH_event);
var body = cljs.core.nthnext(vec__60370,(2));
var map__60372 = p__60369;
var map__60372__$1 = ((((!((map__60372 == null)))?((((map__60372.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60372.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60372):map__60372);
var opts = map__60372__$1;
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60372__$1,cljs.core.cst$kw$doc);
var get = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60372__$1,cljs.core.cst$kw$get);
var save_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60372__$1,cljs.core.cst$kw$save_BANG_);
return ((function (vec__60370,type,map__60371,map__60371__$1,attrs,id,event,touch_event,body,map__60372,map__60372__$1,opts,doc,get,save_BANG_){
return (function (){
var temp__4651__auto__ = cljs.core.cst$kw$visible_QMARK_.cljs$core$IFn$_invoke$arity$1(attrs);
if(cljs.core.truth_(temp__4651__auto__)){
var visible__60225__auto__ = temp__4651__auto__;
if(cljs.core.truth_((function (){var G__60375 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc));
return (visible__60225__auto__.cljs$core$IFn$_invoke$arity$1 ? visible__60225__auto__.cljs$core$IFn$_invoke$arity$1(G__60375) : visible__60225__auto__.call(null,G__60375));
})())){
if(cljs.core.truth_(event)){
if(cljs.core.truth_((function (){var G__60376 = (get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id));
return (event.cljs$core$IFn$_invoke$arity$1 ? event.cljs$core$IFn$_invoke$arity$1(G__60376) : event.call(null,G__60376));
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
})(),((function (message,temp__4651__auto____$1,visible__60225__auto__,temp__4651__auto__,vec__60370,type,map__60371,map__60371__$1,attrs,id,event,touch_event,body,map__60372,map__60372__$1,opts,doc,get,save_BANG_){
return (function (){
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(id,null) : save_BANG_.call(null,id,null));
});})(message,temp__4651__auto____$1,visible__60225__auto__,temp__4651__auto__,vec__60370,type,map__60371,map__60371__$1,attrs,id,event,touch_event,body,map__60372,map__60372__$1,opts,doc,get,save_BANG_))
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
if(cljs.core.truth_((function (){var G__60377 = (get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id));
return (event.cljs$core$IFn$_invoke$arity$1 ? event.cljs$core$IFn$_invoke$arity$1(G__60377) : event.call(null,G__60377));
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
})(),((function (message,temp__4651__auto____$1,temp__4651__auto__,vec__60370,type,map__60371,map__60371__$1,attrs,id,event,touch_event,body,map__60372,map__60372__$1,opts,doc,get,save_BANG_){
return (function (){
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(id,null) : save_BANG_.call(null,id,null));
});})(message,temp__4651__auto____$1,temp__4651__auto__,vec__60370,type,map__60371,map__60371__$1,attrs,id,event,touch_event,body,map__60372,map__60372__$1,opts,doc,get,save_BANG_))
], true, false),"X"], null),message], null);
} else {
return null;
}
}
}
});
;})(vec__60370,type,map__60371,map__60371__$1,attrs,id,event,touch_event,body,map__60372,map__60372__$1,opts,doc,get,save_BANG_))
}));
reagent_forms.core.init_field.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$radio,(function (p__60378,p__60379){
var vec__60380 = p__60378;
var type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60380,(0),null);
var map__60381 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60380,(1),null);
var map__60381__$1 = ((((!((map__60381 == null)))?((((map__60381.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60381.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60381):map__60381);
var attrs = map__60381__$1;
var field = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60381__$1,cljs.core.cst$kw$field);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60381__$1,cljs.core.cst$kw$name);
var value = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60381__$1,cljs.core.cst$kw$value);
var body = cljs.core.nthnext(vec__60380,(2));
var map__60382 = p__60379;
var map__60382__$1 = ((((!((map__60382 == null)))?((((map__60382.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60382.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60382):map__60382);
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60382__$1,cljs.core.cst$kw$doc);
var get = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60382__$1,cljs.core.cst$kw$get);
var save_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60382__$1,cljs.core.cst$kw$save_BANG_);
return ((function (vec__60380,type,map__60381,map__60381__$1,attrs,field,name,value,body,map__60382,map__60382__$1,doc,get,save_BANG_){
return (function (){
var temp__4651__auto__ = cljs.core.cst$kw$visible_QMARK_.cljs$core$IFn$_invoke$arity$1(attrs);
if(cljs.core.truth_(temp__4651__auto__)){
var visible__60225__auto__ = temp__4651__auto__;
if(cljs.core.truth_((function (){var G__60385 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc));
return (visible__60225__auto__.cljs$core$IFn$_invoke$arity$1 ? visible__60225__auto__.cljs$core$IFn$_invoke$arity$1(G__60385) : visible__60225__auto__.call(null,G__60385));
})())){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,cljs.core.cst$kw$radio,cljs.core.cst$kw$checked,cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(value,(get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(name) : get.call(null,name))),cljs.core.cst$kw$on_DASH_change,((function (visible__60225__auto__,temp__4651__auto__,vec__60380,type,map__60381,map__60381__$1,attrs,field,name,value,body,map__60382,map__60382__$1,doc,get,save_BANG_){
return (function (){
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(name,value) : save_BANG_.call(null,name,value));
});})(visible__60225__auto__,temp__4651__auto__,vec__60380,type,map__60381,map__60381__$1,attrs,field,name,value,body,map__60382,map__60382__$1,doc,get,save_BANG_))
], null),attrs], 0))], null),body);
} else {
return null;
}
} else {
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,cljs.core.cst$kw$radio,cljs.core.cst$kw$checked,cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(value,(get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(name) : get.call(null,name))),cljs.core.cst$kw$on_DASH_change,((function (temp__4651__auto__,vec__60380,type,map__60381,map__60381__$1,attrs,field,name,value,body,map__60382,map__60382__$1,doc,get,save_BANG_){
return (function (){
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(name,value) : save_BANG_.call(null,name,value));
});})(temp__4651__auto__,vec__60380,type,map__60381,map__60381__$1,attrs,field,name,value,body,map__60382,map__60382__$1,doc,get,save_BANG_))
], null),attrs], 0))], null),body);
}
});
;})(vec__60380,type,map__60381,map__60381__$1,attrs,field,name,value,body,map__60382,map__60382__$1,doc,get,save_BANG_))
}));
reagent_forms.core.init_field.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$typeahead,(function (p__60389,p__60390){
var vec__60391 = p__60389;
var type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60391,(0),null);
var map__60392 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60391,(1),null);
var map__60392__$1 = ((((!((map__60392 == null)))?((((map__60392.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60392.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60392):map__60392);
var attrs = map__60392__$1;
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60392__$1,cljs.core.cst$kw$id);
var data_source = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60392__$1,cljs.core.cst$kw$data_DASH_source);
var input_class = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60392__$1,cljs.core.cst$kw$input_DASH_class);
var list_class = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60392__$1,cljs.core.cst$kw$list_DASH_class);
var item_class = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60392__$1,cljs.core.cst$kw$item_DASH_class);
var highlight_class = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60392__$1,cljs.core.cst$kw$highlight_DASH_class);
var result_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__60392__$1,cljs.core.cst$kw$result_DASH_fn,cljs.core.identity);
var choice_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__60392__$1,cljs.core.cst$kw$choice_DASH_fn,cljs.core.identity);
var clear_on_focus_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__60392__$1,cljs.core.cst$kw$clear_DASH_on_DASH_focus_QMARK_,true);
var map__60393 = p__60390;
var map__60393__$1 = ((((!((map__60393 == null)))?((((map__60393.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60393.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60393):map__60393);
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60393__$1,cljs.core.cst$kw$doc);
var get = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60393__$1,cljs.core.cst$kw$get);
var save_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60393__$1,cljs.core.cst$kw$save_BANG_);
var typeahead_hidden_QMARK_ = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(true);
var mouse_on_list_QMARK_ = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(false);
var selected_index = reagent.core.atom.cljs$core$IFn$_invoke$arity$1((0));
var selections = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentVector.EMPTY);
var choose_selected = ((function (typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,vec__60391,type,map__60392,map__60392__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60393,map__60393__$1,doc,get,save_BANG_){
return (function (){
var choice_60419 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selections) : cljs.core.deref.call(null,selections)),(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selected_index) : cljs.core.deref.call(null,selected_index)));
(save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(id,choice_60419) : save_BANG_.call(null,id,choice_60419));

(choice_fn.cljs$core$IFn$_invoke$arity$1 ? choice_fn.cljs$core$IFn$_invoke$arity$1(choice_60419) : choice_fn.call(null,choice_60419));

return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(typeahead_hidden_QMARK_,true) : cljs.core.reset_BANG_.call(null,typeahead_hidden_QMARK_,true));
});})(typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,vec__60391,type,map__60392,map__60392__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60393,map__60393__$1,doc,get,save_BANG_))
;
return ((function (typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60391,type,map__60392,map__60392__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60393,map__60393__$1,doc,get,save_BANG_){
return (function (){
var temp__4651__auto__ = cljs.core.cst$kw$visible_QMARK_.cljs$core$IFn$_invoke$arity$1(attrs);
if(cljs.core.truth_(temp__4651__auto__)){
var visible__60225__auto__ = temp__4651__auto__;
if(cljs.core.truth_((function (){var G__60396 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc));
return (visible__60225__auto__.cljs$core$IFn$_invoke$arity$1 ? visible__60225__auto__.cljs$core$IFn$_invoke$arity$1(G__60396) : visible__60225__auto__.call(null,G__60396));
})())){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input,new cljs.core.PersistentArrayMap(null, 7, [cljs.core.cst$kw$type,cljs.core.cst$kw$text,cljs.core.cst$kw$class,input_class,cljs.core.cst$kw$value,(function (){var v = (get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id));
if(cljs.core.not(cljs.core.iterable_QMARK_(v))){
return v;
} else {
return cljs.core.first(v);
}
})(),cljs.core.cst$kw$on_DASH_focus,((function (visible__60225__auto__,temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60391,type,map__60392,map__60392__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60393,map__60393__$1,doc,get,save_BANG_){
return (function (){
if(cljs.core.truth_(clear_on_focus_QMARK_)){
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(id,"") : save_BANG_.call(null,id,""));
} else {
return null;
}
});})(visible__60225__auto__,temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60391,type,map__60392,map__60392__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60393,map__60393__$1,doc,get,save_BANG_))
,cljs.core.cst$kw$on_DASH_blur,((function (visible__60225__auto__,temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60391,type,map__60392,map__60392__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60393,map__60393__$1,doc,get,save_BANG_){
return (function (){
if(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(mouse_on_list_QMARK_) : cljs.core.deref.call(null,mouse_on_list_QMARK_)))){
return null;
} else {
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(typeahead_hidden_QMARK_,true) : cljs.core.reset_BANG_.call(null,typeahead_hidden_QMARK_,true));

return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(selected_index,(0)) : cljs.core.reset_BANG_.call(null,selected_index,(0)));
}
});})(visible__60225__auto__,temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60391,type,map__60392,map__60392__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60393,map__60393__$1,doc,get,save_BANG_))
,cljs.core.cst$kw$on_DASH_change,((function (visible__60225__auto__,temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60391,type,map__60392,map__60392__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60393,map__60393__$1,doc,get,save_BANG_){
return (function (p1__60386_SHARP_){
var G__60398_60420 = selections;
var G__60399_60421 = (function (){var G__60400 = reagent_forms.core.value_of(p1__60386_SHARP_).toLowerCase();
return (data_source.cljs$core$IFn$_invoke$arity$1 ? data_source.cljs$core$IFn$_invoke$arity$1(G__60400) : data_source.call(null,G__60400));
})();
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__60398_60420,G__60399_60421) : cljs.core.reset_BANG_.call(null,G__60398_60420,G__60399_60421));

var G__60401_60422 = id;
var G__60402_60423 = reagent_forms.core.value_of(p1__60386_SHARP_);
(save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(G__60401_60422,G__60402_60423) : save_BANG_.call(null,G__60401_60422,G__60402_60423));

(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(typeahead_hidden_QMARK_,false) : cljs.core.reset_BANG_.call(null,typeahead_hidden_QMARK_,false));

return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(selected_index,(0)) : cljs.core.reset_BANG_.call(null,selected_index,(0)));
});})(visible__60225__auto__,temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60391,type,map__60392,map__60392__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60393,map__60393__$1,doc,get,save_BANG_))
,cljs.core.cst$kw$on_DASH_key_DASH_down,((function (visible__60225__auto__,temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60391,type,map__60392,map__60392__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60393,map__60393__$1,doc,get,save_BANG_){
return (function (p1__60387_SHARP_){
var G__60403 = p1__60387_SHARP_.which;
switch (G__60403) {
case (38):
p1__60387_SHARP_.preventDefault();

if(!(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selected_index) : cljs.core.deref.call(null,selected_index)),(0)))){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(selected_index,cljs.core.dec);
} else {
return null;
}

break;
case (40):
p1__60387_SHARP_.preventDefault();

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
});})(visible__60225__auto__,temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60391,type,map__60392,map__60392__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60393,map__60393__$1,doc,get,save_BANG_))
], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$ul,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$display,(cljs.core.truth_((function (){var or__4682__auto__ = cljs.core.empty_QMARK_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selections) : cljs.core.deref.call(null,selections)));
if(or__4682__auto__){
return or__4682__auto__;
} else {
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(typeahead_hidden_QMARK_) : cljs.core.deref.call(null,typeahead_hidden_QMARK_));
}
})())?cljs.core.cst$kw$none:cljs.core.cst$kw$block)], null),cljs.core.cst$kw$class,list_class,cljs.core.cst$kw$on_DASH_mouse_DASH_enter,((function (visible__60225__auto__,temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60391,type,map__60392,map__60392__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60393,map__60393__$1,doc,get,save_BANG_){
return (function (){
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(mouse_on_list_QMARK_,true) : cljs.core.reset_BANG_.call(null,mouse_on_list_QMARK_,true));
});})(visible__60225__auto__,temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60391,type,map__60392,map__60392__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60393,map__60393__$1,doc,get,save_BANG_))
,cljs.core.cst$kw$on_DASH_mouse_DASH_leave,((function (visible__60225__auto__,temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60391,type,map__60392,map__60392__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60393,map__60393__$1,doc,get,save_BANG_){
return (function (){
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(mouse_on_list_QMARK_,false) : cljs.core.reset_BANG_.call(null,mouse_on_list_QMARK_,false));
});})(visible__60225__auto__,temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60391,type,map__60392,map__60392__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60393,map__60393__$1,doc,get,save_BANG_))
], null),cljs.core.doall.cljs$core$IFn$_invoke$arity$1(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(((function (visible__60225__auto__,temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60391,type,map__60392,map__60392__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60393,map__60393__$1,doc,get,save_BANG_){
return (function (index,result){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$tab_DASH_index,index,cljs.core.cst$kw$key,index,cljs.core.cst$kw$class,((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selected_index) : cljs.core.deref.call(null,selected_index)),index))?highlight_class:item_class),cljs.core.cst$kw$on_DASH_mouse_DASH_over,((function (visible__60225__auto__,temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60391,type,map__60392,map__60392__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60393,map__60393__$1,doc,get,save_BANG_){
return (function (p1__60388_SHARP_){
var G__60405 = selected_index;
var G__60406 = (function (){var G__60407 = p1__60388_SHARP_.target.getAttribute("tabIndex");
return parseInt(G__60407);
})();
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__60405,G__60406) : cljs.core.reset_BANG_.call(null,G__60405,G__60406));
});})(visible__60225__auto__,temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60391,type,map__60392,map__60392__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60393,map__60393__$1,doc,get,save_BANG_))
,cljs.core.cst$kw$on_DASH_click,((function (visible__60225__auto__,temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60391,type,map__60392,map__60392__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60393,map__60393__$1,doc,get,save_BANG_){
return (function (){
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(typeahead_hidden_QMARK_,true) : cljs.core.reset_BANG_.call(null,typeahead_hidden_QMARK_,true));

(save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(id,result) : save_BANG_.call(null,id,result));

return (choice_fn.cljs$core$IFn$_invoke$arity$1 ? choice_fn.cljs$core$IFn$_invoke$arity$1(result) : choice_fn.call(null,result));
});})(visible__60225__auto__,temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60391,type,map__60392,map__60392__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60393,map__60393__$1,doc,get,save_BANG_))
], null),(result_fn.cljs$core$IFn$_invoke$arity$1 ? result_fn.cljs$core$IFn$_invoke$arity$1(result) : result_fn.call(null,result))], null);
});})(visible__60225__auto__,temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60391,type,map__60392,map__60392__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60393,map__60393__$1,doc,get,save_BANG_))
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
})(),cljs.core.cst$kw$on_DASH_focus,((function (temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60391,type,map__60392,map__60392__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60393,map__60393__$1,doc,get,save_BANG_){
return (function (){
if(cljs.core.truth_(clear_on_focus_QMARK_)){
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(id,"") : save_BANG_.call(null,id,""));
} else {
return null;
}
});})(temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60391,type,map__60392,map__60392__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60393,map__60393__$1,doc,get,save_BANG_))
,cljs.core.cst$kw$on_DASH_blur,((function (temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60391,type,map__60392,map__60392__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60393,map__60393__$1,doc,get,save_BANG_){
return (function (){
if(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(mouse_on_list_QMARK_) : cljs.core.deref.call(null,mouse_on_list_QMARK_)))){
return null;
} else {
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(typeahead_hidden_QMARK_,true) : cljs.core.reset_BANG_.call(null,typeahead_hidden_QMARK_,true));

return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(selected_index,(0)) : cljs.core.reset_BANG_.call(null,selected_index,(0)));
}
});})(temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60391,type,map__60392,map__60392__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60393,map__60393__$1,doc,get,save_BANG_))
,cljs.core.cst$kw$on_DASH_change,((function (temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60391,type,map__60392,map__60392__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60393,map__60393__$1,doc,get,save_BANG_){
return (function (p1__60386_SHARP_){
var G__60409_60425 = selections;
var G__60410_60426 = (function (){var G__60411 = reagent_forms.core.value_of(p1__60386_SHARP_).toLowerCase();
return (data_source.cljs$core$IFn$_invoke$arity$1 ? data_source.cljs$core$IFn$_invoke$arity$1(G__60411) : data_source.call(null,G__60411));
})();
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__60409_60425,G__60410_60426) : cljs.core.reset_BANG_.call(null,G__60409_60425,G__60410_60426));

var G__60412_60427 = id;
var G__60413_60428 = reagent_forms.core.value_of(p1__60386_SHARP_);
(save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(G__60412_60427,G__60413_60428) : save_BANG_.call(null,G__60412_60427,G__60413_60428));

(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(typeahead_hidden_QMARK_,false) : cljs.core.reset_BANG_.call(null,typeahead_hidden_QMARK_,false));

return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(selected_index,(0)) : cljs.core.reset_BANG_.call(null,selected_index,(0)));
});})(temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60391,type,map__60392,map__60392__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60393,map__60393__$1,doc,get,save_BANG_))
,cljs.core.cst$kw$on_DASH_key_DASH_down,((function (temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60391,type,map__60392,map__60392__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60393,map__60393__$1,doc,get,save_BANG_){
return (function (p1__60387_SHARP_){
var G__60414 = p1__60387_SHARP_.which;
switch (G__60414) {
case (38):
p1__60387_SHARP_.preventDefault();

if(!(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selected_index) : cljs.core.deref.call(null,selected_index)),(0)))){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(selected_index,cljs.core.dec);
} else {
return null;
}

break;
case (40):
p1__60387_SHARP_.preventDefault();

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
});})(temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60391,type,map__60392,map__60392__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60393,map__60393__$1,doc,get,save_BANG_))
], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$ul,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$display,(cljs.core.truth_((function (){var or__4682__auto__ = cljs.core.empty_QMARK_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selections) : cljs.core.deref.call(null,selections)));
if(or__4682__auto__){
return or__4682__auto__;
} else {
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(typeahead_hidden_QMARK_) : cljs.core.deref.call(null,typeahead_hidden_QMARK_));
}
})())?cljs.core.cst$kw$none:cljs.core.cst$kw$block)], null),cljs.core.cst$kw$class,list_class,cljs.core.cst$kw$on_DASH_mouse_DASH_enter,((function (temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60391,type,map__60392,map__60392__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60393,map__60393__$1,doc,get,save_BANG_){
return (function (){
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(mouse_on_list_QMARK_,true) : cljs.core.reset_BANG_.call(null,mouse_on_list_QMARK_,true));
});})(temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60391,type,map__60392,map__60392__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60393,map__60393__$1,doc,get,save_BANG_))
,cljs.core.cst$kw$on_DASH_mouse_DASH_leave,((function (temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60391,type,map__60392,map__60392__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60393,map__60393__$1,doc,get,save_BANG_){
return (function (){
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(mouse_on_list_QMARK_,false) : cljs.core.reset_BANG_.call(null,mouse_on_list_QMARK_,false));
});})(temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60391,type,map__60392,map__60392__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60393,map__60393__$1,doc,get,save_BANG_))
], null),cljs.core.doall.cljs$core$IFn$_invoke$arity$1(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(((function (temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60391,type,map__60392,map__60392__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60393,map__60393__$1,doc,get,save_BANG_){
return (function (index,result){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$tab_DASH_index,index,cljs.core.cst$kw$key,index,cljs.core.cst$kw$class,((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selected_index) : cljs.core.deref.call(null,selected_index)),index))?highlight_class:item_class),cljs.core.cst$kw$on_DASH_mouse_DASH_over,((function (temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60391,type,map__60392,map__60392__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60393,map__60393__$1,doc,get,save_BANG_){
return (function (p1__60388_SHARP_){
var G__60416 = selected_index;
var G__60417 = (function (){var G__60418 = p1__60388_SHARP_.target.getAttribute("tabIndex");
return parseInt(G__60418);
})();
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__60416,G__60417) : cljs.core.reset_BANG_.call(null,G__60416,G__60417));
});})(temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60391,type,map__60392,map__60392__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60393,map__60393__$1,doc,get,save_BANG_))
,cljs.core.cst$kw$on_DASH_click,((function (temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60391,type,map__60392,map__60392__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60393,map__60393__$1,doc,get,save_BANG_){
return (function (){
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(typeahead_hidden_QMARK_,true) : cljs.core.reset_BANG_.call(null,typeahead_hidden_QMARK_,true));

(save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(id,result) : save_BANG_.call(null,id,result));

return (choice_fn.cljs$core$IFn$_invoke$arity$1 ? choice_fn.cljs$core$IFn$_invoke$arity$1(result) : choice_fn.call(null,result));
});})(temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60391,type,map__60392,map__60392__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60393,map__60393__$1,doc,get,save_BANG_))
], null),(result_fn.cljs$core$IFn$_invoke$arity$1 ? result_fn.cljs$core$IFn$_invoke$arity$1(result) : result_fn.call(null,result))], null);
});})(temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60391,type,map__60392,map__60392__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60393,map__60393__$1,doc,get,save_BANG_))
,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selections) : cljs.core.deref.call(null,selections))))], null)], null);
}
});
;})(typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60391,type,map__60392,map__60392__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60393,map__60393__$1,doc,get,save_BANG_))
}));
reagent_forms.core.group_item = (function reagent_forms$core$group_item(p__60430,p__60431,selections,field,id){
var vec__60461 = p__60430;
var type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60461,(0),null);
var map__60462 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60461,(1),null);
var map__60462__$1 = ((((!((map__60462 == null)))?((((map__60462.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60462.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60462):map__60462);
var attrs = map__60462__$1;
var key = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60462__$1,cljs.core.cst$kw$key);
var touch_event = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60462__$1,cljs.core.cst$kw$touch_DASH_event);
var body = cljs.core.nthnext(vec__60461,(2));
var map__60463 = p__60431;
var map__60463__$1 = ((((!((map__60463 == null)))?((((map__60463.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60463.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60463):map__60463);
var save_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60463__$1,cljs.core.cst$kw$save_BANG_);
var multi_select = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60463__$1,cljs.core.cst$kw$multi_DASH_select);
var handle_click_BANG_ = ((function (vec__60461,type,map__60462,map__60462__$1,attrs,key,touch_event,body,map__60463,map__60463__$1,save_BANG_,multi_select){
return (function reagent_forms$core$group_item_$_handle_click_BANG_(){
if(cljs.core.truth_(multi_select)){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(selections,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [key], null),cljs.core.not);

var G__60484 = id;
var G__60485 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.first,cljs.core.filter.cljs$core$IFn$_invoke$arity$2(cljs.core.second,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selections) : cljs.core.deref.call(null,selections))));
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(G__60484,G__60485) : save_BANG_.call(null,G__60484,G__60485));
} else {
var value = cljs.core.get.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selections) : cljs.core.deref.call(null,selections)),key);
var G__60486_60490 = selections;
var G__60487_60491 = cljs.core.PersistentArrayMap.fromArray([key,cljs.core.not(value)], true, false);
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__60486_60490,G__60487_60491) : cljs.core.reset_BANG_.call(null,G__60486_60490,G__60487_60491));

var G__60488 = id;
var G__60489 = (cljs.core.truth_(cljs.core.get.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selections) : cljs.core.deref.call(null,selections)),key))?key:null);
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(G__60488,G__60489) : save_BANG_.call(null,G__60488,G__60489));
}
});})(vec__60461,type,map__60462,map__60462__$1,attrs,key,touch_event,body,map__60463,map__60463__$1,save_BANG_,multi_select))
;
return ((function (vec__60461,type,map__60462,map__60462__$1,attrs,key,touch_event,body,map__60463,map__60463__$1,save_BANG_,multi_select){
return (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.PersistentArrayMap.fromArray([cljs.core.cst$kw$class,(cljs.core.truth_(cljs.core.get.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selections) : cljs.core.deref.call(null,selections)),key))?"active":null),(function (){var or__4682__auto__ = touch_event;
if(cljs.core.truth_(or__4682__auto__)){
return or__4682__auto__;
} else {
return cljs.core.cst$kw$on_DASH_click;
}
})(),handle_click_BANG_], true, false),attrs], 0)),body], null);
});
;})(vec__60461,type,map__60462,map__60462__$1,attrs,key,touch_event,body,map__60463,map__60463__$1,save_BANG_,multi_select))
});
reagent_forms.core.mk_selections = (function reagent_forms$core$mk_selections(id,selectors,p__60492){
var map__60499 = p__60492;
var map__60499__$1 = ((((!((map__60499 == null)))?((((map__60499.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60499.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60499):map__60499);
var get = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60499__$1,cljs.core.cst$kw$get);
var multi_select = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60499__$1,cljs.core.cst$kw$multi_DASH_select);
var value = (get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id));
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (value,map__60499,map__60499__$1,get,multi_select){
return (function (m,p__60501){
var vec__60502 = p__60501;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60502,(0),null);
var map__60503 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60502,(1),null);
var map__60503__$1 = ((((!((map__60503 == null)))?((((map__60503.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60503.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60503):map__60503);
var key = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60503__$1,cljs.core.cst$kw$key);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(m,key,cljs.core.boolean$(cljs.core.some(cljs.core.PersistentHashSet.fromArray([key], true),(cljs.core.truth_(multi_select)?value:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [value], null)))));
});})(value,map__60499,map__60499__$1,get,multi_select))
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
reagent_forms.core.selection_group = (function reagent_forms$core$selection_group(p__60507,p__60508){
var vec__60519 = p__60507;
var type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60519,(0),null);
var map__60520 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60519,(1),null);
var map__60520__$1 = ((((!((map__60520 == null)))?((((map__60520.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60520.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60520):map__60520);
var attrs = map__60520__$1;
var field = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60520__$1,cljs.core.cst$kw$field);
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60520__$1,cljs.core.cst$kw$id);
var selection_items = cljs.core.nthnext(vec__60519,(2));
var map__60521 = p__60508;
var map__60521__$1 = ((((!((map__60521 == null)))?((((map__60521.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60521.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60521):map__60521);
var opts = map__60521__$1;
var get = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60521__$1,cljs.core.cst$kw$get);
var selection_items__$1 = reagent_forms.core.extract_selectors(selection_items);
var selections = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(reagent_forms.core.mk_selections(id,selection_items__$1,opts));
var selectors = cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (selection_items__$1,selections,vec__60519,type,map__60520,map__60520__$1,attrs,field,id,selection_items,map__60521,map__60521__$1,opts,get){
return (function (item){
return new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$visible_QMARK_,cljs.core.cst$kw$visible_QMARK_.cljs$core$IFn$_invoke$arity$1(cljs.core.second(item)),cljs.core.cst$kw$selector,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_forms.core.group_item(item,opts,selections,field,id)], null)], null);
});})(selection_items__$1,selections,vec__60519,type,map__60520,map__60520__$1,attrs,field,id,selection_items,map__60521,map__60521__$1,opts,get))
,selection_items__$1);
return ((function (selection_items__$1,selections,selectors,vec__60519,type,map__60520,map__60520__$1,attrs,field,id,selection_items,map__60521,map__60521__$1,opts,get){
return (function (){
if(cljs.core.truth_((get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id)))){
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(selections,((function (selection_items__$1,selections,selectors,vec__60519,type,map__60520,map__60520__$1,attrs,field,id,selection_items,map__60521,map__60521__$1,opts,get){
return (function (p1__60505_SHARP_){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (selection_items__$1,selections,selectors,vec__60519,type,map__60520,map__60520__$1,attrs,field,id,selection_items,map__60521,map__60521__$1,opts,get){
return (function (p__60524){
var vec__60525 = p__60524;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60525,(0),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,false], null);
});})(selection_items__$1,selections,selectors,vec__60519,type,map__60520,map__60520__$1,attrs,field,id,selection_items,map__60521,map__60521__$1,opts,get))
,p1__60505_SHARP_));
});})(selection_items__$1,selections,selectors,vec__60519,type,map__60520,map__60520__$1,attrs,field,id,selection_items,map__60521,map__60521__$1,opts,get))
);
}

return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,attrs], null),cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$selector,cljs.core.filter.cljs$core$IFn$_invoke$arity$2(((function (selection_items__$1,selections,selectors,vec__60519,type,map__60520,map__60520__$1,attrs,field,id,selection_items,map__60521,map__60521__$1,opts,get){
return (function (p1__60506_SHARP_){
var temp__4651__auto__ = cljs.core.cst$kw$visible_QMARK_.cljs$core$IFn$_invoke$arity$1(p1__60506_SHARP_);
if(cljs.core.truth_(temp__4651__auto__)){
var visible_QMARK_ = temp__4651__auto__;
var G__60527 = (function (){var G__60528 = cljs.core.cst$kw$doc.cljs$core$IFn$_invoke$arity$1(opts);
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__60528) : cljs.core.deref.call(null,G__60528));
})();
return (visible_QMARK_.cljs$core$IFn$_invoke$arity$1 ? visible_QMARK_.cljs$core$IFn$_invoke$arity$1(G__60527) : visible_QMARK_.call(null,G__60527));
} else {
return true;
}
});})(selection_items__$1,selections,selectors,vec__60519,type,map__60520,map__60520__$1,attrs,field,id,selection_items,map__60521,map__60521__$1,opts,get))
,selectors)));
});
;})(selection_items__$1,selections,selectors,vec__60519,type,map__60520,map__60520__$1,attrs,field,id,selection_items,map__60521,map__60521__$1,opts,get))
});
reagent_forms.core.init_field.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$single_DASH_select,(function (p__60529,p__60530){
var vec__60531 = p__60529;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60531,(0),null);
var attrs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60531,(1),null);
var field = vec__60531;
var map__60532 = p__60530;
var map__60532__$1 = ((((!((map__60532 == null)))?((((map__60532.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60532.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60532):map__60532);
var opts = map__60532__$1;
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60532__$1,cljs.core.cst$kw$doc);
return ((function (vec__60531,_,attrs,field,map__60532,map__60532__$1,opts,doc){
return (function (){
var temp__4651__auto__ = cljs.core.cst$kw$visible_QMARK_.cljs$core$IFn$_invoke$arity$1(attrs);
if(cljs.core.truth_(temp__4651__auto__)){
var visible__60225__auto__ = temp__4651__auto__;
if(cljs.core.truth_((function (){var G__60534 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc));
return (visible__60225__auto__.cljs$core$IFn$_invoke$arity$1 ? visible__60225__auto__.cljs$core$IFn$_invoke$arity$1(G__60534) : visible__60225__auto__.call(null,G__60534));
})())){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_forms.core.selection_group,field,opts], null);
} else {
return null;
}
} else {
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_forms.core.selection_group,field,opts], null);
}
});
;})(vec__60531,_,attrs,field,map__60532,map__60532__$1,opts,doc))
}));
reagent_forms.core.init_field.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$multi_DASH_select,(function (p__60535,p__60536){
var vec__60537 = p__60535;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60537,(0),null);
var attrs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60537,(1),null);
var field = vec__60537;
var map__60538 = p__60536;
var map__60538__$1 = ((((!((map__60538 == null)))?((((map__60538.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60538.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60538):map__60538);
var opts = map__60538__$1;
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60538__$1,cljs.core.cst$kw$doc);
return ((function (vec__60537,_,attrs,field,map__60538,map__60538__$1,opts,doc){
return (function (){
var temp__4651__auto__ = cljs.core.cst$kw$visible_QMARK_.cljs$core$IFn$_invoke$arity$1(attrs);
if(cljs.core.truth_(temp__4651__auto__)){
var visible__60225__auto__ = temp__4651__auto__;
if(cljs.core.truth_((function (){var G__60540 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc));
return (visible__60225__auto__.cljs$core$IFn$_invoke$arity$1 ? visible__60225__auto__.cljs$core$IFn$_invoke$arity$1(G__60540) : visible__60225__auto__.call(null,G__60540));
})())){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_forms.core.selection_group,field,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(opts,cljs.core.cst$kw$multi_DASH_select,true)], null);
} else {
return null;
}
} else {
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_forms.core.selection_group,field,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(opts,cljs.core.cst$kw$multi_DASH_select,true)], null);
}
});
;})(vec__60537,_,attrs,field,map__60538,map__60538__$1,opts,doc))
}));
reagent_forms.core.map_options = (function reagent_forms$core$map_options(options){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__5454__auto__ = (function reagent_forms$core$map_options_$_iter__60559(s__60560){
return (new cljs.core.LazySeq(null,(function (){
var s__60560__$1 = s__60560;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__60560__$1);
if(temp__4653__auto__){
var s__60560__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__60560__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__60560__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__60562 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__60561 = (0);
while(true){
if((i__60561 < size__5453__auto__)){
var vec__60571 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__60561);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60571,(0),null);
var map__60572 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60571,(1),null);
var map__60572__$1 = ((((!((map__60572 == null)))?((((map__60572.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60572.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60572):map__60572);
var key = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60572__$1,cljs.core.cst$kw$key);
var label = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60571,(2),null);
cljs.core.chunk_append(b__60562,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [[cljs.core.str(label)].join(''),key], null));

var G__60577 = (i__60561 + (1));
i__60561 = G__60577;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__60562),reagent_forms$core$map_options_$_iter__60559(cljs.core.chunk_rest(s__60560__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__60562),null);
}
} else {
var vec__60574 = cljs.core.first(s__60560__$2);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60574,(0),null);
var map__60575 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60574,(1),null);
var map__60575__$1 = ((((!((map__60575 == null)))?((((map__60575.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60575.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60575):map__60575);
var key = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60575__$1,cljs.core.cst$kw$key);
var label = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60574,(2),null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [[cljs.core.str(label)].join(''),key], null),reagent_forms$core$map_options_$_iter__60559(cljs.core.rest(s__60560__$2)));
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
return cljs.core.last(cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__60578_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(v,cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(p1__60578_SHARP_,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(1),cljs.core.cst$kw$key], null)));
}),options)));
});
reagent_forms.core.init_field.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$list,(function (p__60581,p__60582){
var vec__60583 = p__60581;
var type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60583,(0),null);
var map__60584 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60583,(1),null);
var map__60584__$1 = ((((!((map__60584 == null)))?((((map__60584.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60584.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60584):map__60584);
var attrs = map__60584__$1;
var field = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60584__$1,cljs.core.cst$kw$field);
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60584__$1,cljs.core.cst$kw$id);
var options = cljs.core.nthnext(vec__60583,(2));
var map__60585 = p__60582;
var map__60585__$1 = ((((!((map__60585 == null)))?((((map__60585.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60585.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60585):map__60585);
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60585__$1,cljs.core.cst$kw$doc);
var get = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60585__$1,cljs.core.cst$kw$get);
var save_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60585__$1,cljs.core.cst$kw$save_BANG_);
var options__$1 = reagent_forms.core.extract_selectors(options);
var options_lookup = reagent_forms.core.map_options(options__$1);
var selection = reagent.core.atom.cljs$core$IFn$_invoke$arity$1((function (){var or__4682__auto__ = (get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id));
if(cljs.core.truth_(or__4682__auto__)){
return or__4682__auto__;
} else {
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.first(options__$1),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(1),cljs.core.cst$kw$key], null));
}
})());
var G__60588_60597 = id;
var G__60589_60598 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selection) : cljs.core.deref.call(null,selection));
(save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(G__60588_60597,G__60589_60598) : save_BANG_.call(null,G__60588_60597,G__60589_60598));

return ((function (options__$1,options_lookup,selection,vec__60583,type,map__60584,map__60584__$1,attrs,field,id,options,map__60585,map__60585__$1,doc,get,save_BANG_){
return (function (){
var temp__4651__auto__ = cljs.core.cst$kw$visible_QMARK_.cljs$core$IFn$_invoke$arity$1(attrs);
if(cljs.core.truth_(temp__4651__auto__)){
var visible__60225__auto__ = temp__4651__auto__;
if(cljs.core.truth_((function (){var G__60590 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc));
return (visible__60225__auto__.cljs$core$IFn$_invoke$arity$1 ? visible__60225__auto__.cljs$core$IFn$_invoke$arity$1(G__60590) : visible__60225__auto__.call(null,G__60590));
})())){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([attrs,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$default_DASH_value,reagent_forms.core.default_selection(options__$1,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selection) : cljs.core.deref.call(null,selection))),cljs.core.cst$kw$on_DASH_change,((function (visible__60225__auto__,temp__4651__auto__,options__$1,options_lookup,selection,vec__60583,type,map__60584,map__60584__$1,attrs,field,id,options,map__60585,map__60585__$1,doc,get,save_BANG_){
return (function (p1__60579_SHARP_){
var G__60591 = id;
var G__60592 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(options_lookup,reagent_forms.core.value_of(p1__60579_SHARP_));
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(G__60591,G__60592) : save_BANG_.call(null,G__60591,G__60592));
});})(visible__60225__auto__,temp__4651__auto__,options__$1,options_lookup,selection,vec__60583,type,map__60584,map__60584__$1,attrs,field,id,options,map__60585,map__60585__$1,doc,get,save_BANG_))
], null)], 0)),cljs.core.doall.cljs$core$IFn$_invoke$arity$1(cljs.core.filter.cljs$core$IFn$_invoke$arity$2(((function (visible__60225__auto__,temp__4651__auto__,options__$1,options_lookup,selection,vec__60583,type,map__60584,map__60584__$1,attrs,field,id,options,map__60585,map__60585__$1,doc,get,save_BANG_){
return (function (p1__60580_SHARP_){
var temp__4651__auto____$1 = cljs.core.cst$kw$visible_QMARK_.cljs$core$IFn$_invoke$arity$1(cljs.core.second(p1__60580_SHARP_));
if(cljs.core.truth_(temp__4651__auto____$1)){
var visible_QMARK_ = temp__4651__auto____$1;
var G__60593 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc));
return (visible_QMARK_.cljs$core$IFn$_invoke$arity$1 ? visible_QMARK_.cljs$core$IFn$_invoke$arity$1(G__60593) : visible_QMARK_.call(null,G__60593));
} else {
return true;
}
});})(visible__60225__auto__,temp__4651__auto__,options__$1,options_lookup,selection,vec__60583,type,map__60584,map__60584__$1,attrs,field,id,options,map__60585,map__60585__$1,doc,get,save_BANG_))
,options__$1))], null);
} else {
return null;
}
} else {
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([attrs,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$default_DASH_value,reagent_forms.core.default_selection(options__$1,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selection) : cljs.core.deref.call(null,selection))),cljs.core.cst$kw$on_DASH_change,((function (temp__4651__auto__,options__$1,options_lookup,selection,vec__60583,type,map__60584,map__60584__$1,attrs,field,id,options,map__60585,map__60585__$1,doc,get,save_BANG_){
return (function (p1__60579_SHARP_){
var G__60594 = id;
var G__60595 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(options_lookup,reagent_forms.core.value_of(p1__60579_SHARP_));
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(G__60594,G__60595) : save_BANG_.call(null,G__60594,G__60595));
});})(temp__4651__auto__,options__$1,options_lookup,selection,vec__60583,type,map__60584,map__60584__$1,attrs,field,id,options,map__60585,map__60585__$1,doc,get,save_BANG_))
], null)], 0)),cljs.core.doall.cljs$core$IFn$_invoke$arity$1(cljs.core.filter.cljs$core$IFn$_invoke$arity$2(((function (temp__4651__auto__,options__$1,options_lookup,selection,vec__60583,type,map__60584,map__60584__$1,attrs,field,id,options,map__60585,map__60585__$1,doc,get,save_BANG_){
return (function (p1__60580_SHARP_){
var temp__4651__auto____$1 = cljs.core.cst$kw$visible_QMARK_.cljs$core$IFn$_invoke$arity$1(cljs.core.second(p1__60580_SHARP_));
if(cljs.core.truth_(temp__4651__auto____$1)){
var visible_QMARK_ = temp__4651__auto____$1;
var G__60596 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc));
return (visible_QMARK_.cljs$core$IFn$_invoke$arity$1 ? visible_QMARK_.cljs$core$IFn$_invoke$arity$1(G__60596) : visible_QMARK_.call(null,G__60596));
} else {
return true;
}
});})(temp__4651__auto__,options__$1,options_lookup,selection,vec__60583,type,map__60584,map__60584__$1,attrs,field,id,options,map__60585,map__60585__$1,doc,get,save_BANG_))
,options__$1))], null);
}
});
;})(options__$1,options_lookup,selection,vec__60583,type,map__60584,map__60584__$1,attrs,field,id,options,map__60585,map__60585__$1,doc,get,save_BANG_))
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
var len__5740__auto___60603 = arguments.length;
var i__5741__auto___60604 = (0);
while(true){
if((i__5741__auto___60604 < len__5740__auto___60603)){
args__5747__auto__.push((arguments[i__5741__auto___60604]));

var G__60605 = (i__5741__auto___60604 + (1));
i__5741__auto___60604 = G__60605;
continue;
} else {
}
break;
}

var argseq__5748__auto__ = ((((2) < args__5747__auto__.length))?(new cljs.core.IndexedSeq(args__5747__auto__.slice((2)),(0))):null);
return reagent_forms.core.bind_fields.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__5748__auto__);
});

reagent_forms.core.bind_fields.cljs$core$IFn$_invoke$arity$variadic = (function (form,doc,events){
var opts = new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$doc,doc,cljs.core.cst$kw$get,(function (p1__60599_SHARP_){
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc)),(reagent_forms.core.id__GT_path.cljs$core$IFn$_invoke$arity$1 ? reagent_forms.core.id__GT_path.cljs$core$IFn$_invoke$arity$1(p1__60599_SHARP_) : reagent_forms.core.id__GT_path.call(null,p1__60599_SHARP_)));
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

reagent_forms.core.bind_fields.cljs$lang$applyTo = (function (seq60600){
var G__60601 = cljs.core.first(seq60600);
var seq60600__$1 = cljs.core.next(seq60600);
var G__60602 = cljs.core.first(seq60600__$1);
var seq60600__$2 = cljs.core.next(seq60600__$1);
return reagent_forms.core.bind_fields.cljs$core$IFn$_invoke$arity$variadic(G__60601,G__60602,seq60600__$2);
});
