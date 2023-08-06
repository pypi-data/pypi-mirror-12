// Compiled by ClojureScript 1.7.170 {:static-fns true, :optimize-constants true}
goog.provide('org.numenta.sanity.demos.cortical_io');
goog.require('cljs.core');
goog.require('goog.dom.forms');
goog.require('goog.dom');
goog.require('reagent.core');
goog.require('org.numenta.sanity.helpers');
goog.require('org.numenta.sanity.util');
goog.require('org.numenta.sanity.main');
goog.require('org.nfrac.comportex.protocols');
goog.require('org.numenta.sanity.comportex.data');
goog.require('cljs.core.async');
goog.require('org.numenta.sanity.bridge.marshalling');
goog.require('reagent_forms.core');
goog.require('org.nfrac.comportex.core');
goog.require('org.numenta.sanity.bridge.browser');
goog.require('org.nfrac.comportex.cortical_io');
goog.require('org.numenta.sanity.demos.comportex_common');
goog.require('org.nfrac.comportex.util');
goog.require('org.nfrac.comportex.encoders');
goog.require('clojure.string');
org.numenta.sanity.demos.cortical_io.fox_eats_what = "\nfrog eat flies.\ncow eat grain.\nelephant eat leaves.\ngoat eat grass.\nwolf eat rabbit.\ncat likes ball.\nelephant likes water.\nsheep eat grass.\ncat eat salmon.\nwolf eat mice.\nlion eat cow.\ndog likes sleep.\ncoyote eat mice.\ncoyote eat rodent.\ncoyote eat rabbit.\nwolf eat squirrel.\ncow eat grass.\nfrog eat flies.\ncow eat grain.\nelephant eat leaves.\ngoat eat grass.\nwolf eat rabbit.\nsheep eat grass.\ncat eat salmon.\nwolf eat mice.\nlion eat cow.\ncoyote eat mice.\nelephant likes water.\ncat likes ball.\ncoyote eat rodent.\ncoyote eat rabbit.\nwolf eat squirrel.\ndog likes sleep.\ncat eat salmon.\ncat likes ball.\ncow eat grass.\nfox eat something.\n";
org.numenta.sanity.demos.cortical_io.fingerprint_cache = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
org.numenta.sanity.demos.cortical_io.config = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$decode_DASH_locally_QMARK_,cljs.core.cst$kw$cache_DASH_count,cljs.core.cst$kw$repeats,cljs.core.cst$kw$spec_DASH_choice,cljs.core.cst$kw$spatial_DASH_scramble_QMARK_,cljs.core.cst$kw$encoder,cljs.core.cst$kw$have_DASH_model_QMARK_,cljs.core.cst$kw$world_DASH_buffer_DASH_count,cljs.core.cst$kw$n_DASH_regions,cljs.core.cst$kw$api_DASH_key,cljs.core.cst$kw$text],[true,(0),(3),cljs.core.cst$kw$a,false,cljs.core.cst$kw$cortical_DASH_io,false,(0),(1),null,org.numenta.sanity.demos.cortical_io.fox_eats_what]));
org.numenta.sanity.demos.cortical_io.world_buffer = cljs.core.async.buffer((5000));
org.numenta.sanity.demos.cortical_io.world_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.demos.cortical_io.world_buffer,cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.map.cljs$core$IFn$_invoke$arity$1(org.nfrac.comportex.util.keep_history_middleware((100),cljs.core.cst$kw$word,cljs.core.cst$kw$history)),cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (p1__67025_SHARP_){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__67025_SHARP_,cljs.core.cst$kw$label,cljs.core.cst$kw$word.cljs$core$IFn$_invoke$arity$1(p1__67025_SHARP_));
}))));
org.numenta.sanity.demos.cortical_io.into_sim = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
org.numenta.sanity.demos.cortical_io.model = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
cljs.core.add_watch(org.numenta.sanity.demos.cortical_io.model,cljs.core.cst$kw$org$numenta$sanity$demos$cortical_DASH_io_SLASH_count_DASH_world_DASH_buffer,(function (_,___$1,___$2,___$3){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.demos.cortical_io.config,cljs.core.assoc,cljs.core.cst$kw$world_DASH_buffer_DASH_count,cljs.core.count(org.numenta.sanity.demos.cortical_io.world_buffer));
}));
cljs.core.add_watch(org.numenta.sanity.demos.cortical_io.fingerprint_cache,cljs.core.cst$kw$count,(function (_,___$1,___$2,v){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.demos.cortical_io.config,cljs.core.assoc,cljs.core.cst$kw$cache_DASH_count,cljs.core.count(v));
}));
org.numenta.sanity.demos.cortical_io.spec_global = cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$ff_DASH_perm_DASH_connected,cljs.core.cst$kw$distal_DASH_punish_QMARK_,cljs.core.cst$kw$global_DASH_inhibition_QMARK_,cljs.core.cst$kw$seg_DASH_new_DASH_synapse_DASH_count,cljs.core.cst$kw$max_DASH_segments,cljs.core.cst$kw$distal_DASH_perm_DASH_dec,cljs.core.cst$kw$distal_DASH_perm_DASH_connected,cljs.core.cst$kw$seg_DASH_learn_DASH_threshold,cljs.core.cst$kw$seg_DASH_stimulus_DASH_threshold,cljs.core.cst$kw$column_DASH_dimensions,cljs.core.cst$kw$distal_DASH_vs_DASH_proximal_DASH_weight,cljs.core.cst$kw$ff_DASH_init_DASH_frac,cljs.core.cst$kw$distal_DASH_perm_DASH_inc,cljs.core.cst$kw$seg_DASH_max_DASH_synapse_DASH_count,cljs.core.cst$kw$max_DASH_boost,cljs.core.cst$kw$ff_DASH_potential_DASH_radius,cljs.core.cst$kw$ff_DASH_perm_DASH_inc,cljs.core.cst$kw$activation_DASH_level,cljs.core.cst$kw$ff_DASH_perm_DASH_dec,cljs.core.cst$kw$depth,cljs.core.cst$kw$duty_DASH_cycle_DASH_period,cljs.core.cst$kw$distal_DASH_perm_DASH_init,cljs.core.cst$kw$ff_DASH_stimulus_DASH_threshold],[0.2,true,true,(12),(5),0.01,0.2,(6),(9),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(30),(40)], null),(0),0.2,0.05,(18),2.0,1.0,0.05,0.02,0.005,(5),(100000),0.16,(1)]);
org.numenta.sanity.demos.cortical_io.spec_local = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(org.numenta.sanity.demos.cortical_io.spec_global,cljs.core.cst$kw$ff_DASH_init_DASH_frac,0.3,cljs.core.array_seq([cljs.core.cst$kw$ff_DASH_potential_DASH_radius,0.2,cljs.core.cst$kw$global_DASH_inhibition_QMARK_,false,cljs.core.cst$kw$inhibition_DASH_base_DASH_distance,(1)], 0));
org.numenta.sanity.demos.cortical_io.higher_level_spec_diff = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$column_DASH_dimensions,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(300)], null),cljs.core.cst$kw$ff_DASH_max_DASH_segments,(5)], null);
org.numenta.sanity.demos.cortical_io.load_predictions = (function org$numenta$sanity$demos$cortical_io$load_predictions(htm,n_predictions,predictions_cache){
var vec__67040 = cljs.core.first(cljs.core.vals(cljs.core.cst$kw$sensors.cljs$core$IFn$_invoke$arity$1(htm)));
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67040,(0),null);
var e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67040,(1),null);
var rgn = cljs.core.first(org.nfrac.comportex.core.region_seq(htm));
var pr_votes = org.nfrac.comportex.core.predicted_bit_votes(rgn);
var predictions = org.nfrac.comportex.protocols.decode(e,pr_votes,n_predictions);
var temp__4651__auto__ = cljs.core.cst$kw$channel.cljs$core$IFn$_invoke$arity$1(predictions);
if(cljs.core.truth_(temp__4651__auto__)){
var c = temp__4651__auto__;
var c__36154__auto___67054 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__36154__auto___67054,c,temp__4651__auto__,vec__67040,_,e,rgn,pr_votes,predictions){
return (function (){
var f__36155__auto__ = (function (){var switch__36040__auto__ = ((function (c__36154__auto___67054,c,temp__4651__auto__,vec__67040,_,e,rgn,pr_votes,predictions){
return (function (state_67045){
var state_val_67046 = (state_67045[(1)]);
if((state_val_67046 === (1))){
var state_67045__$1 = state_67045;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_67045__$1,(2),c);
} else {
if((state_val_67046 === (2))){
var inst_67042 = (state_67045[(2)]);
var inst_67043 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(predictions_cache,cljs.core.assoc,htm,inst_67042);
var state_67045__$1 = state_67045;
return cljs.core.async.impl.ioc_helpers.return_chan(state_67045__$1,inst_67043);
} else {
return null;
}
}
});})(c__36154__auto___67054,c,temp__4651__auto__,vec__67040,_,e,rgn,pr_votes,predictions))
;
return ((function (switch__36040__auto__,c__36154__auto___67054,c,temp__4651__auto__,vec__67040,_,e,rgn,pr_votes,predictions){
return (function() {
var org$numenta$sanity$demos$cortical_io$load_predictions_$_state_machine__36041__auto__ = null;
var org$numenta$sanity$demos$cortical_io$load_predictions_$_state_machine__36041__auto____0 = (function (){
var statearr_67050 = [null,null,null,null,null,null,null];
(statearr_67050[(0)] = org$numenta$sanity$demos$cortical_io$load_predictions_$_state_machine__36041__auto__);

(statearr_67050[(1)] = (1));

return statearr_67050;
});
var org$numenta$sanity$demos$cortical_io$load_predictions_$_state_machine__36041__auto____1 = (function (state_67045){
while(true){
var ret_value__36042__auto__ = (function (){try{while(true){
var result__36043__auto__ = switch__36040__auto__(state_67045);
if(cljs.core.keyword_identical_QMARK_(result__36043__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__36043__auto__;
}
break;
}
}catch (e67051){if((e67051 instanceof Object)){
var ex__36044__auto__ = e67051;
var statearr_67052_67055 = state_67045;
(statearr_67052_67055[(5)] = ex__36044__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_67045);

return cljs.core.cst$kw$recur;
} else {
throw e67051;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__36042__auto__,cljs.core.cst$kw$recur)){
var G__67056 = state_67045;
state_67045 = G__67056;
continue;
} else {
return ret_value__36042__auto__;
}
break;
}
});
org$numenta$sanity$demos$cortical_io$load_predictions_$_state_machine__36041__auto__ = function(state_67045){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$cortical_io$load_predictions_$_state_machine__36041__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$cortical_io$load_predictions_$_state_machine__36041__auto____1.call(this,state_67045);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$cortical_io$load_predictions_$_state_machine__36041__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$cortical_io$load_predictions_$_state_machine__36041__auto____0;
org$numenta$sanity$demos$cortical_io$load_predictions_$_state_machine__36041__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$cortical_io$load_predictions_$_state_machine__36041__auto____1;
return org$numenta$sanity$demos$cortical_io$load_predictions_$_state_machine__36041__auto__;
})()
;})(switch__36040__auto__,c__36154__auto___67054,c,temp__4651__auto__,vec__67040,_,e,rgn,pr_votes,predictions))
})();
var state__36156__auto__ = (function (){var statearr_67053 = (f__36155__auto__.cljs$core$IFn$_invoke$arity$0 ? f__36155__auto__.cljs$core$IFn$_invoke$arity$0() : f__36155__auto__.call(null));
(statearr_67053[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__36154__auto___67054);

return statearr_67053;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__36156__auto__);
});})(c__36154__auto___67054,c,temp__4651__auto__,vec__67040,_,e,rgn,pr_votes,predictions))
);


return null;
} else {
return predictions;
}
});
org.numenta.sanity.demos.cortical_io.max_shown = (100);
org.numenta.sanity.demos.cortical_io.scroll_every = (50);
org.numenta.sanity.demos.cortical_io.world_pane = (function org$numenta$sanity$demos$cortical_io$world_pane(){
var show_predictions = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(false);
var predictions_cache = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var selected_htm = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
cljs.core.add_watch(org.numenta.sanity.main.selection,cljs.core.cst$kw$org$numenta$sanity$demos$cortical_DASH_io_SLASH_fetch_DASH_selected_DASH_htm,((function (show_predictions,predictions_cache,selected_htm){
return (function (_,___$1,___$2,p__67072){
var vec__67073 = p__67072;
var sel = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67073,(0),null);
var temp__4653__auto__ = cljs.core.cst$kw$model_DASH_id.cljs$core$IFn$_invoke$arity$1(sel);
if(cljs.core.truth_(temp__4653__auto__)){
var model_id = temp__4653__auto__;
var out_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.into_journal,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["get-model",model_id,org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$1(out_c)], null));

var c__36154__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__36154__auto__,out_c,model_id,temp__4653__auto__,vec__67073,sel,show_predictions,predictions_cache,selected_htm){
return (function (){
var f__36155__auto__ = (function (){var switch__36040__auto__ = ((function (c__36154__auto__,out_c,model_id,temp__4653__auto__,vec__67073,sel,show_predictions,predictions_cache,selected_htm){
return (function (state_67078){
var state_val_67079 = (state_67078[(1)]);
if((state_val_67079 === (1))){
var state_67078__$1 = state_67078;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_67078__$1,(2),out_c);
} else {
if((state_val_67079 === (2))){
var inst_67075 = (state_67078[(2)]);
var inst_67076 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(selected_htm,inst_67075) : cljs.core.reset_BANG_.call(null,selected_htm,inst_67075));
var state_67078__$1 = state_67078;
return cljs.core.async.impl.ioc_helpers.return_chan(state_67078__$1,inst_67076);
} else {
return null;
}
}
});})(c__36154__auto__,out_c,model_id,temp__4653__auto__,vec__67073,sel,show_predictions,predictions_cache,selected_htm))
;
return ((function (switch__36040__auto__,c__36154__auto__,out_c,model_id,temp__4653__auto__,vec__67073,sel,show_predictions,predictions_cache,selected_htm){
return (function() {
var org$numenta$sanity$demos$cortical_io$world_pane_$_state_machine__36041__auto__ = null;
var org$numenta$sanity$demos$cortical_io$world_pane_$_state_machine__36041__auto____0 = (function (){
var statearr_67083 = [null,null,null,null,null,null,null];
(statearr_67083[(0)] = org$numenta$sanity$demos$cortical_io$world_pane_$_state_machine__36041__auto__);

(statearr_67083[(1)] = (1));

return statearr_67083;
});
var org$numenta$sanity$demos$cortical_io$world_pane_$_state_machine__36041__auto____1 = (function (state_67078){
while(true){
var ret_value__36042__auto__ = (function (){try{while(true){
var result__36043__auto__ = switch__36040__auto__(state_67078);
if(cljs.core.keyword_identical_QMARK_(result__36043__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__36043__auto__;
}
break;
}
}catch (e67084){if((e67084 instanceof Object)){
var ex__36044__auto__ = e67084;
var statearr_67085_67087 = state_67078;
(statearr_67085_67087[(5)] = ex__36044__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_67078);

return cljs.core.cst$kw$recur;
} else {
throw e67084;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__36042__auto__,cljs.core.cst$kw$recur)){
var G__67088 = state_67078;
state_67078 = G__67088;
continue;
} else {
return ret_value__36042__auto__;
}
break;
}
});
org$numenta$sanity$demos$cortical_io$world_pane_$_state_machine__36041__auto__ = function(state_67078){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$cortical_io$world_pane_$_state_machine__36041__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$cortical_io$world_pane_$_state_machine__36041__auto____1.call(this,state_67078);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$cortical_io$world_pane_$_state_machine__36041__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$cortical_io$world_pane_$_state_machine__36041__auto____0;
org$numenta$sanity$demos$cortical_io$world_pane_$_state_machine__36041__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$cortical_io$world_pane_$_state_machine__36041__auto____1;
return org$numenta$sanity$demos$cortical_io$world_pane_$_state_machine__36041__auto__;
})()
;})(switch__36040__auto__,c__36154__auto__,out_c,model_id,temp__4653__auto__,vec__67073,sel,show_predictions,predictions_cache,selected_htm))
})();
var state__36156__auto__ = (function (){var statearr_67086 = (f__36155__auto__.cljs$core$IFn$_invoke$arity$0 ? f__36155__auto__.cljs$core$IFn$_invoke$arity$0() : f__36155__auto__.call(null));
(statearr_67086[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__36154__auto__);

return statearr_67086;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__36156__auto__);
});})(c__36154__auto__,out_c,model_id,temp__4653__auto__,vec__67073,sel,show_predictions,predictions_cache,selected_htm))
);

return c__36154__auto__;
} else {
return null;
}
});})(show_predictions,predictions_cache,selected_htm))
);

