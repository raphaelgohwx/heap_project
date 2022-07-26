create database stonkify_testdb;
use stonkify_testdb;
create table user(
username varchar(100) not null,
password varchar(100) not null
);

insert into user values ("user","123456");