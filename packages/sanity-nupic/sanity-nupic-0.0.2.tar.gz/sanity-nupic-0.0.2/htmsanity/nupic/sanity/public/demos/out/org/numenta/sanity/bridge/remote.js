// Compiled by ClojureScript 1.7.170 {:static-fns true, :optimize-constants true}
goog.provide('org.numenta.sanity.bridge.remote');
goog.require('cljs.core');
goog.require('cljs.core.async');
goog.require('cljs.pprint');
goog.require('cognitect.transit');
goog.require('org.numenta.sanity.bridge.marshalling');
goog.require('org.numenta.sanity.util');
goog.require('org.nfrac.comportex.topology');
org.numenta.sanity.bridge.remote.max_message_size = ((64) * (1024));
org.numenta.sanity.bridge.remote.transit_str = (function org$numenta$sanity$bridge$remote$transit_str(m,extra_handlers){
return cognitect.transit.write(cognitect.transit.writer.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.bridge.marshalling.encoding,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$handlers,extra_handlers], null)),m);
});
org.numenta.sanity.bridge.remote.read_transit_str = (function org$numenta$sanity$bridge$remote$read_transit_str(s,extra_handlers){
return cognitect.transit.read(cognitect.transit.reader.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.bridge.marshalling.encoding,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$handlers,extra_handlers], null)),s);
});
org.numenta.sanity.bridge.remote.target_put = (function org$numenta$sanity$bridge$remote$target_put(target,v){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["put!",target,org.numenta.sanity.util.stringify_keys_STAR_(v)], null);
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
var local_resources = (function (){var G__52932 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__52932) : cljs.core.atom.call(null,G__52932));
})();
var remote_resources = (function (){var G__52933 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__52933) : cljs.core.atom.call(null,G__52933));
})();
var G__52934 = ws;
(G__52934["onopen"] = ((function (G__52934,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources){
return (function (evt){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["WebSocket connected."], 0));

(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(connection_id,connection_id_STAR_) : cljs.core.reset_BANG_.call(null,connection_id,connection_id_STAR_));

(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(connecting_QMARK_,false) : cljs.core.reset_BANG_.call(null,connecting_QMARK_,false));

var c__36154__auto___53118 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__36154__auto___53118,G__52934,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources){
return (function (){
var f__36155__auto__ = (function (){var switch__36040__auto__ = ((function (c__36154__auto___53118,G__52934,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources){
return (function (state_52970){
var state_val_52971 = (state_52970[(1)]);
if((state_val_52971 === (7))){
var inst_52966 = (state_52970[(2)]);
var state_52970__$1 = state_52970;
var statearr_52972_53119 = state_52970__$1;
(statearr_52972_53119[(2)] = inst_52966);

(statearr_52972_53119[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_52971 === (1))){
var state_52970__$1 = state_52970;
var statearr_52973_53120 = state_52970__$1;
(statearr_52973_53120[(2)] = null);

(statearr_52973_53120[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_52971 === (4))){
var inst_52945 = (state_52970[(7)]);
var inst_52947 = (state_52970[(8)]);
var inst_52945__$1 = (state_52970[(2)]);
var inst_52946 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_52945__$1,(0),null);
var inst_52947__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_52945__$1,(1),null);
var inst_52948 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_52947__$1,teardown_c);
var state_52970__$1 = (function (){var statearr_52974 = state_52970;
(statearr_52974[(7)] = inst_52945__$1);

(statearr_52974[(8)] = inst_52947__$1);

(statearr_52974[(9)] = inst_52946);

return statearr_52974;
})();
if(inst_52948){
var statearr_52975_53121 = state_52970__$1;
(statearr_52975_53121[(1)] = (5));

} else {
var statearr_52976_53122 = state_52970__$1;
(statearr_52976_53122[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_52971 === (13))){
var inst_52962 = (state_52970[(2)]);
var state_52970__$1 = state_52970;
var statearr_52977_53123 = state_52970__$1;
(statearr_52977_53123[(2)] = inst_52962);

(statearr_52977_53123[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_52971 === (6))){
var inst_52947 = (state_52970[(8)]);
var inst_52951 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_52947,on_connect_c);
var state_52970__$1 = state_52970;
if(inst_52951){
var statearr_52978_53124 = state_52970__$1;
(statearr_52978_53124[(1)] = (8));

} else {
var statearr_52979_53125 = state_52970__$1;
(statearr_52979_53125[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_52971 === (3))){
var inst_52968 = (state_52970[(2)]);
var state_52970__$1 = state_52970;
return cljs.core.async.impl.ioc_helpers.return_chan(state_52970__$1,inst_52968);
} else {
if((state_val_52971 === (12))){
var state_52970__$1 = state_52970;
var statearr_52980_53126 = state_52970__$1;
(statearr_52980_53126[(2)] = null);

(statearr_52980_53126[(1)] = (13));


return cljs.core.cst$kw$recur;
} else {
if((state_val_52971 === (2))){
var inst_52941 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_52942 = [teardown_c,on_connect_c];
var inst_52943 = (new cljs.core.PersistentVector(null,2,(5),inst_52941,inst_52942,null));
var state_52970__$1 = state_52970;
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic(state_52970__$1,(4),inst_52943,cljs.core.array_seq([cljs.core.cst$kw$priority,true], 0));
} else {
if((state_val_52971 === (11))){
var inst_52946 = (state_52970[(9)]);
var state_52970__$1 = state_52970;
var statearr_52981_53127 = state_52970__$1;
(statearr_52981_53127[(2)] = inst_52946);

(statearr_52981_53127[(1)] = (13));


return cljs.core.cst$kw$recur;
} else {
if((state_val_52971 === (9))){
var inst_52947 = (state_52970[(8)]);
var inst_52958 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_52947,cljs.core.cst$kw$default);
var state_52970__$1 = state_52970;
if(inst_52958){
var statearr_52982_53128 = state_52970__$1;
(statearr_52982_53128[(1)] = (11));

} else {
var statearr_52983_53129 = state_52970__$1;
(statearr_52983_53129[(1)] = (12));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_52971 === (5))){
var state_52970__$1 = state_52970;
var statearr_52984_53130 = state_52970__$1;
(statearr_52984_53130[(2)] = null);

(statearr_52984_53130[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_52971 === (10))){
var inst_52964 = (state_52970[(2)]);
var state_52970__$1 = state_52970;
var statearr_52985_53131 = state_52970__$1;
(statearr_52985_53131[(2)] = inst_52964);

(statearr_52985_53131[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_52971 === (8))){
var inst_52945 = (state_52970[(7)]);
var inst_52954 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_52945,(0),null);
var inst_52955 = (inst_52954.cljs$core$IFn$_invoke$arity$0 ? inst_52954.cljs$core$IFn$_invoke$arity$0() : inst_52954.call(null));
var state_52970__$1 = (function (){var statearr_52986 = state_52970;
(statearr_52986[(10)] = inst_52955);

return statearr_52986;
})();
var statearr_52987_53132 = state_52970__$1;
(statearr_52987_53132[(2)] = null);

(statearr_52987_53132[(1)] = (2));


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
});})(c__36154__auto___53118,G__52934,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources))
;
return ((function (switch__36040__auto__,c__36154__auto___53118,G__52934,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources){
return (function() {
var org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__36041__auto__ = null;
var org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__36041__auto____0 = (function (){
var statearr_52991 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_52991[(0)] = org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__36041__auto__);

(statearr_52991[(1)] = (1));

return statearr_52991;
});
var org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__36041__auto____1 = (function (state_52970){
while(true){
var ret_value__36042__auto__ = (function (){try{while(true){
var result__36043__auto__ = switch__36040__auto__(state_52970);
if(cljs.core.keyword_identical_QMARK_(result__36043__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__36043__auto__;
}
break;
}
}catch (e52992){if((e52992 instanceof Object)){
var ex__36044__auto__ = e52992;
var statearr_52993_53133 = state_52970;
(statearr_52993_53133[(5)] = ex__36044__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_52970);

return cljs.core.cst$kw$recur;
} else {
throw e52992;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__36042__auto__,cljs.core.cst$kw$recur)){
var G__53134 = state_52970;
state_52970 = G__53134;
continue;
} else {
return ret_value__36042__auto__;
}
break;
}
});
org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__36041__auto__ = function(state_52970){
switch(arguments.length){
case 0:
return org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__36041__auto____0.call(this);
case 1:
return org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__36041__auto____1.call(this,state_52970);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__36041__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__36041__auto____0;
org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__36041__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__36041__auto____1;
return org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__36041__auto__;
})()
;})(switch__36040__auto__,c__36154__auto___53118,G__52934,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources))
})();
var state__36156__auto__ = (function (){var statearr_52994 = (f__36155__auto__.cljs$core$IFn$_invoke$arity$0 ? f__36155__auto__.cljs$core$IFn$_invoke$arity$0() : f__36155__auto__.call(null));
(statearr_52994[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__36154__auto___53118);

return statearr_52994;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__36156__auto__);
});})(c__36154__auto___53118,G__52934,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources))
);


var c__36154__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__36154__auto__,G__52934,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources){
return (function (){
var f__36155__auto__ = (function (){var switch__36040__auto__ = ((function (c__36154__auto__,G__52934,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources){
return (function (state_53063){
var state_val_53064 = (state_53063[(1)]);
if((state_val_53064 === (7))){
var inst_53024 = (state_53063[(7)]);
var inst_53024__$1 = (state_53063[(2)]);
var inst_53025 = (inst_53024__$1 == null);
var state_53063__$1 = (function (){var statearr_53065 = state_53063;
(statearr_53065[(7)] = inst_53024__$1);

return statearr_53065;
})();
if(cljs.core.truth_(inst_53025)){
var statearr_53066_53135 = state_53063__$1;
(statearr_53066_53135[(1)] = (14));

} else {
var statearr_53067_53136 = state_53063__$1;
(statearr_53067_53136[(1)] = (15));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_53064 === (20))){
var inst_53034 = (state_53063[(8)]);
var inst_53036 = org.numenta.sanity.bridge.marshalling.write_handlers(target__GT_mchannel,local_resources);
var inst_53037 = org.numenta.sanity.bridge.remote.transit_str(inst_53034,inst_53036);
var state_53063__$1 = state_53063;
var statearr_53068_53137 = state_53063__$1;
(statearr_53068_53137[(2)] = inst_53037);

(statearr_53068_53137[(1)] = (22));


return cljs.core.cst$kw$recur;
} else {
if((state_val_53064 === (27))){
var state_53063__$1 = state_53063;
var statearr_53069_53138 = state_53063__$1;
(statearr_53069_53138[(2)] = null);

(statearr_53069_53138[(1)] = (28));


return cljs.core.cst$kw$recur;
} else {
if((state_val_53064 === (1))){
var state_53063__$1 = state_53063;
var statearr_53070_53139 = state_53063__$1;
(statearr_53070_53139[(2)] = null);

(statearr_53070_53139[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_53064 === (24))){
var inst_53040 = (state_53063[(9)]);
var state_53063__$1 = state_53063;
var statearr_53071_53140 = state_53063__$1;
(statearr_53071_53140[(2)] = inst_53040);

(statearr_53071_53140[(1)] = (25));


return cljs.core.cst$kw$recur;
} else {
if((state_val_53064 === (4))){
var inst_53007 = (state_53063[(10)]);
var inst_53005 = (state_53063[(11)]);
var inst_53005__$1 = (state_53063[(2)]);
var inst_53006 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_53005__$1,(0),null);
var inst_53007__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_53005__$1,(1),null);
var inst_53008 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_53007__$1,teardown_c);
var state_53063__$1 = (function (){var statearr_53072 = state_53063;
(statearr_53072[(10)] = inst_53007__$1);

(statearr_53072[(12)] = inst_53006);

(statearr_53072[(11)] = inst_53005__$1);

return statearr_53072;
})();
if(inst_53008){
var statearr_53073_53141 = state_53063__$1;
(statearr_53073_53141[(1)] = (5));

} else {
var statearr_53074_53142 = state_53063__$1;
(statearr_53074_53142[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_53064 === (15))){
var inst_53029 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.bridge.remote.log_messages_QMARK_) : cljs.core.deref.call(null,org.numenta.sanity.bridge.remote.log_messages_QMARK_));
var state_53063__$1 = state_53063;
if(cljs.core.truth_(inst_53029)){
var statearr_53075_53143 = state_53063__$1;
(statearr_53075_53143[(1)] = (17));

} else {
var statearr_53076_53144 = state_53063__$1;
(statearr_53076_53144[(1)] = (18));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_53064 === (21))){
var inst_53034 = (state_53063[(8)]);
var state_53063__$1 = state_53063;
var statearr_53077_53145 = state_53063__$1;
(statearr_53077_53145[(2)] = inst_53034);

(statearr_53077_53145[(1)] = (22));


return cljs.core.cst$kw$recur;
} else {
if((state_val_53064 === (13))){
var inst_53020 = (state_53063[(2)]);
var state_53063__$1 = state_53063;
var statearr_53078_53146 = state_53063__$1;
(statearr_53078_53146[(2)] = inst_53020);

(statearr_53078_53146[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_53064 === (22))){
var inst_53040 = (state_53063[(2)]);
var inst_53041 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.bridge.remote.log_raw_messages_QMARK_) : cljs.core.deref.call(null,org.numenta.sanity.bridge.remote.log_raw_messages_QMARK_));
var state_53063__$1 = (function (){var statearr_53079 = state_53063;
(statearr_53079[(9)] = inst_53040);

return statearr_53079;
})();
if(cljs.core.truth_(inst_53041)){
var statearr_53080_53147 = state_53063__$1;
(statearr_53080_53147[(1)] = (23));

} else {
var statearr_53081_53148 = state_53063__$1;
(statearr_53081_53148[(1)] = (24));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_53064 === (6))){
var inst_53007 = (state_53063[(10)]);
var inst_53011 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_53007,to_network_c);
var state_53063__$1 = state_53063;
if(inst_53011){
var statearr_53082_53149 = state_53063__$1;
(statearr_53082_53149[(1)] = (8));

} else {
var statearr_53083_53150 = state_53063__$1;
(statearr_53083_53150[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_53064 === (28))){
var inst_53046 = (state_53063[(13)]);
var inst_53055 = (state_53063[(2)]);
var inst_53056 = ws.send(inst_53046);
var state_53063__$1 = (function (){var statearr_53084 = state_53063;
(statearr_53084[(14)] = inst_53055);

(statearr_53084[(15)] = inst_53056);

return statearr_53084;
})();
var statearr_53085_53151 = state_53063__$1;
(statearr_53085_53151[(2)] = null);

(statearr_53085_53151[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_53064 === (25))){
var inst_53047 = (state_53063[(16)]);
var inst_53046 = (state_53063[(13)]);
var inst_53046__$1 = (state_53063[(2)]);
var inst_53047__$1 = cljs.core.count(inst_53046__$1);
var inst_53048 = (inst_53047__$1 > org.numenta.sanity.bridge.remote.max_message_size);
var state_53063__$1 = (function (){var statearr_53086 = state_53063;
(statearr_53086[(16)] = inst_53047__$1);

(statearr_53086[(13)] = inst_53046__$1);

return statearr_53086;
})();
if(cljs.core.truth_(inst_53048)){
var statearr_53087_53152 = state_53063__$1;
(statearr_53087_53152[(1)] = (26));

} else {
var statearr_53088_53153 = state_53063__$1;
(statearr_53088_53153[(1)] = (27));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_53064 === (17))){
var inst_53024 = (state_53063[(7)]);
var inst_53031 = org.numenta.sanity.bridge.remote.log(inst_53024,"SENDING:");
var state_53063__$1 = state_53063;
var statearr_53089_53154 = state_53063__$1;
(statearr_53089_53154[(2)] = inst_53031);

(statearr_53089_53154[(1)] = (19));


return cljs.core.cst$kw$recur;
} else {
if((state_val_53064 === (3))){
var inst_53061 = (state_53063[(2)]);
var state_53063__$1 = state_53063;
return cljs.core.async.impl.ioc_helpers.return_chan(state_53063__$1,inst_53061);
} else {
if((state_val_53064 === (12))){
var state_53063__$1 = state_53063;
var statearr_53090_53155 = state_53063__$1;
(statearr_53090_53155[(2)] = null);

(statearr_53090_53155[(1)] = (13));


return cljs.core.cst$kw$recur;
} else {
if((state_val_53064 === (2))){
var inst_53001 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_53002 = [teardown_c,to_network_c];
var inst_53003 = (new cljs.core.PersistentVector(null,2,(5),inst_53001,inst_53002,null));
var state_53063__$1 = state_53063;
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic(state_53063__$1,(4),inst_53003,cljs.core.array_seq([cljs.core.cst$kw$priority,true], 0));
} else {
if((state_val_53064 === (23))){
var inst_53040 = (state_53063[(9)]);
var inst_53043 = org.numenta.sanity.bridge.remote.log(inst_53040,"SENDING TEXT:");
var state_53063__$1 = state_53063;
var statearr_53091_53156 = state_53063__$1;
(statearr_53091_53156[(2)] = inst_53043);

(statearr_53091_53156[(1)] = (25));


return cljs.core.cst$kw$recur;
} else {
if((state_val_53064 === (19))){
var inst_53034 = (state_53063[(2)]);
var state_53063__$1 = (function (){var statearr_53092 = state_53063;
(statearr_53092[(8)] = inst_53034);

return statearr_53092;
})();
var statearr_53093_53157 = state_53063__$1;
(statearr_53093_53157[(1)] = (20));



return cljs.core.cst$kw$recur;
} else {
if((state_val_53064 === (11))){
var inst_53006 = (state_53063[(12)]);
var state_53063__$1 = state_53063;
var statearr_53095_53158 = state_53063__$1;
(statearr_53095_53158[(2)] = inst_53006);

(statearr_53095_53158[(1)] = (13));


return cljs.core.cst$kw$recur;
} else {
if((state_val_53064 === (9))){
var inst_53007 = (state_53063[(10)]);
var inst_53016 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_53007,cljs.core.cst$kw$default);
var state_53063__$1 = state_53063;
if(inst_53016){
var statearr_53096_53159 = state_53063__$1;
(statearr_53096_53159[(1)] = (11));

} else {
var statearr_53097_53160 = state_53063__$1;
(statearr_53097_53160[(1)] = (12));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_53064 === (5))){
var state_53063__$1 = state_53063;
var statearr_53098_53161 = state_53063__$1;
(statearr_53098_53161[(2)] = null);

(statearr_53098_53161[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_53064 === (14))){
var state_53063__$1 = state_53063;
var statearr_53099_53162 = state_53063__$1;
(statearr_53099_53162[(2)] = null);

(statearr_53099_53162[(1)] = (16));


return cljs.core.cst$kw$recur;
} else {
if((state_val_53064 === (26))){
var inst_53047 = (state_53063[(16)]);
var inst_53046 = (state_53063[(13)]);
var inst_53050 = [cljs.core.str("Message too large! Size: "),cljs.core.str(inst_53047),cljs.core.str("Max-size: "),cljs.core.str(org.numenta.sanity.bridge.remote.max_message_size)].join('');
var inst_53051 = alert(inst_53050);
var inst_53052 = cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Message too large!",inst_53046], 0));
var state_53063__$1 = (function (){var statearr_53100 = state_53063;
(statearr_53100[(17)] = inst_53051);

return statearr_53100;
})();
var statearr_53101_53163 = state_53063__$1;
(statearr_53101_53163[(2)] = inst_53052);

(statearr_53101_53163[(1)] = (28));


return cljs.core.cst$kw$recur;
} else {
if((state_val_53064 === (16))){
var inst_53059 = (state_53063[(2)]);
var state_53063__$1 = state_53063;
var statearr_53102_53164 = state_53063__$1;
(statearr_53102_53164[(2)] = inst_53059);

(statearr_53102_53164[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_53064 === (10))){
var inst_53022 = (state_53063[(2)]);
var state_53063__$1 = state_53063;
var statearr_53103_53165 = state_53063__$1;
(statearr_53103_53165[(2)] = inst_53022);

(statearr_53103_53165[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_53064 === (18))){
var inst_53024 = (state_53063[(7)]);
var state_53063__$1 = state_53063;
var statearr_53104_53166 = state_53063__$1;
(statearr_53104_53166[(2)] = inst_53024);

(statearr_53104_53166[(1)] = (19));


return cljs.core.cst$kw$recur;
} else {
if((state_val_53064 === (8))){
var inst_53005 = (state_53063[(11)]);
var inst_53014 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_53005,(0),null);
var state_53063__$1 = state_53063;
var statearr_53105_53167 = state_53063__$1;
(statearr_53105_53167[(2)] = inst_53014);

(statearr_53105_53167[(1)] = (10));


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
});})(c__36154__auto__,G__52934,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources))
;
return ((function (switch__36040__auto__,c__36154__auto__,G__52934,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources){
return (function() {
var org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__36041__auto__ = null;
var org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__36041__auto____0 = (function (){
var statearr_53109 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_53109[(0)] = org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__36041__auto__);

(statearr_53109[(1)] = (1));

return statearr_53109;
});
var org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__36041__auto____1 = (function (state_53063){
while(true){
var ret_value__36042__auto__ = (function (){try{while(true){
var result__36043__auto__ = switch__36040__auto__(state_53063);
if(cljs.core.keyword_identical_QMARK_(result__36043__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__36043__auto__;
}
break;
}
}catch (e53110){if((e53110 instanceof Object)){
var ex__36044__auto__ = e53110;
var statearr_53111_53168 = state_53063;
(statearr_53111_53168[(5)] = ex__36044__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_53063);

return cljs.core.cst$kw$recur;
} else {
throw e53110;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__36042__auto__,cljs.core.cst$kw$recur)){
var G__53169 = state_53063;
state_53063 = G__53169;
continue;
} else {
return ret_value__36042__auto__;
}
break;
}
});
org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__36041__auto__ = function(state_53063){
switch(arguments.length){
case 0:
return org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__36041__auto____0.call(this);
case 1:
return org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__36041__auto____1.call(this,state_53063);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__36041__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__36041__auto____0;
org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__36041__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__36041__auto____1;
return org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__36041__auto__;
})()
;})(switch__36040__auto__,c__36154__auto__,G__52934,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources))
})();
var state__36156__auto__ = (function (){var statearr_53112 = (f__36155__auto__.cljs$core$IFn$_invoke$arity$0 ? f__36155__auto__.cljs$core$IFn$_invoke$arity$0() : f__36155__auto__.call(null));
(statearr_53112[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__36154__auto__);

return statearr_53112;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__36156__auto__);
});})(c__36154__auto__,G__52934,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources))
);

return c__36154__auto__;
});})(G__52934,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources))
);

(G__52934["onerror"] = ((function (G__52934,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources){
return (function (evt){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["WebSocket error:"], 0));

return console.error(evt);
});})(G__52934,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources))
);

(G__52934["onclose"] = ((function (G__52934,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources){
return (function (evt){
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(connection_id,null) : cljs.core.reset_BANG_.call(null,connection_id,null));

(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(connecting_QMARK_,false) : cljs.core.reset_BANG_.call(null,connecting_QMARK_,false));

cljs.core.async.close_BANG_(teardown_c);

return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["WebSocket closed."], 0));
});})(G__52934,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources))
);

(G__52934["onmessage"] = ((function (G__52934,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources){
return (function (evt){
var vec__53113 = (function (){var G__53115 = evt.data;
var G__53115__$1 = (cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.bridge.remote.log_raw_messages_QMARK_) : cljs.core.deref.call(null,org.numenta.sanity.bridge.remote.log_raw_messages_QMARK_)))?org.numenta.sanity.bridge.remote.log(G__53115,"RECEIVED TEXT:"):G__53115);
var G__53115__$2 = org.numenta.sanity.bridge.remote.read_transit_str(G__53115__$1,org.numenta.sanity.bridge.marshalling.read_handlers(target__GT_mchannel,((function (G__53115,G__53115__$1,G__52934,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources){
return (function (t,v){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(to_network_c,org.numenta.sanity.bridge.remote.target_put(t,v));
});})(G__53115,G__53115__$1,G__52934,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources))
,((function (G__53115,G__53115__$1,G__52934,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources){
return (function (t){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(to_network_c,org.numenta.sanity.bridge.remote.target_close(t));
});})(G__53115,G__53115__$1,G__52934,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources))
,remote_resources))
;
var G__53115__$3 = org.numenta.sanity.util.keywordize_keys_STAR_(G__53115__$2)
;
if(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.bridge.remote.log_messages_QMARK_) : cljs.core.deref.call(null,org.numenta.sanity.bridge.remote.log_messages_QMARK_)))){
return org.numenta.sanity.bridge.remote.log(G__53115__$3,"RECEIVED:");
} else {
return G__53115__$3;
}
})();
var op = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__53113,(0),null);
var target = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__53113,(1),null);
var msg = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__53113,(2),null);
var map__53114 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(target__GT_mchannel) : cljs.core.deref.call(null,target__GT_mchannel)).call(null,target);
var map__53114__$1 = ((((!((map__53114 == null)))?((((map__53114.cljs$lang$protocol_mask$partition0$ & (64))) || (map__53114.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__53114):map__53114);
var mchannel = map__53114__$1;
var ch = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53114__$1,cljs.core.cst$kw$ch);
var single_use_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53114__$1,cljs.core.cst$kw$single_DASH_use_QMARK_);
if(cljs.core.truth_(ch)){
if(cljs.core.truth_(single_use_QMARK_)){
org.numenta.sanity.bridge.marshalling.release_BANG_(mchannel);
} else {
}

var G__53117 = op;
switch (G__53117) {
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
});})(G__52934,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources))
);

return G__52934;
});
org.numenta.sanity.bridge.remote.init = (function org$numenta$sanity$bridge$remote$init(ws_url){
var to_network_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
var connection_id = (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null) : cljs.core.atom.call(null,null));
var on_connect_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
var connecting_QMARK_ = (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(false) : cljs.core.atom.call(null,false));
var target__GT_mchannel = (function (){var G__53344 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__53344) : cljs.core.atom.call(null,G__53344));
})();
return ((function (to_network_c,connection_id,on_connect_c,connecting_QMARK_,target__GT_mchannel){
return (function org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target(t,ch){
var last_seen_connection_id = (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null) : cljs.core.atom.call(null,null));
var reconnect_blob = (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null) : cljs.core.atom.call(null,null));
var blob_resets_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
var blob_resets_cproxy = org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$1(blob_resets_c);
var c__36154__auto___53517 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__36154__auto___53517,last_seen_connection_id,reconnect_blob,blob_resets_c,blob_resets_cproxy,to_network_c,connection_id,on_connect_c,connecting_QMARK_,target__GT_mchannel){
return (function (){
var f__36155__auto__ = (function (){var switch__36040__auto__ = ((function (c__36154__auto___53517,last_seen_connection_id,reconnect_blob,blob_resets_c,blob_resets_cproxy,to_network_c,connection_id,on_connect_c,connecting_QMARK_,target__GT_mchannel){
return (function (state_53444){
var state_val_53445 = (state_53444[(1)]);
if((state_val_53445 === (1))){
var state_53444__$1 = state_53444;
var statearr_53446_53518 = state_53444__$1;
(statearr_53446_53518[(2)] = null);

(statearr_53446_53518[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_53445 === (2))){
var state_53444__$1 = state_53444;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_53444__$1,(4),blob_resets_c);
} else {
if((state_val_53445 === (3))){
var inst_53442 = (state_53444[(2)]);
var state_53444__$1 = state_53444;
return cljs.core.async.impl.ioc_helpers.return_chan(state_53444__$1,inst_53442);
} else {
if((state_val_53445 === (4))){
var inst_53433 = (state_53444[(7)]);
var inst_53433__$1 = (state_53444[(2)]);
var inst_53434 = (inst_53433__$1 == null);
var state_53444__$1 = (function (){var statearr_53447 = state_53444;
(statearr_53447[(7)] = inst_53433__$1);

return statearr_53447;
})();
if(cljs.core.truth_(inst_53434)){
var statearr_53448_53519 = state_53444__$1;
(statearr_53448_53519[(1)] = (5));

} else {
var statearr_53449_53520 = state_53444__$1;
(statearr_53449_53520[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_53445 === (5))){
var state_53444__$1 = state_53444;
var statearr_53450_53521 = state_53444__$1;
(statearr_53450_53521[(2)] = null);

(statearr_53450_53521[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_53445 === (6))){
var inst_53433 = (state_53444[(7)]);
var inst_53437 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(reconnect_blob,inst_53433) : cljs.core.reset_BANG_.call(null,reconnect_blob,inst_53433));
var state_53444__$1 = (function (){var statearr_53451 = state_53444;
(statearr_53451[(8)] = inst_53437);

return statearr_53451;
})();
var statearr_53452_53522 = state_53444__$1;
(statearr_53452_53522[(2)] = null);

(statearr_53452_53522[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_53445 === (7))){
var inst_53440 = (state_53444[(2)]);
var state_53444__$1 = state_53444;
var statearr_53453_53523 = state_53444__$1;
(statearr_53453_53523[(2)] = inst_53440);

(statearr_53453_53523[(1)] = (3));


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
});})(c__36154__auto___53517,last_seen_connection_id,reconnect_blob,blob_resets_c,blob_resets_cproxy,to_network_c,connection_id,on_connect_c,connecting_QMARK_,target__GT_mchannel))
;
return ((function (switch__36040__auto__,c__36154__auto___53517,last_seen_connection_id,reconnect_blob,blob_resets_c,blob_resets_cproxy,to_network_c,connection_id,on_connect_c,connecting_QMARK_,target__GT_mchannel){
return (function() {
var org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__36041__auto__ = null;
var org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__36041__auto____0 = (function (){
var statearr_53457 = [null,null,null,null,null,null,null,null,null];
(statearr_53457[(0)] = org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__36041__auto__);

(statearr_53457[(1)] = (1));

return statearr_53457;
});
var org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__36041__auto____1 = (function (state_53444){
while(true){
var ret_value__36042__auto__ = (function (){try{while(true){
var result__36043__auto__ = switch__36040__auto__(state_53444);
if(cljs.core.keyword_identical_QMARK_(result__36043__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__36043__auto__;
}
break;
}
}catch (e53458){if((e53458 instanceof Object)){
var ex__36044__auto__ = e53458;
var statearr_53459_53524 = state_53444;
(statearr_53459_53524[(5)] = ex__36044__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_53444);

return cljs.core.cst$kw$recur;
} else {
throw e53458;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__36042__auto__,cljs.core.cst$kw$recur)){
var G__53525 = state_53444;
state_53444 = G__53525;
continue;
} else {
return ret_value__36042__auto__;
}
break;
}
});
org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__36041__auto__ = function(state_53444){
switch(arguments.length){
case 0:
return org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__36041__auto____0.call(this);
case 1:
return org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__36041__auto____1.call(this,state_53444);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__36041__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__36041__auto____0;
org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__36041__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__36041__auto____1;
return org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__36041__auto__;
})()
;})(switch__36040__auto__,c__36154__auto___53517,last_seen_connection_id,reconnect_blob,blob_resets_c,blob_resets_cproxy,to_network_c,connection_id,on_connect_c,connecting_QMARK_,target__GT_mchannel))
})();
var state__36156__auto__ = (function (){var statearr_53460 = (f__36155__auto__.cljs$core$IFn$_invoke$arity$0 ? f__36155__auto__.cljs$core$IFn$_invoke$arity$0() : f__36155__auto__.call(null));
(statearr_53460[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__36154__auto___53517);

return statearr_53460;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__36156__auto__);
});})(c__36154__auto___53517,last_seen_connection_id,reconnect_blob,blob_resets_c,blob_resets_cproxy,to_network_c,connection_id,on_connect_c,connecting_QMARK_,target__GT_mchannel))
);


var c__36154__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__36154__auto__,last_seen_connection_id,reconnect_blob,blob_resets_c,blob_resets_cproxy,to_network_c,connection_id,on_connect_c,connecting_QMARK_,target__GT_mchannel){
return (function (){
var f__36155__auto__ = (function (){var switch__36040__auto__ = ((function (c__36154__auto__,last_seen_connection_id,reconnect_blob,blob_resets_c,blob_resets_cproxy,to_network_c,connection_id,on_connect_c,connecting_QMARK_,target__GT_mchannel){
return (function (state_53488){
var state_val_53489 = (state_53488[(1)]);
if((state_val_53489 === (7))){
var inst_53463 = (state_53488[(7)]);
var inst_53478 = (state_53488[(2)]);
var inst_53479 = (inst_53463 == null);
var state_53488__$1 = (function (){var statearr_53490 = state_53488;
(statearr_53490[(8)] = inst_53478);

return statearr_53490;
})();
if(cljs.core.truth_(inst_53479)){
var statearr_53491_53526 = state_53488__$1;
(statearr_53491_53526[(1)] = (11));

} else {
var statearr_53492_53527 = state_53488__$1;
(statearr_53492_53527[(1)] = (12));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_53489 === (1))){
var state_53488__$1 = state_53488;
var statearr_53493_53528 = state_53488__$1;
(statearr_53493_53528[(2)] = null);

(statearr_53493_53528[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_53489 === (4))){
var inst_53463 = (state_53488[(7)]);
var inst_53463__$1 = (state_53488[(2)]);
var inst_53464 = (function (){var v = inst_53463__$1;
return ((function (v,inst_53463,inst_53463__$1,state_val_53489,c__36154__auto__,last_seen_connection_id,reconnect_blob,blob_resets_c,blob_resets_cproxy,to_network_c,connection_id,on_connect_c,connecting_QMARK_,target__GT_mchannel){
return (function (){
if((((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(last_seen_connection_id) : cljs.core.deref.call(null,last_seen_connection_id)) == null)) || (cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(connection_id) : cljs.core.deref.call(null,connection_id)),(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(last_seen_connection_id) : cljs.core.deref.call(null,last_seen_connection_id))))){
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(to_network_c,org.numenta.sanity.bridge.remote.target_put(t,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["connect",(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(reconnect_blob) : cljs.core.deref.call(null,reconnect_blob)),blob_resets_cproxy], null)));

var G__53494_53529 = last_seen_connection_id;
var G__53495_53530 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(connection_id) : cljs.core.deref.call(null,connection_id));
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__53494_53529,G__53495_53530) : cljs.core.reset_BANG_.call(null,G__53494_53529,G__53495_53530));
} else {
}

if(!((v == null))){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(to_network_c,org.numenta.sanity.bridge.remote.target_put(t,v));
} else {
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(to_network_c,org.numenta.sanity.bridge.remote.target_close(t));
}
});
;})(v,inst_53463,inst_53463__$1,state_val_53489,c__36154__auto__,last_seen_connection_id,reconnect_blob,blob_resets_c,blob_resets_cproxy,to_network_c,connection_id,on_connect_c,connecting_QMARK_,target__GT_mchannel))
})();
var inst_53465 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(connection_id) : cljs.core.deref.call(null,connection_id));
var state_53488__$1 = (function (){var statearr_53496 = state_53488;
(statearr_53496[(9)] = inst_53464);

(statearr_53496[(7)] = inst_53463__$1);

return statearr_53496;
})();
if(cljs.core.truth_(inst_53465)){
var statearr_53497_53531 = state_53488__$1;
(statearr_53497_53531[(1)] = (5));

} else {
var statearr_53498_53532 = state_53488__$1;
(statearr_53498_53532[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_53489 === (13))){
var inst_53484 = (state_53488[(2)]);
var state_53488__$1 = state_53488;
var statearr_53499_53533 = state_53488__$1;
(statearr_53499_53533[(2)] = inst_53484);

(statearr_53499_53533[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_53489 === (6))){
var inst_53464 = (state_53488[(9)]);
var inst_53469 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(on_connect_c,inst_53464);
var inst_53470 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(connecting_QMARK_) : cljs.core.deref.call(null,connecting_QMARK_));
var state_53488__$1 = (function (){var statearr_53500 = state_53488;
(statearr_53500[(10)] = inst_53469);

return statearr_53500;
})();
if(cljs.core.truth_(inst_53470)){
var statearr_53501_53534 = state_53488__$1;
(statearr_53501_53534[(1)] = (8));

} else {
var statearr_53502_53535 = state_53488__$1;
(statearr_53502_53535[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_53489 === (3))){
var inst_53486 = (state_53488[(2)]);
var state_53488__$1 = state_53488;
return cljs.core.async.impl.ioc_helpers.return_chan(state_53488__$1,inst_53486);
} else {
if((state_val_53489 === (12))){
var state_53488__$1 = state_53488;
var statearr_53503_53536 = state_53488__$1;
(statearr_53503_53536[(2)] = null);

(statearr_53503_53536[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_53489 === (2))){
var state_53488__$1 = state_53488;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_53488__$1,(4),ch);
} else {
if((state_val_53489 === (11))){
var state_53488__$1 = state_53488;
var statearr_53504_53537 = state_53488__$1;
(statearr_53504_53537[(2)] = null);

(statearr_53504_53537[(1)] = (13));


return cljs.core.cst$kw$recur;
} else {
if((state_val_53489 === (9))){
var inst_53473 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(connecting_QMARK_,true) : cljs.core.reset_BANG_.call(null,connecting_QMARK_,true));
var inst_53474 = org.numenta.sanity.bridge.remote.connect_BANG_(connection_id,to_network_c,on_connect_c,ws_url,connecting_QMARK_,target__GT_mchannel);
var state_53488__$1 = (function (){var statearr_53505 = state_53488;
(statearr_53505[(11)] = inst_53473);

return statearr_53505;
})();
var statearr_53506_53538 = state_53488__$1;
(statearr_53506_53538[(2)] = inst_53474);

(statearr_53506_53538[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_53489 === (5))){
var inst_53464 = (state_53488[(9)]);
var inst_53467 = (inst_53464.cljs$core$IFn$_invoke$arity$0 ? inst_53464.cljs$core$IFn$_invoke$arity$0() : inst_53464.call(null));
var state_53488__$1 = state_53488;
var statearr_53507_53539 = state_53488__$1;
(statearr_53507_53539[(2)] = inst_53467);

(statearr_53507_53539[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_53489 === (10))){
var inst_53476 = (state_53488[(2)]);
var state_53488__$1 = state_53488;
var statearr_53508_53540 = state_53488__$1;
(statearr_53508_53540[(2)] = inst_53476);

(statearr_53508_53540[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_53489 === (8))){
var state_53488__$1 = state_53488;
var statearr_53509_53541 = state_53488__$1;
(statearr_53509_53541[(2)] = null);

(statearr_53509_53541[(1)] = (10));


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
});})(c__36154__auto__,last_seen_connection_id,reconnect_blob,blob_resets_c,blob_resets_cproxy,to_network_c,connection_id,on_connect_c,connecting_QMARK_,target__GT_mchannel))
;
return ((function (switch__36040__auto__,c__36154__auto__,last_seen_connection_id,reconnect_blob,blob_resets_c,blob_resets_cproxy,to_network_c,connection_id,on_connect_c,connecting_QMARK_,target__GT_mchannel){
return (function() {
var org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__36041__auto__ = null;
var org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__36041__auto____0 = (function (){
var statearr_53513 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_53513[(0)] = org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__36041__auto__);

(statearr_53513[(1)] = (1));

return statearr_53513;
});
var org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__36041__auto____1 = (function (state_53488){
while(true){
var ret_value__36042__auto__ = (function (){try{while(true){
var result__36043__auto__ = switch__36040__auto__(state_53488);
if(cljs.core.keyword_identical_QMARK_(result__36043__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__36043__auto__;
}
break;
}
}catch (e53514){if((e53514 instanceof Object)){
var ex__36044__auto__ = e53514;
var statearr_53515_53542 = state_53488;
(statearr_53515_53542[(5)] = ex__36044__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_53488);

return cljs.core.cst$kw$recur;
} else {
throw e53514;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__36042__auto__,cljs.core.cst$kw$recur)){
var G__53543 = state_53488;
state_53488 = G__53543;
continue;
} else {
return ret_value__36042__auto__;
}
break;
}
});
org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__36041__auto__ = function(state_53488){
switch(arguments.length){
case 0:
return org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__36041__auto____0.call(this);
case 1:
return org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__36041__auto____1.call(this,state_53488);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__36041__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__36041__auto____0;
org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__36041__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__36041__auto____1;
return org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__36041__auto__;
})()
;})(switch__36040__auto__,c__36154__auto__,last_seen_connection_id,reconnect_blob,blob_resets_c,blob_resets_cproxy,to_network_c,connection_id,on_connect_c,connecting_QMARK_,target__GT_mchannel))
})();
var state__36156__auto__ = (function (){var statearr_53516 = (f__36155__auto__.cljs$core$IFn$_invoke$arity$0 ? f__36155__auto__.cljs$core$IFn$_invoke$arity$0() : f__36155__auto__.call(null));
(statearr_53516[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__36154__auto__);

return statearr_53516;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__36156__auto__);
});})(c__36154__auto__,last_seen_connection_id,reconnect_blob,blob_resets_c,blob_resets_cproxy,to_network_c,connection_id,on_connect_c,connecting_QMARK_,target__GT_mchannel))
);

return c__36154__auto__;
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
var G__53544_53545 = [cljs.core.str("Call sanityLogMessages() or sanityLogRawMessages() to display websocket "),cljs.core.str("traffic. Call sanityLogUgly() to condense the output.")].join('');
console.log(G__53544_53545);
