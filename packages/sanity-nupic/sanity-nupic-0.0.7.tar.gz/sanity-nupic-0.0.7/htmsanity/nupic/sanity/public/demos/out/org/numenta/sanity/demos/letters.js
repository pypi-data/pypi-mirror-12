// Compiled by ClojureScript 1.7.170 {:static-fns true, :optimize-constants true}
goog.provide('org.numenta.sanity.demos.letters');
goog.require('cljs.core');
goog.require('goog.dom.forms');
goog.require('goog.dom');
goog.require('reagent.core');
goog.require('org.numenta.sanity.helpers');
goog.require('org.numenta.sanity.util');
goog.require('org.numenta.sanity.main');
goog.require('org.nfrac.comportex.demos.letters');
goog.require('org.numenta.sanity.comportex.data');
goog.require('cljs.core.async');
goog.require('org.numenta.sanity.bridge.marshalling');
goog.require('reagent_forms.core');
goog.require('org.nfrac.comportex.core');
goog.require('org.numenta.sanity.bridge.browser');
goog.require('org.numenta.sanity.demos.comportex_common');
goog.require('org.nfrac.comportex.util');
org.numenta.sanity.demos.letters.config = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$n_DASH_regions,(1),cljs.core.cst$kw$world_DASH_buffer_DASH_count,(0)], null));
org.numenta.sanity.demos.letters.world_buffer = cljs.core.async.buffer((5000));
org.numenta.sanity.demos.letters.world_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.demos.letters.world_buffer,cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.map.cljs$core$IFn$_invoke$arity$1(org.nfrac.comportex.util.keep_history_middleware((300),cljs.core.cst$kw$value,cljs.core.cst$kw$history)),cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (p1__65227_SHARP_){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__65227_SHARP_,cljs.core.cst$kw$label,cljs.core.cst$kw$value.cljs$core$IFn$_invoke$arity$1(p1__65227_SHARP_));
}))));
org.numenta.sanity.demos.letters.model = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
org.numenta.sanity.demos.letters.into_sim = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
cljs.core.add_watch(org.numenta.sanity.demos.letters.model,cljs.core.cst$kw$org$numenta$sanity$demos$letters_SLASH_count_DASH_world_DASH_buffer,(function (_,___$1,___$2,___$3){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.demos.letters.config,cljs.core.assoc,cljs.core.cst$kw$world_DASH_buffer_DASH_count,cljs.core.count(org.numenta.sanity.demos.letters.world_buffer));
}));
org.numenta.sanity.demos.letters.text_to_send = reagent.core.atom.cljs$core$IFn$_invoke$arity$1("Jane has eyes.\nJane has a head.\nJane has a mouth.\nJane has a brain.\nJane has a book.\nJane has no friend.\n\nChifung has eyes.\nChifung has a head.\nChifung has a mouth.\nChifung has a brain.\nChifung has no book.\nChifung has a friend.");
org.numenta.sanity.demos.letters.max_shown = (300);
org.numenta.sanity.demos.letters.scroll_every = (150);
org.numenta.sanity.demos.letters.world_pane = (function org$numenta$sanity$demos$letters$world_pane(){
var show_predictions = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(false);
var selected_htm = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
cljs.core.add_watch(org.numenta.sanity.main.selection,cljs.core.cst$kw$org$numenta$sanity$demos$letters_SLASH_fetch_DASH_selected_DASH_htm,((function (show_predictions,selected_htm){
return (function (_,___$1,___$2,p__65243){
var vec__65244 = p__65243;
var sel = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65244,(0),null);
var temp__4653__auto__ = cljs.core.cst$kw$model_DASH_id.cljs$core$IFn$_invoke$arity$1(sel);
if(cljs.core.truth_(temp__4653__auto__)){
var model_id = temp__4653__auto__;
var out_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.into_journal,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["get-model",model_id,org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$2(out_c,true)], null));

var c__35961__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__35961__auto__,out_c,model_id,temp__4653__auto__,vec__65244,sel,show_predictions,selected_htm){
return (function (){
var f__35962__auto__ = (function (){var switch__35847__auto__ = ((function (c__35961__auto__,out_c,model_id,temp__4653__auto__,vec__65244,sel,show_predictions,selected_htm){
return (function (state_65249){
var state_val_65250 = (state_65249[(1)]);
if((state_val_65250 === (1))){
var state_65249__$1 = state_65249;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_65249__$1,(2),out_c);
} else {
if((state_val_65250 === (2))){
var inst_65246 = (state_65249[(2)]);
var inst_65247 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(selected_htm,inst_65246) : cljs.core.reset_BANG_.call(null,selected_htm,inst_65246));
var state_65249__$1 = state_65249;
return cljs.core.async.impl.ioc_helpers.return_chan(state_65249__$1,inst_65247);
} else {
return null;
}
}
});})(c__35961__auto__,out_c,model_id,temp__4653__auto__,vec__65244,sel,show_predictions,selected_htm))
;
return ((function (switch__35847__auto__,c__35961__auto__,out_c,model_id,temp__4653__auto__,vec__65244,sel,show_predictions,selected_htm){
return (function() {
var org$numenta$sanity$demos$letters$world_pane_$_state_machine__35848__auto__ = null;
var org$numenta$sanity$demos$letters$world_pane_$_state_machine__35848__auto____0 = (function (){
var statearr_65254 = [null,null,null,null,null,null,null];
(statearr_65254[(0)] = org$numenta$sanity$demos$letters$world_pane_$_state_machine__35848__auto__);

(statearr_65254[(1)] = (1));

return statearr_65254;
});
var org$numenta$sanity$demos$letters$world_pane_$_state_machine__35848__auto____1 = (function (state_65249){
while(true){
var ret_value__35849__auto__ = (function (){try{while(true){
var result__35850__auto__ = switch__35847__auto__(state_65249);
if(cljs.core.keyword_identical_QMARK_(result__35850__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__35850__auto__;
}
break;
}
}catch (e65255){if((e65255 instanceof Object)){
var ex__35851__auto__ = e65255;
var statearr_65256_65258 = state_65249;
(statearr_65256_65258[(5)] = ex__35851__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_65249);

return cljs.core.cst$kw$recur;
} else {
throw e65255;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35849__auto__,cljs.core.cst$kw$recur)){
var G__65259 = state_65249;
state_65249 = G__65259;
continue;
} else {
return ret_value__35849__auto__;
}
break;
}
});
org$numenta$sanity$demos$letters$world_pane_$_state_machine__35848__auto__ = function(state_65249){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$letters$world_pane_$_state_machine__35848__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$letters$world_pane_$_state_machine__35848__auto____1.call(this,state_65249);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$letters$world_pane_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$letters$world_pane_$_state_machine__35848__auto____0;
org$numenta$sanity$demos$letters$world_pane_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$letters$world_pane_$_state_machine__35848__auto____1;
return org$numenta$sanity$demos$letters$world_pane_$_state_machine__35848__auto__;
})()
;})(switch__35847__auto__,c__35961__auto__,out_c,model_id,temp__4653__auto__,vec__65244,sel,show_predictions,selected_htm))
})();
var state__35963__auto__ = (function (){var statearr_65257 = (f__35962__auto__.cljs$core$IFn$_invoke$arity$0 ? f__35962__auto__.cljs$core$IFn$_invoke$arity$0() : f__35962__auto__.call(null));
(statearr_65257[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__35961__auto__);

return statearr_65257;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__35963__auto__);
});})(c__35961__auto__,out_c,model_id,temp__4653__auto__,vec__65244,sel,show_predictions,selected_htm))
);

return c__35961__auto__;
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
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$muted,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,"Input on selected timestep."], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$min_DASH_height,"40vh"], null)], null),org.numenta.sanity.helpers.text_world_input_component(inval,htm,org.numenta.sanity.demos.letters.max_shown,org.numenta.sanity.demos.letters.scroll_every,"")], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$checkbox,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,cljs.core.cst$kw$checkbox,cljs.core.cst$kw$checked,(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(show_predictions) : cljs.core.deref.call(null,show_predictions)))?true:null),cljs.core.cst$kw$on_DASH_change,((function (inval,htm,temp__4653__auto____$1,step,temp__4653__auto__,show_predictions,selected_htm){
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
org.numenta.sanity.demos.letters.set_model_BANG_ = (function org$numenta$sanity$demos$letters$set_model_BANG_(){
return org.numenta.sanity.helpers.with_ui_loading_message((function (){
var n_regions = cljs.core.cst$kw$n_DASH_regions.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.letters.config) : cljs.core.deref.call(null,org.numenta.sanity.demos.letters.config)));
var init_QMARK_ = ((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.letters.model) : cljs.core.deref.call(null,org.numenta.sanity.demos.letters.model)) == null);
var G__65264_65268 = org.numenta.sanity.demos.letters.model;
var G__65265_65269 = org.nfrac.comportex.demos.letters.n_region_model.cljs$core$IFn$_invoke$arity$2(n_regions,org.nfrac.comportex.demos.letters.spec);
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__65264_65268,G__65265_65269) : cljs.core.reset_BANG_.call(null,G__65264_65268,G__65265_65269));

if(init_QMARK_){
return org.numenta.sanity.bridge.browser.init.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.demos.letters.model,org.numenta.sanity.demos.letters.world_c,org.numenta.sanity.main.into_journal,org.numenta.sanity.demos.letters.into_sim);
} else {
var G__65266 = org.numenta.sanity.main.step_template;
var G__65267 = org.numenta.sanity.comportex.data.step_template_data((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.letters.model) : cljs.core.deref.call(null,org.numenta.sanity.demos.letters.model)));
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__65266,G__65267) : cljs.core.reset_BANG_.call(null,G__65266,G__65267));
}
}));
});
org.numenta.sanity.demos.letters.immediate_key_down_BANG_ = (function org$numenta$sanity$demos$letters$immediate_key_down_BANG_(e){
var temp__4653__auto___65272 = cljs.core.seq(org.nfrac.comportex.demos.letters.clean_text(String.fromCharCode(e.charCode)));
if(temp__4653__auto___65272){
var vec__65271_65273 = temp__4653__auto___65272;
var x_65274 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65271_65273,(0),null);
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.demos.letters.world_c,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$value,[cljs.core.str(x_65274)].join('')], null));
} else {
}

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.demos.letters.config,cljs.core.assoc,cljs.core.cst$kw$world_DASH_buffer_DASH_count,cljs.core.count(org.numenta.sanity.demos.letters.world_buffer));
});
org.numenta.sanity.demos.letters.send_text_BANG_ = (function org$numenta$sanity$demos$letters$send_text_BANG_(){
var temp__4653__auto__ = cljs.core.seq(org.nfrac.comportex.demos.letters.clean_text((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.letters.text_to_send) : cljs.core.deref.call(null,org.numenta.sanity.demos.letters.text_to_send))));
if(temp__4653__auto__){
var xs = temp__4653__auto__;
var c__35961__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__35961__auto__,xs,temp__4653__auto__){
return (function (){
var f__35962__auto__ = (function (){var switch__35847__auto__ = ((function (c__35961__auto__,xs,temp__4653__auto__){
return (function (state_65311){
var state_val_65312 = (state_65311[(1)]);
if((state_val_65312 === (1))){
var inst_65303 = (function (){return ((function (state_val_65312,c__35961__auto__,xs,temp__4653__auto__){
return (function org$numenta$sanity$demos$letters$send_text_BANG__$_iter__65299(s__65300){
return (new cljs.core.LazySeq(null,((function (state_val_65312,c__35961__auto__,xs,temp__4653__auto__){
return (function (){
var s__65300__$1 = s__65300;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__65300__$1);
if(temp__4653__auto____$1){
var s__65300__$2 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__65300__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__65300__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__65302 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__65301 = (0);
while(true){
if((i__65301 < size__5453__auto__)){
var x = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__65301);
cljs.core.chunk_append(b__65302,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$value,[cljs.core.str(x)].join('')], null));

var G__65323 = (i__65301 + (1));
i__65301 = G__65323;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__65302),org$numenta$sanity$demos$letters$send_text_BANG__$_iter__65299(cljs.core.chunk_rest(s__65300__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__65302),null);
}
} else {
var x = cljs.core.first(s__65300__$2);
return cljs.core.cons(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$value,[cljs.core.str(x)].join('')], null),org$numenta$sanity$demos$letters$send_text_BANG__$_iter__65299(cljs.core.rest(s__65300__$2)));
}
} else {
return null;
}
break;
}
});})(state_val_65312,c__35961__auto__,xs,temp__4653__auto__))
,null,null));
});
;})(state_val_65312,c__35961__auto__,xs,temp__4653__auto__))
})();
var inst_65304 = (inst_65303.cljs$core$IFn$_invoke$arity$1 ? inst_65303.cljs$core$IFn$_invoke$arity$1(xs) : inst_65303.call(null,xs));
var inst_65305 = cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3(org.numenta.sanity.demos.letters.world_c,inst_65304,false);
var state_65311__$1 = state_65311;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_65311__$1,(2),inst_65305);
} else {
if((state_val_65312 === (2))){
var inst_65307 = (state_65311[(2)]);
var inst_65308 = cljs.core.count(org.numenta.sanity.demos.letters.world_buffer);
var inst_65309 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.demos.letters.config,cljs.core.assoc,cljs.core.cst$kw$world_DASH_buffer_DASH_count,inst_65308);
var state_65311__$1 = (function (){var statearr_65315 = state_65311;
(statearr_65315[(7)] = inst_65307);

return statearr_65315;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_65311__$1,inst_65309);
} else {
return null;
}
}
});})(c__35961__auto__,xs,temp__4653__auto__))
;
return ((function (switch__35847__auto__,c__35961__auto__,xs,temp__4653__auto__){
return (function() {
var org$numenta$sanity$demos$letters$send_text_BANG__$_state_machine__35848__auto__ = null;
var org$numenta$sanity$demos$letters$send_text_BANG__$_state_machine__35848__auto____0 = (function (){
var statearr_65319 = [null,null,null,null,null,null,null,null];
(statearr_65319[(0)] = org$numenta$sanity$demos$letters$send_text_BANG__$_state_machine__35848__auto__);

(statearr_65319[(1)] = (1));

return statearr_65319;
});
var org$numenta$sanity$demos$letters$send_text_BANG__$_state_machine__35848__auto____1 = (function (state_65311){
while(true){
var ret_value__35849__auto__ = (function (){try{while(true){
var result__35850__auto__ = switch__35847__auto__(state_65311);
if(cljs.core.keyword_identical_QMARK_(result__35850__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__35850__auto__;
}
break;
}
}catch (e65320){if((e65320 instanceof Object)){
var ex__35851__auto__ = e65320;
var statearr_65321_65324 = state_65311;
(statearr_65321_65324[(5)] = ex__35851__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_65311);

return cljs.core.cst$kw$recur;
} else {
throw e65320;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35849__auto__,cljs.core.cst$kw$recur)){
var G__65325 = state_65311;
state_65311 = G__65325;
continue;
} else {
return ret_value__35849__auto__;
}
break;
}
});
org$numenta$sanity$demos$letters$send_text_BANG__$_state_machine__35848__auto__ = function(state_65311){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$letters$send_text_BANG__$_state_machine__35848__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$letters$send_text_BANG__$_state_machine__35848__auto____1.call(this,state_65311);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$letters$send_text_BANG__$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$letters$send_text_BANG__$_state_machine__35848__auto____0;
org$numenta$sanity$demos$letters$send_text_BANG__$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$letters$send_text_BANG__$_state_machine__35848__auto____1;
return org$numenta$sanity$demos$letters$send_text_BANG__$_state_machine__35848__auto__;
})()
;})(switch__35847__auto__,c__35961__auto__,xs,temp__4653__auto__))
})();
var state__35963__auto__ = (function (){var statearr_65322 = (f__35962__auto__.cljs$core$IFn$_invoke$arity$0 ? f__35962__auto__.cljs$core$IFn$_invoke$arity$0() : f__35962__auto__.call(null));
(statearr_65322[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__35961__auto__);

return statearr_65322;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__35963__auto__);
});})(c__35961__auto__,xs,temp__4653__auto__))
);