return ((function (show_predictions,predictions_cache,selected_htm){
return (function (){
var temp__4653__auto__ = org.numenta.sanity.main.selected_step.cljs$core$IFn$_invoke$arity$0();
if(cljs.core.truth_(temp__4653__auto__)){
var step = temp__4653__auto__;
var temp__4653__auto____$1 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selected_htm) : cljs.core.deref.call(null,selected_htm));
if(cljs.core.truth_(temp__4653__auto____$1)){
var htm = temp__4653__auto____$1;
var inval = cljs.core.cst$kw$input_DASH_value.cljs$core$IFn$_invoke$arity$1(step);
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$muted,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,"Input on selected timestep."], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$min_DASH_height,"40vh"], null)], null),org.numenta.sanity.helpers.text_world_input_component(inval,htm,org.numenta.sanity.demos.cortical_io.max_shown,org.numenta.sanity.demos.cortical_io.scroll_every," ")], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_default$btn_DASH_block,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$class,(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(show_predictions) : cljs.core.deref.call(null,show_predictions)))?"active":null),cljs.core.cst$kw$on_DASH_click,((function (inval,htm,temp__4653__auto____$1,step,temp__4653__auto__,show_predictions,predictions_cache,selected_htm){
return (function (e){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(show_predictions,cljs.core.not);

return e.preventDefault();
});})(inval,htm,temp__4653__auto____$1,step,temp__4653__auto__,show_predictions,predictions_cache,selected_htm))
], null),"Compute predictions"], null)], null),(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(show_predictions) : cljs.core.deref.call(null,show_predictions)))?(function (){var temp__4651__auto__ = (function (){var or__4682__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(predictions_cache) : cljs.core.deref.call(null,predictions_cache)),htm);
if(cljs.core.truth_(or__4682__auto__)){
return or__4682__auto__;
} else {
return org.numenta.sanity.demos.cortical_io.load_predictions(htm,(8),predictions_cache);
}
})();
if(cljs.core.truth_(temp__4651__auto__)){
var predictions = temp__4651__auto__;
return org.numenta.sanity.helpers.predictions_table(predictions);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_info,"Loading predictions..."], null);
}
})():null)], null);
} else {
return null;
}
} else {
return null;
}
});
;})(show_predictions,predictions_cache,selected_htm))
});
org.numenta.sanity.demos.cortical_io.split_sentences = (function org$numenta$sanity$demos$cortical_io$split_sentences(text){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__67090_SHARP_){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(p1__67090_SHARP_,".");
}),cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__67089_SHARP_){
return clojure.string.split.cljs$core$IFn$_invoke$arity$2(p1__67089_SHARP_,/[^\w']+/);
}),clojure.string.split.cljs$core$IFn$_invoke$arity$2(clojure.string.trim(text),/[^\w]*[\.\!\?]+[^\w]*/)));
});
/**
 * An input sequence consisting of words from the given text, with
 * periods separating sentences also included as distinct words. Each
 * sequence element has the form `{:word _, :index [i j]}`, where i is
 * the sentence index and j is the word index into sentence j.
 */
