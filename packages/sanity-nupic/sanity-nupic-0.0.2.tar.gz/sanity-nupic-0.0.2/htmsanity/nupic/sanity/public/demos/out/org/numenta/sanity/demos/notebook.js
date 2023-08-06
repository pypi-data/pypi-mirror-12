// Compiled by ClojureScript 1.7.170 {:static-fns true, :optimize-constants true}
goog.provide('org.numenta.sanity.demos.notebook');
goog.require('cljs.core');
goog.require('reagent.core');
goog.require('org.numenta.sanity.viz_canvas');
goog.require('org.numenta.sanity.demos.runner');
goog.require('org.nfrac.comportex.protocols');
goog.require('org.numenta.sanity.bridge.remote');
goog.require('cljs.core.async');
goog.require('org.numenta.sanity.bridge.marshalling');
goog.require('org.numenta.sanity.selection');
goog.require('cognitect.transit');
goog.require('org.nfrac.comportex.util');
cljs.core.enable_console_print_BANG_();
org.numenta.sanity.demos.notebook.pipe_to_remote_target_BANG_ = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
org.numenta.sanity.demos.notebook.remote_target__GT_chan = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
org.numenta.sanity.demos.notebook.connect = (function org$numenta$sanity$demos$notebook$connect(url){
var G__65717 = org.numenta.sanity.demos.notebook.pipe_to_remote_target_BANG_;
var G__65718 = org.numenta.sanity.bridge.remote.init(url);
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__65717,G__65718) : cljs.core.reset_BANG_.call(null,G__65717,G__65718));
});
goog.exportSymbol('org.numenta.sanity.demos.notebook.connect', org.numenta.sanity.demos.notebook.connect);
org.numenta.sanity.demos.notebook.read_transit_str = (function org$numenta$sanity$demos$notebook$read_transit_str(s){
return cognitect.transit.read(cognitect.transit.reader.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$json),s);
});
org.numenta.sanity.demos.notebook.display_inbits = (function org$numenta$sanity$demos$notebook$display_inbits(el,serialized){
var vec__65720 = org.numenta.sanity.demos.notebook.read_transit_str(serialized);
var dims = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65720,(0),null);
var state__GT_bits = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65720,(1),null);
var d_opts = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65720,(2),null);
return reagent.core.render.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.viz_canvas.inbits_display,dims,state__GT_bits,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.cst$kw$drawing.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.viz_canvas.default_viz_options),d_opts], 0))], null),el);
});
goog.exportSymbol('org.numenta.sanity.demos.notebook.display_inbits', org.numenta.sanity.demos.notebook.display_inbits);
org.numenta.sanity.demos.notebook.release_inbits = (function org$numenta$sanity$demos$notebook$release_inbits(el){
return reagent.core.unmount_component_at_node(el);
});
goog.exportSymbol('org.numenta.sanity.demos.notebook.release_inbits', org.numenta.sanity.demos.notebook.release_inbits);
org.numenta.sanity.demos.notebook.add_viz = (function org$numenta$sanity$demos$notebook$add_viz(el,serialized){
var vec__65832 = org.numenta.sanity.demos.notebook.read_transit_str(serialized);
var journal_target = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65832,(0),null);
var opts = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65832,(1),null);
var into_journal = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
var into_viz = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
var response_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.demos.notebook.remote_target__GT_chan,cljs.core.assoc,journal_target,into_journal);

(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.notebook.pipe_to_remote_target_BANG_) : cljs.core.deref.call(null,org.numenta.sanity.demos.notebook.pipe_to_remote_target_BANG_)).call(null,journal_target,into_journal);

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(into_journal,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["get-steps",org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$2(response_c,true)], null));

