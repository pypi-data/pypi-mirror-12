// Compiled by ClojureScript 1.7.170 {:static-fns true, :optimize-constants true}
goog.provide('org.numenta.sanity.bridge.remote');
goog.require('cljs.core');
goog.require('cljs.core.async');
goog.require('cljs.pprint');
goog.require('cognitect.transit');
goog.require('org.numenta.sanity.bridge.marshalling');
goog.require('org.nfrac.comportex.topology');
org.numenta.sanity.bridge.remote.max_message_size = ((64) * (1024));
org.numenta.sanity.bridge.remote.transit_str = (function org$numenta$sanity$bridge$remote$transit_str(m,extra_handlers){
return cognitect.transit.write(cognitect.transit.writer.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.bridge.marshalling.encoding,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$handlers,extra_handlers], null)),m);
});
org.numenta.sanity.bridge.remote.read_transit_str = (function org$numenta$sanity$bridge$remote$read_transit_str(s,extra_handlers){
return cognitect.transit.read(cognitect.transit.reader.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.bridge.marshalling.encoding,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$handlers,extra_handlers], null)),s);
});
org.numenta.sanity.bridge.remote.target_put = (function org$numenta$sanity$bridge$remote$target_put(target,v){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["put!",target,v], null);
});
org.numenta.sanity.bridge.remote.target_close = (function org$numenta$sanity$bridge$remote$target_close(target){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["close!",target], null);
});
org.numenta.sanity.bridge.remote.log_messages_QMARK_ = (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(false) : cljs.core.atom.call(null,false));
org.numenta.sanity.bridge.remote.log_raw_messages_QMARK_ = (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(false) : cljs.core.atom.call(null,false));
org.numenta.sanity.bridge.remote.log_pretty_QMARK_ = (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(true) : cljs.core.atom.call(null,true));
org.numenta.sanity.bridge.remote.log = (function org$numenta$sanity$bridge$remote$log(v,prefix){
cljs.core.pr.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([prefix], 0));

(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.bridge.remote.log_pretty_QMARK_) : cljs.core.deref.call(null,org.numenta.sanity.bridge.remote.log_pretty_QMARK_)))?cljs.pprint.pprint:cljs.core.println).call(null,v);

