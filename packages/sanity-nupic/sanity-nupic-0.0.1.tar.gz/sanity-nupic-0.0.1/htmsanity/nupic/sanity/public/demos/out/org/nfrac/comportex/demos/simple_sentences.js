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
return (function (p1__63907_SHARP_){
return cljs.core.vec(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(p1__63907_SHARP_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["."], null)));
});})(text))
,cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(((function (text){
return (function (p1__63906_SHARP_){
return clojure.string.split.cljs$core$IFn$_invoke$arity$2(p1__63906_SHARP_,/[^\w']+/);
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
var iter__5454__auto__ = (function org$nfrac$comportex$demos$simple_sentences$word_item_seq_$_iter__63945(s__63946){
return (new cljs.core.LazySeq(null,(function (){
var s__63946__$1 = s__63946;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__63946__$1);
if(temp__4653__auto__){
var xs__5201__auto__ = temp__4653__auto__;
var vec__63968 = cljs.core.first(xs__5201__auto__);
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63968,(0),null);
var sen = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63968,(1),null);
var iterys__5450__auto__ = ((function (s__63946__$1,vec__63968,i,sen,xs__5201__auto__,temp__4653__auto__){
return (function org$nfrac$comportex$demos$simple_sentences$word_item_seq_$_iter__63945_$_iter__63947(s__63948){
return (new cljs.core.LazySeq(null,((function (s__63946__$1,vec__63968,i,sen,xs__5201__auto__,temp__4653__auto__){
return (function (){
var s__63948__$1 = s__63948;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__63948__$1);
if(temp__4653__auto____$1){
var xs__5201__auto____$1 = temp__4653__auto____$1;
var rep = cljs.core.first(xs__5201__auto____$1);
var iterys__5450__auto__ = ((function (s__63948__$1,s__63946__$1,rep,xs__5201__auto____$1,temp__4653__auto____$1,vec__63968,i,sen,xs__5201__auto__,temp__4653__auto__){
return (function org$nfrac$comportex$demos$simple_sentences$word_item_seq_$_iter__63945_$_iter__63947_$_iter__63949(s__63950){
return (new cljs.core.LazySeq(null,((function (s__63948__$1,s__63946__$1,rep,xs__5201__auto____$1,temp__4653__auto____$1,vec__63968,i,sen,xs__5201__auto__,temp__4653__auto__){
return (function (){
var s__63950__$1 = s__63950;
while(true){
var temp__4653__auto____$2 = cljs.core.seq(s__63950__$1);
if(temp__4653__auto____$2){
var s__63950__$2 = temp__4653__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__63950__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__63950__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__63952 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__63951 = (0);
while(true){
if((i__63951 < size__5453__auto__)){
var vec__63980 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__63951);
var j = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63980,(0),null);
var word = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63980,(1),null);
cljs.core.chunk_append(b__63952,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$word,word,cljs.core.cst$kw$index,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [i,j], null)], null));

var G__63982 = (i__63951 + (1));
i__63951 = G__63982;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__63952),org$nfrac$comportex$demos$simple_sentences$word_item_seq_$_iter__63945_$_iter__63947_$_iter__63949(cljs.core.chunk_rest(s__63950__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__63952),null);
}
} else {
var vec__63981 = cljs.core.first(s__63950__$2);
var j = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63981,(0),null);
var word = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63981,(1),null);
return cljs.core.cons(new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$word,word,cljs.core.cst$kw$index,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [i,j], null)], null),org$nfrac$comportex$demos$simple_sentences$word_item_seq_$_iter__63945_$_iter__63947_$_iter__63949(cljs.core.rest(s__63950__$2)));
}
} else {
return null;
}
break;
}
});})(s__63948__$1,s__63946__$1,rep,xs__5201__auto____$1,temp__4653__auto____$1,vec__63968,i,sen,xs__5201__auto__,temp__4653__auto__))
,null,null));
});})(s__63948__$1,s__63946__$1,rep,xs__5201__auto____$1,temp__4653__auto____$1,vec__63968,i,sen,xs__5201__auto__,temp__4653__auto__))
;
var fs__5451__auto__ = cljs.core.seq(iterys__5450__auto__(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(cljs.core.vector,sen)));
if(fs__5451__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5451__auto__,org$nfrac$comportex$demos$simple_sentences$word_item_seq_$_iter__63945_$_iter__63947(cljs.core.rest(s__63948__$1)));
} else {
var G__63983 = cljs.core.rest(s__63948__$1);
s__63948__$1 = G__63983;
continue;
}
} else {
return null;
}
break;
}
});})(s__63946__$1,vec__63968,i,sen,xs__5201__auto__,temp__4653__auto__))
,null,null));
});})(s__63946__$1,vec__63968,i,sen,xs__5201__auto__,temp__4653__auto__))
;
var fs__5451__auto__ = cljs.core.seq(iterys__5450__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1(n_repeats)));
if(fs__5451__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5451__auto__,org$nfrac$comportex$demos$simple_sentences$word_item_seq_$_iter__63945(cljs.core.rest(s__63946__$1)));
} else {
var G__63984 = cljs.core.rest(s__63946__$1);
s__63946__$1 = G__63984;
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
var args63985 = [];
var len__5740__auto___63988 = arguments.length;
var i__5741__auto___63989 = (0);
while(true){
if((i__5741__auto___63989 < len__5740__auto___63988)){
args63985.push((arguments[i__5741__auto___63989]));

var G__63990 = (i__5741__auto___63989 + (1));
i__5741__auto___63989 = G__63990;
continue;
} else {
}
break;
}

var G__63987 = args63985.length;
switch (G__63987) {
case 1:
return org.nfrac.comportex.demos.simple_sentences.n_region_model.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return org.nfrac.comportex.demos.simple_sentences.n_region_model.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args63985.length)].join('')));

}
});

org.nfrac.comportex.demos.simple_sentences.n_region_model.cljs$core$IFn$_invoke$arity$1 = (function (n){
return org.nfrac.comportex.demos.simple_sentences.n_region_model.cljs$core$IFn$_invoke$arity$2(n,org.nfrac.comportex.demos.simple_sentences.spec);
});

org.nfrac.comportex.demos.simple_sentences.n_region_model.cljs$core$IFn$_invoke$arity$2 = (function (n,spec){
return org.nfrac.comportex.core.regions_in_series.cljs$core$IFn$_invoke$arity$4(n,org.nfrac.comportex.core.sensory_region,cljs.core.list_STAR_.cljs$core$IFn$_invoke$arity$2(spec,cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(org.nfrac.comportex.demos.simple_sentences.higher_level_spec)),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$input,org.nfrac.comportex.demos.simple_sentences.random_sensor], null));
});

org.nfrac.comportex.demos.simple_sentences.n_region_model.cljs$lang$maxFixedArity = 2;
