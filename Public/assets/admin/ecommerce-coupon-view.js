var EcommerceOrdersView = function() {
    var o0 = function() {
        var e = new Datatable;
        e.init({
            src: $("#datatable_order_0"),
            onSuccess: function(e) {},
            onError: function(e) {},
            loadingMessage: "Loading...",
            dataTable: {
    			ordering:  false,
                lengthMenu: [[10, 20, 50, 100, 150, -1], [10, 20, 50, 100, 150, "All"]],
                pageLength: 10,
                ajax: {
                    url: "?c=admin&a=order_1&type=1"
                },
            }
        }),
        e.getTableWrapper().on("click", ".table-group-action-submit",
        function(a) {
            a.preventDefault();
            var t = $(".table-group-action-input", e.getTableWrapper());
            "" != t.val() && e.getSelectedRowsCount() > 0 ? (e.setAjaxParam("customActionType", "group_action"), e.setAjaxParam("customActionName", t.val()), e.setAjaxParam("id", e.getSelectedRows()), e.getDataTable().ajax.reload(), e.clearAjaxParams()) : "" == t.val() ? App.alert({
                type: "danger",
                icon: "warning",
                message: "Please select an action",
                container: e.getTableWrapper(),
                place: "prepend"
            }) : 0 === e.getSelectedRowsCount() && App.alert({
                type: "danger",
                icon: "warning",
                message: "No record selected",
                container: e.getTableWrapper(),
                place: "prepend"
            })
        }),
		e.getTableWrapper().on("click", ".view_details",function(a) {
			var id = $(this).attr('data-id');
			var url = '?c=admin&a=order_id';
			$.post(url,{id:id},function(data){
				getData(data);
			},'json');	
		})
    },o1 = function() {
        var e = new Datatable;
        e.init({
            src: $("#datatable_order_1"),
            onSuccess: function(e) {},
            onError: function(e) {},
            loadingMessage: "Loading...",
            dataTable: {
    			ordering:  false,
                lengthMenu: [[10, 20, 50, 100, 150, -1], [10, 20, 50, 100, 150, "All"]],
                pageLength: 10,
                ajax: {
                    url: "?c=admin&a=order_1&type=2"
                },
            }
        }),
        e.getTableWrapper().on("click", ".table-group-action-submit",
        function(a) {
            a.preventDefault();
            var t = $(".table-group-action-input", e.getTableWrapper());
            "" != t.val() && e.getSelectedRowsCount() > 0 ? (e.setAjaxParam("customActionType", "group_action"), e.setAjaxParam("customActionName", t.val()), e.setAjaxParam("id", e.getSelectedRows()), e.getDataTable().ajax.reload(), e.clearAjaxParams()) : "" == t.val() ? App.alert({
                type: "danger",
                icon: "warning",
                message: "Please select an action",
                container: e.getTableWrapper(),
                place: "prepend"
            }) : 0 === e.getSelectedRowsCount() && App.alert({
                type: "danger",
                icon: "warning",
                message: "No record selected",
                container: e.getTableWrapper(),
                place: "prepend"
            })
        }),
		e.getTableWrapper().on("click", ".view_details",function(a) {
			var id = $(this).attr('data-id');
			var url = '?c=admin&a=order_id';
			$.post(url,{id:id},function(data){
				getData(data);
			},'json');	
		})
    },o3 = function() {
        var e = new Datatable;
        e.init({
            src: $("#datatable_order_2"),
            onSuccess: function(e) {},
            onError: function(e) {},
            loadingMessage: "Loading...",
            dataTable: {
    			ordering:  false,
                lengthMenu: [[10, 20, 50, 100, 150, -1], [10, 20, 50, 100, 150, "All"]],
                pageLength: 10,
                ajax: {
                    url: "?c=admin&a=order_1&status=2"
                },
            }
        }),
        e.getTableWrapper().on("click", ".table-group-action-submit",
        function(a) {
            a.preventDefault();
            var t = $(".table-group-action-input", e.getTableWrapper());
            "" != t.val() && e.getSelectedRowsCount() > 0 ? (e.setAjaxParam("customActionType", "group_action"), e.setAjaxParam("customActionName", t.val()), e.setAjaxParam("id", e.getSelectedRows()), e.getDataTable().ajax.reload(), e.clearAjaxParams()) : "" == t.val() ? App.alert({
                type: "danger",
                icon: "warning",
                message: "Please select an action",
                container: e.getTableWrapper(),
                place: "prepend"
            }) : 0 === e.getSelectedRowsCount() && App.alert({
                type: "danger",
                icon: "warning",
                message: "No record selected",
                container: e.getTableWrapper(),
                place: "prepend"
            })
        }),
		e.getTableWrapper().on("click", ".view_details",function(a) {
			var id = $(this).attr('data-id');
			var url = '?c=admin&a=order_id';
			$.post(url,{id:id},function(data){
				getData(data);
			},'json');	
		})
    },o88 = function() {
        var e = new Datatable;
        e.init({
            src: $("#datatable_appeal"),
            onSuccess: function(e) {},
            onError: function(e) {},
            loadingMessage: "Loading...",
            dataTable: {
    			ordering:  false,
                lengthMenu: [[10, 20, 50, 100, 150, -1], [10, 20, 50, 100, 150, "All"]],
                pageLength: 10,
                ajax: {
                    url: "?c=admin&a=appealAjax"
                },
            }
        }),
        e.getTableWrapper().on("click", ".table-group-action-submit",function(a) {
            a.preventDefault();
            var t = $(".table-group-action-input", e.getTableWrapper());
            "" != t.val() && e.getSelectedRowsCount() > 0 ? (e.setAjaxParam("customActionType", "group_action"), e.setAjaxParam("customActionName", t.val()), e.setAjaxParam("id", e.getSelectedRows()), e.getDataTable().ajax.reload(), e.clearAjaxParams()) : "" == t.val() ? App.alert({
                type: "danger",
                icon: "warning",
                message: "Please select an action",
                container: e.getTableWrapper(),
                place: "prepend"
            }) : 0 === e.getSelectedRowsCount() && App.alert({
                type: "danger",
                icon: "warning",
                message: "No record selected",
                container: e.getTableWrapper(),
                place: "prepend"
            })
        })//,
		
		// e.getTableWrapper().on("click", ".view_details",function(a) {
		// 	var id = $(this).attr('data-id');
		// 	var url = '?c=admin&a=order_id';
		// 	$.post(url,{id:id},function(data){
		// 		getData(data);
		// 	},'json');	
		// })
		
    },e = function() {
        var e = new Datatable;
        e.init({
            src: $("#datatable_coupon1"),
            onSuccess: function(e) {},
            onError: function(e) {},
            loadingMessage: "Loading...",
            dataTable: {
    			ordering:  false,
                lengthMenu: [[10, 20, 50, 100, 150, -1], [10, 20, 50, 100, 150, "All"]],
                pageLength: 10,
                ajax: {
                    url: "?c=admin&a=book_0"
                },
            }
        }),
        e.getTableWrapper().on("click", ".table-group-action-submit",
        function(a) {
            a.preventDefault();
            var t = $(".table-group-action-input", e.getTableWrapper());
            "" != t.val() && e.getSelectedRowsCount() > 0 ? (e.setAjaxParam("customActionType", "group_action"), e.setAjaxParam("customActionName", t.val()), e.setAjaxParam("id", e.getSelectedRows()), e.getDataTable().ajax.reload(), e.clearAjaxParams()) : "" == t.val() ? App.alert({
                type: "danger",
                icon: "warning",
                message: "Please select an action",
                container: e.getTableWrapper(),
                place: "prepend"
            }) : 0 === e.getSelectedRowsCount() && App.alert({
                type: "danger",
                icon: "warning",
                message: "No record selected",
                container: e.getTableWrapper(),
                place: "prepend"
            })
        })
    },
    n = function() {
        var e = new Datatable;
        e.init({
            src: $("#datatable_coupon2"),
            onSuccess: function(e) {},
            onError: function(e) {},
            loadingMessage: "Loading...",
            dataTable: {
				ordering:  false,
                lengthMenu: [[10, 20, 50, 100, 150, -1], [10, 20, 50, 100, 150, "All"]],
                pageLength: 10,
                ajax: {
                    url: "?c=admin&a=coupon_2"
                },
                columnDefs: [{
                    orderable: !0,
                    targets: [0]
                }],
            }
        }),
        e.getTableWrapper().on("click", ".table-group-action-submit",
        function(a) {
            a.preventDefault();
            var t = $(".table-group-action-input", e.getTableWrapper());
            "" != t.val() && e.getSelectedRowsCount() > 0 ? (e.setAjaxParam("customActionType", "group_action"), e.setAjaxParam("customActionName", t.val()), e.setAjaxParam("id", e.getSelectedRows()), e.getDataTable().ajax.reload(), e.clearAjaxParams()) : "" == t.val() ? App.alert({
                type: "danger",
                icon: "warning",
                message: "Please select an action",
                container: e.getTableWrapper(),
                place: "prepend"
            }) : 0 === e.getSelectedRowsCount() && App.alert({
                type: "danger",
                icon: "warning",
                message: "No record selected",
                container: e.getTableWrapper(),
                place: "prepend"
            })
        })
    },
	m = function() {
        var e = new Datatable;
        e.init({
            src: $("#datatable_user1"),
            onSuccess: function(e) {},
            onError: function(e) {},
            loadingMessage: "Loading...",
            dataTable: {
				ordering:  false,
                lengthMenu: [[10, 20, 50, 100, 150, -1], [10, 20, 50, 100, 150, "All"]],
                pageLength: 10,
                ajax: {
                    url: "?c=admin&a=user_1"
                },
                columnDefs: [{
                    orderable: !0,
                    targets: [0]
                }],
            }
        }),
        e.getTableWrapper().on("click", ".table-group-action-submit",
        function(a) {
            a.preventDefault();
            var t = $(".table-group-action-input", e.getTableWrapper());
            "" != t.val() && e.getSelectedRowsCount() > 0 ? (e.setAjaxParam("customActionType", "group_action"), e.setAjaxParam("customActionName", t.val()), e.setAjaxParam("id", e.getSelectedRows()), e.getDataTable().ajax.reload(), e.clearAjaxParams()) : "" == t.val() ? App.alert({
                type: "danger",
                icon: "warning",
                message: "Please select an action",
                container: e.getTableWrapper(),
                place: "prepend"
            }) : 0 === e.getSelectedRowsCount() && App.alert({
                type: "danger",
                icon: "warning",
                message: "No record selected",
                container: e.getTableWrapper(),
                place: "prepend"
            })
        })
    },
    r = function() {
        $(".date-picker").datepicker({
            rtl: App.isRTL(),
            autoclose: !0
        }),
        $(".datetime-picker").datetimepicker({
            isRTL: App.isRTL(),
            autoclose: !0,
            todayBtn: !0,
            pickerPosition: App.isRTL() ? "bottom-right": "bottom-left",
            minuteStep: 10
        })
    },
	o = function() {
        var e = new Datatable;
        e.init({
            src: $("#datatable_user2"),
            onSuccess: function(e) {},
            onError: function(e) {},
            loadingMessage: "Loading...",
            dataTable: {
				ordering:  false,
                lengthMenu: [[10, 20, 50, 100, 150, -1], [10, 20, 50, 100, 150, "All"]],
                pageLength: 10,
                ajax: {
                    url: "?c=admin&a=tx_0"
                },
                columnDefs: [{
                    orderable: !0,
                    targets: [0]
                }],
            }
        }),
        e.getTableWrapper().on("click", ".table-group-action-submit",
        function(a) {
            a.preventDefault();
            var t = $(".table-group-action-input", e.getTableWrapper());
            "" != t.val() && e.getSelectedRowsCount() > 0 ? (e.setAjaxParam("customActionType", "group_action"), e.setAjaxParam("customActionName", t.val()), e.setAjaxParam("id", e.getSelectedRows()), e.getDataTable().ajax.reload(), e.clearAjaxParams()) : "" == t.val() ? App.alert({
                type: "danger",
                icon: "warning",
                message: "Please select an action",
                container: e.getTableWrapper(),
                place: "prepend"
            }) : 0 === e.getSelectedRowsCount() && App.alert({
                type: "danger",
                icon: "warning",
                message: "No record selected",
                container: e.getTableWrapper(),
                place: "prepend"
            })
        })
    };
    return {
        init: function() {
			o0(),
			o1(),
			o3(),
			o88(),
            r(),
            e(),
            n(),
            m(),
            o()
        }
    }
} ();
jQuery(document).ready(function() {
    EcommerceOrdersView.init();
});

