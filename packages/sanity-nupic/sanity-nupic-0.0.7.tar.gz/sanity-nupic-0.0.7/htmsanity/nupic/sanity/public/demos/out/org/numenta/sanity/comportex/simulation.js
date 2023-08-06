// Compiled by ClojureScript 1.7.170 {:static-fns true, :optimize-constants true}
goog.provide('org.numenta.sanity.comportex.simulation');
goog.require('cljs.core');
goog.require('org.nfrac.comportex.protocols');
goog.require('cljs.core.async');
goog.require('org.numenta.sanity.bridge.marshalling');
goog.require('org.nfrac.comportex.core');
goog.require('org.nfrac.comportex.util');
org.numenta.sanity.comportex.simulation.should_go_QMARK__BANG_ = (function org$numenta$sanity$comportex$simulation$should_go_QMARK__BANG_(options){
var map__61917 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(options) : cljs.core.deref.call(null,options));
var map__61917__$1 = ((((!((map__61917 == null)))?((((map__61917.cljs$lang$protocol_mask$partition0$ & (64))) || (map__61917.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__61917):map__61917);
var go_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__61917__$1,cljs.core.cst$kw$go_QMARK_);
var force_n_steps = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__61917__$1,cljs.core.cst$kw$force_DASH_n_DASH_steps);
var step_ms = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__61917__$1,cljs.core.cst$kw$step_DASH_ms);
if(cljs.core.truth_(go_QMARK_)){
return step_ms;
} else {
if((force_n_steps > (0))){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(options,cljs.core.update,cljs.core.cst$kw$force_DASH_n_DASH_steps,cljs.core.dec);

return (0);
} else {
return false;

}
}
});
org.numenta.sanity.comportex.simulation.simulation_loop = (function org$numenta$sanity$comportex$simulation$simulation_loop(model,world,out,options,sim_closed_QMARK_,htm_step){
var c__35961__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__35961__auto__){
return (function (){
var f__35962__auto__ = (function (){var switch__35847__auto__ = ((function (c__35961__auto__){
return (function (state_62018){
var state_val_62019 = (state_62018[(1)]);
if((state_val_62019 === (7))){
var state_62018__$1 = state_62018;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_62018__$1,(10),world);
} else {
if((state_val_62019 === (1))){
var state_62018__$1 = state_62018;
var statearr_62020_62049 = state_62018__$1;
(statearr_62020_62049[(2)] = null);

(statearr_62020_62049[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_62019 === (4))){
var inst_61988 = (state_62018[(7)]);
var inst_61988__$1 = org.numenta.sanity.comportex.simulation.should_go_QMARK__BANG_(options);
var state_62018__$1 = (function (){var statearr_62021 = state_62018;
(statearr_62021[(7)] = inst_61988__$1);

return statearr_62021;
})();
if(cljs.core.truth_(inst_61988__$1)){
var statearr_62022_62050 = state_62018__$1;
(statearr_62022_62050[(1)] = (7));

} else {
var statearr_62023_62051 = state_62018__$1;
(statearr_62023_62051[(1)] = (8));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_62019 === (15))){
var inst_62011 = (function (){return ((function (state_val_62019,c__35961__auto__){
return (function (_,___$1,___$2,___$3){
cljs.core.remove_watch(options,cljs.core.cst$kw$run_DASH_sim);

return org$numenta$sanity$comportex$simulation$simulation_loop(model,world,out,options,sim_closed_QMARK_,htm_step);
});
;})(state_val_62019,c__35961__auto__))
})();
var inst_62012 = cljs.core.add_watch(options,cljs.core.cst$kw$run_DASH_sim,inst_62011);
var state_62018__$1 = state_62018;
var statearr_62024_62052 = state_62018__$1;
(statearr_62024_62052[(2)] = inst_62012);

(statearr_62024_62052[(1)] = (17));


return cljs.core.cst$kw$recur;
} else {
if((state_val_62019 === (13))){
var inst_62001 = (state_62018[(2)]);
var state_62018__$1 = state_62018;
var statearr_62025_62053 = state_62018__$1;
(statearr_62025_62053[(2)] = inst_62001);

(statearr_62025_62053[(1)] = (9));


return cljs.core.cst$kw$recur;
} else {
if((state_val_62019 === (6))){
var inst_62007 = (state_62018[(2)]);
var state_62018__$1 = state_62018;
var statearr_62026_62054 = state_62018__$1;
(statearr_62026_62054[(2)] = inst_62007);

(statearr_62026_62054[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_62019 === (17))){
var inst_62016 = (state_62018[(2)]);
var state_62018__$1 = state_62018;
return cljs.core.async.impl.ioc_helpers.return_chan(state_62018__$1,inst_62016);
} else {
if((state_val_62019 === (3))){
var inst_62009 = (state_62018[(2)]);
var state_62018__$1 = state_62018;
if(cljs.core.truth_(inst_62009)){
var statearr_62027_62055 = state_62018__$1;
(statearr_62027_62055[(1)] = (15));

} else {
var statearr_62028_62056 = state_62018__$1;
(statearr_62028_62056[(1)] = (16));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_62019 === (12))){
var state_62018__$1 = state_62018;
var statearr_62029_62057 = state_62018__$1;
(statearr_62029_62057[(2)] = null);

(statearr_62029_62057[(1)] = (13));


return cljs.core.cst$kw$recur;
} else {
if((state_val_62019 === (2))){
var inst_61985 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(sim_closed_QMARK_) : cljs.core.deref.call(null,sim_closed_QMARK_));
var inst_61986 = cljs.core.not(inst_61985);
var state_62018__$1 = state_62018;
if(inst_61986){
var statearr_62030_62058 = state_62018__$1;
(statearr_62030_62058[(1)] = (4));

} else {
var statearr_62031_62059 = state_62018__$1;
(statearr_62031_62059[(1)] = (5));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_62019 === (11))){
var inst_61991 = (state_62018[(8)]);
var inst_61988 = (state_62018[(7)]);
var inst_61993 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(model,htm_step,inst_61991);
var inst_61994 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(out,inst_61993);
var inst_61995 = cljs.core.async.timeout(inst_61988);
var state_62018__$1 = (function (){var statearr_62032 = state_62018;
(statearr_62032[(9)] = inst_61994);

return statearr_62032;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_62018__$1,(14),inst_61995);
} else {
if((state_val_62019 === (9))){
var inst_62004 = (state_62018[(2)]);
var state_62018__$1 = state_62018;
var statearr_62033_62060 = state_62018__$1;
(statearr_62033_62060[(2)] = inst_62004);

(statearr_62033_62060[(1)] = (6));


return cljs.core.cst$kw$recur;
} else {
if((state_val_62019 === (5))){
var state_62018__$1 = state_62018;
var statearr_62034_62061 = state_62018__$1;
(statearr_62034_62061[(2)] = null);

(statearr_62034_62061[(1)] = (6));


return cljs.core.cst$kw$recur;
} else {
if((state_val_62019 === (14))){
var inst_61997 = (state_62018[(2)]);
var state_62018__$1 = (function (){var statearr_62035 = state_62018;
(statearr_62035[(10)] = inst_61997);

return statearr_62035;
})();
var statearr_62036_62062 = state_62018__$1;
(statearr_62036_62062[(2)] = null);

(statearr_62036_62062[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_62019 === (16))){
var inst_62014 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(sim_closed_QMARK_,true) : cljs.core.reset_BANG_.call(null,sim_closed_QMARK_,true));
var state_62018__$1 = state_62018;
var statearr_62037_62063 = state_62018__$1;
(statearr_62037_62063[(2)] = inst_62014);

(statearr_62037_62063[(1)] = (17));


return cljs.core.cst$kw$recur;
} else {
if((state_val_62019 === (10))){
var inst_61991 = (state_62018[(8)]);
var inst_61991__$1 = (state_62018[(2)]);
var state_62018__$1 = (function (){var statearr_62038 = state_62018;
(statearr_62038[(8)] = inst_61991__$1);

return statearr_62038;
})();
if(cljs.core.truth_(inst_61991__$1)){
var statearr_62039_62064 = state_62018__$1;
(statearr_62039_62064[(1)] = (11));

} else {
var statearr_62040_62065 = state_62018__$1;
(statearr_62040_62065[(1)] = (12));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_62019 === (8))){
var state_62018__$1 = state_62018;
var statearr_62041_62066 = state_62018__$1;
(statearr_62041_62066[(2)] = true);

(statearr_62041_62066[(1)] = (9));


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
}
}
}
});})(c__35961__auto__))
;
return ((function (switch__35847__auto__,c__35961__auto__){
return (function() {
var org$numenta$sanity$comportex$simulation$simulation_loop_$_state_machine__35848__auto__ = null;
var org$numenta$sanity$comportex$simulation$simulation_loop_$_state_machine__35848__auto____0 = (function (){
var statearr_62045 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_62045[(0)] = org$numenta$sanity$comportex$simulation$simulation_loop_$_state_machine__35848__auto__);

(statearr_62045[(1)] = (1));

return statearr_62045;
});
var org$numenta$sanity$comportex$simulation$simulation_loop_$_state_machine__35848__auto____1 = (function (state_62018){
while(true){
var ret_value__35849__auto__ = (function (){try{while(true){
var result__35850__auto__ = switch__35847__auto__(state_62018);
if(cljs.core.keyword_identical_QMARK_(result__35850__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__35850__auto__;
}
break;
}
}catch (e62046){if((e62046 instanceof Object)){
var ex__35851__auto__ = e62046;
var statearr_62047_62067 = state_62018;
(statearr_62047_62067[(5)] = ex__35851__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_62018);

return cljs.core.cst$kw$recur;
} else {
throw e62046;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35849__auto__,cljs.core.cst$kw$recur)){
var G__62068 = state_62018;
state_62018 = G__62068;
continue;
} else {
return ret_value__35849__auto__;
}
break;
}
});
org$numenta$sanity$comportex$simulation$simulation_loop_$_state_machine__35848__auto__ = function(state_62018){
switch(arguments.length){
case 0:
return org$numenta$sanity$comportex$simulation$simulation_loop_$_state_machine__35848__auto____0.call(this);
case 1:
return org$numenta$sanity$comportex$simulation$simulation_loop_$_state_machine__35848__auto____1.call(this,state_62018);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$comportex$simulation$simulation_loop_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$comportex$simulation$simulation_loop_$_state_machine__35848__auto____0;
org$numenta$sanity$comportex$simulation$simulation_loop_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$comportex$simulation$simulation_loop_$_state_machine__35848__auto____1;
return org$numenta$sanity$comportex$simulation$simulation_loop_$_state_machine__35848__auto__;
})()
;})(switch__35847__auto__,c__35961__auto__))
})();
var state__35963__auto__ = (function (){var statearr_62048 = (f__35962__auto__.cljs$core$IFn$_invoke$arity$0 ? f__35962__auto__.cljs$core$IFn$_invoke$arity$0() : f__35962__auto__.call(null));
(statearr_62048[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__35961__auto__);

return statearr_62048;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__35963__auto__);
});})(c__35961__auto__))
);

return c__35961__auto__;
});
org.numenta.sanity.comportex.simulation.command_handler = (function org$numenta$sanity$comportex$simulation$command_handler(model,options,status,status_subscribers,client_infos,all_client_infos){
return (function org$numenta$sanity$comportex$simulation$command_handler_$_handle_command(c){
var vec__62114 = c;
var vec__62115 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62114,(0),null);
var command = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62115,(0),null);
var xs = cljs.core.nthnext(vec__62115,(1));
var client_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62114,(1),null);
var client_info = (function (){var or__4682__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(client_infos) : cljs.core.deref.call(null,client_infos)),client_id);
if(cljs.core.truth_(or__4682__auto__)){
return or__4682__auto__;
} else {
var v = (function (){var G__62116 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__62116) : cljs.core.atom.call(null,G__62116));
})();
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(client_infos,cljs.core.assoc,client_id,v);

return v;
}
})();
var G__62117 = command;
switch (G__62117) {
case "client-disconnect":
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["SIMULATION: Client disconnected."], 0));

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(status_subscribers,cljs.core.disj,cljs.core.cst$kw$sim_DASH_status_DASH_subscriber.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(client_info) : cljs.core.deref.call(null,client_info))));

break;
case "connect":
var vec__62118 = xs;
var old_client_info = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62118,(0),null);
var map__62119 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62118,(1),null);
var map__62119__$1 = ((((!((map__62119 == null)))?((((map__62119.cljs$lang$protocol_mask$partition0$ & (64))) || (map__62119.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__62119):map__62119);
var subscriber_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__62119__$1,cljs.core.cst$kw$ch);
cljs.core.add_watch(client_info,cljs.core.cst$kw$org$numenta$sanity$comportex$simulation_SLASH_push_DASH_to_DASH_client,((function (vec__62118,old_client_info,map__62119,map__62119__$1,subscriber_c,G__62117,vec__62114,vec__62115,command,xs,client_id,client_info){
return (function (_,___$1,___$2,v){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(subscriber_c,cljs.core.update.cljs$core$IFn$_invoke$arity$3(v,cljs.core.cst$kw$sim_DASH_status_DASH_subscriber,((function (vec__62118,old_client_info,map__62119,map__62119__$1,subscriber_c,G__62117,vec__62114,vec__62115,command,xs,client_id,client_info){
return (function (subscriber_mchannel){
return org.numenta.sanity.bridge.marshalling.channel_weak(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(subscriber_mchannel,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$ch,cljs.core.cst$kw$target_DASH_id], null)));
});})(vec__62118,old_client_info,map__62119,map__62119__$1,subscriber_c,G__62117,vec__62114,vec__62115,command,xs,client_id,client_info))
));
});})(vec__62118,old_client_info,map__62119,map__62119__$1,subscriber_c,G__62117,vec__62114,vec__62115,command,xs,client_id,client_info))
);

var temp__4653__auto__ = cljs.core.cst$kw$sim_DASH_status_DASH_subscriber.cljs$core$IFn$_invoke$arity$1(old_client_info);
if(cljs.core.truth_(temp__4653__auto__)){
var map__62121 = temp__4653__auto__;
var map__62121__$1 = ((((!((map__62121 == null)))?((((map__62121.cljs$lang$protocol_mask$partition0$ & (64))) || (map__62121.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__62121):map__62121);
var subscriber_c__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__62121__$1,cljs.core.cst$kw$ch);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["SIMULATION: Client resubscribed to status."], 0));

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(status_subscribers,cljs.core.conj,subscriber_c__$1);

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(client_info,cljs.core.assoc,cljs.core.cst$kw$sim_DASH_status_DASH_subscriber,subscriber_c__$1);
} else {
return null;
}

break;
case "step":
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(options,cljs.core.update,cljs.core.cst$kw$force_DASH_n_DASH_steps,cljs.core.inc);

break;
case "set-spec":
var vec__62123 = xs;
var path = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62123,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62123,(1),null);
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(model,cljs.core.assoc_in,path,v);

break;
case "restart":
var vec__62124 = xs;
var map__62125 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62124,(0),null);
var map__62125__$1 = ((((!((map__62125 == null)))?((((map__62125.cljs$lang$protocol_mask$partition0$ & (64))) || (map__62125.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__62125):map__62125);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__62125__$1,cljs.core.cst$kw$ch);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(model,org.nfrac.comportex.protocols.restart);

return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,cljs.core.cst$kw$done);

break;
case "toggle":
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["SIMULATION TOGGLE. Current timestep:",org.nfrac.comportex.protocols.timestep((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(model) : cljs.core.deref.call(null,model))),cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(options,cljs.core.update,cljs.core.cst$kw$go_QMARK_,cljs.core.not)], 0));

break;
case "pause":
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["SIMULATION PAUSE. Current timestep:",org.nfrac.comportex.protocols.timestep((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(model) : cljs.core.deref.call(null,model)))], 0));

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(options,cljs.core.assoc,cljs.core.cst$kw$go_QMARK_,false);

