// Compiled by ClojureScript 1.7.170 {:static-fns true, :optimize-constants true}
goog.provide('org.numenta.sanity.demos.simple_sentences');
goog.require('cljs.core');
goog.require('goog.dom.forms');
goog.require('goog.dom');
goog.require('reagent.core');
goog.require('org.numenta.sanity.helpers');
goog.require('org.numenta.sanity.util');
goog.require('org.numenta.sanity.main');
goog.require('org.nfrac.comportex.demos.simple_sentences');
goog.require('org.numenta.sanity.comportex.data');
goog.require('cljs.core.async');
goog.require('org.numenta.sanity.bridge.marshalling');
goog.require('reagent_forms.core');
goog.require('org.nfrac.comportex.core');
goog.require('org.numenta.sanity.bridge.browser');
goog.require('org.numenta.sanity.demos.comportex_common');
goog.require('org.nfrac.comportex.util');
org.numenta.sanity.demos.simple_sentences.config = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$n_DASH_regions,(1),cljs.core.cst$kw$repeats,(1),cljs.core.cst$kw$text,org.nfrac.comportex.demos.simple_sentences.input_text,cljs.core.cst$kw$world_DASH_buffer_DASH_count,(0)], null));
org.numenta.sanity.demos.simple_sentences.world_buffer = cljs.core.async.buffer((5000));
org.numenta.sanity.demos.simple_sentences.world_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.demos.simple_sentences.world_buffer,cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.map.cljs$core$IFn$_invoke$arity$1(org.nfrac.comportex.util.keep_history_middleware((100),cljs.core.cst$kw$word,cljs.core.cst$kw$history)),cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (p1__63994_SHARP_){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__63994_SHARP_,cljs.core.cst$kw$label,cljs.core.cst$kw$word.cljs$core$IFn$_invoke$arity$1(p1__63994_SHARP_));
}))));
org.numenta.sanity.demos.simple_sentences.into_sim = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
org.numenta.sanity.demos.simple_sentences.model = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
cljs.core.add_watch(org.numenta.sanity.demos.simple_sentences.model,cljs.core.cst$kw$org$numenta$sanity$demos$simple_DASH_sentences_SLASH_count_DASH_world_DASH_buffer,(function (_,___$1,___$2,___$3){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.demos.simple_sentences.config,cljs.core.assoc,cljs.core.cst$kw$world_DASH_buffer_DASH_count,cljs.core.count(org.numenta.sanity.demos.simple_sentences.world_buffer));
}));
org.numenta.sanity.demos.simple_sentences.max_shown = (100);
org.numenta.sanity.demos.simple_sentences.scroll_every = (50);
org.numenta.sanity.demos.simple_sentences.world_pane = (function org$numenta$sanity$demos$simple_sentences$world_pane(){
var show_predictions = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(false);
var selected_htm = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
cljs.core.add_watch(org.numenta.sanity.main.selection,cljs.core.cst$kw$org$numenta$sanity$demos$simple_DASH_sentences_SLASH_fetch_DASH_selected_DASH_htm,((function (show_predictions,selected_htm){
return (function (_,___$1,___$2,p__64010){
var vec__64011 = p__64010;
var sel = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64011,(0),null);
var temp__4653__auto__ = cljs.core.cst$kw$model_DASH_id.cljs$core$IFn$_invoke$arity$1(sel);
if(cljs.core.truth_(temp__4653__auto__)){
var model_id = temp__4653__auto__;
var out_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.into_journal,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["get-model",model_id,org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$2(out_c,true)], null));

var c__36154__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__36154__auto__,out_c,model_id,temp__4653__auto__,vec__64011,sel,show_predictions,selected_htm){
return (function (){
var f__36155__auto__ = (function (){var switch__36040__auto__ = ((function (c__36154__auto__,out_c,model_id,temp__4653__auto__,vec__64011,sel,show_predictions,selected_htm){
return (function (state_64016){
var state_val_64017 = (state_64016[(1)]);
if((state_val_64017 === (1))){
var state_64016__$1 = state_64016;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_64016__$1,(2),out_c);
} else {
if((state_val_64017 === (2))){
var inst_64013 = (state_64016[(2)]);
var inst_64014 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(selected_htm,inst_64013) : cljs.core.reset_BANG_.call(null,selected_htm,inst_64013));
var state_64016__$1 = state_64016;
return cljs.core.async.impl.ioc_helpers.return_chan(state_64016__$1,inst_64014);
} else {
return null;
}
}
});})(c__36154__auto__,out_c,model_id,temp__4653__auto__,vec__64011,sel,show_predictions,selected_htm))
;
return ((function (switch__36040__auto__,c__36154__auto__,out_c,model_id,temp__4653__auto__,vec__64011,sel,show_predictions,selected_htm){
return (function() {
var org$numenta$sanity$demos$simple_sentences$world_pane_$_state_machine__36041__auto__ = null;
var org$numenta$sanity$demos$simple_sentences$world_pane_$_state_machine__36041__auto____0 = (function (){
var statearr_64021 = [null,null,null,null,null,null,null];
(statearr_64021[(0)] = org$numenta$sanity$demos$simple_sentences$world_pane_$_state_machine__36041__auto__);

(statearr_64021[(1)] = (1));

return statearr_64021;
});
var org$numenta$sanity$demos$simple_sentences$world_pane_$_state_machine__36041__auto____1 = (function (state_64016){
while(true){
var ret_value__36042__auto__ = (function (){try{while(true){
var result__36043__auto__ = switch__36040__auto__(state_64016);
if(cljs.core.keyword_identical_QMARK_(result__36043__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__36043__auto__;
}
break;
}
}catch (e64022){if((e64022 instanceof Object)){
var ex__36044__auto__ = e64022;
var statearr_64023_64025 = state_64016;
(statearr_64023_64025[(5)] = ex__36044__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_64016);

return cljs.core.cst$kw$recur;
} else {
throw e64022;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__36042__auto__,cljs.core.cst$kw$recur)){
var G__64026 = state_64016;
state_64016 = G__64026;
continue;
} else {
return ret_value__36042__auto__;
}
break;
}
});
org$numenta$sanity$demos$simple_sentences$world_pane_$_state_machine__36041__auto__ = function(state_64016){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$simple_sentences$world_pane_$_state_machine__36041__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$simple_sentences$world_pane_$_state_machine__36041__auto____1.call(this,state_64016);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$simple_sentences$world_pane_$_state_machine__36041__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$simple_sentences$world_pane_$_state_machine__36041__auto____0;
org$numenta$sanity$demos$simple_sentences$world_pane_$_state_machine__36041__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$simple_sentences$world_pane_$_state_machine__36041__auto____1;
return org$numenta$sanity$demos$simple_sentences$world_pane_$_state_machine__36041__auto__;
})()
;})(switch__36040__auto__,c__36154__auto__,out_c,model_id,temp__4653__auto__,vec__64011,sel,show_predictions,selected_htm))
})();
var state__36156__auto__ = (function (){var statearr_64024 = (f__36155__auto__.cljs$core$IFn$_invoke$arity$0 ? f__36155__auto__.cljs$core$IFn$_invoke$arity$0() : f__36155__auto__.call(null));
(statearr_64024[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__36154__auto__);

return statearr_64024;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__36156__auto__);
});})(c__36154__auto__,out_c,model_id,temp__4653__auto__,vec__64011,sel,show_predictions,selected_htm))
);

return c__36154__auto__;
} else {
return null;
}
});})(show_predictions,selected_htm))
);

