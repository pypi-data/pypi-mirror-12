// Compiled by ClojureScript 1.7.170 {:static-fns true, :optimize-constants true}
goog.provide('cljs_http.core');
goog.require('cljs.core');
goog.require('goog.net.ErrorCode');
goog.require('goog.net.EventType');
goog.require('cljs.core.async');
goog.require('cljs_http.util');
goog.require('goog.net.Jsonp');
goog.require('clojure.string');
goog.require('goog.net.XhrIo');
cljs_http.core.pending_requests = (function (){var G__61795 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__61795) : cljs.core.atom.call(null,G__61795));
})();
/**
 * Attempt to close the given channel and abort the pending HTTP request
 *   with which it is associated.
 */
cljs_http.core.abort_BANG_ = (function cljs_http$core$abort_BANG_(channel){
var temp__4653__auto__ = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(cljs_http.core.pending_requests) : cljs.core.deref.call(null,cljs_http.core.pending_requests)).call(null,channel);
if(cljs.core.truth_(temp__4653__auto__)){
var req = temp__4653__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(cljs_http.core.pending_requests,cljs.core.dissoc,channel);

cljs.core.async.close_BANG_(channel);

if(cljs.core.truth_(req.hasOwnProperty("abort"))){
return req.abort();
} else {
return cljs.core.cst$kw$jsonp.cljs$core$IFn$_invoke$arity$1(req).cancel(cljs.core.cst$kw$request.cljs$core$IFn$_invoke$arity$1(req));
}
} else {
return null;
}
});
cljs_http.core.aborted_QMARK_ = (function cljs_http$core$aborted_QMARK_(xhr){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(xhr.getLastErrorCode(),goog.net.ErrorCode.ABORT);
});
/**
 * Takes an XhrIo object and applies the default-headers to it.
 */
cljs_http.core.apply_default_headers_BANG_ = (function cljs_http$core$apply_default_headers_BANG_(xhr,headers){
var formatted_h = cljs.core.zipmap(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs_http.util.camelize,cljs.core.keys(headers)),cljs.core.vals(headers));
return cljs.core.dorun.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (formatted_h){
return (function (p__61798){
var vec__61799 = p__61798;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61799,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61799,(1),null);
return xhr.headers.set(k,v);
});})(formatted_h))
,formatted_h));
});
/**
 * Takes an XhrIo object and sets response-type if not nil.
 */
cljs_http.core.apply_response_type_BANG_ = (function cljs_http$core$apply_response_type_BANG_(xhr,response_type){
return xhr.setResponseType((function (){var G__61801 = response_type;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$array_DASH_buffer,G__61801)){
return goog.net.XhrIo.ResponseType.ARRAY_BUFFER;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$blob,G__61801)){
return goog.net.XhrIo.ResponseType.BLOB;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$document,G__61801)){
return goog.net.XhrIo.ResponseType.DOCUMENT;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$text,G__61801)){
return goog.net.XhrIo.ResponseType.TEXT;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$default,G__61801)){
return goog.net.XhrIo.ResponseType.DEFAULT;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(null,G__61801)){
return goog.net.XhrIo.ResponseType.DEFAULT;
} else {
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(response_type)].join('')));

}
}
}
}
}
}
})());
});
/**
 * Builds an XhrIo object from the request parameters.
 */
