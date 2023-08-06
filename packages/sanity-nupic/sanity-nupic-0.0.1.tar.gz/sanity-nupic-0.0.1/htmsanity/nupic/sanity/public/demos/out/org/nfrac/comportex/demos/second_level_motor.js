// Compiled by ClojureScript 1.7.170 {:static-fns true, :optimize-constants true}
goog.provide('org.nfrac.comportex.demos.second_level_motor');
goog.require('cljs.core');
goog.require('org.nfrac.comportex.protocols');
goog.require('org.nfrac.comportex.core');
goog.require('cljs.core.async');
goog.require('org.nfrac.comportex.util');
goog.require('org.nfrac.comportex.encoders');
goog.require('clojure.string');
org.nfrac.comportex.demos.second_level_motor.bit_width = (600);
org.nfrac.comportex.demos.second_level_motor.n_on_bits = (30);
org.nfrac.comportex.demos.second_level_motor.motor_bit_width = (10);
org.nfrac.comportex.demos.second_level_motor.motor_n_on_bits = (5);
org.nfrac.comportex.demos.second_level_motor.test_text = "one two three four.\nthe three little pigs.\n6874230\n1874235.\n6342785\n1342780.\n09785341\n29785346.\n04358796\n24358791.";
org.nfrac.comportex.demos.second_level_motor.parse_sentences = (function org$nfrac$comportex$demos$second_level_motor$parse_sentences(text_STAR_){
var text = clojure.string.lower_case(clojure.string.trim(text_STAR_));
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(((function (text){
return (function (p1__66765_SHARP_){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.vec,p1__66765_SHARP_);
});})(text))
,cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(((function (text){
return (function (p1__66764_SHARP_){
return clojure.string.split.cljs$core$IFn$_invoke$arity$2(p1__66764_SHARP_,/[^\w']+/);
});})(text))
,clojure.string.split.cljs$core$IFn$_invoke$arity$2(text,/[^\w]*\.+[^\w]*/)));
});
org.nfrac.comportex.demos.second_level_motor.spec = new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$column_DASH_dimensions,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(1000)], null),cljs.core.cst$kw$depth,(8),cljs.core.cst$kw$proximal,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$perm_DASH_stable_DASH_inc,0.15,cljs.core.cst$kw$perm_DASH_inc,0.04,cljs.core.cst$kw$perm_DASH_dec,0.01], null),cljs.core.cst$kw$lateral_DASH_synapses_QMARK_,true,cljs.core.cst$kw$distal_DASH_vs_DASH_proximal_DASH_weight,0.0,cljs.core.cst$kw$use_DASH_feedback_QMARK_,false], null);
org.nfrac.comportex.demos.second_level_motor.higher_level_spec = org.nfrac.comportex.util.deep_merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([org.nfrac.comportex.demos.second_level_motor.spec,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$column_DASH_dimensions,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(800)], null),cljs.core.cst$kw$proximal,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$max_DASH_segments,(5),cljs.core.cst$kw$new_DASH_synapse_DASH_count,(12),cljs.core.cst$kw$learn_DASH_threshold,(6)], null)], null)], 0));
org.nfrac.comportex.demos.second_level_motor.initial_inval = (function org$nfrac$comportex$demos$second_level_motor$initial_inval(sentences){
return new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$sentences,sentences,cljs.core.cst$kw$position,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),(0)], null),cljs.core.cst$kw$value,cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(sentences,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),(0)], null)),cljs.core.cst$kw$action,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$next_DASH_letter_DASH_saccade,(-1),cljs.core.cst$kw$next_DASH_word_DASH_saccade,(-1),cljs.core.cst$kw$next_DASH_sentence_DASH_saccade,(-1)], null)], null);
});
org.nfrac.comportex.demos.second_level_motor.next_position = (function org$nfrac$comportex$demos$second_level_motor$next_position(p__66766,action){
var vec__66768 = p__66766;
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66768,(0),null);
var j = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66768,(1),null);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66768,(2),null);
if((cljs.core.cst$kw$next_DASH_sentence_DASH_saccade.cljs$core$IFn$_invoke$arity$1(action) > (0))){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(i + (1)),(0),(0)], null);
} else {
if((cljs.core.cst$kw$next_DASH_sentence_DASH_saccade.cljs$core$IFn$_invoke$arity$1(action) < (0))){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),(0)], null);
} else {
if((cljs.core.cst$kw$next_DASH_word_DASH_saccade.cljs$core$IFn$_invoke$arity$1(action) > (0))){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [i,(j + (1)),(0)], null);
} else {
if((cljs.core.cst$kw$next_DASH_word_DASH_saccade.cljs$core$IFn$_invoke$arity$1(action) < (0))){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [i,(0),(0)], null);
} else {
if((cljs.core.cst$kw$next_DASH_letter_DASH_saccade.cljs$core$IFn$_invoke$arity$1(action) > (0))){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [i,j,(k + (1))], null);
} else {
if((cljs.core.cst$kw$next_DASH_letter_DASH_saccade.cljs$core$IFn$_invoke$arity$1(action) < (0))){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [i,j,(0)], null);
} else {
return null;
}
}
}
}
}
}
});
org.nfrac.comportex.demos.second_level_motor.apply_action = (function org$nfrac$comportex$demos$second_level_motor$apply_action(inval){
var new_posn = org.nfrac.comportex.demos.second_level_motor.next_position(cljs.core.cst$kw$position.cljs$core$IFn$_invoke$arity$1(inval),cljs.core.cst$kw$action.cljs$core$IFn$_invoke$arity$1(inval));
var new_value = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$sentences.cljs$core$IFn$_invoke$arity$1(inval),new_posn);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(inval,cljs.core.cst$kw$position,new_posn,cljs.core.array_seq([cljs.core.cst$kw$value,new_value], 0));
});
org.nfrac.comportex.demos.second_level_motor.letter_sensor = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$value,org.nfrac.comportex.encoders.unique_encoder(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.nfrac.comportex.demos.second_level_motor.bit_width], null),org.nfrac.comportex.demos.second_level_motor.n_on_bits)], null);
org.nfrac.comportex.demos.second_level_motor.letter_motor_sensor = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$action,cljs.core.cst$kw$next_DASH_letter_DASH_saccade], null),org.nfrac.comportex.encoders.category_encoder(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.nfrac.comportex.demos.second_level_motor.motor_bit_width], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(1),(-1)], null))], null);
org.nfrac.comportex.demos.second_level_motor.word_motor_sensor = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$action,cljs.core.cst$kw$next_DASH_word_DASH_saccade], null),org.nfrac.comportex.encoders.category_encoder(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.nfrac.comportex.demos.second_level_motor.motor_bit_width], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(1),(-1)], null))], null);
org.nfrac.comportex.demos.second_level_motor.two_region_model = (function org$nfrac$comportex$demos$second_level_motor$two_region_model(var_args){
var args66769 = [];
var len__5740__auto___66772 = arguments.length;
var i__5741__auto___66773 = (0);
while(true){
if((i__5741__auto___66773 < len__5740__auto___66772)){
args66769.push((arguments[i__5741__auto___66773]));

var G__66774 = (i__5741__auto___66773 + (1));
i__5741__auto___66773 = G__66774;
continue;
} else {
}
break;
}

var G__66771 = args66769.length;
switch (G__66771) {
case 0:
return org.nfrac.comportex.demos.second_level_motor.two_region_model.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return org.nfrac.comportex.demos.second_level_motor.two_region_model.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args66769.length)].join('')));

}
});