org.numenta.sanity.demos.cortical_io.word_item_seq = (function org$numenta$sanity$demos$cortical_io$word_item_seq(n_repeats,text){
var iter__5454__auto__ = (function org$numenta$sanity$demos$cortical_io$word_item_seq_$_iter__67128(s__67129){
return (new cljs.core.LazySeq(null,(function (){
var s__67129__$1 = s__67129;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__67129__$1);
if(temp__4653__auto__){
var xs__5201__auto__ = temp__4653__auto__;
var vec__67151 = cljs.core.first(xs__5201__auto__);
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67151,(0),null);
var sen = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67151,(1),null);
var iterys__5450__auto__ = ((function (s__67129__$1,vec__67151,i,sen,xs__5201__auto__,temp__4653__auto__){
return (function org$numenta$sanity$demos$cortical_io$word_item_seq_$_iter__67128_$_iter__67130(s__67131){
return (new cljs.core.LazySeq(null,((function (s__67129__$1,vec__67151,i,sen,xs__5201__auto__,temp__4653__auto__){
return (function (){
var s__67131__$1 = s__67131;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__67131__$1);
if(temp__4653__auto____$1){
var xs__5201__auto____$1 = temp__4653__auto____$1;
var rep = cljs.core.first(xs__5201__auto____$1);
var iterys__5450__auto__ = ((function (s__67131__$1,s__67129__$1,rep,xs__5201__auto____$1,temp__4653__auto____$1,vec__67151,i,sen,xs__5201__auto__,temp__4653__auto__){
return (function org$numenta$sanity$demos$cortical_io$word_item_seq_$_iter__67128_$_iter__67130_$_iter__67132(s__67133){
return (new cljs.core.LazySeq(null,((function (s__67131__$1,s__67129__$1,rep,xs__5201__auto____$1,temp__4653__auto____$1,vec__67151,i,sen,xs__5201__auto__,temp__4653__auto__){
return (function (){
var s__67133__$1 = s__67133;
while(true){
var temp__4653__auto____$2 = cljs.core.seq(s__67133__$1);
if(temp__4653__auto____$2){
var s__67133__$2 = temp__4653__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__67133__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__67133__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__67135 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__67134 = (0);
while(true){
if((i__67134 < size__5453__auto__)){
var vec__67163 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__67134);
var j = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67163,(0),null);
var word = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67163,(1),null);
cljs.core.chunk_append(b__67135,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$word,word,cljs.core.cst$kw$index,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [i,j], null)], null));

var G__67165 = (i__67134 + (1));
i__67134 = G__67165;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__67135),org$numenta$sanity$demos$cortical_io$word_item_seq_$_iter__67128_$_iter__67130_$_iter__67132(cljs.core.chunk_rest(s__67133__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__67135),null);
}
} else {
var vec__67164 = cljs.core.first(s__67133__$2);
var j = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67164,(0),null);
var word = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67164,(1),null);
return cljs.core.cons(new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$word,word,cljs.core.cst$kw$index,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [i,j], null)], null),org$numenta$sanity$demos$cortical_io$word_item_seq_$_iter__67128_$_iter__67130_$_iter__67132(cljs.core.rest(s__67133__$2)));
}
} else {
return null;
}
break;
}
});})(s__67131__$1,s__67129__$1,rep,xs__5201__auto____$1,temp__4653__auto____$1,vec__67151,i,sen,xs__5201__auto__,temp__4653__auto__))
,null,null));
});})(s__67131__$1,s__67129__$1,rep,xs__5201__auto____$1,temp__4653__auto____$1,vec__67151,i,sen,xs__5201__auto__,temp__4653__auto__))
;
var fs__5451__auto__ = cljs.core.seq(iterys__5450__auto__(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(cljs.core.vector,sen)));
if(fs__5451__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5451__auto__,org$numenta$sanity$demos$cortical_io$word_item_seq_$_iter__67128_$_iter__67130(cljs.core.rest(s__67131__$1)));
} else {
var G__67166 = cljs.core.rest(s__67131__$1);
s__67131__$1 = G__67166;
continue;
}
} else {
return null;
}
break;
}
});})(s__67129__$1,vec__67151,i,sen,xs__5201__auto__,temp__4653__auto__))
,null,null));
});})(s__67129__$1,vec__67151,i,sen,xs__5201__auto__,temp__4653__auto__))
;
var fs__5451__auto__ = cljs.core.seq(iterys__5450__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1(n_repeats)));
if(fs__5451__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5451__auto__,org$numenta$sanity$demos$cortical_io$word_item_seq_$_iter__67128(cljs.core.rest(s__67129__$1)));
} else {
var G__67167 = cljs.core.rest(s__67129__$1);
s__67129__$1 = G__67167;
continue;
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5454__auto__(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(cljs.core.vector,org.numenta.sanity.demos.cortical_io.split_sentences(text)));
});
/**
 * Kicks off the process to load the fingerprints.
 */
