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
var local_resources = (function (){var G__52693 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__52693) : cljs.core.atom.call(null,G__52693));
})();
var remote_resources = (function (){var G__52694 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__52694) : cljs.core.atom.call(null,G__52694));
})();
var G__52695 = ws;
(G__52695["onopen"] = ((function (G__52695,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources){
return (function (evt){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["WebSocket connected."], 0));

(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(connection_id,connection_id_STAR_) : cljs.core.reset_BANG_.call(null,connection_id,connection_id_STAR_));

(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(connecting_QMARK_,false) : cljs.core.reset_BANG_.call(null,connecting_QMARK_,false));

var c__35961__auto___52879 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__35961__auto___52879,G__52695,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources){
return (function (){
var f__35962__auto__ = (function (){var switch__35847__auto__ = ((function (c__35961__auto___52879,G__52695,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources){
return (function (state_52731){
var state_val_52732 = (state_52731[(1)]);
if((state_val_52732 === (7))){
var inst_52727 = (state_52731[(2)]);
var state_52731__$1 = state_52731;
var statearr_52733_52880 = state_52731__$1;
(statearr_52733_52880[(2)] = inst_52727);

(statearr_52733_52880[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_52732 === (1))){
var state_52731__$1 = state_52731;
var statearr_52734_52881 = state_52731__$1;
(statearr_52734_52881[(2)] = null);

(statearr_52734_52881[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_52732 === (4))){
var inst_52708 = (state_52731[(7)]);
var inst_52706 = (state_52731[(8)]);
var inst_52706__$1 = (state_52731[(2)]);
var inst_52707 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_52706__$1,(0),null);
var inst_52708__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_52706__$1,(1),null);
var inst_52709 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_52708__$1,teardown_c);
var state_52731__$1 = (function (){var statearr_52735 = state_52731;
(statearr_52735[(9)] = inst_52707);

(statearr_52735[(7)] = inst_52708__$1);

(statearr_52735[(8)] = inst_52706__$1);

return statearr_52735;
})();
if(inst_52709){
var statearr_52736_52882 = state_52731__$1;
(statearr_52736_52882[(1)] = (5));

} else {
var statearr_52737_52883 = state_52731__$1;
(statearr_52737_52883[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_52732 === (13))){
var inst_52723 = (state_52731[(2)]);
var state_52731__$1 = state_52731;
var statearr_52738_52884 = state_52731__$1;
(statearr_52738_52884[(2)] = inst_52723);

(statearr_52738_52884[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_52732 === (6))){
var inst_52708 = (state_52731[(7)]);
var inst_52712 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_52708,on_connect_c);
var state_52731__$1 = state_52731;
if(inst_52712){
var statearr_52739_52885 = state_52731__$1;
(statearr_52739_52885[(1)] = (8));

} else {
var statearr_52740_52886 = state_52731__$1;
(statearr_52740_52886[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_52732 === (3))){
var inst_52729 = (state_52731[(2)]);
var state_52731__$1 = state_52731;
return cljs.core.async.impl.ioc_helpers.return_chan(state_52731__$1,inst_52729);
} else {
if((state_val_52732 === (12))){
var state_52731__$1 = state_52731;
var statearr_52741_52887 = state_52731__$1;
(statearr_52741_52887[(2)] = null);

(statearr_52741_52887[(1)] = (13));


return cljs.core.cst$kw$recur;
} else {
if((state_val_52732 === (2))){
var inst_52702 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_52703 = [teardown_c,on_connect_c];
var inst_52704 = (new cljs.core.PersistentVector(null,2,(5),inst_52702,inst_52703,null));
var state_52731__$1 = state_52731;
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic(state_52731__$1,(4),inst_52704,cljs.core.array_seq([cljs.core.cst$kw$priority,true], 0));
} else {
if((state_val_52732 === (11))){
var inst_52707 = (state_52731[(9)]);
var state_52731__$1 = state_52731;
var statearr_52742_52888 = state_52731__$1;
(statearr_52742_52888[(2)] = inst_52707);

(statearr_52742_52888[(1)] = (13));


return cljs.core.cst$kw$recur;
} else {
if((state_val_52732 === (9))){
var inst_52708 = (state_52731[(7)]);
var inst_52719 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_52708,cljs.core.cst$kw$default);
var state_52731__$1 = state_52731;
if(inst_52719){
var statearr_52743_52889 = state_52731__$1;
(statearr_52743_52889[(1)] = (11));

} else {
var statearr_52744_52890 = state_52731__$1;
(statearr_52744_52890[(1)] = (12));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_52732 === (5))){
var state_52731__$1 = state_52731;
var statearr_52745_52891 = state_52731__$1;
(statearr_52745_52891[(2)] = null);

(statearr_52745_52891[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_52732 === (10))){
var inst_52725 = (state_52731[(2)]);
var state_52731__$1 = state_52731;
var statearr_52746_52892 = state_52731__$1;
(statearr_52746_52892[(2)] = inst_52725);

(statearr_52746_52892[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_52732 === (8))){
var inst_52706 = (state_52731[(8)]);
var inst_52715 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_52706,(0),null);
var inst_52716 = (inst_52715.cljs$core$IFn$_invoke$arity$0 ? inst_52715.cljs$core$IFn$_invoke$arity$0() : inst_52715.call(null));
var state_52731__$1 = (function (){var statearr_52747 = state_52731;
(statearr_52747[(10)] = inst_52716);

return statearr_52747;
})();
var statearr_52748_52893 = state_52731__$1;
(statearr_52748_52893[(2)] = null);

(statearr_52748_52893[(1)] = (2));


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
});})(c__35961__auto___52879,G__52695,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources))
;
return ((function (switch__35847__auto__,c__35961__auto___52879,G__52695,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources){
return (function() {
var org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__35848__auto__ = null;
var org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__35848__auto____0 = (function (){
var statearr_52752 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_52752[(0)] = org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__35848__auto__);

(statearr_52752[(1)] = (1));

return statearr_52752;
});
var org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__35848__auto____1 = (function (state_52731){
while(true){
var ret_value__35849__auto__ = (function (){try{while(true){
var result__35850__auto__ = switch__35847__auto__(state_52731);
if(cljs.core.keyword_identical_QMARK_(result__35850__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__35850__auto__;
}
break;
}
}catch (e52753){if((e52753 instanceof Object)){
var ex__35851__auto__ = e52753;
var statearr_52754_52894 = state_52731;
(statearr_52754_52894[(5)] = ex__35851__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_52731);

return cljs.core.cst$kw$recur;
} else {
throw e52753;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35849__auto__,cljs.core.cst$kw$recur)){
var G__52895 = state_52731;
state_52731 = G__52895;
continue;
} else {
return ret_value__35849__auto__;
}
break;
}
});
org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__35848__auto__ = function(state_52731){
switch(arguments.length){
case 0:
return org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__35848__auto____0.call(this);
case 1:
return org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__35848__auto____1.call(this,state_52731);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__35848__auto____0;
org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__35848__auto____1;
return org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__35848__auto__;
})()
;})(switch__35847__auto__,c__35961__auto___52879,G__52695,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources))
})();
var state__35963__auto__ = (function (){var statearr_52755 = (f__35962__auto__.cljs$core$IFn$_invoke$arity$0 ? f__35962__auto__.cljs$core$IFn$_invoke$arity$0() : f__35962__auto__.call(null));
(statearr_52755[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__35961__auto___52879);

return statearr_52755;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__35963__auto__);
});})(c__35961__auto___52879,G__52695,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources))
);


var c__35961__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__35961__auto__,G__52695,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources){
return (function (){
var f__35962__auto__ = (function (){var switch__35847__auto__ = ((function (c__35961__auto__,G__52695,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources){
return (function (state_52824){
var state_val_52825 = (state_52824[(1)]);
if((state_val_52825 === (7))){
var inst_52785 = (state_52824[(7)]);
var inst_52785__$1 = (state_52824[(2)]);
var inst_52786 = (inst_52785__$1 == null);
var state_52824__$1 = (function (){var statearr_52826 = state_52824;
(statearr_52826[(7)] = inst_52785__$1);

return statearr_52826;
})();
if(cljs.core.truth_(inst_52786)){
var statearr_52827_52896 = state_52824__$1;
(statearr_52827_52896[(1)] = (14));

} else {
var statearr_52828_52897 = state_52824__$1;
(statearr_52828_52897[(1)] = (15));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_52825 === (20))){
var inst_52795 = (state_52824[(8)]);
var inst_52797 = org.numenta.sanity.bridge.marshalling.write_handlers(target__GT_mchannel,local_resources);
var inst_52798 = org.numenta.sanity.bridge.remote.transit_str(inst_52795,inst_52797);
var state_52824__$1 = state_52824;
var statearr_52829_52898 = state_52824__$1;
(statearr_52829_52898[(2)] = inst_52798);

(statearr_52829_52898[(1)] = (22));


return cljs.core.cst$kw$recur;
} else {
if((state_val_52825 === (27))){
var state_52824__$1 = state_52824;
var statearr_52830_52899 = state_52824__$1;
(statearr_52830_52899[(2)] = null);

(statearr_52830_52899[(1)] = (28));


return cljs.core.cst$kw$recur;
} else {
if((state_val_52825 === (1))){
var state_52824__$1 = state_52824;
var statearr_52831_52900 = state_52824__$1;
(statearr_52831_52900[(2)] = null);

(statearr_52831_52900[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_52825 === (24))){
var inst_52801 = (state_52824[(9)]);
var state_52824__$1 = state_52824;
var statearr_52832_52901 = state_52824__$1;
(statearr_52832_52901[(2)] = inst_52801);

(statearr_52832_52901[(1)] = (25));


return cljs.core.cst$kw$recur;
} else {
if((state_val_52825 === (4))){
var inst_52766 = (state_52824[(10)]);
var inst_52768 = (state_52824[(11)]);
var inst_52766__$1 = (state_52824[(2)]);
var inst_52767 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_52766__$1,(0),null);
var inst_52768__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_52766__$1,(1),null);
var inst_52769 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_52768__$1,teardown_c);
var state_52824__$1 = (function (){var statearr_52833 = state_52824;
(statearr_52833[(10)] = inst_52766__$1);

(statearr_52833[(11)] = inst_52768__$1);

(statearr_52833[(12)] = inst_52767);

return statearr_52833;
})();
if(inst_52769){
var statearr_52834_52902 = state_52824__$1;
(statearr_52834_52902[(1)] = (5));

} else {
var statearr_52835_52903 = state_52824__$1;
(statearr_52835_52903[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_52825 === (15))){
var inst_52790 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.bridge.remote.log_messages_QMARK_) : cljs.core.deref.call(null,org.numenta.sanity.bridge.remote.log_messages_QMARK_));
var state_52824__$1 = state_52824;
if(cljs.core.truth_(inst_52790)){
var statearr_52836_52904 = state_52824__$1;
(statearr_52836_52904[(1)] = (17));

} else {
var statearr_52837_52905 = state_52824__$1;
(statearr_52837_52905[(1)] = (18));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_52825 === (21))){
var inst_52795 = (state_52824[(8)]);
var state_52824__$1 = state_52824;
var statearr_52838_52906 = state_52824__$1;
(statearr_52838_52906[(2)] = inst_52795);

(statearr_52838_52906[(1)] = (22));


return cljs.core.cst$kw$recur;
} else {
if((state_val_52825 === (13))){
var inst_52781 = (state_52824[(2)]);
var state_52824__$1 = state_52824;
var statearr_52839_52907 = state_52824__$1;
(statearr_52839_52907[(2)] = inst_52781);

(statearr_52839_52907[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_52825 === (22))){
var inst_52801 = (state_52824[(2)]);
var inst_52802 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.bridge.remote.log_raw_messages_QMARK_) : cljs.core.deref.call(null,org.numenta.sanity.bridge.remote.log_raw_messages_QMARK_));
var state_52824__$1 = (function (){var statearr_52840 = state_52824;
(statearr_52840[(9)] = inst_52801);

return statearr_52840;
})();
if(cljs.core.truth_(inst_52802)){
var statearr_52841_52908 = state_52824__$1;
(statearr_52841_52908[(1)] = (23));

} else {
var statearr_52842_52909 = state_52824__$1;
(statearr_52842_52909[(1)] = (24));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_52825 === (6))){
var inst_52768 = (state_52824[(11)]);
var inst_52772 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_52768,to_network_c);
var state_52824__$1 = state_52824;
if(inst_52772){
var statearr_52843_52910 = state_52824__$1;
(statearr_52843_52910[(1)] = (8));

} else {
var statearr_52844_52911 = state_52824__$1;
(statearr_52844_52911[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_52825 === (28))){
var inst_52807 = (state_52824[(13)]);
var inst_52816 = (state_52824[(2)]);
var inst_52817 = ws.send(inst_52807);
var state_52824__$1 = (function (){var statearr_52845 = state_52824;
(statearr_52845[(14)] = inst_52816);

(statearr_52845[(15)] = inst_52817);

return statearr_52845;
})();
var statearr_52846_52912 = state_52824__$1;
(statearr_52846_52912[(2)] = null);

(statearr_52846_52912[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_52825 === (25))){
var inst_52808 = (state_52824[(16)]);
var inst_52807 = (state_52824[(13)]);
var inst_52807__$1 = (state_52824[(2)]);
var inst_52808__$1 = cljs.core.count(inst_52807__$1);
var inst_52809 = (inst_52808__$1 > org.numenta.sanity.bridge.remote.max_message_size);
var state_52824__$1 = (function (){var statearr_52847 = state_52824;
(statearr_52847[(16)] = inst_52808__$1);

(statearr_52847[(13)] = inst_52807__$1);

return statearr_52847;
})();
if(cljs.core.truth_(inst_52809)){
var statearr_52848_52913 = state_52824__$1;
(statearr_52848_52913[(1)] = (26));

} else {
var statearr_52849_52914 = state_52824__$1;
(statearr_52849_52914[(1)] = (27));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_52825 === (17))){
var inst_52785 = (state_52824[(7)]);
var inst_52792 = org.numenta.sanity.bridge.remote.log(inst_52785,"SENDING:");
var state_52824__$1 = state_52824;
var statearr_52850_52915 = state_52824__$1;
(statearr_52850_52915[(2)] = inst_52792);

(statearr_52850_52915[(1)] = (19));


return cljs.core.cst$kw$recur;
} else {
if((state_val_52825 === (3))){
var inst_52822 = (state_52824[(2)]);
var state_52824__$1 = state_52824;
return cljs.core.async.impl.ioc_helpers.return_chan(state_52824__$1,inst_52822);
} else {
if((state_val_52825 === (12))){
var state_52824__$1 = state_52824;
var statearr_52851_52916 = state_52824__$1;
(statearr_52851_52916[(2)] = null);

(statearr_52851_52916[(1)] = (13));


return cljs.core.cst$kw$recur;
} else {
if((state_val_52825 === (2))){
var inst_52762 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_52763 = [teardown_c,to_network_c];
var inst_52764 = (new cljs.core.PersistentVector(null,2,(5),inst_52762,inst_52763,null));
var state_52824__$1 = state_52824;
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic(state_52824__$1,(4),inst_52764,cljs.core.array_seq([cljs.core.cst$kw$priority,true], 0));
} else {
if((state_val_52825 === (23))){
var inst_52801 = (state_52824[(9)]);
var inst_52804 = org.numenta.sanity.bridge.remote.log(inst_52801,"SENDING TEXT:");
var state_52824__$1 = state_52824;
var statearr_52852_52917 = state_52824__$1;
(statearr_52852_52917[(2)] = inst_52804);

(statearr_52852_52917[(1)] = (25));


return cljs.core.cst$kw$recur;
} else {
if((state_val_52825 === (19))){
var inst_52795 = (state_52824[(2)]);
var state_52824__$1 = (function (){var statearr_52853 = state_52824;
(statearr_52853[(8)] = inst_52795);

return statearr_52853;
})();
var statearr_52854_52918 = state_52824__$1;
(statearr_52854_52918[(1)] = (20));



return cljs.core.cst$kw$recur;
} else {
if((state_val_52825 === (11))){
var inst_52767 = (state_52824[(12)]);
var state_52824__$1 = state_52824;
var statearr_52856_52919 = state_52824__$1;
(statearr_52856_52919[(2)] = inst_52767);

(statearr_52856_52919[(1)] = (13));


return cljs.core.cst$kw$recur;
} else {
if((state_val_52825 === (9))){
var inst_52768 = (state_52824[(11)]);
var inst_52777 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_52768,cljs.core.cst$kw$default);
var state_52824__$1 = state_52824;
if(inst_52777){
var statearr_52857_52920 = state_52824__$1;
(statearr_52857_52920[(1)] = (11));

} else {
var statearr_52858_52921 = state_52824__$1;
(statearr_52858_52921[(1)] = (12));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_52825 === (5))){
var state_52824__$1 = state_52824;
var statearr_52859_52922 = state_52824__$1;
(statearr_52859_52922[(2)] = null);

(statearr_52859_52922[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_52825 === (14))){
var state_52824__$1 = state_52824;
var statearr_52860_52923 = state_52824__$1;
(statearr_52860_52923[(2)] = null);

(statearr_52860_52923[(1)] = (16));


return cljs.core.cst$kw$recur;
} else {
if((state_val_52825 === (26))){
var inst_52808 = (state_52824[(16)]);
var inst_52807 = (state_52824[(13)]);
var inst_52811 = [cljs.core.str("Message too large! Size: "),cljs.core.str(inst_52808),cljs.core.str("Max-size: "),cljs.core.str(org.numenta.sanity.bridge.remote.max_message_size)].join('');
var inst_52812 = alert(inst_52811);
var inst_52813 = cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Message too large!",inst_52807], 0));
var state_52824__$1 = (function (){var statearr_52861 = state_52824;
(statearr_52861[(17)] = inst_52812);

return statearr_52861;
})();
var statearr_52862_52924 = state_52824__$1;
(statearr_52862_52924[(2)] = inst_52813);

(statearr_52862_52924[(1)] = (28));


return cljs.core.cst$kw$recur;
} else {
if((state_val_52825 === (16))){
var inst_52820 = (state_52824[(2)]);
var state_52824__$1 = state_52824;
var statearr_52863_52925 = state_52824__$1;
(statearr_52863_52925[(2)] = inst_52820);

(statearr_52863_52925[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_52825 === (10))){
var inst_52783 = (state_52824[(2)]);
var state_52824__$1 = state_52824;
var statearr_52864_52926 = state_52824__$1;
(statearr_52864_52926[(2)] = inst_52783);

(statearr_52864_52926[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_52825 === (18))){
var inst_52785 = (state_52824[(7)]);
var state_52824__$1 = state_52824;
var statearr_52865_52927 = state_52824__$1;
(statearr_52865_52927[(2)] = inst_52785);

(statearr_52865_52927[(1)] = (19));


return cljs.core.cst$kw$recur;
} else {
if((state_val_52825 === (8))){
var inst_52766 = (state_52824[(10)]);
var inst_52775 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_52766,(0),null);
var state_52824__$1 = state_52824;
var statearr_52866_52928 = state_52824__$1;
(statearr_52866_52928[(2)] = inst_52775);

(statearr_52866_52928[(1)] = (10));


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
});})(c__35961__auto__,G__52695,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources))
;
return ((function (switch__35847__auto__,c__35961__auto__,G__52695,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources){
return (function() {
var org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__35848__auto__ = null;
var org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__35848__auto____0 = (function (){
var statearr_52870 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_52870[(0)] = org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__35848__auto__);

(statearr_52870[(1)] = (1));

return statearr_52870;
});
var org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__35848__auto____1 = (function (state_52824){
while(true){
var ret_value__35849__auto__ = (function (){try{while(true){
var result__35850__auto__ = switch__35847__auto__(state_52824);
if(cljs.core.keyword_identical_QMARK_(result__35850__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__35850__auto__;
}
break;
}
}catch (e52871){if((e52871 instanceof Object)){
var ex__35851__auto__ = e52871;
var statearr_52872_52929 = state_52824;
(statearr_52872_52929[(5)] = ex__35851__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_52824);

return cljs.core.cst$kw$recur;
} else {
throw e52871;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35849__auto__,cljs.core.cst$kw$recur)){
var G__52930 = state_52824;
state_52824 = G__52930;
continue;
} else {
return ret_value__35849__auto__;
}
break;
}
});
org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__35848__auto__ = function(state_52824){
switch(arguments.length){
case 0:
return org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__35848__auto____0.call(this);
case 1:
return org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__35848__auto____1.call(this,state_52824);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__35848__auto____0;
org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__35848__auto____1;
return org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__35848__auto__;
})()
;})(switch__35847__auto__,c__35961__auto__,G__52695,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources))
})();
var state__35963__auto__ = (function (){var statearr_52873 = (f__35962__auto__.cljs$core$IFn$_invoke$arity$0 ? f__35962__auto__.cljs$core$IFn$_invoke$arity$0() : f__35962__auto__.call(null));
(statearr_52873[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__35961__auto__);

return statearr_52873;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__35963__auto__);
});})(c__35961__auto__,G__52695,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources))
);

return c__35961__auto__;
});})(G__52695,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources))
);

(G__52695["onerror"] = ((function (G__52695,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources){
return (function (evt){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["WebSocket error:"], 0));

return console.error(evt);
});})(G__52695,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources))
);

(G__52695["onclose"] = ((function (G__52695,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources){
return (function (evt){
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(connection_id,null) : cljs.core.reset_BANG_.call(null,connection_id,null));

(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(connecting_QMARK_,false) : cljs.core.reset_BANG_.call(null,connecting_QMARK_,false));

cljs.core.async.close_BANG_(teardown_c);

return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["WebSocket closed."], 0));
});})(G__52695,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources))
);

(G__52695["onmessage"] = ((function (G__52695,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources){
return (function (evt){
var vec__52874 = (function (){var G__52876 = evt.data;
var G__52876__$1 = (cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.bridge.remote.log_raw_messages_QMARK_) : cljs.core.deref.call(null,org.numenta.sanity.bridge.remote.log_raw_messages_QMARK_)))?org.numenta.sanity.bridge.remote.log(G__52876,"RECEIVED TEXT:"):G__52876);
var G__52876__$2 = org.numenta.sanity.bridge.remote.read_transit_str(G__52876__$1,org.numenta.sanity.bridge.marshalling.read_handlers(target__GT_mchannel,((function (G__52876,G__52876__$1,G__52695,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources){
return (function (t,v){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(to_network_c,org.numenta.sanity.bridge.remote.target_put(t,v));
});})(G__52876,G__52876__$1,G__52695,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources))
,((function (G__52876,G__52876__$1,G__52695,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources){
return (function (t){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(to_network_c,org.numenta.sanity.bridge.remote.target_close(t));
});})(G__52876,G__52876__$1,G__52695,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources))
,remote_resources))
;
if(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.bridge.remote.log_messages_QMARK_) : cljs.core.deref.call(null,org.numenta.sanity.bridge.remote.log_messages_QMARK_)))){
return org.numenta.sanity.bridge.remote.log(G__52876__$2,"RECEIVED:");
} else {
return G__52876__$2;
}
})();
var op = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__52874,(0),null);
var target = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__52874,(1),null);
var msg = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__52874,(2),null);
var map__52875 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(target__GT_mchannel) : cljs.core.deref.call(null,target__GT_mchannel)).call(null,target);
var map__52875__$1 = ((((!((map__52875 == null)))?((((map__52875.cljs$lang$protocol_mask$partition0$ & (64))) || (map__52875.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__52875):map__52875);
var mchannel = map__52875__$1;
var ch = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__52875__$1,cljs.core.cst$kw$ch);
var single_use_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__52875__$1,cljs.core.cst$kw$single_DASH_use_QMARK_);
if(cljs.core.truth_(ch)){
if(cljs.core.truth_(single_use_QMARK_)){
org.numenta.sanity.bridge.marshalling.release_BANG_(mchannel);
} else {
}

var G__52878 = op;
switch (G__52878) {
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
});})(G__52695,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources))
);

return G__52695;
});
org.numenta.sanity.bridge.remote.init = (function org$numenta$sanity$bridge$remote$init(ws_url){
var to_network_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
var connection_id = (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null) : cljs.core.atom.call(null,null));
var on_connect_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
var connecting_QMARK_ = (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(false) : cljs.core.atom.call(null,false));
var target__GT_mchannel = (function (){var G__53105 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__53105) : cljs.core.atom.call(null,G__53105));
})();
return ((function (to_network_c,connection_id,on_connect_c,connecting_QMARK_,target__GT_mchannel){
return (function org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target(t,ch){
var last_seen_connection_id = (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null) : cljs.core.atom.call(null,null));
var reconnect_blob = (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null) : cljs.core.atom.call(null,null));
var blob_resets_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
var blob_resets_cproxy = org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$1(blob_resets_c);
var c__35961__auto___53278 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__35961__auto___53278,last_seen_connection_id,reconnect_blob,blob_resets_c,blob_resets_cproxy,to_network_c,connection_id,on_connect_c,connecting_QMARK_,target__GT_mchannel){
return (function (){
var f__35962__auto__ = (function (){var switch__35847__auto__ = ((function (c__35961__auto___53278,last_seen_connection_id,reconnect_blob,blob_resets_c,blob_resets_cproxy,to_network_c,connection_id,on_connect_c,connecting_QMARK_,target__GT_mchannel){
return (function (state_53205){
var state_val_53206 = (state_53205[(1)]);
if((state_val_53206 === (1))){
var state_53205__$1 = state_53205;
var statearr_53207_53279 = state_53205__$1;
(statearr_53207_53279[(2)] = null);

(statearr_53207_53279[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_53206 === (2))){
var state_53205__$1 = state_53205;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_53205__$1,(4),blob_resets_c);
} else {
if((state_val_53206 === (3))){
var inst_53203 = (state_53205[(2)]);
var state_53205__$1 = state_53205;
return cljs.core.async.impl.ioc_helpers.return_chan(state_53205__$1,inst_53203);
} else {
if((state_val_53206 === (4))){
var inst_53194 = (state_53205[(7)]);
var inst_53194__$1 = (state_53205[(2)]);
var inst_53195 = (inst_53194__$1 == null);
var state_53205__$1 = (function (){var statearr_53208 = state_53205;
(statearr_53208[(7)] = inst_53194__$1);

return statearr_53208;
})();
if(cljs.core.truth_(inst_53195)){
var statearr_53209_53280 = state_53205__$1;
(statearr_53209_53280[(1)] = (5));

} else {
var statearr_53210_53281 = state_53205__$1;
(statearr_53210_53281[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_53206 === (5))){
var state_53205__$1 = state_53205;
var statearr_53211_53282 = state_53205__$1;
(statearr_53211_53282[(2)] = null);

(statearr_53211_53282[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_53206 === (6))){
var inst_53194 = (state_53205[(7)]);
var inst_53198 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(reconnect_blob,inst_53194) : cljs.core.reset_BANG_.call(null,reconnect_blob,inst_53194));
var state_53205__$1 = (function (){var statearr_53212 = state_53205;
(statearr_53212[(8)] = inst_53198);

return statearr_53212;
})();
var statearr_53213_53283 = state_53205__$1;
(statearr_53213_53283[(2)] = null);

(statearr_53213_53283[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_53206 === (7))){
var inst_53201 = (state_53205[(2)]);
var state_53205__$1 = state_53205;
var statearr_53214_53284 = state_53205__$1;
(statearr_53214_53284[(2)] = inst_53201);

(statearr_53214_53284[(1)] = (3));


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
});})(c__35961__auto___53278,last_seen_connection_id,reconnect_blob,blob_resets_c,blob_resets_cproxy,to_network_c,connection_id,on_connect_c,connecting_QMARK_,target__GT_mchannel))
;
return ((function (switch__35847__auto__,c__35961__auto___53278,last_seen_connection_id,reconnect_blob,blob_resets_c,blob_resets_cproxy,to_network_c,connection_id,on_connect_c,connecting_QMARK_,target__GT_mchannel){
return (function() {
var org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__35848__auto__ = null;
var org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__35848__auto____0 = (function (){
var statearr_53218 = [null,null,null,null,null,null,null,null,null];
(statearr_53218[(0)] = org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__35848__auto__);

(statearr_53218[(1)] = (1));

return statearr_53218;
});
var org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__35848__auto____1 = (function (state_53205){
while(true){
var ret_value__35849__auto__ = (function (){try{while(true){
var result__35850__auto__ = switch__35847__auto__(state_53205);
if(cljs.core.keyword_identical_QMARK_(result__35850__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__35850__auto__;
}
break;
}
}catch (e53219){if((e53219 instanceof Object)){
var ex__35851__auto__ = e53219;
var statearr_53220_53285 = state_53205;
(statearr_53220_53285[(5)] = ex__35851__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_53205);

return cljs.core.cst$kw$recur;
} else {
throw e53219;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35849__auto__,cljs.core.cst$kw$recur)){
var G__53286 = state_53205;
state_53205 = G__53286;
continue;
} else {
return ret_value__35849__auto__;
}
break;
}
});
org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__35848__auto__ = function(state_53205){
switch(arguments.length){
case 0:
return org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__35848__auto____0.call(this);
case 1:
return org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__35848__auto____1.call(this,state_53205);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__35848__auto____0;
org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__35848__auto____1;
return org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__35848__auto__;
})()
;})(switch__35847__auto__,c__35961__auto___53278,last_seen_connection_id,reconnect_blob,blob_resets_c,blob_resets_cproxy,to_network_c,connection_id,on_connect_c,connecting_QMARK_,target__GT_mchannel))
})();
var state__35963__auto__ = (function (){var statearr_53221 = (f__35962__auto__.cljs$core$IFn$_invoke$arity$0 ? f__35962__auto__.cljs$core$IFn$_invoke$arity$0() : f__35962__auto__.call(null));
(statearr_53221[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__35961__auto___53278);

return statearr_53221;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__35963__auto__);
});})(c__35961__auto___53278,last_seen_connection_id,reconnect_blob,blob_resets_c,blob_resets_cproxy,to_network_c,connection_id,on_connect_c,connecting_QMARK_,target__GT_mchannel))
);


var c__35961__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__35961__auto__,last_seen_connection_id,reconnect_blob,blob_resets_c,blob_resets_cproxy,to_network_c,connection_id,on_connect_c,connecting_QMARK_,target__GT_mchannel){
return (function (){
var f__35962__auto__ = (function (){var switch__35847__auto__ = ((function (c__35961__auto__,last_seen_connection_id,reconnect_blob,blob_resets_c,blob_resets_cproxy,to_network_c,connection_id,on_connect_c,connecting_QMARK_,target__GT_mchannel){
return (function (state_53249){
var state_val_53250 = (state_53249[(1)]);
if((state_val_53250 === (7))){
var inst_53224 = (state_53249[(7)]);
var inst_53239 = (state_53249[(2)]);
var inst_53240 = (inst_53224 == null);
var state_53249__$1 = (function (){var statearr_53251 = state_53249;
(statearr_53251[(8)] = inst_53239);

return statearr_53251;
})();
if(cljs.core.truth_(inst_53240)){
var statearr_53252_53287 = state_53249__$1;
(statearr_53252_53287[(1)] = (11));

} else {
var statearr_53253_53288 = state_53249__$1;
(statearr_53253_53288[(1)] = (12));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_53250 === (1))){
var state_53249__$1 = state_53249;
var statearr_53254_53289 = state_53249__$1;
(statearr_53254_53289[(2)] = null);

(statearr_53254_53289[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_53250 === (4))){
var inst_53224 = (state_53249[(7)]);
var inst_53224__$1 = (state_53249[(2)]);
var inst_53225 = (function (){var v = inst_53224__$1;
return ((function (v,inst_53224,inst_53224__$1,state_val_53250,c__35961__auto__,last_seen_connection_id,reconnect_blob,blob_resets_c,blob_resets_cproxy,to_network_c,connection_id,on_connect_c,connecting_QMARK_,target__GT_mchannel){
return (function (){
if((((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(last_seen_connection_id) : cljs.core.deref.call(null,last_seen_connection_id)) == null)) || (cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(connection_id) : cljs.core.deref.call(null,connection_id)),(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(last_seen_connection_id) : cljs.core.deref.call(null,last_seen_connection_id))))){
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(to_network_c,org.numenta.sanity.bridge.remote.target_put(t,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["connect",(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(reconnect_blob) : cljs.core.deref.call(null,reconnect_blob)),blob_resets_cproxy], null)));

var G__53255_53290 = last_seen_connection_id;
var G__53256_53291 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(connection_id) : cljs.core.deref.call(null,connection_id));
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__53255_53290,G__53256_53291) : cljs.core.reset_BANG_.call(null,G__53255_53290,G__53256_53291));
} else {
}

if(!((v == null))){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(to_network_c,org.numenta.sanity.bridge.remote.target_put(t,v));
} else {
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(to_network_c,org.numenta.sanity.bridge.remote.target_close(t));
}
});
;})(v,inst_53224,inst_53224__$1,state_val_53250,c__35961__auto__,last_seen_connection_id,reconnect_blob,blob_resets_c,blob_resets_cproxy,to_network_c,connection_id,on_connect_c,connecting_QMARK_,target__GT_mchannel))
})();
var inst_53226 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(connection_id) : cljs.core.deref.call(null,connection_id));
var state_53249__$1 = (function (){var statearr_53257 = state_53249;
(statearr_53257[(7)] = inst_53224__$1);

(statearr_53257[(9)] = inst_53225);

return statearr_53257;
})();
if(cljs.core.truth_(inst_53226)){
var statearr_53258_53292 = state_53249__$1;
(statearr_53258_53292[(1)] = (5));

} else {
var statearr_53259_53293 = state_53249__$1;
(statearr_53259_53293[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_53250 === (13))){
var inst_53245 = (state_53249[(2)]);
var state_53249__$1 = state_53249;
var statearr_53260_53294 = state_53249__$1;
(statearr_53260_53294[(2)] = inst_53245);

(statearr_53260_53294[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_53250 === (6))){
var inst_53225 = (state_53249[(9)]);
var inst_53230 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(on_connect_c,inst_53225);
var inst_53231 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(connecting_QMARK_) : cljs.core.deref.call(null,connecting_QMARK_));
var state_53249__$1 = (function (){var statearr_53261 = state_53249;
(statearr_53261[(10)] = inst_53230);

return statearr_53261;
})();
if(cljs.core.truth_(inst_53231)){
var statearr_53262_53295 = state_53249__$1;
(statearr_53262_53295[(1)] = (8));

} else {
var statearr_53263_53296 = state_53249__$1;
(statearr_53263_53296[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_53250 === (3))){
var inst_53247 = (state_53249[(2)]);
var state_53249__$1 = state_53249;
return cljs.core.async.impl.ioc_helpers.return_chan(state_53249__$1,inst_53247);
} else {
if((state_val_53250 === (12))){
var state_53249__$1 = state_53249;
var statearr_53264_53297 = state_53249__$1;
(statearr_53264_53297[(2)] = null);

(statearr_53264_53297[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_53250 === (2))){
var state_53249__$1 = state_53249;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_53249__$1,(4),ch);
} else {
if((state_val_53250 === (11))){
var state_53249__$1 = state_53249;
var statearr_53265_53298 = state_53249__$1;
(statearr_53265_53298[(2)] = null);

(statearr_53265_53298[(1)] = (13));


return cljs.core.cst$kw$recur;
} else {
if((state_val_53250 === (9))){
var inst_53234 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(connecting_QMARK_,true) : cljs.core.reset_BANG_.call(null,connecting_QMARK_,true));
var inst_53235 = org.numenta.sanity.bridge.remote.connect_BANG_(connection_id,to_network_c,on_connect_c,ws_url,connecting_QMARK_,target__GT_mchannel);
var state_53249__$1 = (function (){var statearr_53266 = state_53249;
(statearr_53266[(11)] = inst_53234);

return statearr_53266;
})();
var statearr_53267_53299 = state_53249__$1;
(statearr_53267_53299[(2)] = inst_53235);

(statearr_53267_53299[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_53250 === (5))){
var inst_53225 = (state_53249[(9)]);
var inst_53228 = (inst_53225.cljs$core$IFn$_invoke$arity$0 ? inst_53225.cljs$core$IFn$_invoke$arity$0() : inst_53225.call(null));
var state_53249__$1 = state_53249;
var statearr_53268_53300 = state_53249__$1;
(statearr_53268_53300[(2)] = inst_53228);

(statearr_53268_53300[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_53250 === (10))){
var inst_53237 = (state_53249[(2)]);
var state_53249__$1 = state_53249;
var statearr_53269_53301 = state_53249__$1;
(statearr_53269_53301[(2)] = inst_53237);

(statearr_53269_53301[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_53250 === (8))){
var state_53249__$1 = state_53249;
var statearr_53270_53302 = state_53249__$1;
(statearr_53270_53302[(2)] = null);

(statearr_53270_53302[(1)] = (10));


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
var statearr_53274 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_53274[(0)] = org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__35848__auto__);

(statearr_53274[(1)] = (1));

return statearr_53274;
});
var org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__35848__auto____1 = (function (state_53249){
while(true){
var ret_value__35849__auto__ = (function (){try{while(true){
var result__35850__auto__ = switch__35847__auto__(state_53249);
if(cljs.core.keyword_identical_QMARK_(result__35850__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__35850__auto__;
}
break;
}
}catch (e53275){if((e53275 instanceof Object)){
var ex__35851__auto__ = e53275;
var statearr_53276_53303 = state_53249;
(statearr_53276_53303[(5)] = ex__35851__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_53249);

return cljs.core.cst$kw$recur;
} else {
throw e53275;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35849__auto__,cljs.core.cst$kw$recur)){
var G__53304 = state_53249;
state_53249 = G__53304;
continue;
} else {
return ret_value__35849__auto__;
}
break;
}
});
org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__35848__auto__ = function(state_53249){
switch(arguments.length){
case 0:
return org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__35848__auto____0.call(this);
case 1:
return org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__35848__auto____1.call(this,state_53249);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__35848__auto____0;
org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__35848__auto____1;
return org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__35848__auto__;
})()
;})(switch__35847__auto__,c__35961__auto__,last_seen_connection_id,reconnect_blob,blob_resets_c,blob_resets_cproxy,to_network_c,connection_id,on_connect_c,connecting_QMARK_,target__GT_mchannel))
})();
var state__35963__auto__ = (function (){var statearr_53277 = (f__35962__auto__.cljs$core$IFn$_invoke$arity$0 ? f__35962__auto__.cljs$core$IFn$_invoke$arity$0() : f__35962__auto__.call(null));
(statearr_53277[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__35961__auto__);

return statearr_53277;
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
var G__53305_53306 = [cljs.core.str("Call sanityLogMessages() or sanityLogRawMessages() to display websocket "),cljs.core.str("traffic. Call sanityLogUgly() to condense the output.")].join('');
console.log(G__53305_53306);