function getData(data){
	
	$('#large .order_id').html(data.body.id);
	$('#large input[name=id]').val(data.body.id);
	$('#large .order_title').html(data.body.title);
	$('#large .order_day').html(data.body.day);
	$('#large .order_paynumber').html(data.body.goods);
	$('#large .order_info').html(data.body.info);
	if(data.body.coupon_id>0)
		$('#large .order_coupon').html(data.body.coupon);
	else
		$('#large .order_coupon').html('没用使用优惠券');
	
	$('#large .order_time').html(data.body.time);
	$('#large .order_name').val(data.body.name);
	$('#large .order_tel').val(data.body.tel);
	$('#large .order_sfz').html(data.body.identity);
	
	if(data.body.status ==0 || data.body.status ==88){
		$('#large .order_money').val(data.body.realpay);
		$('#large .order_paytime').html('未付款');
		$('#large .dsnpay').hide();
	}else{
		$('#large .order_money').val(data.body.realpay);
		$('#large .order_paytime').html(data.body.paytime);
		
		if(data.body.ifdsn == 1){
			$('#large .dsnpay').show();
			$('#large .order_qrh').html('<a href="?c=admin&a=order_downpdf&id='+data.body.id+'" target="_blank">下载邀请函</a>');
		}else
			$('#large .dsnpay').hide();
	}
	
	if(data.body.status == 0) $('#large .order_status').html('未付款');
	if(data.body.status == 1) $('#large .order_status').html('已付款');
	if(data.body.status == 2) $('#large .order_status').html('已完成');
	if(data.body.status == 88) $('#large .order_status').html('已关闭');

	$('#large').modal('show');
}