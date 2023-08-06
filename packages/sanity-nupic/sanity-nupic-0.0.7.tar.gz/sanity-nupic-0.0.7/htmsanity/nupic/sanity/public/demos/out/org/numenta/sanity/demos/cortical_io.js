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
org.numenta.sanity.demos.cortical_io.world_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.demos.cortical_io.world_buffer,cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.map.cljs$core$IFn$_invoke$arity$1(org.nfrac.comportex.util.keep_history_middleware((100),cljs.core.cst$kw$word,cljs.core.cst$kw$history)),cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (p1__67260_SHARP_){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__67260_SHARP_,cljs.core.cst$kw$label,cljs.core.cst$kw$word.cljs$core$IFn$_invoke$arity$1(p1__67260_SHARP_));
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
var vec__67275 = cljs.core.first(cljs.core.vals(cljs.core.cst$kw$sensors.cljs$core$IFn$_invoke$arity$1(htm)));
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67275,(0),null);
var e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67275,(1),null);
var rgn = cljs.core.first(org.nfrac.comportex.core.region_seq(htm));
var pr_votes = org.nfrac.comportex.core.predicted_bit_votes(rgn);
var predictions = org.nfrac.comportex.protocols.decode(e,pr_votes,n_predictions);
var temp__4651__auto__ = cljs.core.cst$kw$channel.cljs$core$IFn$_invoke$arity$1(predictions);
if(cljs.core.truth_(temp__4651__auto__)){
var c = temp__4651__auto__;
var c__35961__auto___67289 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__35961__auto___67289,c,temp__4651__auto__,vec__67275,_,e,rgn,pr_votes,predictions){
return (function (){
var f__35962__auto__ = (function (){var switch__35847__auto__ = ((function (c__35961__auto___67289,c,temp__4651__auto__,vec__67275,_,e,rgn,pr_votes,predictions){
return (function (state_67280){
var state_val_67281 = (state_67280[(1)]);
if((state_val_67281 === (1))){
var state_67280__$1 = state_67280;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_67280__$1,(2),c);
} else {
if((state_val_67281 === (2))){
var inst_67277 = (state_67280[(2)]);
var inst_67278 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(predictions_cache,cljs.core.assoc,htm,inst_67277);
var state_67280__$1 = state_67280;
return cljs.core.async.impl.ioc_helpers.return_chan(state_67280__$1,inst_67278);
} else {
return null;
}
}
});})(c__35961__auto___67289,c,temp__4651__auto__,vec__67275,_,e,rgn,pr_votes,predictions))
;
return ((function (switch__35847__auto__,c__35961__auto___67289,c,temp__4651__auto__,vec__67275,_,e,rgn,pr_votes,predictions){
return (function() {
var org$numenta$sanity$demos$cortical_io$load_predictions_$_state_machine__35848__auto__ = null;
var org$numenta$sanity$demos$cortical_io$load_predictions_$_state_machine__35848__auto____0 = (function (){
var statearr_67285 = [null,null,null,null,null,null,null];
(statearr_67285[(0)] = org$numenta$sanity$demos$cortical_io$load_predictions_$_state_machine__35848__auto__);

(statearr_67285[(1)] = (1));

return statearr_67285;
});
var org$numenta$sanity$demos$cortical_io$load_predictions_$_state_machine__35848__auto____1 = (function (state_67280){
while(true){
var ret_value__35849__auto__ = (function (){try{while(true){
var result__35850__auto__ = switch__35847__auto__(state_67280);
if(cljs.core.keyword_identical_QMARK_(result__35850__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__35850__auto__;
}
break;
}
}catch (e67286){if((e67286 instanceof Object)){
var ex__35851__auto__ = e67286;
var statearr_67287_67290 = state_67280;
(statearr_67287_67290[(5)] = ex__35851__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_67280);

return cljs.core.cst$kw$recur;
} else {
throw e67286;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35849__auto__,cljs.core.cst$kw$recur)){
var G__67291 = state_67280;
state_67280 = G__67291;
continue;
} else {
return ret_value__35849__auto__;
}
break;
}
});
org$numenta$sanity$demos$cortical_io$load_predictions_$_state_machine__35848__auto__ = function(state_67280){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$cortical_io$load_predictions_$_state_machine__35848__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$cortical_io$load_predictions_$_state_machine__35848__auto____1.call(this,state_67280);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$cortical_io$load_predictions_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$cortical_io$load_predictions_$_state_machine__35848__auto____0;
org$numenta$sanity$demos$cortical_io$load_predictions_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$cortical_io$load_predictions_$_state_machine__35848__auto____1;
return org$numenta$sanity$demos$cortical_io$load_predictions_$_state_machine__35848__auto__;
})()
;})(switch__35847__auto__,c__35961__auto___67289,c,temp__4651__auto__,vec__67275,_,e,rgn,pr_votes,predictions))
})();
var state__35963__auto__ = (function (){var statearr_67288 = (f__35962__auto__.cljs$core$IFn$_invoke$arity$0 ? f__35962__auto__.cljs$core$IFn$_invoke$arity$0() : f__35962__auto__.call(null));
(statearr_67288[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__35961__auto___67289);

return statearr_67288;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__35963__auto__);
});})(c__35961__auto___67289,c,temp__4651__auto__,vec__67275,_,e,rgn,pr_votes,predictions))
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
return (function (_,___$1,___$2,p__67307){
var vec__67308 = p__67307;
var sel = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67308,(0),null);
var temp__4653__auto__ = cljs.core.cst$kw$model_DASH_id.cljs$core$IFn$_invoke$arity$1(sel);
if(cljs.core.truth_(temp__4653__auto__)){
var model_id = temp__4653__auto__;
var out_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.into_journal,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["get-model",model_id,org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$1(out_c)], null));

var c__35961__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__35961__auto__,out_c,model_id,temp__4653__auto__,vec__67308,sel,show_predictions,predictions_cache,selected_htm){
return (function (){
var f__35962__auto__ = (function (){var switch__35847__auto__ = ((function (c__35961__auto__,out_c,model_id,temp__4653__auto__,vec__67308,sel,show_predictions,predictions_cache,selected_htm){
return (function (state_67313){
var state_val_67314 = (state_67313[(1)]);
if((state_val_67314 === (1))){
var state_67313__$1 = state_67313;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_67313__$1,(2),out_c);
} else {
if((state_val_67314 === (2))){
var inst_67310 = (state_67313[(2)]);
var inst_67311 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(selected_htm,inst_67310) : cljs.core.reset_BANG_.call(null,selected_htm,inst_67310));
var state_67313__$1 = state_67313;
return cljs.core.async.impl.ioc_helpers.return_chan(state_67313__$1,inst_67311);
} else {
return null;
}
}
});})(c__35961__auto__,out_c,model_id,temp__4653__auto__,vec__67308,sel,show_predictions,predictions_cache,selected_htm))
;
return ((function (switch__35847__auto__,c__35961__auto__,out_c,model_id,temp__4653__auto__,vec__67308,sel,show_predictions,predictions_cache,selected_htm){
return (function() {
var org$numenta$sanity$demos$cortical_io$world_pane_$_state_machine__35848__auto__ = null;
var org$numenta$sanity$demos$cortical_io$world_pane_$_state_machine__35848__auto____0 = (function (){
var statearr_67318 = [null,null,null,null,null,null,null];
(statearr_67318[(0)] = org$numenta$sanity$demos$cortical_io$world_pane_$_state_machine__35848__auto__);

(statearr_67318[(1)] = (1));

return statearr_67318;
});
var org$numenta$sanity$demos$cortical_io$world_pane_$_state_machine__35848__auto____1 = (function (state_67313){
while(true){
var ret_value__35849__auto__ = (function (){try{while(true){
var result__35850__auto__ = switch__35847__auto__(state_67313);
if(cljs.core.keyword_identical_QMARK_(result__35850__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__35850__auto__;
}
break;
}
}catch (e67319){if((e67319 instanceof Object)){
var ex__35851__auto__ = e67319;
var statearr_67320_67322 = state_67313;
(statearr_67320_67322[(5)] = ex__35851__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_67313);

return cljs.core.cst$kw$recur;
} else {
throw e67319;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35849__auto__,cljs.core.cst$kw$recur)){
var G__67323 = state_67313;
state_67313 = G__67323;
continue;
} else {
return ret_value__35849__auto__;
}
break;
}
});
org$numenta$sanity$demos$cortical_io$world_pane_$_state_machine__35848__auto__ = function(state_67313){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$cortical_io$world_pane_$_state_machine__35848__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$cortical_io$world_pane_$_state_machine__35848__auto____1.call(this,state_67313);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$cortical_io$world_pane_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$cortical_io$world_pane_$_state_machine__35848__auto____0;
org$numenta$sanity$demos$cortical_io$world_pane_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$cortical_io$world_pane_$_state_machine__35848__auto____1;
return org$numenta$sanity$demos$cortical_io$world_pane_$_state_machine__35848__auto__;
})()
;})(switch__35847__auto__,c__35961__auto__,out_c,model_id,temp__4653__auto__,vec__67308,sel,show_predictions,predictions_cache,selected_htm))
})();
var state__35963__auto__ = (function (){var statearr_67321 = (f__35962__auto__.cljs$core$IFn$_invoke$arity$0 ? f__35962__auto__.cljs$core$IFn$_invoke$arity$0() : f__35962__auto__.call(null));
(statearr_67321[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__35961__auto__);

return statearr_67321;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__35963__auto__);
});})(c__35961__auto__,out_c,model_id,temp__4653__auto__,vec__67308,sel,show_predictions,predictions_cache,selected_htm))
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
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__67325_SHARP_){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(p1__67325_SHARP_,".");
}),cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__67324_SHARP_){
return clojure.string.split.cljs$core$IFn$_invoke$arity$2(p1__67324_SHARP_,/[^\w']+/);
}),clojure.string.split.cljs$core$IFn$_invoke$arity$2(clojure.string.trim(text),/[^\w]*[\.\!\?]+[^\w]*/)));
});
/**
 * An input sequence consisting of words from the given text, with
 * periods separating sentences also included as distinct words. Each
 * sequence element has the form `{:word _, :index [i j]}`, where i is
 * the sentence index and j is the word index into sentence j.
 */
