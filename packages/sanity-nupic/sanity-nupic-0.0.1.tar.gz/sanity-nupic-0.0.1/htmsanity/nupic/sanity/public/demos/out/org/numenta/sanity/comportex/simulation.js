// Compiled by ClojureScript 1.7.170 {:static-fns true, :optimize-constants true}
goog.provide('org.numenta.sanity.comportex.simulation');
goog.require('cljs.core');
goog.require('org.nfrac.comportex.protocols');
goog.require('cljs.core.async');
goog.require('org.numenta.sanity.bridge.marshalling');
goog.require('org.nfrac.comportex.core');
goog.require('org.nfrac.comportex.util');
org.numenta.sanity.comportex.simulation.should_go_QMARK__BANG_ = (function org$numenta$sanity$comportex$simulation$should_go_QMARK__BANG_(options){
var map__61912 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(options) : cljs.core.deref.call(null,options));
var map__61912__$1 = ((((!((map__61912 == null)))?((((map__61912.cljs$lang$protocol_mask$partition0$ & (64))) || (map__61912.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__61912):map__61912);
var go_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__61912__$1,cljs.core.cst$kw$go_QMARK_);
var force_n_steps = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__61912__$1,cljs.core.cst$kw$force_DASH_n_DASH_steps);
var step_ms = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__61912__$1,cljs.core.cst$kw$step_DASH_ms);
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
var c__36154__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__36154__auto__){
return (function (){
var f__36155__auto__ = (function (){var switch__36040__auto__ = ((function (c__36154__auto__){
return (function (state_62013){
var state_val_62014 = (state_62013[(1)]);
if((state_val_62014 === (7))){
var state_62013__$1 = state_62013;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_62013__$1,(10),world);
} else {
if((state_val_62014 === (1))){
var state_62013__$1 = state_62013;
var statearr_62015_62044 = state_62013__$1;
(statearr_62015_62044[(2)] = null);

(statearr_62015_62044[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_62014 === (4))){
var inst_61983 = (state_62013[(7)]);
var inst_61983__$1 = org.numenta.sanity.comportex.simulation.should_go_QMARK__BANG_(options);
var state_62013__$1 = (function (){var statearr_62016 = state_62013;
(statearr_62016[(7)] = inst_61983__$1);

return statearr_62016;
})();
if(cljs.core.truth_(inst_61983__$1)){
var statearr_62017_62045 = state_62013__$1;
(statearr_62017_62045[(1)] = (7));

} else {
var statearr_62018_62046 = state_62013__$1;
(statearr_62018_62046[(1)] = (8));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_62014 === (15))){
var inst_62006 = (function (){return ((function (state_val_62014,c__36154__auto__){
return (function (_,___$1,___$2,___$3){
cljs.core.remove_watch(options,cljs.core.cst$kw$run_DASH_sim);

return org$numenta$sanity$comportex$simulation$simulation_loop(model,world,out,options,sim_closed_QMARK_,htm_step);
});
;})(state_val_62014,c__36154__auto__))
})();
var inst_62007 = cljs.core.add_watch(options,cljs.core.cst$kw$run_DASH_sim,inst_62006);
var state_62013__$1 = state_62013;
var statearr_62019_62047 = state_62013__$1;
(statearr_62019_62047[(2)] = inst_62007);

(statearr_62019_62047[(1)] = (17));


return cljs.core.cst$kw$recur;
} else {
if((state_val_62014 === (13))){
var inst_61996 = (state_62013[(2)]);
var state_62013__$1 = state_62013;
var statearr_62020_62048 = state_62013__$1;
(statearr_62020_62048[(2)] = inst_61996);

(statearr_62020_62048[(1)] = (9));


return cljs.core.cst$kw$recur;
} else {
if((state_val_62014 === (6))){
var inst_62002 = (state_62013[(2)]);
var state_62013__$1 = state_62013;
var statearr_62021_62049 = state_62013__$1;
(statearr_62021_62049[(2)] = inst_62002);

(statearr_62021_62049[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_62014 === (17))){
var inst_62011 = (state_62013[(2)]);
var state_62013__$1 = state_62013;
return cljs.core.async.impl.ioc_helpers.return_chan(state_62013__$1,inst_62011);
} else {
if((state_val_62014 === (3))){
var inst_62004 = (state_62013[(2)]);
var state_62013__$1 = state_62013;
if(cljs.core.truth_(inst_62004)){
var statearr_62022_62050 = state_62013__$1;
(statearr_62022_62050[(1)] = (15));

} else {
var statearr_62023_62051 = state_62013__$1;
(statearr_62023_62051[(1)] = (16));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_62014 === (12))){
var state_62013__$1 = state_62013;
var statearr_62024_62052 = state_62013__$1;
(statearr_62024_62052[(2)] = null);

(statearr_62024_62052[(1)] = (13));


return cljs.core.cst$kw$recur;
} else {
if((state_val_62014 === (2))){
var inst_61980 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(sim_closed_QMARK_) : cljs.core.deref.call(null,sim_closed_QMARK_));
var inst_61981 = cljs.core.not(inst_61980);
var state_62013__$1 = state_62013;
if(inst_61981){
var statearr_62025_62053 = state_62013__$1;
(statearr_62025_62053[(1)] = (4));

} else {
var statearr_62026_62054 = state_62013__$1;
(statearr_62026_62054[(1)] = (5));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_62014 === (11))){
var inst_61983 = (state_62013[(7)]);
var inst_61986 = (state_62013[(8)]);
var inst_61988 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(model,htm_step,inst_61986);
var inst_61989 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(out,inst_61988);
var inst_61990 = cljs.core.async.timeout(inst_61983);
var state_62013__$1 = (function (){var statearr_62027 = state_62013;
(statearr_62027[(9)] = inst_61989);

return statearr_62027;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_62013__$1,(14),inst_61990);
} else {
if((state_val_62014 === (9))){
var inst_61999 = (state_62013[(2)]);
var state_62013__$1 = state_62013;
var statearr_62028_62055 = state_62013__$1;
(statearr_62028_62055[(2)] = inst_61999);

(statearr_62028_62055[(1)] = (6));


return cljs.core.cst$kw$recur;
} else {
if((state_val_62014 === (5))){
var state_62013__$1 = state_62013;
var statearr_62029_62056 = state_62013__$1;
(statearr_62029_62056[(2)] = null);

(statearr_62029_62056[(1)] = (6));


return cljs.core.cst$kw$recur;
} else {
if((state_val_62014 === (14))){
var inst_61992 = (state_62013[(2)]);
var state_62013__$1 = (function (){var statearr_62030 = state_62013;
(statearr_62030[(10)] = inst_61992);

return statearr_62030;
})();
var statearr_62031_62057 = state_62013__$1;
(statearr_62031_62057[(2)] = null);

(statearr_62031_62057[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_62014 === (16))){
var inst_62009 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(sim_closed_QMARK_,true) : cljs.core.reset_BANG_.call(null,sim_closed_QMARK_,true));
var state_62013__$1 = state_62013;
var statearr_62032_62058 = state_62013__$1;
(statearr_62032_62058[(2)] = inst_62009);

(statearr_62032_62058[(1)] = (17));


return cljs.core.cst$kw$recur;
} else {
if((state_val_62014 === (10))){
var inst_61986 = (state_62013[(8)]);
var inst_61986__$1 = (state_62013[(2)]);
var state_62013__$1 = (function (){var statearr_62033 = state_62013;
(statearr_62033[(8)] = inst_61986__$1);

return statearr_62033;
})();
if(cljs.core.truth_(inst_61986__$1)){
var statearr_62034_62059 = state_62013__$1;
(statearr_62034_62059[(1)] = (11));

} else {
var statearr_62035_62060 = state_62013__$1;
(statearr_62035_62060[(1)] = (12));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_62014 === (8))){
var state_62013__$1 = state_62013;
var statearr_62036_62061 = state_62013__$1;
(statearr_62036_62061[(2)] = true);

(statearr_62036_62061[(1)] = (9));


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
});})(c__36154__auto__))
;
return ((function (switch__36040__auto__,c__36154__auto__){
return (function() {
var org$numenta$sanity$comportex$simulation$simulation_loop_$_state_machine__36041__auto__ = null;
var org$numenta$sanity$comportex$simulation$simulation_loop_$_state_machine__36041__auto____0 = (function (){
var statearr_62040 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_62040[(0)] = org$numenta$sanity$comportex$simulation$simulation_loop_$_state_machine__36041__auto__);

(statearr_62040[(1)] = (1));

return statearr_62040;
});
var org$numenta$sanity$comportex$simulation$simulation_loop_$_state_machine__36041__auto____1 = (function (state_62013){
while(true){
var ret_value__36042__auto__ = (function (){try{while(true){
var result__36043__auto__ = switch__36040__auto__(state_62013);
if(cljs.core.keyword_identical_QMARK_(result__36043__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__36043__auto__;
}
break;
}
}catch (e62041){if((e62041 instanceof Object)){
var ex__36044__auto__ = e62041;
var statearr_62042_62062 = state_62013;
(statearr_62042_62062[(5)] = ex__36044__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_62013);

return cljs.core.cst$kw$recur;
} else {
throw e62041;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__36042__auto__,cljs.core.cst$kw$recur)){
var G__62063 = state_62013;
state_62013 = G__62063;
continue;
} else {
return ret_value__36042__auto__;
}
break;
}
});
org$numenta$sanity$comportex$simulation$simulation_loop_$_state_machine__36041__auto__ = function(state_62013){
switch(arguments.length){
case 0:
return org$numenta$sanity$comportex$simulation$simulation_loop_$_state_machine__36041__auto____0.call(this);
case 1:
return org$numenta$sanity$comportex$simulation$simulation_loop_$_state_machine__36041__auto____1.call(this,state_62013);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$comportex$simulation$simulation_loop_$_state_machine__36041__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$comportex$simulation$simulation_loop_$_state_machine__36041__auto____0;
org$numenta$sanity$comportex$simulation$simulation_loop_$_state_machine__36041__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$comportex$simulation$simulation_loop_$_state_machine__36041__auto____1;
return org$numenta$sanity$comportex$simulation$simulation_loop_$_state_machine__36041__auto__;
})()
;})(switch__36040__auto__,c__36154__auto__))
})();
var state__36156__auto__ = (function (){var statearr_62043 = (f__36155__auto__.cljs$core$IFn$_invoke$arity$0 ? f__36155__auto__.cljs$core$IFn$_invoke$arity$0() : f__36155__auto__.call(null));
(statearr_62043[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__36154__auto__);

return statearr_62043;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__36156__auto__);
});})(c__36154__auto__))
);

return c__36154__auto__;
});
org.numenta.sanity.comportex.simulation.command_handler = (function org$numenta$sanity$comportex$simulation$command_handler(model,options,status,status_subscribers,client_infos,all_client_infos){
return (function org$numenta$sanity$comportex$simulation$command_handler_$_handle_command(c){
var vec__62109 = c;
var vec__62110 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62109,(0),null);
var command = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62110,(0),null);
var xs = cljs.core.nthnext(vec__62110,(1));
var client_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62109,(1),null);
var client_info = (function (){var or__4682__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(client_infos) : cljs.core.deref.call(null,client_infos)),client_id);
if(cljs.core.truth_(or__4682__auto__)){
return or__4682__auto__;
} else {
var v = (function (){var G__62111 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__62111) : cljs.core.atom.call(null,G__62111));
})();
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(client_infos,cljs.core.assoc,client_id,v);

return v;
}
})();
var G__62112 = command;
switch (G__62112) {
case "client-disconnect":
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["SIMULATION: Client disconnected."], 0));

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(status_subscribers,cljs.core.disj,cljs.core.cst$kw$sim_DASH_status_DASH_subscriber.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(client_info) : cljs.core.deref.call(null,client_info))));

break;
case "connect":
var vec__62113 = xs;
var old_client_info = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62113,(0),null);
var map__62114 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62113,(1),null);
var map__62114__$1 = ((((!((map__62114 == null)))?((((map__62114.cljs$lang$protocol_mask$partition0$ & (64))) || (map__62114.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__62114):map__62114);
var subscriber_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__62114__$1,cljs.core.cst$kw$ch);
cljs.core.add_watch(client_info,cljs.core.cst$kw$org$numenta$sanity$comportex$simulation_SLASH_push_DASH_to_DASH_client,((function (vec__62113,old_client_info,map__62114,map__62114__$1,subscriber_c,G__62112,vec__62109,vec__62110,command,xs,client_id,client_info){
return (function (_,___$1,___$2,v){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(subscriber_c,cljs.core.update.cljs$core$IFn$_invoke$arity$3(v,cljs.core.cst$kw$sim_DASH_status_DASH_subscriber,((function (vec__62113,old_client_info,map__62114,map__62114__$1,subscriber_c,G__62112,vec__62109,vec__62110,command,xs,client_id,client_info){
return (function (subscriber_mchannel){
return org.numenta.sanity.bridge.marshalling.channel_weak(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(subscriber_mchannel,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$ch,cljs.core.cst$kw$target_DASH_id], null)));
});})(vec__62113,old_client_info,map__62114,map__62114__$1,subscriber_c,G__62112,vec__62109,vec__62110,command,xs,client_id,client_info))
));
});})(vec__62113,old_client_info,map__62114,map__62114__$1,subscriber_c,G__62112,vec__62109,vec__62110,command,xs,client_id,client_info))
);

var temp__4653__auto__ = cljs.core.cst$kw$sim_DASH_status_DASH_subscriber.cljs$core$IFn$_invoke$arity$1(old_client_info);
if(cljs.core.truth_(temp__4653__auto__)){
var map__62116 = temp__4653__auto__;
var map__62116__$1 = ((((!((map__62116 == null)))?((((map__62116.cljs$lang$protocol_mask$partition0$ & (64))) || (map__62116.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__62116):map__62116);
var subscriber_c__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__62116__$1,cljs.core.cst$kw$ch);
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
var vec__62118 = xs;
var path = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62118,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62118,(1),null);
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(model,cljs.core.assoc_in,path,v);

break;
case "restart":
var vec__62119 = xs;
var map__62120 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62119,(0),null);
var map__62120__$1 = ((((!((map__62120 == null)))?((((map__62120.cljs$lang$protocol_mask$partition0$ & (64))) || (map__62120.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__62120):map__62120);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__62120__$1,cljs.core.cst$kw$ch);
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
var vec__62122 = xs;
var t = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62122,(0),null);
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(options,cljs.core.assoc,cljs.core.cst$kw$step_DASH_ms,t);

break;
case "subscribe-to-status":
var vec__62123 = xs;
var subscriber_mchannel = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62123,(0),null);
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
var status = (function (){var G__62177 = cljs.core.cst$kw$go_QMARK_.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(options) : cljs.core.deref.call(null,options)));
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__62177) : cljs.core.atom.call(null,G__62177));
})();
var status_subscribers = (function (){var G__62178 = cljs.core.PersistentHashSet.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__62178) : cljs.core.atom.call(null,G__62178));
})();
var client_infos = (function (){var G__62179 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__62179) : cljs.core.atom.call(null,G__62179));
})();
var all_client_infos = (function (){var G__62180 = cljs.core.PersistentHashSet.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__62180) : cljs.core.atom.call(null,G__62180));
})();
var handle_command = org.numenta.sanity.comportex.simulation.command_handler(model,options,status,status_subscribers,client_infos,all_client_infos);
cljs.core.add_watch(options,cljs.core.cst$kw$org$numenta$sanity$comportex$simulation_SLASH_extract_DASH_status_DASH_change,((function (status,status_subscribers,client_infos,all_client_infos,handle_command){
return (function (_,___$1,oldv,newv){
var map__62181 = newv;
var map__62181__$1 = ((((!((map__62181 == null)))?((((map__62181.cljs$lang$protocol_mask$partition0$ & (64))) || (map__62181.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__62181):map__62181);
var go_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__62181__$1,cljs.core.cst$kw$go_QMARK_);
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(go_QMARK_,cljs.core.cst$kw$go_QMARK_.cljs$core$IFn$_invoke$arity$1(oldv))){
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(status,go_QMARK_) : cljs.core.reset_BANG_.call(null,status,go_QMARK_));
} else {
return null;
}
});})(status,status_subscribers,client_infos,all_client_infos,handle_command))
);

cljs.core.add_watch(status,cljs.core.cst$kw$org$numenta$sanity$comportex$simulation_SLASH_push_DASH_to_DASH_subscribers,((function (status,status_subscribers,client_infos,all_client_infos,handle_command){
return (function (_,___$1,___$2,v){
var seq__62183 = cljs.core.seq((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(status_subscribers) : cljs.core.deref.call(null,status_subscribers)));
var chunk__62184 = null;
var count__62185 = (0);
var i__62186 = (0);
while(true){
if((i__62186 < count__62185)){
var ch = chunk__62184.cljs$core$IIndexed$_nth$arity$2(null,i__62186);
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(ch,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [v], null));

var G__62229 = seq__62183;
var G__62230 = chunk__62184;
var G__62231 = count__62185;
var G__62232 = (i__62186 + (1));
seq__62183 = G__62229;
chunk__62184 = G__62230;
count__62185 = G__62231;
i__62186 = G__62232;
continue;
} else {
var temp__4653__auto__ = cljs.core.seq(seq__62183);
if(temp__4653__auto__){
var seq__62183__$1 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__62183__$1)){
var c__5485__auto__ = cljs.core.chunk_first(seq__62183__$1);
var G__62233 = cljs.core.chunk_rest(seq__62183__$1);
var G__62234 = c__5485__auto__;
var G__62235 = cljs.core.count(c__5485__auto__);
var G__62236 = (0);
seq__62183 = G__62233;
chunk__62184 = G__62234;
count__62185 = G__62235;
i__62186 = G__62236;
continue;
} else {
var ch = cljs.core.first(seq__62183__$1);
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(ch,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [v], null));

var G__62237 = cljs.core.next(seq__62183__$1);
var G__62238 = null;
var G__62239 = (0);
var G__62240 = (0);
seq__62183 = G__62237;
chunk__62184 = G__62238;
count__62185 = G__62239;
i__62186 = G__62240;
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

var c__36154__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__36154__auto__,status,status_subscribers,client_infos,all_client_infos,handle_command){
return (function (){
var f__36155__auto__ = (function (){var switch__36040__auto__ = ((function (c__36154__auto__,status,status_subscribers,client_infos,all_client_infos,handle_command){
return (function (state_62208){
var state_val_62209 = (state_62208[(1)]);
if((state_val_62209 === (7))){
var inst_62192 = (state_62208[(7)]);
var inst_62192__$1 = (state_62208[(2)]);
var inst_62193 = (inst_62192__$1 == null);
var inst_62194 = cljs.core.not(inst_62193);
var state_62208__$1 = (function (){var statearr_62210 = state_62208;
(statearr_62210[(7)] = inst_62192__$1);

return statearr_62210;
})();
if(inst_62194){
var statearr_62211_62241 = state_62208__$1;
(statearr_62211_62241[(1)] = (8));

} else {
var statearr_62212_62242 = state_62208__$1;
(statearr_62212_62242[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_62209 === (1))){
var state_62208__$1 = state_62208;
var statearr_62213_62243 = state_62208__$1;
(statearr_62213_62243[(2)] = null);

(statearr_62213_62243[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_62209 === (4))){
var state_62208__$1 = state_62208;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_62208__$1,(7),commands);
} else {
if((state_val_62209 === (6))){
var inst_62204 = (state_62208[(2)]);
var state_62208__$1 = state_62208;
var statearr_62214_62244 = state_62208__$1;
(statearr_62214_62244[(2)] = inst_62204);

(statearr_62214_62244[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_62209 === (3))){
var inst_62206 = (state_62208[(2)]);
var state_62208__$1 = state_62208;
return cljs.core.async.impl.ioc_helpers.return_chan(state_62208__$1,inst_62206);
} else {
if((state_val_62209 === (2))){
var inst_62188 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(sim_closed_QMARK_) : cljs.core.deref.call(null,sim_closed_QMARK_));
var inst_62189 = cljs.core.not(inst_62188);
var state_62208__$1 = state_62208;
if(inst_62189){
var statearr_62215_62245 = state_62208__$1;
(statearr_62215_62245[(1)] = (4));

} else {
var statearr_62216_62246 = state_62208__$1;
(statearr_62216_62246[(1)] = (5));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_62209 === (9))){
var inst_62199 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(sim_closed_QMARK_,true) : cljs.core.reset_BANG_.call(null,sim_closed_QMARK_,true));
var state_62208__$1 = state_62208;
var statearr_62217_62247 = state_62208__$1;
(statearr_62217_62247[(2)] = inst_62199);

(statearr_62217_62247[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_62209 === (5))){
var state_62208__$1 = state_62208;
var statearr_62218_62248 = state_62208__$1;
(statearr_62218_62248[(2)] = null);

(statearr_62218_62248[(1)] = (6));


return cljs.core.cst$kw$recur;
} else {
if((state_val_62209 === (10))){
var inst_62201 = (state_62208[(2)]);
var state_62208__$1 = state_62208;
var statearr_62219_62249 = state_62208__$1;
(statearr_62219_62249[(2)] = inst_62201);

(statearr_62219_62249[(1)] = (6));


return cljs.core.cst$kw$recur;
} else {
if((state_val_62209 === (8))){
var inst_62192 = (state_62208[(7)]);
var inst_62196 = (handle_command.cljs$core$IFn$_invoke$arity$1 ? handle_command.cljs$core$IFn$_invoke$arity$1(inst_62192) : handle_command.call(null,inst_62192));
var state_62208__$1 = (function (){var statearr_62220 = state_62208;
(statearr_62220[(8)] = inst_62196);

return statearr_62220;
})();
var statearr_62221_62250 = state_62208__$1;
(statearr_62221_62250[(2)] = null);

(statearr_62221_62250[(1)] = (2));


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
});})(c__36154__auto__,status,status_subscribers,client_infos,all_client_infos,handle_command))
;
return ((function (switch__36040__auto__,c__36154__auto__,status,status_subscribers,client_infos,all_client_infos,handle_command){
return (function() {
var org$numenta$sanity$comportex$simulation$handle_commands_$_state_machine__36041__auto__ = null;
var org$numenta$sanity$comportex$simulation$handle_commands_$_state_machine__36041__auto____0 = (function (){
var statearr_62225 = [null,null,null,null,null,null,null,null,null];
(statearr_62225[(0)] = org$numenta$sanity$comportex$simulation$handle_commands_$_state_machine__36041__auto__);

(statearr_62225[(1)] = (1));

return statearr_62225;
});
var org$numenta$sanity$comportex$simulation$handle_commands_$_state_machine__36041__auto____1 = (function (state_62208){
while(true){
var ret_value__36042__auto__ = (function (){try{while(true){
var result__36043__auto__ = switch__36040__auto__(state_62208);
if(cljs.core.keyword_identical_QMARK_(result__36043__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__36043__auto__;
}
break;
}
}catch (e62226){if((e62226 instanceof Object)){
var ex__36044__auto__ = e62226;
var statearr_62227_62251 = state_62208;
(statearr_62227_62251[(5)] = ex__36044__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_62208);

return cljs.core.cst$kw$recur;
} else {
throw e62226;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__36042__auto__,cljs.core.cst$kw$recur)){
var G__62252 = state_62208;
state_62208 = G__62252;
continue;
} else {
return ret_value__36042__auto__;
}
break;
}
});
org$numenta$sanity$comportex$simulation$handle_commands_$_state_machine__36041__auto__ = function(state_62208){
switch(arguments.length){
case 0:
return org$numenta$sanity$comportex$simulation$handle_commands_$_state_machine__36041__auto____0.call(this);
case 1:
return org$numenta$sanity$comportex$simulation$handle_commands_$_state_machine__36041__auto____1.call(this,state_62208);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$comportex$simulation$handle_commands_$_state_machine__36041__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$comportex$simulation$handle_commands_$_state_machine__36041__auto____0;
org$numenta$sanity$comportex$simulation$handle_commands_$_state_machine__36041__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$comportex$simulation$handle_commands_$_state_machine__36041__auto____1;
return org$numenta$sanity$comportex$simulation$handle_commands_$_state_machine__36041__auto__;
})()
;})(switch__36040__auto__,c__36154__auto__,status,status_subscribers,client_infos,all_client_infos,handle_command))
})();
var state__36156__auto__ = (function (){var statearr_62228 = (f__36155__auto__.cljs$core$IFn$_invoke$arity$0 ? f__36155__auto__.cljs$core$IFn$_invoke$arity$0() : f__36155__auto__.call(null));
(statearr_62228[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__36154__auto__);

return statearr_62228;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__36156__auto__);
});})(c__36154__auto__,status,status_subscribers,client_infos,all_client_infos,handle_command))
);

return c__36154__auto__;
});
org.numenta.sanity.comportex.simulation.start = (function org$numenta$sanity$comportex$simulation$start(steps_c,model_atom,world_c,commands_c,htm_step){
var options_62255 = (function (){var G__62254 = new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$go_QMARK_,false,cljs.core.cst$kw$step_DASH_ms,(20),cljs.core.cst$kw$force_DASH_n_DASH_steps,(0)], null);
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__62254) : cljs.core.atom.call(null,G__62254));
})();
var sim_closed_QMARK__62256 = (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(false) : cljs.core.atom.call(null,false));
if(cljs.core.truth_(commands_c)){
org.numenta.sanity.comportex.simulation.handle_commands(commands_c,model_atom,options_62255,sim_closed_QMARK__62256);
} else {
}

org.numenta.sanity.comportex.simulation.simulation_loop(model_atom,world_c,steps_c,options_62255,sim_closed_QMARK__62256,htm_step);

return null;
});
