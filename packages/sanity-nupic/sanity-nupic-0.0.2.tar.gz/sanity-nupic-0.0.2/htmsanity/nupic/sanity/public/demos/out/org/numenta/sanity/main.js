// Compiled by ClojureScript 1.7.170 {:static-fns true, :optimize-constants true}
goog.provide('org.numenta.sanity.main');
goog.require('cljs.core');
goog.require('reagent.core');
goog.require('org.numenta.sanity.viz_canvas');
goog.require('org.numenta.sanity.helpers');
goog.require('cljs.core.async');
goog.require('org.numenta.sanity.bridge.marshalling');
goog.require('org.numenta.sanity.selection');
goog.require('org.numenta.sanity.controls_ui');
cljs.core.enable_console_print_BANG_();
org.numenta.sanity.main.into_journal = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((65536));
org.numenta.sanity.main.steps = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentVector.EMPTY);
org.numenta.sanity.main.step_template = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
org.numenta.sanity.main.selection = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.selection.blank_selection);
org.numenta.sanity.main.capture_options = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
org.numenta.sanity.main.viz_options = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.viz_canvas.default_viz_options);
org.numenta.sanity.main.into_viz = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
org.numenta.sanity.main.debug_data = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.controls_ui.default_debug_data);
org.numenta.sanity.main.subscribe_to_steps_BANG_ = (function org$numenta$sanity$main$subscribe_to_steps_BANG_(){
var steps_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
var response_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.into_journal,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["subscribe",org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$1(steps_c),org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$2(response_c,true)], null));

var c__36154__auto___61540 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__36154__auto___61540,steps_c,response_c){
return (function (){
var f__36155__auto__ = (function (){var switch__36040__auto__ = ((function (c__36154__auto___61540,steps_c,response_c){
return (function (state_61522){
var state_val_61523 = (state_61522[(1)]);
if((state_val_61523 === (1))){
var state_61522__$1 = state_61522;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_61522__$1,(2),response_c);
} else {
if((state_val_61523 === (2))){
var inst_61476 = (state_61522[(2)]);
var inst_61477 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_61476,(0),null);
var inst_61478 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_61476,(1),null);
var inst_61479 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.step_template,inst_61477) : cljs.core.reset_BANG_.call(null,org.numenta.sanity.main.step_template,inst_61477));
var inst_61480 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.capture_options,inst_61478) : cljs.core.reset_BANG_.call(null,org.numenta.sanity.main.capture_options,inst_61478));
var inst_61482 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.main.step_template) : cljs.core.deref.call(null,org.numenta.sanity.main.step_template));
var inst_61483 = cljs.core.cst$kw$regions.cljs$core$IFn$_invoke$arity$1(inst_61482);
var inst_61484 = cljs.core.seq(inst_61483);
var inst_61485 = cljs.core.first(inst_61484);
var inst_61486 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_61485,(0),null);
var inst_61487 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_61485,(1),null);
var inst_61488 = cljs.core.keys(inst_61487);
var inst_61489 = cljs.core.first(inst_61488);
var inst_61490 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_61491 = [cljs.core.cst$kw$dt,cljs.core.cst$kw$path];
var inst_61492 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_61493 = [cljs.core.cst$kw$regions,inst_61486,inst_61489];
var inst_61494 = (new cljs.core.PersistentVector(null,3,(5),inst_61492,inst_61493,null));
var inst_61495 = [(0),inst_61494];
var inst_61496 = cljs.core.PersistentHashMap.fromArrays(inst_61491,inst_61495);
var inst_61497 = [inst_61496];
var inst_61498 = (new cljs.core.PersistentVector(null,1,(5),inst_61490,inst_61497,null));
var inst_61499 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.selection,inst_61498) : cljs.core.reset_BANG_.call(null,org.numenta.sanity.main.selection,inst_61498));
var inst_61500 = (function (){return ((function (inst_61476,inst_61477,inst_61478,inst_61479,inst_61480,inst_61482,inst_61483,inst_61484,inst_61485,inst_61486,inst_61487,inst_61488,inst_61489,inst_61490,inst_61491,inst_61492,inst_61493,inst_61494,inst_61495,inst_61496,inst_61497,inst_61498,inst_61499,state_val_61523,c__36154__auto___61540,steps_c,response_c){
return (function (_,___$1,___$2,opts){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.into_journal,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["set-capture-options",opts], null));
});
;})(inst_61476,inst_61477,inst_61478,inst_61479,inst_61480,inst_61482,inst_61483,inst_61484,inst_61485,inst_61486,inst_61487,inst_61488,inst_61489,inst_61490,inst_61491,inst_61492,inst_61493,inst_61494,inst_61495,inst_61496,inst_61497,inst_61498,inst_61499,state_val_61523,c__36154__auto___61540,steps_c,response_c))
})();
var inst_61501 = cljs.core.add_watch(org.numenta.sanity.main.capture_options,cljs.core.cst$kw$org$numenta$sanity$main_SLASH_push_DASH_to_DASH_server,inst_61500);
var state_61522__$1 = (function (){var statearr_61524 = state_61522;
(statearr_61524[(7)] = inst_61501);

(statearr_61524[(8)] = inst_61479);

(statearr_61524[(9)] = inst_61480);

(statearr_61524[(10)] = inst_61499);

return statearr_61524;
})();
var statearr_61525_61541 = state_61522__$1;
(statearr_61525_61541[(2)] = null);

