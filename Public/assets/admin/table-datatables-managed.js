var TableDatatablesManaged = function () {
    var e = function () {
            var e = $(".table_managed_sample");
            e.dataTable({
                language: {
                    aria: {
                        sortAscending: ": 正续",
                        sortDescending: ": 倒续"
                    },
                    emptyTable: "没有可用数据",
                    info: "显示 _START_ 到 _END_ 共 _TOTAL_ 条",
                    infoEmpty: "未发现数据",
                    infoFiltered: "(_MAX_ 条数据)",
                    lengthMenu: "条数 _MENU_",
                    search: "搜索:",
                    zeroRecords: "未找到匹配的记录",
                    paginate: {
                        previous: "前一页",
                        next: "下一页",
                        last: "最后一页",
                        first: "第一页"
                    }
                },
                bStateSave: !0,
                columnDefs: [{
                    targets: 0,
                    orderable: !1,
                    searchable: !1
                }],
                lengthMenu: [
                    [5, 15, 20, -1],
                    [5, 15, 20, "All"]
                ],
                pageLength: 5,   //每页数量
                pagingType: "bootstrap_full_number",
                columnDefs: [{
                    orderable: !1,
                    targets: [0]
                }, {
                    searchable: !1,
                    targets: [0]
                }],
                order: [
                    [0, "desc"]
                ]
            });
            jQuery("#sample_1_wrapper");
            e.find(".group-checkable").change(function () {
                var e = jQuery(this).attr("data-set"),
                    a = jQuery(this).is(":checked");
                jQuery(e).each(function () {
                    a ? ($(this).prop("checked", !0), $(this).parents("tr").addClass("active")) : ($(this).prop("checked", !1), $(this).parents("tr").removeClass("active"))
                }), jQuery.uniform.update(e)
            }), e.on("change", "tbody tr .checkboxes", function () {
                $(this).parents("tr").toggleClass("active")
            })
        };
    return {
        init: function () {
            jQuery().dataTable && (e())
        }
    }
}();

App.isAngularJsApp() === !1 && jQuery(document).ready(function () {
	TableDatatablesManaged.init();
});