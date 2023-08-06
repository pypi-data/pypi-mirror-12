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
org.numenta.sanity.demos.cortical_io.world_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.demos.cortical_io.world_buffer,cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.map.cljs$core$IFn$_invoke$arity$1(org.nfrac.comportex.util.keep_history_middleware((100),cljs.core.cst$kw$word,cljs.core.cst$kw$history)),cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (p1__67262_SHARP_){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__67262_SHARP_,cljs.core.cst$kw$label,cljs.core.cst$kw$word.cljs$core$IFn$_invoke$arity$1(p1__67262_SHARP_));
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
var vec__67277 = cljs.core.first(cljs.core.vals(cljs.core.cst$kw$sensors.cljs$core$IFn$_invoke$arity$1(htm)));
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67277,(0),null);
var e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67277,(1),null);
var rgn = cljs.core.first(org.nfrac.comportex.core.region_seq(htm));
var pr_votes = org.nfrac.comportex.core.predicted_bit_votes(rgn);
var predictions = org.nfrac.comportex.protocols.decode(e,pr_votes,n_predictions);
var temp__4651__auto__ = cljs.core.cst$kw$channel.cljs$core$IFn$_invoke$arity$1(predictions);
if(cljs.core.truth_(temp__4651__auto__)){
var c = temp__4651__auto__;
var c__35961__auto___67291 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__35961__auto___67291,c,temp__4651__auto__,vec__67277,_,e,rgn,pr_votes,predictions){
return (function (){
var f__35962__auto__ = (function (){var switch__35847__auto__ = ((function (c__35961__auto___67291,c,temp__4651__auto__,vec__67277,_,e,rgn,pr_votes,predictions){
return (function (state_67282){
var state_val_67283 = (state_67282[(1)]);
if((state_val_67283 === (1))){
var state_67282__$1 = state_67282;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_67282__$1,(2),c);
} else {
if((state_val_67283 === (2))){
var inst_67279 = (state_67282[(2)]);
var inst_67280 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(predictions_cache,cljs.core.assoc,htm,inst_67279);
var state_67282__$1 = state_67282;
return cljs.core.async.impl.ioc_helpers.return_chan(state_67282__$1,inst_67280);
} else {
return null;
}
}
});})(c__35961__auto___67291,c,temp__4651__auto__,vec__67277,_,e,rgn,pr_votes,predictions))
;
return ((function (switch__35847__auto__,c__35961__auto___67291,c,temp__4651__auto__,vec__67277,_,e,rgn,pr_votes,predictions){
return (function() {
var org$numenta$sanity$demos$cortical_io$load_predictions_$_state_machine__35848__auto__ = null;
var org$numenta$sanity$demos$cortical_io$load_predictions_$_state_machine__35848__auto____0 = (function (){
var statearr_67287 = [null,null,null,null,null,null,null];
(statearr_67287[(0)] = org$numenta$sanity$demos$cortical_io$load_predictions_$_state_machine__35848__auto__);

(statearr_67287[(1)] = (1));

return statearr_67287;
});
var org$numenta$sanity$demos$cortical_io$load_predictions_$_state_machine__35848__auto____1 = (function (state_67282){
while(true){
var ret_value__35849__auto__ = (function (){try{while(true){
var result__35850__auto__ = switch__35847__auto__(state_67282);
if(cljs.core.keyword_identical_QMARK_(result__35850__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__35850__auto__;
}
break;
}
}catch (e67288){if((e67288 instanceof Object)){
var ex__35851__auto__ = e67288;
var statearr_67289_67292 = state_67282;
(statearr_67289_67292[(5)] = ex__35851__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_67282);

return cljs.core.cst$kw$recur;
} else {
throw e67288;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35849__auto__,cljs.core.cst$kw$recur)){
var G__67293 = state_67282;
state_67282 = G__67293;
continue;
} else {
return ret_value__35849__auto__;
}
break;
}
});
org$numenta$sanity$demos$cortical_io$load_predictions_$_state_machine__35848__auto__ = function(state_67282){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$cortical_io$load_predictions_$_state_machine__35848__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$cortical_io$load_predictions_$_state_machine__35848__auto____1.call(this,state_67282);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$cortical_io$load_predictions_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$cortical_io$load_predictions_$_state_machine__35848__auto____0;
org$numenta$sanity$demos$cortical_io$load_predictions_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$cortical_io$load_predictions_$_state_machine__35848__auto____1;
return org$numenta$sanity$demos$cortical_io$load_predictions_$_state_machine__35848__auto__;
})()
;})(switch__35847__auto__,c__35961__auto___67291,c,temp__4651__auto__,vec__67277,_,e,rgn,pr_votes,predictions))
})();
var state__35963__auto__ = (function (){var statearr_67290 = (f__35962__auto__.cljs$core$IFn$_invoke$arity$0 ? f__35962__auto__.cljs$core$IFn$_invoke$arity$0() : f__35962__auto__.call(null));
(statearr_67290[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__35961__auto___67291);

return statearr_67290;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__35963__auto__);
});})(c__35961__auto___67291,c,temp__4651__auto__,vec__67277,_,e,rgn,pr_votes,predictions))
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
return (function (_,___$1,___$2,p__67309){
var vec__67310 = p__67309;
var sel = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67310,(0),null);
var temp__4653__auto__ = cljs.core.cst$kw$model_DASH_id.cljs$core$IFn$_invoke$arity$1(sel);
if(cljs.core.truth_(temp__4653__auto__)){
var model_id = temp__4653__auto__;
var out_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.into_journal,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["get-model",model_id,org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$1(out_c)], null));

var c__35961__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__35961__auto__,out_c,model_id,temp__4653__auto__,vec__67310,sel,show_predictions,predictions_cache,selected_htm){
return (function (){
var f__35962__auto__ = (function (){var switch__35847__auto__ = ((function (c__35961__auto__,out_c,model_id,temp__4653__auto__,vec__67310,sel,show_predictions,predictions_cache,selected_htm){
return (function (state_67315){
var state_val_67316 = (state_67315[(1)]);
if((state_val_67316 === (1))){
var state_67315__$1 = state_67315;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_67315__$1,(2),out_c);
} else {
if((state_val_67316 === (2))){
var inst_67312 = (state_67315[(2)]);
var inst_67313 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(selected_htm,inst_67312) : cljs.core.reset_BANG_.call(null,selected_htm,inst_67312));
var state_67315__$1 = state_67315;
return cljs.core.async.impl.ioc_helpers.return_chan(state_67315__$1,inst_67313);
} else {
return null;
}
}
});})(c__35961__auto__,out_c,model_id,temp__4653__auto__,vec__67310,sel,show_predictions,predictions_cache,selected_htm))
;
return ((function (switch__35847__auto__,c__35961__auto__,out_c,model_id,temp__4653__auto__,vec__67310,sel,show_predictions,predictions_cache,selected_htm){
return (function() {
var org$numenta$sanity$demos$cortical_io$world_pane_$_state_machine__35848__auto__ = null;
var org$numenta$sanity$demos$cortical_io$world_pane_$_state_machine__35848__auto____0 = (function (){
var statearr_67320 = [null,null,null,null,null,null,null];
(statearr_67320[(0)] = org$numenta$sanity$demos$cortical_io$world_pane_$_state_machine__35848__auto__);

(statearr_67320[(1)] = (1));

return statearr_67320;
});
var org$numenta$sanity$demos$cortical_io$world_pane_$_state_machine__35848__auto____1 = (function (state_67315){
while(true){
var ret_value__35849__auto__ = (function (){try{while(true){
var result__35850__auto__ = switch__35847__auto__(state_67315);
if(cljs.core.keyword_identical_QMARK_(result__35850__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__35850__auto__;
}
break;
}
}catch (e67321){if((e67321 instanceof Object)){
var ex__35851__auto__ = e67321;
var statearr_67322_67324 = state_67315;
(statearr_67322_67324[(5)] = ex__35851__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_67315);

return cljs.core.cst$kw$recur;
} else {
throw e67321;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35849__auto__,cljs.core.cst$kw$recur)){
var G__67325 = state_67315;
state_67315 = G__67325;
continue;
} else {
return ret_value__35849__auto__;
}
break;
}
});
org$numenta$sanity$demos$cortical_io$world_pane_$_state_machine__35848__auto__ = function(state_67315){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$cortical_io$world_pane_$_state_machine__35848__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$cortical_io$world_pane_$_state_machine__35848__auto____1.call(this,state_67315);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$cortical_io$world_pane_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$cortical_io$world_pane_$_state_machine__35848__auto____0;
org$numenta$sanity$demos$cortical_io$world_pane_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$cortical_io$world_pane_$_state_machine__35848__auto____1;
return org$numenta$sanity$demos$cortical_io$world_pane_$_state_machine__35848__auto__;
})()
;})(switch__35847__auto__,c__35961__auto__,out_c,model_id,temp__4653__auto__,vec__67310,sel,show_predictions,predictions_cache,selected_htm))
})();
var state__35963__auto__ = (function (){var statearr_67323 = (f__35962__auto__.cljs$core$IFn$_invoke$arity$0 ? f__35962__auto__.cljs$core$IFn$_invoke$arity$0() : f__35962__auto__.call(null));
(statearr_67323[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__35961__auto__);

return statearr_67323;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__35963__auto__);
});})(c__35961__auto__,out_c,model_id,temp__4653__auto__,vec__67310,sel,show_predictions,predictions_cache,selected_htm))
);

return c__35961__auto__;
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
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__67327_SHARP_){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(p1__67327_SHARP_,".");
}),cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__67326_SHARP_){
return clojure.string.split.cljs$core$IFn$_invoke$arity$2(p1__67326_SHARP_,/[^\w']+/);
}),clojure.string.split.cljs$core$IFn$_invoke$arity$2(clojure.string.trim(text),/[^\w]*[\.\!\?]+[^\w]*/)));
});
/**
 * An input sequence consisting of words from the given text, with
 * periods separating sentences also included as distinct words. Each
 * sequence element has the form `{:word _, :index [i j]}`, where i is
 * the sentence index and j is the word index into sentence j.
 */