return v;
});
org.numenta.sanity.bridge.remote.connect_BANG_ = (function org$numenta$sanity$bridge$remote$connect_BANG_(connection_id,to_network_c,on_connect_c,ws_url,connecting_QMARK_,target__GT_mchannel){
var ws = (new WebSocket(ws_url));
var teardown_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
var connection_id_STAR_ = cljs.core.random_uuid();
var local_resources = (function (){var G__52695 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__52695) : cljs.core.atom.call(null,G__52695));
})();
var remote_resources = (function (){var G__52696 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__52696) : cljs.core.atom.call(null,G__52696));
})();
var G__52697 = ws;
(G__52697["onopen"] = ((function (G__52697,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources){
return (function (evt){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["WebSocket connected."], 0));

(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(connection_id,connection_id_STAR_) : cljs.core.reset_BANG_.call(null,connection_id,connection_id_STAR_));

(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(connecting_QMARK_,false) : cljs.core.reset_BANG_.call(null,connecting_QMARK_,false));

var c__35961__auto___52881 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__35961__auto___52881,G__52697,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources){
return (function (){
var f__35962__auto__ = (function (){var switch__35847__auto__ = ((function (c__35961__auto___52881,G__52697,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources){
return (function (state_52733){
var state_val_52734 = (state_52733[(1)]);
if((state_val_52734 === (7))){
var inst_52729 = (state_52733[(2)]);
var state_52733__$1 = state_52733;
var statearr_52735_52882 = state_52733__$1;
(statearr_52735_52882[(2)] = inst_52729);

(statearr_52735_52882[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_52734 === (1))){
var state_52733__$1 = state_52733;
var statearr_52736_52883 = state_52733__$1;
(statearr_52736_52883[(2)] = null);

(statearr_52736_52883[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_52734 === (4))){
var inst_52708 = (state_52733[(7)]);
var inst_52710 = (state_52733[(8)]);
var inst_52708__$1 = (state_52733[(2)]);
var inst_52709 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_52708__$1,(0),null);
var inst_52710__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_52708__$1,(1),null);
var inst_52711 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_52710__$1,teardown_c);
var state_52733__$1 = (function (){var statearr_52737 = state_52733;
(statearr_52737[(9)] = inst_52709);

(statearr_52737[(7)] = inst_52708__$1);

(statearr_52737[(8)] = inst_52710__$1);

return statearr_52737;
})();
if(inst_52711){
var statearr_52738_52884 = state_52733__$1;
(statearr_52738_52884[(1)] = (5));

} else {
var statearr_52739_52885 = state_52733__$1;
(statearr_52739_52885[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_52734 === (13))){
var inst_52725 = (state_52733[(2)]);
var state_52733__$1 = state_52733;
var statearr_52740_52886 = state_52733__$1;
(statearr_52740_52886[(2)] = inst_52725);

(statearr_52740_52886[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_52734 === (6))){
var inst_52710 = (state_52733[(8)]);
var inst_52714 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_52710,on_connect_c);
var state_52733__$1 = state_52733;
if(inst_52714){
var statearr_52741_52887 = state_52733__$1;
(statearr_52741_52887[(1)] = (8));

} else {
var statearr_52742_52888 = state_52733__$1;
(statearr_52742_52888[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_52734 === (3))){
var inst_52731 = (state_52733[(2)]);
var state_52733__$1 = state_52733;
return cljs.core.async.impl.ioc_helpers.return_chan(state_52733__$1,inst_52731);
} else {
if((state_val_52734 === (12))){
var state_52733__$1 = state_52733;
var statearr_52743_52889 = state_52733__$1;
(statearr_52743_52889[(2)] = null);

(statearr_52743_52889[(1)] = (13));


return cljs.core.cst$kw$recur;
} else {
if((state_val_52734 === (2))){
var inst_52704 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_52705 = [teardown_c,on_connect_c];
var inst_52706 = (new cljs.core.PersistentVector(null,2,(5),inst_52704,inst_52705,null));
var state_52733__$1 = state_52733;
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic(state_52733__$1,(4),inst_52706,cljs.core.array_seq([cljs.core.cst$kw$priority,true], 0));
} else {
if((state_val_52734 === (11))){
var inst_52709 = (state_52733[(9)]);
var state_52733__$1 = state_52733;
var statearr_52744_52890 = state_52733__$1;
(statearr_52744_52890[(2)] = inst_52709);

(statearr_52744_52890[(1)] = (13));


return cljs.core.cst$kw$recur;
} else {
if((state_val_52734 === (9))){
var inst_52710 = (state_52733[(8)]);
var inst_52721 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_52710,cljs.core.cst$kw$default);
var state_52733__$1 = state_52733;
if(inst_52721){
var statearr_52745_52891 = state_52733__$1;
(statearr_52745_52891[(1)] = (11));

} else {
var statearr_52746_52892 = state_52733__$1;
(statearr_52746_52892[(1)] = (12));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_52734 === (5))){
var state_52733__$1 = state_52733;
var statearr_52747_52893 = state_52733__$1;
(statearr_52747_52893[(2)] = null);

(statearr_52747_52893[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_52734 === (10))){
var inst_52727 = (state_52733[(2)]);
var state_52733__$1 = state_52733;
var statearr_52748_52894 = state_52733__$1;
(statearr_52748_52894[(2)] = inst_52727);

(statearr_52748_52894[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_52734 === (8))){
var inst_52708 = (state_52733[(7)]);
var inst_52717 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_52708,(0),null);
var inst_52718 = (inst_52717.cljs$core$IFn$_invoke$arity$0 ? inst_52717.cljs$core$IFn$_invoke$arity$0() : inst_52717.call(null));
var state_52733__$1 = (function (){var statearr_52749 = state_52733;
(statearr_52749[(10)] = inst_52718);

return statearr_52749;
})();
var statearr_52750_52895 = state_52733__$1;
(statearr_52750_52895[(2)] = null);

(statearr_52750_52895[(1)] = (2));


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
});})(c__35961__auto___52881,G__52697,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources))
;
return ((function (switch__35847__auto__,c__35961__auto___52881,G__52697,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources){
return (function() {
var org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__35848__auto__ = null;
var org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__35848__auto____0 = (function (){
var statearr_52754 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_52754[(0)] = org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__35848__auto__);

(statearr_52754[(1)] = (1));

return statearr_52754;
});
var org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__35848__auto____1 = (function (state_52733){
while(true){
var ret_value__35849__auto__ = (function (){try{while(true){
var result__35850__auto__ = switch__35847__auto__(state_52733);
if(cljs.core.keyword_identical_QMARK_(result__35850__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__35850__auto__;
}
break;
}
}catch (e52755){if((e52755 instanceof Object)){
var ex__35851__auto__ = e52755;
var statearr_52756_52896 = state_52733;
(statearr_52756_52896[(5)] = ex__35851__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_52733);

return cljs.core.cst$kw$recur;
} else {
throw e52755;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35849__auto__,cljs.core.cst$kw$recur)){
var G__52897 = state_52733;
state_52733 = G__52897;
continue;
} else {
return ret_value__35849__auto__;
}
break;
}
});
org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__35848__auto__ = function(state_52733){
switch(arguments.length){
case 0:
return org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__35848__auto____0.call(this);
case 1:
return org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__35848__auto____1.call(this,state_52733);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__35848__auto____0;
org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__35848__auto____1;
return org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__35848__auto__;
})()
;})(switch__35847__auto__,c__35961__auto___52881,G__52697,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources))
})();
var state__35963__auto__ = (function (){var statearr_52757 = (f__35962__auto__.cljs$core$IFn$_invoke$arity$0 ? f__35962__auto__.cljs$core$IFn$_invoke$arity$0() : f__35962__auto__.call(null));
(statearr_52757[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__35961__auto___52881);

return statearr_52757;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__35963__auto__);
});})(c__35961__auto___52881,G__52697,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources))
);


var c__35961__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__35961__auto__,G__52697,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources){
return (function (){
var f__35962__auto__ = (function (){var switch__35847__auto__ = ((function (c__35961__auto__,G__52697,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources){
return (function (state_52826){
var state_val_52827 = (state_52826[(1)]);
if((state_val_52827 === (7))){
var inst_52787 = (state_52826[(7)]);
var inst_52787__$1 = (state_52826[(2)]);
var inst_52788 = (inst_52787__$1 == null);
var state_52826__$1 = (function (){var statearr_52828 = state_52826;
(statearr_52828[(7)] = inst_52787__$1);

return statearr_52828;
})();
if(cljs.core.truth_(inst_52788)){
var statearr_52829_52898 = state_52826__$1;
(statearr_52829_52898[(1)] = (14));

} else {
var statearr_52830_52899 = state_52826__$1;
(statearr_52830_52899[(1)] = (15));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_52827 === (20))){
var inst_52797 = (state_52826[(8)]);
var inst_52799 = org.numenta.sanity.bridge.marshalling.write_handlers(target__GT_mchannel,local_resources);
var inst_52800 = org.numenta.sanity.bridge.remote.transit_str(inst_52797,inst_52799);
var state_52826__$1 = state_52826;
var statearr_52831_52900 = state_52826__$1;
(statearr_52831_52900[(2)] = inst_52800);

(statearr_52831_52900[(1)] = (22));


return cljs.core.cst$kw$recur;
} else {
if((state_val_52827 === (27))){
var state_52826__$1 = state_52826;
var statearr_52832_52901 = state_52826__$1;
(statearr_52832_52901[(2)] = null);

(statearr_52832_52901[(1)] = (28));


return cljs.core.cst$kw$recur;
} else {
if((state_val_52827 === (1))){
var state_52826__$1 = state_52826;
var statearr_52833_52902 = state_52826__$1;
(statearr_52833_52902[(2)] = null);

(statearr_52833_52902[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_52827 === (24))){
var inst_52803 = (state_52826[(9)]);
var state_52826__$1 = state_52826;
var statearr_52834_52903 = state_52826__$1;
(statearr_52834_52903[(2)] = inst_52803);

(statearr_52834_52903[(1)] = (25));


return cljs.core.cst$kw$recur;
} else {
if((state_val_52827 === (4))){
var inst_52768 = (state_52826[(10)]);
var inst_52770 = (state_52826[(11)]);
var inst_52768__$1 = (state_52826[(2)]);
var inst_52769 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_52768__$1,(0),null);
var inst_52770__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_52768__$1,(1),null);
var inst_52771 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_52770__$1,teardown_c);
var state_52826__$1 = (function (){var statearr_52835 = state_52826;
(statearr_52835[(12)] = inst_52769);

(statearr_52835[(10)] = inst_52768__$1);

(statearr_52835[(11)] = inst_52770__$1);

return statearr_52835;
})();
if(inst_52771){
var statearr_52836_52904 = state_52826__$1;
(statearr_52836_52904[(1)] = (5));

} else {
var statearr_52837_52905 = state_52826__$1;
(statearr_52837_52905[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_52827 === (15))){
var inst_52792 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.bridge.remote.log_messages_QMARK_) : cljs.core.deref.call(null,org.numenta.sanity.bridge.remote.log_messages_QMARK_));
var state_52826__$1 = state_52826;
if(cljs.core.truth_(inst_52792)){
var statearr_52838_52906 = state_52826__$1;
(statearr_52838_52906[(1)] = (17));

} else {
var statearr_52839_52907 = state_52826__$1;
(statearr_52839_52907[(1)] = (18));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_52827 === (21))){
var inst_52797 = (state_52826[(8)]);
var state_52826__$1 = state_52826;
var statearr_52840_52908 = state_52826__$1;
(statearr_52840_52908[(2)] = inst_52797);

(statearr_52840_52908[(1)] = (22));


return cljs.core.cst$kw$recur;
} else {
if((state_val_52827 === (13))){
var inst_52783 = (state_52826[(2)]);
var state_52826__$1 = state_52826;
var statearr_52841_52909 = state_52826__$1;
(statearr_52841_52909[(2)] = inst_52783);

(statearr_52841_52909[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_52827 === (22))){
var inst_52803 = (state_52826[(2)]);
var inst_52804 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.bridge.remote.log_raw_messages_QMARK_) : cljs.core.deref.call(null,org.numenta.sanity.bridge.remote.log_raw_messages_QMARK_));
var state_52826__$1 = (function (){var statearr_52842 = state_52826;
(statearr_52842[(9)] = inst_52803);

return statearr_52842;
})();
if(cljs.core.truth_(inst_52804)){
var statearr_52843_52910 = state_52826__$1;
(statearr_52843_52910[(1)] = (23));

} else {
var statearr_52844_52911 = state_52826__$1;
(statearr_52844_52911[(1)] = (24));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_52827 === (6))){
var inst_52770 = (state_52826[(11)]);
var inst_52774 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_52770,to_network_c);
var state_52826__$1 = state_52826;
if(inst_52774){
var statearr_52845_52912 = state_52826__$1;
(statearr_52845_52912[(1)] = (8));

} else {
var statearr_52846_52913 = state_52826__$1;
(statearr_52846_52913[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_52827 === (28))){
var inst_52809 = (state_52826[(13)]);
var inst_52818 = (state_52826[(2)]);
var inst_52819 = ws.send(inst_52809);
var state_52826__$1 = (function (){var statearr_52847 = state_52826;
(statearr_52847[(14)] = inst_52819);

(statearr_52847[(15)] = inst_52818);

return statearr_52847;
})();
var statearr_52848_52914 = state_52826__$1;
(statearr_52848_52914[(2)] = null);

(statearr_52848_52914[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_52827 === (25))){
var inst_52810 = (state_52826[(16)]);
var inst_52809 = (state_52826[(13)]);
var inst_52809__$1 = (state_52826[(2)]);
var inst_52810__$1 = cljs.core.count(inst_52809__$1);
var inst_52811 = (inst_52810__$1 > org.numenta.sanity.bridge.remote.max_message_size);
var state_52826__$1 = (function (){var statearr_52849 = state_52826;
(statearr_52849[(16)] = inst_52810__$1);

(statearr_52849[(13)] = inst_52809__$1);

return statearr_52849;
})();
if(cljs.core.truth_(inst_52811)){
var statearr_52850_52915 = state_52826__$1;
(statearr_52850_52915[(1)] = (26));

} else {
var statearr_52851_52916 = state_52826__$1;
(statearr_52851_52916[(1)] = (27));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_52827 === (17))){
var inst_52787 = (state_52826[(7)]);
var inst_52794 = org.numenta.sanity.bridge.remote.log(inst_52787,"SENDING:");
var state_52826__$1 = state_52826;
var statearr_52852_52917 = state_52826__$1;
(statearr_52852_52917[(2)] = inst_52794);

(statearr_52852_52917[(1)] = (19));


return cljs.core.cst$kw$recur;
} else {
if((state_val_52827 === (3))){
var inst_52824 = (state_52826[(2)]);
var state_52826__$1 = state_52826;
return cljs.core.async.impl.ioc_helpers.return_chan(state_52826__$1,inst_52824);
} else {
if((state_val_52827 === (12))){
var state_52826__$1 = state_52826;
var statearr_52853_52918 = state_52826__$1;
(statearr_52853_52918[(2)] = null);

(statearr_52853_52918[(1)] = (13));


return cljs.core.cst$kw$recur;
} else {
if((state_val_52827 === (2))){
var inst_52764 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_52765 = [teardown_c,to_network_c];
var inst_52766 = (new cljs.core.PersistentVector(null,2,(5),inst_52764,inst_52765,null));
var state_52826__$1 = state_52826;
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic(state_52826__$1,(4),inst_52766,cljs.core.array_seq([cljs.core.cst$kw$priority,true], 0));
} else {
if((state_val_52827 === (23))){
var inst_52803 = (state_52826[(9)]);
var inst_52806 = org.numenta.sanity.bridge.remote.log(inst_52803,"SENDING TEXT:");
var state_52826__$1 = state_52826;
var statearr_52854_52919 = state_52826__$1;
(statearr_52854_52919[(2)] = inst_52806);

(statearr_52854_52919[(1)] = (25));


return cljs.core.cst$kw$recur;
} else {
if((state_val_52827 === (19))){
var inst_52797 = (state_52826[(2)]);
var state_52826__$1 = (function (){var statearr_52855 = state_52826;
(statearr_52855[(8)] = inst_52797);

return statearr_52855;
})();
var statearr_52856_52920 = state_52826__$1;
(statearr_52856_52920[(1)] = (20));



return cljs.core.cst$kw$recur;
} else {
if((state_val_52827 === (11))){
var inst_52769 = (state_52826[(12)]);
var state_52826__$1 = state_52826;
var statearr_52858_52921 = state_52826__$1;
(statearr_52858_52921[(2)] = inst_52769);

(statearr_52858_52921[(1)] = (13));


return cljs.core.cst$kw$recur;
} else {
if((state_val_52827 === (9))){
var inst_52770 = (state_52826[(11)]);
var inst_52779 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_52770,cljs.core.cst$kw$default);
var state_52826__$1 = state_52826;
if(inst_52779){
var statearr_52859_52922 = state_52826__$1;
(statearr_52859_52922[(1)] = (11));

} else {
var statearr_52860_52923 = state_52826__$1;
(statearr_52860_52923[(1)] = (12));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_52827 === (5))){
var state_52826__$1 = state_52826;
var statearr_52861_52924 = state_52826__$1;
(statearr_52861_52924[(2)] = null);

(statearr_52861_52924[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_52827 === (14))){
var state_52826__$1 = state_52826;
var statearr_52862_52925 = state_52826__$1;
(statearr_52862_52925[(2)] = null);

(statearr_52862_52925[(1)] = (16));


return cljs.core.cst$kw$recur;
} else {
if((state_val_52827 === (26))){
var inst_52810 = (state_52826[(16)]);
var inst_52809 = (state_52826[(13)]);
var inst_52813 = [cljs.core.str("Message too large! Size: "),cljs.core.str(inst_52810),cljs.core.str("Max-size: "),cljs.core.str(org.numenta.sanity.bridge.remote.max_message_size)].join('');
var inst_52814 = alert(inst_52813);
var inst_52815 = cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Message too large!",inst_52809], 0));
var state_52826__$1 = (function (){var statearr_52863 = state_52826;
(statearr_52863[(17)] = inst_52814);

return statearr_52863;
})();
var statearr_52864_52926 = state_52826__$1;
(statearr_52864_52926[(2)] = inst_52815);

(statearr_52864_52926[(1)] = (28));


return cljs.core.cst$kw$recur;
} else {
if((state_val_52827 === (16))){
var inst_52822 = (state_52826[(2)]);
var state_52826__$1 = state_52826;
var statearr_52865_52927 = state_52826__$1;
(statearr_52865_52927[(2)] = inst_52822);

(statearr_52865_52927[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_52827 === (10))){
var inst_52785 = (state_52826[(2)]);
var state_52826__$1 = state_52826;
var statearr_52866_52928 = state_52826__$1;
(statearr_52866_52928[(2)] = inst_52785);

(statearr_52866_52928[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_52827 === (18))){
var inst_52787 = (state_52826[(7)]);
var state_52826__$1 = state_52826;
var statearr_52867_52929 = state_52826__$1;
(statearr_52867_52929[(2)] = inst_52787);

(statearr_52867_52929[(1)] = (19));


return cljs.core.cst$kw$recur;
} else {
if((state_val_52827 === (8))){
var inst_52768 = (state_52826[(10)]);
var inst_52777 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_52768,(0),null);
var state_52826__$1 = state_52826;
var statearr_52868_52930 = state_52826__$1;
(statearr_52868_52930[(2)] = inst_52777);

(statearr_52868_52930[(1)] = (10));


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
});})(c__35961__auto__,G__52697,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources))
;
return ((function (switch__35847__auto__,c__35961__auto__,G__52697,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources){
return (function() {
var org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__35848__auto__ = null;
var org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__35848__auto____0 = (function (){
var statearr_52872 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_52872[(0)] = org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__35848__auto__);

(statearr_52872[(1)] = (1));

return statearr_52872;
});
var org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__35848__auto____1 = (function (state_52826){
while(true){
var ret_value__35849__auto__ = (function (){try{while(true){
var result__35850__auto__ = switch__35847__auto__(state_52826);
if(cljs.core.keyword_identical_QMARK_(result__35850__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__35850__auto__;
}
break;
}
}catch (e52873){if((e52873 instanceof Object)){
var ex__35851__auto__ = e52873;
var statearr_52874_52931 = state_52826;
(statearr_52874_52931[(5)] = ex__35851__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_52826);

return cljs.core.cst$kw$recur;
} else {
throw e52873;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35849__auto__,cljs.core.cst$kw$recur)){
var G__52932 = state_52826;
state_52826 = G__52932;
continue;
} else {
return ret_value__35849__auto__;
}
break;
}
});
org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__35848__auto__ = function(state_52826){
switch(arguments.length){
case 0:
return org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__35848__auto____0.call(this);
case 1:
return org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__35848__auto____1.call(this,state_52826);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__35848__auto____0;
org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__35848__auto____1;
return org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__35848__auto__;
})()
;})(switch__35847__auto__,c__35961__auto__,G__52697,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources))
})();
var state__35963__auto__ = (function (){var statearr_52875 = (f__35962__auto__.cljs$core$IFn$_invoke$arity$0 ? f__35962__auto__.cljs$core$IFn$_invoke$arity$0() : f__35962__auto__.call(null));
(statearr_52875[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__35961__auto__);

return statearr_52875;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__35963__auto__);
});})(c__35961__auto__,G__52697,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources))
);

return c__35961__auto__;
});})(G__52697,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources))
);

(G__52697["onerror"] = ((function (G__52697,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources){
return (function (evt){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["WebSocket error:"], 0));

return console.error(evt);
});})(G__52697,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources))
);

(G__52697["onclose"] = ((function (G__52697,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources){
return (function (evt){
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(connection_id,null) : cljs.core.reset_BANG_.call(null,connection_id,null));

(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(connecting_QMARK_,false) : cljs.core.reset_BANG_.call(null,connecting_QMARK_,false));

cljs.core.async.close_BANG_(teardown_c);

return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["WebSocket closed."], 0));
});})(G__52697,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources))
);

(G__52697["onmessage"] = ((function (G__52697,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources){
return (function (evt){
var vec__52876 = (function (){var G__52878 = evt.data;
var G__52878__$1 = (cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.bridge.remote.log_raw_messages_QMARK_) : cljs.core.deref.call(null,org.numenta.sanity.bridge.remote.log_raw_messages_QMARK_)))?org.numenta.sanity.bridge.remote.log(G__52878,"RECEIVED TEXT:"):G__52878);
var G__52878__$2 = org.numenta.sanity.bridge.remote.read_transit_str(G__52878__$1,org.numenta.sanity.bridge.marshalling.read_handlers(target__GT_mchannel,((function (G__52878,G__52878__$1,G__52697,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources){
return (function (t,v){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(to_network_c,org.numenta.sanity.bridge.remote.target_put(t,v));
});})(G__52878,G__52878__$1,G__52697,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources))
,((function (G__52878,G__52878__$1,G__52697,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources){
return (function (t){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(to_network_c,org.numenta.sanity.bridge.remote.target_close(t));
});})(G__52878,G__52878__$1,G__52697,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources))
,remote_resources))
;
if(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.bridge.remote.log_messages_QMARK_) : cljs.core.deref.call(null,org.numenta.sanity.bridge.remote.log_messages_QMARK_)))){
return org.numenta.sanity.bridge.remote.log(G__52878__$2,"RECEIVED:");
} else {
return G__52878__$2;
}
})();
var op = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__52876,(0),null);
var target = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__52876,(1),null);
var msg = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__52876,(2),null);
var map__52877 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(target__GT_mchannel) : cljs.core.deref.call(null,target__GT_mchannel)).call(null,target);
var map__52877__$1 = ((((!((map__52877 == null)))?((((map__52877.cljs$lang$protocol_mask$partition0$ & (64))) || (map__52877.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__52877):map__52877);
var mchannel = map__52877__$1;
var ch = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__52877__$1,cljs.core.cst$kw$ch);
var single_use_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__52877__$1,cljs.core.cst$kw$single_DASH_use_QMARK_);
if(cljs.core.truth_(ch)){
if(cljs.core.truth_(single_use_QMARK_)){
org.numenta.sanity.bridge.marshalling.release_BANG_(mchannel);
} else {
}

var G__52880 = op;
switch (G__52880) {
case "put!":
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(ch,msg);

break;
case "close!":
return cljs.core.async.close_BANG_(ch);

break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(op)].join('')));

}
} else {
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["UNRECOGNIZED TARGET",target], 0));

return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Known targets:",(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(target__GT_mchannel) : cljs.core.deref.call(null,target__GT_mchannel))], 0));
}
});})(G__52697,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources))
);

return G__52697;
});
org.numenta.sanity.bridge.remote.init = (function org$numenta$sanity$bridge$remote$init(ws_url){
var to_network_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
var connection_id = (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null) : cljs.core.atom.call(null,null));
var on_connect_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
var connecting_QMARK_ = (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(false) : cljs.core.atom.call(null,false));
var target__GT_mchannel = (function (){var G__53107 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__53107) : cljs.core.atom.call(null,G__53107));
})();
return ((function (to_network_c,connection_id,on_connect_c,connecting_QMARK_,target__GT_mchannel){
return (function org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target(t,ch){
var last_seen_connection_id = (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null) : cljs.core.atom.call(null,null));
var reconnect_blob = (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null) : cljs.core.atom.call(null,null));
var blob_resets_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
var blob_resets_cproxy = org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$1(blob_resets_c);
var c__35961__auto___53280 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__35961__auto___53280,last_seen_connection_id,reconnect_blob,blob_resets_c,blob_resets_cproxy,to_network_c,connection_id,on_connect_c,connecting_QMARK_,target__GT_mchannel){
return (function (){
var f__35962__auto__ = (function (){var switch__35847__auto__ = ((function (c__35961__auto___53280,last_seen_connection_id,reconnect_blob,blob_resets_c,blob_resets_cproxy,to_network_c,connection_id,on_connect_c,connecting_QMARK_,target__GT_mchannel){
return (function (state_53207){
var state_val_53208 = (state_53207[(1)]);
if((state_val_53208 === (1))){
var state_53207__$1 = state_53207;
var statearr_53209_53281 = state_53207__$1;
(statearr_53209_53281[(2)] = null);

(statearr_53209_53281[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_53208 === (2))){
var state_53207__$1 = state_53207;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_53207__$1,(4),blob_resets_c);
} else {
if((state_val_53208 === (3))){
var inst_53205 = (state_53207[(2)]);
var state_53207__$1 = state_53207;
return cljs.core.async.impl.ioc_helpers.return_chan(state_53207__$1,inst_53205);
} else {
if((state_val_53208 === (4))){
var inst_53196 = (state_53207[(7)]);
var inst_53196__$1 = (state_53207[(2)]);
var inst_53197 = (inst_53196__$1 == null);
var state_53207__$1 = (function (){var statearr_53210 = state_53207;
(statearr_53210[(7)] = inst_53196__$1);

return statearr_53210;
})();
if(cljs.core.truth_(inst_53197)){
var statearr_53211_53282 = state_53207__$1;
(statearr_53211_53282[(1)] = (5));

} else {
var statearr_53212_53283 = state_53207__$1;
(statearr_53212_53283[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_53208 === (5))){
var state_53207__$1 = state_53207;
var statearr_53213_53284 = state_53207__$1;
(statearr_53213_53284[(2)] = null);

(statearr_53213_53284[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_53208 === (6))){
var inst_53196 = (state_53207[(7)]);
var inst_53200 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(reconnect_blob,inst_53196) : cljs.core.reset_BANG_.call(null,reconnect_blob,inst_53196));
var state_53207__$1 = (function (){var statearr_53214 = state_53207;
(statearr_53214[(8)] = inst_53200);

return statearr_53214;
})();
var statearr_53215_53285 = state_53207__$1;
(statearr_53215_53285[(2)] = null);

(statearr_53215_53285[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_53208 === (7))){
var inst_53203 = (state_53207[(2)]);
var state_53207__$1 = state_53207;
var statearr_53216_53286 = state_53207__$1;
(statearr_53216_53286[(2)] = inst_53203);

(statearr_53216_53286[(1)] = (3));


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
});})(c__35961__auto___53280,last_seen_connection_id,reconnect_blob,blob_resets_c,blob_resets_cproxy,to_network_c,connection_id,on_connect_c,connecting_QMARK_,target__GT_mchannel))
;
return ((function (switch__35847__auto__,c__35961__auto___53280,last_seen_connection_id,reconnect_blob,blob_resets_c,blob_resets_cproxy,to_network_c,connection_id,on_connect_c,connecting_QMARK_,target__GT_mchannel){
return (function() {
var org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__35848__auto__ = null;
var org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__35848__auto____0 = (function (){
var statearr_53220 = [null,null,null,null,null,null,null,null,null];
(statearr_53220[(0)] = org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__35848__auto__);

(statearr_53220[(1)] = (1));

return statearr_53220;
});
var org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__35848__auto____1 = (function (state_53207){
while(true){
var ret_value__35849__auto__ = (function (){try{while(true){
var result__35850__auto__ = switch__35847__auto__(state_53207);
if(cljs.core.keyword_identical_QMARK_(result__35850__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__35850__auto__;
}
break;
}
}catch (e53221){if((e53221 instanceof Object)){
var ex__35851__auto__ = e53221;
var statearr_53222_53287 = state_53207;
(statearr_53222_53287[(5)] = ex__35851__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_53207);

return cljs.core.cst$kw$recur;
} else {
throw e53221;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35849__auto__,cljs.core.cst$kw$recur)){
var G__53288 = state_53207;
state_53207 = G__53288;
continue;
} else {
return ret_value__35849__auto__;
}
break;
}
});
org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__35848__auto__ = function(state_53207){
switch(arguments.length){
case 0:
return org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__35848__auto____0.call(this);
case 1:
return org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__35848__auto____1.call(this,state_53207);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__35848__auto____0;
org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__35848__auto____1;
return org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__35848__auto__;
})()
;})(switch__35847__auto__,c__35961__auto___53280,last_seen_connection_id,reconnect_blob,blob_resets_c,blob_resets_cproxy,to_network_c,connection_id,on_connect_c,connecting_QMARK_,target__GT_mchannel))
})();
var state__35963__auto__ = (function (){var statearr_53223 = (f__35962__auto__.cljs$core$IFn$_invoke$arity$0 ? f__35962__auto__.cljs$core$IFn$_invoke$arity$0() : f__35962__auto__.call(null));
(statearr_53223[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__35961__auto___53280);

return statearr_53223;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__35963__auto__);
});})(c__35961__auto___53280,last_seen_connection_id,reconnect_blob,blob_resets_c,blob_resets_cproxy,to_network_c,connection_id,on_connect_c,connecting_QMARK_,target__GT_mchannel))
);


var c__35961__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__35961__auto__,last_seen_connection_id,reconnect_blob,blob_resets_c,blob_resets_cproxy,to_network_c,connection_id,on_connect_c,connecting_QMARK_,target__GT_mchannel){
return (function (){
var f__35962__auto__ = (function (){var switch__35847__auto__ = ((function (c__35961__auto__,last_seen_connection_id,reconnect_blob,blob_resets_c,blob_resets_cproxy,to_network_c,connection_id,on_connect_c,connecting_QMARK_,target__GT_mchannel){
return (function (state_53251){
var state_val_53252 = (state_53251[(1)]);
if((state_val_53252 === (7))){
var inst_53226 = (state_53251[(7)]);
var inst_53241 = (state_53251[(2)]);
var inst_53242 = (inst_53226 == null);
var state_53251__$1 = (function (){var statearr_53253 = state_53251;
(statearr_53253[(8)] = inst_53241);

return statearr_53253;
})();
if(cljs.core.truth_(inst_53242)){
var statearr_53254_53289 = state_53251__$1;
(statearr_53254_53289[(1)] = (11));

} else {
var statearr_53255_53290 = state_53251__$1;
(statearr_53255_53290[(1)] = (12));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_53252 === (1))){
var state_53251__$1 = state_53251;
var statearr_53256_53291 = state_53251__$1;
(statearr_53256_53291[(2)] = null);

(statearr_53256_53291[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_53252 === (4))){
var inst_53226 = (state_53251[(7)]);
var inst_53226__$1 = (state_53251[(2)]);
var inst_53227 = (function (){var v = inst_53226__$1;
return ((function (v,inst_53226,inst_53226__$1,state_val_53252,c__35961__auto__,last_seen_connection_id,reconnect_blob,blob_resets_c,blob_resets_cproxy,to_network_c,connection_id,on_connect_c,connecting_QMARK_,target__GT_mchannel){
return (function (){
if((((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(last_seen_connection_id) : cljs.core.deref.call(null,last_seen_connection_id)) == null)) || (cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(connection_id) : cljs.core.deref.call(null,connection_id)),(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(last_seen_connection_id) : cljs.core.deref.call(null,last_seen_connection_id))))){
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(to_network_c,org.numenta.sanity.bridge.remote.target_put(t,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["connect",(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(reconnect_blob) : cljs.core.deref.call(null,reconnect_blob)),blob_resets_cproxy], null)));

var G__53257_53292 = last_seen_connection_id;
var G__53258_53293 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(connection_id) : cljs.core.deref.call(null,connection_id));
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__53257_53292,G__53258_53293) : cljs.core.reset_BANG_.call(null,G__53257_53292,G__53258_53293));
} else {
}

if(!((v == null))){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(to_network_c,org.numenta.sanity.bridge.remote.target_put(t,v));
} else {
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(to_network_c,org.numenta.sanity.bridge.remote.target_close(t));
}
});
;})(v,inst_53226,inst_53226__$1,state_val_53252,c__35961__auto__,last_seen_connection_id,reconnect_blob,blob_resets_c,blob_resets_cproxy,to_network_c,connection_id,on_connect_c,connecting_QMARK_,target__GT_mchannel))
})();
var inst_53228 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(connection_id) : cljs.core.deref.call(null,connection_id));
var state_53251__$1 = (function (){var statearr_53259 = state_53251;
(statearr_53259[(9)] = inst_53227);

(statearr_53259[(7)] = inst_53226__$1);

return statearr_53259;
})();
if(cljs.core.truth_(inst_53228)){
var statearr_53260_53294 = state_53251__$1;
(statearr_53260_53294[(1)] = (5));

} else {
var statearr_53261_53295 = state_53251__$1;
(statearr_53261_53295[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_53252 === (13))){
var inst_53247 = (state_53251[(2)]);
var state_53251__$1 = state_53251;
var statearr_53262_53296 = state_53251__$1;
(statearr_53262_53296[(2)] = inst_53247);

(statearr_53262_53296[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_53252 === (6))){
var inst_53227 = (state_53251[(9)]);
var inst_53232 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(on_connect_c,inst_53227);
var inst_53233 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(connecting_QMARK_) : cljs.core.deref.call(null,connecting_QMARK_));
var state_53251__$1 = (function (){var statearr_53263 = state_53251;
(statearr_53263[(10)] = inst_53232);

return statearr_53263;
})();
if(cljs.core.truth_(inst_53233)){
var statearr_53264_53297 = state_53251__$1;
(statearr_53264_53297[(1)] = (8));

} else {
var statearr_53265_53298 = state_53251__$1;
(statearr_53265_53298[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_53252 === (3))){
var inst_53249 = (state_53251[(2)]);
var state_53251__$1 = state_53251;
return cljs.core.async.impl.ioc_helpers.return_chan(state_53251__$1,inst_53249);
} else {
if((state_val_53252 === (12))){
var state_53251__$1 = state_53251;
var statearr_53266_53299 = state_53251__$1;
(statearr_53266_53299[(2)] = null);

(statearr_53266_53299[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_53252 === (2))){
var state_53251__$1 = state_53251;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_53251__$1,(4),ch);
} else {
if((state_val_53252 === (11))){
var state_53251__$1 = state_53251;
var statearr_53267_53300 = state_53251__$1;
(statearr_53267_53300[(2)] = null);

(statearr_53267_53300[(1)] = (13));


return cljs.core.cst$kw$recur;
} else {
if((state_val_53252 === (9))){
var inst_53236 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(connecting_QMARK_,true) : cljs.core.reset_BANG_.call(null,connecting_QMARK_,true));
var inst_53237 = org.numenta.sanity.bridge.remote.connect_BANG_(connection_id,to_network_c,on_connect_c,ws_url,connecting_QMARK_,target__GT_mchannel);
var state_53251__$1 = (function (){var statearr_53268 = state_53251;
(statearr_53268[(11)] = inst_53236);

return statearr_53268;
})();
var statearr_53269_53301 = state_53251__$1;
(statearr_53269_53301[(2)] = inst_53237);

(statearr_53269_53301[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_53252 === (5))){
var inst_53227 = (state_53251[(9)]);
var inst_53230 = (inst_53227.cljs$core$IFn$_invoke$arity$0 ? inst_53227.cljs$core$IFn$_invoke$arity$0() : inst_53227.call(null));
var state_53251__$1 = state_53251;
var statearr_53270_53302 = state_53251__$1;
(statearr_53270_53302[(2)] = inst_53230);

(statearr_53270_53302[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_53252 === (10))){
var inst_53239 = (state_53251[(2)]);
var state_53251__$1 = state_53251;
var statearr_53271_53303 = state_53251__$1;
(statearr_53271_53303[(2)] = inst_53239);

(statearr_53271_53303[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_53252 === (8))){
var state_53251__$1 = state_53251;
var statearr_53272_53304 = state_53251__$1;
(statearr_53272_53304[(2)] = null);

(statearr_53272_53304[(1)] = (10));


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
});})(c__35961__auto__,last_seen_connection_id,reconnect_blob,blob_resets_c,blob_resets_cproxy,to_network_c,connection_id,on_connect_c,connecting_QMARK_,target__GT_mchannel))
;
return ((function (switch__35847__auto__,c__35961__auto__,last_seen_connection_id,reconnect_blob,blob_resets_c,blob_resets_cproxy,to_network_c,connection_id,on_connect_c,connecting_QMARK_,target__GT_mchannel){
return (function() {
var org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__35848__auto__ = null;
var org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__35848__auto____0 = (function (){
var statearr_53276 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_53276[(0)] = org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__35848__auto__);

(statearr_53276[(1)] = (1));

return statearr_53276;
});
var org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__35848__auto____1 = (function (state_53251){
while(true){
var ret_value__35849__auto__ = (function (){try{while(true){
var result__35850__auto__ = switch__35847__auto__(state_53251);
if(cljs.core.keyword_identical_QMARK_(result__35850__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__35850__auto__;
}
break;
}
}catch (e53277){if((e53277 instanceof Object)){
var ex__35851__auto__ = e53277;
var statearr_53278_53305 = state_53251;
(statearr_53278_53305[(5)] = ex__35851__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_53251);

return cljs.core.cst$kw$recur;
} else {
throw e53277;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35849__auto__,cljs.core.cst$kw$recur)){
var G__53306 = state_53251;
state_53251 = G__53306;
continue;
} else {
return ret_value__35849__auto__;
}
break;
}
});
org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__35848__auto__ = function(state_53251){
switch(arguments.length){
case 0:
return org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__35848__auto____0.call(this);
case 1:
return org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__35848__auto____1.call(this,state_53251);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__35848__auto____0;
org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__35848__auto____1;
return org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__35848__auto__;
})()
;})(switch__35847__auto__,c__35961__auto__,last_seen_connection_id,reconnect_blob,blob_resets_c,blob_resets_cproxy,to_network_c,connection_id,on_connect_c,connecting_QMARK_,target__GT_mchannel))
})();
var state__35963__auto__ = (function (){var statearr_53279 = (f__35962__auto__.cljs$core$IFn$_invoke$arity$0 ? f__35962__auto__.cljs$core$IFn$_invoke$arity$0() : f__35962__auto__.call(null));
(statearr_53279[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__35961__auto__);

return statearr_53279;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__35963__auto__);
});})(c__35961__auto__,last_seen_connection_id,reconnect_blob,blob_resets_c,blob_resets_cproxy,to_network_c,connection_id,on_connect_c,connecting_QMARK_,target__GT_mchannel))
);

return c__35961__auto__;
});
;})(to_network_c,connection_id,on_connect_c,connecting_QMARK_,target__GT_mchannel))
});
(window["sanityLogMessages"] = (function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.bridge.remote.log_messages_QMARK_,cljs.core.not);
}));
(window["sanityLogRawMessages"] = (function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.bridge.remote.log_raw_messages_QMARK_,cljs.core.not);
}));
(window["sanityLogUgly"] = (function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.bridge.remote.log_pretty_QMARK_,cljs.core.not);
}));
var G__53307_53308 = [cljs.core.str("Call sanityLogMessages() or sanityLogRawMessages() to display websocket "),cljs.core.str("traffic. Call sanityLogUgly() to condense the output.")].join('');
console.log(G__53307_53308);