(statearr_61525_61541[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_61523 === (3))){
var state_61522__$1 = state_61522;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_61522__$1,(5),steps_c);
} else {
if((state_val_61523 === (4))){
var inst_61520 = (state_61522[(2)]);
var state_61522__$1 = state_61522;
return cljs.core.async.impl.ioc_helpers.return_chan(state_61522__$1,inst_61520);
} else {
if((state_val_61523 === (5))){
var inst_61504 = (state_61522[(11)]);
var inst_61504__$1 = (state_61522[(2)]);
var state_61522__$1 = (function (){var statearr_61526 = state_61522;
(statearr_61526[(11)] = inst_61504__$1);

return statearr_61526;
})();
if(cljs.core.truth_(inst_61504__$1)){
var statearr_61527_61542 = state_61522__$1;
(statearr_61527_61542[(1)] = (6));

} else {
var statearr_61528_61543 = state_61522__$1;
(statearr_61528_61543[(1)] = (7));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_61523 === (6))){
var inst_61504 = (state_61522[(11)]);
var inst_61507 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.main.capture_options) : cljs.core.deref.call(null,org.numenta.sanity.main.capture_options));
var inst_61508 = cljs.core.cst$kw$keep_DASH_steps.cljs$core$IFn$_invoke$arity$1(inst_61507);
var inst_61509 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.main.steps) : cljs.core.deref.call(null,org.numenta.sanity.main.steps));
var inst_61510 = cljs.core.cons(inst_61504,inst_61509);
var inst_61511 = cljs.core.split_at(inst_61508,inst_61510);
var inst_61512 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_61511,(0),null);
var inst_61513 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_61511,(1),null);
var inst_61514 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.steps,inst_61512) : cljs.core.reset_BANG_.call(null,org.numenta.sanity.main.steps,inst_61512));
var state_61522__$1 = (function (){var statearr_61529 = state_61522;
(statearr_61529[(12)] = inst_61513);

(statearr_61529[(13)] = inst_61514);

return statearr_61529;
})();
var statearr_61530_61544 = state_61522__$1;
(statearr_61530_61544[(2)] = null);