org.numenta.sanity.demos.cortical_io.word_item_seq = (function org$numenta$sanity$demos$cortical_io$word_item_seq(n_repeats,text){
var iter__5454__auto__ = (function org$numenta$sanity$demos$cortical_io$word_item_seq_$_iter__67365(s__67366){
return (new cljs.core.LazySeq(null,(function (){
var s__67366__$1 = s__67366;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__67366__$1);
if(temp__4653__auto__){
var xs__5201__auto__ = temp__4653__auto__;
var vec__67388 = cljs.core.first(xs__5201__auto__);
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67388,(0),null);
var sen = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67388,(1),null);
var iterys__5450__auto__ = ((function (s__67366__$1,vec__67388,i,sen,xs__5201__auto__,temp__4653__auto__){
return (function org$numenta$sanity$demos$cortical_io$word_item_seq_$_iter__67365_$_iter__67367(s__67368){
return (new cljs.core.LazySeq(null,((function (s__67366__$1,vec__67388,i,sen,xs__5201__auto__,temp__4653__auto__){
return (function (){
var s__67368__$1 = s__67368;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__67368__$1);
if(temp__4653__auto____$1){
var xs__5201__auto____$1 = temp__4653__auto____$1;
var rep = cljs.core.first(xs__5201__auto____$1);
var iterys__5450__auto__ = ((function (s__67368__$1,s__67366__$1,rep,xs__5201__auto____$1,temp__4653__auto____$1,vec__67388,i,sen,xs__5201__auto__,temp__4653__auto__){
return (function org$numenta$sanity$demos$cortical_io$word_item_seq_$_iter__67365_$_iter__67367_$_iter__67369(s__67370){
return (new cljs.core.LazySeq(null,((function (s__67368__$1,s__67366__$1,rep,xs__5201__auto____$1,temp__4653__auto____$1,vec__67388,i,sen,xs__5201__auto__,temp__4653__auto__){
return (function (){
var s__67370__$1 = s__67370;
while(true){
var temp__4653__auto____$2 = cljs.core.seq(s__67370__$1);
if(temp__4653__auto____$2){
var s__67370__$2 = temp__4653__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__67370__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__67370__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__67372 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__67371 = (0);
while(true){
if((i__67371 < size__5453__auto__)){
var vec__67400 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__67371);
var j = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67400,(0),null);
var word = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67400,(1),null);
cljs.core.chunk_append(b__67372,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$word,word,cljs.core.cst$kw$index,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [i,j], null)], null));

var G__67402 = (i__67371 + (1));
i__67371 = G__67402;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__67372),org$numenta$sanity$demos$cortical_io$word_item_seq_$_iter__67365_$_iter__67367_$_iter__67369(cljs.core.chunk_rest(s__67370__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__67372),null);
}
} else {
var vec__67401 = cljs.core.first(s__67370__$2);
var j = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67401,(0),null);
var word = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67401,(1),null);
return cljs.core.cons(new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$word,word,cljs.core.cst$kw$index,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [i,j], null)], null),org$numenta$sanity$demos$cortical_io$word_item_seq_$_iter__67365_$_iter__67367_$_iter__67369(cljs.core.rest(s__67370__$2)));
}
} else {
return null;
}
break;
}
});})(s__67368__$1,s__67366__$1,rep,xs__5201__auto____$1,temp__4653__auto____$1,vec__67388,i,sen,xs__5201__auto__,temp__4653__auto__))
,null,null));
});})(s__67368__$1,s__67366__$1,rep,xs__5201__auto____$1,temp__4653__auto____$1,vec__67388,i,sen,xs__5201__auto__,temp__4653__auto__))
;
var fs__5451__auto__ = cljs.core.seq(iterys__5450__auto__(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(cljs.core.vector,sen)));
if(fs__5451__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5451__auto__,org$numenta$sanity$demos$cortical_io$word_item_seq_$_iter__67365_$_iter__67367(cljs.core.rest(s__67368__$1)));
} else {
var G__67403 = cljs.core.rest(s__67368__$1);
s__67368__$1 = G__67403;
continue;
}
} else {
return null;
}
break;
}
});})(s__67366__$1,vec__67388,i,sen,xs__5201__auto__,temp__4653__auto__))
,null,null));
});})(s__67366__$1,vec__67388,i,sen,xs__5201__auto__,temp__4653__auto__))
;
var fs__5451__auto__ = cljs.core.seq(iterys__5450__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1(n_repeats)));
if(fs__5451__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5451__auto__,org$numenta$sanity$demos$cortical_io$word_item_seq_$_iter__67365(cljs.core.rest(s__67366__$1)));
} else {
var G__67404 = cljs.core.rest(s__67366__$1);
s__67366__$1 = G__67404;
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
var c__35961__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__35961__auto__){
return (function (){
var f__35962__auto__ = (function (){var switch__35847__auto__ = ((function (c__35961__auto__){
return (function (state_67540){
var state_val_67541 = (state_67540[(1)]);
if((state_val_67541 === (7))){
var inst_67501 = (state_67540[(7)]);
var inst_67498 = (state_67540[(8)]);
var inst_67499 = (state_67540[(9)]);
var inst_67500 = (state_67540[(10)]);
var inst_67510 = (state_67540[(2)]);
var inst_67511 = (inst_67501 + (1));
var tmp67542 = inst_67498;
var tmp67543 = inst_67499;
var tmp67544 = inst_67500;
var inst_67498__$1 = tmp67542;
var inst_67499__$1 = tmp67543;
var inst_67500__$1 = tmp67544;
var inst_67501__$1 = inst_67511;
var state_67540__$1 = (function (){var statearr_67545 = state_67540;
(statearr_67545[(7)] = inst_67501__$1);

(statearr_67545[(8)] = inst_67498__$1);

(statearr_67545[(9)] = inst_67499__$1);

(statearr_67545[(11)] = inst_67510);

(statearr_67545[(10)] = inst_67500__$1);

return statearr_67545;
})();
var statearr_67546_67573 = state_67540__$1;
(statearr_67546_67573[(2)] = null);

(statearr_67546_67573[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_67541 === (1))){
var inst_67493 = clojure.string.lower_case(text);
var inst_67494 = org.numenta.sanity.demos.cortical_io.split_sentences(inst_67493);
var inst_67495 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.concat,inst_67494);
var inst_67496 = cljs.core.distinct.cljs$core$IFn$_invoke$arity$1(inst_67495);
var inst_67497 = cljs.core.seq(inst_67496);
var inst_67498 = inst_67497;
var inst_67499 = null;
var inst_67500 = (0);
var inst_67501 = (0);
var state_67540__$1 = (function (){var statearr_67547 = state_67540;
(statearr_67547[(7)] = inst_67501);

(statearr_67547[(8)] = inst_67498);

(statearr_67547[(9)] = inst_67499);

(statearr_67547[(10)] = inst_67500);

return statearr_67547;
})();
var statearr_67548_67574 = state_67540__$1;
(statearr_67548_67574[(2)] = null);

(statearr_67548_67574[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_67541 === (4))){
var inst_67501 = (state_67540[(7)]);
var inst_67499 = (state_67540[(9)]);
var inst_67506 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(inst_67499,inst_67501);
var inst_67507 = cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["requesting fingerprint for:",inst_67506], 0));
var inst_67508 = org.nfrac.comportex.cortical_io.cache_fingerprint_BANG_(api_key,org.numenta.sanity.demos.cortical_io.fingerprint_cache,inst_67506);
var state_67540__$1 = (function (){var statearr_67549 = state_67540;
(statearr_67549[(12)] = inst_67507);

return statearr_67549;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_67540__$1,(7),inst_67508);
} else {
if((state_val_67541 === (13))){
var inst_67531 = (state_67540[(2)]);
var state_67540__$1 = state_67540;
var statearr_67550_67575 = state_67540__$1;
(statearr_67550_67575[(2)] = inst_67531);

(statearr_67550_67575[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_67541 === (6))){
var inst_67536 = (state_67540[(2)]);
var state_67540__$1 = state_67540;
var statearr_67551_67576 = state_67540__$1;
(statearr_67551_67576[(2)] = inst_67536);

(statearr_67551_67576[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_67541 === (3))){
var inst_67538 = (state_67540[(2)]);
var state_67540__$1 = state_67540;
return cljs.core.async.impl.ioc_helpers.return_chan(state_67540__$1,inst_67538);
} else {
if((state_val_67541 === (12))){
var inst_67514 = (state_67540[(13)]);
var inst_67523 = cljs.core.first(inst_67514);
var inst_67524 = cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["requesting fingerprint for:",inst_67523], 0));
var inst_67525 = org.nfrac.comportex.cortical_io.cache_fingerprint_BANG_(api_key,org.numenta.sanity.demos.cortical_io.fingerprint_cache,inst_67523);
var state_67540__$1 = (function (){var statearr_67552 = state_67540;
(statearr_67552[(14)] = inst_67524);

return statearr_67552;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_67540__$1,(14),inst_67525);
} else {
if((state_val_67541 === (2))){
var inst_67501 = (state_67540[(7)]);
var inst_67500 = (state_67540[(10)]);
var inst_67503 = (inst_67501 < inst_67500);
var inst_67504 = inst_67503;
var state_67540__$1 = state_67540;
if(cljs.core.truth_(inst_67504)){
var statearr_67553_67577 = state_67540__$1;
(statearr_67553_67577[(1)] = (4));

} else {
var statearr_67554_67578 = state_67540__$1;
(statearr_67554_67578[(1)] = (5));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_67541 === (11))){
var inst_67514 = (state_67540[(13)]);
var inst_67518 = cljs.core.chunk_first(inst_67514);
var inst_67519 = cljs.core.chunk_rest(inst_67514);
var inst_67520 = cljs.core.count(inst_67518);
var inst_67498 = inst_67519;
var inst_67499 = inst_67518;
var inst_67500 = inst_67520;
var inst_67501 = (0);
var state_67540__$1 = (function (){var statearr_67555 = state_67540;
(statearr_67555[(7)] = inst_67501);

(statearr_67555[(8)] = inst_67498);

(statearr_67555[(9)] = inst_67499);

(statearr_67555[(10)] = inst_67500);

return statearr_67555;
})();
var statearr_67556_67579 = state_67540__$1;
(statearr_67556_67579[(2)] = null);

(statearr_67556_67579[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_67541 === (9))){
var state_67540__$1 = state_67540;
var statearr_67557_67580 = state_67540__$1;
(statearr_67557_67580[(2)] = null);

(statearr_67557_67580[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_67541 === (5))){
var inst_67498 = (state_67540[(8)]);
var inst_67514 = (state_67540[(13)]);
var inst_67514__$1 = cljs.core.seq(inst_67498);
var state_67540__$1 = (function (){var statearr_67558 = state_67540;
(statearr_67558[(13)] = inst_67514__$1);

return statearr_67558;
})();
if(inst_67514__$1){
var statearr_67559_67581 = state_67540__$1;
(statearr_67559_67581[(1)] = (8));

} else {
var statearr_67560_67582 = state_67540__$1;
(statearr_67560_67582[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_67541 === (14))){
var inst_67514 = (state_67540[(13)]);
var inst_67527 = (state_67540[(2)]);
var inst_67528 = cljs.core.next(inst_67514);
var inst_67498 = inst_67528;
var inst_67499 = null;
var inst_67500 = (0);
var inst_67501 = (0);
var state_67540__$1 = (function (){var statearr_67561 = state_67540;
(statearr_67561[(7)] = inst_67501);

(statearr_67561[(8)] = inst_67498);

(statearr_67561[(9)] = inst_67499);

(statearr_67561[(15)] = inst_67527);

(statearr_67561[(10)] = inst_67500);

return statearr_67561;
})();
var statearr_67562_67583 = state_67540__$1;
(statearr_67562_67583[(2)] = null);

(statearr_67562_67583[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_67541 === (10))){
var inst_67534 = (state_67540[(2)]);
var state_67540__$1 = state_67540;
var statearr_67563_67584 = state_67540__$1;
(statearr_67563_67584[(2)] = inst_67534);

(statearr_67563_67584[(1)] = (6));


return cljs.core.cst$kw$recur;
} else {
if((state_val_67541 === (8))){
var inst_67514 = (state_67540[(13)]);
var inst_67516 = cljs.core.chunked_seq_QMARK_(inst_67514);
var state_67540__$1 = state_67540;
if(inst_67516){
var statearr_67564_67585 = state_67540__$1;
(statearr_67564_67585[(1)] = (11));

} else {
var statearr_67565_67586 = state_67540__$1;
(statearr_67565_67586[(1)] = (12));

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
});})(c__35961__auto__))
;
return ((function (switch__35847__auto__,c__35961__auto__){
return (function() {
var org$numenta$sanity$demos$cortical_io$cio_start_requests_BANG__$_state_machine__35848__auto__ = null;
var org$numenta$sanity$demos$cortical_io$cio_start_requests_BANG__$_state_machine__35848__auto____0 = (function (){
var statearr_67569 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_67569[(0)] = org$numenta$sanity$demos$cortical_io$cio_start_requests_BANG__$_state_machine__35848__auto__);

(statearr_67569[(1)] = (1));

return statearr_67569;
});
var org$numenta$sanity$demos$cortical_io$cio_start_requests_BANG__$_state_machine__35848__auto____1 = (function (state_67540){
while(true){
var ret_value__35849__auto__ = (function (){try{while(true){
var result__35850__auto__ = switch__35847__auto__(state_67540);
if(cljs.core.keyword_identical_QMARK_(result__35850__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__35850__auto__;
}
break;
}
}catch (e67570){if((e67570 instanceof Object)){
var ex__35851__auto__ = e67570;
var statearr_67571_67587 = state_67540;
(statearr_67571_67587[(5)] = ex__35851__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_67540);

return cljs.core.cst$kw$recur;
} else {
throw e67570;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35849__auto__,cljs.core.cst$kw$recur)){
var G__67588 = state_67540;
state_67540 = G__67588;
continue;
} else {
return ret_value__35849__auto__;
}
break;
}
});
org$numenta$sanity$demos$cortical_io$cio_start_requests_BANG__$_state_machine__35848__auto__ = function(state_67540){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$cortical_io$cio_start_requests_BANG__$_state_machine__35848__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$cortical_io$cio_start_requests_BANG__$_state_machine__35848__auto____1.call(this,state_67540);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$cortical_io$cio_start_requests_BANG__$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$cortical_io$cio_start_requests_BANG__$_state_machine__35848__auto____0;
org$numenta$sanity$demos$cortical_io$cio_start_requests_BANG__$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$cortical_io$cio_start_requests_BANG__$_state_machine__35848__auto____1;
return org$numenta$sanity$demos$cortical_io$cio_start_requests_BANG__$_state_machine__35848__auto__;
})()
;})(switch__35847__auto__,c__35961__auto__))
})();
var state__35963__auto__ = (function (){var statearr_67572 = (f__35962__auto__.cljs$core$IFn$_invoke$arity$0 ? f__35962__auto__.cljs$core$IFn$_invoke$arity$0() : f__35962__auto__.call(null));
(statearr_67572[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__35961__auto__);

return statearr_67572;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__35963__auto__);
});})(c__35961__auto__))
);

return c__35961__auto__;
});
org.numenta.sanity.demos.cortical_io.send_text_BANG_ = (function org$numenta$sanity$demos$cortical_io$send_text_BANG_(){
var temp__4653__auto__ = cljs.core.seq(org.numenta.sanity.demos.cortical_io.word_item_seq(cljs.core.cst$kw$repeats.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.cortical_io.config) : cljs.core.deref.call(null,org.numenta.sanity.demos.cortical_io.config))),cljs.core.cst$kw$text.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.cortical_io.config) : cljs.core.deref.call(null,org.numenta.sanity.demos.cortical_io.config)))));
if(temp__4653__auto__){
var xs = temp__4653__auto__;
var c__35961__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__35961__auto__,xs,temp__4653__auto__){
return (function (){
var f__35962__auto__ = (function (){var switch__35847__auto__ = ((function (c__35961__auto__,xs,temp__4653__auto__){
return (function (state_67642){
var state_val_67643 = (state_67642[(1)]);
if((state_val_67643 === (1))){
var inst_67623 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.cortical_io.config) : cljs.core.deref.call(null,org.numenta.sanity.demos.cortical_io.config));
var inst_67624 = cljs.core.cst$kw$encoder.cljs$core$IFn$_invoke$arity$1(inst_67623);
var inst_67625 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$cortical_DASH_io,inst_67624);
var state_67642__$1 = state_67642;
if(inst_67625){
var statearr_67644_67657 = state_67642__$1;
(statearr_67644_67657[(1)] = (2));

} else {
var statearr_67645_67658 = state_67642__$1;
(statearr_67645_67658[(1)] = (3));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_67643 === (2))){
var inst_67627 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.cortical_io.config) : cljs.core.deref.call(null,org.numenta.sanity.demos.cortical_io.config));
var inst_67628 = cljs.core.cst$kw$api_DASH_key.cljs$core$IFn$_invoke$arity$1(inst_67627);
var inst_67629 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.cortical_io.config) : cljs.core.deref.call(null,org.numenta.sanity.demos.cortical_io.config));
var inst_67630 = cljs.core.cst$kw$text.cljs$core$IFn$_invoke$arity$1(inst_67629);
var inst_67631 = org.numenta.sanity.demos.cortical_io.cio_start_requests_BANG_(inst_67628,inst_67630);
var inst_67632 = cljs.core.async.timeout((2500));
var state_67642__$1 = (function (){var statearr_67646 = state_67642;
(statearr_67646[(7)] = inst_67631);

return statearr_67646;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_67642__$1,(5),inst_67632);
} else {
if((state_val_67643 === (3))){
var state_67642__$1 = state_67642;
var statearr_67647_67659 = state_67642__$1;
(statearr_67647_67659[(2)] = null);

(statearr_67647_67659[(1)] = (4));


return cljs.core.cst$kw$recur;
} else {
if((state_val_67643 === (4))){
var inst_67637 = (state_67642[(2)]);
var inst_67638 = cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3(org.numenta.sanity.demos.cortical_io.world_c,xs,false);
var inst_67639 = cljs.core.count(org.numenta.sanity.demos.cortical_io.world_buffer);
var inst_67640 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.demos.cortical_io.config,cljs.core.assoc,cljs.core.cst$kw$world_DASH_buffer_DASH_count,inst_67639);
var state_67642__$1 = (function (){var statearr_67648 = state_67642;
(statearr_67648[(8)] = inst_67637);

(statearr_67648[(9)] = inst_67638);

return statearr_67648;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_67642__$1,inst_67640);
} else {
if((state_val_67643 === (5))){
var inst_67634 = (state_67642[(2)]);
var state_67642__$1 = state_67642;
var statearr_67649_67660 = state_67642__$1;
(statearr_67649_67660[(2)] = inst_67634);

(statearr_67649_67660[(1)] = (4));


return cljs.core.cst$kw$recur;
} else {
return null;
}
}
}
}
}
});})(c__35961__auto__,xs,temp__4653__auto__))
;
return ((function (switch__35847__auto__,c__35961__auto__,xs,temp__4653__auto__){
return (function() {
var org$numenta$sanity$demos$cortical_io$send_text_BANG__$_state_machine__35848__auto__ = null;
var org$numenta$sanity$demos$cortical_io$send_text_BANG__$_state_machine__35848__auto____0 = (function (){
var statearr_67653 = [null,null,null,null,null,null,null,null,null,null];
(statearr_67653[(0)] = org$numenta$sanity$demos$cortical_io$send_text_BANG__$_state_machine__35848__auto__);

(statearr_67653[(1)] = (1));

return statearr_67653;
});
var org$numenta$sanity$demos$cortical_io$send_text_BANG__$_state_machine__35848__auto____1 = (function (state_67642){
while(true){
var ret_value__35849__auto__ = (function (){try{while(true){
var result__35850__auto__ = switch__35847__auto__(state_67642);
if(cljs.core.keyword_identical_QMARK_(result__35850__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__35850__auto__;
}
break;
}
}catch (e67654){if((e67654 instanceof Object)){
var ex__35851__auto__ = e67654;
var statearr_67655_67661 = state_67642;
(statearr_67655_67661[(5)] = ex__35851__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_67642);

return cljs.core.cst$kw$recur;
} else {
throw e67654;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35849__auto__,cljs.core.cst$kw$recur)){
var G__67662 = state_67642;
state_67642 = G__67662;
continue;
} else {
return ret_value__35849__auto__;
}
break;
}
});
org$numenta$sanity$demos$cortical_io$send_text_BANG__$_state_machine__35848__auto__ = function(state_67642){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$cortical_io$send_text_BANG__$_state_machine__35848__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$cortical_io$send_text_BANG__$_state_machine__35848__auto____1.call(this,state_67642);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$cortical_io$send_text_BANG__$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$cortical_io$send_text_BANG__$_state_machine__35848__auto____0;
org$numenta$sanity$demos$cortical_io$send_text_BANG__$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$cortical_io$send_text_BANG__$_state_machine__35848__auto____1;
return org$numenta$sanity$demos$cortical_io$send_text_BANG__$_state_machine__35848__auto__;
})()
;})(switch__35847__auto__,c__35961__auto__,xs,temp__4653__auto__))
})();
var state__35963__auto__ = (function (){var statearr_67656 = (f__35962__auto__.cljs$core$IFn$_invoke$arity$0 ? f__35962__auto__.cljs$core$IFn$_invoke$arity$0() : f__35962__auto__.call(null));
(statearr_67656[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__35961__auto__);

return statearr_67656;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__35963__auto__);
});})(c__35961__auto__,xs,temp__4653__auto__))
);

return c__35961__auto__;
} else {
return null;
}
});
org.numenta.sanity.demos.cortical_io.set_model_BANG_ = (function org$numenta$sanity$demos$cortical_io$set_model_BANG_(){
return org.numenta.sanity.helpers.with_ui_loading_message((function (){
var n_regions = cljs.core.cst$kw$n_DASH_regions.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.cortical_io.config) : cljs.core.deref.call(null,org.numenta.sanity.demos.cortical_io.config)));
var spec = (function (){var G__67669 = (((cljs.core.cst$kw$spec_DASH_choice.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.cortical_io.config) : cljs.core.deref.call(null,org.numenta.sanity.demos.cortical_io.config))) instanceof cljs.core.Keyword))?cljs.core.cst$kw$spec_DASH_choice.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.cortical_io.config) : cljs.core.deref.call(null,org.numenta.sanity.demos.cortical_io.config))).fqn:null);
switch (G__67669) {
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
var e = (function (){var G__67670 = (((cljs.core.cst$kw$encoder.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.cortical_io.config) : cljs.core.deref.call(null,org.numenta.sanity.demos.cortical_io.config))) instanceof cljs.core.Keyword))?cljs.core.cst$kw$encoder.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.cortical_io.config) : cljs.core.deref.call(null,org.numenta.sanity.demos.cortical_io.config))).fqn:null);
switch (G__67670) {
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
var G__67671_67677 = org.numenta.sanity.demos.cortical_io.model;
var G__67672_67678 = org.nfrac.comportex.core.regions_in_series.cljs$core$IFn$_invoke$arity$4(n_regions,org.nfrac.comportex.core.sensory_region,cljs.core.list_STAR_.cljs$core$IFn$_invoke$arity$2(spec,cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([spec,org.numenta.sanity.demos.cortical_io.higher_level_spec_diff], 0)))),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$input,sensor], null));
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__67671_67677,G__67672_67678) : cljs.core.reset_BANG_.call(null,G__67671_67677,G__67672_67678));