org.nfrac.comportex.demos.second_level_motor.two_region_model.cljs$core$IFn$_invoke$arity$0 = (function (){
return org.nfrac.comportex.demos.second_level_motor.two_region_model.cljs$core$IFn$_invoke$arity$1(org.nfrac.comportex.demos.second_level_motor.spec);
});

org.nfrac.comportex.demos.second_level_motor.two_region_model.cljs$core$IFn$_invoke$arity$1 = (function (spec){
return org.nfrac.comportex.core.region_network(new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$rgn_DASH_0,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input,cljs.core.cst$kw$letter_DASH_motor], null),cljs.core.cst$kw$rgn_DASH_1,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$rgn_DASH_0,cljs.core.cst$kw$word_DASH_motor], null)], null),cljs.core.constantly(org.nfrac.comportex.core.sensory_region),new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$rgn_DASH_0,spec,cljs.core.cst$kw$rgn_DASH_1,org.nfrac.comportex.demos.second_level_motor.higher_level_spec], null),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$input,org.nfrac.comportex.demos.second_level_motor.letter_sensor], null),new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$letter_DASH_motor,org.nfrac.comportex.demos.second_level_motor.letter_motor_sensor,cljs.core.cst$kw$word_DASH_motor,org.nfrac.comportex.demos.second_level_motor.word_motor_sensor], null));
});

