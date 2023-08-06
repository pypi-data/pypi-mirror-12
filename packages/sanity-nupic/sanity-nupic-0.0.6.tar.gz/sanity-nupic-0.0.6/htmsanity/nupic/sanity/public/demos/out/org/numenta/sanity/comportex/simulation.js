// Compiled by ClojureScript 1.7.170 {:static-fns true, :optimize-constants true}
goog.provide('org.numenta.sanity.comportex.simulation');
goog.require('cljs.core');
goog.require('org.nfrac.comportex.protocols');
goog.require('cljs.core.async');
goog.require('org.numenta.sanity.bridge.marshalling');
goog.require('org.nfrac.comportex.core');
goog.require('org.nfrac.comportex.util');
org.numenta.sanity.comportex.simulation.should_go_QMARK__BANG_ = (function org$numenta$sanity$comportex$simulation$should_go_QMARK__BANG_(options){
var map__61919 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(options) : cljs.core.deref.call(null,options));
var map__61919__$1 = ((((!((map__61919 == null)))?((((map__61919.cljs$lang$protocol_mask$partition0$ & (64))) || (map__61919.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__61919):map__61919);
var go_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__61919__$1,cljs.core.cst$kw$go_QMARK_);
var force_n_steps = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__61919__$1,cljs.core.cst$kw$force_DASH_n_DASH_steps);
var step_ms = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__61919__$1,cljs.core.cst$kw$step_DASH_ms);
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
return (function (state_62020){
var state_val_62021 = (state_62020[(1)]);
if((state_val_62021 === (7))){
var state_62020__$1 = state_62020;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_62020__$1,(10),world);
} else {
if((state_val_62021 === (1))){
var state_62020__$1 = state_62020;
var statearr_62022_62051 = state_62020__$1;
(statearr_62022_62051[(2)] = null);

(statearr_62022_62051[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_62021 === (4))){
var inst_61990 = (state_62020[(7)]);
var inst_61990__$1 = org.numenta.sanity.comportex.simulation.should_go_QMARK__BANG_(options);
var state_62020__$1 = (function (){var statearr_62023 = state_62020;
(statearr_62023[(7)] = inst_61990__$1);

return statearr_62023;
})();
if(cljs.core.truth_(inst_61990__$1)){
var statearr_62024_62052 = state_62020__$1;
(statearr_62024_62052[(1)] = (7));

} else {
var statearr_62025_62053 = state_62020__$1;
(statearr_62025_62053[(1)] = (8));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_62021 === (15))){
var inst_62013 = (function (){return ((function (state_val_62021,c__35961__auto__){
return (function (_,___$1,___$2,___$3){
cljs.core.remove_watch(options,cljs.core.cst$kw$run_DASH_sim);

return org$numenta$sanity$comportex$simulation$simulation_loop(model,world,out,options,sim_closed_QMARK_,htm_step);
});
;})(state_val_62021,c__35961__auto__))
})();
var inst_62014 = cljs.core.add_watch(options,cljs.core.cst$kw$run_DASH_sim,inst_62013);
var state_62020__$1 = state_62020;
var statearr_62026_62054 = state_62020__$1;
(statearr_62026_62054[(2)] = inst_62014);

(statearr_62026_62054[(1)] = (17));


return cljs.core.cst$kw$recur;
} else {
if((state_val_62021 === (13))){
var inst_62003 = (state_62020[(2)]);
var state_62020__$1 = state_62020;
var statearr_62027_62055 = state_62020__$1;
(statearr_62027_62055[(2)] = inst_62003);

(statearr_62027_62055[(1)] = (9));


return cljs.core.cst$kw$recur;
} else {
if((state_val_62021 === (6))){
var inst_62009 = (state_62020[(2)]);
var state_62020__$1 = state_62020;
var statearr_62028_62056 = state_62020__$1;
(statearr_62028_62056[(2)] = inst_62009);

(statearr_62028_62056[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_62021 === (17))){
var inst_62018 = (state_62020[(2)]);
var state_62020__$1 = state_62020;
return cljs.core.async.impl.ioc_helpers.return_chan(state_62020__$1,inst_62018);
} else {
if((state_val_62021 === (3))){
var inst_62011 = (state_62020[(2)]);
var state_62020__$1 = state_62020;
if(cljs.core.truth_(inst_62011)){
var statearr_62029_62057 = state_62020__$1;
(statearr_62029_62057[(1)] = (15));

} else {
var statearr_62030_62058 = state_62020__$1;
(statearr_62030_62058[(1)] = (16));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_62021 === (12))){
var state_62020__$1 = state_62020;
var statearr_62031_62059 = state_62020__$1;
(statearr_62031_62059[(2)] = null);

(statearr_62031_62059[(1)] = (13));


return cljs.core.cst$kw$recur;
} else {
if((state_val_62021 === (2))){
var inst_61987 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(sim_closed_QMARK_) : cljs.core.deref.call(null,sim_closed_QMARK_));
var inst_61988 = cljs.core.not(inst_61987);
var state_62020__$1 = state_62020;
if(inst_61988){
var statearr_62032_62060 = state_62020__$1;
(statearr_62032_62060[(1)] = (4));

} else {
var statearr_62033_62061 = state_62020__$1;
(statearr_62033_62061[(1)] = (5));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_62021 === (11))){
var inst_61990 = (state_62020[(7)]);
var inst_61993 = (state_62020[(8)]);
var inst_61995 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(model,htm_step,inst_61993);
var inst_61996 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(out,inst_61995);
var inst_61997 = cljs.core.async.timeout(inst_61990);
var state_62020__$1 = (function (){var statearr_62034 = state_62020;
(statearr_62034[(9)] = inst_61996);

return statearr_62034;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_62020__$1,(14),inst_61997);
} else {
if((state_val_62021 === (9))){
var inst_62006 = (state_62020[(2)]);
var state_62020__$1 = state_62020;
var statearr_62035_62062 = state_62020__$1;
(statearr_62035_62062[(2)] = inst_62006);

(statearr_62035_62062[(1)] = (6));


return cljs.core.cst$kw$recur;
} else {
if((state_val_62021 === (5))){
var state_62020__$1 = state_62020;
var statearr_62036_62063 = state_62020__$1;
(statearr_62036_62063[(2)] = null);

(statearr_62036_62063[(1)] = (6));


return cljs.core.cst$kw$recur;
} else {
if((state_val_62021 === (14))){
var inst_61999 = (state_62020[(2)]);
var state_62020__$1 = (function (){var statearr_62037 = state_62020;
(statearr_62037[(10)] = inst_61999);

return statearr_62037;
})();
var statearr_62038_62064 = state_62020__$1;
(statearr_62038_62064[(2)] = null);

(statearr_62038_62064[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_62021 === (16))){
var inst_62016 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(sim_closed_QMARK_,true) : cljs.core.reset_BANG_.call(null,sim_closed_QMARK_,true));
var state_62020__$1 = state_62020;
var statearr_62039_62065 = state_62020__$1;
(statearr_62039_62065[(2)] = inst_62016);

(statearr_62039_62065[(1)] = (17));


return cljs.core.cst$kw$recur;
} else {
if((state_val_62021 === (10))){
var inst_61993 = (state_62020[(8)]);
var inst_61993__$1 = (state_62020[(2)]);
var state_62020__$1 = (function (){var statearr_62040 = state_62020;
(statearr_62040[(8)] = inst_61993__$1);

return statearr_62040;
})();
if(cljs.core.truth_(inst_61993__$1)){
var statearr_62041_62066 = state_62020__$1;
(statearr_62041_62066[(1)] = (11));

} else {
var statearr_62042_62067 = state_62020__$1;
(statearr_62042_62067[(1)] = (12));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_62021 === (8))){
var state_62020__$1 = state_62020;
var statearr_62043_62068 = state_62020__$1;
(statearr_62043_62068[(2)] = true);

(statearr_62043_62068[(1)] = (9));


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
var statearr_62047 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_62047[(0)] = org$numenta$sanity$comportex$simulation$simulation_loop_$_state_machine__35848__auto__);

(statearr_62047[(1)] = (1));

return statearr_62047;
});
var org$numenta$sanity$comportex$simulation$simulation_loop_$_state_machine__35848__auto____1 = (function (state_62020){
while(true){
var ret_value__35849__auto__ = (function (){try{while(true){
var result__35850__auto__ = switch__35847__auto__(state_62020);
if(cljs.core.keyword_identical_QMARK_(result__35850__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__35850__auto__;
}
break;
}
}catch (e62048){if((e62048 instanceof Object)){
var ex__35851__auto__ = e62048;
var statearr_62049_62069 = state_62020;
(statearr_62049_62069[(5)] = ex__35851__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_62020);

return cljs.core.cst$kw$recur;
} else {
throw e62048;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35849__auto__,cljs.core.cst$kw$recur)){
var G__62070 = state_62020;
state_62020 = G__62070;
continue;
} else {
return ret_value__35849__auto__;
}
break;
}
});
org$numenta$sanity$comportex$simulation$simulation_loop_$_state_machine__35848__auto__ = function(state_62020){
switch(arguments.length){
case 0:
return org$numenta$sanity$comportex$simulation$simulation_loop_$_state_machine__35848__auto____0.call(this);
case 1:
return org$numenta$sanity$comportex$simulation$simulation_loop_$_state_machine__35848__auto____1.call(this,state_62020);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$comportex$simulation$simulation_loop_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$comportex$simulation$simulation_loop_$_state_machine__35848__auto____0;
org$numenta$sanity$comportex$simulation$simulation_loop_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$comportex$simulation$simulation_loop_$_state_machine__35848__auto____1;
return org$numenta$sanity$comportex$simulation$simulation_loop_$_state_machine__35848__auto__;
})()
;})(switch__35847__auto__,c__35961__auto__))
})();
var state__35963__auto__ = (function (){var statearr_62050 = (f__35962__auto__.cljs$core$IFn$_invoke$arity$0 ? f__35962__auto__.cljs$core$IFn$_invoke$arity$0() : f__35962__auto__.call(null));
(statearr_62050[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__35961__auto__);

return statearr_62050;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__35963__auto__);
});})(c__35961__auto__))
);

return c__35961__auto__;
});
org.numenta.sanity.comportex.simulation.command_handler = (function org$numenta$sanity$comportex$simulation$command_handler(model,options,status,status_subscribers,client_infos,all_client_infos){
return (function org$numenta$sanity$comportex$simulation$command_handler_$_handle_command(c){
var vec__62116 = c;
var vec__62117 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62116,(0),null);
var command = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62117,(0),null);
var xs = cljs.core.nthnext(vec__62117,(1));
var client_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62116,(1),null);
var client_info = (function (){var or__4682__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(client_infos) : cljs.core.deref.call(null,client_infos)),client_id);
if(cljs.core.truth_(or__4682__auto__)){
return or__4682__auto__;
} else {
var v = (function (){var G__62118 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__62118) : cljs.core.atom.call(null,G__62118));
})();
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(client_infos,cljs.core.assoc,client_id,v);

return v;
}
})();
var G__62119 = command;
switch (G__62119) {
case "client-disconnect":
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["SIMULATION: Client disconnected."], 0));

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(status_subscribers,cljs.core.disj,cljs.core.cst$kw$sim_DASH_status_DASH_subscriber.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(client_info) : cljs.core.deref.call(null,client_info))));