return ((function (show_predictions,selected_htm){
return (function (){
var temp__4653__auto__ = org.numenta.sanity.main.selected_step.cljs$core$IFn$_invoke$arity$0();
if(cljs.core.truth_(temp__4653__auto__)){
var step = temp__4653__auto__;
var temp__4653__auto____$1 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selected_htm) : cljs.core.deref.call(null,selected_htm));
if(cljs.core.truth_(temp__4653__auto____$1)){
var htm = temp__4653__auto____$1;
var inval = cljs.core.cst$kw$input_DASH_value.cljs$core$IFn$_invoke$arity$1(step);
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$muted,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,"Input on selected timestep."], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$min_DASH_height,"40vh"], null)], null),org.numenta.sanity.helpers.text_world_input_component(inval,htm,org.numenta.sanity.demos.simple_sentences.max_shown,org.numenta.sanity.demos.simple_sentences.scroll_every," ")], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$checkbox,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,cljs.core.cst$kw$checkbox,cljs.core.cst$kw$checked,(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(show_predictions) : cljs.core.deref.call(null,show_predictions)))?true:null),cljs.core.cst$kw$on_DASH_change,((function (inval,htm,temp__4653__auto____$1,step,temp__4653__auto__,show_predictions,selected_htm){
return (function (e){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(show_predictions,cljs.core.not);

return e.preventDefault();
});})(inval,htm,temp__4653__auto____$1,step,temp__4653__auto__,show_predictions,selected_htm))
], null)], null),"Compute predictions"], null)], null),(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(show_predictions) : cljs.core.deref.call(null,show_predictions)))?org.numenta.sanity.helpers.text_world_predictions_component(htm,(8)):null)], null);
} else {
return null;
}
} else {
return null;
}
});
;})(show_predictions,selected_htm))
});
org.numenta.sanity.demos.simple_sentences.set_model_BANG_ = (function org$numenta$sanity$demos$simple_sentences$set_model_BANG_(){
return org.numenta.sanity.helpers.with_ui_loading_message((function (){
var n_regions = cljs.core.cst$kw$n_DASH_regions.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.simple_sentences.config) : cljs.core.deref.call(null,org.numenta.sanity.demos.simple_sentences.config)));
var init_QMARK_ = ((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.simple_sentences.model) : cljs.core.deref.call(null,org.numenta.sanity.demos.simple_sentences.model)) == null);
var G__64031_64035 = org.numenta.sanity.demos.simple_sentences.model;
var G__64032_64036 = org.nfrac.comportex.demos.simple_sentences.n_region_model.cljs$core$IFn$_invoke$arity$2(n_regions,org.nfrac.comportex.demos.simple_sentences.spec);
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__64031_64035,G__64032_64036) : cljs.core.reset_BANG_.call(null,G__64031_64035,G__64032_64036));