break;
case "run":
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["SIMULATION RUN. Current timestep:",org.nfrac.comportex.protocols.timestep((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(model) : cljs.core.deref.call(null,model)))], 0));

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(options,cljs.core.assoc,cljs.core.cst$kw$go_QMARK_,true);

break;
case "set-step-ms":
var vec__62127 = xs;
var t = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62127,(0),null);
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(options,cljs.core.assoc,cljs.core.cst$kw$step_DASH_ms,t);

break;
case "subscribe-to-status":
var vec__62128 = xs;
var subscriber_mchannel = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62128,(0),null);
var subscriber_c = cljs.core.cst$kw$ch.cljs$core$IFn$_invoke$arity$1(subscriber_mchannel);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["SIMULATION: Client subscribed to status."], 0));

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(status_subscribers,cljs.core.conj,subscriber_c);

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(client_info,cljs.core.assoc,cljs.core.cst$kw$sim_DASH_status_DASH_subscriber,subscriber_mchannel);

return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(subscriber_c,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(status) : cljs.core.deref.call(null,status))], null));

break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(command)].join('')));

}
});
});
org.numenta.sanity.comportex.simulation.handle_commands = (function org$numenta$sanity$comportex$simulation$handle_commands(commands,model,options,sim_closed_QMARK_){
var status = (function (){var G__62182 = cljs.core.cst$kw$go_QMARK_.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(options) : cljs.core.deref.call(null,options)));
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__62182) : cljs.core.atom.call(null,G__62182));
})();
var status_subscribers = (function (){var G__62183 = cljs.core.PersistentHashSet.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__62183) : cljs.core.atom.call(null,G__62183));
})();
var client_infos = (function (){var G__62184 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__62184) : cljs.core.atom.call(null,G__62184));
})();
var all_client_infos = (function (){var G__62185 = cljs.core.PersistentHashSet.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__62185) : cljs.core.atom.call(null,G__62185));
})();
var handle_command = org.numenta.sanity.comportex.simulation.command_handler(model,options,status,status_subscribers,client_infos,all_client_infos);
cljs.core.add_watch(options,cljs.core.cst$kw$org$numenta$sanity$comportex$simulation_SLASH_extract_DASH_status_DASH_change,((function (status,status_subscribers,client_infos,all_client_infos,handle_command){
return (function (_,___$1,oldv,newv){
var map__62186 = newv;
var map__62186__$1 = ((((!((map__62186 == null)))?((((map__62186.cljs$lang$protocol_mask$partition0$ & (64))) || (map__62186.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__62186):map__62186);
var go_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__62186__$1,cljs.core.cst$kw$go_QMARK_);
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(go_QMARK_,cljs.core.cst$kw$go_QMARK_.cljs$core$IFn$_invoke$arity$1(oldv))){
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(status,go_QMARK_) : cljs.core.reset_BANG_.call(null,status,go_QMARK_));
} else {
return null;
}
});})(status,status_subscribers,client_infos,all_client_infos,handle_command))
);

cljs.core.add_watch(status,cljs.core.cst$kw$org$numenta$sanity$comportex$simulation_SLASH_push_DASH_to_DASH_subscribers,((function (status,status_subscribers,client_infos,all_client_infos,handle_command){
return (function (_,___$1,___$2,v){
var seq__62188 = cljs.core.seq((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(status_subscribers) : cljs.core.deref.call(null,status_subscribers)));
var chunk__62189 = null;
var count__62190 = (0);
var i__62191 = (0);
while(true){
if((i__62191 < count__62190)){
var ch = chunk__62189.cljs$core$IIndexed$_nth$arity$2(null,i__62191);
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(ch,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [v], null));

var G__62234 = seq__62188;
var G__62235 = chunk__62189;
var G__62236 = count__62190;
var G__62237 = (i__62191 + (1));
seq__62188 = G__62234;
chunk__62189 = G__62235;
count__62190 = G__62236;
i__62191 = G__62237;
continue;
} else {
var temp__4653__auto__ = cljs.core.seq(seq__62188);
if(temp__4653__auto__){
var seq__62188__$1 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__62188__$1)){
var c__5485__auto__ = cljs.core.chunk_first(seq__62188__$1);
var G__62238 = cljs.core.chunk_rest(seq__62188__$1);
var G__62239 = c__5485__auto__;
var G__62240 = cljs.core.count(c__5485__auto__);
var G__62241 = (0);
seq__62188 = G__62238;
chunk__62189 = G__62239;
count__62190 = G__62240;
i__62191 = G__62241;
continue;
} else {
var ch = cljs.core.first(seq__62188__$1);
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(ch,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [v], null));

var G__62242 = cljs.core.next(seq__62188__$1);
var G__62243 = null;
var G__62244 = (0);
var G__62245 = (0);
seq__62188 = G__62242;
chunk__62189 = G__62243;
count__62190 = G__62244;
i__62191 = G__62245;
continue;
}
} else {
return null;
}
}
break;
}
});})(status,status_subscribers,client_infos,all_client_infos,handle_command))
);

