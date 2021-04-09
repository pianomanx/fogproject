(function($) {
    var saveBtn = $('#service-send'),
        table = $('#settings-table').registerTable(null, {
        buttons: [],
        order: [
            [2, 'asc']
        ],
        columns: [
            {
                data: 'name',
                orderable: false
            },
            {
                data: 'inputValue',
                orderable: false
            },
            {
                data: 'category',
                visible: false
            }
        ],
        columnDefs: [
             {
                 render: function(data, type, row) {
                     return '<span data-toggle="tooltip" title="'
                         + row.description
                         + '">'
                         + data
                         + '</span>';
                 },
                 targets: 0
             }
        ],
        select: false,
        rowGroup: {
            dataSrc: 'category'
        },
        rowId: 'id',
        processing: true,
        serverSide: true,
        ajax: {
            url: '../management/index.php?node='
                + Common.node
                + '&sub=getSettingsList',
            type: 'post'
        },
    });
    table.on('draw', function() {
        var action = '../management/index.php?node='
            + Common.node
            + '&sub='
            + Common.sub,
            method = 'post';
        jscolors = $('.jscolor');
        if ($(jscolors).length !== 0) {
            $(jscolors).each((index, element) => {
                let color = $('#FOG_COMPANY_COLOR').val();
                new jscolor(element, {'value': color});
            });
        }
        $('.slider').slider();
        $('.resettoken').on('click', function(e) {
            e.preventDefault();
            Pace.ignore(function() {
                $.ajax({
                    url: '../status/newtoken.php',
                    dataType: 'json',
                    success: function(data, textStatus, jqXHR) {
                        $('.token').val(data);
                        var opts = $('.token').serialize();
                        $.apiCall(method, action, opts, function(err) {
                            if (err) {
                                return;
                            }
                            table.draw(false);
                        });
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                    }
                });
            });
        });
        table.$('.input-group,.form-control').css({
            width: '100%'
        });
        $(':password').before('<span class="input-group-addon"><i class="fa fa-eye-slash fogpasswordeye"></i></span>');
        Common.iCheck('#settings-table :input');
        table.$(':input').each(function() {
            if ($(this).hasClass('slider')) {
                ev = 'slideStop';
            } else {
                ev = 'change';
            }
            $(this).on(ev, function(e) {
                e.preventDefault();
                var opts = $(this).serialize();
                $.apiCall(method, action, opts, function(err) {
                    if (err) {
                        return;
                    }
                    table.draw(false);
                });
            });
        });
        table.$(':checkbox').on('ifChecked', function(e) {
            e.preventDefault();
            var key = $(this).attr('name'),
                val = 1,
                opts = {};
            opts[key] = val;
            $.apiCall(method, action, opts, function(err) {
                if (err) {
                    return;
                }
                table.draw(false);
            });
        }).on('ifUnchecked', function(e) {
            e.preventDefault();
            var key = $(this).attr('name'),
                val = 0,
                opts = {};
            opts[key] = val;
            $.apiCall(method, action, opts, function(err) {
                if (err) {
                    return;
                }
                table.draw(false);
            });
        });
    });
    if (Common.search && Common.search.length > 0) {
        table.search(Common.search).draw();
    }
})(jQuery);