if(init_QMARK_){
return org.numenta.sanity.bridge.browser.init.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.demos.simple_sentences.model,org.numenta.sanity.demos.simple_sentences.world_c,org.numenta.sanity.main.into_journal,org.numenta.sanity.demos.simple_sentences.into_sim);
} else {
var G__64033 = org.numenta.sanity.main.step_template;
var G__64034 = org.numenta.sanity.comportex.data.step_template_data((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.simple_sentences.model) : cljs.core.deref.call(null,org.numenta.sanity.demos.simple_sentences.model)));
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__64033,G__64034) : cljs.core.reset_BANG_.call(null,G__64033,G__64034));
}
}));
});
org.numenta.sanity.demos.simple_sentences.send_text_BANG_ = (function org$numenta$sanity$demos$simple_sentences$send_text_BANG_(){
var temp__4653__auto__ = cljs.core.seq(org.nfrac.comportex.demos.simple_sentences.word_item_seq(cljs.core.cst$kw$repeats.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.simple_sentences.config) : cljs.core.deref.call(null,org.numenta.sanity.demos.simple_sentences.config))),cljs.core.cst$kw$text.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.simple_sentences.config) : cljs.core.deref.call(null,org.numenta.sanity.demos.simple_sentences.config)))));
if(temp__4653__auto__){
var xs = temp__4653__auto__;
var c__36154__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__36154__auto__,xs,temp__4653__auto__){
return (function (){
var f__36155__auto__ = (function (){var switch__36040__auto__ = ((function (c__36154__auto__,xs,temp__4653__auto__){
return (function (state_64059){
var state_val_64060 = (state_64059[(1)]);
if((state_val_64060 === (1))){
var inst_64053 = cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3(org.numenta.sanity.demos.simple_sentences.world_c,xs,false);
var state_64059__$1 = state_64059;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_64059__$1,(2),inst_64053);
} else {
if((state_val_64060 === (2))){
var inst_64055 = (state_64059[(2)]);
var inst_64056 = cljs.core.count(org.numenta.sanity.demos.simple_sentences.world_buffer);
var inst_64057 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.demos.simple_sentences.config,cljs.core.assoc,cljs.core.cst$kw$world_DASH_buffer_DASH_count,inst_64056);
var state_64059__$1 = (function (){var statearr_64061 = state_64059;
(statearr_64061[(7)] = inst_64055);

return statearr_64061;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_64059__$1,inst_64057);
} else {
return null;
}
}
});})(c__36154__auto__,xs,temp__4653__auto__))
;
return ((function (switch__36040__auto__,c__36154__auto__,xs,temp__4653__auto__){
return (function() {
var org$numenta$sanity$demos$simple_sentences$send_text_BANG__$_state_machine__36041__auto__ = null;
var org$numenta$sanity$demos$simple_sentences$send_text_BANG__$_state_machine__36041__auto____0 = (function (){
var statearr_64065 = [null,null,null,null,null,null,null,null];
(statearr_64065[(0)] = org$numenta$sanity$demos$simple_sentences$send_text_BANG__$_state_machine__36041__auto__);

(statearr_64065[(1)] = (1));

return statearr_64065;
});
var org$numenta$sanity$demos$simple_sentences$send_text_BANG__$_state_machine__36041__auto____1 = (function (state_64059){
while(true){
var ret_value__36042__auto__ = (function (){try{while(true){
var result__36043__auto__ = switch__36040__auto__(state_64059);
if(cljs.core.keyword_identical_QMARK_(result__36043__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__36043__auto__;
}
break;
}
}catch (e64066){if((e64066 instanceof Object)){
var ex__36044__auto__ = e64066;
var statearr_64067_64069 = state_64059;
(statearr_64067_64069[(5)] = ex__36044__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_64059);

return cljs.core.cst$kw$recur;
} else {
throw e64066;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__36042__auto__,cljs.core.cst$kw$recur)){
var G__64070 = state_64059;
state_64059 = G__64070;
continue;
} else {
return ret_value__36042__auto__;
}
break;
}
});
org$numenta$sanity$demos$simple_sentences$send_text_BANG__$_state_machine__36041__auto__ = function(state_64059){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$simple_sentences$send_text_BANG__$_state_machine__36041__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$simple_sentences$send_text_BANG__$_state_machine__36041__auto____1.call(this,state_64059);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$simple_sentences$send_text_BANG__$_state_machine__36041__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$simple_sentences$send_text_BANG__$_state_machine__36041__auto____0;
org$numenta$sanity$demos$simple_sentences$send_text_BANG__$_state_machine__36041__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$simple_sentences$send_text_BANG__$_state_machine__36041__auto____1;
return org$numenta$sanity$demos$simple_sentences$send_text_BANG__$_state_machine__36041__auto__;
})()
;})(switch__36040__auto__,c__36154__auto__,xs,temp__4653__auto__))
})();
var state__36156__auto__ = (function (){var statearr_64068 = (f__36155__auto__.cljs$core$IFn$_invoke$arity$0 ? f__36155__auto__.cljs$core$IFn$_invoke$arity$0() : f__36155__auto__.call(null));
(statearr_64068[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__36154__auto__);

return statearr_64068;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__36156__auto__);
});})(c__36154__auto__,xs,temp__4653__auto__))
);

return c__36154__auto__;
} else {
return null;
}
});
org.numenta.sanity.demos.simple_sentences.config_template = new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h3,"Input ",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,"Word sequences"], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_info,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$field,cljs.core.cst$kw$label,cljs.core.cst$kw$id,cljs.core.cst$kw$world_DASH_buffer_DASH_count,cljs.core.cst$kw$postamble," queued input values."], null)], null)," ",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$field,cljs.core.cst$kw$container,cljs.core.cst$kw$visible_QMARK_,(function (p1__64071_SHARP_){
return (cljs.core.cst$kw$world_DASH_buffer_DASH_count.cljs$core$IFn$_invoke$arity$1(p1__64071_SHARP_) > (0));
})], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_warning$btn_DASH_xs,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$on_DASH_click,(function (e){
var c__36154__auto___64114 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__36154__auto___64114){
return (function (){
var f__36155__auto__ = (function (){var switch__36040__auto__ = ((function (c__36154__auto___64114){
return (function (state_64093){
var state_val_64094 = (state_64093[(1)]);
if((state_val_64094 === (7))){
var inst_64079 = (state_64093[(2)]);
var state_64093__$1 = state_64093;
var statearr_64095_64115 = state_64093__$1;
(statearr_64095_64115[(2)] = inst_64079);

(statearr_64095_64115[(1)] = (6));


return cljs.core.cst$kw$recur;
} else {
if((state_val_64094 === (1))){
var state_64093__$1 = state_64093;
var statearr_64096_64116 = state_64093__$1;
(statearr_64096_64116[(2)] = null);

(statearr_64096_64116[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_64094 === (4))){
var state_64093__$1 = state_64093;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_64093__$1,(7),org.numenta.sanity.demos.simple_sentences.world_c);
} else {
if((state_val_64094 === (6))){
var inst_64082 = (state_64093[(2)]);
var state_64093__$1 = state_64093;
if(cljs.core.truth_(inst_64082)){
var statearr_64097_64117 = state_64093__$1;
(statearr_64097_64117[(1)] = (8));

} else {
var statearr_64098_64118 = state_64093__$1;
(statearr_64098_64118[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_64094 === (3))){
var inst_64091 = (state_64093[(2)]);
var state_64093__$1 = state_64093;
return cljs.core.async.impl.ioc_helpers.return_chan(state_64093__$1,inst_64091);
} else {
if((state_val_64094 === (2))){
var inst_64076 = (state_64093[(7)]);
var inst_64075 = cljs.core.count(org.numenta.sanity.demos.simple_sentences.world_buffer);
var inst_64076__$1 = (inst_64075 > (0));
var state_64093__$1 = (function (){var statearr_64099 = state_64093;
(statearr_64099[(7)] = inst_64076__$1);

return statearr_64099;
})();
if(cljs.core.truth_(inst_64076__$1)){
var statearr_64100_64119 = state_64093__$1;
(statearr_64100_64119[(1)] = (4));

} else {
var statearr_64101_64120 = state_64093__$1;
(statearr_64101_64120[(1)] = (5));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_64094 === (9))){
var state_64093__$1 = state_64093;
var statearr_64102_64121 = state_64093__$1;
(statearr_64102_64121[(2)] = null);

(statearr_64102_64121[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_64094 === (5))){
var inst_64076 = (state_64093[(7)]);
var state_64093__$1 = state_64093;
var statearr_64103_64122 = state_64093__$1;
(statearr_64103_64122[(2)] = inst_64076);

(statearr_64103_64122[(1)] = (6));


return cljs.core.cst$kw$recur;
} else {
if((state_val_64094 === (10))){
var inst_64089 = (state_64093[(2)]);
var state_64093__$1 = state_64093;
var statearr_64104_64123 = state_64093__$1;
(statearr_64104_64123[(2)] = inst_64089);

(statearr_64104_64123[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_64094 === (8))){
var inst_64084 = cljs.core.count(org.numenta.sanity.demos.simple_sentences.world_buffer);
var inst_64085 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.demos.simple_sentences.config,cljs.core.assoc,cljs.core.cst$kw$world_DASH_buffer_DASH_count,inst_64084);
var state_64093__$1 = (function (){var statearr_64105 = state_64093;
(statearr_64105[(8)] = inst_64085);

return statearr_64105;
})();
var statearr_64106_64124 = state_64093__$1;
(statearr_64106_64124[(2)] = null);

(statearr_64106_64124[(1)] = (2));


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
});})(c__36154__auto___64114))
;
return ((function (switch__36040__auto__,c__36154__auto___64114){
return (function() {
var org$numenta$sanity$demos$simple_sentences$state_machine__36041__auto__ = null;
var org$numenta$sanity$demos$simple_sentences$state_machine__36041__auto____0 = (function (){
var statearr_64110 = [null,null,null,null,null,null,null,null,null];
(statearr_64110[(0)] = org$numenta$sanity$demos$simple_sentences$state_machine__36041__auto__);

(statearr_64110[(1)] = (1));

return statearr_64110;
});
var org$numenta$sanity$demos$simple_sentences$state_machine__36041__auto____1 = (function (state_64093){
while(true){
var ret_value__36042__auto__ = (function (){try{while(true){
var result__36043__auto__ = switch__36040__auto__(state_64093);
if(cljs.core.keyword_identical_QMARK_(result__36043__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__36043__auto__;
}
break;
}
}catch (e64111){if((e64111 instanceof Object)){
var ex__36044__auto__ = e64111;
var statearr_64112_64125 = state_64093;
(statearr_64112_64125[(5)] = ex__36044__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_64093);

return cljs.core.cst$kw$recur;
} else {
throw e64111;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__36042__auto__,cljs.core.cst$kw$recur)){
var G__64126 = state_64093;
state_64093 = G__64126;
continue;
} else {
return ret_value__36042__auto__;
}
break;
}
});
org$numenta$sanity$demos$simple_sentences$state_machine__36041__auto__ = function(state_64093){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$simple_sentences$state_machine__36041__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$simple_sentences$state_machine__36041__auto____1.call(this,state_64093);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$simple_sentences$state_machine__36041__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$simple_sentences$state_machine__36041__auto____0;
org$numenta$sanity$demos$simple_sentences$state_machine__36041__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$simple_sentences$state_machine__36041__auto____1;
return org$numenta$sanity$demos$simple_sentences$state_machine__36041__auto__;
})()
;})(switch__36040__auto__,c__36154__auto___64114))
})();
var state__36156__auto__ = (function (){var statearr_64113 = (f__36155__auto__.cljs$core$IFn$_invoke$arity$0 ? f__36155__auto__.cljs$core$IFn$_invoke$arity$0() : f__36155__auto__.call(null));
(statearr_64113[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__36154__auto___64114);

return statearr_64113;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__36156__auto__);
});})(c__36154__auto___64114))
);


return e.preventDefault();
})], null),"Clear"], null)], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_horizontal,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label$col_DASH_sm_DASH_5,"Repeats of each sentence:"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_7,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input$form_DASH_control,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$field,cljs.core.cst$kw$numeric,cljs.core.cst$kw$id,cljs.core.cst$kw$repeats], null)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_12,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$textarea$form_DASH_control,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$field,cljs.core.cst$kw$textarea,cljs.core.cst$kw$id,cljs.core.cst$kw$text,cljs.core.cst$kw$rows,(10)], null)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_8,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_primary,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$field,cljs.core.cst$kw$container,cljs.core.cst$kw$visible_QMARK_,(function (p1__64072_SHARP_){
return (cljs.core.cst$kw$world_DASH_buffer_DASH_count.cljs$core$IFn$_invoke$arity$1(p1__64072_SHARP_) === (0));
}),cljs.core.cst$kw$on_DASH_click,(function (e){
org.numenta.sanity.demos.simple_sentences.send_text_BANG_();

return e.preventDefault();
})], null),"Queue text input"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_default,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$field,cljs.core.cst$kw$container,cljs.core.cst$kw$visible_QMARK_,(function (p1__64073_SHARP_){
return (cljs.core.cst$kw$world_DASH_buffer_DASH_count.cljs$core$IFn$_invoke$arity$1(p1__64073_SHARP_) > (0));
}),cljs.core.cst$kw$on_DASH_click,(function (e){
org.numenta.sanity.demos.simple_sentences.send_text_BANG_();

return e.preventDefault();
})], null),"Queue more text input"], null)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h3,"HTM model"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_horizontal,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label$col_DASH_sm_DASH_5,"Number of regions:"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_7,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input$form_DASH_control,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$field,cljs.core.cst$kw$numeric,cljs.core.cst$kw$id,cljs.core.cst$kw$n_DASH_regions], null)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_offset_DASH_5$col_DASH_sm_DASH_7,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_default,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$on_DASH_click,(function (e){
org.numenta.sanity.demos.simple_sentences.set_model_BANG_();

return e.preventDefault();
})], null),"Restart with new model"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_danger,"This resets all parameters."], null)], null)], null)], null)], null);
org.numenta.sanity.demos.simple_sentences.model_tab = (function org$numenta$sanity$demos$simple_sentences$model_tab(){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"In this example, text is presented as a sequence of words,\n        with independent unique encodings. The text is split into\n        sentences at each period (.) and each sentence into\n        words."], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_forms.core.bind_fields,org.numenta.sanity.demos.simple_sentences.config_template,org.numenta.sanity.demos.simple_sentences.config], null)], null);
});
org.numenta.sanity.demos.simple_sentences.init = (function org$numenta$sanity$demos$simple_sentences$init(){
reagent.core.render.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.main.sanity_app,"Comportex",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.simple_sentences.model_tab], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.simple_sentences.world_pane], null),org.numenta.sanity.demos.comportex_common.all_features,org.numenta.sanity.demos.simple_sentences.into_sim], null),goog.dom.getElement("sanity-app"));

org.numenta.sanity.demos.simple_sentences.send_text_BANG_();

return org.numenta.sanity.demos.simple_sentences.set_model_BANG_();
});
goog.exportSymbol('org.numenta.sanity.demos.simple_sentences.init', org.numenta.sanity.demos.simple_sentences.init);