org.numenta.sanity.demos.cortical_io.word_item_seq = (function org$numenta$sanity$demos$cortical_io$word_item_seq(n_repeats,text){
var iter__5454__auto__ = (function org$numenta$sanity$demos$cortical_io$word_item_seq_$_iter__67363(s__67364){
return (new cljs.core.LazySeq(null,(function (){
var s__67364__$1 = s__67364;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__67364__$1);
if(temp__4653__auto__){
var xs__5201__auto__ = temp__4653__auto__;
var vec__67386 = cljs.core.first(xs__5201__auto__);
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67386,(0),null);
var sen = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67386,(1),null);
var iterys__5450__auto__ = ((function (s__67364__$1,vec__67386,i,sen,xs__5201__auto__,temp__4653__auto__){
return (function org$numenta$sanity$demos$cortical_io$word_item_seq_$_iter__67363_$_iter__67365(s__67366){
return (new cljs.core.LazySeq(null,((function (s__67364__$1,vec__67386,i,sen,xs__5201__auto__,temp__4653__auto__){
return (function (){
var s__67366__$1 = s__67366;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__67366__$1);
if(temp__4653__auto____$1){
var xs__5201__auto____$1 = temp__4653__auto____$1;
var rep = cljs.core.first(xs__5201__auto____$1);
var iterys__5450__auto__ = ((function (s__67366__$1,s__67364__$1,rep,xs__5201__auto____$1,temp__4653__auto____$1,vec__67386,i,sen,xs__5201__auto__,temp__4653__auto__){
return (function org$numenta$sanity$demos$cortical_io$word_item_seq_$_iter__67363_$_iter__67365_$_iter__67367(s__67368){
return (new cljs.core.LazySeq(null,((function (s__67366__$1,s__67364__$1,rep,xs__5201__auto____$1,temp__4653__auto____$1,vec__67386,i,sen,xs__5201__auto__,temp__4653__auto__){
return (function (){
var s__67368__$1 = s__67368;
while(true){
var temp__4653__auto____$2 = cljs.core.seq(s__67368__$1);
if(temp__4653__auto____$2){
var s__67368__$2 = temp__4653__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__67368__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__67368__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__67370 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__67369 = (0);
while(true){
if((i__67369 < size__5453__auto__)){
var vec__67398 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__67369);
var j = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67398,(0),null);
var word = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67398,(1),null);
cljs.core.chunk_append(b__67370,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$word,word,cljs.core.cst$kw$index,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [i,j], null)], null));

var G__67400 = (i__67369 + (1));
i__67369 = G__67400;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__67370),org$numenta$sanity$demos$cortical_io$word_item_seq_$_iter__67363_$_iter__67365_$_iter__67367(cljs.core.chunk_rest(s__67368__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__67370),null);
}
} else {
var vec__67399 = cljs.core.first(s__67368__$2);
var j = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67399,(0),null);
var word = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67399,(1),null);
return cljs.core.cons(new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$word,word,cljs.core.cst$kw$index,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [i,j], null)], null),org$numenta$sanity$demos$cortical_io$word_item_seq_$_iter__67363_$_iter__67365_$_iter__67367(cljs.core.rest(s__67368__$2)));
}
} else {
return null;
}
break;
}
});})(s__67366__$1,s__67364__$1,rep,xs__5201__auto____$1,temp__4653__auto____$1,vec__67386,i,sen,xs__5201__auto__,temp__4653__auto__))
,null,null));
});})(s__67366__$1,s__67364__$1,rep,xs__5201__auto____$1,temp__4653__auto____$1,vec__67386,i,sen,xs__5201__auto__,temp__4653__auto__))
;
var fs__5451__auto__ = cljs.core.seq(iterys__5450__auto__(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(cljs.core.vector,sen)));
if(fs__5451__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5451__auto__,org$numenta$sanity$demos$cortical_io$word_item_seq_$_iter__67363_$_iter__67365(cljs.core.rest(s__67366__$1)));
} else {
var G__67401 = cljs.core.rest(s__67366__$1);
s__67366__$1 = G__67401;
continue;
}
} else {
return null;
}
break;
}
});})(s__67364__$1,vec__67386,i,sen,xs__5201__auto__,temp__4653__auto__))
,null,null));
});})(s__67364__$1,vec__67386,i,sen,xs__5201__auto__,temp__4653__auto__))
;
var fs__5451__auto__ = cljs.core.seq(iterys__5450__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1(n_repeats)));
if(fs__5451__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5451__auto__,org$numenta$sanity$demos$cortical_io$word_item_seq_$_iter__67363(cljs.core.rest(s__67364__$1)));
} else {
var G__67402 = cljs.core.rest(s__67364__$1);
s__67364__$1 = G__67402;
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
return (function (state_67538){
var state_val_67539 = (state_67538[(1)]);
if((state_val_67539 === (7))){
var inst_67498 = (state_67538[(7)]);
var inst_67496 = (state_67538[(8)]);
var inst_67499 = (state_67538[(9)]);
var inst_67497 = (state_67538[(10)]);
var inst_67508 = (state_67538[(2)]);
var inst_67509 = (inst_67499 + (1));
var tmp67540 = inst_67498;
var tmp67541 = inst_67496;
var tmp67542 = inst_67497;
var inst_67496__$1 = tmp67541;
var inst_67497__$1 = tmp67542;
var inst_67498__$1 = tmp67540;
var inst_67499__$1 = inst_67509;
var state_67538__$1 = (function (){var statearr_67543 = state_67538;
(statearr_67543[(11)] = inst_67508);

(statearr_67543[(7)] = inst_67498__$1);

(statearr_67543[(8)] = inst_67496__$1);

(statearr_67543[(9)] = inst_67499__$1);

(statearr_67543[(10)] = inst_67497__$1);

return statearr_67543;
})();
var statearr_67544_67571 = state_67538__$1;
(statearr_67544_67571[(2)] = null);

(statearr_67544_67571[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_67539 === (1))){
var inst_67491 = clojure.string.lower_case(text);
var inst_67492 = org.numenta.sanity.demos.cortical_io.split_sentences(inst_67491);
var inst_67493 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.concat,inst_67492);
var inst_67494 = cljs.core.distinct.cljs$core$IFn$_invoke$arity$1(inst_67493);
var inst_67495 = cljs.core.seq(inst_67494);
var inst_67496 = inst_67495;
var inst_67497 = null;
var inst_67498 = (0);
var inst_67499 = (0);
var state_67538__$1 = (function (){var statearr_67545 = state_67538;
(statearr_67545[(7)] = inst_67498);

(statearr_67545[(8)] = inst_67496);

(statearr_67545[(9)] = inst_67499);

(statearr_67545[(10)] = inst_67497);

return statearr_67545;
})();
var statearr_67546_67572 = state_67538__$1;
(statearr_67546_67572[(2)] = null);

(statearr_67546_67572[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_67539 === (4))){
var inst_67499 = (state_67538[(9)]);
var inst_67497 = (state_67538[(10)]);
var inst_67504 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(inst_67497,inst_67499);
var inst_67505 = cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["requesting fingerprint for:",inst_67504], 0));
var inst_67506 = org.nfrac.comportex.cortical_io.cache_fingerprint_BANG_(api_key,org.numenta.sanity.demos.cortical_io.fingerprint_cache,inst_67504);
var state_67538__$1 = (function (){var statearr_67547 = state_67538;
(statearr_67547[(12)] = inst_67505);

return statearr_67547;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_67538__$1,(7),inst_67506);
} else {
if((state_val_67539 === (13))){
var inst_67529 = (state_67538[(2)]);
var state_67538__$1 = state_67538;
var statearr_67548_67573 = state_67538__$1;
(statearr_67548_67573[(2)] = inst_67529);

(statearr_67548_67573[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_67539 === (6))){
var inst_67534 = (state_67538[(2)]);
var state_67538__$1 = state_67538;
var statearr_67549_67574 = state_67538__$1;
(statearr_67549_67574[(2)] = inst_67534);

(statearr_67549_67574[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_67539 === (3))){
var inst_67536 = (state_67538[(2)]);
var state_67538__$1 = state_67538;
return cljs.core.async.impl.ioc_helpers.return_chan(state_67538__$1,inst_67536);
} else {
if((state_val_67539 === (12))){
var inst_67512 = (state_67538[(13)]);
var inst_67521 = cljs.core.first(inst_67512);
var inst_67522 = cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["requesting fingerprint for:",inst_67521], 0));
var inst_67523 = org.nfrac.comportex.cortical_io.cache_fingerprint_BANG_(api_key,org.numenta.sanity.demos.cortical_io.fingerprint_cache,inst_67521);
var state_67538__$1 = (function (){var statearr_67550 = state_67538;
(statearr_67550[(14)] = inst_67522);

return statearr_67550;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_67538__$1,(14),inst_67523);
} else {
if((state_val_67539 === (2))){
var inst_67498 = (state_67538[(7)]);
var inst_67499 = (state_67538[(9)]);
var inst_67501 = (inst_67499 < inst_67498);
var inst_67502 = inst_67501;
var state_67538__$1 = state_67538;
if(cljs.core.truth_(inst_67502)){
var statearr_67551_67575 = state_67538__$1;
(statearr_67551_67575[(1)] = (4));

} else {
var statearr_67552_67576 = state_67538__$1;
(statearr_67552_67576[(1)] = (5));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_67539 === (11))){
var inst_67512 = (state_67538[(13)]);
var inst_67516 = cljs.core.chunk_first(inst_67512);
var inst_67517 = cljs.core.chunk_rest(inst_67512);
var inst_67518 = cljs.core.count(inst_67516);
var inst_67496 = inst_67517;
var inst_67497 = inst_67516;
var inst_67498 = inst_67518;
var inst_67499 = (0);
var state_67538__$1 = (function (){var statearr_67553 = state_67538;
(statearr_67553[(7)] = inst_67498);

(statearr_67553[(8)] = inst_67496);

(statearr_67553[(9)] = inst_67499);

(statearr_67553[(10)] = inst_67497);

return statearr_67553;
})();
var statearr_67554_67577 = state_67538__$1;
(statearr_67554_67577[(2)] = null);

(statearr_67554_67577[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_67539 === (9))){
var state_67538__$1 = state_67538;
var statearr_67555_67578 = state_67538__$1;
(statearr_67555_67578[(2)] = null);

(statearr_67555_67578[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_67539 === (5))){
var inst_67512 = (state_67538[(13)]);
var inst_67496 = (state_67538[(8)]);
var inst_67512__$1 = cljs.core.seq(inst_67496);
var state_67538__$1 = (function (){var statearr_67556 = state_67538;
(statearr_67556[(13)] = inst_67512__$1);

return statearr_67556;
})();
if(inst_67512__$1){
var statearr_67557_67579 = state_67538__$1;
(statearr_67557_67579[(1)] = (8));

} else {
var statearr_67558_67580 = state_67538__$1;
(statearr_67558_67580[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_67539 === (14))){
var inst_67512 = (state_67538[(13)]);
var inst_67525 = (state_67538[(2)]);
var inst_67526 = cljs.core.next(inst_67512);
var inst_67496 = inst_67526;
var inst_67497 = null;
var inst_67498 = (0);
var inst_67499 = (0);
var state_67538__$1 = (function (){var statearr_67559 = state_67538;
(statearr_67559[(7)] = inst_67498);

(statearr_67559[(8)] = inst_67496);

(statearr_67559[(9)] = inst_67499);

(statearr_67559[(10)] = inst_67497);

(statearr_67559[(15)] = inst_67525);

return statearr_67559;
})();
var statearr_67560_67581 = state_67538__$1;
(statearr_67560_67581[(2)] = null);

(statearr_67560_67581[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_67539 === (10))){
var inst_67532 = (state_67538[(2)]);
var state_67538__$1 = state_67538;
var statearr_67561_67582 = state_67538__$1;
(statearr_67561_67582[(2)] = inst_67532);

(statearr_67561_67582[(1)] = (6));


return cljs.core.cst$kw$recur;
} else {
if((state_val_67539 === (8))){
var inst_67512 = (state_67538[(13)]);
var inst_67514 = cljs.core.chunked_seq_QMARK_(inst_67512);
var state_67538__$1 = state_67538;
if(inst_67514){
var statearr_67562_67583 = state_67538__$1;
(statearr_67562_67583[(1)] = (11));

} else {
var statearr_67563_67584 = state_67538__$1;
(statearr_67563_67584[(1)] = (12));

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
var statearr_67567 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_67567[(0)] = org$numenta$sanity$demos$cortical_io$cio_start_requests_BANG__$_state_machine__35848__auto__);

(statearr_67567[(1)] = (1));

return statearr_67567;
});
var org$numenta$sanity$demos$cortical_io$cio_start_requests_BANG__$_state_machine__35848__auto____1 = (function (state_67538){
while(true){
var ret_value__35849__auto__ = (function (){try{while(true){
var result__35850__auto__ = switch__35847__auto__(state_67538);
if(cljs.core.keyword_identical_QMARK_(result__35850__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__35850__auto__;
}
break;
}
}catch (e67568){if((e67568 instanceof Object)){
var ex__35851__auto__ = e67568;
var statearr_67569_67585 = state_67538;
(statearr_67569_67585[(5)] = ex__35851__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_67538);

return cljs.core.cst$kw$recur;
} else {
throw e67568;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35849__auto__,cljs.core.cst$kw$recur)){
var G__67586 = state_67538;
state_67538 = G__67586;
continue;
} else {
return ret_value__35849__auto__;
}
break;
}
});
org$numenta$sanity$demos$cortical_io$cio_start_requests_BANG__$_state_machine__35848__auto__ = function(state_67538){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$cortical_io$cio_start_requests_BANG__$_state_machine__35848__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$cortical_io$cio_start_requests_BANG__$_state_machine__35848__auto____1.call(this,state_67538);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$cortical_io$cio_start_requests_BANG__$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$cortical_io$cio_start_requests_BANG__$_state_machine__35848__auto____0;
org$numenta$sanity$demos$cortical_io$cio_start_requests_BANG__$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$cortical_io$cio_start_requests_BANG__$_state_machine__35848__auto____1;
return org$numenta$sanity$demos$cortical_io$cio_start_requests_BANG__$_state_machine__35848__auto__;
})()
;})(switch__35847__auto__,c__35961__auto__))
})();
var state__35963__auto__ = (function (){var statearr_67570 = (f__35962__auto__.cljs$core$IFn$_invoke$arity$0 ? f__35962__auto__.cljs$core$IFn$_invoke$arity$0() : f__35962__auto__.call(null));
(statearr_67570[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__35961__auto__);

return statearr_67570;
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
return (function (state_67640){
var state_val_67641 = (state_67640[(1)]);
if((state_val_67641 === (1))){
var inst_67621 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.cortical_io.config) : cljs.core.deref.call(null,org.numenta.sanity.demos.cortical_io.config));
var inst_67622 = cljs.core.cst$kw$encoder.cljs$core$IFn$_invoke$arity$1(inst_67621);
var inst_67623 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$cortical_DASH_io,inst_67622);
var state_67640__$1 = state_67640;
if(inst_67623){
var statearr_67642_67655 = state_67640__$1;
(statearr_67642_67655[(1)] = (2));

} else {
var statearr_67643_67656 = state_67640__$1;
(statearr_67643_67656[(1)] = (3));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_67641 === (2))){
var inst_67625 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.cortical_io.config) : cljs.core.deref.call(null,org.numenta.sanity.demos.cortical_io.config));
var inst_67626 = cljs.core.cst$kw$api_DASH_key.cljs$core$IFn$_invoke$arity$1(inst_67625);
var inst_67627 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.cortical_io.config) : cljs.core.deref.call(null,org.numenta.sanity.demos.cortical_io.config));
var inst_67628 = cljs.core.cst$kw$text.cljs$core$IFn$_invoke$arity$1(inst_67627);
var inst_67629 = org.numenta.sanity.demos.cortical_io.cio_start_requests_BANG_(inst_67626,inst_67628);
var inst_67630 = cljs.core.async.timeout((2500));
var state_67640__$1 = (function (){var statearr_67644 = state_67640;
(statearr_67644[(7)] = inst_67629);

return statearr_67644;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_67640__$1,(5),inst_67630);
} else {
if((state_val_67641 === (3))){
var state_67640__$1 = state_67640;
var statearr_67645_67657 = state_67640__$1;
(statearr_67645_67657[(2)] = null);

(statearr_67645_67657[(1)] = (4));


return cljs.core.cst$kw$recur;
} else {
if((state_val_67641 === (4))){
var inst_67635 = (state_67640[(2)]);
var inst_67636 = cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3(org.numenta.sanity.demos.cortical_io.world_c,xs,false);
var inst_67637 = cljs.core.count(org.numenta.sanity.demos.cortical_io.world_buffer);
var inst_67638 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.demos.cortical_io.config,cljs.core.assoc,cljs.core.cst$kw$world_DASH_buffer_DASH_count,inst_67637);
var state_67640__$1 = (function (){var statearr_67646 = state_67640;
(statearr_67646[(8)] = inst_67636);

(statearr_67646[(9)] = inst_67635);

return statearr_67646;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_67640__$1,inst_67638);
} else {
if((state_val_67641 === (5))){
var inst_67632 = (state_67640[(2)]);
var state_67640__$1 = state_67640;
var statearr_67647_67658 = state_67640__$1;
(statearr_67647_67658[(2)] = inst_67632);

(statearr_67647_67658[(1)] = (4));


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
var statearr_67651 = [null,null,null,null,null,null,null,null,null,null];
(statearr_67651[(0)] = org$numenta$sanity$demos$cortical_io$send_text_BANG__$_state_machine__35848__auto__);

(statearr_67651[(1)] = (1));

return statearr_67651;
});
var org$numenta$sanity$demos$cortical_io$send_text_BANG__$_state_machine__35848__auto____1 = (function (state_67640){
while(true){
var ret_value__35849__auto__ = (function (){try{while(true){
var result__35850__auto__ = switch__35847__auto__(state_67640);
if(cljs.core.keyword_identical_QMARK_(result__35850__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__35850__auto__;
}
break;
}
}catch (e67652){if((e67652 instanceof Object)){
var ex__35851__auto__ = e67652;
var statearr_67653_67659 = state_67640;
(statearr_67653_67659[(5)] = ex__35851__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_67640);

return cljs.core.cst$kw$recur;
} else {
throw e67652;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35849__auto__,cljs.core.cst$kw$recur)){
var G__67660 = state_67640;
state_67640 = G__67660;
continue;
} else {
return ret_value__35849__auto__;
}
break;
}
});
org$numenta$sanity$demos$cortical_io$send_text_BANG__$_state_machine__35848__auto__ = function(state_67640){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$cortical_io$send_text_BANG__$_state_machine__35848__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$cortical_io$send_text_BANG__$_state_machine__35848__auto____1.call(this,state_67640);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$cortical_io$send_text_BANG__$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$cortical_io$send_text_BANG__$_state_machine__35848__auto____0;
org$numenta$sanity$demos$cortical_io$send_text_BANG__$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$cortical_io$send_text_BANG__$_state_machine__35848__auto____1;
return org$numenta$sanity$demos$cortical_io$send_text_BANG__$_state_machine__35848__auto__;
})()
;})(switch__35847__auto__,c__35961__auto__,xs,temp__4653__auto__))
})();
var state__35963__auto__ = (function (){var statearr_67654 = (f__35962__auto__.cljs$core$IFn$_invoke$arity$0 ? f__35962__auto__.cljs$core$IFn$_invoke$arity$0() : f__35962__auto__.call(null));
(statearr_67654[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__35961__auto__);

return statearr_67654;
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
var spec = (function (){var G__67667 = (((cljs.core.cst$kw$spec_DASH_choice.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.cortical_io.config) : cljs.core.deref.call(null,org.numenta.sanity.demos.cortical_io.config))) instanceof cljs.core.Keyword))?cljs.core.cst$kw$spec_DASH_choice.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.cortical_io.config) : cljs.core.deref.call(null,org.numenta.sanity.demos.cortical_io.config))).fqn:null);
switch (G__67667) {
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
var e = (function (){var G__67668 = (((cljs.core.cst$kw$encoder.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.cortical_io.config) : cljs.core.deref.call(null,org.numenta.sanity.demos.cortical_io.config))) instanceof cljs.core.Keyword))?cljs.core.cst$kw$encoder.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.cortical_io.config) : cljs.core.deref.call(null,org.numenta.sanity.demos.cortical_io.config))).fqn:null);
switch (G__67668) {
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
var G__67669_67675 = org.numenta.sanity.demos.cortical_io.model;
var G__67670_67676 = org.nfrac.comportex.core.regions_in_series.cljs$core$IFn$_invoke$arity$4(n_regions,org.nfrac.comportex.core.sensory_region,cljs.core.list_STAR_.cljs$core$IFn$_invoke$arity$2(spec,cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([spec,org.numenta.sanity.demos.cortical_io.higher_level_spec_diff], 0)))),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$input,sensor], null));
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__67669_67675,G__67670_67676) : cljs.core.reset_BANG_.call(null,G__67669_67675,G__67670_67676));