(statearr_61530_61544[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_61523 === (7))){
var state_61522__$1 = state_61522;
var statearr_61531_61545 = state_61522__$1;
(statearr_61531_61545[(2)] = null);

(statearr_61531_61545[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_61523 === (8))){
var inst_61518 = (state_61522[(2)]);
var state_61522__$1 = state_61522;
var statearr_61532_61546 = state_61522__$1;
(statearr_61532_61546[(2)] = inst_61518);

(statearr_61532_61546[(1)] = (4));


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
});})(c__36154__auto___61540,steps_c,response_c))
;
return ((function (switch__36040__auto__,c__36154__auto___61540,steps_c,response_c){
return (function() {
var org$numenta$sanity$main$subscribe_to_steps_BANG__$_state_machine__36041__auto__ = null;
var org$numenta$sanity$main$subscribe_to_steps_BANG__$_state_machine__36041__auto____0 = (function (){
var statearr_61536 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_61536[(0)] = org$numenta$sanity$main$subscribe_to_steps_BANG__$_state_machine__36041__auto__);

(statearr_61536[(1)] = (1));

return statearr_61536;
});
var org$numenta$sanity$main$subscribe_to_steps_BANG__$_state_machine__36041__auto____1 = (function (state_61522){
while(true){
var ret_value__36042__auto__ = (function (){try{while(true){
var result__36043__auto__ = switch__36040__auto__(state_61522);
if(cljs.core.keyword_identical_QMARK_(result__36043__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__36043__auto__;
}
break;
}
}catch (e61537){if((e61537 instanceof Object)){
var ex__36044__auto__ = e61537;
var statearr_61538_61547 = state_61522;
(statearr_61538_61547[(5)] = ex__36044__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_61522);

return cljs.core.cst$kw$recur;
} else {
throw e61537;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__36042__auto__,cljs.core.cst$kw$recur)){
var G__61548 = state_61522;
state_61522 = G__61548;
continue;
} else {
return ret_value__36042__auto__;
}
break;
}
});
org$numenta$sanity$main$subscribe_to_steps_BANG__$_state_machine__36041__auto__ = function(state_61522){
switch(arguments.length){
case 0:
return org$numenta$sanity$main$subscribe_to_steps_BANG__$_state_machine__36041__auto____0.call(this);
case 1:
return org$numenta$sanity$main$subscribe_to_steps_BANG__$_state_machine__36041__auto____1.call(this,state_61522);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$main$subscribe_to_steps_BANG__$_state_machine__36041__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$main$subscribe_to_steps_BANG__$_state_machine__36041__auto____0;
org$numenta$sanity$main$subscribe_to_steps_BANG__$_state_machine__36041__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$main$subscribe_to_steps_BANG__$_state_machine__36041__auto____1;
return org$numenta$sanity$main$subscribe_to_steps_BANG__$_state_machine__36041__auto__;
})()
;})(switch__36040__auto__,c__36154__auto___61540,steps_c,response_c))
})();
var state__36156__auto__ = (function (){var statearr_61539 = (f__36155__auto__.cljs$core$IFn$_invoke$arity$0 ? f__36155__auto__.cljs$core$IFn$_invoke$arity$0() : f__36155__auto__.call(null));
(statearr_61539[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__36154__auto___61540);

return statearr_61539;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__36156__auto__);
});})(c__36154__auto___61540,steps_c,response_c))
);