cljs_http.core.build_xhr = (function cljs_http$core$build_xhr(p__61802){
var map__61806 = p__61802;
var map__61806__$1 = ((((!((map__61806 == null)))?((((map__61806.cljs$lang$protocol_mask$partition0$ & (64))) || (map__61806.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__61806):map__61806);
var request = map__61806__$1;
var with_credentials_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__61806__$1,cljs.core.cst$kw$with_DASH_credentials_QMARK_);
var default_headers = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__61806__$1,cljs.core.cst$kw$default_DASH_headers);
var response_type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__61806__$1,cljs.core.cst$kw$response_DASH_type);
var timeout = (function (){var or__4682__auto__ = cljs.core.cst$kw$timeout.cljs$core$IFn$_invoke$arity$1(request);
if(cljs.core.truth_(or__4682__auto__)){
return or__4682__auto__;
} else {
return (0);
}
})();
var send_credentials = (((with_credentials_QMARK_ == null))?true:with_credentials_QMARK_);
var G__61808 = (new goog.net.XhrIo());
cljs_http.core.apply_default_headers_BANG_(G__61808,default_headers);

cljs_http.core.apply_response_type_BANG_(G__61808,response_type);

G__61808.setTimeoutInterval(timeout);

G__61808.setWithCredentials(send_credentials);

return G__61808;
});
cljs_http.core.error_kw = cljs.core.PersistentHashMap.fromArrays([(0),(7),(1),(4),(6),(3),(2),(9),(5),(8)],[cljs.core.cst$kw$no_DASH_error,cljs.core.cst$kw$abort,cljs.core.cst$kw$access_DASH_denied,cljs.core.cst$kw$custom_DASH_error,cljs.core.cst$kw$http_DASH_error,cljs.core.cst$kw$ff_DASH_silent_DASH_error,cljs.core.cst$kw$file_DASH_not_DASH_found,cljs.core.cst$kw$offline,cljs.core.cst$kw$exception,cljs.core.cst$kw$timeout]);
/**
 * Execute the HTTP request corresponding to the given Ring request
 *   map and return a core.async channel.
 */
cljs_http.core.xhr = (function cljs_http$core$xhr(p__61809){
var map__61837 = p__61809;
var map__61837__$1 = ((((!((map__61837 == null)))?((((map__61837.cljs$lang$protocol_mask$partition0$ & (64))) || (map__61837.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__61837):map__61837);
var request = map__61837__$1;
var request_method = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__61837__$1,cljs.core.cst$kw$request_DASH_method);
var headers = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__61837__$1,cljs.core.cst$kw$headers);
var body = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__61837__$1,cljs.core.cst$kw$body);
var with_credentials_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__61837__$1,cljs.core.cst$kw$with_DASH_credentials_QMARK_);
var cancel = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__61837__$1,cljs.core.cst$kw$cancel);
var channel = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
var request_url = cljs_http.util.build_url(request);
var method = cljs.core.name((function (){var or__4682__auto__ = request_method;
if(cljs.core.truth_(or__4682__auto__)){
return or__4682__auto__;
} else {
return cljs.core.cst$kw$get;
}
})());
var headers__$1 = cljs_http.util.build_headers(headers);
var xhr__$1 = cljs_http.core.build_xhr(request);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(cljs_http.core.pending_requests,cljs.core.assoc,channel,xhr__$1);

xhr__$1.listen(goog.net.EventType.COMPLETE,((function (channel,request_url,method,headers__$1,xhr__$1,map__61837,map__61837__$1,request,request_method,headers,body,with_credentials_QMARK_,cancel){
return (function (evt){
var target = evt.target;
var response = new cljs.core.PersistentArrayMap(null, 7, [cljs.core.cst$kw$status,target.getStatus(),cljs.core.cst$kw$success,target.isSuccess(),cljs.core.cst$kw$body,target.getResponse(),cljs.core.cst$kw$headers,cljs_http.util.parse_headers(target.getAllResponseHeaders()),cljs.core.cst$kw$trace_DASH_redirects,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [request_url,target.getLastUri()], null),cljs.core.cst$kw$error_DASH_code,(function (){var G__61839 = target.getLastErrorCode();
return (cljs_http.core.error_kw.cljs$core$IFn$_invoke$arity$1 ? cljs_http.core.error_kw.cljs$core$IFn$_invoke$arity$1(G__61839) : cljs_http.core.error_kw.call(null,G__61839));
})(),cljs.core.cst$kw$error_DASH_text,target.getLastError()], null);
if(cljs.core.not(cljs_http.core.aborted_QMARK_(xhr__$1))){
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(channel,response);
} else {
}

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(cljs_http.core.pending_requests,cljs.core.dissoc,channel);

if(cljs.core.truth_(cancel)){
cljs.core.async.close_BANG_(cancel);
} else {
}

return cljs.core.async.close_BANG_(channel);
});})(channel,request_url,method,headers__$1,xhr__$1,map__61837,map__61837__$1,request,request_method,headers,body,with_credentials_QMARK_,cancel))
);

xhr__$1.send(request_url,method,body,headers__$1);

if(cljs.core.truth_(cancel)){
var c__35961__auto___61864 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__35961__auto___61864,channel,request_url,method,headers__$1,xhr__$1,map__61837,map__61837__$1,request,request_method,headers,body,with_credentials_QMARK_,cancel){
return (function (){
var f__35962__auto__ = (function (){var switch__35847__auto__ = ((function (c__35961__auto___61864,channel,request_url,method,headers__$1,xhr__$1,map__61837,map__61837__$1,request,request_method,headers,body,with_credentials_QMARK_,cancel){
return (function (state_61850){
var state_val_61851 = (state_61850[(1)]);
if((state_val_61851 === (1))){
var state_61850__$1 = state_61850;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_61850__$1,(2),cancel);
} else {
if((state_val_61851 === (2))){
var inst_61841 = (state_61850[(2)]);
var inst_61842 = xhr__$1.isComplete();
var inst_61843 = cljs.core.not(inst_61842);
var state_61850__$1 = (function (){var statearr_61852 = state_61850;
(statearr_61852[(7)] = inst_61841);

return statearr_61852;
})();
if(inst_61843){
var statearr_61853_61865 = state_61850__$1;
(statearr_61853_61865[(1)] = (3));

} else {
var statearr_61854_61866 = state_61850__$1;
(statearr_61854_61866[(1)] = (4));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_61851 === (3))){
var inst_61845 = xhr__$1.abort();
var state_61850__$1 = state_61850;
var statearr_61855_61867 = state_61850__$1;
(statearr_61855_61867[(2)] = inst_61845);

(statearr_61855_61867[(1)] = (5));


return cljs.core.cst$kw$recur;
} else {
if((state_val_61851 === (4))){
var state_61850__$1 = state_61850;
var statearr_61856_61868 = state_61850__$1;
(statearr_61856_61868[(2)] = null);

(statearr_61856_61868[(1)] = (5));


return cljs.core.cst$kw$recur;
} else {
if((state_val_61851 === (5))){
var inst_61848 = (state_61850[(2)]);
var state_61850__$1 = state_61850;
return cljs.core.async.impl.ioc_helpers.return_chan(state_61850__$1,inst_61848);
} else {
return null;
}
}
}
}
}
});})(c__35961__auto___61864,channel,request_url,method,headers__$1,xhr__$1,map__61837,map__61837__$1,request,request_method,headers,body,with_credentials_QMARK_,cancel))
;
return ((function (switch__35847__auto__,c__35961__auto___61864,channel,request_url,method,headers__$1,xhr__$1,map__61837,map__61837__$1,request,request_method,headers,body,with_credentials_QMARK_,cancel){
return (function() {
var cljs_http$core$xhr_$_state_machine__35848__auto__ = null;
var cljs_http$core$xhr_$_state_machine__35848__auto____0 = (function (){
var statearr_61860 = [null,null,null,null,null,null,null,null];
(statearr_61860[(0)] = cljs_http$core$xhr_$_state_machine__35848__auto__);

(statearr_61860[(1)] = (1));

return statearr_61860;
});
var cljs_http$core$xhr_$_state_machine__35848__auto____1 = (function (state_61850){
while(true){
var ret_value__35849__auto__ = (function (){try{while(true){
var result__35850__auto__ = switch__35847__auto__(state_61850);
if(cljs.core.keyword_identical_QMARK_(result__35850__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__35850__auto__;
}
break;
}
}catch (e61861){if((e61861 instanceof Object)){
var ex__35851__auto__ = e61861;
var statearr_61862_61869 = state_61850;
(statearr_61862_61869[(5)] = ex__35851__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_61850);

return cljs.core.cst$kw$recur;
} else {
throw e61861;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35849__auto__,cljs.core.cst$kw$recur)){
var G__61870 = state_61850;
state_61850 = G__61870;
continue;
} else {
return ret_value__35849__auto__;
}
break;
}
});
cljs_http$core$xhr_$_state_machine__35848__auto__ = function(state_61850){
switch(arguments.length){
case 0:
return cljs_http$core$xhr_$_state_machine__35848__auto____0.call(this);
case 1:
return cljs_http$core$xhr_$_state_machine__35848__auto____1.call(this,state_61850);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs_http$core$xhr_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$0 = cljs_http$core$xhr_$_state_machine__35848__auto____0;
cljs_http$core$xhr_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$1 = cljs_http$core$xhr_$_state_machine__35848__auto____1;
return cljs_http$core$xhr_$_state_machine__35848__auto__;
})()
;})(switch__35847__auto__,c__35961__auto___61864,channel,request_url,method,headers__$1,xhr__$1,map__61837,map__61837__$1,request,request_method,headers,body,with_credentials_QMARK_,cancel))
})();
var state__35963__auto__ = (function (){var statearr_61863 = (f__35962__auto__.cljs$core$IFn$_invoke$arity$0 ? f__35962__auto__.cljs$core$IFn$_invoke$arity$0() : f__35962__auto__.call(null));
(statearr_61863[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__35961__auto___61864);

return statearr_61863;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__35963__auto__);
});})(c__35961__auto___61864,channel,request_url,method,headers__$1,xhr__$1,map__61837,map__61837__$1,request,request_method,headers,body,with_credentials_QMARK_,cancel))
);

} else {
}

return channel;
});
/**
 * Execute the JSONP request corresponding to the given Ring request
 *   map and return a core.async channel.
 */