var c__35961__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__35961__auto__,status,status_subscribers,client_infos,all_client_infos,handle_command){
return (function (){
var f__35962__auto__ = (function (){var switch__35847__auto__ = ((function (c__35961__auto__,status,status_subscribers,client_infos,all_client_infos,handle_command){
return (function (state_62213){
var state_val_62214 = (state_62213[(1)]);
if((state_val_62214 === (7))){
var inst_62197 = (state_62213[(7)]);
var inst_62197__$1 = (state_62213[(2)]);
var inst_62198 = (inst_62197__$1 == null);
var inst_62199 = cljs.core.not(inst_62198);
var state_62213__$1 = (function (){var statearr_62215 = state_62213;
(statearr_62215[(7)] = inst_62197__$1);

return statearr_62215;
})();
if(inst_62199){
var statearr_62216_62246 = state_62213__$1;
(statearr_62216_62246[(1)] = (8));

} else {
var statearr_62217_62247 = state_62213__$1;
(statearr_62217_62247[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_62214 === (1))){
var state_62213__$1 = state_62213;
var statearr_62218_62248 = state_62213__$1;
(statearr_62218_62248[(2)] = null);

(statearr_62218_62248[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_62214 === (4))){
var state_62213__$1 = state_62213;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_62213__$1,(7),commands);
} else {
if((state_val_62214 === (6))){
var inst_62209 = (state_62213[(2)]);
var state_62213__$1 = state_62213;
var statearr_62219_62249 = state_62213__$1;
(statearr_62219_62249[(2)] = inst_62209);

(statearr_62219_62249[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_62214 === (3))){
var inst_62211 = (state_62213[(2)]);
var state_62213__$1 = state_62213;
return cljs.core.async.impl.ioc_helpers.return_chan(state_62213__$1,inst_62211);
} else {
if((state_val_62214 === (2))){
var inst_62193 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(sim_closed_QMARK_) : cljs.core.deref.call(null,sim_closed_QMARK_));
var inst_62194 = cljs.core.not(inst_62193);
var state_62213__$1 = state_62213;
if(inst_62194){
var statearr_62220_62250 = state_62213__$1;
(statearr_62220_62250[(1)] = (4));

} else {
var statearr_62221_62251 = state_62213__$1;
(statearr_62221_62251[(1)] = (5));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_62214 === (9))){
var inst_62204 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(sim_closed_QMARK_,true) : cljs.core.reset_BANG_.call(null,sim_closed_QMARK_,true));
var state_62213__$1 = state_62213;
var statearr_62222_62252 = state_62213__$1;
(statearr_62222_62252[(2)] = inst_62204);

(statearr_62222_62252[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_62214 === (5))){
var state_62213__$1 = state_62213;
var statearr_62223_62253 = state_62213__$1;
(statearr_62223_62253[(2)] = null);

(statearr_62223_62253[(1)] = (6));


return cljs.core.cst$kw$recur;
} else {
if((state_val_62214 === (10))){
var inst_62206 = (state_62213[(2)]);
var state_62213__$1 = state_62213;
var statearr_62224_62254 = state_62213__$1;
(statearr_62224_62254[(2)] = inst_62206);

(statearr_62224_62254[(1)] = (6));


return cljs.core.cst$kw$recur;
} else {
if((state_val_62214 === (8))){
var inst_62197 = (state_62213[(7)]);
var inst_62201 = (handle_command.cljs$core$IFn$_invoke$arity$1 ? handle_command.cljs$core$IFn$_invoke$arity$1(inst_62197) : handle_command.call(null,inst_62197));
var state_62213__$1 = (function (){var statearr_62225 = state_62213;
(statearr_62225[(8)] = inst_62201);

return statearr_62225;
})();
var statearr_62226_62255 = state_62213__$1;
(statearr_62226_62255[(2)] = null);

(statearr_62226_62255[(1)] = (2));


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
});})(c__35961__auto__,status,status_subscribers,client_infos,all_client_infos,handle_command))
;
return ((function (switch__35847__auto__,c__35961__auto__,status,status_subscribers,client_infos,all_client_infos,handle_command){
return (function() {
var org$numenta$sanity$comportex$simulation$handle_commands_$_state_machine__35848__auto__ = null;
var org$numenta$sanity$comportex$simulation$handle_commands_$_state_machine__35848__auto____0 = (function (){
var statearr_62230 = [null,null,null,null,null,null,null,null,null];
(statearr_62230[(0)] = org$numenta$sanity$comportex$simulation$handle_commands_$_state_machine__35848__auto__);

(statearr_62230[(1)] = (1));

return statearr_62230;
});
var org$numenta$sanity$comportex$simulation$handle_commands_$_state_machine__35848__auto____1 = (function (state_62213){
while(true){
var ret_value__35849__auto__ = (function (){try{while(true){
var result__35850__auto__ = switch__35847__auto__(state_62213);
if(cljs.core.keyword_identical_QMARK_(result__35850__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__35850__auto__;
}
break;
}
}catch (e62231){if((e62231 instanceof Object)){
var ex__35851__auto__ = e62231;
var statearr_62232_62256 = state_62213;
(statearr_62232_62256[(5)] = ex__35851__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_62213);

return cljs.core.cst$kw$recur;
} else {
throw e62231;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35849__auto__,cljs.core.cst$kw$recur)){
var G__62257 = state_62213;
state_62213 = G__62257;
continue;
} else {
return ret_value__35849__auto__;
}
break;
}
});
org$numenta$sanity$comportex$simulation$handle_commands_$_state_machine__35848__auto__ = function(state_62213){
switch(arguments.length){
case 0:
return org$numenta$sanity$comportex$simulation$handle_commands_$_state_machine__35848__auto____0.call(this);
case 1:
return org$numenta$sanity$comportex$simulation$handle_commands_$_state_machine__35848__auto____1.call(this,state_62213);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$comportex$simulation$handle_commands_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$comportex$simulation$handle_commands_$_state_machine__35848__auto____0;
org$numenta$sanity$comportex$simulation$handle_commands_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$comportex$simulation$handle_commands_$_state_machine__35848__auto____1;
return org$numenta$sanity$comportex$simulation$handle_commands_$_state_machine__35848__auto__;
})()
;})(switch__35847__auto__,c__35961__auto__,status,status_subscribers,client_infos,all_client_infos,handle_command))
})();
var state__35963__auto__ = (function (){var statearr_62233 = (f__35962__auto__.cljs$core$IFn$_invoke$arity$0 ? f__35962__auto__.cljs$core$IFn$_invoke$arity$0() : f__35962__auto__.call(null));
(statearr_62233[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__35961__auto__);

return statearr_62233;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__35963__auto__);
});})(c__35961__auto__,status,status_subscribers,client_infos,all_client_infos,handle_command))
);

return c__35961__auto__;
});
org.numenta.sanity.comportex.simulation.start = (function org$numenta$sanity$comportex$simulation$start(steps_c,model_atom,world_c,commands_c,htm_step){
var options_62260 = (function (){var G__62259 = new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$go_QMARK_,false,cljs.core.cst$kw$step_DASH_ms,(20),cljs.core.cst$kw$force_DASH_n_DASH_steps,(0)], null);
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__62259) : cljs.core.atom.call(null,G__62259));
})();
var sim_closed_QMARK__62261 = (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(false) : cljs.core.atom.call(null,false));
if(cljs.core.truth_(commands_c)){
org.numenta.sanity.comportex.simulation.handle_commands(commands_c,model_atom,options_62260,sim_closed_QMARK__62261);
} else {
}

org.numenta.sanity.comportex.simulation.simulation_loop(model_atom,world_c,steps_c,options_62260,sim_closed_QMARK__62261,htm_step);

return null;
});
