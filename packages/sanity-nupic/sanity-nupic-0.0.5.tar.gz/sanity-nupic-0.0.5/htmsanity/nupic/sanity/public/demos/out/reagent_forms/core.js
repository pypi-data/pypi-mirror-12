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
return (function (p1__60236_SHARP_,p2__60235_SHARP_){
var or__4682__auto__ = (p2__60235_SHARP_.cljs$core$IFn$_invoke$arity$3 ? p2__60235_SHARP_.cljs$core$IFn$_invoke$arity$3(path,value,p1__60236_SHARP_) : p2__60235_SHARP_.call(null,path,value,p1__60236_SHARP_));
if(cljs.core.truth_(or__4682__auto__)){
return or__4682__auto__;
} else {
return p1__60236_SHARP_;
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
var G__60238 = (get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id));
return (wrapper.cljs$core$IFn$_invoke$arity$1 ? wrapper.cljs$core$IFn$_invoke$arity$1(G__60238) : wrapper.call(null,G__60238));
});
});
reagent_forms.core.wrap_save_fn = (function reagent_forms$core$wrap_save_fn(save_BANG_,wrapper){
return (function (id,value){
var G__60241 = id;
var G__60242 = (wrapper.cljs$core$IFn$_invoke$arity$1 ? wrapper.cljs$core$IFn$_invoke$arity$1(value) : wrapper.call(null,value));
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(G__60241,G__60242) : save_BANG_.call(null,G__60241,G__60242));
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
reagent_forms.core.format_type = (function (){var method_table__5595__auto__ = (function (){var G__60243 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__60243) : cljs.core.atom.call(null,G__60243));
})();
var prefer_table__5596__auto__ = (function (){var G__60244 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__60244) : cljs.core.atom.call(null,G__60244));
})();
var method_cache__5597__auto__ = (function (){var G__60245 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__60245) : cljs.core.atom.call(null,G__60245));
})();
var cached_hierarchy__5598__auto__ = (function (){var G__60246 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__60246) : cljs.core.atom.call(null,G__60246));
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
if(cljs.core.truth_((function (){var and__4670__auto__ = cljs.core.not((function (){var G__60250 = parseFloat(value);
return isNaN(G__60250);
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
reagent_forms.core.bind = (function (){var method_table__5595__auto__ = (function (){var G__60251 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__60251) : cljs.core.atom.call(null,G__60251));
})();
var prefer_table__5596__auto__ = (function (){var G__60252 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__60252) : cljs.core.atom.call(null,G__60252));
})();
var method_cache__5597__auto__ = (function (){var G__60253 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__60253) : cljs.core.atom.call(null,G__60253));
})();
var cached_hierarchy__5598__auto__ = (function (){var G__60254 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__60254) : cljs.core.atom.call(null,G__60254));
})();
var hierarchy__5599__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.cst$kw$hierarchy,cljs.core.get_global_hierarchy());
return (new cljs.core.MultiFn(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("reagent-forms.core","bind"),((function (method_table__5595__auto__,prefer_table__5596__auto__,method_cache__5597__auto__,cached_hierarchy__5598__auto__,hierarchy__5599__auto__){
return (function (p__60255,_){
var map__60256 = p__60255;
var map__60256__$1 = ((((!((map__60256 == null)))?((((map__60256.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60256.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60256):map__60256);
var field = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60256__$1,cljs.core.cst$kw$field);
if(cljs.core.truth_(cljs.core.some(cljs.core.PersistentHashSet.fromArray([field], true),new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$text,cljs.core.cst$kw$numeric,cljs.core.cst$kw$password,cljs.core.cst$kw$email,cljs.core.cst$kw$tel,cljs.core.cst$kw$range,cljs.core.cst$kw$textarea], null)))){
return cljs.core.cst$kw$input_DASH_field;
} else {
return field;
}
});})(method_table__5595__auto__,prefer_table__5596__auto__,method_cache__5597__auto__,cached_hierarchy__5598__auto__,hierarchy__5599__auto__))
,cljs.core.cst$kw$default,hierarchy__5599__auto__,method_table__5595__auto__,prefer_table__5596__auto__,method_cache__5597__auto__,cached_hierarchy__5598__auto__));
})();
}
reagent_forms.core.bind.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$input_DASH_field,(function (p__60259,p__60260){
var map__60261 = p__60259;
var map__60261__$1 = ((((!((map__60261 == null)))?((((map__60261.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60261.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60261):map__60261);
var field = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60261__$1,cljs.core.cst$kw$field);
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60261__$1,cljs.core.cst$kw$id);
var fmt = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60261__$1,cljs.core.cst$kw$fmt);
var map__60262 = p__60260;
var map__60262__$1 = ((((!((map__60262 == null)))?((((map__60262.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60262.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60262):map__60262);
var get = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60262__$1,cljs.core.cst$kw$get);
var save_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60262__$1,cljs.core.cst$kw$save_BANG_);
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60262__$1,cljs.core.cst$kw$doc);
return new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$value,(function (){var value = (function (){var or__4682__auto__ = (get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id));
if(cljs.core.truth_(or__4682__auto__)){
return or__4682__auto__;
} else {
return "";
}
})();
return reagent_forms.core.format_value(fmt,value);
})(),cljs.core.cst$kw$on_DASH_change,((function (map__60261,map__60261__$1,field,id,fmt,map__60262,map__60262__$1,get,save_BANG_,doc){
return (function (p1__60258_SHARP_){
var G__60267 = id;
var G__60268 = (function (){var G__60269 = field;
var G__60270 = reagent_forms.core.value_of(p1__60258_SHARP_);
return (reagent_forms.core.format_type.cljs$core$IFn$_invoke$arity$2 ? reagent_forms.core.format_type.cljs$core$IFn$_invoke$arity$2(G__60269,G__60270) : reagent_forms.core.format_type.call(null,G__60269,G__60270));
})();
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(G__60267,G__60268) : save_BANG_.call(null,G__60267,G__60268));
});})(map__60261,map__60261__$1,field,id,fmt,map__60262,map__60262__$1,get,save_BANG_,doc))
], null);
}));
reagent_forms.core.bind.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$checkbox,(function (p__60271,p__60272){
var map__60273 = p__60271;
var map__60273__$1 = ((((!((map__60273 == null)))?((((map__60273.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60273.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60273):map__60273);
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60273__$1,cljs.core.cst$kw$id);
var map__60274 = p__60272;
var map__60274__$1 = ((((!((map__60274 == null)))?((((map__60274.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60274.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60274):map__60274);
var get = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60274__$1,cljs.core.cst$kw$get);
var save_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60274__$1,cljs.core.cst$kw$save_BANG_);
return new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$checked,(get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id)),cljs.core.cst$kw$on_DASH_change,((function (map__60273,map__60273__$1,id,map__60274,map__60274__$1,get,save_BANG_){
return (function (){
var G__60277 = id;
var G__60278 = cljs.core.not((get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id)));
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(G__60277,G__60278) : save_BANG_.call(null,G__60277,G__60278));
});})(map__60273,map__60273__$1,id,map__60274,map__60274__$1,get,save_BANG_))
], null);
}));
reagent_forms.core.bind.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$default,(function (_,___$1){
return null;
}));
reagent_forms.core.set_attrs = (function reagent_forms$core$set_attrs(var_args){
var args__5747__auto__ = [];
var len__5740__auto___60286 = arguments.length;
var i__5741__auto___60287 = (0);
while(true){
if((i__5741__auto___60287 < len__5740__auto___60286)){
args__5747__auto__.push((arguments[i__5741__auto___60287]));

var G__60288 = (i__5741__auto___60287 + (1));
i__5741__auto___60287 = G__60288;
continue;
} else {
}
break;
}

var argseq__5748__auto__ = ((((2) < args__5747__auto__.length))?(new cljs.core.IndexedSeq(args__5747__auto__.slice((2)),(0))):null);
return reagent_forms.core.set_attrs.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__5748__auto__);
});

reagent_forms.core.set_attrs.cljs$core$IFn$_invoke$arity$variadic = (function (p__60282,opts,p__60283){
var vec__60284 = p__60282;
var type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60284,(0),null);
var attrs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60284,(1),null);
var body = cljs.core.nthnext(vec__60284,(2));
var vec__60285 = p__60283;
var default_attrs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60285,(0),null);
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([default_attrs,(reagent_forms.core.bind.cljs$core$IFn$_invoke$arity$2 ? reagent_forms.core.bind.cljs$core$IFn$_invoke$arity$2(attrs,opts) : reagent_forms.core.bind.call(null,attrs,opts)),attrs], 0))], null),body);
});

reagent_forms.core.set_attrs.cljs$lang$maxFixedArity = (2);

