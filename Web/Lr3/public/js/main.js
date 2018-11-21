$(document).ready(function() {
    // добавление картин и  пользователей
    $("#add_button").click(function() {
        $("#modal").modal("show");
    });
});

// изменение статуса
$(document).on('click', 'a#pict_status', function() {
    let key = $(this).attr("pict_id");
    if ($(this).attr("status") == "true") {
        $(this).replaceWith(
        `
            <a role = "button" id="pict_status" pict_id=${key} status="false" class="btn btn-info">
                <i class="glyphicon glyphicon-plus"> <i/>
            </a>
        `
        );
    }
    else {
        $(this).replaceWith(
        `
            <a role = "button" id="pict_status" pict_id=${key} status="true" class="btn btn-danger">
                <i class="glyphicon glyphicon-trash"> <i/>
            </a>
        `
        );
    }
    $.ajax( {
        type: 'POST',
        url: '/pictures/status/' + $(this).attr("pict_id") + '/',
        dataType: "json",
        success: function() {},
        error: function() {}
    });
});

// изменение статуса
$(document).on('click', 'a#user_status', function() {
    let key = $(this).attr("user_id");
    if ($(this).attr("status") == "true") {
        $(this).replaceWith(
        `
            <a role = "button" id="user_status" user_id=${key} status="false" class="btn btn-info">
                <i class="glyphicon glyphicon-plus"> <i/>
            </a>
        `
        );
    }
    else {
        $(this).replaceWith(
        `
            <a role = "button" id="user_status" user_id=${key} status="true" class="btn btn-danger">
                <i class="glyphicon glyphicon-trash"> <i/>
            </a>
        `
        );
    }
    $.ajax( {
        type: 'POST',
        url: '/users/status/' + $(this).attr("user_id") + '/',
        dataType: "json",
        success: function() {},
        error: function() {}
    });
});