return steps_c;
});
org.numenta.sanity.main.subscription_data = org.numenta.sanity.main.subscribe_to_steps_BANG_();
org.numenta.sanity.main.unsubscribe_BANG_ = (function org$numenta$sanity$main$unsubscribe_BANG_(subscription_data){
var steps_c_61549 = subscription_data;
cljs.core.async.close_BANG_(steps_c_61549);

return cljs.core.remove_watch(org.numenta.sanity.main.viz_options,cljs.core.cst$kw$org$numenta$sanity$main_SLASH_keep_DASH_steps);
});
cljs.core.add_watch(org.numenta.sanity.main.steps,cljs.core.cst$kw$org$numenta$sanity$main_SLASH_recalculate_DASH_selection,(function (_,___$1,___$2,steps){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.selection,(function (p1__61550_SHARP_){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (sel){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(sel,cljs.core.cst$kw$model_DASH_id,cljs.core.cst$kw$model_DASH_id.cljs$core$IFn$_invoke$arity$1(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(steps,cljs.core.cst$kw$dt.cljs$core$IFn$_invoke$arity$1(sel))));
}),p1__61550_SHARP_);
}));
}));
org.numenta.sanity.main.main_pane = (function org$numenta$sanity$main$main_pane(_,___$1){
var size_invalidates_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
var c__36154__auto___61616 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__36154__auto___61616,size_invalidates_c){
return (function (){
var f__36155__auto__ = (function (){var switch__36040__auto__ = ((function (c__36154__auto___61616,size_invalidates_c){
return (function (state_61600){
var state_val_61601 = (state_61600[(1)]);
if((state_val_61601 === (1))){
var state_61600__$1 = state_61600;
var statearr_61602_61617 = state_61600__$1;
(statearr_61602_61617[(2)] = null);

(statearr_61602_61617[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_61601 === (2))){
var inst_61585 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_61586 = [cljs.core.cst$kw$drawing,cljs.core.cst$kw$max_DASH_height_DASH_px];
var inst_61587 = (new cljs.core.PersistentVector(null,2,(5),inst_61585,inst_61586,null));
var inst_61588 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.main.viz_options,cljs.core.assoc_in,inst_61587,window.innerHeight);
var state_61600__$1 = (function (){var statearr_61603 = state_61600;
(statearr_61603[(7)] = inst_61588);

return statearr_61603;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_61600__$1,(4),size_invalidates_c);
} else {
if((state_val_61601 === (3))){
var inst_61598 = (state_61600[(2)]);
var state_61600__$1 = state_61600;
return cljs.core.async.impl.ioc_helpers.return_chan(state_61600__$1,inst_61598);
} else {
if((state_val_61601 === (4))){
var inst_61590 = (state_61600[(2)]);
var inst_61591 = (inst_61590 == null);
var state_61600__$1 = state_61600;
if(cljs.core.truth_(inst_61591)){
var statearr_61604_61618 = state_61600__$1;
(statearr_61604_61618[(1)] = (5));

} else {
var statearr_61605_61619 = state_61600__$1;
(statearr_61605_61619[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_61601 === (5))){
var state_61600__$1 = state_61600;
var statearr_61606_61620 = state_61600__$1;
(statearr_61606_61620[(2)] = null);

(statearr_61606_61620[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_61601 === (6))){
var state_61600__$1 = state_61600;
var statearr_61607_61621 = state_61600__$1;
(statearr_61607_61621[(2)] = null);

(statearr_61607_61621[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_61601 === (7))){
var inst_61596 = (state_61600[(2)]);
var state_61600__$1 = state_61600;
var statearr_61608_61622 = state_61600__$1;
(statearr_61608_61622[(2)] = inst_61596);

(statearr_61608_61622[(1)] = (3));


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
});})(c__36154__auto___61616,size_invalidates_c))
;
return ((function (switch__36040__auto__,c__36154__auto___61616,size_invalidates_c){
return (function() {
var org$numenta$sanity$main$main_pane_$_state_machine__36041__auto__ = null;
var org$numenta$sanity$main$main_pane_$_state_machine__36041__auto____0 = (function (){
var statearr_61612 = [null,null,null,null,null,null,null,null];
(statearr_61612[(0)] = org$numenta$sanity$main$main_pane_$_state_machine__36041__auto__);

(statearr_61612[(1)] = (1));

return statearr_61612;
});
var org$numenta$sanity$main$main_pane_$_state_machine__36041__auto____1 = (function (state_61600){
while(true){
var ret_value__36042__auto__ = (function (){try{while(true){
var result__36043__auto__ = switch__36040__auto__(state_61600);
if(cljs.core.keyword_identical_QMARK_(result__36043__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__36043__auto__;
}
break;
}
}catch (e61613){if((e61613 instanceof Object)){
var ex__36044__auto__ = e61613;
var statearr_61614_61623 = state_61600;
(statearr_61614_61623[(5)] = ex__36044__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_61600);

return cljs.core.cst$kw$recur;
} else {
throw e61613;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__36042__auto__,cljs.core.cst$kw$recur)){
var G__61624 = state_61600;
state_61600 = G__61624;
continue;
} else {
return ret_value__36042__auto__;
}
break;
}
});
org$numenta$sanity$main$main_pane_$_state_machine__36041__auto__ = function(state_61600){
switch(arguments.length){
case 0:
return org$numenta$sanity$main$main_pane_$_state_machine__36041__auto____0.call(this);
case 1:
return org$numenta$sanity$main$main_pane_$_state_machine__36041__auto____1.call(this,state_61600);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$main$main_pane_$_state_machine__36041__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$main$main_pane_$_state_machine__36041__auto____0;
org$numenta$sanity$main$main_pane_$_state_machine__36041__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$main$main_pane_$_state_machine__36041__auto____1;
return org$numenta$sanity$main$main_pane_$_state_machine__36041__auto__;
})()
;})(switch__36040__auto__,c__36154__auto___61616,size_invalidates_c))
})();
var state__36156__auto__ = (function (){var statearr_61615 = (f__36155__auto__.cljs$core$IFn$_invoke$arity$0 ? f__36155__auto__.cljs$core$IFn$_invoke$arity$0() : f__36155__auto__.call(null));
(statearr_61615[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__36154__auto___61616);

return statearr_61615;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__36156__auto__);
});})(c__36154__auto___61616,size_invalidates_c))
);


return ((function (size_invalidates_c){
return (function (world_pane,into_sim){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$container_DASH_fluid,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$on_DASH_click,((function (size_invalidates_c){
return (function (){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.into_viz,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$background_DASH_clicked], null));
});})(size_invalidates_c))
,cljs.core.cst$kw$on_DASH_key_DASH_down,((function (size_invalidates_c){
return (function (p1__61551_SHARP_){
return org.numenta.sanity.viz_canvas.viz_key_down(p1__61551_SHARP_,org.numenta.sanity.main.into_viz);
});})(size_invalidates_c))
,cljs.core.cst$kw$tabIndex,(1)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$row,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.viz_canvas.viz_timeline,org.numenta.sanity.main.steps,org.numenta.sanity.main.selection,org.numenta.sanity.main.capture_options], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$row,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_3$col_DASH_lg_DASH_2,world_pane], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_9$col_DASH_lg_DASH_10,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$overflow,"auto"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.helpers.window_resize_listener,size_invalidates_c], null),new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.viz_canvas.viz_canvas,null,org.numenta.sanity.main.steps,org.numenta.sanity.main.selection,org.numenta.sanity.main.step_template,org.numenta.sanity.main.viz_options,org.numenta.sanity.main.into_viz,into_sim,org.numenta.sanity.main.into_journal], null)], null)], null)], null);
});
;})(size_invalidates_c))
});
org.numenta.sanity.main.sanity_app = (function org$numenta$sanity$main$sanity_app(title,model_tab,world_pane,features,into_sim){
return new cljs.core.PersistentVector(null, 15, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.controls_ui.sanity_app,title,model_tab,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.main.main_pane,world_pane,into_sim], null),features,org.numenta.sanity.main.capture_options,org.numenta.sanity.main.viz_options,org.numenta.sanity.main.selection,org.numenta.sanity.main.steps,org.numenta.sanity.main.step_template,org.numenta.sanity.viz_canvas.state_colors,org.numenta.sanity.main.into_viz,into_sim,org.numenta.sanity.main.into_journal,org.numenta.sanity.main.debug_data], null);
});
org.numenta.sanity.main.selected_step = (function org$numenta$sanity$main$selected_step(var_args){
var args61625 = [];
var len__5740__auto___61628 = arguments.length;
var i__5741__auto___61629 = (0);
while(true){
if((i__5741__auto___61629 < len__5740__auto___61628)){
args61625.push((arguments[i__5741__auto___61629]));

var G__61630 = (i__5741__auto___61629 + (1));
i__5741__auto___61629 = G__61630;
continue;
} else {
}
break;
}

var G__61627 = args61625.length;
switch (G__61627) {
case 0:
return org.numenta.sanity.main.selected_step.cljs$core$IFn$_invoke$arity$0();

break;
case 2:
return org.numenta.sanity.main.selected_step.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args61625.length)].join('')));

}
});

org.numenta.sanity.main.selected_step.cljs$core$IFn$_invoke$arity$0 = (function (){
return org.numenta.sanity.main.selected_step.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.steps,org.numenta.sanity.main.selection);
});

org.numenta.sanity.main.selected_step.cljs$core$IFn$_invoke$arity$2 = (function (steps,selection){
var temp__4653__auto__ = cljs.core.cst$kw$dt.cljs$core$IFn$_invoke$arity$1(cljs.core.first((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selection) : cljs.core.deref.call(null,selection))));
if(cljs.core.truth_(temp__4653__auto__)){
var dt = temp__4653__auto__;
return cljs.core.nth.cljs$core$IFn$_invoke$arity$3((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(steps) : cljs.core.deref.call(null,steps)),dt,null);
} else {
return null;
}
});

org.numenta.sanity.main.selected_step.cljs$lang$maxFixedArity = 2;