return c__35961__auto__;
} else {
return null;
}
});
org.numenta.sanity.demos.letters.config_template = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_horizontal,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label$col_DASH_sm_DASH_5,"Number of regions:"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_7,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input$form_DASH_control,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$field,cljs.core.cst$kw$numeric,cljs.core.cst$kw$id,cljs.core.cst$kw$n_DASH_regions], null)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_offset_DASH_5$col_DASH_sm_DASH_7,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_default,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$on_DASH_click,(function (e){
org.numenta.sanity.demos.letters.set_model_BANG_();

return e.preventDefault();
})], null),"Restart with new model"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_danger,"This resets all parameters."], null)], null)], null)], null);
org.numenta.sanity.demos.letters.model_tab = (function org$numenta$sanity$demos$letters$model_tab(){
return new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"In this example, text input is presented as a sequence of\n        letters, with independent unique encodings. It is transformed\n        to lower case, and all whitespace is squashed into single\n        spaces."], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h3,"Input ",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,"Letter sequences"], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_info,[cljs.core.str(cljs.core.cst$kw$world_DASH_buffer_DASH_count.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.letters.config) : cljs.core.deref.call(null,org.numenta.sanity.demos.letters.config)))),cljs.core.str(" queued input values.")].join('')," ",(((cljs.core.cst$kw$world_DASH_buffer_DASH_count.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.letters.config) : cljs.core.deref.call(null,org.numenta.sanity.demos.letters.config))) > (0)))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_warning$btn_DASH_xs,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$on_DASH_click,(function (e){
var c__35961__auto___65414 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__35961__auto___65414){
return (function (){
var f__35962__auto__ = (function (){var switch__35847__auto__ = ((function (c__35961__auto___65414){
return (function (state_65389){
var state_val_65390 = (state_65389[(1)]);
if((state_val_65390 === (7))){
var inst_65375 = (state_65389[(2)]);
var state_65389__$1 = state_65389;
var statearr_65391_65415 = state_65389__$1;
(statearr_65391_65415[(2)] = inst_65375);

(statearr_65391_65415[(1)] = (6));


return cljs.core.cst$kw$recur;
} else {
if((state_val_65390 === (1))){
var state_65389__$1 = state_65389;
var statearr_65392_65416 = state_65389__$1;
(statearr_65392_65416[(2)] = null);

(statearr_65392_65416[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_65390 === (4))){
var state_65389__$1 = state_65389;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_65389__$1,(7),org.numenta.sanity.demos.letters.world_c);
} else {
if((state_val_65390 === (6))){
var inst_65378 = (state_65389[(2)]);
var state_65389__$1 = state_65389;
if(cljs.core.truth_(inst_65378)){
var statearr_65393_65417 = state_65389__$1;
(statearr_65393_65417[(1)] = (8));

} else {
var statearr_65394_65418 = state_65389__$1;
(statearr_65394_65418[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_65390 === (3))){
var inst_65387 = (state_65389[(2)]);
var state_65389__$1 = state_65389;
return cljs.core.async.impl.ioc_helpers.return_chan(state_65389__$1,inst_65387);
} else {
if((state_val_65390 === (2))){
var inst_65372 = (state_65389[(7)]);
var inst_65371 = cljs.core.count(org.numenta.sanity.demos.letters.world_buffer);
var inst_65372__$1 = (inst_65371 > (0));
var state_65389__$1 = (function (){var statearr_65395 = state_65389;
(statearr_65395[(7)] = inst_65372__$1);

return statearr_65395;
})();
if(cljs.core.truth_(inst_65372__$1)){
var statearr_65396_65419 = state_65389__$1;
(statearr_65396_65419[(1)] = (4));

} else {
var statearr_65397_65420 = state_65389__$1;
(statearr_65397_65420[(1)] = (5));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_65390 === (9))){
var state_65389__$1 = state_65389;
var statearr_65398_65421 = state_65389__$1;
(statearr_65398_65421[(2)] = null);

(statearr_65398_65421[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_65390 === (5))){
var inst_65372 = (state_65389[(7)]);
var state_65389__$1 = state_65389;
var statearr_65399_65422 = state_65389__$1;
(statearr_65399_65422[(2)] = inst_65372);

(statearr_65399_65422[(1)] = (6));


return cljs.core.cst$kw$recur;
} else {
if((state_val_65390 === (10))){
var inst_65385 = (state_65389[(2)]);
var state_65389__$1 = state_65389;
var statearr_65400_65423 = state_65389__$1;
(statearr_65400_65423[(2)] = inst_65385);

(statearr_65400_65423[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_65390 === (8))){
var inst_65380 = cljs.core.count(org.numenta.sanity.demos.letters.world_buffer);
var inst_65381 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.demos.letters.config,cljs.core.assoc,cljs.core.cst$kw$world_DASH_buffer_DASH_count,inst_65380);
var state_65389__$1 = (function (){var statearr_65401 = state_65389;
(statearr_65401[(8)] = inst_65381);

return statearr_65401;
})();
var statearr_65402_65424 = state_65389__$1;
(statearr_65402_65424[(2)] = null);

(statearr_65402_65424[(1)] = (2));


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
});})(c__35961__auto___65414))
;
return ((function (switch__35847__auto__,c__35961__auto___65414){
return (function() {
var org$numenta$sanity$demos$letters$model_tab_$_state_machine__35848__auto__ = null;
var org$numenta$sanity$demos$letters$model_tab_$_state_machine__35848__auto____0 = (function (){
var statearr_65406 = [null,null,null,null,null,null,null,null,null];
(statearr_65406[(0)] = org$numenta$sanity$demos$letters$model_tab_$_state_machine__35848__auto__);

(statearr_65406[(1)] = (1));

return statearr_65406;
});
var org$numenta$sanity$demos$letters$model_tab_$_state_machine__35848__auto____1 = (function (state_65389){
while(true){
var ret_value__35849__auto__ = (function (){try{while(true){
var result__35850__auto__ = switch__35847__auto__(state_65389);
if(cljs.core.keyword_identical_QMARK_(result__35850__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__35850__auto__;
}
break;
}
}catch (e65407){if((e65407 instanceof Object)){
var ex__35851__auto__ = e65407;
var statearr_65408_65425 = state_65389;
(statearr_65408_65425[(5)] = ex__35851__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_65389);

return cljs.core.cst$kw$recur;
} else {
throw e65407;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35849__auto__,cljs.core.cst$kw$recur)){
var G__65426 = state_65389;
state_65389 = G__65426;
continue;
} else {
return ret_value__35849__auto__;
}
break;
}
});
org$numenta$sanity$demos$letters$model_tab_$_state_machine__35848__auto__ = function(state_65389){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$letters$model_tab_$_state_machine__35848__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$letters$model_tab_$_state_machine__35848__auto____1.call(this,state_65389);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$letters$model_tab_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$letters$model_tab_$_state_machine__35848__auto____0;
org$numenta$sanity$demos$letters$model_tab_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$letters$model_tab_$_state_machine__35848__auto____1;
return org$numenta$sanity$demos$letters$model_tab_$_state_machine__35848__auto__;
})()
;})(switch__35847__auto__,c__35961__auto___65414))
})();
var state__35963__auto__ = (function (){var statearr_65409 = (f__35962__auto__.cljs$core$IFn$_invoke$arity$0 ? f__35962__auto__.cljs$core$IFn$_invoke$arity$0() : f__35962__auto__.call(null));
(statearr_65409[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__35961__auto___65414);

return statearr_65409;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__35963__auto__);
});})(c__35961__auto___65414))
);


return e.preventDefault();
})], null),"Clear"], null):null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$well,"Immediate input as you type: ",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$size,(2),cljs.core.cst$kw$maxLength,(1),cljs.core.cst$kw$on_DASH_key_DASH_press,(function (e){
org.numenta.sanity.demos.letters.immediate_key_down_BANG_(e);

return e.preventDefault();
})], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$well,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$textarea,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$width,"90%",cljs.core.cst$kw$height,"10em"], null),cljs.core.cst$kw$value,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.letters.text_to_send) : cljs.core.deref.call(null,org.numenta.sanity.demos.letters.text_to_send)),cljs.core.cst$kw$on_DASH_change,(function (e){
var G__65411_65427 = org.numenta.sanity.demos.letters.text_to_send;
var G__65412_65428 = (function (){var G__65413 = e.target;
return goog.dom.forms.getValue(G__65413);
})();
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__65411_65427,G__65412_65428) : cljs.core.reset_BANG_.call(null,G__65411_65427,G__65412_65428));

return e.preventDefault();
})], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$class,(((cljs.core.count(org.numenta.sanity.demos.letters.world_buffer) > (0)))?"btn-default":"btn-primary"),cljs.core.cst$kw$on_DASH_click,(function (e){
org.numenta.sanity.demos.letters.send_text_BANG_();

return e.preventDefault();
})], null),(((cljs.core.count(org.numenta.sanity.demos.letters.world_buffer) > (0)))?"Queue more text input":"Queue text input")], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h3,"HTM model"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_forms.core.bind_fields,org.numenta.sanity.demos.letters.config_template,org.numenta.sanity.demos.letters.config], null)], null);
});
org.numenta.sanity.demos.letters.init = (function org$numenta$sanity$demos$letters$init(){
reagent.core.render.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.main.sanity_app,"Comportex",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.letters.model_tab], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.letters.world_pane], null),org.numenta.sanity.demos.comportex_common.all_features,org.numenta.sanity.demos.letters.into_sim], null),goog.dom.getElement("sanity-app"));

org.numenta.sanity.demos.letters.send_text_BANG_();

return org.numenta.sanity.demos.letters.set_model_BANG_();
});
goog.exportSymbol('org.numenta.sanity.demos.letters.init', org.numenta.sanity.demos.letters.init);