var c__36154__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__36154__auto__,vec__65832,journal_target,opts,into_journal,into_viz,response_c){
return (function (){
var f__36155__auto__ = (function (){var switch__36040__auto__ = ((function (c__36154__auto__,vec__65832,journal_target,opts,into_journal,into_viz,response_c){
return (function (state_65922){
var state_val_65923 = (state_65922[(1)]);
if((state_val_65923 === (1))){
var state_65922__$1 = state_65922;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_65922__$1,(2),response_c);
} else {
if((state_val_65923 === (2))){
var inst_65841 = (state_65922[(7)]);
var inst_65835 = (state_65922[(8)]);
var inst_65837 = (state_65922[(9)]);
var inst_65835__$1 = (state_65922[(2)]);
var inst_65836 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_65835__$1,(0),null);
var inst_65837__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_65835__$1,(1),null);
var inst_65838 = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(inst_65836);
var inst_65839 = cljs.core.reverse(inst_65837__$1);
var inst_65840 = cljs.core.vec(inst_65839);
var inst_65841__$1 = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(inst_65840);
var inst_65842 = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.selection.blank_selection);
var inst_65844 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(inst_65841__$1) : cljs.core.deref.call(null,inst_65841__$1));
var inst_65845 = cljs.core.count(inst_65844);
var inst_65846 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((1),inst_65845);
var state_65922__$1 = (function (){var statearr_65924 = state_65922;
(statearr_65924[(10)] = inst_65838);

(statearr_65924[(7)] = inst_65841__$1);

(statearr_65924[(8)] = inst_65835__$1);

(statearr_65924[(9)] = inst_65837__$1);

(statearr_65924[(11)] = inst_65842);

return statearr_65924;
})();
if(inst_65846){
var statearr_65925_65941 = state_65922__$1;
(statearr_65925_65941[(1)] = (3));

} else {
var statearr_65926_65942 = state_65922__$1;
(statearr_65926_65942[(1)] = (4));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_65923 === (3))){
var inst_65848 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_65849 = [cljs.core.cst$kw$drawing,cljs.core.cst$kw$display_DASH_mode];
var inst_65850 = (new cljs.core.PersistentVector(null,2,(5),inst_65848,inst_65849,null));
var inst_65851 = cljs.core.assoc_in(org.numenta.sanity.viz_canvas.default_viz_options,inst_65850,cljs.core.cst$kw$two_DASH_d);
var state_65922__$1 = state_65922;
var statearr_65927_65943 = state_65922__$1;
(statearr_65927_65943[(2)] = inst_65851);

(statearr_65927_65943[(1)] = (5));


return cljs.core.cst$kw$recur;
} else {
if((state_val_65923 === (4))){
var state_65922__$1 = state_65922;
var statearr_65928_65944 = state_65922__$1;
(statearr_65928_65944[(2)] = org.numenta.sanity.viz_canvas.default_viz_options);

(statearr_65928_65944[(1)] = (5));


return cljs.core.cst$kw$recur;
} else {
if((state_val_65923 === (5))){
var inst_65838 = (state_65922[(10)]);
var inst_65857 = (state_65922[(12)]);
var inst_65841 = (state_65922[(7)]);
var inst_65835 = (state_65922[(8)]);
var inst_65837 = (state_65922[(9)]);
var inst_65842 = (state_65922[(11)]);
var inst_65854 = (state_65922[(2)]);
var inst_65855 = (function (){var vec__65833 = inst_65835;
var step_template = inst_65838;
var all_steps = inst_65837;
var r = inst_65835;
var steps = inst_65841;
var selection = inst_65842;
var base_opts = inst_65854;
return ((function (vec__65833,step_template,all_steps,r,steps,selection,base_opts,inst_65838,inst_65857,inst_65841,inst_65835,inst_65837,inst_65842,inst_65854,state_val_65923,c__36154__auto__,vec__65832,journal_target,opts,into_journal,into_viz,response_c){
return (function() { 
var G__65945__delegate = function (xs){
var last_non_nil = cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2(cljs.core.complement(cljs.core.nil_QMARK_),cljs.core.reverse(xs)));
if(cljs.core.coll_QMARK_(last_non_nil)){
return last_non_nil;
} else {
return cljs.core.last(xs);
}
};
var G__65945 = function (var_args){
var xs = null;
if (arguments.length > 0) {
var G__65946__i = 0, G__65946__a = new Array(arguments.length -  0);
while (G__65946__i < G__65946__a.length) {G__65946__a[G__65946__i] = arguments[G__65946__i + 0]; ++G__65946__i;}
  xs = new cljs.core.IndexedSeq(G__65946__a,0);
} 
return G__65945__delegate.call(this,xs);};
G__65945.cljs$lang$maxFixedArity = 0;
G__65945.cljs$lang$applyTo = (function (arglist__65947){
var xs = cljs.core.seq(arglist__65947);
return G__65945__delegate(xs);
});
G__65945.cljs$core$IFn$_invoke$arity$variadic = G__65945__delegate;
return G__65945;
})()
;
;})(vec__65833,step_template,all_steps,r,steps,selection,base_opts,inst_65838,inst_65857,inst_65841,inst_65835,inst_65837,inst_65842,inst_65854,state_val_65923,c__36154__auto__,vec__65832,journal_target,opts,into_journal,into_viz,response_c))
})();
var inst_65856 = org.nfrac.comportex.util.deep_merge_with.cljs$core$IFn$_invoke$arity$variadic(inst_65855,cljs.core.array_seq([inst_65854,opts], 0));
var inst_65857__$1 = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(inst_65856);
var inst_65859 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(inst_65838) : cljs.core.deref.call(null,inst_65838));
var inst_65860 = cljs.core.cst$kw$regions.cljs$core$IFn$_invoke$arity$1(inst_65859);
var inst_65861 = cljs.core.seq(inst_65860);
var inst_65862 = cljs.core.first(inst_65861);
var inst_65863 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_65862,(0),null);
var inst_65864 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_65862,(1),null);
var inst_65865 = cljs.core.keys(inst_65864);
var inst_65866 = cljs.core.first(inst_65865);
var inst_65867 = (function (){var selection = inst_65842;
var vec__65833 = inst_65835;
var r = inst_65835;
var base_opts = inst_65854;
var step_template = inst_65838;
var all_steps = inst_65837;
var steps = inst_65841;
var viz_options = inst_65857__$1;
var vec__65858 = inst_65862;
var layer_id = inst_65866;
var rgn = inst_65864;
var region_key = inst_65863;
return ((function (selection,vec__65833,r,base_opts,step_template,all_steps,steps,viz_options,vec__65858,layer_id,rgn,region_key,inst_65838,inst_65857,inst_65841,inst_65835,inst_65837,inst_65842,inst_65854,inst_65855,inst_65856,inst_65857__$1,inst_65859,inst_65860,inst_65861,inst_65862,inst_65863,inst_65864,inst_65865,inst_65866,state_val_65923,c__36154__auto__,vec__65832,journal_target,opts,into_journal,into_viz,response_c){
return (function (p1__65721_SHARP_){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.empty(p1__65721_SHARP_),new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$dt,(0),cljs.core.cst$kw$region,region_key,cljs.core.cst$kw$layer,layer_id,cljs.core.cst$kw$model_DASH_id,cljs.core.cst$kw$model_DASH_id.cljs$core$IFn$_invoke$arity$1(cljs.core.first((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(steps) : cljs.core.deref.call(null,steps))))], null));
});
;})(selection,vec__65833,r,base_opts,step_template,all_steps,steps,viz_options,vec__65858,layer_id,rgn,region_key,inst_65838,inst_65857,inst_65841,inst_65835,inst_65837,inst_65842,inst_65854,inst_65855,inst_65856,inst_65857__$1,inst_65859,inst_65860,inst_65861,inst_65862,inst_65863,inst_65864,inst_65865,inst_65866,state_val_65923,c__36154__auto__,vec__65832,journal_target,opts,into_journal,into_viz,response_c))
})();
var inst_65868 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(inst_65842,inst_65867);
var inst_65869 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_65870 = [cljs.core.cst$kw$on_DASH_click,cljs.core.cst$kw$on_DASH_key_DASH_down,cljs.core.cst$kw$tabIndex];
var inst_65871 = (function (){var vec__65833 = inst_65835;
var step_template = inst_65838;
var all_steps = inst_65837;
var r = inst_65835;
var steps = inst_65841;
var selection = inst_65842;
var base_opts = inst_65854;
var viz_options = inst_65857__$1;
return ((function (vec__65833,step_template,all_steps,r,steps,selection,base_opts,viz_options,inst_65838,inst_65857,inst_65841,inst_65835,inst_65837,inst_65842,inst_65854,inst_65855,inst_65856,inst_65857__$1,inst_65859,inst_65860,inst_65861,inst_65862,inst_65863,inst_65864,inst_65865,inst_65866,inst_65867,inst_65868,inst_65869,inst_65870,state_val_65923,c__36154__auto__,vec__65832,journal_target,opts,into_journal,into_viz,response_c){
return (function (){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(into_viz,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$background_DASH_clicked], null));
});
;})(vec__65833,step_template,all_steps,r,steps,selection,base_opts,viz_options,inst_65838,inst_65857,inst_65841,inst_65835,inst_65837,inst_65842,inst_65854,inst_65855,inst_65856,inst_65857__$1,inst_65859,inst_65860,inst_65861,inst_65862,inst_65863,inst_65864,inst_65865,inst_65866,inst_65867,inst_65868,inst_65869,inst_65870,state_val_65923,c__36154__auto__,vec__65832,journal_target,opts,into_journal,into_viz,response_c))
})();
var inst_65872 = (function (){var vec__65833 = inst_65835;
var step_template = inst_65838;
var all_steps = inst_65837;
var r = inst_65835;
var steps = inst_65841;
var selection = inst_65842;
var base_opts = inst_65854;
var viz_options = inst_65857__$1;
return ((function (vec__65833,step_template,all_steps,r,steps,selection,base_opts,viz_options,inst_65838,inst_65857,inst_65841,inst_65835,inst_65837,inst_65842,inst_65854,inst_65855,inst_65856,inst_65857__$1,inst_65859,inst_65860,inst_65861,inst_65862,inst_65863,inst_65864,inst_65865,inst_65866,inst_65867,inst_65868,inst_65869,inst_65870,inst_65871,state_val_65923,c__36154__auto__,vec__65832,journal_target,opts,into_journal,into_viz,response_c){
return (function (p1__65722_SHARP_){
return org.numenta.sanity.viz_canvas.viz_key_down(p1__65722_SHARP_,into_viz);
});
;})(vec__65833,step_template,all_steps,r,steps,selection,base_opts,viz_options,inst_65838,inst_65857,inst_65841,inst_65835,inst_65837,inst_65842,inst_65854,inst_65855,inst_65856,inst_65857__$1,inst_65859,inst_65860,inst_65861,inst_65862,inst_65863,inst_65864,inst_65865,inst_65866,inst_65867,inst_65868,inst_65869,inst_65870,inst_65871,state_val_65923,c__36154__auto__,vec__65832,journal_target,opts,into_journal,into_viz,response_c))
})();
var inst_65873 = [inst_65871,inst_65872,(1)];
var inst_65874 = cljs.core.PersistentHashMap.fromArrays(inst_65870,inst_65873);
var inst_65875 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(inst_65841) : cljs.core.deref.call(null,inst_65841));
var inst_65876 = cljs.core.count(inst_65875);
var inst_65877 = (inst_65876 > (1));
var state_65922__$1 = (function (){var statearr_65929 = state_65922;
(statearr_65929[(13)] = inst_65874);

(statearr_65929[(12)] = inst_65857__$1);

(statearr_65929[(14)] = inst_65868);

(statearr_65929[(15)] = inst_65869);

return statearr_65929;
})();
if(cljs.core.truth_(inst_65877)){
var statearr_65930_65948 = state_65922__$1;
(statearr_65930_65948[(1)] = (6));

} else {
var statearr_65931_65949 = state_65922__$1;
(statearr_65931_65949[(1)] = (7));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_65923 === (6))){
var inst_65857 = (state_65922[(12)]);
var inst_65841 = (state_65922[(7)]);
var inst_65842 = (state_65922[(11)]);
var inst_65879 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_65880 = [org.numenta.sanity.viz_canvas.viz_timeline,inst_65841,inst_65842,inst_65857];
var inst_65881 = (new cljs.core.PersistentVector(null,4,(5),inst_65879,inst_65880,null));
var state_65922__$1 = state_65922;
var statearr_65932_65950 = state_65922__$1;
(statearr_65932_65950[(2)] = inst_65881);

(statearr_65932_65950[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_65923 === (7))){
var state_65922__$1 = state_65922;
var statearr_65933_65951 = state_65922__$1;
(statearr_65933_65951[(2)] = null);

(statearr_65933_65951[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_65923 === (8))){
var inst_65874 = (state_65922[(13)]);
var inst_65838 = (state_65922[(10)]);
var inst_65857 = (state_65922[(12)]);
var inst_65841 = (state_65922[(7)]);
var inst_65869 = (state_65922[(15)]);
var inst_65842 = (state_65922[(11)]);
var inst_65884 = (state_65922[(2)]);
var inst_65885 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_65886 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_65887 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_65888 = [cljs.core.cst$kw$style];
var inst_65889 = [cljs.core.cst$kw$border,cljs.core.cst$kw$vertical_DASH_align];
var inst_65890 = ["none","top"];
var inst_65891 = cljs.core.PersistentHashMap.fromArrays(inst_65889,inst_65890);
var inst_65892 = [inst_65891];
var inst_65893 = cljs.core.PersistentHashMap.fromArrays(inst_65888,inst_65892);
var inst_65894 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_65895 = [org.numenta.sanity.demos.runner.world_pane,inst_65841,inst_65842];
var inst_65896 = (new cljs.core.PersistentVector(null,3,(5),inst_65894,inst_65895,null));
var inst_65897 = [cljs.core.cst$kw$td,inst_65893,inst_65896];
var inst_65898 = (new cljs.core.PersistentVector(null,3,(5),inst_65887,inst_65897,null));
var inst_65899 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_65900 = [cljs.core.cst$kw$style];
var inst_65901 = [cljs.core.cst$kw$border,cljs.core.cst$kw$vertical_DASH_align];
var inst_65902 = ["none","top"];
var inst_65903 = cljs.core.PersistentHashMap.fromArrays(inst_65901,inst_65902);
var inst_65904 = [inst_65903];
var inst_65905 = cljs.core.PersistentHashMap.fromArrays(inst_65900,inst_65904);
var inst_65906 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_65907 = [cljs.core.cst$kw$tabIndex];
var inst_65908 = [(0)];
var inst_65909 = cljs.core.PersistentHashMap.fromArrays(inst_65907,inst_65908);
var inst_65910 = [org.numenta.sanity.viz_canvas.viz_canvas,inst_65909,inst_65841,inst_65842,inst_65838,inst_65857,into_viz,null,into_journal];
var inst_65911 = (new cljs.core.PersistentVector(null,9,(5),inst_65906,inst_65910,null));
var inst_65912 = [cljs.core.cst$kw$td,inst_65905,inst_65911];
var inst_65913 = (new cljs.core.PersistentVector(null,3,(5),inst_65899,inst_65912,null));
var inst_65914 = [cljs.core.cst$kw$tr,inst_65898,inst_65913];
var inst_65915 = (new cljs.core.PersistentVector(null,3,(5),inst_65886,inst_65914,null));
var inst_65916 = [cljs.core.cst$kw$table,inst_65915];
var inst_65917 = (new cljs.core.PersistentVector(null,2,(5),inst_65885,inst_65916,null));
var inst_65918 = [cljs.core.cst$kw$div,inst_65874,inst_65884,inst_65917];
var inst_65919 = (new cljs.core.PersistentVector(null,4,(5),inst_65869,inst_65918,null));
var inst_65920 = reagent.core.render.cljs$core$IFn$_invoke$arity$2(inst_65919,el);
var state_65922__$1 = state_65922;
return cljs.core.async.impl.ioc_helpers.return_chan(state_65922__$1,inst_65920);
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
});})(c__36154__auto__,vec__65832,journal_target,opts,into_journal,into_viz,response_c))
;
return ((function (switch__36040__auto__,c__36154__auto__,vec__65832,journal_target,opts,into_journal,into_viz,response_c){
return (function() {
var org$numenta$sanity$demos$notebook$add_viz_$_state_machine__36041__auto__ = null;
var org$numenta$sanity$demos$notebook$add_viz_$_state_machine__36041__auto____0 = (function (){
var statearr_65937 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_65937[(0)] = org$numenta$sanity$demos$notebook$add_viz_$_state_machine__36041__auto__);

(statearr_65937[(1)] = (1));

return statearr_65937;
});
var org$numenta$sanity$demos$notebook$add_viz_$_state_machine__36041__auto____1 = (function (state_65922){
while(true){
var ret_value__36042__auto__ = (function (){try{while(true){
var result__36043__auto__ = switch__36040__auto__(state_65922);
if(cljs.core.keyword_identical_QMARK_(result__36043__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__36043__auto__;
}
break;
}
}catch (e65938){if((e65938 instanceof Object)){
var ex__36044__auto__ = e65938;
var statearr_65939_65952 = state_65922;
(statearr_65939_65952[(5)] = ex__36044__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_65922);

return cljs.core.cst$kw$recur;
} else {
throw e65938;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__36042__auto__,cljs.core.cst$kw$recur)){
var G__65953 = state_65922;
state_65922 = G__65953;
continue;
} else {
return ret_value__36042__auto__;
}
break;
}
});
org$numenta$sanity$demos$notebook$add_viz_$_state_machine__36041__auto__ = function(state_65922){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$notebook$add_viz_$_state_machine__36041__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$notebook$add_viz_$_state_machine__36041__auto____1.call(this,state_65922);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$notebook$add_viz_$_state_machine__36041__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$notebook$add_viz_$_state_machine__36041__auto____0;
org$numenta$sanity$demos$notebook$add_viz_$_state_machine__36041__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$notebook$add_viz_$_state_machine__36041__auto____1;
return org$numenta$sanity$demos$notebook$add_viz_$_state_machine__36041__auto__;
})()
;})(switch__36040__auto__,c__36154__auto__,vec__65832,journal_target,opts,into_journal,into_viz,response_c))
})();
var state__36156__auto__ = (function (){var statearr_65940 = (f__36155__auto__.cljs$core$IFn$_invoke$arity$0 ? f__36155__auto__.cljs$core$IFn$_invoke$arity$0() : f__36155__auto__.call(null));
(statearr_65940[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__36154__auto__);

return statearr_65940;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__36156__auto__);
});})(c__36154__auto__,vec__65832,journal_target,opts,into_journal,into_viz,response_c))
);

