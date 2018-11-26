$(document).ready(function() {
    // добавление картин и  пользователей
    $("#add_button").click(function() {
        $("#modal").modal("show");
    });
});

// изменение статуса
$(document).on('click', 'a.pict_status', function() {
    console.log($(this));
    let key = $(this).attr("pict_id");
    if ($(this).attr("status") == "true") {
        $(this).replaceWith(
        `
            <a role = "button" pict_id=${key} status="false" class="btn btn-info pict_status">
                <i class="glyphicon glyphicon-plus"> <i/>
            </a>
        `
        );
    }
    else {
        $(this).replaceWith(
        `
            <a role = "button" pict_id=${key} status="true" class="btn btn-danger pict_status">
                <i class="glyphicon glyphicon-trash"> <i/>
            </a>
        `
        );
    }
    $.ajax( {
        type: 'POST',
        url: '/admin/pictures/status/' + $(this).attr("pict_id") + '/',
        dataType: "json",
        success: function() {},
        error: function() {}
    });
});

// изменение статуса
$(document).on('click', 'a.user_status', function() {
    let key = $(this).attr("user_id");
    if ($(this).attr("status") == "true") {
        $(this).replaceWith(
        `
            <a role = "button" user_id=${key} status="false" class="btn btn-info user_status">
                <i class="glyphicon glyphicon-plus"> <i/>
            </a>
        `
        );
    }
    else {
        $(this).replaceWith(
        `
            <a role = "button" user_id=${key} status="true" class="btn btn-danger user_status">
                <i class="glyphicon glyphicon-trash"> <i/>
            </a>
        `
        );
    }
    $.ajax( {
        type: 'POST',
        url: '/admin/users/status/' + $(this).attr("user_id") + '/',
        dataType: "json",
        success: function() {},
        error: function() {}
    });
});