org.nfrac.comportex.demos.second_level_motor.two_region_model.cljs$lang$maxFixedArity = 1;
org.nfrac.comportex.demos.second_level_motor.htm_step_with_action_selection = (function org$nfrac$comportex$demos$second_level_motor$htm_step_with_action_selection(world_c,control_c){

var c__36154__auto___66850 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__36154__auto___66850){
return (function (){
var f__36155__auto__ = (function (){var switch__36040__auto__ = ((function (c__36154__auto___66850){
return (function (state_66829){
var state_val_66830 = (state_66829[(1)]);
if((state_val_66830 === (1))){
var state_66829__$1 = state_66829;
var statearr_66831_66851 = state_66829__$1;
(statearr_66831_66851[(2)] = null);

(statearr_66831_66851[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_66830 === (2))){
var state_66829__$1 = state_66829;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_66829__$1,(4),control_c);
} else {
if((state_val_66830 === (3))){
var inst_66827 = (state_66829[(2)]);
var state_66829__$1 = state_66829;
return cljs.core.async.impl.ioc_helpers.return_chan(state_66829__$1,inst_66827);
} else {
if((state_val_66830 === (4))){
var inst_66815 = (state_66829[(7)]);
var inst_66815__$1 = (state_66829[(2)]);
var state_66829__$1 = (function (){var statearr_66832 = state_66829;
(statearr_66832[(7)] = inst_66815__$1);

return statearr_66832;
})();
if(cljs.core.truth_(inst_66815__$1)){
var statearr_66833_66852 = state_66829__$1;
(statearr_66833_66852[(1)] = (5));

} else {
var statearr_66834_66853 = state_66829__$1;
(statearr_66834_66853[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_66830 === (5))){
var state_66829__$1 = state_66829;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_66829__$1,(8),world_c);
} else {
if((state_val_66830 === (6))){
var state_66829__$1 = state_66829;
var statearr_66835_66854 = state_66829__$1;
(statearr_66835_66854[(2)] = null);

(statearr_66835_66854[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_66830 === (7))){
var inst_66825 = (state_66829[(2)]);
var state_66829__$1 = state_66829;
var statearr_66836_66855 = state_66829__$1;
(statearr_66836_66855[(2)] = inst_66825);

(statearr_66836_66855[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_66830 === (8))){
var inst_66815 = (state_66829[(7)]);
var inst_66818 = (state_66829[(2)]);
var inst_66819 = (inst_66815.cljs$core$IFn$_invoke$arity$1 ? inst_66815.cljs$core$IFn$_invoke$arity$1(inst_66818) : inst_66815.call(null,inst_66818));
var state_66829__$1 = state_66829;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_66829__$1,(9),world_c,inst_66819);
} else {
if((state_val_66830 === (9))){
var inst_66821 = (state_66829[(2)]);
var state_66829__$1 = (function (){var statearr_66837 = state_66829;
(statearr_66837[(8)] = inst_66821);

return statearr_66837;
})();
var statearr_66838_66856 = state_66829__$1;
(statearr_66838_66856[(2)] = null);

(statearr_66838_66856[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
return null;
}
}
}
}
}
}
}
}
}
});})(c__36154__auto___66850))
;
return ((function (switch__36040__auto__,c__36154__auto___66850){
return (function() {
var org$nfrac$comportex$demos$second_level_motor$htm_step_with_action_selection_$_state_machine__36041__auto__ = null;
var org$nfrac$comportex$demos$second_level_motor$htm_step_with_action_selection_$_state_machine__36041__auto____0 = (function (){
var statearr_66842 = [null,null,null,null,null,null,null,null,null];
(statearr_66842[(0)] = org$nfrac$comportex$demos$second_level_motor$htm_step_with_action_selection_$_state_machine__36041__auto__);

(statearr_66842[(1)] = (1));

return statearr_66842;
});
var org$nfrac$comportex$demos$second_level_motor$htm_step_with_action_selection_$_state_machine__36041__auto____1 = (function (state_66829){
while(true){
var ret_value__36042__auto__ = (function (){try{while(true){
var result__36043__auto__ = switch__36040__auto__(state_66829);
if(cljs.core.keyword_identical_QMARK_(result__36043__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__36043__auto__;
}
break;
}
}catch (e66843){if((e66843 instanceof Object)){
var ex__36044__auto__ = e66843;
var statearr_66844_66857 = state_66829;
(statearr_66844_66857[(5)] = ex__36044__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_66829);

return cljs.core.cst$kw$recur;
} else {
throw e66843;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__36042__auto__,cljs.core.cst$kw$recur)){
var G__66858 = state_66829;
state_66829 = G__66858;
continue;
} else {
return ret_value__36042__auto__;
}
break;
}
});
org$nfrac$comportex$demos$second_level_motor$htm_step_with_action_selection_$_state_machine__36041__auto__ = function(state_66829){
switch(arguments.length){
case 0:
return org$nfrac$comportex$demos$second_level_motor$htm_step_with_action_selection_$_state_machine__36041__auto____0.call(this);
case 1:
return org$nfrac$comportex$demos$second_level_motor$htm_step_with_action_selection_$_state_machine__36041__auto____1.call(this,state_66829);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$nfrac$comportex$demos$second_level_motor$htm_step_with_action_selection_$_state_machine__36041__auto__.cljs$core$IFn$_invoke$arity$0 = org$nfrac$comportex$demos$second_level_motor$htm_step_with_action_selection_$_state_machine__36041__auto____0;
org$nfrac$comportex$demos$second_level_motor$htm_step_with_action_selection_$_state_machine__36041__auto__.cljs$core$IFn$_invoke$arity$1 = org$nfrac$comportex$demos$second_level_motor$htm_step_with_action_selection_$_state_machine__36041__auto____1;
return org$nfrac$comportex$demos$second_level_motor$htm_step_with_action_selection_$_state_machine__36041__auto__;
})()
;})(switch__36040__auto__,c__36154__auto___66850))
})();
var state__36156__auto__ = (function (){var statearr_66845 = (f__36155__auto__.cljs$core$IFn$_invoke$arity$0 ? f__36155__auto__.cljs$core$IFn$_invoke$arity$0() : f__36155__auto__.call(null));
(statearr_66845[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__36154__auto___66850);

return statearr_66845;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__36156__auto__);
});})(c__36154__auto___66850))
);


return (function (htm,inval){
var htm_a = org.nfrac.comportex.protocols.htm_learn(org.nfrac.comportex.protocols.htm_activate(org.nfrac.comportex.protocols.htm_sense(htm,inval,cljs.core.cst$kw$sensory)));
var vec__66846 = cljs.core.cst$kw$position.cljs$core$IFn$_invoke$arity$1(inval);
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66846,(0),null);
var j = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66846,(1),null);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66846,(2),null);
var sentences = cljs.core.cst$kw$sentences.cljs$core$IFn$_invoke$arity$1(inval);
var sentence = cljs.core.get.cljs$core$IFn$_invoke$arity$2(sentences,i);
var word = cljs.core.get.cljs$core$IFn$_invoke$arity$2(sentence,j);
var end_of_word_QMARK_ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(k,(cljs.core.count(word) - (1)));
var end_of_sentence_QMARK_ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(j,(cljs.core.count(sentence) - (1)));
var end_of_passage_QMARK_ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(i,(cljs.core.count(sentences) - (1)));
var r0_lyr = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm_a,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,cljs.core.cst$kw$rgn_DASH_0,cljs.core.cst$kw$layer_DASH_3], null));
var r1_lyr = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm_a,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,cljs.core.cst$kw$rgn_DASH_1,cljs.core.cst$kw$layer_DASH_3], null));
var r0_burst_frac = ((org.nfrac.comportex.protocols.layer_depth(r0_lyr) * cljs.core.count(org.nfrac.comportex.protocols.bursting_columns(r0_lyr))) / (function (){var x__5013__auto__ = (1);
var y__5014__auto__ = cljs.core.count(org.nfrac.comportex.protocols.active_cells(r0_lyr));
return ((x__5013__auto__ > y__5014__auto__) ? x__5013__auto__ : y__5014__auto__);
})());
var word_burst_QMARK_ = (function (){var G__66847 = cljs.core.cst$kw$word_DASH_bursting_QMARK_.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$action.cljs$core$IFn$_invoke$arity$1(inval));
if((k > (0))){
var or__4682__auto__ = G__66847;
if(cljs.core.truth_(or__4682__auto__)){
return or__4682__auto__;
} else {
return (r0_burst_frac >= 0.5);
}
} else {
return G__66847;
}
})();
var sent_burst_QMARK_ = (function (){var G__66848 = cljs.core.cst$kw$sentence_DASH_bursting_QMARK_.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$action.cljs$core$IFn$_invoke$arity$1(inval));
if((k > (0))){
var or__4682__auto__ = G__66848;
if(cljs.core.truth_(or__4682__auto__)){
return or__4682__auto__;
} else {
return (r0_burst_frac >= 0.5);
}
} else {
return G__66848;
}
})();
var action_STAR_ = ((!(end_of_word_QMARK_))?new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$next_DASH_letter_DASH_saccade,(1)], null):(cljs.core.truth_(word_burst_QMARK_)?new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$word_DASH_bursting_QMARK_,false], null):((!(end_of_sentence_QMARK_))?new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$next_DASH_word_DASH_saccade,(1),cljs.core.cst$kw$word_DASH_bursting_QMARK_,false], null):(cljs.core.truth_(sent_burst_QMARK_)?new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$next_DASH_word_DASH_saccade,(-1),cljs.core.cst$kw$word_DASH_bursting_QMARK_,false,cljs.core.cst$kw$sentence_DASH_bursting_QMARK_,false], null):((!(end_of_passage_QMARK_))?new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$next_DASH_sentence_DASH_saccade,(1),cljs.core.cst$kw$next_DASH_word_DASH_saccade,(1),cljs.core.cst$kw$word_DASH_bursting_QMARK_,false,cljs.core.cst$kw$sentence_DASH_bursting_QMARK_,false], null):new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$next_DASH_word_DASH_saccade,(-1),cljs.core.cst$kw$word_DASH_bursting_QMARK_,false,cljs.core.cst$kw$sentence_DASH_bursting_QMARK_,false], null)
)))));
var action = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$next_DASH_letter_DASH_saccade,(-1),cljs.core.cst$kw$next_DASH_word_DASH_saccade,(0),cljs.core.cst$kw$next_DASH_sentence_DASH_saccade,(0),cljs.core.cst$kw$word_DASH_bursting_QMARK_,word_burst_QMARK_,cljs.core.cst$kw$sentence_DASH_bursting_QMARK_,sent_burst_QMARK_], null),action_STAR_], 0));
var inval_with_action = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(inval,cljs.core.cst$kw$action,action,cljs.core.array_seq([cljs.core.cst$kw$prev_DASH_action,cljs.core.cst$kw$action.cljs$core$IFn$_invoke$arity$1(inval)], 0));
var new_inval_66859 = org.nfrac.comportex.demos.second_level_motor.apply_action(inval_with_action);
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(world_c,new_inval_66859);

var G__66849 = htm_a;
var G__66849__$1 = org.nfrac.comportex.protocols.htm_sense(G__66849,inval_with_action,cljs.core.cst$kw$motor)
;
var G__66849__$2 = org.nfrac.comportex.protocols.htm_depolarise(G__66849__$1)
;
if((end_of_word_QMARK_) && (cljs.core.not(word_burst_QMARK_))){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(G__66849__$2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,cljs.core.cst$kw$rgn_DASH_0], null),org.nfrac.comportex.protocols.break$,cljs.core.cst$kw$tm);
} else {
return G__66849__$2;
}
});
});
