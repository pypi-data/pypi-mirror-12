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
org.numenta.sanity.demos.letters.world_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.demos.letters.world_buffer,cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.map.cljs$core$IFn$_invoke$arity$1(org.nfrac.comportex.util.keep_history_middleware((300),cljs.core.cst$kw$value,cljs.core.cst$kw$history)),cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (p1__65224_SHARP_){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__65224_SHARP_,cljs.core.cst$kw$label,cljs.core.cst$kw$value.cljs$core$IFn$_invoke$arity$1(p1__65224_SHARP_));
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
return (function (_,___$1,___$2,p__65240){
var vec__65241 = p__65240;
var sel = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65241,(0),null);
var temp__4653__auto__ = cljs.core.cst$kw$model_DASH_id.cljs$core$IFn$_invoke$arity$1(sel);
if(cljs.core.truth_(temp__4653__auto__)){
var model_id = temp__4653__auto__;
var out_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.into_journal,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["get-model",model_id,org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$2(out_c,true)], null));

var c__36154__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__36154__auto__,out_c,model_id,temp__4653__auto__,vec__65241,sel,show_predictions,selected_htm){
return (function (){
var f__36155__auto__ = (function (){var switch__36040__auto__ = ((function (c__36154__auto__,out_c,model_id,temp__4653__auto__,vec__65241,sel,show_predictions,selected_htm){
return (function (state_65246){
var state_val_65247 = (state_65246[(1)]);
if((state_val_65247 === (1))){
var state_65246__$1 = state_65246;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_65246__$1,(2),out_c);
} else {
if((state_val_65247 === (2))){
var inst_65243 = (state_65246[(2)]);
var inst_65244 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(selected_htm,inst_65243) : cljs.core.reset_BANG_.call(null,selected_htm,inst_65243));
var state_65246__$1 = state_65246;
return cljs.core.async.impl.ioc_helpers.return_chan(state_65246__$1,inst_65244);
} else {
return null;
}
}
});})(c__36154__auto__,out_c,model_id,temp__4653__auto__,vec__65241,sel,show_predictions,selected_htm))
;
return ((function (switch__36040__auto__,c__36154__auto__,out_c,model_id,temp__4653__auto__,vec__65241,sel,show_predictions,selected_htm){
return (function() {
var org$numenta$sanity$demos$letters$world_pane_$_state_machine__36041__auto__ = null;
var org$numenta$sanity$demos$letters$world_pane_$_state_machine__36041__auto____0 = (function (){
var statearr_65251 = [null,null,null,null,null,null,null];
(statearr_65251[(0)] = org$numenta$sanity$demos$letters$world_pane_$_state_machine__36041__auto__);

(statearr_65251[(1)] = (1));

return statearr_65251;
});
var org$numenta$sanity$demos$letters$world_pane_$_state_machine__36041__auto____1 = (function (state_65246){
while(true){
var ret_value__36042__auto__ = (function (){try{while(true){
var result__36043__auto__ = switch__36040__auto__(state_65246);
if(cljs.core.keyword_identical_QMARK_(result__36043__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__36043__auto__;
}
break;
}
}catch (e65252){if((e65252 instanceof Object)){
var ex__36044__auto__ = e65252;
var statearr_65253_65255 = state_65246;
(statearr_65253_65255[(5)] = ex__36044__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_65246);

return cljs.core.cst$kw$recur;
} else {
throw e65252;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__36042__auto__,cljs.core.cst$kw$recur)){
var G__65256 = state_65246;
state_65246 = G__65256;
continue;
} else {
return ret_value__36042__auto__;
}
break;
}
});
org$numenta$sanity$demos$letters$world_pane_$_state_machine__36041__auto__ = function(state_65246){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$letters$world_pane_$_state_machine__36041__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$letters$world_pane_$_state_machine__36041__auto____1.call(this,state_65246);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$letters$world_pane_$_state_machine__36041__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$letters$world_pane_$_state_machine__36041__auto____0;
org$numenta$sanity$demos$letters$world_pane_$_state_machine__36041__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$letters$world_pane_$_state_machine__36041__auto____1;
return org$numenta$sanity$demos$letters$world_pane_$_state_machine__36041__auto__;
})()
;})(switch__36040__auto__,c__36154__auto__,out_c,model_id,temp__4653__auto__,vec__65241,sel,show_predictions,selected_htm))
})();
var state__36156__auto__ = (function (){var statearr_65254 = (f__36155__auto__.cljs$core$IFn$_invoke$arity$0 ? f__36155__auto__.cljs$core$IFn$_invoke$arity$0() : f__36155__auto__.call(null));
(statearr_65254[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__36154__auto__);

return statearr_65254;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__36156__auto__);
});})(c__36154__auto__,out_c,model_id,temp__4653__auto__,vec__65241,sel,show_predictions,selected_htm))
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
var G__65261_65265 = org.numenta.sanity.demos.letters.model;
var G__65262_65266 = org.nfrac.comportex.demos.letters.n_region_model.cljs$core$IFn$_invoke$arity$2(n_regions,org.nfrac.comportex.demos.letters.spec);
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__65261_65265,G__65262_65266) : cljs.core.reset_BANG_.call(null,G__65261_65265,G__65262_65266));