reagent_forms.core.set_attrs.cljs$lang$applyTo = (function (seq60279){
var G__60280 = cljs.core.first(seq60279);
var seq60279__$1 = cljs.core.next(seq60279);
var G__60281 = cljs.core.first(seq60279__$1);
var seq60279__$2 = cljs.core.next(seq60279__$1);
return reagent_forms.core.set_attrs.cljs$core$IFn$_invoke$arity$variadic(G__60280,G__60281,seq60279__$2);
});
if(typeof reagent_forms.core.init_field !== 'undefined'){
} else {
reagent_forms.core.init_field = (function (){var method_table__5595__auto__ = (function (){var G__60289 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__60289) : cljs.core.atom.call(null,G__60289));
})();
var prefer_table__5596__auto__ = (function (){var G__60290 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__60290) : cljs.core.atom.call(null,G__60290));
})();
var method_cache__5597__auto__ = (function (){var G__60291 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__60291) : cljs.core.atom.call(null,G__60291));
})();
var cached_hierarchy__5598__auto__ = (function (){var G__60292 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__60292) : cljs.core.atom.call(null,G__60292));
})();
var hierarchy__5599__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.cst$kw$hierarchy,cljs.core.get_global_hierarchy());
return (new cljs.core.MultiFn(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("reagent-forms.core","init-field"),((function (method_table__5595__auto__,prefer_table__5596__auto__,method_cache__5597__auto__,cached_hierarchy__5598__auto__,hierarchy__5599__auto__){
return (function (p__60293,_){
var vec__60294 = p__60293;
var ___$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60294,(0),null);
var map__60295 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60294,(1),null);
var map__60295__$1 = ((((!((map__60295 == null)))?((((map__60295.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60295.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60295):map__60295);
var field = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60295__$1,cljs.core.cst$kw$field);
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
reagent_forms.core.init_field.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$container,(function (p__60298,p__60299){
var vec__60300 = p__60298;
var type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60300,(0),null);
var map__60301 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60300,(1),null);
var map__60301__$1 = ((((!((map__60301 == null)))?((((map__60301.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60301.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60301):map__60301);
var attrs = map__60301__$1;
var valid_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60301__$1,cljs.core.cst$kw$valid_QMARK_);
var body = cljs.core.nthnext(vec__60300,(2));
var map__60302 = p__60299;
var map__60302__$1 = ((((!((map__60302 == null)))?((((map__60302.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60302.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60302):map__60302);
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60302__$1,cljs.core.cst$kw$doc);
return ((function (vec__60300,type,map__60301,map__60301__$1,attrs,valid_QMARK_,body,map__60302,map__60302__$1,doc){
return (function (){
var temp__4651__auto__ = cljs.core.cst$kw$visible_QMARK_.cljs$core$IFn$_invoke$arity$1(attrs);
if(cljs.core.truth_(temp__4651__auto__)){
var visible__60227__auto__ = temp__4651__auto__;
if(cljs.core.truth_((function (){var G__60305 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc));
return (visible__60227__auto__.cljs$core$IFn$_invoke$arity$1 ? visible__60227__auto__.cljs$core$IFn$_invoke$arity$1(G__60305) : visible__60227__auto__.call(null,G__60305));
})())){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,(function (){var temp__4651__auto____$1 = (cljs.core.truth_(valid_QMARK_)?(function (){var G__60306 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc));
return (valid_QMARK_.cljs$core$IFn$_invoke$arity$1 ? valid_QMARK_.cljs$core$IFn$_invoke$arity$1(G__60306) : valid_QMARK_.call(null,G__60306));
})():null);
if(cljs.core.truth_(temp__4651__auto____$1)){
var valid_class = temp__4651__auto____$1;
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(attrs,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$class], null),((function (valid_class,temp__4651__auto____$1,visible__60227__auto__,temp__4651__auto__,vec__60300,type,map__60301,map__60301__$1,attrs,valid_QMARK_,body,map__60302,map__60302__$1,doc){
return (function (p1__60297_SHARP_){
if(!(cljs.core.empty_QMARK_(p1__60297_SHARP_))){
return [cljs.core.str(p1__60297_SHARP_),cljs.core.str(" "),cljs.core.str(valid_class)].join('');
} else {
return valid_class;
}
});})(valid_class,temp__4651__auto____$1,visible__60227__auto__,temp__4651__auto__,vec__60300,type,map__60301,map__60301__$1,attrs,valid_QMARK_,body,map__60302,map__60302__$1,doc))
);
} else {
return attrs;
}
})()], null),body);
} else {
return null;
}
} else {
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,(function (){var temp__4651__auto____$1 = (cljs.core.truth_(valid_QMARK_)?(function (){var G__60307 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc));
return (valid_QMARK_.cljs$core$IFn$_invoke$arity$1 ? valid_QMARK_.cljs$core$IFn$_invoke$arity$1(G__60307) : valid_QMARK_.call(null,G__60307));
})():null);
if(cljs.core.truth_(temp__4651__auto____$1)){
var valid_class = temp__4651__auto____$1;
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(attrs,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$class], null),((function (valid_class,temp__4651__auto____$1,temp__4651__auto__,vec__60300,type,map__60301,map__60301__$1,attrs,valid_QMARK_,body,map__60302,map__60302__$1,doc){
return (function (p1__60297_SHARP_){
if(!(cljs.core.empty_QMARK_(p1__60297_SHARP_))){
return [cljs.core.str(p1__60297_SHARP_),cljs.core.str(" "),cljs.core.str(valid_class)].join('');
} else {
return valid_class;
}
});})(valid_class,temp__4651__auto____$1,temp__4651__auto__,vec__60300,type,map__60301,map__60301__$1,attrs,valid_QMARK_,body,map__60302,map__60302__$1,doc))
);
} else {
return attrs;
}
})()], null),body);
}
});
;})(vec__60300,type,map__60301,map__60301__$1,attrs,valid_QMARK_,body,map__60302,map__60302__$1,doc))
}));
reagent_forms.core.init_field.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$input_DASH_field,(function (p__60308,p__60309){
var vec__60310 = p__60308;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60310,(0),null);
var map__60311 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60310,(1),null);
var map__60311__$1 = ((((!((map__60311 == null)))?((((map__60311.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60311.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60311):map__60311);
var attrs = map__60311__$1;
var field = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60311__$1,cljs.core.cst$kw$field);
var component = vec__60310;
var map__60312 = p__60309;
var map__60312__$1 = ((((!((map__60312 == null)))?((((map__60312.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60312.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60312):map__60312);
var opts = map__60312__$1;
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60312__$1,cljs.core.cst$kw$doc);
return ((function (vec__60310,_,map__60311,map__60311__$1,attrs,field,component,map__60312,map__60312__$1,opts,doc){
return (function (){
var temp__4651__auto__ = cljs.core.cst$kw$visible_QMARK_.cljs$core$IFn$_invoke$arity$1(attrs);
if(cljs.core.truth_(temp__4651__auto__)){
var visible__60227__auto__ = temp__4651__auto__;
if(cljs.core.truth_((function (){var G__60315 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc));
return (visible__60227__auto__.cljs$core$IFn$_invoke$arity$1 ? visible__60227__auto__.cljs$core$IFn$_invoke$arity$1(G__60315) : visible__60227__auto__.call(null,G__60315));
})())){
return reagent_forms.core.set_attrs.cljs$core$IFn$_invoke$arity$variadic(component,opts,cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$type,field], null)], 0));
} else {
return null;
}
} else {
return reagent_forms.core.set_attrs.cljs$core$IFn$_invoke$arity$variadic(component,opts,cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$type,field], null)], 0));
}
});
;})(vec__60310,_,map__60311,map__60311__$1,attrs,field,component,map__60312,map__60312__$1,opts,doc))
}));
reagent_forms.core.init_field.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$numeric,(function (p__60317,p__60318){
var vec__60319 = p__60317;
var type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60319,(0),null);
var map__60320 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60319,(1),null);
var map__60320__$1 = ((((!((map__60320 == null)))?((((map__60320.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60320.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60320):map__60320);
var attrs = map__60320__$1;
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60320__$1,cljs.core.cst$kw$id);
var fmt = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60320__$1,cljs.core.cst$kw$fmt);
var map__60321 = p__60318;
var map__60321__$1 = ((((!((map__60321 == null)))?((((map__60321.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60321.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60321):map__60321);
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60321__$1,cljs.core.cst$kw$doc);
var get = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60321__$1,cljs.core.cst$kw$get);
var save_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60321__$1,cljs.core.cst$kw$save_BANG_);
var display_value = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$changed_DASH_self_QMARK_,false,cljs.core.cst$kw$value,(get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id))], null));
return ((function (display_value,vec__60319,type,map__60320,map__60320__$1,attrs,id,fmt,map__60321,map__60321__$1,doc,get,save_BANG_){
return (function (){
var temp__4651__auto__ = cljs.core.cst$kw$visible_QMARK_.cljs$core$IFn$_invoke$arity$1(attrs);
if(cljs.core.truth_(temp__4651__auto__)){
var visible__60227__auto__ = temp__4651__auto__;
if(cljs.core.truth_((function (){var G__60324 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc));
return (visible__60227__auto__.cljs$core$IFn$_invoke$arity$1 ? visible__60227__auto__.cljs$core$IFn$_invoke$arity$1(G__60324) : visible__60227__auto__.call(null,G__60324));
})())){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,cljs.core.cst$kw$text,cljs.core.cst$kw$value,(function (){var doc_value = (function (){var or__4682__auto__ = (get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id));
if(cljs.core.truth_(or__4682__auto__)){
return or__4682__auto__;
} else {
return "";
}
})();
var map__60325 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(display_value) : cljs.core.deref.call(null,display_value));
var map__60325__$1 = ((((!((map__60325 == null)))?((((map__60325.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60325.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60325):map__60325);
var changed_self_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60325__$1,cljs.core.cst$kw$changed_DASH_self_QMARK_);
var value = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60325__$1,cljs.core.cst$kw$value);
var value__$1 = (cljs.core.truth_(changed_self_QMARK_)?value:doc_value);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(display_value,cljs.core.dissoc,cljs.core.cst$kw$changed_DASH_self_QMARK_);

return reagent_forms.core.format_value(fmt,value__$1);
})(),cljs.core.cst$kw$on_DASH_change,((function (visible__60227__auto__,temp__4651__auto__,display_value,vec__60319,type,map__60320,map__60320__$1,attrs,id,fmt,map__60321,map__60321__$1,doc,get,save_BANG_){
return (function (p1__60316_SHARP_){
var temp__4651__auto____$1 = (function (){var G__60327 = cljs.core.cst$kw$numeric;
var G__60328 = reagent_forms.core.value_of(p1__60316_SHARP_);
return (reagent_forms.core.format_type.cljs$core$IFn$_invoke$arity$2 ? reagent_forms.core.format_type.cljs$core$IFn$_invoke$arity$2(G__60327,G__60328) : reagent_forms.core.format_type.call(null,G__60327,G__60328));
})();
if(cljs.core.truth_(temp__4651__auto____$1)){
var value = temp__4651__auto____$1;
var G__60329_60341 = display_value;
var G__60330_60342 = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$changed_DASH_self_QMARK_,true,cljs.core.cst$kw$value,value], null);
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__60329_60341,G__60330_60342) : cljs.core.reset_BANG_.call(null,G__60329_60341,G__60330_60342));

var G__60331 = id;
var G__60332 = parseFloat(value);
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(G__60331,G__60332) : save_BANG_.call(null,G__60331,G__60332));
} else {
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(id,null) : save_BANG_.call(null,id,null));
}
});})(visible__60227__auto__,temp__4651__auto__,display_value,vec__60319,type,map__60320,map__60320__$1,attrs,id,fmt,map__60321,map__60321__$1,doc,get,save_BANG_))
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
var map__60333 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(display_value) : cljs.core.deref.call(null,display_value));
var map__60333__$1 = ((((!((map__60333 == null)))?((((map__60333.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60333.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60333):map__60333);
var changed_self_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60333__$1,cljs.core.cst$kw$changed_DASH_self_QMARK_);
var value = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60333__$1,cljs.core.cst$kw$value);
var value__$1 = (cljs.core.truth_(changed_self_QMARK_)?value:doc_value);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(display_value,cljs.core.dissoc,cljs.core.cst$kw$changed_DASH_self_QMARK_);

return reagent_forms.core.format_value(fmt,value__$1);
})(),cljs.core.cst$kw$on_DASH_change,((function (temp__4651__auto__,display_value,vec__60319,type,map__60320,map__60320__$1,attrs,id,fmt,map__60321,map__60321__$1,doc,get,save_BANG_){
return (function (p1__60316_SHARP_){
var temp__4651__auto____$1 = (function (){var G__60335 = cljs.core.cst$kw$numeric;
var G__60336 = reagent_forms.core.value_of(p1__60316_SHARP_);
return (reagent_forms.core.format_type.cljs$core$IFn$_invoke$arity$2 ? reagent_forms.core.format_type.cljs$core$IFn$_invoke$arity$2(G__60335,G__60336) : reagent_forms.core.format_type.call(null,G__60335,G__60336));
})();
if(cljs.core.truth_(temp__4651__auto____$1)){
var value = temp__4651__auto____$1;
var G__60337_60343 = display_value;
var G__60338_60344 = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$changed_DASH_self_QMARK_,true,cljs.core.cst$kw$value,value], null);
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__60337_60343,G__60338_60344) : cljs.core.reset_BANG_.call(null,G__60337_60343,G__60338_60344));

var G__60339 = id;
var G__60340 = parseFloat(value);
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(G__60339,G__60340) : save_BANG_.call(null,G__60339,G__60340));
} else {
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(id,null) : save_BANG_.call(null,id,null));
}
});})(temp__4651__auto__,display_value,vec__60319,type,map__60320,map__60320__$1,attrs,id,fmt,map__60321,map__60321__$1,doc,get,save_BANG_))
], null),attrs], 0))], null);
}
});
;})(display_value,vec__60319,type,map__60320,map__60320__$1,attrs,id,fmt,map__60321,map__60321__$1,doc,get,save_BANG_))
}));
reagent_forms.core.init_field.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$datepicker,(function (p__60346,p__60347){
var vec__60348 = p__60346;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60348,(0),null);
var map__60349 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60348,(1),null);
var map__60349__$1 = ((((!((map__60349 == null)))?((((map__60349.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60349.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60349):map__60349);
var attrs = map__60349__$1;
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60349__$1,cljs.core.cst$kw$id);
var date_format = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60349__$1,cljs.core.cst$kw$date_DASH_format);
var inline = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60349__$1,cljs.core.cst$kw$inline);
var auto_close_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60349__$1,cljs.core.cst$kw$auto_DASH_close_QMARK_);
var map__60350 = p__60347;
var map__60350__$1 = ((((!((map__60350 == null)))?((((map__60350.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60350.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60350):map__60350);
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60350__$1,cljs.core.cst$kw$doc);
var get = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60350__$1,cljs.core.cst$kw$get);
var save_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60350__$1,cljs.core.cst$kw$save_BANG_);
var fmt = reagent_forms.datepicker.parse_format(date_format);
var today = (new Date());
var expanded_QMARK_ = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(false);
return ((function (fmt,today,expanded_QMARK_,vec__60348,_,map__60349,map__60349__$1,attrs,id,date_format,inline,auto_close_QMARK_,map__60350,map__60350__$1,doc,get,save_BANG_){
return (function (){
var temp__4651__auto__ = cljs.core.cst$kw$visible_QMARK_.cljs$core$IFn$_invoke$arity$1(attrs);
if(cljs.core.truth_(temp__4651__auto__)){
var visible__60227__auto__ = temp__4651__auto__;
if(cljs.core.truth_((function (){var G__60353 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc));
return (visible__60227__auto__.cljs$core$IFn$_invoke$arity$1 ? visible__60227__auto__.cljs$core$IFn$_invoke$arity$1(G__60353) : visible__60227__auto__.call(null,G__60353));
})())){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$datepicker_DASH_wrapper,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$input_DASH_group$date,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input$form_DASH_control,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([attrs,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$read_DASH_only,true,cljs.core.cst$kw$type,cljs.core.cst$kw$text,cljs.core.cst$kw$on_DASH_click,((function (visible__60227__auto__,temp__4651__auto__,fmt,today,expanded_QMARK_,vec__60348,_,map__60349,map__60349__$1,attrs,id,date_format,inline,auto_close_QMARK_,map__60350,map__60350__$1,doc,get,save_BANG_){
return (function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(expanded_QMARK_,cljs.core.not);
});})(visible__60227__auto__,temp__4651__auto__,fmt,today,expanded_QMARK_,vec__60348,_,map__60349,map__60349__$1,attrs,id,date_format,inline,auto_close_QMARK_,map__60350,map__60350__$1,doc,get,save_BANG_))
,cljs.core.cst$kw$value,(function (){var temp__4653__auto__ = (get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id));
if(cljs.core.truth_(temp__4653__auto__)){
var date = temp__4653__auto__;
return reagent_forms.datepicker.format_date(date,fmt);
} else {
return null;
}
})()], null)], 0))], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$input_DASH_group_DASH_addon,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$on_DASH_click,((function (visible__60227__auto__,temp__4651__auto__,fmt,today,expanded_QMARK_,vec__60348,_,map__60349,map__60349__$1,attrs,id,date_format,inline,auto_close_QMARK_,map__60350,map__60350__$1,doc,get,save_BANG_){
return (function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(expanded_QMARK_,cljs.core.not);
});})(visible__60227__auto__,temp__4651__auto__,fmt,today,expanded_QMARK_,vec__60348,_,map__60349,map__60349__$1,attrs,id,date_format,inline,auto_close_QMARK_,map__60350,map__60350__$1,doc,get,save_BANG_))
], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$i$glyphicon$glyphicon_DASH_calendar], null)], null)], null),new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_forms.datepicker.datepicker,today.getFullYear(),today.getMonth(),today.getDate(),expanded_QMARK_,auto_close_QMARK_,((function (visible__60227__auto__,temp__4651__auto__,fmt,today,expanded_QMARK_,vec__60348,_,map__60349,map__60349__$1,attrs,id,date_format,inline,auto_close_QMARK_,map__60350,map__60350__$1,doc,get,save_BANG_){
return (function (){
return (get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id));
});})(visible__60227__auto__,temp__4651__auto__,fmt,today,expanded_QMARK_,vec__60348,_,map__60349,map__60349__$1,attrs,id,date_format,inline,auto_close_QMARK_,map__60350,map__60350__$1,doc,get,save_BANG_))
,((function (visible__60227__auto__,temp__4651__auto__,fmt,today,expanded_QMARK_,vec__60348,_,map__60349,map__60349__$1,attrs,id,date_format,inline,auto_close_QMARK_,map__60350,map__60350__$1,doc,get,save_BANG_){
return (function (p1__60345_SHARP_){
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(id,p1__60345_SHARP_) : save_BANG_.call(null,id,p1__60345_SHARP_));
});})(visible__60227__auto__,temp__4651__auto__,fmt,today,expanded_QMARK_,vec__60348,_,map__60349,map__60349__$1,attrs,id,date_format,inline,auto_close_QMARK_,map__60350,map__60350__$1,doc,get,save_BANG_))
,inline], null)], null);
} else {
return null;
}
} else {
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$datepicker_DASH_wrapper,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$input_DASH_group$date,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input$form_DASH_control,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([attrs,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$read_DASH_only,true,cljs.core.cst$kw$type,cljs.core.cst$kw$text,cljs.core.cst$kw$on_DASH_click,((function (temp__4651__auto__,fmt,today,expanded_QMARK_,vec__60348,_,map__60349,map__60349__$1,attrs,id,date_format,inline,auto_close_QMARK_,map__60350,map__60350__$1,doc,get,save_BANG_){
return (function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(expanded_QMARK_,cljs.core.not);
});})(temp__4651__auto__,fmt,today,expanded_QMARK_,vec__60348,_,map__60349,map__60349__$1,attrs,id,date_format,inline,auto_close_QMARK_,map__60350,map__60350__$1,doc,get,save_BANG_))
,cljs.core.cst$kw$value,(function (){var temp__4653__auto__ = (get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id));
if(cljs.core.truth_(temp__4653__auto__)){
var date = temp__4653__auto__;
return reagent_forms.datepicker.format_date(date,fmt);
} else {
return null;
}
})()], null)], 0))], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$input_DASH_group_DASH_addon,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$on_DASH_click,((function (temp__4651__auto__,fmt,today,expanded_QMARK_,vec__60348,_,map__60349,map__60349__$1,attrs,id,date_format,inline,auto_close_QMARK_,map__60350,map__60350__$1,doc,get,save_BANG_){
return (function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(expanded_QMARK_,cljs.core.not);
});})(temp__4651__auto__,fmt,today,expanded_QMARK_,vec__60348,_,map__60349,map__60349__$1,attrs,id,date_format,inline,auto_close_QMARK_,map__60350,map__60350__$1,doc,get,save_BANG_))
], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$i$glyphicon$glyphicon_DASH_calendar], null)], null)], null),new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_forms.datepicker.datepicker,today.getFullYear(),today.getMonth(),today.getDate(),expanded_QMARK_,auto_close_QMARK_,((function (temp__4651__auto__,fmt,today,expanded_QMARK_,vec__60348,_,map__60349,map__60349__$1,attrs,id,date_format,inline,auto_close_QMARK_,map__60350,map__60350__$1,doc,get,save_BANG_){
return (function (){
return (get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id));
});})(temp__4651__auto__,fmt,today,expanded_QMARK_,vec__60348,_,map__60349,map__60349__$1,attrs,id,date_format,inline,auto_close_QMARK_,map__60350,map__60350__$1,doc,get,save_BANG_))
,((function (temp__4651__auto__,fmt,today,expanded_QMARK_,vec__60348,_,map__60349,map__60349__$1,attrs,id,date_format,inline,auto_close_QMARK_,map__60350,map__60350__$1,doc,get,save_BANG_){
return (function (p1__60345_SHARP_){
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(id,p1__60345_SHARP_) : save_BANG_.call(null,id,p1__60345_SHARP_));
});})(temp__4651__auto__,fmt,today,expanded_QMARK_,vec__60348,_,map__60349,map__60349__$1,attrs,id,date_format,inline,auto_close_QMARK_,map__60350,map__60350__$1,doc,get,save_BANG_))
,inline], null)], null);
}
});
;})(fmt,today,expanded_QMARK_,vec__60348,_,map__60349,map__60349__$1,attrs,id,date_format,inline,auto_close_QMARK_,map__60350,map__60350__$1,doc,get,save_BANG_))
}));
reagent_forms.core.init_field.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$checkbox,(function (p__60354,p__60355){
var vec__60356 = p__60354;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60356,(0),null);
var map__60357 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60356,(1),null);
var map__60357__$1 = ((((!((map__60357 == null)))?((((map__60357.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60357.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60357):map__60357);
var attrs = map__60357__$1;
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60357__$1,cljs.core.cst$kw$id);
var field = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60357__$1,cljs.core.cst$kw$field);
var component = vec__60356;
var map__60358 = p__60355;
var map__60358__$1 = ((((!((map__60358 == null)))?((((map__60358.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60358.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60358):map__60358);
var opts = map__60358__$1;
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60358__$1,cljs.core.cst$kw$doc);
var get = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60358__$1,cljs.core.cst$kw$get);
return ((function (vec__60356,_,map__60357,map__60357__$1,attrs,id,field,component,map__60358,map__60358__$1,opts,doc,get){
return (function (){
var temp__4651__auto__ = cljs.core.cst$kw$visible_QMARK_.cljs$core$IFn$_invoke$arity$1(attrs);
if(cljs.core.truth_(temp__4651__auto__)){
var visible__60227__auto__ = temp__4651__auto__;
if(cljs.core.truth_((function (){var G__60361 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc));
return (visible__60227__auto__.cljs$core$IFn$_invoke$arity$1 ? visible__60227__auto__.cljs$core$IFn$_invoke$arity$1(G__60361) : visible__60227__auto__.call(null,G__60361));
})())){
return reagent_forms.core.set_attrs.cljs$core$IFn$_invoke$arity$variadic(component,opts,cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$type,field], null)], 0));
} else {
return null;
}
} else {
return reagent_forms.core.set_attrs.cljs$core$IFn$_invoke$arity$variadic(component,opts,cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$type,field], null)], 0));
}
});
;})(vec__60356,_,map__60357,map__60357__$1,attrs,id,field,component,map__60358,map__60358__$1,opts,doc,get))
}));
reagent_forms.core.init_field.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$label,(function (p__60362,p__60363){
var vec__60364 = p__60362;
var type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60364,(0),null);
var map__60365 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60364,(1),null);
var map__60365__$1 = ((((!((map__60365 == null)))?((((map__60365.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60365.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60365):map__60365);
var attrs = map__60365__$1;
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60365__$1,cljs.core.cst$kw$id);
var preamble = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60365__$1,cljs.core.cst$kw$preamble);
var postamble = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60365__$1,cljs.core.cst$kw$postamble);
var placeholder = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60365__$1,cljs.core.cst$kw$placeholder);
var map__60366 = p__60363;
var map__60366__$1 = ((((!((map__60366 == null)))?((((map__60366.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60366.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60366):map__60366);
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60366__$1,cljs.core.cst$kw$doc);
var get = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60366__$1,cljs.core.cst$kw$get);
return ((function (vec__60364,type,map__60365,map__60365__$1,attrs,id,preamble,postamble,placeholder,map__60366,map__60366__$1,doc,get){
return (function (){
var temp__4651__auto__ = cljs.core.cst$kw$visible_QMARK_.cljs$core$IFn$_invoke$arity$1(attrs);
if(cljs.core.truth_(temp__4651__auto__)){
var visible__60227__auto__ = temp__4651__auto__;
if(cljs.core.truth_((function (){var G__60369 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc));
return (visible__60227__auto__.cljs$core$IFn$_invoke$arity$1 ? visible__60227__auto__.cljs$core$IFn$_invoke$arity$1(G__60369) : visible__60227__auto__.call(null,G__60369));
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
;})(vec__60364,type,map__60365,map__60365__$1,attrs,id,preamble,postamble,placeholder,map__60366,map__60366__$1,doc,get))
}));
reagent_forms.core.init_field.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$alert,(function (p__60370,p__60371){
var vec__60372 = p__60370;
var type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60372,(0),null);
var map__60373 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60372,(1),null);
var map__60373__$1 = ((((!((map__60373 == null)))?((((map__60373.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60373.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60373):map__60373);
var attrs = map__60373__$1;
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60373__$1,cljs.core.cst$kw$id);
var event = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60373__$1,cljs.core.cst$kw$event);
var touch_event = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60373__$1,cljs.core.cst$kw$touch_DASH_event);
var body = cljs.core.nthnext(vec__60372,(2));
var map__60374 = p__60371;
var map__60374__$1 = ((((!((map__60374 == null)))?((((map__60374.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60374.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60374):map__60374);
var opts = map__60374__$1;
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60374__$1,cljs.core.cst$kw$doc);
var get = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60374__$1,cljs.core.cst$kw$get);
var save_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60374__$1,cljs.core.cst$kw$save_BANG_);
return ((function (vec__60372,type,map__60373,map__60373__$1,attrs,id,event,touch_event,body,map__60374,map__60374__$1,opts,doc,get,save_BANG_){
return (function (){
var temp__4651__auto__ = cljs.core.cst$kw$visible_QMARK_.cljs$core$IFn$_invoke$arity$1(attrs);
if(cljs.core.truth_(temp__4651__auto__)){
var visible__60227__auto__ = temp__4651__auto__;
if(cljs.core.truth_((function (){var G__60377 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc));
return (visible__60227__auto__.cljs$core$IFn$_invoke$arity$1 ? visible__60227__auto__.cljs$core$IFn$_invoke$arity$1(G__60377) : visible__60227__auto__.call(null,G__60377));
})())){
if(cljs.core.truth_(event)){
if(cljs.core.truth_((function (){var G__60378 = (get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id));
return (event.cljs$core$IFn$_invoke$arity$1 ? event.cljs$core$IFn$_invoke$arity$1(G__60378) : event.call(null,G__60378));
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
})(),((function (message,temp__4651__auto____$1,visible__60227__auto__,temp__4651__auto__,vec__60372,type,map__60373,map__60373__$1,attrs,id,event,touch_event,body,map__60374,map__60374__$1,opts,doc,get,save_BANG_){
return (function (){
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(id,null) : save_BANG_.call(null,id,null));
});})(message,temp__4651__auto____$1,visible__60227__auto__,temp__4651__auto__,vec__60372,type,map__60373,map__60373__$1,attrs,id,event,touch_event,body,map__60374,map__60374__$1,opts,doc,get,save_BANG_))
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
if(cljs.core.truth_((function (){var G__60379 = (get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id));
return (event.cljs$core$IFn$_invoke$arity$1 ? event.cljs$core$IFn$_invoke$arity$1(G__60379) : event.call(null,G__60379));
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
})(),((function (message,temp__4651__auto____$1,temp__4651__auto__,vec__60372,type,map__60373,map__60373__$1,attrs,id,event,touch_event,body,map__60374,map__60374__$1,opts,doc,get,save_BANG_){
return (function (){
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(id,null) : save_BANG_.call(null,id,null));
});})(message,temp__4651__auto____$1,temp__4651__auto__,vec__60372,type,map__60373,map__60373__$1,attrs,id,event,touch_event,body,map__60374,map__60374__$1,opts,doc,get,save_BANG_))
], true, false),"X"], null),message], null);
} else {
return null;
}
}
}
});
;})(vec__60372,type,map__60373,map__60373__$1,attrs,id,event,touch_event,body,map__60374,map__60374__$1,opts,doc,get,save_BANG_))
}));
reagent_forms.core.init_field.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$radio,(function (p__60380,p__60381){
var vec__60382 = p__60380;
var type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60382,(0),null);
var map__60383 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60382,(1),null);
var map__60383__$1 = ((((!((map__60383 == null)))?((((map__60383.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60383.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60383):map__60383);
var attrs = map__60383__$1;
var field = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60383__$1,cljs.core.cst$kw$field);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60383__$1,cljs.core.cst$kw$name);
var value = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60383__$1,cljs.core.cst$kw$value);
var body = cljs.core.nthnext(vec__60382,(2));
var map__60384 = p__60381;
var map__60384__$1 = ((((!((map__60384 == null)))?((((map__60384.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60384.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60384):map__60384);
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60384__$1,cljs.core.cst$kw$doc);
var get = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60384__$1,cljs.core.cst$kw$get);
var save_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60384__$1,cljs.core.cst$kw$save_BANG_);
return ((function (vec__60382,type,map__60383,map__60383__$1,attrs,field,name,value,body,map__60384,map__60384__$1,doc,get,save_BANG_){
return (function (){
var temp__4651__auto__ = cljs.core.cst$kw$visible_QMARK_.cljs$core$IFn$_invoke$arity$1(attrs);
if(cljs.core.truth_(temp__4651__auto__)){
var visible__60227__auto__ = temp__4651__auto__;
if(cljs.core.truth_((function (){var G__60387 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc));
return (visible__60227__auto__.cljs$core$IFn$_invoke$arity$1 ? visible__60227__auto__.cljs$core$IFn$_invoke$arity$1(G__60387) : visible__60227__auto__.call(null,G__60387));
})())){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,cljs.core.cst$kw$radio,cljs.core.cst$kw$checked,cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(value,(get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(name) : get.call(null,name))),cljs.core.cst$kw$on_DASH_change,((function (visible__60227__auto__,temp__4651__auto__,vec__60382,type,map__60383,map__60383__$1,attrs,field,name,value,body,map__60384,map__60384__$1,doc,get,save_BANG_){
return (function (){
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(name,value) : save_BANG_.call(null,name,value));
});})(visible__60227__auto__,temp__4651__auto__,vec__60382,type,map__60383,map__60383__$1,attrs,field,name,value,body,map__60384,map__60384__$1,doc,get,save_BANG_))
], null),attrs], 0))], null),body);
} else {
return null;
}
} else {
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,cljs.core.cst$kw$radio,cljs.core.cst$kw$checked,cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(value,(get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(name) : get.call(null,name))),cljs.core.cst$kw$on_DASH_change,((function (temp__4651__auto__,vec__60382,type,map__60383,map__60383__$1,attrs,field,name,value,body,map__60384,map__60384__$1,doc,get,save_BANG_){
return (function (){
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(name,value) : save_BANG_.call(null,name,value));
});})(temp__4651__auto__,vec__60382,type,map__60383,map__60383__$1,attrs,field,name,value,body,map__60384,map__60384__$1,doc,get,save_BANG_))
], null),attrs], 0))], null),body);
}
});
;})(vec__60382,type,map__60383,map__60383__$1,attrs,field,name,value,body,map__60384,map__60384__$1,doc,get,save_BANG_))
}));
reagent_forms.core.init_field.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$typeahead,(function (p__60391,p__60392){
var vec__60393 = p__60391;
var type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60393,(0),null);
var map__60394 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60393,(1),null);
var map__60394__$1 = ((((!((map__60394 == null)))?((((map__60394.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60394.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60394):map__60394);
var attrs = map__60394__$1;
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60394__$1,cljs.core.cst$kw$id);
var data_source = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60394__$1,cljs.core.cst$kw$data_DASH_source);
var input_class = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60394__$1,cljs.core.cst$kw$input_DASH_class);
var list_class = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60394__$1,cljs.core.cst$kw$list_DASH_class);
var item_class = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60394__$1,cljs.core.cst$kw$item_DASH_class);
var highlight_class = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60394__$1,cljs.core.cst$kw$highlight_DASH_class);
var result_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__60394__$1,cljs.core.cst$kw$result_DASH_fn,cljs.core.identity);
var choice_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__60394__$1,cljs.core.cst$kw$choice_DASH_fn,cljs.core.identity);
var clear_on_focus_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__60394__$1,cljs.core.cst$kw$clear_DASH_on_DASH_focus_QMARK_,true);
var map__60395 = p__60392;
var map__60395__$1 = ((((!((map__60395 == null)))?((((map__60395.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60395.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60395):map__60395);
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60395__$1,cljs.core.cst$kw$doc);
var get = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60395__$1,cljs.core.cst$kw$get);
var save_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60395__$1,cljs.core.cst$kw$save_BANG_);
var typeahead_hidden_QMARK_ = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(true);
var mouse_on_list_QMARK_ = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(false);
var selected_index = reagent.core.atom.cljs$core$IFn$_invoke$arity$1((0));
var selections = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentVector.EMPTY);
var choose_selected = ((function (typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,vec__60393,type,map__60394,map__60394__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60395,map__60395__$1,doc,get,save_BANG_){
return (function (){
var choice_60421 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selections) : cljs.core.deref.call(null,selections)),(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selected_index) : cljs.core.deref.call(null,selected_index)));
(save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(id,choice_60421) : save_BANG_.call(null,id,choice_60421));

(choice_fn.cljs$core$IFn$_invoke$arity$1 ? choice_fn.cljs$core$IFn$_invoke$arity$1(choice_60421) : choice_fn.call(null,choice_60421));

return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(typeahead_hidden_QMARK_,true) : cljs.core.reset_BANG_.call(null,typeahead_hidden_QMARK_,true));
});})(typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,vec__60393,type,map__60394,map__60394__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60395,map__60395__$1,doc,get,save_BANG_))
;
return ((function (typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60393,type,map__60394,map__60394__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60395,map__60395__$1,doc,get,save_BANG_){
return (function (){
var temp__4651__auto__ = cljs.core.cst$kw$visible_QMARK_.cljs$core$IFn$_invoke$arity$1(attrs);
if(cljs.core.truth_(temp__4651__auto__)){
var visible__60227__auto__ = temp__4651__auto__;
if(cljs.core.truth_((function (){var G__60398 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc));
return (visible__60227__auto__.cljs$core$IFn$_invoke$arity$1 ? visible__60227__auto__.cljs$core$IFn$_invoke$arity$1(G__60398) : visible__60227__auto__.call(null,G__60398));
})())){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input,new cljs.core.PersistentArrayMap(null, 7, [cljs.core.cst$kw$type,cljs.core.cst$kw$text,cljs.core.cst$kw$class,input_class,cljs.core.cst$kw$value,(function (){var v = (get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id));
if(cljs.core.not(cljs.core.iterable_QMARK_(v))){
return v;
} else {
return cljs.core.first(v);
}
})(),cljs.core.cst$kw$on_DASH_focus,((function (visible__60227__auto__,temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60393,type,map__60394,map__60394__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60395,map__60395__$1,doc,get,save_BANG_){
return (function (){
if(cljs.core.truth_(clear_on_focus_QMARK_)){
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(id,"") : save_BANG_.call(null,id,""));
} else {
return null;
}
});})(visible__60227__auto__,temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60393,type,map__60394,map__60394__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60395,map__60395__$1,doc,get,save_BANG_))
,cljs.core.cst$kw$on_DASH_blur,((function (visible__60227__auto__,temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60393,type,map__60394,map__60394__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60395,map__60395__$1,doc,get,save_BANG_){
return (function (){
if(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(mouse_on_list_QMARK_) : cljs.core.deref.call(null,mouse_on_list_QMARK_)))){
return null;
} else {
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(typeahead_hidden_QMARK_,true) : cljs.core.reset_BANG_.call(null,typeahead_hidden_QMARK_,true));

return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(selected_index,(0)) : cljs.core.reset_BANG_.call(null,selected_index,(0)));
}
});})(visible__60227__auto__,temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60393,type,map__60394,map__60394__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60395,map__60395__$1,doc,get,save_BANG_))
,cljs.core.cst$kw$on_DASH_change,((function (visible__60227__auto__,temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60393,type,map__60394,map__60394__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60395,map__60395__$1,doc,get,save_BANG_){
return (function (p1__60388_SHARP_){
var G__60400_60422 = selections;
var G__60401_60423 = (function (){var G__60402 = reagent_forms.core.value_of(p1__60388_SHARP_).toLowerCase();
return (data_source.cljs$core$IFn$_invoke$arity$1 ? data_source.cljs$core$IFn$_invoke$arity$1(G__60402) : data_source.call(null,G__60402));
})();
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__60400_60422,G__60401_60423) : cljs.core.reset_BANG_.call(null,G__60400_60422,G__60401_60423));

var G__60403_60424 = id;
var G__60404_60425 = reagent_forms.core.value_of(p1__60388_SHARP_);
(save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(G__60403_60424,G__60404_60425) : save_BANG_.call(null,G__60403_60424,G__60404_60425));

(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(typeahead_hidden_QMARK_,false) : cljs.core.reset_BANG_.call(null,typeahead_hidden_QMARK_,false));

return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(selected_index,(0)) : cljs.core.reset_BANG_.call(null,selected_index,(0)));
});})(visible__60227__auto__,temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60393,type,map__60394,map__60394__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60395,map__60395__$1,doc,get,save_BANG_))
,cljs.core.cst$kw$on_DASH_key_DASH_down,((function (visible__60227__auto__,temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60393,type,map__60394,map__60394__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60395,map__60395__$1,doc,get,save_BANG_){
return (function (p1__60389_SHARP_){
var G__60405 = p1__60389_SHARP_.which;
switch (G__60405) {
case (38):
p1__60389_SHARP_.preventDefault();

if(!(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selected_index) : cljs.core.deref.call(null,selected_index)),(0)))){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(selected_index,cljs.core.dec);
} else {
return null;
}

break;
case (40):
p1__60389_SHARP_.preventDefault();

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
});})(visible__60227__auto__,temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60393,type,map__60394,map__60394__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60395,map__60395__$1,doc,get,save_BANG_))
], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$ul,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$display,(cljs.core.truth_((function (){var or__4682__auto__ = cljs.core.empty_QMARK_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selections) : cljs.core.deref.call(null,selections)));
if(or__4682__auto__){
return or__4682__auto__;
} else {
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(typeahead_hidden_QMARK_) : cljs.core.deref.call(null,typeahead_hidden_QMARK_));
}
})())?cljs.core.cst$kw$none:cljs.core.cst$kw$block)], null),cljs.core.cst$kw$class,list_class,cljs.core.cst$kw$on_DASH_mouse_DASH_enter,((function (visible__60227__auto__,temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60393,type,map__60394,map__60394__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60395,map__60395__$1,doc,get,save_BANG_){
return (function (){
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(mouse_on_list_QMARK_,true) : cljs.core.reset_BANG_.call(null,mouse_on_list_QMARK_,true));
});})(visible__60227__auto__,temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60393,type,map__60394,map__60394__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60395,map__60395__$1,doc,get,save_BANG_))
,cljs.core.cst$kw$on_DASH_mouse_DASH_leave,((function (visible__60227__auto__,temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60393,type,map__60394,map__60394__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60395,map__60395__$1,doc,get,save_BANG_){
return (function (){
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(mouse_on_list_QMARK_,false) : cljs.core.reset_BANG_.call(null,mouse_on_list_QMARK_,false));
});})(visible__60227__auto__,temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60393,type,map__60394,map__60394__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60395,map__60395__$1,doc,get,save_BANG_))
], null),cljs.core.doall.cljs$core$IFn$_invoke$arity$1(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(((function (visible__60227__auto__,temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60393,type,map__60394,map__60394__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60395,map__60395__$1,doc,get,save_BANG_){
return (function (index,result){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$tab_DASH_index,index,cljs.core.cst$kw$key,index,cljs.core.cst$kw$class,((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selected_index) : cljs.core.deref.call(null,selected_index)),index))?highlight_class:item_class),cljs.core.cst$kw$on_DASH_mouse_DASH_over,((function (visible__60227__auto__,temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60393,type,map__60394,map__60394__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60395,map__60395__$1,doc,get,save_BANG_){
return (function (p1__60390_SHARP_){
var G__60407 = selected_index;
var G__60408 = (function (){var G__60409 = p1__60390_SHARP_.target.getAttribute("tabIndex");
return parseInt(G__60409);
})();
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__60407,G__60408) : cljs.core.reset_BANG_.call(null,G__60407,G__60408));
});})(visible__60227__auto__,temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60393,type,map__60394,map__60394__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60395,map__60395__$1,doc,get,save_BANG_))
,cljs.core.cst$kw$on_DASH_click,((function (visible__60227__auto__,temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60393,type,map__60394,map__60394__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60395,map__60395__$1,doc,get,save_BANG_){
return (function (){
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(typeahead_hidden_QMARK_,true) : cljs.core.reset_BANG_.call(null,typeahead_hidden_QMARK_,true));

(save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(id,result) : save_BANG_.call(null,id,result));

return (choice_fn.cljs$core$IFn$_invoke$arity$1 ? choice_fn.cljs$core$IFn$_invoke$arity$1(result) : choice_fn.call(null,result));
});})(visible__60227__auto__,temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60393,type,map__60394,map__60394__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60395,map__60395__$1,doc,get,save_BANG_))
], null),(result_fn.cljs$core$IFn$_invoke$arity$1 ? result_fn.cljs$core$IFn$_invoke$arity$1(result) : result_fn.call(null,result))], null);
});})(visible__60227__auto__,temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60393,type,map__60394,map__60394__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60395,map__60395__$1,doc,get,save_BANG_))
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
})(),cljs.core.cst$kw$on_DASH_focus,((function (temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60393,type,map__60394,map__60394__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60395,map__60395__$1,doc,get,save_BANG_){
return (function (){
if(cljs.core.truth_(clear_on_focus_QMARK_)){
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(id,"") : save_BANG_.call(null,id,""));
} else {
return null;
}
});})(temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60393,type,map__60394,map__60394__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60395,map__60395__$1,doc,get,save_BANG_))
,cljs.core.cst$kw$on_DASH_blur,((function (temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60393,type,map__60394,map__60394__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60395,map__60395__$1,doc,get,save_BANG_){
return (function (){
if(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(mouse_on_list_QMARK_) : cljs.core.deref.call(null,mouse_on_list_QMARK_)))){
return null;
} else {
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(typeahead_hidden_QMARK_,true) : cljs.core.reset_BANG_.call(null,typeahead_hidden_QMARK_,true));

return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(selected_index,(0)) : cljs.core.reset_BANG_.call(null,selected_index,(0)));
}
});})(temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60393,type,map__60394,map__60394__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60395,map__60395__$1,doc,get,save_BANG_))
,cljs.core.cst$kw$on_DASH_change,((function (temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60393,type,map__60394,map__60394__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60395,map__60395__$1,doc,get,save_BANG_){
return (function (p1__60388_SHARP_){
var G__60411_60427 = selections;
var G__60412_60428 = (function (){var G__60413 = reagent_forms.core.value_of(p1__60388_SHARP_).toLowerCase();
return (data_source.cljs$core$IFn$_invoke$arity$1 ? data_source.cljs$core$IFn$_invoke$arity$1(G__60413) : data_source.call(null,G__60413));
})();
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__60411_60427,G__60412_60428) : cljs.core.reset_BANG_.call(null,G__60411_60427,G__60412_60428));

var G__60414_60429 = id;
var G__60415_60430 = reagent_forms.core.value_of(p1__60388_SHARP_);
(save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(G__60414_60429,G__60415_60430) : save_BANG_.call(null,G__60414_60429,G__60415_60430));

(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(typeahead_hidden_QMARK_,false) : cljs.core.reset_BANG_.call(null,typeahead_hidden_QMARK_,false));

return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(selected_index,(0)) : cljs.core.reset_BANG_.call(null,selected_index,(0)));
});})(temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60393,type,map__60394,map__60394__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60395,map__60395__$1,doc,get,save_BANG_))
,cljs.core.cst$kw$on_DASH_key_DASH_down,((function (temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60393,type,map__60394,map__60394__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60395,map__60395__$1,doc,get,save_BANG_){
return (function (p1__60389_SHARP_){
var G__60416 = p1__60389_SHARP_.which;
switch (G__60416) {
case (38):
p1__60389_SHARP_.preventDefault();

if(!(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selected_index) : cljs.core.deref.call(null,selected_index)),(0)))){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(selected_index,cljs.core.dec);
} else {
return null;
}

break;
case (40):
p1__60389_SHARP_.preventDefault();

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
});})(temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60393,type,map__60394,map__60394__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60395,map__60395__$1,doc,get,save_BANG_))
], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$ul,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$display,(cljs.core.truth_((function (){var or__4682__auto__ = cljs.core.empty_QMARK_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selections) : cljs.core.deref.call(null,selections)));
if(or__4682__auto__){
return or__4682__auto__;
} else {
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(typeahead_hidden_QMARK_) : cljs.core.deref.call(null,typeahead_hidden_QMARK_));
}
})())?cljs.core.cst$kw$none:cljs.core.cst$kw$block)], null),cljs.core.cst$kw$class,list_class,cljs.core.cst$kw$on_DASH_mouse_DASH_enter,((function (temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60393,type,map__60394,map__60394__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60395,map__60395__$1,doc,get,save_BANG_){
return (function (){
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(mouse_on_list_QMARK_,true) : cljs.core.reset_BANG_.call(null,mouse_on_list_QMARK_,true));
});})(temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60393,type,map__60394,map__60394__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60395,map__60395__$1,doc,get,save_BANG_))
,cljs.core.cst$kw$on_DASH_mouse_DASH_leave,((function (temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60393,type,map__60394,map__60394__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60395,map__60395__$1,doc,get,save_BANG_){
return (function (){
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(mouse_on_list_QMARK_,false) : cljs.core.reset_BANG_.call(null,mouse_on_list_QMARK_,false));
});})(temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60393,type,map__60394,map__60394__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60395,map__60395__$1,doc,get,save_BANG_))
], null),cljs.core.doall.cljs$core$IFn$_invoke$arity$1(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(((function (temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60393,type,map__60394,map__60394__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60395,map__60395__$1,doc,get,save_BANG_){
return (function (index,result){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$tab_DASH_index,index,cljs.core.cst$kw$key,index,cljs.core.cst$kw$class,((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selected_index) : cljs.core.deref.call(null,selected_index)),index))?highlight_class:item_class),cljs.core.cst$kw$on_DASH_mouse_DASH_over,((function (temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60393,type,map__60394,map__60394__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60395,map__60395__$1,doc,get,save_BANG_){
return (function (p1__60390_SHARP_){
var G__60418 = selected_index;
var G__60419 = (function (){var G__60420 = p1__60390_SHARP_.target.getAttribute("tabIndex");
return parseInt(G__60420);
})();
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__60418,G__60419) : cljs.core.reset_BANG_.call(null,G__60418,G__60419));
});})(temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60393,type,map__60394,map__60394__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60395,map__60395__$1,doc,get,save_BANG_))
,cljs.core.cst$kw$on_DASH_click,((function (temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60393,type,map__60394,map__60394__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60395,map__60395__$1,doc,get,save_BANG_){
return (function (){
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(typeahead_hidden_QMARK_,true) : cljs.core.reset_BANG_.call(null,typeahead_hidden_QMARK_,true));

(save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(id,result) : save_BANG_.call(null,id,result));

return (choice_fn.cljs$core$IFn$_invoke$arity$1 ? choice_fn.cljs$core$IFn$_invoke$arity$1(result) : choice_fn.call(null,result));
});})(temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60393,type,map__60394,map__60394__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60395,map__60395__$1,doc,get,save_BANG_))
], null),(result_fn.cljs$core$IFn$_invoke$arity$1 ? result_fn.cljs$core$IFn$_invoke$arity$1(result) : result_fn.call(null,result))], null);
});})(temp__4651__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60393,type,map__60394,map__60394__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60395,map__60395__$1,doc,get,save_BANG_))
,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selections) : cljs.core.deref.call(null,selections))))], null)], null);
}
});
;})(typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__60393,type,map__60394,map__60394__$1,attrs,id,data_source,input_class,list_class,item_class,highlight_class,result_fn,choice_fn,clear_on_focus_QMARK_,map__60395,map__60395__$1,doc,get,save_BANG_))
}));
reagent_forms.core.group_item = (function reagent_forms$core$group_item(p__60432,p__60433,selections,field,id){
var vec__60463 = p__60432;
var type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60463,(0),null);
var map__60464 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60463,(1),null);
var map__60464__$1 = ((((!((map__60464 == null)))?((((map__60464.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60464.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60464):map__60464);
var attrs = map__60464__$1;
var key = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60464__$1,cljs.core.cst$kw$key);
var touch_event = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60464__$1,cljs.core.cst$kw$touch_DASH_event);
var body = cljs.core.nthnext(vec__60463,(2));
var map__60465 = p__60433;
var map__60465__$1 = ((((!((map__60465 == null)))?((((map__60465.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60465.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60465):map__60465);
var save_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60465__$1,cljs.core.cst$kw$save_BANG_);
var multi_select = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60465__$1,cljs.core.cst$kw$multi_DASH_select);
var handle_click_BANG_ = ((function (vec__60463,type,map__60464,map__60464__$1,attrs,key,touch_event,body,map__60465,map__60465__$1,save_BANG_,multi_select){
return (function reagent_forms$core$group_item_$_handle_click_BANG_(){
if(cljs.core.truth_(multi_select)){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(selections,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [key], null),cljs.core.not);

var G__60486 = id;
var G__60487 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.first,cljs.core.filter.cljs$core$IFn$_invoke$arity$2(cljs.core.second,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selections) : cljs.core.deref.call(null,selections))));
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(G__60486,G__60487) : save_BANG_.call(null,G__60486,G__60487));
} else {
var value = cljs.core.get.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selections) : cljs.core.deref.call(null,selections)),key);
var G__60488_60492 = selections;
var G__60489_60493 = cljs.core.PersistentArrayMap.fromArray([key,cljs.core.not(value)], true, false);
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__60488_60492,G__60489_60493) : cljs.core.reset_BANG_.call(null,G__60488_60492,G__60489_60493));

var G__60490 = id;
var G__60491 = (cljs.core.truth_(cljs.core.get.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selections) : cljs.core.deref.call(null,selections)),key))?key:null);
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(G__60490,G__60491) : save_BANG_.call(null,G__60490,G__60491));
}
});})(vec__60463,type,map__60464,map__60464__$1,attrs,key,touch_event,body,map__60465,map__60465__$1,save_BANG_,multi_select))
;
return ((function (vec__60463,type,map__60464,map__60464__$1,attrs,key,touch_event,body,map__60465,map__60465__$1,save_BANG_,multi_select){
return (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.PersistentArrayMap.fromArray([cljs.core.cst$kw$class,(cljs.core.truth_(cljs.core.get.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selections) : cljs.core.deref.call(null,selections)),key))?"active":null),(function (){var or__4682__auto__ = touch_event;
if(cljs.core.truth_(or__4682__auto__)){
return or__4682__auto__;
} else {
return cljs.core.cst$kw$on_DASH_click;
}
})(),handle_click_BANG_], true, false),attrs], 0)),body], null);
});
;})(vec__60463,type,map__60464,map__60464__$1,attrs,key,touch_event,body,map__60465,map__60465__$1,save_BANG_,multi_select))
});
reagent_forms.core.mk_selections = (function reagent_forms$core$mk_selections(id,selectors,p__60494){
var map__60501 = p__60494;
var map__60501__$1 = ((((!((map__60501 == null)))?((((map__60501.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60501.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60501):map__60501);
var get = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60501__$1,cljs.core.cst$kw$get);
var multi_select = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60501__$1,cljs.core.cst$kw$multi_DASH_select);
var value = (get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id));
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (value,map__60501,map__60501__$1,get,multi_select){
return (function (m,p__60503){
var vec__60504 = p__60503;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60504,(0),null);
var map__60505 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60504,(1),null);
var map__60505__$1 = ((((!((map__60505 == null)))?((((map__60505.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60505.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60505):map__60505);
var key = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60505__$1,cljs.core.cst$kw$key);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(m,key,cljs.core.boolean$(cljs.core.some(cljs.core.PersistentHashSet.fromArray([key], true),(cljs.core.truth_(multi_select)?value:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [value], null)))));
});})(value,map__60501,map__60501__$1,get,multi_select))
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
reagent_forms.core.selection_group = (function reagent_forms$core$selection_group(p__60509,p__60510){
var vec__60521 = p__60509;
var type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60521,(0),null);
var map__60522 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60521,(1),null);
var map__60522__$1 = ((((!((map__60522 == null)))?((((map__60522.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60522.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60522):map__60522);
var attrs = map__60522__$1;
var field = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60522__$1,cljs.core.cst$kw$field);
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60522__$1,cljs.core.cst$kw$id);
var selection_items = cljs.core.nthnext(vec__60521,(2));
var map__60523 = p__60510;
var map__60523__$1 = ((((!((map__60523 == null)))?((((map__60523.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60523.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60523):map__60523);
var opts = map__60523__$1;
var get = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60523__$1,cljs.core.cst$kw$get);
var selection_items__$1 = reagent_forms.core.extract_selectors(selection_items);
var selections = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(reagent_forms.core.mk_selections(id,selection_items__$1,opts));
var selectors = cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (selection_items__$1,selections,vec__60521,type,map__60522,map__60522__$1,attrs,field,id,selection_items,map__60523,map__60523__$1,opts,get){
return (function (item){
return new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$visible_QMARK_,cljs.core.cst$kw$visible_QMARK_.cljs$core$IFn$_invoke$arity$1(cljs.core.second(item)),cljs.core.cst$kw$selector,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_forms.core.group_item(item,opts,selections,field,id)], null)], null);
});})(selection_items__$1,selections,vec__60521,type,map__60522,map__60522__$1,attrs,field,id,selection_items,map__60523,map__60523__$1,opts,get))
,selection_items__$1);
return ((function (selection_items__$1,selections,selectors,vec__60521,type,map__60522,map__60522__$1,attrs,field,id,selection_items,map__60523,map__60523__$1,opts,get){
return (function (){
if(cljs.core.truth_((get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id)))){
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(selections,((function (selection_items__$1,selections,selectors,vec__60521,type,map__60522,map__60522__$1,attrs,field,id,selection_items,map__60523,map__60523__$1,opts,get){
return (function (p1__60507_SHARP_){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (selection_items__$1,selections,selectors,vec__60521,type,map__60522,map__60522__$1,attrs,field,id,selection_items,map__60523,map__60523__$1,opts,get){
return (function (p__60526){
var vec__60527 = p__60526;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60527,(0),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,false], null);
});})(selection_items__$1,selections,selectors,vec__60521,type,map__60522,map__60522__$1,attrs,field,id,selection_items,map__60523,map__60523__$1,opts,get))
,p1__60507_SHARP_));
});})(selection_items__$1,selections,selectors,vec__60521,type,map__60522,map__60522__$1,attrs,field,id,selection_items,map__60523,map__60523__$1,opts,get))
);
}

return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,attrs], null),cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$selector,cljs.core.filter.cljs$core$IFn$_invoke$arity$2(((function (selection_items__$1,selections,selectors,vec__60521,type,map__60522,map__60522__$1,attrs,field,id,selection_items,map__60523,map__60523__$1,opts,get){
return (function (p1__60508_SHARP_){
var temp__4651__auto__ = cljs.core.cst$kw$visible_QMARK_.cljs$core$IFn$_invoke$arity$1(p1__60508_SHARP_);
if(cljs.core.truth_(temp__4651__auto__)){
var visible_QMARK_ = temp__4651__auto__;
var G__60529 = (function (){var G__60530 = cljs.core.cst$kw$doc.cljs$core$IFn$_invoke$arity$1(opts);
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__60530) : cljs.core.deref.call(null,G__60530));
})();
return (visible_QMARK_.cljs$core$IFn$_invoke$arity$1 ? visible_QMARK_.cljs$core$IFn$_invoke$arity$1(G__60529) : visible_QMARK_.call(null,G__60529));
} else {
return true;
}
});})(selection_items__$1,selections,selectors,vec__60521,type,map__60522,map__60522__$1,attrs,field,id,selection_items,map__60523,map__60523__$1,opts,get))
,selectors)));
});
;})(selection_items__$1,selections,selectors,vec__60521,type,map__60522,map__60522__$1,attrs,field,id,selection_items,map__60523,map__60523__$1,opts,get))
});
reagent_forms.core.init_field.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$single_DASH_select,(function (p__60531,p__60532){
var vec__60533 = p__60531;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60533,(0),null);
var attrs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60533,(1),null);
var field = vec__60533;
var map__60534 = p__60532;
var map__60534__$1 = ((((!((map__60534 == null)))?((((map__60534.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60534.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60534):map__60534);
var opts = map__60534__$1;
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60534__$1,cljs.core.cst$kw$doc);
return ((function (vec__60533,_,attrs,field,map__60534,map__60534__$1,opts,doc){
return (function (){
var temp__4651__auto__ = cljs.core.cst$kw$visible_QMARK_.cljs$core$IFn$_invoke$arity$1(attrs);
if(cljs.core.truth_(temp__4651__auto__)){
var visible__60227__auto__ = temp__4651__auto__;
if(cljs.core.truth_((function (){var G__60536 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc));
return (visible__60227__auto__.cljs$core$IFn$_invoke$arity$1 ? visible__60227__auto__.cljs$core$IFn$_invoke$arity$1(G__60536) : visible__60227__auto__.call(null,G__60536));
})())){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_forms.core.selection_group,field,opts], null);
} else {
return null;
}
} else {
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_forms.core.selection_group,field,opts], null);
}
});
;})(vec__60533,_,attrs,field,map__60534,map__60534__$1,opts,doc))
}));
reagent_forms.core.init_field.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$multi_DASH_select,(function (p__60537,p__60538){
var vec__60539 = p__60537;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60539,(0),null);
var attrs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60539,(1),null);
var field = vec__60539;
var map__60540 = p__60538;
var map__60540__$1 = ((((!((map__60540 == null)))?((((map__60540.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60540.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60540):map__60540);
var opts = map__60540__$1;
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60540__$1,cljs.core.cst$kw$doc);
return ((function (vec__60539,_,attrs,field,map__60540,map__60540__$1,opts,doc){
return (function (){
var temp__4651__auto__ = cljs.core.cst$kw$visible_QMARK_.cljs$core$IFn$_invoke$arity$1(attrs);
if(cljs.core.truth_(temp__4651__auto__)){
var visible__60227__auto__ = temp__4651__auto__;
if(cljs.core.truth_((function (){var G__60542 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc));
return (visible__60227__auto__.cljs$core$IFn$_invoke$arity$1 ? visible__60227__auto__.cljs$core$IFn$_invoke$arity$1(G__60542) : visible__60227__auto__.call(null,G__60542));
})())){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_forms.core.selection_group,field,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(opts,cljs.core.cst$kw$multi_DASH_select,true)], null);
} else {
return null;
}
} else {
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_forms.core.selection_group,field,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(opts,cljs.core.cst$kw$multi_DASH_select,true)], null);
}
});
;})(vec__60539,_,attrs,field,map__60540,map__60540__$1,opts,doc))
}));
reagent_forms.core.map_options = (function reagent_forms$core$map_options(options){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__5454__auto__ = (function reagent_forms$core$map_options_$_iter__60561(s__60562){
return (new cljs.core.LazySeq(null,(function (){
var s__60562__$1 = s__60562;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__60562__$1);
if(temp__4653__auto__){
var s__60562__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__60562__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__60562__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__60564 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__60563 = (0);
while(true){
if((i__60563 < size__5453__auto__)){
var vec__60573 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__60563);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60573,(0),null);
var map__60574 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60573,(1),null);
var map__60574__$1 = ((((!((map__60574 == null)))?((((map__60574.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60574.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60574):map__60574);
var key = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60574__$1,cljs.core.cst$kw$key);
var label = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60573,(2),null);
cljs.core.chunk_append(b__60564,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [[cljs.core.str(label)].join(''),key], null));

var G__60579 = (i__60563 + (1));
i__60563 = G__60579;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__60564),reagent_forms$core$map_options_$_iter__60561(cljs.core.chunk_rest(s__60562__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__60564),null);
}
} else {
var vec__60576 = cljs.core.first(s__60562__$2);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60576,(0),null);
var map__60577 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60576,(1),null);
var map__60577__$1 = ((((!((map__60577 == null)))?((((map__60577.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60577.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60577):map__60577);
var key = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60577__$1,cljs.core.cst$kw$key);
var label = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60576,(2),null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [[cljs.core.str(label)].join(''),key], null),reagent_forms$core$map_options_$_iter__60561(cljs.core.rest(s__60562__$2)));
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
return cljs.core.last(cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__60580_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(v,cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(p1__60580_SHARP_,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(1),cljs.core.cst$kw$key], null)));
}),options)));
});
reagent_forms.core.init_field.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$list,(function (p__60583,p__60584){
var vec__60585 = p__60583;
var type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60585,(0),null);
var map__60586 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__60585,(1),null);
var map__60586__$1 = ((((!((map__60586 == null)))?((((map__60586.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60586.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60586):map__60586);
var attrs = map__60586__$1;
var field = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60586__$1,cljs.core.cst$kw$field);
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60586__$1,cljs.core.cst$kw$id);
var options = cljs.core.nthnext(vec__60585,(2));
var map__60587 = p__60584;
var map__60587__$1 = ((((!((map__60587 == null)))?((((map__60587.cljs$lang$protocol_mask$partition0$ & (64))) || (map__60587.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__60587):map__60587);
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60587__$1,cljs.core.cst$kw$doc);
var get = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60587__$1,cljs.core.cst$kw$get);
var save_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__60587__$1,cljs.core.cst$kw$save_BANG_);
var options__$1 = reagent_forms.core.extract_selectors(options);
var options_lookup = reagent_forms.core.map_options(options__$1);
var selection = reagent.core.atom.cljs$core$IFn$_invoke$arity$1((function (){var or__4682__auto__ = (get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id));
if(cljs.core.truth_(or__4682__auto__)){
return or__4682__auto__;
} else {
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.first(options__$1),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(1),cljs.core.cst$kw$key], null));
}
})());
var G__60590_60599 = id;
var G__60591_60600 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selection) : cljs.core.deref.call(null,selection));
(save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(G__60590_60599,G__60591_60600) : save_BANG_.call(null,G__60590_60599,G__60591_60600));

