# TrafficTester

For our project, we are creating an application that allows users to visualize trends in US car accidents based on data from 2016 to 2021. This application will aid in characterizing risk factors of these car accidents. To create this application we will be using the Oracle database management system to store and access the data. We will also be creating a web-based interface to visualize the data through charts and graphs.


Install:
https://www.oracle.com/database/technologies/instant-client/winx64-64-downloads.html


Edit env variables:

PATH: add oracle instant client

TNS_ADMIN add:

C:\...\oracle\instantclient_21_9\network\admin

tnsnames.ora:

orcl=
	(DESCRIPTION=
		(ADDRESS = (PROTOCOL = TCP)(HOST = oracle.cise.ufl.edu)(PORT = 1521)
	)
	(CONNECT_DATA =
		(SID = orcl)
	)
)