cljs_http.core.jsonp = (function cljs_http$core$jsonp(p__61871){
var map__61888 = p__61871;
var map__61888__$1 = ((((!((map__61888 == null)))?((((map__61888.cljs$lang$protocol_mask$partition0$ & (64))) || (map__61888.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__61888):map__61888);
var request = map__61888__$1;
var timeout = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__61888__$1,cljs.core.cst$kw$timeout);
var callback_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__61888__$1,cljs.core.cst$kw$callback_DASH_name);
var cancel = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__61888__$1,cljs.core.cst$kw$cancel);
var channel = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
var jsonp__$1 = (new goog.net.Jsonp(cljs_http.util.build_url(request),callback_name));
jsonp__$1.setRequestTimeout(timeout);

var req_61904 = jsonp__$1.send(null,((function (channel,jsonp__$1,map__61888,map__61888__$1,request,timeout,callback_name,cancel){
return (function cljs_http$core$jsonp_$_success_callback(data){
var response = new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$status,(200),cljs.core.cst$kw$success,true,cljs.core.cst$kw$body,cljs.core.js__GT_clj.cljs$core$IFn$_invoke$arity$variadic(data,cljs.core.array_seq([cljs.core.cst$kw$keywordize_DASH_keys,true], 0))], null);
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(channel,response);

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(cljs_http.core.pending_requests,cljs.core.dissoc,channel);

if(cljs.core.truth_(cancel)){
cljs.core.async.close_BANG_(cancel);
} else {
}

return cljs.core.async.close_BANG_(channel);
});})(channel,jsonp__$1,map__61888,map__61888__$1,request,timeout,callback_name,cancel))
,((function (channel,jsonp__$1,map__61888,map__61888__$1,request,timeout,callback_name,cancel){
return (function cljs_http$core$jsonp_$_error_callback(){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(cljs_http.core.pending_requests,cljs.core.dissoc,channel);

if(cljs.core.truth_(cancel)){
cljs.core.async.close_BANG_(cancel);
} else {
}

return cljs.core.async.close_BANG_(channel);
});})(channel,jsonp__$1,map__61888,map__61888__$1,request,timeout,callback_name,cancel))
);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(cljs_http.core.pending_requests,cljs.core.assoc,channel,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$jsonp,jsonp__$1,cljs.core.cst$kw$request,req_61904], null));

