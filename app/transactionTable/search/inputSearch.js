import {initialData, table} from "../graph/init";

const BY = {"PAYMENT_METHOD": 4, "USER": 5};


/* handler for for user input search  */
window.userSearchHandler = function (input) {
    $("#payment-method-search").val('');
    $(".chosen-select").val('').trigger("chosen:updated");

    search.call(input, BY.USER);
};

/* handler for payment method input search */
window.paymentMethodSearchHandler = function (input) {
    $("#user-search").val('');
    $(".chosen-select").val('').trigger("chosen:updated");

    search.call(input, BY.PAYMENT_METHOD);
};

/* search function based on parameter (payment method, user etc) */
function search(parameter) {
    let currentTableData = [];

    initialData.forEach(item => {
        if (item[parameter].toLowerCase().indexOf($(this).val().toLowerCase()) !== -1 && !currentTableData.includes(item)) {
            currentTableData.push(item);
        }
    });

    if (currentTableData.length === 0) {
        table.fnClearTable();
        table.fnDraw();
        return;
    }

    table.fnClearTable();
    table.fnAddData(currentTableData);
    table.fnDraw();
}
