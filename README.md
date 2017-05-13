# Marathon Health Check Demo Server

## Overview
This simple Node.js server was generated to illustrate the use of Marathon Health Checks for the accompanying Mesosphere Blog Post.  Complete source code has been included, and to run this locally:

### Local Operation
To run the server, run:

```
npm start
```

To view the Swagger UI interface:

```
open http://localhost:8080/docs
```

To see the end points
```
curl http://localhost:8080/hello

curl http://localhost:8080/good_bye

curl http://localhost:8080/hello
```
### Quick Load of Docker image

I will keep my docker image available on hub.docker.io, but if for some reason it is not, you have the complete source code, as well as the original docker image.  The command I used to save my docker image is:

```
docker save johndohoney/simplenodeapi | gzip > simplenodeapi.tar.gz
```
To restore the image to your environment:

```
 cd image
 docker images
 zcat simplenodeapi.tar.gz  | docker load
```

To see the loaded image, re-execute the docker images.  To load to your private docker repo, re-tag and push to make it available for loading by DCOS.  You will have to change the name in my example Marathon configuration to your 'docker -t' image name.

### Marathon Usage
Change to the marathon sub-directory, open the DCOS version 1.9 sample (the one with the 'lb" appended is for use with Marathon-LB)  Copy into your computer clip board the contents of  simple-api-1.9.json.  Click on Services in the Left Command Tab, then "Run a Service", click "Single COntainer", toggle the JSON Editor so it is visible and paste the contents of your clipboard and watch the example microservice load.  Once the health checks are functional, the service bar will show green.

To experiment, remove the health check, what heppens? (Yeah, no bar -- no health feed back)  What is nice about a health check under Marathon is, if it fails, Marathon will re-start your app for you.  No health check, Marathon has no no way of knowing that status of you app.  This is why health checks are so important for operations in a modern cluster.


### Marathon-LB Usage
Deploy Marathon-LB from the DCOS Universe.  Accept the defaults, nothing is necessary to change for this simple demo.  Next, you are going to have to determine the PUBLIC IP address of the agent Marathon LB is running.  "The simpliest" way is to look at the (assuming you used our DCOS Cloudfront templates) PublicSlaveELB "Instance" tab which will take you to the EC2 Instance running the Public agent.  Copy that IPv4 address into a file.  Then you will need to change Single COntainer-lb.json", specifically the line:

        "HAPROXY_0_VHOST": "54.202.63.130",

This needs to be your FQDN or IPv4 address of your DCOS Public Agent. From here, follow the instructions above, but with the contents of "simple-api-1.9-lb.json."

Why this is so nice is now, you do not have to figure out the port it is running on.  Curl statements with this approach look like:

```
 curl http://<public agent ipv4>/api/hello
```
Scale the api to 3 - 4 instances.  THen invoke the API again.  Scroll down to see the port changes.  Marathon-LB handles the service discovery details as well as dispatching the HTTP call to a health dcoker container.

