'use strict'

const overlay = document.querySelector('.overlay');
const delete_btn = document.querySelector('.delete_btn');
const delete_form = document.querySelector('.delete-form');
const edit_btn = document.querySelector('#edit');
const edit_form = document.querySelector('.edit-form');
const add_btn = document.querySelector(".add_button");
const add_form = document.querySelector('.add-form');

//creating retrieve function for checkboxes
function check_retrive()
{
    var checkboxes = document.getElementsByName('select');
    let selected = [];
    for (let i = 0; i < checkboxes.length; i++)
    {
        if (checkboxes[i].checked)
            selected.push(i);
    }
    return selected;
}
//creating retrieve delete function for checkboxes
function check_retrive_delete()
{
    var checkboxes = document.getElementsByName('select');
    let selected = [];
    for (let i = 0; i < checkboxes.length; i++)
    {
        if (checkboxes[i].checked)
            selected.push(i);
    }
    return selected;
}

//creating this function to clear the inside of tables input of overlay
function clear_table()
{
    let table = document.getElementById("table_data")
    table.innerHTML = "";
}


//delete functionality
delete_btn.addEventListener("click", function ()
{
    delete_form.classList.remove("hidden");
    overlay.classList.remove("hidden");

    document.querySelector('#delete-cancel').addEventListener("click", function ()
    {
        delete_form.classList.add("hidden");
        overlay.classList.add("hidden");
    })
    document.querySelector('#delete-crossing').addEventListener("click", function ()
    {

        delete_form.classList.add("hidden");
        overlay.classList.add("hidden");

    })

    document.querySelector('#delete-delete').addEventListener("click", function ()
    {
        let selection = check_retrive_delete()
        for (let i = 0; i < selection.length; i++)
        {
            let row= a.splice(selection[i], 1);
            let invoice_id=row[0]['invoice_id'];
            fetch(`http://localhost:8080/H2HBABBA3051/delete?invoice_id=${invoice_id}`,
            {
                method : "POST"
            });
            build_json();
        }
            delete_form.classList.add("hidden");
            overlay.classList.add("hidden");
        
    })
})
// edit button functionality

edit_btn.addEventListener("click", function ()
{
    edit_form.classList.remove("hidden");
    overlay.classList.remove("hidden");

    function clear_text()
    {
        document.querySelector('#edit-notes-input').value = "";
        document.querySelector('#edit-amount-input').value = "";
    }

    document.querySelector('#edit-save').addEventListener("click", function ()
    {

        let select_list = check_retrive();
        if (select_list)
        {
            let total_open_amount = document.getElementById('edit-amount-input').value;
            let notes = document.getElementById('edit-notes-input').value;
            let row1 = a.splice(select_list,1);
            let invoice_id = row1[0]['invoice_id'];

            fetch(`http://localhost:8080/H2HBABBA3051/edit?total_open_amount=${total_open_amount}&notes=${notes}&invoice_id=${invoice_id}`,
            {
                method: "POST"
            });
        edit_form.classList.add("hidden");
        overlay.classList.add("hidden");
        }
        
    });

    document.querySelector('#edit-cancel').addEventListener("click", function ()
    {
        edit_form.classList.add("hidden");
        overlay.classList.add("hidden");
        clear_text();
    });

    document.querySelector('#edit-cross').addEventListener("click", function ()
    {
        edit_form.classList.add("hidden");
        overlay.classList.add("hidden");
        clear_text();
    });

    document.querySelector('#edit-reset').addEventListener("click", function ()
    {
        clear_text();
    });

});


//add functionality
add_btn.addEventListener('click', function ()
{
    add_form.classList.remove("hidden");
    overlay.classList.remove("hidden");

    function clear_text()
    {
        let list = ["#add-cust-name-input",
            "#add-cust-no-input",
            "#add-invoice-no-input",
            "#add-invoice-amt-input",
            "#add-notes-input"]
        list.forEach(element =>
        {
            document.querySelector(element).value = "";
        });
    }

    document.querySelector('#add-cancel').addEventListener("click", function ()
    {
        add_form.classList.add("hidden");
        overlay.classList.add("hidden");
        clear_text();
    })
    document.querySelector('#add-crossing').addEventListener("click", function ()
    {
        add_form.classList.add("hidden");
        overlay.classList.add("hidden");
        clear_text();
    })

    document.querySelector('#add-reset').addEventListener("click", function ()
    {
        clear_text();
    })
    document.querySelector('#add-save').addEventListener("click", function ()
    {
        
            const name_customer = document.getElementById('add-cust-name-input').value;
            const cust_number = Number(document.getElementById('add-cust-no-input').value);
            const invoice_id = Number(document.getElementById('add-invoice-no-input').value);
            const total_open_amount = document.getElementById('add-invoice-amt-input').value;
            const due_in_date = document.getElementById('add-calender-input').value;
            const notes = document.getElementById('add-notes-input').value;

        fetch(`http://localhost:8080/H2HBABBA3051/add?name_customer=${name_customer}&cust_number=${cust_number}&invoice_id=${invoice_id}&total_open_amount=${total_open_amount}&due_in_date=${due_in_date}&notes=${notes}`,
            {
                method: "POST"
            })
            build_json();
        })
        document.querySelector("#add-save").addEventListener("click", function()
        {
        add_form.classList.add("hidden");
        overlay.classList.add("hidden");
        })
    
    })

    function build_json() {
        let a = JSON.parse(get_req("http://localhost:8080/H2HBABBA3051/fetch"));
        show_table_data(a);
    }




function get_req(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

// creating a variable and calling my fetch 
var a = JSON.parse(get_req("http://localhost:8080/H2HBABBA3051/fetch"));


    
// fucntion to show table and build table body
function show_table_data(data)
{
    var table = $('#table_data');
    table.empty();
    var max_size = data.length;
    var sta = 1;
    var elements_per_page = 10;
    var limit = elements_per_page;
    goFun(sta, limit);
    function goFun(sta, limit)
    {
        for (var i = sta; i < limit; i++)
        {
            var tab = `<tr id = ${String(i)}>
                            <td><input type="checkbox" class = "checkbox" name="select" onclick = "highlight(${String(i)});"></td>
                            <td>${data[i]["name_customer"]}</td>
                            <td>${data[i]["cust_number"]}</td>
                            <td>${data[i]["invoice_id"]}</td>
                            <td>${data[i]["total_open_amount"]}</td>
                            <td>${data[i]["due_in_date"]}</td>
                            <td>${data[i]["Predicted_Date"]}</td>
                            <td>${data[i]["Notes"]}</td>
                        </tr>`
            $('#table_data').append(tab)
        }
    }
    $('#page-right').click(function ()
    {
        var next = limit;
        if (max_size >= next)
        {
            let def = limit + elements_per_page;
            limit = def
            table.empty();
            if (limit > max_size)
            {
                def = max_size;
            }
            goFun(next, def);
        }
    });
    $('#page-left').click(function ()
    {
        var pre = limit - (2 * elements_per_page);
        if (pre >= 0)
        {
            limit = limit - elements_per_page;
            table.empty();
            goFun(pre, limit);
        }
    });
}

show_table_data(a)