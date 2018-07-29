import $ from 'jquery';
window.jQuery = $;
window.$ = $;


const BY = {"PAYMENT_METHOD": 4, "USER": 5};
let currentTableData;



function search(parameter) {
    currentTableData = [];
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
export default function search() {
    $(document).ready(function () {

        $("#payment-method-search").keyup(function () {
            $("#user-search").val('');
            $(".chosen-select").val('').trigger("chosen:updated");
            search.call(this, BY.PAYMENT_METHOD);
        });

        $("#user-search").keyup(function () {
            $("#payment-method-search").val('');
            $(".chosen-select").val('').trigger("chosen:updated");
            search.call(this, BY.USER);
        });

        $(".chosen-select").chosen().change(function () {
            $("#payment-method-search").val('');
            $("#user-search").val('');

            currentTableData = [];
            table.dataTable().fnClearTable();

            if ($(this).val() === null) {
                $("#form_field").trigger("chosen:updated");
                table.fnAddData(initialData);
                table.fnDraw();
                return;
            }

            $(this).val().forEach(project => {
                initialData.forEach(row => {
                    if (row[3].indexOf(project) !== -1 && !currentTableData.includes(row)) {
                        currentTableData.push(row);
                    }
                })
            });

            table.fnAddData(currentTableData);
            table.fnDraw();

        });
    });
}