if(init_QMARK_){
org.numenta.sanity.bridge.browser.init.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.demos.cortical_io.model,org.numenta.sanity.demos.cortical_io.world_c,org.numenta.sanity.main.into_journal,org.numenta.sanity.demos.cortical_io.into_sim);
} else {
var G__67673_67679 = org.numenta.sanity.main.step_template;
var G__67674_67680 = org.numenta.sanity.comportex.data.step_template_data((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.cortical_io.model) : cljs.core.deref.call(null,org.numenta.sanity.demos.cortical_io.model)));
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__67673_67679,G__67674_67680) : cljs.core.reset_BANG_.call(null,G__67673_67679,G__67674_67680));
}

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.demos.cortical_io.config,cljs.core.assoc,cljs.core.cst$kw$have_DASH_model_QMARK_,true);
}));
});
org.numenta.sanity.demos.cortical_io.config_template = new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h3,"Input ",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,"Word sequences"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_info,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$field,cljs.core.cst$kw$label,cljs.core.cst$kw$id,cljs.core.cst$kw$world_DASH_buffer_DASH_count,cljs.core.cst$kw$postamble," queued input values."], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_info,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$field,cljs.core.cst$kw$label,cljs.core.cst$kw$id,cljs.core.cst$kw$cache_DASH_count,cljs.core.cst$kw$postamble," cached word fingerprints."], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_horizontal,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label$col_DASH_sm_DASH_5,"Repeats of each sentence:"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_7,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input$form_DASH_control,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$field,cljs.core.cst$kw$numeric,cljs.core.cst$kw$id,cljs.core.cst$kw$repeats], null)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_12,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$textarea$form_DASH_control,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$field,cljs.core.cst$kw$textarea,cljs.core.cst$kw$id,cljs.core.cst$kw$text,cljs.core.cst$kw$rows,(10)], null)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_8,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$field,cljs.core.cst$kw$container,cljs.core.cst$kw$visible_QMARK_,(function (p1__67681_SHARP_){
return cljs.core.cst$kw$have_DASH_model_QMARK_.cljs$core$IFn$_invoke$arity$1(p1__67681_SHARP_);
})], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_primary,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$on_DASH_click,(function (e){
org.numenta.sanity.demos.cortical_io.send_text_BANG_();

return e.preventDefault();
})], null),"Send text block input"], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$field,cljs.core.cst$kw$container,cljs.core.cst$kw$visible_QMARK_,(function (p1__67682_SHARP_){
return cljs.core.not(cljs.core.cst$kw$have_DASH_model_QMARK_.cljs$core$IFn$_invoke$arity$1(p1__67682_SHARP_));
})], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_primary$disabled,"Send text block input"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_info,"Create a model first (below)."], null)], null)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h3,"HTM model"], null),new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_horizontal,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label$col_DASH_sm_DASH_5,"Word encoder:"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_7,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$select$form_DASH_control,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$field,cljs.core.cst$kw$list,cljs.core.cst$kw$id,cljs.core.cst$kw$encoder], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$option,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,cljs.core.cst$kw$cortical_DASH_io], null),"cortical.io"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$option,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,cljs.core.cst$kw$random], null),"random"], null)], null)], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$field,cljs.core.cst$kw$container,cljs.core.cst$kw$visible_QMARK_,(function (p1__67683_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$cortical_DASH_io,cljs.core.cst$kw$encoder.cljs$core$IFn$_invoke$arity$1(p1__67683_SHARP_));
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