return ((function (options__$1,options_lookup,selection,vec__60585,type,map__60586,map__60586__$1,attrs,field,id,options,map__60587,map__60587__$1,doc,get,save_BANG_){
return (function (){
var temp__4651__auto__ = cljs.core.cst$kw$visible_QMARK_.cljs$core$IFn$_invoke$arity$1(attrs);
if(cljs.core.truth_(temp__4651__auto__)){
var visible__60227__auto__ = temp__4651__auto__;
if(cljs.core.truth_((function (){var G__60592 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc));
return (visible__60227__auto__.cljs$core$IFn$_invoke$arity$1 ? visible__60227__auto__.cljs$core$IFn$_invoke$arity$1(G__60592) : visible__60227__auto__.call(null,G__60592));
})())){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([attrs,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$default_DASH_value,reagent_forms.core.default_selection(options__$1,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selection) : cljs.core.deref.call(null,selection))),cljs.core.cst$kw$on_DASH_change,((function (visible__60227__auto__,temp__4651__auto__,options__$1,options_lookup,selection,vec__60585,type,map__60586,map__60586__$1,attrs,field,id,options,map__60587,map__60587__$1,doc,get,save_BANG_){
return (function (p1__60581_SHARP_){
var G__60593 = id;
var G__60594 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(options_lookup,reagent_forms.core.value_of(p1__60581_SHARP_));
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(G__60593,G__60594) : save_BANG_.call(null,G__60593,G__60594));
});})(visible__60227__auto__,temp__4651__auto__,options__$1,options_lookup,selection,vec__60585,type,map__60586,map__60586__$1,attrs,field,id,options,map__60587,map__60587__$1,doc,get,save_BANG_))
], null)], 0)),cljs.core.doall.cljs$core$IFn$_invoke$arity$1(cljs.core.filter.cljs$core$IFn$_invoke$arity$2(((function (visible__60227__auto__,temp__4651__auto__,options__$1,options_lookup,selection,vec__60585,type,map__60586,map__60586__$1,attrs,field,id,options,map__60587,map__60587__$1,doc,get,save_BANG_){
return (function (p1__60582_SHARP_){
var temp__4651__auto____$1 = cljs.core.cst$kw$visible_QMARK_.cljs$core$IFn$_invoke$arity$1(cljs.core.second(p1__60582_SHARP_));
if(cljs.core.truth_(temp__4651__auto____$1)){
var visible_QMARK_ = temp__4651__auto____$1;
var G__60595 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc));
return (visible_QMARK_.cljs$core$IFn$_invoke$arity$1 ? visible_QMARK_.cljs$core$IFn$_invoke$arity$1(G__60595) : visible_QMARK_.call(null,G__60595));
} else {
return true;
}
});})(visible__60227__auto__,temp__4651__auto__,options__$1,options_lookup,selection,vec__60585,type,map__60586,map__60586__$1,attrs,field,id,options,map__60587,map__60587__$1,doc,get,save_BANG_))
,options__$1))], null);
} else {
return null;
}
} else {
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([attrs,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$default_DASH_value,reagent_forms.core.default_selection(options__$1,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selection) : cljs.core.deref.call(null,selection))),cljs.core.cst$kw$on_DASH_change,((function (temp__4651__auto__,options__$1,options_lookup,selection,vec__60585,type,map__60586,map__60586__$1,attrs,field,id,options,map__60587,map__60587__$1,doc,get,save_BANG_){
return (function (p1__60581_SHARP_){
var G__60596 = id;
var G__60597 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(options_lookup,reagent_forms.core.value_of(p1__60581_SHARP_));
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(G__60596,G__60597) : save_BANG_.call(null,G__60596,G__60597));
});})(temp__4651__auto__,options__$1,options_lookup,selection,vec__60585,type,map__60586,map__60586__$1,attrs,field,id,options,map__60587,map__60587__$1,doc,get,save_BANG_))
], null)], 0)),cljs.core.doall.cljs$core$IFn$_invoke$arity$1(cljs.core.filter.cljs$core$IFn$_invoke$arity$2(((function (temp__4651__auto__,options__$1,options_lookup,selection,vec__60585,type,map__60586,map__60586__$1,attrs,field,id,options,map__60587,map__60587__$1,doc,get,save_BANG_){
return (function (p1__60582_SHARP_){
var temp__4651__auto____$1 = cljs.core.cst$kw$visible_QMARK_.cljs$core$IFn$_invoke$arity$1(cljs.core.second(p1__60582_SHARP_));
if(cljs.core.truth_(temp__4651__auto____$1)){
var visible_QMARK_ = temp__4651__auto____$1;
var G__60598 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc));
return (visible_QMARK_.cljs$core$IFn$_invoke$arity$1 ? visible_QMARK_.cljs$core$IFn$_invoke$arity$1(G__60598) : visible_QMARK_.call(null,G__60598));
} else {
return true;
}
});})(temp__4651__auto__,options__$1,options_lookup,selection,vec__60585,type,map__60586,map__60586__$1,attrs,field,id,options,map__60587,map__60587__$1,doc,get,save_BANG_))
,options__$1))], null);
}
});
;})(options__$1,options_lookup,selection,vec__60585,type,map__60586,map__60586__$1,attrs,field,id,options,map__60587,map__60587__$1,doc,get,save_BANG_))
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
var len__5740__auto___60605 = arguments.length;
var i__5741__auto___60606 = (0);
while(true){
if((i__5741__auto___60606 < len__5740__auto___60605)){
args__5747__auto__.push((arguments[i__5741__auto___60606]));

var G__60607 = (i__5741__auto___60606 + (1));
i__5741__auto___60606 = G__60607;
continue;
} else {
}
break;
}

var argseq__5748__auto__ = ((((2) < args__5747__auto__.length))?(new cljs.core.IndexedSeq(args__5747__auto__.slice((2)),(0))):null);
return reagent_forms.core.bind_fields.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__5748__auto__);
});

reagent_forms.core.bind_fields.cljs$core$IFn$_invoke$arity$variadic = (function (form,doc,events){
var opts = new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$doc,doc,cljs.core.cst$kw$get,(function (p1__60601_SHARP_){
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc)),(reagent_forms.core.id__GT_path.cljs$core$IFn$_invoke$arity$1 ? reagent_forms.core.id__GT_path.cljs$core$IFn$_invoke$arity$1(p1__60601_SHARP_) : reagent_forms.core.id__GT_path.call(null,p1__60601_SHARP_)));
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

reagent_forms.core.bind_fields.cljs$lang$applyTo = (function (seq60602){
var G__60603 = cljs.core.first(seq60602);
var seq60602__$1 = cljs.core.next(seq60602);
var G__60604 = cljs.core.first(seq60602__$1);
var seq60602__$2 = cljs.core.next(seq60602__$1);
return reagent_forms.core.bind_fields.cljs$core$IFn$_invoke$arity$variadic(G__60603,G__60604,seq60602__$2);
});
