const json = require('../data/data.json');

import $ from 'jquery';
window.jQuery = $;
window.$ = $;
require( 'datatables.net' )( window, $ );
require( 'datatables.net-dtt' )( window, $ );

import 'datatables.net-dt/css/jquery.dataTables.css';

const rate = [];
const initialData = [];
const projects = new Set();

export default function init() {

$.each(json, function (key, value) {
    let rowData = [];
    rowData.push(value.transaction.id);
    rowData.push(value.transaction.transfer_date);
    rowData.push(value.transaction.status);
    rowData.push(value.transaction.project.name);
    rowData.push(value.transaction.payment_method.name);
    rowData.push(value.user.id);
    rowData.push(value.payment_details.payment.amount);
    rowData.push(value.payment_details.payment.currency);
    initialData.push(rowData);

    projects.add(value.transaction.project.name);

    if (rate.hasOwnProperty(value.transaction.payment_method.name)) {
        rate[value.transaction.payment_method.name] += 1;
    }
    else rate[value.transaction.payment_method.name] = 1;
});

const table = $('#transaction-table').dataTable({
    data: initialData,
    searching: false,
    "columnDefs": [
        {"orderable": false, "targets": [2, 7]}
    ],
    "language": {
        "emptyTable": "No data available in table"
    }
});

const projectList = $('ul.project-list');
projects.forEach(project => {
    let li = $('<li/>')
        .appendTo(projectList);
    let aaa = $('<span/>')
        .text(project)
        .appendTo(li);
});

projects.forEach(currentProject => {
    $(".chosen-select").append('<option value = ' + '\"'
        + currentProject + '\"' + '>' + currentProject + '</option>').trigger("chosen:updated");
});

const sum = Object.values(rate).reduce(function (sum, current) {
    return sum + current;
}, 0);

Object.keys(rate).sort((a, b) => rate[b] - rate[a]).forEach(item => {
    let percent = rate[item] / sum * 100;
    $(".rate-list").append(
        '<li>' + '<span>' + item + '</span>' + '<span class = "percent-span">' + percent.toFixed() + '%' + '</span>' + '</li>');
});


new Chart(document.getElementById("bar-chart"), {
    type: 'bar',
    data: {
        labels: Object.keys(rate),
        datasets: [
            {
                data: Object.values(rate),
                backgroundColor: ["#ff005b", "#426a9e", "#47adaa", "#e0eb69",
                    "#9cad45", "#ab37a5", "#283160", "#513484"],
            }
        ]
    },
    options: {
        legend: {
            display: false
        },
        title: {
            display: false
        },
        scales: {
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'amount'
                }
            }]
        }
    }

});
}