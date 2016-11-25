set up mongo DB-
```
sudo apt-get install -y mongodb-org
$ mkdir data
$ echo 'mongod --bind_ip=$IP --dbpath=data --nojournal --rest "$@"' > mongod
$ chmod a+x mongod
```


Shell Access
To access a shell prompt for the above MongoDB run the following.
```command-line
$ mongo
```
The mongo shell is an interactive JavaScript interface to MongoDB. You can use the mongo shell to query and update data as well as perform administrative operations.