break;
case "connect":
var vec__62120 = xs;
var old_client_info = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62120,(0),null);
var map__62121 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62120,(1),null);
var map__62121__$1 = ((((!((map__62121 == null)))?((((map__62121.cljs$lang$protocol_mask$partition0$ & (64))) || (map__62121.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__62121):map__62121);
var subscriber_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__62121__$1,cljs.core.cst$kw$ch);
cljs.core.add_watch(client_info,cljs.core.cst$kw$org$numenta$sanity$comportex$simulation_SLASH_push_DASH_to_DASH_client,((function (vec__62120,old_client_info,map__62121,map__62121__$1,subscriber_c,G__62119,vec__62116,vec__62117,command,xs,client_id,client_info){
return (function (_,___$1,___$2,v){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(subscriber_c,cljs.core.update.cljs$core$IFn$_invoke$arity$3(v,cljs.core.cst$kw$sim_DASH_status_DASH_subscriber,((function (vec__62120,old_client_info,map__62121,map__62121__$1,subscriber_c,G__62119,vec__62116,vec__62117,command,xs,client_id,client_info){
return (function (subscriber_mchannel){
return org.numenta.sanity.bridge.marshalling.channel_weak(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(subscriber_mchannel,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$ch,cljs.core.cst$kw$target_DASH_id], null)));
});})(vec__62120,old_client_info,map__62121,map__62121__$1,subscriber_c,G__62119,vec__62116,vec__62117,command,xs,client_id,client_info))
));
});})(vec__62120,old_client_info,map__62121,map__62121__$1,subscriber_c,G__62119,vec__62116,vec__62117,command,xs,client_id,client_info))
);

var temp__4653__auto__ = cljs.core.cst$kw$sim_DASH_status_DASH_subscriber.cljs$core$IFn$_invoke$arity$1(old_client_info);
if(cljs.core.truth_(temp__4653__auto__)){
var map__62123 = temp__4653__auto__;
var map__62123__$1 = ((((!((map__62123 == null)))?((((map__62123.cljs$lang$protocol_mask$partition0$ & (64))) || (map__62123.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__62123):map__62123);
var subscriber_c__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__62123__$1,cljs.core.cst$kw$ch);
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
var vec__62125 = xs;
var path = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62125,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62125,(1),null);
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(model,cljs.core.assoc_in,path,v);

break;
case "restart":
var vec__62126 = xs;
var map__62127 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62126,(0),null);
var map__62127__$1 = ((((!((map__62127 == null)))?((((map__62127.cljs$lang$protocol_mask$partition0$ & (64))) || (map__62127.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__62127):map__62127);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__62127__$1,cljs.core.cst$kw$ch);
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
var vec__62129 = xs;
var t = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62129,(0),null);
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(options,cljs.core.assoc,cljs.core.cst$kw$step_DASH_ms,t);

break;
case "subscribe-to-status":
var vec__62130 = xs;
var subscriber_mchannel = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62130,(0),null);
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
var status = (function (){var G__62184 = cljs.core.cst$kw$go_QMARK_.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(options) : cljs.core.deref.call(null,options)));
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__62184) : cljs.core.atom.call(null,G__62184));
})();
var status_subscribers = (function (){var G__62185 = cljs.core.PersistentHashSet.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__62185) : cljs.core.atom.call(null,G__62185));
})();
var client_infos = (function (){var G__62186 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__62186) : cljs.core.atom.call(null,G__62186));
})();
var all_client_infos = (function (){var G__62187 = cljs.core.PersistentHashSet.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__62187) : cljs.core.atom.call(null,G__62187));
})();
var handle_command = org.numenta.sanity.comportex.simulation.command_handler(model,options,status,status_subscribers,client_infos,all_client_infos);
cljs.core.add_watch(options,cljs.core.cst$kw$org$numenta$sanity$comportex$simulation_SLASH_extract_DASH_status_DASH_change,((function (status,status_subscribers,client_infos,all_client_infos,handle_command){
return (function (_,___$1,oldv,newv){
var map__62188 = newv;
var map__62188__$1 = ((((!((map__62188 == null)))?((((map__62188.cljs$lang$protocol_mask$partition0$ & (64))) || (map__62188.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__62188):map__62188);
var go_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__62188__$1,cljs.core.cst$kw$go_QMARK_);
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(go_QMARK_,cljs.core.cst$kw$go_QMARK_.cljs$core$IFn$_invoke$arity$1(oldv))){
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(status,go_QMARK_) : cljs.core.reset_BANG_.call(null,status,go_QMARK_));
} else {
return null;
}
});})(status,status_subscribers,client_infos,all_client_infos,handle_command))
);

cljs.core.add_watch(status,cljs.core.cst$kw$org$numenta$sanity$comportex$simulation_SLASH_push_DASH_to_DASH_subscribers,((function (status,status_subscribers,client_infos,all_client_infos,handle_command){
return (function (_,___$1,___$2,v){
var seq__62190 = cljs.core.seq((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(status_subscribers) : cljs.core.deref.call(null,status_subscribers)));
var chunk__62191 = null;
var count__62192 = (0);
var i__62193 = (0);
while(true){
if((i__62193 < count__62192)){
var ch = chunk__62191.cljs$core$IIndexed$_nth$arity$2(null,i__62193);
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(ch,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [v], null));

var G__62236 = seq__62190;
var G__62237 = chunk__62191;
var G__62238 = count__62192;
var G__62239 = (i__62193 + (1));
seq__62190 = G__62236;
chunk__62191 = G__62237;
count__62192 = G__62238;
i__62193 = G__62239;
continue;
} else {
var temp__4653__auto__ = cljs.core.seq(seq__62190);
if(temp__4653__auto__){
var seq__62190__$1 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__62190__$1)){
var c__5485__auto__ = cljs.core.chunk_first(seq__62190__$1);
var G__62240 = cljs.core.chunk_rest(seq__62190__$1);
var G__62241 = c__5485__auto__;
var G__62242 = cljs.core.count(c__5485__auto__);
var G__62243 = (0);
seq__62190 = G__62240;
chunk__62191 = G__62241;
count__62192 = G__62242;
i__62193 = G__62243;
continue;
} else {
var ch = cljs.core.first(seq__62190__$1);
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(ch,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [v], null));

var G__62244 = cljs.core.next(seq__62190__$1);
var G__62245 = null;
var G__62246 = (0);
var G__62247 = (0);
seq__62190 = G__62244;
chunk__62191 = G__62245;
count__62192 = G__62246;
i__62193 = G__62247;
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
return (function (state_62215){
var state_val_62216 = (state_62215[(1)]);
if((state_val_62216 === (7))){
var inst_62199 = (state_62215[(7)]);
var inst_62199__$1 = (state_62215[(2)]);
var inst_62200 = (inst_62199__$1 == null);
var inst_62201 = cljs.core.not(inst_62200);
var state_62215__$1 = (function (){var statearr_62217 = state_62215;
(statearr_62217[(7)] = inst_62199__$1);

return statearr_62217;
})();
if(inst_62201){
var statearr_62218_62248 = state_62215__$1;
(statearr_62218_62248[(1)] = (8));

} else {
var statearr_62219_62249 = state_62215__$1;
(statearr_62219_62249[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_62216 === (1))){
var state_62215__$1 = state_62215;
var statearr_62220_62250 = state_62215__$1;
(statearr_62220_62250[(2)] = null);

(statearr_62220_62250[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_62216 === (4))){
var state_62215__$1 = state_62215;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_62215__$1,(7),commands);
} else {
if((state_val_62216 === (6))){
var inst_62211 = (state_62215[(2)]);
var state_62215__$1 = state_62215;
var statearr_62221_62251 = state_62215__$1;
(statearr_62221_62251[(2)] = inst_62211);

(statearr_62221_62251[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_62216 === (3))){
var inst_62213 = (state_62215[(2)]);
var state_62215__$1 = state_62215;
return cljs.core.async.impl.ioc_helpers.return_chan(state_62215__$1,inst_62213);
} else {
if((state_val_62216 === (2))){
var inst_62195 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(sim_closed_QMARK_) : cljs.core.deref.call(null,sim_closed_QMARK_));
var inst_62196 = cljs.core.not(inst_62195);
var state_62215__$1 = state_62215;
if(inst_62196){
var statearr_62222_62252 = state_62215__$1;
(statearr_62222_62252[(1)] = (4));

} else {
var statearr_62223_62253 = state_62215__$1;
(statearr_62223_62253[(1)] = (5));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_62216 === (9))){
var inst_62206 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(sim_closed_QMARK_,true) : cljs.core.reset_BANG_.call(null,sim_closed_QMARK_,true));
var state_62215__$1 = state_62215;
var statearr_62224_62254 = state_62215__$1;
(statearr_62224_62254[(2)] = inst_62206);

(statearr_62224_62254[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_62216 === (5))){
var state_62215__$1 = state_62215;
var statearr_62225_62255 = state_62215__$1;
(statearr_62225_62255[(2)] = null);

(statearr_62225_62255[(1)] = (6));


return cljs.core.cst$kw$recur;
} else {
if((state_val_62216 === (10))){
var inst_62208 = (state_62215[(2)]);
var state_62215__$1 = state_62215;
var statearr_62226_62256 = state_62215__$1;
(statearr_62226_62256[(2)] = inst_62208);

(statearr_62226_62256[(1)] = (6));


return cljs.core.cst$kw$recur;
} else {
if((state_val_62216 === (8))){
var inst_62199 = (state_62215[(7)]);
var inst_62203 = (handle_command.cljs$core$IFn$_invoke$arity$1 ? handle_command.cljs$core$IFn$_invoke$arity$1(inst_62199) : handle_command.call(null,inst_62199));
var state_62215__$1 = (function (){var statearr_62227 = state_62215;
(statearr_62227[(8)] = inst_62203);

return statearr_62227;
})();
var statearr_62228_62257 = state_62215__$1;
(statearr_62228_62257[(2)] = null);

(statearr_62228_62257[(1)] = (2));


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
var statearr_62232 = [null,null,null,null,null,null,null,null,null];
(statearr_62232[(0)] = org$numenta$sanity$comportex$simulation$handle_commands_$_state_machine__35848__auto__);

(statearr_62232[(1)] = (1));

return statearr_62232;
});
var org$numenta$sanity$comportex$simulation$handle_commands_$_state_machine__35848__auto____1 = (function (state_62215){
while(true){
var ret_value__35849__auto__ = (function (){try{while(true){
var result__35850__auto__ = switch__35847__auto__(state_62215);
if(cljs.core.keyword_identical_QMARK_(result__35850__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__35850__auto__;
}
break;
}
}catch (e62233){if((e62233 instanceof Object)){
var ex__35851__auto__ = e62233;
var statearr_62234_62258 = state_62215;
(statearr_62234_62258[(5)] = ex__35851__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_62215);

return cljs.core.cst$kw$recur;
} else {
throw e62233;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35849__auto__,cljs.core.cst$kw$recur)){
var G__62259 = state_62215;
state_62215 = G__62259;
continue;
} else {
return ret_value__35849__auto__;
}
break;
}
});
org$numenta$sanity$comportex$simulation$handle_commands_$_state_machine__35848__auto__ = function(state_62215){
switch(arguments.length){
case 0:
return org$numenta$sanity$comportex$simulation$handle_commands_$_state_machine__35848__auto____0.call(this);
case 1:
return org$numenta$sanity$comportex$simulation$handle_commands_$_state_machine__35848__auto____1.call(this,state_62215);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$comportex$simulation$handle_commands_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$comportex$simulation$handle_commands_$_state_machine__35848__auto____0;
org$numenta$sanity$comportex$simulation$handle_commands_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$comportex$simulation$handle_commands_$_state_machine__35848__auto____1;
return org$numenta$sanity$comportex$simulation$handle_commands_$_state_machine__35848__auto__;
})()
;})(switch__35847__auto__,c__35961__auto__,status,status_subscribers,client_infos,all_client_infos,handle_command))
})();
var state__35963__auto__ = (function (){var statearr_62235 = (f__35962__auto__.cljs$core$IFn$_invoke$arity$0 ? f__35962__auto__.cljs$core$IFn$_invoke$arity$0() : f__35962__auto__.call(null));
(statearr_62235[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__35961__auto__);

return statearr_62235;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__35963__auto__);
});})(c__35961__auto__,status,status_subscribers,client_infos,all_client_infos,handle_command))
);

return c__35961__auto__;
});
org.numenta.sanity.comportex.simulation.start = (function org$numenta$sanity$comportex$simulation$start(steps_c,model_atom,world_c,commands_c,htm_step){
var options_62262 = (function (){var G__62261 = new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$go_QMARK_,false,cljs.core.cst$kw$step_DASH_ms,(20),cljs.core.cst$kw$force_DASH_n_DASH_steps,(0)], null);
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__62261) : cljs.core.atom.call(null,G__62261));
})();
var sim_closed_QMARK__62263 = (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(false) : cljs.core.atom.call(null,false));
if(cljs.core.truth_(commands_c)){
org.numenta.sanity.comportex.simulation.handle_commands(commands_c,model_atom,options_62262,sim_closed_QMARK__62263);
} else {
}

org.numenta.sanity.comportex.simulation.simulation_loop(model_atom,world_c,steps_c,options_62262,sim_closed_QMARK__62263,htm_step);

return null;
});