if(init_QMARK_){
return org.numenta.sanity.bridge.browser.init.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.demos.letters.model,org.numenta.sanity.demos.letters.world_c,org.numenta.sanity.main.into_journal,org.numenta.sanity.demos.letters.into_sim);
} else {
var G__65263 = org.numenta.sanity.main.step_template;
var G__65264 = org.numenta.sanity.comportex.data.step_template_data((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.letters.model) : cljs.core.deref.call(null,org.numenta.sanity.demos.letters.model)));
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__65263,G__65264) : cljs.core.reset_BANG_.call(null,G__65263,G__65264));
}
}));
});
org.numenta.sanity.demos.letters.immediate_key_down_BANG_ = (function org$numenta$sanity$demos$letters$immediate_key_down_BANG_(e){
var temp__4653__auto___65269 = cljs.core.seq(org.nfrac.comportex.demos.letters.clean_text(String.fromCharCode(e.charCode)));
if(temp__4653__auto___65269){
var vec__65268_65270 = temp__4653__auto___65269;
var x_65271 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65268_65270,(0),null);
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.demos.letters.world_c,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$value,[cljs.core.str(x_65271)].join('')], null));
} else {
}

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.demos.letters.config,cljs.core.assoc,cljs.core.cst$kw$world_DASH_buffer_DASH_count,cljs.core.count(org.numenta.sanity.demos.letters.world_buffer));
});
org.numenta.sanity.demos.letters.send_text_BANG_ = (function org$numenta$sanity$demos$letters$send_text_BANG_(){
var temp__4653__auto__ = cljs.core.seq(org.nfrac.comportex.demos.letters.clean_text((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.letters.text_to_send) : cljs.core.deref.call(null,org.numenta.sanity.demos.letters.text_to_send))));
if(temp__4653__auto__){
var xs = temp__4653__auto__;
var c__36154__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__36154__auto__,xs,temp__4653__auto__){
return (function (){
var f__36155__auto__ = (function (){var switch__36040__auto__ = ((function (c__36154__auto__,xs,temp__4653__auto__){
return (function (state_65308){
var state_val_65309 = (state_65308[(1)]);
if((state_val_65309 === (1))){
var inst_65300 = (function (){return ((function (state_val_65309,c__36154__auto__,xs,temp__4653__auto__){
return (function org$numenta$sanity$demos$letters$send_text_BANG__$_iter__65296(s__65297){
return (new cljs.core.LazySeq(null,((function (state_val_65309,c__36154__auto__,xs,temp__4653__auto__){
return (function (){
var s__65297__$1 = s__65297;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__65297__$1);
if(temp__4653__auto____$1){
var s__65297__$2 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__65297__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__65297__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__65299 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__65298 = (0);
while(true){
if((i__65298 < size__5453__auto__)){
var x = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__65298);
cljs.core.chunk_append(b__65299,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$value,[cljs.core.str(x)].join('')], null));

var G__65320 = (i__65298 + (1));
i__65298 = G__65320;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__65299),org$numenta$sanity$demos$letters$send_text_BANG__$_iter__65296(cljs.core.chunk_rest(s__65297__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__65299),null);
}
} else {
var x = cljs.core.first(s__65297__$2);
return cljs.core.cons(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$value,[cljs.core.str(x)].join('')], null),org$numenta$sanity$demos$letters$send_text_BANG__$_iter__65296(cljs.core.rest(s__65297__$2)));
}
} else {
return null;
}
break;
}
});})(state_val_65309,c__36154__auto__,xs,temp__4653__auto__))
,null,null));
});
;})(state_val_65309,c__36154__auto__,xs,temp__4653__auto__))
})();
var inst_65301 = (inst_65300.cljs$core$IFn$_invoke$arity$1 ? inst_65300.cljs$core$IFn$_invoke$arity$1(xs) : inst_65300.call(null,xs));
var inst_65302 = cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3(org.numenta.sanity.demos.letters.world_c,inst_65301,false);
var state_65308__$1 = state_65308;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_65308__$1,(2),inst_65302);
} else {
if((state_val_65309 === (2))){
var inst_65304 = (state_65308[(2)]);
var inst_65305 = cljs.core.count(org.numenta.sanity.demos.letters.world_buffer);
var inst_65306 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.demos.letters.config,cljs.core.assoc,cljs.core.cst$kw$world_DASH_buffer_DASH_count,inst_65305);
var state_65308__$1 = (function (){var statearr_65312 = state_65308;
(statearr_65312[(7)] = inst_65304);

return statearr_65312;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_65308__$1,inst_65306);
} else {
return null;
}
}
});})(c__36154__auto__,xs,temp__4653__auto__))
;
return ((function (switch__36040__auto__,c__36154__auto__,xs,temp__4653__auto__){
return (function() {
var org$numenta$sanity$demos$letters$send_text_BANG__$_state_machine__36041__auto__ = null;
var org$numenta$sanity$demos$letters$send_text_BANG__$_state_machine__36041__auto____0 = (function (){
var statearr_65316 = [null,null,null,null,null,null,null,null];
(statearr_65316[(0)] = org$numenta$sanity$demos$letters$send_text_BANG__$_state_machine__36041__auto__);

(statearr_65316[(1)] = (1));

return statearr_65316;
});
var org$numenta$sanity$demos$letters$send_text_BANG__$_state_machine__36041__auto____1 = (function (state_65308){
while(true){
var ret_value__36042__auto__ = (function (){try{while(true){
var result__36043__auto__ = switch__36040__auto__(state_65308);
if(cljs.core.keyword_identical_QMARK_(result__36043__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__36043__auto__;
}
break;
}
}catch (e65317){if((e65317 instanceof Object)){
var ex__36044__auto__ = e65317;
var statearr_65318_65321 = state_65308;
(statearr_65318_65321[(5)] = ex__36044__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_65308);

return cljs.core.cst$kw$recur;
} else {
throw e65317;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__36042__auto__,cljs.core.cst$kw$recur)){
var G__65322 = state_65308;
state_65308 = G__65322;
continue;
} else {
return ret_value__36042__auto__;
}
break;
}
});
org$numenta$sanity$demos$letters$send_text_BANG__$_state_machine__36041__auto__ = function(state_65308){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$letters$send_text_BANG__$_state_machine__36041__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$letters$send_text_BANG__$_state_machine__36041__auto____1.call(this,state_65308);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$letters$send_text_BANG__$_state_machine__36041__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$letters$send_text_BANG__$_state_machine__36041__auto____0;
org$numenta$sanity$demos$letters$send_text_BANG__$_state_machine__36041__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$letters$send_text_BANG__$_state_machine__36041__auto____1;
return org$numenta$sanity$demos$letters$send_text_BANG__$_state_machine__36041__auto__;
})()
;})(switch__36040__auto__,c__36154__auto__,xs,temp__4653__auto__))
})();
var state__36156__auto__ = (function (){var statearr_65319 = (f__36155__auto__.cljs$core$IFn$_invoke$arity$0 ? f__36155__auto__.cljs$core$IFn$_invoke$arity$0() : f__36155__auto__.call(null));
(statearr_65319[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__36154__auto__);

return statearr_65319;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__36156__auto__);
});})(c__36154__auto__,xs,temp__4653__auto__))
);