return c__36154__auto__;
});
goog.exportSymbol('org.numenta.sanity.demos.notebook.add_viz', org.numenta.sanity.demos.notebook.add_viz);
org.numenta.sanity.demos.notebook.release_viz = (function org$numenta$sanity$demos$notebook$release_viz(el,serialized){
reagent.core.unmount_component_at_node(el);

var journal_target = org.numenta.sanity.demos.notebook.read_transit_str(serialized);
cljs.core.async.close_BANG_(cljs.core.get.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.notebook.remote_target__GT_chan) : cljs.core.deref.call(null,org.numenta.sanity.demos.notebook.remote_target__GT_chan)),journal_target));

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(org.numenta.sanity.demos.notebook.remote_target__GT_chan,cljs.core.dissoc,journal_target);
});
goog.exportSymbol('org.numenta.sanity.demos.notebook.release_viz', org.numenta.sanity.demos.notebook.release_viz);
org.numenta.sanity.demos.notebook.exported_viz = (function org$numenta$sanity$demos$notebook$exported_viz(el){
var cnvs = cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(el.getElementsByTagName("canvas"));
var copy_el = document.createElement("div");
copy_el.innerHTML = el.innerHTML;

var seq__65960_65966 = cljs.core.seq(cnvs);
var chunk__65962_65967 = null;
var count__65963_65968 = (0);
var i__65964_65969 = (0);
while(true){
if((i__65964_65969 < count__65963_65968)){
var cnv_65970 = chunk__65962_65967.cljs$core$IIndexed$_nth$arity$2(null,i__65964_65969);
var victim_el_65971 = (copy_el.getElementsByTagName("canvas")[(0)]);
var img_el_65972 = document.createElement("img");
img_el_65972.setAttribute("src",cnv_65970.toDataURL("image/png"));

var temp__4653__auto___65973 = victim_el_65971.getAttribute("style");
if(cljs.core.truth_(temp__4653__auto___65973)){
var style_65974 = temp__4653__auto___65973;
img_el_65972.setAttribute("style",style_65974);
} else {
}

victim_el_65971.parentNode.replaceChild(img_el_65972,victim_el_65971);

var G__65975 = seq__65960_65966;
var G__65976 = chunk__65962_65967;
var G__65977 = count__65963_65968;
var G__65978 = (i__65964_65969 + (1));
seq__65960_65966 = G__65975;
chunk__65962_65967 = G__65976;
count__65963_65968 = G__65977;
i__65964_65969 = G__65978;
continue;
} else {
var temp__4653__auto___65979 = cljs.core.seq(seq__65960_65966);
if(temp__4653__auto___65979){
var seq__65960_65980__$1 = temp__4653__auto___65979;
if(cljs.core.chunked_seq_QMARK_(seq__65960_65980__$1)){
var c__5485__auto___65981 = cljs.core.chunk_first(seq__65960_65980__$1);
var G__65982 = cljs.core.chunk_rest(seq__65960_65980__$1);
var G__65983 = c__5485__auto___65981;
var G__65984 = cljs.core.count(c__5485__auto___65981);
var G__65985 = (0);
seq__65960_65966 = G__65982;
chunk__65962_65967 = G__65983;
count__65963_65968 = G__65984;
i__65964_65969 = G__65985;
continue;
} else {
var cnv_65986 = cljs.core.first(seq__65960_65980__$1);
var victim_el_65987 = (copy_el.getElementsByTagName("canvas")[(0)]);
var img_el_65988 = document.createElement("img");
img_el_65988.setAttribute("src",cnv_65986.toDataURL("image/png"));

var temp__4653__auto___65989__$1 = victim_el_65987.getAttribute("style");
if(cljs.core.truth_(temp__4653__auto___65989__$1)){
var style_65990 = temp__4653__auto___65989__$1;
img_el_65988.setAttribute("style",style_65990);
} else {
}

victim_el_65987.parentNode.replaceChild(img_el_65988,victim_el_65987);

var G__65991 = cljs.core.next(seq__65960_65980__$1);
var G__65992 = null;
var G__65993 = (0);
var G__65994 = (0);
seq__65960_65966 = G__65991;
chunk__65962_65967 = G__65992;
count__65963_65968 = G__65993;
i__65964_65969 = G__65994;
continue;
}
} else {
}
}
break;
}

return copy_el.innerHTML;
});
goog.exportSymbol('org.numenta.sanity.demos.notebook.exported_viz', org.numenta.sanity.demos.notebook.exported_viz);