org.numenta.sanity.demos.cortical_io.cio_start_requests_BANG_ = (function org$numenta$sanity$demos$cortical_io$cio_start_requests_BANG_(api_key,text){
var c__36154__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__36154__auto__){
return (function (){
var f__36155__auto__ = (function (){var switch__36040__auto__ = ((function (c__36154__auto__){
return (function (state_67303){
var state_val_67304 = (state_67303[(1)]);
if((state_val_67304 === (7))){
var inst_67263 = (state_67303[(7)]);
var inst_67262 = (state_67303[(8)]);
var inst_67261 = (state_67303[(9)]);
var inst_67264 = (state_67303[(10)]);
var inst_67273 = (state_67303[(2)]);
var inst_67274 = (inst_67264 + (1));
var tmp67305 = inst_67263;
var tmp67306 = inst_67262;
var tmp67307 = inst_67261;
var inst_67261__$1 = tmp67307;
var inst_67262__$1 = tmp67306;
var inst_67263__$1 = tmp67305;
var inst_67264__$1 = inst_67274;
var state_67303__$1 = (function (){var statearr_67308 = state_67303;
(statearr_67308[(7)] = inst_67263__$1);

(statearr_67308[(8)] = inst_67262__$1);

(statearr_67308[(9)] = inst_67261__$1);

(statearr_67308[(10)] = inst_67264__$1);

(statearr_67308[(11)] = inst_67273);

return statearr_67308;
})();
var statearr_67309_67336 = state_67303__$1;
(statearr_67309_67336[(2)] = null);

(statearr_67309_67336[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_67304 === (1))){
var inst_67256 = clojure.string.lower_case(text);
var inst_67257 = org.numenta.sanity.demos.cortical_io.split_sentences(inst_67256);
var inst_67258 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.concat,inst_67257);
var inst_67259 = cljs.core.distinct.cljs$core$IFn$_invoke$arity$1(inst_67258);
var inst_67260 = cljs.core.seq(inst_67259);
var inst_67261 = inst_67260;
var inst_67262 = null;
var inst_67263 = (0);
var inst_67264 = (0);
var state_67303__$1 = (function (){var statearr_67310 = state_67303;
(statearr_67310[(7)] = inst_67263);

(statearr_67310[(8)] = inst_67262);

(statearr_67310[(9)] = inst_67261);

(statearr_67310[(10)] = inst_67264);

return statearr_67310;
})();
var statearr_67311_67337 = state_67303__$1;
(statearr_67311_67337[(2)] = null);

(statearr_67311_67337[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_67304 === (4))){
var inst_67262 = (state_67303[(8)]);
var inst_67264 = (state_67303[(10)]);
var inst_67269 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(inst_67262,inst_67264);
var inst_67270 = cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["requesting fingerprint for:",inst_67269], 0));
var inst_67271 = org.nfrac.comportex.cortical_io.cache_fingerprint_BANG_(api_key,org.numenta.sanity.demos.cortical_io.fingerprint_cache,inst_67269);
var state_67303__$1 = (function (){var statearr_67312 = state_67303;
(statearr_67312[(12)] = inst_67270);

return statearr_67312;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_67303__$1,(7),inst_67271);
} else {
if((state_val_67304 === (13))){
var inst_67294 = (state_67303[(2)]);
var state_67303__$1 = state_67303;
var statearr_67313_67338 = state_67303__$1;
(statearr_67313_67338[(2)] = inst_67294);

(statearr_67313_67338[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_67304 === (6))){
var inst_67299 = (state_67303[(2)]);
var state_67303__$1 = state_67303;
var statearr_67314_67339 = state_67303__$1;
(statearr_67314_67339[(2)] = inst_67299);

(statearr_67314_67339[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_67304 === (3))){
var inst_67301 = (state_67303[(2)]);
var state_67303__$1 = state_67303;
return cljs.core.async.impl.ioc_helpers.return_chan(state_67303__$1,inst_67301);
} else {
if((state_val_67304 === (12))){
var inst_67277 = (state_67303[(13)]);
var inst_67286 = cljs.core.first(inst_67277);
var inst_67287 = cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["requesting fingerprint for:",inst_67286], 0));
var inst_67288 = org.nfrac.comportex.cortical_io.cache_fingerprint_BANG_(api_key,org.numenta.sanity.demos.cortical_io.fingerprint_cache,inst_67286);
var state_67303__$1 = (function (){var statearr_67315 = state_67303;
(statearr_67315[(14)] = inst_67287);

return statearr_67315;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_67303__$1,(14),inst_67288);
} else {
if((state_val_67304 === (2))){
var inst_67263 = (state_67303[(7)]);
var inst_67264 = (state_67303[(10)]);
var inst_67266 = (inst_67264 < inst_67263);
var inst_67267 = inst_67266;
var state_67303__$1 = state_67303;
if(cljs.core.truth_(inst_67267)){
var statearr_67316_67340 = state_67303__$1;
(statearr_67316_67340[(1)] = (4));

} else {
var statearr_67317_67341 = state_67303__$1;
(statearr_67317_67341[(1)] = (5));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_67304 === (11))){
var inst_67277 = (state_67303[(13)]);
var inst_67281 = cljs.core.chunk_first(inst_67277);
var inst_67282 = cljs.core.chunk_rest(inst_67277);
var inst_67283 = cljs.core.count(inst_67281);
var inst_67261 = inst_67282;
var inst_67262 = inst_67281;
var inst_67263 = inst_67283;
var inst_67264 = (0);
var state_67303__$1 = (function (){var statearr_67318 = state_67303;
(statearr_67318[(7)] = inst_67263);

(statearr_67318[(8)] = inst_67262);

(statearr_67318[(9)] = inst_67261);

(statearr_67318[(10)] = inst_67264);

return statearr_67318;
})();
var statearr_67319_67342 = state_67303__$1;
(statearr_67319_67342[(2)] = null);

(statearr_67319_67342[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_67304 === (9))){
var state_67303__$1 = state_67303;
var statearr_67320_67343 = state_67303__$1;
(statearr_67320_67343[(2)] = null);

(statearr_67320_67343[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_67304 === (5))){
var inst_67277 = (state_67303[(13)]);
var inst_67261 = (state_67303[(9)]);
var inst_67277__$1 = cljs.core.seq(inst_67261);
var state_67303__$1 = (function (){var statearr_67321 = state_67303;
(statearr_67321[(13)] = inst_67277__$1);

return statearr_67321;
})();
if(inst_67277__$1){
var statearr_67322_67344 = state_67303__$1;
(statearr_67322_67344[(1)] = (8));

} else {
var statearr_67323_67345 = state_67303__$1;
(statearr_67323_67345[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_67304 === (14))){
var inst_67277 = (state_67303[(13)]);
var inst_67290 = (state_67303[(2)]);
var inst_67291 = cljs.core.next(inst_67277);
var inst_67261 = inst_67291;
var inst_67262 = null;
var inst_67263 = (0);
var inst_67264 = (0);
var state_67303__$1 = (function (){var statearr_67324 = state_67303;
(statearr_67324[(7)] = inst_67263);

(statearr_67324[(8)] = inst_67262);

(statearr_67324[(15)] = inst_67290);

(statearr_67324[(9)] = inst_67261);

(statearr_67324[(10)] = inst_67264);

return statearr_67324;
})();
var statearr_67325_67346 = state_67303__$1;
(statearr_67325_67346[(2)] = null);

(statearr_67325_67346[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_67304 === (10))){
var inst_67297 = (state_67303[(2)]);
var state_67303__$1 = state_67303;
var statearr_67326_67347 = state_67303__$1;
(statearr_67326_67347[(2)] = inst_67297);

(statearr_67326_67347[(1)] = (6));


return cljs.core.cst$kw$recur;
} else {
if((state_val_67304 === (8))){
var inst_67277 = (state_67303[(13)]);
var inst_67279 = cljs.core.chunked_seq_QMARK_(inst_67277);
var state_67303__$1 = state_67303;
if(inst_67279){
var statearr_67327_67348 = state_67303__$1;
(statearr_67327_67348[(1)] = (11));

} else {
var statearr_67328_67349 = state_67303__$1;
(statearr_67328_67349[(1)] = (12));

}

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
}
}
}
}
}
});})(c__36154__auto__))
;
return ((function (switch__36040__auto__,c__36154__auto__){
return (function() {
var org$numenta$sanity$demos$cortical_io$cio_start_requests_BANG__$_state_machine__36041__auto__ = null;
var org$numenta$sanity$demos$cortical_io$cio_start_requests_BANG__$_state_machine__36041__auto____0 = (function (){
var statearr_67332 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_67332[(0)] = org$numenta$sanity$demos$cortical_io$cio_start_requests_BANG__$_state_machine__36041__auto__);

(statearr_67332[(1)] = (1));

return statearr_67332;
});
var org$numenta$sanity$demos$cortical_io$cio_start_requests_BANG__$_state_machine__36041__auto____1 = (function (state_67303){
while(true){
var ret_value__36042__auto__ = (function (){try{while(true){
var result__36043__auto__ = switch__36040__auto__(state_67303);
if(cljs.core.keyword_identical_QMARK_(result__36043__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__36043__auto__;
}
break;
}
}catch (e67333){if((e67333 instanceof Object)){
var ex__36044__auto__ = e67333;
var statearr_67334_67350 = state_67303;
(statearr_67334_67350[(5)] = ex__36044__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_67303);

return cljs.core.cst$kw$recur;
} else {
throw e67333;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__36042__auto__,cljs.core.cst$kw$recur)){
var G__67351 = state_67303;
state_67303 = G__67351;
continue;
} else {
return ret_value__36042__auto__;
}
break;
}
});
org$numenta$sanity$demos$cortical_io$cio_start_requests_BANG__$_state_machine__36041__auto__ = function(state_67303){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$cortical_io$cio_start_requests_BANG__$_state_machine__36041__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$cortical_io$cio_start_requests_BANG__$_state_machine__36041__auto____1.call(this,state_67303);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$cortical_io$cio_start_requests_BANG__$_state_machine__36041__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$cortical_io$cio_start_requests_BANG__$_state_machine__36041__auto____0;
org$numenta$sanity$demos$cortical_io$cio_start_requests_BANG__$_state_machine__36041__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$cortical_io$cio_start_requests_BANG__$_state_machine__36041__auto____1;
return org$numenta$sanity$demos$cortical_io$cio_start_requests_BANG__$_state_machine__36041__auto__;
})()
;})(switch__36040__auto__,c__36154__auto__))
})();
var state__36156__auto__ = (function (){var statearr_67335 = (f__36155__auto__.cljs$core$IFn$_invoke$arity$0 ? f__36155__auto__.cljs$core$IFn$_invoke$arity$0() : f__36155__auto__.call(null));
(statearr_67335[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__36154__auto__);

return statearr_67335;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__36156__auto__);
});})(c__36154__auto__))
);

return c__36154__auto__;
});
org.numenta.sanity.demos.cortical_io.send_text_BANG_ = (function org$numenta$sanity$demos$cortical_io$send_text_BANG_(){
var temp__4653__auto__ = cljs.core.seq(org.numenta.sanity.demos.cortical_io.word_item_seq(cljs.core.cst$kw$repeats.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.cortical_io.config) : cljs.core.deref.call(null,org.numenta.sanity.demos.cortical_io.config))),cljs.core.cst$kw$text.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.cortical_io.config) : cljs.core.deref.call(null,org.numenta.sanity.demos.cortical_io.config)))));
if(temp__4653__auto__){
var xs = temp__4653__auto__;
var c__36154__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__36154__auto__,xs,temp__4653__auto__){
return (function (){
var f__36155__auto__ = (function (){var switch__36040__auto__ = ((function (c__36154__auto__,xs,temp__4653__auto__){
return (function (state_67405){
var state_val_67406 = (state_67405[(1)]);
if((state_val_67406 === (1))){
var inst_67386 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.cortical_io.config) : cljs.core.deref.call(null,org.numenta.sanity.demos.cortical_io.config));
var inst_67387 = cljs.core.cst$kw$encoder.cljs$core$IFn$_invoke$arity$1(inst_67386);
var inst_67388 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$cortical_DASH_io,inst_67387);
var state_67405__$1 = state_67405;
if(inst_67388){
var statearr_67407_67420 = state_67405__$1;
(statearr_67407_67420[(1)] = (2));

} else {
var statearr_67408_67421 = state_67405__$1;
(statearr_67408_67421[(1)] = (3));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_67406 === (2))){
var inst_67390 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.cortical_io.config) : cljs.core.deref.call(null,org.numenta.sanity.demos.cortical_io.config));
var inst_67391 = cljs.core.cst$kw$api_DASH_key.cljs$core$IFn$_invoke$arity$1(inst_67390);
var inst_67392 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.cortical_io.config) : cljs.core.deref.call(null,org.numenta.sanity.demos.cortical_io.config));
var inst_67393 = cljs.core.cst$kw$text.cljs$core$IFn$_invoke$arity$1(inst_67392);
var inst_67394 = org.numenta.sanity.demos.cortical_io.cio_start_requests_BANG_(inst_67391,inst_67393);
var inst_67395 = cljs.core.async.timeout((2500));
var state_67405__$1 = (function (){var statearr_67409 = state_67405;
(statearr_67409[(7)] = inst_67394);

return statearr_67409;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_67405__$1,(5),inst_67395);
} else {
if((state_val_67406 === (3))){
var state_67405__$1 = state_67405;
var statearr_67410_67422 = state_67405__$1;
(statearr_67410_67422[(2)] = null);

(statearr_67410_67422[(1)] = (4));


return cljs.core.cst$kw$recur;
} else {
if((state_val_67406 === (4))){
var inst_67400 = (state_67405[(2)]);
var inst_67401 = cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3(org.numenta.sanity.demos.cortical_io.world_c,xs,false);
var inst_67402 = cljs.core.count(org.numenta.sanity.demos.cortical_io.world_buffer);
var inst_67403 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.demos.cortical_io.config,cljs.core.assoc,cljs.core.cst$kw$world_DASH_buffer_DASH_count,inst_67402);
var state_67405__$1 = (function (){var statearr_67411 = state_67405;
(statearr_67411[(8)] = inst_67400);

(statearr_67411[(9)] = inst_67401);

return statearr_67411;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_67405__$1,inst_67403);
} else {
if((state_val_67406 === (5))){
var inst_67397 = (state_67405[(2)]);
var state_67405__$1 = state_67405;
var statearr_67412_67423 = state_67405__$1;
(statearr_67412_67423[(2)] = inst_67397);

(statearr_67412_67423[(1)] = (4));


return cljs.core.cst$kw$recur;
} else {
return null;
}
}
}
}
}
});})(c__36154__auto__,xs,temp__4653__auto__))
;
return ((function (switch__36040__auto__,c__36154__auto__,xs,temp__4653__auto__){
return (function() {
var org$numenta$sanity$demos$cortical_io$send_text_BANG__$_state_machine__36041__auto__ = null;
var org$numenta$sanity$demos$cortical_io$send_text_BANG__$_state_machine__36041__auto____0 = (function (){
var statearr_67416 = [null,null,null,null,null,null,null,null,null,null];
(statearr_67416[(0)] = org$numenta$sanity$demos$cortical_io$send_text_BANG__$_state_machine__36041__auto__);

(statearr_67416[(1)] = (1));

return statearr_67416;
});
var org$numenta$sanity$demos$cortical_io$send_text_BANG__$_state_machine__36041__auto____1 = (function (state_67405){
while(true){
var ret_value__36042__auto__ = (function (){try{while(true){
var result__36043__auto__ = switch__36040__auto__(state_67405);
if(cljs.core.keyword_identical_QMARK_(result__36043__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__36043__auto__;
}
break;
}
}catch (e67417){if((e67417 instanceof Object)){
var ex__36044__auto__ = e67417;
var statearr_67418_67424 = state_67405;
(statearr_67418_67424[(5)] = ex__36044__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_67405);

return cljs.core.cst$kw$recur;
} else {
throw e67417;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__36042__auto__,cljs.core.cst$kw$recur)){
var G__67425 = state_67405;
state_67405 = G__67425;
continue;
} else {
return ret_value__36042__auto__;
}
break;
}
});
org$numenta$sanity$demos$cortical_io$send_text_BANG__$_state_machine__36041__auto__ = function(state_67405){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$cortical_io$send_text_BANG__$_state_machine__36041__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$cortical_io$send_text_BANG__$_state_machine__36041__auto____1.call(this,state_67405);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$cortical_io$send_text_BANG__$_state_machine__36041__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$cortical_io$send_text_BANG__$_state_machine__36041__auto____0;
org$numenta$sanity$demos$cortical_io$send_text_BANG__$_state_machine__36041__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$cortical_io$send_text_BANG__$_state_machine__36041__auto____1;
return org$numenta$sanity$demos$cortical_io$send_text_BANG__$_state_machine__36041__auto__;
})()
;})(switch__36040__auto__,c__36154__auto__,xs,temp__4653__auto__))
})();
var state__36156__auto__ = (function (){var statearr_67419 = (f__36155__auto__.cljs$core$IFn$_invoke$arity$0 ? f__36155__auto__.cljs$core$IFn$_invoke$arity$0() : f__36155__auto__.call(null));
(statearr_67419[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__36154__auto__);

return statearr_67419;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__36156__auto__);
});})(c__36154__auto__,xs,temp__4653__auto__))
);

