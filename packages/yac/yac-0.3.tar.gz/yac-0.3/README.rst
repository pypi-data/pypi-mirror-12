# Your Atlassian Cloud

Love the Atlassian Cloud versions of your favorite Atlassian products (pain free upgrades, but hate the constraints (no type II plugins, single nodes, etc.)?

With Your Atlassian Cloud (YAC) , you can easily deploy Atlassian applications to your AWS VPC using cloud formation, docker and ECS (EC2 Container Service).

With YAC, you can all the benefits of the cloud with none of the constraints.
* native data center support
* easy upgrades
* file backups to S3
* log aggregation to cloud watch

# Use Cases

## Build a Stack 

Build a cloud formation stack for your Atlassian application

*yac stack -h*

## Build an ECS Cluster

Build an ECS clusters for all the containers in your app

*yac app -h*

## Setup a DB

Setup the DB and DB user on your RDS instance.

*yac db setup -h*

## Restore a FS

Restore a FileSystem from an S3 backup

*yac restore -h*

## Restore a DB

Restore a DB from an RDS snapshot

*yac db restore -h*

For example, the following will restore a snapshot named jira-prod-backup-snapshot to the jira server
 in the dev environment: 

```
yac db restore jira dev jira-prod-backup-snapshot
```

The restore is implemented in stages. The script prompt user to validate the completion of each stage before proceeding.

## Container Dev Use Cases

### Build Images

Build image for a container to an EC2 instance

*yac container build -h*

### Start Container

Start an individual container

*yac container start -h*

### Container Log

View logs from a container

*yac container log -h*