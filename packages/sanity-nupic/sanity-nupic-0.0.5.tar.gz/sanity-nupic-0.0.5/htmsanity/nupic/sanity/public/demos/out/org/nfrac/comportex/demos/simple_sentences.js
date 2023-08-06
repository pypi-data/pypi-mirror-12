// Compiled by ClojureScript 1.7.170 {:static-fns true, :optimize-constants true}
goog.provide('org.nfrac.comportex.demos.simple_sentences');
goog.require('cljs.core');
goog.require('org.nfrac.comportex.core');
goog.require('org.nfrac.comportex.encoders');
goog.require('org.nfrac.comportex.util');
goog.require('clojure.string');
org.nfrac.comportex.demos.simple_sentences.bit_width = (500);
org.nfrac.comportex.demos.simple_sentences.n_on_bits = (25);
org.nfrac.comportex.demos.simple_sentences.spec = new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$column_DASH_dimensions,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(1000)], null),cljs.core.cst$kw$depth,(8),cljs.core.cst$kw$distal,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$perm_DASH_init,0.21], null),cljs.core.cst$kw$distal_DASH_vs_DASH_proximal_DASH_weight,0.2], null);
org.nfrac.comportex.demos.simple_sentences.higher_level_spec = org.nfrac.comportex.util.deep_merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([org.nfrac.comportex.demos.simple_sentences.spec,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$column_DASH_dimensions,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(800)], null),cljs.core.cst$kw$proximal,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$max_DASH_segments,(5)], null)], null)], 0));
org.nfrac.comportex.demos.simple_sentences.input_text = "Jane has eyes.\nJane has a head.\nJane has a mouth.\nJane has a brain.\nJane has a book.\nJane has no friend.\n\nChifung has eyes.\nChifung has a head.\nChifung has a mouth.\nChifung has a brain.\nChifung has no book.\nChifung has a friend.\n\nJane is something.\nJane is alive.\nJane is a person.\nJane can talk.\nJane can walk.\nJane can eat.\n\nChifung is something.\nChifung is alive.\nChifung is a person.\nChifung can talk.\nChifung can walk.\nChifung can eat.\n\nfox has eyes.\nfox has a head.\nfox has a mouth.\nfox has a brain.\nfox has a tail.\nfox is something.\nfox is alive.\nfox is no person.\nfox can no talk.\nfox can walk.\nfox can eat.\n\ndoes Jane have eyes ? yes.\ndoes Jane have a head ? yes.\ndoes Jane have a mouth ? yes.\ndoes Jane have a brain ? yes.\ndoes Jane have a book ? yes.\ndoes Jane have a friend ? no.\ndoes Jane have a tail ? no.\n\ndoes Chifung have eyes ? yes.\ndoes Chifung have a head ? yes.\ndoes Chifung have a mouth ? yes.\ndoes Chifung have a brain ? yes.\ndoes Chifung have a book ? no.\ndoes Chifung have a friend ? yes.\ndoes Chifung have a tail ? no.\n\ndoes fox have eyes ? yes.\ndoes fox have a head ? yes.\ndoes fox have a mouth ? yes.\ndoes fox have a brain ? yes.\ndoes fox have a book ? no.\ndoes fox have a friend ? no.\ndoes fox have a tail ? yes.\n\nJane has no tail.\nChifung has no tail.\n";
org.nfrac.comportex.demos.simple_sentences.split_sentences = (function org$nfrac$comportex$demos$simple_sentences$split_sentences(text_STAR_){
var text = clojure.string.lower_case(clojure.string.trim(text_STAR_));
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(((function (text){
return (function (p1__63912_SHARP_){
return cljs.core.vec(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(p1__63912_SHARP_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["."], null)));
});})(text))
,cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(((function (text){
return (function (p1__63911_SHARP_){
return clojure.string.split.cljs$core$IFn$_invoke$arity$2(p1__63911_SHARP_,/[^\w']+/);
});})(text))
,clojure.string.split.cljs$core$IFn$_invoke$arity$2(text,/[^\w]*\.+[^\w]*/)));
});
/**
 * An input sequence consisting of words from the given text, with
 * periods separating sentences also included as distinct words. Each
 * sequence element has the form `{:word _, :index [i j]}`, where i is
 * the sentence index and j is the word index into sentence j.
 */
org.nfrac.comportex.demos.simple_sentences.word_item_seq = (function org$nfrac$comportex$demos$simple_sentences$word_item_seq(n_repeats,text){
var iter__5454__auto__ = (function org$nfrac$comportex$demos$simple_sentences$word_item_seq_$_iter__63950(s__63951){
return (new cljs.core.LazySeq(null,(function (){
var s__63951__$1 = s__63951;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__63951__$1);
if(temp__4653__auto__){
var xs__5201__auto__ = temp__4653__auto__;
var vec__63973 = cljs.core.first(xs__5201__auto__);
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63973,(0),null);
var sen = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63973,(1),null);
var iterys__5450__auto__ = ((function (s__63951__$1,vec__63973,i,sen,xs__5201__auto__,temp__4653__auto__){
return (function org$nfrac$comportex$demos$simple_sentences$word_item_seq_$_iter__63950_$_iter__63952(s__63953){
return (new cljs.core.LazySeq(null,((function (s__63951__$1,vec__63973,i,sen,xs__5201__auto__,temp__4653__auto__){
return (function (){
var s__63953__$1 = s__63953;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__63953__$1);
if(temp__4653__auto____$1){
var xs__5201__auto____$1 = temp__4653__auto____$1;
var rep = cljs.core.first(xs__5201__auto____$1);
var iterys__5450__auto__ = ((function (s__63953__$1,s__63951__$1,rep,xs__5201__auto____$1,temp__4653__auto____$1,vec__63973,i,sen,xs__5201__auto__,temp__4653__auto__){
return (function org$nfrac$comportex$demos$simple_sentences$word_item_seq_$_iter__63950_$_iter__63952_$_iter__63954(s__63955){
return (new cljs.core.LazySeq(null,((function (s__63953__$1,s__63951__$1,rep,xs__5201__auto____$1,temp__4653__auto____$1,vec__63973,i,sen,xs__5201__auto__,temp__4653__auto__){
return (function (){
var s__63955__$1 = s__63955;
while(true){
var temp__4653__auto____$2 = cljs.core.seq(s__63955__$1);
if(temp__4653__auto____$2){
var s__63955__$2 = temp__4653__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__63955__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__63955__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__63957 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__63956 = (0);
while(true){
if((i__63956 < size__5453__auto__)){
var vec__63985 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__63956);
var j = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63985,(0),null);
var word = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63985,(1),null);
cljs.core.chunk_append(b__63957,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$word,word,cljs.core.cst$kw$index,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [i,j], null)], null));

var G__63987 = (i__63956 + (1));
i__63956 = G__63987;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__63957),org$nfrac$comportex$demos$simple_sentences$word_item_seq_$_iter__63950_$_iter__63952_$_iter__63954(cljs.core.chunk_rest(s__63955__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__63957),null);
}
} else {
var vec__63986 = cljs.core.first(s__63955__$2);
var j = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63986,(0),null);
var word = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63986,(1),null);
return cljs.core.cons(new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$word,word,cljs.core.cst$kw$index,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [i,j], null)], null),org$nfrac$comportex$demos$simple_sentences$word_item_seq_$_iter__63950_$_iter__63952_$_iter__63954(cljs.core.rest(s__63955__$2)));
}
} else {
return null;
}
break;
}
});})(s__63953__$1,s__63951__$1,rep,xs__5201__auto____$1,temp__4653__auto____$1,vec__63973,i,sen,xs__5201__auto__,temp__4653__auto__))
,null,null));
});})(s__63953__$1,s__63951__$1,rep,xs__5201__auto____$1,temp__4653__auto____$1,vec__63973,i,sen,xs__5201__auto__,temp__4653__auto__))
;
var fs__5451__auto__ = cljs.core.seq(iterys__5450__auto__(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(cljs.core.vector,sen)));
if(fs__5451__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5451__auto__,org$nfrac$comportex$demos$simple_sentences$word_item_seq_$_iter__63950_$_iter__63952(cljs.core.rest(s__63953__$1)));
} else {
var G__63988 = cljs.core.rest(s__63953__$1);
s__63953__$1 = G__63988;
continue;
}
} else {
return null;
}
break;
}
});})(s__63951__$1,vec__63973,i,sen,xs__5201__auto__,temp__4653__auto__))
,null,null));
});})(s__63951__$1,vec__63973,i,sen,xs__5201__auto__,temp__4653__auto__))
;
var fs__5451__auto__ = cljs.core.seq(iterys__5450__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1(n_repeats)));
if(fs__5451__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5451__auto__,org$nfrac$comportex$demos$simple_sentences$word_item_seq_$_iter__63950(cljs.core.rest(s__63951__$1)));
} else {
var G__63989 = cljs.core.rest(s__63951__$1);
s__63951__$1 = G__63989;
continue;
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5454__auto__(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(cljs.core.vector,org.nfrac.comportex.demos.simple_sentences.split_sentences(text)));
});
org.nfrac.comportex.demos.simple_sentences.random_sensor = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$word,org.nfrac.comportex.encoders.unique_encoder(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.nfrac.comportex.demos.simple_sentences.bit_width], null),org.nfrac.comportex.demos.simple_sentences.n_on_bits)], null);
org.nfrac.comportex.demos.simple_sentences.n_region_model = (function org$nfrac$comportex$demos$simple_sentences$n_region_model(var_args){
var args63990 = [];
var len__5740__auto___63993 = arguments.length;
var i__5741__auto___63994 = (0);
while(true){
if((i__5741__auto___63994 < len__5740__auto___63993)){
args63990.push((arguments[i__5741__auto___63994]));

var G__63995 = (i__5741__auto___63994 + (1));
i__5741__auto___63994 = G__63995;
continue;
} else {
}
break;
}

var G__63992 = args63990.length;
switch (G__63992) {
case 1:
return org.nfrac.comportex.demos.simple_sentences.n_region_model.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return org.nfrac.comportex.demos.simple_sentences.n_region_model.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args63990.length)].join('')));

}
});

org.nfrac.comportex.demos.simple_sentences.n_region_model.cljs$core$IFn$_invoke$arity$1 = (function (n){
return org.nfrac.comportex.demos.simple_sentences.n_region_model.cljs$core$IFn$_invoke$arity$2(n,org.nfrac.comportex.demos.simple_sentences.spec);
});

org.nfrac.comportex.demos.simple_sentences.n_region_model.cljs$core$IFn$_invoke$arity$2 = (function (n,spec){
return org.nfrac.comportex.core.regions_in_series.cljs$core$IFn$_invoke$arity$4(n,org.nfrac.comportex.core.sensory_region,cljs.core.list_STAR_.cljs$core$IFn$_invoke$arity$2(spec,cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(org.nfrac.comportex.demos.simple_sentences.higher_level_spec)),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$input,org.nfrac.comportex.demos.simple_sentences.random_sensor], null));
});

org.nfrac.comportex.demos.simple_sentences.n_region_model.cljs$lang$maxFixedArity = 2;