if(init_QMARK_){
org.numenta.sanity.bridge.browser.init.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.demos.cortical_io.model,org.numenta.sanity.demos.cortical_io.world_c,org.numenta.sanity.main.into_journal,org.numenta.sanity.demos.cortical_io.into_sim);
} else {
var G__67671_67677 = org.numenta.sanity.main.step_template;
var G__67672_67678 = org.numenta.sanity.comportex.data.step_template_data((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.cortical_io.model) : cljs.core.deref.call(null,org.numenta.sanity.demos.cortical_io.model)));
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__67671_67677,G__67672_67678) : cljs.core.reset_BANG_.call(null,G__67671_67677,G__67672_67678));
}

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.demos.cortical_io.config,cljs.core.assoc,cljs.core.cst$kw$have_DASH_model_QMARK_,true);
}));
});
org.numenta.sanity.demos.cortical_io.config_template = new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h3,"Input ",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,"Word sequences"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_info,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$field,cljs.core.cst$kw$label,cljs.core.cst$kw$id,cljs.core.cst$kw$world_DASH_buffer_DASH_count,cljs.core.cst$kw$postamble," queued input values."], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_info,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$field,cljs.core.cst$kw$label,cljs.core.cst$kw$id,cljs.core.cst$kw$cache_DASH_count,cljs.core.cst$kw$postamble," cached word fingerprints."], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_horizontal,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label$col_DASH_sm_DASH_5,"Repeats of each sentence:"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_7,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input$form_DASH_control,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$field,cljs.core.cst$kw$numeric,cljs.core.cst$kw$id,cljs.core.cst$kw$repeats], null)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_12,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$textarea$form_DASH_control,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$field,cljs.core.cst$kw$textarea,cljs.core.cst$kw$id,cljs.core.cst$kw$text,cljs.core.cst$kw$rows,(10)], null)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_8,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$field,cljs.core.cst$kw$container,cljs.core.cst$kw$visible_QMARK_,(function (p1__67679_SHARP_){
return cljs.core.cst$kw$have_DASH_model_QMARK_.cljs$core$IFn$_invoke$arity$1(p1__67679_SHARP_);
})], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_primary,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$on_DASH_click,(function (e){
org.numenta.sanity.demos.cortical_io.send_text_BANG_();

return e.preventDefault();
})], null),"Send text block input"], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$field,cljs.core.cst$kw$container,cljs.core.cst$kw$visible_QMARK_,(function (p1__67680_SHARP_){
return cljs.core.not(cljs.core.cst$kw$have_DASH_model_QMARK_.cljs$core$IFn$_invoke$arity$1(p1__67680_SHARP_));
})], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_primary$disabled,"Send text block input"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_info,"Create a model first (below)."], null)], null)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h3,"HTM model"], null),new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_horizontal,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label$col_DASH_sm_DASH_5,"Word encoder:"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_7,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$select$form_DASH_control,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$field,cljs.core.cst$kw$list,cljs.core.cst$kw$id,cljs.core.cst$kw$encoder], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$option,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,cljs.core.cst$kw$cortical_DASH_io], null),"cortical.io"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$option,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,cljs.core.cst$kw$random], null),"random"], null)], null)], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$field,cljs.core.cst$kw$container,cljs.core.cst$kw$visible_QMARK_,(function (p1__67681_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$cortical_DASH_io,cljs.core.cst$kw$encoder.cljs$core$IFn$_invoke$arity$1(p1__67681_SHARP_));
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