return c__36154__auto__;
} else {
return null;
}
});
org.numenta.sanity.demos.cortical_io.set_model_BANG_ = (function org$numenta$sanity$demos$cortical_io$set_model_BANG_(){
return org.numenta.sanity.helpers.with_ui_loading_message((function (){
var n_regions = cljs.core.cst$kw$n_DASH_regions.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.cortical_io.config) : cljs.core.deref.call(null,org.numenta.sanity.demos.cortical_io.config)));
var spec = (function (){var G__67432 = (((cljs.core.cst$kw$spec_DASH_choice.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.cortical_io.config) : cljs.core.deref.call(null,org.numenta.sanity.demos.cortical_io.config))) instanceof cljs.core.Keyword))?cljs.core.cst$kw$spec_DASH_choice.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.cortical_io.config) : cljs.core.deref.call(null,org.numenta.sanity.demos.cortical_io.config))).fqn:null);
switch (G__67432) {
case "a":
return org.numenta.sanity.demos.cortical_io.spec_global;

break;
case "b":
return org.numenta.sanity.demos.cortical_io.spec_local;

break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(cljs.core.cst$kw$spec_DASH_choice.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.cortical_io.config) : cljs.core.deref.call(null,org.numenta.sanity.demos.cortical_io.config))))].join('')));

}
})();
var e = (function (){var G__67433 = (((cljs.core.cst$kw$encoder.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.cortical_io.config) : cljs.core.deref.call(null,org.numenta.sanity.demos.cortical_io.config))) instanceof cljs.core.Keyword))?cljs.core.cst$kw$encoder.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.cortical_io.config) : cljs.core.deref.call(null,org.numenta.sanity.demos.cortical_io.config))).fqn:null);
switch (G__67433) {
case "cortical-io":
return org.nfrac.comportex.cortical_io.cortical_io_encoder.cljs$core$IFn$_invoke$arity$variadic(cljs.core.cst$kw$api_DASH_key.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.cortical_io.config) : cljs.core.deref.call(null,org.numenta.sanity.demos.cortical_io.config))),org.numenta.sanity.demos.cortical_io.fingerprint_cache,cljs.core.array_seq([cljs.core.cst$kw$decode_DASH_locally_QMARK_,cljs.core.cst$kw$decode_DASH_locally_QMARK_.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.cortical_io.config) : cljs.core.deref.call(null,org.numenta.sanity.demos.cortical_io.config))),cljs.core.cst$kw$spatial_DASH_scramble_QMARK_,cljs.core.cst$kw$spatial_DASH_scramble_QMARK_.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.cortical_io.config) : cljs.core.deref.call(null,org.numenta.sanity.demos.cortical_io.config)))], 0));

