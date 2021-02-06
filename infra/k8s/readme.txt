method 1 to update a kubernetes deployments:
---------------------------------------------
Once you change a service you need to rebuild its image
this can be done by running (docker build -t [tagename: version] .)
then you need to go to infra folder and update the depoyment configuration
by running cubexctl apply -f [depl-config-file.yaml] 


method 2:
----------
Works by not specify the version of an images, rather use the latest version of an image
the challenge here how to let kubernetes know if image version get changed

