<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <%- include('../pages/partials/header.ejs') %> 
    <h1>All Users</h1>


    <table>
        <thead>
            <tr>
                <th>First name</th>
                <th>Last name</th>
                <th>Email</th>
                <th>Password</th>
            </tr>
        </thead>
        <tbody>
            <% for( let index = 0; index < array.length; index++ ) { %>
            <tr>
                <td><%= users[index].firstname %>First name</td>
                <td><%= users[index].lastname %>Last name</td>
                <td><%= users[index].email %>Email</td>
                <td><%= users[index].password%>Password </td>
             </tr> 

             <% } %>
        </tbody>
    </table>
</body>
</html>