break;
case "random":
return org.nfrac.comportex.encoders.unique_encoder(org.nfrac.comportex.cortical_io.retina_dim,cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core._STAR_,0.02,org.nfrac.comportex.cortical_io.retina_dim));

break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(cljs.core.cst$kw$encoder.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.cortical_io.config) : cljs.core.deref.call(null,org.numenta.sanity.demos.cortical_io.config))))].join('')));

}
})();
var sensor = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$word,e], null);
var init_QMARK_ = ((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.cortical_io.model) : cljs.core.deref.call(null,org.numenta.sanity.demos.cortical_io.model)) == null);
var G__67434_67440 = org.numenta.sanity.demos.cortical_io.model;
var G__67435_67441 = org.nfrac.comportex.core.regions_in_series.cljs$core$IFn$_invoke$arity$4(n_regions,org.nfrac.comportex.core.sensory_region,cljs.core.list_STAR_.cljs$core$IFn$_invoke$arity$2(spec,cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([spec,org.numenta.sanity.demos.cortical_io.higher_level_spec_diff], 0)))),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$input,sensor], null));
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__67434_67440,G__67435_67441) : cljs.core.reset_BANG_.call(null,G__67434_67440,G__67435_67441));

if(init_QMARK_){
org.numenta.sanity.bridge.browser.init.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.demos.cortical_io.model,org.numenta.sanity.demos.cortical_io.world_c,org.numenta.sanity.main.into_journal,org.numenta.sanity.demos.cortical_io.into_sim);
} else {
var G__67436_67442 = org.numenta.sanity.main.step_template;
var G__67437_67443 = org.numenta.sanity.comportex.data.step_template_data((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.cortical_io.model) : cljs.core.deref.call(null,org.numenta.sanity.demos.cortical_io.model)));
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__67436_67442,G__67437_67443) : cljs.core.reset_BANG_.call(null,G__67436_67442,G__67437_67443));
}

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.demos.cortical_io.config,cljs.core.assoc,cljs.core.cst$kw$have_DASH_model_QMARK_,true);
}));
});
org.numenta.sanity.demos.cortical_io.config_template = new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h3,"Input ",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,"Word sequences"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_info,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$field,cljs.core.cst$kw$label,cljs.core.cst$kw$id,cljs.core.cst$kw$world_DASH_buffer_DASH_count,cljs.core.cst$kw$postamble," queued input values."], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_info,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$field,cljs.core.cst$kw$label,cljs.core.cst$kw$id,cljs.core.cst$kw$cache_DASH_count,cljs.core.cst$kw$postamble," cached word fingerprints."], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_horizontal,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label$col_DASH_sm_DASH_5,"Repeats of each sentence:"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_7,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input$form_DASH_control,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$field,cljs.core.cst$kw$numeric,cljs.core.cst$kw$id,cljs.core.cst$kw$repeats], null)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_12,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$textarea$form_DASH_control,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$field,cljs.core.cst$kw$textarea,cljs.core.cst$kw$id,cljs.core.cst$kw$text,cljs.core.cst$kw$rows,(10)], null)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_8,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$field,cljs.core.cst$kw$container,cljs.core.cst$kw$visible_QMARK_,(function (p1__67444_SHARP_){
return cljs.core.cst$kw$have_DASH_model_QMARK_.cljs$core$IFn$_invoke$arity$1(p1__67444_SHARP_);
})], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_primary,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$on_DASH_click,(function (e){
org.numenta.sanity.demos.cortical_io.send_text_BANG_();

return e.preventDefault();
})], null),"Send text block input"], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$field,cljs.core.cst$kw$container,cljs.core.cst$kw$visible_QMARK_,(function (p1__67445_SHARP_){
return cljs.core.not(cljs.core.cst$kw$have_DASH_model_QMARK_.cljs$core$IFn$_invoke$arity$1(p1__67445_SHARP_));
})], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_primary$disabled,"Send text block input"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_info,"Create a model first (below)."], null)], null)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h3,"HTM model"], null),new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_horizontal,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label$col_DASH_sm_DASH_5,"Word encoder:"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_7,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$select$form_DASH_control,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$field,cljs.core.cst$kw$list,cljs.core.cst$kw$id,cljs.core.cst$kw$encoder], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$option,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,cljs.core.cst$kw$cortical_DASH_io], null),"cortical.io"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$option,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,cljs.core.cst$kw$random], null),"random"], null)], null)], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$field,cljs.core.cst$kw$container,cljs.core.cst$kw$visible_QMARK_,(function (p1__67446_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$cortical_DASH_io,cljs.core.cst$kw$encoder.cljs$core$IFn$_invoke$arity$1(p1__67446_SHARP_));
})], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label$col_DASH_sm_DASH_5,"Cortical.io API key:"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_7,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input$form_DASH_control,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$field,cljs.core.cst$kw$text,cljs.core.cst$kw$id,cljs.core.cst$kw$api_DASH_key], null)], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label$col_DASH_sm_DASH_5,"Decode locally?"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_7,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input$form_DASH_control,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$field,cljs.core.cst$kw$checkbox,cljs.core.cst$kw$id,cljs.core.cst$kw$decode_DASH_locally_QMARK_], null)], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label$col_DASH_sm_DASH_5,"Spatial scramble?"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_7,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input$form_DASH_control,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$field,cljs.core.cst$kw$checkbox,cljs.core.cst$kw$id,cljs.core.cst$kw$spatial_DASH_scramble_QMARK_], null)], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label$col_DASH_sm_DASH_5,"Starting parameter set:"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_7,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$select$form_DASH_control,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$field,cljs.core.cst$kw$list,cljs.core.cst$kw$id,cljs.core.cst$kw$spec_DASH_choice], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$option,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,cljs.core.cst$kw$a], null),"20% potential, no topology"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$option,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,cljs.core.cst$kw$b], null),"30% * local 16% area = 5% potential"], null)], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label$col_DASH_sm_DASH_5,"Number of regions:"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_7,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input$form_DASH_control,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$field,cljs.core.cst$kw$numeric,cljs.core.cst$kw$id,cljs.core.cst$kw$n_DASH_regions], null)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_offset_DASH_5$col_DASH_sm_DASH_7,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_primary,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$on_DASH_click,(function (e){
org.numenta.sanity.demos.cortical_io.set_model_BANG_();

return e.preventDefault();
})], null),"Restart with new model"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_danger,"This resets all parameters."], null)], null)], null)], null)], null);
org.numenta.sanity.demos.cortical_io.model_tab = (function org$numenta$sanity$demos$cortical_io$model_tab(){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"This demo looks up the ",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$a,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$href,"http://cortical.io/"], null),"cortical.io"], null)," fingerprint for each word. Enter your API key below to start. The\n     pre-loaded text below is the famous ",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$a,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$href,"https://github.com/numenta/nupic.nlp-examples/blob/master/resources/associations/foxeat.csv"], null),"'fox eats what?' example"], null)," but you can enter whatever text you like. Words that are not\n      found in the cortical.io 'associative_en' retina are assigned a\n      random SDR."], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_forms.core.bind_fields,org.numenta.sanity.demos.cortical_io.config_template,org.numenta.sanity.demos.cortical_io.config], null)], null);
});
org.numenta.sanity.demos.cortical_io.init = (function org$numenta$sanity$demos$cortical_io$init(){
reagent.core.render.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.main.sanity_app,"Comportex",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.cortical_io.model_tab], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.cortical_io.world_pane], null),org.numenta.sanity.demos.comportex_common.all_features,org.numenta.sanity.demos.cortical_io.into_sim], null),goog.dom.getElement("sanity-app"));

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.main.viz_options,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$drawing,cljs.core.cst$kw$display_DASH_mode], null),cljs.core.cst$kw$two_DASH_d);

return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.demos.cortical_io.into_sim,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["run"], null));
});
goog.exportSymbol('org.numenta.sanity.demos.cortical_io.init', org.numenta.sanity.demos.cortical_io.init);