if(cljs.core.truth_(cancel)){
var c__35961__auto___61905 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__35961__auto___61905,req_61904,channel,jsonp__$1,map__61888,map__61888__$1,request,timeout,callback_name,cancel){
return (function (){
var f__35962__auto__ = (function (){var switch__35847__auto__ = ((function (c__35961__auto___61905,req_61904,channel,jsonp__$1,map__61888,map__61888__$1,request,timeout,callback_name,cancel){
return (function (state_61894){
var state_val_61895 = (state_61894[(1)]);
if((state_val_61895 === (1))){
var state_61894__$1 = state_61894;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_61894__$1,(2),cancel);
} else {
if((state_val_61895 === (2))){
var inst_61891 = (state_61894[(2)]);
var inst_61892 = jsonp__$1.cancel(req_61904);
var state_61894__$1 = (function (){var statearr_61896 = state_61894;
(statearr_61896[(7)] = inst_61891);

return statearr_61896;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_61894__$1,inst_61892);
} else {
return null;
}
}
});})(c__35961__auto___61905,req_61904,channel,jsonp__$1,map__61888,map__61888__$1,request,timeout,callback_name,cancel))
;
return ((function (switch__35847__auto__,c__35961__auto___61905,req_61904,channel,jsonp__$1,map__61888,map__61888__$1,request,timeout,callback_name,cancel){
return (function() {
var cljs_http$core$jsonp_$_state_machine__35848__auto__ = null;
var cljs_http$core$jsonp_$_state_machine__35848__auto____0 = (function (){
var statearr_61900 = [null,null,null,null,null,null,null,null];
(statearr_61900[(0)] = cljs_http$core$jsonp_$_state_machine__35848__auto__);

(statearr_61900[(1)] = (1));

return statearr_61900;
});
var cljs_http$core$jsonp_$_state_machine__35848__auto____1 = (function (state_61894){
while(true){
var ret_value__35849__auto__ = (function (){try{while(true){
var result__35850__auto__ = switch__35847__auto__(state_61894);
if(cljs.core.keyword_identical_QMARK_(result__35850__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__35850__auto__;
}
break;
}
}catch (e61901){if((e61901 instanceof Object)){
var ex__35851__auto__ = e61901;
var statearr_61902_61906 = state_61894;
(statearr_61902_61906[(5)] = ex__35851__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_61894);

return cljs.core.cst$kw$recur;
} else {
throw e61901;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35849__auto__,cljs.core.cst$kw$recur)){
var G__61907 = state_61894;
state_61894 = G__61907;
continue;
} else {
return ret_value__35849__auto__;
}
break;
}
});
cljs_http$core$jsonp_$_state_machine__35848__auto__ = function(state_61894){
switch(arguments.length){
case 0:
return cljs_http$core$jsonp_$_state_machine__35848__auto____0.call(this);
case 1:
return cljs_http$core$jsonp_$_state_machine__35848__auto____1.call(this,state_61894);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs_http$core$jsonp_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$0 = cljs_http$core$jsonp_$_state_machine__35848__auto____0;
cljs_http$core$jsonp_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$1 = cljs_http$core$jsonp_$_state_machine__35848__auto____1;
return cljs_http$core$jsonp_$_state_machine__35848__auto__;
})()
;})(switch__35847__auto__,c__35961__auto___61905,req_61904,channel,jsonp__$1,map__61888,map__61888__$1,request,timeout,callback_name,cancel))
})();
var state__35963__auto__ = (function (){var statearr_61903 = (f__35962__auto__.cljs$core$IFn$_invoke$arity$0 ? f__35962__auto__.cljs$core$IFn$_invoke$arity$0() : f__35962__auto__.call(null));
(statearr_61903[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__35961__auto___61905);

return statearr_61903;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__35963__auto__);
});})(c__35961__auto___61905,req_61904,channel,jsonp__$1,map__61888,map__61888__$1,request,timeout,callback_name,cancel))
);

} else {
}

return channel;
});
/**
 * Execute the HTTP request corresponding to the given Ring request
 *   map and return a core.async channel.
 */
cljs_http.core.request = (function cljs_http$core$request(p__61908){
var map__61911 = p__61908;
var map__61911__$1 = ((((!((map__61911 == null)))?((((map__61911.cljs$lang$protocol_mask$partition0$ & (64))) || (map__61911.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__61911):map__61911);
var request__$1 = map__61911__$1;
var request_method = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__61911__$1,cljs.core.cst$kw$request_DASH_method);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(request_method,cljs.core.cst$kw$jsonp)){
return cljs_http.core.jsonp(request__$1);
} else {
return cljs_http.core.xhr(request__$1);
}
});
