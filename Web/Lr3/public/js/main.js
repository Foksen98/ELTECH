$(document).ready(function() {
    // добавление картин и  пользователей
    $("#add_button").click(function() {
        $("#modal").modal("show");
    });
});

// изменение статуса
$(document).on('click', '#pict_status', function() {
    if ($(this).attr("status") == "true") {
        $(this).replaceWith(
        `
            <a role = "button" id="pict_status" pict_id=key status="false" class="btn btn-info"> </a>
                <i class="glyphicon glyphicon-plus"> <i/>
        `
        );
    }
    else {
        $(this).replaceWith(
        `
            <a role = "button" id="pict_status" pict_id=key status="true" class="btn btn-danger"> </a>
                <i class="glyphicon glyphicon-trash"> <i/>
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