return c__36154__auto__;
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
var c__36154__auto___65411 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__36154__auto___65411){
return (function (){
var f__36155__auto__ = (function (){var switch__36040__auto__ = ((function (c__36154__auto___65411){
return (function (state_65386){
var state_val_65387 = (state_65386[(1)]);
if((state_val_65387 === (7))){
var inst_65372 = (state_65386[(2)]);
var state_65386__$1 = state_65386;
var statearr_65388_65412 = state_65386__$1;
(statearr_65388_65412[(2)] = inst_65372);

(statearr_65388_65412[(1)] = (6));


return cljs.core.cst$kw$recur;
} else {
if((state_val_65387 === (1))){
var state_65386__$1 = state_65386;
var statearr_65389_65413 = state_65386__$1;
(statearr_65389_65413[(2)] = null);

(statearr_65389_65413[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_65387 === (4))){
var state_65386__$1 = state_65386;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_65386__$1,(7),org.numenta.sanity.demos.letters.world_c);
} else {
if((state_val_65387 === (6))){
var inst_65375 = (state_65386[(2)]);
var state_65386__$1 = state_65386;
if(cljs.core.truth_(inst_65375)){
var statearr_65390_65414 = state_65386__$1;
(statearr_65390_65414[(1)] = (8));

} else {
var statearr_65391_65415 = state_65386__$1;
(statearr_65391_65415[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_65387 === (3))){
var inst_65384 = (state_65386[(2)]);
var state_65386__$1 = state_65386;
return cljs.core.async.impl.ioc_helpers.return_chan(state_65386__$1,inst_65384);
} else {
if((state_val_65387 === (2))){
var inst_65369 = (state_65386[(7)]);
var inst_65368 = cljs.core.count(org.numenta.sanity.demos.letters.world_buffer);
var inst_65369__$1 = (inst_65368 > (0));
var state_65386__$1 = (function (){var statearr_65392 = state_65386;
(statearr_65392[(7)] = inst_65369__$1);

return statearr_65392;
})();
if(cljs.core.truth_(inst_65369__$1)){
var statearr_65393_65416 = state_65386__$1;
(statearr_65393_65416[(1)] = (4));

} else {
var statearr_65394_65417 = state_65386__$1;
(statearr_65394_65417[(1)] = (5));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_65387 === (9))){
var state_65386__$1 = state_65386;
var statearr_65395_65418 = state_65386__$1;
(statearr_65395_65418[(2)] = null);

(statearr_65395_65418[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_65387 === (5))){
var inst_65369 = (state_65386[(7)]);
var state_65386__$1 = state_65386;
var statearr_65396_65419 = state_65386__$1;
(statearr_65396_65419[(2)] = inst_65369);

(statearr_65396_65419[(1)] = (6));


return cljs.core.cst$kw$recur;
} else {
if((state_val_65387 === (10))){
var inst_65382 = (state_65386[(2)]);
var state_65386__$1 = state_65386;
var statearr_65397_65420 = state_65386__$1;
(statearr_65397_65420[(2)] = inst_65382);

(statearr_65397_65420[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_65387 === (8))){
var inst_65377 = cljs.core.count(org.numenta.sanity.demos.letters.world_buffer);
var inst_65378 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.demos.letters.config,cljs.core.assoc,cljs.core.cst$kw$world_DASH_buffer_DASH_count,inst_65377);
var state_65386__$1 = (function (){var statearr_65398 = state_65386;
(statearr_65398[(8)] = inst_65378);

return statearr_65398;
})();
var statearr_65399_65421 = state_65386__$1;
(statearr_65399_65421[(2)] = null);

(statearr_65399_65421[(1)] = (2));


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
});})(c__36154__auto___65411))
;
return ((function (switch__36040__auto__,c__36154__auto___65411){
return (function() {
var org$numenta$sanity$demos$letters$model_tab_$_state_machine__36041__auto__ = null;
var org$numenta$sanity$demos$letters$model_tab_$_state_machine__36041__auto____0 = (function (){
var statearr_65403 = [null,null,null,null,null,null,null,null,null];
(statearr_65403[(0)] = org$numenta$sanity$demos$letters$model_tab_$_state_machine__36041__auto__);

(statearr_65403[(1)] = (1));

return statearr_65403;
});
var org$numenta$sanity$demos$letters$model_tab_$_state_machine__36041__auto____1 = (function (state_65386){
while(true){
var ret_value__36042__auto__ = (function (){try{while(true){
var result__36043__auto__ = switch__36040__auto__(state_65386);
if(cljs.core.keyword_identical_QMARK_(result__36043__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__36043__auto__;
}
break;
}
}catch (e65404){if((e65404 instanceof Object)){
var ex__36044__auto__ = e65404;
var statearr_65405_65422 = state_65386;
(statearr_65405_65422[(5)] = ex__36044__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_65386);

return cljs.core.cst$kw$recur;
} else {
throw e65404;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__36042__auto__,cljs.core.cst$kw$recur)){
var G__65423 = state_65386;
state_65386 = G__65423;
continue;
} else {
return ret_value__36042__auto__;
}
break;
}
});
org$numenta$sanity$demos$letters$model_tab_$_state_machine__36041__auto__ = function(state_65386){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$letters$model_tab_$_state_machine__36041__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$letters$model_tab_$_state_machine__36041__auto____1.call(this,state_65386);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$letters$model_tab_$_state_machine__36041__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$letters$model_tab_$_state_machine__36041__auto____0;
org$numenta$sanity$demos$letters$model_tab_$_state_machine__36041__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$letters$model_tab_$_state_machine__36041__auto____1;
return org$numenta$sanity$demos$letters$model_tab_$_state_machine__36041__auto__;
})()
;})(switch__36040__auto__,c__36154__auto___65411))
})();
var state__36156__auto__ = (function (){var statearr_65406 = (f__36155__auto__.cljs$core$IFn$_invoke$arity$0 ? f__36155__auto__.cljs$core$IFn$_invoke$arity$0() : f__36155__auto__.call(null));
(statearr_65406[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__36154__auto___65411);

return statearr_65406;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__36156__auto__);
});})(c__36154__auto___65411))
);


return e.preventDefault();
})], null),"Clear"], null):null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$well,"Immediate input as you type: ",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$size,(2),cljs.core.cst$kw$maxLength,(1),cljs.core.cst$kw$on_DASH_key_DASH_press,(function (e){
org.numenta.sanity.demos.letters.immediate_key_down_BANG_(e);

return e.preventDefault();
})], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$well,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$textarea,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$width,"90%",cljs.core.cst$kw$height,"10em"], null),cljs.core.cst$kw$value,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.letters.text_to_send) : cljs.core.deref.call(null,org.numenta.sanity.demos.letters.text_to_send)),cljs.core.cst$kw$on_DASH_change,(function (e){
var G__65408_65424 = org.numenta.sanity.demos.letters.text_to_send;
var G__65409_65425 = (function (){var G__65410 = e.target;
return goog.dom.forms.getValue(G__65410);
})();
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__65408_65424,G__65409_65425) : cljs.core.reset_BANG_.call(null,G__65408_65424,G__65409_65425));

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
