import {table, initialData} from "../graph/init";

export default function search() {

    $(".chosen-select").chosen().change(function () {

        $("#payment-method-search").val('');
        $("#user-search").val('');


        table.fnClearTable();

        let currentTableData = [];

        $(this).val().forEach(project => {
            initialData.forEach(row => {
                if (row[3].indexOf(project) !== -1 && !currentTableData.includes(row)) {
                    currentTableData.push(row);
                }
            })
        });

        if (currentTableData.length === 0) {
            currentTableData = initialData;
        }

        table.fnAddData(currentTableData);
        table.fnDraw();

    });
}
