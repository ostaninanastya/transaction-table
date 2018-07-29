import 'jquery/src/jquery';
import 'datatables.net-dt';
import 'chosen-js';
import 'bootstrap';

import 'datatables.net-dt/css/jquery.dataTables.css';
import 'chosen-js/chosen.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./transactionTable.css";


import init from "./graph/init";
import search from "./search/chosenSearch";
import * as inputSearch from "./search/inputSearch";

init();
search();