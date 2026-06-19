Server testings
===============

*Simple Test*
-------------

Launch the server.
Go to the Postman.
Put the http://localhost:3000/api/licenses
Go to **Body** and put there the json request for POST:
.. code-block:: json

	{
	"full_name": "Тест Тестович",
	"birth_date": "1990-01-01",
	"doc_number": "1234 567890",
	"category": "B"
	}
	
Clear fields if they filled of all other options like "Scripts" and s.o.
You can make separate **GET** setting & leave a void fields even the *Body*.
First of all you can send the GET-request which returns the answer as: **[]**.

Then send the POST. It'll return the structure like mentioned on a above for POST *Body*.
If it returned: {error, "..."} something went wrong!
If your POST-request was OK, then if you send the new GET-request it'll return all of gathered data done by *POST*.

After successful tests with *Postman* do real test with Client & SQL-server.

*Server test by App*
--------------------

* Launch your developed App from android.
* Launch or relaunch the server.
* The **important** thing if you implemented the server in local network then connect you android device right to this network.
For example if the server is on another network but your phone in other wifi network, then disconnect the current network connections of server and reconnect to the wifi network where the phone belongs. It recommended only for local server implementations!
* Get the ip-address of server device (it may be the PC, or your PC) and set as parameter for exchanging by your App.
* Do simple tests by your android App.

*SQL Server test*
-----------------

Check that the PostgreSQL service started. (services.msc)